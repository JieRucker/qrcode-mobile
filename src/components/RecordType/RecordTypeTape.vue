<style lang="scss">
  .recordTypeTape {
    .luyin-cell {
      .luyin, .playButton, .time, .luyin-text,.reButton {
        vertical-align: middle;
      }
      .luyinOK {
        height: 30px;
      }
      .reButton {
        float: right;
      }
    }
  }

  .popup0 {
    /*padding-bottom: 15px;*/
    width: 100%;
    height: 280px;
    overflow: hidden;
    background: #fff;
    .voiceTitle {
      margin: 20px 20px 5px;
      text-align: center;
      font-size: 14px;
    }
    .time-block {
      text-align: center;
      margin-bottom: 15px;
      font-size: 28px;
      .time {
        vertical-align: middle;
      }
    }
    .circle-block {
      text-align: center;
      width: 110px;
      height: 110px;
      margin: 0 auto;
      position: relative;
      .circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .circle1 {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #f5222d;

      }
      .circle2 {
        width: 105px;
        height: 105px;
        border-radius: 50%;
        border: 1px solid #ccc;
      }
      .bgGreen {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        background: #52c41a;
      }
      .bgYellowSquare {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        background: #fadb14;
      }
      .bgYellow {
        height: 30px;
        border-radius: 2px;
        background: transparent;
        border-top: 24px solid transparent;
        border-bottom: 24px solid transparent;
        border-left: 30px solid #fadb14;
        transform: translate(-10px, -22px);
      }
    }
    .buttonGroup {
      width: 100%;
      height: 50px;
      background: #fff;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: center;
      /*align-items: center;*/
      .save, .close {
        flex: 1;
        line-height: 50px;
        text-align: center;
      }
      .close {

      }
    }
  }
</style>

<template>
  <div class="recordTypeTape set-1px-t">
    <!-- 录音 -->
    <cell title="录音补充" value-align="left" class="luyin-cell" is-link @click.native="openPopup">
      <div>
        <img src="../../assets/images/icon/luyin.png" class="luyin" alt="">
        <span class="luyin-text" v-show="luyinText">录音</span>
        <!--<img src="../../assets/images/icon/luyinOK.jpg" class="luyinOK" v-show="showluyinOK" alt=""-->
        <!--@click="_playVoice()">-->
        <x-button mini class="playButton" v-show="showluyinOK" @click.native="_playVoice()">播放</x-button>
        <span class="time" v-show="showluyinOK">&nbsp;{{voiceTime}}"</span>
        <x-button mini class="reButton" v-show="showReButton" @click.native="_reStartRecord()">重录</x-button>
      </div>
    </cell>

    <div v-transfer-dom>
      <popup v-model="showPopup" height="280px" @on-hide="onHide" @on-show="onShow">
        <div class="popup0">
          <p class="voiceTitle">{{voiceTitle}}</p>
          <div class="time-block">
            <spinner type="lines" class="spinner" v-show="showSpinner"></spinner>
            <span class="time">{{time | judgeTime}}</span>
            <spinner type="lines" class="spinner" v-show="showSpinner"></spinner>
          </div>
          <div class="circle-block" @click="buttonCircleBlock">
            <div class="circle circle1"
                 :class="{bgGreen:bgGreen,bgYellow:bgYellow,bgYellowSquare:bgYellowSquare}"></div><!--红-->
            <div class="circle circle2"></div>
          </div>
          <div class="buttonGroup set-1px-t" v-show="showButtonGroup">
            <div class="close set-1px-r" @click="close">取消</div>
            <div class="save" @click="save">保存</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {Cell, Group, Popup, Spinner, TransferDom, XButton, XInput} from "vux";

  export default {
    name: "recordTypeTape",
    directives: {
      TransferDom
    },
    components: {Group, Cell, XInput, XButton, Popup, Spinner},
    props: {
      params: {
        default: () => {
          return {
            recordTitle: '文本',
            recordDesc: '文本备注',
          }
        }
      }

    },
    data() {
      return {
        showPopup: false,

        voiceRecord: {
          localId: '',
          serverId: ''
        },
        record: {
          localId: '',
          serverId: ''
        },

        downLoadId: '',
        voiceTime: 0,
        time: 0,
        timer: null,

        voiceTitle: '点击录音',
        state: 0,
        bgGreen: false,
        bgYellow: false,
        bgYellowSquare: false,
        showButtonGroup: false,

        luyinText: true,
        showluyinOK: false,
        showReButton: false,

        palyState: 0,

        showSpinner: false,
      };
    },
    computed: {},
    mounted() {
    },
    filters: {
      judgeTime(value) {
        let time = '';
        value < 10 ? time = '0' + value : time = value;
        if (value > 59) {
          time = parseInt(value) - 60;
          console.log(time);
          time < 10 ? time = '0' + time : time;
          return '01:' + time;
        } else {
          return '00:' + time;
        }
      }
    },
    methods: {
      onHide() {
        console.log("hide");
        setTimeout(() => {
          this.state = 0;
          this.voiceTitle = '点击录音';
          this.showSpinner = false;
          this.bgGreen = false;
          this.bgYellow = false;
          this.bgYellowSquare = false;
          this.showButtonGroup = false;
        }, 1000)

      },
      onShow() {
      },
      openPopup() {
        if (this.luyinText === true) {
          this.showPopup = !this.showPopup;
        }
      },
      close() {
        this.showPopup = false;
        this.record = {
          localId: '',
          serverId: ''
        }
      },
      save() {
        this.voiceTime = this.time;
        this.showPopup = false;
        this.luyinText = false;
        this.showluyinOK = true;
        this.showReButton = true;
        if (this.voiceRecord.serverId !== '') {
          // alert("已设置新录音");
          this.$vux.toast.text("已设置新录音", "middle");
        }
        this.voiceRecord = {
          localId: this.record.localId,
          serverId: this.record.serverId
        }
        console.log(this.voiceRecord);
        this.$store.commit('saveRecordData', {
          sortId: this.params.sortId,
          data: {audioMediaId: this.voiceRecord.serverId},
        })
      },
      _reStartRecord() {
        this.showPopup = !this.showPopup;
      },
      _playVoice() {
        let _this = this;
        switch (this.palyState) {
          case 0:
            this.palyState = 1;
            wx.playVoice({
              localId: _this.voiceRecord.localId,
              success: function (res) {
                wx.onVoicePlayEnd({
                  serverId: _this.voiceRecord.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
                  success: function (res) {
                    // var localId = res.localId; // 返回音频的本地ID
                    // alert("播放已停止");
                    _this.$vux.toast.text("播放完毕", "middle");
                    _this.palyState = 0;
                  }
                });
              }
            });
            break;
          case 1:
            this.palyState = 0;
            wx.stopVoice({
              localId: _this.voiceRecord.localId
            });
            break;
        }
      },
      voiceEnd() {
        let _this = this;
        wx.onVoiceRecordEnd({
          // 录音时间超过一分钟没有停止的时候会执行 complete 回调
          complete: function (res) {
            //alert('60秒停止录音');
            _this.record.localId = res.localId;
            clearInterval(_this.timer);
            _this.state = 2;
            _this.voiceTitle = '点击播放';
            _this.showSpinner = false;
            _this.bgGreen = false;
            _this.bgYellow = true;
            _this.showButtonGroup = true;
            _this.upVoice();
          }
        })
      },
      voicePlayEnd() {
        let _this = this;
        wx.onVoicePlayEnd({
          serverId: _this.record.serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
          success: function (res) {
            // var localId = res.localId; // 返回音频的本地ID
            // alert("停止了");
            _this.state = 2;
            _this.voiceTitle = '点击播放';
            _this.showSpinner = false;
            _this.bgGreen = false;
            _this.bgYellow = true;
            _this.bgYellowSquare = false;
            _this.showButtonGroup = true;
          }
        });
      },
      // 上传语音
      upVoice() {
        let _this = this;
        wx.uploadVoice({
          localId: _this.record.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            // alert('上传成功');
            console.log('上传成功');
            _this.record.serverId = res.serverId;// 返回音频的服务器端ID
            // alert(_this.record);
            console.log(_this.record);

          }
        })
      },
      //点击红圆，开始录音
      buttonCircleBlock() {
        let _this = this;
        switch (this.state) {
          case 0://状态为0，表示还未开始录音
            this.time = 0;
            wx.startRecord({
              success: function () {
                // alert('成功调起录音');
                _this.timer = setInterval(() => {
                  _this.time++;
                }, 1000);
                _this.voiceEnd();
              },
              cancel: function () {
                alert('用户拒绝授权录音');
              }
            });
            this.state = 1;
            this.voiceTitle = '正在录音...';
            this.showSpinner = true;
            this.bgGreen = true;
            break;
          case 1://状态为1，表示正在录音中
            wx.stopRecord({
              success: function (res) {
                // alert('停止录音');
                _this.record.localId = res.localId;
                clearInterval(_this.timer);
                console.log(_this.time);
                _this.upVoice();
              },
              fail: function (error) {
                console.log(error)
              }
            });
            this.state = 2;
            this.voiceTitle = '点击播放';
            _this.showSpinner = false;
            this.bgGreen = false;
            this.bgYellow = true;
            this.showButtonGroup = true;

            break;
          case 2://状态为2，表示已停止录音
            wx.playVoice({
              localId: _this.record.localId,
              success: function () {
                _this.voicePlayEnd();
              },
            });
            this.state = 3;
            this.voiceTitle = '正在播放...';
            this.showSpinner = true;
            this.bgGreen = false;
            this.bgYellow = false;
            this.bgYellowSquare = true;
            break;
          case 3://状态为3，表示正在播放录音
            wx.stopVoice({
              localId: _this.record.localId
            });
            this.state = 2;
            this.voiceTitle = '点击播放';
            this.showSpinner = false;
            this.bgGreen = false;
            this.bgYellow = true;
            this.bgYellowSquare = false;
            break;
        }

      }


    }
  };
</script>
