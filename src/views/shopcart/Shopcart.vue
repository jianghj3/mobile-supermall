<template>
  <div id="shopcart">
    <nav-bar class="cartNav">
      <div class="center" slot="center">
        购物车({{ $store.getters.cartListLength }})
      </div>
    </nav-bar>
    <b-scroll class="bscroll" ref="bscroll">
      <cart-list />
    </b-scroll>
    <cart-bottom-bar class="cartBottomBar" />
  </div>
</template>

<script>
//导入公共组件
import NavBar from "components/common/navbar/NavBar";
import BScroll from "components/common/bscroll/BScroll";

//导入子组件
import CartList from "views/shopcart/childComps/CartList";
import CartBottomBar from "views/shopcart/childComps/CartBottomBar";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    BScroll,

    CartList,
    CartBottomBar,
  },
  activated() {
    this.$refs.bscroll.refresh();
  },
};
</script>

<style scoped>
#shopcart {
  position: relative;
  height: 100vh;
}
.cartNav {
  background-color: var(--color-tint);
  color: #fff;
}
.bscroll {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 89px;
}
.cartBottomBar {
  position: absolute;
  width: 100%;
  bottom: 49px;
}
</style>