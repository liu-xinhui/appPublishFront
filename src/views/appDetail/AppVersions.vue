<template>
  <div v-loading="contentLoading" class="app-versions">
    <div class="top-wrapper">
      <div class="top">
        <img
            alt="图标"
            width="100"
            height="100"
            :src="currentVersion.icon||'/img/app.png'">
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
        <el-button
            size="default"
            type="success"
            icon="el-icon-view"
            class="right-btn"
            @click="gotoPreview">
          预览
        </el-button>
      </div>
    </div>
    <div class="version-list">
      <el-timeline>
        <el-timeline-item
            v-for="item in appInfo.versions"
            :key="item"
            :timestamp="item.versionName+'（Build ' +item.versionCode+'）'"
            placement="top"
            color="#9B9B9B">
          <div>
            <div class="item-time"><i class="el-icon-date"/>{{item.createTime}}</div>
            <pre class="change-log">{{item.changeLog}}</pre>
            <div class="item-btn-wrapper">
              <i class="el-icon-edit item-icon"/>
              <div class="item-icon" style="margin-left: 10px" @click="download(item.downloadUrl)">
                <i class="el-icon-download"/>{{(item.size/1024).toFixed(2)}} MB
              </div>
              <div class="item-icon" style="margin-left: 10px"><i class="el-icon-view"/>预览</div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
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
      download(filename) {
        window.open(window.config.serverUrl + "apps/downloadApk/" + filename);
      },
      gotoPreview() {
        window.open("/" + this.appInfo.shortCode, "_blank");
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../style/variables";

  .app-versions {
    .top-wrapper {
      background-color: white;
      border-bottom: 1px solid rgba(208, 208, 208, .5);

      .top {
        position: relative;
        margin: 0 auto;
        width: 1020px;
        background-color: white;
        padding: 60px 0 40px 0;

        &:before {
          position: absolute;
          bottom: -13px;
          left: 35px;
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
          position: absolute;
          left: 120px;
          display: inline-block;
        }

        .right-btn {
          position: absolute;
          right: 5px;
          width: 120px;
        }
      }
    }

    .version-list {
      background-color: #F6F6F6;
      width: 1020px;
      margin: 50px auto 0;

      .item-btn-wrapper {
        margin-top: 10px;

        .item-icon {
          display: inline-block;
          border: 1px solid #aaa;
          height: 30px;
          line-height: 31px;
          padding: 0 11px;
          border-radius: 15px;
          cursor: pointer;

          &:hover {
            background-color: $color-primary;
            color: white;
            border: 1px solid white;
          }
        }

        i {
          margin-right: 4px;
        }
      }

      pre {
        display: block;
        font-size: 13px;
        word-break: break-all;
        word-wrap: break-word;
        border-radius: 3px;
        margin: 14px 0;
        padding: 0;
        border: none;
        background-color: transparent;
        color: #4a4a4a;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        line-height: 20px;
      }
    }

    .item-time {
      font-size: 12px;
      color: #9b9b9b;
      margin-top: 15px;

      i {
        margin-right: 5px;
      }
    }

    /deep/ .el-timeline-item__timestamp {
      font-size: 20px;
      color: #4a4a4a;
    }

    /deep/ .el-timeline-item__wrapper {
      top: -20px;
      left: 5px;
      padding-bottom: 50px;
    }
  }
</style>