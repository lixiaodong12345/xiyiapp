<template>
<view class="container">
  <view class="withdraw_cont">
   <image src="http://wximage.shedongyun.com/sdo2o/withdraw_success.png" class="withdraw_logo"></image>
   <view class="withdraw_font">申请成功</view>
   <view class="withdraw_confirm" @tap="skip_center">完成</view>
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    skip_center: function () {
      wx.navigateTo({
        url: '/pages/user/distribution_center/distribution_center'
      });
    }
  }
};
</script>
<style>
@import "./distribut_success.css";
</style>