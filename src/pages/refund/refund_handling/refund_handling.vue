<template>
<!--pages/refund/refund_handling/refund_handling.wxml-->
<view class="wrapper">
  <view class="border-height"></view>
  <view class="wrapper-main">
  <view class="cont-main">
   <view class="cont">
    <image src="http://wximage.shedongyun.com/sdo2o/jindu.png" class="cont-img"></image>
    <text class="cont-text">等待商家处理退款申请</text>
    <view class="cont-view" @tap="onChangeShow">
      <image src="http://wximage.shedongyun.com/sdo2o/tui_right.png" class="cont-view-img"></image>
    </view>
    <!--隐藏的部分  -->
    <view :class="'cont-hidden ' + (showView?'onchangeshow':'onchangehide')">
      <view class="hidden">
       <text class="hidden-font">退款申请流程:</text>
       <text class="hidden-font">1.发起退款申请</text>
       <text class="hidden-font">2.商家确认后退款到您的账号 如果商家未处理，请及时与商家联系</text>
      </view>
    </view>
   </view>
  </view>
  <view class="border-height"></view>
  <view class="cont-main">
      <view class="cont">
        <view class="cont-right" style="float:left"><text class="cont-right-font">协商详情</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">处理方式</text>
        <view class="cont-right"><text class="cont-right-font">退款</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">退款原因</text>
        <view class="cont-right"><text class="cont-right-font">{{refund_reason}}</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">退款说明</text>
        <view class="cont-right"><text class="cont-right-font">{{refund_content}}</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">退款金额</text>
        <view class="cont-right"><text class="cont-right-font">{{refund_money}}</text></view>
      </view>
    </view>
    <view class="cont-main">
      <view class="cont">
        <text class="cont-left">申请时间</text>
        <view class="cont-right"><text class="cont-right-font">{{refund_createtime}}</text></view>
      </view>
    </view>
     <view class="apply-main">
     <view class="apply-font" @tap="abolish_cancel">取消申请</view>
  </view>
  </view>
</view>
</template>

<script>
// pages/refund/refund_handling/refund_handling.js
var app = getApp();
var showView;
var order_id;

export default {
  data() {
    return {
      showView: false,
      refund_reason: "",
      refund_content: "",
      refund_money: "",
      refund_createtime: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    showView: options.showView == "true" ? true : false;

    order_id = options.order_id;
  },
  onReady: function () {},
  onShow: function () {
    this.search_detail();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  methods: {
    // 退款退货信息详情
    search_detail: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'refund',
          do: 'info',
          key: app.globalData.key,
          orderid: order_id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              refund_reason: res.data.data.reason,
              refund_content: res.data.data.content,
              refund_money: res.data.data.applyprice,
              refund_createtime: res.data.data.createtime
            });
          } else {}
        }
      });
    },
    // 取消退款申请
    abolish_cancel: function () {
      var that = this;
      var user_info = wx.getStorageSync('userInfo');
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'refund',
          do: 'cancel',
          key: app.globalData.key,
          orderid: order_id,
          openid: user_info.openid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1500
            });
          } else {
            wx.showToast({
              title: '取消申请失败',
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },

    /*显示隐藏事件 */
    onChangeShow: function () {
      var that = this;
      that.setData({
        showView: !that.showView
      });
    }
  }
};
</script>
<style>
@import "./refund_handling.css";
</style>