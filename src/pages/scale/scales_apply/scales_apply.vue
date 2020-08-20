<template>
<!--pages/return/scales/scales.wxml-->
<form @submit="search_scale">
<view class="wrapper">
  <view class="border-height"></view>
  <view class="wrapper-main">
  <view class="cont-main">
   <view class="cont">
     <text class="cont-left">处理方式</text>
     <view class="cont-right">
       <text name="refund_style" class="cont-right-font">退货退款</text>
     </view>
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
         <view class="phone_personal" :reason="firstPerson">{{firstPerson}}</view>
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
      <input name="refund_content" :value="refund_content" type="text" class="cont-right-input" placeholder="选填"></input>
     </view>
   </view>
  </view>

   <view class="cont-main">
   <view class="cont">
     <text class="cont-left">退款金额</text>
     <view class="cont-right">
      <text class="cont-right-font" :money="order_info_price">{{order_info_price}}</text>
     </view>
   </view>
  </view>

   <view class="cont-main">
   <view class="cont cont-padding">
     <text class="cont-left">上传凭证</text>
     <view class="cont-right" @tap="gain_image">
       <image src="http://wximage.shedongyun.com/sdo2o/chuan.png" class="cont-right-img"></image>
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
     <button type="warn" form-type="submit" :loading="loading" class="apply-font" style="background:#fff;height:72rpx;line-height:68rpx;">取消</button>
     <button type="warn" form-type="submit" :loading="loading" class="apply-font apply-font-first" style="background:#fff;height:72rpx;line-height:68rpx;">提交申请</button>
  </view>

 </view>
</view>

</form>
</template>

<script>
// pages/return/scales/scales.js
var app = getApp();
var order_id;

export default {
  data() {
    return {
      selectPerson: true,
      selectArea: false,
      firstPerson: "选择退款理由",
      loading: false,
      source: "",
      refund_list: "",
      order_info_ordersn: "",
      order_info_price: "",
      source_img: ""
    };
  },

  components: {},
  props: {},

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    order_id = options.order_id;
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},

  /*生命周期函数--监听页面显示*/
  onShow: function () {
    this.return_money();
  },

  /*生命周期函数--监听页面隐藏*/
  onHide: function () {},

  /* 生命周期函数--监听页面卸*/
  onUnload: function () {},

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {},

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {},
  methods: {
    // 退款退货申请接口
    search_scale: function (e) {
      var that = this;
      var user_info = app.globalData.getUserInfo();
      that.setData({
        loading: true
      });
      var refund_content = e.detail.value.refund_content;
      var refund_reason = e.detail.value.firstPerson;
      var refund_images = e.detail.value.source;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_shopv2',
          a: 'refund',
          do: 'refund',
          key: app.globalData.key,
          openid: user_info.openid,
          orderid: order_id,
          //订单id
          rtype: 1,
          //处理方式 退款退货
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
            console.log('处理成功');
            console.log(res.data.msg + '888888');
            that.setData({
              loading: false,
              refund_list: res.data.data.user_is_refund
            });
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 5000
            });
            wx.navigateTo({
              url: '/pages/scale/handling/handling?order_id=' + order_id
            });
          } else {
            console.log(res.data);
            console.log('00000000000000000000000000000');
            wx.showToast({
              title: '申请退款失败',
              icon: 'success',
              duration: 5000
            });
            that.setData({
              loading: false
            });
          }
        }
      });
    },
    // 加载获取订单编号和退款金额
    return_money: function () {
      var that = this;
      var user_info = app.globalData.getUserInfo();
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_shopv2',
          a: 'order',
          do: 'info',
          key: app.globalData.key,
          orderid: order_id,
          openid: user_info.openid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            console.log("订单加载成功");
            that.setData({
              order_info_ordersn: res.data.data.ordersn,
              order_info_price: res.data.data.price
            });
          } else {
            console.log('订单加载出错');
          }
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
        url: '/pages/scale/handling/handling?order_id='
      });
    }
  }
};
</script>
<style>
@import "./scales_apply.css";
</style>