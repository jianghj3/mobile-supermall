<template>
  <div class="cartList">
    <cart-list-item
      v-for="(item, index) in $store.state.cartList"
      :key="index"
      :product="item"
    />
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

export default {
  name: "CartItem",
  components: {
    CartListItem,
  },
};
</script>

<style scoped>
</style>