<template>
  <el-dialog
      v-el-drag-dialog
      class="no-padding"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      top="3vh"
      width="600px">
    <el-form
        ref="form"
        v-loading="contentLoading"
        size="default"
        :model="model"
        :rules="ruleValidate"
        class="app-upload-dialog"
        label-width="150px">
      <div class="title">
        <img
            alt="图标"
            width="100"
            height="100"
            :src="model.icon">
        <div style="margin-left: 35px;padding-top: 10px;width: 100%">
          <span>{{model.versionName}} (Build {{model.versionCode}}) </span>
          <el-form-item prop="appName" label-width="0" style="margin-top: 15px">
            <el-input v-model="model.name"/>
          </el-form-item>
        </div>
      </div>
      <div style="width: 100%;border-bottom: 1px solid #eee;height: 1px;margin-bottom: 35px"/>
      <el-form-item label="更新日志" prop="no" style="padding-right: 40px">
        <el-input v-model="model.changeLog" type="textarea" :rows="7"/>
      </el-form-item>
    </el-form>
    <button class="app-upload-btn" :disabled="uploading" @click="upload">
      <i class="el-icon-upload"/>{{uploadBtnText}}
    </button>
  </el-dialog>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        dialogVisible: false,
        contentLoading: false,
        uploading: false,
        uploadBtnText: "开始上传",
        model: {
          name: "",
          packageName: "",
          versionCode: "",
          versionName: "",
          changeLog: "",
          icon: "",
        },
        ruleValidate: {
          name: {required: true, message: "不能为空", trigger: "blur"},
        },
      };
    },
    methods: {
      open(file) {
        if (this.checkApk(file.name)) {
          this.dialogVisible = true;
          this.contentLoading = true;
          this.model.changeLog = "";
          this.uploading = false;
          this.uploadBtnText = "开始上传";
          let AppInfoParser = require("app-info-parser");
          let parser = new AppInfoParser(file.raw);
          parser.parse().then(result => {
            this.model.name = result.application.label[0];
            this.model.packageName = result.package;
            this.model.packageName = result.package;
            this.model.versionCode = result.versionCode;
            this.model.versionName = result.versionName;
            this.model.icon = result.icon;
            this.$emit("appInfo", this.model);
            this.contentLoading = false;
          }).catch(err => {
            this.contentLoading = false;
            console.log(err);
            this.$message.error("apk解析失败");
          });
        }
      },
      close() {
        this.dialogVisible = false;

      },
      checkApk(fileName) {
        let pos = fileName.lastIndexOf(".");
        let lastName = fileName.substring(pos, fileName.length);
        let isApk = lastName.toLowerCase() === ".apk";
        if (!isApk) {
          this.$message.error("请上传.apk类型文件");
        }
        return isApk;
      },
      upload() {
        this.uploading = true;
        this.uploadBtnText = "正在上传 0%";
        this.$emit("upload");
      },
      onProgress(event) {
        this.uploadBtnText = "正在上传 " + event.percent.toFixed(2) + "%";
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../style/variables";

  .app-upload-dialog {
    color: #9b9b9b;

    .title {
      display: flex;
      padding: 40px 40px 25px 40px;
    }
  }

  .app-upload-btn {
    @include gravityCenter;
    width: 100%;
    padding: 20px;
    margin-top: 50px;
    background-color: $color-primary;
    border-radius: 10px;
    border: none;
    color: white;
    font-size: 20px;

    i {
      font-size: 35px;
      margin-right: 10px;
    }

    &:disabled {
      background-color: red;
    }
  }

</style>
