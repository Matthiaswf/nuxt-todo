<template>
  <div v-if="store.tasks.length === 0" class="text-center text-gray-500 py-8">
    <ClipboardIcon class="w-12 h-12 mx-auto mb-2" />
    <p>No Tasks Yet. Add one to get started.</p>
  </div>

  <draggable v-model="store.tasks" item-key="id" class="task-list">
    <template #item="{ element }">
      <TaskCard :task="element" />
    </template>
  </draggable>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks';
import { ClipboardIcon } from '@heroicons/vue/24/outline';
import draggable from 'vuedraggable';
import TaskCard from './TaskCard.vue';

const store = useTaskStore();
</script>
