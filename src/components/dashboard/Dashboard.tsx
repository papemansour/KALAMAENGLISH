import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { levels } from '../../data/courses';
import { LevelAccess } from './LevelAccess';
import { Toaster } from 'react-hot-toast';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-white py-8">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="space-y-8">
          {levels.map((level) => (
            <LevelAccess key={level.id} level={level} />
          ))}
        </div>
      </div>
    </div>
  );
}