<template>
  <div>
    来了
    <view class="cart_null">
      <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="login_skip">去登录</button> -->
      <button @tap="register" class="login_skip">去注册</button>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    register: function() {
      const that = this;
      uni.navigateTo({
        url: "/pages/user/register/register",
      });
    },
  },
};
</script>

<style scoped lang="less">
.cart_null {
  padding-top: 32%;
  button.login_skip {
    display: block;
    width: 35%;
    height: 82rpx;
    line-height: 82rpx;
    color: #55bcc5;
    font-size: 30rpx;
    margin: 80rpx auto;
    border: 1px solid #55bcc5;
    border-radius: 45rpx;
    background: #fff;
  }
}
</style>
