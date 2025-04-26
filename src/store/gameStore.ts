import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Game {
  id: string;
  levelId: string;
  title: string;
  type: 'kahoot' | 'flashcard';
  url: string;
  description: string;
  addedAt: string;
}

interface GameStore {
  games: Game[];
  addGame: (game: Game) => void;
  deleteGame: (gameId: string) => void;
  getGames: (levelId: string) => Game[];
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      games: [],
      addGame: (game: Game) => {
        set((state) => ({
          games: [...state.games, game]
        }));
      },
      deleteGame: (gameId: string) => {
        set((state) => ({
          games: state.games.filter(game => game.id !== gameId)
        }));
      },
      getGames: (levelId: string) => {
        return get().games.filter(game => game.levelId === levelId);
      }
    }),
    {
      name: 'game-store'
    }
  )
);