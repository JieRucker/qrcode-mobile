<style lang="scss">
  .module-record-footer {
    position: fixed;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.9);
  }
</style>

<template>
  <div class="module-record-footer">
    <x-button type="primary" :gradients="['#2d8cf0', '#2d8cf0']" @click.native="btn">添加记录</x-button>
    <!-- 模态弹出框actionsheet -->
    <actionsheet
      v-model="showActionSheet"
      :menus="actionSheetMenus"
      @on-click-menu="menusButton"
      show-cancel
    ></actionsheet>

  </div>
</template>

<script>
  import {Actionsheet, XButton} from "vux";

  export default {
    name: "RecordFooter",
    components: {Actionsheet, XButton},
    props: {
      params: {
        type: Object
      }
    },
    data() {
      return {
        showActionSheet: false,
        actionSheetMenus: [{
          label: '<div style="padding: 5px;font-weight: bold;">请选择你要添加的记录</div>',
          type: 'info',
        }],
      };
    },
    computed: {},
    mounted() {
      let list = this.params.moduleObject.recordList;
      list.forEach(m => {
        this.actionSheetMenus.push({
          label: m.recordTemplateName,
          value: m.recordTemplateId
        })
      })

    },
    methods: {
      btn() {
        this.showActionSheet = true;
      },
      //菜单的两个按钮
      menusButton(value, item) {
        console.log(value);  //3种情况:空，value值，cancel        // 587d837c3f2000
        console.log(item);  //3种情况：空，item对象，undefined    // {label:"模板测试"value:"587d837c3f2000"}

        if (value !== 'cancel' || typeof item !== 'undefined') {
          this.$router.push({path: "/addRecord", query: {recordTemplateId: item.value,indexUrl:window.location.href}});
        }
      },
    },
  };
</script>
