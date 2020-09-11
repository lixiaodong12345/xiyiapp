<template>
  <view>
    <!-- <import src="../../../wxParse/wxParse.wxml"></import> -->
    <view class="wrap">
      <!--顶部背景图-->
      <image :src="shop_info.back_img" class="shop_back"></image>
      <!--vip图片-->
      <image
        v-if="shop_info.vip_status == '1' && isendtime > endtime"
        mode="widthFix"
        src="http://wximage.shedongyun.com/sdo2o/vip_logo.png"
        class="vip_logo"
      ></image>
      <!--信息展示-->
      <view class="store_inform">
        <image :src="shop_info.logo" class="store_logo"></image>
        <view class="store_title">{{ shop_info.merchname }}</view>
        <view class="store_addre">
          <view class="addre_show">
            <image
              src="http://wximage.shedongyun.com/sdo2o/shop_address.png"
              class="shop_address"
            ></image>
            <text class="addre_name">{{ shop_info.address }}</text>
          </view>
          <text class="line_bar"></text>
          <view class="service_time">服务次数{{ shopdata.salenum }}</view>
        </view>
        <view class="approve_wrap">
          <text class="real_name">已实名</text>
          <text class="comp_firm">{{ shop_info.merchgroupname }}</text>
        </view>
        <!--关注-->
        <view
          class="focus_before"
          @tap="attention"
          data-type="add"
          :data-merchid="shop_info.id"
          :style="add"
        >
          <image
            src="http://wximage.shedongyun.com/sdo2o/focus_no.png"
            class="focus_no"
          ></image>
          <text class="focus_name">关注</text>
        </view>
        <view
          class="focus_before focus_after"
          @tap="attention"
          data-type="cancel"
          :data-merchid="shop_info.id"
          :style="cancel"
        >
          <image
            src="http://wximage.shedongyun.com/sdo2o/focus_been.png"
            class="focus_no"
          ></image>
          <text class="focus_name">已关注</text>
        </view>
        <!--电话-->
        <view @tap="collphone" :data-tel="shop_info.mobile" class="make_phone">
          <view class="phone_main">
            <image
              src="http://wximage.shedongyun.com/sdo2o/phone_back.png"
              class="phone_back"
            ></image>
            <image
              src="http://wximage.shedongyun.com/sdo2o/shop_phone.png"
              class="shop_phone"
            ></image>
            <text class="phone_name">电话</text>
          </view>
        </view>
      </view>
      <view class="back_line"></view>
      <!--信息展示结束-->
      <!--大内容-->
      <view class="large_module">
        <!--四大模块标题导航-->
        <view class="title_navigate">
          <view
            :class="'nav_one ' + (navId == 0 ? 'current_nav' : '')"
            @tap="module_switch"
            data-type="0"
            >首页</view
          >
          <view
            :class="'nav_one ' + (navId == 1 ? 'current_nav' : '')"
            @tap="module_switch"
            data-type="1"
            >全部服务</view
          >
          <view
            :class="'nav_one ' + (navId == 2 ? 'current_nav' : '')"
            @tap="module_switch"
            data-type="2"
            >服务介绍</view
          >
          <view
            :class="'nav_one ' + (navId == 3 ? 'current_nav' : '')"
            @tap="module_switch"
            data-type="3"
            >店铺介绍</view
          >
        </view>
        <!--四大模块类别-->
        <view class="module_wrap">
          <!--1、首页-->
          <view
            :class="'module_index ' + (navId == 0 ? 'disp_show' : 'disp_hide')"
          >
            <!--广告位-->
            <image
              v-if="shopdata.adv != null"
              :src="shopdata.adv"
              class="head_advert"
            ></image>
            <!--产品-->
            <view v-if="goods_list != ''">
              <view class="module_list">
                <!--一条-->
                <block v-for="(item, index) in goods_list" :key="index">
                  <navigator
                    :url="'/pages/goods/goods?goods_id=' + item.id"
                    hover-class="none"
                  >
                    <view class="module_line">
                      <image :src="item.thumb" class="prod_image"></image>
                      <view class="module_main">
                        <view class="shop_title">{{ item.title }}</view>
                        <view class="laundy_cond">
                          <text>已售{{ item.sale_num }}</text>
                        </view>
                        <view class="module_price"
                          >￥{{ item.productprice }}</view
                        >
                      </view> </view
                    ><!--module_line-->
                  </navigator>
                </block> </view
              ><!--module_list-->
              <!--加载更多-->
              <view class="load_more" :style="goods_state">
                <!-- <image src="http://wximage.shedongyun.com/sdo2o/load_logo.png" class="load_logo"></image> -->
                <text class="load_name">{{ goods_more }}</text>
              </view>
            </view>
            <!--数据为空时的状态-->
            <view class="none_oder_stati" v-if="goods_list == ''">
              <image
                src="http://wximage.shedongyun.com/sdo2o/none_goods.png"
              ></image>
              <text>暂无该数据哦~</text>
            </view> </view
          ><!--首页module_index-->

          <!--全部服务-->
          <view
            :class="'module_all ' + (navId == 1 ? 'disp_show' : 'disp_hide')"
          >
            <!--全部类别-->
            <view class="category_wrap">
              <!--显示部分-->
              <view class="category_part">
                <view class="part_main">
                  <text @tap="getCatelist" data-cateid class="first_text"
                    >全部</text
                  >
                  <block v-for="(item, index) in cate_list" :key="index">
                    <text
                      @tap="getCatelist"
                      :data-cateid="item.id"
                      v-if="index < 3"
                      >{{ item.description }}</text
                    >
                  </block>
                </view>
                <image
                  src="http://wximage.shedongyun.com/sdo2o/down_logo.png"
                  @tap="allcate"
                  class="boult_logo"
                ></image>
              </view>
              <!--全部部分-->
              <view class="modal" :style="allcatestyle"></view>
              <view class="module_modal" :style="allcatestyle">
                <view class="modal_main">
                  <!--标题-->
                  <view class="modal_title">
                    <text class="title_name">全部类别</text>
                    <image
                      src="http://wximage.shedongyun.com/sdo2o/up_logo.png"
                      @tap="allcatehide"
                      class="boult_logo"
                    ></image>
                  </view>
                  <!--内容-->
                  <view class="modal_cont">
                    <view @tap="getCatelist" data-cateid class="modal_one"
                      >全部</view
                    >
                    <block v-for="(item, index) in cate_list" :key="index">
                      <view
                        @tap="getCatelist"
                        :data-cateid="item.id"
                        class="modal_one"
                        >{{ item.description }}</view
                      >
                    </block>
                  </view>
                </view>
              </view> </view
            ><!--category_wrap-->
            <!--产品-->
            <view class="all_wrap">
              <view v-if="categood_list != ''">
                <view class="module_list">
                  <!--一条-->
                  <block v-for="(item, index) in categood_list" :key="index">
                    <navigator
                      :url="'/pages/goods/goods?goods_id=' + item.id"
                      hover-class="none"
                    >
                      <view class="module_line">
                        <image :src="item.thumb" class="prod_image"></image>
                        <view class="module_main">
                          <view class="shop_title">{{ item.title }}</view>
                          <view class="laundy_cond">
                            <text>已售{{ item.sale_num }}</text>
                          </view>
                          <view class="module_price"
                            >￥{{ item.productprice }}</view
                          >
                        </view> </view
                      ><!--module_line-->
                    </navigator>
                  </block> </view
                ><!--module_list-->
                <!--加载更多-->
                <view class="load_more" :style="cates_state">
                  <!-- <image src="http://wximage.shedongyun.com/sdo2o/load_logo.png" class="load_logo"></image> -->
                  <text class="load_name">{{ cates_more }}</text>
                </view>
              </view>
              <!--数据为空时的状态-->
              <view class="none_oder_stati" v-if="categood_list == ''">
                <image
                  src="http://wximage.shedongyun.com/sdo2o/none_goods.png"
                ></image>
                <text>暂无该数据哦~</text>
              </view> </view
            ><!--产品all_wrap结束--> </view
          ><!--全部服务module_all-->

          <!--服务介绍-->
          <view
            :class="
              'service_introd ' + (navId == 2 ? 'disp_show' : 'disp_hide')
            "
          >
            <!--项目介绍-->
            <view class="project_inform">
              <jyf-parser :html="htmlFn(html)"></jyf-parser>
              <!-- <view v-html="html"></view> -->
            </view> </view
          ><!--服务介绍service_introd结束-->

          <!--店铺介绍-->
          <view
            :class="'store_intord ' + (navId == 3 ? 'disp_show' : 'disp_hide')"
          >
            <view class="store_head">商家介绍</view>
            <!--文字介绍-->
            <view class="introd_inform">
              <jyf-parser :html="htmlFn(article_productContent)"></jyf-parser>
            </view>
            <!--项目介绍-->
            <view class="back_line"></view>
            <view class="project_inform">
              <view class="project_line">
                <text class="name_left">主营项目:</text>
                <text class="name_right">{{ shop_info.salecate }}</text>
              </view>
              <view class="project_line">
                <text class="name_left">联系人:</text>
                <text class="name_right">{{ shop_info.realname }}</text>
              </view>
              <view
                @tap="collphone"
                :data-tel="shop_info.mobile"
                class="project_line"
              >
                <text class="name_left">联系方式:</text>
                <image
                  src="http://wximage.shedongyun.com/sdo2o/style_select.png"
                  class="name_skip"
                ></image>
                <text class="name_right">{{ shop_info.mobile }}</text>
              </view>
              <view @tap="lokelocation" class="project_line">
                <text class="name_left">商家地址:</text>
                <image
                  src="http://wximage.shedongyun.com/sdo2o/style_select.png"
                  class="name_skip"
                ></image>
                <text class="name_right">{{ shop_info.address }}</text>
              </view>
            </view> </view
          ><!--店铺介绍store_intord结束--> </view
        ><!--module_wrap--> </view
      ><!--大内容结束-->
    </view>
  </view>
</template>

<script>
var app = getApp();
var uid = app.globalData.uid;
var page = 0;
var endtime = Date.parse(new Date()) / 1000;
var cat_id = 0;
var load_more = 0;
var supp_id = 0;
var search_value = 0;
var sign = "";
var nums = 0;
var prices = 0;
var cid = "";
var shopid;
import parser from "@/components/jyf-parser/jyf-parser";
export default {
  data() {
    return {
      empty_style: "display:none",
      ppstyle: "display:none",
      fig_value: 9,
      oriangl_style: "display:inline-block",
      current_style: "display:none",
      oriangl_price: "display:inline-block",
      current_price: "display:none",
      allcatestyle: "display:none",
      navId: 0,
      endtime: endtime,
      add: "display:block",
      cancel: "display:none",
      goods_state: "display:none",
      cates_state: "display:none",
      goods_more: "暂无更多",
      cates_more: "暂无更多",
      categood_list: "",
      goods_list: "",
      shop_info: "",
      isendtime: "",
      cate_list: "",
      shopdata: "",
      best_list: "",
      article_productContent: "",
      html: "",
    };
  },

  components: {
    "jyf-parser": parser,
  },
  props: {},
  onLoad: function(options) {
    shopid = options.id;
    wx.setNavigationBarTitle({
      title: app.globalData.bar_title,
    });
  },
  onReady: function() {},

  /*生命周期函数--监听页面显示*/
  onShow: function() {
    this.getSHopinfo();
  },

  /*生命周期函数--监听页面隐藏*/
  onHide: function() {},

  /*生命周期函数--监听页面卸载*/
  onUnload: function() {},

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function() {},

  /*页面上拉触底事件的处理函数*/
  onReachBottom: function() {},

  /*用户点击右上角分享*/
  onShareAppMessage: function() {},
  methods: {
    // 富文本解析
    htmlFn(html) {
      let temp = "";
      if (html.length == 0) return "";
      temp = html.replace(/&amp;/g, "&");
      temp = temp.replace(/&lt;/g, "<");
      temp = temp.replace(/&gt;/g, ">");
      temp = temp.replace(/&nbsp;/g, " ");
      temp = temp.replace(/&#39;/g, "'");
      temp = temp.replace(/&quot;/g, '"');
      return temp;
    },
    lokelocation: function() {
      var that = this;
      var latitude = parseFloat(that.shop_info.lat);
      var longitude = parseFloat(that.shop_info.lng);
      console.log("地理位置", latitude, longitude);
      uni.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28,
        name: that.shop_info.merchname,
        address: that.shop_info.address,
      });
    },
    //添加关注+取消关注
    attention: function(e) {
      var that = this;
      var uid = app.globalData.uid;

      if (uid == null) {
        wx.showToast({
          title: "请授权后关注",
          icon: "success",
          duration: 1500,
        });
        return;
      }

      var merchid = e.currentTarget.dataset.merchid;

      if (e.currentTarget.dataset.type == "add") {
        wx.request({
          url: app.globalData.domain,
          data: {
            a: "follow",
            do: "add",
            uid: uid,
            merchid: merchid,
            key: app.globalData.key,
          },
          header: {
            "Content-Type": "application/json",
          },
          success: function(res) {
            if (res.data.code == 1) {
              that.setData({
                add: "display:none",
                cancel: "display:block",
              });
              wx.showToast({
                title: "关注成功",
                icon: "success",
                duration: 1500,
              });
            } else {
              that.setData({
                add: "display:blocke",
                cancel: "display:none",
              });
              wx.showToast({
                title: "关注失败",
                icon: "success",
                duration: 1500,
              });
            }
          },
        });
      } else {
        wx.request({
          url: app.globalData.domain,
          data: {
            a: "follow",
            do: "cancel",
            uid: uid,
            merchid: merchid,
            key: app.globalData.key,
          },
          header: {
            "Content-Type": "application/json",
          },
          success: function(res) {
            if (res.data.code == 1) {
              that.setData({
                add: "display:block",
                cancel: "display:none",
              });
              wx.showToast({
                title: "取消关注成功",
                icon: "success",
                duration: 1500,
              });
            } else {
              that.setData({
                add: "display:none",
                cancel: "display:block",
              });
              wx.showToast({
                title: "取消关注失败",
                icon: "success",
                duration: 1500,
              });
            }
          },
        });
      }
    },

    /*整个店铺信息*/
    getSHopinfo: function(e) {
      var that = this;
      var uid = app.globalData.uid;
      wx.request({
        method: "GET",
        url: app.globalData.domain,
        data: {
          a: "shop",
          do: "shop_info",
          key: app.globalData.key,
          shopid: shopid,
          // uid: uid,
          /**
           * @params uid 用户注册后
           */
          uid: app.globalData.uid ? app.globalData.uid : -1,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          console.log("店铺信息", res);
          if (res.data.code == 1) {
            that.setData({
              categood_list: res.data.data.goods_list,
              goods_list: res.data.data.recommand_list,
              shop_info: res.data.data.shop_info,
              isendtime: parseInt(res.data.data.shop_info.vip_endtime),
              cate_list: res.data.data.cate_list,
              shopdata: res.data.data,
              goods_state: "display:block",
              cates_state: "display:block",
            });
            if (res.data.data.follow == 1) {
              that.setData({
                add: "display:none",
                cancel: "display:block",
              });
            } else {
              that.setData({
                add: "display:block",
                cancel: "display:none",
              });
            }
            that.article_productContent = res.data.data.shop_info.desc;
            that.html = res.data.data.shop_info.serve_desc;
          }
        },
      });
    },
    /*全部服务模块点击分类请求的商品列表信息*/
    getCatelist: function(e) {
      var that = this;
      var uid = app.globalData.uid;
      var cateid = e.currentTarget.dataset.cateid;
      wx.request({
        method: "GET",
        url: app.globalData.domain,
        data: {
          a: "shop",
          do: "shop_info",
          key: app.globalData.key,
          shopid: shopid,
          uid: uid,
          cid: cateid,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            var categoodList = res.data.data.goods_list;

            if (categoodList == "") {
              that.setData({
                cates_state: "display:none",
              });
            } else {
              that.setData({
                cates_state: "display:block",
              });
            }

            that.setData({
              categood_list: categoodList,
              allcatestyle: "display:none",
            });
          }
        },
      });
    },

    /*商品分类弹窗*/
    catePorpup: function(e) {
      var that = this;
      var fig_value = e.currentTarget.dataset.figure;
      that.setData({
        fig_value: fig_value,
        oriangl_style: "display:inline-block",
        current_style: "display:none",
        oriangl_price: "display:inline-block",
        current_price: "display:none",
      });

      if (that.ppstyle == "display:none") {
        that.setData({
          ppstyle: "display:block",
        });
      } else {
        that.setData({
          ppstyle: "display:none",
        });
      }
    },
    // 导航模块切换
    module_switch: function(e) {
      var that = this;
      var nav_id = e.currentTarget.dataset.type;

      if (nav_id == 1) {
        that.getSHopinfo();
      }

      that.setData({
        navId: nav_id,
      });
    },
    //点击事件
    allcate: function() {
      var that = this;
      that.setData({
        allcatestyle: "display:block",
      });
    },
    collphone: function(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel,
      });
    },
    allcatehide: function() {
      var that = this;
      that.setData({
        allcatestyle: "display:none",
      });
    },

    /*未知信息*/
    getCateinfo: function(e) {
      var name = e.currentTarget.dataset.name;
      var fig_value = e.currentTarget.dataset.figure;

      if (fig_value == 8) {
        that.setData({
          oriangl_style: "display:none",
          current_style: "display:inline-block",
          oriangl_price: "display:inline-block",
          current_price: "display:none",
        });
      } else if (fig_value == 7) {
        that.setData({
          oriangl_style: "display:inline-block",
          current_style: "display:none",
          oriangl_price: "display:none",
          current_price: "display:inline-block",
        });
      } else {
        that.setData({
          oriangl_style: "display:inline-block",
          current_style: "display:none",
          oriangl_price: "display:inline-block",
          current_price: "display:none",
        });
      }

      if (name == "") {
        sign = "";
        cid = "";
      } else if (name == "num" && nums == 0) {
        sign = "h_salenum";
        nums = 1;
      } else if (name == "num" && nums == 1) {
        sign = "l_salenum";
        nums = 0;
      } else if (name == "price" && prices == 0) {
        sign = "h_price";
        prices = 1;
      } else if (name == "price" && prices == 1) {
        sign = "l_price";
        prices = 0;
      }
      var that = this;
      wx.request({
        method: "GET",
        url: app.globalData.domain,
        data: {
          a: "shop",
          do: "shop_info",
          key: app.globalData.key,
          shopid: shopid,
          sign: sign,
          cid: cid,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.data.goods_list != "") {
            that.setData({
              best_list: res.data.data.goods_list,
              empty_style: "display:none",
            });
          } else {
            that.setData({
              best_list: "",
              ppstyle: "display:none",
              empty_style: "display:block",
            });
          }
        },
      });
    },
  },
};
</script>
<style>
@import "./shop_detail.css";
</style>
