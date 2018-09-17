<style lang="less">
  .addRecord {
    margin-top: 20px;
    margin-bottom: 20px;
    .state-group {
      margin: 0 3%;
      border-radius: 5px;
      .weui-cells {
        border-radius: 4px;
        font-size: 16px;
        &:before {
          border-top: 0;
        }
        &:after {
          border-bottom: 0;
        }
        .vux-label {
          /*font-weight: bold;*/
        }
      }
    }
    .state {
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
    .checklist {
      .weui-cell::before {
        border-top: 0;
      }
    }
    .confirmBtn {
      width: 94%;
      margin: 20px auto;
    }
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
  <div class="addRecord">
    <!-- 记录状态 -->
    <group v-if="showTemplateRecordState" label-width="105px" class="state-group">
      <cell class="state"
            :title="$store.state.base.templateData.templateRecordStateVO.recordStateTemplateVO.recordStateTemplateName"
            is-link
            :border-intent="false"
            :arrow-direction="showState ? 'up' : 'down'"
            @click.native="_showContent()"
            value-align="left">
            <span :style="{'color':stateColor}">
                <em :style="{'background-color':stateColor}"></em>
                <span>{{currentState[0]}}</span>
            </span>
      </cell>
      <!-- checklist -->
      <template v-if="showState">
        <checklist class="checklist" :options="stateList" v-model="currentState" :max="1" :required="true"
                   @on-change="changeStatus"></checklist>
      </template>
    </group>

    <!-- 记录结果 recordSummaryType:0-->
    <group title="记录结果" label-width="105px" v-if="showRecordResult">
      <selector placeholder="请选择结果" v-model="result" :title="recordSumaryTitle" :options="resultList"
                @on-change="changeResult"></selector>
    </group>
    <!-- 记录结果 recordSummaryType:1-->
    <group title="记录结果" label-width="105px" v-if="!showRecordResult">
      <x-input :title="recordSumaryTitle" v-model="result" name="result"></x-input>
    </group>

    <group :title="recordTemplateData.recordTemplateName" label-width="105px">
      <component :is="item.component" :params="item.params" v-for="(item,index) in componentList"
                 :key="index"></component>
    </group>
    <!-- 确定按钮 -->
    <x-button class="confirmBtn" @click.native="confirmBtn" type="primary" :gradients="['#2d8cf0', '#2d8cf0']">确定
    </x-button>

  </div>
</template>

<script>
  import wxConfig from '@/libs/jweixin/WxConfig';
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
    name: "addRecord",
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
        isAble: false,
        showTemplateRecordState: false,
        recordTemplateData: '',
        componentList: [],
        showState: false,
        recordSumaryTitle: '',

        stateList: [],
        stateCfgList: [],
        currentState: [],//当前状态
        // stateList: ['正常', '异常', '已维修'],
        // currentState: ['正常'],//当前状态
        preStatus: [''],

        result: '',//记录结果
        resultList: [],
        // resultList: [{key: 'ywxzc', value: '已维修，正常'}, {key: 'yc', value: '异常'}],

        showRecordResult: false,

      }
    },
    computed: {
      stateColor() {
        let color = '';
        [...this.stateCfgList].map(m => {
          if (m.itemName === this.currentState[0]) {
            color = m.color;
          }
        });
        switch (color) {
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
    created() {
      //获取签名
      this.$Global.timeout(300).then(() => {
        let url = '';
        let client = this.$store.state.base.client;
        if (client === 'Android') {
          url = window.location.href;
        } else if (client === 'IOS') {
          url = this.$store.state.base.indexUrl;
        }
        this.$api.qrcodeInterface.createJsapiSignature({
          url: url
        }).then(res => {
          if (res.data.success) {
            let data = res.data.data;
            wxConfig.init({
              appId: data.appId,
              timestamp: data.timestamp,
              signature: data.signature,
              nonceStr: data.nonceStr
            })
          }
        }).catch(err => {
          console.error(err)
        });
      })
    },
    mounted() {

      let t = this.$store.state.base.templateData;
      console.log(t);
      if (typeof t.templateRecordStateVO !== 'undefined') {
        this.showTemplateRecordState = true;
        //状态
        let arr = [];
        [...t.templateRecordStateVO.recordStateTemplateVO.stateCfgList].map(m => {
          arr.push(m.itemName);
        });
        this.stateList = arr;
        this.stateCfgList = [...t.templateRecordStateVO.recordStateTemplateVO.stateCfgList];
        this.currentState[0] = t.templateRecordStateVO.itemValue;
        console.log(this.stateList);
        console.log(this.currentState);
        this.isAble = t.templateRecordStateVO.openRecordState;
      }


//0 文本，1 图片，2 多项选择，3 单项选择，4 多行文本框，5 日期，6：时间，7：录音，8：位置定点
      this.$vux.loading.show({text: "正在加载"});
      this.$api.recordInterface.getRecordTemplateByRecordTemplateId({
        recordTemplateId: this.$route.query.recordTemplateId,
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
            if(this.resultList.length === 0){
              console.warn('来自前端的警告：radioResult不应该为空，为空则value报错！');
            }
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
      _showContent() {
        if (this.isAble === true) {
          this.showState = !this.showState;
        }
      },
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
            parent: 'addRecord',
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
        console.log(this.$store.state.record.recordData)
      },
      //改变状态
      changeStatus(val, label) {
        console.log('change', val, label);
        if (label.length === 0) {
          this.currentState = this.preStatus;
        } else {
          this.preStatus = label;
        }
        console.log(this.currentState[0]);
      },
      //改变结果
      changeResult(val) {
        // console.log(this.result);
        // console.log(this.resultList[this.result].value);
      },

      //确定按钮
      confirmBtn() {
        let _this = this;
        let isNullable = true;
        console.log(this.$store.state.record.recordData);
        let r = new Object(null);
        let t = this.recordTemplateData;

        r.appKey = appKey;//渲染出来的
        r.templateId = templateId;//渲染出来的
        r.recordTemplateId = t.recordTemplateId;//来自模板
        r.templateName = t.recordTemplateName;//来自模板
        r.recordSummaryType = t.recordSummaryType;//来自模板

        if(t.recordSummaryType === 0){
          r.radioBoxList = t.radioBoxList;//来自模板
          r.radioResult = this.resultList[this.result].value;//用户选择的记录结果，radioResult不可能为空，为空则value报错！
        }
        if(t.recordSummaryType === 1){
          r.recordSummaryTypeTextDefaultContent = t.recordSummaryTypeTextDefaultContent;//来自模板
          r.radioResult = this.result;//用户选择的记录结果
        }

        r.recordGroupList = [];
        r.recordGroupList[0] = {};
        r.recordGroupList[0].recordGroupName = t.recordGroupList[0].recordGroupName;//来自模板
        r.recordGroupList[0].recodGroupType = t.recordGroupList[0].recodGroupType;//来自模板

        if (r.recordGroupList[0].recodGroupType === 1) {
          //一般分组
          r.recordGroupList[0].normalRecordGroupInfoList = [];
          let tn = [...t.recordGroupList[0].normalRecordGroupInfoList];
          for (let i = 0; i < tn.length; i++) {
            let m = tn[i];

            //0 文本，1 图片，2 多项选择，3 单项选择，4 多行文本框，5 日期，6：时间，7：录音，8：位置定点
            r.recordGroupList[0].normalRecordGroupInfoList.push(new Object(null));

            //获取数据
            let data = this.$store.state.record.recordData[i].data;

            //判断是否为必填，必填且数据为空则提示不能为空
            if (m.normalRecordGroupInfoCfg.nullable === true && data === null) {
              _this.$vux.toast.text(m.normalRecordGroupInfoCfg.recordTitle + '不能为空', 'middle');
              isNullable = false;
              break;
            }

            r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoCfg = t.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoCfg;
            r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult = {};
            //根据类型填入数据
            switch (m.normalRecordGroupInfoCfg.recordType) {
              case 0:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.textResult = data;
                break;
              case 1:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.imageResultList = data;
                break;
              case 2:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.checkBoxResultList = data;
                break;
              case 3:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.radioResult = data;
                break;
              case 4:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.textareaResult = data;
                break;
              case 5:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.dateResult = data;
                break;
              case 6:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.timeResult = data;
                break;
              case 7:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.audioResult = data;
                break;
              case 8:
                r.recordGroupList[0].normalRecordGroupInfoList[i].normalRecordGroupInfoResult.addressResult = data;
                break;
            }
          }

        }
        if (r.recordGroupList[0].recodGroupType === 2) {
          //检查分组
          r.recordGroupList[0].checkRecordGroupInfoList = [];
        }
        //必填
        if (isNullable === false) {
          return false;
        }
        console.log(r);


        // let _this = this;
        // if (this.describe === "") {
        //   this.$vux.confirm.show({
        //     title: '定位信息获取失败',
        //     content: '存在以下3种原因：<ul><li style="list">网速缓慢，请等待片刻再提交</li><li>系统设置中拒绝了微信的定位获取，请修改后再提交</li><li>授权定位被拒绝，请允许后再提交</li></ul>',
        //     cancelText: '继续提交',
        //     confirmText: '返回修改',
        //     onShow() {
        //       console.log('plugin show')
        //     },
        //     onHide() {
        //       console.log('plugin hide')
        //     },
        //     onCancel() {
        //       console.log('plugin cancel')
        //     },
        //     onConfirm() {
        //       console.log('plugin confirm')
        //     }
        //   })
        //   return false;
        // }
        this.$vux.confirm.show({
          title: '信息确认',
          content: '信息填写完毕，是否确认提交',
          cancelText: '返回修改',
          confirmText: '确认修改',
          onShow() {
            console.log('plugin show')
          },
          onHide() {
            console.log('plugin hide')
          },
          onCancel() {
            console.log('plugin cancel')
          },
          onConfirm() {
            console.log('plugin confirm');
            _this.sumbit(r);
          }
        })


      },
      //正在提交数据
      sumbit(r) {

        let t = this.$store.state.base.templateData;

        //上传的数据
        let data = {
          appKey: appKey,
          openId: openId,
          templateId: templateId,
          recordTemplateId: r.recordTemplateId,
          templateName: r.templateName,
          recordResultJson: JSON.stringify(r),

        };

        if (typeof t.templateRecordStateVO !== 'undefined') {
          let beforeColor = '';
          let afterColor = '';
          let beforeName = '';
          let afterName = '';

          if (this.currentState[0] === '') {
            this.$vux.toast.text(t.templateRecordStateVO.recordStateTemplateVO.recordStateTemplateName + '不能为空', 'middle');
            return false;
          } else {
            afterName = this.currentState[0];
          }

          [...t.templateRecordStateVO.recordStateTemplateVO.stateCfgList].map((m, i) => {
            if (m.itemName === t.templateRecordStateVO.itemValue) {
              beforeColor = m.color;
            }
            if (m.itemName === this.currentState[0]) {
              afterColor = m.color;
            }
          });

          if (beforeColor === '') {
            beforeColor = '-';
          }

          if (t.templateRecordStateVO.itemValue === '') {
            beforeName = '未设置';
          } else {
            beforeName = t.templateRecordStateVO.itemValue
          }
          data.beforeColor = beforeColor;
          data.beforeName = beforeName;
          data.afterColor = afterColor;
          data.afterName = afterName;
          data.recordStateTemplateId = t.templateRecordStateVO.recordStateTemplateVO.recordStateTemplateId;
        }


        console.log(data);
        //上传信息
        this.$vux.loading.show({text: '正在提交中'});
        this.$api.recordInterface.saveRecordResult(data).then(res => {
          this.$vux.loading.hide();
          res = res.data;
          console.log(res);
          if (res.success) {
            this.$vux.toast.show({type: 'success', text: '提交成功'});
          } else {
            this.$vux.toast.show({type: "cancel", text: res.retMsg});
          }
        }).catch(err => {
          console.error(err);
        });
      }
    },
    filters: {},

  }
</script>
