<template>
  <view class="container_wrap">
    <!--会员卡明细-->
    <view class="card_detail">
      <view class="card_main">
        <image
          src="/static/static/images/card_back.png"
          class="card_image"
        ></image>
        <view class="card_content">
          <view class="card_inform">
            <text class="card_level">当前等级</text>
            <view class="level_grade">{{ levelName }}</view>
            <view class="level_show">
              <view class="level_one">
                <text class="level_numb">{{ integral_numb }}</text>
                <text class="level_name">积分</text>
              </view>
              <text class="level_line"></text>
              <view class="level_one">
                <text class="level_numb">{{ balance_numb }}</text>
                <text class="level_name">余额</text>
              </view>
            </view>
            <view class="top_up" @tap="top_skip">
              <text class="top_name">去充值</text>
              <image
                src="/static/static/images/deposit_right.png"
                class="top_deposit"
              ></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--导航-->
    <view class="card_nav">
      <view class="nav_width">
        <view class="nav_line">
          <text
            @tap="nav_switch"
            data-nav="0"
            :class="currId == 0 ? 'nav_select' : ''"
            >积分明细</text
          >
        </view>
        <view class="line_color"></view>
        <view class="nav_line">
          <text
            @tap="nav_switch"
            data-nav="1"
            :class="currId == 1 ? 'nav_select' : ''"
            >余额明细</text
          >
        </view>
      </view>
    </view>
    <!--积分明细-->
    <view v-if="uid">
      <view :class="currId == 0 ? 'wrap_show' : 'wrap_hide'">
        <!--有数据-->
        <view :style="integral_show">
          <view class="particul_year">
            <view class="particul_main">
              <!--一条消费-->
              <view class="particul_line">
                <image
                  src="/static/static/images/card_out.png"
                  class="particul_logo"
                ></image>
                <view class="particul_inform">
                  <view class="inform_title">光面皮衣大褂</view>
                  <text class="inform_use">[商城消费]</text>
                  <view class="inform_time">09-02 12：45</view>
                  <view class="inform_money"
                    >-500<text class="inform_name">积分</text></view
                  >
                </view> </view
              ><!--particul_line-->
              <view class="particul_line">
                <image
                  src="/static/static/images/card_enter.png"
                  class="particul_logo"
                ></image>
                <view class="particul_inform">
                  <view class="inform_title">充值</view>
                  <text class="inform_use">[充值]</text>
                  <view class="inform_time">09-02 12：45</view>
                  <view class="inform_money red_color"
                    >+500<text class="inform_name">积分</text></view
                  >
                </view> </view
              ><!--particul_line-->
            </view> </view
          ><!--particul_year-->
        </view>
        <!--无数据-->
        <view class="none_oder_stati" :style="integral_hide">
          <image
            src="http://wximage.shedongyun.com/sdo2o/none_goods.png"
          ></image>
          <text>当前时间段没有消费明细哦~</text>
        </view>
      </view>
      <!--余额明细-->
      <view :class="currId == 1 ? 'wrap_show' : 'wrap_hide'">
        <!--有数据-->
        <view :style="balance_show">
          <view class="particul_year">
            <view class="particul_main">
              <!--一条消费-->
              <view class="particul_line">
                <image
                  src="/static/static/images/card_out.png"
                  class="particul_logo"
                ></image>
                <view class="particul_inform">
                  <view class="inform_title">光面皮衣大褂</view>
                  <text class="inform_use">[商城消费]</text>
                  <view class="inform_time">09-02 12：45</view>
                  <view class="inform_money"
                    >-500<text class="inform_name">积分</text></view
                  >
                </view> </view
              ><!--particul_line-->
              <view class="particul_line">
                <image
                  src="/static/static/images/card_out.png"
                  class="particul_logo"
                ></image>
                <view class="particul_inform">
                  <view class="inform_title">光面皮衣大褂</view>
                  <text class="inform_use">[商城消费]</text>
                  <view class="inform_time">09-02 12：45</view>
                  <view class="inform_money"
                    >-500<text class="inform_name">积分</text></view
                  >
                </view> </view
              ><!--particul_line-->
              <view class="particul_line">
                <image
                  src="/static/static/images/card_enter.png"
                  class="particul_logo"
                ></image>
                <view class="particul_inform">
                  <view class="inform_title">光面皮衣大褂</view>
                  <text class="inform_use">[充值]</text>
                  <view class="inform_time">09-02 12：45</view>
                  <view class="inform_money red_color"
                    >+500<text class="inform_name">积分</text></view
                  >
                </view> </view
              ><!--particul_line-->
            </view> </view
          ><!--particul_year-->
        </view>
        <!--无数据-->
        <view class="none_oder_stati" :style="balance_hide">
          <image
            src="http://wximage.shedongyun.com/sdo2o/none_goods.png"
          ></image>
          <text>当前时间段没有消费明细哦~</text>
        </view>
      </view>
    </view>
    <view v-else class="integral_hidden">
      请登录后查看
    </view>
  </view>
</template>

<script>
var app = getApp();
const date = new Date();
const years = [];
const months = [];
var integral_type = "";
var integral_time = "";
var data_type = 0;
var integral_page = 1;
var balance_page = 1;

export default {
  data() {
    return {
      uid: app.globalData.uid,
      giantView: "false",
      tabSelectname: "分类",
      years: years,
      months: months,
      yearShow: date.getFullYear(),
      monthShow: date.getMonth() + 1,
      value: [9999, 0],
      integral_show: "display:block",
      integral_hide: "display:none",
      balance_show: "display:block",
      balance_hide: "display:none",
      currId: 0,
      integralList: "",
      balanceList: "",
      levelName: "",
      integral_numb: "",
      balance_numb: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
    that.integral_list();
    that.balance_list();
    that.dataInform();
  },
  onShow: function() {
    var that = this;
  },
  methods: {
    //积分明细数据列表
    integral_list: function() {
      var that = this;
      var userid = app.globalData.userInfo.id;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "credit",
          do: "credit1",
          key: app.globalData.key,
          uid: userid,
          page: integral_page,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          console.log("积分++", res.data.list);

          if (res.data.code == 1) {
            that.setData({
              integralList: res.data.list,
              integral_show: "display:block",
              integral_hide: "display:none",
            });
          } else {
            that.setData({
              integral_show: "display:none",
              integral_hide: "display:block",
            });
          }
        },
      });
    },
    //余额明细数据列表
    balance_list: function() {
      var that = this;
      var userid = app.globalData.userInfo.id;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "credit",
          do: "credit2",
          key: app.globalData.key,
          uid: userid,
          page: balance_page,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          console.log("余额++", res.data.list);

          if (res.data.code == 1) {
            that.setData({
              balanceList: res.data.list,
              balance_show: "display:block",
              balance_hide: "display:none",
            });
          } else {
            that.setData({
              balance_show: "display:none",
              balance_hide: "display:block",
            });
          }
        },
      });
    },
    //获取用户的积分 余额  会员等级
    dataInform: function() {
      var that = this;
      var user_info = app.globalData.userInfo;
      var uid = app.globalData.uid;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "user",
          do: "get_user_information",
          key: app.globalData.key,
          uid: uid,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            console.log("积分+++", res);
            that.setData({
              levelName: res.data.data.level,
              integral_numb: res.data.data.integral,
              balance_numb: res.data.data.credit2,
            });
          }
        },
      });
    },
    //导航切换
    nav_switch: function(e) {
      var that = this;
      var currId = e.currentTarget.dataset.nav;
      that.setData({
        currId: currId,
      });
    },
    //充值中心跳转
    top_skip: function() {
      var that = this;
      uni.navigateTo({
        url: "/pages/user/account_deposit/account_deposit",
      });
    },
  },
};
</script>
<style>
@import "./membership_card.css";
</style>
