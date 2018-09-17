<template>
  <div class="weui-cell">
    <div class="weui-cell__bd">
      <div class="weui-uploader">
        <div v-show="showHeader" class="weui-uploader__hd">
          <p class="weui-uploader__title"> {{ title }} </p>
          <div v-show="showHeader && showTip" class="weui-uploader__info">
            {{ imageList.length }} / {{ max }}
          </div>
        </div>


        <ul class="weui-uploader__files" ref="uploaderFiles">

          <li class="weui-uploader__file" style="position: relative;margin-left: 0;" v-for="(item,index) in imageList"
              :style="{backgroundImage:'url('+item.imageUrl+')'}" :key="index" @click="preview(item)">
            <div class="icon-delete" @click="trash(index)"><span>×</span></div>
          </li>
        </ul>

        <div v-show="!readonly && imageList.length < max" class="weui-uploader__input-box" :class="{inputBox:inputBox}"
             ref="uploaderInput">
          <div v-if="!handleClick" ref="input" class="weui-uploader__input" :capture="showCapture"
               @click="chooseImage"></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'ModuleUploader',
    props: {
      // imageList: {
      //   type: Array,
      //   default: () => []
      // },
      max: {
        type: Number,
        default: 9
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showTip: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      // 是否接管+号的click事件，如果是，点击不弹出选择文件的框
      handleClick: {
        type: Boolean,
        default: false
      },
      // 选择文件后是否自动上传，如果不是，则emit change事件
      autoUpload: {
        type: Boolean,
        default: true
      },
      uploadUrl: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'normal'
      },
      capture: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: 'img'
      },
      params: {
        type: Object,
        default: null
      },
      // 指定是原图还是压缩图，默认二者都有
      sizeType: {
        type: Array,
        default: ['original', 'compressed']
      },
      // 指定来源是相册还是相机，默认二者都有
      sourceType: {
        type: Array,
        default: ['album', 'camera']
      },
      // 最大上传数量
      maxNumLimit: {
        type: Number,
        default: 9
      }
    },
    data() {
      return {
        imageList: [],
        localIds: [], // 本地选择的图片id
        serverIds: [] // 上传至服务端图片id
      }
    },
    computed: {
      showCapture() {
        return this.capture || undefined
      },
      inputBox() {
        return this.imageList.length < -1
      }
    },
    methods: {
      chooseImage() {
        let _this = this;
        if (wx && typeof wx !== 'undefined') {
          wx.chooseImage({
            count: _this.maxNumLimit,
            needResult: 1,
            sizeType: _this.sizeType,// 可以指定是原图还是压缩图，默认二者都有
            sourceType: _this.sourceType, // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
              _this.localIds = res.localIds;   // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              [...res.localIds].map(m => {
                _this.imageList.push({imageUrl: m});
              });

              _this.syncUpload();
            },
            fail: (res) => {
              console.error("errorMSG", JSON.stringify(res));
            }
          });
        }
      },
      syncUpload() {
        let _this = this;
        // let localId = this.localIds.pop();
        let len = this.localIds.length;
        if (wx && typeof wx !== 'undefined') {
          this.localIds.forEach((item,index) => {
            alert(JSON.stringify(item));
            wx.uploadImage({
              localId: item, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: (res) => {    //{errMsg: "uploadImage:ok", serverId: "1237378768e7q8e7r8qwesafdasdfasdfaxss111"}
                let serverId = res.serverId; // 返回图片的服务器端ID 1237378768e7q8e7r8qwesafdasdfasdfaxss111
                _this.serverIds.push(serverId);//["1237378768e7q8e7r8qwesafdasdfasdfaxss111"] //第二次：
                if(index === len - 1){
                  _this.$emit('returnImageList', _this.serverIds);
                }

              },
              fail: (error) => {
                // console.error(JSON.stringify(error))
              }
            });

          });
        }


      },
      trash(index) {
        this.imageList.splice(index, 1);
      },
      preview(item) {
        // 暂未实现，可以捕捉preview事件自己实现
        let _this = this;
        if (wx && typeof wx !== 'undefined') {
          wx.previewImage({
            current: item.imageUrl, // 当前显示图片的http链接
            urls: [item.imageUrl] // 需要预览的图片http链接列表
          });
        }
      },
      // 适用于action的情况
      // change (e) {
      //   if (this.handleClick) {
      //     return
      //   }
      //
      //   let formData = new window.FormData()
      //   formData.append(this.name, this.$refs.input.files[0])
      //   if (this.params) {
      //     for( let key in this.params) {
      //       formData.append(key, this.params[key])
      //     }
      //   }
      //
      //   if (this.autoUpload) {
      //     if (!this.uploadUrl) {
      //       console.error('uploadUrl不应为空')
      //     }
      //
      //     if (this.$vux && this.$vux.loading) {
      //       this.$vux.loading.show('正在上传')
      //     }
      //
      //     axios.post(this.uploadUrl, formData)
      //     .then((response) => {
      //       if (this.$vux && this.$vux.loading) {
      //         this.$vux.loading.hide()
      //       }
      //       this.$refs.input.value = ''
      //       this.imageList.push(response.data.data)
      //     })
      //   } else {
      //     this.$emit('upload-image', formData)
      //   }
      // }
    },
  }
</script>
<style lang="less">
  @import '~vux/src/styles/weui/widget/weui-uploader/index.less';

  .weui-uploader__bd.small {
    .weui-uploader__input-box {
      margin-right: 5px;
      margin-bottom: 5px;
      width: 58px;
      height: 58px;
    }
    .weui-uploader__file {
      width: 60px;
      height: 60px;
      margin-right: 5px;
      margin-bottom: 5px;
      position: relative;
    }
  }

  .icon-delete {
    display: block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    font-size: 20px;
    color: #ccc;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 1;
  }

  .inputBox {
    transform: translateY(-16px);
  }
</style>
