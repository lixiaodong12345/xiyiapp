<template>
  <view>
    <view class="header">
      <view class="nav">
        <view class="section">
          <view class="section_left" @tap="searchCate">
            <text class="select_name">{{ tabSelectname }}</text>
            <image
              src="http://wximage.shedongyun.com/sdo2o/search_down.png"
              class="search_logo"
            ></image>
          </view>
          <text class="search_line"></text>
          <view class="section_right">
            <image
              src="http://wximage.shedongyun.com/sdo2o/input_clear.png"
              class="search_clear"
              @tap="clearInput"
            ></image>
            <input
              name="input"
              @input="focusPoint"
              @confirm="soft_trigger"
              v-model="input_value"
              confirm-type="search"
              :placeholder="searchplaceholder"
              type="text"
            />
          </view>
        </view>
        <button @tap.stop="search" class="cancel_search">搜索</button>
      </view>
    </view>

    <!--历史记录-->
    <view class="history_wrap" v-if="listarr.length != 0">
      <image
        src="http://wximage.shedongyun.com/sdo2o/hist_delete.png"
        @tap="delete_list"
        class="hist_delete"
      ></image>
      <view class="history_main" v-if="listarr != ''">
        <block v-for="(item, index) in listarr" :key="index">
          <text @tap="select_key" :data-name="item" v-if="item != ''">{{
            item
          }}</text>
        </block>
      </view>
    </view>

    <!--下拉框选择-->
    <view :class="'search_down_cont ' + (giantView == 'false' ? 'hide' : '')">
      <text class="trigon"></text>
      <view class="search_cont_font">
        <view @tap="tabSelect" data-select="pro">
          <image
            src="http://wximage.shedongyun.com/sdo2o/search_prod.png"
            class="search_icon"
          ></image>
          <text class="select_nav">服务</text>
        </view>
        <view @tap="tabSelect" data-select="store">
          <image
            src="http://wximage.shedongyun.com/sdo2o/search_mearch.png"
            class="search_mearch"
          ></image>
          <text class="select_nav">商家</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
var app = getApp();
var page = 1;
var search_value = "";
var select = "pro";

export default {
  data() {
    return {
      search_value: "",
      list: [],
      searchtype: 1,
      sum_goods: 0,
      sum_ht: 0,
      ab2border: "b2border",
      bb2border: "",
      searchplaceholder: "请输入搜索名称",
      giantView: "false",
      tabSelectname: "服务",
      inputVal: "",
      input_value: "",
      listarr: [], //创建数组
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
  },
  onShow: function() {
    var that = this; //读取缓存历史搜索记录

    wx.getStorage({
      key: "list_arr",
      success: function(res) {
        console.log("搜索记录", res.data);
        that.setData({
          listarr: res.data,
        });
      },
    });
  },
  methods: {
    // 获取焦点——取值
    focusPoint: function(e) {
      var that = this;
      that.inputVal = e.detail.value;
    },
    //搜索方法——手动搜索
    search: function(e) {
      var that = this;
      let arr = this.listarr;
      var keyword = this.inputVal; //跳转链接时传值

      var selectType = select; // 搜索跳转**************

      if (selectType == "pro") {
        //服务
        uni.navigateTo({
          url: "/pages/category/category?keyword=" + keyword,
        });
      } else if (selectType == "store") {
        //商家
        uni.navigateTo({
          url: "/pages/merchant_list/merchant_list?search_value=" + keyword,
        });
      } //搜索存储********

      if (this.inputVal != "") {
        //判断取值是手动输入还是点击赋值
        if (this.input_value == "") {
          // 判断数组中是否已存在
          let arrnum = arr.indexOf(this.inputVal);
          console.log("匹配相同值", arrnum);

          if (arrnum != -1) {
            // 删除已存在后重新插入至数组
            arr.splice(arrnum, 1);
            arr.unshift(this.inputVal);
          } else {
            arr.unshift(this.inputVal);
          }
        } else {
          let arr_num = arr.indexOf(this.input_value);
          console.log(arr.indexOf(this.input_value));

          if (arr_num != -1) {
            arr.splice(arr_num, 1);
            arr.unshift(this.input_value);
          } else {
            arr.unshift(this.input_value);
          }
        }
      } //存储搜索记录

      wx.setStorage({
        key: "list_arr",
        data: arr,
      }); //取出搜索记录

      wx.getStorage({
        key: "list_arr",
        success: function(res) {
          that.setData({
            listarr: res.data,
          });
        },
      }); //清空input的值

      this.setData({
        input_value: "",
      });
    },
    //软键盘搜索
    soft_trigger: function(e) {
      var that = this;
      let arr = this.listarr;
      var keyword = e.detail.value;
      var selectType = select; //搜索跳转*************************

      if (selectType == "pro") {
        //服务
        uni.navigateTo({
          url: "/pages/category/category?keyword=" + keyword,
        });
      } else if (selectType == "store") {
        //商家
        uni.navigateTo({
          url: "/pages/merchant_list/merchant_list?search_value=" + keyword,
        });
      } //搜索存储*******************

      if (keyword != "") {
        //判断取值是手动输入还是点击赋值
        if (this.input_value == "") {
          // 判断数组中是否已存在
          let arrnum = arr.indexOf(keyword);
          console.log("匹配相同值", arrnum);

          if (arrnum != -1) {
            // 删除已存在后重新插入至数组
            arr.splice(arrnum, 1);
            arr.unshift(keyword);
          } else {
            arr.unshift(keyword);
          }
        } else {
          let arr_num = arr.indexOf(this.input_value);
          console.log(arr.indexOf(this.input_value));

          if (arr_num != -1) {
            arr.splice(arr_num, 1);
            arr.unshift(this.input_value);
          } else {
            arr.unshift(this.input_value);
          }
        }
      } //存储搜索记录

      wx.setStorage({
        key: "list_arr",
        data: arr,
      }); //取出搜索记录

      wx.getStorage({
        key: "list_arr",
        success: function(res) {
          that.setData({
            listarr: res.data,
          });
        },
      }); //清空input的值

      this.setData({
        input_value: "",
      });
    },
    // 选择历史关键词搜索
    select_key: function(e) {
      var that = this;
      var keyValue = e.currentTarget.dataset.name;
      that.setData({
        input_value: keyValue,
        inputVal: keyValue,
      });
    },
    //清除搜索记录
    delete_list: function() {
      //清除当前数据
      this.setData({
        listarr: [],
      }); //清除缓存数据

      wx.removeStorage({
        key: "list_arr",
      });
    },
    // 下拉框选择
    searchCate: function() {
      var that = this;

      if (this.giantView == "false") {
        that.setData({
          giantView: "true",
        });
      } else {
        that.setData({
          giantView: "false",
        });
      }
    },
    tabSelect: function(e) {
      var that = this;
      var tabSelectname;
      select = e.currentTarget.dataset.select;

      if (select == "pro") {
        tabSelectname = "服务";
      } else {
        tabSelectname = "商家";
      }

      that.setData({
        giantView: "false",
        tabSelectname: tabSelectname,
      });
    },
    // 清除搜索输入框
    clearInput: function(e) {
      var that = this;
      console.log("你点击了");
      that.input_value = "";
    },
  },
};
</script>
<style>
@import "./search.css";
</style>
