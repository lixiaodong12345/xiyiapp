<script>
export default {
  onLaunch: function(options) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    // console.log("options", options.query.from_share_uid);
    var from_share_uid = options.query.from_share_uid;
    // console.log("from_share_uid", from_share_uid);

    if (options.query.from_share_uid) {
      // console.log("1111");
      this.globalData.from_share_uid = options.query.from_share_uid;
      // console.log("from_share_uid+111", from_share_uid);
    } else {
      // console.log("2222");
      this.globalData.from_share_uid = 0;
      // console.log("from_share_uid+222", from_share_uid);
    }
  },
  //定义全局数据
  globalData: {
    userInfo: "",
    post_img_list: [],
    menucid: "",
    openid: "",
    uid: "",
    textare_value: "",
    title_value: "",
    bar_title: "",
    // domain: 'https://wsxy.sns318.net/merchant/index.php?c=ewei_o2o',
    // domain: 'http://wsxy318.com/merchant/index.php?c=ewei_o2o',
    //线上地址
    // domain: "https://www.wsxypt.cn/merchant/index.php?c=ewei_o2o",
    //测试地址
    domain: "http://wsxy.sns318.net/merchant/index.php?c=ewei_o2o",
    key: "46",
    // key: '1',
    from_share_uid: 0,
    copyright: "技术支持：社动电商",
    currLatitude: "",
    currLongitude: "",
    currLocate: "",
    switch_type: 0,
    bar_title: "",
    integral: "",
    //获取当前登录微信用户信息
    getUserInfo: function() {
      // wx.removeStorageSync({
      //   key: 'userInfo',
      // });
      var userInfo = this.userInfo;
      return userInfo;
      // console.log("app的userInfo", userInfo);
    },
    // 分享备份
    goShareApp: function(page_link) {
      var path = "/pages/index";

      if (page_link) {
        path = page_link;
      }

      var user_info = this.getUserInfo();
      // console.log("分享user_info", user_info);
      path += "?from_share_uid=" + user_info.id;
      return {
        title: "",
        path: path,
        success: function(res) {},
        fail: function(res) {},
      };
    },
    //当前位置改变函数
    getLocate: function() {
      var that = this;
      that.currLatitude = wx.getStorageSync("theLatitude");
      that.currLongitude = wx.getStorageSync("theLongitude");
      // console.log("app+currLatitude", that.currLatitude);
      // console.log("app+currLongitude", that.currLongitude);
    },
    getCity: function() {
      var that = this;
      that.currLocate = wx.getStorageSync("currLocate");
    },
  },
  onShow: function() {
    // 页面显示
    // this.getUserInfo();
  },
  methods: {},
};
</script>
<style>
@import "./app.css";
</style>
