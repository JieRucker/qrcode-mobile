<style lang="scss">
.module-card {
  margin: 10px 0;
  background-color: #fff;
  .module-title {
    font-weight: bold;
    padding: 15px;
  }
  .cell {
    padding-top: 15px;
    padding-bottom: 15px;
    .cell-img {
      display: block;
      margin-right: 15px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .cell-right {
      color: #000;
      font-size: 15px;
      >p{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .desc {
        color: #888;
        font-size: 14px;
        margin-top: 1px;
      }
    }
  }
}
</style>

<template>
  <div class="module-card">
    <!-- <div class="module-title set-1px-b">{{params.moduleObject.card.fullName}}的名片</div> -->
    <div class="module-title set-1px-b">{{params.moduleTitle}}</div>
    <div v-if="showContent">
      <cell class="cell" :link="{path:'./Card',query:{cardId:params.moduleObject.cardId}}" value-align="left" :border-intent="false">
        <img class="cell-img" slot="icon" width="60" :src="params.moduleObject.card.avatarImage">
        <div class="cell-right">
          <p class="name">{{params.moduleObject.card.fullName}}</p>
          <p class="desc">{{params.moduleObject.card.position}}</p>
          <p class="desc">{{params.moduleObject.card.mobilePhone}}</p>
        </div>
      </cell>
    </div>
    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
  </div>
</template>

<script>
import Fold from "../Fold.vue";
import { XImg, Cell } from "vux";
export default {
  name: "ModuleCard",
  components: { Fold, XImg, Cell },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          moduleId: "m006",
          moduleTitle: "6名片标题",
          moduleType: 6,
          templateId: "t001",
          isFold: 1,
          sortId: 1,
          moduleObject: {
            cardId: "001",
            card: {
              fullName: "柯南",
              position: "侦探",
              mobilePhone: "18601467018",
              avatarImage: "http://gplove.top/dog1.png"
            }
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
  mounted() {},
  computed: {},
  methods: {
    receiveFold(res) {
      this.showContent = res;
    }
  },
  filters: {}
};
</script>
