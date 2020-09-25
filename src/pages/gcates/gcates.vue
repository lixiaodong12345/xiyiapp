<template>
  <view class="goods_body">
    <view class="container">
      <!--一个大模块-->
      <block
        v-for="(item, index) in cateList"
        :key="index"
        v-if="item.sub_gcates != '' && item.sub_gcates != undefind"
      >
        <view class="one_module">
          <view class="nav_left">
            <image
              src="http://wximage.shedongyun.com/sdo2o/cate01.png"
              class="nav_left_img"
            ></image>
            <view class="nav_left_items">{{ item.name }}</view> </view
          ><!--一级导航结束-->
          <view class="nav_right">
            <view class="all_title">
              <block v-for="(item, index2) in item.sub_gcates" :key="index2">
                <view
                  :class="
                    'Three_level_menu ' + (item.id == currId ? 'current' : '')
                  "
                  @tap="gcate_skip"
                  :data-id="item.id"
                  >{{ item.name }}</view
                >
              </block>
            </view> </view
          ><!--二级导航结束--> </view
        ><!--一个大模块结束-->
      </block>
    </view>
  </view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      navLeftItems: [],
      navRightItems: [],
      curNav: 1,
      curIndex: 0,
      tis: "",
      cids: app.globalData.menucid,
      copyright: app.globalData.copyright,
      currId: "",
      cateList: "",
    };
  },

  components: {},
  props: {},
  onLoad: function() {},
  onShow: function() {
    var that = this;
    that.searchOneCats();
  },
  //转发分享按钮
  onShareAppMessage: function() {
    return app.globalData.goShareApp("/pages/index");
  },
  methods: {
    //分类数据
    searchOneCats: function() {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "gcates",
          do: "list",
          key: app.globalData.key,
        },
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              cateList: res.data.data,
            });
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      });
    },
    //点击分类跳转商品列表
    gcate_skip: function(e) {
      var that = this;
      var cateId = e.currentTarget.dataset.id;
      that.setData({
        currId: cateId,
      });
      uni.navigateTo({
        url: "/pages/category/category?cat_id=" + cateId,
      });
    },
  },
};
</script>
<style>
@import "./gcates.css";
</style>
