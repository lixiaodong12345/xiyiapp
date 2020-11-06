<template>
<form @submit="install_finish">
  <view class="password_wrap">
    <view class="password_line">
      <text class="passd_title">重置密码</text>
      <input name="passd_value" type="password" :value="password" class="passd_input" placeholder="请输入密码"></input>
    </view>
    <view class="password_line">
      <text class="passd_title">确认密码</text>
      <input type="password" class="passd_input" name="confirm_password" :value="confirm_password" placeholder="请确认密码"></input>
    </view>
  </view>
  <view class="tips_name">注:重置密码用于用户登录密码</view>
  <button form-type="submit" class="set_finish">提交</button>
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
      code:'',
      mobile:'',
      none_style: "",
      password:'',
      confirm_password:'',
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
      that.setData({
        phone_numb: phone_numb
      });
    },
    //获取验证码
    get_sms_code: function (e) {
      var that = this;
      var mobile = that.phone_numb;
      // console.log('mobile', mobile);
      // var user_info = app.globalData.userInfo;
      // var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
      var myreg = /^1(3|4|5|6|7|8|9)\d{9}$/;
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
          do: 'send_code',
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
            setTimeout(function () {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1500
              });
            }, 5000);
          } else {
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
      let that = this;
      let mobile = e.detail.value.mobile;
      let code = e.detail.value.code;
      // var uid = app.globalData.userInfo.id;
      let password = e.detail.value.passd_value
      let confirm_password = e.detail.value.confirm_password
      if(password != '' && confirm_password != ''){
        wx.request({
          url: app.globalData.domain,
          data: {
            a: 'auth',
            do: 'change_password',
            key: app.globalData.key,
            password:password,
            confirm_password:confirm_password
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log('res',res)
            if (res.data.code == 1) {
              wx.showToast({
                title: '设置密码成功',
                duration: 2000
              });
              uni.switchTab({
                  url:'/pages/user/index'
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                duration: 2000
              });
            }
          },
        });
      }else{
        uni.showToast({
          title: '请填写信息',
          icon: "none",
          duration: 1500,
        });
      }
      
    }
  }
};
</script>
<style>
@import "../forget_password/forget_password.css";
</style>