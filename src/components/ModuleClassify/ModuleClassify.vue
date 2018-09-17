<style lang="scss">
.module-classify {
  margin: 10px 0;
  background-color: #fff;
  .cell {
    font-weight: bold;
    padding: 15px !important;
  }
  .classify-content {
    padding: 15px;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>

<template>
  <!-- 分类 -->
  <div class="module-classify">
    <cell class="cell set-1px-b" :title="this.params.moduleTitle" :link="{path:'./ClassifyPage',query:{templateId:this.params.moduleObject.templateId}}"></cell>
    <p class="classify-content" v-if="showContent">{{this.params.moduleObject.classifyContent}}</p>

    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
  </div>
</template>

<script>
import Fold from "../Fold.vue";
import { XImg, Cell } from "vux";
export default {
  name: "ModuleClassify",
  components: { Fold,XImg, Cell },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          moduleId: "m011",
          moduleTitle: "11分类标题",
          moduleType: 11,
          templateId: "t001",
          isFold: 1,
          sortId: 1,
          moduleObject: {
            linkName: "11分类标题",
            templateId: "001",
            classifyContent:
              "Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。如果你想在深入学习 Vue 之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程。"
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
  computed: {},
  mounted() {},
  methods: {
    receiveFold(res) {
      this.showContent = res;
    }
  }
};
</script>
