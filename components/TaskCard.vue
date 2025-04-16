<template>
  <div class="task-card">
    <div class="flex items-center gap-3 flex-1">
      <button
        @click="store.toggleTask(task.id)"
        class="task-toggle"
        :class="{ 'task-toggle-active': task.done }"
      >
        <CheckIcon v-if="task.done" class="w-5 h-5 text-green-600" />
      </button>
      <span :class="{ 'task-done': task.done }">{{ task.title }}</span>
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
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  task: Object,
});

const store = useTaskStore();
</script>
