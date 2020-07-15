import Vue from "vue";
import axios from "./http/axios";
import http from "./http/http";
import drag from "./directive/el-dialog-drag";
import bus from "./bus";
import {Message} from "element-ui";

Plugin.install = function(Vue) {
  Vue.directive("el-drag-dialog", drag);
  //event bus
  Vue.prototype.$bus = bus;
  // 网络请求
  Vue.prototype.$http = http;
  Vue.prototype.$axios = axios;
  //重置表单
  Vue.prototype.$reset = function(formRef, ...excludeFields) {
    let obj1 = this.$data;
    let obj2 = this.$options.data.call(this);
    if (!excludeFields || excludeFields.length === 0) {
      excludeFields = ["ruleValidate"];
    }
    for (let attrName in obj1) {
      if (excludeFields && excludeFields.includes(attrName)) {
        continue;
      }
      obj1[attrName] = obj2[attrName];
    }
    let ref = this.$refs[formRef || "form"];
    if (ref) {
      setTimeout(() => {
        ref.clearValidate();
      }, 500);
    }
  };
  //全局异常处理
  Vue.config.errorHandler = function(err, vm, info) {
    console.error(err, vm, info);
    Message.error(err);
  };
};
Vue.use(Plugin);

export default Plugin;
