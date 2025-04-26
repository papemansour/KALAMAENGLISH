import React, { useState } from 'react';
import { BookCheck, ArrowRight, GraduationCap, Users, Star, Lock, User, LogOut } from 'lucide-react';
import { BeginnerTest } from './tests/BeginnerTest';
import { IntermediateTest } from './tests/IntermediateTest';
import { AdvancedTest } from './tests/AdvancedTest';
import { StudentDashboard } from './dashboard/StudentDashboard';
import { toast } from 'react-hot-toast';

export function TestYourLevel() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showStudentSpace, setShowStudentSpace] = useState(false);
  const [selectedStudentLevel, setSelectedStudentLevel] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
  };

  const handleStudentLogin = () => {
    const registeredStudents = JSON.parse(localStorage.getItem('students') || '[]');
    const student = registeredStudents.find((s: any) => 
      s.lastName.toLowerCase() === lastName.toLowerCase()
    );

    if (!student) {
      toast.error('Étudiant non trouvé. Veuillez vous inscrire d\'abord.');
      const registrationSection = document.getElementById('registration');
      if (registrationSection) {
        registrationSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (accessCode !== 'kalamago') {
      toast.error('Code d\'accès invalide');
      return;
    }

    setIsAuthenticated(true);
    toast.success(`Bienvenue ${student.firstName} ${student.lastName}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedStudentLevel(null);
    setAccessCode('');
    setLastName('');
    toast.success('Déconnexion réussie');
  };

  const handleStudentSpaceAccess = (level: string) => {
    const codes = {
      'DÉBUTANT': 'DEB1',
      'INTERMÉDIAIRE': 'INT1',
      'AVANCÉ': 'ADV1'
    };

    if (accessCode === codes[level as keyof typeof codes]) {
      setSelectedStudentLevel(level);
      setAccessCode('');
      toast.success(`Bienvenue dans l'espace ${level}`);
    } else {
      toast.error('Code d\'accès invalide');
    }
  };

  if (selectedLevel) {
    const TestComponent = {
      beginner: BeginnerTest,
      intermediate: IntermediateTest,
      advanced: AdvancedTest
    }[selectedLevel];

    return (
      <section id="test-your-level" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <TestComponent onBack={() => setSelectedLevel(null)} />
        </div>
      </section>
    );
  }

  if (selectedStudentLevel) {
    return (
      <section className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                setSelectedStudentLevel(null);
                toast.success('Retour à la sélection du niveau');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut size={20} />
              <span>Quitter l'espace</span>
            </button>
          </div>
          <StudentDashboard level={selectedStudentLevel} />
        </div>
      </section>
    );
  }

  return (
    <section id="test-your-level" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Évaluez votre niveau d'anglais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookCheck className="w-8 h-8 text-teal-600" />
                <h3 className="text-xl font-bold">Débutant</h3>
              </div>
              <p className="text-gray-600 mb-6">Parfait pour ceux qui débutent leur apprentissage de l'anglais. Testez vos connaissances de base.</p>
              <button
                onClick={() => handleLevelSelect('beginner')}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition duration-300"
              >
                Commencer le test
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookCheck className="w-8 h-8 text-teal-600" />
                <h3 className="text-xl font-bold">Intermédiaire</h3>
              </div>
              <p className="text-gray-600 mb-6">Pour ceux qui ont déjà une bonne base en anglais. Évaluez votre progression.</p>
              <button
                onClick={() => handleLevelSelect('intermediate')}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition duration-300"
              >
                Commencer le test
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookCheck className="w-8 h-8 text-teal-600" />
                <h3 className="text-xl font-bold">Avancé</h3>
              </div>
              <p className="text-gray-600 mb-6">Pour les utilisateurs expérimentés. Testez votre maîtrise des concepts complexes.</p>
              <button
                onClick={() => handleLevelSelect('advanced')}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition duration-300"
              >
                Commencer le test
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Student Safe Space - Centered */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">Student Safe Space</h2>
          </div>
          
          {!isAuthenticated ? (
            <div className="p-8">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-teal-600" />
                </div>
              </div>
              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Entrez votre nom de famille"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Code d'accès
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                    <input
                      type="password"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Entrez votre code d'accès"
                    />
                  </div>
                </div>
                <button
                  onClick={handleStudentLogin}
                  className="w-full bg-teal-600 text-white text-lg py-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <GraduationCap size={24} />
                  Accéder à la plateforme
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['DÉBUTANT', 'INTERMÉDIAIRE', 'AVANCÉ'].map((level) => (
                  <div key={level} className="bg-white rounded-lg shadow-md overflow-hidden border-2 hover:border-teal-500 transition-colors">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <GraduationCap className="w-8 h-8 text-teal-600" />
                        <h3 className="text-xl font-bold">{level}</h3>
                      </div>
                      {selectedStudentLevel === level ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-teal-600" />
                            <span>Cours en ligne</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Lock className="w-5 h-5" />
                            <span>Accès sécurisé</span>
                          </div>
                          <input
                            type="password"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Code d'accès"
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                          />
                          <button
                            onClick={() => handleStudentSpaceAccess(level)}
                            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors"
                          >
                            Accéder
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}