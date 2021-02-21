<template>
  <div v-if="Object.keys(goodsParams).length !== 0" class="goodsInfo">
    <div class="sizes">
      <table class="sizesTable">
        <tr v-for="(item, index) in goodsParams.sizes[0]" :key="index">
          <td v-for="(itemContrnt, indexTd) in item" :key="indexTd">
            {{ itemContrnt }}
          </td>
        </tr>
      </table>
    </div>
    <div class="info">
      <table class="infoTable">
        <tr v-for="(item, index) in goodsParams.info" :key="index">
          <td class="infoKey">{{ item.key }}</td>
          <td class="infoValue">{{ item.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsInfo",
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.goodsInfo {
  width: 100%;
  padding-top: 10px;
  text-align: center;
  font-size: 14px;
}

.sizes .sizesTable {
  width: 100%;
  border-bottom: 5px solid #eee;
}
.sizesTable tr {
  display: flex;
}
.sizesTable td {
  flex: 1;
}
.sizesTable td,
.infoTable td {
  padding: 10px 0;
}

.infoTable {
  width: 100%;
}
.infoTable tr {
  display: flex;
}
.infoTable tr .infoKey {
  flex: 1;
}
.infoTable tr .infoValue {
  flex: 4;

  color: #eb4868;
}
</style>