import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (username, password) => {
        try {
          const res = await axios.post('https://fakestoreapi.com/auth/login', {
            username,
            password,
          });

          const token = res.data.token;
          if (token) {
            set({ isAuthenticated: true, user: { username }, token });
            return { success: true };
          } else {
            return { success: false };
          }
        } catch (err) {
          console.error('Login error:', err);
          return { success: false };
        }
      },

      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // key for localStorage
    }
  )
);

export default useAuthStore;
