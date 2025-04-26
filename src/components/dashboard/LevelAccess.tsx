import React, { useState } from 'react';
import { Level } from '../../types/course';
import { StudentDashboard } from './StudentDashboard';
import { Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface LevelAccessProps {
  level: Level;
}

export function LevelAccess({ level }: LevelAccessProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  const handleUnlock = () => {
    if (level.code === accessCode) {
      setIsUnlocked(true);
      setAccessCode('');
      toast.success(`${level.name} level unlocked!`);
    } else {
      toast.error('Invalid access code');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">{level.name}</h3>
            <p className="text-gray-600">{level.description}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="text-gray-400" />
              <input
                type="password"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={handleUnlock}
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Unlock Level
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <StudentDashboard level={level.name} />;
}