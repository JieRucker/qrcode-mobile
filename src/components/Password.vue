<style lang="scss" scoped>
  .password-block {
    background-color: #f6f6f6 !important;
    overflow: hidden;
    padding: 10px;
    h4 {
      text-align: center;
      padding: 15px 0;
    }
    .password {
      width: 80%;
      margin: 0 auto;
      border: 1px solid #ccc;
      height: 36px;
      line-height: 36px;
      background: #fff;
    }
    .error {
      margin-top: 12px;
      color: #f43530;
      text-align: center;
      font-size: 14px;
    }
    .btn {
      display: block;
      margin: 15px auto;
    }
  }
</style>

<template>
  <!-- 输入密码查看 -->
  <div class="password-block">
    <h4>{{moduleType}}需密码查看</h4>

    <x-input class="password" v-model="inputPassword" name="password" placeholder="请输入密码" @on-focus="inputFocus"
             keyboard="number"></x-input>

    <p class="error" v-show="showError">
      <icon type="warn" style="font-size:14px;margin-bottom: 3px;"></icon>
      {{errorPassword}}
    </p>
    <x-button class="btn" mini :gradients="['#2d8cf0', '#2d8cf0']" @click.native="passwordButton">确定</x-button>
  </div>
</template>

<script>
  import {XButton, Icon, XInput} from 'vux'
  import Cookies from 'js-cookie'

  export default {
    name: "Password",
    components: {XButton, Icon, XInput},
    props: {
      moduleType: {
        type: String
      },
      moduleId: {},
    },
    data() {
      return {
        inputPassword: '',
        errorPassword: "密码错误,请重试!",
        showError: false,
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      //密码框获得焦点
      inputFocus() {
        this.showError = false;
      },

      //点击确认按钮，请求密码是否一致
      passwordButton() {
        let data = {
          moduleId: this.moduleId,
          password: this.inputPassword,
        };
        console.log(data);
        this.$vux.loading.show({text: "正在提交"});
        this.$api.qrcodeInterface.sendPassword(data)
          .then(res => {
            this.$vux.loading.hide();
            if (res.data.success && res.data.data === this.inputPassword) {
              this.afterRequest();
            } else {
              this.showError = true;
            }
          })
          .catch(err => {
            this.$vux.loading.hide();//
            this.$vux.toast.show({type: "warn", text: "Request failed"});
            console.error(err);
          });
      },
      afterRequest() {
        let showPassword = false;
        this.$emit('returnPassword', showPassword);

        Cookies.set('successFilePassword', 'fileTrue');

        switch (this.moduleType) {
          case "文件":
            sessionStorage.setItem("successFilePassword", "true");
            break;
          case "音频":
            sessionStorage.setItem("successAudioPassword", "true");
            break;
          case "视频":
            sessionStorage.setItem("successVideoPassword", "true");
            break;
          case "图片":
            sessionStorage.setItem("successImagePassword", "true");
            break;
        }
      }
    }
  }
</script>
