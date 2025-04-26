import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Document } from '../types/course';
import { compress, decompress } from 'lz-string';

const MAX_DOCUMENTS_PER_LEVEL = 20;
const MAX_STORAGE_SIZE = 4.5 * 1024 * 1024; // 4.5MB safety limit (localStorage typically has 5MB)

interface SharedDocumentStore {
  documents: { [levelId: string]: Document[] };
  addDocument: (levelId: string, document: Document) => boolean;
  deleteDocument: (levelId: string, documentId: string) => void;
  getDocuments: (levelId: string) => Document[];
  getDocumentCount: (levelId: string) => number;
  cleanupStorage: () => void;
}

const compressData = (data: string): string => {
  return compress(data);
};

const decompressData = (data: string): string => {
  return decompress(data) || '';
};

export const useSharedDocumentStore = create<SharedDocumentStore>()(
  persist(
    (set, get) => ({
      documents: {},
      addDocument: (levelId: string, document: Document) => {
        const currentDocs = get().documents[levelId] || [];
        if (currentDocs.length >= MAX_DOCUMENTS_PER_LEVEL) {
          return false;
        }

        // Compress the document URL (base64 data)
        const compressedDoc = {
          ...document,
          url: compressData(document.url)
        };

        // Calculate approximate size after adding new document
        const newState = {
          ...get().documents,
          [levelId]: [...currentDocs, compressedDoc]
        };
        
        const stateStr = JSON.stringify(newState);
        if (stateStr.length > MAX_STORAGE_SIZE) {
          // If adding this document would exceed our limit, cleanup old documents
          get().cleanupStorage();
          
          // Try again with cleaned up storage
          const updatedDocs = get().documents[levelId] || [];
          if (updatedDocs.length >= MAX_DOCUMENTS_PER_LEVEL) {
            return false;
          }
        }
        
        set((state) => ({
          documents: {
            ...state.documents,
            [levelId]: [...(state.documents[levelId] || []), compressedDoc],
          },
        }));
        return true;
      },
      deleteDocument: (levelId: string, documentId: string) => {
        set((state) => ({
          documents: {
            ...state.documents,
            [levelId]: state.documents[levelId]?.filter(doc => doc.id !== documentId) || [],
          },
        }));
      },
      getDocuments: (levelId: string) => {
        const docs = get().documents[levelId] || [];
        // Decompress URLs when retrieving documents
        return docs.map(doc => ({
          ...doc,
          url: decompressData(doc.url)
        }));
      },
      getDocumentCount: (levelId: string) => {
        return get().documents[levelId]?.length || 0;
      },
      cleanupStorage: () => {
        set((state) => {
          const newDocs: { [levelId: string]: Document[] } = {};
          
          // For each level, keep only the 10 most recent documents
          Object.entries(state.documents).forEach(([levelId, docs]) => {
            newDocs[levelId] = docs
              .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
              .slice(0, 10);
          });
          
          return { documents: newDocs };
        });
      },
    }),
    {
      name: 'shared-document-storage',
      skipHydration: false,
    }
  )
);