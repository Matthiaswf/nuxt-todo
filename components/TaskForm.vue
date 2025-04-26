<template>
  <form
    @submit.prevent="addNewTask"
    class="task-card flex flex-col sm:grid sm:grid-cols-[auto_1fr_1fr_auto] sm:items-end sm:gap-4"
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
      class="form-input sm:col-span-1"
      placeholder="Add a new task..."
    />

    <!-- Tag input -->
    <input
      v-model="tagInput"
      @keydown="handleTagKeydown"
      type="text"
      class="form-input sm:col-span-1"
      placeholder="Type a tag and press Enter"
    />

    <!-- Submit button -->
    <button
      type="submit"
      class="btn btn-primary h-[42px] whitespace-nowrap sm:col-span-1"
    >
      Add
    </button>

    <!-- Tag preview row -->
    <ClientOnly>
      <div
        v-if="tags.length"
        class="tag-list sm:col-span-4 flex flex-wrap gap-2 mt-2"
      >
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="tag cursor-default"
        >
          {{ tag }}
          <button
            type="button"
            @click="removeTag(index)"
            class="ml-1 text-gray-500 hover:text-black dark:hover:text-white"
          >
            &times;
          </button>
        </span>
      </div>
    </ClientOnly>
  </form>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks';
import { ClientOnly } from '#components';

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
