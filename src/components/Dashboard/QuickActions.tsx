import React from 'react';
import { UserPlus, BookOpen, Calendar, FileText, Bell, AlertCircle } from 'lucide-react';
import { NotificationService } from '../../utils/notifications';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  action: () => void;
}

export const QuickActions: React.FC = () => {
  const [notificationError, setNotificationError] = React.useState<string | null>(null);
  const notificationService = NotificationService.getInstance();

  const actions: QuickAction[] = [
    {
      id: 'add-student',
      label: 'Add Student',
      icon: UserPlus,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Add student'),
    },
    {
      id: 'create-class',
      label: 'Create Class',
      icon: BookOpen,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Create class'),
    },
    {
      id: 'schedule-event',
      label: 'Schedule Event',
      icon: Calendar,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('Schedule event'),
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: FileText,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => console.log('Generate report'),
    },
    {
      id: 'send-notification',
      label: 'Send Notification',
      icon: Bell,
      color: 'bg-red-500 hover:bg-red-600',
      action: async () => {
        setNotificationError(null);
        try {
          // First check if notifications are supported
          if (!('Notification' in window)) {
            throw new Error('Notifications are not supported in this browser');
          }
          
          await notificationService.sendDemoNotification();
          
          // Show success feedback
          const successDiv = document.createElement('div');
          successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
          successDiv.textContent = 'Notification sent successfully!';
          document.body.appendChild(successDiv);
          
          setTimeout(() => {
            successDiv.remove();
          }, 3000);
          
        } catch (error) {
          console.error('Failed to send notification:', error);
          if (error instanceof Error) {
            if (error.message === 'Notification permission not granted') {
            setNotificationError('Notification permission denied. Please enable notifications in your browser settings to receive alerts.');
            } else if (error.message === 'Notifications are not supported in this browser') {
              setNotificationError('Notifications are not supported in this browser.');
            } else {
            setNotificationError('Failed to send notification. Please try again.');
            }
          }
        }
      },
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      {notificationError && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{notificationError}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg`}
            >
              <Icon className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};