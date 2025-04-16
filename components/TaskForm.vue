<template>
  <form @submit.prevent="addNewTask" class="flex flex-col sm:flex-row gap-2">
    <input
      v-model="newTask"
      type="text"
      class="form-input flex-1"
      placeholder="Add a new task..."
    />
    <input
      v-model="tagInput"
      type="text"
      class="form-input flex-1"
      placeholder="Tags (comma-separated)"
    />
    <button type="submit" class="btn btn-primary">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/tasks';

const store = useTaskStore();

const newTask = ref('');
const tagInput = ref('');

function addNewTask() {
  const title = newTask.value.trim();
  const tags = tagInput.value
    .split(',')
    .map(
      (t) => t.trim().toLowerCase().replace(/\s+/g, '-') // optional: turn spaces into dashes
    )
    .filter((t) => t.length > 0);

  if (title) {
    store.addTask(title, tags);
    newTask.value = '';
    tagInput.value = '';
  }
}
</script>
