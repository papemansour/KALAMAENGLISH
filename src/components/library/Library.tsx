import React, { useState } from 'react';
import { Book, Search, Lock, BookOpen, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { levels } from '../../data/courses';
import { BookList } from './BookList';
import { Dictionary } from './Dictionary';

export function Library() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleUnlock = () => {
    if (accessCode === 'digi') {
      setIsUnlocked(true);
      setAccessCode('');
      toast.success('Bibliothèque déverrouillée !');
    } else {
      toast.error('Code d\'accès invalide');
    }
  };

  const handleLogout = () => {
    setIsUnlocked(false);
    setSelectedLevel(null);
    setSearchQuery('');
    toast.success('Déconnexion réussie');
  };

  if (!isUnlocked) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-teal-50 rounded-full mb-4">
                <BookOpen className="w-12 h-12 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">KALAMATHÈQUE</h2>
              <p className="text-gray-600">
                Accédez à notre bibliothèque numérique pour enrichir votre apprentissage
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Entrez le code d'accès"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleUnlock}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Accéder à la bibliothèque
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">KALAMATHÈQUE - Bibliothèque Numérique</h2>
            <p className="text-gray-600">Explorez notre collection de ressources pédagogiques</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un document..."
                className="w-full md:w-80 pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Quitter KALAMATHÈQUE"
            >
              <LogOut size={20} />
              <span className="hidden md:inline">Quitter</span>
            </button>
          </div>
        </div>

        <Dictionary />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedLevel === level.id
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-600'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Book className={`w-6 h-6 ${selectedLevel === level.id ? 'text-teal-600' : 'text-gray-400'}`} />
                <h3 className="text-xl font-bold">{level.name}</h3>
              </div>
              <p className="text-gray-600 text-sm">{level.description}</p>
            </button>
          ))}
        </div>

        <BookList 
          levelId={selectedLevel} 
          searchQuery={searchQuery}
        />
      </div>
    </section>
  );
}