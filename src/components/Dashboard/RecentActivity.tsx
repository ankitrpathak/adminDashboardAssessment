import React from 'react';
import { Clock, User, BookOpen, Calendar, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'enrollment' | 'class' | 'event' | 'alert';
  title: string;
  description: string;
  time: string;
  user?: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'enrollment',
    title: 'New Student Enrolled',
    description: 'Emma Johnson enrolled in Grade 10-A',
    time: '2 minutes ago',
    user: 'John Admin',
  },
  {
    id: '2',
    type: 'class',
    title: 'Class Created',
    description: 'Advanced Mathematics class for Grade 12',
    time: '15 minutes ago',
    user: 'Sarah Wilson',
  },
  {
    id: '3',
    type: 'event',
    title: 'Event Scheduled',
    description: 'Parent-Teacher meeting on Dec 15th',
    time: '1 hour ago',
    user: 'Mike Davis',
  },
  {
    id: '4',
    type: 'alert',
    title: 'System Alert',
    description: 'Server maintenance scheduled for tonight',
    time: '2 hours ago',
    user: 'System',
  },
  {
    id: '5',
    type: 'enrollment',
    title: 'Student Transfer',
    description: 'Alex Brown transferred to Grade 9-B',
    time: '3 hours ago',
    user: 'Lisa Anderson',
  },
];

const getIcon = (type: Activity['type']) => {
  switch (type) {
    case 'enrollment':
      return User;
    case 'class':
      return BookOpen;
    case 'event':
      return Calendar;
    case 'alert':
      return AlertCircle;
    default:
      return Clock;
  }
};

const getColor = (type: Activity['type']) => {
  switch (type) {
    case 'enrollment':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400';
    case 'class':
      return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
    case 'event':
      return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400';
    case 'alert':
      return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          const colorClass = getColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className={`p-2 rounded-full ${colorClass}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                  {activity.user && (
                    <span className="ml-2">• by {activity.user}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
        View All Activities
      </button>
    </div>
  );
};