
import { create } from "zustand";
import { User } from "../types";

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "admin-1",
    name: "Sunil Deshmukh",
    role: "ADMIN",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunil"
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
