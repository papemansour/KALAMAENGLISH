import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  studentName: string;
  studentLevel: string;
  text: string;
  sentAt: string;
  isAdmin: boolean;
  read: boolean;
}

interface MessageStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  markAsRead: (messageId: string) => void;
  getStudentMessages: (studentName: string) => Message[];
  getAdminMessages: () => Message[];
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      messages: [],
      addMessage: (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message]
        }));
      },
      markAsRead: (messageId: string) => {
        set((state) => ({
          messages: state.messages.map(msg =>
            msg.id === messageId ? { ...msg, read: true } : msg
          )
        }));
      },
      getStudentMessages: (studentName: string) => {
        return get().messages.filter(msg => 
          msg.studentName === studentName || 
          (msg.isAdmin && msg.studentName === studentName)
        );
      },
      getAdminMessages: () => {
        return get().messages;
      }
    }),
    {
      name: 'message-store'
    }
  )
);