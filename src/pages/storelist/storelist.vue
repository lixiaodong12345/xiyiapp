<template>
<view class="container">
 <!--有-->
  <view class="contain_wrap"> 
    <block v-for="(item, index) in storeList" :key="index"> 
    <view class="store_lister">
      <image :data-id="item.id" @tap="go_storeindex" :src="item.logo" mode="widthFix" class="logos"></image>
      <view class="store_lister_top">
        <text :data-id="item.id" @tap="go_storeindex" class="one">{{item.storename}}</text>
        <view class="two">
          <text></text>
        </view>
        <view @tap="collphone" :data-tel="item.tel" class="three">
          <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/phone_list.png"></image>
        </view>
      </view>
      <view class="store_lister_text">
        <image :data-id="item.id" @tap="go_storeindex" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/list_date.png"></image>
        <text :data-id="item.id" @tap="go_storeindex">{{item.saletime}}</text>
      </view>
      <view :data-lat="item.lat" :data-lng="item.lng" :data-name="item.storename" :data-add="item.address" @tap="getmap" class="store_lister_text">
        <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/list_add.png"></image>
        <text class="text">{{item.address}}</text><text class="distance">丨</text><text class="distance">{{item.distance}}km</text>
        <image class="right" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/style_select.png"></image>
      </view>
    </view>
    </block> 
    <view class="store_lister_more">
      <text>暂无更多店铺</text>
    </view>
  </view>
</view>
</template>

<script>
var app = getApp();
var latitude;
var longitude;
var page = "";

export default {
  data() {
    return {
      openid: '',
      storeList: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {},
  onShow: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.request({
          url: app.globalData.domain,
          data: {
            a: "store",
            do: "list",
            lng: longitude,
            lat: latitude,
            key: app.globalData.key
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log('门店列表', res.data.data);
            that.setData({
              storeList: res.data.data
            });
          },
          fail: function () {}
        });
      }
    });
  },
  onHide: function () {},
  onUnload: function () {},
  methods: {
    go_storeindex: function (e) {
      console.log(e);
      wx.navigateTo({
        url: '../store_index/store_index?store_id=' + e.currentTarget.dataset.id
      });
    },
    // callphone
    collphone: function (e) {
      console.log(e);
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel
      });
    },
    getmap: function (e) {
      console.log(e);
      var latitude = parseFloat(e.currentTarget.dataset.lat);
      var longitude = parseFloat(e.currentTarget.dataset.lng);
      console.log(latitude);
      console.log(longitude);
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        name: e.currentTarget.dataset.name,
        address: e.currentTarget.dataset.add,
        scale: 28
      });
    },
    selectStore: function (e) {
      console.log(e);
      app.globalData.changestore = 1;
      app.globalData.storeid = e.currentTarget.dataset.id;
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
};
</script>
<style>
@import "./storelist.css";
</style>