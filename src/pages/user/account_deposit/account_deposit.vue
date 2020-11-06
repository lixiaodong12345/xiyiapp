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
  <!-- <view class="balance_select">
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
  </view> -->
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
      var user_info = app.globalData.userInfo;
      var uid = app.globalData.uid;
      uni.request({
        url: app.globalData.domain,
        data: {
          a: 'recharge',
          do: 'display',
          key: app.globalData.key,
          uid: uid
        },
        dataType:'json',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('选中样式',res)
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
      console.log('e',e)
      var that = this;
      recharge_money = e.detail.value;
    },
    //充值选择
    selectChange: function (e) {
      console.log('e',e)
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
    // 二次签名
    // wxappPay(res){
    //   // var payObj = res.data.data.pay;
    //   // var payData = JSON.stringify({
    //   //   nonceStr:res.data.data.pay.noncestr,
    //   //   package:res.data.data.pay.package,
    //   //   paysign:res.data.data.pay.paysign,
    //   //   signType:"MD5",
    //   //   timeStamp:res.data.data.pay.timestamp,
    //   // });
    //   // payData = JSON.parse(payData)
    //   console.log('直行道这里是第二次签名')
    //   uni.requestPayment({
    //     nonceStr:res.data.data.pay.noncestr,
    //     package:res.data.data.pay.package,
    //     paysign:res.data.data.pay.paysign,
    //     signType:"MD5",
    //     timeStamp:res.data.data.pay.timestamp,
    //     success: function (res) {
    //     },
    //   });
    // },
    //发起充值form请求
    bind_submit: function (e) {
      console.log('e',e,recharge_money)
      var that = this;
      var user_info = app.globalData.userInfo;
      var uid = app.globalData.uid;
      if (recharge_money == '') {
        uni.showToast({
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
      uni.request({
        url: app.globalData.domain,
        data: {
          a: 'recharge',
          do: 'add_recharge',
          key: app.globalData.key,
          uid: uid,
          recharge_money: recharge_money
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('充值',res)
          if (res.data.code == 1) {
            // that.wxappPay(res)
            var lognoid = res.data.data.logno;
            // var prepayidstr = res.data.data.pay.prepayid.slice(10)
            // console.log('prepayidstr',prepayidstr)
            var payData = JSON.stringify({
                "appid":res.data.data.pay.appid,
                'partnerid':res.data.data.pay.partnerid,
                "package": res.data.data.pay.package,
                "prepayid":res.data.data.pay.prepayid,
                // 'prepayid':res.data.data.pay.prepayid,
								"noncestr":res.data.data.pay.noncestr,
                "timestamp":res.data.data.pay.timestamp,
                'sign':res.data.data.pay.paySign
                
              });
              payData = JSON.parse(payData)
            console.log('payData',payData,payData.prepayid)
            uni.requestPayment({
              provider: 'wxpay',
              orderInfo: payData,  
              success: function (res) {
                uni.showToast({
                  title: 'res',
                  icon: 'success',
                  duration: 1500
                });
                console.log('res',res)
                // 微信支付成功回调
                uni.redirectTo({
                  url: '/pages/user/account_success/account_success?lognoid=' + lognoid
                });
              },
              fail: function (res) {
                console.log('res',res)
                uni.showToast({
                  title: '取消支付',
                  icon: 'success',
                  duration: 1500
                });
              }
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