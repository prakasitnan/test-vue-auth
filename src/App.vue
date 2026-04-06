<template>
  <header v-if="authStore.isAuthenticated" class="bg-white shadow-md py-4 px-8 sticky top-0 z-10">
    <nav class="flex justify-between items-center max-w-6xl mx-auto">
      <router-link to="/dashboard" class="text-[#42b983] font-bold hover:text-[#3aa876]">
        Browser MCP Dashboard
      </router-link>
      <div class="flex items-center gap-4">
        <span class="text-gray-600 text-sm font-medium">{{ authStore.user?.name || 'User' }}</span>
        <button 
          @click="handleLogout" 
          class="bg-[#f44336] hover:bg-[#d32f2f] text-white py-2 px-4 rounded text-sm font-bold transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  </header>
  <main class="max-w-6xl mx-auto mt-4 px-4 sm:px-8">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from './store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push({ name: 'login' });
};
</script>

<style>
body {
  background-color: #f9fafb;
}
</style>
