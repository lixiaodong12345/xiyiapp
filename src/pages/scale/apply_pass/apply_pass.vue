<template>
<!--pages/scale/apply_pass/spply_pass.wxml-->
<view class="wrapper">
  <view class="border-height"></view>
  <view class="wrapper-main">
  <view class="cont-main">
   <view class="cont">
    <image src="http://wximage.shedongyun.com/sdo2o/jindu.png" class="cont-img"></image>
    <text class="cont-text">商家已经通过售后申请</text>
    <view class="cont-view" @tap="onChangeShow">
      <image src="http://wximage.shedongyun.com/sdo2o/tui_right.png" class="cont-view-img"></image>
    </view>
    <!--隐藏的部分  -->
    <view :class="'cont-hidden ' + (showView?'onchangeshow':'onchangehide')">
      <view class="hidden">
       <text class="hidden-font">退货退款申请流程:</text>
       <text class="hidden-font">1.发起退货退款申请</text>
       <text class="hidden-font">2.退货需将退货商品邮寄至商家制定地址，并在系统内输入快递单号</text>
       <text class="hidden-font">3.商家收货后确认无误</text>
       <text class="hidden-font">4.退款到您的账户</text>
      </view>
    </view>
   </view>
  </view>
  <view class="border-height"></view>
  <view class="cont-main-address">
   <view class="cont-address">
     <image src="http://wximage.shedongyun.com/sdo2o/address.png" class="cont-address-img"></image>
     <text class="cont-address-font">退货地址</text>
   </view>
   <view class="cont-address" style="border:none;">
     <text class="cont-address-second">地址：山东省济南市历城区二环东路0685号</text>
     <text class="cont-address-second">张三  15002545568  15002545568</text>
   </view>
  </view>

  <view class="border-height"></view>
  <view class="cont-main">
      <view class="cont">
        <text class="cont-left">退货状态</text>
        <view class="cont-right" style="text-align:right;">
         <text class="cont-right-font" style="vertical-align:middle;">须填写快递单号</text>
         <image src="http://wximage.shedongyun.com/sdo2o/tui_right.png" class="cont-right-icon"></image>
         </view>
      </view>
    </view>

  <view class="cont-main">
      <view class="cont">
        <view class="cont-right" style="float:left"><text class="cont-right-font">协商详情</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">处理方式</text>
        <view class="cont-right"><text class="cont-right-font">退货退款</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">退款原因</text>
        <view class="cont-right"><text class="cont-right-font">买重复了</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">退款说明</text>
        <view class="cont-right"><text class="cont-right-font">无</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">退款金额</text>
        <view class="cont-right"><text class="cont-right-font">50.00元</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">申请时间</text>
        <view class="cont-right"><text class="cont-right-font">2017.06.23 23:00:43</text></view>
      </view>
    </view>
     <view class="apply-main">
     <view class="apply-font">取消申请</view>
     <view class="apply-font apply-font-first" @tap="titijiao">填写快递单号</view>
  </view>
  </view>
</view>
</template>

<script>
// pages/scale/apply_pass/spply_pass.js
var showView;

export default {
  data() {
    return {
      showView: false
    };
  },

  components: {},
  props: {},

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    showView: options.showView == "true" ? true : false;
  },

  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},

  /*生命周期函数--监听页面显示*/
  onShow: function () {},

  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {},

  /* 生命周期函数--监听页面卸载*/
  onUnload: function () {},

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {},

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {},
  methods: {
    /*显示隐藏事件 */
    onChangeShow: function () {
      var that = this;
      that.setData({
        showView: !that.showView
      });
    },
    titijiao: function () {
      wx.redirectTo({
        url: '/pages/scale/number/number'
      });
    }
  }
};
</script>
<style>
@import "./apply_pass.css";
</style>