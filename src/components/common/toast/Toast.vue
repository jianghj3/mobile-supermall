<template>
  <div class="toast" v-show="show">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0.3125rem;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 0.4375rem;
  transform: translate(-50%, -50%);
}
</style>