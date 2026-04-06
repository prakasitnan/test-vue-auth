<template>
  <div class="flex justify-center items-center min-h-[80vh] px-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
      <h2 class="mt-0 text-center text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
      <p class="text-center text-gray-500 text-sm mb-8">Please login to your account</p>

      <div 
        v-if="authStore.error" 
        class="bg-red-50 text-red-700 border border-red-100 p-4 rounded-lg mb-6 text-sm flex items-center gap-3"
      >
        <span class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
        {{ authStore.error }}
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            placeholder="user@example.com" 
            required
            :disabled="authStore.loading"
            class="w-full p-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#42b983]/20 focus:border-[#42b983] disabled:bg-gray-50 disabled:text-gray-400 transition-all"
          >
        </div>
        
        <div>
          <label for="password" class="block mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            placeholder="••••••••" 
            required
            :disabled="authStore.loading"
            class="w-full p-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#42b983]/20 focus:border-[#42b983] disabled:bg-gray-50 disabled:text-gray-400 transition-all"
          >
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="w-full p-4 bg-[#42b983] text-white rounded-xl text-sm font-bold shadow-md shadow-[#42b983]/20 hover:bg-[#3aa876] hover:translate-y-[-1px] active:translate-y-[0px] transition-all duration-200 disabled:bg-gray-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          <span v-if="authStore.loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="mt-8 p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p class="font-bold text-[10px] text-gray-400 uppercase tracking-widest mb-3">Test Credentials</p>
        <div class="space-y-1">
          <p class="text-xs text-gray-600 flex justify-between">
            <span class="text-gray-400">Email:</span>
            <span class="font-medium">user@example.com</span>
          </p>
          <p class="text-xs text-gray-600 flex justify-between">
            <span class="text-gray-400">Password:</span>
            <span class="font-medium">password123</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  const success = await authStore.login({
    email: form.email,
    password: form.password
  });

  if (success) {
    router.push({ name: 'dashboard' });
  }
};
</script>
