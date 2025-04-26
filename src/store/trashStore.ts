import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TrashItem {
  id: string;
  originalLocation: string;
  itemType: 'document' | 'homework';
  data: any;
  deletedAt: string;
}

interface TrashStore {
  items: TrashItem[];
  addToTrash: (item: TrashItem) => void;
  restoreItem: (itemId: string) => TrashItem | null;
  deleteItemPermanently: (itemId: string) => void;
  getItems: () => TrashItem[];
}

export const useTrashStore = create<TrashStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToTrash: (item: TrashItem) => {
        set((state) => ({
          items: [...state.items, item]
        }));
      },
      restoreItem: (itemId: string) => {
        const item = get().items.find(i => i.id === itemId);
        if (item) {
          set((state) => ({
            items: state.items.filter(i => i.id !== itemId)
          }));
          return item;
        }
        return null;
      },
      deleteItemPermanently: (itemId: string) => {
        set((state) => ({
          items: state.items.filter(i => i.id !== itemId)
        }));
      },
      getItems: () => get().items
    }),
    {
      name: 'trash-store'
    }
  )
);