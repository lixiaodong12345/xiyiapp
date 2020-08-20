<template>
<view class="container">
 <view class="head_wrap">
   <view class="head_left">
     <text>石家庄</text>
     <image src="http://wximage.shedongyun.com/sdo2o/down_logo.png" class="search_down"></image>
   </view>
   <view class="head_right">
    <icon size="18" type="search" color="#bdbdbd" class="search_icon"></icon>
    <input type="text" placeholder="搜索当前城市的地址" class="addreInput"></input>
   </view>
 </view>
 <view class="address_show">
   <text class="current_address">当前位置</text>
   <view class="current_cont">
     <text class="curr_name">山东省济南市历城区洪家楼街道</text>
     <view class="curr_new">
      <image src="http://wximage.shedongyun.com/sdo2o/new_logo.png" class="new_locate"></image>
      <text class="new_name">重新定位</text>
     </view>
   </view>
 </view>
 <view class="back_height"></view>
 <view class="near_address">
  <text class="current_address">当前位置</text>
  <view class="current_cont">
    <text class="near_line">洪家楼第三小学</text>
    <text class="near_line">洪家楼第三小学</text>
    <text class="near_line">洪家楼第三小学</text>
    <text class="near_line">洪家楼第三小学</text>
    <text class="near_line">洪家楼第三小学</text>
  </view>

 
 </view>


</view>
</template>

<script>
var app = getApp();

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
  methods: {}
};
</script>
<style>
@import "./service_address.css";
</style>