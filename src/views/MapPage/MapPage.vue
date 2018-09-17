<style lang="scss" scoped>
body, html,.allmap {
  width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";
}
</style>

<template>
  <div>
      <!-- <x-header style="position:fixed;top:0;left:0;right:0;z-index:100;opacity:1">地图</x-header> -->
      <!--地图容器-->
      <div id="allmap" class="allmap" style="position:absolute;height:100%;"></div>
  </div>
</template>

<script>
  export default {
    name: "MapPage",
    data() {
      return {
        longitude:this.$route.query.longitude,
        dimension:this.$route.query.dimension,
      }
    },
    computed:{
    },
    mounted() {
      var that = this;
      // 百度地图API功能
      var map = new BMap.Map("allmap"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(that.dimension, that.longitude), 15); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.MapTypeControl()); //添加地图类型控件

	    var marker = new BMap.Marker(new BMap.Point(that.dimension, that.longitude)); // 创建点
      map.addOverlay(marker); 

    },
    filters: {
    },
    methods: {

    }
  }
</script>
