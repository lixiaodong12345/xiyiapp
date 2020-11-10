<template>
<view>
<form @submit="method_payment" report-submit="true">
<view class="flow_box">
<view class="borderh4"></view>
<view class="user_default_address" v-if="user_default_address!=''">
  <view class="name_address">
    <text class="user_default_address_name">收货人：{{user_realname}}</text>
    <text class="user_default_address_mobile">{{user_mobile}}</text>
    <text class="user_default_address_address">{{user_province}}{{user_city}}{{user_area}}{{user_address}}</text> 
  </view>    
  <navigator url="/pages/user/address/address" class="address_link have_address" hover-class="none">
    <image src="http://wximage.shedongyun.com/sdo2o/clock_right.png"></image>
  </navigator>
</view>
<view class="user_default_address" v-else>
  <view class="name_address" @tap="addressSkip">
    <text class="user_default_address_name_noname" style="color:#000;">您尚未选择收货地址！</text>
  </view>
  <view @tap="addressSkip" class="address_link">
    <image src="http://wximage.shedongyun.com/sdo2o/clock_right.png"></image>
  </view>
</view> 
<image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/address_bj.png" class="addre_line"></image>
<view class="borderh4"></view>
<!--收货地址结束-->
<!--服务时间选择-->
<view class="service_time">
  <view class="service_width">
    <view class="service_left">
      <image src="http://wximage.shedongyun.com/sdo2o/settle_clock.png" class="settle_clock"></image>
      <text class="time_name">服务时间</text>
    </view>
    <view class="service_right">
      <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray" class="continput">
        <image src="http://wximage.shedongyun.com/sdo2o/clock_right.png" class="clock_right"></image>
        <view class="picker">
          <text class="selector_text" v-if="[multiIndex]==''">选择服务时间</text>
          <text class="selector_text" v-else>{{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}}</text>
          <input :value="multiArray[0][multiIndex[0]]" name="daySelect" hidden="true"></input>
          <input :value="multiArray[1][multiIndex[1]]" name="timeSelect" hidden="true"></input>
        </view>
      </picker>
    </view>
  </view>
</view>
<view class="borderh4"></view>
<!--商品详情-->
<block v-for="(item, index) in cart_list" :key="index">
  <view v-if="item.selected_merch !=''" class="list_top">
    <image v-if="item.merchname=='自营'" mode="widthFix" class="logo" src="http://wximage.shedongyun.com/sdo2o/order_merch.png"></image>
    <image v-else mode="widthFix" class="logo" src="http://wximage.shedongyun.com/sdo2o/order_merch.png"></image>
    <text>{{item.merchname}}</text>
  </view>
  <block v-for="(iitem, index2) in item.goods_list" :key="index2">
    <view class="cart_goods" v-if="iitem.selected == 1">
      <image class="cart_goods_image" :src="iitem.thumb"></image>
      <view class="goods_one_text">
        <text class="goods_name">{{item.title}}</text>
        <view class="goods_attr_box">
          <text class="goods_attr">服务方式：上门服务</text>
        </view>
        <!-- <view class='goods_attr_box'>
          <block wx:for-items="{{item.goods_spec}}" wx:for-item="specificate">
            <text class="goods_attr">{{specificate}}</text>
          </block>
        </view> -->
        <view class="market_price">
          <text class="goods_price"><text class="price_symble">¥</text>{{iitem.marketprice}}</text>
          <input name="goods_id" :value="iitem.id" style="display:none;"></input>
        </view>
      </view>
      <view class="ui-number">x{{iitem.total}}</view>
    </view>
  </block>
  <view class="oder_remarks pad_remarks">
    <view class="oder_width">
      <text class="oder_marks marsk_margin">订单备注:</text>
      <textarea :data-index="index" class="order_noteorder_note" @input="produnctCom" :placeholder="leave_name" placeholder-class="places" name="notice" :style="display_states"></textarea>
    </view>
  </view>
  <view class="oder_remarks total_remarks">
    <view class="oder_width oder_boder_none font_align">
      <text class="oder_first">共{{item.num}}件商品</text>
      <text class="oder_second">小计：<text class="total_numb"><text class="numb_style">￥</text>{{item.merch_total}}</text></text>
    </view>
  </view>
</block>
<view class="borderh4"></view> 
<view class="oder_remarks top_remarks" v-if="userCouponViewList!=''">
  <text class="order_name">优惠券</text>
  <view class="order_price order_coupon" @tap="coupon_modal">
    <image src="http://wximage.shedongyun.com/sdo2o/clock_right.png" @tap="coupon_switch" class="cart_right"></image>
    <view class="coupon_numb">
      <image src="http://wximage.shedongyun.com/sdo2o/coupon_type.png" class="coupon_type"></image>
      <text class="coupon_apply">{{userCouponLength}}张可用</text>
    </view>
  </view>
</view>
<view class="oder_remarks">
  <text class="oder_marks marsk_margin">商品总额</text>
  <text class="total_money"><text class="total_symble">¥</text>{{total_price}}</text> 
</view>
<view class="oder_remarks">
  <text class="oder_marks marsk_margin">运费</text>
  <text class="total_money free_money" v-if="shiping_price==0">免运费</text> 
  <text class="total_money" v-else><text class="total_symble">¥</text>{{shiping_price}}</text>
</view>
<view class="oder_remarks bottom_remarks">
  <text class="oder_marks marsk_margin">会员优惠</text>
  <text class="total_money"><text class="total_symble">¥</text>{{total_price}}</text> 
</view>
<view class="borderh4"></view>
<!--温馨提示-->
<view class="prompt_wrap">
  <view class="prompt_title">温馨提示</view>
  <view class="prompt_line">
    <text>{{serviceRules}}</text>
  </view>
</view>
<view class="borderh4"></view>
<!--底部固定-->
<view class="oder_wrap_01">
  <view class="oder_wrap_sj">
   <text class="order_note">合计:<text class="actual_money"><text class="order_symble">¥</text>{{total_price}}</text></text>
  </view>
  <input type="hidden" name="is_fast" id="is_fast" :value="is_fast" style="display:none;"></input>
  <input type="hidden" name="address_id" id="address_id" :value="ueser_address_id" style="display:none;"></input>
  <button :addid="ueser_address_id" :disabled="button_load" type="primary" form-type="submit" class="send_order_button">支付方式</button>
</view>
</view>
</form>

<!--优惠券模态框-->
<view :class="'modal ' + (giantCoupon=='false'?'hide':'')"></view>
<view :class="'coupon_modal ' + (giantCoupon=='false'?'hide':'')">
  <view class="coupon_main">
    <view class="modal_title">
       <text class="title_name">可用优惠券</text>
       <image src="http://wximage.shedongyun.com/sdo2o/coupon_shut.png" @tap="coupon_shut" class="modal_shut"></image>
    </view>
    <view class="coupon_cont">
      <checkbox-group @change="couponChange">
        <block v-for="(item, index3) in userCouponViewList" :key="index3">
          <view class="coupon_one">
            <image src="http://wximage.shedongyun.com/sdo2o/white_coupon.png" class="white_coupon"></image>
            <view class="one_cont">
              <view class="one_left">
                <text class="coupon_money">￥<text>{{item.deduct}}</text></text>
                <view class="coupon_full">满{{item.enough}}元可用</view>
              </view>
              <view class="one_right">
                <view class="one_limit">{{item.couponname}}</view>
                <view class="one_time">{{item.timeend}}到期</view>
                <!--选择按钮-->
                <view class="check_one">
                  <view class="check_main">
                    <label>
                      <image src="http://wximage.shedongyun.com/sdo2o/check_none.png" :class="'circle_logo ' + (item.checked==true?'checkHide':'')"></image>
                      <image src="http://wximage.shedongyun.com/sdo2o/check_have.png" :class="'circle_logo first_check ' + (item.checked==true?'checkShow':'')"></image>
                      <checkbox :value="item.couponid" class="checks" :checked="item.checked"></checkbox>
                    </label>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </block>
      </checkbox-group>
    </view> 
  </view>
</view>
<!--购买上线提示弹框-->
<view class="buy_permiss limit_permiss" :style="limit_state">
  <text class="permiss_title">该商品最多限购8件</text>
  <text class="permiss_tips">您已达到购买限制</text>
</view>
<!--支付方式选择-->
<view class="flow_modal" :style="modal_show"></view>
<view class="flow_way" :style="modal_show">
  <view class="way_line">
    <text class="way_title">请选择支付方式</text>
    <image src="/static/static/images/flow_shut.png" class="flow_shut" @tap="shut_payment"></image>
  </view>
  <radio-group @change="paywayChange">
  <view class="way_select" @tap.stop="showPayPwdInput = true">
    <image src="/static/static/images/balan_logo.png" class="balan_logo"></image>
    <text class="select_title">余额支付</text>
    <view class="check_one check_pay">
      <view class="check_main">
        <label>
          <image src="/static/static/images/read_empty.png" :class="'circle_logo ' + (checkId==0?'checkHide':'')"></image>
          <image src="/static/static/images/read_select.png" :class="'circle_logo first_check ' + (checkId==0?'checkShow':'')"></image>
          <radio value="0" class="checks" checked></radio>
        </label>
      </view>
    </view>
  </view>
  <view class="way_select" @tap="send_order">
    <image src="/static/static/images/micro_logo.png" class="micro_logo"></image>
    <text class="select_title">微信支付</text>
    <view class="check_one check_pay">
      <view class="check_main">
        <label>
          <image src="/static/static/images/read_empty.png" :class="'circle_logo ' + (checkId==1?'checkHide':'')"></image>
          <image src="/static/static/images/read_select.png" :class="'circle_logo first_check ' + (checkId==1?'checkShow':'')"></image>
          <radio value="1" class="checks" checked></radio>
        </label>
      </view>
    </view>
  </view>
  </radio-group>
</view>
<!--余额支付密码框-->
<view v-if="showPayPwdInput">
  <view class="bg_layer"></view>
  <view class="input_main">
      <view class="input_title">
          <view class="input_back" @tap.stop="hidePayLayer"><image src="/static/static/images/balan_shut.png"></image></view>
          <text>请输入余额支付密码</text>
      </view>
      <view class="input_tip"><text>￥{{total_price}}元</text>
        <input class="input_control" type="number" :focus="payFocus"
        placeholder="请输入6位密码"
        @input="inputPwd" :value="intVal" maxlength="6">
      </view>
      <!-- <view class="input_row" @tap.stop="getFocus">
        <view v-for="(item, i) in 6" :key="i" class="pwd_item">
          <text v-if="pwdVal.length>i"></text>
        </view>
      </view> -->
      
      
  </view>
</view>
</view>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js">
</script>
<script>
// var jweixin = require('jweixin-module')
// console.log('jweixin',jweixin)
// var {Wechat} = require('../../components/wechat/wechat-jssdk');
// console.log('Wechat',Wechat)
var app = getApp();
var pay_type = 1;
var address_id = 0;
var order = '';
var button_load = false;
var default_address_id = 0;
var form_id;
var collect_goods = new Array();
var paynum;
var multiArray;
var couponId = '';
var merchid = '';

export default {
  data() {
    return {
      tis: '',
      intVal:null,
      tisshow: '',
      user_address_list: '',
      user_default_address: 'null',
      cart_list: 0,
      shipping_list: '',
      pay_radio_select: [{
        wx: 'pay_radio_select',
        yue: '',
        hdfk: ''
      }],
      goods_amount: 0,
      shipping_fee: 0,
      goods_amount_sum: 0,
      supp_shipping_fee: 0,
      order_note_AreaBlur: '',
      invoice: '',
      notice: '',
      invoice_title: '',
      is_fast: 0,
      copyright: app.globalData.copyright,
      giantView: 'false',
      giantCoupon: 'false',
      multiArray: [],
      firstIndex: '',
      secondIndex: '',
      limit_state: 'display:none',
      items: [{
        name: '个人',
        value: '个人',
        checked: 'true'
      }, {
        name: '单位',
        value: '单位'
      }],
      leave_name: '请输入您的留言',
      display_states: 'display:block',
      modal_show: 'display:none',
      showPayPwdInput: false,
      //是否展示密码输入层
      pwdVal: null,
      //输入的密码
      payFocus: true //文本框焦点
      ,
      uid: "",
      sum_goods_price: "",
      userCouponViewList: "",
      userCouponLength: "",
      default_address: "",
      user_realname: "",
      user_mobile: "",
      user_province: "",
      user_city: "",
      user_area: "",
      user_address: "",
      ueser_address_id: "",
      total_price: "",
      goods_price: "",
      shiping_price: "",
      button_load: false,
      checkId: "",
      invoiceinfo: "",
      notice_cont: "",
      address_id: "",
      spread_service: "",
      goods_number: "",
      serviceRules: "",
      multiIndex: "",
      providerList:[]
    };
  },

  components: {},
  props: {},
  onLoad: function (query) {
    console.log('query',query)
    var that = this;
    var uid = app.globalData.uid;
    var is_fast = query.is_fast ? query.is_fast : 0;
    that.is_fast = is_fast;
    merchid = query.merchid;
    console.log('merchid++++', merchid);
    that.setData({
      uid: uid,
      is_fast: is_fast
    });
    that.get_amount_sum();
    that.address_shohuo();
    that.flow_show();
    that.order_serviceTime();
    // that.getProvider();
  },
  onShow: function () {},
  //转发分享按钮
  onShareAppMessage: function () {
    return app.globalData.goShareApp('/pages/index');
  },
  methods: {
    // 解决一下bug
    coupon_switch:function(){},
    produnctCom(e) {
      var that = this;
      let star = e.detail.value;
      var i = e.currentTarget.dataset.index;
      collect_goods[i].content = star;
    },
    //获取系统服务商
    // getProvider:function(){
    //   var that = this
    //   uni.getProvider({
    //     service: "payment",
    //     success: (e) => {
    //         console.log("payment success:" + JSON.stringify(e));
    //         let providerList = [];
    //         e.provider.map((value) => {
    //             switch (value) {
    //                 case 'alipay':
    //                     providerList.push({
    //                         name: '支付宝',
    //                         id: value,
    //                         loading: false
    //                     });
    //                     break;
    //                 case 'wxpay':
    //                     providerList.push({
    //                         name: '微信',
    //                         id: value,
    //                         loading: false
    //                     });
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         })
    //         this.providerList = JSON.stringify(providerList);
    //         console.log('providerList',providerList)
    //     },
    //   })
    // },
    // 不知名请求
    flow_show: function () {
      /**
       * openid不能为空
       */
      var that = this;
      var uid = that.uid;
      var is_fast = that.is_fast;
      uni.request({
        url: app.globalData.domain,
        data: {
          a: 'cart',
          do: 'list',
          uid: uid,
          is_fast: is_fast,
          key: app.globalData.key,
          merchid: merchid
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('res',res)
          // 商品配送方式
          paynum = res.data.data.total_price;

          if (res.data.cart_list == '0') {
            that.setData({
              tis: '请在洗衣篮,选中待结的商品后再结算喔',
              tisshow: 'height: 30px;margin: 20rpx auto;'
            });
          } else {
            for (var i = 0; i < res.data.data.cart_list.length; i++) {
              var subarry = new Object();
              subarry.merchid = res.data.data.cart_list[i].merchid, subarry.content = "", collect_goods[i] = subarry;
            }

            that.setData({
              cart_list: res.data.data.cart_list,
              sum_goods_price: res.data.data.total_price,
              //使用的优惠券
              userCouponViewList: res.data.data.member_coupon_list,
              // userCouponLength: res.data.data.member_coupon_list.length
            });
          }
        }
      });
    },
    // 获取默认收货地址
    address_shohuo: function () {
      var that = this;
      var uid = that.uid;
      uni.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'default',
          uid: uid,
          key: app.globalData.key
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('地址res',res)
          that.setData({
            default_address: res.data.data.isdefault,
            user_default_address: res.data.data,
            user_realname: res.data.data.realname,
            user_mobile: res.data.data.mobile,
            user_province: res.data.data.province,
            user_city: res.data.data.city,
            user_area: res.data.data.area,
            user_address: res.data.data.address,
            ueser_address_id: res.data.data.id
          });
          that.get_amount_sum();
        }
      });
    },
    pay_radioChange: function (e) {
      var that = this;
      that.setData({
        pay_radio_select: [{
          wx: '',
          yue: '',
          hdfk: ''
        }]
      });

      if (e.detail.value == 1) {
        that.setData({
          pay_radio_select: [{
            wx: 'pay_radio_select',
            yue: '',
            hdfk: ''
          }]
        });
      } else if (e.detail.value == 2) {
        that.setData({
          pay_radio_select: [{
            wx: '',
            yue: 'pay_radio_select',
            hdfk: ''
          }]
        });
      } else if (e.detail.value == 3) {
        that.setData({
          pay_radio_select: [{
            wx: '',
            yue: '',
            hdfk: 'pay_radio_select'
          }]
        });
      }

      pay_type = e.detail.value;
    },
    order_note_AreaBlurFun: function (e) {
      this.setData({
        order_note_AreaBlur: e.detail.value
      });
    },
    //获取总额数
    get_amount_sum: function () {
      /**
       * openid不能为空
       */
      var that = this;
      var uid = app.globalData.uid;
      uni.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'cart',
          do: 'list',
          uid: uid,
          key: app.globalData.key,
          is_fast: that.is_fast,
          address_id: address_id,
          // merchid: merchid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          uni.hideToast();

          if (res.data.code == 1) {
            that.setData({
              total_price: res.data.data.total_price,
              goods_price: res.data.data.goods_price,
              shiping_price: res.data.data.shiping_price
            });
          } else {
            that.setData({
              tis: '获取总额失败,请返回重试!',
              tisshow: 'height: 30px;margin: 20rpx auto;'
            });
          }
        }
      });
    },
    order_done: function () {
      var that = this;
      this.setData({
        button_load: true
      });

      if (pay_type == 1) {
        // 微信支付,获取用户codecode
        uni.login({
          success: function (res) {
            if (res.data.code) {
              that.send_order(res.data.code);
              console.log('获取到的code' + res.data.code);
            } else {
              console.log('获取用户登录态失败！' + res.errMsg);
            }
          }
        });
      } else {
        console.log('微信支付no++++');
        that.send_order();
      }
    },
    radioChange: function (e) {
      var that = this;
      that.invoice_title = e.detail.value;
    },
    //支付****************************************************************************************
    //判断是否设置密码
    judge_passd: function () {
      var that = this;
      var uid = app.globalData.userInfo.id;
      uni.request({
        url: app.globalData.domain,
        data: {
          a: 'user',
          do: 'checkuserpay',
          key: app.globalData.key,
          uid: uid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              showPayPwdInput: true,
              payFocus: true
            });
          } else if (res.data.code == 0) {
            //密码没设置 不可用
            uni.showModal({
              title: '提示',
              content: '您未设置支付密码,请至我的>安全中心设置支付密码后，方可使用余额支付',

              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  uni.navigateTo({
                    url: '/pages/user/password_set/password_set'
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消');
                }
              }

            });
          }
        }
      });
    },
    //方式选择
    paywayChange: function (e) {
      console.log(',',e)
      var that = this;
      var selectValue = e.detail.value;

      if (selectValue == 0) {
        that.setData({
          checkId: selectValue,
          modal_show: 'display:none'
        });
        that.judge_passd();
      } else if (selectValue == 1) {
        that.setData({
          checkId: selectValue
        });
        that.send_order();
      }
    },
    //关闭支付方式
    shut_payment: function () {
      var that = this;
      that.setData({
        modal_show: 'display:none'
      });
    },
    //第一步触发支付方式
    method_payment: function (e) {
      console.log('出发支付方式',e)
      var that = this;
      that.setData({
        display_states: 'display:none'
      });
      form_id = e.detail.formId; //服务时间获取

      var service_day = e.detail.value.daySelect;
      var service_time = e.detail.value.timeSelect;
      var arr = new Array();
      arr.push(service_day);
      arr.push(service_time);
      var spread_service = arr.join(",");
      var invoice_title = e.detail.value.invoice;
      var invoiceinfo = e.detail.value.invoiceinfo;
      var notice_cont = e.detail.value.notice;
      var order_id = e.detail.value.goods_id;
      var address_id = e.detail.value.address_id;
      var is_fast = e.detail.value.is_fast;
      console.log('获取的时间',arr,notice_cont,spread_service)
      that.setData({
        invoice_title: invoice_title,
        invoiceinfo: invoiceinfo,
        notice_cont: notice_cont,
        address_id: address_id,
        is_fast: is_fast,
        spread_service: spread_service
      }); //收货地址判断

      if (address_id == '' || address_id == null) {
        uni.showToast({
          title: '请填写收货地址',
          duration: 1500
        });
        return;
      }

      if (service_day == '' && service_time == '') {
        uni.showToast({
          title: '请选择服务时间',
          duration: 1500
        });
        return;
      }

      if (service_day == null && service_time == null) {
        uni.showToast({
          title: '请选择服务时间',
          duration: 1500
        });
        return;
      }

      that.setData({
        modal_show: 'display:block'
      });
    },
    //触发微信支付
    send_order: function () {
      var that = this;
      var uid = that.uid;
      uni.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'order',
          do: 'app_order_add',
          key: app.globalData.key,
          uid: uid,
          invoice_title: that.invoice_title,
          invoiceinfo: that.invoiceinfo,
          invoice: that.invoice_title,
          notice: that.notice_cont,
          address_id: that.address_id,
          is_fast: that.is_fast,
          service_time: that.spread_service,
          couponid: couponId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('生成订单id++', res);

          if (res.data.code == 1) {
            //关闭支付方式模态框
            that.setData({
              modal_show: 'display:none'
            }); // 发起支付
            var orderId = res.data.data.order_id
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
            console.log('payData',payData)

            uni.requestPayment({
              provider:'wxpay',
              orderInfo: payData,
              success: function (re) {
                // 微信支付成功
                uni.request({
                  // "更改订单状态操作",
                  url: app.globalData.domain,
                  data: {
                    c: 'ewei_o2o',
                    a: 'order',
                    do: 'order_pay',
                    key: app.globalData.key,
                    orderid: orderId,
                    type: 1,
                    isalipay:1
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    app.globalData.integral = res.data.data;
                    console.log('flow+++', app.globalData.integral);
                  },
                  fail: function (res) {}
                });
                setTimeout(function () {
                  uni.redirectTo({
                    url: '/pages/flow_success/flow_success'
                  });
                }, 1500);
              },
              fail: function (res) {
                console.log('res',res)
                uni.showToast({
                  title: res,
                  icon: 'success',
                  duration: 1500,
                  success: function () {
                    uni.redirectTo({
                      url: '/pages/user/order_detail/order_detail?order_id=' + res.data.data.order_id
                    });
                  }
                });
              },
              complete: function (res) {}
            });
          } else if (res.data.code == -1) {
            uni.showToast({
              icon: 'success',
              title: res.data.msg,
              duration: 1500
            });
          } else {
            uni.showToast({
              title: '服务器繁忙',
              duration: 1500
            });
          }
        },
        complete: function () {},
        //跳转到已结束任务列表页
        goshopCart: function () {
          uni.switchTab({
            url: '/cart/cart',
            success: function (res) {// success
            },
            fail: function (res) {// fail
            },
            complete: function (res) {// complete
            }
          });
        }
      });
    },
    //余额密码输入开始***********************************

    /* 显示支付密码输入层*/
    showInputLayer: function () {
      this.setData({
        showPayPwdInput: true,
        payFocus: true
      });
    },

    /* 隐藏支付密码输入层*/
    hidePayLayer: function () {
      var val = this.pwdVal;
      this.setData({
        showPayPwdInput: false,
        payFocus: false,
        pwdVal: null
      });
      uni.showToast({
        title: '支付取消',
        icon: 'success',
        duration: 1500,
        // success: function () {
        //   uni.redirectTo({
        //     url: '/pages/user/order_detail/order_detail?order_id=' + success_res.data.data.order_id
        //   });
        // }
      });
    },

    /* 获取焦点*/
    getFocus: function () {
      this.setData({
        payFocus: true
      });
    },

    /*输入密码监听*/
    inputPwd: function (e) {
      console.log('eee',e)
      var that = this;
      that.setData({
        pwdVal: e.detail.value,
        intVal:e.detail.value
      });

      if (e.detail.value.length == 6) {
        
        that.match_password();
        that.setData({
          intVal:null
        });
      }

       // if (e.detail.value.length >= 6) {
      //   this.hidePayLayer();
      // }

    },
    //输入密码后请求的接口
    match_password: function () {
      var that = this;
      var pwdVal = that.pwdVal;
      var uid = app.globalData.uid;
      uni.request({
        url: app.globalData.domain,
        data: {
          a: 'user',
          do: 'checkpaypasswd',
          uid: uid,
          key: app.globalData.key,
          passwd: pwdVal
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('res',res)
          if (res.data.code == 1) {
            that.setData({
              showPayPwdInput: false,
              payFocus: false,
              pwdVal: null
            });
            that.callback_passd();
          }else if(res.data.code == 0){
            uni.showToast({
              title: '密码错误',
              icon: 'success',
              duration: 1500,
            });
            //隐藏输入框
            that.setData({
 
              pwdVal: null
            });
          }
        },
        fail: function (res) {}
      });
    },
    //密码成功后回调的函数
    callback_passd: function () {
      var that = this;
      var uid = app.globalData.uid;
      //生成订单
      uni.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'order',
          do: 'app_order_add',
          key: app.globalData.key,
          uid: uid,
          type:'',
          shopid:'',
          invoice_title: that.invoice_title,
          invoiceinfo: that.invoiceinfo,
          invoice: that.invoice_title,
          notice: that.notice_cont,
          address_id: that.address_id,
          is_fast: that.is_fast,
          service_time: that.spread_service,
          couponid: couponId

        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('生成订单id++', res);

          if (res.data.code == 1) {
            var success_res = res; //发起支付+支付方式及扣除余额

            uni.request({
              url: app.globalData.domain,
              data: {
                a: 'order',
                do: 'orderPayBalance',
                orderid: success_res.data.data.order_id,
                uid: uid,
                key: app.globalData.key
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.data.code == 1) {
                  uni.request({
                    // 支付成功后更改订单状态操作"
                    url: app.globalData.domain,
                    data: {
                      c: 'ewei_o2o',
                      a: 'order',
                      do: 'order_pay',
                      key: app.globalData.key,
                      orderid: success_res.data.data.order_id,
                      type: 1,
                      isalipay:1
                    },
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      app.globalData.integral = res.data.data;
                    },
                    fail: function (res) {}
                  });
                  setTimeout(function () {
                    uni.redirectTo({
                      url: '/pages/flow_success/flow_success'
                    });
                  }, 1000);
                } else {
                  uni.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 1500,
                    success: function () {
                      setTimeout(function () {
                        uni.redirectTo({
                          url: '/pages/user/order_detail/order_detail?order_id=' + success_res.data.data.order_id
                        });
                      }, 1000);
                    }
                  });
                }
              },
              fail: function (res) {}
            });
          } else if (res.data.code == -1) {
            uni.showToast({
              icon: 'success',
              title: res.data.msg,
              duration: 1500
            });
          } else {
            uni.showToast({
              title: '服务器繁忙',
              duration: 1500
            });
          }
        },
        complete: function () {},
        //跳转到已结束任务列表页
        goshopCart: function () {
          uni.switchTab({
            url: '/pages/cart/cart',
            success: function (res) {// success
            },
            fail: function (res) {// fail
            },
            complete: function (res) {// complete
            }
          });
        }
      });
    },
    //余额密码输入结束***********************************
    change_num: function (e) {
      var that = this;
      that.setData({
        goods_number: e.detail.value
      });
      this.send_change_type();
    },
    change_num_jia: function () {
      var that = this;
      that.setData({
        goods_number: that.goods_number + 1
      });
      this.send_change_type();
    },
    change_num_jian: function () {
      var that = this;
      that.setData({
        goods_number: that.goods_number - 1
      });
      this.send_change_type();
    },
    del_goods: function (e) {
      var that = this;
      uni.showModal({
        title: '提示',
        content: '您确定要移除这个商品吗？',
        success: function (res) {
          if (res.confirm) {
            that.send_change_list(check_list, e.target.dataset.cart_id, 0, 0, 0, 1);
          }
        }
      });
    },
    addressSkip: function () {
      uni.redirectTo({
        url: '/pages/user/address/address'
      });
    },
    //下单选择服务时间——数据值
    order_serviceTime: function () {
      var that = this;
      uni.request({
        url: app.globalData.domain,
        data: {
          a: 'shop',
          c: 'ewei_o2o',
          do: 'shop_times',
          key: app.globalData.key,
          shopid: merchid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            var dayList = res.data.data.day_list;
            var timeList = res.data.data.operation_times;
            var serviceRules = res.data.data.diytip;
            that.setData({
              multiArray: [dayList, timeList],
              serviceRules: serviceRules
            });
          }
        }
      });
    },
    // 日期点击选择
    bindMultiPickerChange: function (e) {
      var that = this;
      console.log('picker发送选择改变，携带值为', e.detail.value);
      that.setData({
        multiIndex: e.detail.value
      });
    },
    bindMultiPickerColumnChange: function (e) {
      var that = this; // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

      var valueArray = e.detail.value;
      var data = {
        multiArray: that.multiArray,
        multiIndex: that.multiIndex
      }; // data.multiIndex[e.detail.column] = e.detail.value;
    },
    // 服务规则模态框弹框
    prompt_modal: function () {
      var that = this;

      if (this.giantView == "false") {
        that.setData({
          display_states: 'display:none',
          giantView: "true"
        });
      } else {
        that.setData({
          display_states: 'display:block',
          giantView: "false"
        });
      }
    },
    // 优惠券模态框弹框
    coupon_modal: function () {
      var that = this;

      if (this.giantCoupon == "false") {
        that.setData({
          display_states: 'display:none',
          giantCoupon: "true"
        });
      } else {
        that.setData({
          display_states: 'display:block',
          giantCoupon: "false"
        });
      }
    },
    coupon_shut: function () {
      var that = this;
      that.setData({
        giantCoupon: "false"
      });
    },
    // 选中优惠券
    couponChange: function (e) {
      var that = this;
      var checkId = e.detail.value;
      var couponList = that.userCouponViewList;

      for (var i = 0; i < couponList.length; i++) {
        if (checkId.length != 0) {
          for (var j = 0; j < checkId.length; j++) {
            if (couponList[i].couponid == checkId[j]) {
              couponList[i].checked = true;
              couponId = couponList[i].couponid;
              that.setData({
                userCouponViewList: couponList,
                giantCoupon: 'false'
              });
              that.coupon_request();
            } else {
              couponList[i].checked = false;
              that.setData({
                userCouponViewList: couponList
              });
            }
          }
        } else {
          couponList[i].checked = false;
          that.setData({
            userCouponViewList: couponList
          });
        }
      }
    },
    //选中优惠券后请求的接口
    coupon_request: function () {
      var that = this;
      var uid = that.uid;
      var is_fast = that.is_fast;
      uni.request({
        url: app.globalData.domain,
        data: {
          a: 'cart',
          do: 'select_coupon',
          key: app.globalData.key,
          uid: uid,
          couponid: couponId,
          is_fast: is_fast
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              total_price: res.data.data.total_price
            });
          } else {}
        }
      });
    }
  }
};
</script>
<style>
@import "./flow.css";
</style>