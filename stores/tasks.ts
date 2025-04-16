import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [
      { id: 1, title: 'First task', done: false },
      { id: 2, title: 'Second task', done: true },
    ],
  }),
  actions: {
    toggleTask(id: number) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.done = !task.done;
    },
    reorderTasks(newOrder: any[]) {
      this.tasks = newOrder;
    },
  },
});
