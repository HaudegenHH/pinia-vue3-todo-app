<template>
  <div class="toast-wrapper">
    <div class="toast">You must enter a value for the Task!</div>
  </div>
</template>

<style>
.toast-wrapper {
  position: fixed;
  width: 100%;
  top: 20px;
}
.toast {
  padding: 20px;
  color: #fff;
  background-color: #f91640;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
}
</style>
