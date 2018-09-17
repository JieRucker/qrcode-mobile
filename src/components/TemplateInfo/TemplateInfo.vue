<style lang="scss">
  .template-info {
    margin: 0 3%;
    border-radius: 5px;
    .weui-cells {
      border-radius: 4px;
      font-size: 16px;
      margin-top: 10px;
      &:before {
        border-top: 0;
      }
      &:after {
        border-bottom: 0;
      }
      .vux-label {
        font-weight: bold;
      }
      .weui-cell__ft {
        color: #000;
      }
    }
    .templateInfoDesc, .templateImageList, .address {
      padding: 10px 15px;
    }
    .cellSpan {
      width: calc(80vw - 100px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      .span1{
      }
      .cell-img {
        width: 14px;
        vertical-align: middle;
      }
      .cell-text{
        vertical-align: middle;
      }
      .cell-text2{
      }
    }
  }
</style>

<template>
  <div class="template-info">
    <group label-width="6em">
      <cell class="cell-state"
            title="基本信息"
            is-link
            :border-intent="false"
            :arrow-direction="showState ? 'up' : 'down'"
            @click.native="_showContent()"
            value-align="left">
        <div v-if="cellSpan" class="cellSpan">
          <span class="span span1" v-if="templateImageList">
            <img class="cell-img" src="@/assets/images/icon/info-image.svg">
            <span class="cell-text cell-text1">{{imageList.length}}</span>
          </span>
          <span class="span span2" v-if="address">
            <img class="cell-img" src="@/assets/images/icon/info-address.svg">
            <span class="cell-text cell-text2">{{address}}</span>
          </span>
        </div>
      </cell>
      <template v-if="showState">
        <div v-if="templateInfoDesc" class="templateInfoDesc set-1px-b">{{templateInfoDesc}}</div>
        <div v-if="templateImageList" class="templateImageList set-1px-b">
          <swiper loop auto :list="imageList" :index="0"></swiper>
        </div>
        <div v-if="address" class="address set-1px-b">{{address}}</div>
        <p v-if="showEdit" style="text-align:center;margin: 8px 4% 12px;color: #0050b3;" @click="_edit()">编辑</p>
      </template>
    </group>
  </div>
</template>

<script>
  import {Cell, Group, Swiper, XButton} from 'vux'

  export default {
    name: "TemplateInfo",
    components: {XButton, Group, Cell, Swiper},
    data() {
      return {
        showState: false,
        t: this.$store.state.base.templateData,
        imageList: [],
      };
    },
    computed: {
      cellSpan() {
        if(this.showState === true){
          return false;
        }
        if (this.address === false && this.templateImageList === false) {
          return false;
        } else {
          return true;
        }
      },
      showEdit() {
        if (typeof this.t.templateInfoVO !== 'undefined' && typeof this.t.templateInfoVO.openTemplateInfo !== 'undefined') {
          console.log(this.t.templateInfoVO.openTemplateInfo);
          return this.t.templateInfoVO.openTemplateInfo
        } else {
          return false;
        }
      },
      templateInfoDesc() {
        if (typeof this.t.templateInfoVO !== 'undefined' && typeof this.t.templateInfoVO.templateInfoDesc !== 'undefined') {
          if (this.t.templateInfoVO.templateInfoDesc.length === 0) {
            return false;
          }
          return this.t.templateInfoVO.templateInfoDesc
        } else {
          return false;
        }
      },
      templateImageList() {
        if (typeof this.t.templateInfoVO !== 'undefined' && typeof this.t.templateInfoVO.templateImageList !== 'undefined') {
          if (this.t.templateInfoVO.templateImageList.length === 0) {
            return false;
          }
          this.t.templateInfoVO.templateImageList.map(item => {
            this.imageList.push({img: item.imageUrl});
          });
          return this.t.templateInfoVO.templateImageList
        } else {
          return false;
        }
      },
      address() {
        if (typeof this.t.templateInfoVO !== 'undefined' && typeof this.t.templateInfoVO.address !== 'undefined') {
          return this.t.templateInfoVO.address.address
        } else {
          return false;
        }
      }
    },
    mounted() {
      let t = this.$store.state.base.templateData;
      if (typeof t.templateInfoVO !== 'undefined') {
        let info = t.templateInfoVO;
      }
    },
    methods: {
      _showContent() {
        this.showState = !this.showState;
      },
      _edit() {
        this.$router.push({name: 'templateInfo'});
      }
    }
  };
</script>
