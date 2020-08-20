<template>
<view class="wrapper">
  <view class="border-height"></view>
  <view class="wrapper-main">

    <view class="cont-main">
      <view class="cont">
        <view class="cont-left">
         <image src="http://wximage.shedongyun.com/sdo2o/wechat_banner.png" class="cont-left-img"></image>
        </view>
        <view class="cont-right">
         <view class="cont-right-title">
           物流状态<text class="cont-right-title-color">未签收</text>
         </view>
         <text class="cont-right-cont">快递：韵达快递</text>
         <text class="cont-right-cont">运单编号：09876543211234567</text>
        </view>
      </view>
    </view>

    <view class="border-height"></view>
    <view class="wrapper-matter">

      <view class="baoguo">
        <view class="matter-left">
          <text class="matter-left-line"></text>
          <text class="matter-left-circle-finish"></text>
        </view>
        <view class="matter-right">
          <text class="matter-right-font matter-right-font-finish">[济南市]在山东济南历下区泉城广场公司进行签收扫描，快件已被 已签收 签收，感谢使用韵达快递，期待再次为您服务</text>
          <text class="matter-right-time matter-right-time-finish">2017-05-12 11:11:11</text>
        </view>
      </view>

      <view class="baoguo">
        <view class="matter-left">
          <text class="matter-left-line"></text>
          <text class="matter-left-circle"></text>
        </view>
        <view class="matter-right">
          <text class="matter-right-font">[济南市]山东济南历下区泉城广场公司派件员：张宁15726123757正在为您派件</text>
          <text class="matter-right-time">2017-05-12 11:11:11</text>
        </view>
      </view>

      <view class="baoguo">
        <view class="matter-left">
          <text class="matter-left-line"></text>
          <text class="matter-left-circle"></text>
        </view>
        <view class="matter-right">
          <text class="matter-right-font">包裹正在等待揽收</text>
          <text class="matter-right-time">2017-05-12 11:11:11</text>
        </view>
      </view>

    </view><!--wrapper-matter-->

  <!--wrapper-main结束  -->
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
  methods: {}
};
</script>
<style>
@import "./stateful.css";
</style>