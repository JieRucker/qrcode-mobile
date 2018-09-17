<style lang="scss" scoped>
  .recordTypeTime {
    .time {
      border: 0;
      outline: none;
      background: #fff;
    }
  }
</style>

<template>
  <!--<div class="recordTypeTime">-->
  <cell class="recordTypeTime" :title="params.recordTitle" value-align="left">
    <input class="time" v-model="time" type="datetime-local" @change="changeTime">
  </cell>
  <!--</div>-->
</template>

<script>
  import {Cell, Group, XInput} from "vux";

  export default {
    name: "recordTypeTime",
    components: {Group, Cell, XInput},
    props: {
      params: {
        default: () => {
          return {
            recordTitle: 'Time',
          }
        }
      }
    },
    data() {
      return {
        time: "",
      };
    },
    methods: {
      changeTime() {
        // console.log(this.time);
        let time = this.time;

        // 上午下午
        // if (Number(time.substr(-5, 2)) > 12) {
        //   let num = Number(time.substr(-5, 2)) - 12;
        //   if (num < 10) {
        //     num = '0' + num;
        //   }
        //   time = time.replace('T', ' ').replace(time.substr(-5, 2), '下午' + num);
        // } else {
        //   time = time.replace('T', ' 上午');
        // }

        time = time.replace('T', ' ');//24小时格式
        console.log(time);
        this.$store.commit('saveRecordData', {
          sortId:this.params.sortId,
          data: time,
        })
      }
    }
  };
</script>
