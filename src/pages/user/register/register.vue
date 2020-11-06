<template>
  <form @submit="install_finish">
    <view class="password_wrap">
      <view class="password_line">
        <text class="passd_title">输入用户名</text>
        <input
          name="username"
          type="text"
          @blur="loseBlur"
          :value="username"
          class="passd_input"
          placeholder="请输入用户名"
        />
      </view>
      <view class="password_line">
        <text class="passd_title">输入手机号</text>
        <input
          type="number"
          :value="mobile"
          name="mobile"
          @input="synchr_phone"
          class="passd_input"
          placeholder="请输入手机号"
        />
      </view>
      <view class="password_line">
        <text class="passd_title">输入验证码</text>
        <input
          name="code"
          type="number"
          :value="code"
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
          name="password"
          type="password"
          :value="password"
          class="passd_input"
          placeholder="请输入密码"
        />
      </view>
      <view class="password_line">
        <text class="passd_title">确认密码</text>
        <input
          name="confirm_password"
          type="password"
          :value="confirm_password"
          class="passd_input"
          placeholder="请确认密码"
        />
      </view>
    </view>
    <button form-type="submit" class="set_finish">提交注册</button>
  </form>
</template>

<script>
import md5 from "../../../static/js/md5";
var app = getApp();
var username = "";
var code = "";
var mobile = "";
var password = "";
var confirm_password = "";
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
      username: "",
      code: "",
      mobile: "",
      password: "",
      confirm_password: "",
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
    //用户名输入框失去焦点时判断
    /**
     * @params loseBlur 用户名是否被注册
     */
    loseBlur: function(e) {
      wx.request({
        url: "http://wsxy.sns318.net/merchant/index.php?c=ewei_o2o",
        data: {
          a: "auth",
          do: "chenk_name",
          key: app.globalData.key,
          username: e.detail.value,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          console.log("结果", res);
        },
      });
    },
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
      mobile = that.phone_numb;
      console.log("that.phone_numb", that.phone_numb);
      // var user_info = app.globalData.userInfo;
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
          do: "send_code",
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
            setTimeout(function() {
              wx.showToast({
                title: res.data.msg,
                icon: "success",
                duration: 1500,
              });
            }, 5000);
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "success",
              duration: 3000,
            });
          }
        },
      });
    },
    //提交注册按钮
    install_finish: function(e) {
      var that = this;
      // uni.navigateTo({
      //   url: "/pages/user/userLogin/userLogin",
      // });
      var user_code = /^(?!\d+$)(?![a-z]+$)[a-z0-9]{6,18}$/;
      // var codeValue = e.detail.value.code_value;
      // var passdValue = e.detail.value.passd_value;
      username = e.detail.value.username;
      password = e.detail.value.password;
      code = e.detail.value.code;
      mobile = e.detail.value.mobile;
      confirm_password = e.detail.value.confirm_password;
      if (username == "") {
        uni.showToast({
          title: "用户名不能为空",
          icon: "none",
          duration: 1500,
        });
        return;
      } else if (!user_code.test(username)) {
        uni.showToast({
          title: "账号为小写字母加数字6-18",
          icon: "none",
          duration: 1500,
        });
        return;
      } else if (password == "") {
        uni.showToast({
          title: "密码不能为空",
          icon: "none",
          duration: 1500,
        });
        return;
      } else if (mobile == "") {
        uni.showToast({
          title: "手机不能为空",
          icon: "none",
          duration: 1500,
        });
        return;
      } else if (code == "") {
        uni.showToast({
          title: "验证码不能为空",
          icon: "none",
          duration: 1500,
        });
        return;
      } else if (confirm_password != password) {
        uni.showToast({
          title: "两次密码不同",
          icon: "none",
          duration: 1500,
        });
        return;
      }
      wx.request({
        // method: "POST",
        // url: app.globalData.domain,
        // url: "http://wsxy.sns318.net/merchant/index.php",
        url: app.globalData.domain,
        data: {
          a: "auth",
          do: "register",
          key: app.globalData.key,
          password: password,
          code: code,
          mobile: mobile,
          confirm_password: confirm_password,
          username: username,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          // console.log("注册", res);
          if (res.data.code === 0) {
            wx.showToast({
              icon: "none",
              title: "注册成功,请去登录",
            });
            setTimeout(function() {
              uni.navigateTo({
                url: "/pages/user/userLogin/userLogin",
              });
            }, 500);
          } else if (res.data.code === 1) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2001) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2002) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2003) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2004) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2005) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2006) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2007) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2010) {
            wx.showToast({
              title: res.data.msg,
            });
          } else if (res.data.code === 2011) {
            wx.showToast({
              title: res.data.msg,
            });
          }
        },
      });
    },
  },
};
</script>
<style>
@import "./register.css";
</style>
