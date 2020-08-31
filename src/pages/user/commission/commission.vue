<template>
  <view>
    <!--pages/user/commission/commission.wxml-->
    <view class="commission_amount">
      <text class="name">累计佣金:</text>
      <text class="num">{{ commission.total }}元</text>
    </view>
    <view class="border006"></view>
    <view class="withdrawals_money">
      <text class="wm_tx01">可提现佣金</text>
      <text class="wm_tx02" style="color:#FE5455;"
        >{{ commission.wait }}元</text
      >
    </view>
    <view class="border006"></view>
    <view class="withdrawals_money">
      <text class="wm_tx01">已申请佣金</text>
      <text class="wm_tx02">{{ commission.apply }}元</text>
    </view>
    <view class="withdrawals_money">
      <text class="wm_tx01">待打款佣金</text>
      <text class="wm_tx02">{{ commission.applyed }}元</text>
    </view>
    <view class="withdrawals_money">
      <text class="wm_tx01">无效佣金</text>
      <text class="wm_tx02">{{ commission.no_use }}元</text>
    </view>
    <view class="withdrawals_money">
      <text class="wm_tx01">成功提现佣金</text>
      <text class="wm_tx02">{{ commission.payed }}元</text>
    </view>
    <view class="border006"></view>
    <view class="withdrawals_money">
      <text class="wm_tx01">待收货佣金</text>
      <text class="wm_tx02">{{ commission.received }}元</text>
    </view>
    <!--<view class="withdrawals_money">
    <text class="wm_tx01">未结算佣金</text>
    <text class="wm_tx02">0.00元</text>
</view>-->
    <view class="border006"></view>
    <view class="txt_all">
      <text class="txt_002"
        >买家确认收货后，立即获得佣金,3天后佣金可提现！</text
      >
      <view class="txt_003"
        ><image
          mode="widthFix"
          src="http://wximage.shedongyun.com/sdo2o/pomit.png"
        ></image
        >可用佣金满{{ commission.withdraw }}元后才能申请提现</view
      >
    </view>
    <view class="border006"></view>
    <button class="btn_1" :data-money="commission.wait" @tap="getMoney">
      申请提现
    </button>
  </view>
</template>

<script>
// pages/user/commission/commission.js
var app = getApp();

export default {
  data() {
    return {
      commission: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    this.commission_info();
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  methods: {
    /**
     * 查询佣金数据
     */
    commission_info: function() {
      var user_info = app.globalData.userInfo;
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "commission",
          do: "commission",
          uid: user_info.id,
          key: app.globalData.key,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          console.log("返回值", res);

          if (res.data.code == 1) {
            that.setData({
              commission: res.data.data,
            });
          } // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'success',
          //   duration: 500
          // })
        },
      });
    },
    getMoney: function(e) {
      console.log("申请提现+++", e);
      var money = e.currentTarget.dataset.money;
      var that = this;
      var num = that.commission.withdraw;

      if (money < num) {
        wx.showToast({
          title: "佣金不足以提现",
          icon: "",
          duration: 2000,
        });
        return;
      }

      wx.navigateTo({
        url: "/pages/user/distribution_wait/distribution_wait?money=" + money,
      });
    },
  },
};
</script>
<style>
@import "./commission.css";
</style>
