import BaseModule from "./BaseModule";

class QrcodeInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }


  // 二维码-模块查询
  listModule(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/open/getTemplateMobile`, data)
    // return this.get(`../../static/server/qrcode.json`, data)
  }


  // 二维码-模块查询All
  listModuleAll(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/template/getTemplateMobileNoInfo`, data)
    // return this.get(`../../static/server/qrcode.json`, data)
  }


  // 二维码-设置模板信息
  setTemplateInfo(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/open/setTemplateInfo`, data)
    // return this.get(`../../static/server/test.json`, data)
  }

  // 获取Weixin JsApi 参数
  createJsapiSignature(data = {}) {
    return this.post(`/wx/createJsapiSignature`, data)
  }






  // // 请求密码
  // sendPassword(data = {}) {
  //   // return this.post(`/module/sendPassword`, data)
  //   return this.get(`../../static/server/password.json`, data)
  // }
  //
  // // 二维码列表-查询二维码列表
  // listTemplatefold(data = {}) {
  //   return this.post(`/templatefold/listTemplatefold`, data)
  // }
  //
  // // 二维码列表-新增根目录
  // saveTemplatefold(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/templatefold/saveTemplatefold`, data)
  // }
  //
  // // 二维码列表-修改二维码列表
  // updateTemplatefold(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/templatefold/updateTemplatefold`, data)
  // }
  //
  // // 二维码列表-删除二维码列表
  // removeTemplatefold(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/templatefold/removeTemplatefold`, data)
  // }
  //
  // // 二维码-点编辑查询单个二维码
  // getTemplateInfo(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/template/getTemplateInfo`, data)
  // }
  //
  // // 二维码-查询二维码
  // listTemplate(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/template/listTemplate`, data)
  // }
  //
  // // 二维码-更新单个二维码
  // updateSingleTemplate(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/template/updateSingleTemplate`, data)
  // }
  //
  // // 二维码-更新二维码(包含tag)
  // batchUpdateTemplate(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/template/batchUpdateTemplate`, data)
  // }
  //
  // // 二维码-新增二维码
  // saveTemplate(data = {}) {
  //   return this.post(`/template/saveTemplate`, data)
  // }
  //
  // // 二维码-删除二维码Tag
  // removeTemplateTag(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/template/removeTemplateTag`, data)
  // }
  //
  // // 二维码-删除二维码
  // removeTemplate(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/template/removeTemplate`, data)
  // }
  //
  //
  //
  // // 单个模块查询
  // getModule(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/getModule`, data)
  // }
  //
  // // 二维码-模块(联系人,链接,名片,素材)-新增
  // saveModule(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModule`, data)
  // }
  //
  // // 二维码-模块(联系人,链接,名片,素材)-修改
  // updateModule(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/updateModule`, data)
  // }
  //
  // // 二维码-模块停用
  // updateModulState(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/updateModulState`, data)
  // }
  //
  // // 二维码-模块删除
  // removeModule(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/removeModule`, data)
  // }
  //
  // // 图片模块
  // saveModuleImageVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleImageVO`, data)
  // }
  //
  // // 图文模块
  // saveModuleImageTextVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleImageTextVO`, data)
  // }
  //
  // // 产品参数
  // saveModuleProductParameterVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleProductParameterVO`, data)
  // }
  //
  // // 文件
  // saveModuleFileVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleFileVO`, data)
  // }
  //
  // // 素材 链接 名片 联系我们 记录
  // saveModule(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModule`, data)
  // }
  //
  // // 图集模块
  // saveModuleAtlasVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleAtlasVO`, data)
  // }
  //
  // // 视频模块
  // saveModuleVideoVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleVideoVO`, data)
  // }
  //
  // // 分类模块
  // saveModuleClassifyVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleClassifyVO`, data)
  // }
  //
  // // 网址模块
  // saveModuleNavigationVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleNavigationVO`, data)
  // }
  //
  // // 音频模块
  // saveModuleAudioVO(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/saveModuleAudioVO`, data)
  // }
  //
  // // 删除模块
  // removeModule(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/module/removeModule`, data)
  // }
  //
  // // 上传文件
  // addPacksFile(data = {}) {
  //   return this.post(`/common/addPacksFile`, data)
  // }

}

export default new QrcodeInterface()
