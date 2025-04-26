import React from 'react';
import { Home, Users, BookOpen, FileText, Settings, Library, UserX, MessageSquare, BookOpen as Homework, Trash2, TowerControl as GameController } from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'students', icon: Users, label: 'Étudiants' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'courses', icon: BookOpen, label: 'Cours' },
    { id: 'absences', icon: UserX, label: 'Absences' },
    { id: 'conversations', icon: MessageSquare, label: 'Conversations' },
    { id: 'homework', icon: Homework, label: 'Devoirs' },
    { id: 'games', icon: GameController, label: 'Games' },
    { id: 'library', icon: Library, label: 'ENCOLIB' },
    { id: 'trash', icon: Trash2, label: 'Corbeille' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-teal-50 text-teal-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}