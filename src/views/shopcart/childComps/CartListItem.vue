<template>
  <div class="cartItem">
    <div class="checkBox1" @click="checkChange">
      <check-box :isChecked="product.check" />
    </div>
    <div class="image">
      <img :src="product.image" alt="" />
    </div>
    <div class="right">
      <div class="title">{{ product.title }}</div>
      <div class="desc">{{ product.desc }}</div>
      <div class="bottom">
        <div class="price">￥{{ product.realPrice }}</div>
        <div class="count">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from "components/content/checkBox/CheckBox";

export default {
  name: "CartListItem",
  components: {
    CheckBox,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkChange() {
      this.product.check = !this.product.check;
    },
  },
};
</script>

<style scoped>
.cartItem {
  display: flex;
  position: relative;
  overflow: hidden;
  width: 10rem;
  padding: 8px 5px;
  border-bottom: 5px solid #eee;
}
.image {
  width: 25%;
  margin-left: 0.25rem;
}
.image img {
  width: 100%;
  border-radius: 5px;
  vertical-align: middle;
}
.right {
  width: 65%;
  margin-left: 8px;
}
.right .title,
.right .desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.right .title {
  font-size: 0.5625rem;
  margin-bottom: 0.46875rem;
}
.right .desc {
  font-size: 0.46875rem;
}
.bottom {
  display: flex;
  position: absolute;
  width: 6.25rem;
  bottom: 0.46875rem;
  justify-content: space-between;
}
.bottom .price {
  font-size: 0.5625rem;
  color: red;
}
.bottom .count {
  font-size: 0.5625rem;
  color: #333;
}
.checkBox1 {
  display: flex;
  align-items: center;
}
</style>