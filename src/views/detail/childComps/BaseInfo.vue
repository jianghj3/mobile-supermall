<template>
  <div v-if="Object.keys(goods).length !== 0" class="baseInfo">
    <p class="title">{{ goods.title }}</p>
    <div class="price">
      <span class="newPrice">{{ goods.newPrice }}</span>
      <span class="oldPrice">{{ goods.oldPrice }}</span>
      <span v-if="Object.keys(goods.discount).length !== 0" class="discount">{{
        goods.discount
      }}</span>
    </div>
    <div class="sales">
      <div class="salesNum">{{ goods.columns[0] }}</div>
      <div class="collect">{{ goods.columns[1] }}</div>
      <div class="delivery">
        {{ goods.services[goods.services.length - 1].name }}
      </div>
    </div>
    <div class="services">
      <div
        v-for="index in goods.services.length - 1"
        :key="index"
        class="serviceItem"
      >
        <img :src="goods.services[index - 1].icon" alt="" class="serviceIcon" />
        <span class="serviceName">{{ goods.services[index - 1].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.baseInfo {
  margin: 10px 5px 0;
}
.title {
  color: #646463;
}
.price {
  position: relative;
  margin-top: 10px;
}
.price .newPrice {
  color: var(--color-high-text);
  font-size: 20px;
}
.price .oldPrice {
  margin: 0 3px;
  font-size: 12px;
  text-decoration: line-through;
}
.price .discount {
  position: absolute;
  top: -5px;
  padding: 2px 5px;
  background-color: var(--color-high-text);
  color: #fff;
  font-size: 14px;
  border-radius: 10px;
}
.sales {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 12px;
  color: #bbbbba;
}
.sales .collect {
  flex: 1;
  text-align: center;
}
.services {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 12px;
}

.serviceItem .serviceIcon {
  width: 12px;
}
.serviceItem .serviceName {
  margin-left: 2px;
}
</style>