<style lang="scss" scoped>
  .recordTypePosition {
    .p0{
      font-size: 14px;
      color: #666;
    }
  }
</style>

<template>
  <!--<div class="recordTypeText222">-->
  <cell class="recordTypePosition" :title="params.recordTitle" value-align="left" is-link
        @click.native="openLocation">
    <p class="p0">{{latitude}}°N,{{longitude}}°E</p>
    <p>{{positionName}}</p>
    <!--<j-map @drag="dragMap" :markers="markers" style="display:none;width: 0; height: 0;"></j-map>-->
  </cell>

  <!--</div>-->
</template>

<script>
  import {Cell, Group, XButton, XTextarea} from "vux";
  // import jMap from '@/components/j-map/jMap';


  export default {
    name: "recordTypePosition",
    components: {Group, Cell, XButton, XTextarea},
    props: {
      params: {
        default: () => {
          return {
            recordTitle: '位置',
            recordDesc: '位置备注',
          }
        }
      }

    },
    data() {
      return {
        latitude: '',   //30
        longitude: '', //120
        positionDesc: '',
        positionName: '',
        markers: [],
      };
    },
    computed: {},
    mounted() {
      let _this = this;
      if (wx && wx !== 'undefined') {
        wx.ready(function () {
          _this.$Global.timeout(300).then(() => {
            wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                console.log(res);
                _this.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                _this.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                // let speed = res.speed; // 速度，以米/每秒计
                // _this.accuracy = res.accuracy; // 位置精度

                // _this.markers = [
                //   {
                //     position: [_this.longitude, _this.latitude]
                //   }
                // ];


                //高德地图 https://lbs.amap.com/api/webservice/guide/api/georegeo/
                // https://restapi.amap.com/v3/geocode/regeo?location=120.15515,30.27415,&key=82baa69d274335d36357d15f8f295212
                $.ajax({
                  url: "https://restapi.amap.com/v3/geocode/regeo",
                  type: "get",
                  dataType: 'jsonp',
                  data: {
                    location: _this.longitude + "," + _this.latitude,//位置坐标:格式：location=lng<经度>,lat<纬度>//location=120.15515,30.27415
                    key: '82baa69d274335d36357d15f8f295212',//开发密钥（Key）
                    extensions: 'base',//base，返回基本地址信息；all 时会返回基本地址信息、附近 POI 内容、道路信息以及道路交叉口信息
                  },
                  success: function (res) {
                    console.log(res);
                    _this.positionName = res.regeocode.formatted_address; //结构化地址信息
                    _this.positionDesc = res.regeocode.formatted_address; //结构化地址信息

                  },
                  error: function (err) {
                    alert("服务端错误，请刷新浏览器后重试")
                  }
                });


              },
              cancel: function (res) {
                alert("用户拒绝授权获取地理位置");
              }
            });
          })
        })
      }
    },
    methods: {
      /**
       * 拖拽回调
       */
      dragMap(res) {
        console.log(res);
        this.positionName = res.address;
        this.positionDesc = res.nearestJunction;
      },

      openLocation() {
        let _this = this;
        if (wx && wx !== 'undefined') {
          wx.ready(function () {
            wx.openLocation({
              latitude: _this.latitude, // 纬度，浮点数，范围为90 ~ -90
              longitude: _this.longitude, // 经度，浮点数，范围为180 ~ -180。
              name: _this.positionName, // 位置名
              address: _this.positionDesc, // 地址详情说明
              scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
              infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
          })
        }
      }
    },
    watch: {
      positionName(newVal, oldVal) {
        let _this = this;
        console.log(this.positionName);
        console.log(this.longitude);
        console.log(this.latitude);
        // if (this.longitude === '' || this.latitude === '') {
        //   this.$Global.timeout(300).then(() => {
        //     console.log(this.positionName);
        //     console.log(this.longitude);
        //     console.log(this.latitude);
        //   })
        // }

        console.log(this.params.parent);
        if (this.params.parent === 'addRecord') {
          this.$store.commit('saveRecordData', {
            sortId: this.params.sortId,
            data: {longitude: this.longitude, dimension: this.latitude, address: this.positionName},
          })
        }
        if (this.params.parent === 'templateInfo') {
          console.log('加来====================');
          let address = {longitude: this.longitude, dimension: this.latitude, address: this.positionName};
          this.$emit('returnPosition', address);
        }
      },
    },
  };
</script>
