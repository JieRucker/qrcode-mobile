<style lang="scss" scoped>
.link{
  background-color: #fff;
  .link-header{
    font-weight: bold;
    padding: 15px;
    border-bottom: 1px solid #d9d9d9;
  }
}
</style>

<template>
  <div v-if="OpenInBrower==0?false:true">
      <div class="link">
        <div class="link-header">{{moduleText}}</div>
        <div class="link-list">
            <group :title="moduleDesc+'<br><br>'">
              <cell v-for="(item,index) in linkList" :key="index" :title="item.text" :link="item.url"></cell>
            </group>
        </div> 
      </div>
  </div>
</template>

<script>
// import {  } from 'vux'
  export default {
    name: "OpenInBrower",
    components:{ },
    props: {
      OpenInBrower: {
        type: Number,
        default: 1
      },
      moduleText:{
        type:String,
        default:'标题'
      },
      moduleDesc:{
          type: String,
          default: '描述'         
      },
      showWxTip:{
        type:Number,
        default:1
      },
      linkList:{
        type:[Object,Array],
        default:()=>[{text:'百度',url:'#'},{text:'百度2',url:'#'}]
      }
    },
    data() {
      return {
      }
    },
    computed:{
    },
    methods: {

    }
  }
</script>
