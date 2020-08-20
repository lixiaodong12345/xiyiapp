<template>
<view class="content">
  <view class="hearder_sesarch auto">
		<view class="hearder_search_input">
      <icon type="search" size="16" class="searchicon"></icon>
			<input @input="searchTextFun" type name id value placeholder="搜索您需要的商品"></input>
		</view>
		<text @tap="goSearch" class="fl">搜索</text>
	</view>
   <!--轮播图  -->
    <swiper class="swiper_box" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <block v-for="(item, index) in shop_slide" :key="index">

        <view :data-link_wxapp="item.link_wxapp" @tap="search_hyperlinkb"><!--url="{{item.link_wxapp}}"-->
          <swiper-item>
            <image :src="item.thumb" class="slide-image" style="height:380rpx; width:750rpx;"></image>
          </swiper-item>
        </view>
      </block>
    </swiper>
    <view class="menu_box">
      <scroll-view scroll-x class="scroll-header">
        <block v-for="(item, index) in shop_cate" :key="index">
          <view @tap="getCatelist" :data-id="item.id" :class="'scroll-view-item ' + (curNav == item.id ? 'active' : '')"> 
            <text>{{item.catename}}</text>
          </view>
        </block>
      </scroll-view>
    </view>
    <!--列表  -->
    <block v-for="(item, index) in shop_list" :key="index">
		<view class="storelist auto">
			<view class="storelist_box auto">
				<view class="storelist_top auto">
          <navigator :url="'/pages/shop/shop_detail/shop_detail?id=' + item.id">
					<text class="go">进店</text>
          </navigator>
					<view class="headimg">
						<image :src="item.logo"></image>
					</view>
					<view class="storelist_top_content">
						<text class="name">{{item.merchname}}</text>
						<text class="text">销量{{item.salenum}}</text><text class="text">共{{item.goods_num}}件宝贝</text>
					</view>
				</view>
				<view class="row">
					<view id="demo-test-gallery" class="demo-gallery">
            <block v-for="(item, index2) in item.goods" :key="index2">
              <navigator :url="'/pages/goods/goods?goods_id=' + item.id">
              <view class="a">
                <image :src="item.thumb"></image>
                <text class="price">¥ {{item.marketprice}}</text>
              </view>
              </navigator>
            </block>
					</view>
				</view>
			</view>
		</view>
		<view class="divider"></view>		
    <view v-if="item.adv!=null" class="adv_image_box">
      <image :data-link_wxapp="item.adv.link_wxapp" @tap="search_hyperlinkb" class="adc_img" :src="item.adv.icon"></image>
		  <view class="divider"></view>	
    </view>
		<view v-if="item.adv!=null" class="divider"></view>		
    </block>
    <view v-if="code!=1" class="shop_none">
      <text>暂无此类型店铺</text>
    </view>
    
    <view class="listmore nomore">暂无更多</view> 
    
    
</view>
</template>

<script>
var app = getApp();
var pages = 0;
var load_more = 0;
var order_status = "";

export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      curNav: 0,
      copyright: app.globalData.copyright,
      code: "",
      shop_list: "",
      tis: "",
      tisshow: "",
      load_footer: "",
      searchText: "",
      shop_slide: "",
      shop_cate: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (query) {
    var that = this;
  },
  onShow: function () {
    var that = this;
    that.getShopbanner();
    that.getShoplist();
    that.getShopcate();
  },
  //转发分享按钮
  onShareAppMessage: function () {
    return app.globalData.goShareApp('/pages/index');
  },
  methods: {
    changeCarlist: function () {},
    goShop: function () {
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/index'
        });
      }, 1000);
    },
    getShoplist: function () {
      pages++;
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'shop',
          do: 'list',
          key: app.globalData.key
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              code: res.data.code,
              shop_list: res.data.data
            });
          } else {
            that.setData({
              code: res.data.code,
              tis: res.data.msg,
              tisshow: 'height:30px;',
              load_footer: '暂时没有店铺'
            });
            load_more = 1;
          }
        }
      });
    },
    getCatelist: function (e) {
      console.log(e);
      var cateid = e.currentTarget.dataset.id;
      console.log('cateid', cateid);
      pages++;
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'shop',
          do: 'list',
          key: app.globalData.key,
          cateid: cateid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              code: res.data.code,
              shop_list: res.data.data,
              curNav: cateid
            });
          } else {
            that.setData({
              code: res.data.code,
              tis: res.data.msg,
              shop_list: '',
              load_footer: '暂时没有店铺',
              curNav: cateid
            });
            load_more = 1;
          }
        }
      });
    },
    searchTextFun: function (e) {
      var that = this;
      console.log(e);
      that.setData({
        searchText: e.detail.value
      });
    },
    goSearch: function (e) {
      console.log(e);
      var that = this;
      var text = that.searchText;
      wx.navigateTo({
        url: "/pages/shop/shop_search/shop_search?text=" + text
      });
    },
    getShopbanner: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'shop',
          do: 'slide',
          key: app.globalData.key
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              shop_slide: res.data.data
            });
          }
        }
      });
    },
    getShopcate: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'shop',
          do: 'cate',
          key: app.globalData.key
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              shop_cate: res.data.data,
              curNav: res.data.data[0].id
            });
          }
        }
      });
    },
    // 图片超链接事件
    search_hyperlinkb: function (e) {
      var con = e.currentTarget.dataset.cid;
      app.globalData.menucid = con;
      console.log(e);
      var link_wxapp = e.currentTarget.dataset.link_wxapp;

      if (link_wxapp == "/pages/cart/cart" || link_wxapp == "/pages/index" || link_wxapp == "/pages/user/index") {
        wx.switchTab({
          url: link_wxapp
        });
      } else {
        wx.navigateTo({
          url: link_wxapp
        });
      }
    }
  }
};
</script>
<style>
@import "./shop_list.css";
</style>