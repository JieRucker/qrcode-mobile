<style lang="scss">
.module-image-text {
  margin: 10px 0;
  background-color: #fff;
  .module-title {
    padding: 15px;
  }
  .text-content {
    padding: 15px;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>

<template>
  <div class="module-image-text">
    <h4 class="module-title set-1px-b">{{params.moduleTitle}}</h4>
    <div v-if="showContent">
      <div style="background-color:#fff;text-align:center;">
        <x-img :src="params.moduleObject.image.imageUrl" width="100%" :offset="-100"></x-img>
      </div>
      <div class="text-content" v-html="params.moduleObject.textContent"></div>
    </div>
    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
  </div>
</template>

<script>
import Fold from "../Fold.vue";
import { XImg } from "vux";
export default {
  name: "ModuleImageText",
  components: { Fold, XImg },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          moduleId: "m001",
          moduleTitle: "1图文标题",
          moduleType: 1,
          templateId: "t001",
          isFold: 1,
          sortId: 1,
          moduleObject: {
            textContent:
              "Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。",
            imageUrl:
              "https://bizimg.clewm.net/903/728/2728903/1519873553167bc3d2610fddd9d51638f7627b85f0fab1519873544.jpg@20Q"
          }
        };
      }
    }
  },
  data() {
    return {
      showFold: this.params.isFold,
      showContent: !this.params.isFold
    };
  },
  methods: {
    receiveFold(res) {
      this.showContent = res;
    }
  }
};
</script>
