<template>
<!--pages/refund/refund_apply/refund_apply.wxml-->
<form @submit="search_scale">
<view class="wrapper">
  <view class="border-height"></view>
  <view class="wrapper-main">
  <view class="cont-main">
   <view class="cont">
     <text class="cont-left">处理方式</text>
     <view class="cont-right"><text class="cont-right-font">退款</text></view>
   </view>
  </view>
  <view class="cont-main">
   <view class="cont">
     <text class="cont-left">订单编号</text>
     <view class="cont-right">
       <text class="cont-right-font">{{order_info_ordersn}}</text>
     </view>
   </view>
  </view>
  <view class="cont-main">
   <view class="cont">
     <text class="cont-left">退款原因</text>
     <view class="cont-right">
       <view class="phone_one" @tap="clickPerson">
       <input name="firstPerson" :value="firstPerson" type="text" style="display:none;"></input>
         <view class="phone_personal">{{firstPerson}}</view>
         <image src="http://wximage.shedongyun.com/sdo2o/ding.png" :class="'personal_image ' + (selectArea ? 'rotateRight' :'')"></image>
       </view>
       <view class="person_box">
         <view class="phone_select" :hidden="selectPerson">
           <view class="select_one" @tap="mySelect" data-me="拍错/多拍/不想要">拍错/多拍/不想要</view>
           <view class="select_one" @tap="mySelect" data-me="协商一致退款">协商一致退款</view>
           <view class="select_one" @tap="mySelect" data-me="缺货">缺货</view>
           <view class="select_one" @tap="mySelect" data-me="未按规定时间发货">未按规定时间发货</view>
           <view class="select_one" @tap="mySelect" data-me="其它">其它</view>
         </view>
       </view>
     </view>
   </view>
  </view>
  <view class="cont-main">
   <view class="cont">
     <text class="cont-left">退款说明</text>
     <view class="cont-right">
      <input class="cont-right-input" name="refund_content" :value="refund_content" type="text" placeholder="选填"></input>
     </view>
   </view>
  </view>
   <view class="cont-main">
   <view class="cont">
     <text class="cont-left">退款金额</text>
     <view class="cont-right"><text class="cont-right-font">{{order_info_price}}</text></view>
   </view>
  </view>
   <view class="cont-main">
   <view class="cont cont-padding">
     <text class="cont-left">上传凭证</text>
     <view class="cont-right" @tap="gain_image">
       <image src="http://wximage.shedongyun.com/sdo2o/give_upload.png" class="cont-right-img"></image>
     </view>
     <view class="cont-right" style="margin-top:16rpx;">
       <input name="source" :value="source_img" type="text" style="display:none;"></input>
       <image :src="source" class="cont-right-img-cont"></image>
     </view>
   </view>
  </view>
  <view class="cont-main">
     <view class="main-bottom">
      <text class="cont-main-bottom">提示：您可退款的金额为{{order_info_price}}元</text>
     </view>
  </view>
  <view class="apply-main">
     <button type="warn" form-type="submit" class="apply-font" style="background:#fff;height:72rpx;line-height:50rpx;">取消</button>
     <button type="warn" form-type="submit" class="apply-font apply-font-first" style="background:#fff;height:72rpx;line-height:50rpx;">提交申请</button>
  </view>
  </view>
</view>
</form>
</template>

<script>
// pages/refund/refund_apply/refund_apply.js
var app = getApp();
var order_id;

export default {
  data() {
    return {
      selectPerson: true,
      selectArea: false,
      firstPerson: "选择退款理由",
      refund_list: "",
      order_info_ordersn: "",
      order_info_price: "",
      source: "",
      source_img: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    order_id = options.order_id, console.log(order_id + '传递的id号');
  },
  onReady: function () {},
  onShow: function () {
    this.return_money();
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  methods: {
    // 退款退货申请接口
    search_scale: function (e) {
      var that = this;
      var user_info = app.globalData.userInfo;
      var refund_content = e.detail.value.refund_content;
      var refund_reason = e.detail.value.firstPerson;
      var refund_images = e.detail.value.source;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'refund',
          do: 'refund',
          key: app.globalData.key,
          uid: user_info.uid,
          orderid: order_id,
          //订单id
          rtype: 0,
          //处理方式 退款
          reason: refund_reason,
          //退款原因
          content: refund_content,
          //退款说明
          images: refund_images //上传凭证

        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              refund_list: res.data.data.user_is_refund
            });
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1500,
              success: function () {
                wx.redirectTo({
                  url: '/pages/refund/refund_handling/refund_handling?order_id=' + order_id
                });
              }
            });
          } else {
            wx.showToast({
              title: '申请退款失败',
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
    // 加载获取订单编号和退款金额
    return_money: function () {
      var that = this;
      var user_info = app.globalData.userInfo;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'order',
          do: 'info',
          key: app.globalData.key,
          orderid: order_id,
          uid: user_info.uid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              order_info_ordersn: res.data.data.ordersn,
              order_info_price: res.data.data.price
            });
          } else {}
        }
      });
    },
    // 获取图片
    gain_image: function () {
      var that = this;
      wx.chooseImage({
        count: 6,
        sizeType: ['original', 'compressed'],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.setData({
            source: res.tempFilePaths
          });
          var tempFilePaths = res.tempFilePaths;
          var uploadurl = app.globalData.domain + "&a=refund&do=uploadImage&key=" + app.globalData.key;
          wx.uploadFile({
            url: uploadurl,
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (rs) {
              console.log(rs);

              if (rs.code == 0) {
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                });
                return;
              }

              that.setData({
                source_img: rs.data
              });
            },
            fail: function (e) {
              wx.showModal({
                title: '提示',
                content: '上传失败!',
                showCancel: false
              });
            },
            complete: function () {
              wx.hideToast(); //隐藏Toast
            }
          });
        }
      });
    },
    //点击选择类型
    clickPerson: function () {
      var selectPerson = this.selectPerson;

      if (selectPerson == true) {
        this.setData({
          selectArea: true,
          selectPerson: false
        });
      } else {
        this.setData({
          selectArea: false,
          selectPerson: true
        });
      }
    },
    //点击切换
    mySelect: function (e) {
      this.setData({
        firstPerson: e.target.dataset.me,
        selectPerson: true,
        selectArea: false
      });
    },
    titijiao: function () {
      wx.redirectTo({
        url: '/pages/refund/refund_handling/refund_handling'
      });
    }
  }
};
</script>
<style>
@import "./refund_apply.css";
</style>