<style lang="scss">
  .module-interact {
    margin: 10px 0;
    background-color: #fff;
    .cell {
      font-weight: bold;
      padding: 15px !important;
    }
    .interact-content {
      padding: 15px;
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>

<template>
  <!-- 互动 -->
  <div class="module-interact">
    <cell class="cell set-1px-b" :title="this.params.moduleTitle"
          :link="{path:'./Interact',query:{}}"></cell>
    <p class="interact-content" v-if="showContent">{{this.params.moduleObject.interactDesc}}</p>

  </div>
</template>

<script>
  import {Cell} from "vux";

  export default {
    name: "ModuleInteract",
    components: {Cell},
    props: {
      params: {
        type: Object,
        default: () => {
          return {
            moduleId: "m020",
            moduleTitle: "20互动标题",
            moduleType: 20,
            templateId: "t001",
            isFold: 0,
            sortId: 20,
            moduleObject: {
              linkName: "20互动标题",
              templateId: "001",
              interactDesc: "互动的描述"
            }
          };
        }
      }
    },
    data() {
      return {
        showContent: !this.params.isFold
      };
    },
    computed: {},
    mounted() {
    },
    methods: {}
  };
</script>
