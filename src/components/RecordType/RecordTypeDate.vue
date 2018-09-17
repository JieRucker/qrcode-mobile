<style lang="scss" scoped>
  .recordTypeDate {
    .date {
      border: 0;
      outline: none;
      background: #fff;
    }
  }
</style>

<template>
  <!--<div class="recordTypeDate">-->
  <cell class="recordTypeDate" :title="params.recordTitle" value-align="left">
    <input class="date" v-model="date" type="date" @change="changeDate">
  </cell>
  <!--</div>-->
</template>

<script>
  import {Cell, Group, XInput} from "vux";

  export default {
    name: "recordTypeDate",
    components: {Group, Cell, XInput},
    props: {
      params: {
        default: () => {
          return {
            recordTitle: 'Date',
          }
        }
      }
    },
    data() {
      return {
        date: "",
      };
    },
    methods: {
      changeDate() {
        console.log(this.date);
        this.$store.commit('saveRecordData', {
          sortId:this.params.sortId,
          data: this.date,
        })
      }
    }
  };
</script>
