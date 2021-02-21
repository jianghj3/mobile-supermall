<template>
  <div class="detailSwiper">
    <swiper class="swiperItem">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <a href="#">
          <img :src="item" alt="" @load="swiperLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    swiperLoad() {
      if (this.flag) {
        this.$emit("swiperLoad");
        this.flag = false;
      }
    },
  },
};
</script>

<style scoped>
.swiperItem {
  overflow: hidden;
  height: 300px;
}
</style>