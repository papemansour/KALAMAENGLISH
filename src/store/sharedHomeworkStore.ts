import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Document } from '../types/course';

interface SharedHomeworkStore {
  submissions: { [levelId: string]: Document[] };
  addSubmission: (levelId: string, document: Document) => void;
  deleteSubmission: (levelId: string, documentId: string) => void;
  getSubmissions: (levelId: string) => Document[];
}

export const useSharedHomeworkStore = create<SharedHomeworkStore>()(
  persist(
    (set, get) => ({
      submissions: {},
      addSubmission: (levelId: string, document: Document) => {
        set((state) => ({
          submissions: {
            ...state.submissions,
            [levelId]: [...(state.submissions[levelId] || []), document],
          },
        }));
      },
      deleteSubmission: (levelId: string, documentId: string) => {
        set((state) => ({
          submissions: {
            ...state.submissions,
            [levelId]: state.submissions[levelId]?.filter(doc => doc.id !== documentId) || [],
          },
        }));
      },
      getSubmissions: (levelId: string) => {
        return get().submissions[levelId] || [];
      },
    }),
    {
      name: 'shared-homework-storage',
      skipHydration: false,
    }
  )
);