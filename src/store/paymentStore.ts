import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PaymentDelay {
  studentId: string;
  studentName: string;
  email: string;
  blockedAt: string;
  reason: string;
}

interface PaymentStore {
  blockedStudents: PaymentDelay[];
  blockStudent: (delay: PaymentDelay) => void;
  unblockStudent: (studentId: string) => void;
  isStudentBlocked: (studentId: string) => boolean;
}

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set, get) => ({
      blockedStudents: [],
      blockStudent: (delay: PaymentDelay) => {
        set((state) => ({
          blockedStudents: [...state.blockedStudents, delay]
        }));
      },
      unblockStudent: (studentId: string) => {
        set((state) => ({
          blockedStudents: state.blockedStudents.filter(
            (student) => student.studentId !== studentId
          )
        }));
      },
      isStudentBlocked: (studentId: string) => {
        return get().blockedStudents.some(
          (student) => student.studentId === studentId
        );
      }
    }),
    {
      name: 'payment-store'
    }
  )
);