<template>
  <view>
    <!--pages/user/distribution_order/distribution_order.wxml-->
    <view class="accumulated">
      <text class="accumulated_tx01">累计佣金:</text>
      <text class="accumulated_tx02">{{ my_commission_amount }}元</text>
    </view>
    <view class="oder_tab">
      <view
        :class="'oder_tab_child ' + (order_status == 'all' ? 'active' : '')"
        data-type="button"
        @tap="changeOrderStatus"
        data-status="all"
      >
        <text>所有</text>
      </view>
      <view
        :class="'oder_tab_child ' + (order_status == 'payment' ? 'active' : '')"
        data-type="button"
        @tap="changeOrderStatus"
        data-status="payment"
      >
        <text>待付款</text>
      </view>
      <view
        :class="
          'oder_tab_child ' + (order_status == 'paymented' ? 'active' : '')
        "
        data-type="button"
        @tap="changeOrderStatus"
        data-status="paymented"
      >
        <text>已收款</text>
      </view>
      <view
        :class="
          'oder_tab_child ' + (order_status == 'complete' ? 'active' : '')
        "
        data-type="button"
        @tap="changeOrderStatus"
        data-status="complete"
      >
        <text>已完成</text>
      </view>
    </view>
    <!--有数据时的页面-->
    <scroll-view
      scroll-y="true"
      scroll-left="1"
      data-type="scroll"
      class="listbox"
      @scrolltolower="load_list"
    >
      <view class v-if="order_list">
        <view class="border_006"></view>
        <block v-for="(item, index) in order_list" :key="index">
          <view class="team_child">
            <view class="team_child_left">
              <text class="team_child_left_001">{{ item.ordersn }}</text>
            </view>
            <view class="team_child_right">
              <text v-if="item.statusname != ''" class="team_child_right_001">{{
                item.statusname
              }}</text>
            </view>
          </view>

          <block v-for="(goods, index2) in item.goods_list" :key="index2">
            <view class="wechat_name">
              <view class="user_name_all">
                <image
                  class="userinfo-avatar_001"
                  :src="goods.thumb"
                  background-size="cover"
                ></image>
                <view class="goods_info">
                  <text class="goods_name">商品名称{{ goods.title }}</text>
                  <text class="wechat_name_tx01"
                    >预计佣金:<text class="money"
                      >+{{ goods.goods_commissions }}</text
                    ></text
                  >
                </view>
                <!--<text class="userinfo-nickname">颜色：白色 号码:L</text>-->
              </view>
            </view>
          </block>
          <view class="team_child">
            <view class="team_child_left">
              <text class="team_child_left_002">{{ item.add_time }}</text>
            </view>
            <view class="team_child_right">
              <text class="team_child_right_002"
                >微信名称：{{ item.nickname }}</text
              >
            </view>
          </view>
          <view class="border_006"></view>
        </block>
      </view>
    </scroll-view>
    <!--没数据时的页面-->
    <view class="team_none" v-if="order_list == ''">
      <image
        src="/static/static/images/icon/hr.png"
        style="padding-left: 165rpx;"
      ></image>
      <text>目前还没有数据</text>
      <image src="/static/static/images/icon/hr.png"></image>
    </view>
  </view>
</template>

<script>
// pages/user/distribution_order/distribution_order.js
var app = getApp();
var page = 0;
var load_more = 0;
var status = "";
var my_commission_amount = 0;

export default {
  data() {
    return {
      tis: "",
      tisshow: "",
      order_status: "all",
      status: "",
      order_list: [],
      load_footer: "正在加载更多...",
      copyright: app.globalData.copyright,
      my_commission_amount: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(query) {
    // 页面初始化 options为页面跳转所带来的参数
    if (query.status) {
      status = query.status;
    } else {
      status = "";
    }

    this.load_list();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
    load_more = 0;
  },
  methods: {
    /**
     *加载订单列表信息
     */
    load_list: function(e) {
      if (e != null) {
        if (e.currentTarget.dataset.type == "scroll") {
          page++;
        } else {
          page = 1;
        }
      } else {
        page = 1;
      }

      console.log("按钮", e); // page++;

      var that = this;
      var user_info = app.globalData.userInfo;
      console.log(user_info.uid);

      if (load_more != 0) {
        return 0;
      }

      that.setData({
        status: status,
      });
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "commission",
          do: "list",
          key: app.globalData.key,
          page: page,
          uid: app.globalData.userInfo.id,
          status: status,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          console.log(res.data);

          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.data.order_list,
              my_commission_amount: res.data.data.my_commission_amount,
              status: status,
            });
          } else {
            that.setData({
              tis: res.data.msg,
              tisshow: "height:30px;",
              load_footer: "没有更多订单了",
            });
            load_more = 1;
          }
        },
      });
    },

    /**
     *加载不同状态的订单
     */
    changeOrderStatus: function(event) {
      //console.log("订单状态"+status)
      console.log(event);
      var that = this;
      var user_info = app.globalData.userInfo;
      var status = event.currentTarget.dataset.status;
      console.log(status);
      that.setData({
        status: status,
        order_status: status,
      });
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "commission",
          do: "list",
          key: app.globalData.key,
          uid: app.globalData.userInfo.id,
          status: status,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          console.log(res.data);

          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.data.order_list,
              my_commission_amount: res.data.data.my_commission_amount,
            });
          } else {
            that.setData({
              tis: res.data.msg,
              tisshow: "height:30px;",
              load_footer: "没有更多订单了",
            }); // load_more = 1;
          }
        },
      });
    },
  },
};
</script>
<style>
@import "./distribution_order.css";
</style>
