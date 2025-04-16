<template>
  <draggable v-model="store.tasks" item-key="id" class="task-list">
    <template #item="{ element }">
      <TaskCard :task="element" />
    </template>
  </draggable>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks';
import draggable from 'vuedraggable';
import TaskCard from './TaskCard.vue';

const store = useTaskStore();
</script>
