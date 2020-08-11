<template>
  <el-dialog
      :close-on-click-modal="false"
      title="更新日志"
      :visible.sync="dialogVisible"
      top="3vh"
      width="700px">
    <el-form
        ref="form"
        class="app-version-edit"
        :model="model"
        label-width="90px">
      <el-form-item label="更新日志">
        <el-input v-model="model.changeLog" placeholder="请输入" type="textarea" :rows="5"/>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button :loading="submitLoading" type="warning" @click="handleSubmit">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>

  export default {
    data() {
      return {
        submitLoading: false,
        dialogVisible: false,
        model: {
          id: null,
          changeLog: "",
        },
      };
    },
    methods: {
      open(row) {
        this.dialogVisible = true;
        this.model.id = row.id;
        this.model.changeLog = row.changeLog;
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            this.$http
              .put("appVersions", this.model)
              .then(() => {
                this.submitLoading = false;
                this.dialogVisible = false;
                this.$emit("save-success");
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
</style>

