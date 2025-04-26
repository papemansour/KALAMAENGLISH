import React, { useState } from 'react';
import { Upload, Book as BookIcon, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useLibraryStore, Book } from '../../store/libraryStore';
import { formatFileSize } from '../../utils/formatters';
import { levels } from '../../data/courses';

export function AdminLibrary() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');

  const { addBook, deleteBook, getBooks } = useLibraryStore();
  const books = selectedLevel ? getBooks(selectedLevel) : [];

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Veuillez sélectionner un fichier PDF');
      return;
    }

    if (!selectedLevel) {
      toast.error('Veuillez sélectionner un niveau');
      return;
    }

    if (!title) {
      toast.error('Le titre est requis');
      return;
    }

    if (!selectedFile.type.includes('pdf')) {
      toast.error('Seuls les fichiers PDF sont acceptés');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newBook: Book = {
        id: Math.random().toString(36).substr(2, 9),
        levelId: selectedLevel,
        title: title,
        author: 'KALAMA ENGLISH',
        description: '',
        fileUrl: reader.result as string,
        uploadedAt: new Date().toLocaleString(),
        fileSize: formatFileSize(selectedFile.size),
      };

      addBook(selectedLevel, newBook);
      toast.success('Document ajouté avec succès à la KALAMATHÈQUE');
      setSelectedFile(null);
      setTitle('');
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Gestion de la KALAMATHÈQUE</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelectedLevel(level.id)}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedLevel === level.id
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-200 hover:border-teal-600'
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{level.name}</h3>
            <p className="text-gray-600">{level.description}</p>
          </button>
        ))}
      </div>

      {selectedLevel && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Ajouter un nouveau document</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du document
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Entrez le titre du document"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fichier PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={!selectedFile || !title}
                className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={20} />
                Envoyer
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              Documents disponibles ({books.length})
            </h3>
            <div className="grid gap-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <BookIcon className="text-teal-600" size={20} />
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-xs text-gray-500">
                        Ajouté le {book.uploadedAt} • {book.fileSize}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      deleteBook(selectedLevel, book.id);
                      toast.success('Document supprimé avec succès');
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {books.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Aucun document disponible pour ce niveau
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}