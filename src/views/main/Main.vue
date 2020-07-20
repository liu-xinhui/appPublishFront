<template>
  <div class="vm-main">
    <head-bar class="vm-main-header"/>
    <div class="vm-main-page">
      <router-view class="vm-page"/>
    </div>
  </div>
</template>
<script>
  import HeadBar from "./HeadBar.vue";

  export default {
    components: {
      HeadBar,
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<style lang="scss">
  @import "../../style/variables";

  .vm-main {
    .vm-main-page {
      background-color: #F6F6F6;

      .vm-page {
        margin: 0 auto;
      }
    }
  }
</style>
