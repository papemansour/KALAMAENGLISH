import React, { useState, useEffect } from 'react';
import { Moon, Sun, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Settings {
  theme: 'light' | 'dark';
  language: string;
  fontSize: string;
}

export function AdminSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('admin_settings');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      language: 'fr',
      fontSize: 'medium'
    };
  });

  const [deletedItems, setDeletedItems] = useState<any[]>(() => {
    const saved = localStorage.getItem('deleted_items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('admin_settings', JSON.stringify(settings));
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px'
    }[settings.fontSize] || '16px';
  }, [settings]);

  const handleThemeChange = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
    toast.success('Thème mis à jour');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
    toast.success('Langue mise à jour');
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({
      ...prev,
      fontSize: e.target.value
    }));
    toast.success('Taille de police mise à jour');
  };

  const handleRestore = (item: any) => {
    // Restore the item to its original location
    const updatedDeletedItems = deletedItems.filter(i => i.id !== item.id);
    setDeletedItems(updatedDeletedItems);
    localStorage.setItem('deleted_items', JSON.stringify(updatedDeletedItems));
    toast.success('Élément restauré avec succès');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Apparence</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={handleThemeChange}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {settings.theme === 'light' ? (
                  <>
                    <Sun size={20} />
                    <span>Thème clair</span>
                  </>
                ) : (
                  <>
                    <Moon size={20} />
                    <span>Thème sombre</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Langue</h3>
            <select
              value={settings.language}
              onChange={handleLanguageChange}
              className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Taille du texte</h3>
            <select
              value={settings.fontSize}
              onChange={handleFontSizeChange}
              className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="small">Petite</option>
              <option value="medium">Moyenne</option>
              <option value="large">Grande</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Corbeille</h2>
        <div className="space-y-4">
          {deletedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">La corbeille est vide</p>
          ) : (
            deletedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Supprimé le {new Date(item.deletedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleRestore(item)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Restaurer
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}