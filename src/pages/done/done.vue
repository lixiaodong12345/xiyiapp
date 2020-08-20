<template>
<view class="page">
  <view class="order_static">
    <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/success_pay.png"></image>
      <text class="status">卖家已付款</text>
      <text class="status_t">您的订单正在飞速向您运送！</text>
  </view>

  <view class="success_img">
    <view class="success_li">
      <text>收货人：王先生</text>
      <text class="phone">18866411550</text>
    </view>
    <view class="success_li success_lilast">
      <text>收货地址：山东省济南市历下区新闻大厦11L山东省济南市历下区新闻大厦11L</text>
    </view>
    <view class="success_li ">
      <text>实付款：</text><text class="momey_num">￥{{show_price}}52</text>
    </view>
  </view>
  <view class="success_title">
    <view class="xian"></view>
    <view class="success_title_text">
      <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/heart_gray.png"></image>
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
</template>

<script>
var app = getApp();
var show_price;

export default {
  data() {
    return {
      tis: '',
      tisshow: '',
      btn: '',
      copyright: app.globalData.copyright,
      show_price: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var user_info = app.globalData.getUserInfo();
    show_price = options.num;
    console.log('show_price', show_price);
    that.setData({
      show_price: options.num
    });
  },
  methods: {
    blacks: function (e) {
      wx.switchTab({
        url: '/pages/index'
      });
    }
  }
};
</script>
<style>
@import "./done.css";
</style>