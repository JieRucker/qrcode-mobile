<style lang="scss">
  .child {
  }
</style>

<template>
  <div class="child">
    <p>子组件自带的</p>
    <slot>111</slot>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "child",
    components: {XHeader},
    props: {
      addressList: {
        type: Array,
      }
    },
    data() {
      return {}
    },
    mounted() {

    }
  };
</script>
