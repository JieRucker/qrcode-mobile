<style lang="scss">
  .manage {
    height: 100%;
    background: #fff;
    &-title{
      padding: 20px 10px;
      background: #fff;
      text-align: center;
      font-weight: 600;
      font-size: 22px;
      border-bottom: 10px solid #f6f6f6;
    }
    &-note{
      padding: 10px;
      background: #fff;
      border-bottom: 10px solid #f6f6f6;

      &_list{
        &_item{
          display: inline-block;
          margin: 5px;
          padding: 5px 10px 6px;
          border: 1px solid #ccc;
          border-radius:20px;
          font-size: 12px;
        }
        .noteListItemActive{
          background: #1AAD19;
          color: #fff;
          border: 1px solid #1AAD19;
        }
      }
    }
    &-state{
      overflow: hidden;
      background: #fff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      border-bottom: 10px solid #f6f6f6;

      &_item{
        text-align: center;
        padding:10px;
        font-size: 12px;
        .num{
          font-size: 22px;
          font-weight: 900;
        }
      }
      .state0{
        background: #f6f6f6;
        color: #E64340;
      }
      .state1{
        background: #f6f6f6;
        color: #ffc107;
      }
      .state2{
        background: #f6f6f6;
        color: #4caf50;
      }
      .state3{
        background: #f6f6f6;
        color: #333;
      }
    }
    &-block{
      background: #fff;
      overflow: hidden;
      &_title{
        font-size: 14px;
        color: #999;
        padding: 10px;
      }
      &_list{
        overflow: hidden;
        &_item{
          background: #f6f6f6;
          margin:0 10px 10px;
          padding: 15px;
          position: relative;
          .title{
            padding-bottom: 15px;
          }
          .state{
            padding: 10px 0;
            color: #666;
            font-size: 14px;
          }
          .desc{
            color: #666;
            font-size: 14px;
          }
          .note{
            position:absolute;
            top: 15px;
            right: 15px;
            font-size: 12px;
            background: #E64340;
            color: #fff;
            padding: 3px 10px;
            border-radius:4px;
          }
        }

      }

    }
    &-cell{
      .vux-label{
        color: #666;
        font-size: 15px;
      }
      .note{
        font-size: 12px;
        background: #E64340;
        color: #fff;
        padding: 2px 8px;
        border-radius:4px;
        margin-right: 5px;
      }
    }
    .noMore{
      margin: 10px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
  }
</style>

<template>
  <div class="manage">



    <p class="manage-title">产品管理报表</p>
    <div class="manage-note">
      <ul class="manage-note_list">
        <li class="manage-note_list_item" :class="{noteListItemActive:index===isNoteActive}" v-for="(item,index) in noteList" :data-id="item.id" @click="chooseNote(index,item.id)">{{item.name}}：{{item.num}}</li>
      </ul>
    </div>
    <tab :line-width="2" active-color="#1AAD19" bar-active-color="#1AAD19" :custom-bar-width="getBarWidth" >
      <tab-item selected @on-item-click="onItemClick">状态统计</tab-item>
      <tab-item @on-item-click="onItemClick">二维码列表</tab-item>
    </tab>

    <ul class="manage-state" v-show="showTabItem1">
      <li class="manage-state_item" :class="{state0:state0}" @click="chooseState(0)"><p class="num">{{stateNumList[0]}}</p><p class="state">异常状态</p></li>
      <li class="manage-state_item" :class="{state1:state1}" @click="chooseState(1)"><p class="num">{{stateNumList[1]}}</p><p class="state">警示状态</p></li>
      <li class="manage-state_item" :class="{state2:state2}" @click="chooseState(2)"><p class="num">{{stateNumList[2]}}</p><p class="state">正常状态</p></li>
      <li class="manage-state_item" :class="{state3:state3}" @click="chooseState(3)"><p class="num">{{stateNumList[3]}}</p><p class="state">其他状态</p></li>
      <li class="manage-state_item" :class="{state3:state4}" @click="chooseState(4)"><p class="num">{{stateNumList[4]}}</p><p class="state">暂无状态</p></li>
    </ul>
    <scroller lock-x height="-46" class="scroller"  v-show="showTabItem1"
              ref="scroller" :scroll-bottom-offset="200"
              :use-pullup="true" :use-pulldown="false"
              @on-pullup-loading="onPullUp()"
              :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新',loadingContent: '正在刷新...'}"
              :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent: '加载中...'}">

      <div class="manage-block" v-show="showTabItem1">
        <p class="manage-block_title">异常状态-二维码列表</p>
        <ul class="manage-block_list">
          <li class="manage-block_list_item">
            <p class="title set-1px-b">配电箱巡检</p>
            <p class="state">配电箱每日巡检：异常</p>
            <p class="desc">
              <span class="name">张三</span>&nbsp;
              <span class="date">08/17 16:27:20</span></p>
            <div class="note">异常</div>
          </li>
        </ul>
        <p class="noMore" v-show="showDivider">{{stateBlockList.length===0?"暂无数据":"没有更多"}}</p>
      </div>

    </scroller>

    <scroller lock-x height="-46" class="scroller"  v-show="!showTabItem1"
              ref="scroller2" :scroll-bottom-offset="200"
              :use-pullup="true" :use-pulldown="false"
              @on-pullup-loading="onPullUp2()"
              :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新',loadingContent: '正在刷新...'}"
              :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载',loadingContent: '加载中...'}">
    <div class="manage-cell" v-show="!showTabItem1">
      <group label-width="5em" label-margin-right="1em" label-align="left" :gutter="10">
        <cell title="姓名" :link="{path:'/index'}">
          <div class="note">异常</div>
        </cell>
        <cell title="姓名" :link="{path:'/index'}">
          <div class="note">异常</div>
        </cell>
        <cell title="姓名" :link="{path:'/index'}">
          <div class="note">异常</div>
        </cell>
      </group>
      <p class="noMore" v-show="showDivider2">{{stateCellList.length===0?"暂无数据":"没有更多"}}</p>
    </div>
    </scroller>
  </div>
</template>

<script>

  import { Group,Cell,Icon, XButton, Tab, TabItem,Scroller} from "vux";
  export default {
    name: "manage",
    components: { Group, Cell,Icon, XButton , Tab, TabItem,Scroller},
    data() {
      return {
        getBarWidth: function (index) {
          return (index + 1) * 22 + 60 + 'px'
        },
        tabIndex:'',
        showTabItem1:true,
        noteList:[],
        currentNoteId:'',
        currentStateId:'',

        isNoteActive:0,
        state0:true,
        state1:false,
        state2:false,
        state3:false,
        state4:false,
        stateNumList:[],

        stateBlockList: [],
        stateCellList: [],

        showDivider: true,
        hasMore: true,
        PAGE_SIZE: 8,
        scrollNum: 0,

        showDivider2: true,
        hasMore2: true,
        PAGE_SIZE2: 16,
        scrollNum2: 0,
      };
    },
    mounted(){
      this.getAllNote();
      this.chooseNote(0,'000');

      this.$nextTick(() => {
        this.$refs.scroller.reset({ top: 0 });
        this.$refs.scroller2.reset({ top: 0 });
      });

      this.onPullUp();
    },
    methods:{
      //tab 选择“状态统计”或者“二维码列表”
      onItemClick(index) {
        console.log("on item click:", index);
        if(index===0){
          this.showTabItem1 = true;
        }
        if(index===1){
          this.showTabItem1 = false;
          this.onPullUp2();
        }
        this.tabIndex = index;
        console.log(this.tabIndex);
      },
      //获取所有的标签
      getAllNote(){
        this.$vux.loading.show({ text: "正在加载" });
        this.$api.manageInterface.getNoteList({
        }).then(res => {
          this.$vux.loading.hide();
          console.log(res);
          res = res.data;
          if (res.success) {
            this.noteList = res.data;
          } else {
            this.$vux.toast.show({ type: "cancel", text: res.retMsg });
          }
        }).catch(err => {
          this.$vux.loading.hide();
          console.error(err);
        });
      },
      //选择某个标签：变颜色，获取5种状态数量
      chooseNote(index,id){
        this.isNoteActive=index;//变颜色
        this.currentNoteId = id;
        this.showDivider2 = true;
        this.hasMore2 = true;
        this.scrollNum2 = 0;

        this.$vux.loading.show({ text: "正在加载" });
        this.$api.manageInterface.getStateNum({
          id:id
        }).then(res => {
          this.$vux.loading.hide();
          console.log(res);
          res = res.data;
          if (res.success) {
            this.stateNumList = res.data;
          } else {
            this.$vux.toast.show({ type: "cancel", text: res.retMsg });
          }
        }).catch(err => {
          this.$vux.loading.hide();
          console.error(err);
        });

      },
      //选择了某个状态：变颜色，获取该状态的列表
      chooseState(state){
        switch (state){
          case 0:this.state0 = true;this.state1 = false;this.state2 = false;this.state3 = false;this.state4 = false;break;
          case 1:this.state1 = true;this.state0 = false;this.state2 = false;this.state3 = false;this.state4 = false;break;
          case 2:this.state2 = true;this.state1 = false;this.state0 = false;this.state3 = false;this.state4 = false;break;
          case 3:this.state3 = true;this.state1 = false;this.state2 = false;this.state0 = false;this.state4 = false;break;
          case 4:this.state4 = true;this.state1 = false;this.state2 = false;this.state3 = false;this.state0 = false;break;
        }
        this.hasMore = true;
        this.scrollNum = 0;
        this.stateBlockList = [];
        this.getStateBlockList(state);
      },

      //左边上拉加载更多
      onPullUp() {
        console.log("onPullUp");
        if (this.hasMore === false) {
          this.$refs.scroller.disablePullup();
          this.showDivider = true;
          return false;
        }
        console.log("onPullUp,hasmore = true");
        this.getStateBlockList(this.currentStateId);
      },
      //左边
      getStateBlockList(stateId){
        this.currentStateId = stateId;
        this.$vux.loading.show({ text: "正在加载" });
        this.$api.manageInterface.getStateBlockList({
          pageSize:this.PAGE_SIZE,
          startRow: this.PAGE_SIZE * this.scrollNum,
          stateCode:this.currentStateId,
          templateIdList:this.currentNoteId
        }).then(res => {
          this.$vux.loading.hide();
          console.log(res);
          res = res.data;
          if (res.success) {
            this.$nextTick(() => {
              this.$refs.scroller.reset();
            });
            if (typeof res.data !== 'undefined') {
              this.stateBlockList = this.stateBlockList.concat(res.data.dbPageList);
              this.hasMore = res.hasMore;
            } else {
              this.hasMore = false;
            }
            this.scrollNum++;
            this.$refs.scroller.donePullup();
            if (!this.hasMore) {
              this.$refs.scroller.disablePullup();
              this.showDivider = true;
              return false;
            }
          } else {
            this.$vux.toast.show({ type: "cancel", text: res.retMsg });
          }
        }).catch(err => {
          this.$vux.loading.hide();
          console.error(err);
        });
      },

      //左边上拉加载更多
      onPullUp2() {
        console.log("onPullUp2");
        if (this.hasMore2 === false) {
          this.$refs.scroller2.disablePullup();
          this.showDivider2 = true;
          return false;
        }
        console.log("onPullUp,hasmore2 = true");
        this.getStateCellList(this.currentNoteId);
      },
      //右边
      getStateCellList(noteId){
        this.currentStateId = noteId;
        this.$vux.loading.show({ text: "正在加载" });
        this.$api.manageInterface.getStateCellList({
          pageSize:this.PAGE_SIZE2,
          startRow: this.PAGE_SIZE2 * this.scrollNum2,
          noteCode:this.currentNoteId,
          templateIdList:this.currentNoteId
        }).then(res => {
          this.$vux.loading.hide();
          console.log(res);
          res = res.data;
          if (res.success) {
            this.$nextTick(() => {
              this.$refs.scroller2.reset();
            });
            if (typeof res.data !== 'undefined') {
              this.stateCellList = this.stateCellList.concat(res.data.dbPageList);
              this.hasMore2 = res.hasMore;
            } else {
              this.hasMore2 = false;
            }
            this.scrollNum2++;
            this.$refs.scroller2.donePullup();
            if (!this.hasMore2) {
              this.$refs.scroller2.disablePullup();
              this.showDivider2 = true;
              return false;
            }
          } else {
            this.$vux.toast.show({ type: "cancel", text: res.retMsg });
          }
        }).catch(err => {
          this.$vux.loading.hide();
          console.error(err);
        });
      },

    }
  };
</script>
