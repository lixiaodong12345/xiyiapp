<template>
<view>
<!--<import src="../../wxParse/wxParse.wxml"></import>-->
<view class="content">
  <view class="about_us_tect">
     <jyf-parser :html="article_aboutContent"></jyf-parser>
  </view>
</view>
</view>
</template>

<script>

var app = getApp();

export default {
  data() {
    return {
      article_aboutContent: ""
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
            //WxParse.wxParse('aboutContent', 'html', res.data.data.description, that, 5)
            setTimeout(() => {
              that.article_aboutContent = res.data.data.description;
            }, 200);
            that.setData({});
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./about_us.css";
</style>