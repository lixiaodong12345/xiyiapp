<template>
<!--pages/user/distribution_submit/distribution_submit.wxml-->
<view class="wrapper">
  <view class="wrapper_submit">
    <image src="http://wximage.shedongyun.com/sdo2o/submit.png"></image>
    <text>审核中...</text>
  </view>
  <view class="wrapper_text">
    <text>您的申请已经提交，请等待审核！</text>
  </view>
  <navigator url="/pages/index">
  <view class="wrapper_wait" @tap="goindex">
    <view class="wait_cont">
     <text>先去商城逛逛</text>
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
    /**
     * 跳转到首页
     */
    goindex: function () {
      console.log("gotoindex");
      wx.switchTab({
        url: '/pages/index'
      });
    }
  }
};
</script>
<style>
@import "./distribution_submit.css";
</style>