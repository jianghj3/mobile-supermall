<template>
  <div class="detailNavBar">
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="navCenter">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="navItem"
          @click="navItemClick(index)"
          :class="{ currentNav: currentNavIndex == index }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
//导入公共的组件
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentNavIndex: 0,
    };
  },
  methods: {
    navItemClick(index) {
      this.currentNavIndex = index;
      this.$emit("navClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.detailNavBar .back {
  text-align: center;
  line-height: 44px;
}
.detailNavBar .back img {
  vertical-align: middle;
}
.navCenter {
  display: flex;
}
.navItem {
  flex: 1;
  font-size: 14px;
}
.currentNav {
  color: var(--color-high-text);
}
</style>