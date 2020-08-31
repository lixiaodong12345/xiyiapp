<template>
  <view class="success_wrap">
    <image
      mode="widthFix"
      src="http://wximage.shedongyun.com/sdo2o/depost_success.png"
      class="depost_success"
    ></image>
    <view class="success_name">充值成功</view>
    <view class="success_money">本次充值金额{{ moneyValue }}元</view>
    <view class="success_send" v-if="stateValue == 1"
      >赠送<text>{{ giveValue }}</text
      >积分</view
    >
    <view class="success_send" v-else-if="stateValue == 2"
      >赠送<text>{{ giveValue }}</text
      >元</view
    >
    <view class="look_depost" @tap="depost_skip">查看明细</view>
    <view class="look_index" @tap="index_skip">返回首页</view>
  </view>
</template>

<script>
var app = getApp();
var lognoid;

export default {
  data() {
    return {
      moneyValue: "",
      stateValue: "",
      giveValue: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
    lognoid = options.lognoid;
    console.log("lognoid++", lognoid);
    that.callback();
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  methods: {
    depost_skip: function() {
      wx.redirectTo({
        url: "/pages/user/expense_detail/expense_detail",
      });
    },
    index_skip: function() {
      wx.switchTab({
        url: "/pages/index",
      });
    },
    //支付成功后回调接口
    callback: function() {
      var that = this;
      console.log("充值成功+++");
      var user_info = app.globalData.userInfo;
      var uid = user_info.uid;
      var recharge_orderid = lognoid;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "recharge",
          do: "recharge_callback",
          key: app.globalData.key,
          uid: uid,
          logno: recharge_orderid,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            console.log("回调成功+++", res);
            that.setData({
              moneyValue: res.data.data.money,
              stateValue: res.data.data.status,
              giveValue: res.data.data.give,
            });
          }
        },
      });
    },
  },
};
</script>
<style>
@import "./account_success.css";
</style>
