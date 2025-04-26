import React from 'react';
import { Book, Download, ExternalLink, FileText } from 'lucide-react';
import { useLibraryStore } from '../../store/libraryStore';

interface BookListProps {
  levelId: string | null;
  searchQuery: string;
}

export function BookList({ levelId, searchQuery }: BookListProps) {
  const { getBooks } = useLibraryStore();
  const books = levelId ? getBooks(levelId) : [];

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!levelId) {
    return (
      <div className="text-center py-12">
        <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Sélectionnez un niveau pour voir les documents disponibles</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Aucun document disponible pour ce niveau</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredBooks.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-teal-50 rounded-lg">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-1 truncate" title={book.title}>
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                <div className="flex items-center text-xs text-gray-400 mb-4">
                  <span>{book.fileSize}</span>
                  <span className="mx-2">•</span>
                  <span>PDF</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <a
                href={book.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors"
              >
                <ExternalLink size={16} />
                <span>Lire</span>
              </a>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = book.fileUrl;
                  link.download = `${book.title}.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download size={16} />
                <span>Télécharger</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}