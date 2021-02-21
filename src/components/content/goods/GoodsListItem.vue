<template>
  <div
    v-if="Object.keys(goodsListItem).length !== 0"
    class="goods-list-item"
    @click="itemClick"
  >
    <img :src="showImage" alt="" @load="imgLoad" />
    <div class="text">
      <p>{{ goodsListItem.title }}</p>
      <span class="price">￥{{ goodsListItem.price }}</span>
      <span class="collect">{{ goodsListItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsListItem.iid);
    },
  },
  computed: {
    showImage() {
      return (
        // this.goodsListItem.img必须放最前面,不然报错img未找到（受后面show img的影响）
        this.goodsListItem.img ||
        this.goodsListItem.image ||
        this.goodsListItem.show.img
      );
    },
  },
};
</script>

<style>
.goods-list-item {
  position: relative;
  width: 48%;
  padding-bottom: 45px;
  font-size: 12px;
  text-align: center;
}
.goods-list-item a {
  height: 100%;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-list-item .text {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  margin-top: 5px;
}
.goods-list-item p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}
.goods-list-item span {
  display: inline-block;
  margin-left: 10px;
}
.goods-list-item .price {
  color: var(--color-tint);
}
.goods-list-item .collect::before {
  content: "♥";
  margin-right: 2px;
  color: red;
  font-size: 16px;
}
</style>