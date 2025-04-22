<template>
  <div class="layout">
    <div class="max-w-3xl w-full mx-auto space-y-6">
      <TaskForm />
      <div v-if="allTags.length" class="flex flex-wrap gap-2 mb-4">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="toggleTagFilter(tag)"
          class="tag"
          :class="{ 'bg-black text-white': selectedTag === tag }"
        >
          {{ tag }}
        </button>
        <button
          v-if="selectedTag"
          @click="selectedTag = null"
          class="tag text-sm text-gray-500 hover:text-black"
        >
          Clear filter
        </button>
      </div>

      <TaskColumn :tasks="filteredTasks" @reorder="handleReorder" />
    </div>
  </div>
</template>

<script setup>
import TaskForm from '@/components/TaskForm.vue';
import TaskColumn from '@/components/TaskColumn.vue';
import { useTaskStore } from '@/stores/tasks';

const store = useTaskStore();
const selectedTag = ref(null);

const filteredTasks = computed(() => {
  if (!selectedTag.value) return store.tasks;
  return store.tasks.filter((task) => task.tags.includes(selectedTag.value));
});

function handleReorder(newFilteredOrder) {
  if (!selectedTag.value) {
    // Unfiltered view — replace full list directly
    store.reorderTasks(newFilteredOrder);
    return;
  }

  // Filtered view — insert moved task above next filtered task
  const [movedTask] = newFilteredOrder;
  const targetId = newFilteredOrder[1]?.id;

  const withoutMoved = store.tasks.filter((t) => t.id !== movedTask.id);
  const targetIndex = withoutMoved.findIndex((t) => t.id === targetId);

  if (targetIndex === -1) {
    store.tasks = [movedTask, ...withoutMoved];
  } else {
    store.tasks = [
      ...withoutMoved.slice(0, targetIndex),
      movedTask,
      ...withoutMoved.slice(targetIndex),
    ];
  }
}

const allTags = computed(() => {
  const tagSet = new Set();
  store.tasks.forEach((task) => {
    task.tags.forEach((tag) => tagSet.add(tag));
  });
  return [...tagSet];
});

function toggleTagFilter(tag) {
  selectedTag.value = selectedTag.value === tag ? null : tag;
}
</script>
