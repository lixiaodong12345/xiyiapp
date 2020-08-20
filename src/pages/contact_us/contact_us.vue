<template>
<view class="content">
  <view class="contact_us_logo">
    <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/contact_us.png"></image>
  </view>
  <view class="contact_us_list">
    <view class="contact_us_listbox">
      <view class="contact_us_li">
        <image mode="widthFix" class="li_img" src="http://wximage.shedongyun.com/sdo2o/wx01.png"></image>
        <view class="contact_us_libox">
          <text class="title">微信</text>
          <text class="text">{{wechat}}</text>
        </view>
      </view>
      <view class="contact_us_li">
        <image mode="widthFix" class="li_img" src="http://wximage.shedongyun.com/sdo2o/qq01.png"></image>
        <view class="contact_us_libox">
          <text class="title">QQ</text>
          <text class="text">{{qq}}</text>
        </view>
      </view>
      <view class="contact_us_li">
        <image mode="widthFix" class="li_img" src="http://wximage.shedongyun.com/sdo2o/phone01.png"></image>
        <view class="contact_us_libox" @tap="phone_call" :data-phone="phone">
          <text class="title">电话</text>
          <text class="text" @tap="phone_call">{{phone}}</text>
        </view>
      </view>
      <view class="contact_us_li">
        <image mode="widthFix" class="li_img" src="http://wximage.shedongyun.com/sdo2o/location01.png"></image>
        <view class="contact_us_libox">
          <text class="title">地址</text>
          <text class="text">{{address}}</text>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      wechat: "",
      qq: "",
      phone: "",
      address: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {
    var that = this;
    that.about_list();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  methods: {
    about_list: function () {
      var that = this;
      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'shop',
          do: 'shop_introduce',
          key: app.globalData.key
        },
        success: function (res) {
          console.log('+++', res);

          if (res.data.code == 1) {
            that.setData({
              wechat: res.data.data.wechat,
              qq: res.data.data.qq,
              phone: res.data.data.phone,
              address: res.data.data.address
            });
          }
        }
      });
    },
    phone_call: function (e) {
      var that = this;
      var phone_nmuber = e.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone_nmuber
      });
    }
  }
};
</script>
<style>
@import "./contact_us.css";
</style>