const CACHE_NAME = 'school-management-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Push event for notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from School Management System',
    icon: 'https://images.pexels.com/photos/159823/school-bag-school-books-159823.jpeg?auto=compress&cs=tinysrgb&w=192&h=192&fit=crop',
    badge: 'https://images.pexels.com/photos/159823/school-bag-school-books-159823.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: 'https://images.pexels.com/photos/159823/school-bag-school-books-159823.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'https://images.pexels.com/photos/159823/school-bag-school-books-159823.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('School Management System', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});