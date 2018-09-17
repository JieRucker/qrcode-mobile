<style lang="scss">
.module-contact {
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
  .contact-ul {
    .contact-li {
      display: -webkit-flex;
      display: flex;
      &:active {
        background-color: #f2f2f2;
      }
      .left {
        width: 80px;
        position: relative;
        img {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translate(-50%, -50%);
        }
      }
      .right {
        flex: 1;
        border-bottom: 1px solid #f2f2f2;
        h6 {
          font-weight: 400;
          color: #999;
          margin: 12px 0;
        }
        p {
          color: #000;
          font-size: 15px;
          margin: 0 2px 12px 0;
          a {
            color: #000;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="module-contact">
    <h4 class="module-title set-1px-b">{{params.moduleTitle}}</h4>
    <div v-if="showContent">
      <p class="module-desc">{{params.moduleObject.moduleDesc}}</p>
      <ul class="contact-ul">
        <router-link tag="li" class="contact-li" :to="{path:'./MapPage',query:{longitude:params.moduleObject.address.longitude,dimension:params.moduleObject.address.dimension}}">
          <div class="left">
            <img src="@/assets/images/icon/icon-main-address.png">
          </div>
          <div class="right">
            <h6>地址</h6>
            <p>{{params.moduleObject.address.address}}</p>
          </div>
        </router-link>
        <li class="contact-li" v-for="(item,index) in params.moduleObject.contactWayList" :key="index">
          <div class="left">
            <img :src="item.type | typeImg">
          </div>
          <div class="right">
            <h6>{{item.name}}</h6>
            <p><a :href="'tel:'+item.content">{{item.content}}</a></p>
          </div>
        </li>          
      </ul> 
    </div>
    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
  </div>
</template>

<script>
import Fold from "../Fold.vue";
export default {
  name: "ModuleContact",
  components: { Fold },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          moduleId: "m009",
          moduleTitle: "9联系我们标题",
          moduleType: 9,
          templateId: "t001",
          isFold: 1,
          sortId: 1,
          moduleObject: {
            moduleDesc: "联系我们描述",
            address: {
              longitude: "30.193513",
              dimension: "120.223289",
              address: "春波南苑"
            },
            contactWayList: [
              { name: "家庭电话", type: 1, content: "158695263654" },
              { name: "公司电话", type: 2, content: "18695995588" }
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
    //接收Fold组件的信息
    receiveFold(res) {
      this.showContent = res;
    }
  },
  filters: {
    typeImg(value) {
      var typeImg = "";
      switch (value) {
        case 0:
          typeImg = require("@/assets/images/icon/icon-main-phone.png");
          break;
        case 1:
          typeImg = require("@/assets/images/icon/icon-main-phone.png");
          break;
        case 2:
          typeImg = require("@/assets/images/icon/icon-main-telephone.png");
          break;
        case 3:
          typeImg = require("@/assets/images/icon/6.png");
          break;
        case 4:
          typeImg = require("@/assets/images/icon/7.png");
          break;
      }
      return typeImg;
    }
  }
};
</script>
