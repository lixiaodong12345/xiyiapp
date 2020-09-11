<template>
  <view class="container">
    <!--轮播-->
    <view v-if="shopBanner" class="banner_wrap">
      <swiper
        class="banner"
        indicator-dots="true"
        :indicator-color="indicator_color"
        :indicator-active-color="indicator_active_color"
        :autoplay="autoplay"
        :circular="circular"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item v-for="(item, index) in shopBanner" :key="index">
          <view :data-link="item.link_wxapp" @tap="common_skip">
            <image :src="item.thumb"></image>
          </view>
        </swiper-item>
      </swiper> </view
    ><!--轮播结束-->
    <!--公告栏-->
    <view class="notice_wrap">
      <view class="notice_cont">
        <view class="notice_horn">
          <image
            src="http://wximage.shedongyun.com/sdo2o/horn_logo.png"
            class="notice_title"
          ></image>
        </view>
        <swiper
          :autoplay="autoplay"
          :interval="noticeInterval"
          :duration="notictDuration"
          vertical="true"
          :circular="circular"
          class="notice_swiper"
        >
          <block v-for="(item, index) in recommendList" :key="index">
            <swiper-item>
              <navigator class="notice_font" hover-class="none">
                {{ item.announcename }}
              </navigator>
            </swiper-item>
          </block>
        </swiper>
      </view> </view
    ><!--notice_wrap-->
    <!--商家入驻-->
    <image
      src="http://wximage.shedongyun.com/sdo2o/merchant_in.png"
      @tap="merchant_skip"
      class="merchant_in"
    ></image>
    <!--、快捷菜单栏模块-->
    <view class="menu_wrap">
      <view class="menu_cont">
        <!--块 少于10个-->
        <view class="first_memu">
          <block
            v-for="(item, index) in menuList"
            :key="index"
            v-if="index < 10"
          >
            <view
              class="menu_main"
              @tap="common_skip"
              :data-link="item.link_wxapp"
            >
              <image :src="item.thumb" class="menu_img"></image>
              <text class="menu_title">{{ item.menuname }}</text>
            </view>
          </block> </view
        ><!--first_memu-->
      </view>
      <view class="back_height"></view> </view
    ><!--menu_wrap-->
    <!--大模块——列表-->
    <view class="large_module">
      <!--标题-->
      <view class="module_title">
        <text
          :class="'one_module ' + (navBar == 0 ? 'current_title' : '')"
          data-type="distance"
          @tap="bar_switch"
          data-bar="0"
          >附近</text
        >
        <text
          :class="'one_module ' + (navBar == 1 ? 'current_title' : '')"
          data-type="time"
          @tap="bar_switch"
          data-bar="1"
          >新入住</text
        >
        <text
          :class="'one_module ' + (navBar == 2 ? 'current_title' : '')"
          data-type="hot"
          @tap="bar_switch"
          data-bar="2"
          >热门</text
        >
      </view>
      <!--列表-->
      <view class="module_list">
        <!--有内容-->
        <view class="amog_module">
          <!--一个-->
          <block v-for="(item, index) in shopList" :key="index">
            <view class="module_line">
              <navigator
                :url="'/pages/shop/shop_detail/shop_detail?id=' + item.id"
                hover-class="none"
              >
                <image :src="item.logo" class="prod_logo"></image>
              </navigator>
              <view class="module_main">
                <navigator
                  :url="'/pages/shop/shop_detail/shop_detail?id=' + item.id"
                  hover-class="none"
                >
                  <view class="shop_title" :data-id="item.id">{{
                    item.merchname
                  }}</view>
                  <view class="module_clock" v-if="item.operation_times != ''">
                    <image
                      src="http://wximage.shedongyun.com/sdo2o/clock_logo.png"
                      class="clock_logo"
                    ></image>
                    <text class="clock_name">{{ item.operation_times }}</text>
                  </view>
                  <view
                    class="module_clock module_posit"
                    v-if="item.address != ''"
                  >
                    <image
                      src="http://wximage.shedongyun.com/sdo2o/addre_logo.png"
                      class="clock_logo"
                    ></image>
                    <text class="clock_addre">{{ item.address }}</text>
                    <text class="dist_addre" v-if="item.distance != 0"
                      >{{ item.distance }}km</text
                    >
                    <image
                      src="http://wximage.shedongyun.com/sdo2o/right_logo.png"
                      class="right_logo"
                    ></image>
                  </view>
                </navigator>
                <!--电话-->
                <image
                  @tap="collphone"
                  :data-tel="item.mobile"
                  src="http://wximage.shedongyun.com/sdo2o/phone_logo.png"
                  class="phone_logo"
                ></image>
              </view>
            </view>
          </block>
          <!--加载更多-->
          <view class="load_more" :style="cates_state">
            <!-- <image src="http://wximage.shedongyun.com/sdo2o/load_logo.png" class="load_logo"></image> -->
            <text class="load_name">{{ cates_more }}</text>
          </view> </view
        ><!--有内容结束-->
        <!--无内容-->
        <view class="none_empty" style="display:none">
          <image
            src="http://wximage.shedongyun.com/sdo2o/none_logo.png"
            class="none_logo"
          ></image>
          <view class="none_name">啊哦，没有相关商家推荐哦~</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
var app = getApp();
var currLatitude = "";
var currLongitude = "";
var more_type = "distance";
var page = 1;

export default {
  data() {
    return {
      indicatorDots: false,
      indicator_color: "#ffffff",
      indicator_active_color: "#fe4644",
      autoplay: true,
      circular: true,
      interval: 5000,
      duration: 1000,
      noticeInterval: 3000,
      notictDuration: 500,
      circular: true,
      navBar: 0,
      cates_state: "display:block",
      cates_more: "没有更多了",
      code: "",
      shopList: "",
      shopBanner: "",
      recommendList: "",
      menuList: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
    page = 1; //当前位置的经纬度

    currLatitude = app.globalData.currLatitude;
    currLongitude = app.globalData.currLongitude;
    that.getShopbanner();
    that.getRecommend();
    that.getMenu();
  },
  onReady: function() {},
  onShow: function() {
    var that = this;
    page = 1;
    wx.getLocation({
      type: "gcj02",
      //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.request({
          url: app.globalData.domain,
          data: {
            a: "shop",
            do: "list",
            lng: longitude,
            lat: latitude,
            key: app.globalData.key,
            type: "distance",
            page: page,
          },
          header: {
            "content-type": "application/json",
          },
          success: function(res) {
            if (res.data.code == 1) {
              console.log("商家列表", res);
              that.setData({
                code: res.data.code,
                shopList: res.data.data,
              });
            } else {
            }
          },
        });
        page++;
        console.log("page自加++", page);
      },
    });
  },
  onHide: function() {},
  onUnload: function() {
    page = 1;
  },
  // 加载更多数据
  onReachBottom: function() {
    var that = this;
    console.log("加载更多"); // that.add_more_list();
  },
  //转发分享按钮
  onShareAppMessage: function() {
    return app.globalData.goShareApp("/pages/index");
  },
  methods: {
    //轮播
    getShopbanner: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "shop",
          do: "slide",
          key: app.globalData.key,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              shopBanner: res.data.data,
            });
          }
        },
      });
    },
    //公告
    getRecommend: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "shop",
          do: "announce",
          key: app.globalData.key,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              recommendList: res.data.data,
            });
          }
        },
      });
    },
    collphone: function(e) {
      console.log(e);
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel,
      });
    },
    //快捷菜单
    getMenu: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "shop",
          do: "menu",
          key: app.globalData.key,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              menuList: res.data.data,
            });
          }
        },
      });
    },
    //导航条切换列表
    bar_switch: function(e) {
      var that = this;
      page = 1;
      wx.getLocation({
        type: "gcj02",
        //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          var var_value = e.currentTarget.dataset.bar;
          more_type = e.currentTarget.dataset.bar;
          that.setData({
            navBar: var_value,
          });
          wx.request({
            url: app.globalData.domain,
            data: {
              a: "shop",
              do: "list",
              lng: longitude,
              lat: latitude,
              key: app.globalData.key,
              type: e.currentTarget.dataset.type,
              page: page,
            },
            header: {
              "content-type": "application/json",
            },
            success: function(res) {
              console.log("商家列表", res);

              if (res.data.code == 1) {
                that.setData({
                  code: res.data.code,
                  shopList: res.data.data,
                });
              } else {
              }
            },
          });
          page++;
          console.log("page自增1++", page);
        },
      });
      page++;
      console.log("page自增1++", page);
    },
    //加载更多请求的函数
    add_more_list: function() {
      var that = this;
      wx.getLocation({
        type: "gcj02",
        //返回可以用于wx.openLocation的经纬度
        success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          wx.request({
            url: app.globalData.domain,
            data: {
              a: "shop",
              do: "list",
              lng: longitude,
              lat: latitude,
              key: app.globalData.key,
              type: more_type,
              page: page,
            },
            header: {
              "content-type": "application/json",
            },
            success: function(res) {
              if (res.data.code == 1) {
                console.log("商家列表", res);
                that.setData({
                  code: res.data.code,
                  shopList: res.data.data,
                });
              } else {
              }
            },
          });
          page++;
          console.log("page2自增++", page);
        },
      });
    },
    // 链接跳转事件
    common_skip: function(e) {
      var con = e.currentTarget.dataset.cid;
      app.globalData.menucid = con;
      console.log(e);
      var link_wxapp = e.currentTarget.dataset.link;

      if (
        link_wxapp == "/pages/index" ||
        link_wxapp == "/pages/user/distribution_center/distribution_center" ||
        link_wxapp == "/pages/user/index"
      ) {
        wx.switchTab({
          url: link_wxapp,
        });
      } else {
        wx.navigateTo({
          url: link_wxapp,
        });
      }
    },
    //商家入驻跳转
    merchant_skip: function() {
      wx.navigateTo({
        url: "/pages/user/store_mall/store_mall",
      });
    },
  },
};
</script>
<style>
@import "./distribution_center.css";
</style>
