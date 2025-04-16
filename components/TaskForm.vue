<template>
  <form @submit.prevent="addNewTask" class="flex gap-2">
    <input
      v-model="newTask"
      type="text"
      class="flex-1 p-2 border border-gray-300 rounded"
      placeholder="Add a new task..."
    />
    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Add
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/tasks';

const store = useTaskStore();
const newTask = ref('');

function addNewTask() {
  if (newTask.value.trim()) {
    store.addTask(newTask.value.trim());
    newTask.value = '';
  }
}
</script>
