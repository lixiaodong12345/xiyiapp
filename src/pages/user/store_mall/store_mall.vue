<template>
<view>
<!--<import src="../../../wxParse/wxParse.wxml"></import>-->
<form @submit="send_info">
  <!--申请状态-->
  <view class="apply_states" :style="state_show">
    <image src="http://wximage.shedongyun.com/sdo2o/point_tip.png" class="point_tip"></image>
    <text class="point_name">申请中</text>
  </view>
  <view class="wrapper">
    <!--广告位-->
    <view class="advert_show">
      <image src="http://wximage.shedongyun.com/sdo2o/shoadd.png" class="advert_img"></image>
    </view> 
    <view class="store_title">
      <text>商户信息</text>
    </view>
    <view class="user_infomation">
      <view class="info_cont">
        <view class="cont">
          <view class="left_cont">
            <text class="left_title">商户名称</text>
          </view>
          <view class="right_cont">
            <input @input="buttonClo" type="text" name="ShopName" :value="ShopName" class="right_cont_title" placeholder="请填写您的商户名称"></input>
          </view>
        </view>
      </view>
      <view class="info_cont">
        <view class="cont">
          <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/botto.png" class="botto_ico"></image>
          <view class="left_cont">
            <text class="left_title">合作类型</text>
          </view>
          <view class="right_cont">
            <input @tap="typeshow" disabled type="text" name="ShopType" :value="ShopType" class="right_cont_title" placeholder="请选择店铺类型"></input>
          </view>
        </view>
      </view>
      <view class="info_cont">
        <view class="cont">
          <view class="left_cont">
            <text class="left_title">开业时间</text>
          </view>
          <view class="right_cont">
            <input @input="buttonClo" type="text" name="ShopBorn" :value="ShopBorn" class="right_cont_title" placeholder="请填写开业时间，例如2019-02-08"></input>
          </view>
        </view>
      </view>
      <view class="info_cont">
        <view class="cont">
          <view class="left_cont">
            <text class="left_title">营业时间</text>
          </view>
          <view class="right_cont">
            <input @input="buttonClo" style="display:none" name="StartTime" :value="starthour+':'+startminute" class="right_cont_title"></input>
            <input @input="buttonClo" style="display:none" name="EndTime" :value="endhour+':'+endminute" class="right_cont_title"></input>
            <view @tap="startshow" style="float:left;text-align:left;line-height:52rpx;">{{starthour}}:{{startminute}}</view>
            <view style="width:20%;float:left;text-align:center;line-height:52rpx;" class>--</view>
            <view @tap="endshow" style="float:left;text-align:right;line-height:52rpx;">{{endhour}}:{{endminute}}</view>
          </view>
        </view>
      </view>
      <view class="info_cont">
        <view class="cont">
          <view class="left_cont">
            <text class="left_title">经营面积</text>
          </view>
          <view class="right_cont">
            <input @input="buttonClo" type="text" name="ShopArea" :value="ShopArea" class="right_cont_title" placeholder="请输入经营面积"></input>
          </view>
        </view>
      </view>
      <view class="info_cont">
        <view class="cont">
          <view class="left_cont">
            <text class="left_title">联系人</text>
          </view>
          <view class="right_cont">
            <input @input="buttonClo" type="text" name="ShopPerson" :value="ShopPerson" class="right_cont_title" placeholder="请输入联系人"></input>
          </view>
        </view>
      </view>
      <view class="info_cont">
        <view class="cont">
          <view class="left_cont">
            <text class="left_title">联系电话</text>
          </view>
          <view class="right_cont">
            <input @input="buttonClo" type="text" name="ShopPhone" :value="ShopPhone" class="right_cont_title" placeholder="请输入联系电话"></input>
          </view>
        </view>
      </view>
      <view class="info_cont">
        <view class="cont">
          <image mode="widthFix" src="http://wximage.shedongyun.com/sdo2o/botto.png" class="botto_ico"></image>
          <view class="left_cont">
            <text class="left_title">选择城市</text>
          </view>
          <view class="right_cont">
            <input @input="buttonClo" style="display:none" type="text" name="ShopCity" :value="area" class="right_cont_title" placeholder="请选择经营城市"></input>
            <view @tap="areashow" style="float:left;text-align:center;line-height:52rpx;margin-right:20rpx;">{{province}}</view>
            <view @tap="areashow" style="float:left;text-align:center;line-height:52rpx;margin-right:20rpx;">{{city}}</view>
            <view @tap="areashow" style="float:left;text-align:center;line-height:52rpx;margin-right:20rpx;">{{area}}</view>
          </view>
        </view>
      </view>
      <view class="info_cont">
        <view class="cont">
          <view class="left_cont">
            <text class="left_title">地址信息</text>
          </view>
          <view class="right_cont">
            <input @input="buttonClo" type="text" name="ShopAddress" :value="ShopAddress" class="right_cont_title" placeholder="请输入地址信息"></input>
          </view>
        </view>
      </view>
    </view>
     <view class="store_title">
      <text>企业信息</text>
    </view>
    <view class="user_infomation">
      
      <view class="info_cont">
        <view class="cont">
          <view class="left_cont">
            <text class="left_title">上传证件照片（请上传营业执照、门头照片及门店内景照片</text>
          </view>
          <view class="up_imagebox">
            <view class="up_imageboxli">
              <view class="up_imageboxli_imgbox">
                <image id="ShopPtOne" @tap="upImage" :src="img01"></image>
              </view>
              <text>营业执照</text>
            </view> 
            <view class="up_imageboxli">
              <view class="up_imageboxli_imgboxs">
                <image id="ShopPtTwo" @tap="upImage" :src="img02"></image>
              </view>
              <text>门头照片</text>
            </view>

            <view class="up_imageboxli">
              <view class="up_imageboxli_imgbox">
                <image id="ShopPtThrree" @tap="upImage" :src="img03"></image>
              </view>
              <text>内景照片</text>
            </view> 
            <view class="up_imageboxli">
              <view class="up_imageboxli_imgboxs">
                <image id="ShopPtfour" @tap="upImage" :src="img04"></image>
              </view>
              <text>内景照片</text>
            </view>
          </view>
        </view>
      </view>
      <view class="promit_bottom">
        <text class="promitleft">!</text><text class="promit">注：请正确填写基础信息及营业执照照片等信息。（营业执照需为彩色扫描件，保证信息清晰。）</text>
      </view>
    </view>
    <!--协议-->
    <view class="radio_width">
        <view class="cont">
          <view class="radio_wrap">
            <radio-group class="radio-group" @change="selectChange">
              <input name="liab_check" :value="check_value" hidden="true" />
              <label class="radio_cont">
                <image :src="read_empty" class="exemp" :style="original" /> 
                <image :src="read_select" class="exemp" :style="original_select"></image> 
                <radio value="1" hidden="true"></radio>
              </label>
            </radio-group>
          </view> 
          <text class="liab_title">{{disclaimer_title}}</text>
          <text class="liab_name" @tap="statement_skip">《{{applytitle}}》</text>
        </view>
    </view><!--协议--> 
  
    <view class="submit">
      <button v-if="status==0" class="trues" disabled="true" style="background:#55bcc5;color:#fff;">审核中</button>
      <button v-else formType="submit" class="true" type="submit">提交申请</button>
    </view>
  </view>
</form>
<!--协议弹框-->
<view class="agree_mark" :style="mark_state">
  <view class="agree_cont">
    <view class="agree_title">{{applytitle}}</view>
    <view class="agree_height">
      <scroll-view class="scroll_main" scroll-y="true">
      <view class="agree_main">
        <jyf-parser :html="article_agreeContent"></jyf-parser>
      </view>
      </scroll-view>
    </view>
    <text class="agree_button" @tap="statement_shut">确定</text>
  </view>
</view>
<!--开始时间-->
<view class="starttime" :style="startpop">
  <view class="time_box">
    <picker-view indicator-style="height: 50px;" style="width: 100%; height: 100%; font-size:30rpx;" :value="value" @change="startChange">
      <picker-view-column>
        <view v-for="(item, index) in hours" :key="index" style="line-height: 50px;text-align:center">{{item}}时</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in minutes" :key="index" style="line-height: 50px;text-align:center">{{item}}分</view>
      </picker-view-column>
    </picker-view>
  </view>
  <view @tap="starthide" class="timebutton">确定</view>
</view>
<!--结束时间  -->
<view class="starttime" :style="endpop">
  <view class="time_box">
    <picker-view indicator-style="height: 50px;" style="width: 100%; height: 100%; font-size:30rpx;" :value="value" @change="endChange">
      <picker-view-column>
        <view v-for="(item, index) in hours" :key="index" style="line-height: 50px;text-align:center">{{item}}时</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in minutes" :key="index" style="line-height: 50px;text-align:center">{{item}}分</view>
      </picker-view-column>
    </picker-view>
  </view>
  <view @tap="endhide" class="timebutton">确定</view>
</view>

<!--选择类型 -->
<view class="starttime" :style="typepop">
  <view class="time_box">
    <picker-view indicator-style="height: 50px;" style="width: 100%; height: 100%; font-size:30rpx;" :value="value" @change="typeChange">
      <picker-view-column>
        <view v-for="(item, index) in types" :key="index" style="line-height: 50px;text-align:center">{{item.catename}}</view>
      </picker-view-column>
    </picker-view>
  </view>
  <view @tap="typehide" class="timebutton">确定</view>
</view>

<!--选择城市  -->
<view class="starttime" :style="areapop">
  <view class="time_box">
    <picker-view indicator-style="height: 30px;" style="width: 100%; height: 100%; font-size:30rpx;" :value="value" @change="areaChange">
      <picker-view-column>
        <view v-for="(item, index) in provinces" :key="index" style="line-height: 30px;text-align:center">{{item}}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in citys" :key="index" style="line-height: 30px;text-align:center">{{item}}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item, index) in areas" :key="index" style="line-height: 30px;text-align:center">{{item}}</view>
      </picker-view-column>
    </picker-view>
  </view>
  <view @tap="areahide" class="timebutton">确定</view>
</view>
</view>
</template>

<script>
import parser from "@/component/jyf-parser/jyf-parser";
var app = getApp();
var merchname = "";
var salecate = "";
var desc = "";
var realname = "";
var mobile = "";
var card_front = "";
var card_behind = "";
var card_number = "";
var ShopName = "";
var ShopType = "";
var ShopBorn = "";
var StartTime = "";
var EndTime = "";
var ShopArea = "";
var ShopPerson = "";
var ShopPhone = "";
var ShopCity = "";
var ShopAddress = "";
var prov_id = 0;
var city_id = 0;
var hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
var minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"];
var cate_type;
var state;

export default {
  data() {
    return {
      areapop: "display:NONE",
      typepop: "display:NONE",
      startpop: "display:none",
      endpop: "display:none",
      hours: hours,
      minutes: minutes,
      province: "选择省",
      city: "选择城市",
      area: "选择区域",
      starthour: "01",
      startminute: "00",
      endhour: "01",
      endminute: "00",
      ShopPtfour: "",
      ShopPtOne: "",
      ShopPtTwo: "",
      ShopPtThrree: "",
      img01: "/static/static/images/sfz01.png",
      img02: "/static/static/images/sfz.png",
      img03: "/static/static/images/sfz.png",
      img04: "/static/static/images/sfz.png",
      ShopName: "",
      ShopType: "",
      ShopBorn: "",
      StartTime: "",
      EndTime: "",
      ShopArea: "",
      ShopPerson: "",
      ShopPhone: "",
      ShopCity: "",
      ShopAddress: "",
      status: 2,
      button_coloe: "false",
      read_empty: "/static/static/images/read_empty.png",
      read_select: "/static/static/images/read_select.png",
      disclaimer_title: '我已阅读并同意',
      mark_state: 'display:none',
      original: 'display:block',
      original_select: 'display:none',
      check_value: '',
      cate_type: 0,
      state_show: 'display:none',
      uid: app.globalData.uid,
      provinces: "",
      value:'',
      citys: "",
      areas: "",
      types: "",
      open_protocol: "",
      applytitle: "",
      article_agreeContent: ""
    };
  },

  components: {
    "jyf-parser": parser,
  },
  props: {},
  onLoad: function (options) {
    var that = this;
    var uid = app.globalData.uid
    that.setData({
      uid: uid
    });
    that.province_list();
    that.city_list();
    that.area_list();
    that.cate_list();
    that.cate_inform();

    if (options.state == 'wait') {
      that.merch_states();
      that.setData({
        state_show: 'display:block',
        status: 0
      });
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  methods: {
    /**
     * @params buttonClo 输入框输入事件
     */
    buttonClo:function(e){
      
    },
    startshow: function (e) {
      this.setData({
        startpop: "display:block"
      });
    },
    starthide: function (e) {
      this.setData({
        startpop: "display:none"
      });
    },
    endshow: function (e) {
      this.setData({
        endpop: "display:block"
      });
    },
    endhide: function (e) {
      this.setData({
        endpop: "display:none"
      });
    },
    typeshow: function (e) {
      var that = this;
      this.setData({
        typepop: "display:block"
      });
    },
    typehide: function (e) {
      var that = this;
      var cate_type = that.cate_type;

      if (cate_type == 0) {
        var typeList = that.types;
        that.setData({
          ShopType: typeList[0].catename
        });
      }

      this.setData({
        typepop: "display:none"
      });
    },
    areashow: function (e) {
      this.setData({
        areapop: "display:block"
      });
    },
    areahide: function (e) {
      this.setData({
        areapop: "display:none"
      });
    },
    startChange: function (e) {
      const val = e.detail.value;
      this.setData({
        starthour: this.hours[val[0]],
        startminute: this.minutes[val[1]]
      });
    },
    endChange: function (e) {
      const val = e.detail.value;
      this.setData({
        endhour: this.hours[val[0]],
        endminute: this.minutes[val[1]]
      });
    },
    typeChange: function (e) {
      const val = e.detail.value;
      this.setData({
        ShopType: this.types[val[0]].catename,
        cate_type: 1
      });
    },
    areaChange: function (e) {
      var that = this;
      const val = e.detail.value;
      prov_id = val[0];
      city_id = val[1];
      that.city_list();
      that.area_list();
      this.setData({
        province: this.provinces[val[0]],
        city: this.citys[val[1]],
        area: this.areas[val[2]]
      });
    },
    upImage: function (e) {
      var name = e.target.id;
      var that = this;
      wx.chooseImage({
        count: 1,
        // 默认9
        sizeType: ['original', 'compressed'],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log('res',res)
          var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            // url: app.globalData.domain,
            // url:'http://wsxy.sns318.net/merchant/index.php?c=ewei_o2o',
            url:'https://wsxy.sns318.net/merchant/index.php?c=ewei_o2o',
            name: 'file',
            filePath: tempFilePaths[0],
		        formData: {
			'a': 'file',
			'c': 'ewei_o2o',
      'key': app.globalData.key,
      'do':'uploadImage',
        // 'file':
		    },
            
            header: {
              // "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              console.log('res',res)
              var data = JSON.parse(res.data);
              if (name == "ShopPtOne") {
                card_behind = data.data;
                that.setData({
                  img01: data.data,
                  ShopPtOne: data.data
                });
              } else if (name == "ShopPtTwo") {
                card_front = data.data;
                that.setData({
                  img02: data.data,
                  ShopPtTwo: data.data
                });
              } else if (name == "ShopPtThrree") {
                card_front = data.data;
                that.setData({
                  img03: data.data,
                  ShopPtThrree: data.data
                });
              } else if (name == "ShopPtfour") {
                card_front = data.data;
                that.setData({
                  img04: data.data,
                  ShopPtfour: data.data
                });
              }
            },
            fail: function (res) {
              console.log('res',res)
            }
          });
        }
      });
    },
    // upImage: function (e) {
    //   var name = e.target.id;
    //   var that = this;
    //   uni.chooseImage({
    //     count: 1,
    //     // 默认9
    //     sizeType: ['original', 'compressed'],
    //     // 可以指定是原图还是压缩图，默认二者都有
    //     sourceType: ['album', 'camera'],
    //     // 可以指定来源是相册还是相机，默认二者都有
    //     success: function (res) {
    //       console.log('res',res)
    //       var tempFilePaths = res.tempFilePaths;
    //       uni.request({
    //         url:'https://wsxy.sns318.net/merchant/index.php',
    //         // url:'https://wsxy.sns318.net/merchant/index.php?c=ewei_o2o&a=file',
    //         method:'POST',
    //         // url: app.globalData.domain + '&a=file&do=uploadImage&file=' + res.tempFiles[0].path + '&key=' + app.globalData.key,
            
    //         data:{
    //           c:'ewei_o2o',
    //           a:'file',
    //           do:'uploadImage',
    //           file:res.tempFiles[0].path,
    //           key:app.globalData.key
    //         },
    //         header: {
    //           "Content-Type": "application/json"
    //         },
    //         success:function(res){
    //           console.log('res1',res)
    //         }
    //       })
    //       // uni.uploadFile({
    //       //   url: app.globalData.domain + '&a=file&do=uploadImage&file=' + res.tempFiles[0].path + '&key=' + app.globalData.key,
    //       //   // url:'http://wsxy.sns318.net/merchant/index.php',
    //       //   name: 'file',
    //       //   filePath: tempFilePaths[0],
    //       //   // formData:{
    //       //   //   c:'ewei_o2o',
    //       //   //   a:'file',
    //       //   //   do:'uploadImage',
    //       //   //   key:app.globalData.key,
    //       //   //   file:res.tempFiles[0].path
    //       //   // },
    //       //   // '_method': 'POST',
    //       //   // file:res.tempFiles[0].path,
            
    //       //   header: {
    //       //     "Content-Type": "multipart/form-data"
    //       //   },
    //       //   success: function (res) {
    //       //     console.log('res',res)
    //       //     var data = JSON.parse(res.data);
    //       //     if (name == "ShopPtOne") {
    //       //       card_behind = data.data;
    //       //       that.setData({
    //       //         img01: data.data,
    //       //         ShopPtOne: data.data
    //       //       });
    //       //     } else if (name == "ShopPtTwo") {
    //       //       card_front = data.data;
    //       //       that.setData({
    //       //         img02: data.data,
    //       //         ShopPtTwo: data.data
    //       //       });
    //       //     } else if (name == "ShopPtThrree") {
    //       //       card_front = data.data;
    //       //       that.setData({
    //       //         img03: data.data,
    //       //         ShopPtThrree: data.data
    //       //       });
    //       //     } else if (name == "ShopPtfour") {
    //       //       card_front = data.data;
    //       //       that.setData({
    //       //         img04: data.data,
    //       //         ShopPtfour: data.data
    //       //       });
    //       //     }
    //       //   },
    //       //   fail: function (res) {
    //       //     console.log('res',res)
    //       //   }
    //       // });
    //     }
    //   });
    // },
    send_info: function (e) {
      var that = this;
      var uid = that.uid;
      ShopName = e.detail.value.ShopName;
      ShopType = e.detail.value.ShopType;
      ShopBorn = e.detail.value.ShopBorn;
      StartTime = e.detail.value.StartTime;
      EndTime = e.detail.value.EndTime;
      ShopArea = e.detail.value.ShopArea;
      ShopAddress = e.detail.value.ShopAddress;
      ShopPerson = e.detail.value.ShopPerson;
      ShopPhone = e.detail.value.ShopPhone;
      ShopCity = e.detail.value.ShopCity; // 协议是否选中

      var liab_check = e.detail.value.liab_check;

      if (ShopName == "") {
        wx.showToast({
          title: '商户名称不为空'
        });
        return;
      } else if (ShopType == "") {
        wx.showToast({
          title: '主营项目不为空'
        });
        return;
      } else if (ShopBorn == "") {
        wx.showToast({
          title: '开业时间不为空'
        });
        return;
      } else if (StartTime == "") {
        wx.showToast({
          title: '开始时间不为空'
        });
        return;
      } else if (EndTime == "") {
        wx.showToast({
          title: '结束时间不为空'
        });
        return;
      } else if (ShopArea == "") {
        wx.showToast({
          title: '面积不能为空'
        });
        return;
      } else if (ShopPerson == "") {
        wx.showToast({
          title: '联系人不能为空'
        });
        return;
      } else if (ShopPhone == "") {
        wx.showToast({
          title: '电话不能为空'
        });
        return;
      } else if (ShopCity == "") {
        wx.showToast({
          title: '城市不能为空'
        });
        return;
      } else if (ShopAddress == "") {
        wx.showToast({
          title: '地址不能为空'
        });
        return;
      } else if (that.ShopPtOne == "") {
        wx.showToast({
          title: '执照不能为空'
        });
        return;
      } else if (that.ShopPtTwo == "") {
        wx.showToast({
          title: '照片不能为空'
        });
        return;
      } else if (that.ShopPtThrree == 0) {
        wx.showToast({
          title: '内景不能为空'
        });
        return;
      } else if (that.ShopPtfour == 0) {
        wx.showToast({
          title: '内景不能为空'
        });
        return;
      } else if (liab_check == 0) {
        wx.showToast({
          title: '请确认阅读协议'
        });
        return;
      }

      var that = this;
      wx.request({
        method: 'get',
        url: app.globalData.domain,
        data: {
          a: "merch",
          do: "reg",
          uid: uid,
          key: app.globalData.key,
          ShopName: ShopName,
          //店铺名称
          ShopType: ShopType,
          //主营项目
          ShopBorn: ShopBorn,
          //开业时间
          StartTime: StartTime,
          //开始营业时间
          EndTime: EndTime,
          //结束营业时间
          ShopArea: ShopArea,
          //经营面积
          ShopPerson: ShopPerson,
          //联系人
          ShopPhone: ShopPhone,
          //联系电话
          ShopCity: ShopCity,
          //经营城市
          ShopAddress: ShopAddress,
          //地址信息
          ShopPtOne: that.ShopPtOne,
          //营业执照
          ShopPtTwo: that.ShopPtTwo,
          //门头照片
          ShopPtThrree: that.ShopPtThrree,
          //内景1
          ShopPtfour: that.ShopPtfour //内景2

        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  uni.navigateBack({
                    changed: true
                  });
                }, 4000);
              }
            });
          }
        }
      });
    },
    // 协议选择
    selectChange: function (e) {
      var that = this;
      var check_value = e.detail.value;

      if (check_value == 1) {
        that.setData({
          original: 'display:none',
          original_select: 'display:block',
          check_value: check_value
        });
      } else {
        that.setData({
          original: 'display:block',
          original_select: 'display:none',
          check_value: check_value
        });
      }
    },
    statement_skip: function () {
      var that = this;
      that.setData({
        mark_state: 'display:block'
      });
    },
    statement_shut: function () {
      var that = this;
      that.setData({
        mark_state: 'display:none'
      });
    },
    // 省名称获取
    province_list: function () {
      var that = this;
      wx.request({
        method: 'get',
        url: app.globalData.domain,
        data: {
          a: "address",
          do: "region_list",
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              provinces: res.data.data
            });
          }
        }
      });
    },
    //市名称获取
    city_list: function () {
      var that = this;
      wx.request({
        method: 'get',
        url: app.globalData.domain,
        data: {
          a: "address",
          do: "region_list",
          pid: prov_id,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              citys: res.data.data
            });
          }
        }
      });
    },
    //区域名称
    area_list: function () {
      var that = this;
      wx.request({
        method: 'get',
        url: app.globalData.domain,
        data: {
          a: "address",
          do: "region_list",
          pid: prov_id,
          cid: city_id,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              areas: res.data.data
            });
          }
        }
      });
    },
    // 选择分类
    cate_list: function () {
      var that = this;
      wx.request({
        method: 'get',
        url: app.globalData.domain,
        data: {
          a: "merch",
          do: "merch_type",
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              types: res.data.data
            });
          }
        }
      });
    },
    // 协议模块
    cate_inform: function () {
      var that = this;
      wx.request({
        method: 'get',
        url: app.globalData.domain,
        data: {
          a: "merch",
          do: "merch_info",
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 1) {
            //WxParse.wxParse('agreeContent', 'html', res.data.data.applycontent, that, 5)
            setTimeout(() => {
              that.article_agreeContent = res.data.data.applycontent;
            }, 200);
            that.setData({
              open_protocol: res.data.data.open_protocol,
              applytitle: res.data.data.applytitle
            });
          }
        }
      });
    },
    //待审核中状态下 显示信息
    merch_states: function () {
      var that = this;
      var uid = app.globalData.uid
      wx.request({
        method: 'get',
        url: app.globalData.domain,
        data: {
          a: "merch",
          do: "status",
          uid: uid,
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.data.code == 0) {
            var starTime = res.data.data.StartTime;
            var cutStar = starTime.split(':');
            var starFirst = cutStar[0];
            var starSecond = cutStar[1];
            var endTime = res.data.data.EndTime;
            var cutEnd = endTime.split(':');
            var endFirst = cutEnd[0];
            var endSecond = cutEnd[1];
            that.setData({
              ShopName: res.data.data.merchname,
              ShopType: res.data.data.salecate,
              ShopBorn: res.data.data.ShopBorn,
              ShopArea: res.data.data.ShopArea,
              ShopPerson: res.data.data.realname,
              ShopPhone: res.data.data.mobile,
              ShopAddress: res.data.data.ShopAddress,
              img01: res.data.data.ShopPtOne,
              img02: res.data.data.ShopPtTwo,
              img03: res.data.data.ShopPtThrree,
              img04: res.data.data.ShopPtfour,
              starthour: starFirst,
              startminute: starSecond,
              endhour: endFirst,
              endminute: endSecond,
              province: '',
              city: '',
              area: res.data.data.ShopCity
            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./store_mall.css";
</style>