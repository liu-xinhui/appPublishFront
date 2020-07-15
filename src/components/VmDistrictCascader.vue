<template>
  <div class="vm-district" style="width: 100%">
    <el-cascader
        ref="cascader"
        v-model="value"
        style="width: 100%;"
        :props="props"
        clearable
        @change="onChange"/>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      let that = this;
      return {
        value: null,
        options: null,
        props: {
          multiple: true,
          lazy: true,
          lazyLoad(node, resolve) {
            const {root} = node;
            let nodeData = root ? that.$cache.getCities() : node.data.childrenData;
            let nodes;
            if (nodeData) {
              nodes = Object.values(nodeData)
                .map((item) => ({
                  value: item.regionId,
                  label: item.name,
                  leaf: !item.leafRegionsMap,
                  childrenData: item.leafRegionsMap,
                }));
            }
            resolve(nodes);
          },
        },
      };
    },
    mounted() {
    },
    methods: {
      onChange(selected) {
        let cityIdSet = new Set();
        let areaIds = [];
        selected.forEach(item => {
          cityIdSet.add(item[0]);
          areaIds.push(item[1]);
        });
        this.$emit("change", [...cityIdSet], areaIds);
      },
      clear() {
        this.value = [];
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
