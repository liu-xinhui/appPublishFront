<template>
  <div v-loading="contentLoading" class="main-home">
    <el-upload
        ref="upload"
        class="card upload"
        drag
        accept=".apk"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="uploadChange"
        :on-error="uploadError"
        :on-progress="uploadProgress"
        :on-success="uploadSuccess"
        :data="uploadAppInfo"
        :action="uploadUrl">
      <div class="upload-text">
        <i class="el-icon-upload"/>
        <div>将文件拖到此处，或<em>点击上传</em></div>
      </div>
    </el-upload>
    <div v-for="item in appList" :key="item.id" class="card app">
      <img
          alt="图标"
          width="100"
          height="100"
          :src="item.currentVersion.icon">
      <div class="app-name">{{item.name}}</div>
      <table>
        <tr>
          <td>短链接:</td>
          <td>http://fir.sout.fun/{{item.currentVersion.shortCode}}</td>
        </tr>
        <tr>
          <td>PackageName:</td>
          <td>{{item.packageName}}</td>
        </tr>
        <tr>
          <td>最新版本:</td>
          <td>{{item.currentVersion.versionName}} (Build {{item.currentVersion.versionCode}})</td>
        </tr>
      </table>
      <div class="app-btn">
        <el-button icon="el-icon-edit" round>编辑</el-button>
        <el-button icon="el-icon-view" round style="margin-left: 10px">预览</el-button>
      </div>
    </div>
    <app-upload-dialog
        ref="appUploadDialog"
        @upload="$refs.upload.submit()"
        @appInfo="onAppInfo"/>
  </div>
</template>

<script>
  import AppUploadDialog from "@/views/appList/AppUploadDialog";

  export default {
    components: {AppUploadDialog},
    data() {
      return {
        contentLoading: true,
        appList: [],
        uploadUrl: window.config.serverUrl + "apps/upload",
        uploadAppInfo: null,
      };
    },
    mounted() {
      this.getAppList();
    },
    methods: {
      getAppList() {
        this.contentLoading = true;
        this.$http.get("apps").then(res => {
          this.appList = res.data;
          this.contentLoading = false;
        }).catch(() => {
          this.contentLoading = false;
        });
      },
      uploadChange(file) {
        if (file.status === "ready") {
          this.$refs.appUploadDialog.open(file);
        }
      },
      uploadError() {
        this.$refs.appUploadDialog.close();
        this.$message.error("上传失败，请重试");
      },
      uploadProgress(event) {
        this.$refs.appUploadDialog.onProgress(event);
      },
      uploadSuccess() {
        this.$refs.appUploadDialog.close();
        this.$message.success("上传成功");
      },
      onAppInfo(appInfo) {
        this.uploadAppInfo = appInfo;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../style/variables";

  .main-home {
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    width: 1020px;
    margin: 0 auto;
    padding: 20px 0;

    .card {
      margin: 12px;
      width: 30.5%;
      cursor: pointer;
      height: 430px;
      background-color: #fff;
      padding: 0;
      transition: all .25s;

      i {
        transition: all .25s;
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, .1);

        .app-name {
          color: #4a4a4a;
        }

        i {
          transform: scale(1.2);
        }
      }
    }

    .upload {
      background-color: $color-primary;

      i {
        color: white;
        font-size: 85px;
        margin-bottom: 25px;
      }

      .upload-text {
        color: white;
        font-size: 17px;
        margin-top: 135px;
      }
    }

    .app {
      position: relative;
      box-sizing: border-box;
      padding: 50px 45px 45px 45px;

      .app-name {
        font-size: 18px;
        margin: 25px 0;
      }

      table {
        font-size: 12px;

        td {
          padding: 4px 0;
        }

        td:last-child {
          padding-left: 10px;
          color: #1A1A1A
        }
      }

      .app-btn {
        text-align: center;
        margin: 60px auto 0;
      }
    }
  }
</style>
<style lang="scss">
  .main-home {
    .card {
      .el-upload, .el-upload-dragger {
        width: 100%;
        height: 100%;
      }

      .el-upload-dragger {
        background-color: transparent;
        border: none;
      }

      .el-upload-dragger.is-dragover {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 0;
      }
    }
  }
</style>