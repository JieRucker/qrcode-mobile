<style lang="scss">
  @import 'assets/css/common.scss';
</style>

<template>
  <div class="app-container">
    <loading v-model="loading" :text="'加载中...'"></loading>
    <div class="main-init">
      <router-view name="default"></router-view>
      <div class="bottom-footer">
        <!-- <buttom-nav></buttom-nav> -->
      </div>
    </div>

    <transition
      name="custom-classes-transition"
      :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate">
      <router-view name="subPage" class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
  // import ButtomNav from './views/layouts/BottomNav.vue';

  import {Loading, Tabbar, TabbarItem, ViewBox, XHeader} from 'vux';
  import wxConfig from '@/libs/jweixin/WxConfig';
  // import Rem from '@/assets/js/rem'
  // import {mapGetters} from 'vuex'
  // new Rem();



  export default {
    name: 'app',
    components: {
      Tabbar, TabbarItem, ViewBox, XHeader, Loading
      // , ButtomNav
    },
    data() {
      return {
        "enterAnimate": "", //页面进入动效
        "leaveAnimate": "" //页面离开动效
      }
    },
    created(){
      // console.log(window.location.href);
      // this.$Global.timeout(300).then(() => {
      //   this.$api.qrcodeInterface.createJsapiSignature({
      //     url: window.location.href
      //   }).then(res => {
      //     if (res.data.success) {
      //       let data = res.data.data;
      //       console.log("正在createJsapiSignature");
      //
      //       wxConfig.init({
      //         appId: data.appId,
      //         timestamp: data.timestamp,
      //         signature: data.signature,
      //         nonceStr: data.nonceStr
      //       })
      //     }
      //   }).catch(err => {
      //     console.error(err)
      //   });
      // });
    },
    mounted() {
      setTimeout(() => {
        console.log('app.vue');
        console.log(router);

        if (typeof router !== 'undefined' && !this.$Global.isBlank(router)) {
          if (router === '/invite') {
            this.$router.push({name: 'invite'});
          }
          if (router === '/inviteSuccess') {
            this.$router.push({name: 'inviteSuccess'});
          }
          if (router === '/apply') {
            switch (state) {
              case '0':
                this.$router.push({name: 'apply'});
                break;
              case '1':
                this.$router.push({name: 'applySuccess', query: {result: 1}});
                break;
              case '2':
                this.$router.push({name: 'applySuccess', query: {result: 2}});
                break;
              case '3':
                this.$router.push({name: 'applySuccess', query: {result: 3}});
                break;
              default:
                this.$router.push({name: 'applySuccess', query: {result: parseInt(state)}});
                break;

            }
          }
          if (router === '/applySuccess') {
            this.$router.push({name: 'applySuccess'});
          }
          if (router === '/index') {
            this.$router.push({name: 'index'});
          }
          if (router === '/recordTemplate') {
            this.$router.push({name: 'recordTemplate'});
          }

        }
      }, 100)
    },
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        if (toDepth === 2) {
          // this.$store.commit('setPageName', to.name)
        }
        if (toDepth === fromDepth) {
          return
        }
        this.enterAnimate = toDepth > fromDepth
          ? 'animated fadeInRight'
          : 'animated fadeInLeft';

        this.leaveAnimate = toDepth > fromDepth
          ? 'animated fadeOutRight'
          : 'animated fadeOutLeft';

        // if(toDepth === 3) {
        // 	this.leaveAnimate = 'animated fadeOutRight'
        // }
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    }
  }
</script>


