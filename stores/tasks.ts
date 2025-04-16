import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useTaskStore = defineStore('task', () => {
  const tasks = useStorage('taskify-tasks', [
    { id: 1, title: 'First task', done: false },
    { id: 2, title: 'Second task', done: true },
  ]);

  function toggleTask(id: number) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.done = !task.done;
  }

  function reorderTasks(newOrder: any[]) {
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
