<template>
  <div v-loading="contentLoading" class="app-versions" element-loading-background="rgba(0, 0, 0, 0)">
    <div class="top-wrapper">
      <div class="top" :class="topArrowClass">
        <img
            alt="图标"
            width="100"
            height="100"
            style="cursor: pointer"
            :src="currentVersion.icon||'/img/app.png'"
            @click="tabActive=0">
        <div class="info">
          <el-button size="mini" style="color: #F8BA0B;margin-right: 10px">{{url}}</el-button>
          <el-button-group>
            <el-button size="mini">包名</el-button>
            <el-button size="mini">{{appInfo.packageName}}</el-button>
          </el-button-group>
          <el-button-group style="margin-left: 10px">
            <el-button size="mini">下载次数</el-button>
            <el-button size="mini">{{appInfo.downloadCount}}</el-button>
          </el-button-group>
        </div>
        <div class="edit">
          <div class="edit-item" @click="tabActive=1">
            <i class="el-icon-tickets"/>
            <div>基本信息</div>
          </div>
          <div class="edit-divider"/>
          <div class="edit-item" @click="tabActive=2">
            <i class="el-icon-tickets"/>
            <div>应用合并</div>
          </div>
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
    <el-form
        ref="form"
        :model="appInfo"
        label-width="80px"
        class="tab">
      <div v-if="tabActive===0" class="version-list tab">
        <el-timeline>
          <el-timeline-item
              v-for="item in appInfo.versions"
              :key="item"
              :timestamp="item.versionName+'（Build ' +item.versionCode+'）'+item.name"
              placement="top"
              color="#9B9B9B">
            <div>
              <div class="item-time"><i class="el-icon-date"/>{{item.createTime}}</div>
              <pre class="change-log">{{item.changeLog}}</pre>
              <div class="item-btn-wrapper">
                <i class="el-icon-edit item-icon" @click="$refs.appVersionEdit.open(item)"/>
                <div class="item-icon" style="margin-left: 10px" @click="download(item.id)">
                  <i class="el-icon-download"/>{{(item.size/1024).toFixed(2)}} MB
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div v-if="tabActive===1">
        <el-form-item label="应用名称" prop="name" :rules="ruleNotNull">
          <el-input v-model="appInfo.name" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="短链接" prop="shortCode" :rules="ruleNotNull">
          <el-input v-model="appInfo.shortCode" style="width: 300px">
            <template slot="prepend">{{host}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="应用描述">
          <el-input v-model="appInfo.description" type="textarea" :rows="4"/>
        </el-form-item>
        <el-button :loading="submitLoading" type="warning" class="save-btn" @click="handleSubmit(1)">保存</el-button>
        <el-button :loading="submitLoading" type="error" class="save-btn" @click="handleSubmit(1)">删除</el-button>
      </div>
      <div v-if="tabActive===2">
        <el-form-item label="ios商店地址" prop="iosUrl" :rules="ruleNotNull" label-width="105px">
          <el-input v-model="appInfo.iosUrl"/>
        </el-form-item>
        <el-button :loading="submitLoading" type="warning" class="save-btn" @click="handleSubmit(2)">保存</el-button>
      </div>
    </el-form>
    <app-version-edit ref="appVersionEdit" @save-success="getAppList"/>
  </div>
</template>

<script>
  import {mutations} from "@/store/store";
  import AppVersionEdit from "@/views/appDetail/AppVersionEdit";

  export default {
    components: {AppVersionEdit},
    data() {
      return {
        contentLoading: true,
        submitLoading: false,
        id: null,
        appInfo: {
          versions: [],
          name: "",
          shortCode: "",
          description: "",
          iosUrl: "",
          downloadCount: 0,
        },
        host: window.location.host,
        tabActive: 0,
        ruleNotNull: {required: true, message: "不能为空"},
      };
    },
    computed: {
      currentVersion() {
        if (this.appInfo && this.appInfo.versions && this.appInfo.versions.length) {
          return this.appInfo.versions[0];
        }
        return {};
      },
      topArrowClass() {
        return {
          topTab1: this.tabActive === 1,
          topTab2: this.tabActive === 2,
        };
      },
      url() {
        let shortCode = this.appInfo.shortCode;
        return shortCode ? (document.location.protocol + "//" + window.location.host + "/" + shortCode) : "";
      },
    },
    mounted() {
      this.id = this.$route.params.id;
      if (this.id) {
        this.getAppList();
      }
    },
    methods: {
      getAppList() {
        this.contentLoading = true;
        this.$http.get(`apps/${this.id}`).then(res => {
          this.contentLoading = false;
          this.appInfo = res.data;
          this.setBreadcrumbs();
        }).catch(() => {
          this.contentLoading = false;
        });
      },
      download(filename) {
        window.open(window.config.serverUrl + "appVersions/downloadApk/" + filename);
      },
      gotoPreview() {
        window.open("/" + this.appInfo.shortCode, "_blank");
      },
      setBreadcrumbs() {
        mutations.setBreadcrumbs([
          {name: "我的应用", path: "/"},
          {name: this.appInfo.name},
        ]);
      },
      handleSubmit(tabActive) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            let body = {
              id: this.appInfo.id,
            };
            if (tabActive === 1) {
              body.name = this.appInfo.name;
              body.shortCode = this.appInfo.shortCode;
              body.description = this.appInfo.description;
            } else if (tabActive === 2) {
              body.iosUrl = this.appInfo.iosUrl;
            }
            this.$http
              .put("apps", body)
              .then(() => {
                this.submitLoading = false;
                this.$message.success("保存成功");
              })
              .catch(() => {
                this.submitLoading = false;
              });
          }
        });
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

        .edit {
          position: absolute;
          left: 120px;
          top: 115px;
          display: flex;
        }

        .edit-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #999;
          font-size: 14px;
          cursor: pointer;

          i {
            margin-bottom: 10px;
            font-size: 28px;
          }
        }

        .edit-item-active {
          color: #444;
        }

        .edit-divider {
          height: 50px;
          border-left: 1px solid #999;
          margin: 3px 25px 0;
        }

        .right-btn {
          position: absolute;
          right: 5px;
          width: 120px;
        }
      }

      .topTab1 {
        &:before {
          left: 135px;
        }
      }

      .topTab2 {
        &:before {
          left: 245px;
        }
      }
    }

    .version-list {
      background-color: #F6F6F6;

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

    .tab {
      width: 1020px;
      margin: 50px auto 0;
      padding-bottom: 50px;
    }

    .item-time {
      font-size: 12px;
      color: #9b9b9b;
      margin-top: 15px;

      i {
        margin-right: 5px;
      }
    }

    .save-btn {
      margin-left: 30px;
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