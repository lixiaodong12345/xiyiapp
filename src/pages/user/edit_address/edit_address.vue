<template>
<view>
<form @submit="save_address">
<view class="borderh4"></view>
<view class="addressmone">
  <view class="ul">
    <view class="title">
    收件人<text class="red"></text>
    </view>
    <view class="cont">
      <input :value="user_address.realname" name="consignee" type="text" class="continput" placeholder="收件人"></input>
    </view>
  </view>

  <view class="ul">
    <view class="title">
    联系电话<text class="red"></text>
    </view>
    <view class="cont">
      <input :value="user_address.mobile" name="mobile" type="text" class="continput" placeholder="联系电话" maxlength="11"></input>
    </view>
  </view>

  <view class="ul">
    <view class="title">
    所在地区<text class="red"></text>
    </view>
    <view class="cont">
      <picker mode="selector" class="continput2" name="provinceid" @change="changepronince" :value="provinceindex" :range="province_list">
        <view class="picker">
         <text class="selector_text select_color" v-if="[provinceindex]==''">请选择省</text>
         <text class="selector_text" v-else>{{province_list[provinceindex]}}</text>      
        </view>
      </picker>
      <picker mode="selector" class="continput2" name="cityid" @change="changecity" :value="cityindex" :range="city_list">
        <view class="picker">
         <text class="selector_text select_color" v-if="[cityindex]==''">请选择市</text>
         <text class="selector_text" v-else>{{city_list[cityindex]}}</text>        
        </view>
      </picker>
      <picker mode="selector" class="continput2" name="districtid" @change="changedistrict" :value="districtindex" :range="district_list">
        <view class="picker">
         <text class="selector_text select_color" v-if="[districtindex]==''">请选择区</text>
         <text class="selector_text" v-else>{{district_list[districtindex]}}</text>
        </view>
      </picker>
    </view>
  </view>

  <view class="ul">
    <view class="title">
    详细地址<text class="red"></text>
    </view>
    <view class="cont">
      <input :value="user_address.address" name="address" type="text" class="continput" placeholder="详细地址"></input>
    </view>
  </view>

  <view class="ul">
    <view class="title">
     邮 编
    </view>
    <view class="cont">
      <input :value="user_address.zipcode" name="zipcode" type="text" class="continput"></input>
    </view>
  </view>
  <view class="borderh4"></view>
  <view class="ul">
    <view class="title">
     设为默认
    </view>
    <view class="swith_right">
      <switch color="#55bcc5" @change="switch1Change"></switch>
    </view>
  </view>
</view>
<button type="warn" form-type="submit" :disabled="disabled" class="save_button">{{button_text}}</button>

</form>
<view class="err_tis" :style="err_tis_style">{{err_tis}}</view>
</view>
</template>

<script>
var app = getApp();
var pronince_id;
var district_id;
var city_id;
var to_type = '';
var to_commod;
var defult = 0;

export default {
  data() {
    return {
      province_list: [],
      city_list: [],
      district_list: [],
      provinceindex: '',
      cityindex: '',
      districtindex: '',
      loading: false,
      err_tis: '',
      err_tis_style: '',
      pronince_id: '',
      city_id: '',
      district_id: '',
      user_address: [{
        'realname': '',
        'mobile': '',
        'address': '',
        'zipcode': ''
      }],
      button_text: '保存地址',
      disabled: false
    };
  },

  components: {},
  props: {},
  onLoad: function (query) {
    // 请求记录
    var that = this;
    that.provicelist();
    var user_info = wx.getStorageSync('userInfo');
    to_commod = query.commod_id;

    if (query.commod_id) {
      // 编辑自动加载
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'info',
          key: app.globalData.key,
          aid: query.commod_id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            user_address: res.data.data,
            provinceindex: res.data.data.provinceindex,
            cityindex: res.data.data.cityindex,
            districtindex: res.data.data.districtindex,
            pronince_id: res.data.data.provinceindex,
            city_id: res.data.data.cityindex,
            district_id: res.data.data.districtindex,
            button_text: '编辑并保存地址'
          });
          that.citylist(res.data.data.provinceindex);
          that.districtlist(res.data.data.provinceindex, res.data.data.cityindex);
        }
      });
    }

    if (query.type == 'flow') {
      that.setData({
        button_text: '保存并继续结算'
      });
      to_type = 'flow';
    }
  },
  onShow: function () {},
  methods: {
    switch1Change: function (e) {
      console.log("选择默认", e);

      if (e.detail.value == true) {
        defult = 1;
      } else {
        defult = 0;
      }
    },
    //获取省份列表
    provicelist: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'region_list',
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            console.log(res.data.data);
            that.setData({
              province_list: res.data.data
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
    //获取城市列表
    citylist: function (pid) {
      var that = this;
      console.log("pid:" + pid);
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'region_list',
          pid: pid,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.data);

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
      });
    },
    //获取县区列表
    districtlist: function (pid, cid) {
      var that = this;
      console.log("县pid:" + pid);
      console.log("县cid:" + cid);
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'region_list',
          pid: pid,
          cid: cid,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.data);

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
    changepronince: function (e) {
      //改变省份
      var that = this;
      that.pronince_id = e.detail.value;
      that.setData({
        provinceindex: e.detail.value
      });
      wx.showLoading({
        title: '加载中'
      }); //将选择的省份id发送到后台，获取城市列表

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'region_list',
          pid: e.detail.value,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          //将城市列表初始值清空
          that.setData({
            city_list: [],
            cityindex: ''
          });

          if (res.data.code == 1) {
            wx.hideLoading({
              title: '加载中'
            });
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
      that.city_id = e.detail.value;
      console.log('444', that.cityList);
      wx.showLoading({
        title: '加载中'
      });
      that.setData({
        cityindex: e.detail.value
      }); //发送请求获取区域列表

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'region_list',
          pid: that.pronince_id,
          cid: e.detail.value,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          //将城市列表初始值清空
          that.setData({
            district_list: [],
            districtindex: ''
          });

          if (res.data.code == 1) {
            wx.hideLoading({
              title: '加载中'
            });
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
      that.setData({
        districtindex: e.detail.value
      });
    },
    // 发送请求保存收货地址
    save_address: function (e) {
      var that = this;
      var user_info = wx.getStorageSync('userInfo');
      that.setData({
        disabled: true,
        loading: true
      });

      if (to_commod) {
        console.log('编辑++++');
        that.edit_address(e);
      } else {
        console.log('添加++++');
        that.add_address(e);
      }
    },
    // 收货地址编辑
    edit_address: function (e) {
      var that = this;
      var user_info = wx.getStorageSync('userInfo'); //手机号正则表达式

      var phone_reg = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
      var phone_pred = e.detail.value.mobile;

      if (phone_pred == '') {
        that.setData({
          disabled: false
        });
        wx.showToast({
          title: '电话不能为空',
          icon: 'success',
          duration: 2000
        });
        return;
      } else if (phone_reg.test(phone_pred) == false) {
        that.setData({
          disabled: false
        });
        wx.showToast({
          title: '手机格式错误',
          icon: 'success',
          duration: 2000
        });
        return;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'change',
          key: app.globalData.key,
          openid: user_info.openid,
          realname: e.detail.value.consignee,
          mobile: e.detail.value.mobile,
          aid: to_commod,
          zipcode: e.detail.value.zipcode,
          address: e.detail.value.address,
          province: that.pronince_id,
          city: that.city_id,
          area: that.district_id,
          isdefault: defult // isdefault:1

        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              disabled: true
            });
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1500
            });
            wx.redirectTo({
              url: '/pages/user/address/address'
            });
          } else {
            that.setData({
              disabled: false
            });
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1000
            });
          }
        }
      });
    },
    //收货地址添加
    add_address: function (e) {
      var that = this;
      var user_info = wx.getStorageSync('userInfo'); //手机号正则表达式

      var phone_reg = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;
      var phone_pred = e.detail.value.mobile;

      if (phone_pred == '') {
        that.setData({
          disabled: false
        });
        wx.showToast({
          title: '电话不能为空',
          icon: 'success',
          duration: 2000
        });
        return;
      } else if (phone_reg.test(phone_pred) == false) {
        that.setData({
          disabled: false
        });
        wx.showToast({
          title: '手机格式错误',
          icon: 'success',
          duration: 2000
        });
        return;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'add',
          key: app.globalData.key,
          openid: user_info.openid,
          realname: e.detail.value.consignee,
          mobile: e.detail.value.mobile,
          address: e.detail.value.address,
          province: that.pronince_id,
          city: that.city_id,
          area: that.district_id,
          zipcode: e.detail.value.zipcode,
          isdefault: defult
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            loading: false
          });

          if (res.data.code == 1) {
            that.setData({
              disabled: true
            });
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1500
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/user/address/address'
              });
            }, 1000);
          } else {
            that.setData({
              disabled: false
            });
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1000
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./edit_address.css";
</style>