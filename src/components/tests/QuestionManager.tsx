import React, { useState } from 'react';
import { Plus, Save, X, Trash2, Edit } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  isCustom?: boolean;
}

interface QuestionManagerProps {
  onClose: () => void;
  onSave: (question: Question) => void;
  onDelete: (questionId: number) => void;
  questions: Question[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

export function QuestionManager({ onClose, onSave, onDelete, questions, level }: QuestionManagerProps) {
  const [accessCode, setAccessCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAuthorize = () => {
    if (accessCode === 'Tonly') {
      setIsAuthorized(true);
      setAccessCode('');
    } else {
      toast.error('Invalid admin code');
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    if (!question || options.some(opt => !opt) || !correctAnswer) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!options.includes(correctAnswer)) {
      toast.error('Correct answer must be one of the options');
      return;
    }

    const newQuestion: Question = {
      id: Date.now(),
      question,
      options,
      correctAnswer,
      isCustom: true
    };

    onSave(newQuestion);
    toast.success('Question added successfully');
    setShowAddForm(false);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const handleDelete = (questionId: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      onDelete(questionId);
      toast.success('Question deleted successfully');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Admin Access Required</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-800"
            />
            <button
              onClick={handleAuthorize}
              className="w-full bg-emerald-800 text-white py-2 rounded hover:bg-emerald-900"
            >
              Access Question Manager
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{level.charAt(0).toUpperCase() + level.slice(1)} Question Manager</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {!showAddForm ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Custom Questions</h4>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900"
              >
                <Plus size={20} />
                Add New Question
              </button>
            </div>

            <div className="space-y-4">
              {questions.filter(q => q.isCustom).map((q) => (
                <div key={q.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium mb-2">{q.question}</p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {q.options.map((option, index) => (
                          <li key={index} className={option === q.correctAnswer ? "text-emerald-600 font-medium" : ""}>
                            {option} {option === q.correctAnswer && "(Correct)"}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Delete question"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
              {questions.filter(q => q.isCustom).length === 0 && (
                <p className="text-gray-500 text-center py-4">No custom questions added yet</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-800"
                placeholder="Enter your question"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-800"
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-800"
              >
                <option value="">Select correct answer</option>
                {options.map((option, index) => (
                  option && <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900"
              >
                <Save size={20} />
                Save Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}