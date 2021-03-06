import VueDB from './vue-db-long';

export default {
  judgeClient() {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
      client = 'IOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      client = 'Android';
    } else {
      client = 'PC';
    }
    return client;
  },
  isArray: function (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  },
  isObject: function (o) {
    return Object.prototype.toString.call(o) === '[object Object]';
  },
  isString: function (o) {
    return Object.prototype.toString.call(o) === '[object String]';
  },
  isBlank: function (varValue) {
    if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
      return false;
    }
    return true;
  },
  isEmpty: function (obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },
  isUrl: function (urlString) {
    if (urlString !== "") {
      let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      return reg.test(urlString)
    }
  },
  lastIndexOf(reg, str) {
    let index = str.lastIndexOf(reg);
    str = str.substring(index + 1, str.length);
    return str;
  },
  timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, 'done');
    });
  },
  isPhoneAvailable(value) {
    let reg = /^(\+?0?86\-?)?1[3456789]\d{9}$/;
    return reg.test(value)
  },
  isNull: function (obj) {
    return obj === null || typeof(obj) === 'undefined'
  },
  bool2Int: function (flag) {
    return flag ? 1 : 0;
  },
  int2Bool: function (number) {
    return number !== 0;
  },
  queryUrl: function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return decodeURI(r[2]);
    return null;
  },
  getsec: function (str) {
    let str1 = str.substring(1, str.length) * 1;
    let str2 = str.substring(0, 1);
    if (str2 == "s") {
      return str1 * 1000;
    } else if (str2 == "h") {
      return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
      return str1 * 24 * 60 * 60 * 1000;
    }
  },
  // Set the cookie
  setCookie: function (name, value, time, path, domain) {
    let strsec = this.getsec(time);
    let exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path + ";domain=" + domain;
  },
  // Read cookies
  getCookie: function (name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
  },
  // Remove cookies
  delCookie: function () {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval !== null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  isPc: function () {
    /**
     * To determine whether it is pc || mobile
     * @param flag true则pc，false则mobile
     */
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "webOS", "BlackBerry",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  reqAnimationFrame: function (count, cb, loop = false) {
    let vendors = ['ms', 'moz', 'webkit', 'o'];
    let requestId, cancalRequestId;
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      requestId = window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      cancalRequestId = window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    const step = () => {
      if (loop) {
        requestAnimationFrame(step)
      } else {
        progress += 1;
        if (progress < count) requestAnimationFrame(step);
      }
      cb();
    }

    if (requestAnimationFrame) {
      progress = 0;
      requestAnimationFrame(step);
    }
  },
  destroyIframe: function (iframe) {
    /**
     * Destroy iframe, free memory.
     * @param iframe Need to destroy the iframe object
     */
    let el = document.getElementById(iframe);
    if (el) {
      try {
        el.src = 'about:blank';
        el.contentWindow.document.write('');
        el.contentWindow.document.clear();
      } catch (e) {
      }
      el.parentNode.removeChild(el);
    }
  },
  trim: function (str, type = 'Trim') {
    switch (type) {
      case 'Trim':
        return str.replace(/(^\s*)|(\s*$)/g, "");
        break;
      case 'LTrim':
        return str.replace(/(^\s*)/g, "");
        break;
      case 'RTrim':
        return str.replace(/(\s*$)/g, "");
      case 'all':
        return str.replace(/\s+/g, "");
    }
  },
  serializeForm: function (formId) {
    const evt = {
      /**
       * Gets all the <input> objects in the specified form
       * @param formId
       * @returns {Array}
       */
      getElements(formId) {
        let form = document.getElementById(formId),
          tagElements = form.getElementsByTagName('input'),
          elements = new Array(null);
        if (elements.length > 0) elements = [];
        for (let j = 0, len = tagElements.length; j < len; j++) {
          elements.push(tagElements[j]);
        }
        return elements;
      },
      /**
       * Gets the array of [name, value] in a single input
       * @param element
       * @returns {[*,*]}
       */
      inputSelector(element) {
        if (element.checked) return [element.name, element.value];
      },
      /**
       * Get all element tags
       * @param element
       * @returns {*}
       */
      input(element) {
        switch (element.type.toLowerCase()) {
          case 'submit':
          case 'hidden':
          case 'password':
          case 'text':
            return [element.name, element.value];
          case 'checkbox':
          case 'radio':
            return this.inputSelector(element);
        }
        return false;
      },
      /**
       * Combination element content
       * @param element
       * @returns {*}
       */
      serializeElement(element) {
        return this.input(element);
      }
    }

    // Call method
    let elements = evt.getElements(formId),
      queryComponents = new Object(null);

    for (let i = 0, len = elements.length; i < len; i++) {
      let queryComponent = evt.serializeElement(elements[i]);
      if (queryComponent) queryComponents[queryComponent[0]] = this.trim(queryComponent[1]);
    }

    return queryComponents;
  },
  JMessage: {
    initJIM: function () {
      window.JIM = new JMessage({debug: false});
      JIM.onDisconnect(() => console.log("【disconnect】")); // Abnormal disconnection monitoring
    },
    startJMessage: function (options) {
      let uid, type, callback;
      uid = typeof(options.uid) !== 'undefined' ? options.uid : '';
      type = typeof(options.type) !== 'undefined' ? options.type : 'online';
      callback = typeof(options.callback) !== 'undefined' ? options.callback : null;
      let appkey = "944683e646fd594c4420525f",
        random_str = "022cd9fd995849b58b3ef0e943421ed9",
        secret = "a054dd76e11d820d00be3435",
        timestamp = new Date().getTime(),
        signature = hex_md5(`appkey=${appkey}&timestamp=${timestamp}&random_str=${random_str}&key=${secret}`),
        _this = this;

      if (typeof JIM !== 'undefined') {
        JIM.init({
          "appkey": appkey,
          "random_str": random_str,
          "signature": signature,
          "timestamp": timestamp,
          "flag": 1
        }).onSuccess((data) => {
          // console.log('init success');
          _this.registerJIM(uid, type, (flag) => {
            if (flag) {
              _this.loginJIM(uid, type, (data) => {
                return callback(data);
              })
            }
          });
        }).onFail((data) => {
          return callback(data);
        });
      } else {
        throw new Error('PLEASE INIT JIM')
      }
    },
    registerJIM: function (uid, type, callback) {
      if (typeof JIM !== 'undefined') {
        JIM.register({
          'username': uid,
          'password': uid
        }).onSuccess((data) => {
          return callback(true);
        }).onFail((data) => {
          return callback(true);
        });
      } else {
        throw new Error('PLEASE INIT JIM')
      }
    },
    loginJIM: function (uid, type, callback) {
      JIM.login({
        // 'username': 'liufeng',
        // 'password': '123456'
        'username': uid,
        'password': uid
      }).onSuccess(function (data) {

        switch (type) {
          case 'online':
            JIM.onMsgReceive(function (data) {
              return callback(data);
            });
            break;
          case 'offline':
            JIM.onSyncConversation(function (data) {
              return callback(data);
            });
        }

      }).onFail(function (data) {
        return callback(data)
      }).onTimeout(function (data) {
        return callback(data)
      });
    },
  },
  VueDB: function () {
    return new VueDB()
  }
};
