<style lang="scss">
.record-list{
  margin: 10px 0;
  margin-bottom: 70px;
  background-color: #f6f6f6;
    .search-block{
        background-color: #EFEFF4;
        display:flex;
        justify-content:center;
        align-items:center;
        // border-top: 1px solid #D7D6DC;
        // border-bottom: 1px solid #D7D6DC;        
        .search-type{
            display: inline-block;
            text-align: center;
            span{
                vertical-align: bottom;
                float: left;
                position: relative;
                width: 95px;
            }
            span::after{
                content:'';
                position: absolute;
                top: 7px;
                right: 0px;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid #000;
                vertical-align: middle;
            }

        }
        .search{
            display: inline-block;
            .weui-search-bar:before{
                border: none;
            }
            .weui-search-bar:after{
                border: none;
            }
        }
    }
    .date-block{
        background-color: #EFEFF4;
        display:flex;
        justify-content:center;
        // align-items:center;
        padding: 10px 4px;
        input{
            flex:3;
            height: 25px;
            background-color: #fff;
            margin-left:1px;
            border: none !important;
            outline: none;
        }
        input[name='startTime']{
            margin-left: 8px;
            border-radius: 5px 0 0 5px;
        }
        input[name='endTime']{
            border-radius: 0 5px 5px 0;
        }
        span{
            flex: 1;
            color:rgb(130,184,244);
            text-align:center;
        }  
    }
    .radio{
        background-color: #fff;
    }

    .groupMarginTop{
        margin-top: 33px;
    }
}
</style>


<template>
    <div class="record-list">
        <div class="search-block" v-show="showSearch">
            <!-- 记录类型 -->
            <div class="search-type" @click="showRadio=!showRadio" >
               <span>{{recordType}}</span>
            </div>
            <!-- 搜索框 -->
            <search class="search"
            @on-result-click="resultClick"
            @on-change="changeSearch"
            :results="results"
            v-model="search"
            position="absolute"
            auto-scroll-to-top
            top="0px"
            @on-focus="onFocus"
            @on-cancel="onCancel"
            @on-submit="onSubmit"
            ref="search"></search>
        </div>
        <!-- 日期 -->
        <div class="date-block" v-show="showDate">
            <input type="date" v-model="startTime" name="startTime" @change="changeStartTime">
            <input type="date" v-model="endTime" name="endTime" @change="changeEndTime">
            <span @click="clickCancel">取消</span>
        </div>
        <!-- 类型radio -->
        <radio class="radio" v-show="showRadio" :options="radioList" value="记录类型" 
        @on-change="changeRadio" @click.native="clickRadio"></radio>
        
        <!-- 列表 -->
        <RecordGroup :recordList="cloneRecordList" :class="{groupMarginTop:isGroupMarginTop}"></RecordGroup>
        
        <p style="text-align:center;">没有更多数据</p>
        <RecordFooter v-show="showRecordFooter"></RecordFooter>

    </div>
</template>

<script>
import {  Search,Radio } from 'vux'
import RecordGroup from '@/components/ModuleRecord/RecordGroup.vue'
import RecordFooter from '@/components/ModuleRecord/RecordFooter.vue'
  export default {
    name: "RecordList",
    components:{ RecordGroup,RecordFooter,Search,Radio },
    props: {

      recordList:{
          type: [Array,Object],
          default:()=>[
              {statusBefore:'正常',statusAfter:'异常',type:"维修整改",result:'',date:'20180621',time:'1425',user:'公开用户'},
              {statusBefore:'正常',statusAfter:'正常',type:"配电箱每日巡检",result:'',date:'20180622',time:'1422',user:'公开用户'},
              {statusBefore:'正常',statusAfter:'已维修',type:"日常巡检",result:'',date:'20180623',time:'1429',user:'公开用户'},
              {statusBefore:'正常',statusAfter:'',type:"维修整改",result:'',date:'20180624',time:'1427',user:'公开用户'},
              {statusBefore:'正常',statusAfter:'正常',type:"配电箱每日巡检",result:'',date:'20180625',time:'1423',user:'公开用户'},
              {statusBefore:'正常',statusAfter:'已维修',type:"配电箱每日巡检",result:'',date:'20180626',time:'1426',user:'公开用户'},
              {statusBefore:'正常',statusAfter:'已维修',type:"配电箱每日巡检",result:'',date:'20180626',time:'1429',user:'公开用户'},
              {statusBefore:'正常',statusAfter:'正常',type:"配电箱每日巡检",result:'',date:'20180627',time:'1423',user:'公开用户'},
              {statusBefore:'正常',statusAfter:'异常',type:"日常巡检",result:'',date:'20180628',time:'1428',user:'非公开用户'},
              {statusBefore:'正常',statusAfter:'异常',type:"日常巡检",result:'',date:'20180629',time:'1429',user:'非公开用户'},
           ]
      }
    },
    data() {
      return {
          search:'',
          results:[],
          radioList: [ '记录类型', '记录时间','记录人' ],
          showRadio:false,
          recordType:'记录类型',
          preRadio:'',
          showSearch:true,
          showDate:false,
          startTime:'',
          endTime:'',
          showGroup:true,
          showRecordFooter:true,
          showStatusChange:true,
          isGroupMarginTop:false,
          cloneRecordList:[]
        }
    },
    computed: {
          formatStartTime(){
              return this.formatTime(this.startTime)
          },
          formatEndTime(){
              return this.formatTime(this.endTime)
          }
    },
    mounted(){
        var clone = this.recordList;
        this.cloneRecordList = clone;
    },
    methods: {
        //改变类型单选
        changeRadio (value, label) {
            console.log(this.preRadio);
            console.log('change:', value, label);
            switch (value) {
                case '记录类型':
                    this.recordType = '记录类型';
                    break;
                case '记录时间':
                    this.recordType = '记录时间';
                    this.showSearch = false;
                    this.showDate = true;
                    break;            
                case '记录人':
                    this.recordType = '记录人';
                    break;
            }
        },
        //点击radio
        clickRadio(){
            this.showRadio = false;
        },
        //点击绿色的取消文字
        clickCancel(){
            location.reload()//刷新
        },
        //改变开始时间
        changeStartTime(value){
            var newList = [];
            var end;
            this.formatEndTime==''?end = 119950511:end = this.formatEndTime;
            this.recordList.forEach(item => {
                if(this.formatStartTime <= item.date && item.date <= end){
                    newList.unshift(item);
                }
            });
            this.cloneRecordList = newList;
        },
        //改变结束时间
        changeEndTime(value){
            var newList = [];
            this.recordList.forEach(item => {
                if(this.formatStartTime <= item.date && item.date <= this.formatEndTime){
                    console.log(item.date);
                    newList.unshift(item);
                }
            });
            this.cloneRecordList = newList;
        },
        formatTime(value){
            // return  value.split('-').join('');
            return  value.replace(/-/g,'');
        },
        //搜索的6个方法
        //改变this.search的值
        changeSearch (value) {
            console.log('on-change', value)
            console.log(this.search)
            if(value == ''){
                return false;
            }
            var newList = [];
            switch (this.recordType) {
                case '记录类型':
                    this.recordList.forEach(item => {
                        if(item.type.includes(value)){
                            newList.unshift(item);
                        }
                    });
                    break;
                case '记录人':
                    this.recordList.forEach(item => {
                        if(item.user.includes(value)){
                            newList.unshift(item);
                        }
                    });
                    break;
            }
            this.cloneRecordList = newList; 
        },
        //确定
        onSubmit () {
            this.$refs.search.setBlur();
            this.$vux.toast.show({
                type: 'text',
                position: 'top',
                text: 'on submit'
            })
        },
        //搜索框聚焦
        onFocus () {
            this.showRadio = false;
            this.isGroupMarginTop = true;
        },
        //搜索框点击取消
        onCancel () {
            this.isGroupMarginTop = false;
            location.reload()//刷新
        },      
        setFocus () {
            this.$refs.search.setFocus();
        },
        resultClick (item) {
            window.alert('you click the result item: ' + JSON.stringify(item))
        },
    },
    filters: {
    },
  }
</script>
