import Vue from "vue";
import axios from "./http/axios";
import http from "./http/http";
import {Message} from "element-ui";

Plugin.install = function(Vue) {
  // 网络请求
  Vue.prototype.$http = http;
  Vue.prototype.$axios = axios;
  //全局异常处理
  Vue.config.errorHandler = function(err, vm, info) {
    console.error(err, vm, info);
    Message.error(err);
  };
};
Vue.use(Plugin);

export default Plugin;
