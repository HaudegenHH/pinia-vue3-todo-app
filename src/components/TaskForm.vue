<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Enter a task.." v-model="newTask" />
    <button>+</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from '../stores/TaskStore';
import { uuid } from 'vue-uuid';

export default {
  setup(props, { emit }) {
    const taskStore = useTaskStore();

    const newTask = ref('');

    const handleSubmit = () => {
      if (newTask.value.trim().length > 0) {
        // let mapped = taskStore.tasks.map((task) => task.id);
        // let maxId = Math.max(...mapped);
        // taskStore.addTask({
        //   id: maxId + 1,
        //   title: newTask.value.trim(),
        //   isFav: false,
        // });

        taskStore.addTask({
          id: uuid.v4(),
          title: newTask.value.trim(),
          isFav: false,
          createdAt: new Date().getTime(),
        });

        newTask.value = '';
      } else {
        emit('badValue');
      }
    };

    return { newTask, handleSubmit };
  },
};
</script>
