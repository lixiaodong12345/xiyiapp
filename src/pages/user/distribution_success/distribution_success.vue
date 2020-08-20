<template>
<view class="wrapper">
  <view class="wrapper_submit">
    <image src="http://wximage.shedongyun.com/sdo2o/submit.png"></image>
  </view>
  <view class="wrapper_text">
    <text>您已经成为分销商！</text>
  </view>
    <navigator url="/pages/index">
  <view class="wrapper_wait" @tap="goindex">
    <view class="wait_cont">
     <text>去商城逛逛</text>
    </view>
  </view>
  </navigator>  
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
    goindex: function () {
      wx.switchTab({
        url: '/pages/index'
      });
    }
  }
};
</script>
<style>
@import "./distribution_success.css";
</style>