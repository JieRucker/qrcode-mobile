import * as types from '../mutation-types'

const state = {
  loading: false,
  templateData: null,
  indexUrl: '',
  client: '',
}

const getters = {
  loading: state => state.loading
}

const mutations = {
  [types.SHOW_LOADING](state, payload) {
    state.loading = payload.status
  },
  [types.HIDE_LOADING](state, payload) {
    state.loading = payload.status
  },
  saveTemplateData(state, obj) {
    state.templateData = obj.templateData;
  },
  saveIndexUrl(state, obj) {
    state.indexUrl = obj.indexUrl;
    state.client = obj.client;
  },
}


const actions = {
  showLoading({commit, state}) {
    commit({
      type: types.SHOW_LOADING,
      status: true
    })
  },
  hideLoading({commit, state}) {
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
