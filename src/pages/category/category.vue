<template>
<view>
<view class="header">
  <!-- <view class="nav" v-if="res.data.err == 1"> -->
  <view class="nav">
    <form @submit="search">
      <view class="section">
        <icon type="search" @tap="hand_search" :data-value="inputVal" size="16" class="searchicon"></icon>
        <!--bindtap="search_button"  -->
        <input @input="searchText" name="keywords" :placeholder="searchplaceholder" @confirm="soft_trigger" confirm-type="search" :value="inputVal" type="text" id="searchinput"></input>
        <!-- <view class="weui-icon-clear" wx:if="{{inputVal.length > 0}}" bindtap="clearInput">
          <icon type="clear" size="18" color="#828282"></icon>
        </view> -->
      </view>
    </form>
  </view>
</view><!--header-->
<!--搜索结束-->
<!--导航-->
<view class="search_tab">
 <view data-type="createtime" @tap="tab_typelist" :class="'search_tab_Subclass ' + (list_type=='createtime'?'active':'')" redirect="false">
   <text>最新</text>
 </view>
 <view data-type="sales" @tap="tab_typelist" :class="'search_tab_Subclass ' + (list_type=='sales'?'active':'')" redirect="false">
    <text class="search_tab_Subclass_text">销量</text>
    <image v-if="list_type=='sales'&&sales == 1" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/tab_up.png"></image> 
    <image v-if="list_type=='sales'&&sales == 0" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/tab_bot.png"></image> 
    <image v-if="list_type!='sales'" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/tab_none.png"></image> 
 </view>
 <view data-type="marketprice" @tap="tab_typelist" :class="'search_tab_Subclass ' + (list_type=='marketprice'?'active':'')" redirect="false">
    <text class="search_tab_Subclass_text">价格</text>
    <image v-if="list_type=='marketprice'&&marketprice == 1" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/tab_up.png"></image> 
    <image v-if="list_type=='marketprice'&&marketprice == 0" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/tab_bot.png"></image> 
    <image v-if="list_type!='marketprice'" mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/tab_none.png"></image> 
 </view>
 <view data-type="id" @tap="tab_typelist" :class="'search_tab_Subclass ' + (list_type=='id'?'active':'')" redirect="false">
  <text class="search_tab_Subclass_text">筛选</text>
  <image src="http://wximage.shedongyun.com/sdo2o/screen_logo.png" class="screen_icon"></image>
 </view>
</view>

<scroll-view scroll-y="true" scroll-left="1" class="scroll_view" @scrolltolower="more_goods_list">
  <view :style="show_type">
    <view v-if="best_list" class="scroll_cont">
      <block v-for="(item, index) in best_list" :key="index">
        <!--一条-->
        <view class="module_line" @tap="detail_skip" :data-id="item.id">
          <image mode="widthFix" v-if="item.total==0" :src="item.saleout" class="saleout_logo"></image>
          <view class="module_width">
            <image :src="item.thumb" class="prod_image"></image>
            <view class="module_main">
              <view class="shop_title">{{item.title}}</view>
              <view class="laundy_cond laundy_second">
                <text class="comp_first">已售{{item.sale_num}}</text>
                <text class="comp_firm">{{item.merch_type}}</text>
              </view>
              <view class="module_price">￥{{item.marketprice}}</view>
              <view class="comp_wrap">
                <image src="http://wximage.shedongyun.com/sdo2o/merchant_logo.png" class="comp_logo"></image>
                <text class="comp_name">{{item.merch_name}}</text>
              </view>
            </view>
            
          </view>
        </view><!--module_line-->
      </block>
    </view>
    <view v-if="load_more==1" class="listmore nomore">没有更多商品了...</view> 
    <!-- <view wx:else class="listmore nomore">加载更多</view>  -->
  </view>
  <!--为空状态图-->
  <view class="none_empty" :style="hide_type">
    <image src="http://wximage.shedongyun.com/sdo2o/none_logo.png" class="none_logo"></image>
    <view class="none_name">啊哦，没有相关商品哦~</view>
  </view>
</scroll-view>

<!--筛选模态框-->
<view :class="'modal ' + (giantView=='false'?'searchHide':'')" @tap="screen_skip"></view>
<view :class="'screen_modal ' + (giantView=='false'?'searchHide':'')">
  <scroll-view class="screen_main" scroll-y="true">
    <!--一个大模块-->
    <view class="screen_one">
      <view class="screen_title">服务商</view>
      <view class="screen_cont">
        <radio-group @change="checkprovidChange">
          <block v-for="(item, index) in vateList" :key="index">
            <view class="cont_one">
              <label>
                <text :class="'cont_name ' + (item.checked==true?'select_nav':'')">
                  {{item.groupname}}</text>
                <radio :value="item.id" :checked="item.checked" class="cont_check"></radio>
              </label>
            </view>
          </block>
        </radio-group>
      </view>
    </view><!--screen_one-->
    <view class="screen_one">
      <view class="screen_title">服务形式</view>
      <view class="screen_cont">
        <view class="cont_one">
          <checkbox-group @change="checkformChange">
            <label>
             <text :class="'cont_name ' + (1==formId?'select_nav':'')">上门服务</text>
             <checkbox value="1" :checked="form_check" class="cont_check"></checkbox>
            </label>
          </checkbox-group>
        </view>
      </view>
    </view><!--screen_one-->
    <view class="screen_one">
      <view class="screen_title">服务标签</view>
      <view class="screen_cont">
        <radio-group @change="checklabelChange">
          <block v-for="(item, index) in labelList" :key="index">
            <view class="cont_one">
              <label>
                <text class="cont_name" :class="{select_nav:item.checked}">{{item.levelname}}</text>
                <!-- <text :class="'cont_name ' + (item.checked==true?'select_nav':'')">{{item.levelname}}</text> -->
                <radio :value="item.id" :checked="item.checked" class="cont_check"></radio>
              </label>
            </view>
          </block>
        </radio-group>
      </view>
    </view><!--screen_one-->
    <view class="screen_one">
      <view class="screen_title">交易方式</view>
      <view class="screen_cont">
        <view class="cont_one">
          <checkbox-group @change="checkwayChange">
            <label>
             <text :class="'cont_name ' + (1==wayId?'select_nav':'')">线上交易</text>
             <checkbox value="1" :checked="way_check" class="cont_check"></checkbox>
            </label>
          </checkbox-group>
        </view>
      </view>
    </view><!--screen_one-->
    <view class="screen_one last_screen">
      <view class="screen_title">价格区间</view>
      <view class="screen_cont">
        <input class="first_input" type="number" placeholder="最低价" @input="lowestPrice" :value="starPrice"></input>
        <text class="screen_line"></text>
        <input class="first_input" type="number" placeholder="最高价" @input="highestPrice" :value="endPrice"></input>
      </view>
    </view><!--screen_one-->
  </scroll-view>
  <!--按钮-->
  <view class="screen_button">
    <view class="screen_empty" @tap="empty_button">清空选择</view>
    <view class="screen_confirm" @tap="confirm_button">确定</view>    
  </view>
</view>
</view>
</template>

<script>
var app = getApp();
var page = 1;
var cat_id = 0;
var load_more = 0;
var supp_id = 0;
var search_value = "";
var order_by = "createtime";
var diff = 0;
var merchgroup = '';
var merchtype = 0;
var merchlevel = '';
var merchpay = 0;
var merchstartprice = '';
var merchendprice = '';

export default {
  data() {
    return {
      load_footer: '正在加载...',
      searchplaceholder: '请输入商家名称',
      goods_lists: "",
      image_pruduct: "",
      title_pruduct: "",
      price_pruduct: "",
      id: 0,
      best_list: [],
      should: 0,
      load_more: 0,
      marketprice: 0,
      sales: 0,
      list_type: "createtime",
      giantView: 'false',
      formId: 0,
      search_value: "",
      inputVal: "",
      cat_id: "",
      hide_type: "",
      show_type: "",
      vateList: "",
      labelList: "",
      wayId: 0,
      form_check: false,
      way_check: false,
      starPrice: "",
      endPrice: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (query) {
    var that = this;

    if (query.keyword) {
      console.log('搜索跳转+++');
      search_value = query.keyword;
      console.log('search_value值', search_value);
      page = 1;
      that.setData({
        search_value: search_value,
        inputVal: search_value
      });
    } else {
      console.log('不搜索跳转+++');
      search_value = '';
      that.setData({
        search_value: search_value
      });
    }

    if (query.cat_id) {
      cat_id = query.cat_id;
    }

    if (query.order_by) {
      order_by = query.order_by;
    }

    that.load_goods_list();
    that.service_cate();
    that.service_label();
  },
  onUnload: function () {
    page = 1;
    cat_id = 0;
    supp_id = 0;
    search_value = 0;
  },
  //转发分享按钮
  onShareAppMessage: function () {
    return app.globalData.goShareApp('/pages/index');
  },
  methods: {
    onshow: function () {},
    //搜索
    searchText: function (e) {
      var that = this;
      that.setData({
        inputVal: e.detail.value
      });
      search_value = e.detail.value;
    },
    // 软键盘触发
    soft_trigger: function (e) {
      var that = this;
      var search_value = that.search_value;
      search_value = e.detail.value;
      page = 1;
      that.setData({
        search_value: search_value,
        inputVal: search_value
      });
      that.load_goods_list();
    },
    //手动触发
    hand_search: function (e) {
      var that = this;
      var hand_value = e.currentTarget.dataset.value;
      search_value = hand_value;
      that.setData({
        search_value: search_value
      });
      page = 1;
      that.load_goods_list();
    },
    tab_typelist: function (e) {
      var that = this;
      console.log('diff值', diff);
      order_by = e.currentTarget.dataset.type;
      console.log('order_by的值', order_by);

      if (e.currentTarget.dataset.type != 'id') {
        if (diff == 0) {
          console.log('0++++++');

          if (order_by == "sales") {
            this.setData({
              sales: 1
            });
          }

          if (order_by == "marketprice") {
            console.log('marketprice为1++++');
            this.setData({
              marketprice: 1
            });
          }

          diff = 1;
        } else {
          console.log('1++++++');

          if (order_by == "sales") {
            this.setData({
              sales: 0
            });
          }

          if (order_by == "marketprice") {
            console.log('marketprice为0++++');
            this.setData({
              marketprice: 0
            });
          }

          diff = 0;
        }

        page = 1;
        this.setData({
          list_type: order_by,
          search_value: ''
        });
        this.load_goods_list(diff);
      } else if (e.currentTarget.dataset.type == 'id') {
        if (this.giantView == "false") {
          that.setData({
            giantView: "true"
          });
        } else {
          that.setData({
            giantView: "false"
          });
        }
      }
    },

    /*商品列表信息*/
    load_goods_list: function (e) {
      var that = this;

      if (that.should == 1) {
        return;
      }

      that.should = 1;
      var search_value = that.search_value;
      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'goods',
          do: 'list',
          key: app.globalData.key,
          page: page,
          cat_id: cat_id,
          order_by: order_by,
          search_value: search_value,
          diff: e
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var list = that.best_list;
          console.log('商品列表', res.data.code);

          if (res.data.code == 1) {
            var pro_length = res.data.data.length;
            that.setData({
              best_list: res.data.data,
              cat_id: cat_id,
              hide_type: 'display:none',
              show_type: 'display:block'
            }); // that.data.should = 0;
          } else {
            that.setData({
              best_list: "",
              load_more: 1,
              hide_type: 'display:block',
              show_type: 'display:none'
            }); // that.data.should = 1;
          }

          setTimeout(function () {
            that.should = 0;
          }, 1000);
        }
      });
      page++;
      console.log('随后page的值', page);
    },
    // 加载更多列表信息
    more_goods_list: function () {
      var that = this;

      if (that.should == 1) {
        return;
      }

      that.should = 1;
      var search_value = that.search_value;
      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'goods',
          do: 'list',
          key: app.globalData.key,
          page: page,
          cat_id: cat_id,
          order_by: order_by,
          search_value: search_value,
          diff: diff
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var list = that.best_list;
          console.log('list++', list);

          if (res.data.code == 1) {
            var pro_length = res.data.data.length;

            for (var i = 0; i < pro_length; i++) {
              list.push(res.data.data[i]);
            }

            console.log('list--', list);
            that.setData({
              best_list: list,
              cat_id: cat_id
            });
          } else {
            that.setData({
              load_more: 1
            });
          }

          setTimeout(function () {
            that.should = 0;
          }, 1000);
        }
      });
      page++;
      console.log('随后page的值', page);
    },
    //筛选模块
    // 服务商
    service_cate: function () {
      var that = this;
      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'search',
          do: 'merchgroup',
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              vateList: res.data.data
            });
          }
        }
      });
    },
    //服务标签
    service_label: function () {
      var that = this;
      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'search',
          do: 'merchlevel',
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              labelList: res.data.data
            });
          }
        }
      });
    },
    // 服务商选择项
    checkprovidChange: function (e) {
      var that = this;
      var provid_value = e.detail.value;
      var vateList = that.vateList;

      for (var i = 0; i < vateList.length; i++) {
        if (vateList[i].id == provid_value) {
          vateList[i].checked = true;
        } else {
          vateList[i].checked = false;
        }
      }

      that.setData({
        vateList: vateList
      });
      merchgroup = provid_value;
      that.$forceUpdate()
    },
    //服务形式
    checkformChange: function (e) {
      var that = this;
      var form_value = e.detail.value;

      if (form_value == '') {
        that.setData({
          formId: 0
        });
        merchtype = 0;
      } else {
        that.setData({
          formId: 1
        });
        merchtype = 1;
      }
    },
    //服务标签
    checklabelChange: function (e) {
      var that = this;
      var label_value = e.detail.value;
      var labelList = that.labelList;

      for (var i = 0; i < labelList.length; i++) {
        if (labelList[i].id == label_value) {
          labelList[i].checked = true;
        } else {
          labelList[i].checked = false;
        }
      }

      that.setData({
        labelList: labelList
      });
      merchlevel = label_value;
      that.$forceUpdate()
    },
    //交易方式
    checkwayChange: function (e) {
      var that = this;
      var way_value = e.detail.value;

      if (way_value == 1) {
        that.setData({
          wayId: 1
        });
        merchpay = 1;
      } else {
        that.setData({
          wayId: 0
        });
        merchpay = 0;
      }
    },
    //价格区间
    lowestPrice: function (e) {
      var that = this;
      var lowest_value = e.detail.value;

      if (lowest_value < 0) {
        wx.showToast({
          title: '最低价不能小于0',
          icon: 'success',
          duration: 2000
        });
        return;
      }

      merchstartprice = lowest_value;
    },
    highestPrice: function (e) {
      var that = this;
      merchendprice = e.detail.value;
    },
    //筛选之后的商品列表
    screen_goods_list: function () {
      var that = this;

      if (that.should == 1) {
        return;
      }

      that.should == 1;
      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'goods',
          do: 'list',
          key: app.globalData.key,
          page: page,
          merch: 1,
          merchgroup: merchgroup,
          merchtype: merchtype,
          merchlevel: merchlevel,
          merchpay: merchpay,
          merchstartprice: merchstartprice,
          merchendprice: merchendprice
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var list = [];

          if (res.data.code == 1) {
            var pro_length = res.data.data.length;
            console.log('pro_length', pro_length);

            for (var i = 0; i < pro_length; i++) {
              list.push(res.data.data[i]);
            }

            that.setData({
              best_list: list,
              cat_id: cat_id,
              hide_type: 'display:none',
              show_type: 'display:block'
            });
          } else {
            that.setData({
              load_more: 1,
              hide_type: 'display:block',
              show_type: 'display:none'
            });
          }

          setTimeout(function () {
            that.should = 0;
          }, 1000);
        }
      });
      page++;
      console.log('随后page的值', page);
    },
    //确定按钮
    confirm_button: function () {
      var that = this;

      if (merchstartprice != '' && merchendprice != '') {
        if (merchstartprice > merchendprice) {
          wx.showToast({
            title: '最高价不能低于最低价',
            icon: 'success',
            duration: 2000
          });
          return;
        }
      }

      page = 1;
      that.screen_goods_list();
      that.setData({
        giantView: 'false'
      });
    },
    //清空按钮
    empty_button: function () {
      var that = this;
      merchgroup = '';
      merchtype = 0;
      merchlevel = '';
      merchpay = 0;
      merchstartprice = '';
      merchendprice = ''; //清空服务商

      var vateList = that.vateList;

      for (var i = 0; i < vateList.length; i++) {
        vateList[i].checked = false;
      } //清空服务标签


      var labelList = that.labelList;

      for (var i = 0; i < labelList.length; i++) {
        labelList[i].checked = false;
      }

      that.setData({
        vateList: vateList,
        labelList: labelList,
        form_check: false,
        formId: 0,
        way_check: false,
        wayId: '',
        starPrice: '',
        endPrice: ''
      });
    },
    // 模态框点击背景关闭
    screen_skip: function () {
      var that = this;
      that.setData({
        giantView: 'false'
      });
    },
    detail_skip: function (e) {
      var that = this;
      var good_id = e.currentTarget.dataset.id;
      uni.navigateTo({
        url: '/pages/goods/goods?goods_id=' + good_id
      });
    },
    gataBack: function () {
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>
<style>
@import "./category.css";
</style>