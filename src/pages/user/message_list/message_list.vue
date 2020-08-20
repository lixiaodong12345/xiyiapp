<template>
<view class="body">
  <view id="tis" class="tis" :style="tisshow">
  {{tis}}
  </view>
  <form @submit="send_message">
    <view class="message_body">

        <view class="message_title">
          <input name="message_title" placeholder="请输入留言主题" @tap="message_title"></input>
        </view>

        <textarea class="message_text" name="message_text" placeholder="请输入留言内容..."></textarea>

        <radio-group class="message_type_radio" @change="change_message_type">
            <radio value="0" checked="true"></radio>留言
            <radio value="1"></radio>投诉
            <radio value="2"></radio>询问
            <radio value="3"></radio>售后
            <radio value="4"></radio>求购
        </radio-group>

    </view>
    <button type="warn" :loading="submit_load" form-type="submit" class="message_submit_botton" @tap="changecolor">提交{{message_type_text}}</button>
    <!--<button type="warn" loading="{{submit_load}}" form-type="submit" class="message_submit_botton" style="background-color:#09BB07 !important;">提交{{message_type_text}}</button>-->
  </form>

<!--<scroll-view scroll-y="true" scroll-left="1" class="scroll_view" bindscrolltolower="load_list">
  <block wx:for="{{feedback_list}}" wx:key="promoter_list">
    <view class="list">
      <text class="title">{{item.msg_type}}:</text>
      <text class="msg_title">{{item.msg_title}}</text>
      <text class="time2">{{item.msg_time}}</text>
      <text class="desc">{{item.msg_content}}</text>
    </view>
  </block>

  <view class="load_footer">
  {{load_footer}}
  </view>
  <view class="Technical_support">
    <text class="Technical_support_text">{{copyright}}</text>
</view>
</scroll-view>-->

</view>
</template>

<script>
var app = getApp();
var pages = 0;
var load_more = 0;
var message_type = 0;

export default {
  data() {
    return {
      tis: '',
      tisshow: '',
      surplus_amount: 0,
      feedback_list: [],
      load_footer: '正在加载更多留言...',
      message_type_text: '留言',
      submit_load: false,
      copyright: app.globalData.copyright
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    // 发送请求获取首个列表和余额
    this.load_list();
  },
  onUnload: function () {
    load_more = 0;
    pages = 0;
  },
  methods: {
    change_message_type: function (e) {
      var message_type_new = '';

      switch (e.detail.value) {
        case '0':
          message_type_new = '留言';
          break;

        case '1':
          message_type_new = '投诉';
          break;

        case '2':
          message_type_new = '询问';
          break;

        case '3':
          message_type_new = '售后';
          break;

        case '4':
          message_type_new = '求购';
          break;

        default:
          message_type_new = '';
      }

      message_type = e.detail.value;
      this.setData({
        message_type_text: message_type_new
      });
    },
    load_list: function () {
      pages++;
      var that = this;
      var user_info = app.globalData.getUserInfo();

      if (load_more != 0) {
        return 0;
      }

      wx.request({
        url: app.globalData.domain + app.globalData.user,
        data: {
          act: 'message_list',
          pages: pages,
          uid: user_info.user_id,
          sign: user_info.sign
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.err == 0) {
            that.setData({
              feedback_list: that.feedback_list.concat(res.data.feedback_list)
            });
          } else {
            if (res.data.feedback_list != 'null') {
              that.setData({
                tis: res.data.msg,
                tisshow: 'height:30px;'
              });
            }
          }

          if (res.data.list_count == 0) {
            that.setData({
              load_footer: '还没有您的留言...'
            });
            load_more = 1;
          } else {
            wx.showToast({
              title: '订单状态更改失败',
              icon: 'loading',
              duration: 10000
            });
          }
        }
      });
    },
    send_message: function (e) {
      var that = this;
      that.setData({
        submit_load: true
      });
      console.log(e.detail.value.message_title);
      var user_info = app.globalData.getUserInfo(); // 提交留言，等待api，此api要返回新的留言列表

      wx.request({
        url: app.globalData.domain + app.globalData.user,
        data: {
          act: 'send_message',
          uid: user_info.user_id,
          sign: user_info.sign,
          msg_type: message_type,
          msg_title: e.detail.value.message_title,
          msg_content: e.detail.value.message_text
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            submit_load: false
          });

          if (res.data.err == 0) {
            that.setData({
              feedback_list: res.data.feedback_list
            });

            if (res.data.list_count == 0) {
              that.setData({
                load_footer: '还没有您的留言...'
              });
              load_more = 1;
            }
          } else {
            that.setData({
              tis: res.data.msg,
              tisshow: 'height:30px;'
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./message_list.css";
</style>