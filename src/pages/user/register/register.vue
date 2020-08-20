<template>
  <form @submit="install_finish">
    <view class="password_wrap">
      <view class="password_line">
        <text class="passd_title">输入用户名</text>
        <input
          name="passd_value"
          type="text"
          class="passd_input"
          placeholder="请输入用户名"
        />
      </view>
      <view class="password_line">
        <text class="passd_title">输入手机号</text>
        <input
          type="number"
          @input="synchr_phone"
          class="passd_input"
          placeholder="请输入手机号"
        />
      </view>
      <view class="password_line">
        <text class="passd_title">输入验证码</text>
        <input
          name="code_value"
          type="number"
          class="passd_input"
          placeholder="请输入手机验证码"
        />
        <button @tap="get_sms_code" :style="none_style">获取验证码</button>
        <button @tap="countdown" class="second" :style="have_style">
          {{ second }}s倒计时
        </button>
      </view>
      <view class="password_line">
        <text class="passd_title">输入密码</text>
        <input
          name="passd_value"
          type="text"
          class="passd_input"
          placeholder="请输入密码"
        />
      </view>
      <view class="password_line">
        <text class="passd_title">确认密码</text>
        <input type="text" class="passd_input" placeholder="请确认密码" />
      </view>
    </view>
    <button form-type="submit" class="set_finish">提交注册</button>
  </form>
</template>

<script>
var app = getApp();
function countdown(that) {
  var second = that.second;
  if (second == 0) {
    that.setData({
      none_style: "display:block;",
      have_style: "display:none;",
      second: 60,
    });
    return;
  }

  var time = setTimeout(function() {
    that.setData({
      second: second - 1,
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
      have_style: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  methods: {
    //手机号同步
    synchr_phone: function(e) {
      var that = this;
      var phone_numb = e.detail.value;
      that.setData({
        phone_numb: phone_numb,
      });
    },
    //获取验证码
    get_sms_code: function(e) {
      var that = this;
      var mobile = that.phone_numb;
      console.log("mobile", mobile);
      var user_info = wx.getStorageSync("userInfo");
      //   var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      var myreg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!mobile) {
        wx.showToast({
          title: "请输入手机号",
          icon: "success",
          duration: 1500,
        });
        return false;
      } else if (!myreg.test(mobile)) {
        wx.showToast({
          title: "手机号格式有误",
          icon: "success",
          duration: 1500,
        });
        return false;
      } else if (mobile.length != 11) {
        wx.showToast({
          title: "手机号长度有误",
          icon: "success",
          duration: 1500,
        });
        return false;
      }

      countdown(this);
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "sms",
          do: "send",
          uid: 2189,
          mobile: mobile,
          key: app.globalData.key,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          that.setData({
            loading: false,
            none_style: "display:none;",
            have_style: "display:block;",
          });

          if (res.data.code == 1) {
            // console.log("3333333333333333333333");
            setTimeout(function() {
              wx.showToast({
                title: res.data.msg,
                icon: "success",
                duration: 1500,
              });
            }, 5000);
          } else {
            // console.log("4444444444444444444444444444");
            wx.showToast({
              title: res.data.msg,
              icon: "success",
              duration: 3000,
            });
          }
        },
      });
    },
    //设置注册按钮
    install_finish: function(e) {
      console.log("要提交", e);
      var that = this;
      var codeValue = e.detail.value.code_value;
      var passdValue = e.detail.value.passd_value;
      var uid = 2189;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "user",
          do: "updatepaypasswd",
          uid: 2189,
          //   passwd: passdValue,
          //   captcha: codeValue,
          //   username:
          //   mobile:
          //   code:
          //   password:
          //   confirm_password:
          key: app.globalData.key,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          console.log("注册", res);
        },
      });
    },
  },
};
</script>
<style>
@import "./register.css";
</style>
