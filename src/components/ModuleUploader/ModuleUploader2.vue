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
              :style="{backgroundImage:'url('+item+')'}" :key="" @click="preview(item)">
            <div class="icon-delete" @click="trash(index)"><span>×</span></div>
          </li>
        </ul>

        <div v-show="!readonly && imageList.length < max" class="weui-uploader__input-box" :class="{inputBox:inputBox}"
             ref="uploaderInput">
          <input v-if="!handleClick" ref="input" class="weui-uploader__input" type="file" accept="image/*" multiple="multiple"
                 :capture="showCapture" @change="change">
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name:'ModuleUploader',
    props: {
      // imageList: {
      //   type: Array,
      //   default: () => []
      // },
      max: {
        type: Number,
        default: 3
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
        default: '图片上传'
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
      }
    },
    data() {
      return {
        imageList: [],
      }
    },
    computed: {
      showCapture() {
        return this.capture || undefined
      },
      inputBox() {
        if (this.imageList.length < -1) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      change(e) {
        console.log('change');
        if (this.handleClick) {
          this.$emit('add-image')
        }
        let src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
        for (let i = 0, len = files.length; i < len; ++i) {
          let file = files[i];
          if (url) {
            src = url.createObjectURL(file);
          } else {
            src = e.target.result;
          }
          // let li = document.createElement('li');
          // li.className = 'weui-uploader__file';
          // li.style = 'background-image:url('+src+')';
          // this.$refs.uploaderFiles.appendChild(li);

          // this.imageList.push({url: src});
          this.imageList.push(src);
          if(this.imageList.length === 10){
            this.$vux.toast.text('图片数量已达到上限','top');
            this.imageList.pop();
            break;
          }
        }
        console.log(this.imageList);
        this.$emit('returnImageList',this.imageList);
      },
      trash(index) {
        this.imageList.splice(index, 1);
      },
      preview(item) {
        // 暂未实现，可以捕捉preview事件自己实现
        // this.$emit('preview', item)
        console.log("preview");
        console.log(item);
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
    line-height: 18px;
    border-radius: 50%;
    font-size: 20px;
    color: #ccc;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .inputBox {
    transform: translateY(-16px);
  }
</style>
