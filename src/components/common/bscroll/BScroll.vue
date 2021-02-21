<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "BScroll",
  data() {
    return {
      bscroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  methods: {
    //形参的默认值可以直接以等号的形式进行赋值
    scrollTo(x, y, time = 500) {
      //确认存在bscroll后再调用方法，不然报错undefined
      this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      setTimeout(() => {
        this.bscroll.finishPullUp();
      }, 2000);
    },
    refresh() {
      //确认存在bscroll后再调用方法，不然报错undefined
      this.bscroll && this.bscroll.refresh();
    },
    getScrollY() {
      return this.bscroll ? this.bscroll.y : 0;
    },
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    this.bscroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
    this.bscroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
  },
};
</script>

<style scoped>
</style>