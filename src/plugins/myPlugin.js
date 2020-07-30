import Vue from "vue";
import axios from "./http/axios";
import bus from "./bus";
import {Message} from "element-ui";

Plugin.install = function(Vue) {
  //event bus
  Vue.prototype.$bus = bus;
  // 网络请求
  Vue.prototype.$http = axios;
  Vue.prototype.$axios = axios;
  //全局异常处理
  Vue.config.errorHandler = function(err, vm, info) {
    console.error(err, vm, info);
    Message.error(err);
  };
};
Vue.use(Plugin);

export default Plugin;
