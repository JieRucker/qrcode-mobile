<style lang="scss" scoped>
.apply {
  .apply-title {
    font-weight: bold;
    padding: 40px 15px 10px;
    text-align: center;
  }
}
</style>

<template>
  <div class="apply">
    <div class="apply-title">申请成为维护人</div>
    <group label-width="5em" label-margin-right="1em" label-align="left">
      <x-input title="<span style='color:red'>*</span>&nbsp;姓名" v-model="authUserName" name="authUserName" placeholder="请输入姓名" is-type="china-name"></x-input>
      <x-input title="<span style='color:red'>*</span>&nbsp;中国+86" v-model="phoneNum" name="phoneNum" placeholder="请输入手机号码" is-type="china-mobile" keyboard="number"></x-input>
      <!--<x-input title="&nbsp;&nbsp; 部门" v-model="authWorkDept" name="authWorkDept" placeholder="请输入部门"></x-input>-->
      <x-input title="&nbsp;&nbsp; 工号" v-model="authWorkNumber" name="authWorkNumber" placeholder="请输入工号"></x-input>
    </group>
    <group label-width="5em" label-margin-right="1em">
      <x-textarea title="申请说明" v-model="registerDesc" :max="80" placeholder="申请的其他说明，请在此填写"></x-textarea>
    </group>
    <x-button  style="width:90%;margin-top: 30px;" :gradients="['#447bba', '#928dba']" @click.native="buttonApply()">申请</x-button>
  </div>
</template>

<script>
import { Group, XInput, XButton, XTextarea } from "vux";
export default {
  name: "apply",
  components: { Group, XInput, XButton, XTextarea },
  data() {
    return {
      authUserName: "", //姓名
      phoneNum: "", //手机号
      // authWorkDept: "", //部门
      authWorkNumber: "", //工号
      registerDesc: "" //说明
    };
  },
  computed: {},
  mounted() {},
  methods: {
    getWarnInfoState() {
      let state = true;
      if (this.$Global.isBlank(this.authUserName)) {
        state = false;
        return this.$vux.toast.text("请填写姓名", "top");
      }
      if (this.$Global.isBlank(this.phoneNum)) {
        state = false;
        return this.$vux.toast.text("请填写手机号码", "top");
      }
      return state;
    },
    buttonApply() {
      if (!this.getWarnInfoState()) return;

      let data = {
        authUserName: this.authUserName,
        phoneNum: this.phoneNum,
        // authWorkDept: this.authWorkDept,
        authWorkNumber: this.authWorkNumber,
        registerDesc: this.registerDesc,
        appKey:appKey,
        appId:appId,
        openId:openId
      };
      console.log(data);
      this.$vux.loading.show({ text: "正在提交" });
      this.$api.authUserInterface.saveAuthUserApply(data)
        .then(res => {
          this.$vux.loading.hide();
          if (res.data.success) {
            // this.$vux.toast.show({ type: "success", text: "申请成功" });
            this.$router.push({ name: "applySuccess", query: {result:state}});
          } else {
            this.$vux.toast.show({ type: "cancel", text: "提交失败" });
          }
        })
        .catch(err => {
          this.$vux.loading.hide();
          this.$vux.toast.show({ type: "warn", text: "Request failed" });
          console.error(err);
        });
    }
  }
};
</script>
