<template>
<!--index.wxml-->
<view class="container">
 
  <!--轮播图  -->
  <swiper v-if="indexinfo.banner" class="banner" indicator-dots="true" :indicator-color="indicator_color" :indicator-active-color="indicator_active_color" :vertical="vertical" :interval="interval" :autoplay="autoplay" :duration="duration" @change="bindchange" :circular="circular" :style="'height:' + height + 'rpx;'">  
    <block v-for="(item, index) in indexinfo.banner" :key="index">  
      <swiper-item>  
        <image :src="item" mode="aspectFit" @load="imageLoad" class=".itemimage" :style="'height:' + imgheights[current] + 'rpx;width:' + imgwidth + 'rpx;'"></image>  
      </swiper-item>  
    </block>  
  </swiper>  
  <view class="index_company">
      <view class="index_company_box">
          <view class="index_company_left">
            <view class="index_company_logo">
              <view class="index_company_logo_box">
                <image mode="widthFix" :src="indexinfo.logo"></image>
              </view>
            </view>
          </view>
          <view class="index_company_right">
            <view class="index_company_title">
              <text>{{indexinfo.storename}}</text>
            </view>
            <view class="index_company_nature">
              <text>{{indexinfo.desc}}</text>
            </view>
          </view>
      </view>
  </view>  
  <view class="index_list">
    <view class="index_list_li">
      <image class="one" src="http://wximage.shedongyun.com/sdo2o/locations.png"></image><text>{{indexinfo.address}}</text><image class="right" src="http://wximage.shedongyun.com/sdo2o/backs.png"></image>
    </view>
    <view class="index_list_li">
      <image class="two" src="http://wximage.shedongyun.com/sdo2o/data.png"></image><text>{{indexinfo.saletime}}</text>
    </view>
    <view @tap="callphone" class="index_list_li">
      <image class="three" src="http://wximage.shedongyun.com/sdo2o/phone.png"></image><text>{{indexinfo.tel}}</text><image class="right" src="http://wximage.shedongyun.com/sdo2o/backs.png"></image>
    </view>
    <view class="index_list_li">
      <image class="four" src="http://wximage.shedongyun.com/sdo2o/photo.png"></image><text>门店照片</text>
    </view>
  </view>
  <view class="img_list">
    <block v-for="(item, index) in indexinfo.images" :key="index">
    <view class="img_list_li">
      <image @tap="imglock" :data-url="item" mode="widthFix" :src="item"></image>
    </view>
    </block>
  </view>
</view>
</template>

<script>
//index.js
//获取应用实例
var store_id;
var app = getApp();

export default {
  data() {
    return {
      indexAdvses: ["/static/img/bj.png"],
      interval: 3000,
      hdimg: [],
      //是否采用衔接滑动  
      circular: true,
      //是否显示画板指示点  
      indicatorDots: false,
      //选中点的颜色  
      indicatorcolor: "#000",
      //是否竖直  
      vertical: false,
      //是否自动切换  
      autoplay: true,
      //滑动动画时长毫秒  
      duration: 100,
      //所有图片的高度  
      imgheights: [],
      //图片宽度  
      imgwidth: 750,
      //默认  
      current: 0,
      height: "",
      indexinfo: "",
      shopImgs: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    store_id = options.store_id;
    this.searchCompanyList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    imageLoad: function (e) {
      //获取图片真实宽度  
      var imgwidth = e.detail.width,
          imgheight = e.detail.height,
          //宽高比  
      ratio = imgwidth / imgheight;
      console.log(imgwidth, imgheight); //计算的高度值  

      var viewHeight = 750 / ratio;
      var imgheight = viewHeight;
      var imgheights = this.imgheights; //把每一张图片的高度记录到数组里  

      imgheights.push(imgheight);
      console.log("dsdssds", imgheights);
      var num = imgheights.length;
      var height = imgheights[0];

      for (var i = 0; i < num; i++) {
        if (imgheights[i] < height) {
          height = imgheights[i];
        }
      }

      this.setData({
        imgheights: imgheights,
        height: height
      });
    },
    bindchange: function (e) {
      console.log(e.detail.current);
      this.setData({
        current: e.detail.current
      });
    },
    imglock: function (e) {
      var that = this;
      var current = e.target.dataset.url;
      var list = that.shopImgs;
      wx.previewImage({
        current: current,
        urls: list // 需要预览的图片http链接列表

      });
    },
    callphone: function () {
      wx.makePhoneCall({
        phoneNumber: this.indexinfo.tel //仅为示例，并非真实的电话号码

      });
    },
    //获取企业信息联系方式数据
    searchCompanyList: function () {
      var that = this; //接口请求数据

      wx.request({
        url: app.globalData.domain,
        data: {
          a: "store",
          do: "info",
          store_id: store_id,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data.data);
          that.setData({
            indexinfo: res.data.data,
            shopImgs: res.data.data.images
          });
          wx.setNavigationBarTitle({
            title: res.data.data.storename
          });
        },
        fail: function () {}
      });
    }
  }
};
</script>
<style>
@import "./store_index.css";
</style>