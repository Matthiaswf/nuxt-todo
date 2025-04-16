import { defineStore } from 'pinia';
import { ref, watch, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';

type Task = {
  id: number;
  title: string;
  done: boolean;
};

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([]);

  // Only initialize localStorage on the client
  onMounted(() => {
    const stored = useStorage<Task[]>('taskify-tasks', []);
    tasks.value = stored.value;

    // Keep syncing local changes back to storage
    watch(
      tasks,
      (newVal) => {
        stored.value = newVal;
      },
      { deep: true }
    );
  });

  function toggleTask(id: number) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.done = !task.done;
  }

  function reorderTasks(newOrder: Task[]) {
    tasks.value = newOrder;
  }

  function addTask(title: string) {
    tasks.value.push({
      id: Date.now(),
      title,
      done: false,
    });
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  return {
    tasks,
    toggleTask,
    reorderTasks,
    addTask,
    deleteTask,
  };
});
