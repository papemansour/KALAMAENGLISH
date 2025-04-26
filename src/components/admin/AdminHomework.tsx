import React, { useState } from 'react';
import { FileText, Download, Calendar, User, BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Homework {
  id: string;
  studentName: string;
  studentLevel: string;
  fileName: string;
  submittedAt: string;
  fileUrl: string;
}

export function AdminHomework() {
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  // Get homework submissions from localStorage
  const submissions = JSON.parse(localStorage.getItem('homework_submissions') || '[]');

  const handleOpenHomework = (homework: Homework) => {
    setSelectedHomework(homework);
    setShowViewer(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Devoirs des étudiants</h2>
        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
          {submissions.length} devoirs
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="divide-y">
          {submissions.map((submission: Homework) => (
            <div key={submission.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <User className="text-gray-400" />
                    <h4 className="font-medium">{submission.studentName}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{submission.studentLevel}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{submission.submittedAt}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>{submission.fileName}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenHomework(submission)}
                    className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg"
                  >
                    Ouvrir
                  </button>
                  <a
                    href={submission.fileUrl}
                    download={submission.fileName}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
                  >
                    <Download size={18} />
                    Télécharger
                  </a>
                </div>
              </div>
            </div>
          ))}
          {submissions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Aucun devoir soumis</p>
            </div>
          )}
        </div>
      </div>

      {showViewer && selectedHomework && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedHomework.fileName}</h3>
                <p className="text-sm text-gray-500">
                  Soumis par {selectedHomework.studentName} - {selectedHomework.studentLevel}
                </p>
              </div>
              <button
                onClick={() => setShowViewer(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Fermer
              </button>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={selectedHomework.fileUrl}
                className="w-full h-full rounded border"
                title={selectedHomework.fileName}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}