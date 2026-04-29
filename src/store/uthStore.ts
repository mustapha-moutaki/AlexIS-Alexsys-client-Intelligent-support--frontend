import { create } from 'zustand'
import { User } from '../types/User'

const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setAuth: (user: User, token: string) => {
    set({ user, token })
  },

  clearAuth: () => {
    set({ user: null, token: null })
  }
}))

export default useAuthStore