<script setup lang="ts">
import { computed } from 'vue';

interface DataItem {
  label: string;
  value: number;
}

interface Props {
  data: DataItem[];
  title: string;
}

const props = defineProps<Props>();

const maxValue = computed(() => Math.max(...props.data.map(d => d.value), 100));

const getBarHeight = (value: number) => {
  return `${(value / maxValue.value) * 100}%`;
};
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 class="text-lg font-semibold text-gray-800 mb-6">{{ title }}</h3>
    <div class="h-48 flex items-end justify-between gap-2 px-2">
      <div 
        v-for="(item, index) in data" 
        :key="index"
        class="flex-1 group relative flex flex-col items-center"
      >
        <div 
          class="w-full bg-[#42b983]/20 group-hover:bg-[#42b983]/40 transition-all duration-300 rounded-t-sm"
          :style="{ height: getBarHeight(item.value) }"
        >
          <div class="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold bg-gray-800 text-white px-1.5 py-0.5 rounded transition-opacity">
            {{ item.value }}
          </div>
        </div>
        <span class="mt-2 text-[10px] uppercase font-bold text-gray-400 tracking-tighter">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
