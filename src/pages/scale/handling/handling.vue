<template>
  <!--pages/scale/handling/handling.wxml-->
  <view class="wrapper">
    <view class="border-height"></view>
    <view class="wrapper-main">
      <view class="cont-main">
        <view class="cont">
          <image
            src="http://wximage.shedongyun.com/sdo2o/jindu.png"
            class="cont-img"
          ></image>
          <text class="cont-text">等待商家处理售后申请</text>
          <view class="cont-view" @tap="onChangeShow">
            <image
              src="http://wximage.shedongyun.com/sdo2o/tui_right.png"
              class="cont-view-img"
            ></image>
          </view>
          <!--隐藏的部分-->
          <view
            :class="
              'cont-hidden ' + (showView ? 'onchangeshow' : 'onchangehide')
            "
          >
            <view class="hidden">
              <text class="hidden-font">退货退款申请流程:</text>
              <text class="hidden-font">1.发起退货退款申请</text>
              <text class="hidden-font"
                >2.退货需将退货商品邮寄至商家制定地址，并在系统内输入快递单号</text
              >
              <text class="hidden-font">3.商家收货后确认无误</text>
              <text class="hidden-font">4.退款到您的账户</text>
            </view>
          </view>
        </view>
      </view>
      <view class="border-height"></view>
      <view class="cont-main">
        <view class="cont">
          <view class="cont-right" style="float:left"
            ><text class="cont-right-font">协商详情</text></view
          >
        </view>
      </view>
      <view class="cont-main">
        <view class="cont">
          <text class="cont-left">处理方式</text>
          <view class="cont-right"
            ><text class="cont-right-font">退货退款</text></view
          >
        </view>
      </view>
      <view class="cont-main">
        <view class="cont">
          <text class="cont-left">退款原因</text>
          <view class="cont-right"
            ><text class="cont-right-font">{{ refund_reason }}</text></view
          >
        </view>
      </view>
      <view class="cont-main">
        <view class="cont">
          <text class="cont-left">退款说明</text>
          <view class="cont-right"
            ><text class="cont-right-font">{{ refund_content }}</text></view
          >
        </view>
      </view>
      <view class="cont-main">
        <view class="cont">
          <text class="cont-left">退款金额</text>
          <view class="cont-right"
            ><text class="cont-right-font">{{ refund_money }}</text></view
          >
        </view>
      </view>
      <view class="cont-main">
        <view class="cont">
          <text class="cont-left">申请时间</text>
          <view class="cont-right"
            ><text class="cont-right-font">{{ refund_createtime }}</text></view
          >
        </view>
      </view>
      <view class="apply-main">
        <view class="apply-font" @tap="titijiao">取消申请</view>
      </view>
    </view>
  </view>
</template>

<script>
// pages/scale/handling/handling.js
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
      refund_createtime: "",
    };
  },

  components: {},
  props: {},

  /*生命周期函数--监听页面加载*/
  onLoad: function(options) {
    showView: options.showView == "true" ? true : false;

    order_id = options.order_id;
    console.log(order_id + "传过来的订单id号");
  },

  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function() {},

  /*生命周期函数--监听页面显示*/
  onShow: function() {
    this.search_detail();
  },

  /* 生命周期函数--监听页面隐藏*/
  onHide: function() {},

  /* 生命周期函数--监听页面卸载*/
  onUnload: function() {},

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function() {},

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function() {},

  /* 用户点击右上角分享*/
  onShareAppMessage: function() {},
  methods: {
    // 退款退货信息详情
    search_detail: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: "ewei_shopv2",
          a: "refund",
          do: "info",
          key: app.globalData.key,
          orderid: order_id,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              refund_reason: res.data.data.reason,
              refund_content: res.data.data.content,
              refund_money: res.data.data.applyprice,
              refund_createtime: res.data.data.createtime,
            });
          } else {
          }
        },
      });
    },
    // 取消退款申请
    abolish_cancel: function() {
      var that = this;
      var user_info = app.globalData.getUserInfo();
      wx.request({
        url: app.globalData.domain,
        data: {
          c: "ewei_shopv2",
          a: "refund",
          do: "cancel",
          key: app.globalData.key,
          orderid: order_id,
          uid: user_info.uid,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            console.log("取消退款申请成功");
            wx.showToast({
              title: res.data.msg,
              icon: "success",
              duration: 5000,
            });
          } else {
            console.log("取消退款申请失败");
            wx.showToast({
              title: "取消退款申请失败",
              icon: "success",
              duration: 5000,
            });
          }
        },
      });
    },

    /*显示隐藏事件 */
    onChangeShow: function() {
      var that = this;
      that.setData({
        showView: !that.showView,
      });
    },
    titijiao: function() {
      uni.navigateTo({
        url: "/pages/scale/number/number",
      });
    },
  },
};
</script>
<style>
@import "./handling.css";
</style>
