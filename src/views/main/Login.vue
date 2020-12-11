<template>
  <div class="login" @keydown.enter="login">
    <div class="login-con">
      <el-card>
        <div slot="header">
          <span>欢迎访问应用发布平台</span>
        </div>
        <el-form ref="loginForm" :model="user" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="user.username" placeholder="请输入账号" size="medium">
              <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="user.password" placeholder="请输入密码" size="medium" show-password>
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <el-button
              :loading="loading"
              size="medium"
              style="width: 100%"
              type="primary"
              @click="login">
            登录
          </el-button>
        </el-form>
      </el-card>
    </div>
    <div class="copyright">
      © 2020-{{new Date().getFullYear()}} 版权所有
      <a href="http://www.beian.miit.gov.cn/" target="_blank" style="color: #FFF">沪ICP备13031758号</a>
    </div>
  </div>
</template>

<script>
  import loginUtil from "@/util/loginUtil";

  export default {
    data() {
      const isDev = process.env.NODE_ENV === "development";
      return {
        user: {
          username: isDev ? "admin" : "",
          password: isDev ? "123456" : "",
        },
        rules: {
          phone: {required: true, message: "手机号不能为空", trigger: "blur"},
          password: {required: true, message: "密码不能为空", trigger: "blur"},
        },
        loading: false,
      };
    },
    methods: {
      login() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$http.get("account/login", this.user)
              .then(res => {
                this.loading = false;
                loginUtil.login(res.data);
                this.$router.push({path: "/"});
              })
              .catch(() => {
                this.loading = false;
              });
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    background: url('/img/login_bg.jpg') center;
    background-size: cover;
    position: relative;

    &-con {
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 360px;
    }

    .copyright {
      position: absolute;
      text-align: center;
      left: 10%;
      right: 10%;
      bottom: 5px;
      color: white;
      font-size: 14px;
    }
  }
</style>
