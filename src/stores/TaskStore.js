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
    async addTask(task) {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        console.log('successfully added');
        this.tasks.push(task);
      } else {
        console.log(res.error);
      }
    },
    async deleteTask(id) {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log('successfully deleted');
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } else {
        console.log(res.error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((task) => task.id == id);
      task.isFav = !task.isFav;

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task.isFav }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // or via put request
      // const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(task),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      if (res.ok) {
        console.log('successfully updated');
      } else {
        console.log(res.error);
      }
    },
  },
});
