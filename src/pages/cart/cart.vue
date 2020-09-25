<template>
<view>
<view class="flow_box" :style="cart_have">
  <!--数据为空-->
  <view class="cart_null" v-if="cart_list == ''">
    <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/car_none.png"></image>
    <text>{{tis}}</text>
    <button type="warn" @tap="goShopping" class="skip_index">{{tis2}}</button>
  </view>
  <!--数据不为空-->
  <view class="cart_wrap" v-if="cart_list.length">
    <view class="borderh4"></view>
    <block v-for="(item, index) in cart_list" :key="index">
      <view class="line_one">
        <checkbox-group @change="changebox" :data-carts_id="item.merchid" data-name="store" :data-index="index" v-if="item.merchid"> 
          <!--店铺未选中-->
          <view v-if="item.selected_merch == 0" class="list_top">
            <image class="select" :src="item.src" v-if="item.selected_merch == 0"></image>
            <image class="logo" src="http://wximage.shedongyun.com/sdo2o/order_merch.png" v-if="item.selected_merch == 0"></image>
            <checkbox :value="item.id" :id="'a-' + item.id"></checkbox>
            <text class="shop_name">{{item.merchname}}</text>
            <image src="http://wximage.shedongyun.com/sdo2o/order_skip.png" class="skip_right" v-if="item.selected_merch == 0"></image>
          </view>
          <!--店铺已选中-->
          <view v-else class="list_top">
            <image class="select" :src="item.src" v-if="item.selected_merch == 1"></image>
            <image class="logo" src="http://wximage.shedongyun.com/sdo2o/order_merch.png" v-if="item.selected_merch == 1"></image>
            <checkbox :value="item.id" checked :id="'a-' + item.id"></checkbox>
            <text class="shop_name">{{item.merchname}}</text>
            <image src="http://wximage.shedongyun.com/sdo2o/order_skip.png" class="skip_right" v-if="item.selected_merch == 1"></image>
          </view>
        </checkbox-group>
        <block v-for="(list, index2) in item.goods_list" :key="index2">
          <checkbox-group @change="changebox" :data-carts_id="list.id" data-name="good" :data-index="index" class="list_box"> 
            <view :id="item.merchid" :data-index="index" :style="'right:' + list.right + 'px'" class="goods_list">
              <!--商品已选中-->
              <label :for="'a-' + list.id" class="cart_checkbox" v-if="list.selected == 1">
                <checkbox :value="list.id" checked :id="'a-' + list.id"></checkbox>
                <image :src="list.src"></image>
              </label>
              <!--商品未选中-->
              <label :for="'a-' + list.id" class="cart_checkbox" v-else>
                <checkbox :value="list.id" :id="'a-' + list.id"></checkbox>
                <image :src="list.src"></image>
              </label>
              <image class="cart_list_image" :src="list.thumb"></image>
              <view class="goods_one">
                <view class="goods_title_price">
                  <text class="goods_title">{{list.title}}</text>
                  <text class="take_style">上门取件</text>
                </view> 
                <view class="num">
                  <!-- <view class="attrWrap">
                    <block wx:for-lists="{{list.goods_spec}}" wx:for-list="specificate">
                      <text class="goods_attr">{{specificate}}</text>
                    </block>
                  </view>-->
                  <view class="price"><text class="symble_type">￥</text>{{list.marketprice}}</view>
                  <view class="price_delect" v-if="list.productprice!=0.00 ||list.productprice!=0">￥{{list.productprice}}</view>
                  <view class="xm-input-number">
                    <view :data-cart_id="list.id" :data-num_value="list.total" @tap="num_jian" class="num_button"></view>
                    <view class="num_input">
                      <input :data-cart_id="list.id" :value="list.total" @change="num_change" name="num"></input>
                    </view>
                    <view :data-cart_id="list.id" @tap="num_jia" class="num_button2"></view>
                  </view>
                </view>
              </view>
            </view><!--goods_list-->
            <button class="settle_skip btnClear" @tap="dele_goods" :data-cart_id="list.id" :data-but_id="list.id">删除</button>
            <!-- <view :data-cart_id="list.id" :data-but_id="list.id" class="remove" @tap="dele_goods">
              <view>删除</view>
            </view> -->
          </checkbox-group>
        </block>
        <view class="shop_settle" v-if="item.merch_total">
          <view class="reduce_money">会员优惠{{item.productprice}}元</view>
          <view class="settle_skip" @tap="settle_skip" :data-type="item.type" :data-shopid="item.merchid">去结算</view>
          <view class="shop_combine">合计：<text class="combine_color"><text class="combine_size">￥</text>{{item.merch_total}}</text></view>
        </view>
      </view><!--一个店铺-->
      <view class="back_height" v-if="item.merch_total"></view>
    </block>
  </view>
</view>
<!--未登录状态-->
<view :style="cart_none" v-show="!uid">
  <view class="cart_null">
    <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/car_none.png"></image>
    <text>您还没有登录，请登录后查看</text>
    <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="login_skip">去登录</button> -->
    <button @tap="user_login" class="login_skip">去登录</button>
  </view>
</view>
</view>
</template>

<script>
var app = getApp();
var check_list = '';
var startX,
    startY,
    key,
    endX,
    endY,
    maxRight = 60,
    caes_id,
    index;

export default {
  data() {
    return {
      cart_list: 'null',
      tis: '愿望满满，但洗衣篮还是空的！',
      tis2: '去逛逛吧',
      tisurl: '../index',
      sum_goods_price: 0,
      check_list: '',
      is_fast: 0,
      hidden: false,
      specsarr: [],
      all_type: 0,
      copyright: app.globalData.copyright,
      cardTeams: [{
        "id": "aaaaa",
        "startRight": 0,
        "right": 0,
        "startRight": 0
      }, {
        "id": "bbbb",
        "startRight": 0,
        "right": 0,
        "startRight": 0
      }],
      uid:app.globalData.uid,
      cart_none: 'display:none',
      cart_have: "",
      wechat_xcx_prompt: "",
      wechat_xcx_logo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (query) {
    var that = this;
    var is_fast = query.is_fast ? query.is_fast : 0;
    that.is_fast = is_fast;
    var uid = app.globalData.uid;
  },
  onShow: function () {
    // 读取购物
    var that = this;
    var uid = app.globalData.uid;

    if (uid == '') {
      that.setData({
        cart_have: 'display:none',
        cart_none: 'display:block'
      });
    } else {
      that.setData({
        cart_have: 'display:block',
        cart_none: 'display:none'
      }); //列表数据

      that.shopCart_list();
    }
    that.shopCart_list()
  },
  // 左滑动删除结束*******************************************
  //转发分享按钮
  onShareAppMessage: function () {
    return app.globalData.goShareApp('/pages/index');
  },
  methods: {
    // 未登录状态下 去登录
    user_login:function(e){
      uni.navigateTo({
        url:'/pages/user/userLogin/userLogin'
      })
    },
    //数据列表请求
    shopCart_list: function () {
      /**
       * openid不能为空 可能会有多个商户id
       */
      var that = this;
      var uid = app.globalData.uid;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'cart',
          do: 'list',
          // 商户id
          uid:app.globalData.uid,
          is_fast: that.is_fast,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('类表',res)
          if (res.data.code == 1) {
            for (var i = 0; i < res.data.data.cart_list.length; i++) {
              if (res.data.data.cart_list[i].selected_merch == 1) {
                res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
                res.data.data.cart_list[i].type = 'true';
              } else {
                res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
              }

              for (var m = 0; m < res.data.data.cart_list[i].goods_list.length; m++) {
                if (res.data.data.cart_list[i].goods_list[m].selected == 1) {
                  res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
                  res.data.data.cart_list[i].type = 'true';
                } else {
                  res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
                }

                var right;
                res.data.data.cart_list[i].goods_list[m].right = 0;
              }
            }

            that.setData({
              cart_list: res.data.data.cart_list,
              sum_goods_price: res.data.data.goods_price
            });
          }
        }
      });
    },
    //选中商品事件
    changebox: function (e) {
      console.log('发生改变',e)
      var that = this;
      var uid = app.globalData.uid;
      var carlsit = that.cart_list;
      var cat_id = "";
      var sid_id = "";
      var value = '';

      if (e.target.dataset.name == "store") {
        sid_id = e.target.dataset.carts_id;
      } else if (e.target.dataset.name == "good") {
        cat_id = e.target.dataset.carts_id;
      }

      for (var i = 0; i < e.detail.value.length; i++) {
        value = value + e.detail.value[i] + "|";
      }
      if (value == '') {
        value = 0;
      } else {
        value = 1;
      }

      check_list = value;
      that.setData({
        check_list: check_list
      });
      uni.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'cart',
          do: 'check',
          uid: uid,
          // openid:'oXfTW5TPM-xAVEt0H0Nf5X2S3kbg',
          key: app.globalData.key,
          cid: cat_id,
          sid: sid_id,
          selected: value
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            for (var i = 0; i < res.data.data.cart_list.length; i++) {
              if (res.data.data.cart_list[i].selected_merch == 1) {
                res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
                res.data.data.cart_list[i].type = 'true';
              } else {
                res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
              }

              for (var m = 0; m < res.data.data.cart_list[i].goods_list.length; m++) {
                if (res.data.data.cart_list[i].goods_list[m].selected == 1) {
                  res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
                  res.data.data.cart_list[i].type = 'true';
                } else {
                  res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
                }

                var right;
                res.data.data.cart_list[i].goods_list[m].right = 0;
              }
            }

            that.setData({
              cart_list: res.data.data.cart_list,
              sum_goods_price: res.data.data.total_price
            });
            that.shopCart_list()
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1500
            });
          }
        }
      });
    },
    //全选商品事件
    all_select: function (e) {
      var that = this;
      var uid = app.globalData.uid;
      if (e.currentTarget.dataset.type == 1) {
        that.setData({
          all_type: 0
        });
      } else {
        that.setData({
          all_type: 1
        });
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'cart',
          do: 'checkall',
          uid: uid,
          key: app.globalData.key,
          sid: "",
          selected: e.currentTarget.dataset.type
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            for (var i = 0; i < res.data.data.cart_list.length; i++) {
              if (res.data.data.cart_list[i].selected_merch == 1) {
                res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
              } else {
                res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
              }

              for (var m = 0; m < res.data.data.cart_list[i].goods_list.length; m++) {
                if (res.data.data.cart_list[i].goods_list[m].selected == 1) {
                  res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
                } else {
                  res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
                }

                var right;
                res.data.data.cart_list[i].goods_list[m].right = 0;
              }
            }

            that.setData({
              cart_list: res.data.data.cart_list,
              sum_goods_price: res.data.data.total_price
            });
          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 1500
            });
          }
        }
      });
    },
    //数量加减部分开始*************************
    num_change: function (e) {
      this.send_change_list(check_list, e.target.dataset.cart_id, 0, 0, e.detail.value, 0);
    },
    num_jian: function (e) {
      if (e.target.dataset.num_value <= 1) {
        wx.showToast({
          title: '数量不能为空',
          icon: 'success',
          duration: 2000
        });
        return;
      }

      this.send_change_list(check_list, e.target.dataset.cart_id, 1, 0, 0, 0);
    },
    num_jia: function (e) {
      this.send_change_list(check_list, e.target.dataset.cart_id, 0, 1, 0, 0);
    },
    send_change_list: function (check_list, id, number_jia, number_jian, number_change) {
      var that = this;
      var uid = app.globalData.uid;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'cart',
          do: 'change',
          uid: uid,
          key: app.globalData.key,
          number_jia: number_jia,
          number_jian: number_jian,
          number_change,
          number_change,
          cid: id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          for (var i = 0; i < res.data.data.cart_list.length; i++) {
            if (res.data.data.cart_list[i].selected_merch == 1) {
              res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
            } else {
              res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
            }

            for (var m = 0; m < res.data.data.cart_list[i].goods_list.length; m++) {
              if (res.data.data.cart_list[i].goods_list[m].selected == 1) {
                res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
              } else {
                res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
              }

              var right;
              res.data.data.cart_list[i].goods_list[m].right = 0;
            }
          }

          that.setData({
            cart_list: res.data.data.cart_list,
            sum_goods_price: res.data.data.total_price
          });
        }
      });
    },
    //数量加减部分结束*************************
    // 删除事件
    dele_goods: function (e) {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '您确定要移除这个商品吗？',
        success: function (res) {
          if (res.confirm) {
            that.delect_goods(e);
          }
        }
      });
    },
    //删除事件请求接口
    delect_goods: function (e) {
      var that = this;
      var but_id = e.currentTarget.dataset.but_id;
      var userInfo = app.globalData.userInfo;
      var uid = app.globalData.uid;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'cart',
          do: 'del',
          key: app.globalData.key,
          cid: but_id,
          uid: uid
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            for (var i = 0; i < res.data.data.cart_list.length; i++) {
              if (res.data.data.cart_list[i].selected_merch == 1) {
                res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
              } else {
                res.data.data.cart_list[i]["src"] = "http://wximage.shedongyun.com/sdo2o/false.png";
              }

              for (var m = 0; m < res.data.data.cart_list[i].goods_list.length; m++) {
                if (res.data.data.cart_list[i].goods_list[m].selected == 1) {
                  res.data.data.cart_list[i].goods_list[m]["src"] = "http://wximage.shedongyun.com/sdo2o/true.png";
                } else {
                  res.data.data.cart_list[i].goods_list[m]["src"] = "../../sthttp://wximage.shedongyun.com/sdo2o/false.png";
                }

                var right;
                res.data.data.cart_list[i].goods_list[m].right = 0;
              }
            }

            that.setData({
              cart_list: res.data.data.cart_list,
              sum_goods_price: res.data.data.total_price
            });
            that.shopCart_list()
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
          }
        }
      });
    },
    // 去结算页面——暂时未用到
    close_search: function () {
      var that = this;
      var check_list = that.check_list;
      var gourl = false;

      if (check_list == '') {
        var cart_list_data = that.cart_list;

        for (var i = 0; i < cart_list_data.length; i++) {
          if (cart_list_data[i]['checked'] == 'checked') {
            gourl = 'true';
            break;
          }

        }
      } else if (check_list != 'no') {
        gourl = 'true';
      }

      if (gourl) {
        uni.navigateTo({
          url: '../flow/flow'
        });
      } else {
        wx.showToast({
          title: '请选择商品',
          icon: 'success',
          duration: 3000
        });
      }
    },
    // 获取当前登录微信用户信息*******************************************************
    bindGetUserInfo: function (from_share_uid = 0) {
      var that = this;

      try {
        var userInfo = app.globalData.userInfo;
      } catch (e) {
        var userInfo = false;
      }

      if (!userInfo || from_share_uid) {
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.getUserInfo({
                success: function (res2) {
                  var userInfo = res2.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender;
                  wx.request({
                    url: app.globalData.domain,
                    header: {
                      'Content-Type': 'application/json'
                    },
                    data: {
                      a: 'login',
                      do: 'Wx_login',
                      js_code: res.code,
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender,
                      from_share_uid: from_share_uid,
                      key: app.globalData.key
                    },
                    success: function (res) {
                      if (res.data.code == 1) {
                        app.globalData.uid = res.data.data.uid;
                        app.globalData.userInfo = res.data.data;
                        that.uid = res.data.data.uid;
                        that.setData({
                          cart_have: 'display:block',
                          cart_none: 'display:none'
                        });
                        that.shopCart_list();

                        try {
                          wx.setStorageSync('userInfo', res.data.data);
                        } catch (e) {
                        }
                      }
                    }
                  });
                }
              });
            }
          }
        });
      } else {
        return userInfo;
      }
    },
    // 登录字段获取
    field_obtain: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'login',
          do: 'wx_prompt',
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              wechat_xcx_prompt: res.data.data.wechat_xcx_prompt,
              wechat_xcx_logo: res.data.data.wechat_xcx_logo
            });
          }
        }
      });
    },
    // close_skip: function () {
    //   var that = this;
    //   that.setData({
    //     login_state: 'display:none'
    //   })
    // },
    goShopping: function () {
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/index'
        });
      }, 1000);
    },
    //去结算跳转
    settle_skip: function (e) {
      console.log('选中图挨砖',e)
      var that = this;
      var type = e.currentTarget.dataset.type;
      var merchid = e.currentTarget.dataset.shopid;

      if (type == 'true') {
        uni.navigateTo({
          url: '/pages/flow/flow?merchid=' + merchid
        });
      } else {
        wx.showToast({
          title: '商品不能少于起批量',
          icon: 'success',
          duration: 2000
        });
      }
    },
    // 左滑动删除开始******************************************************
    drawStart: function (e) {
      var touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      var cardTeams = this.cardTeams;

      for (var i in cardTeams) {
        var data = cardTeams[i];
        data.startRight = data.right;
      }

      key = 'true';
    },
    drawEnd: function (e) {
      var cardTeams = this.cardTeams;

      for (var i in cardTeams) {
        var data = cardTeams[i];

        if (data.right <= 100 / 2) {
          data.right = 0;
        } else {
          data.right = maxRight;
        }
      }

      this.setData({
        cardTeams: cardTeams
      });
    },
    drawMove: function (e) {
      var self = this;
      var dataId = e.currentTarget.id;
      var index = e.currentTarget.dataset.index;
      var cardTeams = this.cardTeams;

      if (key) {
        var touch = e.touches[0];
        endX = touch.clientX;
        endY = touch.clientY;

        if (endX - startX == 0) {
          return;
        }

        var res = cardTeams; //从右往左

        var carlist = self.cart_list;

        if (endX - startX < 0) {
          var startRight;
          var change = startX - endX;
          startRight = parseInt(change);

          if (startRight > maxRight) {
            startRight = maxRight;
          } else {
            startRight = 0;
          }

          for (var i in carlist) {
            if (carlist[i].merchid == dataId) {
              carlist[i].goods_list[index].right = startRight;
            }
          }
        } else {
          // 从左往右
          var startRight;
          var change = startX - endX;
          startRight = parseInt(change);

          if (startRight < 50) {
            startRight = 0;
          }

          for (var i in carlist) {
            if (carlist[i].merchid == dataId) {
              carlist[i].goods_list[index].right = startRight;
            }
          }
        }

        self.setData({
          cart_list: self.cart_list
        });
      }
    }
  }
};
</script>
<style>
@import "./cart.css";
</style>