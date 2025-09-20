import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"), // load token on init
  setToken: (t) => {
    if (t) localStorage.setItem("token", t);
    else localStorage.removeItem("token");
    set({ token: t });
  },
  clearAuth: () => set({ token: null }),
}));
