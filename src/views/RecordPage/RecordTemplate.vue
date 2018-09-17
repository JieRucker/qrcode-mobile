<style lang="less">
  .recordTemplate {
    margin-top: 20px;
    margin-bottom: 20px;
    .weui-cell__ft {
      color: #000 !important;
    }
  }

  li {
    list-style: disc;
    margin-left: 5%;
  }
</style>


<template>
  <div class="recordTemplate">

    <!-- 记录结果 recordSummaryType:0-->
    <group title="记录结果" label-width="105px" v-if="showRecordResult">
      <selector placeholder="请选择结果" v-model="result" :title="recordSumaryTitle" :options="resultList" ></selector>
    </group>
    <!-- 记录结果 recordSummaryType:1-->
    <group title="记录结果" label-width="105px" v-if="!showRecordResult">
      <x-input :title="recordSumaryTitle" v-model="result" name="result"></x-input>
    </group>

    <group :title="recordTemplateData.recordTemplateName" label-width="105px">
      <component :is="item.component" :params="item.params" v-for="(item,index) in componentList"
                 :key="index"></component>
    </group>

  </div>
</template>

<script>
  import {
    Cell,
    CellBox,
    Checklist,
    Confirm,
    Group,
    GroupTitle,
    Icon,
    Loading,
    Selector,
    Toast,
    XButton,
    XTextarea,
    XInput
  } from 'vux'
  import uploader from 'vux-uploader'
  import RecordTypeText from '@/components/RecordType/RecordTypeText'
  import RecordTypeImage from '@/components/RecordType/RecordTypeImage'
  import RecordTypeCheck from '@/components/RecordType/RecordTypeCheck'
  import RecordTypeRadio from '@/components/RecordType/RecordTypeRadio'
  import RecordTypeTextarea from '@/components/RecordType/RecordTypeTextarea'
  import RecordTypeDate from '@/components/RecordType/RecordTypeDate'
  import RecordTypeTime from '@/components/RecordType/RecordTypeTime'
  import RecordTypeTape from '@/components/RecordType/RecordTypeTape'
  import RecordTypePosition from '@/components/RecordType/RecordTypePosition'

  export default {
    name: "recordTemplate",
    components: {
      RecordTypeText,
      RecordTypeImage,
      RecordTypeCheck,
      RecordTypeRadio,
      RecordTypeTextarea,
      RecordTypeDate,
      RecordTypeTime,
      RecordTypeTape,
      RecordTypePosition,
      uploader,
      XButton,
      GroupTitle,
      Group,
      Cell,
      CellBox,
      Icon,
      Checklist,
      Selector,
      XTextarea,
      Confirm,
      Loading,
      Toast,
      XInput
    },
    props: {},
    data() {
      return {
        recordTemplateData: '',
        componentList: [],
        recordSumaryTitle: '',

        result: '',//记录结果
        resultList: [],

        showRecordResult: false,

      }
    },
    computed: {
    },
    created() {
    },
    mounted() {


//0 文本，1 图片，2 多项选择，3 单项选择，4 多行文本框，5 日期，6：时间，7：录音，8：位置定点
      this.$vux.loading.show({text: "正在加载"});
      this.$api.recordInterface.getRecordTemplateByRecordTemplateId({
        recordTemplateId: recordTemplateId,
        appKey: appKey,
      }).then(res => {
        this.$vux.loading.hide();
        res = res.data;
        console.log(res);
        if (res.success) {
          console.log("成功1");
          this.recordTemplateData = res.data;
          this.recordSumaryTitle = res.data.recordSumaryTitle;

          //记录结果
          if(this.recordTemplateData.recordSummaryType === 0){
            let arr3 = [];
            [...res.data.radioBoxList].map(m => {
              arr3.push({key: m.sortId, value: m.value});
              if (m.defaultSelected === true) {
                this.result = m.sortId;
              }
            });
            this.resultList = arr3;
            this.showRecordResult = true;
          }
          if(this.recordTemplateData.recordSummaryType === 1){
            this.result = this.recordTemplateData.recordSummaryTypeTextDefaultContent;
            this.showRecordResult = false;
          }

          this.afterData();
        } else {
          this.$vux.toast.show({type: "cancel", text: res.retMsg});
        }
      }).catch(err => {
        console.error(err);
      });

    },
    methods: {
      add(name, params) {
        this.componentList.push({
          component: name,
          params: params
        });
      },
      //0 文本，1 图片，2 多项选择，3 单项选择，4 多行文本框，5 日期，6：时间，7：录音，8：位置定点
      afterData() {
        this.$store.commit('deleteRecordData');
        let module = this.recordTemplateData.recordGroupList[0].normalRecordGroupInfoList;
        module.forEach((item, index) => {
          let params = {
            recordTitle: item.normalRecordGroupInfoCfg.recordTitle,
            recordType: item.normalRecordGroupInfoCfg.recordType,
            nullable: item.normalRecordGroupInfoCfg.nullable,
            sortId: index,//本来是item.normalRecordGroupInfoCfg.sortId，但后台的sortId不一定对，会导致出错，不用sortId,用index肯定没错
            recordDesc: item.normalRecordGroupInfoCfg.recordDesc,
            imageCfg: item.normalRecordGroupInfoCfg.imageCfg,
            checkBoxList: item.normalRecordGroupInfoCfg.checkBoxList,
            radioBoxList: item.normalRecordGroupInfoCfg.radioBoxList,
            parent: 'recordTemplate',
          };

          this.$store.commit('addRecordData', {
            data: {sortId: index, data: null}   //用index肯定没错
          });

          switch (params.recordType) {
            //0图片
            case 0:
              this.add("RecordTypeText", params);
              break;
            //1图片
            case 1:
              this.add("RecordTypeImage", params);
              break;
            //2多项选择
            case 2:
              this.add("RecordTypeCheck", params);
              break;
            //3单项选择
            case 3:
              this.add("RecordTypeRadio", params);
              break;
            //4多行文本框
            case 4:
              this.add("RecordTypeTextarea", params);
              break;
            //5日期
            case 5:
              this.add("RecordTypeDate", params);
              break;
            //6时间
            case 6:
              this.add("RecordTypeTime", params);
              break;
            //7录音
            case 7:
              this.add("RecordTypeTape", params);
              break;
            //8位置定点
            case 8:
              this.add("RecordTypePosition", params);
              break;
          }
        });
      },
    },
    filters: {},

  }
</script>
