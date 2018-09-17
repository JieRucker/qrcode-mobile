<style lang="scss">
.module-link {
  margin: 10px 0;
  background-color: #fff;
  .module-title {
    padding: 15px;
  }
  .module-desc {
    font-size: 14px;
    padding: 15px;
    color: #666;
    // border-bottom: 1px solid #f2f2f2;
  }
  .cell {
    padding: 15px;
  }
}
</style>

<template>
  <div class="module-link">
    <h4 class="module-title set-1px-b">{{params.moduleTitle}}</h4>
    <div v-if="showContent">
      <p class="module-desc">{{params.moduleObject.moduleDesc}}</p>
      <div class="link-list">
        <cell class="cell" v-for="(item,index) in params.moduleObject.linkList" :key="index" :title="item.linkName" :link="item.linkUrl"></cell>
      </div> 
    </div>
    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
  </div>
</template>

<script>
import Fold from "../Fold.vue";
import { XImg, Cell } from "vux";
export default {
  name: "ModuleLink",
  components: { Fold, XImg, Cell },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          moduleId: "m005",
          moduleTitle: "5链接标题",
          moduleType: 5,
          templateId: "t001",
          isFold: 1,
          sortId: 1,
          moduleObject: {
            showWxTip: 1,
            moduleDesc: "链接描述",
            linkList: [
              {
                text: "百度",
                url: "#"
              },
              {
                text: "新浪",
                url: "#"
              }
            ]
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
