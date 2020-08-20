<template>
<view class="body">
  <view id="tis" class="tis" :style="tisshow">
  {{tis}}
  </view>

  <view :style="load_style" class="loadimg">
    <text>正在处理您的请求...</text>
  </view>

<scroll-view scroll-y="true" scroll-left="1" class="scroll_view" @scrolltolower="load_list">
  <block v-for="(item, index) in collect_goods" :key="index">
        <view class="goods_one">
          
          <image class="goods_img" :src="item.goods_thumb"></image>
            <view class="name_number">
              <text class="goods_name">商品:{{item.goods_name}}</text>
              <text class="goods_number">购买时间:{{item.buy_time}}</text>
            </view>
          <view v-if="item.status == 0" class="del_collection" :data-coll_id="item.comment_id" @tap="del_collection"></view>
        </view>

        <view class="content_style">
          <text>评级:</text>

          <view class="xingxing">
            <image v-if="item.comment_rank >= 1" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
            <image v-if="item.comment_rank >= 2" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
            <image v-if="item.comment_rank >= 3" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
            <image v-if="item.comment_rank >= 4" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
            <image v-if="item.comment_rank >= 5" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
          </view>

          <text class="content_text">评论：{{item.content}}</text>
        </view>


        
    <text class="borderh5"></text>
  </block>

  <view class="load_footer">
  {{load_footer}}
  </view>

</scroll-view>

</view>
</template>

<script>
var app = getApp();
var pages = 0;
var load_more = 0;

export default {
  data() {
    return {
      tis: '',
      tisshow: '',
      collect_goods: [],
      load_footer: '正在加载更多...',
      load_style: ''
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    // 发送请求获取初始收藏列表
    this.load_list();
  },
  onUnload: function () {
    load_more = 0;
    pages = 0;
  },
  methods: {
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
          act: 'comment_list',
          page: pages,
          uid: user_info.user_id,
          sign: user_info.sign
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.err == 0) {
            that.setData({
              collect_goods: that.collect_goods.concat(res.data.comment_list)
            });
            console.log(that.collect_goods);

            if (res.data.list_count == 0) {
              that.setData({
                load_footer: '没有更多评价了...'
              });
              load_more = 1;
            }
          } else {
            that.setData({
              tis: res.data.msg,
              tisshow: 'height:30px;',
              load_footer: '没有更多评价了...'
            });
            load_more = 1;
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./comment_list.css";
</style>