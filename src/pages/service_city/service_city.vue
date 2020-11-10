<template>
  <view class="container">
    <!-- <view class="head_wrap">
   <view class="head_left">
     <text>石家庄</text>
     <image src="http://wximage.shedongyun.com/sdo2o/down_logo.png" class="search_down"></image>
   </view>
   <view class="head_right">
    <icon size='18' type="search" color="#bdbdbd" class="search_icon"></icon>
    <input type="text" placeholder='搜索当前城市的地址' class="addreInput"></input>
   </view>
 </view> -->
    <view class="address_show">
      <text class="current_address">位置城市</text>
      <view class="current_cont" @tap="reposition">
        <text class="curr_name">{{ current_city }}</text>
        <view class="curr_new">
          <image
            src="http://wximage.shedongyun.com/sdo2o/new_logo.png"
            class="new_locate"
          ></image>
          <text class="new_name">重新定位</text>
        </view>
      </view>
    </view>
    <view class="back_height"></view>
    <!-- <view class="near_address">
  <text class="current_address">热门城市</text>
  <view class="current_cont">
    <text class="hot_city">北京</text>
    <text class="hot_city">上海</text>
    <text class="hot_city">河北</text>
    <text class="hot_city">哈尔滨</text>
  </view>
 </view>
 <view class="back_height"></view> -->
    <view class="city_list">
      <view class="city_one">
        <block v-for="(item, index) in cityList" :key="index">
          <!-- <text class="city_letter">A</text> -->
          <text class="near_line" @tap="locate_switch" :data-city="item">{{
            item
          }}</text>
        </block>
      </view>
    </view>
    <!--字母表-->
    <!-- <view class="alphabet_letter">
  <text>#</text>
  <text>A</text>
  <text>B</text>
  <text>C</text>
  <text>D</text>
  <text>E</text>
 </view> -->
  </view>
</template>

<script>
var app = getApp();
var current_city;

export default {
  data() {
    return {
      current_city: "",
      cityList: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
    current_city = options.current_city;
    console.log("current_city", current_city);
    that.setData({
      current_city: current_city,
    });
    that.city_list();
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  methods: {
    //城市列表
    city_list: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "shop",
          do: "city_list",
          key: app.globalData.key,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          console.log("结果", res);
          if (res.data.code == 1) {
            that.setData({
              cityList: res.data.data,
            });
          }
        },
      });
    },
    //点击切换
    locate_switch: function(e) {
      console.log("e", e);
      var that = this;
      var switch_value = e.currentTarget.dataset.city;
      wx.setStorageSync("currLocate", switch_value);
      app.globalData.getCity();
      app.globalData.switch_type = 1;
      that.setData({
        current_city: switch_value,
      });
      setTimeout(function() {
        wx.switchTab({
          url: "/pages/index",
        });
      }, 1000);
    },
    //重新定位
    reposition: function() {
      console.log("nihao ");
      var that = this;
      wx.getLocation({
        type: "gcj02",
        //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          wx.setStorageSync("theLatitude", res.latitude);
          wx.setStorageSync("theLongitude", res.longitude);
          app.globalData.getLocate();
          wx.request({
            method: "get",
            url: app.globalData.domain,
            data: {
              a: "login",
              do: "wxloaction",
              lng: longitude,
              lat: latitude,
              key: app.globalData.key,
            },
            header: {
              "Content-Type": "application/json",
            },
            success: function(res) {
              // console.log('城市', res);

              if (res.data.code == 1) {
                that.setData({
                  current_city: res.data.data,
                });
              } else {
                wx.showToast({
                  title: "城市未开通服务",
                  icon: "success",
                  duration: 2000,
                });
              }
            },
            fail: function() {},
          });
        },
      });
    },
  },
};
</script>
<style>
@import "./service_city.css";
</style>
