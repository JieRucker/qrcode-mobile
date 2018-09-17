<style lang="scss">
  .recordTypeCheck {
    .cell-child {
      display: flex;
      .cell-left {
        width: 105px;
        label {
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .cell-right {
        flex: 1;
      }
      .checklist {
        .weui-cells::before {
          border-top: 0;
        }
        .weui-cells::after {
          border-bottom: 0;
        }
      }
    }
  }
</style>

<template>
  <!--<div class="recordTypeCheck set-1px-t">-->
  <cell value-align="left" class="recordTypeCheck">
    <div class="cell-child">
      <div class="cell-left">
        <label class="weui-label">{{params.recordTitle}}</label>
      </div>
      <div class="cell-right">
        <checklist class="checklist" :options="checkBoxList" v-model="currentCheckBox" :max="20" :required="true"
                   @on-change="changeCheck"></checklist>
      </div>
    </div>
  </cell>


  <!--</div>-->
</template>

<script>
  import {Cell, Checklist, Group} from "vux";

  export default {
    name: "recordTypeCheck",
    components: {Group, Cell, Checklist},
    props: {
      params: {
        default: () => {
          return {
            recordTitle: '多项选择',
            recordDesc: '',
            checkBoxList: [
              {defaultSelected: true, sortId: 0, value: "选项一"},
              {defaultSelected: true, sortId: 1, value: "选项二"},
              {defaultSelected: false, sortId: 2, value: "选项三"},
            ]
          }
        }
      }

    },
    data() {
      return {
        checkBoxList: [],
        currentCheckBox: null,//这是指存在本.vue的数据
        currentCheckBoxList: null,//这是上传的数据
      };
    },
    computed: {},
    mounted() {
      let arr = [];
      let arr2 = [];
      [...this.params.checkBoxList].map(m => {
        arr.push({key: m.sortId.toString(), value: m.value});
        // arr.push(m.value);
        if (m.defaultSelected === true) {
          // arr2[0] = m.value;
          arr2.push(m.sortId.toString());
        }
      });
      // this.checkBoxList = arr;
      this.checkBoxList = arr;
      this.currentCheckBox = arr2;
      console.log(this.checkBoxList);
      console.log(this.currentCheckBox);
    },
    methods: {
      //改变状态
      changeCheck(val, label) {
        console.log(label);
        this.currentCheckBox = val;

        let order = [...this.checkBoxList];
        let c = [...label];


        for (let i = 0; i < order.length; i++) {
          if (c.indexOf(order[i].value) !== -1) {
            for (let j = 0; j < c.length; j++) {
              if (c[j] === order[i].value) {
                c.splice(j, 1);
                break;
              }
            }
            c.splice(i, 0, order[i].value);
          }
        }
        // console.log(c);  //数组

        let cc = [];
        c.map(m => {
          cc.push({value: m});
        });
        // console.log(cc);//数组元素为对象[{"value":"xxx"}]

        this.$store.commit('saveRecordData', {
          sortId: this.params.sortId,
          data: cc,
        })
      },
    }
  };
</script>
