import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

export function Dictionary() {
  const [word, setWord] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (word.trim()) {
      window.open(`https://www.wordreference.com/enfr/${encodeURIComponent(word.trim())}`, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-50 rounded-lg">
          <ExternalLink className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Dictionnaire en ligne</h3>
          <p className="text-gray-600">Recherchez la traduction et la définition des mots</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Entrez un mot en anglais..."
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
        >
          <Search size={20} />
          Rechercher
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        Propulsé par{' '}
        <a
          href="https://www.wordreference.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:underline"
        >
          WordReference
        </a>
      </div>
    </div>
  );
}