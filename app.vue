<template>
  <div class="layout">
    <div class="flex justify-end mb-4">
      <button @click="toggleDark()" class="btn-icon">
        <span v-if="isDark">🌙</span>
        <span v-else>☀️</span>
      </button>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core';

useHead({
  title: 'Nuxt To Do',
  meta: [
    {
      name: 'description',
      content: 'A minimal task manager built with Nuxt 3',
    },
  ],
});

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
