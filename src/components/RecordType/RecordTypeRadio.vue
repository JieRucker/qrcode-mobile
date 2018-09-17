<style lang="scss" scoped>
  .recordTypeRadio {

  }
</style>

<template>
  <!--<div class="recordTypeText">-->
  <selector :title="params.recordTitle" :options="radioList" :placeholder="params.recordDesc" v-model="radio"
            @on-change="changeRadio" ref="selector"></selector>
  <!--</div>-->
</template>

<script>
  import {Group, Selector} from "vux";

  export default {
    name: "recordTypeRadio",
    components: {Group, Selector},
    props: {
      params: {
        default: () => {
          return {
            recordTitle: '单项选择',
            recordDesc: '',
            radioBoxList: [
              {defaultSelected: true, sortId: 0, value: "正常"},
              {defaultSelected: false, sortId: 1, value: "异常"},
            ]
          }
        }
      }

    },
    data() {
      return {
        radio: '',//结果
        radioList: [],
      };
    },
    computed: {},
    mounted() {
      let arr = [];
      [...this.params.radioBoxList].map(m => {
        arr.push({key: m.sortId, value: m.value});
        if (m.defaultSelected === true) {
          this.radio = m.sortId;
        }
      })
      this.radioList = arr;
    },
    methods: {
      //改变结果
      changeRadio(val) {
        console.log(this.radio);
        console.log(this.params.radioBoxList[this.radio].value);
        this.$store.commit('saveRecordData', {
          sortId:this.params.sortId,
          data: this.params.radioBoxList[this.radio].value,
        })
      },
    }
  };
</script>
