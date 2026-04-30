import { User } from "../types/User";

export interface AuthState {
  user: User | null;
  token: string | null;

  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}