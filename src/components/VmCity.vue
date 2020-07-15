<template>
  <el-transfer
      :value="cityIds"
      style="width: 600px"
      filterable
      filter-placeholder="输入城市名称搜索"
      :titles="['可选城市', '已选城市']"
      :data="data"
      @change="onChange"/>
</template>
<script>
  export default {
    props: {
      cityIds: [Array],
    },
    data() {
      return {
        citiesJson: {},
        data: [],
      };
    },
    mounted() {
      this.citiesJson = this.$cache.getCities();
      this.data = Object.values(this.citiesJson).map(item => {
        return {
          label: item.name,
          key: item.regionId,
        };
      });
    },
    methods: {
      onChange(value) {
        console.log(value);
        this.$emit("update:cityIds", value);
      },
    },
  };
</script>
<style lang="scss" scoped>
</style>