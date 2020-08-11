import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router";
import "./plugins/element.js";
import "./plugins/myPlugin.js";
import "normalize.css";
import "./style/main.scss";
import vConsole from "vconsole";

Vue.use(new vConsole());

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
