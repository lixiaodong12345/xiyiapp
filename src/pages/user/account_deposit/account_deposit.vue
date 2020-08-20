<template>
<view class="body">
<form @submit="bind_submit">
<view class="line-back"></view>
<view class="remain_balance">
  <text class="balance_name">当前余额</text>
  <text class="balance_money">{{balanValue}}元</text>
</view>
<view class="line-back"></view>
<view class="remain_balance remain_border">
  <view class="balance_width">
    <text class="balance_name margin_left">充值</text>
    <input type="number" @input="focusPoint" class="balance_input margin_right" placeholder="请输入充值金额"></input>
  </view>
  <view class="balance_select">
    <checkbox-group @change="selectChange">
      <block v-for="(item, index) in selectList" :key="index">
        <view :class="'balance_one ' + (item.checked==true?'select_balance':'')">
          <view class="balance_cont">
          <text class="recharge">充{{item.enough}}元</text>
          <text class="send_money">送{{item.give}}元</text>
          </view>
          <checkbox class="checkbox_one" :value="index" :checked="item.checked"></checkbox>
        </view>
      </block>
    </checkbox-group>
  </view>
</view>
<button form-type="submit" class="login_button" type="primary">立即充值</button>
</form>
</view>
</template>

<script>
//获取应用实例
var app = getApp();
var recharge_money = '';

export default {
  data() {
    return {
      balanValue: "",
      selectList: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    that.dataInform();
  },
  onShow: function () {
    var that = this;
  },
  methods: {
    //获取余额和充值数据
    dataInform: function () {
      var that = this;
      var user_info = wx.getStorageSync('userInfo');
      var openid = user_info.openid;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'recharge',
          do: 'display',
          key: app.globalData.key,
          openid: openid
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              balanValue: res.data.data.credit2,
              selectList: res.data.data.recharge_discount
            });
          }
        }
      });
    },
    //input手动输入金额
    focusPoint: function (e) {
      var that = this;
      recharge_money = e.detail.value;
    },
    //充值选择
    selectChange: function (e) {
      var that = this;
      var selectArr = e.detail.value;
      var selectList = that.selectList;

      for (var i = 0; i < selectList.length; i++) {
        if (selectArr.length != 0) {
          for (var j = 0; j < selectArr.length; j++) {
            if (i == selectArr[j]) {
              selectList[i].checked = true;
              that.setData({
                selectList: selectList
              });
              recharge_money = selectList[i].enough;
            } else {
              selectList[i].checked = false;
              that.setData({
                selectList: selectList
              });
            }
          }
        } else {
          selectList[i].checked = false;
          that.setData({
            selectList: selectList
          });
        }
      }
    },
    //发起充值form请求
    bind_submit: function (e) {
      var that = this;
      var user_info = wx.getStorageSync('userInfo');
      var openid = user_info.openid;

      if (recharge_money == '') {
        wx.showToast({
          title: '请输入充值金额',
          icon: 'success',
          duration: 1500
        });
        return;
      } else if (recharge_money == 0) {
        wx.showToast({
          title: '金额不能为0',
          icon: 'success',
          duration: 1500
        });
        return;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'recharge',
          do: 'recharge',
          key: app.globalData.key,
          openid: openid,
          recharge_money: recharge_money
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            var lognoid = res.data.data.logno;
            wx.requestPayment({
              'timeStamp': res.data.data.pay.timeStamp.toString(),
              'nonceStr': res.data.data.pay.nonceStr,
              'package': res.data.data.pay.package,
              'signType': res.data.data.pay.signType,
              'paySign': res.data.data.pay.paySign,
              success: function (res) {
                // 微信支付成功回调
                wx.redirectTo({
                  url: '/pages/user/account_success/account_success?lognoid=' + lognoid
                });
              },
              fail: function (res) {}
            });
          } else {}
        }
      });
    }
  }
};
</script>
<style>
@import "./account_deposit.css";
</style>