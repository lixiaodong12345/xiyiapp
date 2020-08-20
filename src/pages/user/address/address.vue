<template>
<view class="add_body">
<navigator redirect="true" url="/pages/shop/flow/flow?id=1">
  <view class="flow_tis" :style="flow_tis_style">
    <text class="flow_tis_text">请选择一个收货地址设为默认,点我继续结算喔！</text>
  </view>
</navigator>
<view class="borderh4"></view>
<block v-if="user_address != ''">
  <block v-for="(item, index) in user_address" :key="index">
  <view class="address">
   <view class="add_wrap">
    <view class="add">
      <view class="add_top">
        <view class="add_name">
          {{item.realname}}
        </view>
        <view class="add_mobile">
          {{item.mobile}}
        </view>
      </view>
      <view class="add_bot">
        <view class="add_info">
          {{item.province}}{{item.city}}{{item.area}}{{item.address}}
        </view>
      </view> 
    </view>
   </view>
    <view class="edit_menu">
      <image mode="widthFix" class="select" v-if="item.isdefault == 1" src="http://wximage.shedongyun.com/sdo2o/true.png"></image>
      <image mode="widthFix" class="select" v-else src="http://wximage.shedongyun.com/sdo2o/false.png"></image>
      <checkbox :data-address_id="item.id" @tap="set_address" class="edit_defaulter" checked v-if="item.isdefault == 1"></checkbox>
      <checkbox :data-address_id="item.id" @tap="set_address" class="edit_defaulter" v-else></checkbox>
      <view class="set_default">
      <text v-if="item.isdefault == 1">默认地址</text>
      <text v-else>设为默认</text>
      </view>
      <view class="dele_edit">
        <view :data-addre_id="item.id" @tap="del_address" class="edit_edit">删除</view>
        <image class="ico" @tap="del_address" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/add_dele.png"></image>
        <navigator :url="'/pages/user/edit_address/edit_address?commod_id=' + item.id">
          <view class="edit_edit">编辑</view>
          <image class="ico" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/add_write.png"></image>
        </navigator>
      </view>
     </view>
  </view>
    <view class="borderh4"></view>
  </block>
  <view class="footer2">
    <navigator url="/pages/user/edit_address/edit_address" hover-class="none" open-type="redirect">
      <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/add_add.png" class="footer2_img"></image>
      <text>添加新地址</text>
    </navigator>
  </view>
</block>

<block v-else>
  <view class="no_address_box">
    <image src="http://wximage.shedongyun.com/sdo2o/addre_none.png"></image>
    <text class="no_address">{{add_err_tis}}</text>
  </view>
  <view class="footer2">
    <navigator url="/pages/user/edit_address/edit_address" hover-class="none" open-type="redirect">
      <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/add_add.png" class="footer2_img"></image>
      <text>添加新地址</text>
    </navigator>
  </view>
</block>
<view class="borderh3"></view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      user_address: [],
      add_err_tis: '',
      flow_tis_style: '',
      copyright: app.globalData.copyright,
      openid: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (query) {
    var that = this; // 请求列表

    var openid = wx.getStorageSync('userInfo').openid;
    console.log('收货地址openid', openid);
    that.setData({
      openid: openid
    });
    that.get_address_list();
  },
  methods: {
    // 获取地址列表
    get_address_list: function () {
      var that = this;
      var openid = that.openid;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'delivery',
          do: 'list',
          openid: openid,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.data);

          if (res.data.code == 1) {
            if (res.data.data != '') {
              that.setData({
                user_address: res.data.data
              });
            } else {
              that.setData({
                user_address: '',
                add_err_tis: '您还没有服务地址哦！'
              });
            }
          } else {
            that.setData({
              user_address: '',
              add_err_tis: '您还没有服务地址哦！'
            });
          }
        }
      });
    },
    // 设为默认地址
    set_address: function (e) {
      console.log(e.target.dataset.address_id + '设置默认地址');
      var that = this;
      var openid = that.openid;

      if (e.target.dataset.address_id) {
        //   发送修改请求
        wx.request({
          url: app.globalData.domain,
          data: {
            c: 'ewei_o2o',
            a: 'delivery',
            do: 'setdefault',
            key: app.globalData.key,
            openid: openid,
            aid: e.target.dataset.address_id
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            if (res.data.code == 1) {
              console.log('修改成功！');
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 5000
              });
              that.get_address_list();
            } else {
              console.log('出错啦');
            }
          }
        });
      }
    },
    // 删除地址
    del_address: function (e) {
      console.log(e.target.dataset.addre_id + 'aid');
      var add_id = e.target.dataset.addre_id;

      if (e.target.dataset.addre_id) {
        var that = this;
        var openid = that.openid;
        wx.showModal({
          title: '删除提示',
          content: '您确定要删除这收货地址吗？',
          success: function (res) {
            if (res.confirm) {
              // 发送请求删除
              wx.request({
                url: app.globalData.domain,
                data: {
                  c: 'ewei_o2o',
                  a: 'delivery',
                  do: 'del',
                  aid: e.target.dataset.addre_id,
                  key: app.globalData.key,
                  openid: openid
                },
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  if (res.data.code == 1) {
                    // 删除成功
                    that.get_address_list();
                    console.log("删除成功！");
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'success',
                      duration: 2000
                    });
                    console.log('出错啦');
                  }
                }
              });
            }
          }
        });
      } else {
        console.log('意外触发');
      }
    }
  }
};
</script>
<style>
@import "./address.css";
</style>