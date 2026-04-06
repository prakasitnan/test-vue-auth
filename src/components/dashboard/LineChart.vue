<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  data: number[];
  title: string;
}

const props = defineProps<Props>();

const width = 300;
const height = 150;
const padding = 20;

const maxValue = computed(() => Math.max(...props.data, 100));

const points = computed(() => {
  const xStep = (width - padding * 2) / (props.data.length - 1);
  return props.data.map((val, i) => {
    const x = padding + i * xStep;
    const y = height - padding - ((val / maxValue.value) * (height - padding * 2));
    return `${x},${y}`;
  }).join(' ');
});
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ title }}</h3>
    <div class="relative pt-2">
      <svg 
        :viewBox="`0 0 ${width} ${height}`" 
        class="w-full h-48 drop-shadow-sm"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke="#42b983"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          :points="points"
        />
        <!-- Area fill -->
        <path
          :d="`M ${padding},${height-padding} L ${points} L ${width-padding},${height-padding} Z`"
          fill="url(#gradient)"
          class="opacity-10"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color: #42b983; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #42b983; stop-opacity: 0" />
          </linearGradient>
        </defs>
      </svg>
      <div class="flex justify-between mt-2 px-4">
        <span v-for="n in data.length" :key="n" class="text-[10px] font-bold text-gray-400">
          {{ n }}
        </span>
      </div>
    </div>
  </div>
</template>
