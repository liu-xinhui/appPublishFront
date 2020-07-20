<template>
  <div v-loading="contentLoading" class="app-versions">
    <div class="top">
      <img
          alt="图标"
          width="100"
          height="100"
          :src="currentVersion.icon">
      <div class="info">
        <el-button size="mini" style="color: #F8BA0B;margin-right: 10px">http://fir.sout.fun/zhhwb</el-button>
        <el-button-group>
          <el-button size="mini">包名</el-button>
          <el-button size="mini">{{appInfo.packageName}}</el-button>
        </el-button-group>
        <el-button-group style="margin-left: 10px">
          <el-button size="mini" icon="el-icon-download"/>
          <el-button size="mini">1000</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        contentLoading: true,
        appInfo: {
          versions: [],
        },
      };
    },
    computed: {
      currentVersion() {
        if (this.appInfo && this.appInfo.versions && this.appInfo.versions.length) {
          return this.appInfo.versions[0];
        }
        return {};
      },
    },
    mounted() {
      this.getAppList(this.$route.params.id);
    },
    methods: {
      getAppList(id) {
        this.contentLoading = true;
        this.$http.get(`apps/${id}`).then(res => {
          this.contentLoading = false;
          this.appInfo = res.data;
        }).catch(() => {
          this.contentLoading = false;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../style/variables";

  .app-versions {
    .top {
      display: flex;
      background-color: white;
      justify-content: center;
      padding: 60px 0 40px 0;
      position: relative;
      border-bottom: 1px solid rgba(208,208,208,.5);

      &:before {
        position: absolute;
        bottom: -52px;
        left: 38px;
        z-index: 2;
        width: 24px;
        height: 24px;
        border: 1px solid rgba(208, 208, 208, .5);
        border-right: none;
        border-bottom: none;
        background-color: #F6F6F6;
        content: ' ';
        transition: all .25s;
        transform: rotate(45deg);
      }

      .info {
        margin-left: 50px;
      }
    }

  }
</style>