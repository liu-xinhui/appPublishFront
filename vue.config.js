module.exports = {
  devServer: {
    port: 8011,
  },
  chainWebpack: config => {
    config
      .plugin("html")
      .tap(args => {
        args[0].title = "新时达应用发布";
        return args;
      });
    // 用cdn方式引入
    config.externals({
      "vue": "Vue",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
    });
  },
};