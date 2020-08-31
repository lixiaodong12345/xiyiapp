<template>
  <view>
    <view class="container_wrap">
      <!--日期和分类-->
      <view class="select_option">
        <view class="select_one" @tap="startshow">
          <text class="select_name">{{ yearShow }}年{{ monthShow }}月</text>
          <image
            mode="widthFix"
            src="http://wximage.shedongyun.com/sdo2o/detail_down.png"
            class="select_down"
          ></image>
        </view>
        <view class="select_one select_margin" @tap="searchCate">
          <text class="select_name">{{ tabSelectname }}</text>
          <image
            mode="widthFix"
            src="http://wximage.shedongyun.com/sdo2o/detail_down.png"
            class="select_down"
          ></image>
        </view>
      </view>
      <!--分类下拉框选择-->
      <view :class="'search_down_cont ' + (giantView == 'false' ? 'hide' : '')">
        <text class="trigon"></text>
        <view class="search_cont_font">
          <view @tap="tabSelect" data-select="pro">
            <image
              src="http://wximage.shedongyun.com/sdo2o/search_prod.png"
              class="search_icon"
            ></image>
            <text class="select_nav">消费</text>
          </view>
          <view @tap="tabSelect" data-select="store">
            <image
              src="http://wximage.shedongyun.com/sdo2o/search_mearch.png"
              class="search_mearch"
            ></image>
            <text class="select_nav">充值</text>
          </view>
        </view>
      </view>

      <!--明细-->
      <!--有数据-->
      <!--一个年明细-->
      <view :style="expense_show">
        <block v-for="(item, index) in expenseList" :key="index">
          <view class="particul_year">
            <text class="year_name" v-if="index == 0">当月</text>
            <text class="year_name" v-else>{{ index }}月</text>
            <view class="particul_main">
              <!--一条消费-->
              <block v-for="(oneItem, index2) in item" :key="index2">
                <view class="particul_line" v-if="oneItem.status == 1">
                  <image
                    src="http://wximage.shedongyun.com/sdo2o/exp_out.png"
                    class="particul_logo"
                  ></image>
                  <view class="particul_inform">
                    <view class="inform_title">{{ oneItem.title }}</view>
                    <text class="inform_use">[商城消费]</text>
                    <view class="inform_time">{{ oneItem.createtime }}</view>
                    <view class="inform_money">-{{ oneItem.price }}</view>
                  </view> </view
                ><!--particul_line-->
                <view class="particul_line" v-else-if="oneItem.status == 2">
                  <image
                    src="http://wximage.shedongyun.com/sdo2o/exp_into.png"
                    class="particul_logo"
                  ></image>
                  <view class="particul_inform">
                    <view class="inform_title">{{ oneItem.title }}</view>
                    <text class="inform_use">[充值]</text>
                    <view class="inform_time">{{ oneItem.createtime }}</view>
                    <view class="inform_money red_color"
                      >+{{ oneItem.price }}</view
                    >
                  </view> </view
                ><!--particul_line-->
              </block>
            </view> </view
          ><!--particul_year-->
        </block>
      </view>
      <!--无数据-->
      <view class="none_oder_stati" :style="expense_hide">
        <image src="http://wximage.shedongyun.com/sdo2o/none_goods.png"></image>
        <text>当前时间段没有消费明细哦~</text>
      </view>
    </view>
    <!--日期选择-->
    <view class="starttime" :style="startpop">
      <view class="time_box">
        <picker-view
          indicator-style="height: 50px;"
          class="select_wrap"
          :value="value"
          @change="startChange"
        >
          <picker-view-column>
            <view
              v-for="(item, index) in years"
              :key="index"
              class="select_line"
              >{{ item }}年</view
            >
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item, index) in months"
              :key="index"
              class="select_line"
              >{{ item }}月</view
            >
          </picker-view-column>
        </picker-view>
      </view>
      <view class="timebutton">
        <view @tap="starthide" class="timebutton_one">取消</view>
        <view @tap="confirmhide" class="timebutton_confirm">确定</view>
      </view>
    </view>
  </view>
</template>

<script>
var app = getApp();
const date = new Date();
const years = [];
const months = [];
var expense_type = "";
var expense_time = "";
var data_type = 0;

export default {
  data() {
    return {
      giantView: "false",
      tabSelectname: "分类",
      startpop: "display:none",
      years: years,
      months: months,
      yearShow: date.getFullYear(),
      monthShow: date.getMonth() + 1,
      value: [9999, 0],
      expense_show: "display:block",
      expense_hide: "display:none",
      firstYear: "",
      firstMonth: "",
      yearSelect: "",
      monthSelect: "",
      expenseList: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    var that = this;
    that.expense_list();
  },
  onShow: function() {
    var that = this;
  },
  methods: {
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
      var tabSelectname = that.tabSelectname;
      var select = e.currentTarget.dataset.select;

      if (select == "pro") {
        tabSelectname = "消费";
        expense_type = 1;
        expense_time = "";
        that.expense_list();
      } else {
        tabSelectname = "充值";
        expense_type = 2;
        expense_time = "";
        that.expense_list();
      }

      console.log("tabSelectname", tabSelectname);
      that.setData({
        giantView: "false",
        tabSelectname: tabSelectname,
      });
    },
    //日期选择
    startshow: function(e) {
      var that = this;
      var lengths = that.years.length;
      data_type = 0;
      this.setData({
        startpop: "display:block",
        firstYear: that.years[lengths - 1],
        firstMonth: that.months[0],
      });
    },
    starthide: function(e) {
      var that = this;
      this.setData({
        startpop: "display:none",
        yearShow: that.yearSelect,
        monthShow: that.monthSelect,
      });
    },
    confirmhide: function(e) {
      var that = this;

      if (data_type == 0) {
        this.setData({
          startpop: "display:none",
          yearShow: that.firstYear,
          monthShow: that.firstMonth,
        });
        expense_time = that.firstYear + "," + that.firstMonth;
        expense_type = "";
      } else {
        this.setData({
          startpop: "display:none",
          yearShow: that.yearSelect,
          monthShow: that.monthSelect,
        });
        expense_time = that.yearSelect + "," + that.monthSelect;
        expense_type = "";
      }

      this.expense_list();
    },
    //日期选项选择
    startChange: function(e) {
      data_type = 1;
      const val = e.detail.value;
      console.log("日期选择", this.months[val[1]]);
      this.setData({
        yearSelect: this.years[val[0]],
        monthSelect: this.months[val[1]],
      });
    },
    //消费数据列表
    expense_list: function() {
      var that = this;
      var uid = app.globalData.uid;
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "consumption",
          do: "detail",
          key: app.globalData.key,
          uid: uid,
          distinct: expense_type,
          time: expense_time,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              expenseList: res.data.data,
              expense_show: "display:block",
              expense_hide: "display:none",
            });
          } else {
            that.setData({
              expense_show: "display:none",
              expense_hide: "display:block",
            });
          }
        },
      });
    },
  },
};
</script>
<style>
@import "./expense_detail.css";
</style>
