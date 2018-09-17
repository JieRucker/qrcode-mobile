<style lang="scss">
// @import '~vux/src/styles/close';
@import "./card-theme.scss";

.card {
  margin-bottom: 75px;
}
.card-base-info {
  position: relative;
  overflow: hidden;
  padding: 73px 15px 15px;
  .base-info-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .base-avatar {
    .base-avatar-img {
      width: 98px !important;
      height: 98px !important;
      margin-left: 0.8em;
      margin-right: 0.8em;
      border-radius: 50%;
    }
  }
  .base-desc {
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    padding: 5px 0 5px 5px;
    span {
      color: #fff;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 3px;
    }
    .name {
      font-size: 24px !important;
      margin-top: 5px;
    }
  }
}
//展示位置1
.baseAvatar1 {
  float: left;
}
.baseDesc1 {
  float: left;
}
//展示位置2
.baseAvatar2 {
  text-align: center;
}
.baseDesc2 {
  text-align: center;
}
//展示位置3
.baseAvatar3 {
  float: right;
}
.baseDesc3 {
  float: right;
  text-align: right;
}

.card-save-info {
  position: fixed;
  bottom: 0;
  z-index: 100000;
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
}

.card .weui-cells {
  font-size: 16px !important;
  background-color: transparent !important;
  // color: #007acf !important;
  // opacity: .5;
}
.card .weui-cell {
  padding: 15px !important;
}
.card .vux-cell-bd .vux-label {
  display: inline-block;
  margin-right: 40px;
  color: #8a8d91;
}
.card .weui-cell__ft,
.card .weui-cell__ft a {
  color: #201c1c;
}
.card-block {
  margin-top: 10px;
  background-color: #fff;
}

.card-block-departMent {
  margin-top: 0;
  border-top: none !important;
}

.cell-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-cell-text {
  flex: 1;
  padding-right: 10px;
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
  <div v-if="showCard">
      <div class="card" :class="'cardBackgroundColor'+theme">
        <!-- 基础信息 -->
        <div class="card-base-info" :style="{backgroundImage:'url('+card.cardBaseInfo.backGroundImage.imageUrl+')'}">
            <div class="base-avatar" :class="'baseAvatar'+layOut">
                <img :src="card.cardBaseInfo.avatarImage.imageUrl" class="base-avatar-img" alt="">
            </div>
            <div class="base-desc" :class="'baseDesc'+layOut">
                <span class="name">{{card.cardBaseInfo.fullName}}</span>
                <span class="position">{{card.cardBaseInfo.position}}</span>
                <span class="position">{{card.cardBaseInfo.company}}</span>
            </div>
        </div>
        <div class="card-block card-block-departMent" :class="'borderTop'+theme">
            <!-- 部门 -->
            <group label-width="5.5em" label-margin-right="0em" label-align="left" gutter="0">
                <cell v-for="(item,index) in card.cardBaseInfo.departMent" :key="index" :title="item.name" value-align="left">{{item.value}}</cell>
            </group>
        </div>
        <!-- 联系信息 -->
        <div class="card-block card-link-info" :class="'borderTop'+theme">
            <group label-width="5.5em" label-margin-right="0em" label-align="left" gutter="0px">
                <cell title="固定电话" v-if="card.cardLinkInfo.telephone==''?false:true" value-align="left"><a :href="'tel:'+card.cardLinkInfo.telephone">{{card.cardLinkInfo.telephone}}</a></cell>
                <cell v-for="(item,index) in card.cardLinkInfo.mobilePhone" :key="item.name" :title="item.name" value-align="left"><a :href="'tel:'+item.value">{{item.value}}</a></cell>
                <cell v-for="(item,index) in card.cardLinkInfo.fax" :key="item.name" :title="item.name" value-align="left">{{item.value}}</cell>
                <cell v-for="(item,index) in card.cardLinkInfo.email" :key="item.name" :title="item.name" value-align="left"><a :href="'mailto:'+item.value">{{item.value}}</a></cell>
            </group>
        </div>
        <!-- 社交信息 -->
        <div class="card-block card-social-info" :class="'borderTop'+theme">
            <group label-width="5.5em" label-margin-right="0em" label-align="left" gutter="0px">
                <cell title="微信" v-if="card.cardSocialInfo.webChat==''?false:true" value-align="left">
                    <div class="cell-child">
                        <div class="card-cell-text">{{card.cardSocialInfo.webChat}}</div>
                        <x-button class="card-cell-btn" :class="'cardAddressBtn'+theme" v-if="card.cardSocialInfo.isAllowAddFriendByScanWeChatQrcode==''?false:true" mini type="default" @click.native="weChatModal=true">关注</x-button>
                    </div>
                </cell>
                <cell v-for="(item,index) in card.cardSocialInfo.messenger" :key="item.name" :title="item.name" value-align="left">{{item.value}}</cell>
                <cell v-for="(item,index) in card.cardSocialInfo.webSiteList" :key="item.name" :title="item.name" value-align="left">{{item.value}}</cell>
                <cell title="微博" v-if="card.cardSocialInfo.weibo==''?false:true" value-align="left">{{card.cardSocialInfo.weibo}}</cell>
                <cell title="QQ" v-if="card.cardSocialInfo.qq==''?false:true" value-align="left">
                    <div class="cell-child">
                        <div class="card-cell-text">{{card.cardSocialInfo.qq}}</div>
                        <x-button class="card-cell-btn" :class="'cardAddressBtn'+theme" v-if="card.cardSocialInfo.isAllowAddFriendByScanQQQrcode==''?false:true" mini type="default" @click.native="QQModal=true">关注</x-button>
                    </div>
                </cell>
            </group>
        </div>
        <!-- 地址信息 -->
        <div class="card-block card-address-info" :class="'borderTop'+theme">
            <group label-width="5.5em" label-margin-right="0em" label-align="left" gutter="0px">
                <cell v-for="(item,index) in card.address" :key="item.name" :title="item.name" value-align="left">
                    <div class="cell-child">
                        <div class="card-cell-text">{{item.address}}</div>
                        <x-button class="card-cell-btn" :class="'cardAddressBtn'+theme" v-if="item.longitude==''?false:true" mini type="default" @click.native="gotoMap(item.address,item.longitude,item.dimension)">地图</x-button>
                    </div>
                </cell>
            </group>
        </div>
        <!-- 个人说明 -->
        <div class="card-block card-intro-info" :class="'borderTop'+theme">
            <group label-width="5.5em" label-margin-right="0em" label-align="left" gutter="0px">
                <cell title="个人说明" v-if="card.cardIntroInfo.selfIntro==''?false:true" value-align="left">{{card.cardIntroInfo.selfIntro}}</cell>
            </group>
        </div>
      </div>
      <div class="card-save-info">
          <x-button :class="'cardSaveBtn'+theme" type="primary" @click.native="">保存到通讯录</x-button>
      </div>
    <!-- 微信 -->
    <div v-transfer-dom>
      <x-dialog v-model="weChatModal" class="dialog-demo">
          <div class="img-box">
             <img :src="card.cardSocialInfo.webChatQrcodeImage.imageUrl">
          </div>
        <p>长按二维码，选择识别图中二维码</p>
        <p class="close" @click="weChatModal=false">×</p>
      </x-dialog>
    </div>
    <!-- QQ -->
    <div v-transfer-dom>
      <x-dialog v-model="QQModal" class="dialog-demo">
          <div class="img-box">
             <img :src="card.cardSocialInfo.qqQrcodeImage.imageUrl">
          </div>
        <p>长按二维码，选择识别图中二维码</p>
        <p class="close" @click="QQModal=false">×</p>
      </x-dialog>
    </div>
  </div>
</template>

<script>
// var cardcard = {
//   cardTheme: 3,
//   //基本信息
//   cardBaseInfo: {
//     avatarImage: {
//       imageUrl:
//         "http://pic8.qiyipic.com/image/20180428/90/03/a_100006957_m_601_m13_195_260.jpg"
//     }, //头像
//     backGroundImage: {
//       imageUrl: "https://biz.cli.im/Public/images/vcardbg7.jpg"
//     }, //封面图
//     fullName: "柯南", //姓名
//     position: "侦探", //职位
//     company: "毛利侦探所", //公司
//     departMent: [
//       { name: "部门11111", value: "侦探部" },
//       { name: "部门22222222", value: "技术部" }
//     ], //部门
//     layOut: 1 //展示位置
//   },
//   //联系信息
//   cardLinkInfo: {
//     telephone: "", //固定电话
//     mobilePhone: [
//       { name: "移动电话", value: "18601467018" },
//       { name: "移动电话1", value: "" }
//     ], //移动电话
//     // familyPhone:[{name:"移动电话",value:"18601467018"},{name:"移动电话1",value:"18601467018"}],//家庭电话
//     fax: [{ name: "传真", value: "11112222" }, { name: "", value: "" }], //传真
//     email: [
//       { name: "电子邮箱", value: "1178867018@qq.com" },
//       { name: "电子邮箱1", value: "2390552479@qq.com" }
//     ] //电子邮箱
//   },
//   //社交信息
//   cardSocialInfo: {
//     webChat: "gp117018", //微信号
//     messenger: [
//       { name: "即时通讯1", value: "558-58" },
//       { name: "即时通讯2", value: "95584478" }
//     ], //即时通讯
//     isAllowAddFriendByScanWeChatQrcode: 1, //0 不允许 1 允许
//     webChatQrcodeImage: {
//       imageUrl: "https://biz.cli.im/Public/images/vcardbg7.jpg"
//     }, //微信二维码 扫描者可以直接在页面中通过链接添加你为好友
//     webSiteList: [
//       { name: "主页网址", value: "www.baidu.com" },
//       { name: "主页网址1", value: "www.baidu.com" }
//     ], //主页网址
//     weibo: "www.sina.com", //微博
//     qq: "1178867018", //QQ
//     isAllowAddFriendByScanQQQrcode: 1, //0 不允许 1 允许
//     qqQrcodeImage: { imageUrl: "https://biz.cli.im/Public/images/vcardbg7.jpg" } //微信二维码 扫描者可以直接在页面中通过链接添加你为好友
//   },
//   //地址
//   address: [
//     //经度//维度//中文地址
//     {
//       longitude: "30.193513",
//       dimension: "120.223289",
//       name: "地址",
//       address: "浙江省杭州市滨江区春波南苑7栋一单元603"
//     },
//     {
//       longitude: "",
//       dimension: "",
//       name: "地址1",
//       address: "浙江省杭州市滨江区创伟科技园A栋803"
//     }
//   ],
//   cardIntroInfo: { selfIntro: "真相只有一个" }, //个人说明
//   //附加信息
//   cardAdditionInfo: {
//     additionalType: 0, //0 素材 1企业码
//     templateId: "" //素材或企业码 对应的主键
//   }
// };
import {Group,Cell,Panel, XButton,XDialog,TransferDomDirective as TransferDom} from "vux";
//   import colorTheme from './color-theme.js'
export default {
  name: "Card",
  components: { Group, Cell, Panel, XButton, XDialog },
  directives: {TransferDom},
  data() {
    return {
      card: "",
      showCard: false,
      weChatModal: false,
      QQModal: false
    };
  },
  computed: {
    theme() {
      return this.card.cardTheme;
    },
    layOut() {
      return this.card.cardBaseInfo.layOut;
    }
  },
  created() {
    console.log(this.$route.query.cardId);
    this.$vux.loading.show({ text: "正在加载" });
    this.$api.cardInterface.getCard({
        // cardId:this.$route.query.cardId
    }).then(res => {
        this.$vux.loading.hide();
        console.log(res);
        if (res.data.success) {
            this.showCard = true;
            this.card = res.data;
        } else {
            this.$vux.toast.show({ type: "cancel", text: "提交失败" });
        }
        })
        .catch(err => {
        this.$vux.loading.hide();
        this.$vux.toast.show({ type: "warn", text: "Request failed" });
        console.error(err);
        });
  },
  methods: {
    gotoMap(address, longitude, dimension) {
      this.$router.push({
        path: "/PageMap",
        query: { longitude: longitude, dimension: dimension }
      });
    }
  },
  filters: {}
};
</script>
