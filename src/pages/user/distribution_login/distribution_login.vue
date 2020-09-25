<template>
<view>
<!--pages/user/distribution_login/distribution_login.wxml-->
<!--<import src="../../../wxParse/wxParse.wxml"></import>-->
<form @submit="send_info">
<view class="wrapper">
  <view class="banner">
    <image src="http://wximage.shedongyun.com/sdo2o/001.png"></image>
  </view>
  <view class="user_infomation">
     <view class="info_cont">
       <view class="cont">
         <text class="title">请填写申请信息</text>
       </view>
     </view>
     <view class="info_cont">
       <view class="cont">
         <view class="left_cont">
         <text class="left_title">邀请人</text>
         </view>
         <view class="right_cont">
            <text class="right_cont_title">{{agent_name}}</text>
         </view>
       </view>
     </view>
     <view class="info_cont">
       <view class="cont">
         <view class="left_cont">
         <text class="left_title">姓名</text><text class="left_color">*</text>
         </view>
         <view class="right_cont">
            <input class="right_cont_input" name="username" :value="username" placeholder="请输入姓名" required="required"></input> 
         </view>
       </view>
     </view>
     <view class="info_cont">
       <view class="cont">
         <view class="left_cont">
         <text class="left_title">联系方式</text><text class="left_color">*</text>
         </view>
         <view class="right_cont">
            <input class="right_cont_input" name="phone" :value="phone" placeholder="请输入手机号"></input> 
         </view>
       </view>
     </view>
     <!--用户入驻协议-->
     <view class="radio_width">
       <view class="cont">
        <view class="radio_wrap">
          <radio-group class="radio-group" @change="selectChange">
            <input name="liab_check" :value="check_value" hidden="true"></input>
            <label class="radio_cont">
              <image :src="read_empty" class="exemp" :style="original"></image> 
              <image :src="read_select" class="exemp" :style="original_select"></image> 
              <checkbox value="1" checked hidden="true"></checkbox>
            </label>
          </radio-group>
        </view> 
        <text class="liab_title">{{disclaimer_title}}</text>
        <text class="liab_name" @tap="statement_skip">{{disclaimer_font}}</text>
       </view>
     </view><!--协议-->
  </view>
   <view class="bottom_wrap">
     <button type="warn" form-type="submit" :loading="loading" class="save_button">申请成为分销商</button>
   </view>
</view>
</form>
<!--协议弹框-->
<view class="agree_mark" :style="mark_state">
  <view class="agree_cont">
    <view class="agree_title">《{{applytitle}}》</view>
    <view class="agree_height">
      <scroll-view class="scroll_main" scroll-y="true">
      <view class="agree_main">
        <jyf-parser :html="article_agreeContent"></jyf-parser>
      </view>
      </scroll-view>
    </view>
    <text class="agree_button" @tap="statement_shut">确定</text>
  </view>
</view>
</view>
</template>

<script>

// pages/user/distribution_login/distribution_login.js
var app = getApp();

export default {
  data() {
    return {
      original: 'display:block',
      original_select: 'display:none',
      read_empty: "/static/static/images/read_empty.png",
      read_select: "/static/static/images/read_select.png",
      disclaimer_font: '《分销商协议》',
      disclaimer_title: '点击同意成为',
      mark_state: 'display:none',
      check_value: '',
      agent_name: "",
      loading: false,
      refund_list: "",
      applytitle: "",
      article_agreeContent: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var user_info = app.globalData.userInfo;
    console.log('user_info', user_info);
    that.setData({
      agent_name: user_info.agent_name
    });
    that.warm_prompt();
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  methods: {
    //申请成为分销商
    send_info: function (e) {
      var that = this;
      var user_info = app.globalData.userInfo;
      console.log(user_info);
      /*点击等待效果*/

      that.setData({
        loading: true
      }); //判断input的值不为空的时候执行这个函数

      var username = e.detail.value.username;
      var phone = e.detail.value.phone;
      var liab_check = e.detail.value.liab_check; //姓名判断

      if (username == null || username == '') {
        wx.showToast({
          title: "姓名不能为空",
          duration: 1000
        });
        that.setData({
          loading: false
        });
        return;
      } //手机号判断


      if (phone == null || phone == '' || phone.length == 0) {
        wx.showToast({
          title: "手机号不能为空",
          duration: 1000
        });
        that.setData({
          loading: false
        });
        return;
      }

      if (phone.length != 11) {
        wx.showToast({
          title: "请输入正确手机号",
          duration: 1000
        });
        that.setData({
          loading: false
        });
        return;
      }

      if (liab_check == 0) {
        wx.showToast({
          title: "请确认协议",
          duration: 1000
        });
        return;
      }
      /*调用申请成为分销商接口*/


      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_shopv2',
          a: 'commission',
          do: 'apply',
          key: app.globalData.key,
          uid: user_info.id,
          username: username,
          //姓名
          phone: phone //手机号

        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);

          if (res.data.code == 1) {
            console.log(res.data);
            that.setData({
              loading: false,
              refund_list: res.data.data.user_is_refund
            });
            setTimeout(function () {
              uni.navigateTo({
                url: '/pages/user/distribution_submit/distribution_submit'
              });
            }, 1500);
          } else if (res.data.code == 2) {
            setTimeout(function () {
              uni.navigateTo({
                url: '/pages/user/distribution_success/distribution_success'
              });
            }, 1500);
          } else {
            console.log('+++++++++++++++++++++++++++++++++++++++++++');
          }
        }
      });
    },
    // 协议
    selectChange: function (e) {
      var that = this;
      var check_value = e.detail.value;

      if (check_value == 1) {
        that.setData({
          original: 'display:none',
          original_select: 'display:block',
          check_value: check_value
        });
      } else {
        that.setData({
          original: 'display:block',
          original_select: 'display:none',
          check_value: check_value
        });
      }
    },
    statement_skip: function () {
      var that = this;
      that.setData({
        mark_state: 'display:block'
      });
    },
    statement_shut: function () {
      var that = this;
      that.setData({
        mark_state: 'display:none'
      });
    },
    warm_prompt: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'commission',
          do: 'withdrawcharge',
          key: app.globalData.key
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('信息回值', res);

          if (res.data.code == 1) {
            // 内容
            //WxParse.wxParse('agreeContent', 'html', res.data.data.applycontent, that, 5)
            setTimeout(() => {
              that.article_agreeContent = res.data.data.applycontent;
            }, 200);
            that.setData({
              applytitle: res.data.data.applytitle
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./distribution_login.css";
</style>