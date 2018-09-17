<style lang="scss" scoped>
.record-info{
  margin: 10px 0;
  margin-bottom: 100px;
  .record-base-info{
    padding: 28px 14px 15px;
    text-align: center;
    .icon{
        font-size: 70px;
        color: #09bb07;
    }
    h1{
        margin-top: 14px;
        font-size: 1.5rem;
        font-weight: 400;
    }
    h2{
        font-size: 1.125rem;
        color: #454545;
        margin-top: 18px;
        font-weight: 400;
    }
    p{
        font-size: 13px;
        color: #888;
        margin-top: 6px;
    }
  }
  .record-info-cell{
    font-size: 14px;
    padding: 15px;
    &:active{
      background-color: #f2f2f2;
    }
    .cell-left{
      width: 30%;
      float: left;
      color: #8a8d91;
      font-size:0.9rem;
      p{
        width: 90px;
      }
      .cellLeftGroup{
        width: 400% !important;
        color: #2c2e32;
        font-weight: bold !important;
      }
    }
    .cell-right{
      width: 70%;
      float: left;
      color: #0b0b0b;
      img{
          float: left;
          width: 32%;
          margin-right: 2%;
          margin-bottom: 2%;
      }
      img:nth-of-type(3n){
          margin-right: 0;
      }
    }
  }
    .record-group-cell{
      .group-name{
        float:left;
        color: #333;
        vertical-align: middle;
      }
      .group-icon{
        float:right;
        vertical-align: middle;
      }
    }
  .footer{
        position:fixed;
        bottom: 0;
        z-index: 100000;
        width: 100%;
        padding: 15px;
        text-align: center;
        background-color:rgba(255,255,255,0.9);
            box-shadow: 0 2px 4px #888;
        .footer-icon{
           transform: scale(0.8);
        vertical-align: middle;
        }
        span{
            color: #111;
            vertical-align: middle;
        }
    }
}
</style>


<template>
  <div class="record-info">
      <div class="record-base-info">
          <icon class="icon" type="success" is-msg></icon>
          <h1>维修中</h1>
          <h2>塔吊日常巡检记录</h2>
          <p class="time">2018-06-06 14:34:40</p>
          <p class="user">公开用户</p>
      </div>
    <group title="日常巡检内容" label-width="4.5em" label-margin-right="2em" label-align="left" gutter="0">
      <cell class="record-info-cell"
        v-for="(item,index) in recordInfoList"
        v-if="item.displayable==1?true:false"
        :key="index"
        value-align="left">
        <div class="cell-left">
            <p>{{item.paramName}}</p>
        </div>
        <div class="cell-right">
          {{item.type | judgeType(item)}}
          <img v-if="item.type==1?true:false" :src="item.image.imageUrl" />
          <img v-if="item.type==1?true:false" :src="item.image.imageUrl" />
          <img v-if="item.type==1?true:false" :src="item.image.imageUrl" />
          <img v-if="item.type==1?true:false" :src="item.image.imageUrl" />
          <img v-if="item.type==1?true:false" :src="item.image.imageUrl" />
        </div>
      </cell>
    </group>
     <group title="分组名称" label-width="4.5em" label-margin-right="2em" label-align="left" gutter="0">
      <cell class="record-group-cell"
        v-for="(item,index) in recordInfoList"
        v-if="item.displayable==1?true:false"
        :key="index"
        value-align="left">
        <!-- <div> -->
            <span class="group-name">1 2dddwsd</span>
            <x-icon class="group-icon" type="ios-close-empty" size="30"></x-icon>
        <!-- </div> -->
      </cell>
    </group>
    <div class="footer" @click="$router.go(-1)">
        <x-icon class="footer-icon" type="ios-arrow-left" size="30"></x-icon>
        <span>返回</span>
    </div>
  </div>
</template>

<script>
import {  GroupTitle, Group, Cell,Icon } from 'vux'
  export default {
    name: "RecordPage",
    components:{ GroupTitle, Group, Cell,Icon },
    props: {
      recordInfoList:{
          type: [Array,Object],
          // 类型 0文本 1图片 2链接 3多行文本 4分组名称
          default:()=>[
            {paramName:'参数名称参数名称参数名称参数名称参数名称',type: 0,displayable: 1,text:"文本",image:{imageUrl:"https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"},link:{linkName:"百度0",linkUrl:"http://www.baidu.com"},textarea:"多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本"},
            {paramName:'我是图片',type: 1,displayable: 1,text:"文本",image:{imageUrl:"https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"},link:{linkName:"百度1",linkUrl:"http://www.baidu.com"},textarea:"多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本"},
            {paramName:'我是链接',type: 2,displayable: 1,text:"文本",image:{imageUrl:"https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"},link:{linkName:"百度2",linkUrl:"http://www.baidu.com"},textarea:"多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本"},
            {paramName:'我是分组',type: 4,displayable: 1,text:"分组名称分组名称分组名称分组名称分组名称",image:{imageUrl:"https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"},link:{linkName:"百度4",linkUrl:"http://www.baidu.com"},textarea:"多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本"},
            {paramName:'我是多行文本',type: 3,displayable: 1,text:"文本",image:{imageUrl:"https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"},link:{linkName:"百度3",linkUrl:"http://www.baidu.com"},textarea:"多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本"},
            {paramName:'我不存在',type: 0,displayable: 0,text:"不存在的",image:{imageUrl:"https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"},link:{linkName:"百度5",linkUrl:"http://www.baidu.com"},textarea:"多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本"},
          ]
      }
    },
    data() {
      return {
        showImg:true,
      }
    },
    computed:{
    },
    methods: {

    },
    filters: {
      judgeGroup(value,item){
        return item.type==4?item.text:item.paramName
      },
      // 类型 0文本 1图片 2链接 3多行文本 4分组名称
      judgeType(value,item){
        switch (value) {
          case 0:
            return item.text;
            break;
          case 1:
            return "";
            break;
          case 2:
            return item.link.linkName;
            break;
          case 3:
            return item.textarea;
            break;
          case 4:
            return item.text;
            break;
        }
      }
    },


  }
</script>
