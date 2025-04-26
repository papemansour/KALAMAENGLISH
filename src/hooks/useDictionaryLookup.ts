import { useState, useCallback, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useDictionaryLookup() {
  const [selectedWord, setSelectedWord] = useState('');
  const [menuPosition, setMenuPosition] = useState<Position>({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedText) {
      // Ensure the menu stays within viewport bounds
      const x = Math.min(e.pageX, window.innerWidth - 300);
      const y = Math.min(e.pageY, window.innerHeight - 100);

      setSelectedWord(selectedText);
      setMenuPosition({ x, y });
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [handleContextMenu]);

  const closeMenu = useCallback(() => {
    setShowMenu(false);
    setSelectedWord('');
  }, []);

  return {
    selectedWord,
    menuPosition,
    showMenu,
    closeMenu
  };
}