import BaseModule from './BaseModule';

class ManageInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.authUrl
    };
    super(options)
  }

  // 获取便签列表
  getNoteList(data = {}) {
    // return this.post(`/report/listTemplateTagReport`, data)
    return this.get(`../../static/server/getNoteList.json`, data)
  }
  getStateNum(data = {}) {
    // return this.post(`/report/listTemplateTagReport`, data)
    return this.get(`../../static/server/getStateNum.json`, data)
  }
  getStateBlockList(data = {}) {
    // return this.post(`/report/listTemplateTagReport`, data)
    return this.get(`../../static/server/getStateNum.json`, data)
  }
  getStateCellList(data = {}) {
    // return this.post(`/report/listTemplateTagReport`, data)
    return this.get(`../../static/server/getStateNum.json`, data)
  }
}

export default new ManageInterface()
