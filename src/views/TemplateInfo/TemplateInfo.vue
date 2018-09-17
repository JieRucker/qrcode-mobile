<style lang="less">
  .templateInfo {
    margin-top: 20px;
    margin-bottom: 20px;
    .confirmBtn {
      width: 94%;
      margin: 20px auto;
    }
    .weui-cell__ft {
      color: #000 !important;
    }
    li {
      list-style: none;
    }
  }
</style>


<template>
  <div class="templateInfo">
    <!--<group title="图片上传" label-width="7em">-->
      <!-- 上传图片 -->
      <!--<uploader class="uploader"-->
      <!--:max="varmax"-->
      <!--:images="uploaderImages"-->
      <!--:handle-click="false"-->
      <!--:show-header="false"-->
      <!--title="维修现场照片"-->
      <!--:readonly="false"-->
      <!--:upload-url="uploadUrl"-->
      <!--:auto-upload="false"-->
      <!--name="img"-->
      <!--size="normal"-->
      <!--@preview="previewMethod"-->
      <!--@add-image="addImageMethod"-->
      <!--@remove-image="removeImageMethod"-->
      <!--&gt;</uploader>-->
    <!--</group>-->


    <group title="图片上传" gutter="0">
      <ModuleUploader class="uploader"
                      :max="9"
                      :handle-click="false"
                      :show-header="false"
                      title=""
                      :readonly="false"
                      :auto-upload="false"
                      name="img"
                      size="normal"
                      @preview="previewMethod"
                      @add-image="addImageMethod"
                      @remove-image="removeImageMethod"
                      @returnImageList="returnImageList"
      ></ModuleUploader>
    </group>

    <!-- 问题整改 -->
    <group title="说明" label-width="7em">
      <x-textarea placeholder="请输入说明文字，如：二维码在1楼大门上" :max="200" :show-counter="false" :height="75" :rows="8" :cols="25"
                  v-model="describe" @on-change="changeTextarea()"></x-textarea>
    </group>

    <group title="位置" label-width="7em">
      <RecordTypePosition :params="position" v-on:returnPosition="returnPosition"></RecordTypePosition>
    </group>
    <!-- 确定按钮 -->
    <x-button class="confirmBtn" @click.native="confirmBtn" type="primary" :gradients="['#2d8cf0', '#2d8cf0']">完成
    </x-button>

  </div>
</template>

<script>
  import ModuleUploader from '@/components/ModuleUploader/ModuleUploader'
  import wxConfig from '@/libs/jweixin/WxConfig';
  import {
    Cell,
    CellBox,
    Checklist,
    Confirm,
    Group,
    GroupTitle,
    Icon,
    Loading,
    Selector,
    Toast,
    XButton,
    XTextarea
  } from 'vux'
  import RecordTypePosition from '@/components/RecordType/RecordTypePosition'
  // import Uploader from 'vux-uploader'

  export default {
    name: "TemplateInfo",
    components: {
      ModuleUploader,
      RecordTypePosition,
      // Uploader,
      XButton,
      GroupTitle,
      Group,
      Cell,
      CellBox,
      Icon,
      Checklist,
      Selector,
      XTextarea,
      Confirm,
      Loading,
      Toast
    },
    props: {},
    data() {
      return {
        // varmax: 9,
        // uploaderImages: [],
        // uploadUrl: "www.baidu.com",

        describe: "",//描述

        position: {
          recordTitle: '',
          parent: 'templateInfo'
        },
        address: {},

        imageList: [],

        mediaId: '',

      }
    },
    computed: {},
    created() {
      //获取签名
      this.$Global.timeout(300).then(() => {
        let url = '';
        let client = this.$store.state.base.client;
        alert(client);
        console.log(client);
        if (client === 'Android') {
          url = window.location.href;
        } else if (client === 'IOS') {
          url = this.$store.state.base.indexUrl;
        }
        console.log(window.location.href);
        console.log(this.$store.state.base.indexUrl);
        this.$api.qrcodeInterface.createJsapiSignature({
          url: url
        }).then(res => {
          if (res.data.success) {
            let data = res.data.data;
            wxConfig.init({
              appId: data.appId,
              timestamp: data.timestamp,
              signature: data.signature,
              nonceStr: data.nonceStr
            })
          }
        }).catch(err => {
          console.error(err)
        });
      })
    },
    mounted() {
      let _this = this;
    },
    methods: {
      previewMethod() {
      },
      addImageMethod() {
        console.log('addImageMethod');
      },
      removeImageMethod() {
      },
      returnImageList(res) {
        alert("returnImageList//////////////" + JSON.stringify(res));
        // alert(JSON.stringify(res));
        // this.imageList = [];
        // [...res].map(m => {
        //   this.imageList.push({imageUrl: m.imageUrl});
        // })
        // alert(this.imageList);
        //
        this.mediaId = JSON.stringify(res);
        // alert(JSON.stringify(this.mediaId));

      },

      returnPosition(res) {
        console.log(res);
        this.address = res;
      },
      changeTextarea() {
        console.log(this.describe);
      },
      //确定按钮
      confirmBtn() {
        let _this = this;
        this.$vux.confirm.show({
          title: '信息确认',
          content: '信息填写完毕，是否确认提交',
          cancelText: '返回修改',
          confirmText: '确认修改',
          onShow() {
            console.log('plugin show')
          },
          onHide() {
            console.log('plugin hide')
          },
          onCancel() {
            console.log('plugin cancel')
          },
          onConfirm() {
            console.log('plugin confirm');
            _this.sumbit();
          }
        })

      },
      //正在提交数据
      sumbit() {
        let templateInfoJson = {
          templateId: templateId,
          templateInfoDesc: this.describe,
          address: this.address,
        };
        console.log(templateInfoJson);
        //上传的数据
        let data = {
          appKey: appKey,
          mediaIdJsonArray: this.mediaId,
          templateInfoJson: JSON.stringify(templateInfoJson)
        };
        console.log(data);
        //上传信息
        this.$vux.loading.show({text: '正在提交中'});
        this.$api.qrcodeInterface.setTemplateInfo(data).then(res => {
          this.$vux.loading.hide();
          res = res.data;
          console.log(res);
          if (res.success) {
            this.$vux.toast.show({type: 'success', text: '提交成功'});
          } else {
            this.$vux.toast.show({type: "cancel", text: res.retMsg});
          }
        }).catch(err => {
          console.error(err);
        });
      }
    },
    filters: {},

  }
</script>
