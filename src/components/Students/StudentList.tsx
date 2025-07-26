import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  status: 'active' | 'inactive';
  avatar: string;
  enrollmentDate: string;
}

const students: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    grade: '10',
    class: '10-A',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    enrollmentDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    grade: '11',
    class: '11-B',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    enrollmentDate: '2024-02-01',
  },
  {
    id: '3',
    name: 'Sophia Davis',
    email: 'sophia.davis@email.com',
    grade: '9',
    class: '9-C',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    enrollmentDate: '2024-01-20',
  },
  {
    id: '4',
    name: 'Alex Brown',
    email: 'alex.brown@email.com',
    grade: '12',
    class: '12-A',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    enrollmentDate: '2023-09-05',
  },
];

export const StudentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Students</h2>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Grades</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="relative">
                <button className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {student.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Grade {student.grade} - Class {student.class}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
                  }`}
                >
                  {student.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button className="p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-md hover:bg-green-50 dark:hover:bg-green-900 text-green-600 dark:text-green-400">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900 text-red-600 dark:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};