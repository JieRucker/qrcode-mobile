<style lang="scss">
  .invite-success {
    .icon {
      width: 100%;
      text-align: center;
      margin: 50px 0 20px;
    }
    .invite-title {
      font-size: 20px;
      font-weight: 400;
      padding: 10px 15px 0px;
      text-align: center;
    }
    .vux-label {
      color: #999;
    }
    .weui-cell__ft {
      color: #333;
    }
  }
</style>

<template>
  <div class="invite-success">
    <icon class="icon" type="success" is-msg></icon>
    <div class="invite-title">验证成功</div>

    <group label-width="5em" label-margin-right="1em" label-align="left">
      <cell title="姓名" value-align="left">{{userName}}</cell>
      <cell title="手机" value-align="left">{{phoneNum}}</cell>
      <cell title="部门" value-align="left">{{workDept}}</cell>
      <!--<cell title="所在组" value-align="left">{{groupList.length===0?'无':groupList.join()}}</cell>-->
      <cell title="所在组" value-align="left">{{groupList}}</cell>
    </group>

  </div>
</template>

<script>
  import {Group, Cell, Icon, XButton} from "vux";

  export default {
    name: "inviteSuccess",
    components: {Group, Cell, Icon, XButton},
    data() {
      return {
        userName: '',
        phoneNum: '',
        workDept: '',
        groupList: '',
      };
    },
    mounted() {
      console.log(JSON.stringify(this.$route.query));
      console.log(JSON.stringify(this.$route.query) === '{}');
      if (JSON.stringify(this.$route.query) === '{}') {
        this.userName = userName;
        this.phoneNum = phoneNum;
        this.workDept = workDept;
        // this.groupList = JSON.parse(groupList);
        this.groupList = groupList;
      } else {
        this.userName = this.$route.query.data.userName;
        this.phoneNum = this.$route.query.data.phoneNum;
        this.workDept = this.$route.query.data.workDept;
        this.groupList = this.$route.query.data.groupList;
      }
    },
  };
</script>
