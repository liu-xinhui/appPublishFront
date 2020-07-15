<template>
  <div>asdf</div>
</template>
<script>
  export default {
    data() {
      return {
        citiesJson: {},
        data: [],
        value: [],
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
    methods: {},
  };
</script>
<style lang="scss" scoped>
</style>
