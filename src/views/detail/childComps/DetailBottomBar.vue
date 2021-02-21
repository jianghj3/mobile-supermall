<template>
  <div class="bottomBar">
    <div class="left">
      <div class="client">
        <div class="icon"></div>
        <div class="text">客服</div>
      </div>
      <div class="shop">
        <div class="icon"></div>
        <div class="text">店铺</div>
      </div>
      <div class="collect">
        <div class="icon"></div>
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="right">
      <div class="addCart" @click="addCart">加入购物车</div>
      <div class="purchase">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addCart() {
      this.$emit("addCart");
    },
  },
};
</script>

<style scoped>
.bottomBar {
  position: absolute;
  display: flex;
  height: 49px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  font-size: 14px;
}
.bottomBar > div {
  display: flex;
  flex: 1;
}
.bottomBar > div > div {
  flex: 1;
}
.icon {
  width: 22px;
  height: 22px;
}
.client .icon {
  background: url(~assets/img/detail/detail_bottom.png) no-repeat 0 -53px;
  background-size: 22px;
}
.shop .icon {
  background: url(~assets/img/detail/detail_bottom.png) no-repeat 0 -99px;
  background-size: 22px;
}
.collect .icon {
  background: url(~assets/img/detail/detail_bottom.png) no-repeat 0 0;
  background-size: 22px;
}
.left > div {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.left .text {
  margin-top: 3px;
}
.right > div {
  flex: 1;
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.right .addCart {
  background-color: #ffdc09;
  color: #333;
}
.right .purchase {
  background-color: #ff7399;
  color: #fff;
}
</style>