<template>
  <div class="shopInfo">
    <div class="shopHead">
      <img :src="shop.shopLogo" alt="" class="shopLogo" />
      <span class="shopName">{{ shop.name }}</span>
    </div>
    <div class="infoDetail">
      <div class="profile">
        <div class="sells">
          <div class="sellsNum">{{ shop.cSells | sellCountFilter }}</div>
          <div class="sellTitle">总销量</div>
        </div>
        <div class="goods">
          <div class="goodsNum">{{ shop.cGoods }}</div>
          <div class="goodsTitle">全部宝贝</div>
        </div>
      </div>
      <div class="score">
        <table>
          <tr
            class="description"
            v-for="(item, index) in shop.score"
            :key="index"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.score }}</td>
            <td>
              <span
                :class="{
                  scoreBetter: item.isBetter,
                  scoreNotBetter: !item.isBetter,
                }"
              >
                {{ item.isBetter ? "高" : "低" }}</span
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shopBottom">
      <span class="enterShop">进店逛逛</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shopInfo {
  margin-top: 30px;
  padding: 20px 0 20px 5px;
  border-top: 5px solid #eee;
  border-bottom: 5px solid #eee;
}
.shopLogo {
  width: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.shopName {
  margin-left: 5px;
}
.infoDetail {
  display: flex;
  margin-top: 10px;
  text-align: center;
}

.infoDetail > div {
  flex: 1;
}
.profile {
  display: flex;
  align-items: center;
}
.profile > div {
  flex: 1;
}
.sells .sellTitle,
.goods .goodsTitle {
  margin-top: 5px;
  font-size: 12px;
}
.score {
  display: flex;
  justify-content: center;
}
.description {
  font-size: 14px;
  text-align: left;
}
.description td {
  padding: 3px 5px;
}
.scoreBetter {
  background-color: #f13e3a;
  color: #fff;
}
.scoreNotBetter {
  background-color: #5ea732;
  color: #fff;
}
.shopBottom {
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
}
.enterShop {
  display: inline-block;
  width: 150px;
  height: 30px;
  background-color: #f2f5f8;
  line-height: 30px;
  border-radius: 10px;
}
</style>