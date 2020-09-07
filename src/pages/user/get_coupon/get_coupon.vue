<template>
  <!--获取优惠券-->
  <view class="coupon_wrap">
    <!--有数据-->
    <block v-for="(coupon, index) in coupon_list" :key="index">
      <view class="coupon_cont" v-if="coupon.bfb != 100">
        <!--一条开始-->
        <view class="coupon_line">
          <view class="round_top"></view>
          <view class="round_bottom"></view>
          <view class="card_back"></view>
          <view class="line_cont">
            <view class="line_cont_left">
              <view class="conpon_type">
                <text class="type" v-if="coupon.backtype == 0">优惠券</text>
                <text class="type" v-else-if="coupon.backtype == 1"
                  >折扣券</text
                >
                <text class="type_employ">({{ coupon.coupon_range }})</text>
              </view>
              <view class="cont_left_title">
                <text class="cont_price" v-if="coupon.backtype == 0"
                  ><text class="cont_symble">￥</text>{{ coupon.deduct }}</text
                >
                <text class="cont_price" v-else-if="coupon.backtype == 1"
                  >{{ coupon.discount
                  }}<text class="cont_symble">折</text></text
                >
                <text class="cont_use">满{{ coupon.enough }}元使用</text>
              </view>
              <text class="cont_time"
                >{{ coupon.timestart }}~{{ coupon.timeend }}</text
              >
            </view>
            <form :data-couponId="coupon.id" report-submit="true">
              <view class="line_cont_right">
                <view class="content">
                  <view class="conpon_bfb">
                    <text>已抢</text>
                    <text>{{ coupon.bfb }}%</text>
                  </view>
                  <image
                    v-if="coupon.bfb == 0"
                    class="coupon_img"
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/coupon_00.png"
                  ></image>
                  <image
                    v-if="coupon.bfb > 0 && coupon.bfb <= 13"
                    class="coupon_img"
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/coupon_01.png"
                  ></image>
                  <image
                    v-if="coupon.bfb > 13 && coupon.bfb <= 25"
                    class="coupon_img"
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/coupon_02.png"
                  ></image>
                  <image
                    v-if="coupon.bfb > 25 && coupon.bfb <= 50"
                    class="coupon_img"
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/coupon_03.png"
                  ></image>
                  <image
                    v-if="coupon.bfb > 50 && coupon.bfb <= 62"
                    class="coupon_img"
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/coupon_04.png"
                  ></image>
                  <image
                    v-if="coupon.bfb > 62 && coupon.bfb <= 75"
                    class="coupon_img"
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/coupon_05.png"
                  ></image>
                  <image
                    v-if="coupon.bfb > 75 && coupon.bfb <= 87"
                    class="coupon_img"
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/coupon_06.png"
                  ></image>
                  <image
                    v-if="coupon.bfb > 87"
                    class="coupon_img"
                    mode="widthFix"
                    src="http://wximage.shedongyun.com/sdo2o/coupon_07.png"
                  ></image>
                </view>
                <view class="coupon_button">
                  <text :data-id="coupon.id" @tap="receiveCoupon"
                    >立即领取</text
                  >
                </view>
              </view>
            </form> </view
          ><!--line_cont--> </view
        ><!--coupon_line-->
      </view>
      <view class="coupon_cont" v-else>
        <view class="coupon_line coupon_line_none">
          <view class="round_top"></view>
          <view class="round_bottom"></view>
          <view class="card_back"></view>
          <view class="line_cont">
            <view class="line_cont_left">
              <view class="conpon_type">
                <text class="type">{{ coupon.couponname }}</text>
              </view>
              <view class="cont_left_title">
                <text class="cont_price"
                  ><text class="cont_symble">￥</text>{{ coupon.deduct }}</text
                >
                <text class="cont_use">满{{ coupon.enough }}元使用</text>
              </view>
              <text class="cont_time"
                >{{ coupon.timestart }}~{{ coupon.timeend }}</text
              >
            </view>
            <form :data-couponId="coupon.id" report-submit="true">
              <view class="line_cont_right">
                <view class="content">
                  <view class="conpon_bfb">
                    <text>已抢光</text>
                  </view>
                  <canvas canvas-id="bgCanvasnone" class="canvasI"></canvas>
                </view>
                <view class="coupon_button">
                  <text>进场看看</text>
                </view>
              </view>
            </form> </view
          ><!--line_cont--> </view
        ><!--coupon_line-->
      </view>
    </block>
    <!--无数据-->
    <view v-if="code == 0" class="none_publish">
      <image src="http://wximage.shedongyun.com/sdo2o/search_none.png"></image>
      <text class="nomore">暂时还没有领取的优惠券哦</text>
    </view>
  </view>
</template>

<script>
var app = getApp();
let mytime = "";
let n = 0;
var uid;

export default {
  data() {
    return {
      imgUrl: app.globalData.domainImg,
      src: "",
      allSrc: "",
      code: "",
      coupon_list: "",
    };
  },

  components: {},
  props: {},
  onLoad: function(e) {},
  onReady: function() {
    let that = this;
    let allSrc = 0.96 * 150; //应该绘制的弧度

    let src = allSrc / 100; //计算出每个间隔应该绘制多少弧度。

    const ctx = wx.createCanvasContext("bgCanvas"); //创建一个全局的canvas绘图上下文

    const ctxnone = wx.createCanvasContext("bgCanvasnone"); //创建一个全局的canvas绘图上下文

    ctx.arc(30, 30, 26, 0.75 * Math.PI, 2.25 * Math.PI); //绘制圆形弧线

    ctx.setStrokeStyle("#55bcc5"); //设置填充线条颜色

    ctx.setLineWidth("5"); //设置线条宽度

    ctx.setLineCap("round"); //设置线条端点样式

    ctx.stroke(); //对路径进行描边，也就是绘制线条。

    ctx.draw(); //开始绘制

    ctxnone.arc(30, 30, 26, 0.75 * Math.PI, 2.25 * Math.PI); //绘制圆形弧线

    ctxnone.setStrokeStyle("#e6e6e6"); //设置填充线条颜色

    ctxnone.setLineWidth("5"); //设置线条宽度

    ctxnone.setLineCap("round"); //设置线条端点样式

    ctxnone.stroke(); //对路径进行描边，也就是绘制线条。

    ctxnone.draw(); //开始绘制

    that.setData({
      src: src,
      allSrc: allSrc,
    });
    that.run();
  },
  onShow: function() {
    var that = this;
    that.getCouponByStore();
    uid = app.globalData.uid;
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  methods: {
    run(e) {
      const ctx2 = wx.createCanvasContext("runCanvas");
      let that = this;
      let src = that.src; //每个间隔所需绘制的弧度

      let allSrc = that.allSrc; //总共需要绘制的弧度

      n++;

      if (src * n > allSrc) {
        clearInterval(mytime); //如果绘制完成，停掉计时器，绘制结束

        n = 0;
        return;
      }

      console.log(n);
      let grade = Math.round(((src * n) / 1.5) * 100); //百分数

      ctx2.arc(30, 30, 26, 0.75 * Math.PI, (0.75 + src * n) * Math.PI); //每个间隔绘制的弧度

      ctx2.setStrokeStyle("#fe5752");
      ctx2.setLineWidth("8");
      ctx2.setLineCap("round");
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.setFontSize(40); //注意不要加引号

      ctx2.setFillStyle("#84D944");
      ctx2.setTextAlign("center");
      ctx2.setTextBaseline("middle");
      ctx2.fillText(grade + "%", 100, 100);
      ctx2.draw();
    },

    canvasTap() {
      let that = this;
      clearInterval(mytime);
      mytime = setInterval(that.run, 50);
    },

    /*店铺可领取的优惠券*/
    getCouponByStore: function() {
      var that = this;
      wx.request({
        method: "get",
        url: app.globalData.domain,
        data: {
          a: "coupon",
          do: "couponlist",
          key: app.globalData.key,
          // uid: uid,
          uid: app.globalData.uid,
        },
        success: function(res) {
          console.log("优惠券123", res);
          //优惠券列表
          that.setData({
            code: res.data.code,
          });

          for (var m = 0; m < res.data.data.length; m++) {
            var bfb = Math.ceil(
              (res.data.data[m].receive / res.data.data[m].total) * 100
            );
            res.data.data[m].bfb = bfb;
          }

          if (res.data.code == 1) {
            console.log("nihao");
            //成功
            that.setData({
              coupon_list: res.data.data,
            });
          }
        },
      });
    },

    /*领取优惠券*/
    receiveCoupon: function(e) {
      var that = this;
      var couponId = e.currentTarget.dataset.id;
      /**从页面获取 */

      wx.request({
        method: "get",
        url: app.globalData.domain,
        data: {
          a: "coupon",
          do: "receive",
          uid: uid,
          coupon_id: couponId,
          key: app.globalData.key,
        },
        success: function(res) {
          var code = res.data.code;
          var message = res.data.message;

          if (code == 1) {
            //成功
            wx.showToast({
              title: "领取成功",
              icon: "success",
              duration: 1500,
              success: function() {
                // setTimeout(function () {
                //   wx.switchTab({
                //     url: '/pages/user/coupon/get_coupon/get_coupon'
                //   })
                // }, 1000);
              },
            });
          } else if (code == 2) {
            //未登录，转到登录页面
            wx.showToast({
              title: "已领取",
              icon: "success",
              duration: 1500,
            });
          }
        },
      });
    },
  },
};
</script>
<style>
@import "./get_coupon.css";
</style>
