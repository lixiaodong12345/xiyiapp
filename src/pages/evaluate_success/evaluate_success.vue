<template>
<view class="success_wrap">
 <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/depost_success.png" class="depost_success"></image>
 <view class="success_name">评价成功</view>
 <view class="success_send">本次订单获得<text>300</text>积分</view>
 <view class="look_depost" @tap="depost_skip">评价更多订单</view>
 <view class="look_index" @tap="index_skip">返回首页</view>
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
    depost_skip: function () {
      var that = this;
      wx.redirectTo({
        url: '/pages/user/order_list/order_list?order_status=complete'
      });
    },
    index_skip: function () {
      wx.switchTab({
        url: '/pages/index'
      });
    }
  }
};
</script>
<style>
@import "./evaluate_success.css";
</style>