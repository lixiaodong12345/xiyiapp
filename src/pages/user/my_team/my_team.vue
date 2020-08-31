<template>
  <view>
    <!--pages/user/my_team/my_team.wxml-->
    <view class="team_tab">
      <navigator class="team_tab_child" @tap="load_list" data-level="1">
        <text :class="order_status == '1' ? 'active' : ''">一级</text>
      </navigator>
      <navigator class="team_tab_child" @tap="load_list" data-level="2">
        <text :class="order_status == '2' ? 'active' : ''">二级</text>
      </navigator>
      <!--navigator  class="team_tab_child">
        <text>三级</text>
    </navigator-->
      <!--分销商-->
      <!--有数据时的页面-->
      <view v-if="team_list">
        <block v-for="(item, index) in team_list" :key="index">
          <view class="wechat_team" v-if="item.isagent == 1">
            <image :src="item.avatar" class="member_avatar"></image>
            <view class="wechat_tx1">
              <text class="avatar_number_tx1_01">{{ item.nickname }}</text>
              <image
                src="http://wximage.shedongyun.com/sdo2o/my_team.png"
              ></image>
              <text class="avatar_number_tx2_02"
                >成为分销商时间:{{ item.agenttime }}</text
              >
              <text class="avatar_number_tx2"
                >{{ item.team_member_count }}个成员</text
              >
            </view>
          </view>
          <view class="wechat_team_01" v-if="item.isagent == 0">
            <image :src="item.avatar" class="member_avatar"></image>
            <view class="wechat_tx1_01">
              <text class="avatar_number_tx1_01">{{ item.nickname }}</text>
              <text class="avatar_number_tx2_02"
                >注册时间:{{ item.createtime }}</text
              >
              <text class="avatar_number_tx2">0个成员</text>
            </view>
          </view>
        </block>
      </view>
      <!--没数据时的页面-->
      <view class="team_none" v-if="team_list == ''">
        <image
          src="http://wximage.shedongyun.com/sdo2o/icon/hr.png"
          style="padding-left: 165rpx;"
        ></image>
        <text>目前还没有团队</text>
        <image src="http://wximage.shedongyun.com/sdo2o/icon/hr.png"></image>
      </view>
    </view>
    <view v-if="team_list != ''" class="massage">
      <text style="padding-left: 50rpx;">注：成员信息</text>
      <image src="http://wximage.shedongyun.com/sdo2o/my_team.png"></image>
      <text>为已经成为分销商的下线</text>
    </view>
    <!--<view class="c">
    <image src="http://wximage.shedongyun.com/sdo2o/icon/wechat_banner.png" class="member_avatar"></image>
    <view class="wechat_tx1">
        <text class="avatar_number_tx1_01">微信名称</text>
        <image src="http://wximage.shedongyun.com/sdo2o/icon/xing_icon.png"></image>
        <text class="avatar_number_tx2_02">成为分销商时间:2017.05.2110:40:04</text>
    </view>
    <view class="avatar_number">
        <text class="avatar_number_tx1">+0</text>
        <text class="avatar_number_tx2">0个成员</text>
    </view>
</view>-->
    <!--订单-->
    <!--<view class="wechat_team_01">
    <image src="http://wximage.shedongyun.com/sdo2o/icon/wechat_icon.png" class="member_avatar"></image>
    <view class="wechat_tx1_01">
        <text class="avatar_number_tx1_01">微信名称</text>
        <text class="avatar_number_tx2_02">注册时间:2017.05.2110:40:04</text>
    </view>
    <view class="avatar_number_01">
        <text class="avatar_number_tx1_001">消费:0.00元</text>
        <text class="avatar_number_tx2">0个订单</text>
    </view>
</view>-->
  </view>
</template>

<script>
// pages/user/my_team/my_team.js
var app = getApp();
var level = 1;

export default {
  data() {
    return {
      tis: "",
      tisshow: "",
      level: 1,
      team_list: [],
      load_footer: "正在加载更多...",
      copyright: app.globalData.copyright,
      order_status: 1,
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    this.load_list(); // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  methods: {
    /**
     *加载订单列表信息
     */
    load_list: function(e) {
      console.log(e);
      var that = this;
      var user_info = app.globalData.userInfo;
      var level = 1;
      var team_list = [];

      if (e) {
        level = e.currentTarget.dataset.level;
      }

      console.log("level:" + level);
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "commission",
          do: "team",
          key: app.globalData.key,
          uid: app.globalData.uid,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          console.log(res.data);

          if (res.data.code == 1) {
            console.log("订单列表");

            if (level == 1) {
              team_list = res.data.data.team_one;
            } else {
              team_list = res.data.data.team_two;
            }

            that.setData({
              team_list: team_list,
              order_status: level,
            });
          } else {
            that.setData({
              tis: res.data.msg,
              order_status: level,
              tisshow: "height:30px;",
              load_footer: "没有更多订单了",
            });
            load_more = 1;
          }
        },
      });
    },
  },
};
</script>
<style>
@import "./my_team.css";
</style>
