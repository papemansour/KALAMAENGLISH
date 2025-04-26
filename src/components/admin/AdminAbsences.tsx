import React, { useState } from 'react';
import { Calendar, Clock, UserX, Plus, Trash2, BookOpen, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { usePaymentStore } from '../../store/paymentStore';

interface Absence {
  id: string;
  studentName: string;
  level: string;
  date: string;
  time: string;
}

export function AdminAbsences() {
  const [absences, setAbsences] = useState<Absence[]>(() => {
    const saved = localStorage.getItem('absences');
    return saved ? JSON.parse(saved) : [];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showPaymentDelayForm, setShowPaymentDelayForm] = useState(false);
  const [newAbsence, setNewAbsence] = useState({
    studentName: '',
    level: '',
    date: '',
    time: ''
  });

  const { blockStudent, unblockStudent, blockedStudents } = usePaymentStore();
  const [selectedStudent, setSelectedStudent] = useState('');

  // Get students from localStorage
  const students = JSON.parse(localStorage.getItem('students') || '[]');

  const handleAddAbsence = (e: React.FormEvent) => {
    e.preventDefault();
    
    const absence: Absence = {
      id: Date.now().toString(),
      ...newAbsence
    };

    const updatedAbsences = [...absences, absence];
    setAbsences(updatedAbsences);
    localStorage.setItem('absences', JSON.stringify(updatedAbsences));
    
    setNewAbsence({ studentName: '', level: '', date: '', time: '' });
    setShowAddForm(false);
    toast.success('Absence enregistrée');
  };

  const handleDeleteAbsence = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette absence ?')) {
      const updatedAbsences = absences.filter(absence => absence.id !== id);
      setAbsences(updatedAbsences);
      localStorage.setItem('absences', JSON.stringify(updatedAbsences));
      toast.success('Absence supprimée');
    }
  };

  const handleBlockStudent = (studentId: string) => {
    const student = students.find((s: any) => s.id === studentId);
    if (student) {
      blockStudent({
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        email: student.email,
        blockedAt: new Date().toISOString(),
        reason: 'Retard de paiement'
      });
      toast.success(`Accès bloqué pour ${student.firstName} ${student.lastName}`);
    }
  };

  const handleUnblockStudent = (studentId: string) => {
    unblockStudent(studentId);
    toast.success('Accès rétabli');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestion des absences et paiements</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPaymentDelayForm(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <AlertTriangle size={20} />
            Retard de paiement
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            <Plus size={20} />
            Ajouter une absence
          </button>
        </div>
      </div>

      {showPaymentDelayForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Gestion des retards de paiement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Étudiant</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Sélectionner un étudiant</option>
                  {students.map((student: any) => (
                    <option key={student.id} value={student.id}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentDelayForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                {selectedStudent && (
                  blockedStudents.some(s => s.studentId === selectedStudent) ? (
                    <button
                      onClick={() => {
                        handleUnblockStudent(selectedStudent);
                        setShowPaymentDelayForm(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Rétablir l'accès
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleBlockStudent(selectedStudent);
                        setShowPaymentDelayForm(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Bloquer l'accès
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Ajouter une absence</h3>
            <form onSubmit={handleAddAbsence} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Étudiant</label>
                <select
                  required
                  value={newAbsence.studentName}
                  onChange={(e) => setNewAbsence({ ...newAbsence, studentName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Sélectionner un étudiant</option>
                  {students.map((student: any) => (
                    <option key={student.id} value={`${student.firstName} ${student.lastName}`}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Niveau</label>
                <select
                  required
                  value={newAbsence.level}
                  onChange={(e) => setNewAbsence({ ...newAbsence, level: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={newAbsence.date}
                  onChange={(e) => setNewAbsence({ ...newAbsence, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Heure</label>
                <input
                  type="time"
                  required
                  value={newAbsence.time}
                  onChange={(e) => setNewAbsence({ ...newAbsence, time: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Liste des absences</h3>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
              {absences.length} absences
            </span>
          </div>
        </div>

        <div className="divide-y">
          {absences.map((absence) => (
            <div key={absence.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{absence.studentName}</h4>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{absence.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(absence.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{absence.time}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAbsence(absence.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  title="Supprimer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {absences.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <UserX className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Aucune absence enregistrée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}