<template>
  <div class="task-card" :class="{ 'task-done': task.done }">
    <div @click="store.toggleTask(task.id)" class="cursor-pointer flex-1">
      {{ task.title }}
    </div>
    <button
      @click="store.deleteTask(task.id)"
      class="btn-icon text-red-500 hover:text-red-700"
    >
      <TrashIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks';
import { TrashIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  task: Object,
});

const store = useTaskStore();
</script>
