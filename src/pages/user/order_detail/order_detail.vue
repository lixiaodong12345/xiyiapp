<template>
  <view class="body">
    <view class="order_static">
      <image
        src="http://wximage.shedongyun.com/sdo2o/back_detail.png"
        class="back_detail"
      ></image>
      <view
        class="detail_main"
        v-if="
          order_info.order_status != '' || order_info.order_status != undefind
        "
      >
        <view class="detail_cont">
          <image
            mode="widthFix"
            src="http://wximage.shedongyun.com/sdo2o/car_send.png"
            class="status_type"
            v-if="
              order_info.order_desc == '商家取件中' ||
                order_info.order_desc == '商家配送中'
            "
          ></image>
          <image
            mode="widthFix"
            src="http://wximage.shedongyun.com/sdo2o/car_state.png"
            class="status_type"
            v-else-if="order_info.order_desc == '等待商家上门取件'"
          ></image>
          <image
            mode="widthFix"
            src="http://wximage.shedongyun.com/sdo2o/car_clear.png"
            class="status_type"
            v-else-if="order_info.order_desc == '商家清洗中'"
          ></image>
          <image
            mode="widthFix"
            src="http://wximage.shedongyun.com/sdo2o/car_finish.png"
            class="status_type finish_status"
            v-else-if="order_info.order_desc == '订单交易完成'"
          ></image>
          <view class="status">{{ order_info.order_status }}</view>
          <view class="status_t" v-if="order_info.order_status_flag == 1"
            >请在{{ gradeTime }}分{{
              countDownNum
            }}秒完成支付，超时将取消订单</view
          >
          <view class="status_t" v-else>{{ order_info.order_desc }}</view>
        </view>
      </view>
    </view>

    <!-- <view wx:if="{{order_info.express_one.data.content!=null}}" data-id='{{order_info.id}}' bindtap='gologistic'  class="agin_welcome">
    <image mode='widthFix' src="http://wximage.shedongyun.com/sdo2o/car_go.png"></image>
    <view class="welcome_danhao">
      <text class='info'>{{order_info.express_one.data.content}}</text>
      <text class='data'>{{order_info.express_one.data.time}}</text>
      <image mode='widthFix' class='right' src='http://wximage.shedongyun.com/sdo2o/select_specia.png'></image>
    </view>
  </view> -->
    <!-- <view class="pay_info">
    <view class="pay_info_left">
     <image mode='widthFix' src="http://wximage.shedongyun.com/sdo2o/adress_ico.png"></image>
    </view>
    <view class="pay_info_right">
      <view class='top'>收货人:{{order_info.address_info.realname}}  <text>{{order_info.address_info.mobile}}</text></view>
      <view class='bot'>地址:{{order_info.address_info.province}}{{order_info.address_info.city}}{{order_info.address_info.area}}</view>
    </view>
  </view> -->

    <view class="borderh4"></view>
    <block
      v-for="(item, index) in order_info.list"
      :key="index"
      v-if="order_info.list != null"
    >
      <view class="title">
        <view class="title_date">
          <image
            src="http://wximage.shedongyun.com/sdo2o/order_merch.png"
            class="store_picture"
          ></image>
          <text class="store_name">{{ item.merchname }}</text>
          <image
            src="http://wximage.shedongyun.com/sdo2o/order_skip.png"
            class="skip_right"
          ></image>
        </view>
      </view>
      <block v-for="(list_item, index2) in item.goods_list" :key="index2">
        <navigator :url="'/pages/goods/goods?goods_id=' + list_item.id">
          <view class="goods_list">
            <image class="cart_list_image" :src="list_item.thumb"></image>
            <view class="goods_one">
              <text class="goods_title">{{ list_item.title }}</text>
              <view class="goods_price">
                <text class="goods_number"
                  ><text class="symbol">￥</text
                  >{{ list_item.marketprice }}</text
                >
                <text class="real_name">标准服务</text>
              </view>
              <text class="goods_unit"
                ><text class="unit_symbol">X</text>1</text
              >
              <!-- <text class="shop_price">￥{{list_item.marketprice}}</text>
              <block wx:for-items="{{list_item.goods_spec}}" wx:for-item="specificate">
                <text class="goods_attr">{{specificate}}</text>
              </block> -->
            </view>
          </view>
        </navigator>
      </block>
    </block>
    <block v-if="order_info.list == null">
      <view class="title">
        <view class="title_date">
          <image
            src="http://wximage.shedongyun.com/sdo2o/order_merch.png"
            class="store_picture"
          ></image>
          <text class="store_name">{{ order_info.merchname }}</text>
          <image
            src="http://wximage.shedongyun.com/sdo2o/order_skip.png"
            class="skip_right"
          ></image>
        </view>
      </view>
      <block v-for="(list_item, index) in goods_list" :key="index">
        <navigator :url="'/pages/goods/goods?goods_id=' + list_item.id">
          <view class="goods_list">
            <image class="cart_list_image" :src="list_item.thumb"></image>
            <view class="goods_one">
              <text class="goods_title">{{ list_item.title }}</text>
              <view class="goods_price">
                <text class="goods_number"
                  ><text class="symbol">￥</text
                  >{{ list_item.marketprice }}</text
                >
                <text class="real_name">标准服务</text>
              </view>
              <text class="goods_unit"
                ><text class="unit_symbol">X</text>1</text
              >
              <!-- <text class="shop_price">￥{{list_item.marketprice}}</text>
            <view class='good_attr_box'>
              <block wx:for-items="{{list_item.goods_spec}}" wx:for-item="specificate">
                <text class="goods_attr">{{specificate}}</text>
              </block>
              <text class="goods_num">x2</text>
            </view> -->
            </view>
          </view>
        </navigator>
      </block>
    </block>
    <!--总价格-->
    <view class="amount_real">
      <view class="amount_main">
        <text class="amount_first">实付金额:</text>
        <text class="amount_second"
          ><text class="money_symble">￥</text>{{ order_info.price }}</text
        >
      </view>
      <view class="operate_main">
        <!-- <view class="operate_left">
          <image src="http://wximage.shedongyun.com/sdo2o/wechat_detail.png" class="wechat_detail"></image>
          <text class="operate_name">在线联系</text>
        </view>
        <text class="middle_line"></text> -->
        <view
          class="operate_right"
          @tap="phone_call"
          :data-phone="order_info.shop_phone"
        >
          <image
            src="http://wximage.shedongyun.com/sdo2o/phone_detail.png"
            class="phone_detail"
          ></image>
          <text class="operate_name">电话商家</text>
        </view>
      </view>
    </view>
    <view class="borderh4"></view>
    <view class="detail_style">
      <!--一条-->
      <view class="detail_line">
        <text class="line_left">服务时间:</text>
        <text class="line_right">{{ order_info.service_time }}</text>
      </view>
      <view class="detail_line">
        <text class="line_left">收货地址:</text>
        <text class="line_right"
          >{{
            order_info.address_info.province
              ? order_info.address_info.province
              : ""
          }}{{ order_info.address_info.city ? order_info.address_info.city : ""
          }}{{
            order_info.address_info.area ? order_info.address_info.area : ""
          }}</text
        >
      </view>
      <view class="detail_line bottom_line">
        <text class="line_left">联系人:</text>
        <text class="line_right"
          >{{ order_info.address_info.realname
          }}{{ order_info.address_info.mobile }}</text
        >
      </view>
      <view class="detail_line">
        <text class="line_left">订单编号:</text>
        <text class="line_right">{{ order_info.ordersn }}</text>
      </view>
      <view class="detail_line">
        <text class="line_left">下单时间:</text>
        <text class="line_right">{{ order_info.createtime }}</text>
      </view>
    </view>
    <view class="borderh4"></view>
    <view
      class="complaint_main"
      @tap="phone_call"
      :data-phone="order_info.shop_phone"
    >
      <text class="complaint_name">投诉商家</text>
      <image
        src="http://wximage.shedongyun.com/sdo2o/clock_right.png"
        class="phone_right"
      ></image>
    </view>
    <view class="borderh4"></view>
    <view class="borderh4"></view>
    <view class="borderh4"></view>
    <view class="borderh4"></view>
    <view class="order_box">
      <!-- <view class="order_number_time">
        <text>下单时间:{{order_info.createtime}}</text>
        <text>支付方式:微信支付</text>
      </view>
      <view class="oder_total">
        <view class='oder_total_list'>
          <text class='name'>商品总额:</text><text class='num'>￥{{order_info.goodsprice}}</text>
        </view>
        <view class='oder_total_list'>
          <text class='name'>运费:</text><text class='num'>￥{{order_info.dispatchprice}}</text>
        </view>
        <view class='oder_total_list'>
          <text class='name'>实付款:</text><text class='allnum'>￥{{order_info.price}}</text>
        </view>
      </view> -->

      <view class="dele_oder">
        <navigator
          v-if="order_info.status == 0"
          @tap="order_edit"
          :data-order_id="order_info.id"
          data-edit="order_pay"
          hover-class="none"
          class="immed_pay"
          >微信支付</navigator
        >

        <navigator
          v-if="order_info.status == 3"
          @tap="order_evaluat"
          :data-order_id="order_info.id"
          hover-class="none"
          class="immed_pay"
          >去评价</navigator
        >

        <navigator
          v-if="order_info.order_status_flag == 2"
          hover-class="none"
          class="immed_pay"
          :url="
            '../../../pages/refund/refund_apply/refund_apply?order_id=' +
              order_info.id
          "
          >申请退款</navigator
        >

        <navigator
          v-if="order_info.order_status_flag == 3"
          hover-class="none"
          :url="
            '../../../pages/refund/refund_apply/refund_apply?order_id=' +
              order_info.id
          "
          >退款申请</navigator
        >

        <navigator
          v-if="order_info.order_status_flag == 7"
          hover-class="none"
          class="cancel_order"
          @tap="order_received"
          :data-order_id="order_info.id"
          >确认收货</navigator
        >

        <navigator
          v-if="order_info.status == 0"
          @tap="order_cancel"
          :data-order_id="order_info.id"
          data-edit="order_pay"
          class="cancel_order"
          hover-class="none"
          >取消订单</navigator
        >

        <!-- <navigator wx:if="{{order_info.order_status_flag==2}}" bindtap="order_cancel" data-order_id="{{order_info.id}}" 
        data-edit="order_pay" class="cancel_order" hover-class='none'>取消订单</navigator> -->
        <!-- <navigator wx:if="{{order_info.order_status_flag==3}}" bindtap="order_cancel" data-order_id="{{order_info.id}}" 
        data-edit="order_pay" class="cancel_order" hover-class='none'>取消订单</navigator> -->

        <navigator
          v-if="order_info.status == 1 && order_info.refundstate == 1"
          @tap="abolish_cancel"
          hover-class="none"
          >取消申请</navigator
        >
        <!-- <navigator wx:if="{{order_info.status==4}}" bindtap='abolish_cancel' hover-class='none'>取消申请</navigator> -->
        <navigator
          v-if="order_info.status == 2 && order_info.refundstate == 1"
          @tap="abolish_cancel"
          hover-class="none"
          >取消申请</navigator
        >
        <!-- <navigator wx:if="{{order_info.status==1 && order_info.refundstate==0 }}" 
            url="../../../pages/refund/refund_apply/refund_apply?order_id={{order_info.id}}" hover-class='none' class="immed_pay">申请退款            </navigator>
        <navigator wx:if="{{order_info.status==4}}" class="immed_pay">退款申请</navigator> -->
        <!-- <navigator wx:if="{{order_info.status==2 && order_info.refundstate==0}}" bindtap="order_received" 
        data-order_id="{{order_info.id}}" hover-class='none'>确认收货</navigator>
        <navigator wx:if="{{order_info.status==2 && order_info.refundstate==0}}" 
        url="../../../pages/scale/scales_apply/scales_apply?order_id={{order_info.id}}" hover-class='none'>申请退货退款</navigator> -->
      </view>
      <!--<text class="order_text">订单备注:{{order_info.postscript}}</text>-->
    </view>
  </view>
</template>

<script>
// pages/show_news/show_news.js
var order_ids;
var app = getApp();

export default {
  data() {
    return {
      tis: "",
      tisshow: "",
      order_info: "",
      order_id: 0,
      countDownNum: "20",
      gradeTime: "32",
      goods_list: "",
      periodTime: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
    var user_info = app.globalData.userInfo;
    order_ids = options.order_id;

    if (options.msg) {
      that.setData({
        tis: options.msg,
        tisshow: "height:30px;",
      });
    }

    if (!options.order_id) {
      that.setData({
        tis: "订单不存在！",
        tisshow: "height:30px;",
      });
    } else {
      console.log(options.order_id); // 请求订单详情

      that.order_id = options.order_id;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: "ewei_o2o",
          a: "order",
          do: "info",
          key: app.globalData.key,
          orderid: order_ids,
          uid: app.globalData.uid,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          console.log(res.data.data);

          if (res.data.code == 1) {
            that.setData({
              goods_list: res.data.data.goods_list,
              order_info: res.data.data,
            });
            var timeJudge = res.data.data.order_status_flag;
            console.log("timeJudge", timeJudge);

            if (timeJudge == 1) {
              that.setData({
                periodTime: res.data.data.order_desc,
              });
            } //分解倒计时分秒

            that.countdown();
          } else {
            that.setData({
              tis: "加载订单出错！",
              tisshow: "height:30px;",
            });
          }
        },
      });
    } //倒计时

    if (that.gradeTime != 0) {
      setInterval(function() {
        if (that.countDownNum == 0) {
          that.countDownNum = "59";
        }

        that.setSecondDown();
      }, 1000);
    } else {
      wx.showModal({
        title: "提示",
        content: "该订单已超时！",

        success(res) {
          if (res.confirm) {
            uni.navigateTo({
              url: "/pages/user/order_list/order_list?order_status=all",
            });
          } else if (res.cancel) {
            uni.navigateTo({
              url: "/pages/user/order_list/order_list?order_status=all",
            });
          }
        },
      });
    }
  },
  onShow: function() {
    var that = this;
  },
  onUnload: function() {
    var that = this;
  },
  onHide: function() {
    var that = this;
  },
  methods: {
    // 跳转物流详情
    gologistic: function(e) {
      console.log(e);
      uni.navigateTo({
        url:
          "../../../pages/user/Logistics/Logistics?orderid=" +
          e.currentTarget.dataset.id,
      });
    },
    // 退款退货订单申请
    return_refund: function() {
      var that = this;
      var user_info = app.globalData.userInfo;
      uni.navigateTo({
        url: "../../../pages/scale/scales_apply/scales_apply?",
      });
    },

    /*取消订单*/
    order_cancel: function(e) {
      var that = this;
      var user_info = app.globalData.userInfo;
      var uid = app.globalData.uid;
      var orderid = e.currentTarget.dataset.order_id;
      wx.redirectTo({
        url:
          "/pages/user/order_cancel/order_cancel?uid=" +
          uid +
          "&orderid=" +
          orderid,
      });
    },

    /* 订单确认收货*/
    order_received: function(e) {
      var user_info = app.globalData.userInfo;
      var that = this;

      if (!e.target.dataset.order_id) {
        return 0;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          a: "order",
          do: "receive",
          orderid: e.target.dataset.order_id,
          uid: app.globalData.uid,
          key: app.globalData.key,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            if (res.data.data.order_is_receive == 1) {
              wx.showToast({
                title: res.data.msg,
                icon: "success",
                duration: 1500,
                success: function() {
                  setTimeout(function() {
                    uni.navigateTo({
                      url:
                        "/pages/user/order_list/order_list?order_status=complete",
                    });
                  }, 2000);
                },
              });
            }
          }
        },
      });
    },
    // 立即付款
    order_edit: function(e) {
      // 订单操作函数,接收订单号，以及操作标示符号
      console.log(
        "对订单:" + e.target.dataset.order_id + "进行:" + e.target.dataset.edit
      );
      var user_info = app.globalData.userInfo;
      var that = this;

      if (!e.target.dataset.order_id) {
        return 0;
      }

      if (e.target.dataset.edit) {
        // 发送订单号和操作标示到后台
        wx.request({
          url: app.globalData.domain,
          data: {
            a: "order",
            do: "app_order_pay",
            orderid: e.target.dataset.order_id,
            uid: app.globalData.uid,
            key: app.globalData.key,
          },
          header: {
            "content-type": "application/json",
          },
          success: function(res) {
            console.log("调用微信支付", res);
            if (res.data.code == 1) {
              var payData = JSON.stringify({
                appid: res.data.data.pay.appid,
                partnerid: res.data.data.pay.partnerid,
                package: res.data.data.pay.package,
                prepayid: res.data.data.pay.prepayid,
                // 'prepayid':res.data.data.pay.prepayid,
                noncestr: res.data.data.pay.noncestr,
                timestamp: res.data.data.pay.timestamp,
                sign: res.data.data.pay.paySign,
              });
              payData = JSON.parse(payData);
              console.log("payData", payData, payData.prepayid);
              wx.requestPayment({
                provider: "wxpay",
                orderInfo: payData,
                success: function(re) {
                  wx.showToast({
                    title: "支付成功!",
                    icon: "success",
                    duration: 1000,
                  }); // 微信支付成功

                  wx.request({
                    // "更改订单状态操作",
                    url: app.globalData.domain,
                    data: {
                      c: "ewei_o2o",
                      a: "order",
                      do: "order_pay",
                      key: app.globalData.key,
                      uid: app.globalData.uid,
                      orderid: res.data.data.order_id,
                    },
                    header: {
                      "content-type": "application/json",
                    },
                    success: function(res) {
                      if (res.data.code == 1) {
                        wx.redirectTo({
                          url: "/pages/done/done",
                        });
                      }
                    },
                    fail: function() {
                      wx.showToast({
                        title: "订单状态更改失败",
                        icon: "loading",
                        duration: 1500,
                      });
                    },
                  });
                },
                fail: function(re) {
                  console.log(re);
                },
                complete: function(re) {
                  console.log(re);
                },
              });
            }

            /*
            if (res.data.err == '07') {
              // 微信支付,获取用户code
              wx.login({
                success: function (res2) {
                  if (res2.code) {
                    that.pay_order(res2.code, res.data.log_id, e.target.dataset.order_id);
                  } else {
                    console.log('获取用户信息失败！' + res2.errMsg)
                  }
                }
              });
            }
            else {
              console.log("跳转跳转跳转");
              // 直接跳转到详情页,并将操作结果提示出来
              // uni.navigateTo({
              //   url: '/pages/user/order_detail/order_detail?msg=' + res.data.msg + '&order_id=' + e.target.dataset.order_id
              // })
            }*/
          },
        });
      }
    },

    /*支付订单*/
    pay_order: function(code, log_id, order_id) {
      //console.log("支付操作")
      var user_info = app.globalData.userInfo;
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          act: "wxpay_done",
          uid: user_info.user_id,
          sign: user_info.sign,
          log_id: log_id,
          user_code: code,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          //console.log(res);
          if (res.data.err == 0) {
            // 发起支付
            console.log("发起支付");
            wx.requestPayment({
              timeStamp: String(res.data.order.timeStamp),
              nonceStr: res.data.order.nonceStr,
              package: res.data.order.package,
              signType: "MD5",
              paySign: res.data.order.paySign,
              success: function(res) {
                // 微信支付成功
                //console.log("支付完成")
                wx.request({
                  url: app.globalData.domain + app.globalData.user,
                  data: {
                    act: "order_updata",
                    edit_type: "order_payed",
                    order_id: order_id,
                    uid: user_info.user_id,
                    sign: user_info.sign,
                    type: 1,
                  },
                  header: {
                    "content-type": "application/json",
                  },
                  success: function(res) {
                    // 订单状态更改成功
                    wx.redirectTo({
                      url:
                        "/pages/user/order_detail/order_detail?order_id=" +
                        order_id,
                    });
                  },
                  fail: function() {
                    wx.showToast({
                      title: "订单状态更改失败",
                      icon: "loading",
                      duration: 10000,
                    });
                  },
                });
              },
              fail: function() {
                // 微信支付失败
                wx.showToast({
                  title: "微信支付失败",
                  icon: "loading",
                  duration: 10000,
                });
              },
            });
          }
        },
        complete: function() {
          console.log("button_load");
        },
      });
    },
    // 取消退款申请
    abolish_cancel: function() {
      var that = this;
      var user_info = app.globalData.userInfo;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: "ewei_o2o",
          a: "refund",
          do: "cancel",
          key: app.globalData.key,
          orderid: order_ids,
          uid: user_info.uid,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            console.log("取消退款申请成功");
            wx.showToast({
              title: res.data.msg,
              icon: "success",
              duration: 1500,
              success: function() {
                setTimeout(function() {
                  wx.redirectTo({
                    url: "/pages/user/order_list/order_list?order_status=all",
                  });
                }, 1500);
              },
            });
          } else {
            console.log("取消退款申请失败");
            wx.showToast({
              title: "取消退款申请失败",
              icon: "success",
              duration: 1500,
            });
          }
        },
      });
    },
    // 打电话
    phone_call: function(e) {
      var that = this;
      var phone_value = e.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone_value,
      });
    },
    //去评价
    order_evaluat: function(e) {
      var that = this;
      var order_id = e.currentTarget.dataset.order_id;
      uni.navigateTo({
        url: "/pages/evaluate_release/evaluate_release?order_id=" + order_id,
      });
    },
    //分解倒计时分秒
    countdown: function() {
      var that = this;
      var operateTime = that.periodTime;

      if (operateTime != undefined) {
        var numbTime = operateTime.split(/[^0-9]/);
        var newTime = [];

        for (var i = 0; i < numbTime.length; i++) {
          if (numbTime[i] == "") {
          } else {
            newTime.push(numbTime[i]);
          }
        }

        console.log("newTime", newTime);
        that.gradeTime = newTime[0];
        that.countDownNum = newTime[1];
        that.setData({
          gradeTime: that.gradeTime,
          countDownNum: that.countDownNum,
        });
      }
    },
    //一个函数——专门倒计时
    setSecondDown: function() {
      var that = this;
      var countDownNum = that.countDownNum; //获取倒计时初始值

      countDownNum--;
      that.setData({
        countDownNum: countDownNum,
      });

      if (countDownNum == 0) {
        that.countDownNum = "59";
        that.setData({
          countDownNum: countDownNum,
        });
        var gradeTime = that.gradeTime;
        gradeTime--;
        that.setData({
          gradeTime: gradeTime,
        });
      }
    },
  },
};
</script>
<style>
@import "./order_detail.css";
</style>
