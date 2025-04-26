import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { StudentDashboard } from './dashboard/StudentDashboard';
import { Folder, Lock, BookOpen, FileText, Calendar, Star, Rocket } from 'lucide-react';

export function StudentSpace() {
  const [lastName, setLastName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const { login, isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin access
    if (lastName.toLowerCase() === 'admin1') {
      login('admin');
      toast.success('Accès administrateur accordé');
      setLastName('');
      setAccessCode('');
      setCurrentStudent({ isAdmin: true });
      return;
    }

    // Regular student login
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find((s: any) => s.lastName.toLowerCase() === lastName.toLowerCase());

    if (!student) {
      toast.error('Étudiant non trouvé. Veuillez vous inscrire d\'abord.');
      const registrationSection = document.getElementById('registration');
      if (registrationSection) {
        registrationSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (accessCode === 'student2024') {
      login(accessCode);
      toast.success(`Bienvenue ${student.firstName} ${student.lastName} !`);
      setCurrentStudent(student);
      setLastName('');
      setAccessCode('');
    } else {
      toast.error('Code d\'accès invalide');
    }
  };

  if (isAuthenticated) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">
            {currentStudent?.isAdmin ? 'Espace Administrateur' : `Bienvenue ${currentStudent?.firstName} ${currentStudent?.lastName}`}
          </h2>
          <div className="grid grid-cols-1 gap-8">
            <StudentDashboard />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="student-space" className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Rocket className="w-16 h-16 text-teal-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {localStorage.getItem('students') ? 'Prêt à décoller ?' : ''}
          </h2>
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-2xl italic text-gray-600 mb-8">
              "L'anglais n'est pas juste une langue, c'est votre passeport pour le monde."
            </blockquote>
            <p className="text-lg text-gray-700 mb-6">
              Ouvrez les portes de votre avenir professionnel, enrichissez vos voyages, et connectez-vous avec le monde entier. Avec KALAMA ENGLISH, chaque leçon vous rapproche de vos objectifs.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-teal-50 rounded-xl">
                <BookOpen className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Learn</h3>
              </div>
              <div className="text-center p-6 bg-teal-50 rounded-xl">
                <FileText className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Practice</h3>
              </div>
              <div className="text-center p-6 bg-teal-50 rounded-xl">
                <Star className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Achieve</h3>
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium mb-3">Nom de famille</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Entrez votre nom de famille ou code admin"
              />
            </div>
            {lastName.toLowerCase() !== 'admin1' && (
              <div>
                <label className="block text-lg font-medium mb-3">Code d'accès</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                  <input
                    type="password"
                    required
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Entrez votre code d'accès"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white text-lg py-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              Accéder à la plateforme
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}