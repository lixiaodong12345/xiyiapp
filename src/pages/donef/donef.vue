<template>
<view>
    <view class="success_img">
     <image src="http://wximage.shedongyun.com/sdo2o/falsess.png" class="success_icon"></image>
     <text class="success_text">支付失败</text>
    </view>
    <view>
        <text @tap="blacks" class="warn_button">返回首页</text>
        <text @tap="order_skip" class="warn_button">重新支付</text>
    </view>
</view>
</template>

<script>
var app = getApp();
var ids;

export default {
  data() {
    return {
      tis: '',
      tisshow: '',
      btn: '',
      copyright: app.globalData.copyright
    };
  },

  components: {},
  props: {},
  onLoad: function (query) {
    var that = this;
    var user_info = app.globalData.userInfo;
    ids = query.order_id;
  },
  methods: {
    blacks: function () {
      wx.switchTab({
        url: '/pages/index',
        success: function (res) {// success
        }
      });
    },
    order_skip: function () {
      var that = this;
      wx.redirectTo({
        url: '/pages/user/order_list/order_list?order_status=payment'
      });
    } //  goShopping:function(){
    //    wx.switchTab({
    //       url: '../../../pages/shop/shop',
    //       success: function(res){
    //         // success
    //       }
    //      })
    //     },

  }
};
</script>
<style>
@import "./donef.css";
</style>