import React, { useState } from 'react';
import { TowerControl as GameController, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useGameStore, Game } from '../../store/gameStore';
import { toast } from 'react-hot-toast';

export function AdminGames() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [gameInfo, setGameInfo] = useState({
    title: '',
    type: 'kahoot',
    url: '',
    description: ''
  });

  const { addGame, deleteGame, getGames } = useGameStore();
  const games = selectedLevel ? getGames(selectedLevel) : [];

  const levels = [
    { id: 'DÉBUTANT', name: 'DÉBUTANT' },
    { id: 'INTERMÉDIAIRE', name: 'INTERMÉDIAIRE' },
    { id: 'AVANCÉ', name: 'AVANCÉ' }
  ];

  const handleAddGame = () => {
    if (!gameInfo.title || !gameInfo.url || !selectedLevel) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      new URL(gameInfo.url);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    const newGame: Game = {
      id: Date.now().toString(),
      levelId: selectedLevel,
      title: gameInfo.title,
      type: gameInfo.type as 'kahoot' | 'flashcard',
      url: gameInfo.url,
      description: gameInfo.description,
      addedAt: new Date().toLocaleString()
    };

    addGame(newGame);
    setGameInfo({ title: '', type: 'kahoot', url: '', description: '' });
    setShowAddForm(false);
    toast.success('Game added successfully');
  };

  const handleDeleteGame = (gameId: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      deleteGame(gameId);
      toast.success('Game deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Games Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          <Plus size={20} />
          Add New Game
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Level</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select a level</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        {showAddForm && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Game</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={gameInfo.title}
                  onChange={(e) => setGameInfo({ ...gameInfo, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter game title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={gameInfo.type}
                  onChange={(e) => setGameInfo({ ...gameInfo, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="kahoot">Kahoot</option>
                  <option value="flashcard">Flashcard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="url"
                  value={gameInfo.url}
                  onChange={(e) => setGameInfo({ ...gameInfo, url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter game URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={gameInfo.description}
                  onChange={(e) => setGameInfo({ ...gameInfo, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Enter game description"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGame}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Add Game
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <GameController className="text-teal-600" />
                  <h4 className="font-medium">{game.title}</h4>
                  <span className="text-sm text-gray-500">({game.type})</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{game.description}</p>
                <p className="text-xs text-gray-500 mt-1">Added: {game.addedAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="Open game"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={() => handleDeleteGame(game.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  title="Delete game"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {selectedLevel && games.length === 0 && (
            <p className="text-center text-gray-500 py-4">No games added for this level yet</p>
          )}
        </div>
      </div>
    </div>
  );
}