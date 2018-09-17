<style lang="scss">
  .materialPage {
    padding-bottom: 10px;
  }
</style>

<template>
  <div class="materialPage">

    <component :is="item.component" :params="item.params" v-for="(item,index) in componentList"
               :key="index"></component>

  </div>
</template>

<script>
  import ModuleWechat from "@/components/ModuleWechat/ModuleWechat.vue";
  import ModuleInteract from "@/components/ModuleInteract/ModuleInteract.vue";
  import ModuleAtlas from "@/components/ModuleAtlas/ModuleAtlas.vue";
  // import ModuleImage from "@/components/ModuleImage/ModuleImage.vue";
  import ModuleImageText from "@/components/ModuleImageText/ModuleImageText.vue";
  import ModuleCard from "@/components/ModuleCard/ModuleCard.vue";
  import ModuleLink from "@/components/ModuleLink/ModuleLink.vue";
  import ModuleContact from "@/components/ModuleContact/ModuleContact.vue";
  import ModuleNavigationInfo from "@/components/ModuleNavigationInfo/ModuleNavigationInfo.vue";
  import ModuleFile from "@/components/ModuleFile/ModuleFile.vue";
  import ModuleAudio from "@/components/ModuleAudio/ModuleAudio.vue";
  import ModuleVideo from "@/components/ModuleVideo/ModuleVideo.vue";
  // import ModuleProductParameter from "@/components/ModuleProductParameter/ModuleProductParameter.vue";
  import ModuleMaterial from "@/components/ModuleMaterial/ModuleMaterial.vue";
  import ModuleClassify from "@/components/ModuleClassify/ModuleClassify.vue";

  export default {
    name: "MaterialPage",
    components: {
      ModuleWechat,
      ModuleInteract,
      ModuleProbation,
      ModuleAtlas,
      // ModuleImage,
      ModuleImageText,
      ModuleFile,
      ModuleAudio,
      ModuleVideo,
      ModuleCard,
      ModuleLink,
      ModuleContact,
      ModuleNavigationInfo,
      // ModuleProductParameter,
      ModuleMaterial,
      ModuleClassify,
    },
    props: {},
    data() {
      return {
        templateData: "",
        componentList: []
      };
    },
    computed: {},
    mounted() {
      let data = {
        templateId: "1000001"
      };
      console.log(data);
      this.$vux.loading.show({text: "正在加载"});
      this.$api.qrcodeInterface
        .listModule(data)
        .then(res => {
          this.$vux.loading.hide();
          if (res.data.success) {
            this.templateData = res.data;
            if (typeof this.templateData.moduleVOList === 'undefined') {
              console.log("没有moduleVOList");
              return false;
            }
            this.afterData();
          } else {
            this.$vux.toast.show({type: "cancel", text: "加载失败"});
          }
        })
        .catch(err => {
          this.$vux.loading.hide();
          this.$vux.toast.show({type: "warn", text: "Request failed"});
          console.error(err);
        });
    },
    methods: {
      add(name, params) {
        this.componentList.push({
          component: name,
          params: params
        });
      },
      // 模块类型 0图片 1图文 2产品参数 3文件 4图集 5链接 6名片 7视频 8音频 9联系我们 10素材 11分类 12网址导航 13记录模板 20互动 21微信加好友(注:0-13属于二维码模块 20-21属于素材模块)
      afterData() {
        let module = this.templateData.moduleVOList;
        module.forEach(item => {
          let params = {
            moduleId: item.moduleId,
            moduleTitle: item.moduleTitle,
            moduleType: item.moduleType,
            templateId: item.templateId,
            isFold: item.isFold,
            moduleObject: item.moduleObject
          };
          switch (item.moduleType) {
            //0图片
            // case 0:
            //   this.add("ModuleImage",params);
            //   break;
            //1图文
            case 1:
              this.add("ModuleImageText", params);
              break;
            //2产品参数
            // case 2:
            //   this.add("ModuleProductParameter", params);
            //   break;
            //3文件
            case 3:
              this.add("ModuleFile", params);
              break;
            //4图集
            case 4:
              this.add("ModuleAtlas", params);
              break;
            //5链接
            case 5:
              this.add("ModuleLink", params);
              break;
            //6名片
            case 6:
              this.add("ModuleCard", params);
              break;
            //7视频
            case 7:
              this.add("ModuleVideo", params);
              break;
            //8音频
            case 8:
              this.add("ModuleAudio", params);
              break;
            //9联系我们
            case 9:
              this.add("ModuleContact", params);
              break;
            //10素材
            case 10:
              this.add("ModuleMaterial", params);
              break;
            //11分类
            case 11:
              this.add("ModuleClassify", params);
              break;
            //网址导航
            case 12:
              this.add("ModuleNavigationInfo", params);
              break;
            //13记录模板
            // case 13:
            //   this.add("ModuleRecord", params);
            //   break;
          }
        })
      }
    }
  };
</script>

