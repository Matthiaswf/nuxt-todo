import { defineStore } from 'pinia';
import { ref, watch, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';

type Task = {
  id: number;
  title: string;
  done: boolean;
  tags: string[];
};

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([]);

  onMounted(() => {
    const stored = useStorage<Task[]>('taskify-tasks', []);
    tasks.value = stored.value;

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

  function addTask(title: string, tags: string[] = []) {
    tasks.value.unshift({
      id: Date.now(),
      title,
      done: false,
      tags,
    });
  }

  function editTask(id: number, newTitle: string, newTags: string[] = []) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      task.tags = newTags;
    }
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
    editTask,
  };
});
