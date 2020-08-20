<template>
<!--pages/logistics/stateless/stateless.wxml-->
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
     <view class="main-product-title">
       <text class="main-wire"></text>
       <text class="main-text">暂时没有物流信息</text>
       <text class="main-wire"></text>
     </view>
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

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {},

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},

  /*生命周期函数--监听页面显示*/
  onShow: function () {},

  /*生命周期函数--监听页面隐藏*/
  onHide: function () {},

  /* 生命周期函数--监听页面卸载*/
  onUnload: function () {},

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {},

  /*用户点击右上角分享*/
  onShareAppMessage: function () {},
  methods: {}
};
</script>
<style>
@import "./stateless.css";
</style>