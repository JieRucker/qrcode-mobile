<style lang="scss">
  .fold {
    background-color: #fff;
    text-align: center;
    padding: 10px 0;
    span, .icon {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>

<template>
  <p class="fold" @click="fold()">
    <span>{{move?"收起":"展开"}}</span>
    <x-icon v-show="move" class="icon" type="ios-arrow-up" size="22"></x-icon>
    <x-icon v-show="!move" class="icon" type="ios-arrow-down" size="22"></x-icon>
  </p>
</template>

<script>
  import {Icon} from "vux";

  export default {
    name: "Fold",
    components: {Icon},
    props: {
      showContent: {
        type: Boolean
      }
    },
    data() {
      return {
        move: this.showContent
      }
    },
    methods: {
      fold() {
        this.move = !this.move;
        this.$emit('receiveFold', this.move);
      }
    }
  };
</script>
