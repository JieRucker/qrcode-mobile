<style lang="scss">
.module-image {
  background-color: #fff;
  margin: 10px 0;
  .module-title {
    padding: 15px;
  }
  .img-block {
    position: relative;
    text-align: center;
    padding-bottom: 10px;
    >img{
      width: 100%;
    }
    .edit-button {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>

<template>
  <div class="module-image">
    <!-- 标题 -->
      <h4 class="module-title set-1px-b">{{params.moduleTitle}}</h4>
      <div v-if="showModule">      
        <!-- 图片 -->
        <div class="img-block" v-if="showContent">
          <!--<img ref="img" :src="params.moduleObject.imageUrl" />-->
          <x-img ref="img" :src="params.moduleObject.imageUrl"></x-img>
          <x-button class="edit-button" v-if="params.moduleObject.editAuthState==1?true:false" mini type="default" @click.native="editButton">编辑</x-button>
        </div>
        <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
      </div>
      <!-- 输入密码查看 -->
    <Password
      v-if="showPassword"
      v-bind:module-type="type"
      v-bind:module-id="params.moduleId"
      v-on:returnPassword="receivePassword"
    ></Password>
      <!-- 模态弹出框actionsheet -->
      <actionsheet v-model="showActionSheet" :menus="actionSheetMenus" @on-click-menu="menusButton" show-cancel></actionsheet>
      <!-- 上传文件 -->
      <input type="file" ref="file" name="file" id="file" accept="image/*" @change="changePhoto" style="display:none">

  </div>
</template>

<script>
import Fold from "../Fold.vue";
import Password from "../Password.vue";
import { XImg, XButton, Actionsheet } from "vux";

export default {
  name: "ModuleImage",
  components: { Fold, Password, XImg, XButton, Actionsheet },
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      type: "图片",
      showFold: this.params.isFold,
      showContent: !this.params.isFold,
      showPassword: "",
      showActionSheet: false,
      actionSheetMenus: {
        menu1: "拍照",
        menu2: "从手机相册选择"
      }
    };
  },
  computed: {
    showModule() {
      return !this.showPassword;
    },
    oldImg() {
      return JSON.parse(JSON.stringify(this.params.moduleObject.imageUrl));
    }
  },
  mounted() {
    if (sessionStorage.getItem("successImagePassword") == "true") {
      this.showPassword = false;
    } else {
      this.params.moduleObject.displayAuthState === 3
        ? (this.showPassword = true)
        : (this.showPassword = false);
    }
  },
  methods: {
    //菜单的两个按钮
    menusButton(key) {
      console.log(key); //3种情况
      switch (key) {
        case "menu1":
          this.takePhoto();
          break;
        case "menu2":
          this.choosePhoto();
          break;
      }
    },
    //拍照
    takePhoto() {
      console.log("拍照");
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    },
    //从手机相册选择照片
    choosePhoto() {
      console.log(this.oldImg);
      console.log("选择照片");
      this.$refs.file.click();
      document.getElementById("file").click();
    },
    //选择照片后更换照片
    changePhoto() {
      if (this.$refs.file.files.length !== 0) {
        console.log("有照片");
        console.log(this.$refs.file.files[0].name);
      } else {
        console.log("没有照片");
      }
      var that = this;
      //获取文件
      var file = this.$refs.file.files[0];
      //创建读取文件的对象
      var reader = new FileReader();
      //创建文件读取相关的变量
      var imgFile;
      //为文件读取成功设置事件
      reader.onload = function(e) {
        console.log("文件读取完成");
        imgFile = e.target.result;
        console.log(imgFile);
        that.$refs.img.setAttribute("src", imgFile);
      };
      //正式读取文件
      reader.readAsDataURL(file);

      console.log(this.$refs.file.files);
      // 显示
      this.$vux.loading.show({
        text: "正在上传图片"
      });
      setTimeout(() => {
        // 隐藏
        this.$vux.loading.hide();
        // 显示
        this.$vux.toast.show({
          text: "图片更换成功"
        });
        this.$refs.img.setAttribute("src", this.oldImg);
      }, 2000);

      //请求更换图片
      this.$axios
        .post(this.$api.updateModuleImage, {
          photo: imgFile
        })
        .then(res => {
          if (res.data.success) {
            console.log("更换成功");
          } else {
            console.log("请求失败");
            that.$refs.img.setAttribute("src", this.oldImg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击编辑按钮,从底部弹出模态框
    editButton() {
      this.showActionSheet = true;
    },
    //接收Fold组件的信息
    receiveFold(res) {
      this.showContent = res;
    },
    //接受密码子组件传来的信息
    receivePassword(res) {
      this.showPassword = res;
    }
  }
};
</script>
