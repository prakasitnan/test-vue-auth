<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Browser MCP Dashboard</h1>
        <p v-if="authStore.user" class="text-sm text-gray-500">
          Welcome back, {{ authStore.user.name }}
        </p>
      </div>
      <button 
        @click="refreshData"
        :disabled="loading"
        class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        {{ loading ? 'Refreshing...' : 'Refresh Data' }}
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        v-for="stat in stats" 
        :key="stat.label"
        :label="`Browser MCP ${stat.label}`"
        :value="formatValue(stat.label, stat.value)"
        :change="stat.change"
      />
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BarChart 
        title="Browser MCP Monthly Performance" 
        :data="barData" 
      />
      <LineChart 
        title="Browser MCP Real-time Activity" 
        :data="[...lineData]" 
      />
    </div>

    <!-- Footer Meta -->
    <div class="mt-8 pt-8 border-t border-gray-200">
      <p class="text-xs text-gray-400">
        This is a protected route. All data is simulated for demonstration purposes.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/auth';
import { useDashboardData } from '../composables/useDashboardData';
import StatCard from '../components/dashboard/StatCard.vue';
import BarChart from '../components/dashboard/BarChart.vue';
import LineChart from '../components/dashboard/LineChart.vue';

const authStore = useAuthStore();
const { stats, barData, lineData, loading, refreshData } = useDashboardData();

const formatValue = (label: string, value: number) => {
  if (label.toLowerCase().includes('revenue')) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
  return value.toLocaleString();
};
</script>

<style scoped>
/* All styling handled via Tailwind utility classes */
</style>
