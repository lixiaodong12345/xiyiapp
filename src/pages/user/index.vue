<template>
  <form @submit="formSubmit" report-submit="true">
    <view class="body">
      <view style="user_name_wrap">
        <view class="user_name_lists">
          <image
            class="bj"
            src="http://wximage.shedongyun.com/sdo2o/mem_bj.png"
          ></image>
          <view class="user_name_list">
            <view class="user_name_all" :style="user_have">
              <image class="userinfo-avatar" :src="userInfo.avatar"></image>
              <text class="userinfo-nickname userinfo-nickname_01">{{
                userInfo.nickname
              }}</text>
              <!-- <view class="userinfo-member" v-if="userInfo.nickname!=undefind"> -->
              <view class="userinfo-member">
                <text>{{ levelName }}</text>
              </view>
            </view>
            <view class="user_name_all" :style="user_none">
              <image
                class="userinfo-avatar"
                src="http://wximage.shedongyun.com/sdo2o/head_empty.png"
              ></image>
              <view class="user_monick">授权登录</view>
              <button
                open-type="getUserInfo"
                @getuserinfo="bindGetUserInfo"
                class="user_login"
              ></button>
            </view>
            <view class="user_application" @tap="recharge_skip">
              <image
                class="user_application_image"
                src="/static/static/images/add_money.png"
              ></image>
              <text>会员卡</text>
            </view>
          </view>
        </view>
      </view>
      <!--三个模块-->
      <view class="module_wrap">
        <view class="module_width">
          <view class="module_one one_width" @tap="integral_jump">
            <text class="ico_numb">{{ integral_numb }}</text>
            <text class="ico_name">积分(个)</text>
          </view>
          <view class="module_one two_width" @tap="integral_jump">
            <text class="ico_numb">{{ balance_numb }}</text>
            <text class="ico_name">余额(元)</text>
          </view>
          <view class="module_one border_one one_width" @tap="coupon_jump">
            <text class="ico_numb">{{ coupon_numb }}</text>
            <text class="ico_name">优惠券(张)</text>
          </view>
        </view>
      </view>
      <view class="FrameK">
        <view class="mBottom">
          <view class="border_001"></view>
          <view @tap="order_skip" data-statu="all">
            <view class="menu_2 menu_bottom">
              <view class="FrameK_order">
                <view class="user_list_one_01">
                  <view class="mTu">
                    <image
                      src="http://wximage.shedongyun.com/sdo2o/order_00.png"
                      class="moder_img_01"
                    ></image>
                  </view>
                  <text class="mBiaoTi_001">我的订单</text>
                  <text class="mBiaoTi_002">全部</text>
                </view>
              </view>
            </view>
          </view>
          <view class="deliver_goods_modular">
            <view class="unpaid_box" @tap="order_skip" data-statu="payment">
              <image
                src="http://wximage.shedongyun.com/sdo2o/order_01.png"
              ></image>
              <text>待付款</text>
            </view>
            <view class="unpaid_box" @tap="order_skip" data-statu="paid">
              <image
                src="http://wximage.shedongyun.com/sdo2o/order_02.png"
              ></image>
              <text>待接单</text>
            </view>
            <view class="unpaid_box" @tap="order_skip" data-statu="shipped">
              <image
                src="http://wximage.shedongyun.com/sdo2o/order_03.png"
              ></image>
              <text>待服务</text>
            </view>
            <view class="unpaid_box" @tap="order_skip" data-statu="complete">
              <image
                src="http://wximage.shedongyun.com/sdo2o/order_04.png"
              ></image>
              <text>已完成</text>
            </view>
          </view>
          <!-- <block v-if="open_level != 0"> -->
          <block>
            <view class="border_001"></view>
            <button
              data-name="clecment"
              formType="submit"
              class="btn "
              @tap="formSubmit"
            >
              <view class="menu_2">
                <view class="FrameK xian">
                  <view class="user_list_one">
                    <text class="mBiaoTi">我的收藏</text>
                  </view>
                </view>
              </view>
            </button>
            <button
              data-name="focus"
              formType="submit"
              class="btn "
              @tap="formSubmit"
            >
              <view class="menu_2">
                <view class="FrameK xian">
                  <view class="user_list_one">
                    <text class="mBiaoTi">我的关注</text>
                  </view>
                </view>
              </view>
            </button>
            <button
              data-name="addree"
              formType="submit"
              class="btn "
              @tap="formSubmit"
            >
              <view class="menu_2">
                <view class="FrameK xian">
                  <view class="user_list_one">
                    <text class="mBiaoTi">地址管理</text>
                  </view>
                </view>
              </view>
            </button>
            <button
              data-name="security"
              formType="submit"
              class="btn "
              @tap="formSubmit"
            >
              <view class="menu_2 menu_bottom">
                <view class="FrameK xian">
                  <view class="user_list_one">
                    <text class="mBiaoTi">安全中心</text>
                  </view>
                </view>
              </view>
            </button>
            <!-- <view class="border_001"></view> -->
          </block>
          <button
            data-name="get_coupon"
            formType="submit"
            class="btn "
            @tap="formSubmit"
          >
            <view class="menu_2 menu_bottom">
              <view class="FrameK xian">
                <view class="user_list_one">
                  <text class="mBiaoTi">领券中心</text>
                </view>
              </view>
            </view>
          </button>
          <button
            data-name="coupon_list"
            formType="submit"
            class="btn "
            @tap="formSubmit"
          >
            <view class="menu_2 menu_bottom">
              <view class="FrameK xian">
                <view class="user_list_one">
                  <text class="mBiaoTi">我的优惠券</text>
                </view>
              </view>
            </view>
          </button>
          <!-- <view class="border_001"></view> -->
          <button
            data-name="expense_detail"
            formType="submit"
            class="btn "
            @tap="formSubmit"
          >
            <view class="menu_2 menu_bottom">
              <view class="FrameK xian">
                <view class="user_list_one">
                  <text class="mBiaoTi">消费明细</text
                  ><text class="promt"></text>
                </view>
              </view>
            </view>
          </button>
          <button
            data-name="shop_add"
            formType="submit"
            class="btn "
            @tap="formSubmit"
          >
            <view class="menu_2 menu_bottom">
              <view class="FrameK xian">
                <view class="user_list_one">
                  <text class="mBiaoTi">商户入驻</text>
                </view>
              </view>
            </view>
          </button>
          <button
            data-name="about_us"
            formType="submit"
            class="btn "
            @tap="formSubmit"
          >
            <view class="menu_2 menu_bottom">
              <view class="FrameK xian">
                <view class="user_list_one">
                  <text class="mBiaoTi">平台简介</text
                  ><text class="promt"></text>
                </view>
              </view>
            </view>
          </button>
          <button
            data-name="contact_us"
            formType="submit"
            class="btn "
            @tap="formSubmit"
          >
            <view class="menu_2 menu_bottom">
              <view class="FrameK">
                <view class="user_list_one">
                  <text class="mBiaoTi">联系我们</text
                  ><text class="promt"></text>
                </view>
              </view>
            </view>
          </button>
        </view>
      </view>
      <view class="FrameK"><view class="mBottom"></view></view>
    </view>

    <!-- <import src="../../static/template/page_footer.wxml" /> -->
    <!-- <template is="page_footer" data="{{page_data}}" /> -->
    <!-- <view class="Technical_support" style="padding-top:150rpx;">
  <text class="Technical_support_text">{{copyright}}</text>
</view>  -->
  </form>
  <!--授权弹框-->
  <!-- <view class="auth_mask" style='{{login_state}}'>
  <view class="accredit">
    <view class="prompt_title">提示</view>
    <view class="prompt_main">
      <image src='{{wechat_xcx_logo}}' class="she_logo"></image>
      <text class="prompt_cont">{{wechat_xcx_prompt}}</text>
    </view>
    <view class="prompt_wrap" bindtap="close_skip">
    <button open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo" class="user_info" >确定进入该小程序</button>
    </view>
  </view>
</view>  -->
</template>

<script>
var app = getApp();
var util = require("../../static/js/util.js");
var phone_type;
var status_type;

export default {
  data() {
    return {
      userInfo: {},
      user: {
        user_money: "￥0",
        pay_points: 0,
        flow_num: 0,
      },
      userStatus: "true",
      bindmobile: "绑定手机",
      page_data: "user",
      copyright: app.globalData.copyright,
      openid: "",
      user_have: "",
      user_none: "",
      status: 0,
      wechat_xcx_prompt: "",
      wechat_xcx_logo: "",
      open_level: "",
      apply_openmobile: "",
      integral_numb: "",
      balance_numb: "",
      coupon_numb: "",
      levelName: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
    phone_type = options.phone_type;

    if (phone_type == 1) {
      wx.redirectTo({
        url: "/pages/user/index",
      });
    }
  },
  onShow: function() {
    var that = this;
    that.field_obtain(); //登录字段获取

    that.distribut_open(); //分销中心开不开

    that.merchant_open(); //多商户申请开不开
    // that.onShowFun();
    //判断用户是否登录

    var user_info = wx.getStorageSync("userInfo");
    var openid = user_info.openid;
    // console.log("用户user_info", user_info);
    that.setData({
      openid: openid,
    });

    if (user_info != "") {
      // console.log("已登录1111111");
      that.setData({
        userInfo: user_info,
        user_have: "display:block",
        user_none: "display:none",
      });
      that.merch_states();
      that.dataInform();
    } else {
      // console.log("未登录2222222");
      that.setData({
        user_have: "display:none",
        user_none: "display:block",
      });
    }
  },
  onHide: function() {
    var user_info = wx.getStorageSync("userInfo");
  },
  //转发分享按钮
  onShareAppMessage: function() {
    return app.globalData.goShareApp("/pages/index");
  },
  methods: {
    //事件处理函数
    bindViewTap: function() {
      wx.navigateTo({
        url: "../user/login/login",
      });
    },
    //商户入驻返回状态
    merch_states: function() {
      var that = this;
      var openid = wx.getStorageSync("userInfo").openid;
      wx.request({
        method: "get",
        url: app.globalData.domain,
        data: {
          a: "merch",
          do: "status",
          openid: openid,
          key: app.globalData.key,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 0) {
            status_type = 0;
            that.setData({
              status: 0,
            });
          } else if (res.data.code == -1) {
            status_type = -1;
            that.setData({
              status: -1,
            });
          } else if (res.data.code == 1) {
            status_type = 1;
            that.setData({
              status: 1,
            });
          } else if (res.data.code == 2) {
            status_type = 2;
            that.setData({
              status: 2,
            });
          }
        },
      });
    },
    //商户入驻成功提示
    shop_success: function() {
      wx.showToast({
        title: "已经入驻成功",
      });
    },
    formSubmit: function(e) {
      var that = this;
      var openid = wx.getStorageSync("userInfo").openid;
      var form_id = e.detail.formId;
      console.log("点击了", e);
      // if (openid == undefined) {
      //   wx.showToast({
      //     title: '请先登录',
      //     icon: 'success',
      //     duration: 1500
      //   });
      //   return;
      // }

      wx.request({
        url: app.globalData.domain,
        data: {
          a: "user",
          do: "update_user",
          key: app.globalData.key,
          openid: openid,
          formid: form_id,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {},
      });

      if (e.currentTarget.dataset.name == "store_center") {
        wx.navigateTo({
          url: "../user/distribution_center/distribution_center",
        });
      } else if (e.currentTarget.dataset.name == "store_iss") {
        wx.navigateTo({
          url: "../user/distribution_login/distribution_login",
        });
      } else if (e.currentTarget.dataset.name == "store_is") {
        wx.navigateTo({
          url: "../user/distribution_submit/distribution_submit",
        });
      } else if (e.currentTarget.dataset.name == "clecment") {
        wx.navigateTo({
          url: "/pages/user/collection_list/collection_list",
        });
      } else if (e.currentTarget.dataset.name == "addree") {
        wx.navigateTo({
          url: "../user/address/address",
        });
      } else if (e.currentTarget.dataset.name == "security") {
        wx.navigateTo({
          url: "/pages/user/password_index/password_index",
        });
      } else if (e.currentTarget.dataset.name == "shop_add") {
        //商户入驻 申请状态
        if (status_type == 0) {
          //商户入驻审核中
          // console.log("审核中++++");
          wx.navigateTo({
            url: "../user/store_mall/store_mall?state=wait",
          });
        } else if (status_type == -1) {
          //商户入驻失败
          // console.log("审核失败++++");
          wx.navigateTo({
            url: "/pages/user/enter_fail/enter_fail",
          });
        } else if (status_type == 1) {
          //商户入驻成功
          // console.log("审核成功++++");
          wx.navigateTo({
            url: "/pages/user/enter_success/enter_success",
          });
        } else if (status_type == 2) {
          //待入住
          wx.navigateTo({
            url: "../user/store_mall/store_mall",
          });
        } else {
          //未入驻
          // console.log("未申请++++");
          wx.navigateTo({
            url: "../user/store_mall/store_mall",
          });
        }
      } else if (e.currentTarget.dataset.name == "coupon_list") {
        wx.navigateTo({
          url: "../user/my_coupon/my_coupon",
        });
      } else if (e.currentTarget.dataset.name == "get_coupon") {
        wx.navigateTo({
          url: "../user/get_coupon/get_coupon",
        });
      } else if (e.currentTarget.dataset.name == "about_us") {
        wx.navigateTo({
          url: "../about_us/about_us",
        });
      } else if (e.currentTarget.dataset.name == "contact_us") {
        wx.navigateTo({
          url: "../contact_us/contact_us",
        });
      } else if (e.currentTarget.dataset.name == "focus") {
        wx.navigateTo({
          url: "../user/focus_list/focus_list",
        });
      } else if (e.currentTarget.dataset.name == "expense_detail") {
        //消费明细
        wx.navigateTo({
          url: "../user/expense_detail/expense_detail",
        });
      }
    },
    // 登录字段获取
    field_obtain: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "login",
          do: "wx_prompt",
          key: app.globalData.key,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              wechat_xcx_prompt: res.data.data.wechat_xcx_prompt,
              wechat_xcx_logo: res.data.data.wechat_xcx_logo,
            });
          }
        },
      });
    },
    // close_skip: function () {
    //   var that = this;
    //   that.setData({
    //     login_state: 'display:none'
    //   })
    // },
    // 获取当前登录微信用户信息
    bindGetUserInfo: function(from_share_uid = 0) {
      var that = this;

      try {
        var userInfo = wx.getStorageSync("userInfo");
      } catch (e) {
        var userInfo = false;
      }

      if (!userInfo || from_share_uid) {
        wx.login({
          success: function(res) {
            // console.log("login+++++", res);

            if (res.code) {
              // console.log("9999999+++++");
              wx.getUserInfo({
                success: function(res2) {
                  // console.log("res2信息++", res2);
                  var userInfo = res2.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender;
                  wx.request({
                    url: app.globalData.domain,
                    header: {
                      "Content-Type": "application/json",
                    },
                    data: {
                      a: "login",
                      do: "Wx_login",
                      js_code: res.code,
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender,
                      from_share_uid: from_share_uid,
                      key: app.globalData.key,
                    },
                    success: function(res) {
                      // console.log("用户信息", res);

                      if (res.data.code == 1) {
                        app.globalData.openid = res.data.data.openid;
                        app.globalData.userInfo = res.data.data;
                        // console.log("第一次授权openid", app.globalData.openid);
                        // console.log(
                        // "第一次授权userInfo",
                        // app.globalData.userInfo
                        // );
                        that.setData({
                          userInfo: res.data.data,
                          user_have: "display:block",
                          user_none: "display:none",
                        });

                        try {
                          wx.setStorageSync("userInfo", res.data.data);
                        } catch (e) {
                          // console.log("保存用户信息到缓存出错！");
                        }

                        that.merch_states();
                        that.dataInform();
                      }
                    },
                  });
                },
              });
            }
          },
        });
      } else {
        return userInfo;
      }
    },
    // 分销中心开不开
    distribut_open: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "commission",
          do: "level",
          key: app.globalData.key,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              open_level: res.data.data.level,
            });
          }
        },
      });
    },
    // 多商户申请开不开
    merchant_open: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "merch",
          do: "merch_state",
          key: app.globalData.key,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            // console.log("+++", res.data.data.apply_openmobile);
            that.setData({
              apply_openmobile: res.data.data.apply_openmobile,
            });
          }
        },
      });
    },
    // 会员注销
    user_exit: function() {
      var that = this;
      var user_info = wx.getStorageSync("userInfo");
      wx.showModal({
        title: "注销吗？",
        content: "注销后您需要重新登录才能体验完整功能",
        success: function(res) {
          if (res.confirm) {
            // 发送请求，修改sign
            wx.request({
              url: app.globalData.domain + app.globalData.ht,
              data: {
                act: "user_exit",
                uid: user_info.user_id,
                sign: user_info.sign,
              },
              header: {
                "Content-Type": "application/json",
              },
              success: function(res) {
                if (res.data.err == 0) {
                  try {
                    wx.setStorageSync("userInfo", "false");
                  } catch (e) {}

                  that.setData({
                    userStatus: "false",
                    user: {
                      user_money: "￥0",
                      pay_points: 0,
                      flow_num: 0,
                    },
                    bindmobile: "请先登录",
                  });
                }
              },
            });
          }
        },
      });
    },
    //获取用户的积分 余额  和优惠券
    dataInform: function() {
      var that = this;
      var user_info = wx.getStorageSync("userInfo");
      var openid = user_info.openid;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "user",
          do: "get_user_information",
          key: app.globalData.key,
          openid: openid,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            // console.log("积分+++", res);
            that.setData({
              integral_numb: res.data.data.integral,
              balance_numb: res.data.data.credit2,
              coupon_numb: res.data.data.my_coupon_num,
              levelName: res.data.data.level,
            });
          }
        },
      });
    },
    //订单跳转
    order_skip: function(e) {
      var that = this;
      var order_status = e.currentTarget.dataset.statu;
      var openid = wx.getStorageSync("userInfo").openid;

      if (openid == undefined) {
        wx.showToast({
          title: "请先登录",
          icon: "success",
          duration: 1500,
        });
      } else {
        wx.navigateTo({
          url: "/pages/user/order_list/order_list?order_status=" + order_status,
        });
      }
    },
    //未知函数
    onShowFun: function() {
      var that = this;
      wx.setStorageSync("userInfo", "");
      var user_info = wx.getStorageSync("userInfo");

      if (user_info != false) {
        wx.setStorageSync("userInfo", user_info);
        that.setData({
          userInfo: user_info,
        });
      } else {
        that.setData({
          userStatus: "false",
        });
      }
    },
    // 页面跳转
    skiping: function() {
      wx.navigateTo({
        url: "/pages/user/bind_mobile/bind_mobile",
      });
    },
    cart_skip: function() {
      wx.switchTab({
        url: "/pages/cart/cart",
      });
    },
    //充值跳转
    recharge_skip: function() {
      var that = this;
      wx.navigateTo({
        url: "/pages/user/membership_card/membership_card",
      });
    },
    //积分和余额跳转至会员卡
    integral_jump: function(e) {
      var that = this;
      wx.navigateTo({
        url: "/pages/user/membership_card/membership_card",
      });
    },
    //优惠券跳转至我的优惠券
    coupon_jump: function(e) {
      var that = this;
      wx.navigateTo({
        url: "/pages/user/my_coupon/my_coupon",
      });
    },
  },
};
</script>
<style>
@import "./index.css";
</style>
