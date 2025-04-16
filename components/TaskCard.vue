<template>
  <div
    class="bg-white p-4 rounded shadow flex items-center justify-between"
    :class="{ 'opacity-50 line-through': task.done }"
  >
    <div @click="store.toggleTask(task.id)" class="cursor-pointer flex-1">
      {{ task.title }}
    </div>
    <button
      @click="store.deleteTask(task.id)"
      class="text-red-500 hover:text-red-700 ml-4"
    >
      ✕
    </button>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks';

const props = defineProps({
  task: Object,
});

const store = useTaskStore();
</script>
