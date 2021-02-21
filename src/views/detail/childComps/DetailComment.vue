<template>
  <div v-if="Object.keys(rate).length != 0" class="detailComment">
    <div class="commentHead">
      <span class="userComment">用户评价</span>
      <span class="more">更多</span>
    </div>
    <div class="commentContent" v-for="(item, index) in rate.list" :key="index">
      <div class="userInfo">
        <img :src="item.user.avatar" alt="" class="avatar" />
        <span class="uname">{{ item.user.uname }}</span>
      </div>
      <div class="commetnText">{{ item.content }}</div>
      <div class="extraInfo">
        <span class="commentTime">{{ item.created | showDate }}</span>
        <span>{{ item.style }}</span>
      </div>
      <div class="commentImages">
        <img
          :src="img"
          alt=""
          v-for="(img, imgIndex) in item.images"
          :key="imgIndex"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";

export default {
  name: "DetailComment",
  props: {
    rate: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      const date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style scoped>
.detailComment {
  margin-top: 20px;
  padding: 0 8px 20px;
  border-bottom: 5px solid #eee;
}
.commentHead {
  padding: 10px 0;
  border-top: 3px solid #eee;
  border-bottom: 3px solid #eee;
}
.more {
  float: right;
  font-size: 14px;
}
.commentContent {
  margin-top: 10px;
}
.avatar {
  width: 45px;
  border-radius: 50%;
  vertical-align: middle;
}
.uname {
  margin-left: 5px;
}
.commetnText {
  padding: 5px 0;
  font-size: 14px;
}
.extraInfo {
  padding: 5px 0;
  font-size: 12px;
}
.commentTime {
  margin-right: 10px;
}
.commentImages img {
  width: 20%;
  margin-right: 5px;
}
</style>