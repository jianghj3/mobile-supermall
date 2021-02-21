<template>
  <div class="detail">
    <detail-nav-bar @navClick="navClick" ref="navBar" />
    <b-scroll class="bscroll" ref="bscroll" :probeType="3" @scroll="scroll">
      <detail-swiper :topImages="topImages" @swiperLoad="swiperLoad" />
      <base-info :goods="goods" />
      <shop-info :shop="shop" />
      <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <goods-info :goodsParams="goodsParams" ref="goodsInfo" />
      <detail-comment :rate="rate" ref="comment" />
      <h4 class="similarRecomd" ref="recommends">相似推荐</h4>
      <goods-list :goodsList="recommends" />
    </b-scroll>
    <detail-bottom-bar @addCart="addCart" />
    <back-top @click.native="backClick" v-show="isShowBack" />
    <toast :message="message" :show="isShowToast" />
  </div>
</template>

<script>
//导入公共的组件
import BScroll from "components/common/bscroll/BScroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

//导入子组件
import DetailNavBar from "views/detail/childComps/DetailNavBar";
import DetailSwiper from "views/detail/childComps/DetailSwiper";
import BaseInfo from "views/detail/childComps/BaseInfo";
import ShopInfo from "views/detail/childComps/ShopInfo";
import DetailInfo from "views/detail/childComps/DetailInfo";
import GoodsInfo from "views/detail/childComps/GoodsInfo";
import DetailComment from "views/detail/childComps/DetailComment";
import DetailBottomBar from "views/detail/childComps/DetailBottomBar";

//导入方法
import {
  getDetailData,
  Goods,
  Shop,
  GoodsParams,
  getRecommendsData,
} from "network/detail";

import { backTopMixin } from "common/mixins";

export default {
  name: "Detail",
  components: {
    BScroll,
    GoodsList,
    Toast,
    // 使用mixins引入，这里不再需要引入BackTop
    // BackTop,

    DetailNavBar,
    DetailSwiper,
    BaseInfo,
    ShopInfo,
    DetailInfo,
    GoodsInfo,
    DetailComment,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      rate: {},
      recommends: [],
      navOffsetTop: [],
      isShowToast: false,
      message: "",
    };
  },
  mixins: [backTopMixin],
  created() {
    this.iid = this.$route.params.iid;
    this.getDetailData(this.iid);
    this.getRecommendsData();
  },
  // mounted() {
  //   //监听图片加载
  //   this.$bus.$on("itemImageLoad", () => {
  //     this.$refs.bScroll.refresh();
  //     this.goodsInfoOffsetTop = this.$refs.goodsInfo.$el.offsetTop;
  //   });
  // },
  methods: {
    getDetailData(iid) {
      getDetailData(iid).then((res) => {
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        this.shop = new Shop(data.shopInfo);
        this.detailInfo = data.detailInfo;
        this.goodsParams = new GoodsParams(
          data.itemParams.info,
          data.itemParams.rule
        );
        if (data.rate.cRate != 0) {
          this.rate = data.rate;
        }
      });
    },
    imageLoad() {
      this.$refs.bscroll.refresh();
      this.navOffsetTop = [];
      this.navOffsetTop.push(0);
      //注意压进去的是正值，但滚动位置为负值
      this.navOffsetTop.push(this.$refs.goodsInfo.$el.offsetTop);
      this.navOffsetTop.push(this.$refs.comment.$el.offsetTop);
      this.navOffsetTop.push(this.$refs.recommends.offsetTop);
    },
    swiperLoad() {
      this.$refs.bscroll.refresh();
    },
    getRecommendsData() {
      getRecommendsData().then((res) => {
        this.recommends = res.data.list;
      });
    },
    navClick(index) {
      this.$refs.bscroll.scrollTo(0, -this.navOffsetTop[index]);
    },
    scroll(position) {
      this.isShowBack = -position.y >= 1000;
      const length = this.navOffsetTop.length;
      for (let i = 0; i < length; i++) {
        if (
          (i < length - 1 &&
            -position.y >= this.navOffsetTop[i] &&
            -position.y < this.navOffsetTop[i + 1]) ||
          (i == length - 1 && -position.y >= this.navOffsetTop[i])
        ) {
          this.$refs.navBar.currentNavIndex = i;
        }
      }
    },
    addCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.detailInfo.desc;
      product.price = this.goods.newPrice;
      product.realPrice = this.goods.realPrice;
      product.iid = this.iid;

      this.$store.dispatch("addCart", product).then((res) => {
        this.isShowToast = true;
        this.message = res;
        const timer = setTimeout(() => {
          this.isShowToast = false;
          this.message = "";
        }, 2000);
      });
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  height: 100vh;
  background-color: #fff;
  z-index: 9;
}
.bscroll {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
}
.similarRecomd {
  margin: 10px 6px;
}
</style>