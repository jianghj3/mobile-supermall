<template>
  <div id="recommend-view">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div class="title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
#recommend-view {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 5px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  margin-left: 5px;
}
.recommend-item a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.recommend-item img {
  width: 80%;
}
.recommend-item .title {
  margin-top: 5px;
}
</style>