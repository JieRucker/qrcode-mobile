import * as types from '../mutation-types'

const state = {
  loading: false,
  appId:'',
  openId:'',
  userId:'',
  userType:'',
  userInfo:'',

  recordData:[],
}
const getters = {
  loading: state => state.loading
}

const mutations = {
  [types.SHOW_LOADING] (state, payload) {
    state.loading = payload.status
  },
  [types.HIDE_LOADING] (state, payload) {
    state.loading = payload.status
  },
  addUserInfo(state,obj){
    state.appId = obj.appId,
      state.openId = obj.openId,
      state.userId = obj.userId
  },
  addUserBaseInfo(state,obj){
    state.userInfo = obj.userInfo,
      state.userType = obj.userType
  },
  addRecordData(state,obj){
    state.recordData.push(obj.data)
  },
  deleteRecordData(state){
    state.recordData = [];
  },
  saveRecordData(state,obj){
    state.recordData[obj.sortId].data = obj.data;
  },
}


const actions = {
  showLoading({commit,state}){
    commit({
      type: types.SHOW_LOADING,
      status: true
    })
  },
  hideLoading({commit,state}){
    commit({
      type: types.HIDE_LOADING,
      status: false
    })
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
