import { ConvexReactClient } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { offlineStorage, type OfflineJourney, type TabletInfo } from './offline-storage';

export class SyncService {
  private convex: ConvexReactClient;
  private syncInProgress = false;
  private retryTimeouts: Map<string, NodeJS.Timeout> = new Map();

  constructor(convex: ConvexReactClient) {
    this.convex = convex;
  }

  // Check if online
  private isOnline(): boolean {
    return navigator.onLine;
  }

  // Register or update tablet
  async ensureTabletRegistered(): Promise<boolean> {
    if (!this.isOnline()) return false;

    const tabletId = await offlineStorage.getTabletId();
    const tabletInfo = await offlineStorage.getTabletInfo();

    try {
      // Register/update tablet in Convex
      await this.convex.mutation(api.tablets.registerTablet, {
        tabletId,
        name: tabletInfo?.name,
      });

      return true;
    } catch (error) {
      console.error('Failed to register tablet:', error);
      return false;
    }
  }

    // Sync a single journey
  async syncJourney(journey: OfflineJourney): Promise<boolean> {
    if (!this.isOnline()) return false;

    const tabletRegistered = await this.ensureTabletRegistered();
    if (!tabletRegistered) return false;

    try {
      // Convert dates to timestamps for Convex
      const journeyData = {
        profile: journey.profile,
        channels: journey.channels,
        challenges: journey.challenges,
        solution: journey.solution,
        contact: journey.contact,
        startedAt: journey.startedAt.getTime(),
        completedAt: journey.completedAt?.getTime(),
      };

      console.log('📤 [SYNC-DATA] Journey data being sent to Convex:', {
        localId: journey.localId,
        hasContact: !!journey.contact,
        contact: journey.contact,
        contactKeys: journey.contact ? Object.keys(journey.contact) : [],
        contactValues: journey.contact ? Object.values(journey.contact).filter(v => v) : []
      });

      await this.convex.mutation(api.journeys.syncJourney, {
        tabletId: journey.tabletId,
        localId: journey.localId,
        journeyData: journeyData as any,
      });

      // Update local journey as synced
      await offlineStorage.updateJourneySync(journey.localId, {
        syncStatus: 'synced',
        syncedAt: new Date(),
        syncAttempts: (journey.syncAttempts || 0) + 1,
        lastSyncError: undefined,
      });

      // Remove from sync queue
      await offlineStorage.removeFromSyncQueue(journey.localId);

      return true;
    } catch (error) {
      console.error(`Failed to sync journey ${journey.localId}:`, error);
      
      // Update sync status as failed
      await offlineStorage.updateJourneySync(journey.localId, {
        syncStatus: 'failed',
        syncAttempts: (journey.syncAttempts || 0) + 1,
        lastSyncError: error instanceof Error ? error.message : 'Unknown error',
      });

      // Schedule retry
      this.scheduleRetry(journey.localId);
      return false;
    }
  }

  // Batch sync all pending journeys
  async syncAllPending(): Promise<{
    succeeded: number;
    failed: number;
    total: number;
  }> {
    if (this.syncInProgress) {
      console.log('⏳ [SYNC-ALL] Sync already in progress, skipping');
      return { succeeded: 0, failed: 0, total: 0 };
    }

    this.syncInProgress = true;

    try {
      const pendingJourneys = await offlineStorage.getJourneysBySync('pending');
      const failedJourneys = await offlineStorage.getJourneysBySync('failed');
      const allToSync = [...pendingJourneys, ...failedJourneys];

      console.log('📊 [SYNC-ALL] Found items to sync:', {
        pending: pendingJourneys.length,
        failed: failedJourneys.length,
        total: allToSync.length
      });

      if (allToSync.length === 0) {
        console.log('✅ [SYNC-ALL] No items to sync');
        return { succeeded: 0, failed: 0, total: 0 };
      }

      let succeeded = 0;
      let failed = 0;

      for (const journey of allToSync) {
        console.log(`📤 [SYNC-ITEM] Syncing journey:`, {
          localId: journey.localId,
          profile: journey.profile,
          attempt: (journey.syncAttempts || 0) + 1
        });
        
        const success = await this.syncJourney(journey);
        if (success) {
          succeeded++;
          console.log(`✅ [SYNC-ITEM] Success:`, journey.localId);
        } else {
          failed++;
          console.log(`❌ [SYNC-ITEM] Failed:`, journey.localId);
        }
      }

      // Update last sync timestamp
      await offlineStorage.setLastSyncTimestamp(new Date());

      return {
        succeeded,
        failed,
        total: allToSync.length,
      };
    } finally {
      this.syncInProgress = false;
    }
  }

  // Schedule automatic retry for failed syncs
  private scheduleRetry(localId: string): void {
    // Clear existing timeout if any
    const existingTimeout = this.retryTimeouts.get(localId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Exponential backoff: retry after 30 seconds, then 2 minutes, then 5 minutes
    const retryDelay = 30000; // Start with 30 seconds

    const timeout = setTimeout(async () => {
      const journey = await offlineStorage.getJourneyByLocalId(localId);
      if (journey && journey.syncStatus === 'failed') {
        await this.syncJourney(journey);
      }
      this.retryTimeouts.delete(localId);
    }, retryDelay);

    this.retryTimeouts.set(localId, timeout);
  }

  // Start automatic sync service
  startAutoSync(): void {
    console.log('🔄 [BACKGROUND-SYNC] Auto sync service started (2-minute intervals)');
    
    // Sync immediately when coming online
    window.addEventListener('online', () => {
      console.log('🌐 [ONLINE-SYNC] Device came online, starting sync in 1 second...');
      setTimeout(() => {
        this.syncAllPending().then(result => {
          console.log('✅ [ONLINE-SYNC] Completed:', {
            succeeded: result.succeeded,
            failed: result.failed,
            total: result.total
          });
        }).catch(error => {
          console.error('❌ [ONLINE-SYNC] Failed:', error);
        });
      }, 1000);
    });

    // Periodic sync every 2 minutes when online
    const backgroundSyncInterval = setInterval(() => {
      console.log('⏰ [BACKGROUND-SYNC] Timer fired, checking conditions...', {
        isOnline: this.isOnline(),
        syncInProgress: this.syncInProgress,
        timestamp: new Date().toLocaleTimeString()
      });
      
      if (this.isOnline() && !this.syncInProgress) {
        console.log('⏰ [BACKGROUND-SYNC] Starting scheduled background sync...');
        this.syncAllPending().then(result => {
          if (result.total > 0) {
            console.log('✅ [BACKGROUND-SYNC] Completed:', {
              succeeded: result.succeeded,
              failed: result.failed,
              total: result.total
            });
          } else {
            console.log('✅ [BACKGROUND-SYNC] No pending items to sync');
          }
        }).catch(error => {
          console.error('❌ [BACKGROUND-SYNC] Failed:', error);
        });
      } else if (!this.isOnline()) {
        console.log('📵 [BACKGROUND-SYNC] Skipping - device offline');
      } else if (this.syncInProgress) {
        console.log('⏳ [BACKGROUND-SYNC] Skipping - sync already in progress');
      }
    }, 2 * 60 * 1000); // 2 minutes
    
    console.log('🔄 [BACKGROUND-SYNC] Background sync timer started, next fire in 2 minutes');

    // Initial sync (shorter delay to avoid blocking immediate syncs)
    if (this.isOnline()) {
      console.log('🚀 [INITIAL-SYNC] Starting initial sync in 1 second...');
      setTimeout(() => {
        console.log('🚀 [INITIAL-SYNC] Executing initial sync now...');
        this.syncAllPending().then(result => {
          console.log('✅ [INITIAL-SYNC] Completed:', {
            succeeded: result.succeeded,
            failed: result.failed,
            total: result.total
          });
        }).catch(error => {
          console.error('❌ [INITIAL-SYNC] Failed:', error);
        });
      }, 1000); // Reduced from 2000ms to 1000ms
    } else {
      console.log('📵 [INITIAL-SYNC] Skipping - device offline');
    }
  }

  // Manual sync trigger
  async manualSync(): Promise<{
    succeeded: number;
    failed: number;
    total: number;
    message: string;
  }> {
    console.log('👆 [MANUAL-SYNC] User triggered manual sync');
    
    if (!this.isOnline()) {
      console.log('📵 [MANUAL-SYNC] Failed - device offline');
      return {
        succeeded: 0,
        failed: 0,
        total: 0,
        message: 'No internet connection. Data will sync automatically when online.',
      };
    }

    console.log('🚀 [MANUAL-SYNC] Starting manual sync...');
    const result = await this.syncAllPending();
    
    console.log('✅ [MANUAL-SYNC] Completed:', {
      succeeded: result.succeeded,
      failed: result.failed,
      total: result.total
    });
    
    let message = '';
    if (result.total === 0) {
      message = 'All data is already synced!';
    } else if (result.failed === 0) {
      message = `Successfully synced ${result.succeeded} journeys!`;
    } else {
      message = `Synced ${result.succeeded} of ${result.total} journeys. ${result.failed} failed and will retry automatically.`;
    }

    return { ...result, message };
  }

  // Immediate sync attempt (non-blocking, silent)
  async immediateSync(): Promise<boolean> {
    console.log('🔍 [IMMEDIATE-SYNC] Checking conditions...', {
      syncInProgress: this.syncInProgress,
      isOnline: this.isOnline()
    });
    
    if (this.syncInProgress) {
      console.log('⏳ [IMMEDIATE-SYNC] Sync already in progress, skipping');
      return false;
    }
    
    if (!this.isOnline()) {
      console.log('📵 [IMMEDIATE-SYNC] Device offline, skipping');
      return false;
    }

    console.log('🚀 [IMMEDIATE-SYNC] Starting immediate sync...');
    
    try {
      const result = await this.syncAllPending();
      console.log('✅ [IMMEDIATE-SYNC] Completed:', {
        succeeded: result.succeeded,
        failed: result.failed,
        total: result.total
      });
      return true;
    } catch (error) {
      console.error('❌ [IMMEDIATE-SYNC] Failed:', error);
      return false;
    }
  }

  // Get sync status
  async getSyncStatus(): Promise<{
    isOnline: boolean;
    syncInProgress: boolean;
    pendingSync: number;
    failedSync: number;
    lastSync: Date | null;
    tabletRegistered: boolean;
  }> {
    const stats = await offlineStorage.getLocalStats();
    const tablet = await offlineStorage.getTabletInfo();

    return {
      isOnline: this.isOnline(),
      syncInProgress: this.syncInProgress,
      pendingSync: stats.pendingSync,
      failedSync: stats.failedSync,
      lastSync: stats.lastSync,
      tabletRegistered: !!tablet?.id,
    };
  }

  // Force sync a specific journey by local ID
  async forceSyncJourney(localId: string): Promise<boolean> {
    const journey = await offlineStorage.getJourneyByLocalId(localId);
    if (!journey) return false;

    return await this.syncJourney(journey);
  }

  // Clear retry timeouts (for cleanup)
  clearRetryTimeouts(): void {
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
    this.retryTimeouts.clear();
  }
}

// Initialize sync service (will be created with Convex client)
let syncService: SyncService | null = null;

export const initializeSyncService = (convex: ConvexReactClient): SyncService => {
  if (syncService) {
    syncService.clearRetryTimeouts();
  }
  
  syncService = new SyncService(convex);
  syncService.startAutoSync();
  return syncService;
};

export const getSyncService = (): SyncService | null => syncService;

// Helper function to trigger immediate sync when data is saved
export const triggerImmediateSync = async (): Promise<boolean> => {
  if (!syncService) return false;
  return await syncService.immediateSync();
}; 