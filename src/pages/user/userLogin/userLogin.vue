<template>
  <div>
    <view class="page-section-spacing">
      <swiper
        class="swiper"
        :indicator-color="indicatorColor"
        :indicator-dots="indicatorDots"
      >
        <swiper-item>
          <view class="swiper-item uni-bg-blue headerText">账号密码登录</view>
          <form @submit="account">
            <view class="password_line">
              <text class="passd_title">输入账号</text>
              <input
                type="text"
                :value="userName"
                name="userName"
                class="passd_input"
                placeholder="请输入账号"
              />
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
            <button form-type="submit" class="set_finish left" type="submit">
              登录
            </button>
            <button @tap="forget_password" class="set_finish center">
              忘记密码
            </button>
            <button @tap="register" class="set_finish right">注册</button>
          </form>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue headerText">手机密码登录</view>
          <form @submit="mobile_login">
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
              <text class="passd_title">输入账号密码</text>
              <input
                name="password"
                type="password"
                :value="code"
                class="passd_input"
                placeholder="请输入账号密码"
              />
            </view>
            <button form-type="submit" class="set_finish left">登录</button>
            <button @tap="register" class="set_finish right">注册</button>
          </form>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue headerText">短信验证码登录</view>
          <form @submit="mobileLogin">
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
                placeholder="请输入短信验证码"
              />
              <button @tap="get_sms_code" :style="none_style">
                获取验证码
              </button>
              <button @tap="countdown" class="second" :style="have_style">
                {{ second }}s倒计时
              </button>
            </view>
            <button form-type="submit" class="set_finish left">登录</button>
            <button @tap="register" class="set_finish right">注册</button>
          </form>
        </swiper-item>
      </swiper>
    </view>
    <!-- <view class="cart_null"> -->
    <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="login_skip">去登录</button> -->
    <!-- <button @tap="register" class="login_skip left">登录</button>
      <button @tap="register" class="login_skip right">去注册</button>
    </view> -->
  </div>
</template>

<script>
var app = getApp();
var mobile = "";
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
      mobile: "",
      code: "",
      phone_numb: "",
      userName: "",
      password: "",
      none_style: "",
      have_style: "",
      indicatorDots: true,
      indicatorColor: "#55bcc5",
    };
  },
  created() {},
  mounted() {},
  methods: {
    //忘记密码
    forget_password: function(e) {
      uni.navigateTo({
        url: "/pages/user/forget_password/forget_password",
      });
    },
    // 手机号和密码登录
    mobile_login: function(e) {
      console.log("lskjao", e);
      let mobile = e.detail.value.mobile;
      let password = e.detail.value.password;
      if (mobile == "" && password == "") {
        uni.showToast({
          icon: "none",
          title: "手机号或密码不能为空",
        });
        return;
      }
      uni.request({
        url: app.globalData.domain,
        data: {
          a: "auth",
          do: "mobile_login",
          key: app.globalData.key,
          mobile: mobile,
          password: password,
        },
        success: function(res) {
          if (res.data.code != 1) {
            uni.showToast({
              icon: "none",
              title: res.data.msg,
            });
          } else {
            app.globalData.uid = res.data.data.id;
            uni.showToast({
              icon: "success",
              title: "登录成功",
            });
            setTimeout(function() {
              uni.switchTab({
                url: "/pages/index",
              });
            }, 500);
          }
        },
      });
    },
    //获取验证码
    get_sms_code: function(e) {
      var that = this;
      mobile = that.phone_numb;
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
    //手机验证码登录
    mobileLogin: function(e) {
      let mobile = e.detail.value.mobile;
      let code = e.detail.value.code;
      if (code == "" && password == "") {
        uni.showToast({
          icon: "none",
          title: "手机号或密码不能为空",
        });
        return;
      }
      uni.request({
        url: app.globalData.domain,
        data: {
          a: "auth",
          do: "code_login",
          key: app.globalData.key,
          mobile: mobile,
          code: code,
        },
        success: function(res) {
          if (res.data.code != 1) {
            uni.showToast({
              icon: "none",
              title: res.data.msg,
            });
          } else {
            app.globalData.uid = res.data.data.id;
            uni.showToast({
              icon: "success",
              title: "登录成功",
            });
            setTimeout(function() {
              uni.switchTab({
                url: "/pages/index",
              });
            }, 500);
          }
        },
      });
    },
    //用户输入时校验
    synchr_phone: function(e) {
      var that = this;
      var phone_numb = e.detail.value;
      that.setData({
        phone_numb: phone_numb,
      });
    },
    //用户账号和密码登录
    account: function(e) {
      let that = this;
      let username = "baidu3";
      let password = "baidu3";
      // 这里做了一些修改 输入框的值没有直接赋值
      // let username = e.detail.value.userName;
      // let password = e.detail.value.password;
      if (username == "" && password == "") {
        uni.showToast({
          icon: "none",
          title: "账号或密码不能为空",
        });
        return;
      }
      uni.request({
        url: app.globalData.domain,
        data: {
          a: "auth",
          do: "account_login",
          key: app.globalData.key,
          username: username,
          password: password,
        },
        success: function(res) {
          if (res.data.code != 1) {
            uni.showToast({
              icon: "none",
              title: res.data.msg,
            });
          } else {
            app.globalData.uid = res.data.data.id;
            app.globalData.userInfo = res.data.data;
            uni.showToast({
              icon: "success",
              title: "登录成功",
            });
            // setTimeout(function() {
            //   uni.switchTab({
            //     url: "/pages/index",
            //   });
            // }, 500);
            setTimeout(function() {
              uni.navigateTo({
                url: "/pages/user/account_deposit/account_deposit",
              });
            }, 500);
          }
        },
      });
    },
    register: function() {
      const that = this;
      uni.navigateTo({
        url: "/pages/user/register/register",
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "./userLogin.css";
uni-page {
  overflow: hidden;
}
uni-page-wrapper {
  margin-top: 20rpx;
}
uni-swiper /deep/.uni-swiper-dots-horizontal {
  bottom: 88rpx;
}

.set_finish {
  position: absolute;
  margin-top: 70rpx;
  width: 25%;
  height: 54rpx;
  line-height: 54rpx;
}
button.login_skip {
  position: absolute;
  display: block;
  width: 23%;
  height: 62rpx;
  line-height: 56rpx;
  color: #fff;
  background-color: #55bcc5;
  font-size: 30rpx;
  margin: 80rpx auto;
  border: 1px solid #55bcc5;
  border-radius: 45rpx;
}
.left {
  left: 30rpx;
}
.right {
  right: 30rpx;
}
.center {
  left: 37%;
}
.headerText {
  text-align: center;
}
.swiper {
  height: 400rpx;
}
</style>
