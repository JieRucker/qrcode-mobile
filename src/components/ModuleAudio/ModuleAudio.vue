<style lang="scss">
.module-audio {
  background-color: #fff;
  margin: 10px 0;
  .module-title {
    padding: 15px;
  }
  .audio-block {
    text-align: center;
    padding-top: 15px;
    padding-bottom: 10px;
  }
}
</style>

<template>
  <div class="module-audio">
    <!-- 音频标题 -->
    <h4 class="module-title set-1px-b">{{params.moduleTitle}}</h4>
    <div v-if="showModule">
      <!-- 音频 -->
      <div class="audio-block" v-if="showContent">
        <audio controls>
          <!-- <source src="horse.ogg" type="audio/ogg"> -->
          <source :src="params.moduleObject.audioUrl" type="audio/mpeg">
          您的浏览器不支持 audio 元素。
        </audio>
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
import Password from "../Password.vue";
export default {
  name: "ModuleAudio",
  components: { Fold, Password },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          moduleId: "m008",
          moduleTitle: "8音频标题",
          moduleType: 8,
          templateId: "t001",
          isFold: 1,
          sortId: 1,
          moduleObject: {
            displayAuthState: 3,
            videoUrl: "http://gplove.top/audio1.mp3"
          }
        };
      }
    }
  },
  data() {
    return {
      type: "音频",
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
    if (sessionStorage.getItem("successAudioPassword") == "true") {
      this.showPassword = false;
    }else{
      this.params.moduleObject.displayAuthState==3 ? this.showPassword = true:this.showPassword = false;
    }
  },
  methods: {
      receiveFold(res) {
        this.showContent = res;
      },
      receivePassword(res) {
        this.showPassword = res;
      }
  }
};
</script>
