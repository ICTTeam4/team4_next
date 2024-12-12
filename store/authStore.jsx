import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => set({ user, token, isAuthenticated: true }), //로그인 성공시 처리
  logout: () => set({ user: null, token: null, isAuthenticated: false }), //로그아웃 성공시 처리 
}))

export default useAuthStore;
