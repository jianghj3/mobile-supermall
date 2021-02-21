<template>
  <div id="home">
    <nav-bar class="home-nav">
      <slot slot="center">购物街</slot>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl2"
      class="tabControl"
      v-show="isFixed"
    />
    <b-scroll
      class="wrapper"
      ref="bscroll"
      @scroll="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        class="home-swiper"
        @swiperImageLoad="swiperImageLoad"
      />
      <recommend-view :recommends="recommends"> </recommend-view>
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl1" />
      <goods-list :goodsList="showGoods" />
    </b-scroll>
    <back-top @click.native="backClick" v-show="isShowBack" />
  </div>
</template>

<script>
//1.引入公共组件
import NavBar from "components/common/navbar/NavBar";
import BScroll from "components/common/bscroll/BScroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

//2.引入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

//3.引入方法/常量
import { getHomeMultidata, getHomeGoods } from "network/home";
import { BACKTOP_DISTANCE } from "common/const";

export default {
  name: "Home",
  components: {
    NavBar,
    BScroll,
    TabControl,
    GoodsList,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView,
  },

  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "推荐"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBack: false,
      isFixed: false,
      tabOffsetTop: 0,
      scrollY: 0,
    };
  },
  created() {
    //请求轮播图和推荐板块数据
    //记得加this,不加的话使用的是导入的方法，而这里是要使用methods中的方法
    this.getHomeMultidata();

    //请求goods数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听图片加载
    this.$bus.$on("itemImageLoad", () => {
      this.$refs.bscroll.refresh();
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.bscroll.scrollTo(0, this.scrollY, 0);
    this.$refs.bscroll.refresh();
  },
  deactivated() {
    this.scrollY = this.$refs.bscroll.getScrollY();
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.bscroll.scrollTo(0, 0);
    },
    scroll(position) {
      this.isShowBack = -position.y >= BACKTOP_DISTANCE;
      this.isFixed = -position.y >= this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },

    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.bscroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.wrapper {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
}
.tabControl {
  position: relative;
  z-index: 9;
}
</style>