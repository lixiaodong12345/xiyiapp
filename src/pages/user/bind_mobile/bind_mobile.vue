<template>
<!--pages/user/bind_mobile/bind_mobile.wxml-->
<form @submit="bind_mobile">
<view class="password_wrap">
  <view class="mobile">
    <text class="mobile_tx1">输入手机号</text>
    <input type="text" id="mobile" name="mobile" @blur="bindBlur" placeholder="请输入您的手机号"></input>
  </view>
  <view class="mobile none_botton">
    <text class="mobile_tx1">验证码</text>
    <input type="text" class="tx1" name="captcha" placeholder="请输入验证码"></input>
    <button @tap="get_sms_code" :style="none_style">获取验证码</button>
    <button @tap="countdown" class="second" :style="have_style">{{second}}s倒计时</button> 
  </view>
  </view>
  <button form-type="submit" class="set_finish">立即绑定</button>
</form>
</template>

<script>
// pages/user/bind_mobile/bind_mobile.js
var app = getApp();
var inputContent = {};
function countdown(that) {
  var second = that.data.second;

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
      loading: false,
      inputContent: {},
      second: 60,
      none_style: "",
      have_style: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 请求记录
    var that = this;
    var user_info = app.globalData.getUserInfo();
  },
  onReady: function () {// 页面渲染完成
  },
  onShow: function () {// 页面显示
  },
  onHide: function () {// 页面隐藏
  },
  onUnload: function () {// 页面关闭
  },
  methods: {
    bindBlur: function (e) {
      inputContent[e.currentTarget.id] = e.detail.value;
    },
    //绑定手机号
    bind_mobile: function (e) {
      console.log(e);
      var that = this;
      var user_info = app.globalData.getUserInfo();
      that.setData({
        loading: true
      });
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'user',
          do: 'checkmobile',
          uid: user_info.id,
          openid: user_info.openid,
          mobile: e.detail.value.mobile,
          captcha: e.detail.value.captcha,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            loading: false
          }); // console.log(res);

          if (res.data.code == 1) {
            wx.setStorageSync('userInfo', '');
            wx.switchTab({
              url: '/pages/user/index?phone_type=1'
            });
            console.log("55555555555555555555555555555555555");
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
          } else {
            console.log("6666666666666666666666666666666666");
            that.setData({});
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
          }
        }
      });
    },
    //获取验证码
    get_sms_code: function (e) {
      var that = this;
      var mobile = inputContent.mobile;
      var user_info = app.globalData.getUserInfo();
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

      that.setData({
        loading: true
      });
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
            that.setData({});
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 3000
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./bind_mobile.css";
</style>