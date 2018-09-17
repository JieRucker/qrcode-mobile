<style lang="scss">
.module-productParameter {
  margin: 10px 0;
  background-color: #fff;
  .module-title {
    padding: 15px;
  }
  .productParameter-cell {
    font-size: 14px;
    padding: 15px;
    &:active {
      background-color: #f2f2f2;
    }
    .cell-left {
      width: 25%;
      float: left;
      color: #8a8d91;
      font-size: 0.9rem;
      p {
        width: 60px;
      }
      .cellLeftGroup {
        width: 400% !important;
        color: #2c2e32;
        font-weight: bold !important;
      }
    }
    .cell-right {
      width: 75%;
      float: left;
      color: #0b0b0b;
    }
  }
}
</style>

<template>
  <div class="module-productParameter">
      <h4 class="module-title set-1px-b">{{params.moduleTitle}}</h4>
    <group v-if="showContent" label-width="4.5em" label-margin-right="2em" label-align="left" gutter="0">
      <cell class="productParameter-cell" 
        v-for="(item,index) in params.moduleObject.productParameterList" 
        v-if="item.displayable==1?true:false" 
        :key="index" 
        :link="item.type==2?item.link.linkUrl:''"
        value-align="left">
        <div class="cell-left">
            <p :class="{cellLeftGroup:item.type==4?true:false}">
              {{item.type==4?item.text:item.paramName}}
              <!-- {{item.type | judgeGroup(item)}} -->
            </p>
        </div>
        <div class="cell-right" v-if="item.type==4?false:true">
          {{item.type | judgeType(item)}}
          <img v-if="item.type==1?true:false" :src="item.image.imageUrl" />
        </div>
      </cell>      
    </group>
    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
  </div>
</template>

<script>
import Fold from "../Fold.vue";
import { GroupTitle, Group, Cell } from "vux";
export default {
  name: "ModuleProductParameter",
  components: { Fold, GroupTitle, Group, Cell },
  props: {
    params: {
      type: Object
    }
  },
  data() {
    return {
      showImg: true,
      showFold: this.params.isFold,
      showContent: !this.params.isFold
    };
  },
  methods: {
    receiveFold(res) {
      this.showContent = res;
    }
  },
  filters: {
    judgeGroup(value, item) {
      return item.type == 4 ? item.text : item.paramName;
    },
    // 类型 0文本 1图片 2链接 3多行文本 4分组名称
    judgeType(value, item) {
      switch (value) {
        case 0:
          return item.text;
          break;
        case 1:
          return "";
          break;
        case 2:
          return item.link.linkName;
          break;
        case 3:
          return item.textarea;
          break;
        case 4:
          return item.text;
          break;
      }
    }
  }
};
</script>
