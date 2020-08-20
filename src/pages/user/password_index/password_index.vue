<template>
<view class="password_wrap">
  <view class="password_line" @tap="passd_skip">
    <text class="passd_title">设置支付密码</text>
    <image src="/static/static/images/set_right.png" class="set_right"></image>
    <text class="passd_set">未设置</text>
  </view>
  <view class="password_line">
    <text class="passd_title">修改支付密码</text>
    <image src="/static/static/images/set_right.png" class="set_right"></image>
    <text class="passd_set">去修改</text>
  </view>
  <view class="password_line" @tap="mobile_skip">
    <text class="passd_title">绑定手机号</text>
    <image src="/static/static/images/set_right.png" class="set_right"></image>
    <text class="passd_set">未绑定</text>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  methods: {
    passd_skip: function () {
      var that = this;
      wx.navigateTo({
        url: '/pages/user/password_set/password_set'
      });
    },
    mobile_skip: function () {
      var that = this;
      wx.navigateTo({
        url: '/pages/user/bind_mobile/bind_mobile'
      });
    }
  }
};
</script>
<style>
@import "./password_index.css";
</style>