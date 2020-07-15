<template>
  <header class="header-wrapper">
    <div class="header">
      <div class="header-nav">
        <div style="font-weight: 600">STEP应用发布</div>
        <i class="el-icon-arrow-right"/>
        <div>我的应用</div>
        <i class="el-icon-arrow-right"/>
        <div>星辰物联网</div>
      </div>
      <div style="flex: 1"/>
      <div class="avatar">
        <img src="http://avatar-file.flow.ci/avatar/8cd0609795fe169c5210477837fcdfa1.png?r=PG" alt="头像">
        <span class="name">liunewshine</span>
        <span class="logout">注销</span>
      </div>
    </div>
  </header>
</template>

<script>
  import auth from "@/util/loginUtil";

  export default {
    components: {},
    data() {
      return {
        name: auth.getUsername(),
        nav: [
          {
            name: "我的应用",
            path: "/",
          },
          {
            name: "星辰物联网",
            path: "/",
          },
        ],
      };
    },
    methods: {
      logout() {
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../style/variables";

  .header-wrapper {
    border-bottom: 1px solid rgba(208, 208, 208, .3);
  }

  .header {
    @include gravityCenter;
    height: $header-height;
    width: 1024px;
    margin: 0 auto;

    .header-nav {
      @include gravityCenter;
      color: #9b9b9b;
      font-size: 20px;

      i {
        margin: 0 10px;
        color: #c6c6c6;
      }
    }

    .avatar {
      position: relative;
      width: 155px;
      height: 80px;

      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: auto;
      }

      span {
        display: inline-block;
        width: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        line-height: 30px;
        position: absolute;
        right: 0;
      }

      .name {
        color: #4a4a4a;
        top: 13px;
      }

      .logout {
        font-size: 12px;
        color: #9b9b9b;
        bottom: 13px;
      }
    }
  }
</style>
