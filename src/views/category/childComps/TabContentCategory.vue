<template>
  <div class="contentCategory">
    <div
      class="contentCategoryItem"
      v-for="(item, index) in subCategories.list"
      :key="index"
    >
      <a href="item.link">
        <img :src="item.image" alt="" class="image" @load="imageLoad" />
        <div class="title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    subCategories: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      imageCount: 0,
    };
  },
  methods: {
    imageLoad() {
      this.imageCount++;
      if (this.imageCount === this.subCategories.list.length) {
        this.$emit("imageLoad");
        this.imageCount = 0;
      }
    },
  },
};
</script>

<style scoped>
.contentCategory {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.contentCategory .contentCategoryItem {
  width: 30%;
  margin-left: 0.15625rem;
  margin-top: 0.46875rem;
}
.contentCategory .image {
  width: 100%;
}
.contentCategory .title {
  margin-top: 0.15625rem;
}
</style>