<template>
<view class="body">
  <view id="tis" class="tis" :style="tisshow">
  {{tis}}
  </view>

  <view :style="load_style" class="loadimg">
    <text>正在处理您的请求...</text>
  </view>

<form @submit="post_comment">

<view>
  <block v-for="(item, index) in collect_goods" :key="index">
        <view class="goods_one">
          
          <image class="goods_img" :src="item.goods_thumb"></image>
            <view class="name_number">
              <text class="goods_name">商品:{{item.goods_name}}</text>
              <text class="goods_number">{{item.goods_price}} x {{item.goods_number}}</text>
            </view>
        </view>

        <view class="content_style">
          <text>评价:</text>

          <view class="xingxing">
            <image v-if="item.comment_rank >= 1" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
            <image @tap="edit_xingxing" data-rank="2" :data-goods_id="item.goods_id" v-if="item.comment_rank >= 2" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
            <image @tap="edit_xingxing" data-rank="3" :data-goods_id="item.goods_id" v-if="item.comment_rank >= 3" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
            <image @tap="edit_xingxing" data-rank="4" :data-goods_id="item.goods_id" v-if="item.comment_rank >= 4" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
            <image @tap="edit_xingxing" data-rank="5" :data-goods_id="item.goods_id" v-if="item.comment_rank >= 5" src="http://wximage.shedongyun.com/sdo2o/5xing-red.gif"></image>
          </view>

          <view class="xingxing">
            <image v-if="item.comment_rank < 1" src="http://wximage.shedongyun.com/sdo2o/images/5xing.png"></image>
            <image @tap="edit_xingxing" data-rank="2" :data-goods_id="item.goods_id" v-if="item.comment_rank < 2" src="http://wximage.shedongyun.com/sdo2o/images/5xing.png"></image>
            <image @tap="edit_xingxing" data-rank="3" :data-goods_id="item.goods_id" v-if="item.comment_rank < 3" src="http://wximage.shedongyun.com/sdo2o/images/5xing.png"></image>
            <image @tap="edit_xingxing" data-rank="4" :data-goods_id="item.goods_id" v-if="item.comment_rank < 4" src="http://wximage.shedongyun.com/sdo2o/images/5xing.png"></image>
            <image @tap="edit_xingxing" data-rank="5" :data-goods_id="item.goods_id" v-if="item.comment_rank < 5" src="http://wximage.shedongyun.com/sdo2o/images/5xing.png"></image>
          </view>

          <textarea class="textarea" :name="item.goods_id" auto-height="true" placeholder="请输入评价内容..."></textarea>

        </view>


        
    <text class="borderh5"></text>

    

  </block>


</view>
<button class="submit_class" form-type="submit">提交评价</button>
</form>

</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      tis: '',
      tisshow: '',
      collect_goods: []
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // 发送请求获取商品列表
    console.log(options);
    this.load_list(options.order_id);
  },
  methods: {
    edit_xingxing: function (e) {
      var rank = e.target.dataset.rank;

      if (e.target.dataset.goods_id) {
        // 将对应的商品的评价等级更改
        var goods_list = this.collect_goods;

        for (var i = 0; i < goods_list.length; i++) {
          if (goods_list[i].goods_id == e.target.dataset.goods_id) {
            goods_list[i].comment_rank = rank;
            this.setData({
              collect_goods: goods_list
            });
          }
        }
      }
    },
    load_list: function (order_id) {
      var that = this;
      var user_info = app.globalData.getUserInfo();
      wx.request({
        url: app.globalData.domain + app.globalData.user,
        data: {
          act: 'order_goods_list',
          uid: user_info.user_id,
          sign: user_info.sign,
          order_id: order_id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.err == 0) {
            that.setData({
              collect_goods: that.collect_goods.concat(res.data.goods_list)
            });
          } else {
            that.setData({
              tis: res.data.msg,
              tisshow: 'height:30px;'
            });
          }
        }
      });
    },
    post_comment: function (e) {
      console.log(e.detail.value);
      var that = this;
      var user_info = app.globalData.getUserInfo();
      var goods_list = that.collect_goods;

      for (var i = 0; i < goods_list.length; i++) {
        goods_list[i].comment_text = e.detail.value[goods_list[i].goods_id];
        delete goods_list[i].goods_name;
        delete goods_list[i].goods_thumb;
        delete goods_list[i].goods_number;
        delete goods_list[i].goods_price;
      }

      console.log(goods_list);
      wx.request({
        url: app.globalData.domain + app.globalData.user,
        data: {
          act: 'comment_send',
          uid: user_info.user_id,
          sign: user_info.sign,
          goods_list: goods_list
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.err == 0) {
            wx.showToast({
              title: '评价成功,感谢您的支持！',
              icon: 'success',
              duration: 2000
            });
            wx.redirectTo({
              url: '/pages/user/comment_list/comment_list?id=1'
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./order_comment.css";
</style>