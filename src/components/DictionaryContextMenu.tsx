import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface DictionaryContextMenuProps {
  word: string;
  position: Position;
  onClose: () => void;
}

export function DictionaryContextMenu({ word, position, onClose }: DictionaryContextMenuProps) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById('dictionary-context-menu');
      if (menu && !menu.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  const handleLookup = () => {
    window.open(`https://www.wordreference.com/enfr/${encodeURIComponent(word.trim())}`, '_blank');
    onClose();
  };

  return (
    <div
      id="dictionary-context-menu"
      className="fixed bg-white rounded-lg shadow-xl border z-50 py-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <button
        onClick={handleLookup}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
      >
        <Search size={16} className="text-teal-600" />
        <span>Rechercher "{word}" dans le dictionnaire</span>
      </button>
    </div>
  );
}