<template>
  <header class="header-wrapper">
    <div class="header">
      <div class="header-nav">
        <div style="font-weight: 600;cursor: pointer" @click="goto('/')">应用发布</div>
        <template v-for="(item,index) in nav">
          <i :key="index" class="el-icon-arrow-right"/>
          <div :key="index" :style="{cursor:item.path?'pointer':'auto'}" @click="goto(item.path)">{{item.name}}</div>
        </template>
      </div>
      <div style="flex: 1"/>
      <div class="avatar">
        <div class="photo"/>
        <span class="name">{{username}}</span>
        <span class="logout" @click="logout">注销</span>
      </div>
    </div>
  </header>
</template>

<script>
  import auth from "@/util/loginUtil";
  import {store} from "@/store/store";

  export default {
    components: {},
    data() {
      return {
        username: auth.getUsername(),
      };
    },
    computed: {
      nav() {
        return store.breadcrumbs;
      },
    },
    methods: {
      logout() {
        this.$confirm("确定退出登录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          auth.logout();
          this.$router.push({path: "/login"});
        });
      },
      goto(path) {
        if (path) {
          this.$router.push({path});
        }
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

    .photo {
      width: 45px;
      height: 45px;
      border-radius: 5px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background-color: #f7b92d;
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
      cursor: pointer;
    }
  }
}
</style>
