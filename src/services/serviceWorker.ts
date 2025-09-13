/**
 * Service Worker for PWA functionality
 * Handles caching, offline support, and background sync
 */

declare const self: any;

const CACHE_NAME = 'lifeline-navigator-v1';
const API_CACHE_NAME = 'lifeline-api-v1';
const STATIC_CACHE_NAME = 'lifeline-static-v1';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  // Add other critical assets
];

// API endpoints to cache
const API_PATTERNS = [
  /^https:\/\/www\.benefits\.gov\/api\//,
  /^https:\/\/api\.211\.org\//,
  /^https:\/\/api\.sba\.gov\//,
  /^https:\/\/www\.hud\.gov\/api\//,
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      self.skipWaiting(),
    ])
  );
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== CACHE_NAME &&
              cacheName !== API_CACHE_NAME &&
              cacheName !== STATIC_CACHE_NAME
            ) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim(),
    ])
  );
});

self.addEventListener('fetch', (event: any) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (isAPIRequest(url)) {
    event.respondWith(handleAPIRequest(request));
    return;
  }

  // Handle static assets
  if (request.destination === 'document' || 
      request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'image') {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Default: network first, fallback to cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event: any) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

// Push notifications (for future implementation)
self.addEventListener('push', (event: any) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'lifeline-notification',
        data: data.url,
      })
    );
  }
});

self.addEventListener('notificationclick', (event: any) => {
  event.notification.close();
  
  if (event.notification.data) {
    event.waitUntil(
      self.clients.openWindow(event.notification.data)
    );
  }
});

// Helper functions
function isAPIRequest(url: URL): boolean {
  return API_PATTERNS.some(pattern => pattern.test(url.href));
}

async function handleAPIRequest(request: Request): Promise<Response> {
  const cache = await caches.open(API_CACHE_NAME);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Add offline indicator header
      const headers = new Headers(cachedResponse.headers);
      headers.set('X-Served-From', 'cache');
      
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers,
      });
    }
    
    // Return offline page or error response
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'No cached data available',
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

async function handleStaticRequest(request: Request): Promise<Response> {
  const cache = await caches.open(STATIC_CACHE_NAME);
  
  // Try cache first for static assets
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Fallback to network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return offline fallback
    if (request.destination === 'document') {
      return caches.match('/') || new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

async function handleBackgroundSync(): Promise<void> {
  try {
    // This would integrate with the offline manager
    // to process queued actions when back online
    const message = {
      type: 'BACKGROUND_SYNC',
      timestamp: Date.now(),
    };
    
    // Notify all clients about background sync
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage(message);
    });
    
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Cache management utilities
async function cleanupOldCaches(maxAge = 7 * 24 * 60 * 60 * 1000): Promise<void> {
  const cache = await caches.open(API_CACHE_NAME);
  const requests = await cache.keys();
  const cutoff = Date.now() - maxAge;
  
  for (const request of requests) {
    const response = await cache.match(request);
    if (response) {
      const date = response.headers.get('Date');
      if (date && new Date(date).getTime() < cutoff) {
        await cache.delete(request);
      }
    }
  }
}

// Performance monitoring
function reportPerformance(metric: string, value: number): void {
  // This could send metrics to analytics service
  console.log(`SW Performance: ${metric} = ${value}ms`);
}

export {};