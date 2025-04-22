<template>
  <form @submit.prevent="addNewTask" class="task-form items-start">
    <!-- Task input -->
    <div class="form-field">
      <input
        v-model="newTask"
        type="text"
        class="form-input"
        placeholder="Add a new task..."
      />
    </div>

    <!-- Tag input + tag list -->
    <div class="form-field">
      <input
        v-model="tagInput"
        @keydown="handleTagKeydown"
        type="text"
        class="form-input"
        placeholder="Type a tag and press Enter or comma"
      />
      <div class="tag-list mt-2">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="tag cursor-default"
        >
          {{ tag }}
          <button
            type="button"
            @click="removeTag(index)"
            class="ml-1 text-gray-500 hover:text-black"
          >
            &times;
          </button>
        </span>
      </div>
    </div>

    <button type="submit" class="btn btn-primary h-[42px]">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
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
