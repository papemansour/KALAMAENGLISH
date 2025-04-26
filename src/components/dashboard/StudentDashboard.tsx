import React, { useState } from 'react';
import { Book, Calendar, Clock, FileText, Star, User, Video, MessageSquare, Upload, Download, Send, X, Trash2, TowerControl as GameController } from 'lucide-react';
import { useMessageStore } from '../../store/messageStore';
import { useSharedDocumentStore } from '../../store/sharedDocumentStore';
import { useTrashStore } from '../../store/trashStore';
import { StudentGames } from './StudentGames';
import { StudentTrash } from './StudentTrash';
import { toast } from 'react-hot-toast';

interface StudentDashboardProps {
  level: string;
}

export function StudentDashboard({ level }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('courses');
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);

  const { addMessage, getStudentMessages } = useMessageStore();
  const { getDocuments, deleteDocument } = useSharedDocumentStore();
  const { addToTrash } = useTrashStore();

  // Get student data from localStorage
  const students = JSON.parse(localStorage.getItem('students') || '[]');
  const currentStudent = students[0];
  const studentName = `${currentStudent?.firstName} ${currentStudent?.lastName}`;

  // Get shared documents for the current level
  const sharedDocuments = getDocuments(level);

  // Get messages for the current student
  const messages = getStudentMessages(studentName);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error('File size must be less than 2MB');
        return;
      }
      setSelectedFile(file);
      toast.success('File selected successfully');
    }
  };

  const handleHomeworkSubmit = () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Store homework submission in localStorage
      const submissions = JSON.parse(localStorage.getItem('homework_submissions') || '[]');
      submissions.push({
        id: Date.now(),
        fileName: selectedFile.name,
        fileUrl: reader.result,
        submittedAt: new Date().toLocaleString(),
        studentName: studentName,
        studentLevel: level
      });
      localStorage.setItem('homework_submissions', JSON.stringify(submissions));
      
      setSelectedFile(null);
      toast.success('Homework submitted successfully');
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      studentName,
      studentLevel: level,
      text: message,
      sentAt: new Date().toLocaleString(),
      isAdmin: false,
      read: false
    };

    addMessage(newMessage);
    setMessage('');
    toast.success('Message sent successfully');
  };

  const handleOpenDocument = (doc: any) => {
    setSelectedDocument(doc);
    setShowDocumentViewer(true);
  };

  const handleDeleteDocument = (doc: any) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      // Add to trash before deleting
      addToTrash({
        id: Date.now().toString(),
        originalLocation: level,
        itemType: 'document',
        data: doc,
        deletedAt: new Date().toLocaleString()
      });

      deleteDocument(level, doc.id);
      toast.success('Document moved to trash');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6">Online Course Access</h3>
              <div className="space-y-4">
                <p className="text-gray-600">Join your live class session:</p>
                <a
                  href="https://meet.google.com/oye-vjhu-xaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-fit"
                >
                  <Video size={20} />
                  Join Live Class
                </a>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6">Shared Documents</h3>
              <div className="space-y-4">
                {sharedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          Uploaded: {doc.uploadedAt}
                        </p>
                        {doc.size && (
                          <p className="text-sm text-gray-500">Size: {doc.size}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenDocument(doc)}
                        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = doc.url;
                          link.download = doc.name;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
                      >
                        <Download size={18} />
                        Download
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc)}
                        className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {sharedDocuments.length === 0 && (
                  <p className="text-center text-gray-500">No documents shared yet</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'absences':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6">My Absences</h3>
              <div className="space-y-4">
                {JSON.parse(localStorage.getItem('absences') || '[]')
                  .filter((absence: any) => absence.studentName === studentName)
                  .map((absence: any) => (
                    <div key={absence.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-red-500" size={20} />
                        <span className="font-medium">{absence.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-gray-600">
                        <Clock size={16} />
                        <span>{absence.time}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case 'homework':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6">Submit Homework</h3>
              <div className="space-y-4">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
                {selectedFile && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText size={16} />
                    <span>{selectedFile.name}</span>
                  </div>
                )}
                <button
                  onClick={handleHomeworkSubmit}
                  disabled={!selectedFile}
                  className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload size={20} />
                  Submit Homework
                </button>
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6">Messages</h3>
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col gap-1 ${msg.isAdmin ? 'items-start' : 'items-end'}`}>
                      <p className="text-sm text-gray-500">{msg.sentAt}</p>
                      <div className={`p-3 rounded-lg max-w-[80%] ${
                        msg.isAdmin ? 'bg-blue-50' : 'bg-teal-50'
                      }`}>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                  >
                    <Send size={20} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'games':
        return <StudentGames level={level} />;

      case 'trash':
        return <StudentTrash level={level} />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {currentStudent?.firstName}!</h2>
            <p className="text-teal-100">Level: {level}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b overflow-x-auto pb-2">
        {[
          { id: 'courses', label: 'Mes cours', icon: Book },
          { id: 'documents', label: 'Mes documents', icon: FileText },
          { id: 'absences', label: 'Mes absences', icon: Calendar },
          { id: 'homework', label: 'Mes devoirs', icon: Star },
          { id: 'games', label: 'Mes jeux', icon: GameController },
          { id: 'messages', label: 'Mes messages', icon: MessageSquare },
          { id: 'trash', label: 'Corbeille', icon: Trash2 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-teal-600'
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {renderContent()}

      {/* Document Viewer Modal */}
      {showDocumentViewer && selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">{selectedDocument.name}</h3>
              <button
                onClick={() => setShowDocumentViewer(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={selectedDocument.url}
                className="w-full h-full rounded border"
                title={selectedDocument.name}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}