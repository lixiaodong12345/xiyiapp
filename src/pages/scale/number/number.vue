<template>
<!--pages/scale/number/number.wxml-->

<view class="wrapper">
 <view class="border-height"></view>
  <view class="wrapper-main"> 
    <view class="cont-main">
      <view class="cont">
       <view class="cont-right">
        <text class="cont-right-font">填写快递单号：</text>
       </view>
      </view>
    </view>
  <view class="cont-main">
    <view class="cont">
     <view class="cont-right">
      <input class="cont-right-input" name="contName" placeholder="快递公司"></input>
     </view>
   </view>
  </view>
  <view class="cont-main">
    <view class="cont">
     <view class="cont-right">
      <input class="cont-right-input" name="contName" placeholder="快递单号"></input>
     </view>
   </view>
  </view>
   <view class="apply-main">
     <view class="apply-font" @tap="titijiao">返回</view>
     <view class="apply-font apply-font-first" @tap="titi">提交快递单号</view>
  </view>

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

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {},

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},

  /*生命周期函数--监听页面显示*/
  onShow: function () {},

  /*生命周期函数--监听页面隐藏*/
  onHide: function () {},

  /* 生命周期函数--监听页面卸*/
  onUnload: function () {},

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {},

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {},
  methods: {
    titi: function () {
      wx.redirectTo({
        url: '/pages/scale/apply_wait/apply_wait'
      });
    }
  }
};
</script>
<style>
@import "./number.css";
</style>