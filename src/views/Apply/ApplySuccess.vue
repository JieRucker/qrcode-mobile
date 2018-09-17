<style lang="scss" scoped>
.apply-success {
  text-align: center;
  .icon {
    padding-top: 60%;
  }
  .p {
    margin: 10%;
    line-height: 30px;
  }
}
</style>

<template>
  <div class="apply-success">
    <icon class="icon" :type="content.type" is-msg></icon>
    <p class="p" v-html="content.text"></p>
  </div>
</template>

<script>
import { Icon } from "vux";
export default {
  name: "applySuccess",
  components: { Icon },
  data(){
    return {
      contentList:[
        {type:"success",text:"申请成功<br>您的申请已提交，等待管理员审核"},
        {type:"waiting",text:"您的审核已提交<br>管理员会尽快审核，请耐心等待"},
        {type:"success",text:"审核已通过，您已成为维护人员"},
        {type:"info",text:"您已在邀请授权列表中，请等待管理员审核通过"}
      ]
    }
  },
  computed: {
    content() {
      return this.contentList[this.$route.query.result];
    }
  },
};
</script>
