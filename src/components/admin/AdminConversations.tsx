import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Clock } from 'lucide-react';
import { useMessageStore } from '../../store/messageStore';
import { toast } from 'react-hot-toast';

export function AdminConversations() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const { messages, addMessage, markAsRead } = useMessageStore();

  // Group messages by student
  const conversationsByStudent = messages.reduce((acc: { [key: string]: any[] }, message) => {
    if (!acc[message.studentName]) {
      acc[message.studentName] = [];
    }
    acc[message.studentName].push(message);
    return acc;
  }, {});

  useEffect(() => {
    if (selectedStudent) {
      // Mark all messages from selected student as read
      messages
        .filter(msg => msg.studentName === selectedStudent && !msg.read)
        .forEach(msg => markAsRead(msg.id));
    }
  }, [selectedStudent, messages]);

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedStudent) return;

    const studentMessages = conversationsByStudent[selectedStudent];
    const studentLevel = studentMessages[0].studentLevel;

    const reply = {
      id: Date.now().toString(),
      studentName: selectedStudent,
      studentLevel,
      text: replyText,
      sentAt: new Date().toLocaleString(),
      isAdmin: true,
      read: false
    };

    addMessage(reply);
    setReplyText('');
    toast.success('Reply sent');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-3 h-full">
        {/* Conversations List */}
        <div className="border-r">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Conversations</h3>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {Object.entries(conversationsByStudent).map(([studentName, studentMessages]) => {
              const unreadCount = studentMessages.filter(m => !m.isAdmin && !m.read).length;
              const lastMessage = studentMessages[studentMessages.length - 1];
              
              return (
                <button
                  key={studentName}
                  onClick={() => setSelectedStudent(studentName)}
                  className={`w-full p-4 text-left hover:bg-gray-50 border-b ${
                    selectedStudent === studentName ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="font-medium">{studentName}</h4>
                      <p className="text-sm text-gray-500">{lastMessage.studentLevel}</p>
                    </div>
                    {unreadCount > 0 && (
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{lastMessage.sentAt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation Messages */}
        <div className="col-span-2 flex flex-col">
          {selectedStudent ? (
            <>
              <div className="p-4 border-b">
                <h3 className="font-semibold">{selectedStudent}</h3>
                <p className="text-sm text-gray-500">
                  Level: {conversationsByStudent[selectedStudent][0].studentLevel}
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationsByStudent[selectedStudent].map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isAdmin
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p className="mb-1">{message.text}</p>
                      <div className="text-xs mt-1 opacity-75">
                        {message.sentAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSendReply();
                    }}
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                <p>Select a conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}