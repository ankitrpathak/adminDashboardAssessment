import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { StudentList } from './components/Students/StudentList';
import { NotificationService } from './utils/notifications';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Initialize PWA and notifications
    const initializeApp = async () => {
      const notificationService = NotificationService.getInstance();
      await notificationService.initialize();
      
      // Request notification permission on app load
      if ('Notification' in window && Notification.permission === 'default') {
        await notificationService.requestPermission();
      }
    };

    initializeApp();
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentList />;
      case 'teachers':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Teachers</h2>
            <p className="text-gray-600 dark:text-gray-400">Teacher management coming soon...</p>
          </div>
        );
      case 'classes':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Classes</h2>
            <p className="text-gray-600 dark:text-gray-400">Class management coming soon...</p>
          </div>
        );
      case 'schedule':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Schedule</h2>
            <p className="text-gray-600 dark:text-gray-400">Schedule management coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reports</h2>
            <p className="text-gray-600 dark:text-gray-400">Report generation coming soon...</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notifications</h2>
            <p className="text-gray-600 dark:text-gray-400">Notification center coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">System settings coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;