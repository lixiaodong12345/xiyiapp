<template>
<view class="content">
  <view class="hearder_sesarch auto">
		<image class="fa fa-search" mode="widthFix" src="/static/static/images/search_ico.png"></image>
		<view class="hearder_search_input">
			<input type name id :value="searchs" @confirm="soft_trigger" confirm-type="search" placeholder="搜索您需要的商品"></input>
		</view>
		<text @tap="goSearch" class="fl">搜索</text>
	</view>
    <!--列表 -->
    <block v-for="(item, index) in shop_list" :key="index">
		<view :class="'storelist ' + (index==0?'martop50':'') + ' auto'">
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
                <text class="price">¥ {{item.productprice}}</text>
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
    </block>
    <view v-if="code!=1" class="shop_none">
      <text>暂无此类型店铺</text>
    </view>
    
    
</view>
</template>

<script>
var app = getApp();
var pages = 0;
var load_more = 0;
var searcgtext;

export default {
  data() {
    return {
      searchs: "",
      code: "",
      shop_list: "",
      tis: "",
      load_footer: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (query) {
    var that = this;

    if (query.text) {
      console.log('跳转页面+++++');
      searcgtext = query.text;
      that.setData({
        searchs: query.text
      });
      that.getSearchlist();
    } else {
      console.log('不跳转页面+++++');
    }
  },
  onShow: function () {
    var that = this;
  },
  //转发分享按钮
  onShareAppMessage: function () {
    return app.globalData.goShareApp('/pages/index');
  },
  methods: {
    changeCarlist: function () {},
    getSearchlist: function (e) {
      pages++;
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: 'shop',
          do: 'list',
          key: app.globalData.key,
          keyword: searcgtext
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
              shop_list: '',
              load_footer: '暂时没有店铺'
            });
            load_more = 1;
          }
        }
      });
    },
    soft_trigger: function (e) {
      var that = this;
      searcgtext = e.detail.value;
      console.log('软键盘searcgtext值', searcgtext);
      that.setData({
        searchs: searcgtext
      });
      that.getSearchlist();
    },
    // searchText: function (e) {
    //   var that = this;
    //   console.log(e)
    //   searcgtext = e.detail.value;
    // },
    goSearch: function (e) {
      console.log(e);
      var that = this;
      that.getSearchlist();
    }
  }
};
</script>
<style>
@import "./shop_search.css";
</style>