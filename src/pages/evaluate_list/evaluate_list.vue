<template>
<view class="evaluate_wrap">
  <!--总评分-->
  <view class="evaluate_total">
     <text class="total_score">{{avg_level}}</text>
     <block v-for="(item, index) in starList" :key="index">
      <image :src="item" class="bigstar_after"></image>
     </block>
  </view>
  <view class="line_back"></view>
  <view class="evaluate_content">
    <view class="evaluate_cate">
      <text :class="currStatus=='all'?'current_select':''" @tap="evaluteList" data-status="all">全部{{total_num}}</text>
      <!-- <text class="{{currStatus=='new'?'current_select':''}}" bindtap="evaluteList" 
      data-status="new">最新</text> -->
      <text :class="currStatus=='images'?'current_select':''" @tap="evaluteList" data-status="images">晒图</text>
      <!-- <text>追评3</text> -->
    </view>
    <!--评价内容——有内容-->
    <view class="evaluate_cont" :style="show_style">
      <!--一条-->
      <block v-for="(item, index) in commentList" :key="index">
        <view class="evaluate_line">
          <view class="evaluate_user">
            <image :src="item.headimgurl" class="head_logo"></image>
            <view class="user_phone">{{item.nickname}}</view>
            <view class="user_star">
              <block v-for="(levelImage, index2) in item.levelStar" :key="index2">
                <image v-if="index<item.level" :src="levelImage"></image>
                <image v-else :src="afterImage"></image>
              </block>
            </view>
            <view class="user_time">{{item.createtime}}</view>
          </view>
          <view class="evaluat_cont">{{item.content}}</view>
          <view class="evaluat_inform">服务方式：上门服务</view>
            <view class="evaluat_picture" v-if="item.images!=''">
              <block v-for="(imgItem, index2) in item.images" :key="index2" v-if="index<4">
                <image :src="imgItem" class="picture_logo"></image>
              </block>
            </view>
          <!--回复-->
          <view class="add_evaluat" v-if="item.reply_content!=''">
            <text class="add_title">回复</text>
            <view class="evaluat_cont evaluat_width">{{item.reply_content}}</view>
          </view>
        </view><!--evaluate_line-->
        <view class="small_line"></view>
      </block>
      <view class="nomore" :style="none_style">没有更多评价了~</view> 
    </view><!--evaluate_cont-->
    <!--无内容-->
    <view class="none_oder_stati" :style="empty_style">
      <image src="http://wximage.shedongyun.com/sdo2o/none_goods.png"></image>
      <text>暂无该评价哦~</text>
    </view>
  </view>
</view>
</template>

<script>
var app = getApp();
var goods_id;
var status_type = 'all';
var page = 1;
var commentList;

export default {
  data() {
    return {
      currStatus: 'all',
      afterImage: 'http://wximage.shedongyun.com/sdo2o/star_before.png',
      none_style: 'dispaly:none',
      empty_style: 'display:none',
      show_style: 'display:block',
      commentList: [],
      starList: ['http://wximage.shedongyun.com/sdo2o/bigstar_before.png', 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png', 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png', 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png', 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png'],
      littleStar: ['http://wximage.shedongyun.com/sdo2o/star_after.png', 'http://wximage.shedongyun.com/sdo2o/star_after.png', 'http://wximage.shedongyun.com/sdo2o/star_after.png', 'http://wximage.shedongyun.com/sdo2o/star_after.png', 'http://wximage.shedongyun.com/sdo2o/star_after.png'],
      goods_id: "",
      avg_level: "",
      total_num: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    goods_id = options.goods_id;
    that.setData({
      goods_id: goods_id
    });
    page = 1;
    that.evaluteList();
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  // 加载更多数据
  onReachBottom: function () {
    var that = this;
    console.log('加载更多');
    that.moreList();
  },
  methods: {
    //评价列表 点击切换
    evaluteList: function (e) {
      var that = this;

      if (e) {
        status_type = e.currentTarget.dataset.status;
        that.setData({
          currStatus: status_type
        });
        page = 1;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'goods',
          do: 'comment_list',
          gid: goods_id,
          status: status_type,
          key: app.globalData.key,
          page: page
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            //主评分
            var level_numb = Math.floor(res.data.data.avg_level);
            var starList = that.starList;

            for (var i = 0; i < starList.length; i++) {
              if (i < level_numb) {
                // 小于等于level_numb的是满心
                starList[i] = 'http://wximage.shedongyun.com/sdo2o/bigstar_after.png';
              } else {
                // 其他是空心
                starList[i] = 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png';
              }
            }

            var list = that.commentList;
            list = new Array(); //各列表的的星星

            var list = list.concat(res.data.data.comment_list);

            for (var i = 0; i < list.length; i++) {
              list[i].levelStar = that.littleStar;
            }

            that.setData({
              avg_level: res.data.data.avg_level,
              total_num: res.data.data.total_num,
              commentList: list,
              starList: starList,
              none_style: 'dispaly:none',
              empty_style: 'display:none',
              show_style: 'display:block'
            });
          } else {
            that.setData({
              none_style: 'dispaly:none',
              empty_style: 'display:block',
              show_style: 'display:none'
            });
          }
        }
      });
      page++;
      console.log('最初底', page);
    },
    //下拉加载评价列表 
    moreList: function (e) {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'goods',
          do: 'comment_list',
          gid: goods_id,
          status: status_type,
          key: app.globalData.key,
          page: page
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            //各列表的的星星
            var list = that.commentList;
            var list = list.concat(res.data.data.comment_list);

            for (var i = 0; i < list.length; i++) {
              list[i].levelStar = that.littleStar;
            }

            that.setData({
              avg_level: res.data.data.avg_level,
              total_num: res.data.data.total_num,
              commentList: list,
              none_style: 'dispaly:none',
              empty_style: 'display:none',
              show_style: 'display:block'
            });
          } else {
            that.setData({
              none_style: 'dispaly:block',
              empty_style: 'display:none',
              show_style: 'display:block'
            });
          }
        }
      });
      page++;
    }
  }
};
</script>
<style>
@import "./evaluate_list.css";
</style>