import React from 'react';
import { Users, BookOpen, FileText, GraduationCap, TrendingUp, ArrowUpRight } from 'lucide-react';

// Student data with registration dates
const students = [
  {
    id: 1,
    firstName: 'Sophie',
    lastName: 'Martin',
    level: 'Advanced',
    schedule: 'Monday 18:00',
    profession: 'Architecte',
    registrationDate: '07 Janvier 2024'
  },
  {
    id: 2,
    firstName: 'Thomas',
    lastName: 'Dubois',
    level: 'Intermediate',
    schedule: 'Tuesday 17:30',
    profession: 'Étudiant en Génie Mécanique',
    registrationDate: '15 Janvier 2024'
  },
  {
    id: 3,
    firstName: 'Emma',
    lastName: 'Laurent',
    level: 'Beginner',
    schedule: 'Wednesday 19:00',
    profession: 'Étudiante en Sciences Politiques',
    registrationDate: '22 Janvier 2024'
  },
  {
    id: 4,
    firstName: 'Lucas',
    lastName: 'Bernard',
    level: 'Intermediate',
    schedule: 'Thursday 18:30',
    profession: 'Élève en Terminale',
    registrationDate: '01 Février 2024'
  },
  {
    id: 5,
    firstName: 'Léa',
    lastName: 'Petit',
    level: 'Advanced',
    schedule: 'Friday 17:00',
    profession: 'Serveuse',
    registrationDate: '10 Février 2024'
  },
  {
    id: 6,
    firstName: 'Hugo',
    lastName: 'Moreau',
    level: 'Beginner',
    schedule: 'Saturday 10:00',
    profession: 'Étudiant en Génie Mécanique',
    registrationDate: '20 Février 2024'
  },
  {
    id: 7,
    firstName: 'Chloé',
    lastName: 'Roux',
    level: 'Intermediate',
    schedule: 'Monday 19:30',
    profession: 'Élève en Terminale',
    registrationDate: '01 Mars 2024'
  },
  {
    id: 8,
    firstName: 'Antoine',
    lastName: 'Garcia',
    level: 'Advanced',
    schedule: 'Wednesday 18:30',
    profession: 'Architecte',
    registrationDate: '05 Mars 2024'
  },
  {
    id: 9,
    firstName: 'Julie',
    lastName: 'Simon',
    level: 'Intermediate',
    schedule: 'Friday 18:00',
    profession: 'Étudiante en Sciences Politiques',
    registrationDate: '12 Mars 2024'
  }
];

// Progress data for the chart
const progressData = [65, 70, 75, 80, 85, 89];
const months = ['January', 'February', 'March', 'April', 'May', 'June'];

export function AdminStats() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <Users className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <FileText className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold">48</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold">89%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Student Progress</h3>
          <div className="flex items-center gap-2 text-teal-600">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">+24% this semester</span>
          </div>
        </div>
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end justify-between px-4">
            {progressData.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative">
                  {index > 0 && value > progressData[index - 1] && (
                    <ArrowUpRight 
                      className="absolute -top-6 -right-2 text-teal-600 h-4 w-4"
                    />
                  )}
                  <div 
                    className="w-12 bg-teal-500 rounded-t transition-all duration-500"
                    style={{ height: `${value}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-2">{months[index]}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between">
            {[100, 75, 50, 25, 0].map((value) => (
              <div key={value} className="text-xs text-gray-400">
                {value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Current Students</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${student.level === 'Beginner' ? 'bg-green-100 text-green-800' : 
                        student.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' : 
                        'bg-purple-100 text-purple-800'}`}>
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.schedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.profession}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.registrationDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}