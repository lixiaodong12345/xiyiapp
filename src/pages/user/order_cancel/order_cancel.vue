<template>
  <view class="container">
    <view class="cancel_title">
      <text>请告知我们取消原因，我们会持续改进</text>
    </view>
    <view class="cancel_wrap">
      <radio-group @change="checkboxChange">
        <!--一条-->
        <block v-for="(item, index) in reasonList" :key="index">
          <view class="cancel_line">
            <text class="cancel_reason">{{ item.reasionname }}</text>
            <view class="cancel_select">
              <image
                src="http://wximage.shedongyun.com/sdo2o/false.png"
                :class="
                  'select_logo ' + (item.checked == true ? 'hide' : 'show')
                "
              ></image>
              <image
                src="http://wximage.shedongyun.com/sdo2o/true.png"
                :class="
                  'select_logo ' + (item.checked == true ? 'show' : 'hide')
                "
              ></image>
              <label class="checkbox_check">
                <radio :value="item.id" :checked="item.checked"></radio>
              </label>
            </view> </view
          ><!--一条结束-->
        </block>
      </radio-group>
    </view>
    <!--确定按钮-->
    <view class="calcel_button" @tap="order_cancel">确定</view>
  </view>
</template>

<script>
var app = getApp();
var uid;
var orderid;
var reasion = "";

export default {
  data() {
    return {
      reasonList: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
    uid = options.uid;
    orderid = options.orderid;
    that.reason_list();
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  methods: {
    //原因数据
    reason_list: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "order",
          do: "reasion_list",
          key: app.globalData.key,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          console.log("取消原因", res);

          if (res.data.code == 1) {
            that.setData({
              reasonList: res.data.data,
            });
          }
        },
      });
    },
    checkboxChange: function(e) {
      var that = this;
      var reason_id = e.detail.value;
      var reasonList = that.reasonList;

      for (var i = 0; i < reasonList.length; i++) {
        if (reasonList[i].id == reason_id) {
          reasonList[i].checked = true;
          reasion = reasonList[i].reasionname;
        } else {
          reasonList[i].checked = false;
        }
      }

      that.setData({
        reasonList: reasonList,
      });
    },

    /*取消订单*/
    order_cancel: function(e) {
      var that = this;

      if (reasion == "") {
        wx.showToast({
          title: "请选择原因",
          icon: "succcess",
          duration: 2000,
        });
        return;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          a: "order",
          do: "cancel",
          key: app.globalData.key,
          orderid: orderid,
          uid: uid,
          reasion: reasion,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            wx.showToast({
              title: "取消成功",
              icon: "success",
              duration: 1500,
              success: function() {
                setTimeout(function() {
                  wx.redirectTo({
                    url: "/pages/user/order_list/order_list?order_status=all",
                  });
                }, 1000);
              },
            });
          }
        },
      });
    },
  },
};
</script>
<style>
@import "./order_cancel.css";
</style>
