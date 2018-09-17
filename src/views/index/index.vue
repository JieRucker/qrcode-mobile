<style lang="scss">
  .index {
    padding-bottom: 10px;
  }

  .indexPaddingBottom {
    padding-bottom: 62px;
  }
</style>

<template>
  <div class="index" :class="indexPaddingBottom" v-if="showPage">

    <!--<test></test>-->
    <!--<ModuleWechat></ModuleWechat>-->
    <!--<ModuleInteract></ModuleInteract>-->
    <!-- 试用 -->
    <!--<ModuleProbation></ModuleProbation>-->
    <!-- 模板状态 -->
    <TemplateRecordState v-if="showTemplateRecordState"></TemplateRecordState>
    <!-- 基本信息 -->
    <TemplateInfo v-if="showTemplateInfo" :template-desc="templateData.templateDesc"></TemplateInfo>

    <component :is="item.component" :params="item.params" v-for="(item,index) in componentList"
               :key="index"></component>


    <!-- 记录模块 -->
    <!-- <ModuleRecord></ModuleRecord> -->
    <!--<RecordFooter></RecordFooter>-->
    <!-- 分类模块 -->
    <!-- <ModuleClassify></ModuleClassify> -->
    <!-- 素材模块 -->
    <!-- <ModuleMaterial></ModuleMaterial> -->
    <!-- 名片模块 -->
    <!-- <ModuleCard></ModuleCard> -->
    <!-- 文件模块 -->
    <!-- <ModuleFile></ModuleFile> -->
    <!-- 产品参数 -->
    <!-- <ModuleProductParameter></ModuleProductParameter> -->
    <!-- 网址导航模块 -->
    <!-- <ModuleNavigationInfo></ModuleNavigationInfo> -->
    <!-- 链接模块 -->
    <!-- <ModuleLink></ModuleLink> -->
    <!-- 联系我们模块 -->
    <!-- <ModuleContact></ModuleContact> -->
    <!-- 音频模块 -->
    <!-- <ModuleAudio></ModuleAudio> -->
    <!-- 视频模块 -->
    <!-- <ModuleVideo></ModuleVideo> -->
    <!-- 图片模块 -->
    <!-- <ModuleImage></ModuleImage> -->
    <!-- 图集模块 -->
    <!-- <ModuleAtlas></ModuleAtlas> -->
    <!-- 图文模块 -->
    <!-- <ModuleImageText></ModuleImageText> -->
  </div>
</template>

<script>
  import test from "@/components/test.vue";
  import ModuleWechat from "@/components/ModuleWechat/ModuleWechat.vue";
  import ModuleInteract from "@/components/ModuleInteract/ModuleInteract.vue";
  import ModuleProbation from "@/components/ModuleProbation/ModuleProbation.vue";
  import TemplateRecordState from "@/components/TemplateRecordState/TemplateRecordState.vue";
  import TemplateInfo from "@/components/TemplateInfo/TemplateInfo.vue";
  import ModuleAtlas from "@/components/ModuleAtlas/ModuleAtlas.vue";
  import ModuleImage from "@/components/ModuleImage/ModuleImage.vue";
  import ModuleImageText from "@/components/ModuleImageText/ModuleImageText.vue";
  import ModuleCard from "@/components/ModuleCard/ModuleCard.vue";
  import ModuleLink from "@/components/ModuleLink/ModuleLink.vue";
  import ModuleContact from "@/components/ModuleContact/ModuleContact.vue";
  import ModuleNavigationInfo from "@/components/ModuleNavigationInfo/ModuleNavigationInfo.vue";
  import ModuleFile from "@/components/ModuleFile/ModuleFile.vue";
  import ModuleAudio from "@/components/ModuleAudio/ModuleAudio.vue";
  import ModuleVideo from "@/components/ModuleVideo/ModuleVideo.vue";
  import ModuleProductParameter from "@/components/ModuleProductParameter/ModuleProductParameter.vue";
  import ModuleMaterial from "@/components/ModuleMaterial/ModuleMaterial.vue";
  import ModuleClassify from "@/components/ModuleClassify/ModuleClassify.vue";
  import ModuleRecord from "@/components/ModuleRecord/ModuleRecord.vue";
  import RecordFooter from "@/components/ModuleRecord/RecordFooter.vue";

  export default {
    name: "index",
    components: {
      test,
      ModuleWechat,
      ModuleInteract,
      ModuleProbation,
      TemplateRecordState,
      TemplateInfo,
      ModuleAtlas,
      ModuleImage,
      ModuleImageText,
      ModuleFile,
      ModuleAudio,
      ModuleVideo,
      ModuleCard,
      ModuleLink,
      ModuleContact,
      ModuleNavigationInfo,
      ModuleProductParameter,
      ModuleMaterial,
      ModuleClassify,
      ModuleRecord,
      RecordFooter
    },
    props: {},
    data() {
      return {
        templateData: "",
        showPage: false,
        indexPaddingBottom: {},
        componentList: [],
        showTemplateRecordState:false,
        showTemplateInfo:false,
      };
    },
    computed: {},
    mounted() {

      if (userId === "all") {
        this.$vux.loading.show({text: "正在加载"});
        this.$api.qrcodeInterface
          .listModuleAll({
            templateId: templateId,
            appKey: appKey,
          })
          .then(res => {
            this.$vux.loading.hide();
            console.log(res);
            if (res.data.success) {
              console.log("成功");
              this.templateData = res.data.data;
              console.log(this.templateData);
              document.title = this.templateData.templateName;
              this.$store.commit('saveTemplateData', {
                templateData: this.templateData
              });
              this.showPage = true;
              if (typeof this.templateData.moduleVOList === 'undefined') {
                console.log("没有moduleVOList");
                return false;
              }
              this.afterData();
            } else {
              this.$vux.toast.show({type: "cancel", text: res.data.retMsg});
            }
          })
          .catch(err => {
            this.$vux.loading.hide();
            console.error(err);
          });
      } else {

        this.$vux.loading.show({text: "正在加载"});
        this.$api.qrcodeInterface
          .listModule({
            templateId: templateId,
            appKey: appKey,
            userId: userId,
          })
          .then(res => {
            this.$vux.loading.hide();
            console.log(res);
            if (res.data.success) {
              console.log("成功");
              this.templateData = res.data.data;
              console.log(this.templateData);
              this.$title(this.templateData.templateName);
              if(typeof this.templateData.templateRecordStateVO !== 'undefined'){
                this.showTemplateRecordState = true;
              }
              if(typeof this.templateData.templateInfoVO !== 'undefined'){
                this.showTemplateInfo = true;
              }
              this.$store.commit('saveTemplateData', {
                templateData: this.templateData
              });
              this.showPage = true;
              if (typeof this.templateData.moduleVOList === 'undefined') {
                console.log("没有moduleVOList");
                return false;
              }
              this.afterData();
            } else {
              this.$vux.toast.show({type: "cancel", text: res.data.retMsg});
            }
          })
          .catch(err => {
            this.$vux.loading.hide();
            console.error(err);
          });
      }


      let client = this.$Global.judgeClient();
      this.$store.commit('saveIndexUrl', {
        indexUrl: window.location.href,
        client: client
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
        module.forEach((item, index) => {
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
            case 0:
              this.add("ModuleImage", params);
              break;
            //1图文
            case 1:
              this.add("ModuleImageText", params);
              break;
            //2产品参数
            case 2:
              this.add("ModuleProductParameter", params);
              break;
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
            case 13:
              this.add("ModuleRecord", params);
              this.add("RecordFooter", params);
              this.indexPaddingBottom = {indexPaddingBottom: true};
              break;
          }
        })
      }
    }
  };
</script>

