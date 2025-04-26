import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export function LegalModal({ title, content, onClose }: LegalModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="prose prose-lg max-w-none">
            {content.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('-')) {
                return (
                  <li key={index} className="text-gray-600 ml-4">
                    {paragraph.trim().substring(1).trim()}
                  </li>
                );
              }
              if (paragraph.trim().match(/^\d+\./)) {
                return (
                  <h3 key={index} className="font-bold text-xl mt-6 mb-4">
                    {paragraph.trim()}
                  </h3>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="text-gray-600 mb-4">
                    {paragraph.trim()}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}