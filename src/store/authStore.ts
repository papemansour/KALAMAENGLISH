import { create } from 'zustand';

const validAccessCodes = [
  'ADMIN1', // Master access code
  'Englishlover001', 'Englishlover002', 'Englishlover003', 'Englishlover004', 'Englishlover005',
  'Englishlover006', 'Englishlover007', 'Englishlover008', 'Englishlover009', 'Englishlover010',
  'Englishlover011', 'Englishlover012', 'Englishlover013', 'Englishlover014', 'Englishlover015',
  'Englishlover016', 'Englishlover017', 'Englishlover018', 'Englishlover019', 'Englishlover020'
];

interface AuthState {
  isAuthenticated: boolean;
  accessCode: string | null;
  login: (code: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessCode: null,
  login: (code: string) => {
    if (validAccessCodes.includes(code)) {
      set({ isAuthenticated: true, accessCode: code });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false, accessCode: null });
  },
}));