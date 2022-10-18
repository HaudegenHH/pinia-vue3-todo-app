<template>
  <main>
    <header>
      <img src="./assets/logo.svg" alt="pinia logo" id="left" />
      <h1>Todo App with Pinia state management</h1>
      <img src="./assets/logo.svg" alt="pinia logo" id="right" />
    </header>
    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm @badValue="handleBadValue" />
    </div>

    <transition name="fade">
      <Toast v-if="showToast" />
    </transition>

    <!-- filter navigation -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="taskStore.isLoading">Loading tasks...</div>

    <!-- All Tasks-->
    <transition name="switch" mode="out-in">
      <div v-if="taskStore.totalCount">
        <transition-group
          tag="div"
          name="list"
          class="task-list"
          appear
          v-if="filter === 'all'"
        >
          <p>
            You have {{ totalCount }} task{{ totalCount > 1 ? 's' : '' }} total
          </p>
          <div
            v-for="(task, index) in allTasks"
            :key="task.id"
            :data-index="index"
          >
            <TaskDetails :task="task" />
          </div>
        </transition-group>
      </div>
      <div v-else>
        <p class="no-tasks">Nothing left to do! :)</p>
      </div>
    </transition>
    <!-- End: All Tasks-->

    <!-- Fav Tasks-->
    <transition-group
      tag="div"
      class="task-list"
      name="list"
      appear
      v-if="filter === 'favs'"
    >
      <p>You have {{ favCount }} fav task{{ favCount == 1 ? '' : 's' }}</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </transition-group>
    <!-- End: Fav Tasks-->

    <button @click="taskStore.$reset">Reset Store</button>
  </main>
</template>

<script>
import { ref } from 'vue';
// import gsap from 'gsap';
import { useTaskStore } from '@/stores/TaskStore';
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';
import Toast from './components/Toast.vue';
import { storeToRefs } from 'pinia';

export default {
  components: { TaskDetails, Toast, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    const { tasks, loading, favs, totalCount, favCount, allTasks } =
      storeToRefs(taskStore);

    // fetch all tasks
    taskStore.getTasks();

    const showToast = ref(false);
    const filter = ref('all');

    const handleBadValue = () => {
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    };

    // commented out gsap - staggering effect on list -items
    // (dont forget that @before-enter="beforeEnter" and @enter="enter" need to
    // be added to the transition-group as attributes)
    //
    // const beforeEnter = (el) => {
    //   el.style.opacity = 0;
    //   el.style.transform = 'translateY(80px)';
    // };

    // const enter = (el, done) => {
    //   gsap.to(el, {
    //     opacity: 1,
    //     y: 0,
    //     duration: 0.4,
    //     onComplete: done,
    //     delay: el.dataset.index * 0.2, // staggering effect
    //   });
    // };

    return {
      taskStore,
      filter,
      handleBadValue,
      showToast,
      tasks,
      loading,
      favs,
      totalCount,
      favCount,
      allTasks,
      // beforeEnter,
      // enter,
    };
  },
};
</script>

<style>
.no-tasks {
  text-align: center;
  font-size: 30px;
}

/* .fade-enter-from {
  opacity: 0;
  top: -100px;
} */
.fade-enter-active {
  /* transition: all 1s ease; */
  animation: wobble 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all 1s ease;
}

@keyframes wobble {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(4px);
  }
  90% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}

/* list transitions */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-leave-from {
  opacity: 1;
  transform: scale(1);
}
.list-leave-to {
  opacity: 0;
}
.list-leave-active {
  transform: scale(0.3) translateY(-300px);
  position: absolute;
}
.list-move {
  transition: all 0.4s ease;
}

/* switch transitions  */
.switch-enter-from,
switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
/* .switch-enter-to,
switch-leave-from {
  opacity: 1;
  transform: translateY(0);
} */
.switch-enter-active,
.switch-leave-active {
  transition: all 0.5s ease;
}
</style>
