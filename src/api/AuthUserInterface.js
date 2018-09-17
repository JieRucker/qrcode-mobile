import BaseModule from "./BaseModule";

class AuthUserInterface extends BaseModule {
  constructor() {
    let options = {
      baseUrl: process.env.api.commonUrl
    };
    super(options)
  }

  // 人员-查询
  getAuthUserInfo(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/listAuthUserInfo`, data)
  }

  // 人员-新建
  saveAuthUser(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/saveAuthUser`, data)
  }

  // 人员-删除
  removeAuthUser(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/removeAuthUser`, data)
  }

  // 人员-修改
  updateAuthInfo(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/updateAuthInfo`, data)
  }

  // 人员组-查询
  listAuthGroup(data = {}) {
    return this.post(`/auth/listAuthGroup`, data)
  }

  // 人员组-人员详细信息查询
  listAuthGroupWithAuthUserInfo(data = {}) {
    return this.post(`/auth/listAuthGroupWithAuthUserInfo`, data)
  }

  // 人员组-新建
  saveAuthGroup(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/saveAuthGroup`, data)
  }

  // 人员组-删除
  removeAuthGroup(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/removeAuthGroup`, data)
  }

  // 人员组-修改
  updateAuthGroup(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/updateAuthGroup`, data)
  }

  // 人员-邀请授权生成二维码 [验证手机号码]
  makeQrcode(data = {}) {
    return this.post(`/auth/mangerInvite/userVeify/makeQrcode`, data)
  }

  // 申请列表-查询
  listAuthUserApply(data = {}) {
    return this.post(`/auth/listAuthUserApply`, data)
  }

  // // 申请列表-微信端扫描-申请加入维护组二维码
  // saveAuthUserApply(data = {}) {
  //   if (!data || !Object.keys(data).length) {
  //     return Promise.reject(new Error(`提交的数据无效`))
  //   }
  //   return this.post(`/auth/saveAuthUserApply`, data)
  // }

  // 申请加入维护组二维码
  saveAuthUserApply(data = {}) {
    return this.post(`/open/saveAuthUserApply`, data)
    // return this.get(`../../static/server/qrcode.json`, data)
  }
  // 邀请授权-发送验证码
  sendSMS(data = {}) {
    return this.post(`/open/sendSMS`, data)
    // return this.get(`../../static/server/qrcode.json`, data)
  }
  // 邀请授权-确认
  updateBySMS(data = {}) {
    return this.post(`/open/updateBySMS`, data)
    // return this.get(`../../static/server/qrcode.json`, data)
  }



  // 申请列表-接受并创建新用户-保存
  saveNewAuthUserApply(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/saveNewAuthUserApply`, data)
  }

  // 申请列表-添加短信审核员-保存接口
  saveShortMsgAuditor(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/saveShortMsgAuditor`, data)
  }

  // 申请列表-添加短信审核员-查询
  listShortMsgAuditor(data = {}) {
    return this.post(`/auth/listShortMsgAuditor`, data)
  }

  // 申请列表-申请人拒绝
  updateAuthUserApplyState(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/updateAuthUserApplyState`, data)
  }

  // 申请列表-绑定已有用户-保存接口
  updateAuthUserApply(data = {}) {
    if (!data || !Object.keys(data).length) {
      return Promise.reject(new Error(`提交的数据无效`))
    }
    return this.post(`/auth/updateAuthUserApply`, data)
  }

  // 申请列表-自主申请-申请加入维护组-生成二维码 [填申请表]
  makeQrcodeUserApply(data = {}) {
    return this.post(`/auth/authUserApply/makeQrcode`, data)
  }

}

export default new AuthUserInterface()
