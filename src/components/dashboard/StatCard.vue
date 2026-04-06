<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label: string;
  value: string | number;
  change?: number;
}

const props = defineProps<Props>();

const isPositive = computed(() => (props.change ?? 0) >= 0);
const changeText = computed(() => {
  if (props.change === undefined) return '';
  return `${isPositive.value ? '+' : ''}${props.change}%`;
});
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2">
    <span class="text-sm font-medium text-gray-500 uppercase tracking-wider">{{ label }}</span>
    <div class="flex items-baseline justify-between">
      <span class="text-3xl font-bold text-gray-900">{{ value }}</span>
      <span 
        v-if="change !== undefined"
        :class="[
          'text-sm font-semibold px-2 py-0.5 rounded-full',
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        ]"
      >
        {{ changeText }}
      </span>
    </div>
  </div>
</template>
