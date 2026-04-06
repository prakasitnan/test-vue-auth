import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: { email: string; password?: string }) {
    loading.value = true;
    error.value = null;
    try {
      // Mocking the response
      const mockResponse = {
        data: {
          user: { id: 1, name: 'Demo User', email: credentials.email },
          token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
        },
      };

      const { user: userData, token: tokenData } = mockResponse.data;
      
      user.value = userData;
      token.value = tokenData;
      
      localStorage.setItem('auth_token', tokenData);
      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed';
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
  }

  async function fetchUser() {
    if (!token.value) return null;
    
    loading.value = true;
    try {
      // Mocking the response
      const mockUser = { id: 1, name: 'Demo User', email: 'user@example.com' };
      user.value = mockUser;
      return mockUser;
    } catch (err) {
      await logout();
      return null;
    } finally {
      loading.value = false;
    }
  }

  function initialize() {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      token.value = savedToken;
      fetchUser();
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    fetchUser,
    initialize,
  };
});
