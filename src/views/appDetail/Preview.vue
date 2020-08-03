<template>
  <div class="preview">
    <span class="pattern left"><img src="https://ali-static.jappstore.com/images/download_pattern_left.png"></span>
    <span class="pattern right"><img src="https://ali-static.jappstore.com/images/download_pattern_right.png"></span>
    <div class="main">
      <header>
        <div class="table-container">
          <div class="cell-container">
            <div class="app-brief">
              <div class="icon-container wrapper">
                <i class="icon-icon_path bg-path"/>
                <span class="icon">
                  <img
                      itemprop="image"
                      alt="图标"
                      width="100"
                      height="100"
                      :src="appInfo.currentVersion.icon||'/img/app.png'">
                </span>
                <span class="qrcode" title=""><canvas width="200" height="200" style="display: none;"/>
                  <qr-code
                      v-if="url"
                      :value="url"
                      :options="qrCodeOptions"/>
                </span>
              </div>
              <h1 class="name wrapper" style="margin-top: 60px">
                <span class="icon-warp">
                  <i class="icon-android"/>
                  {{appInfo.name}}
                </span>
              </h1>
              <p class="scan-tips">
                扫描二维码下载<br>或用手机浏览器输入这个网址:&nbsp;&nbsp;<span class="text-black">{{url}}</span>
              </p>
              <div class="release-info">
                <p itemprop="softwareVersion">
                  {{appInfo.currentVersion.versionName+"（Build " +appInfo.currentVersion.versionCode+"）-"}}
                  {{(appInfo.currentVersion.size/1024).toFixed(2)}} MB
                </p>
                <p>更新于: <span itemprop="datePublished">{{appInfo.currentVersion.createTime}}</span></p>
              </div>
              <div id="actions" class="actions type-android">
                <button @click="install">下载安装</button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- Release list -->
      <div class="footer">
        <a href="http://www.beian.miit.gov.cn/" target="_blank" style="color: #A9B1B3">鲁ICP备19001203号-1----{{test}},{{test1}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import QrCode from "@chenfengyuan/vue-qrcode";

  const ua = navigator.userAgent.toLowerCase();

  export default {
    components: {QrCode},
    data() {
      return {
        appInfo: {
          currentVersion: {},
        },
        qrCodeOptions: {
          width: 100,
          margin: 0,
          color: {
            dark: "#404242",
            light: "#0000",
          },
        },
        platform: null,
        isWebChat: null,
      };
    },
    computed: {
      url() {
        let shortCode = this.appInfo.shortCode;
        return shortCode ? (document.location.protocol + "//" + window.location.host + "/" + shortCode) : "";
      },
    },
    mounted() {
      this.getAppInfo(this.$route.params.shortCode);
      if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
        this.platform = "ios";
      } else if (/(android)/i.test(ua)) {
        this.platform = "android";
      } else {
        this.platform = "pc";
      }
      if (ua.indexOf("micromessenger") !== -1) {
        this.isWebChat = true;
      }
    },
    methods: {
      getAppInfo(shortCode) {
        this.contentLoading = true;
        this.$http.get(`apps/shortCode/${shortCode}`).then(res => {
          this.contentLoading = false;
          this.appInfo = res.data;
        }).catch(() => {
          this.contentLoading = false;
        });
      },
      install() {
        if (this.platform === "ios") {
          let iosUrl = this.appInfo.iosUrl;
          if (iosUrl) {
            window.location.href = iosUrl;
          } else {
            this.$message.error("该app不支持ios系统");
          }
        } else if (this.platform === "android") {
          if (this.isWebChat) {
            this.$message.error("请在浏览器中打开页面");
          } else {
            this.download();
          }
        } else {
          this.download();
        }
        this.$message.success(this.platform);
      },
      download() {
        window.open(window.config.serverUrl + "apps/downloadApk/" + this.appInfo.currentVersion.downloadUrl);
      },
    },
  };
</script>
<style lang="scss" scoped>

  a, button {
    cursor: pointer
  }

  *, .wechat-tips {
    box-sizing: border-box
  }

  @font-face {
    font-family: d_icomoon;
    src: url(https://ali-static.jappstore.com/fonts/d_icomoon.eot?33id3j);
    src: url(https://ali-static.jappstore.com/fonts/d_icomoon.eot?33id3j#iefix) format("embedded-opentype"), url(https://ali-static.jappstore.com/fonts/d_icomoon.ttf?33id3j) format("truetype"), url(https://ali-static.jappstore.com/fonts/d_icomoon.woff?33id3j) format("woff"), url(https://ali-static.jappstore.com/fonts/d_icomoon.svg?33id3j#d_icomoon) format("svg");
    font-weight: 400;
    font-style: normal
  }

  [class*=" icon-"], [class^=icon-] {
    font-family: d_icomoon, serif !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
  }

  .desc-section pre, .releases-section .release-view .version-info .changelog .wrapper, body, html {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif
  }

  .icon-loading:before {
    content: "\e64d"
  }

  .icon-android_store:before {
    content: "\e600"
  }

  .icon-android:before {
    content: "\e601"
  }

  .icon-icon_path:before {
    content: "\e602"
  }

  .icon-ios_store:before {
    content: "\e603"
  }

  .icon-ios:before {
    content: "\e604"
  }

  .icon-qrcode:before {
    content: "\e605"
  }

  .icon-brace-left:before {
    content: "\e613"
  }

  .icon-brace-right:before {
    content: "\e617"
  }

  .icon-comma-eye:before {
    content: "\e618"
  }

  .icon-mouth:before {
    content: "\e619"
  }

  .icon-upload:before {
    content: "\e631"
  }

  .icon-close:before {
    content: "\e63b"
  }

  .icon-Downloading:before {
    content: "\e900"
  }

  .icon-refresh:before {
    content: "\e901"
  }

  .icon-download:before {
    content: "\e902"
  }

  .icon-text:before {
    content: "\e922"
  }

  .icon-plus:before {
    content: "\e92b"
  }

  .icon-pdf:before {
    content: "\eadf"
  }

  .no-scroll {
    overflow: hidden
  }

  .text-center {
    text-align: center
  }

  .text-right {
    text-align: right
  }

  .text-black {
    color: #505556
  }

  .wechat-font, .wechat-font-flex {
    color: #3ab2a7;
    font-size: 18px;
    font-weight: 700
  }

  .strong {
    font-weight: 700
  }

  .wechat-font-flex {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center
  }

  .main {
    display: block;
    height: 100%;
    padding-top: 60px;
    margin: 0 auto;
    max-width: 94%;
    width: 700px;
    color: #A9B1B3;
    font-size: 14px;
  }

  .loading-container h1, .passwd form h4 {
    font-weight: 400
  }

  .wechat-font-flex span {
    font-size: 30px;
    color: #000;
    margin-left: 1%
  }

  p {
    margin-top: 0
  }

  a {
    text-decoration: none
  }

  button {
    padding: 0;
    border: 1px solid #A9B1B3;
    background-color: transparent
  }

  button:focus {
    outline: 0
  }

  .pattern {
    position: absolute;
    top: 0;
    z-index: 1;
    max-width: 312px;
    width: 21.66%;
    transition: all .5s
  }

  .pattern.left {
    left: 0
  }

  .pattern.right {
    right: 0
  }

  .pattern img {
    width: 100%;
    transition: all 1s;
    pointer-events: none
  }

  @media (max-width: 1280px) {
    .pattern {
      width: 18%
    }
  }

  .combo .pattern {
    max-width: 220px
  }

  @media (min-width: 1280px) {
    .combo .pattern {
      max-width: 255px;
      width: 21%
    }
  }

  .out-container {
    position: relative;
    z-index: 2;
    transition: all .5s
  }

  .main .table-container {
    display: table;
    width: 100%;
    height: 100%
  }

  .main .cell-container {
    display: table-cell;
    height: 100%;
    vertical-align: middle;
    text-align: center
  }

  .box-game_add {
    position: fixed;
    width: 240px;
    height: 40px;
    line-height: 40px;
    top: 1%;
    right: 2.5%;
    background: rgba(0, 0, 0, .8);
    font-size: 14px;
    color: #fff;
    z-index: 999;
    padding-left: 15px;
    border-radius: 3px
  }

  .box-game_add .box-right {
    position: absolute;
    right: 15px;
    top: 5px;
    width: 60px;
    height: 30px;
    color: #000;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    background-color: #F8CD0B;
    border-radius: 100px
  }

  .notice-wechat {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 0;
    background-color: #505556;
    box-shadow: 0 -9px 29px -7px rgba(0, 0, 0, .1) inset;
    transition: all .5s
  }

  .constraint .main header, .expired .main header, .forbidden .main header, .legal_forbidden .main header, .legal_forbidden_bt .main header, .legal_forbidden_download .main header, .legal_forbidden_new .main header, .not_app .main header, .not_find .main header, .not_found .main header {
    opacity: 1;
    transition: all .5s;
    transform: none
  }

  .constraint .main header h1, .expired .main header h1, .forbidden .main header h1, .legal_forbidden .main header h1, .legal_forbidden_bt .main header h1, .legal_forbidden_download .main header h1, .legal_forbidden_new .main header h1, .not_app .main header h1, .not_find .main header h1, .not_found .main header h1 {
    color: #505556;
    font-weight: 400;
    font-size: 28px
  }

  .constraint .main header h3, .expired .main header h3, .forbidden .main header h3, .legal_forbidden .main header h3, .legal_forbidden_bt .main header h3, .legal_forbidden_download .main header h3, .legal_forbidden_new .main header h3, .not_app .main header h3, .not_find .main header h3, .not_found .main header h3 {
    font-size: 18px;
    cursor: default
  }

  .constraint .main header h3 label, .expired .main header h3 label, .forbidden .main header h3 label, .legal_forbidden .main header h3 label, .legal_forbidden_bt .main header h3 label, .legal_forbidden_download .main header h3 label, .legal_forbidden_new .main header h3 label, .not_app .main header h3 label, .not_find .main header h3 label, .not_found .main header h3 label {
    cursor: default
  }

  .constraint .main header p, .expired .main header p, .forbidden .main header p, .legal_forbidden .main header p, .legal_forbidden_bt .main header p, .legal_forbidden_download .main header p, .legal_forbidden_new .main header p, .not_app .main header p, .not_find .main header p, .not_found .main header p {
    font-size: 16px;
    line-height: 24px
  }

  .constraint .main .fade-out, .expired .main .fade-out, .forbidden .main .fade-out, .legal_forbidden .main .fade-out, .legal_forbidden_bt .main .fade-out, .legal_forbidden_download .main .fade-out, .legal_forbidden_new .main .fade-out, .not_app .main .fade-out, .not_find .main .fade-out, .not_found .main .fade-out {
    opacity: 0;
    transform: translateY(-40px)
  }

  .constraint .pattern img, .expired .pattern img, .forbidden .pattern img, .legal_forbidden .pattern img, .legal_forbidden_bt .pattern img, .legal_forbidden_download .pattern img, .legal_forbidden_new .pattern img, .not_app .pattern img, .not_find .pattern img, .not_found .pattern img {
    -webkit-filter: grayscale(1)
  }

  @media screen and (max-width: 480px) {
    .constraint .cell-container, .forbidden .cell-container, .legal_forbidden .cell-container, .legal_forbidden_bt .cell-container, .legal_forbidden_download .cell-container, .legal_forbidden_new .cell-container, .not_app .cell-container, .not_find .cell-container, .not_found .cell-container {
      vertical-align: top
    }
  }

  .error-container {
    margin: 0 auto;
    width: 100%;
    min-width: 320px;
    max-width: 480px;
    text-align: left
  }

  .error-container pre {
    line-height: 28px
  }

  .error-container h1 {
    font-size: 16px;
    margin-bottom: 10px
  }

  .error-container .not_app_image {
    width: 96px;
    height: 111px
  }

  .error-container .sub-header {
    font-size: 14px
  }

  .error-container .sub-header > a {
    text-decoration: underline;
    color: #337ab7
  }

  @media screen and (max-width: 425px) {
    .error-container pre, .error-container small {
      display: none
    }
    .error-container {
      width: 100%;
      margin-top: 100px;
      margin-bottom: 50px;
      text-align: center
    }
    .error-container h1 {
      padding: 0 70px
    }
  }

  .back-btn {
    position: fixed;
    top: 28px;
    left: 28px;
    z-index: 3;
    width: 60px;
    height: 60px;
    border: 1px solid #BDC6C7;
    border-radius: 60px;
    background-color: #fff
  }

  .back-btn i {
    display: block;
    margin-top: 29px;
    margin-left: 21px
  }

  .back-btn i:after, .back-btn i:before {
    position: absolute;
    display: inline-block;
    width: 16px;
    height: 1px;
    background-color: #505556;
    content: ' ';
    transform-origin: left
  }

  .back-btn i:before {
    transform: rotateZ(-42deg)
  }

  .back-btn i:after {
    transform: rotateZ(42deg)
  }

  .loading-container {
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -17px;
    width: 100%;
    text-align: center
  }

  .combo .main {
    min-width: 960px;
    max-width: 100%
  }

  .data_error .icon, .error .icon, .forbidden .icon, .passwd .icon {
    margin-bottom: 40px;
    width: 120px;
    height: 120px;
    border-radius: 22.7px
  }

  @media screen and (min-height: 520px) {
    .data_error form, .error form, .forbidden form, .passwd form {
      margin-bottom: 100px
    }
  }

  .data_error .main, .error .main, .forbidden .main, .passwd .main {
    height: 100%
  }

  .data_error .main table, .error .main table, .forbidden .main table, .passwd .main table {
    width: 100%;
    height: 100%;
    vertical-align: middle
  }

  .data_error .app-brief h1, .error .app-brief h1, .forbidden .app-brief h1, .passwd .app-brief h1 {
    text-transform: uppercase
  }

  .data_error .reload, .error .reload, .forbidden .reload, .passwd .reload {
    color: #A9B1B3;
    font-size: 12px;
    text-decoration: none;
    border: 1px solid #A9B1B3;
    background-color: transparent;
    padding: 6px 12px;
    border-radius: 40px
  }

  .data_error .no-release-tips, .error .no-release-tips, .forbidden .no-release-tips, .passwd .no-release-tips {
    line-height: 20px;
    max-width: 80%;
    margin: 0 auto
  }

  .data_error .no-release-tips a, .error .no-release-tips a, .forbidden .no-release-tips a, .passwd .no-release-tips a {
    text-decoration: underline;
    color: #9b9b9b
  }

  #passwd-wrong {
    display: none
  }

  .passwd form {
    text-align: center
  }

  .passwd form h4 {
    font-size: 18px
  }

  .passwd form button, .passwd form input {
    padding: 12px 20px;
    width: 300px;
    border: 1px solid #F8BA0B;
    border-radius: 5px;
    font-size: 16px
  }

  .passwd form button:focus, .passwd form input:focus {
    outline: 0
  }

  .passwd form input {
    color: #F8BA0B;
    text-align: center
  }

  .passwd form button {
    border-color: #F8BA0B;
    background-color: #F8BA0B;
    color: #fff;
    cursor: pointer
  }

  .main .icon-container {
    position: relative;
    margin: 0 auto;
    width: 290px;
    height: 290px
  }

  .main .icon-container .bg-path {
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 1;
    color: #EFF2F2;
    font-size: 290px
  }

  .main .icon-container span {
    position: absolute;
    z-index: 2;
    display: block
  }

  .main .icon-container .icon {
    top: 0;
    left: 0;
    padding: 10px;
    width: 140px;
    height: 140px;
    border-radius: 17.54%;
    background-color: #fff
  }

  .main .icon-container .icon img {
    max-width: 100%;
    width: 120px;
    height: 120px;
    border-radius: 17.54%
  }

  .main .icon-container .icon .middle-tip {
    width: 100px;
    height: 100px
  }

  .main .icon-container .qrcode {
    right: 0;
    bottom: 0;
    width: 140px;
    height: 140px;
    border: 20px solid transparent;
    border-radius: 26px
  }

  .main .icon-container .qrcode img {
    width: 100px;
    height: 100px
  }

  .main .middle-page {
    width: 100%;
    padding-top: 120px;
    text-align: center
  }

  .main .middle-page .middle-tip {
    width: 100px;
    height: 100px;
    margin-bottom: 40px
  }

  .main .middle-page .middle-desc {
    font-size: 18px;
    color: #333
  }

  .main .middle-page .middle-action {
    width: 240px;
    height: 200px;
    margin: 0 auto;
    padding-top: 20px
  }

  .main .middle-page .middle-action .middle-btn {
    width: 240px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    border-radius: 4px;
    background-color: #F8BA0B
  }

  .main > header {
    display: block;
    min-height: 700px;
    max-height: 900px;
    height: 100%
  }

  .main > header.ad-app {
    height: auto
  }

  .main > header .wrapper {
    margin-right: auto;
    margin-left: auto;
    width: 290px
  }

  .main > header .app-brief {
    transition: all .5s
  }

  .main > header .name, .main > header body.passwd .name {
    position: relative;
    margin: 20px auto;
    width: 290px;
    color: #505556;
    text-align: left;
    font-weight: 400;
    font-size: 28px
  }

  .main > header .name i, .main > header body.passwd .name i {
    position: absolute;
    right: 100%;
    top: 10px;
    margin-right: 10px;
    font-size: 26px
  }

  .main > header .name span, .main > header body.passwd .name span {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    line-height: 1.6
  }

  .main > header .release-type {
    margin: 24px auto 0;
    width: 290px;
    text-align: left
  }

  .main > header .scan-tips {
    margin: 0 auto;
    width: 290px;
    text-align: left;
    white-space: nowrap;
    line-height: 22px
  }

  .main > header .release-info {
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-top: 30px
  }

  .main > header .release-info p {
    margin-bottom: 4px
  }

  .main > header .release-info:before {
    position: absolute;
    top: 0;
    left: 50%;
    display: block;
    margin-left: -30%;
    width: 60%;
    border-top: 1px solid #DAE2E3;
    content: ' '
  }

  .main > header .ios_inhouse_tip {
    background: url(https://ali-static.jappstore.com/images/tip_icon.png) left no-repeat;
    background-size: 12px;
    padding-left: 16px;
    color: #28B3A7
  }

  .main > header .actions {
    margin: 30px auto 0;
    max-width: 290px
  }

  .main > header .actions p {
    line-height: 1.5;
    padding: 12px;
    color: #3AB2A7;
    font-weight: 500;
    font-size: 16px
  }

  .main > header .actions button {
    position: relative;
    display: inline-block;
    padding: 12px 46px;
    min-width: 200px;
    border: 1px solid #32B2A7;
    border-radius: 40px;
    font-size: 14px;
    background: #32B2A7;
    color: #fff
  }

  .main > header .actions a {
    color: #868C8E;
    font-size: 14px;
    display: block
  }

  .main > header .action-animate, .main > header .action-animate .action-animate-trust {
    color: #fff;
    background-color: #32B2A7
  }

  .main > header .action-animate {
    width: 200px;
    height: 40px;
    margin: 30px auto 0;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    overflow: hidden;
    position: relative
  }

  .main > header .action-animate .action-animate-text, .main > header .action-animate .action-animate-trust {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    top: 0
  }

  @keyframes example {
    0% {
      width: 0
    }
    10% {
      width: 20px
    }
    20% {
      width: 40px
    }
    30% {
      width: 60px
    }
    40% {
      width: 80px
    }
    50% {
      width: 100px
    }
    60% {
      width: 120px
    }
    70% {
      width: 140px
    }
    80% {
      width: 160px
    }
    90% {
      width: 180px
    }
    100% {
      width: 200px
    }
  }

  .main > header .action-animate .action-animate-active {
    display: none;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: #32B2A7;
    animation: example 10s linear
  }

  .main > header .type-ios {
    display: none
  }

  @media only screen and (max-width: 768px) {
    .main > header {
      max-height: 100%;
      height: 100%;
      min-height: 400px
    }
    .main > header.ad-app {
      min-height: 700px
    }
    .main > header .type-ios {
      display: block
    }
  }

  @media screen and (max-width: 768px) {
    .main > header {
      min-height: 400px
    }
    .main > header .release-type {
      display: none
    }
    .main > header .release-info {
      display: block
    }
    .main > header .name {
      text-align: center;
      font-size: 24px
    }
    .main > header .name .icon-warp {
      position: static;
      display: inline-block;
      margin-left: -48px;
      max-width: 76%
    }
    .main > header .name .tip {
      margin-top: 5px
    }
    .main > header .name i {
      position: static
    }
    .main > header .scan-tips {
      display: none
    }
  }

  .new_layout {
    display: none;
    margin-top: -10%;
    min-height: 100%;
    padding: 20px;
    background-color: #ededed
  }

  .new_layout .new_layout_head {
    margin-bottom: 20px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 16px;
    color: #333
  }

  .new_layout .new_layout_head .new_layout_head_exc {
    background: url(https://ali-static.jappstore.com/images/exchange.png) left no-repeat;
    background-size: 14px;
    padding-left: 20px
  }

  .new_layout .new_layout_content {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column
  }

  .new_layout .new_layout_content .popularize-games {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    background-color: #ededed
  }

  .new_layout .new_layout_content .popularize-games .popularize-header {
    line-height: 50px;
    padding: 0;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center
  }

  @media only screen and (max-width: 991px) and (min-width: 768px) {
    .new_layout .new_layout_content .popularize-games .popularize-list > li:nth-child(n+5) {
      display: none
    }
    .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game {
      margin-bottom: 30px !important
    }
  }

  @media only screen and (max-width: 1024px) and (min-width: 991px) {
    .new_layout .new_layout_content .popularize-games .popularize-list > li:nth-child(n+6) {
      display: none
    }
    .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game {
      margin-bottom: 30px !important
    }
  }

  .new_layout .new_layout_content .popularize-games .popularize-list {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around
  }

  .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game {
    max-width: 180px;
    width: 45%;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
    margin-bottom: 10px;
    border-radius: 20px;
    background: #35A89B
  }

  .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game .app-download {
    font-size: 16px;
    height: 30px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #fff
  }

  .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game .popularize-app-game-content {
    height: 145px;
    background: #fff;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 20px
  }

  .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game .popularize-app-game-content .app-zhibo-icon-img {
    margin-top: 10px
  }

  .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game .popularize-app-game-content .app-zhibo-icon-img > img {
    border-radius: 5px;
    height: 50px;
    width: 50px
  }

  .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game .primary-text {
    max-width: 80%;
    color: #4A4A4A;
    text-align: center;
    font-size: 16px;
    font-weight: 700
  }

  .new_layout .new_layout_content .popularize-games .popularize-list .popularize-app-game .secondary-text {
    max-width: 80%;
    height: 32px;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
    color: rgba(93, 103, 109, .9);
    padding-bottom: 5px
  }

  .master-section {
    overflow: hidden;
    padding: 40px 0
  }

  @media screen and (max-width: 768px) {
    .master-section {
      text-align: center
    }
    .master-section .store-link {
      display: inline-block;
      float: none;
      margin-bottom: 0
    }
    .master-section p {
      display: none
    }
  }

  .master-section p {
    margin: 0;
    line-height: 21px
  }

  .master-section pre {
    text-align: left;
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-all;
    line-height: 22px
  }

  .error_money h2, .footer, .per-type-info .info, .releases-section .release-view .qrcode, .section-store-link, .store-section {
    text-align: center
  }

  .store-link-wrapper {
    display: inline-block;
    width: 200px;
    height: 60px
  }

  .store-link-wrapper a {
    display: block;
    border: 1px solid #505556;
    border-radius: 5px;
    text-decoration: none
  }

  .store-link-wrapper a i {
    display: block;
    padding: 14px 40px;
    color: #505556;
    font-size: 33px
  }

  .section {
    position: relative;
    z-index: 2;
    padding: 50px 0;
    border-top: 1px solid #DAE2E3
  }

  @media screen and (max-width: 768px) {
    .section {
      padding: 50px 20px
    }
  }

  .section h2 {
    margin: 0 0 40px;
    color: #505556;
    font-weight: 400
  }

  .error_money h2, .error_money h2 > p > span {
    font-weight: 400 !important
  }

  .store-section .store-link {
    display: block;
    margin: 0 auto;
    padding: 14px 40px 10px;
    width: 260px;
    border: 1px solid #505556;
    border-radius: 5px;
    background-color: transparent;
    color: #505556;
    font-size: 28px
  }

  @media screen and (max-width: 768px) {
    .certification > img {
      width: 108px;
      height: 93px
    }
    .certification h1 {
      font-size: 16px !important
    }
    .certification h2 {
      font-size: 14px !important
    }
  }

  .error_money h2 {
    color: #7E7E7E;
    margin-top: 50px;
    font-size: 14px !important
  }

  .error_money h2 > p {
    margin-bottom: 5px
  }

  @media screen and (max-width: 768px) {
    .error_money > img {
      width: 145px;
      height: 145px
    }
    .error_money h1 {
      font-size: 16px !important
    }
    .error_money h2 {
      font-size: 14px !important;
      margin-top: 0
    }
    .error_money h2 > p > span {
      display: block
    }
    .error_money h2 > p > span > i {
      display: none
    }
  }

  .releases-section .release-view {
    position: relative;
    z-index: 2;
    padding-bottom: 80px
  }

  .releases-section .release-view:before {
    position: absolute;
    top: 0;
    left: 40px;
    z-index: 1;
    height: 100%;
    border-left: 1px solid;
    content: ' '
  }

  .releases-section .release-view:last-child {
    padding-bottom: 0
  }

  .releases-section .release-view:last-child:before {
    content: none
  }

  .releases-section .release-view .qrcode {
    position: relative;
    z-index: 2;
    float: left;
    width: 80px;
    height: 80px;
    border: 1px solid #A9B1B3;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer
  }

  .releases-section .release-view .qrcode i {
    display: inline-block;
    color: #505556;
    font-size: 30px;
    line-height: 78px
  }

  .releases-section .release-view .qrcode .popup {
    position: absolute;
    top: 50%;
    left: 70px;
    margin-top: -65px;
    padding-left: 40px;
    width: 170px;
    opacity: 0;
    transition: all .25s;
    transform: translateX(20px);
    pointer-events: none
  }

  .releases-section .release-view .qrcode .popup .inner {
    padding: 20px;
    border: 1px solid #505556;
    border-radius: 8px;
    background-color: #fff
  }

  .releases-section .release-view .qrcode .popup .inner img {
    width: 90px;
    height: 90px
  }

  .releases-section .release-view .qrcode .popup .inner:before {
    position: absolute;
    top: 50%;
    left: 30px;
    display: inline-block;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    border: 1px solid #505556;
    border-top: none;
    border-right: none;
    border-bottom-left-radius: 4px;
    background: #fff;
    content: ' ';
    transform: rotateZ(45deg)
  }

  .releases-section .release-view .qrcode:hover {
    border-color: #505556
  }

  .releases-section .release-view .qrcode:hover i {
    color: #505556
  }

  .releases-section .release-view .qrcode:hover .popup {
    opacity: 1;
    transform: none
  }

  .releases-section .release-view .download-btn {
    position: relative;
    z-index: 2;
    display: none;
    float: left;
    width: 80px;
    height: 80px;
    border: 1px solid #A9B1B3;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    cursor: pointer
  }

  .releases-section .release-view .download-btn i {
    position: relative;
    display: inline-block;
    margin-top: 27px;
    margin-left: 1px;
    width: 2px;
    height: 26px;
    background-color: #505556
  }

  .releases-section .release-view .download-btn i:after, .releases-section .release-view .download-btn i:before {
    position: absolute;
    bottom: -2px;
    display: inline-block;
    width: 2px;
    height: 16px;
    background-color: #505556;
    content: ' '
  }

  .releases-section .release-view .download-btn i:before {
    left: -5px;
    transform: rotateZ(-42deg)
  }

  .releases-section .release-view .download-btn i:after {
    right: -5px;
    transform: rotateZ(42deg)
  }

  .releases-section .release-view .version-info {
    padding-left: 120px
  }

  .releases-section .release-view .version-info .version {
    margin-bottom: 10px;
    color: #535353;
    font-size: 18px;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal
  }

  .releases-section .release-view .version-info .extra-info {
    position: relative;
    margin-top: 12px;
    color: #BDC6C7;
    font-size: 13px
  }

  .releases-section .release-view .version-info .extra-info p {
    margin: 0;
    line-height: 20px
  }

  .releases-section .release-view .version-info .extra-info .changelog-toggle {
    margin-top: 20px;
    font-size: 18px;
    color: #535353;
    cursor: default;
    display: inline-block
  }

  @media screen and (max-width: 699px) {
    .releases-section .release-view .version-info .extra-info .changelog-toggle {
      position: static;
      display: inline-block;
      margin-top: 12px
    }
    .releases-section .release-view .version-info .changelog:after {
      left: 33px
    }
  }

  .releases-section .release-view .version-info .changelog {
    position: relative;
    padding: 18px 0;
    border-radius: 5px;
    color: #BDC6C7;
    font-size: 13px;
    line-height: 18px
  }

  .releases-section .release-view .version-info .changelog .wrapper {
    position: relative;
    z-index: 2;
    margin: 0;
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-all
  }

  .releases-section .release-view .version-info .changelog b {
    color: #535353;
    font-size: 18px;
    margin-bottom: 10px;
    display: inline-block;
    cursor: default
  }

  .releases-section .release-view .version-info .changelog:after {
    position: absolute;
    top: -6px;
    right: 33px;
    z-index: 1;
    display: inline-block;
    display: none;
    width: 22px;
    height: 22px;
    border-top-left-radius: 2px;
    background-color: #505556;
    content: ' ';
    transform: rotateZ(45deg)
  }

  .releases-section .release-view .version-info .changelog.show {
    display: block;
    opacity: 1;
    transform: scale(1)
  }

  @media screen and (max-width: 768px) {
    .releases-section .release-view .qrcode {
      display: none
    }
    .releases-section .release-view .download-btn {
      display: block
    }
  }

  :root .combo .releases-section .release-view {
    max-width: 407px
  }

  .releases-section .release-view:nth-child(n+5) {
    display: none
  }

  .releases-section .releases-toggle {
    display: inline-block;
    padding: 14px 22px;
    border: 1px solid #868C8E;
    border-radius: 40px;
    color: #868C8E;
    text-decoration: none;
    font-size: 12px
  }

  .releases-section .releases-toggle .off {
    display: block
  }

  .releases-section .releases-toggle .on {
    display: none
  }

  .releases-section.show-all .release-view:nth-child(n+5) {
    display: block
  }

  .releases-section.show-all .last {
    padding-bottom: 0
  }

  .releases-section.show-all .last:before, .releases-section.show-all .releases-toggle .off {
    display: none
  }

  .releases-section.show-all .releases-toggle .on {
    display: block
  }

  .per-type-info {
    position: relative;
    overflow: hidden;
    padding-top: 0;
    border-top: 1px solid #DAE2E3
  }

  .per-type-info .type {
    float: left;
    width: 50%
  }

  .per-type-info .type:first-child .releases-section {
    padding: 70px 70px 0 0
  }

  .per-type-info .type .master-section {
    padding: 70px 0 0;
    border-top: none
  }

  .per-type-info .type .master-section pre {
    white-space: pre-line
  }

  .per-type-info .type:last-child .master-section, .per-type-info .type:last-child .releases-section {
    padding: 70px 0 0 70px
  }

  .per-type-info .type-icon {
    margin-bottom: 0
  }

  .per-type-info .info {
    padding-top: 50px;
    font-size: 12px
  }

  .per-type-info .info .version {
    margin-bottom: 20px
  }

  .per-type-info .info .type-icon {
    margin-bottom: 40px
  }

  .per-type-info .info i {
    margin-bottom: 0;
    color: #505556;
    font-size: 48px
  }

  .per-type-info .info .store-link-wrapper a {
    width: 200px
  }

  .per-type-info .info .store-link-wrapper a i {
    font-size: 29px
  }

  .per-type-info:before {
    position: absolute;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: #DAE2E3;
    content: ' '
  }

  .desc-section pre {
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 22px
  }

  .section-store-link a {
    display: inline-block;
    border: 1px solid #505556;
    border-radius: 5px;
    text-decoration: none
  }

  .section-store-link a i {
    display: block;
    padding: 14px 40px;
    color: #505556;
    font-size: 33px
  }

  .screenshots-section {
    border-bottom: none
  }

  .screenshots-section .list-wrapper {
    overflow-x: scroll;
    max-width: 100%
  }

  .screenshots-section ul {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
    white-space: nowrap
  }

  .screenshots-section ul li {
    display: inline-block;
    padding-right: 20px;
    vertical-align: middle
  }

  .screenshots-section ul li img {
    max-height: 462px
  }

  .type:first-child .master-section {
    padding-right: 5px
  }

  .type:last-child .master-section {
    padding-left: 5px
  }

  .combo-screenshots-container {
    border-top: none
  }

  .combo-screenshots-container .type:first-child {
    padding-right: 50px
  }

  .combo-screenshots-container .type:last-child {
    padding: 50px 0 50px 50px
  }

  .combo-screenshots-container .type .list-wrapper {
    width: 100%
  }

  .footer {
    margin-top: 40px;
    padding: 20px 20px 90px;
    border-top: 1px solid #DAE2E3
  }

  .footer a {
    text-decoration: none;
    color: #F8CD0B
  }

  .hide {
    display: none
  }

  .wechat-tips img, .wechat-tips span {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle
  }

  .wechat-tips {
    position: fixed;
    top: 10px;
    z-index: 103;
    padding-top: 14px;
    width: 100%;
    text-align: right
  }

  .wechat-tips span {
    color: #fff;
    text-align: left;
    font-weight: 700;
    font-size: 16px;
    line-height: 30px
  }

  .wechat-tips span.en {
    width: 240px
  }

  .wechat-tips img {
    margin-bottom: 13px;
    width: 50px
  }

  @media (min-width: 420px) {
    .wechat-tips span {
      margin-right: 15px
    }
    .wechat-tips span.en {
      margin-bottom: -20px;
      width: auto
    }
    .wechat-tips img {
      margin-right: 20px
    }
  }

  .list-unstyled {
    margin: 0;
    padding: 0;
    list-style-type: none
  }

  .list-unstyled li:first-child {
    padding-bottom: 10px
  }

  .tip {
    margin-left: 15px;
    vertical-align: middle;
    font-size: 14px;
    cursor: pointer
  }

  .tip.en {
    margin-left: 5px
  }

  .tip img {
    margin-right: 5px;
    height: 16px;
    position: relative;
    top: 4px
  }

  .tip.RISK {
    color: #d95656
  }

  .tip.SCANED {
    color: #8fbf46
  }

  .tip.SCANED img {
    height: 14px;
    top: 2px
  }

  .tooltip {
    position: absolute;
    z-index: 10;
    display: none;
    width: 250px;
    color: #505556;
    font-size: 0
  }

  .tooltip .arraw {
    display: inline-block;
    margin-left: 40px;
    width: 20px;
    height: 20px;
    border-top: 1px solid;
    border-left: 1px solid;
    background-color: #fff;
    transform: rotate(45deg)
  }

  .tooltip .content {
    margin-top: -10px;
    padding: 15px;
    border: 1px solid;
    border-radius: 10px;
    background-color: #fff;
    font-size: 13px
  }

  .tooltip table {
    width: 100%
  }

  .tooltip table .text-result {
    width: 60px;
    text-align: left
  }

  .tooltip table .logo {
    width: 40px
  }

  .tooltip table .logo img {
    width: 20px
  }

  .tooltip.SCANED .arraw, .tooltip.SCANED .content {
    border-color: #8fbf46
  }

  .tooltip .text-result {
    color: #d85657
  }

  .tooltip .SCANED .text-result {
    color: #8fbf46
  }

  .tooltip.RISK .arraw, .tooltip.RISK .content, .tooltip.VIRUS .arraw, .tooltip.VIRUS .content {
    border-color: #d85657
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  @keyframes rotate_r {
    0% {
      transform: rotate(360deg)
    }
    100% {
      transform: rotate(0)
    }
  }

  #actions {
    display: none
  }

  #actions button {
    transition: all .25s
  }

  #actions button.loading {
    animation: rotate .6s linear infinite;
    background: 0 0
  }

  #actions button.loading_ten {
    animation: rotate_r .6s linear infinite;
    background: 0 0
  }

  #actions p {
    margin-bottom: 0
  }

  #actions a {
    display: inline-block;
    padding: 12px 46px;
    min-width: 200px;
    border: 1px solid #32B2A7;
    border-radius: 40px;
    font-size: 14px;
    background: #fff;
    color: #32B2A7
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
    #actions {
      display: block
    }
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) {
    #actions {
      display: block
    }
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
    #actions {
      display: block
    }
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
    #actions {
      display: block
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 1) {
    #actions {
      display: block
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
    #actions {
      display: block
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    #actions {
      display: block
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
    #actions {
      display: block
    }
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (orientation: landscape) {
    #actions {
      display: block
    }
  }

  #actions.type-android {
    display: block
  }

  body.hidden-overflow {
    overflow: hidden;
    position: fixed;
    width: 100%
  }

  .main header .app-brief .icon-container .qrcode {
    background-color: #EFF2F2;
    transition: all .25s
  }

  .main header .app-brief .name .icon-warp {
    vertical-align: bottom
  }

  .main header .app-brief .name > .tip {
    vertical-align: bottom;
    position: relative;
    top: -3px
  }

  .main .footer .one-key-report {
    color: #fff;
    background-color: #32B2A7;
    padding: 5px 10px;
    border-radius: 15px;
    float: right;
    margin-top: -5px
  }

  .main .not_app .footer .one-key-report, .main .not_find .footer .one-key-report, .main.forbidden .footer .one-key-report, .main.not_found .footer .one-key-report {
    display: none
  }

  .masklayer {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 99998
  }

  .dialog {
    position: fixed;
    width: 390px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    z-index: 99999;
    padding: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .5);
    transform: translate(-50%, -50%)
  }

  .dialog .dialog-close {
    position: absolute;
    right: 10px;
    top: 10px
  }

  .dialog .dialog-close i.icon-close {
    font-size: 18px;
    font-weight: 700;
    cursor: pointer
  }

  .dialog .dialog-close i.icon-close:hover {
    color: #333
  }

  .dialog .dialog-close .icon-return {
    display: none;
    color: #32B2A7
  }

  .one-key-report-dialog .report_select {
    position: relative;
    width: 100%;
    height: 50px;
    border: 1px solid #D6D6D6;
    font-size: 14px;
    line-height: 50px;
    text-indent: 15px;
    cursor: pointer
  }

  .one-key-report-dialog .report_select:hover {
    background: #F5F5F5
  }

  .one-key-report-dialog .report_select .caret {
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    border-top: 6px dashed;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    position: absolute;
    top: 23px;
    right: 20px
  }

  .one-key-report-dialog .report_select.dropup .caret {
    content: "";
    border-top: 0;
    border-bottom: 6px dashed
  }

  .one-key-report-dialog .report_select .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    width: 100%;
    padding: 5px 0;
    margin: 2px 0 5px;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    display: none;
    clear: left
  }

  .one-key-report-dialog .report_select .dropdown-menu > li {
    line-height: 40px;
    cursor: pointer
  }

  .one-key-report-dialog .report_select .dropdown-menu > li:hover {
    color: #fff;
    background: #42B191
  }

  .one-key-report-dialog .custom-checkbox {
    cursor: pointer;
    display: inline-block;
    padding: 2px 2px 2px 25px;
    position: relative;
    line-height: 24px;
    text-align: left;
    margin-right: 20px
  }

  .one-key-report-dialog .custom-checkbox:last-child {
    margin-right: 0
  }

  .one-key-report-dialog .custom-checkbox:after, .one-key-report-dialog .custom-checkbox:before {
    content: ' ';
    display: block;
    position: absolute
  }

  .one-key-report-dialog .custom-checkbox:after {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #32B2A7;
    left: 2px;
    top: 8px;
    display: none
  }

  .one-key-report-dialog .custom-checkbox:before {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    left: 0;
    top: 6px;
    border: 1px solid #32B2A7;
    background-color: #fff
  }

  .one-key-report-dialog .custom-checkbox.active:after {
    display: block
  }

  .one-key-report-dialog .files_content {
    display: -ms-flexbox !important;
    display: flex !important;
    -ms-flex-pack: justify !important;
    justify-content: space-between !important
  }

  .one-key-report-dialog .files_content .files_item {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center
  }

  .one-key-report-dialog .files_content .files_item > div {
    text-align: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-right: 5px;
    -ms-flex-align: center;
    align-items: center
  }

  .one-key-report-dialog .files_content .files_item > div > img {
    width: 35px
  }

  .one-key-report-dialog .files_content .files_item > div > span {
    height: 20px;
    width: 65px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .one-key-report-dialog .content-row {
    display: table;
    padding: 5px;
    position: relative;
    width: 100%
  }

  .one-key-report-dialog .content-row .report_upload {
    cursor: pointer;
    height: 40px;
    width: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    border: 1px dashed #ddd
  }

  .one-key-report-dialog .content-row .report_upload:hover {
    transition: all .5s;
    border-color: #42B191
  }

  .one-key-report-dialog .content-row .report_msg {
    font-size: 16px;
    color: #222;
    margin-bottom: 20px
  }

  .one-key-report-dialog .content-row input, .one-key-report-dialog .content-row label {
    display: block
  }

  .one-key-report-dialog .content-row label {
    color: #666;
    font-size: 18px;
    line-height: 34px;
    margin-right: 30px
  }

  .one-key-report-dialog .content-row input {
    height: 50px;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px 10px;
    outline: 0;
    background: #F5F5F5;
    border: none;
    font-size: 14px
  }

  .one-key-report-dialog .content-row input::-moz-placeholder {
    font-size: 14px;
    color: #8B8E93
  }

  .one-key-report-dialog .content-row input:-ms-input-placeholder {
    font-size: 14px;
    color: #8B8E93
  }

  .one-key-report-dialog .content-row input::placeholder {
    font-size: 14px;
    color: #8B8E93
  }

  .one-key-report-dialog .content-row .report_captcha {
    display: -ms-flexbox;
    display: flex
  }

  .one-key-report-dialog .content-row .report_captcha input {
    display: inline-block;
    width: 190px;
    margin-right: 20px
  }

  .one-key-report-dialog .content-row .report_captcha img {
    width: 100px;
    height: 50px;
    background: #F5F5F5;
    margin-left: 30px;
    cursor: pointer
  }

  .one-key-report-dialog .content-row .report_phone input {
    display: inline-block;
    width: 190px;
    margin-right: 20px
  }

  .one-key-report-dialog .content-row .report_phone .btn {
    width: 125px;
    color: #fff;
    height: 50px;
    background-color: #42B191;
    padding: 5px 10px;
    margin-top: -5px;
    font-size: 14px
  }

  .one-key-report-dialog .content-row .report_phone .btn[disabled] {
    color: #848383;
    background: #D3D3D3
  }

  .one-key-report-dialog .content-row .report-text {
    font-size: 14px;
    color: #8B8E93
  }

  .one-key-report-dialog .content-row .checkbox-list {
    clear: both;
    width: 100%;
    padding: 5px 0;
    text-align: left
  }

  .one-key-report-dialog .content-row textarea {
    width: 100%;
    height: 80px;
    resize: none;
    padding: 10px;
    outline: 0;
    color: #A9B1B3;
    font-size: 14px;
    background: #F5F5F5;
    border: none
  }

  .one-key-report-dialog .content-row textarea::-moz-placeholder {
    font-size: 14px;
    color: #8B8E93
  }

  .one-key-report-dialog .content-row textarea:-ms-input-placeholder {
    font-size: 14px;
    color: #8B8E93
  }

  .one-key-report-dialog .content-row textarea::placeholder {
    font-size: 14px;
    color: #8B8E93
  }

  .one-key-report-dialog .content-row .btn-report {
    color: #fff;
    background-color: #42B191;
    padding: 5px 10px;
    margin-top: 5px;
    width: 190px;
    height: 50px;
    display: inline-block;
    line-height: 40px;
    font-size: 18px
  }

  .one-key-report-dialog .content-row .btn-attachment {
    color: #fff;
    background-color: #32B2A7;
    padding: 5px 40px;
    border-radius: 5px;
    margin-top: -5px;
    margin-left: 10px
  }

  .one-key-report-dialog .report-feedback, .one-key-report-dialog .report-form {
    position: relative;
    width: 100%;
    height: 100%
  }

  .one-key-report-dialog .report-sending {
    background-color: rgba(255, 255, 255, .5);
    color: #000;
    font-size: 20px;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    text-align: center;
    line-height: 450px;
    cursor: default;
    display: none
  }

  .one-key-report-dialog .report-form {
    display: block
  }

  .one-key-report-dialog .report-feedback {
    display: none;
    cursor: default
  }

  .one-key-report-dialog .report-feedback .feedback-thanks {
    width: 160px;
    height: 160px;
    background-color: #ffd301;
    border-radius: 20px;
    margin: 50px auto 20px
  }

  .one-key-report-dialog .report-feedback .feedback-thanks .brace-content {
    margin: 0 auto;
    padding-top: 30px;
    color: #000;
    width: 110px;
    text-align: center
  }

  .one-key-report-dialog .report-feedback .feedback-thanks .thanks {
    min-height: 22px;
    letter-spacing: .8px;
    font-weight: 700;
    font-size: 16px;
    font-family: 'Roboto Slab', 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', Arial, sans-serif;
    text-align: center;
    cursor: default;
    color: #000;
    margin: 15px 0 0
  }

  .one-key-report-dialog .report-feedback .feedback-thanks .face, .one-key-report-dialog .report-feedback .feedback-thanks .icon-brace-left, .one-key-report-dialog .report-feedback .feedback-thanks .icon-brace-right {
    display: inline-block;
    vertical-align: middle
  }

  .one-key-report-dialog .report-feedback .feedback-thanks .icon-brace-left, .one-key-report-dialog .report-feedback .feedback-thanks .icon-brace-right {
    font-size: 80px
  }

  .one-key-report-dialog .report-feedback .feedback-thanks .face .icon-comma-eye {
    margin: 0 4px;
    font-size: 22px
  }

  .one-key-report-dialog .report-feedback .feedback-thanks .face .icon-comma-eye.right {
    margin-left: 16px;
    display: inline-block;
    transform: scaleY(.5)
  }

  .one-key-report-dialog .report-feedback .feedback-thanks .face .icon-mouth {
    display: block;
    margin-top: 15px;
    transform: rotateZ(-19deg) translateX(2px)
  }

  .one-key-report-dialog .report-feedback .feedback-message {
    color: #32B2A7;
    font-size: 30px;
    text-align: center
  }

  .one-key-report-dialog .report-feedback .feedback-content {
    font-size: 18px;
    margin-top: 40px;
    color: #858585
  }

  .one-key-report-dialog .report-error {
    line-height: 34px;
    color: #FA6E4B;
    font-size: 14px;
    cursor: default
  }

  .one-key-report-dialog .report-error > div {
    display: none
  }

  .verify-dialog .dialog-title {
    color: #505556;
    font-size: 16px
  }

  .verify-dialog .form-control {
    height: 50px;
    width: 100%;
    margin-bottom: 10px;
    padding: 5px 10px;
    outline: 0;
    background: #F5F5F5;
    border: none;
    font-size: 1rem
  }

  .verify-dialog .form-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: stretch;
    align-items: stretch;
    margin-bottom: 10px;
    height: 50px
  }

  .verify-dialog .form-group .form-control {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    margin-bottom: 0
  }

  .verify-dialog .form-addon {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    margin-left: 30px;
    height: 100%;
    width: 125px
  }

  .verify-dialog .form-action {
    margin-top: 20px
  }

  .verify-dialog .captcha-group {
    position: relative
  }

  .verify-dialog .captcha-group.loading .icon-loading {
    display: block
  }

  .verify-dialog .captcha-group .icon-loading {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 30px
  }

  .verify-dialog .captcha-group .icon-loading:before {
    display: inline-block;
    animation: rotate linear 1s infinite
  }

  .verify-dialog .captcha-image {
    cursor: pointer;
    width: 100px;
    height: 100%
  }

  .verify-dialog .btn-green {
    color: #fff;
    height: 50px;
    background-color: #42B191;
    border: none;
    padding: 5px 10px;
    font-size: 1rem;
    width: 100%
  }

  .verify-dialog .form-addon .btn-green[disabled] {
    color: #848383;
    background: #D3D3D3
  }

  .verify-dialog .form-addon.btn-verify-submit {
    width: 190px
  }

  .ios-modal {
    overflow: auto;
    overflow-y: scroll;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    background-color: rgba(0, 0, 0, .6)
  }

  .ios-dialog {
    width: auto;
    margin: 10px;
    border-radius: 4px;
    background-color: #fff
  }

  .ios-dialog .ios-dialog-header {
    position: relative;
    width: 100%;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #32B2A7
  }

  .ios-dialog .ios-dialog-header img {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 15px
  }

  .ios-dialog .ios-dialog-content {
    padding: 20px;
    color: #333;
    border-radius: 4px;
    background-color: #fff
  }

  .ios-dialog .ios-dialog-content .ios-dialog-content-title {
    font-weight: 700;
    margin-top: 10px
  }

  .ios-dialog .ios-dialog-content .img-block {
    display: block;
    margin: 0 auto
  }

  .ios-dialog .ios-dialog-content .ios-dialog-content-b1 {
    width: 80%;
    margin-top: 5px
  }

  .ios-dialog .ios-dialog-content p {
    margin-top: 10px
  }

  .ios-dialog .ios-dialog-footer {
    background-color: #fff;
    text-align: right;
    padding-bottom: 50px;
    padding-right: 20px;
    border-radius: 4px
  }

  .ios-dialog .ios-dialog-footer span {
    display: inline-block;
    background-color: #32B2A7;
    color: #fff;
    padding: 10px
  }

  .ios-dialog .ios-dialog-footer .ios-dialog-footer-close {
    padding: 10px 15px;
    margin-left: 10px
  }

  .app_bottom_fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    font-size: 0;
    text-align: center;
    background: 0 0
  }

  .app_bottom_fixed img {
    width: 100%;
    max-height: 80px
  }

  .after-install-fixed, .after-install-games-fixed {
    position: fixed;
    z-index: 200;
    background-color: #F3F3F3;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column
  }

  .after-install-games-fixed .after-install-header {
    background: #fff;
    -ms-flex: 1 0 180px;
    flex: 1 0 180px
  }

  .after-install-games-fixed .after-install-header .waiting {
    color: #4A4A4A
  }

  .after-install-games-fixed .after-install-header a {
    display: inline-block;
    padding: 4px 10px;
    margin-top: 5px;
    min-width: 100px;
    font-size: 14px;
    background: #fff;
    color: #32B2A7;
    border: 1px solid #32B2A7
  }

  .after-install-games-fixed .popularize-games {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    background-color: #ededed
  }

  .after-install-games-fixed .popularize-games .popularize-header {
    line-height: 50px;
    padding: 0;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center
  }

  @media only screen and (max-width: 991px) and (min-width: 768px) {
    .after-install-games-fixed .popularize-games .popularize-list > li:nth-child(n+5) {
      display: none
    }
    .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game {
      margin-bottom: 30px !important
    }
  }

  @media only screen and (max-width: 1024px) and (min-width: 991px) {
    .after-install-games-fixed .popularize-games .popularize-list > li:nth-child(n+6) {
      display: none
    }
    .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game {
      margin-bottom: 30px !important
    }
  }

  .after-install-games-fixed .popularize-games .popularize-list {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: distribute;
    justify-content: space-around
  }

  .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game {
    max-width: 180px;
    width: 45%;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, .1);
    margin-bottom: 10px;
    border-radius: 20px;
    background: #35A89B
  }

  .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game .app-download {
    font-size: 16px;
    height: 30px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #fff
  }

  .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game .popularize-app-game-content {
    height: 145px;
    background: #fff;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 20px
  }

  .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game .popularize-app-game-content .app-zhibo-icon-img {
    margin-top: 10px
  }

  .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game .popularize-app-game-content .app-zhibo-icon-img > img {
    border-radius: 5px;
    height: 50px;
    width: 50px
  }

  .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game .primary-text {
    max-width: 80%;
    color: #4A4A4A;
    text-align: center;
    font-size: 16px;
    font-weight: 700
  }

  .after-install-games-fixed .popularize-games .popularize-list .popularize-app-game .secondary-text {
    max-width: 80%;
    height: 32px;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
    color: rgba(93, 103, 109, .9);
    padding-bottom: 5px
  }

  .after-install-zhibo-fixed {
    position: fixed;
    z-index: 200;
    background-color: #F3F3F3;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column
  }

  .after-install-zhibo-fixed .after-install-header {
    -ms-flex: 1 0 165px;
    flex: 1 0 165px;
    margin: 0 10px
  }

  .after-install-zhibo-fixed .after-install-header > .icon {
    margin-bottom: 0
  }

  .after-install-zhibo-fixed .after-install-header > .icon > img {
    width: 60px;
    height: 60px
  }

  .after-install-zhibo-fixed .appInfo {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    margin-left: 10px;
    text-align: left
  }

  .after-install-zhibo-fixed .appInfo .primary-text {
    color: #4A4A4A;
    font-size: 20px;
    font-weight: 700
  }

  .after-install-zhibo-fixed .appInfo > h3 {
    margin: 0
  }

  .after-install-zhibo-fixed .info-text {
    display: block;
    font-size: 12px;
    text-align: left
  }

  .after-install-zhibo-fixed .after-install-header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-align: center;
    align-items: center
  }

  .after-install-zhibo-fixed .Downloading {
    margin-left: 10px;
    width: 45px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 14px
  }

  .after-install-zhibo-fixed .Downloading > i {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 10px
  }

  .after-install-close {
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 201;
    border: none;
    background: 0 0;
    font-size: 16px
  }

  .after-install-close:focus, .after-install-close:hover {
    outline: 0;
    border: none;
    background: 0 0
  }

  .after-install-header {
    -ms-flex: 1 0 240px;
    flex: 1 0 240px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    color: #4A4A4A
  }

  .popularize-app, .popularize-header {
    display: -ms-flexbox;
    text-align: left
  }

  .after-install-header > .icon {
    margin-bottom: 10px;
    font-size: 0
  }

  .after-install-header > .icon img {
    max-width: 100%;
    width: 80px;
    height: 80px;
    border-radius: 17.54%
  }

  .after-install-header .waiting {
    font-size: 22px;
    color: #32B2A7;
    margin: 0;
    position: relative
  }

  .after-install-header .waiting-dot {
    position: absolute;
    left: 90px
  }

  .popularize {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    background-color: #fff;
    box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, .08)
  }

  .popularize-header {
    padding: 0 10px;
    line-height: 60px;
    font-weight: 700;
    font-size: 16px;
    color: #4A4A4A;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between
  }

  .popularize-header .refresh {
    cursor: pointer
  }

  .popularize-header > h4 {
    margin: 0;
    padding-top: 16px;
    line-height: 16px
  }

  .popularize-header > p {
    margin: 0;
    padding-top: 4px;
    padding-bottom: 6px;
    font-size: 14px !important;
    line-height: 14px;
    font-weight: 400
  }

  .popularize-list {
    margin: 0;
    padding: 0;
    list-style-type: none
  }

  .popularize-list .popularize-actions {
    -ms-flex: 0 0 70px;
    flex: 0 0 70px;
    border-left: 1px solid #DEDEDE
  }

  .popularize-app {
    margin: 0;
    border-top: 1px solid #DEDEDE;
    display: flex;
    -ms-flex-align: center;
    align-items: center
  }

  .popularize-app > .app-icon {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    padding: 10px;
    font-size: 0
  }

  .popularize-app > .app-icon > img {
    width: 60px;
    height: 60px;
    border-radius: 5px
  }

  .popularize-app-zhibo {
    padding: 10px 15px 15px;
    border-top: 1px solid #DEDEDE;
    text-align: left;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column
  }

  .popularize-actions, .wechat_tip {
    text-align: center
  }

  .popularize-app-zhibo .secondary-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    margin-bottom: 5px;
    font-size: 12px;
    color: rgba(93, 103, 109, .9)
  }

  .popularize-app-zhibo .popularize-app-zhibo-content {
    width: 100%
  }

  .popularize-app-zhibo .popularize-app-zhibo-content > a > img {
    width: 100%;
    height: 100%
  }

  .popularize-app-zhibo .app-zhibo {
    margin-top: 10px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between
  }

  .popularize-app-zhibo .app-zhibo .app-zhibo-icon {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center
  }

  .popularize-app-zhibo .app-zhibo .app-zhibo-icon .app-zhibo-icon-img {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    font-size: 0
  }

  .popularize-app-zhibo .app-zhibo .app-zhibo-icon .app-zhibo-icon-img > img {
    border-radius: 5px;
    width: 40px;
    height: 40px
  }

  .popularize-app-zhibo .app-zhibo .app-zhibo-icon .primary-text {
    margin-left: 5px;
    color: #4A4A4A;
    font-size: 15px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal
  }

  .popularize-app-zhibo .app-zhibo .app-download {
    border-radius: 5px;
    background: #35A89B;
    color: #fff;
    width: 90px;
    height: 35px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center
  }

  .popularize-app-zhibo .app-zhibo .app-download > a {
    color: #fff;
    font-size: 14px;
    font-weight: 500
  }

  .popularize-content {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    margin-right: 10px
  }

  .popularize-content > .primary-text {
    color: #4A4A4A;
    font-size: 20px;
    font-weight: 700
  }

  .popularize-content > .secondary-text {
    font-size: 12px;
    color: rgba(93, 103, 109, .9)
  }

  .popularize-content .popularize-content-title {
    color: #1AA79A;
    font-size: 16px;
    font-weight: 700
  }

  .popularize-content .popularize-content-download {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    font-size: 12px;
    color: rgba(93, 103, 109, .9)
  }

  .popularize-actions > .download {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    color: #1AA79A;
    font-size: 20px
  }

  .popularize-actions > .download.download-block {
    background-color: #1AA79A;
    color: #fff;
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-radius: 3px;
    box-shadow: 0 3px 0 0 rgba(0, 0, 0, .1)
  }

  .popularize-app-detail {
    padding: 20px 10px 40px
  }

  .popularize-app-detail .popularize-header {
    line-height: 40px
  }

  .popularize-app-detail .popularize-app {
    border-top: none;
    margin-bottom: 10px
  }

  .popularize-app-detail .popularize-actions {
    padding: 0 20px
  }

  .bottom-popularize {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    font-size: 0
  }

  @media screen and (max-height: 500px) {
    .bottom-popularize {
      position: static
    }
  }

  .visiable-moblie {
    display: none
  }

  @media screen and (max-width: 720px) {
    .main .ad-section {
      width: 100%
    }
  }

  @media screen and (max-width: 768px) {
    .combo .main, .main {
      width: 100%;
      min-width: 100%
    }
    .data_error form, .error form, .forbidden form, .passwd form {
      margin-bottom: 30px
    }
    .main .app-brief {
      text-align: center
    }
    .main .app-brief button {
      display: inline-block
    }
    .main .app-brief .bg-path, .main .app-brief .qrcode {
      display: none
    }
    .main .icon-container {
      width: 100%;
      height: auto;
      text-align: center
    }
    .main .icon-container .icon {
      position: static;
      display: inline-block
    }
    .main .footer .one-key-report {
      float: none;
      display: block;
      width: 80px;
      margin: 20px auto 0
    }
    .dialog {
      width: 100%;
      height: 100%;
      margin: 0;
      left: 0;
      top: 0;
      bottom: 0;
      border-radius: 0;
      padding-top: 30px;
      overflow-y: auto;
      transform: translate(0, 0)
    }
    .dialog.animate {
      transition: left .5s
    }
    .dialog .dialog-close {
      left: 10px;
      right: 0
    }
    .dialog .dialog-close .icon-close {
      display: none
    }
    .dialog .dialog-close .icon-return {
      display: block
    }
    .one-key-report-dialog .report-form {
      padding-top: 20px
    }
    .one-key-report-dialog .content-row label {
      margin-right: 10px
    }
    .one-key-report-dialog .content-row .custom-checkbox {
      margin-right: 5px
    }
    .one-key-report-dialog .dialog-action {
      padding-top: 20px;
      text-align: center
    }
    .one-key-report-dialog .dialog-action a.btn-report {
      float: none
    }
  }

  .wechat_tip, .wechat_tip > i {
    position: absolute;
    right: 10px
  }

  @media screen and (min-width: 1024px) {
    .main header .app-brief .icon-container:hover .qrcode {
      transform: scale(1.6);
      box-shadow: 0 1px 5px rgba(0, 0, 0, .3)
    }
  }

  .wechat_tip {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    background: #3AB2A7;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    width: 135px;
    height: 60px;
    border-radius: 10px;
    top: 15px
  }

  .wechat_tip > i {
    top: -10px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid #3AB2A7
  }
</style>
