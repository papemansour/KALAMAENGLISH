import React from 'react';
import { Trash2, RefreshCw, FileText } from 'lucide-react';
import { useTrashStore } from '../../store/trashStore';
import { useSharedDocumentStore } from '../../store/sharedDocumentStore';
import { toast } from 'react-hot-toast';

interface StudentTrashProps {
  level: string;
}

export function StudentTrash({ level }: StudentTrashProps) {
  const { items, restoreItem, deleteItemPermanently } = useTrashStore();
  const { addDocument } = useSharedDocumentStore();

  // Filter items for current level
  const levelItems = items.filter(item => item.originalLocation === level);

  const handleRestore = (itemId: string) => {
    const item = restoreItem(itemId);
    if (item) {
      if (item.itemType === 'document') {
        const success = addDocument(item.originalLocation, item.data);
        if (success) {
          toast.success('Document restored successfully');
        } else {
          toast.error('Failed to restore document. Storage limit reached.');
        }
      }
    }
  };

  const handlePermanentDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this item? This action cannot be undone.')) {
      deleteItemPermanently(itemId);
      toast.success('Item permanently deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Corbeille</h3>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
            {levelItems.length} éléments
          </span>
        </div>

        <div className="space-y-4">
          {levelItems.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-gray-400" />
                  <div>
                    <h4 className="font-medium">{item.data.name}</h4>
                    <p className="text-sm text-gray-500">
                      Supprimé le {new Date(item.deletedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRestore(item.id)}
                    className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg"
                  >
                    <RefreshCw size={18} />
                    Restaurer
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(item.id)}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                    Supprimer définitivement
                  </button>
                </div>
              </div>
            </div>
          ))}
          {levelItems.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <Trash2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>La corbeille est vide</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}