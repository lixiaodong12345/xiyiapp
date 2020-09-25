<template>
<view class="container">
<form @submit="withdraw_submit">
 <!--提现金额-->
 <view class="amount_cont">
   <view class="amount_number">
      <text class="number_cont">我的可提现佣金</text>
   </view>
   <view class="amount_number">
      <text class="number_symble">￥</text>
      <text class="number_num">{{money}}</text>
      <input name="withdraw_money" :value="money" hidden="true"></input>
   </view>
 </view>
 <!--提现方式-->
 <view class="amount_style">
   <!--标题-->
   <view class="amount_title common_pad">
     <view class="amount_number">
      <text class="style_title">提现方式</text>
      <view class="style_select" @tap="drawal_skip">
        <input name="mode_pass" :value="mode_pass" hidden="true"></input>
        <input name="withdraw_type" :value="select_id" hidden="true"></input>
        <text class="select_title">{{name}}</text>
        <image :src="style_select" class="select_image"></image>
      </view>
     </view>
   </view><!--amount_title-->

   <!--银行卡方式-->
   <view class="alipay_wrap" :style="bank_state">
     <!--姓名-->
     <view class="common_line">
       <text class="common_title">姓名</text>
       <view class="style_select">
         <input name="real_name" type="text" value @blur="pass_value" class="common_input" placeholder="请填写姓名"></input>
       </view>
     </view><!--common_line-->
     <!--选择银行卡-->
     <view class="common_line common_pad">
       <text class="style_title">选择银行卡</text>
       <view class="style_select" @tap="bank_skip">
        <text class="select_title">{{bank_name}}</text>
        <input name="bank_name" type="text" :value="bank_name" hidden="true"></input>
        <image :src="style_select" class="select_image"></image>
      </view>
     </view><!--common_line-->
     <!--卡号-->
     <view class="common_line">
       <text class="common_title">银行卡号</text>
       <view class="style_select">
         <input name="bank_card" type="text" value @blur="pass_number" class="common_input" placeholder="请填写银行卡号"></input>
       </view>
     </view><!--common_line-->
     <!--确认卡号-->
     <view class="common_line">
       <text class="common_title">确认卡号</text>
       <view class="style_select">
         <input type="text" value class="common_input" placeholder="确认卡号"></input>
       </view>
     </view><!--common_line-->
   </view><!--alipay_wrap-->


   <!--支付宝方式-->
   <view class="alipay_wrap" :style="alipay_state">
     <!--姓名-->
     <view class="common_line">
       <text class="common_title">姓名</text>
       <view class="style_select">
         <input name="alipay_name" type="text" value @blur="treasure_name" class="common_input" placeholder="请输入姓名"></input>
       </view>
     </view><!--common_line-->
     <!--支付宝账号-->
     <view class="common_line">
       <text class="common_title">支付宝账号</text>
       <view class="style_select">
         <input name="alipay_num" type="text" value @blur="treasure_numb" class="common_input" placeholder="请输入支付宝账号"></input>
       </view>
     </view><!--common_line-->
     <!--确认账号-->
     <view class="common_line">
       <text class="common_title">确认帐号</text>
       <view class="style_select">
         <input type="text" value class="common_input" placeholder="确认账号"></input>
       </view>
     </view><!--common_line-->
   </view><!--alipay_wrap-->
 </view><!--amount_style-->
 <!--提交按钮-->
 <button form-type="submit" type="warn" class="upload_button">{{upload_button}}</button>
 <!--说明-->
 <view class="instruct_inform">
   <text class="instruct_title">温馨提示</text>
   <text class="instruct_cont">佣金提现扣个人所得税{{withdrawcharge}}%</text>
   <text class="instruct_cont">扣除个人所得税金额在￥{{withdrawbegin}}到￥{{withdrawend}}间免税</text>
   <text class="instruct_cont">本次提现实际到账金额￥{{money}}</text>
 </view>
 </form>

 <!--提现方式-->
 <view class="deposit_mask" :style="deposit_state">
   <view class="deposit_cont">
     <!--标题-->
     <view class="deposit_title">
       <text class="deposit_name">请选择提现方式</text>
       <image :src="deposit_shut" class="deposit_shut" @tap="draw_shut"></image>
     </view>
     <!--选择方式-->
     <view class="deposit_main">
       <block v-for="(item, index) in interWay" :key="index">
        <!--余额-->
        <view class="deposit_line" v-if="item.value==1">
          <view class="line-left">
            <image v-if="item.value==1 && item.id==0" :src="balance" class="balance_logo"></image>
            <image v-else-if="item.value==1 && item.id==1" :src="wechat" class="wechat_logo"></image>
            <image v-else-if="item.value==1 && item.id==2" :src="treasure" class="treasure_logo"></image>
            <image v-else-if="item.value==1 && item.id==3" :src="bank" class="bank_logo"></image>
            <text class="balance_font">{{item.name}}</text>
          </view>
          <view class="line-right" @tap="pattern_select" :data-id="item.id" :data-name="item.name">
            <image :src="select_initial" class="select_logo"></image>
            <image :src="select_final" :class="(item.id==select_id ?'posit_show':'') + ' posit_logo'"></image> 
          </view>
        </view><!--deposit_line-->
       </block>
     </view><!--deposit_main-->
   </view>
 </view>


 <!--银行卡方式-->
 <view class="deposit_mask" :style="deposit_bank">
   <view class="deposit_cont">
     <!--标题-->
     <view class="deposit_title">
       <text class="deposit_name">请选择银行卡方式</text>
       <image :src="deposit_shut" class="deposit_shut" @tap="bank_shut"></image>
     </view>
     <!--选择方式-->
     <view class="deposit_main">
       <block v-for="(item, index) in bankWay" :key="index">
        <view class="deposit_line">
          <view class="line-left">
            <text class="balance_font">{{item.bankname}}</text>
          </view>
          <view class="line-right" @tap="bank_select" :data-id="item.id" :data-name="item.bankname">
            <image :src="select_initial" class="select_logo"></image>
            <image :src="select_final" :class="(item.id==bank_id ?'posit_show':'') + ' posit_logo'"></image>
          </view>
        </view><!--deposit_line-->
       </block>
     </view>
   </view>
 </view>

 <!--银行卡提示-->
 <view class="deposit_mask" :style="bank_bounce">
   <view class="deposit_cont">
     <!--标题-->
     <view class="deposit_title">
       <text class="deposit_name">提示</text>
       <image :src="deposit_shut" class="deposit_shut" bintap="shut_down"></image>
     </view>
     <!--选择方式-->
     <view class="deposit_main">
       <text class="prompt_title">确认提现到银行卡？</text>
       <view class="prompt_line">
          <view class="prompt_name">姓名：{{pass_name}}</view>
       </view>
       <view class="prompt_line">
          <view class="prompt_name">{{bank_name}}卡号：{{pass_numb}}</view>
       </view>
     </view>
     <!--重置和提交-->
     <view class="refer_wrap">
       <view class="refer_submit" @tap="bank_cancel">取消</view>
       <view class="refer_button" @tap="bank_confirm">确认</view>
     </view>
   </view>
 </view>

 <!--支付宝提示-->
 <view class="deposit_mask" :style="alipay_prompt">
   <view class="deposit_cont">
     <!--标题-->
     <view class="deposit_title">
       <text class="deposit_name">提示</text>
       <image :src="deposit_shut" class="deposit_shut" bintap="alipay_down"></image>
     </view>
     <!--选择方式-->
     <view class="deposit_main">
       <text class="prompt_title">确认提现到支付宝？</text>
       <view class="prompt_line">
          <view class="prompt_name">姓名：{{trea_name}}</view>
       </view>
       <view class="prompt_line">
          <view class="prompt_name">支付宝帐号：{{trea_numb}}</view>
       </view>
     </view>
     <!--重置和提交-->
     <view class="refer_wrap">
       <view class="refer_submit" @tap="alipay_cancel">取消</view>
       <view class="refer_button" @tap="alipay_confirm">确认</view>
     </view>
   </view>
 </view>



</view>
</template>

<script>
// pages/user/distribution_wait/distribution_wait.js
var app = getApp();
var money;
var mode_style;

export default {
  data() {
    return {
      style_select: "/static/static/images/style_select.png",
      bank_state: 'display:none',
      alipay_state: 'display:none',
      deposit_shut: "/static/static/images/style_shut.png",
      balance: "/static/static/images/balance.png",
      select_initial: "/static/static/images/select_initial.png",
      select_final: "/static/static/images/select_final.png",
      wechat: "/static/static/images/wechat.png",
      treasure: "/static/static/images/treasure.png",
      bank: "/static/static/images/bank.png",
      deposit_state: 'display:none',
      deposit_bank: 'display:none',
      alipay_prompt: 'display:none',
      upload_button: '下一步',
      bank_bounce: 'display:none',
      name: '请选择提现方式',
      bank_name: '请选择银行卡',
      bankname: '',
      bankcard: '',
      realname: '',
      alipay_realname: '',
      alipay: '',
      withd_type: '',
      mode_style: 0,
      money: "",
      interWay: "",
      bankWay: "",
      bank_id: "",
      select_id: "",
      pass_name: "",
      pass_numb: "",
      trea_name: "",
      trea_numb: "",
      mode_pass: "",
      withdrawcharge: "",
      withdrawbegin: "",
      withdrawend: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    money = options.money;
    that.setData({
      money: money
    });
    console.log('money值', money);
    that.interface_way();
    that.bank_show();
    that.warm_prompt();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    // 提现提交
    withdraw_submit: function (e) {
      var that = this;
      console.log('e的值', e);
      var user_info = app.globalData.userInfo;
      console.log('user_info值', user_info); // 是否点击提现

      var mode_pass = e.detail.value.mode_pass; // 提现金额

      var money = e.detail.value.withdraw_money; // 提现方式

      var withdraw_type = e.detail.value.withdraw_type;
      that.withd_type = e.detail.value.withdraw_type;

      if (mode_pass == 1) {
        if (withdraw_type == 3) {
          that.bankname = e.detail.value.bank_name;
          that.bankcard = e.detail.value.bank_card;
          that.realname = e.detail.value.real_name;
          that.setData({
            bank_bounce: 'display:block'
          });
        } else if (withdraw_type == 2) {
          that.alipay_realname = e.detail.value.alipay_name;
          that.alipay = e.detail.value.alipay_num;
          that.setData({
            alipay_prompt: 'display:block'
          });
        } else {
          wx.request({
            url: app.globalData.domain,
            data: {
              a: 'commission',
              do: 'withdrawal',
              money: money,
              type: withdraw_type,
              uid: user_info.id,
              key: app.globalData.key
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log('提交返回值', res);

              if (res.data.code == 1) {
                uni.navigateTo({
                  url: '/pages/user/distribut_success/distribut_success'
                });
              } else {
                uni.navigateTo({
                  url: '/pages/user/distribut_fail/distribut_fail'
                });
              }
            }
          });
        }
      } else {
        console.log('没有选择提现方式++++');
        wx.showToast({
          title: '请选择提现方式',
          icon: 'success',
          duration: 1000
        });
      }
    },
    // 银行卡确认提交
    bank_confirm: function () {
      var that = this;
      var user_info = app.globalData.userInfo;
      var realname = that.realname;
      var bankname = that.bankname;
      var bankcard = that.bankcard;
      var withd_type = that.withd_type;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'commission',
          do: 'withdrawal',
          money: money,
          type: withd_type,
          uid: user_info.id,
          key: app.globalData.key,
          bankname: bankname,
          bankcard: bankcard,
          realname: realname
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('提交返回值', res);

          if (res.data.code == 1) {
            uni.navigateTo({
              url: '/pages/user/distribut_success/distribut_success'
            });
          } else {
            uni.navigateTo({
              url: '/pages/user/distribut_fail/distribut_fail'
            });
          }
        }
      });
    },
    // 支付宝确认提交
    alipay_confirm: function () {
      var that = this;
      var user_info = app.globalData.userInfo;
      var alipayname = that.alipay_realname;
      var alipay = that.alipay;
      var withd_type = that.withd_type;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'commission',
          do: 'withdrawal',
          money: money,
          type: withd_type,
          uid: user_info.id,
          key: app.globalData.key,
          realname: alipayname,
          alipay: alipay
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('提交返回值', res);

          if (res.data.code == 1) {
            uni.navigateTo({
              url: '/pages/user/distribut_success/distribut_success'
            });
          } else {
            uni.navigateTo({
              url: '/pages/user/distribut_fail/distribut_fail'
            });
          }
        }
      });
    },
    // 银行卡取消
    bank_cancel: function () {
      uni.navigateTo({
        url: '/pages/user/distribution_center/distribution_center'
      });
    },
    // 支付宝取消
    alipay_cancel: function () {
      uni.navigateTo({
        url: '/pages/user/distribution_center/distribution_center'
      });
    },
    // 提现方式接口
    interface_way: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'commission',
          do: 'txtypes',
          key: app.globalData.key
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              interWay: res.data.data
            });
          }
        }
      });
    },
    // 银行卡选择接口
    bank_show: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'commission',
          do: 'bank',
          key: app.globalData.key
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('银行卡返回值', res);

          if (res.data.code == 1) {
            that.setData({
              bankWay: res.data.data
            });
          }
        }
      });
    },
    bank_select: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      var bank_name = e.currentTarget.dataset.name;
      that.setData({
        bank_id: id,
        bank_name: bank_name
      });
    },
    pattern_select: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      var name = e.currentTarget.dataset.name;
      console.log('选择的值', id);

      if (id == 2) {
        // 支付宝
        that.setData({
          alipay_state: "display:block",
          bank_state: 'display:none',
          select_id: id,
          name: name
        });
      } else if (id == 3) {
        // 银行卡
        that.setData({
          bank_state: 'display:block',
          alipay_state: "display:none",
          select_id: id,
          name: name
        });
      } else {
        that.setData({
          bank_state: 'display:none',
          alipay_state: "display:none",
          select_id: id,
          name: name
        });
      }
    },
    pass_value: function (e) {
      var that = this;
      var pass_name = e.detail.value;
      that.setData({
        pass_name: pass_name
      });
    },
    pass_number: function (e) {
      var that = this;
      var pass_numb = e.detail.value;
      that.setData({
        pass_numb: pass_numb
      });
    },
    treasure_name: function (e) {
      var that = this;
      var trea_name = e.detail.value;
      that.setData({
        trea_name: trea_name
      });
    },
    treasure_numb: function (e) {
      var that = this;
      var trea_numb = e.detail.value;
      that.setData({
        trea_numb: trea_numb
      });
    },
    bank_skip: function () {
      var that = this;
      that.setData({
        deposit_bank: 'display:block'
      });
    },
    drawal_skip: function () {
      var that = this;
      that.mode_style = 1;
      var mode_pass = that.mode_style;
      that.setData({
        deposit_state: 'display:block;',
        mode_pass: mode_pass
      });
    },
    draw_shut: function () {
      var that = this;
      that.setData({
        deposit_state: 'display:none;'
      });
    },
    bank_shut: function () {
      var that = this;
      that.setData({
        deposit_bank: 'display:none'
      });
    },
    shut_down: function () {
      var that = this;
      that.setData({
        bank_bounce: 'display:none'
      });
    },
    alipay_down: function () {
      var that = this;
      that.setData({
        alipay_prompt: 'display:none'
      });
    },
    // 温馨提示
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
            that.setData({
              withdrawcharge: res.data.data.withdrawcharge,
              withdrawbegin: res.data.data.withdrawbegin,
              withdrawend: res.data.data.withdrawend
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./distribution_wait.css";
</style>