<template>
  <div class="vm-district" style="width: 100%">
    <el-select
        :value="cityId?cityId:''"
        placeholder="请选择"
        filterable
        clearable
        @change="onCityChange">
      <el-option
          v-for="item in cityOptions"
          :key="item.regionId"
          :label="item.name"
          :value="item.regionId"/>
    </el-select>
    <span class="vm-search-label">区域</span>
    <el-select
        :value="areaId?areaId:''"
        placeholder="请选择"
        clearable
        @change="onAreaChange">
      <el-option
          v-for="item in areaOptions"
          :key="item.regionId"
          :label="item.name"
          :value="item.regionId"/>
    </el-select>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      cityId: [Number, String],
      areaId: [Number, String],
    },
    data() {
      return {
        cityOptions: null,
      };
    },
    computed: {
      areaOptions() {
        if (this.cityOptions && this.cityOptions[this.cityId]) {
          return this.cityOptions[this.cityId].leafRegionsMap;
        } else {
          return {};
        }
      },
    },
    mounted() {
      this.cityOptions = this.$cache.getCities();
    },
    methods: {
      onCityChange(cityId) {
        this.$emit("update:cityId", cityId);
        this.$emit("update:areaId", "");
      },
      onAreaChange(areaId) {
        this.$emit("update:areaId", areaId);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .vm-district {
    display: flex;

    .vm-search-label {
      font-size: 13px;
      color: #333;
      line-height: 26px;
      padding-left: 10px;
      padding-right: 5px;
      white-space: nowrap;
    }
  }
</style>
