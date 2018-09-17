<style lang="scss">
  .module-video {
    margin: 10px 0;
    background-color: #fff;
    .module-title {
      padding: 15px;
      border-bottom: 1px solid #d9d9d9;
    }
    .video-block {
      text-align: center;
      padding-top: 15px;
      padding-bottom: 10px;
    }
  }

</style>

<template>
  <div class="module-video">
    <h4 class="module-title">{{params.moduleTitle}}</h4>

    <div v-if="showModule">
      <!-- 视频 -->
      <div class="video-block" v-show="showContent">
        <video width="100%" controls>
          <source :src="params.moduleObject.videoUrl" type="video/mp4">
          <!-- <source src="movie.ogg" type="video/ogg"> -->
          您的浏览器不支持 video 标签。
        </video>
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
  import Fold from "../Fold.vue";
  import Password from '../Password.vue'

  export default {
    name: "ModuleVideo",
    components: {Password, Fold},
    props: {
      params: {
        type: Object
      }
    },
    data() {
      return {
        type: "视频",
        showFold: this.params.isFold,
        showContent: !this.params.isFold,
        showPassword:"",
      }
    },
    computed: {
      showModule(){
          return !this.showPassword;
      }
    },
    mounted() {
      console.log("7视频模块params：");
      console.log(this.params);

      if (sessionStorage.getItem("successVideoPassword") == "true") {
        this.showPassword = false;
      }else{
        this.params.moduleObject.displayAuthState==3?this.showPassword = true:this.showPassword = false;
      }

    },
    methods: {
      //接收Fold组件的信息
      receiveFold(res) {
        this.showContent = res;
      },
      //接受Password组件传来的信息
      receivePassword(res) {
        this.showPassword = res;
      }
    }
  }
</script>
