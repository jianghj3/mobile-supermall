<template>
  <b-scroll class="wrapper">
    <div class="category">
      <div
        class="categoryItem"
        v-for="(item, index) in categories"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="menuClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </b-scroll>
</template>

<script>
import BScroll from "components/common/bscroll/BScroll";

export default {
  name: "TabMenu",
  components: {
    BScroll,
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    menuClick(index) {
      this.currentIndex = index;

      this.$emit("menuClick", index);
    },
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
  height: calc(100vh - 2.59375rem);
  background-color: #eee;
  text-align: center;
  font-size: 0.4375rem;
  color: #555;
}
.categoryItem {
  padding: 0.46875rem 0;
}
.active {
  border-left: 0.09375rem solid var(--color-tint);
  background-color: #fff;
  font-weight: 700;
  color: var(--color-tint);
}
</style>