import axios from "axios";
import auth from "@/util/loginUtil";
import {Notification} from "element-ui";

// axios 配置
axios.defaults.timeout = 40000;
axios.defaults.baseURL = window.config.serverUrl;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + auth.getToken();
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log(response);
    if (response.request.responseType === "blob") {
      return Promise.resolve(response.data);
    }
    let codeSuccess = response.config.baseURL === window.config.serverUrl ? 1 : 0;
    if (response.data.code === codeSuccess) {
      return response.data.data;
    } else {
      Notification.error({title: "提示", message: response.data.msg});
      return Promise.reject(response.data.msg);
    }
  },
  error => {
    console.log("-------------接口请求错误信息start-------------");
    console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data, error.response.status, error.response.headers);
      Notification.error({title: "提示", message: "服务器内部错误"});
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      Notification.error({title: "提示", message: "连接服务器失败"});
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      Notification.error({title: "提示", message: "请求服务器出错"});
    }
    console.log("-------------接口请求错误信息end-------------");
    return Promise.reject(error);
  },
);

export default axios;
