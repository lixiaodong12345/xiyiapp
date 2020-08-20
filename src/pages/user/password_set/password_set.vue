<template>
<form @submit="install_finish">
<view class="password_wrap">
  <view class="password_line">
    <text class="passd_title">输入手机号</text>
    <input type="number" @input="synchr_phone" class="passd_input" placeholder="请输入手机号"></input>
  </view>
  <view class="password_line">
    <text class="passd_title">输入验证码</text>
    <input name="code_value" type="number" class="passd_input" placeholder="请输入手机验证码"></input>
    <button @tap="get_sms_code" :style="none_style">获取验证码</button>
    <button @tap="countdown" class="second" :style="have_style">{{second}}s倒计时</button> 
  </view>
  <view class="password_line">
    <text class="passd_title">设置支付密码</text>
    <input name="passd_value" type="number" class="passd_input" placeholder="请输入6位支付密码"></input>
  </view>
  <view class="password_line">
    <text class="passd_title">重复支付密码</text>
    <input type="number" class="passd_input" placeholder="请重复输入支付密码"></input>
  </view>
</view>
<view class="tips_name">注:支付密码用于余额支付和积分支付使用</view>
<button form-type="submit" class="set_finish">设置完成</button>
</form>
</template>

<script>
var app = getApp();
function countdown(that) {
  var second = that.second;
  if (second == 0) {
    that.setData({
      none_style: 'display:block;',
      have_style: 'display:none;',
      second: 60
    });
    return;
  }

  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }, 1000);
}

export default {
  data() {
    return {
      second: 60,
      phone_numb: "",
      loading: false,
      none_style: "",
      have_style: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  methods: {
    //手机号同步
    synchr_phone: function (e) {
      var that = this;
      var phone_numb = e.detail.value;
      console.log('同步手机号', phone_numb);
      that.setData({
        phone_numb: phone_numb
      });
    },
    //获取验证码
    get_sms_code: function (e) {
      var that = this;
      var mobile = that.phone_numb;
      console.log('mobile', mobile);
      var user_info = wx.getStorageSync('userInfo');
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

      if (!mobile) {
        wx.showToast({
          title: "请输入手机号",
          icon: 'success',
          duration: 1500
        });
        return false;
      } else if (!myreg.test(mobile)) {
        wx.showToast({
          title: '手机号格式有误',
          icon: 'success',
          duration: 1500
        });
        return false;
      } else if (mobile.length != 11) {
        wx.showToast({
          title: '手机号长度有误',
          icon: 'success',
          duration: 1500
        });
        return false;
      }

      countdown(this);
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'sms',
          do: 'send',
          uid: user_info.id,
          mobile: mobile,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            loading: false,
            none_style: 'display:none;',
            have_style: 'display:block;'
          });

          if (res.data.code == 1) {
            console.log("3333333333333333333333");
            setTimeout(function () {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1500
              });
            }, 5000);
          } else {
            console.log("4444444444444444444444444444");
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            });
          }
        }
      });
    },
    //设置请求按钮
    install_finish: function (e) {
      console.log('要提交了',e)
      var that = this;
      var codeValue = e.detail.value.code_value;
      var passdValue = e.detail.value.passd_value;
      var uid = wx.getStorageSync('userInfo').id;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'user',
          do: 'updatepaypasswd',
          uid: uid,
          passwd: passdValue,
          captcha: codeValue,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            wx.showToast({
              title: '设置密码成功',
              duration: 2000
            });
          } else {}
        }
      });
    }
  }
};
</script>
<style>
@import "./password_set.css";
</style>