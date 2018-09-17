<style lang="scss">
  .module-atlas {
    margin: 10px 0;
    background-color: #fff;
    .module-title {
      padding: 15px;
      // border-bottom: 1px solid #d9d9d9;
    }
  }
</style>

<template>
  <div class="module-atlas">
    <h4 class="module-title set-1px-b">{{params.moduleTitle}}</h4>
    <div v-show="showContent">
      <swiper loop auto :list="imageList" :index="0"></swiper>
    </div>

    <!--展开-->
    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
  </div>
</template>

<script>
  import {Swiper} from "vux";
  import Fold from "../Fold.vue";

  export default {
    name: "ModuleAtlas",
    components: {Swiper, Fold},
    props: {
      params: {
        type: Object,
        default: () => {
          return {
            moduleId: "m004",
            moduleTitle: "4图集标题",
            moduleType: 4,
            templateId: "t001",
            isFold: 1,
            sortId: 1,
            moduleObject: {
              displayAuthState: 1,
              imageList: [
                {
                  imageName: "p1",
                  url: "javascript:",
                  img: "http://gplove.top/dog1.png"
                },
                {
                  imageName: "p2",
                  url: "javascript:",
                  img: "http://gplove.top/dog2.png"
                },
                {
                  imageName: "p3",
                  url: "javascript:",
                  img: "http://gplove.top/dog3.png"
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
    mounted() {},
    computed: {
      imageList() {
        let list = [];
        this.params.moduleObject.imageList.forEach(item => {
          list.push({img: item.imageUrl});
        });
        return list
      }
    },
    methods: {
      //接收Fold组件的信息
      receiveFold(res) {
        this.showContent = res;
      }
    }
  };
</script>
