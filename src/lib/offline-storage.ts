import localforage from 'localforage';
import type { JourneyData } from '@/types/journey';

// Configure LocalForage for better performance
localforage.config({
  name: 'PayPalDemo',
  version: 1.0,
  storeName: 'offline_data',
  description: 'PayPal Demo offline storage for salesmen and journeys'
});

// Extended journey interface for offline storage
export interface OfflineJourney extends JourneyData {
  localId: string;
  tabletId: string;
  syncStatus: 'pending' | 'synced' | 'failed';
  syncedAt?: Date;
  syncAttempts?: number;
  lastSyncError?: string;
}

// Simple tablet information
export interface TabletInfo {
  id?: string; // Convex ID after registration
  tabletId: string;
  name?: string; // Optional display name
  createdAt: Date;
  lastActiveAt?: Date;
}

// Storage keys
const STORAGE_KEYS = {
  TABLET_INFO: 'tablet_info',
  JOURNEYS: 'journeys',
  SYNC_QUEUE: 'sync_queue',
  TABLET_ID: 'tablet_id',
  LAST_SYNC: 'last_sync_timestamp',
} as const;

class OfflineStorageManager {
  private tabletId: string | null = null;

  // Initialize tablet with unique ID if not exists
  async initializeTablet(): Promise<string> {
    if (this.tabletId) return this.tabletId;

    let tabletId = await localforage.getItem<string>(STORAGE_KEYS.TABLET_ID);
    
    if (!tabletId) {
      // Generate unique tablet ID
      tabletId = `tablet_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      await localforage.setItem(STORAGE_KEYS.TABLET_ID, tabletId);
    }

    this.tabletId = tabletId;
    return tabletId;
  }

  // Get tablet ID
  async getTabletId(): Promise<string> {
    if (this.tabletId) return this.tabletId;
    return await this.initializeTablet();
  }

  // Tablet management
  async setTabletInfo(tablet: TabletInfo): Promise<void> {
    await localforage.setItem(STORAGE_KEYS.TABLET_INFO, tablet);
  }

  async getTabletInfo(): Promise<TabletInfo | null> {
    return await localforage.getItem<TabletInfo>(STORAGE_KEYS.TABLET_INFO);
  }

  async clearTabletInfo(): Promise<void> {
    await localforage.removeItem(STORAGE_KEYS.TABLET_INFO);
  }

  // Journey management
  async saveJourney(journeyData: JourneyData): Promise<OfflineJourney> {
    const tabletId = await this.getTabletId();
    
    const offlineJourney: OfflineJourney = {
      ...journeyData,
      localId: `journey_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      tabletId,
      syncStatus: 'pending',
      syncAttempts: 0,
    };

    // Get existing journeys
    const journeys = await this.getAllJourneys();
    journeys.push(offlineJourney);

    // Save updated journeys
    await localforage.setItem(STORAGE_KEYS.JOURNEYS, journeys);

    // Add to sync queue
    await this.addToSyncQueue(offlineJourney.localId);
    console.log('🔄 [OFFLINE-STORAGE] Journey saved and added to sync queue:', {
      localId: offlineJourney.localId,
      profile: offlineJourney.profile,
      isOnline: navigator.onLine
    });

    // Trigger immediate sync if online
    this.attemptImmediateSync();

    return offlineJourney;
  }

  async getAllJourneys(): Promise<OfflineJourney[]> {
    const journeys = await localforage.getItem<OfflineJourney[]>(STORAGE_KEYS.JOURNEYS);
    return journeys || [];
  }

  async getJourneyByLocalId(localId: string): Promise<OfflineJourney | null> {
    const journeys = await this.getAllJourneys();
    return journeys.find(journey => journey.localId === localId) || null;
  }

  async updateJourneySync(localId: string, updates: Partial<Pick<OfflineJourney, 'syncStatus' | 'syncedAt' | 'syncAttempts' | 'lastSyncError'>>): Promise<void> {
    const journeys = await this.getAllJourneys();
    const journeyIndex = journeys.findIndex(journey => journey.localId === localId);
    
    if (journeyIndex !== -1) {
      journeys[journeyIndex] = { ...journeys[journeyIndex], ...updates };
      await localforage.setItem(STORAGE_KEYS.JOURNEYS, journeys);
    }
  }

  async getJourneysBySync(syncStatus: 'pending' | 'synced' | 'failed'): Promise<OfflineJourney[]> {
    const journeys = await this.getAllJourneys();
    return journeys.filter(journey => journey.syncStatus === syncStatus);
  }

  // Sync queue management
  async addToSyncQueue(localId: string): Promise<void> {
    const queue = await localforage.getItem<string[]>(STORAGE_KEYS.SYNC_QUEUE) || [];
    if (!queue.includes(localId)) {
      queue.push(localId);
      await localforage.setItem(STORAGE_KEYS.SYNC_QUEUE, queue);
    }
  }

  async getSyncQueue(): Promise<string[]> {
    return await localforage.getItem<string[]>(STORAGE_KEYS.SYNC_QUEUE) || [];
  }

  async removeFromSyncQueue(localId: string): Promise<void> {
    const queue = await localforage.getItem<string[]>(STORAGE_KEYS.SYNC_QUEUE) || [];
    const filteredQueue = queue.filter(id => id !== localId);
    await localforage.setItem(STORAGE_KEYS.SYNC_QUEUE, filteredQueue);
  }

  async clearSyncQueue(): Promise<void> {
    await localforage.setItem(STORAGE_KEYS.SYNC_QUEUE, []);
  }

  // Sync timestamp management
  async setLastSyncTimestamp(timestamp: Date): Promise<void> {
    await localforage.setItem(STORAGE_KEYS.LAST_SYNC, timestamp.toISOString());
  }

  async getLastSyncTimestamp(): Promise<Date | null> {
    const timestamp = await localforage.getItem<string>(STORAGE_KEYS.LAST_SYNC);
    return timestamp ? new Date(timestamp) : null;
  }

  // Data export for backup/transfer
  async exportAllData(): Promise<{
    tablet: TabletInfo | null;
    journeys: OfflineJourney[];
    syncQueue: string[];
    tabletId: string;
    lastSync: Date | null;
  }> {
    return {
      tablet: await this.getTabletInfo(),
      journeys: await this.getAllJourneys(),
      syncQueue: await this.getSyncQueue(),
      tabletId: await this.getTabletId(),
      lastSync: await this.getLastSyncTimestamp(),
    };
  }

  // Clear all data (for reset/logout)
  async clearAllData(): Promise<void> {
    await localforage.clear();
    this.tabletId = null;
  }

  // Statistics for local data
  async getLocalStats(): Promise<{
    totalJourneys: number;
    pendingSync: number;
    syncedJourneys: number;
    failedSync: number;
    lastSync: Date | null;
    completedJourneys: number;
  }> {
    const journeys = await this.getAllJourneys();
    const lastSync = await this.getLastSyncTimestamp();

    return {
      totalJourneys: journeys.length,
      pendingSync: journeys.filter(j => j.syncStatus === 'pending').length,
      syncedJourneys: journeys.filter(j => j.syncStatus === 'synced').length,
      failedSync: journeys.filter(j => j.syncStatus === 'failed').length,
      completedJourneys: journeys.filter(j => j.completedAt).length,
      lastSync,
    };
  }

  // Attempt immediate sync when data is saved
  private attemptImmediateSync(): void {
    if (!navigator.onLine) {
      console.log('⚡ [IMMEDIATE-SYNC] Skipping immediate sync - device is offline');
      return;
    }

    console.log('⚡ [IMMEDIATE-SYNC] Attempting immediate sync...');
    
    // Use dynamic import to avoid circular dependency
    import('./sync-service').then(({ triggerImmediateSync }) => {
      triggerImmediateSync().then(success => {
        if (success) {
          console.log('✅ [IMMEDIATE-SYNC] Immediate sync completed successfully');
        } else {
          console.log('⏳ [IMMEDIATE-SYNC] Immediate sync skipped (sync in progress or offline)');
        }
      }).catch(error => {
        console.warn('❌ [IMMEDIATE-SYNC] Immediate sync failed:', error);
      });
    }).catch(error => {
      console.warn('❌ [IMMEDIATE-SYNC] Could not import sync service:', error);
    });
  }
}

// Singleton instance
export const offlineStorage = new OfflineStorageManager(); 