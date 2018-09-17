<style lang="scss">
  .recordTypeTextarea {
    .weui-label{
      width: 105px !important;
    }
  }
</style>

<template>
  <!--<div class="recordTypeTextarea">-->
  <x-textarea class="recordTypeTextarea" :title="params.recordTitle" :placeholder="params.recordDesc===''?'请输入文本':params.recordDesc" :max="200" :show-counter="false" :height="80" :rows="8" :cols="25"
              v-model="textarea" @on-change="changeTextarea()"></x-textarea>
  <!--</div>-->
</template>

<script>
  import { Group, XTextarea } from "vux";
  export default {
    name: "recordTypeTextarea",
    components: { Group, XTextarea },
    props:{
      params:{
        default:() => {
          return {
            recordTitle:'多行文本',
            recordDesc:'多行文本备注',
          }
        }
      }

    },
    data() {
      return {
        textarea: "", //
      };
    },
    computed: {},
    mounted() {},
    methods:{
      changeTextarea() {
        console.log(this.textarea);
        this.$store.commit('saveRecordData', {
          sortId:this.params.sortId,
          data: this.textarea,
        })
      },
    }
  };
</script>
