import React from 'react';
import { TowerControl as GameController, ExternalLink } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

interface StudentGamesProps {
  level: string;
}

export function StudentGames({ level }: StudentGamesProps) {
  const { getGames } = useGameStore();
  const games = getGames(level);

  if (games.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <GameController className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No games available for your level yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Interactive Games</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game) => (
          <div key={game.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <GameController className="text-teal-600" />
              <h4 className="font-medium">{game.title}</h4>
              <span className="text-sm text-gray-500">({game.type})</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{game.description}</p>
            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ExternalLink size={18} />
              Play Game
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}