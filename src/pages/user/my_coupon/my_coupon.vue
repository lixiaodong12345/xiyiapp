<template>
  <view>
    <!--pages/user/my_coupon/my_coupon.wxml-->
    <view class="coupon_tab">
      <view
        @tap="get_mycoupon"
        data-type="0"
        :class="'coupon_tab_li ' + (status == 0 ? 'active' : '')"
      >
        <text class="xian"></text>
        <text class="name">未使用({{ not_used }})</text>
      </view>
      <view
        @tap="get_mycoupon"
        data-type="1"
        :class="'coupon_tab_li ' + (status == 1 ? 'active' : '')"
      >
        <text class="xian"></text>
        <text class="name">已使用({{ use }})</text>
      </view>
      <view
        @tap="get_mycoupon"
        data-type="2"
        :class="'coupon_tab_li ' + (status == 2 ? 'active' : '')"
      >
        <text class="xian"></text>
        <text class="name">已过期({{ overdue }})</text>
      </view>
    </view>

    <!--获取优惠券-->
    <view v-if="mycoupon_type == 1" class="coupon_wrap">
      <!--有数据-->
      <block v-if="status == 0">
        <block v-for="(item, index) in coucon_list" :key="index">
          <!--一条开始-->
          <view class="coupon_cont">
            <view class="coupon_line">
              <view class="round_top"></view>
              <view class="round_bottom"></view>
              <view class="card_back"></view>
              <view class="line_cont">
                <view class="line_cont_left">
                  <view class="conpon_type">
                    <text class="type">{{ item.couponname }}</text>
                  </view>
                  <view class="cont_left_title">
                    <text class="cont_price"
                      ><text class="cont_symble">￥</text
                      >{{ item.deduct }}</text
                    >
                    <text class="cont_use">满{{ item.enough }}元使用</text>
                  </view>
                  <view class="cont_bottom">
                    <text class="cont_time"
                      >{{ item.timestart }}~{{ item.timeend }}</text
                    >
                    <image
                      v-if="item.desc != ''"
                      :data-id="item.id"
                      @tap="coupon_show"
                      class="click_hide"
                      :src="item.coupon_img"
                    ></image>
                  </view>
                </view> </view
              ><!--line_cont-->
              <view class="line_cont_right">
                <view @tap="usercoupon" class="coupon_button">
                  <text>立即使用</text>
                </view>
              </view> </view
            ><!--coupon_line-->
            <view
              :style="'display:' + item.show"
              v-if="item.desc != ''"
              class="hide_info"
            >
              <text>使用说明：{{ item.desc }}</text>
            </view> </view
          ><!--coupon_cont-->
        </block>
      </block>
      <block v-else-if="status == 1">
        <block v-for="(item, index) in coucon_list" :key="index">
          <view class="coupon_cont">
            <!--一条开始-->
            <view class="coupon_line coupon_line_none">
              <view class="round_top"></view>
              <view class="round_bottom"></view>
              <view class="card_back"></view>
              <view class="line_cont">
                <view class="line_cont_left">
                  <view class="conpon_type">
                    <text class="type">{{ item.couponname }}</text>
                  </view>
                  <view class="cont_left_title">
                    <text class="cont_price"
                      ><text class="cont_symble">￥</text
                      >{{ item.deduct }}</text
                    >
                    <text class="cont_use">满{{ item.enough }}元使用</text>
                  </view>
                  <view class="cont_bottom">
                    <text class="cont_time"
                      >{{ item.timestart }}~{{ item.timeend }}</text
                    >
                    <image
                      v-if="item.desc != ''"
                      :data-id="item.id"
                      @tap="coupon_show"
                      class="click_hide"
                      :src="item.coupon_img"
                    ></image>
                  </view>
                </view> </view
              ><!--line_cont-->
              <view class="line_cont_right">
                <view class="coupon_button">
                  <image
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/usesd.png"
                  ></image>
                </view>
              </view> </view
            ><!--coupon_line-->
            <view
              :style="'display:' + item.show"
              v-if="item.desc != ''"
              class="hide_info"
            >
              <text>使用说明：{{ item.desc }}</text>
            </view>
          </view>
        </block>
      </block>
      <block v-else-if="status == 2">
        <block v-for="(item, index) in coucon_list" :key="index">
          <view class="coupon_cont">
            <!--一条开始-->
            <view class="coupon_line coupon_line_none">
              <view class="round_top"></view>
              <view class="round_bottom"></view>
              <view class="card_back"></view>
              <view class="line_cont">
                <view class="line_cont_left">
                  <view class="conpon_type">
                    <text class="type">{{ item.couponname }}</text>
                  </view>
                  <view class="cont_left_title">
                    <text class="cont_price"
                      ><text class="cont_symble">￥</text
                      >{{ item.deduct }}</text
                    >
                    <text class="cont_use">满{{ item.enough }}元使用</text>
                  </view>
                  <view class="cont_bottom">
                    <text class="cont_time"
                      >{{ item.timestart }}~{{ item.timeend }}</text
                    >
                    <image
                      v-if="item.desc != ''"
                      :data-id="item.id"
                      @tap="coupon_show"
                      class="click_hide"
                      :src="item.coupon_img"
                    ></image>
                  </view>
                </view> </view
              ><!--line_cont-->
              <view class="line_cont_right">
                <view class="coupon_button">
                  <image
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/dated.png"
                  ></image>
                </view>
              </view> </view
            ><!--coupon_line-->
            <view
              :style="'display:' + item.show"
              v-if="item.desc != ''"
              class="hide_info"
            >
              <text>使用说明：{{ item.desc }}</text>
            </view>
          </view>
        </block>
      </block>
    </view>
    <view v-else class="none_publish">
      <image src="http://wximage.shedongyun.com/sdo2o/none_goods.png"></image>
      <text class="nomore">暂无此类型优惠券哦</text>
    </view>
  </view>
</template>

<script>
// pages/user/my_coupon/my_coupon.js
var app = getApp();
var status;

export default {
  data() {
    return {
      mycoupon_type: 1,
      status: 0,
      uid: "",
      not_used: "",
      overdue: "",
      use: "",
      coucon_list: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {
    var that = this;
    status = 0; // 请求列表

    var uid = app.globalData.uid;
    that.setData({
      uid: uid,
    });
    that.get_mycoupon();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  methods: {
    usercoupon: function() {
      uni.navigateTo({
        url: "/pages/gcates/gcates",
      });
    },
    // 获取我的优惠券列表
    get_mycoupon: function(e) {
      var that = this;

      if (e != null) {
        status = e.currentTarget.dataset.type;
      }

      console.log("status", status);
      var uid = that.uid;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: "ewei_o2o",
          a: "coupon",
          do: "my_coupon",
          key: app.globalData.key,
          uid: uid,
          status: status,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          console.log(res);

          if (res.data.code == 1) {
            for (var m = 0; m < res.data.data.length; m++) {
              res.data.data[m].show = "none";
              res.data.data[m].coupon_img =
                "http://wximage.shedongyun.com/sdo2o/coupon_down.png";
            }

            that.setData({
              not_used: res.data.not_used,
              overdue: res.data.overdue,
              use: res.data.use,
            });

            if (status == 0) {
              that.setData({
                mycoupon_type: 1,
                coucon_list: res.data.data,
                status: status,
              });
            } else if (status == 1) {
              that.setData({
                mycoupon_type: 1,
                coucon_list: res.data.data,
                status: status,
              });
            } else if (status == 2) {
              that.setData({
                mycoupon_type: 1,
                coucon_list: res.data.data,
                status: status,
              });
            }
          } else {
            that.setData({
              mycoupon_type: 0,
              status: status,
            });
          }
        },
      });
    },
    coupon_show: function(e) {
      var that = this;
      var currId = e.currentTarget.dataset.id;
      var tempCouponList = that.coucon_list;

      for (var m = 0; m < tempCouponList.length; m++) {
        if (
          tempCouponList[m].id == currId &&
          tempCouponList[m].show == "none"
        ) {
          tempCouponList[m].show = "block";
          tempCouponList.coupon_img =
            "http://wximage.shedongyun.com/sdo2o/coupon_up.png";
        } else if (
          tempCouponList[m].id == currId &&
          tempCouponList[m].show == "block"
        ) {
          tempCouponList[m].show = "none";
          tempCouponList[m].coupon_img =
            "http://wximage.shedongyun.com/sdo2o/coupon_down.png";
        }
      }

      that.setData({
        mycoupon_type: 1,
        coucon_list: tempCouponList,
        status: status,
      });
    },
  },
};
</script>
<style>
@import "./my_coupon.css";
</style>
