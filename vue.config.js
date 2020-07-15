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
  },
};