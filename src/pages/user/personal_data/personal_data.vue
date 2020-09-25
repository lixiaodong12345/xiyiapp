<template>
<!--pages/user/personal_data/personal_data.wxml-->
<form @submit="personal_data">
  <view class="border6"></view>
  <view class="mobile">
      <text class="mobile_tx1">手机号</text>
      <text class="mobile_tx2">*</text>
      <input type="text" name="mobile" :value="userInfo.mobile" placeholder="(未绑定)" class="tx1"></input>
      <navigator @tap="skiping">
      <text class="mobile_tx3">立即绑定</text>
      </navigator>
  </view>
  <view class="border6"></view>
  <view class="mobile">
      <text class="mobile_tx1">姓名</text>
      <text class="mobile_tx2">*</text>
      <input type="text" name="username" :value="userInfo.realname" placeholder="请输入您的姓名"></input>
  </view>
  <view class="mobile">
      <text class="mobile_tx1">微信昵称</text>
      <text class="mobile_tx2">*</text>
      <input type="text" name="wechat" :value="userInfo.nickname_wechat" placeholder="请输入您的微信昵称"></input>
  </view>
  <view class="mobile">
      <text class="mobile_tx1">出生日期</text>
      <text class="mobile_tx2">*</text>
      <picker mode="date" name="birth" :value="dateValue" start="1797-01-01" end="9999-12-12" @change="datePickerBindchange">
        {{dateValue}}
      </picker>
  </view>
  <view class="mobile">
      <text class="mobile_tx1">所在城市</text>
      <text class="mobile_tx2">*</text>
      <view class="cont">
        <picker mode="selector" class="continput2" @change="changepronince" :value="provinceindex" :range="province_list">
          <view class="picker">
          <text class="selector_text" v-if="[provinceindex]==''">请选择省</text>
          <text class="selector_text" v-else>{{province_list[provinceindex]}}</text>
          </view>
        </picker>
        <picker mode="selector" class="continput2" @change="changecity" :value="cityindex" :range="city_list">
          <view class="picker">
          <text class="selector_text" v-if="[cityindex]==''">请选择市</text>
          <text class="selector_text" v-else>{{city_list[cityindex]}}</text>
          </view>
        </picker>
        <picker mode="selector" class="continput2" @change="changedistrict" :value="districtindex" :range="district_list">
          <view class="picker">
          <text class="selector_text" v-if="[districtindex]==''">请选择区</text>
          <text class="selector_text" v-else>{{district_list[districtindex]}}</text>
          </view>
        </picker>
    </view>
  </view>
  <button type="warn" form-type="submit" :loading="loading" class="btn1">确认</button>
</form>
</template>

<script>
// pages/user/personal_data/personal_data.js
var app = getApp();
var province_id = '';
var district_id = '';
var city_id = '';

export default {
  data() {
    return {
      address_id: 0,
      province_list: [],
      city_list: [],
      district_list: [],
      provinceindex: '',
      cityindex: '',
      districtindex: '',
      loading: false,
      err_tis: '',
      err_tis_style: '',
      province_id: '',
      city_id: '',
      district_id: '',
      dateValue: '',
      userInfo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 请求记录
    var that = this;
    var user_info = app.globalData.getUserInfo();
    console.log("信息", user_info);
    var myDate = new Date(); // var dateValue = myDate.toLocaleDateString();

    var dateValue = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();

    if (user_info.birthyear != "") {
      dateValue = user_info.birthyear;
    }

    if (user_info.birthmonth != "") {
      dateValue += '-' + user_info.birthmonth;
    }

    if (user_info.birthday != "") {
      dateValue += '-' + user_info.birthday;
    } // console.log(dateValue);


    that.setData({
      userInfo: user_info,
      dateValue: dateValue,
      provinceindex: user_info.province,
      cityindex: user_info.city,
      districtindex: user_info.area
    }); //获取省份数据列表

    wx.request({
      url: app.globalData.domain,
      data: {
        c: 'ewei_shopv2',
        a: 'delivery',
        do: 'region_list',
        key: app.globalData.key
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 1) {
          //console.log(res.data.data);
          //console.log('222'); 
          that.setData({
            province_list: res.data.data //user_address:res.data.user_address

          });
        } else {
          that.setData({
            err_tis_style: 'display:block;',
            err_tis: res.data.msg
          });
        }
      }
    }); //获取地级市数据列表

    wx.request({
      url: app.globalData.domain,
      data: {
        c: 'ewei_shopv2',
        a: 'delivery',
        do: 'region_list',
        pid: user_info.province,
        key: app.globalData.key
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            city_list: res.data.data
          });
        } else {
          that.setData({
            err_tis_style: 'display:block;',
            err_tis: res.data.msg
          });
        }
      }
    }); //获取区县数据列表

    wx.request({
      url: app.globalData.domain,
      data: {
        c: 'ewei_shopv2',
        a: 'delivery',
        do: 'region_list',
        pid: user_info.province,
        cid: user_info.area,
        key: app.globalData.key
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            district_list: res.data.data
          });
        } else {
          that.setData({
            err_tis_style: 'display:block;',
            err_tis: res.data.msg
          });
        }
      }
    });
  },
  onReady: function () {// 页面渲染完成
  },
  onShow: function () {// 页面显示
  },
  onHide: function () {// 页面隐藏
  },
  onUnload: function () {// 页面关闭
  },
  methods: {
    datePickerBindchange: function (e) {
      this.setData({
        dateValue: e.detail.value
      });
    },
    // 页面跳转
    skiping: function () {
      uni.navigateTo({
        url: '/pages/user/bind_mobile/bind_mobile'
      });
    },
    changepronince: function (e) {
      //改变省份
      var that = this;
      console.log(e);
      that.province_id = e.detail.value;
      console.log(that.province_id);
      that.setData({
        provinceindex: e.detail.value
      }); //将选择的省份id发送到后台，获取城市列表

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_shopv2',
          a: 'delivery',
          do: 'region_list',
          pid: e.detail.value,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              city_list: res.data.data
            });
          }
        }
      });
    },
    changecity: function (e) {
      //改变城市
      var that = this;
      console.log(e);
      that.city_id = e.detail.value;
      console.log(that.city_id);
      that.setData({
        cityindex: e.detail.value
      }); //发送请求获取区域列表

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_shopv2',
          a: 'delivery',
          do: 'region_list',
          pid: that.province_id,
          cid: e.detail.value,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              district_list: res.data.data
            });
          }
        }
      });
    },
    changedistrict: function (e) {
      var that = this;
      console.log(e);
      that.district_id = e.detail.value;
      console.log(that.district_id);
      that.setData({
        districtindex: e.detail.value
      });
    },
    //提交个人信息
    personal_data: function (e) {
      var that = this;
      var user_info = app.globalData.getUserInfo();
      that.setData({
        loading: true
      });

      if (!e.detail.value.mobile) {
        wx.showToast({
          title: "手机号不能为空",
          icon: 'success',
          duration: 2000
        });
        return false;
        that.setData({
          loading: false
        });
      } else if (!e.detail.value.username) {
        wx.showToast({
          title: "姓名不能为空",
          icon: 'success',
          duration: 2000
        });
        return false;
        that.setData({
          loading: false
        });
      } else if (!that.city_id) {
        wx.showToast({
          title: "地址不能为空",
          icon: 'success',
          duration: 2000
        });
        that.setData({
          loading: false
        });
        return false;
      }

      console.log("个人信息"); // 发送请求提交个人信息

      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'user',
          do: 'changeuserinfo',
          key: app.globalData.key,
          uid: user_info.id,
          mobile: e.detail.value.mobile,
          username: e.detail.value.username,
          wechat: e.detail.value.wechat,
          birth: e.detail.value.birth,
          province: that.province_id,
          city: that.city_id,
          area: that.district_id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log("个人信息11111");
          that.setData({
            loading: false
          }); // console.log(res);

          if (res.data.code == 1) {
            console.log("确认成功--------------------------------");
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1500
            });
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/user/index'
              });
            }, 2000);
          } else {
            console.log("确认失败--------------------------------");
            that.setData({});
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./personal_data.css";
</style>