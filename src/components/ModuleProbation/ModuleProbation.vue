<style lang="scss" scoped>
.probation {
  width: 95%;
  margin: 10px auto;
  padding: 11px;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  background-color: #fff;
}

.probationColor1 {
  color: #31708f;
  background-color: #d9edf7;
  border: #bcdff1 1px solid;
}

.probationColor2 {
  color: #a94442;
  background-color: #f2dede;
  border: #ebcccc 1px solid;
}
</style>

<template>
  <div class="probation" :class="color" v-if="showProbation==0?false:true">
    <span>{{probationInfo}}</span>
    <br>
    <router-link :to="{name:'apply'}">apply</router-link>
    <router-link :to="{name:'applySuccess',query:{result:0}}">applySuccess</router-link>
    <router-link :to="{name:'applySuccess',query:{result:1}}">applyWait</router-link>
    <router-link :to="{name:'applySuccess',query:{result:2}}">applyPass</router-link>

    <router-link :to="{name:'invite'}">invite</router-link>
    <router-link :to="{name:'inviteSuccess'}">inviteSuccess</router-link>
    <router-link :to="{name:'templateInfo'}">templateInfo</router-link>
    <router-link :to="{name:'manage'}">manage</router-link>
  </div>
</template>

<script>
import { Group, Cell, XButton } from "vux";

export default {
  name: "probation",
  components: { Group, Cell, XButton },
  props: {
    showProbation: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
    };
  },
  computed: {
    color() {
      return this.showProbation == 1
        ? { probationColor1: true }
        : { probationColor2: true };
    },
    probationInfo() {
      return this.showProbation == 1
        ? "二维码解决方案版(试用中)"
        : "二维码解决方案版(过期)";
    }
  },
  methods: {
  }
};
</script>

