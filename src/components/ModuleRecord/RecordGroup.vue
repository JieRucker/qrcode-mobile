<style lang="scss">
  .group {
    margin-top: 10px;
    .weui-cells {
      background-color: #f6f6f6;
      margin-top: -10px;
      margin-bottom: 0;
      //  padding:0;
      &::before {
        border-top: 0;
      }
      &::after {
        border-bottom: 0;
      }
      .record-cell {
        font-size: 14px;
        color: #000;
        margin: 10px;
        padding: 18px 15px;
        background-color: #fff;
        border-radius: 3px;
        border-left: 5px solid #ccc;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        flex-direction: column;
        align-items: stretch;
        &::before {
          border-top: 0;
        }
        &:active {
          background-color: #f2f2f2;
        }
        .statusChange {
          padding-bottom: 15px;
          color: #999;
          margin-bottom: 12px;
          position: relative;
          margin-right: 6%;
          font-size: 16px;
          .statusTo {
            margin-left: 6px;
            margin-right: 6px;
            em {
              display: inline-block;
              vertical-align: middle;
              margin-bottom: 3px;
            }
            em:first-child {
              border-top: 2px solid #999;
              width: 10px;
            }
            em:last-child {
              content: " ";
              -webkit-transform: rotate(45deg);
              transform: rotate(45deg);
              height: 6px;
              width: 6px;
              border-width: 2px 2px 0 0;
              border-color: #999;
              border-style: solid;
              position: relative;
              margin-left: -6px;
            }
          }
          .statusAfter {
            vertical-align: bottom;
            em {
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 100%;
              margin-right: 5px;
              margin-bottom: 3px;
              vertical-align: middle;
            }
          }
        }
        h5 {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #555;
          margin-bottom: 5px;
          font-weight: 400;
        }
        h3 {
          color: #666;
          font-weight: 600;
          margin-bottom: 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .cell-footer {
          color: #bbb;
          font-size: 12px;
          span {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>


<template>
  <!-- 列表 -->
  <group ref="group" class="group" >
    <cell-box class="record-cell" :style="{'border-left-color':stateAfterColor(item.recordAfterStateColor,item.recordBeforeStateName !== item.recordAfterStateName)}"
              v-for="(item,index) in recordGroup" :key="index" :link="{path:'./RecordPage'}">
      <div v-if="item.recordBeforeStateName !== item.recordAfterStateName" class="statusChange set-1px-b">
        <span>状态变更：</span>
        <!--之前状态值及灰色-->
        <span class="statusBefore">{{item.recordBeforeStateName}}</span>
        <!--箭头-->
        <span class="statusTo"><em></em><em></em></span>
        <!--之后状态值及其颜色-->
        <span class="statusAfter" :style="{'color':stateAfterColor(item.recordAfterStateColor)}">
          <!--圆点-->
          <em :style="{'background-color':stateAfterColor(item.recordAfterStateColor)}"></em>
          <!--之后状态值-->
          {{item.recordAfterStateName}}
        </span>
      </div>
      <!--类型-->
      <h5 class="title">{{item.recordTemplateName}}</h5>
      <!--结果-->
      <h3 class="title">{{item.recordResultValue}}</h3>
      <p class="cell-footer">
        <!--<span>{{item.date | date}}</span>-->
        <!--<span>{{item.time | time}}</span>-->
        <!--时间-->
        <span>{{item.createDate}}</span>
        <!--创建人-->
        <span>{{item.createrName}}</span>
      </p>
    </cell-box>
  </group>
</template>

<script>
  import { GroupTitle, Group, Cell, CellBox } from "vux";
  export default {
    name: "RecordGroup",
    components: { GroupTitle, Group, Cell, CellBox },
    props: {
      recordGroup: {}
    },
    data() {
      return {
        showStatusChange: true
      };
    },
    computed: {},
    methods: {
      stateAfterColor(value,bool) {
        let color = '';
        // console.log(bool);
        if(bool === false){
          return color = '#eee';
        }
        switch (parseInt(value)) {
          case 0:
            color = "#52c41a";
            break;
          case 1:
            color = "#f5222d";
            break;
          case 2:
            color = "#fadb14";
            break;
          case 3:
            color = "#fa8c16";
            break;
          case 4:
            color = "#1890ff";
            break;
          case 5:
            color = "#722ed1";
            break;
        }
        return color;
      }
    },
    filters: {
      date(value) {
        // return [value.substr(0, 4), value.substr(4, 2), value.substr(6, 2)].join("-");
      },
      time(value) {
        // return [value.substr(0, 2), value.substr(2, 2)].join(":");
      }
    }
  };
</script>
