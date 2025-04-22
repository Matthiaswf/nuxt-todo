<template>
  <form
    @submit.prevent="addNewTask"
    class="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md space-y-4 sm:space-y-0 sm:grid sm:grid-cols-[auto_1fr_1fr_auto] sm:items-end sm:gap-4"
  >
    <!-- Heading -->
    <label
      class="text-lg font-semibold text-gray-800 dark:text-white sm:col-span-4"
    >
      Add New Task
    </label>

    <!-- Task input -->
    <input
      v-model="newTask"
      type="text"
      class="form-input"
      placeholder="Add a new task..."
    />

    <!-- Tag input -->
    <input
      v-model="tagInput"
      @keydown="handleTagKeydown"
      type="text"
      class="form-input"
      placeholder="Type a tag and press Enter"
    />

    <!-- Button -->
    <button type="submit" class="btn btn-primary h-[42px] whitespace-nowrap">
      Add
    </button>
  </form>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks';

const store = useTaskStore();

const newTask = ref('');
const tagInput = ref('');
const tags = ref([]);

function addTag() {
  const cleaned = tagInput.value.trim().toLowerCase().replace(/\s+/g, '-');

  if (cleaned && !tags.value.includes(cleaned)) {
    tags.value.push(cleaned);
  }

  tagInput.value = '';
}

function removeTag(index) {
  tags.value.splice(index, 1);
}

function handleTagKeydown(e) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addTag();
  }
}

function addNewTask() {
  const title = newTask.value.trim();
  if (title) {
    store.addTask(title, tags.value);
    newTask.value = '';
    tagInput.value = '';
    tags.value = [];
  }
}
</script>
