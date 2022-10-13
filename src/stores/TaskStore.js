import { defineStore } from 'pinia';

export const useTaskStore = defineStore('piniaTaskStore', {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    allTasks() {
      return this.tasks.sort((a, b) => b.createdAt - a.createdAt);
    },
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },
    favCount() {
      return this.tasks.reduce((acc, curr) => (curr.isFav ? acc + 1 : acc), 0);
    },
    totalCount: (state) => state.tasks.length,
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      this.tasks = data;
      this.isLoading = false;
    },
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleFav(id) {
      const task = this.tasks.find((task) => task.id == id);
      task.isFav = !task.isFav;
    },
  },
});
