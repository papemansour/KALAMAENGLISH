import React from 'react';
import { Video, Users, Calendar, Clock, BookOpen } from 'lucide-react';

interface CourseSession {
  id: string;
  date: string;
  time: string;
  level: string;
  participants: number;
  meetLink: string;
}

export function AdminCourses() {
  // Get course sessions from localStorage or use default data
  const courseSessions: CourseSession[] = JSON.parse(localStorage.getItem('course_sessions') || '[]');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Suivi des cours</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-50 rounded-lg">
              <Video className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{courseSessions.length}</h3>
              <p className="text-gray-600">Cours réalisés</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-50 rounded-lg">
              <Users className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {courseSessions.reduce((acc, session) => acc + session.participants, 0)}
              </h3>
              <p className="text-gray-600">Participants totaux</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-50 rounded-lg">
              <Clock className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {courseSessions.length * 2}h
              </h3>
              <p className="text-gray-600">Heures de cours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Historique des cours</h3>
        </div>

        <div className="divide-y">
          {courseSessions.map((session) => (
            <div key={session.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="font-medium">Cours de niveau {session.level}</h4>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{session.participants} participants</span>
                    </div>
                  </div>
                </div>
                <a
                  href={session.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100"
                >
                  <Video size={20} />
                  Revoir
                </a>
              </div>
            </div>
          ))}
          {courseSessions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Aucun cours enregistré</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}