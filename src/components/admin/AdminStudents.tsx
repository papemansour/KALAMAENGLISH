import React from 'react';
import { Calendar, Clock, GraduationCap, Video, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Schedule {
  day: string;
  time: string;
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  level: string;
  schedules: Schedule[];
  registrationDate: string;
}

export function AdminStudents() {
  // Get students from localStorage
  const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      const updatedStudents = students.filter(student => student.id !== studentId);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      toast.success('Étudiant supprimé avec succès');
      // Force re-render by updating the window location
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Liste des étudiants</h3>
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
              {students.length} étudiants
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom complet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créneaux horaires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
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
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 text-teal-600 mr-2" />
                      <span className="text-sm text-gray-900">{student.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {student.schedules.map((schedule, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 text-teal-600 mr-2" />
                          {schedule.day} <Clock className="w-4 h-4 text-teal-600 mx-2" /> {schedule.time}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {student.registrationDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <a
                        href="https://meet.google.com/oye-vjhu-xaz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-800 text-sm font-medium"
                      >
                        <Video size={16} />
                        Rejoindre le cours
                      </a>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Supprimer l'étudiant"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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