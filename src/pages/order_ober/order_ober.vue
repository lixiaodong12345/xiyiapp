<template>
<view class="page">
  <view class="order_static">
      <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/success_sub.png"></image>
      <text class="status">交易成功</text>
  </view>
<view class="position_box">
  <view class="success_title">
    <view class="xian"></view>
    <view class="success_title_text">
      <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/heart_white.png"></image>
      <text>本次消费获得</text>
    </view>
  </view>
  <view class="success_coupon_box">
    <view class="success_coupon">
      <view class="success_coupon_left">
        <view class="success_money">
          <text class="aa">¥</text>
          <text class="bb">49</text>
        </view>
        <view class="success_conditions">
          <text>满798元使用</text>
        </view>
      </view>
      <view class="success_coupon_mid">
        <text class="title">仅限果蔬商超红包</text>
        <text class="date">2018-06-28到期</text>
      </view>
      <view class="success_coupon_right">
        <text>查看</text>
      </view>
    </view>
  </view>
    <view class="back_index" :data-money="show_price" @tap="blacks">返回首页</view>
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
@import "./order_ober.css";
</style>