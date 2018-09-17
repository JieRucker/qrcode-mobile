<style lang="scss">
  .recordTypeText {
    .weui-label{
      width: 105px !important;
    }
  }
</style>

<template>
  <x-input class="recordTypeText" :title="params.recordTitle" v-model="text" name="text" :placeholder="params.recordDesc===''?'请输入文本':params.recordDesc" @on-change="changeText"></x-input>
</template>

<script>
  import { Group, XInput } from "vux";
  export default {
    name: "recordTypeText",
    components: { Group, XInput },
    props:{
      params:{
        default:() => {
          return {
            recordTitle:'文本',
            recordDesc:'文本备注',
          }
        }
      }

    },
    data() {
      return {
        text: "",
      };
    },
    computed: {},
    mounted() {},
    methods: {
      changeText(){
        console.log(this.text);
        this.$store.commit('saveRecordData', {
          sortId:this.params.sortId,
          data: this.text,
        })
      }
    },
  };
</script>
