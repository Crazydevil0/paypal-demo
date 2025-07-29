// Service Worker for PayPal Demo - Asset Caching for Offline Use
const CACHE_NAME = 'paypal-demo-assets-v1'
const STATIC_CACHE_NAME = 'paypal-demo-static-v1'
const VIDEO_CACHE_NAME = 'paypal-demo-videos-v1'

// Assets to cache immediately when service worker installs
const STATIC_ASSETS = [
  '/',
  '/manifest.json'
]

// Asset patterns to cache when requested
const ASSET_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\.(?:mp4|mov|webm|ogg)$/,
  /\.(?:css|js)$/,
  /\/assets\//
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[SW] Service worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return
  }
  
  // Check if this is a video file
  const isVideo = /\.(?:mp4|mov|webm|ogg)$/.test(url.pathname)
  
  // Check if this is an asset we want to cache
  const isAsset = ASSET_PATTERNS.some(pattern => pattern.test(url.pathname))
  
  if (isVideo) {
    // Special caching strategy for videos
    event.respondWith(
      caches.open(VIDEO_CACHE_NAME)
        .then((cache) => {
          return cache.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('[SW] Serving video from cache:', url.pathname)
                return cachedResponse
              }
              
              // Not in cache, fetch and cache video
              console.log('[SW] Fetching and caching video:', url.pathname)
              return fetch(request)
                .then((response) => {
                  // Only cache successful responses
                  if (response.status === 200) {
                    const responseClone = response.clone()
                    cache.put(request, responseClone)
                    console.log('[SW] Video cached successfully:', url.pathname)
                  }
                  return response
                })
                .catch((error) => {
                  console.error('[SW] Video fetch failed for:', url.pathname, error)
                  // For videos, we want to fail gracefully
                  throw error
                })
            })
        })
    )
  } else if (isAsset) {
    // Cache-first strategy for other assets
    event.respondWith(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('[SW] Serving from cache:', url.pathname)
                return cachedResponse
              }
              
              // Not in cache, fetch and cache
              console.log('[SW] Fetching and caching:', url.pathname)
              return fetch(request)
                .then((response) => {
                  // Only cache successful responses
                  if (response.status === 200) {
                    const responseClone = response.clone()
                    cache.put(request, responseClone)
                    console.log('[SW] Cached successfully:', url.pathname)
                  }
                  return response
                })
                .catch((error) => {
                  console.error('[SW] Fetch failed for:', url.pathname, error)
                  // Return a fallback or rethrow
                  throw error
                })
            })
        })
    )
  } else if (url.pathname === '/' || url.pathname.startsWith('/ppcp-') || url.pathname.startsWith('/braintree-') || url.pathname.startsWith('/profile') || url.pathname.startsWith('/challenges') || url.pathname.startsWith('/channels') || url.pathname.startsWith('/solutions') || url.pathname.startsWith('/contact') || url.pathname.startsWith('/success')) {
    // Network-first strategy for app routes (SPA)
    event.respondWith(
      fetch(request)
        .then((response) => {
          return response
        })
        .catch(() => {
          // Fallback to cached index.html for SPA routes
          return caches.match('/')
        })
    )
  }
})

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'CACHE_ASSETS':
        // Preload specific assets
        const assets = event.data.assets || []
        cacheAssets(assets)
        break
      
      case 'CACHE_VIDEOS':
        // Preload video assets
        const videos = event.data.videos || []
        cacheVideos(videos)
        break
      
      case 'CLEAR_CACHE':
        // Clear all caches
        clearAllCaches()
        break
      
      case 'GET_CACHE_STATUS':
        // Return cache status
        getCacheStatus().then((status) => {
          event.ports[0].postMessage(status)
        })
        break
    }
  }
})

// Helper function to cache specific assets
async function cacheAssets(assets) {
  try {
    const cache = await caches.open(CACHE_NAME)
    console.log('[SW] Preloading assets:', assets)
    
    for (const asset of assets) {
      try {
        const response = await fetch(asset)
        if (response.status === 200) {
          await cache.put(asset, response)
          console.log('[SW] Preloaded asset:', asset)
        }
      } catch (error) {
        console.warn('[SW] Failed to preload asset:', asset, error)
      }
    }
  } catch (error) {
    console.error('[SW] Failed to cache assets:', error)
  }
}

// Helper function to cache videos
async function cacheVideos(videoUrls = []) {
  try {
    const cache = await caches.open(VIDEO_CACHE_NAME)
    console.log('[SW] Preloading video assets:', videoUrls)
    
    for (const videoUrl of videoUrls) {
      try {
        const response = await fetch(videoUrl)
        if (response.status === 200) {
          await cache.put(videoUrl, response)
          console.log('[SW] Preloaded video asset:', videoUrl)
        }
      } catch (error) {
        console.warn('[SW] Failed to preload video asset:', videoUrl, error)
      }
    }
  } catch (error) {
    console.error('[SW] Failed to cache videos:', error)
  }
}

// Helper function to clear all caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    )
    console.log('[SW] All caches cleared')
  } catch (error) {
    console.error('[SW] Failed to clear caches:', error)
  }
}

// Helper function to get cache status
async function getCacheStatus() {
  try {
    const assetCache = await caches.open(CACHE_NAME)
    const videoCache = await caches.open(VIDEO_CACHE_NAME)
    const staticCache = await caches.open(STATIC_CACHE_NAME)
    
    const assetRequests = await assetCache.keys()
    const videoRequests = await videoCache.keys()
    const staticRequests = await staticCache.keys()
    
    const cachedAssets = assetRequests.map(req => req.url)
    const cachedVideos = videoRequests.map(req => req.url)
    const cachedStatic = staticRequests.map(req => req.url)
    
    return {
      cacheSize: cachedAssets.length + cachedVideos.length + cachedStatic.length,
      cachedAssets: cachedAssets,
      cachedVideos: cachedVideos,
      cachedStatic: cachedStatic,
      videoCacheSize: cachedVideos.length,
      assetCacheSize: cachedAssets.length,
      staticCacheSize: cachedStatic.length
    }
  } catch (error) {
    console.error('[SW] Failed to get cache status:', error)
    return { 
      cacheSize: 0, 
      cachedAssets: [], 
      cachedVideos: [], 
      cachedStatic: [],
      videoCacheSize: 0,
      assetCacheSize: 0,
      staticCacheSize: 0
    }
  }
} 