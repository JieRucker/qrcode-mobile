var card = {
    cardTheme: 8,
    //基本信息
    cardBaseInfo: {
        avatarImage: { imageUrl: "http://pic8.qiyipic.com/image/20180428/90/03/a_100006957_m_601_m13_195_260.jpg" }, //头像
        backGroundImage: { imageUrl: "https://biz.cli.im/Public/images/vcardbg7.jpg" }, //封面图
        fullName: "柯南", //姓名
        position: "侦探", //职位
        company: "毛利侦探所", //公司
        departMent: [{ name: "部门11111", value: "侦探部" }, { name: "部门22222222", value: "技术部" }], //部门
        layOut: 2 //展示位置
    },
    //联系信息
    cardLinkInfo: {
        telephone: "", //固定电话
        mobilePhone: [{ name: "移动电话", value: "18601467018" }, { name: "移动电话1", value: "" }], //移动电话
        // familyPhone:[{name:"移动电话",value:"18601467018"},{name:"移动电话1",value:"18601467018"}],//家庭电话
        fax: [{ name: "传真", value: "11112222" }, { name: "", value: "" }], //传真
        email: [{ name: "电子邮箱", value: "1178867018@qq.com" }, { name: "电子邮箱1", value: "2390552479@qq.com" }] //电子邮箱
    },
    //社交信息
    cardSocialInfo: {
        webChat: "gp117018", //微信号
        messenger: [{ name: "即时通讯1", value: "558-58" }, { name: "即时通讯2", value: "95584478" }], //即时通讯
        isAllowAddFriendByScanWeChatQrcode: 1, //0 不允许 1 允许
        webChatQrcodeImage: { imageUrl: "" }, //微信二维码 扫描者可以直接在页面中通过链接添加你为好友
        webSiteList: [{ name: "主页网址", value: "www.baidu.com" }, { name: "主页网址1", value: "www.baidu.com" }], //主页网址
        weibo: "www.sina.com", //微博
        qq: "1178867018", //QQ
        isAllowAddFriendByScanQQQrcode: 1, //0 不允许 1 允许
        qqQrcodeImage: { imageUrl: "" } //微信二维码 扫描者可以直接在页面中通过链接添加你为好友
    },
    //地址
    address: [ //经度//维度//中文地址
        { longitude: "30.193513", dimension: "120.223289", name: "地址", address: "浙江省杭州市滨江区春波南苑7栋一单元603" },
        { longitude: "", dimension: "", name: "地址1", address: "浙江省杭州市滨江区创伟科技园A栋803" }
    ],

    cardIntroInfo: { selfIntro: "真相只有一个" }, //个人说明
    //附加信息
    cardAdditionInfo: {
        additionalType: 0, //0 素材 1企业码
        templateId: "" //素材或企业码 对应的主键
    }
}