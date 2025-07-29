/**
 * Service Worker Manager for PayPal Demo
 * Handles registration, asset caching, and offline functionality
 */

import { MEDIA } from '@/lib/content'

interface CacheStatus {
  cacheSize: number
  cachedAssets: string[]
  cachedVideos: string[]
  cachedStatic: string[]
  videoCacheSize: number
  assetCacheSize: number
  staticCacheSize: number
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null
  private isSupported = 'serviceWorker' in navigator

  constructor() {
    if (this.isSupported) {
      this.init()
    } else {
      console.warn('[SW Manager] Service Worker not supported')
    }
  }

  private async init() {
    try {
      await this.register()
      await this.preloadCriticalAssets()
    } catch (error) {
      console.error('[SW Manager] Initialization failed:', error)
    }
  }

  /**
   * Register the service worker
   */
  private async register(): Promise<void> {
    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      console.log('[SW Manager] Service Worker registered:', this.registration.scope)

      // Listen for updates
      this.registration.addEventListener('updatefound', () => {
        console.log('[SW Manager] Service Worker update found')
        const newWorker = this.registration?.installing
        
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW Manager] New Service Worker installed')
            // Optionally show update notification to user
          }
        })
      })

      // Handle controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW Manager] Service Worker controller changed')
        // Optionally reload the page
      })

    } catch (error) {
      console.error('[SW Manager] Service Worker registration failed:', error)
    }
  }

  /**
   * Get list of critical assets to preload
   */
  private getCriticalAssets(): string[] {
    return [
      // Brand assets
      MEDIA.logo,
      MEDIA.logoSvg,
      
      // Business icons
      MEDIA.icons.acquirer,
      MEDIA.icons.cartao,
      MEDIA.icons.fraud,
      MEDIA.icons.global,
      MEDIA.icons.redes,
      MEDIA.icons.site,
      
      // Avatars
      MEDIA.avatars.ana,
      MEDIA.avatars.leo,
      MEDIA.avatars.robot,
      
      // Product images
      MEDIA.products.phonePayment,
      MEDIA.products.pay,
      MEDIA.products.pagamento1,
      MEDIA.products.pagamento2,
      MEDIA.products.braintreeCheckout1,
      MEDIA.products.braintreeCheckout2,
      MEDIA.products.trofeu,
      MEDIA.products.grandeEmpresa,
      MEDIA.products.pequenaMedia,
    ]
  }

  /**
   * Get list of video assets for offline caching
   */
  private getVideoAssets(): string[] {
    return [
      MEDIA.videos.ppcpCompletePayments,
      MEDIA.videos.braintreeDemo,
    ]
  }

  /**
   * Preload critical assets for offline use
   */
  private async preloadCriticalAssets(): Promise<void> {
    const criticalAssets = this.getCriticalAssets()
    
    if (criticalAssets.length > 0) {
      console.log('[SW Manager] Preloading critical assets:', criticalAssets.length)
      await this.cacheAssets(criticalAssets)
    }

    // Preload videos separately with lower priority
    this.preloadVideoAssets()
  }

  /**
   * Cache specific assets
   */
  public async cacheAssets(assets: string[]): Promise<void> {
    if (!this.isSupported || !navigator.serviceWorker.controller) {
      console.warn('[SW Manager] Cannot cache assets - no active service worker')
      return
    }

    try {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_ASSETS',
        assets: assets
      })
      console.log('[SW Manager] Requested caching of assets:', assets.length)
    } catch (error) {
      console.error('[SW Manager] Failed to request asset caching:', error)
    }
  }

  /**
   * Cache video assets on demand
   */
  public async cacheVideos(): Promise<void> {
    if (!this.isSupported || !navigator.serviceWorker.controller) {
      console.warn('[SW Manager] Cannot cache videos - no active service worker')
      return
    }

    try {
      const videoAssets = this.getVideoAssets()
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_VIDEOS',
        videos: videoAssets
      })
      console.log('[SW Manager] Requested video caching:', videoAssets.length, 'videos')
    } catch (error) {
      console.error('[SW Manager] Failed to request video caching:', error)
    }
  }

  /**
   * Preload video assets with lower priority (non-blocking)
   */
  private async preloadVideoAssets(): Promise<void> {
    // Use setTimeout to ensure this doesn't block critical asset loading
    setTimeout(async () => {
      try {
        console.log('[SW Manager] Starting video preload via service worker message')
        await this.cacheVideos()
        console.log('[SW Manager] Video preload request sent')
      } catch (error) {
        console.warn('[SW Manager] Video preload failed:', error)
      }
    }, 2000) // Wait 2 seconds before starting video preload
  }

  /**
   * Clear all caches
   */
  public async clearCache(): Promise<void> {
    if (!this.isSupported || !navigator.serviceWorker.controller) {
      return
    }

    try {
      navigator.serviceWorker.controller.postMessage({
        type: 'CLEAR_CACHE'
      })
      console.log('[SW Manager] Requested cache clear')
    } catch (error) {
      console.error('[SW Manager] Failed to clear cache:', error)
    }
  }

  /**
   * Get cache status
   */
  public async getCacheStatus(): Promise<CacheStatus | null> {
    if (!this.isSupported || !navigator.serviceWorker.controller) {
      return null
    }

    try {
      return new Promise((resolve) => {
        const messageChannel = new MessageChannel()
        
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data)
        }

        navigator.serviceWorker.controller!.postMessage(
          { type: 'GET_CACHE_STATUS' },
          [messageChannel.port2]
        )
      })
    } catch (error) {
      console.error('[SW Manager] Failed to get cache status:', error)
      return null
    }
  }

  /**
   * Check if we're currently online
   */
  public isOnline(): boolean {
    return navigator.onLine
  }

  /**
   * Add online/offline event listeners
   */
  public addNetworkListeners(onOnline: () => void, onOffline: () => void): void {
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
  }

  /**
   * Remove network event listeners
   */
  public removeNetworkListeners(onOnline: () => void, onOffline: () => void): void {
    window.removeEventListener('online', onOnline)
    window.removeEventListener('offline', onOffline)
  }
}

// Export singleton instance
export const serviceWorkerManager = new ServiceWorkerManager()

// Export types
export type { CacheStatus } 