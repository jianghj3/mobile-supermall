<template>
  <div class="checkBox" :class="{ check: isChecked }">
    <img src="~assets/img/shopcart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.checkBox {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  border: 1px solid #666;
}
.check {
  background-color: red;
  border: 1px solid red;
}
</style>