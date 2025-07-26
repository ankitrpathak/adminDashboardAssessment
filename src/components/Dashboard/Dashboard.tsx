import React from 'react';
import { Users, GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { QuickActions } from './QuickActions';
import { RecentActivity } from './RecentActivity';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, Admin!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's what's happening in your school today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={1248}
          change="+12% from last month"
          icon={Users}
          color="blue"
          isPositive={true}
        />
        <StatsCard
          title="Teachers"
          value={87}
          change="+3 new this month"
          icon={GraduationCap}
          color="green"
          isPositive={true}
        />
        <StatsCard
          title="Classes"
          value={42}
          change="2 new classes added"
          icon={BookOpen}
          color="yellow"
          isPositive={true}
        />
        <StatsCard
          title="Events"
          value={15}
          change="5 upcoming this week"
          icon={Calendar}
          color="red"
          isPositive={true}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        {/* Analytics Chart Placeholder */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Student Enrollment Trend
          </h3>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Chart visualization would go here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Student enrollment over the past 6 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};