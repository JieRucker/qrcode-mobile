<style lang="scss" scoped>
  .invite {
    .invite-title {
      font-size: 28px;
      font-weight: 400;
      padding: 50px 15px 30px;
      text-align: center;
    }
    .error {
      color: red;
      padding: 10px;
      font-size: 14px;
    }
  }
</style>

<template>
  <div class="invite">
    <div class="invite-title">验证手机号</div>

    <group label-width="4em" label-margin-right="1em" label-align="left">
      <x-input title="手机号" name="phoneNum" ref="phoneNum" v-model="phoneNum" placeholder="请输入手机号码"
               is-type="china-mobile" keyboard="number"></x-input>
      <x-input title="验证码" name="inputCode" v-model="inputCode" placeholder="请输入验证码" keyboard="number">
        <x-button slot="right" style="width: 100px;" :gradients="['#447bba', '#928dba']" mini :disabled="yzmDisabled"
                  @click.native="getCode">{{yzmNum}}
        </x-button>
      </x-input>
    </group>
    <p class="error">{{errorMsg}}</p>
    <x-button style="width:90%;margin-top: 30px;" :gradients="['#447bba', '#928dba']" @click.native="buttonInvite()">
      确定
    </x-button>


  </div>
</template>

<script>
  import {Group, XButton, XInput, XTextarea} from "vux";

  export default {
    name: "invite",
    components: {Group, XInput, XButton, XTextarea},
    data() {
      return {
        phoneNum: "",
        inputCode: "",
        regBox: {
          phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/ //手机号码第二位不能是1和2
        },
        yzmNum: "获取验证码",
        yzmDisabled: false,
        // showError:false,
        errorMsg: '', //错误提示：该手机号不在人员权限组中，如有问题请联系你的管理员
      };
    },
    computed: {},
    mounted() {
      this.$refs.phoneNum.focus();
    },
    methods: {
      //获取错误信息状态
      getWarnInfoState() {
        let state = true;
        if (this.$Global.isBlank(this.phoneNum)) {
          state = false;
          return this.$vux.toast.text("请填写手机号码", "top");
        }
        if (this.$Global.isBlank(this.inputCode)) {
          state = false;
          return this.$vux.toast.text("请填写验证码", "top");
        }
        return state;
      },
      //确定按钮
      buttonInvite() {
        if (!this.getWarnInfoState()) return;

        this.$vux.loading.show({text: "正在提交"});
        this.$api.authUserInterface.updateBySMS({
          phoneNum: this.phoneNum,
          verifyCode: this.inputCode,
          appKey: appKey,
          openId: openId
        }).then(res => {
          this.$vux.loading.hide();
          res = res.data;
          if (res.success) {
            this.$router.push({name: "inviteSuccess", query: {data: res.data}});
          } else {
            this.$vux.toast.show({type: "cancel", text: "提交失败"});
          }
        })
          .catch(err => {
            this.$vux.loading.hide();
            console.error(err);
          });
      },
      //点击获取验证码按钮
      getCode() {
        if (!this.regBox.phone.test(this.phoneNum)) {
          this.$vux.toast.text("不是标准的手机号码", "top");
          return false;
        }
        this.$api.authUserInterface.sendSMS({
          phoneNum: this.phoneNum,
          type: 4,
          appKey: appKey
        }).then(res => {
          res = res.data;
          if (res.success) {
            console.log(res);
            this.errorMsg = '';
            this.startCountDown();//请求成功后才开始计时
          } else {
            this.errorMsg = res.retMsg;//retMsg：该手机号不在人员权限组中，如有问题请联系你的管理员
          }
        }).catch(err => {
          console.error(err)
        })

      },
      //开始倒计时
      startCountDown() {
        this.yzmNum = 60;
        this.yzmDisabled = true;
        this.countDown();
      },
      //倒计时
      countDown() {
        let yzmNum = this.yzmNum;
        if (yzmNum === 0) {
          this.yzmNum = "获取验证码";
          this.yzmDisabled = false;
          return false;
        }
        setTimeout(() => {
          this.yzmNum--;
          this.countDown();
        }, 1000);
      },
    }
  };
</script>
