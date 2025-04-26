import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { useSharedDocumentStore } from '../../store/sharedDocumentStore';

interface SharedDocumentsProps {
  levelId: string;
}

export function SharedDocuments({ levelId }: SharedDocumentsProps) {
  const { getDocuments } = useSharedDocumentStore();
  const documents = getDocuments(levelId);

  if (documents.length === 0) {
    return null;
  }

  const handleDownload = (doc: any) => {
    const link = window.document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  return (
    <div className="border-t pt-4">
      <h4 className="font-semibold mb-4">Shared Documents</h4>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" />
              <div>
                <h5 className="font-medium">{doc.name}</h5>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>Shared: {doc.uploadedAt}</span>
                </div>
                {doc.size && (
                  <p className="text-sm text-gray-500">Size: {doc.size}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDownload(doc)}
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-full transition-colors"
            >
              <Download size={18} />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}