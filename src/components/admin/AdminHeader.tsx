import React, { useState } from 'react';
import { GraduationCap, Bell, Settings, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminHeaderProps {
  onLogout: () => void;
}

interface Message {
  id: string;
  level: string;
  text: string;
  file?: {
    name: string;
    size: string;
  };
  sentAt: string;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const messages: Message[] = JSON.parse(localStorage.getItem('admin_messages') || '[]');
  const unreadMessages = messages.filter(msg => !msg.read);

  const handleMessageRead = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    localStorage.setItem('admin_messages', JSON.stringify(updatedMessages));
    setShowNotifications(false);
  };

  return (
    <header className="bg-white border-b">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-teal-600" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadMessages.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadMessages.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`p-4 border-b hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''}`}
                        onClick={() => handleMessageRead(message.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Message from {message.level}</p>
                            <p className="text-gray-600 mt-1">{message.text}</p>
                            {message.file && (
                              <div className="mt-2 text-sm text-gray-500">
                                📎 {message.file.name} ({message.file.size})
                              </div>
                            )}
                            <p className="text-xs text-gray-400 mt-2">{message.sentAt}</p>
                          </div>
                          {!message.read && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No new messages
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}