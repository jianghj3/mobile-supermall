<template>
  <div class="cartBottomBar">
    <div class="checkBox1">
      <check-box :isChecked="isSelectAll" @click.native="allCheck" />
      <span class="selectAll">全选</span>
    </div>
    <div class="totalMoney">
      <span>合计</span>
      <span>￥{{ totalMoney }}</span>
    </div>
    <div class="goPay">去结算({{ totalGoods }})</div>
  </div>
</template>

<script>
import CheckBox from "components/content/checkBox/CheckBox";

export default {
  name: "cartBottomBar",
  components: {
    CheckBox,
  },
  data() {
    return {
      totalPrice: 0,
    };
  },
  computed: {
    totalMoney() {
      this.totalPrice = 0;
      for (let item of this.$store.state.cartList) {
        if (item.check) {
          this.totalPrice += item.count * item.realPrice;
        }
      }
      return this.totalPrice.toFixed(2);
    },
    totalGoods() {
      return this.$store.state.cartList
        .filter((item) => item.check)
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      if (this.$store.getters.cartListLength != 0)
        return !this.$store.state.cartList.filter((item) => !item.check).length;
    },
  },
  methods: {
    allCheck() {
      if (this.isSelectAll) {
        for (let item of this.$store.state.cartList) {
          item.check = false;
        }
      } else {
        for (let item of this.$store.state.cartList) {
          item.check = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.cartBottomBar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 0.15625rem;
  height: 40px;
  background-color: #eee;
  border-top: 1px solid #999;
  font-size: 0.5rem;
}
.checkBox1 {
  display: flex;
  align-items: center;
}
.selectAll {
  margin-left: 0.15625rem;
}
.totalMoney {
  margin-left: 0.46875rem;
}
.goPay {
  position: absolute;
  display: flex;
  right: 0;
  height: 100%;
  padding: 0 30px;
  background-color: #f94e00;
  color: #fff;
  align-items: center;
}
</style>