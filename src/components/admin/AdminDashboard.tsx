import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminStudents } from './AdminStudents';
import { AdminDocuments } from './AdminDocuments';
import { AdminCourses } from './AdminCourses';
import { AdminLibrary } from './AdminLibrary';
import { AdminSettings } from './AdminSettings';
import { AdminAbsences } from './AdminAbsences';
import { AdminConversations } from './AdminConversations';
import { AdminHomework } from './AdminHomework';
import { AdminTrash } from './AdminTrash';
import { AdminGames } from './AdminGames';

export function AdminDashboard() {
  const { logout } = useAdminStore();
  const [activeSection, setActiveSection] = useState('students');

  const renderSection = () => {
    switch (activeSection) {
      case 'students':
        return <AdminStudents />;
      case 'documents':
        return <AdminDocuments />;
      case 'courses':
        return <AdminCourses />;
      case 'absences':
        return <AdminAbsences />;
      case 'conversations':
        return <AdminConversations />;
      case 'homework':
        return <AdminHomework />;
      case 'library':
        return <AdminLibrary />;
      case 'games':
        return <AdminGames />;
      case 'trash':
        return <AdminTrash />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminStudents />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={logout} />
      <div className="flex">
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}