<template>
  <view class="password_wrap">
    <view class="password_line" @tap="passd_skip">
      <text class="passd_title">设置支付密码</text>
      <image
        src="/static/static/images/set_right.png"
        class="set_right"
      ></image>
      <text class="passd_set">未设置</text>
    </view>
    <!-- <view class="password_line">
    <text class="passd_title">修改支付密码</text>
    <image src="/static/static/images/set_right.png" class="set_right"></image>
    <text class="passd_set">去修改</text>
  </view> -->
    <view class="password_line" @tap="mobile_skip">
      <text class="passd_title">绑定手机号</text>
      <image
        src="/static/static/images/set_right.png"
        class="set_right"
      ></image>
      <text class="passd_set">未绑定</text>
    </view>
    <view class="password_line" @tap="forget_password">
      <text class="passd_title">修改密码</text>
      <image
        src="/static/static/images/set_right.png"
        class="set_right"
      ></image>
      <text class="passd_set">去修改</text>
    </view>
    <view class="password_line" @tap="modification_mobile">
      <text class="passd_title">修改手机号</text>
      <image
        src="/static/static/images/set_right.png"
        class="set_right"
      ></image>
      <text class="passd_set">去修改</text>
    </view>
    <view class="password_line" @tap="user_out">
      <text class="passd_title">退出登录</text>
      <image
        src="/static/static/images/set_right.png"
        class="set_right"
      ></image>
      <text class="passd_set">退出</text>
    </view>
    <!-- <view class="password_line" @tap="mobile_skip">
      <text class="passd_title">修改用户名</text>
      <image
        src="/static/static/images/set_right.png"
        class="set_right"
      ></image>
      <text class="passd_set">去修改</text>
    </view> -->
  </view>
</template>

<script>
var app = getApp();
export default {
  data() {
    return {};
  },

  components: {},
  props: {},
  onLoad: function(options) {
    console.log("一斤页面", app.globalData.uid);
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  methods: {
    //用户点击退出
    user_out: function(e) {
      if (app.globalData.uid) {
        uni.showModal({
          title: "您确定退出吗?",
          success: function(res) {
            if (res["cancel"]) {
            } else {
              app.globalData.uid = "";
              uni.reLaunch({
                url: "/pages/user/index",
              });
            }
          },
        });
      } else {
        uni.showToast({
          title: "请先去登录",
          icon: "none",
        });
      }
    },
    passd_skip: function() {
      var that = this;
      wx.navigateTo({
        url: "/pages/user/password_set/password_set",
      });
    },
    mobile_skip: function() {
      var that = this;
      wx.navigateTo({
        url: "/pages/user/bind_mobile/bind_mobile",
      });
    },
    modification_mobile: function() {
      var that = this;
      wx.navigateTo({
        url: "/pages/user/modification_mobile/modification_mobile",
      });
    },
    forget_password: function() {
      var that = this;
      wx.navigateTo({
        url: "/pages/user/forget_password/forget_password",
      });
    },
  },
};
</script>
<style>
@import "./password_index.css";
</style>
