export class NotificationService {
  private static instance: NotificationService;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push messaging is not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully');
      return true;
    } catch (error) {
      console.warn('Service Worker registration failed (likely due to environment limitations):', error);
      return false;
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'default') {
      return await Notification.requestPermission();
    }

    return Notification.permission;
  }

  async sendNotification(title: string, body: string, options?: NotificationOptions): Promise<void> {
    const permission = await this.requestPermission();
    
    if (permission !== 'granted') {
      throw new Error('Notification permission not granted');
    }

    // Fallback to browser notification if service worker is not available
    if (!this.registration) {
      // Use browser's Notification API directly
      const defaultOptions: NotificationOptions = {
        body,
        icon: 'https://images.pexels.com/photos/159823/school-bag-school-books-159823.jpeg?auto=compress&cs=tinysrgb&w=192&h=192&fit=crop',
        badge: 'https://images.pexels.com/photos/159823/school-bag-school-books-159823.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop',
        data: {
          timestamp: Date.now()
        }
      };
      
      new Notification(title, { ...defaultOptions, ...options });
      return;
    }

    const defaultOptions: NotificationOptions = {
      body,
      icon: 'https://images.pexels.com/photos/159823/school-bag-school-books-159823.jpeg?auto=compress&cs=tinysrgb&w=192&h=192&fit=crop',
      badge: 'https://images.pexels.com/photos/159823/school-bag-school-books-159823.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop',
      vibrate: [200, 100, 200],
      data: {
        timestamp: Date.now()
      },
      actions: [
        {
          action: 'view',
          title: 'View'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    await this.registration.showNotification(title, { ...defaultOptions, ...options });
  }

  async sendDemoNotification(): Promise<void> {
    const messages = [
      {
        title: '📚 New Student Enrolled',
        body: 'John Smith has been successfully enrolled in Grade 10-A'
      },
      {
        title: '👨‍🏫 Teacher Assignment',
        body: 'Math teacher assigned to Class 9-B for next semester'
      },
      {
        title: '📊 Monthly Report Ready',
        body: 'November academic report is now available for download'
      },
      {
        title: '🔔 Parent Meeting',
        body: 'Parent-teacher meeting scheduled for December 15th'
      },
      {
        title: '📝 Assignment Due',
        body: 'Science project submissions due tomorrow'
      }
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await this.sendNotification(randomMessage.title, randomMessage.body);
  }
}