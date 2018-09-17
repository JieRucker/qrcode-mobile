import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Router.prototype.openPage = function (link, query) {
  this.push({
    path: link,
    query: _.assignIn({
      time: new Date().getTime()
    }, query || {})
  })
};

Vue.use(Router);

export default new Router({
  routes: [
  //   {
  //   path: '/',
  //   redirect: '/index'
  // },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/views/index/index.vue'], resolve),
      meta: {
        title: '',
        mainPage: true
      },
    },
    {
      path: '/blank',
      name: 'blank',
      component: resolve => require(['@/views/Blank/Blank.vue'], resolve),
      meta: {
        title: ''
      },
    },
    {
      path: '/MapPage',
      name: 'MapPage',
      component: resolve => require(['@/views/MapPage/MapPage.vue'], resolve),
      meta: {
        title: '地图'
      },
    },
    {
      path: '/Card',
      name: 'Card',
      component: resolve => require(['@/views/Card/Card.vue'], resolve),
      meta: {
        title: '名片'
      },
    },
    {
      path: '/MaterialPage',
      name: 'MaterialPage',
      component: resolve => require(['@/views/MaterialPage/MaterialPage.vue'], resolve),
      meta: {
        title: '素材'
      },
    },
    {
      path: '/ClassifyPage',
      name: 'ClassifyPage',
      component: resolve => require(['@/views/ClassifyPage/ClassifyPage.vue'], resolve),
      meta: {
        title: '分类'
      },
    },
    {
      path: '/RecordPage',
      name: 'RecordPage',
      component: resolve => require(['@/views/RecordPage/RecordPage.vue'], resolve),
      meta: {
        title: '记录详情'
      },
    },
    {
      path: '/addRecord',
      name: 'addRecord',
      component: resolve => require(['@/views/RecordPage/addRecord.vue'], resolve),
      meta: {
        title: '添加记录'
      },
    },
    {
      path: '/RecordList',
      name: 'RecordList',
      component: resolve => require(['@/views/RecordPage/RecordList.vue'], resolve),
      meta: {
        title: '添加记录'
      },
    },
    {
      path: '/Interact',
      name: 'Interact',
      component: resolve => require(['@/views/Interact/Interact.vue'], resolve),
      meta: {
        title: '互动'
      },
    },
    {
      path: '/apply',
      name: 'apply',
      component: resolve => require(['@/views/Apply/Apply.vue'], resolve),
      meta: {
        title: '申请成为维护人'
      },
    },
    {
      path: '/applySuccess',
      name: 'applySuccess',
      component: resolve => require(['@/views/Apply/ApplySuccess.vue'], resolve),
      meta: {
        title: '申请通知'
      },
    },
    {
      path: '/invite',
      name: 'invite',
      component: resolve => require(['@/views/Invite/Invite.vue'], resolve),
      meta: {
        title: '邀请验证'
      },
    },
    {
      path: '/inviteSuccess',
      name: 'inviteSuccess',
      component: resolve => require(['@/views/Invite/InviteSuccess.vue'], resolve),
      meta: {
        title: '验证成功'
      },
    },
    {
      path: '/templateInfo',
      name: 'templateInfo',
      component: resolve => require(['@/views/TemplateInfo/TemplateInfo.vue'], resolve),
      meta: {
        title: '基本信息设置'
      },
    },
    {
      path: '/manage',
      name: 'manage',
      component: resolve => require(['@/views/Manage/Manage.vue'], resolve),
      meta: {
        title: '管理报表'
      },
    },
    {
      path: '/templateInfo',
      name: 'templateInfo',
      component: resolve => require(['@/views/TemplateInfo/TemplateInfo.vue'], resolve),
      meta: {
        title: '模板信息'
      },
    },
    {
      path: '/recordTemplate',
      name: 'recordTemplate',
      component: resolve => require(['@/views/RecordPage/RecordTemplate.vue'], resolve),
      meta: {
        title: '记录模板'
      },
    },
  ]
})
