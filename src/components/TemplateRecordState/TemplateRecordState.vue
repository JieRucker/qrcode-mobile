<style lang="scss">
  .template-record-state {
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
        font-weight: bold;
      }
    }
    .strong {
      font-weight: bold;
      margin-right: 10px;
    }
    em {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      margin-right: 5px;
      margin-bottom: 3px;
      vertical-align: middle;
    }
    .check-list {
      .weui-cell::before {
        border-top: 0;
      }
      .weui-cell:after {
        border-bottom: 0;
      }
    }
  }
</style>

<template>
  <div class="template-record-state">

    <group label-width="6em">
      <cell class="cell-state"
            :title="title"
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
        <checklist class="check-list" :options="stateList" v-model="currentState" :max="1" :required="true"
                   @on-change="changeState"></checklist>
        <x-button style="width:92%;margin: 8px 4% 12px;" @click.native="_saveState">确认</x-button>
      </template>
    </group>

  </div>
</template>

<script>
  import {Cell, Checklist, Group, XButton} from 'vux'

  export default {
    name: "TemplateRecordState",
    components: {XButton, Group, Cell, Checklist},
    data() {
      return {
        title: '',
        isAble: false,
        showState: false,
        // stateList: ['正常', '异常', '已维修'],//状态列表
        // currentState: ['正常'],//当前状态
        stateList: [],//状态列表
        currentState: [],//当前状态
        preState: [''],
        stateCfgList: [],
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
    mounted() {

      let t = this.$store.state.base.templateData;

      //状态
      if (typeof t.templateRecordStateVO !== 'undefined') {
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
        this.title = t.templateRecordStateVO.recordStateTemplateVO.recordStateTemplateName;
      }

    },
    methods: {
      _showContent() {
        if (this.isAble === true) {
          this.showState = !this.showState;
        }
      },
      //改变状态
      changeState(val, label) {
        console.log('change', val, label);
        !label.length ? this.currentState = this.preState : this.preState = label;
      },
      //确认
      _saveState() {
        console.log(this.currentState[0]);
        this.showState = !this.showState;

        let t = this.$store.state.base.templateData;
        let beforeColor = '';
        let afterColor = '';
        let beforeName = '';
        let afterName = '';

        if(this.currentState[0] === ''){
          this.$vux.toast.text(this.title + '不能为空', 'middle');
          return false;
        }else{
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



        //上传的数据
        let data = {
          appKey: appKey,
          templateId: templateId,
          recordStateTemplateId: t.templateRecordStateVO.recordStateTemplateVO.recordStateTemplateId,
          templateName:t.templateName,

          beforeColor: beforeColor,
          beforeName: beforeName,
          afterColor: afterColor,
          afterName: afterName,
        };
        console.log(data);
        //上传信息
        this.$vux.loading.show({text: '正在提交中'});
        this.$api.recordInterface.setState(data).then(res => {
          this.$vux.loading.hide();
          res = res.data;
          console.log(res);
          if (res.success) {
            this.$vux.toast.show({type: 'success', text: '提交成功'});
            this.$router.replace({name: 'blank', query: {name: this.$route.name}});
          } else {
            this.$vux.toast.show({type: "cancel", text: res.retMsg});
          }
        }).catch(err => {
          console.error(err);
        });

      }
    }
  }
</script>
