<template>
  <view class="contain_wrap">
    <image
      mode="widthFix"
      src="http://wximage.shedongyun.com/sdo2o/enter_Fail.png"
      class="enter_success"
    ></image>
    <view class="enter_name">您的入驻申请失败</view>
    <view class="enter_skip" @tap="again_apply">再次申请</view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},
  props: {},
  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  methods: {
    again_apply: function() {
      uni.navigateTo({
        url: "/pages/user/store_mall/store_mall",
      });
    },
  },
};
</script>
<style>
@import "./enter_fail.css";
</style>
