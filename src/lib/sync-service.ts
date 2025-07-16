import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import { ConvexClient } from "convex/browser"
import type { Journey, SyncStatus } from "@/types/journey"
import { offlineStorage } from "./offline-storage"

export interface SalesmanInfo {
  id: string
  name: string
  email: string
  region: string
  tabletId: string
}

interface PendingSync {
  id: string
  type: 'journey' | 'salesman'
  data: any
  timestamp: number
  retryCount: number
}

class SyncService {
  private convex: ConvexClient | null = null
  private syncQueue: PendingSync[] = []
  private isOnline = true
  private syncInProgress = false
  private maxRetries = 3
  private retryDelay = 1000 // Start with 1 second
  private backgroundSyncInterval: NodeJS.Timeout | null = null

  async initialize(convexUrl: string) {
    try {
      this.convex = new ConvexClient(convexUrl)
      
      // Load pending syncs from storage
      await this.loadPendingFromStorage()
      
      // Listen for online/offline events
      this.setupNetworkListeners()
      
      // Check initial connectivity
      await this.checkConnectivity()
      
      // Start background sync if online
      if (this.isOnline) {
        this.startBackgroundSync()
      }
      
      console.log("Sync service initialized successfully")
    } catch (error) {
      console.error("Failed to initialize sync service:", error)
      this.isOnline = false
    }
  }

  private setupNetworkListeners() {
    window.addEventListener('online', async () => {
      console.log("Network came online")
      this.isOnline = true
      await this.processPendingSync()
      this.startBackgroundSync()
    })

    window.addEventListener('offline', () => {
      console.log("Network went offline")
      this.isOnline = false
      if (this.backgroundSyncInterval) {
        clearInterval(this.backgroundSyncInterval)
        this.backgroundSyncInterval = null
      }
    })
  }

  private async checkConnectivity(): Promise<boolean> {
    if (!this.convex) return false
    
    try {
      // Try a simple query to test connectivity
      await this.convex.query(api.tablets.getAllTablets, {})
      this.isOnline = true
      return true
    } catch (error) {
      console.log("Connectivity check failed:", error)
      this.isOnline = false
      return false
    }
  }

  private async loadPendingFromStorage() {
    try {
      const pending = await offlineStorage.getPendingSync()
      this.syncQueue = pending || []
      console.log(`Loaded ${this.syncQueue.length} pending sync items`)
    } catch (error) {
      console.error("Failed to load pending sync items:", error)
      this.syncQueue = []
    }
  }

  private async savePendingToStorage() {
    try {
      await offlineStorage.savePendingSync(this.syncQueue)
    } catch (error) {
      console.error("Failed to save pending sync items:", error)
    }
  }

  async saveJourney(journey: Journey): Promise<{ success: boolean; id?: string; error?: string }> {
    const syncItem: PendingSync = {
      id: crypto.randomUUID(),
      type: 'journey',
      data: journey,
      timestamp: Date.now(),
      retryCount: 0
    }

    // Always save to local storage first
    try {
      await offlineStorage.saveJourney(journey)
    } catch (error) {
      console.error("Failed to save journey locally:", error)
      return { success: false, error: "Failed to save locally" }
    }

    // If online, try immediate sync
    if (this.isOnline && this.convex) {
      try {
        const result = await this.convex.mutation(api.journeys.syncJourney, {
          tabletId: await this.getTabletId(),
          localId: syncItem.id,
          journeyData: {
            profile: journey.profile,
            channels: journey.channels,
            challenges: journey.challenges,
            solution: journey.solution,
            contact: journey.contact,
            startedAt: journey.startedAt.getTime(),
            completedAt: journey.completedAt?.getTime(),
          }
        })
        console.log("Journey synced immediately:", result)
        return { success: true, id: result }
      } catch (error) {
        console.log("Immediate sync failed, queuing for later:", error)
        // Fall through to queue for later sync
      }
    }

    // Queue for later sync
    this.syncQueue.push(syncItem)
    await this.savePendingToStorage()
    
    console.log("Journey queued for sync:", syncItem.id)
    return { success: true, id: syncItem.id }
  }

  async saveSalesman(salesman: SalesmanInfo): Promise<{ success: boolean; id?: string; error?: string }> {
    const syncItem: PendingSync = {
      id: crypto.randomUUID(),
      type: 'salesman',
      data: salesman,
      timestamp: Date.now(),
      retryCount: 0
    }

    // Always save to local storage first
    try {
      await offlineStorage.saveSalesman(salesman)
    } catch (error) {
      console.error("Failed to save salesman locally:", error)
      return { success: false, error: "Failed to save locally" }
    }

    // If online, try immediate sync
    if (this.isOnline && this.convex) {
      try {
        const result = await this.convex.mutation(api.tablets.registerTablet, {
          tabletId: salesman.tabletId,
          name: salesman.name
        })
        console.log("Salesman synced immediately:", result)
        return { success: true, id: result }
      } catch (error) {
        console.log("Immediate sync failed, queuing for later:", error)
        // Fall through to queue for later sync
      }
    }

    // Queue for later sync
    this.syncQueue.push(syncItem)
    await this.savePendingToStorage()
    
    console.log("Salesman queued for sync:", syncItem.id)
    return { success: true, id: syncItem.id }
  }

  async processPendingSync(): Promise<void> {
    if (!this.isOnline || !this.convex || this.syncInProgress || this.syncQueue.length === 0) {
      return
    }

    this.syncInProgress = true
    console.log(`Processing ${this.syncQueue.length} pending sync items`)

    const failedItems: PendingSync[] = []
    const tabletId = await this.getTabletId()

    for (const item of this.syncQueue) {
      try {
        if (item.type === 'journey') {
          await this.convex.mutation(api.journeys.syncJourney, {
            tabletId,
            localId: item.id,
            journeyData: {
              profile: item.data.profile,
              channels: item.data.channels,
              challenges: item.data.challenges,
              solution: item.data.solution,
              contact: item.data.contact,
              startedAt: item.data.startedAt instanceof Date ? item.data.startedAt.getTime() : item.data.startedAt,
              completedAt: item.data.completedAt instanceof Date ? item.data.completedAt.getTime() : item.data.completedAt,
            }
          })
        } else if (item.type === 'salesman') {
          await this.convex.mutation(api.tablets.registerTablet, {
            tabletId: item.data.tabletId,
            name: item.data.name
          })
        }
        
        console.log(`Successfully synced ${item.type}:`, item.id)
      } catch (error) {
        console.error(`Failed to sync ${item.type}:`, item.id, error)
        
        item.retryCount++
        if (item.retryCount < this.maxRetries) {
          failedItems.push(item)
        } else {
          console.error(`Max retries reached for ${item.type}:`, item.id)
          // Could emit an event here for permanent failures
        }
      }
    }

    // Update queue with failed items
    this.syncQueue = failedItems
    await this.savePendingToStorage()

    // Update last sync timestamp
    await offlineStorage.setLastSyncTimestamp(new Date())

    this.syncInProgress = false
    console.log(`Sync completed. ${failedItems.length} items remaining in queue`)
  }

  private startBackgroundSync() {
    // Clear existing interval if any
    if (this.backgroundSyncInterval) {
      clearInterval(this.backgroundSyncInterval)
    }

    // Process pending sync every 2 minutes
    this.backgroundSyncInterval = setInterval(async () => {
      console.log('⏰ [BACKGROUND-SYNC] Timer fired, checking conditions...', {
        isOnline: this.isOnline,
        syncInProgress: this.syncInProgress,
        pendingCount: this.syncQueue.length,
        timestamp: new Date().toLocaleTimeString()
      })
      
      if (this.isOnline && !this.syncInProgress && this.syncQueue.length > 0) {
        console.log('⏰ [BACKGROUND-SYNC] Starting scheduled background sync...')
        await this.processPendingSync()
        console.log('✅ [BACKGROUND-SYNC] Completed')
      } else if (!this.isOnline) {
        console.log('📵 [BACKGROUND-SYNC] Skipping - device offline')
      } else if (this.syncInProgress) {
        console.log('⏳ [BACKGROUND-SYNC] Skipping - sync already in progress')
      } else {
        console.log('✅ [BACKGROUND-SYNC] No pending items to sync')
      }
    }, 2 * 60 * 1000) // 2 minutes

    console.log('🔄 [BACKGROUND-SYNC] Background sync started - will run every 2 minutes')

    // Initial sync (after a short delay)
    if (this.isOnline && this.syncQueue.length > 0) {
      console.log('🚀 [INITIAL-SYNC] Starting initial sync in 1 second...')
      setTimeout(() => {
        this.processPendingSync().then(() => {
          console.log('✅ [INITIAL-SYNC] Completed')
        }).catch(error => {
          console.error('❌ [INITIAL-SYNC] Failed:', error)
        })
      }, 1000)
    }
  }

  private async getTabletId(): Promise<string> {
    try {
      const tabletInfo = await offlineStorage.getTabletInfo()
      return tabletInfo?.id || 'default-tablet'
    } catch (error) {
      console.error("Failed to get tablet ID:", error)
      return 'default-tablet'
    }
  }

  // Public methods for monitoring
  getSyncStatus(): SyncStatus {
    if (!this.isOnline) return 'offline'
    if (this.syncQueue.length > 0) return 'pending'
    if (this.syncInProgress) return 'syncing'
    return 'synced'
  }

  getPendingCount(): number {
    return this.syncQueue.length
  }

  isConnected(): boolean {
    return this.isOnline
  }

  async forcSync(): Promise<void> {
    if (this.isOnline) {
      await this.checkConnectivity()
      await this.processPendingSync()
    }
  }

  async ensureTabletRegistered(): Promise<boolean> {
    if (!this.isOnline || !this.convex) return false

    try {
      const tabletId = await this.getTabletId()
      const tabletInfo = await offlineStorage.getTabletInfo()

      // Register/update tablet in Convex
      await this.convex.mutation(api.tablets.registerTablet, {
        tabletId,
        name: tabletInfo?.name || 'Unknown Tablet',
      })

      return true
    } catch (error) {
      console.error('Failed to register tablet:', error)
      return false
    }
  }

  // Manual sync trigger
  async manualSync(): Promise<{
    succeeded: number;
    failed: number;
    total: number;
    message: string;
  }> {
    console.log('👆 [MANUAL-SYNC] User triggered manual sync')
    
    if (!this.isOnline) {
      console.log('📵 [MANUAL-SYNC] Failed - device offline')
      return {
        succeeded: 0,
        failed: 0,
        total: 0,
        message: 'No internet connection. Data will sync automatically when online.',
      }
    }

    const initialCount = this.syncQueue.length
    console.log('🚀 [MANUAL-SYNC] Starting manual sync...')
    
    await this.processPendingSync()
    
    const succeeded = initialCount - this.syncQueue.length
    const failed = this.syncQueue.length
    
    console.log('✅ [MANUAL-SYNC] Completed:', { succeeded, failed, total: initialCount })
    
    let message = ''
    if (initialCount === 0) {
      message = 'All data is already synced!'
    } else if (failed === 0) {
      message = `Successfully synced ${succeeded} items!`
    } else {
      message = `Synced ${succeeded} of ${initialCount} items. ${failed} failed and will retry automatically.`
    }

    return { succeeded, failed, total: initialCount, message }
  }

  // Get sync statistics
  async getSyncStats(): Promise<{
    isOnline: boolean;
    syncInProgress: boolean;
    pendingSync: number;
    lastSync: Date | null;
    tabletRegistered: boolean;
  }> {
    const lastSync = await offlineStorage.getLastSyncTimestamp()
    const tabletInfo = await offlineStorage.getTabletInfo()

    return {
      isOnline: this.isOnline,
      syncInProgress: this.syncInProgress,
      pendingSync: this.syncQueue.length,
      lastSync,
      tabletRegistered: !!tabletInfo?.id,
    }
  }
}

export const syncService = new SyncService()

// Legacy exports for backward compatibility
export const initializeSyncService = (_convex: any): SyncService => {
  console.log("Initializing sync service with Convex URL...")
  syncService.initialize(import.meta.env.VITE_CONVEX_URL!)
  return syncService
}

export const getSyncService = (): SyncService => syncService

export const triggerImmediateSync = async (): Promise<boolean> => {
  if (!syncService.isConnected()) return false
  await syncService.forcSync()
  return true
} 