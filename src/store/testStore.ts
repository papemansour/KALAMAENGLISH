import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question } from '../types/test';

interface TestStore {
  questions: {
    beginner: Question[];
    intermediate: Question[];
    advanced: Question[];
  };
  addQuestion: (level: string, question: Question) => void;
  removeQuestion: (level: string, questionId: number) => void;
  getQuestions: (level: string) => Question[];
}

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      questions: {
        beginner: [],
        intermediate: [],
        advanced: []
      },
      addQuestion: (level, question) => {
        set((state) => ({
          questions: {
            ...state.questions,
            [level]: [...(state.questions[level as keyof typeof state.questions] || []), question]
          }
        }));
      },
      removeQuestion: (level, questionId) => {
        set((state) => ({
          questions: {
            ...state.questions,
            [level]: state.questions[level as keyof typeof state.questions].filter(q => q.id !== questionId)
          }
        }));
      },
      getQuestions: (level) => {
        return get().questions[level as keyof typeof get().questions] || [];
      }
    }),
    {
      name: 'test-store'
    }
  )
);