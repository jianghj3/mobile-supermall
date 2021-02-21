<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detailInfo">
    <div class="infoDesc">
      <div class="descStart"></div>
      <div class="descContent">{{ detailInfo.desc }}</div>
      <div class="descEnd"></div>
    </div>
    <div class="infoKey">{{ detailInfo.detailImage[0].key }}</div>
    <div
      class="infoImages"
      v-for="(item, index) in detailInfo.detailImage[0].list"
      :key="index"
    >
      <img :src="item" alt="" class="infoImagesItem" @load="imageLoad" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imageLength: 0,
    };
  },
  methods: {
    imageLoad() {
      if (++this.counter == this.imageLength) {
        this.$emit("imageLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      this.imageLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.detailInfo {
  padding-bottom: 20px;
  border-bottom: 5px solid #eee;
}
.infoDesc {
  margin: 20px 10px 0;
  font-size: 14px;
}
.descStart,
.descEnd {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.descContent {
  padding: 25px 0;
}
.descStart {
  float: left;
}
.descEnd {
  float: right;
}
.descStart::before,
.descEnd::before {
  display: block;
  position: absolute;
  top: -5px;
  width: 5px;
  height: 5px;
  background-color: #333;
  content: "";
}
.descEnd::before {
  right: 0;
}
.infoKey {
  margin: 10px;
}
.infoImagesItem {
  width: 100%;
}
</style>