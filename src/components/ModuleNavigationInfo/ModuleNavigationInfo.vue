<style lang="scss">
.module-navigation {
  margin: 10px 0;
  background-color: #fff;
  .module-title {
    padding: 15px;
    border-bottom: 1px solid #d9d9d9;
  }
  .cell {
    padding-top: 15px;
    padding-bottom: 15px;
    color: #666;
    img {
      display: block;
      margin-right: 10px;
    }
  }
  .weui-grid__icon {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  .grid-item {
    padding: 16px 8px;
    .grid-img {
      width: 28px;
      height: 28px;
    }
    .grid-text {
      font-size: 14px;
      color: #666;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .gridImg1 {
      display: inline-block;
      vertical-align: text-bottom;
      margin-right: 5px;
    }
    .gridText1 {
      display: inline-block;
      width: 70%;
    }
    .gridImg2 {
      display: block;
      margin: 0 auto 5px auto;
    }
    .gridText2 {
      display: block;
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="module-navigation">
    <h4 class="module-title">{{params.moduleTitle}}</h4>
    <div v-show="showContent">
      <div style="background-color:#fff;text-align:center;">
        <!--<x-img :src="params.image.imageUrl"></x-img>-->
        <img :src="params.moduleObject.image.imageUrl">
      </div>
      <!-- 导航样式 = 0 -->
      <div class="one" v-if="typeOne">
        <cell class="cell" v-for="(item,index) in params.moduleObject.navigationList" :key="index" :title="item.navigationName"
              :link="item.actionType | judgeType(item)">
          <img slot="icon" width="26" :src="item.icon">
        </cell>
      </div>
      <!-- 导航样式 = 1,2,3,4 -->
      <div class="two" v-if="typeTwo">
        <grid :cols="cols" :show-lr-borders="false">
          <grid-item class="grid-item" v-for="(item,index) in params.moduleObject.navigationList" :key="index"
                     :link="item.actionType | judgeType(item)">
            <img class="grid-img" :class="gridImg" :src="item.icon.iconUrl">
            <span class="grid-text" :class="gridText">{{item.navigationName}}</span>
          </grid-item>
        </grid>
      </div>
    </div>
    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>

  </div>
</template>

<script>
import Fold from "../Fold.vue";
import { XImg, Cell, Grid, GridItem } from "vux";
export default {
  name: "ModuleNavigationInfo",
  components: { XImg, Cell, Grid, GridItem, Fold },
  props: {
    params: {
      type: Object
    }
    // 导航样式 0一行一项 1一行两项 2一行三项 3一行四项 4智能排列
  },
  data() {
    return {
      showFold: this.params.isFold,
      showContent: !this.params.isFold,
      typeOne: false,
      typeTwo: false
    };
  },
  mounted() {
    console.log("12网址导航模块params：");
    console.log(this.params);
    this.params.moduleObject.navigationType == 0
      ? (this.typeOne = true)
      : (this.typeTwo = true);
  },
  computed: {
    cols() {
      if (
        this.params.moduleObject.navigationType == 1 ||
        this.params.moduleObject.navigationType == 2 ||
        this.params.moduleObject.navigationType == 3
      ) {
        return this.params.moduleObject.navigationType + 1;
      }
      if (this.params.moduleObject.navigationType == 4) {
        var num = this.params.moduleObject.navigationList.length;
        if (num == 1 || num == 2 || num == 3 || num == 4) {
          return num;
        } else if (num % 4 == 0 || num % 4 == 3) {
          return 4;
        } else {
          return 3;
        }
      }
    },
    gridImg() {
      switch (this.params.moduleObject.navigationType) {
        case 0:
          break;
        case 1:
          return { gridImg1: true };
          break;
        default:
          return { gridImg2: true };
          break;
      }
    },
    gridText() {
      switch (this.params.moduleObject.navigationType) {
        case 0:
          break;
        case 1:
          return { gridText1: true };
          break;
        default:
          return { gridText2: true };
          break;
      }
    }
  },
  methods: {
    receiveFold(res) {
      this.showContent = res;
    }
  },
  filters: {
    judgeType(value, item) {
      switch (value) {
        case 0:
          return item.linkUrl;
          break;
        case 1:
          return item.pageNavigation;
          break;
        case 2:
          return item.templateId;
          break;
      }
    }
  }
};
</script>
