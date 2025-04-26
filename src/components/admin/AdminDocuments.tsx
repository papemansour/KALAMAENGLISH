import React, { useState } from 'react';
import { FileText, ExternalLink, Trash2, Calendar, Upload } from 'lucide-react';
import { useSharedDocumentStore } from '../../store/sharedDocumentStore';
import { toast } from 'react-hot-toast';
import { formatFileSize } from '../../utils/formatters';

interface AdminDocumentsProps {
  levelId?: string;
  levelName?: string;
}

export function AdminDocuments({ levelId, levelName }: AdminDocumentsProps) {
  const { getDocuments, deleteDocument, addDocument, getDocumentCount } = useSharedDocumentStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(levelId || '');

  const documents = selectedLevel ? getDocuments(selectedLevel) : [];

  // Get levels from student safe space
  const levels = [
    { id: 'DÉBUTANT', name: 'DÉBUTANT' },
    { id: 'INTERMÉDIAIRE', name: 'INTERMÉDIAIRE' },
    { id: 'AVANCÉ', name: 'AVANCÉ' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error('File size must be less than 2MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    if (!selectedLevel) {
      toast.error('Please select a level');
      return;
    }

    const currentCount = getDocumentCount(selectedLevel);
    if (currentCount >= 20) {
      toast.error('Maximum number of documents reached for this level. Please delete some documents before uploading new ones.');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const newDocument = {
          id: Math.random().toString(36).substr(2, 9),
          name: selectedFile.name,
          url: reader.result as string,
          uploadedAt: new Date().toLocaleString(),
          size: formatFileSize(selectedFile.size),
          type: selectedFile.type,
          isShared: true
        };

        const success = addDocument(selectedLevel, newDocument);
        if (success) {
          toast.success('Document uploaded successfully');
          setSelectedFile(null);
        } else {
          toast.error('Storage limit reached. Please delete some older documents before uploading new ones.');
        }
        setIsUploading(false);
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
      setIsUploading(false);
    }
  };

  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold">Student Documents {levelName ? `- ${levelName}` : ''}</h4>
          <p className="text-sm text-gray-500">
            {documents.length}/20 documents stored
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading || !selectedLevel}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={16} />
              {isUploading ? 'Uploading...' : 'Share'}
            </button>
          </div>
        </div>
      </div>

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
                  <span>Uploaded: {doc.uploadedAt}</span>
                </div>
                {doc.size && (
                  <p className="text-sm text-gray-500">Size: {doc.size}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(doc.url, '_blank')}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={18} />
              </button>
              <button
                onClick={() => {
                  deleteDocument(selectedLevel, doc.id);
                  toast.success('Document deleted successfully');
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-gray-500 text-center py-4">No documents shared yet</p>
        )}
      </div>
    </div>
  );
}