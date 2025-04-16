<template>
  <form @submit.prevent="addNewTask" class="flex gap-2">
    <input
      v-model="newTask"
      type="text"
      class="form-input flex-1"
      placeholder="Add a new task..."
    />

    <button type="submit" class="btn btn-primary">Add</button>
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
