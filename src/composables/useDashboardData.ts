import { ref, computed, readonly, onMounted } from 'vue';

export interface StatItem {
  label: string;
  value: number;
  change: number;
}

export interface ChartData {
  label: string;
  value: number;
}

export function useDashboardData() {
  const _stats = ref<StatItem[]>([
    { label: 'Total Users', value: 1254, change: 12.5 },
    { label: 'Total Revenue', value: 45200, change: -2.4 },
    { label: 'Active Sessions', value: 342, change: 5.1 },
  ]);

  const _barData = ref<ChartData[]>([
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 80 },
    { label: 'Apr', value: 35 },
    { label: 'May', value: 90 },
    { label: 'Jun', value: 55 },
  ]);

  const _lineData = ref<number[]>([30, 45, 25, 60, 40, 75, 50, 90]);

  const loading = ref(false);

  // Simulated data fetch
  const refreshData = async () => {
    loading.value = true;
    // Mocking API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    // Data stays static for this example, but could be randomized
    loading.value = false;
  };

  onMounted(refreshData);

  return {
    stats: readonly(_stats),
    barData: readonly(_barData),
    lineData: readonly(_lineData),
    loading: readonly(loading),
    refreshData,
  };
}
