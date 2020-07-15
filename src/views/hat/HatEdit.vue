<template>
  <el-form
      ref="form"
      v-loading="contentLoading"
      :model="model"
      :rules="ruleValidate"
      class="form"
      label-width="80px">
    <el-form-item label="帽子名称" prop="name">
      <el-input v-model="model.name" placeholder="请输入"/>
    </el-form-item>
    <el-form-item label="城市" prop="cityId" required>
      <vm-district :city-id.sync="model.cityId" :area-id.sync="model.areaId"/>
    </el-form-item>
    <el-button :loading="submitLoading" type="primary" class="save-btn" @click="handleSubmit">保存</el-button>
  </el-form>
</template>

<script>
  import constant from "@/util/constant";
  import VmDistrict from "@/components/VmDistrict";
  import loginUtil from "@/util/loginUtil";

  export default {
    components: {VmDistrict},
    data() {
      return {
        constant,
        contentLoading: false,
        submitLoading: false,
        model: {
          hatId: 0,
          name: "",
          cityId: "",
          areaId: "",
          approveStatusId: 1,
          statusId: 2,
          operator: loginUtil.getUsername(),
          operatorId: loginUtil.getUserId(),
        },
        ruleValidate: {
          name: [
            {required: true, message: "不能为空", trigger: "blur"},
            {max: 200, message: "帽子名称不能大于200个字", trigger: "blur"},
          ],
          cityId: {required: true, message: "不能为空", trigger: "change"},
        },
      };
    },
    mounted() {
      this.getData(this.$route.query.id);
    },
    methods: {
      getData(id) {
        if (id) {
          this.contentLoading = true;
          this.$http.get(`/eju/hat/find/${id}`).then(data => {
            this.contentLoading = false;
            Object.assign(this.model, data);
            this.model.operator = loginUtil.getUsername();
            this.model.operatorId = loginUtil.getUserId();
          }).catch(() => {
            this.contentLoading = false;
          });
        }
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            this.$http
              .save("eju/hat/save", this.model)
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
  .form {
    max-width: 700px;

    .save-btn {
      margin-left: 40px;
      margin-top: 10px;
    }
  }
</style>
