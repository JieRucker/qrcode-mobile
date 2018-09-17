<style lang="scss">
.module-wechat {
  margin: 10px 0;
  .cell {
    background-color: #fff;
    padding: 15px 10px;
    font-weight: bold;
  }

}
.dialog-demo {
  .weui-dialog {
    background-color: transparent !important;
    padding-bottom: 30px;
    .img-box {
      width: 86%;
      margin: 0 auto;
      overflow: hidden;
    }
    p {
      color: #fff;
      margin: 20px 0;
      font-size: 13px;
    }
    .close {
      width: 34px;
      height: 34px;
      margin: 0 auto;
      border-radius: 50%;
      font-size: 28px;
      line-height: 25px;
      text-align: center;
      color: #fff;
      border: 2px solid #fff;
    }
  }
}
</style>

<template>
  <div class="module-wechat">
    <cell class="cell" :title="params.moduleTitle">
      <img slot="icon" width="22" style="display:block;margin-right:10px;"
           src="../../assets/images/icon/icon-wechat.png">
      <x-button mini @click.native="weChatModal=true">关注</x-button>
    </cell>

    <!-- 微信 -->
    <div v-transfer-dom>
      <x-dialog v-model="weChatModal" class="dialog-demo">
        <div class="img-box">
          <img :src="params.imageUrl">
        </div>
        <p>长按二维码，选择识别图中二维码</p>
        <p class="close" @click="weChatModal=false">×</p>
      </x-dialog>
    </div>

  </div>
</template>

<script>
  import {Cell, Group, TransferDomDirective as TransferDom, XButton, XDialog} from "vux";

  export default {
    name: "ModuleWechat",
    components: {Group, Cell, XButton, XDialog},
    directives: {TransferDom},
    props: {
      params: {
        type:Object,
        default: () => {
          return {
            moduleTitle: '21微信模块的标题',
            imageUrl: 'https://biz.cli.im/Public/images/vcardbg7.jpg'
          }
        }
      }
    },
    data() {
      return {
        weChatModal: false,
      };
    },
    computed: {},
    methods: {}
  };
</script>

