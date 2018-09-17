<style lang="scss">
  .module-record {
    margin: 10px 0;
    background-color: #f6f6f6;
    .module-title {
      background-color: #fff;
      padding: 15px;
      //   border-bottom:1px solid #d9d9d9;
    }
    .record-select {
      position: relative;
      background-color: #fff;
      margin: 10px;
      border-radius: 3px;
      text-align: center;
      padding: 12px;
      font-size: 13px;
      span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 90%;
        vertical-align: bottom;
        display: inline-block;
      }
      em.down {
        content: " ";
        display: inline-block;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        height: 0.3rem;
        width: 0.3rem;
        border-width: 1px 1px 0 0;
        border-color: #000;
        border-style: solid;
        position: relative;
        margin-left: 0.5rem;
        vertical-align: 3px;
      }
      select {
        height: auto;
        position: absolute;
        left: 0;
        top: 1px;
        width: 100%;
        opacity: 0;
        line-height: normal;
        background-color: #fff;
        padding: 10px;
      }
    }
    .moreRecord {
      margin: 0 10px 5px;
      padding: 10px;
      text-align: center;
      border-radius: 3px;
      background-color: #fff;
      .moreRecord-icon {
        transform: scale(0.8);
        vertical-align: middle;
        fill: #586c94;
      }
      span {
        color: #586c94;
        vertical-align: middle;
      }
    }
  }
</style>


<template>
  <div class="module-record">
    <h4 class="module-title set-1px-b">{{params.moduleTitle}}</h4>
    <div v-if="showContent">
      <!-- 选择记录类型 -->
      <div class="record-select">
        <span>{{recordSelect}}</span><em class="down"></em>
        <select v-model="recordSelect" class="weui-select" @change="changeSelect">
          <option selected value="所有记录类型">所有记录类型</option>
          <option v-for="(item,index) in recordList" :value="item.recordTemplateName">{{item.recordTemplateName}}
          </option>
          <!--<option value="配电箱每日巡检">配电箱每日巡检</option>-->
          <!--<option value="日常巡检">日常巡检</option>-->
        </select>
      </div>
      <!-- 列表 -->
      <RecordGroup :recordGroup="recordGroup"></RecordGroup>
      <!-- 查看更多 -->
      <router-link tag="div" v-if="showMoreRecord" class="moreRecord" :to="{path:'/RecordList'}">
        <span>查看更多</span>
        <x-icon class="moreRecord-icon" type="ios-arrow-right" size="26"></x-icon>
      </router-link>
    </div>
    <Fold v-if="showFold" :show-content="showContent" @receiveFold="receiveFold"></Fold>
  </div>
</template>

<script>
  import Fold from "../Fold.vue";
  import {Cell, CellBox, Group, GroupTitle, Selector} from "vux";
  import RecordGroup from "./RecordGroup.vue";

  export default {
    name: "ModuleRecord",
    components: {Fold, RecordGroup, GroupTitle, Group, Cell, CellBox, Selector},
    props: {
      params: {
        type: Object
      }
    },
    data() {
      return {
        showFold: this.params.isFold,
        showContent: !this.params.isFold,
        recordSelect: "所有记录类型",
        recordList: this.params.moduleObject.recordList,
        recordGroup: "",
        showMoreRecord: false,
      };
    },
    mounted() {
      this.recordGroup = '';
      //上传信息
      this.$vux.loading.show({text: '正在加载中'});
      this.$api.recordInterface.getRecordStateResultModule({
        moduleId: this.params.moduleId,
        templateId: templateId,
        appKey: appKey,
        startRow: 0,
        pageSize: 5,
        // recordTemplateId:this.params.recordTemplateId,
      }).then(res => {
        this.$vux.loading.hide();
        res = res.data;
        console.log(res);
        if (res.success) {
          if(typeof res.data !== 'undefined'){
            this.recordGroup = res.data.dbPageList;
            this.showMoreRecord = res.data.hasMore;
          }
        } else {
          this.$vux.toast.show({type: "cancel", text: res.retMsg});
        }
      }).catch(err => {
        console.error(err);
      });
    },
    methods: {
      //改变类型选择
      changeSelect() {
        console.log(this.recordSelect);
        if (this.recordSelect === "所有记录类型") {
          this.cloneRecordList = this.params.moduleObject.recordList;
          return false;
        }
        let newList = [];
        this.params.moduleObject.recordList.forEach(item => {
          if (item.type.indexOf(this.recordSelect) > -1) {
            // if (item.type.includes(this.recordSelect)) {
            newList.unshift(item);
          }
        });
        this.cloneRecordList = newList;
      },
      receiveFold(res) {
        this.showContent = res;
      }
    },
    filters: {}
  };
</script>
