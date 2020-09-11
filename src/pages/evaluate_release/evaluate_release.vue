<template>
<view class="body">
<form @submit="evaluat_publish">
<view class="line-back"></view>
<view class="remain_balance">
 <image :src="prodImage" class="prod_img"></image>
 <text class="publish_name">服务评价</text>
 <view class="publish_star">
   <block v-for="(item, index) in starList" :key="index">
     <image :src="item" @tap="starTap" :data-index="index" class="star_logo"></image>
   </block>
 </view>
</view>
<input name="starNumb" :value="indexNumber" hidden="true"></input>
<!--text-->
<view class="textarea_wrap">
  <textarea name="content" class="publish_text" placeholder="服务满足您的期待吗？写下来告诉我们吧"></textarea>
</view>
<!--图片上传-->
<view class="publish_image">
  <view class="publish_width">
    <block v-for="(item, index) in productInfo" :key="index">
      <view class="picture_one">
        <input name="upload_picture" :value="item.url" hidden="true"></input>
        <image :src="item.url" class="picture_show"></image>
        <image @tap="delete_img" :data-index="index" src="http://wximage.shedongyun.com/sdo2o/picture_shut.png" class="picture_shut"></image>
      </view>
    </block>
    <!--上传图片的按钮-->
    <view class="upload_button" @tap="chooseImage" v-if="productInfo.length<4">
      <image src="http://wximage.shedongyun.com/sdo2o/upload_publish.png" class="upload_logo"></image>
      <text class="upload_tips">选择图片</text>
    </view>
  </view>
</view>
<button form-type="submit" class="login_button" type="primary">发布</button>
</form>
</view>
</template>

<script>
var app = getApp();
var order_id;

export default {
  data() {
    return {
      productInfo: [],
      uploadImg: [],
      indexNumber: 0,
      starList: ['http://wximage.shedongyun.com/sdo2o/bigstar_before.png', 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png', 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png', 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png', 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png'],
      prodImage: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    order_id = options.order_id;
    that.prodShow();
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  methods: {
    //星级评价
    starTap: function (e) {
      var that = this;
      var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星

      var totalNumber = index + 1;
      var tempStarArr = that.starList; // 暂存星星数组

      var len = tempStarArr.length; // 获取星星数组的长度

      for (var i = 0; i < len; i++) {
        if (i <= index) {
          // 小于等于index的是满心
          tempStarArr[i] = 'http://wximage.shedongyun.com/sdo2o/bigstar_after.png';
        } else {
          // 其他是空心
          tempStarArr[i] = 'http://wximage.shedongyun.com/sdo2o/bigstar_before.png';
        }
      } // 重新赋值就可以显示了


      that.setData({
        starList: tempStarArr,
        indexNumber: totalNumber
      });
    },
    //选择图片
    chooseImage: function () {
      var that = this;
      wx.chooseImage({
        count: 4,
        sizeType: ['original', 'compressed'],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log('选择图片返回数据', res);
          var uploadImgCount = 0;
          var tempFilePaths = res.tempFilePaths;
          var productInfo = that.productInfo;
          var uploadImg = that.uploadImg;

          for (var i = 0; i < tempFilePaths.length; i++) {
            wx.uploadFile({
              url: app.globalData.domain + '&a=comment&do=upload_images&key=' + app.globalData.key,
              filePath: tempFilePaths[i],
              name: 'file',
              formData: {
                'imgIndex': i
              },
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                console.log('服务器返回数据+++', res);
                uploadImgCount++;
                console.log('uploadImgCount', uploadImgCount);
                var data = res.data; // 上传到页面

                productInfo.push({
                  "url": data
                }); // 上传到服务器

                uploadImg.push(data);
                console.log('productInfo', productInfo);
                console.log('uploadImg', uploadImg);
                that.setData({
                  productInfo: productInfo
                });
              }
            });
          }
        }
      });
    },
    //发布商品评价
    evaluat_publish: function (e) {
      var that = this;
      var user_info = app.globalData.userInfo;
      var starIndex = e.detail.value.starNumb;
      var content = e.detail.value.content;
      var arrImg = that.uploadImg;
      var strImg = arrImg.join();
      console.log('strImg', strImg);
      var upload_picture = strImg;
      console.log('starIndex', starIndex);

      if (starIndex <= 0) {
        wx.showToast({
          title: '请选择星级评价',
          duration: 1500
        });
        return;
      }

      if (content == '') {
        wx.showToast({
          title: '请填写服务内容',
          duration: 1500
        });
        return;
      }

      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'comment',
          do: 'send',
          key: app.globalData.key,
          uid: app.globalData.uid,
          orderid: order_id,
          //订单id
          level: starIndex,
          //星数
          content: content,
          //评论内容
          images: upload_picture //评论图片

        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('发布评价后返回的数据', res);

          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/evaluate_success/evaluate_success'
                  }, 5000);
                });
              }
            });
          } else {
            //  wx.navigateTo({
            //         url: '/pages/evaluate_success/evaluate_success'
            //       }, 5000);
          }
        }
      });
    },
    // 删除图片
    delete_img: function (e) {
      var that = this;
      var productInfo = that.productInfo;
      var uploadImg = that.uploadImg;
      var index = e.currentTarget.dataset.index;
      productInfo.splice(index, 1);
      uploadImg.splice(index, 1);
      that.setData({
        productInfo: productInfo
      });
    },
    //请求接口显示商品图片
    prodShow: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_o2o',
          a: 'comment',
          do: 'info',
          key: app.globalData.key,
          orderid: order_id //订单id

        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('发布评价后返回的数据', res);

          if (res.data.code == 1) {
            that.setData({
              prodImage: res.data.data.thumb
            });
          } else {}
        }
      });
    }
  }
};
</script>
<style>
@import "./evaluate_release.css";
</style>