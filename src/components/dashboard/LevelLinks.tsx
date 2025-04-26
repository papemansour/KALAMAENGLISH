import React, { useState } from 'react';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Link {
  id: string;
  title: string;
  url: string;
  platform: string;
  addedAt: string;
}

interface LevelLinksProps {
  levelId: string;
}

export function LevelLinks({ levelId }: LevelLinksProps) {
  const [links, setLinks] = useState<Link[]>(() => {
    const savedLinks = localStorage.getItem(`level_${levelId}_links`);
    return savedLinks ? JSON.parse(savedLinks) : [];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    platform: ''
  });

  const saveLinks = (updatedLinks: Link[]) => {
    localStorage.setItem(`level_${levelId}_links`, JSON.stringify(updatedLinks));
    setLinks(updatedLinks);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      new URL(newLink.url);
    } catch {
      toast.error('URL invalide');
      return;
    }

    const link: Link = {
      id: Date.now().toString(),
      ...newLink,
      addedAt: new Date().toLocaleString()
    };

    saveLinks([...links, link]);
    setNewLink({ title: '', url: '', platform: '' });
    setShowAddForm(false);
    toast.success('Lien ajouté avec succès');
  };

  const handleDeleteLink = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
      const updatedLinks = links.filter(link => link.id !== id);
      saveLinks(updatedLinks);
      toast.success('Lien supprimé');
    }
  };

  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Liens externes</h4>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700"
        >
          <Plus size={20} />
          Ajouter un lien
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddLink} className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input
                type="text"
                required
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Titre du lien"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                type="url"
                required
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Plateforme</label>
              <select
                required
                value={newLink.platform}
                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Sélectionner une plateforme</option>
                <option value="YouTube">YouTube</option>
                <option value="Google">Google</option>
                <option value="Kahoot">Kahoot</option>
                <option value="Quizlet">Quizlet</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
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
                Ajouter
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div>
              <h5 className="font-medium">{link.title}</h5>
              <p className="text-sm text-gray-500">
                {link.platform} • Ajouté le {link.addedAt}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-teal-600 hover:bg-teal-50 rounded-full"
                title="Ouvrir dans un nouvel onglet"
              >
                <ExternalLink size={18} />
              </a>
              <button
                onClick={() => handleDeleteLink(link.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                title="Supprimer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {links.length === 0 && (
          <p className="text-gray-500 text-center py-4">Aucun lien partagé pour le moment</p>
        )}
      </div>
    </div>
  );
}