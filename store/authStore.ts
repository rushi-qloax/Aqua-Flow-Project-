
import { create } from "zustand";
import { User, Role } from "../types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const PERSONAS: Record<Role, User> = {
  ADMIN: {
    id: "admin-1",
    name: "Sunil Deshmukh",
    role: "ADMIN",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunil"
  },
  STAFF: {
    id: "staff-1",
    name: "Mehul K.",
    role: "STAFF",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mehul"
  },
  DRIVER: {
    id: "driver-1",
    name: "Ramesh P.",
    role: "DRIVER",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh"
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Start unauthenticated
  isAuthenticated: false,
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
