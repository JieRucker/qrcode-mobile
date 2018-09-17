<style lang="scss">
.module-file {
  margin: 10px 0;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  // padding-bottom:40px;
  .module-title {
    padding: 15px;
    border-bottom: 1px solid #d9d9d9;
  }
  .cell {
    padding-top: 15px;
    padding-bottom: 15px;
    .cell-img {
      display: block;
      margin-right: 15px;
    }
    .name {
      color: #000;
      margin-bottom: 4px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .size {
      color: #aaa;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <div class="module-file">
    <h4 class="module-title">{{params.moduleTitle}}</h4>

    <div v-if="showModule">
      <div class="file-block" v-if="showContent" ref="content">
        <cell class="cell" v-for="(item,index) in params.moduleObject.fileList" :key="index" :link="item.fileUrl" value-align="left">
          <img class="cell-img" slot="icon" width="38" :src="item.fileName | judgeType">
          <p class="name">{{item.fileName}}</p>
          <p class="size">{{item.fileSize}} B</p>
        </cell>

      </div>

      <!--展开-->
      <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>

    </div>
    <!-- 输入密码查看 -->
    <Password
      v-if="showPassword"
      v-bind:module-type="type"
      v-bind:module-id="params.moduleId"
      v-on:returnPassword="receivePassword"
    ></Password>
  </div>
</template>

<script>
import common from "@/libs/common.js";
import { XImg, Cell } from "vux";
import Password from "../Password.vue";
import Fold from "../Fold.vue";
import Cookies from "js-cookie";

export default {
  name: "ModuleFile",
  components: { XImg, Cell, Password, Fold },
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      type: "文件",
      showFold: this.params.isFold,
      showContent: !this.params.isFold,
      showPassword: ""
    };
  },
  computed: {
    showModule() {
      return !this.showPassword;
    }
  },
  mounted() {
    // console.log("缓存cookie："+common.getCookie('successFilePassword'));
    // console.log("缓存cookie2："+Cookies.get('successFilePassword'));

    console.warn("3文件模块params：");
    console.log(this.params);
    if (sessionStorage.getItem("successFilePassword") == "true") {
      this.showPassword = false;
    } else {
      this.params.moduleObject.displayAuthState == 3
        ? (this.showPassword = true)
        : (this.showPassword = false);
    }
  },

  methods: {
    receiveFold(res) {
      this.showContent = res;
    },
    receivePassword(res) {
      this.showPassword = res;
    }
  },
  filters: {
    judgeType(value) {
      //判断文件类型
      var type = value.substr(value.lastIndexOf(".")).toLowerCase();
      const DOC_TYPE = [".doc", ".docx", ".wps", ".txt"];
      const IMG_TYPE = [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".psd",
        ".tiff",
        ".tga",
        "eps"
      ];
      const AUDIO_TYPE = [".mp3", ".wav", ".ape", ".wma", ".mid"];
      const VIDEO_TYPE = [".mp4", ".rmvb", ".avi", ".ts", ".rmvb"];
      const EXCEL_TYPE = [".xlsx", ".xls"];
      const PDF_TYPE = [".pdf"];
      if (DOC_TYPE.indexOf(type) != -1) {
        return require("@/assets/images/icon/icon-main-doc.png");
      } else if (IMG_TYPE.indexOf(type) != -1) {
        return require("@/assets/images/icon/icon-main-image.png");
      } else if (AUDIO_TYPE.indexOf(type) != -1) {
        return require("@/assets/images/icon/icon-main-music.png");
      } else if (VIDEO_TYPE.indexOf(type) != -1) {
        return require("@/assets/images/icon/icon-main-video.png");
      } else if (EXCEL_TYPE.indexOf(type) != -1) {
        return require("@/assets/images/icon/5.png");
      } else if (PDF_TYPE.indexOf(type) != -1) {
        return require("@/assets/images/icon/6.png");
      }
    }
  }
};
</script>
