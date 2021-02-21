<template>
  <div id="category">
    <!-- 引入顶部NavBar -->
    <nav-bar class="categoryNav">
      <slot slot="center">商品分类</slot>
    </nav-bar>
    <!-- 展示内容 -->
    <div class="content">
      <tab-menu class="menu" :categories="categories" @menuClick="menuClick" />
      <b-scroll class="bScroll" ref="scroll">
        <tab-content-category
          :subCategories="showSubCategories"
          @imageLoad="imageLoad"
        />
        <tab-control
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
          class="tabControl"
        />
        <goods-list :goodsList="showGoodsList" />
      </b-scroll>
    </div>
  </div>
</template>

<script>
// 引入公共组件
import NavBar from "components/common/navbar/NavBar";
import BScroll from "components/common/bscroll/BScroll";
import GoodsList from "components/content/goods/GoodsList";
import TabControl from "components/content/tabControl/TabControl";

// 引入子组件
import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";

// 引入方法/常量
import {
  getCategory,
  getSubCategory,
  getCategoryDetail,
} from "network/category";
import { POP, NEW, SELL } from "common/const";
import { tabControlMixin } from "common/mixins";

export default {
  name: "Category",
  components: {
    NavBar,
    BScroll,
    GoodsList,
    TabControl,

    TabMenu,
    TabContentCategory,
  },
  data() {
    return {
      categories: [],
      currentIndex: -1,
      categoryData: {},
    };
  },
  mixins: [tabControlMixin],
  created() {
    // 请求分类数据
    this._getCategory();
  },
  computed: {
    showSubCategories() {
      // 调用数据为异步函数，因此需首先判断其是否有数据
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subCategories;
    },
    showGoodsList() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    // 网络请求相关方法
    _getCategory() {
      getCategory().then((res) => {
        this.categories = res.data.category.list;
        // 初始化每个类别的数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subCategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }

        // 请求第一个分类的数据
        this._getSubCategories(0);
      });
    },
    _getSubCategories(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubCategory(maitKey).then((res) => {
        this.categoryData[index].subCategories = res.data;

        // 必须要写这行代码，menu右边的内容才会一开始就展示出来，并且实时更新，
        // 但不知道为什么
        this.categoryData = { ...this.categoryData };
        // 请求子分类详情数据
        this._getCategoryDetail(POP);
        this._getCategoryDetail(NEW);
        this._getCategoryDetail(SELL);
      });
    },
    _getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((res) => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },

    // 事件监听函数
    menuClick(currentIndex) {
      this._getSubCategories(currentIndex);
    },

    // 更新betterScroll的高度
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>

<style scoped>
.categoryNav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 0.4375rem;
}
.content {
  display: flex;
}
.menu {
  width: 30%;
}
.bScroll {
  width: 70%;
  height: calc(100vh - 2.90625rem);
  overflow: hidden;
}
.tabControl {
  margin: 0.3125rem 0;
}
</style>