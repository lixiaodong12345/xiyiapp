<template>
  <view class="body">
    <view class="navswich">
      <view class="one_block" @tap="nav_switch" data-nav="all">
        <text :class="order_status == 'all' ? 'current_nav' : ''">全部</text>
      </view>
      <view class="one_block" @tap="nav_switch" data-nav="payment">
        <text :class="order_status == 'payment' ? 'current_nav' : ''"
          >待付款</text
        >
      </view>
      <view class="one_block" @tap="nav_switch" data-nav="paid">
        <text :class="order_status == 'paid' ? 'current_nav' : ''">待接单</text>
      </view>
      <view class="one_block" @tap="nav_switch" data-nav="shipped">
        <text :class="order_status == 'shipped' ? 'current_nav' : ''"
          >待服务</text
        >
      </view>
      <view class="one_block" @tap="nav_switch" data-nav="complete">
        <text :class="order_status == 'complete' ? 'current_nav' : ''"
          >已完成</text
        >
      </view>
      <!-- <navigator url="/pages/user/order_list/order_list?order_status=back" redirect="true" hover-class="none">
      <view class="one_block completed_oder wait_good_oder_01" wx:if="{{order_status =='back' }}">
        <text>退换货</text>
      </view>
      <view class="completed_oder_none" wx:else>
        <text>退换货</text>
      </view>
    </navigator> -->
    </view>
    <view class="scroll_view">
      <view class="back_line"></view>
      <block
        v-for="(item, index) in order_list"
        :key="index"
        v-if="order_list != null"
      >
        <view class="list">
          <!--头部状态-->
          <view class="title">
            <view class="title_date">
              <!-- <text class="store_name">订单号</text>
            <text class="store_name">{{item.ordersn}}</text> -->
              <image
                src="http://wximage.shedongyun.como2o/order_merch.png"
                class="store_picture"
              ></image>
              <text class="store_name">{{ item.merchname }}</text>
              <image
                src="http://wximage.shedongyun.com/sdo2o/order_skip.png"
                class="skip_right"
              ></image>
            </view>
            <view class="wait_goods">
              <!-- <text wx:if="{{item.status == 2 || (item.status == 1 && item.sendtype > 0)}}">待服务</text> -->
              <block v-if="item.refundid != 0">
                <text v-if="item.refundtime != 0">退款完成</text>
                <text v-else>退款中</text>
              </block>
              <block v-else>
                <text v-if="item.status == 0 && item.paytype != 3">待付款</text>
                <text
                  v-if="
                    item.status == 1 || (item.status == 0 && item.paytype == 3)
                  "
                  >待接单</text
                >
                <text v-if="item.status == -1 && item.refundtime == 0"
                  >已取消</text
                >
                <text v-if="item.status == 2">待取件</text>
                <text v-if="item.status == 4">取件中</text>
                <text v-if="item.status == 5">洗护处理中</text>
                <text v-if="item.status == 6">配送中</text>
                <text v-if="item.status == 7">配送完成</text>
                <text v-if="item.status == 3">已完成</text>
              </block>
            </view>
            <!-- <view class="wait_goods">
            <text wx:if="{{item.status == 0 && item.paytype != 3}}">待付款</text>
            <text wx:if="{{(item.status == 1 || (item.status == 0 && item.paytype == 3)) && item.refundstate==1}}">退款中</text>
            <text wx:if="{{(item.status == 2 || (item.status == 1 && item.sendtype > 0)) && item.refundstate==1}}">退款中</text>
            <text wx:if="{{(item.status == 1 || (item.status == 0 && item.paytype == 3))  && item.refundstate==0}}">待发货</text>
            <text wx:if="{{(item.status == 2 || (item.status == 1 && item.sendtype > 0))  && item.refundstate==0}}">待收货</text>
            <text wx:if="{{item.status == 3}}">已完成</text>
            <text wx:if="{{item.status == -1 && item.refundtime == 0}}">已取消</text>
            <text wx:if="{{item.refundstate>0 && item.refundid!=0}}">退款中</text>
            <text wx:if="{{item.refundtime!=0}}">退款完成</text>
          </view> --> </view
          ><!--头部状态结束-->

          <view class="goods_list">
            <navigator v-if="item.list == null" hover-class="none">
              <!-- <view class="title">
              <view class="title_date">
                <image wx:if="{{item.merchname=='商家自营'}}" src="http://wximage.shedongyun.com/sdo2o/shop_self.png" class="store_picture"></image>
                <image wx:else src="http://wximage.shedongyun.com/sdo2o/store_picture.png" class="store_picture"></image>
                <text class="store_name">000{{item.merchname}}</text>
              </view>
            </view> -->
              <block v-for="(goods, index2) in item.goods_list" :key="index2">
                <view
                  class="goods_one"
                  @tap="order_detail"
                  :data-order_id="item.id"
                >
                  <image class="goods_img" :src="goods.thumb"></image>
                  <view class="name_number">
                    <view class="good_name_number">
                      <text class="goods_name">{{ goods.title }}</text>
                    </view>
                    <view class="goods_price">
                      <text class="goods_number"
                        ><text class="symbol">￥</text>{{ goods.price }}</text
                      >
                      <text class="real_name">标准服务</text>
                    </view>
                    <text class="goods_unit"
                      ><text class="unit_symbol">X</text>{{ goods.total }}</text
                    >
                    <!-- <view class="good_name_attr">
                    <block wx:for-items="{{goods.goods_spec}}" wx:for-item="specificate">
                      <text class="goods_attr">{{specificate}}</text>
                    </block>
                  </view> -->
                  </view>
                </view>
              </block>
            </navigator>
            <navigator v-if="item.list != null" hover-class="none">
              <block v-for="(item, index2) in item.list" :key="index2">
                <!-- <view class="title">
                <view class="title_date">
                  <image wx:if="{{item.merchname=='商家自营'}}" src="http://wximage.shedongyun.com/sdo2o/shop_self.png" class="store_picture"></image>
                  <image wx:else src="http://wximage.shedongyun.com/sdo2o/store_picture.png" class="store_picture"></image>
                  <text class="store_name">111{{item.merchname}}</text>
                </view>
              </view> -->
                <block v-for="(goods, index) in item.goods_list" :key="index">
                  <view class="goods_one">
                    <image class="goods_img" :src="goods.thumb"></image>
                    <view class="name_number">
                      <view class="good_name_number">
                        <text class="goods_name">{{ goods.title }}</text>
                      </view>
                      <view class="goods_price">
                        <text class="goods_number"
                          ><text class="symbol">￥</text>{{ goods.price }}</text
                        >
                        <text class="real_name">标准服务</text>
                      </view>
                      <text class="goods_unit"
                        ><text class="unit_symbol">X</text
                        >{{ goods.total }}</text
                      >
                      <!-- <view class="good_name_attr">
                      <block wx:for-items="{{goods.goods_spec}}" wx:for-item="specificate">
                        <text class="goods_attr">{{specificate}}</text>
                      </block>
                    </view> -->
                    </view>
                  </view>
                </block>
              </block>
            </navigator>
            <!-- <view class="sum">
            共{{item.goods_num}}件商品，总计:<text class="total_fee">￥{{item.price}}</text>元
          </view> -->
            <view class="order_inform">
              <view class="order_time">服务时间：{{ item.service_time }}</view>
              <view class="order_addre">
                <image
                  src="http://wximage.shedongyun.com/sdo2o/order_addre.png"
                  class="order_adder"
                ></image>
                <text class="addre_name">{{ item.address }}</text>
              </view>
            </view>
            <view
              v-if="item.status == 0 && item.paytype != 3"
              class="goods_list_bot"
            >
              <button
                @tap="order_edit"
                :data-order_id="item.id"
                data-edit="order_pay"
                class="true"
              >
                去支付
              </button>
              <button
                :data-order_id="item.id"
                @tap="order_cancel"
                class="false"
              >
                取消订单
              </button>
            </view>
            <view v-if="item.status == 3" class="goods_list_bot">
              <button
                @tap="order_evaluat"
                :data-order_id="item.id"
                class="true"
              >
                去评价
              </button>
            </view>
            <!-- <view wx:if="{{item.status == 2}}" class="goods_list_bot">
            <button data-order_id="{{item.id}}" bindtap='order_cancel' class='false'>取消订单</button>
          </view> -->
            <view
              v-if="
                item.status == 4 ||
                  item.status == 5 ||
                  item.status == 6 ||
                  item.status == 2
              "
              class="goods_list_bot"
            >
              <button
                :data-order_id="item.id"
                @tap="order_detail"
                class="false"
              >
                查看信息
              </button>
            </view>
            <view v-if="item.status == 7" class="goods_list_bot">
              <button
                :data-order_id="item.id"
                @tap="order_received"
                class="false"
              >
                确认收货
              </button>
            </view> </view
          ><!--商品列表及订单状态-->
        </view>
        <text class="borderh5"></text>
      </block>
      <view class="none_more" :style="none_style">没有更多订单了</view>
      <!--空状态-->
      <view class="none_oder_stati" v-if="order_list == ''">
        <image src="http://wximage.shedongyun.com/sdo2o/none_goods.png"></image>
        <text>亲，该状态下暂无订单，快去下单吧</text>
      </view>
    </view>
  </view>
</template>

<script>
var app = getApp();
var pages = 0;
var order_status = "";
var load_more = 0;

export default {
  data() {
    return {
      order_list: [],
      load_footer: "正在加载更多...",
      order_status: "all",
      none_style: "display:none",
      uid: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(query) {
    var that = this;
    var uid = app.globalData.uid;
    that.setData({
      uid: uid,
    }); // 个人中心跳转过来改变订单列表状态

    if (query.order_status) {
      order_status = query.order_status;
      that.setData({
        order_status: order_status,
      });
      pages = 0;
    }
  },
  onShow: function() {
    pages = 0;
    this.navLoad_list();
  },
  onUnload: function() {
    load_more = 0;
    pages = 0;
  },
  // 加载更多数据
  onReachBottom: function() {
    var that = this;
    console.log("加载更多");
    that.load_list();
  },
  methods: {
    /*加载订单列表信息*/
    load_list: function() {
      var that = this;
      pages++;
      var uid = app.globalData.uid;

      if (load_more != 0) {
        return 0;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          a: "order",
          do: "list",
          page: pages,
          uid: uid,
          key: app.globalData.key,
          status: order_status,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.data,
            });
          } else {
            that.setData({
              none_style: "display:block",
            });
            load_more = 1;
          }
        },
      });
    },
    // 导航条切换订单状态
    nav_switch: function(e) {
      var that = this;
      var currNav = e.currentTarget.dataset.nav;
      order_status = currNav;
      that.setData({
        order_status: currNav,
      });
      load_more = 0;
      pages = 0;
      that.navLoad_list();
    },
    //导航条切换订单请求接口
    navLoad_list: function() {
      var that = this;
      pages++;
      var uid = app.globalData.uid;

      if (load_more != 0) {
        return 0;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          a: "order",
          do: "list",
          page: pages,
          uid: uid,
          key: app.globalData.key,
          status: order_status,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              order_list: res.data.data,
              none_style: "display:none",
            });
          } else {
            that.setData({
              order_list: "",
              none_style: "display:none",
            });
            load_more = 1;
          }
        },
      });
    },

    /*修改订单——支付*/
    order_edit: function(e) {
      var that = this;
      var uid = app.globalData.uid;

      if (!e.target.dataset.order_id) {
        return 0;
      }

      if (e.target.dataset.edit) {
        // 发送订单号和操作标示到后台
        wx.request({
          url: app.globalData.domain,
          data: {
            a: "order",
            do: "orderedit",
            edit_type: e.target.dataset.edit,
            orderid: e.target.dataset.order_id,
            uid: uid,
            key: app.globalData.key,
          },
          header: {
            "content-type": "application/json",
          },
          success: function(res) {
            if (res.data.err == "07") {
              wx.login({
                success: function(res2) {
                  if (res2.code) {
                    that.pay_order(
                      res2.code,
                      res.data.log_id,
                      e.target.dataset.order_id
                    );
                  } else {
                    console.log("获取用户信息失败！" + res2.errMsg);
                  }
                },
              });
            } else {
              // 直接跳转到详情页,并将操作结果提示出来
              wx.navigateTo({
                url:
                  "/pages/user/order_detail/order_detail?msg=" +
                  res.data.msg +
                  "&order_id=" +
                  e.target.dataset.order_id,
              });
            }
          },
        });
      }
    },

    /*取消订单*/
    order_cancel: function(e) {
      var that = this;
      var uid = that.uid;
      var orderid = e.currentTarget.dataset.order_id;
      wx.redirectTo({
        url:
          "/pages/user/order_cancel/order_cancel?uid=" +
          uid +
          "&orderid=" +
          orderid,
      });
    },

    /*订单确认收货*/
    order_received: function(e) {
      var that = this;
      var uid = that.uid;

      if (!e.target.dataset.order_id) {
        return 0;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          a: "order",
          do: "receive",
          orderid: e.target.dataset.order_id,
          uid: uid,
          key: app.globalData.key,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          //console.log(res.data)
          if (res.data.code == 1) {
            if (res.data.data.order_is_receive == 1) {
              wx.showToast({
                title: res.data.msg,
                icon: "success",
                duration: 2000,
                success: function() {
                  setTimeout(function() {
                    order_status = "complete";
                    pages = 0;
                    that.setData({
                      order_status: order_status,
                    });
                    that.navLoad_list();
                  }, 3000);
                },
              });
            }
          }
        },
      });
    },

    /*评论订单*/
    comment_order: function(e) {
      if (e.target.dataset.order_id) {
        wx.navigateTo({
          url:
            "/pages/user/order_comment/order_comment?order_id=" +
            e.target.dataset.order_id,
        });
      }
    },
    // 立即付款
    order_edit: function(e) {
      var that = this;
      console.log("222222"); // 订单操作函数,接收订单号，以及操作标示符号

      var uid = that.uid;
      console.log(
        "对订单:" + e.target.dataset.order_id + "进行:" + e.target.dataset.edit
      );

      if (!e.target.dataset.order_id) {
        return 0;
      }

      if (e.target.dataset.edit) {
        // 发送订单号和操作标示到后台
        wx.request({
          url: app.globalData.domain,
          data: {
            a: "order",
            do: "orderPay",
            orderid: e.target.dataset.order_id,
            uid: uid,
            key: app.globalData.key,
          },
          header: {
            "content-type": "application/json",
          },
          success: function(res) {
            console.log(res.data); // 发起支付

            var success_res = res;
            var timeStamp = success_res.data.data.pay.timeStamp;
            var nonceStr = success_res.data.data.pay.nonceStr;
            var weixin_package = success_res.data.data.pay.package;
            var paySign = success_res.data.data.pay.paySign;
            console.log(success_res.data.data.pay);
            wx.requestPayment({
              timeStamp: timeStamp.toString(),
              nonceStr: nonceStr,
              package: weixin_package,
              signType: "MD5",
              paySign: paySign,
              success: function(re) {
                console.log(re);
                wx.showToast({
                  title: "支付成功!",
                  icon: "success",
                  duration: 1000,
                }); // 微信支付成功

                wx.request({
                  // "更改订单状态操作",
                  url: app.globalData.domain,
                  data: {
                    c: "ewei_shopv2",
                    a: "order",
                    do: "order_pay",
                    key: app.globalData.key,
                    uid: uid,
                    orderid: success_res.data.data.order_id,
                    type: 1,
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
                      duration: 10000,
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
          },
        });
      }
    },
    //去评价
    order_evaluat: function(e) {
      var that = this;
      var order_id = e.currentTarget.dataset.order_id;
      wx.navigateTo({
        url: "/pages/evaluate_release/evaluate_release?order_id=" + order_id,
      });
    },
    //订单详情跳转+查看信息
    order_detail: function(e) {
      var that = this;
      var order_id = e.currentTarget.dataset.order_id;
      wx.navigateTo({
        url: "/pages/user/order_detail/order_detail?order_id=" + order_id,
      });
    },
    refund_apply: function() {
      wx.navigateTo({
        url: "../../../pages/refund/refund_apply/refund_apply",
      });
    },
    scales_apply: function() {
      wx.navigateTo({
        url: "../../../pages/scale/scales_apply/scales_apply",
      });
    },
    stateful: function() {
      wx.navigateTo({
        url: "../../../pages/logistics/stateful/stateful",
      });
    },
  },
};
</script>
<style>
@import "./order_list.css";
</style>
