// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick';
import axios from '@/api/http'
import api from '@/api/server';
import common from '@/libs/common';
import store from './vuex/index.js';
import VueClipboard from 'vue-clipboard2';
import DatetimePlugin from './plugin/datetime/index.js';
import {AlertPlugin, ConfirmPlugin, Loading, LoadingPlugin, ToastPlugin} from 'vux'
import VueDB from "./util/vue-db/vue-db-long";


// plugin
[ConfirmPlugin, AlertPlugin, LoadingPlugin, ToastPlugin, DatetimePlugin, VueClipboard].forEach(item => {
  Vue.use(item)
})
Vue.component('x-loading', Loading);

Vue.use(VueLazyload)
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$Global = common;
Vue.prototype.$VueDB = new VueDB();

// 点击延迟
FastClick.attach(document.body)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: '',
  attempt: 1
})

//动态修改document.title //调用方法： this.$title('xxxxxx'); 当然你可以替换为一个绑定的变量，然后watch进行实时调整。
Vue.prototype.$title = function (title) {
  document.title = title;                             //1.在IOS的微信端没效果
  let iframe = document.createElement("iframe");      //2.针对IOS的微信做点额外的操作:创建一个隐藏的Iframe，然后随便加载一个图片文件，然后加载完成移除，这样就能修改页面title了
  iframe.style.display = 'none';
  iframe.setAttribute('src', '');
  let loadedCallback = () => {
    iframe.removeEventListener('load', loadedCallback);
    document.body.removeChild(iframe);
  };
  iframe.addEventListener('load', loadedCallback);
  document.body.appendChild(iframe);
};

let domainCross = ['show.liluo.cc', 'show.thisummer.com']

// 使用vue-router设置每个页面的title
router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  /* 路由发生变化修改页面title */
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  store.commit('nowStatus', 'loading');
  /*
  if(domainCross.indexOf(location.host) != -1){
    next()
  }else{
    if(to.name == 'error-110'){
      next()
    }else{
      router.openPage('/error/110')
    }
  }
  */

  next();//执行进入路由，如果不写就不会进入目标页

})

router.afterEach((to, from, next) => {
  store.commit('nowStatus', 'end');

  setTimeout(() => {
    store.commit('nowStatus', 'hide')
  }, 900)

  setTimeout(() => {
    store.commit('nowStatus', 'normal')
  }, 1000)

})


Vue.config.productionTip = false

// hack for active mobile
document.addEventListener("touchstart", function () {
}, true)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})


