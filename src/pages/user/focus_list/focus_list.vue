<template>
  <view class="body">
    <view class="tis" v-if="collect_goods == ''">
      <image src="http://wximage.shedongyun.com/sdo2o/collect_none.png"></image>
      <text class="font">暂无关注</text>
    </view>
    <view class="scroll_view" @scrolltolower="load_list">
      <view class="back_line"></view>
      <block
        v-for="(item, index) in collect_goods"
        :key="index"
        v-if="collect_goods != ''"
      >
        <!--一条-->
        <view class="outside_wrap">
          <view
            class="module_line"
            :style="item.txtStyle"
            @touchstart="touchS"
            @touchmove="touchM"
            @touchend="touchE"
            :data-index="index"
          >
            <navigator
              :url="'/pages/shop/shop_detail/shop_detail?id=' + item.id"
              hover-class="none"
            >
              <image :src="item.logo" class="prod_logo"></image>
            </navigator>
            <view class="module_main">
              <navigator
                :url="'/pages/shop/shop_detail/shop_detail?id=' + item.id"
                hover-class="none"
              >
                <view class="shop_title">{{ item.merchname }}</view>
                <view class="module_clock">
                  <image
                    src="http://wximage.shedongyun.com/sdo2o/clock_logo.png"
                    class="clock_logo"
                  ></image>
                  <text class="clock_name">{{ item.operation_times }}</text>
                </view>
                <view class="module_clock module_posit">
                  <image
                    src="http://wximage.shedongyun.com/sdo2o/addre_logo.png"
                    class="clock_logo"
                  ></image>
                  <text class="clock_addre">{{ item.address }}</text>
                  <text class="dist_addre">{{ item.distance }}km</text>
                  <image
                    src="http://wximage.shedongyun.com/sdo2o/right_logo.png"
                    class="right_logo"
                  ></image>
                </view>
              </navigator>
              <!--电话-->
              <image
                @tap="collphone"
                :data-tel="item.tel"
                src="http://wximage.shedongyun.com/sdo2o/phone_logo.png"
                class="phone_logo"
              ></image>
            </view> </view
          ><!--module_line-->
          <!--删除区-->
          <view
            class="line_del"
            :data-coll_id="item.id"
            :data-goods_id="item.goodsid"
            @tap="del_collection"
          >
            <text>取消关注</text>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
var app = getApp();
var pages = 0;
var load_more = 0;

export default {
  data() {
    return {
      tis: "",
      tisshow: "",
      collect_goods: [],
      load_footer: "正在加载更多...",
      load_style: "",
      copyright: app.globalData.copyright,
      editIndex: 0,
      delBtnWidth: 86,
      startX: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(query) {
    // 发送请求获取初始收藏列表
    if (query.pages) {
      pages = query.pages;
    } else {
      pages = 0;
    }

    this.load_list();
  },
  onUnload: function() {
    load_more = 0;
    pages = 0;
  },
  methods: {
    collphone: function(e) {
      console.log(e);
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.tel,
      });
    },
    load_list: function() {
      pages++;
      var that = this;
      var user_info = app.globalData.userInfo;
      console.log("userInfo", user_info);
      console.log("app.globalData.uid", app.globalData.uid);
      if (load_more != 0) {
        return 0;
      }
      wx.request({
        url: app.globalData.domain,
        data: {
          a: "follow",
          do: "list",
          lng: 116.98737,
          lat: 36.67789,
          uid: app.globalData.uid,
          key: app.globalData.key,
        },
        header: {
          "content-type": "application/json",
        },
        success: function(res) {
          console.log("res", res);
          if (res.data.code == 1) {
            that.setData({
              collect_goods: res.data.data,
            });
          } else {
            that.setData({
              collect_goods: [],
            });
          }
        },
      });
      // uni.getLocation({
      //   type: "gcj02",
      //   //返回可以用于wx.openLocation的经纬度
      //   success: function(res) {
      //     console.log("res", res);
      //     var latitude = res.latitude;
      //     var longitude = res.longitude;
      //     wx.request({
      //       url: app.globalData.domain,
      //       data: {
      //         a: "follow",
      //         do: "list",
      //         lng: 116.98737,
      //         lat: 36.67789,
      //         uid: app.globalData.uid,
      //         key: app.globalData.key,
      //       },
      //       header: {
      //         "content-type": "application/json",
      //       },
      //       success: function(res) {
      //         console.log("res", res);
      //         if (res.data.code == 1) {
      //           that.setData({
      //             collect_goods: res.data.data,
      //           });
      //         } else {
      //           that.setData({
      //             collect_goods: [],
      //           });
      //         }
      //       },
      //     });
      //   },
      // });
    },
    del_collection: function(e) {
      var that = this;
      console.log("删除++++++");
      var user_info = app.globalData.userInfo;

      if (e.currentTarget.dataset.coll_id) {
        // 发送请求删除该收藏
        wx.request({
          url: app.globalData.domain,
          data: {
            a: "follow",
            do: "cancel",
            uid: app.globalData.uid,
            merchid: e.currentTarget.dataset.coll_id,
            key: app.globalData.key,
          },
          header: {
            "content-type": "application/json",
          },
          success: function(res) {
            wx.showToast({
              title: res.data.msg,
              icon: "success",
              duration: 1500,
              success: function() {
                setTimeout(function() {
                  pages = 0;
                  that.load_list();
                }, 1000);
              },
            });
          },
        });
      }
    },
    cate_skip: function() {
      setTimeout(function() {
        wx.navigateTo({
          url: "/pages/gcates/gcates",
        });
      }, 1000);
    },
    // 左滑动事件
    touchS: function(e) {
      console.log("touchS" + e); //判断是否只有一个触摸点

      if (e.touches.length == 1) {
        this.setData({
          //记录触摸起始位置的X坐标
          startX: e.touches[0].clientX,
        });
      }
    },
    touchM: function(e) {
      console.log("touchM:" + e);
      var that = this;

      if (e.touches.length == 1) {
        //记录触摸点位置的X坐标
        var moveX = e.touches[0].clientX; //计算手指起始点的X坐标与当前触摸点的X坐标的差值

        var disX = that.startX - moveX; //delBtnWidth 为右侧按钮区域的宽度

        var delBtnWidth = that.delBtnWidth;
        var txtStyle = "";

        if (disX == 0 || disX < 0) {
          //如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:0px";
        } else if (disX > 0) {
          //移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";

          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "px";
          }
        } //获取手指触摸的是哪一个item

        var index = e.currentTarget.dataset.index;
        var list = that.collect_goods; //将拼接好的样式设置到当前item中

        list[index].txtStyle = txtStyle; //更新列表的状态

        this.setData({
          collect_goods: list,
        });
      }
    },
    touchE: function(e) {
      console.log("touchE" + e);
      var that = this;

      if (e.changedTouches.length == 1) {
        //手指移动结束后触摸点位置的X坐标
        var endX = e.changedTouches[0].clientX; //触摸开始与结束，手指移动的距离

        var disX = that.startX - endX;
        var delBtnWidth = that.delBtnWidth; //如果距离小于删除按钮的1/2，不显示删除按钮

        var txtStyle =
          disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px"; //获取手指触摸的是哪一项

        var index = e.currentTarget.dataset.index;
        var list = that.collect_goods;
        list[index].txtStyle = txtStyle; //更新列表的状态

        that.setData({
          collect_goods: list,
        });
      }
    },
  },
};
</script>
<style>
@import "./focus_list.css";
</style>
