<template>
  <view>
    <!--<import src="../../wxParse/wxParse.wxml"></import>-->
    <view class="goods_body">
      <!--轮播-->
      <view v-if="goods_img_list != ''">
        <swiper
          style="height:700rpx; width:100%;"
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
        >
          <block
            v-for="(item, index) in goods_img_list"
            :key="index"
            :item="wpitem"
          >
            <swiper-item>
              <image
                :src="item"
                class="slide-image"
                style="width:100%; height:100%;"
              ></image>
            </swiper-item>
          </block>
        </swiper>
      </view>
      <view v-else>
        <view style="height:700rpx; width:100%;">
          <image
            :src="goods_img_lists"
            class="slide-image"
            style="width:100%; height:100%;"
          ></image>
        </view>
      </view>
      <!--轮播结束-->

      <!--标题开始-->
      <view class="goods_name">
        <text class="goods_name_cont">{{ goods_info_title }}</text>
        <!--分享按钮-->
        <view class="share_top" @tap="share_skip">
          <image :src="shareImg" class="share_icon"></image>
          <text class="share_name">分享</text>
        </view>
      </view>
      <!-- <view class="goods_text">
    <text class="goods_name_cont">{{goods_info_subtitle}}</text>
  </view> -->
      <!--标题结束-->

      <!--价格开始-->
      <view class="play_money">
        <view v-if="goods_infosss.ispresell == '0'">
          <text class="play_money_title">￥</text>
          <text
            v-if="goods_infosss.is_section == '0'"
            class="play_money_price"
            >{{ goods_info_price }}</text
          >
          <text v-if="goods_infosss.is_section != '0'" class="play_money_price"
            >{{ goods_infosss.price_section.min_price }}-</text
          >
          <!-- <text v-if="goods_infosss.price_section.min_price!=null||goods_infosss.price_section.max_price!=null" class="play_money_price">-</text> -->
          <text
            v-if="goods_infosss.is_section != '0'"
            class="play_money_price"
            >{{ goods_infosss.price_section.max_price }}</text
          >
          <text v-if="goods_productprice != 0.0" class="pay_money_high">
            <text class="play_money_initial">原价：</text>
            <text
              v-if="goods_infosss.is_section == '0'"
              class="play_title_initial"
              >{{ goods_productprice }}</text
            >
            <text
              v-if="goods_infosss.is_section != '0'"
              class="play_title_initial"
              >￥{{ goods_productprice }}</text
            >
            <!-- <text
              v-if="
                goods_infosss.price_section.min_product_price != null ||
                  goods_infosss.price_section.max_product_price != null
              "
              class="play_title_initial"
              >-</text
            > -->
            <text
              v-if="goods_infosss.is_section != '0'"
              class="play_title_initial"
              >{{ goods_productprice }}</text
            >
          </text>
        </view>
        <!--细节说明-->
        <view class="goodinfo_bottom">
          <view class="sell_num left">
            <text class="sell_num_text">商家上门取件</text>
          </view>
          <view class="sell_num center">
            <text class="sell_num_text">已售</text>
            <text class="sell_num_num">{{ goods_info_sales }}件</text>
          </view>
          <view class="sell_num right">
            <text class="sell_num_text">{{ shop.service_address }}</text>
          </view>
        </view>
      </view>
      <!--价格结束-->
      <view class="borderh15"></view>
      <view>
        <view v-if="goods_properties != 'null'">
          <!--折扣-->
          <!-- <view class="prefer_wrap">
        <image src="http://wximage.shedongyun.com/sdo2o/prefer_logo.png" class="prefer_logo"></image>
        <text class="prefer_name">您是普通二级会员，可享受二折优惠</text>
      </view> -->
          <!--领券-->
          <view class="select_wrap" v-if="coupon_two != ''">
            <view class="select_wrap_left">
              <text>领券</text>
            </view>
            <view class="select_wrap_right" @tap="get_couponlist">
              <block v-for="(item, index) in coupon_two" :key="index">
                <text class="type_select type_coupon">{{ item }}</text>
              </block>
              <image
                mode="widthFix"
                src="http://wximage.shedongyun.com/sdo2o/select_specia.png"
              ></image>
            </view>
          </view>

          <!--规格选择-->
          <view class="select_wrap">
            <view class="select_main" @tap="judgeCategory">
              <view class="select_wrap_left">
                <text>已选：</text>
              </view>
              <view class="select_wrap_right" :style="specif_have">
                <text class="type_select">请点击选择</text>
                <image
                  mode="widthFix"
                  src="http://wximage.shedongyun.com/sdo2o/select_specia.png"
                ></image>
              </view>
              <view class="select_wrap_right" :style="specif_none">
                <text class="type_select">请点击选择</text>
                <image
                  mode="widthFix"
                  src="http://wximage.shedongyun.com/sdo2o/select_specia.png"
                ></image>
                <button
                  open-type="getUserInfo"
                  @getuserinfo="bindGetUserInfo"
                  class="user_info"
                >
                  确定进入该小程序
                </button>
              </view>
            </view>
            <view class="select_inform">
              <view class="inform_one">
                <image
                  src="http://wximage.shedongyun.com/sdo2o/check_icon.png"
                  class="check_logo"
                ></image>
                <text class="check_name">未服务随时退</text>
              </view>
              <view class="inform_one">
                <image
                  src="http://wximage.shedongyun.com/sdo2o/check_icon.png"
                  class="check_logo"
                ></image>
                <text class="check_name">无额外费用</text>
              </view>
            </view>
          </view>
        </view>
        <view class="borderh15"></view>

        <!--店铺介绍及进入店铺-->
        <view class="store_cont">
          <view class="shop_head">
            <image
              v-if="shop.logo == null"
              src="http://wximage.shedongyun.com/sdo2o/proprieta.png"
              class="store_logo"
            ></image>
            <image v-else :src="shop.logo" class="store_logo"></image>
            <view class="store_main">
              <view class="store_name">
                <text class="store_title">{{ shop.merchname }}</text>
                <view class="laundy_cond">
                  <text class="comp_firm">{{ shop.merchgroupname }}</text>
                  <text>服务次数{{ shop.service_count }}次</text>
                </view>
              </view>
              <text
                @tap="attention"
                data-type="add"
                :data-merchid="
                  shop.goods_info.merchid ? shop.goods_info.merchid : ''
                "
                :style="add"
                class="select_intro"
                >点击关注</text
              >
              <text
                @tap="attention"
                data-type="cancel"
                :data-merchid="
                  shop.goods_info.merchid ? shop.goods_info.merchid : ''
                "
                :style="cancel"
                class="select_intro"
                >取消关注</text
              >
            </view>
          </view>
          <!--进入店铺-->
          <view class="select_button">
            <view
              class="enter_store"
              @tap="phone_call"
              :data-phone="shop.merchmobile"
            >
              <image
                mode="widthFix"
                src="http://wximage.shedongyun.com/sdo2o/detail_contact.png"
              ></image>
              <text class>联系商家</text>
            </view>
            <view
              class="enter_store second_store"
              @tap="enter_shop"
              :data-id="shop.goods_info.merchid ? shop.goods_info.merchid : ''"
            >
              <image
                mode="widthFix"
                src="http://wximage.shedongyun.com/sdo2o/detail_mearch.png"
              ></image>
              <text class>进入店铺</text>
            </view>
          </view>
        </view>
        <!--评价展示-->
        <block v-if="comment_info != ''">
          <view class="borderh15"></view>
          <view class="evaluat_wrap">
            <view class="evaluat_head">
              用户评价<text class="evaluat_numb">({{ commentNum }})</text>
            </view>
            <!--一条-->
            <view class="evaluat_line">
              <view class="evaluat_user">
                <text class="evaluat_name">{{ comment_info.nickname }}</text>
                <block v-for="(item, index) in littleStar" :key="index">
                  <image v-if="index < comment_info.level" :src="item"></image>
                  <image v-else :src="afterImage"></image>
                </block>
              </view>
              <view class="evaluat_cont">{{ comment_info.content }}</view>
              <view class="evaluat_inform">
                <text>{{ comment_info.createtime }}</text>
                <text>服务方式：上门服务</text>
              </view> </view
            ><!--evaluat_line-->
            <view
              class="evaluat_all"
              @tap="evaluat_skip"
              :data-id="goods_info_id"
              >查看全部评价</view
            >
          </view>
        </block>

        <!--商品不见了提示语-->
        <view v-if="tis != ''" class="tis" :style="tisshow">{{ tis }}</view>
        <!--详情内容-->
        <view class="borderh15"></view>
        <view class="main-product">
          <view class="shop_intro">商家介绍</view>
          <!-- <view class="main-product-title">
      <text data-type='01' bindtap='info_box' class="{{pro_typebox=='01'?'active':''}}">商品介绍</text>
      <text data-type='02' bindtap='info_box' class="{{pro_typebox=='02'?'active':''}}">规格参数</text>
    </view> -->
        </view>
        <view class="xiangqing-cont">
          <block class="ht_block">
            <view
              :style="pro_typebox == '01' ? 'display:block' : 'display:none'"
              class="xiangqing-cont-main"
            >
              <jyf-parser :html="article_productContent"></jyf-parser>
            </view>
          </block>
        </view>
        <view
          class="Technical_support"
          style="height:200rpx; margin-top:70rpx;"
        >
          <text class="Technical_support_text">{{ copyright }}</text>
        </view>
        <h1>哈哈哈</h1>
        <!--底部固定-->
        <view class="menu_a">
          <view
            class="shopping_car"
            @tap="enter_shop"
            :data-id="shop.goods_info.merchid ? shop.goods_info.merchid : ''"
          >
            <image
              src="http://wximage.shedongyun.com/sdo2o/button_merchant.png"
              style="width:50rpx; height:50rpx;"
              class="shopping_car_img"
            ></image>
            <!-- <text class="cart_number">{{cart_number}}</text> -->
            <text class="gouwuche">店铺</text>
          </view>
          <view class="shopping_car">
            <image
              :data-goods_id="goods_info_id"
              style="width:50rpx; height:50rpx;"
              class="goods_collect_"
              @tap="goods_collect"
              v-if="user_is_collect == 0"
              src="http://wximage.shedongyun.com/sdo2o/button_star.png"
            ></image>
            <image
              :data-goods_id="goods_info_id"
              style="width:50rpx; height:50rpx;"
              class="goods_collect_red"
              @tap="del_goods_collect"
              v-else
              src="http://wximage.shedongyun.com/sdo2o/sc_after_xin.png"
            ></image>
            <text class="gouwuche">收藏</text>
          </view>
          <view class="shopping_car" @tap="enter_cart">
            <image
              src="http://wximage.shedongyun.com/sdo2o/button_cart.png"
              style="width:50rpx; height:50rpx;"
              class="shopping_car_img"
            ></image>
            <text class="gouwuche">洗衣篮</text>
          </view>
          <!--已获取用户信息-->
          <view class="form_wrap" :style="user_have">
            <view
              @tap="show_view"
              data-step="cartStep"
              class="Join_shopping_cart"
              ><!--bindtap="cartJudgeInform"-->
              <text>加入洗衣篮</text>
            </view>
            <view @tap="show_view_cart" data-step="buyStep" class="buy_now"
              ><!--bindtap="judgeInform"-->
              <text>购买服务</text>
            </view>
          </view>
          <!--未获取用户信息-->
          <view class="form_wrap" :style="user_none">
            <view class="Join_shopping_cart"
              ><!--bindtap="show_view"-->
              <button
                open-type="getUserInfo"
                @getuserinfo="bindGetUserInfoCart"
                class="user_info"
              >
                加入洗衣篮
              </button>
            </view>
            <view class="buy_now"
              ><!--bindtap="show_view_cart"-->
              <button
                open-type="getUserInfo"
                @getuserinfo="bindGetUserInfoBuy"
                class="user_info"
              >
                购买服务
              </button>
            </view>
          </view>
        </view>
        <!--底部固定结束-->
      </view>
      <!--goods_body结束-->
      <!--服务类型模态框-->
      <view :style="show_view_style" class="bj_goods">
        <view class="goods_select">
          <view @tap="show_cancel" class="show_cancel">
            <image
              src="http://wximage.shedongyun.com/sdo2o/particula_delect.png"
            ></image>
          </view>
          <image class="show_view_goods_thumb" :src="goods_thumb"></image>
          <view class="show_view_texta">
            <view class="show_title">{{ goods_info_title }}</view>
            <view class="show_price" v-if="currType == 0"
              ><text class="show_color">￥</text>{{ goods_info_price }}</view
            >
            <view class="show_price" v-if="currType == 1"
              ><text class="show_color">￥</text
              >{{ goods_infosss.price_section.min_price }}-{{
                goods_infosss.price_section.max_price
              }}</view
            >
          </view>
          <view class="guige_box">
            <view class="attr_boxs">
              <block
                v-for="(item, index) in goods_properties"
                :key="index"
                v-if="goods_properties != 'null'"
              >
                <view class="waiwrapper">
                  <view class="attr_title">{{ item.title }}</view>
                  <view>
                    <radio-group class="attr_border">
                      <label
                        v-for="(values, index2) in item.spec_items"
                        :key="index2"
                        @tap="select_scalea"
                        :id="goods_info_id"
                        :data-id="values.id"
                        :data-name="id"
                        :data-ck="checkId[id]"
                        :class="
                          'attr_item ' +
                            (checkId[id] == values.id ? 'active' : '')
                        "
                      >
                        <view
                          v-if="checkId[id] == values.id"
                          style="display:inline-block;"
                          class="attr_item_select"
                        >
                          <radio class="attr_selsec"></radio>{{ values.title }}
                        </view>
                        <view
                          v-else
                          style="display:inline-block; padding-left:20rpx; padding-right:20rpx;"
                        >
                          <radio class="attr_selsec"></radio>{{ values.title }}
                        </view>
                      </label>
                    </radio-group>
                  </view>
                </view>
              </block>
            </view>
            <view class="num_item1">
              <view class="attr_title">数量</view>
              <view class="ui-number">
                <view @tap="change_num_jian" class="decrease"></view>
                <input
                  onchange="change_num"
                  :value="goods_number"
                  class="num"
                />
                <view @tap="change_num_jia" class="increase"></view>
              </view>
            </view>
          </view>
        </view>
        <!--走规格-->
        <view class="outside_cont" :style="double_style">
          <form @submit="formSubmit" report-submit="true">
            <input
              name="number"
              :value="protuct_number"
              type="hidden"
              style="display:none"
            />
            <view class="bottom_wrap">
              <!--加入洗衣篮-->
              <view class="Join_shopping_cart Join_shopping_cart_wrap">
                <button
                  ref="btn"
                  :id="goods_info_id"
                  :data-goods_spec="goods_spec"
                  :data_goods_num="goods_number"
                  data-fast="0"
                  type="submit"
                  data_name="add_to_cart"
                  :data_number="protuct_number"
                  formType="submit"
                  @tap="jiaLu"
                >
                  加入洗衣篮
                </button>
              </view>
              <!--立即购买-->
              <view class="buy_now buy_now_wrap">
                <button
                  :id="goods_info_id"
                  :data-goods_spec="goods_spec"
                  :data_goods_num="goods_number"
                  :data-goods_num="goods_number"
                  data-fast="1"
                  type="submit"
                  data_name="buy_now"
                  :data_number="protuct_number"
                  form-type="submit"
                  @tap="buy_now"
                >
                  立即购买
                </button>
              </view>
            </view>
          </form>
        </view>
        <!--不走规格-->
        <view class="outside_cont" :style="single_style">
          <form @submit="formSubmit" report-submit="true">
            <view class="bottom_wrap">
              <view
                class="Join_shopping_cart cate_shopping_cart_wrap"
                :style="confirm_cart"
              >
                <button
                  :id="goods_info_id"
                  :data-goods_spec="goods_spec"
                  :data_goods_num="goods_number"
                  data-fast="0"
                  data_name="add_to_cart"
                  :data_number="protuct_number"
                  form-type="submit"
                  class="font_cart"
                  style="background:#55bcc5"
                >
                  确定
                </button>
              </view>
              <view class="buy_now cate_now_wrap" :style="confirm_buy">
                <button
                  :id="goods_info_id"
                  :data-goods_spec="goods_spec"
                  :data_goods_num="goods_number"
                  data-fast="1"
                  data_name="buy_now"
                  :data_number="protuct_number"
                  formType="submit"
                  class="font_cart"
                  style="background:#55bcc5"
                  @tap="buy_now"
                >
                  确定
                </button>
              </view>
            </view>
          </form>
        </view>
      </view>
    </view>

    <!--领券弹框-->
    <view
      :style="coupon_show == 'true' ? 'display:block' : 'display:none'"
      class="coupon_bj"
    >
      <view class="coupon_box">
        <view class="couponbox_tiele">
          <text>优惠券</text>
          <image
            @tap="hide_couponlist"
            mode="widthFix"
            src="http://wximage.shedongyun.com/sdo2o/particula_delect.png"
          ></image>
        </view>
        <scroll-view class="coupon_height" scroll-y="true">
          <block
            v-for="(item, index) in coupon_list"
            :key="index"
            v-if="coupon_list != null || coupon_list != ''"
          >
            <view class="couponbox_list">
              <view class="coupon_list_left">
                <view class="couponlist_price">
                  <text class="rmb">¥</text>
                  <text class="nums">{{ item.deduct }}</text>
                </view>
                <view class="couponlist_condition">
                  <text class>满{{ item.enough }}使用</text>
                </view>
              </view>
              <view class="coupon_list_right">
                <view class="coupon_userstore">
                  <text>{{ item.couponname }}</text>
                </view>
                <view class="coupon_userdate">
                  <text>有效期：{{ item.timestart }}~{{ item.timeend }} </text>
                </view>
                <view
                  v-if="item.is_receive != 1"
                  :data-id="item.id"
                  @tap="receiveCoupon"
                  class="coupon_geet"
                >
                  <text>立即领取</text>
                </view>
                <view v-else class="coupon_geet">
                  <text>已领取</text>
                </view>
              </view> </view
            ><!--couponbox_list-->
          </block>
        </scroll-view>
      </view>
    </view>

    <!--分享弹框-->
    <view :class="'share_modal ' + (falseView == 'true' ? 'show_modal' : '')">
      <scroll-view class="share_wrap" scroll-y="true">
        <view class="share_main">
          <image
            src="http://wximage.shedongyun.com/sdo2o/share_shut.png"
            class="share_shut"
            @tap="share_shut"
          ></image>
          <view class="share_cont">
            <image mode="widthFix" :src="shareImg" class="share_img"></image>
          </view>
          <view class="share_button">
            <view class="share_save" @tap="save_pucture" :data-img="shareImg"
              >保存图片</view
            >
            <text class="save_inform">保存图片至相册</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <!--购买权限提示弹框-->
    <view class="buy_permiss" :style="permiss_state">
      <image
        src="http://wximage.shedongyun.com/sdo2o/permiss.png"
        class="permiss_logo"
      ></image>
      <text class="permiss_tips">V2会员才能购买哦</text>
    </view>
    <!--购买上线提示弹框-->
    <view class="buy_permiss limit_permiss" :style="limit_state">
      <text class="permiss_title">抱歉！</text>
      <text class="permiss_tips">您购买的总量已达到上限！</text>
    </view>
  </view>
</template>

<script>
import parser from "@/components/jyf-parser/jyf-parser";
var app = getApp();
var currLatitude = "";
var currLongitude = "";
var goods_id = 0;
var change_typea = "";
var change_typeb = "";
var dx_list = new Array();
var cart_number = 0;
var joint;
var num = 0;
var user_is_collect = 0;
var area_type = "false";
var area_msg = "";
var prime_type = "";
var currType;
var haveLimit = "";
var allLimit = "";

export default {
  data() {
    return {
      shareImg: "",
      istrue: false,
      currType: 0,
      tis: "",
      tisshow: "",
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      indicatorColor: "#fff",
      indicatorActiveColor: "#fe5455",
      goods_img_list: [],
      goods_info: "",
      goods_desc: [],
      user_is_collect: 0,
      show_view_style: "",
      goods_properties: "",
      change_typeab_text: "",
      goods_number: 1,
      add_to_tis_text: "",
      copyright: app.globalData.copyright,
      specsjoint: 0,
      specsarr: [],
      show_view_style: "display:none",
      login_state: "display:none",
      double_style: "display:none",
      single_style: "display:none",
      confirm_cart: "display:none",
      confirm_buy: "display:none",
      pro_typebox: "01",
      coupon_show: "false",
      id: "",
      result: [],
      end_time: "",
      clock: "",
      data_countdown: "false",
      falseView: "false",
      add: "display:block",
      cancel: "display:none",
      permiss_state: "display:none",
      limit_state: "display:none",
      afterImage: "http://wximage.shedongyun.com/sdo2o/star_before.png",
      littleStar: [
        "http://wximage.shedongyun.com/sdo2o/star_after.png",
        "http://wximage.shedongyun.com/sdo2o/star_after.png",
        "http://wximage.shedongyun.com/sdo2o/star_after.png",
        "http://wximage.shedongyun.com/sdo2o/star_after.png",
        "http://wximage.shedongyun.com/sdo2o/star_after.png",
      ],
      goods_id: "",
      uid: "",
      user_none: "",
      user_have: "",
      specif_have: "",
      specif_none: "",
      cart_number: "",
      protuct_number: "",
      goods_spec: "",
      goods_info_price: "",
      minbuy: "",
      maxbuy: "",
      goods_thumb: "",
      checkId: "",
      param_infosss: "",
      goods_infosss: "",
      coupon_two: "",
      coupon_list: "",
      goods_info_id: "",
      goods_img_lists: "",
      goods_info_title: "",
      goods_info_subtitle: "",
      goods_info_sales: "",
      goods_productprice: "",
      totle: "",
      is_authority: "",
      shop: [],
      shop_id: "",
      comment_info: "",
      commentNum: "",
      shareImg: "",
      article_productContent: "",
    };
  },

  components: {
    "jyf-parser": parser,
  },
  props: {},
  onLoad: function(query) {
    var that = this;
    goods_id = query.goods_id;
    var uid = app.globalData.uid;
    that.setData({
      goods_id: goods_id,
      uid: uid,
    }); // that.field_obtain();//登录字段获取

    that.goods_detail(); //商品详情

    that.coupon_height(); //优惠券高度
    //当前位置的经纬度

    currLatitude = app.globalData.currLatitude;
    currLongitude = app.globalData.currLongitude; //判断用户信息是否获取

    var userinfo = app.globalData.userInfo;

    if (userinfo != "") {
      that.setData({
        user_none: "display:none",
        user_have: "display:block",
        specif_have: "display:block",
        specif_none: "display:none",
      });
    } else {
      that.setData({
        user_none: "display:block",
        user_have: "display:none",
        specif_have: "display:none",
        specif_none: "display:block",
      });
    }
  },
  onShow: function() {
    var that = this;
  },
  onShareAppMessage: function() {
    return app.globalData.goShareApp("/pages/index");
  },
  methods: {
    //加入购物车
    jiaLu: function(e) {
      console.log("e你你你", e);
    },
    // 商品收藏
    goods_collect: function(e) {
      var user_info = app.globalData;
      var that = this;
      if (user_info.uid == "") {
        uni.showToast({
          title: "请授权后收藏",
          icon: "success",
          duration: 1500,
        });
      } else {
        uni.request({
          url: app.globalData.domain,
          data: {
            a: "goods",
            do: "collect",
            key: app.globalData.key,
            gid: e.target.dataset.goods_id,
            uid: user_info.uid,
          },
          header: {
            "Content-Type": "application/json",
          },
          success: function(res) {
            if (res.data.code == 1) {
              that.setData({
                user_is_collect: res.data.data.user_is_collect,
              });
            }

            uni.showToast({
              title: res.data.msg,
              icon: "success",
              duration: 1500,
            });
          },
        });
      }
    },
    // 取消收藏商品
    del_goods_collect: function(e) {
      var that = this;
      var user_info = app.globalData;

      if (user_info.id == "") {
        uni.showToast({
          title: "请授权后取消",
          icon: "success",
          duration: 1500,
        });
        return;
      }

      uni.request({
        url: app.globalData.domain,
        data: {
          a: "goods",
          do: "delcollect",
          key: app.globalData.key,
          gid: e.target.dataset.goods_id,
          uid: user_info.uid,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              user_is_collect: res.data.data.user_is_collect,
            });
          }

          uni.showToast({
            title: res.data.msg,
            icon: "success",
            duration: 1500,
          });
        },
      });
    },
    // 数量加减
    change_num: function(e) {
      var that = this;

      if (e.detail.value > that.maxbuy) {
        uni.showToast({
          title: "限购" + that.maxbuy,
          icon: "success",
          duration: 1000,
        });
        that.setData({
          goods_number: that.maxbuy,
        });
        return;
      }

      if (e.detail.value < that.minbuy) {
        uni.showToast({
          title: that.minbuy + "件起购",
          icon: "success",
          duration: 1000,
        });
        that.setData({
          goods_number: that.minbuy,
        });
        return;
      }
      if (allLimit != 0) {
        if (e.detail.value > allLimit) {
          uni.showToast({
            title: "总量已达到上限",
            icon: "success",
            duration: 1500,
          });
          return false;
        }
      }

      that.setData({
        goods_number: e.detail.value,
      }); // this.send_change_type();
    },
    change_num_jia: function() {
      var that = this;

      if (that.goods_number + 1 > that.maxbuy) {
        uni.showToast({
          title: "限购" + that.maxbuy,
          icon: "success",
          duration: 1000,
        });
        return;
      }
      if (allLimit != 0) {
        var buyCurrent = that.goods_number + haveLimit;

        if (buyCurrent > allLimit) {
          uni.showToast({
            title: "总量已达到上限",
            icon: "success",
            duration: 1500,
          });
          return false;
        }
      }

      that.setData({
        goods_number: that.goods_number + 1,
      }); // this.send_change_type();
    },
    change_num_jian: function() {
      var that = this;

      if (that.goods_number - 1 < that.minbuy) {
        uni.showToast({
          title: that.minbuy + "件起购",
          icon: "success",
          duration: 1000,
        });
        return;
      }

      var new_goods_number = that.goods_number - 1;

      if (new_goods_number <= 0) {
        new_goods_number = that.goods_number;
      }
      if (allLimit != 0) {
        var buyCurrent = that.goods_number + haveLimit;

        if (buyCurrent > allLimit) {
          uni.showToast({
            title: "总量已达到上限",
            icon: "success",
            duration: 1500,
          });
          return false;
        }
      }

      that.setData({
        goods_number: new_goods_number,
      }); // this.send_change_type();
    },
    //加入洗衣篮和立即购买大模块********************************************************************************
    // 加入洗衣篮 最后一步
    add_to_cart: function(event) {
      var that = this; //判断商品属性选择
      var goods_spec = that.goods_properties;
      var goods_specsarr = that.specsarr[""];
      if (!goods_specsarr) {
        uni.showToast({
          title: "请选择商品属性",
          icon: "success",
          duration: 1500,
        });
        return;
      }
      var addId = event.id;
      var goods_num = event.$attrs.data_goods_num;
      var uid = app.globalData.uid;
      uni.request({
        url: app.globalData.domain,
        data: {
          key: app.globalData.key,
          c: "ewei_o2o",
          a: "cart",
          do: "add",
          gid: addId,
          goods_num: goods_num,
          is_fast: 0,
          uid: uid,
          goods_spec: goods_specsarr,
        },

        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          var cart_number = 0;
          if (res.data.code == 1) {
            that.setData({
              cart_number: res.data.data.cart_number,
            });
            uni.showToast({
              title: "成功添加洗衣篮",
              icon: "success",
              duration: 1500,
            });
          } else {
            uni.showToast({
              title: "res.data.msg",
              icon: "success",
              duration: 1500,
            });
          }
        },
      });
    },
    //购买服务最后一步
    buy_now: function(event) {
      var that = this;
      var shop_id = that.shop_id; //判断商品属性选择
      var goods_spec = that.goods_properties;
      var goods_specsarr = that.specsarr;
      // if (that.goods_properties != false) {
      //   for (var i = 0; i < goods_specsarr.length; i++) {
      //     if (goods_specsarr[i] == null) {
      //       uni.showToast({
      //         title: "请选择属性1",
      //         icon: "success",
      //         duration: 1500,
      //       });
      //       return;
      //     }
      //   }
      //   if (goods_spec.length != goods_specsarr.length) {
      //     uni.showToast({
      //       title: "请选择属性2",
      //       icon: "success",
      //       duration: 1500,
      //     });
      //     return;
      //   }
      // }
      if (!that.specsarr[""]) {
        uni.showToast({
          title: "又出错了",
          icon: "success",
          duration: 1500,
        });
        return;
      }
      var goods_string = goods_specsarr.join("_");
      var addId = that.goods_info_id;
      var goods_num = event.target.dataset.goods_num;
      var uid = app.globalData.uid;
      uni.request({
        url: app.globalData.domain,
        data: {
          key: app.globalData.key,
          c: "ewei_o2o",
          a: "cart",
          do: "add",
          gid: addId,
          goods_num: goods_num,
          is_fast: 1,
          uid: uid,
          goods_spec: goods_string,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          var cart_number = 0;

          if (res.data.code == 1 || res.data.code == 2) {
            that.setData({
              cart_number: res.data.data.cart_number,
            });
            uni.request({
              url: app.globalData.domain,
              data: {
                a: "cart",
                key: app.globalData.key,
                do: "update_order",
                gid: addId,
                uid: uid,
              },
              header: {
                "Content-Type": "application/json",
              },
              success: function(res) {
                uni.navigateTo({
                  url: "../flow/flow?is_fast=1" + "&merchid=" + shop_id,
                });
                setTimeout(function() {
                  that.setData({
                    show_view_style: "display:none;",
                  });
                }, 1000);
              },
            });
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: "success",
              duration: 2000,
            });
          }
        },
      });
    },
    // 选择规格
    select_scalea: function(event) {
      var that = this;
      currType = 0;
      that.setData({
        currType: currType,
      });
      var uid = app.globalData.uid;
      var flag_name = event.currentTarget.dataset.name;
      var click_id = event.currentTarget.dataset.id;
      that.specsarr[flag_name] = click_id;
      var catId = event.currentTarget.id;
      var specsstr = 0;
      var specsstrs = event.currentTarget.dataset.id;
      // var specsarr = JSON.parse(JSON.stringify(that.specsarr))
      // specsarr.forEach(function (value, index, array) {
      //   if (index == 0) {
      //     if (specsstr == 0) {
      //       specsstr = value;
      //     } else {
      //       specsstr = value + specsstr;
      //     }
      //   } else if (index != 0) {
      //     specsstr = specsstr + '_' + value;
      //   }
      // });
      uni.request({
        url: app.globalData.domain,
        data: {
          a: "goods",
          do: "goodsprice",
          goodsid: catId,
          specs: specsstrs,
          key: app.globalData.key,
          // uid: uid
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (
            res.data.code == 1 &&
            res.data.data.title &&
            res.data.data.marketprice
          ) {
            var stock = res.data.data.stock;
            that.setData({
              protuct_number: stock,
            });

            if (stock == 0) {
              uni.showToast({
                title: "已售罄",
                icon: "success",
                duration: 1500,
              });
              return false;
            }

            if (parseInt(res.data.data.goods_buy_num.maxbuy) == "0") {
              var maxbuy = parseInt(res.data.data.stock);
            } else {
              var maxbuy = parseInt(res.data.data.goods_buy_num.maxbuy);
            }

            if (parseInt(res.data.data.goods_buy_num.minbuy) == "0") {
              var minbuy = 1;
            } else {
              var minbuy = parseInt(res.data.data.goods_buy_num.minbuy);
            }

            that.setData({
              goods_spec: specsstr,
              goods_info_price: res.data.data.marketprice,
              minbuy: minbuy,
              maxbuy: maxbuy,
              goods_number: minbuy,
            });

            if (res.data.data.goods_img != "") {
              that.setData({
                goods_thumb: res.data.data.goods_img,
              });
            }
          }

          that.setData({
            checkId: that.specsarr,
          });
        },
      });
    },
    // 加入洗衣篮——不走规格  直接弹框
    show_view: function(e) {
      var that = this;

      if (that.is_authority == "0") {
        uni.showToast({
          title: "无购买权限",
          icon: "success",
          duration: 2000,
        });
        return false;
      }

      if (that.totle == "0") {
        uni.showToast({
          title: "已售罄",
          icon: "success",
          duration: 2000,
        });
        return false;
      }

      if (that.goods_properties != "null") {
        that.setData({
          show_view_style: "display:block;",
          double_style: "display:none",
          single_style: "display:block",
          confirm_cart: "display:block",
          confirm_buy: "display:none",
        });
      } else {
        that.add_to_cart();
      }
    },
    // 点击购买服务按钮购买服务 不走规格 直接弹窗
    show_view_cart: function() {
      var that = this;
      if (that.is_authority == "0") {
        uni.showToast({
          title: "无购买权限",
          icon: "success",
          duration: 1500,
        });
        return false;
      }

      if (that.totle == "0") {
        uni.showToast({
          title: "已售罄",
          icon: "success",
          duration: 1500,
        });
        return false;
      }

      if (that.goods_properties != "null") {
        that.setData({
          show_view_style: "display:block;",
          double_style: "display:none",
          single_style: "display:block",
          confirm_cart: "display:none",
          confirm_buy: "display:block",
        });
      } else {
        that.buy_now();
      }
    },
    //点击规格购买服务*******
    // 1、点击规格购买服务弹框
    judgeCategory: function(e) {
      var that = this;
      that.setData({
        login_state: "display:none",
      });
      that.cate_view_cart();
    },
    //2、购买服务——走规格模块
    cate_view_cart: function() {
      var that = this;
      if (that.totle == "0") {
        uni.showToast({
          title: "已售罄",
          icon: "success",
          duration: 1500,
        });
        return false;
      }

      if (that.goods_properties != "null") {
        that.setData({
          show_view_style: "display:block;",
          double_style: "display:block",
          single_style: "display:none",
        });
      } else {
        that.buy_now();
      }
    },
    show_cancel: function() {
      this.setData({
        show_view_style: "display:none;",
      });
    },
    close_skip: function() {
      var that = this;
      that.setData({
        login_state: "display:none",
      });
    },
    // 判断是否在合适的区域范围
    service_area: function() {
      var that = this; //店铺id

      var shop_id = that.shop_id;
      uni.request({
        url: app.globalData.domain,
        data: {
          key: app.globalData.key,
          c: "ewei_o2o",
          a: "shop",
          do: "shop_loaction",
          lng: currLongitude,
          lat: currLatitude,
          shopid: shop_id,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            //用来判断是否在合适区域 ture在
            area_type = "true";
          } else if (res.data.code == 0) {
            area_type = "false";
            area_msg = res.data.msg; // uni.showToast({
            //   title: res.data.msg,
            //   icon: 'success',
            //   duration: 2000
            // })
          }
        },
      });
    },
    // 2、获取当前登录微信用户信息*****************************************************
    //一、走规格获取用户信息
    bindGetUserInfo: function(from_share_uid = 0) {
      var that = this;

      try {
        var userInfo = app.globalData.userInfo;
      } catch (e) {
        var userInfo = false;
      }

      if (!userInfo || from_share_uid) {
        uni.login({
          success: function(res) {
            if (res.code) {
              uni.getUserInfo({
                success: function(res2) {
                  var userInfo = res2.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender;
                  uni.request({
                    url: app.globalData.domain,
                    header: {
                      "Content-Type": "application/json",
                    },
                    data: {
                      a: "login",
                      do: "Wx_login",
                      js_code: res.code,
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender,
                      from_share_uid: app.globalData.from_share_uid,
                      key: app.globalData.key,
                    },
                    success: function(res) {
                      if (res.data.code == 1) {
                        app.globalData.uid = res.data.data.uid;
                        app.globalData.userInfo = res.data.data;
                        that.setData({
                          show_view_style: "display:block",
                          double_style: "display:block",
                          single_style: "display:none",
                          user_have: "display:block",
                          user_none: "display:none",
                          specif_have: "display:block",
                          specif_none: "display:none",
                        });

                        try {
                          uni.setStorageSync("userInfo", res.data.data);
                        } catch (e) {}
                      } else {
                      }
                    },
                  });
                },
              });
            }
          },
        });
      } else {
        return userInfo;
      }
    },
    //一、加入洗衣篮获取用户信息
    bindGetUserInfoCart: function(from_share_uid = 0) {
      var that = this;

      try {
        var userInfo = app.globalData.userInfo;
      } catch (e) {
        var userInfo = false;
      }

      if (!userInfo || from_share_uid) {
        uni.login({
          success: function(res) {
            if (res.code) {
              uni.getUserInfo({
                success: function(res2) {
                  var userInfo = res2.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender;
                  uni.request({
                    url: app.globalData.domain,
                    header: {
                      "Content-Type": "application/json",
                    },
                    data: {
                      a: "login",
                      do: "Wx_login",
                      js_code: res.code,
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender,
                      from_share_uid: app.globalData.from_share_uid,
                      key: app.globalData.key,
                    },
                    success: function(res) {
                      if (res.data.code == 1) {
                        app.globalData.uid = res.data.data.uid;
                        app.globalData.userInfo = res.data.data;
                        that.setData({
                          user_have: "display:block",
                          user_none: "display:none",
                          specif_have: "display:block",
                          specif_none: "display:none",
                        });
                        that.show_view();

                        try {
                          uni.setStorageSync("userInfo", res.data.data);
                        } catch (e) {}
                      } else {
                      }
                    },
                  });
                },
              });
            }
          },
        });
      } else {
        return userInfo;
      }
    },
    //一、立即购买获取用户信息
    bindGetUserInfoBuy: function(from_share_uid = 0) {
      var that = this;

      try {
        var userInfo = app.globalData.userInfo;
      } catch (e) {
        var userInfo = false;
      }

      if (!userInfo || from_share_uid) {
        uni.login({
          success: function(res) {
            if (res.code) {
              uni.getUserInfo({
                success: function(res2) {
                  var userInfo = res2.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender;
                  uni.request({
                    url: app.globalData.domain,
                    header: {
                      "Content-Type": "application/json",
                    },
                    data: {
                      a: "login",
                      do: "Wx_login",
                      js_code: res.code,
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender,
                      from_share_uid: app.globalData.from_share_uid,
                      key: app.globalData.key,
                    },
                    success: function(res) {
                      if (res.data.code == 1) {
                        app.globalData.uid = res.data.data.uid;
                        app.globalData.userInfo = res.data.data;
                        that.setData({
                          user_have: "display:block",
                          user_none: "display:none",
                          specif_have: "display:block",
                          specif_none: "display:none",
                        });
                        that.show_view_cart();

                        try {
                          uni.setStorageSync("userInfo", res.data.data);
                        } catch (e) {}
                      } else {
                      }
                    },
                  });
                },
              });
            }
          },
        });
      } else {
        return userInfo;
      }
    },
    //商品详情提交规格时请求的函数****************
    formSubmit: function(e) {
      var btn = this.$refs.btn;
      var that = this;
      var uid = app.globalData.uid;
      var form_id = e.detail.formId;
      // var number_value = e.detail.target.dataset.number
      var number_value = btn.$attrs.data_number;
      if (btn.$attrs.data_name == "buy_now") {
        if (number_value == 0) {
          uni.showToast({
            title: "已售罄",
            icon: "success",
            duration: 2000,
          });
          return false;
        }

        that.buy_now(btn);
      } else {
        if (number_value == 0) {
          uni.showToast({
            title: "已售罄",
            icon: "success",
            duration: 2000,
          });
          return false;
        }

        this.add_to_cart(btn);
      }
    },
    // 商品详情************************
    goods_detail: function(e) {
      var that = this;
      var goods_id = that.goods_id;
      uni.request({
        url: app.globalData.domain,
        data: {
          c: "ewei_o2o",
          a: "goods",
          do: "info",
          gid: goods_id,
          // uid: uid,
          /**
           * @params uid 为用户注册后
           */
          uid: app.globalData.uid,
          key: app.globalData.key,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          console.log("res", res);
          setTimeout(() => {
            that.article_productContent = res.data.data.goods_info.content;
          }, 200);
          if (res.data.code != 1) {
            that.setData({
              tis: "您要的商品不见了...",
              tisshow: "height: 30px",
            });
          } else {
            if (parseInt(res.data.data.goods_info.maxbuy) == 0) {
              var maxbuy = parseInt(res.data.data.goods_info.total);
            } else {
              var maxbuy = parseInt(res.data.data.goods_info.maxbuy);
            }

            if (parseInt(res.data.data.goods_info.minbuy) == 0) {
              var minbuy = 1;
            } else {
              var minbuy = parseInt(res.data.data.goods_info.minbuy);
            }
            if (res.data.data.goods_info.ispresell != 0) {
              var timae = Date.parse(res.data.data.goods_info.preselltimeend);
              that.setData({
                end_time: timae, //项目截止时间，时间戳，单位毫秒
              }); //调用上面定义的递归函数，一秒一刷新时间
              countdown(that);
            }
            if (res.data.data.follow == 1) {
              that.setData({
                add: "display:none",
                cancel: "display:block",
              });
            }
            that.setData({
              param_infosss: res.data.data.param_info,
              goods_infosss: res.data.data.goods_info,
              coupon_two: res.data.data.coupon_two,
              coupon_list: res.data.data.coupon_list,
              minbuy: minbuy,
              maxbuy: maxbuy,
              shareImg: res.data.data.goods_info.thumb,
              goods_number: minbuy,
              goods_thumb: res.data.data.goods_info.thumb,
              goods_info_id: res.data.data.goods_info.id,
              goods_img_list: res.data.data.goods_info.thumb_url,
              goods_img_lists: res.data.data.goods_info.thumb,
              goods_info_title: res.data.data.goods_info.title,
              goods_info_subtitle: res.data.data.goods_info.subtitle,
              goods_info_sales: res.data.data.sale_num,
              protuct_number: res.data.data.goods_info.total,
              goods_info_price: res.data.data.goods_info.marketprice,
              goods_productprice: res.data.data.goods_info.productprice,
              user_is_collect: res.data.data.goods_info.user_is_collect,
              goods_properties: res.data.data.goods_spec,
              cart_number: res.data.data.cart_number,
              totle: res.data.data.goods_info.total,
              is_authority: res.data.data.goods_info.is_authority,
              shop: res.data.data,
              shop_id: res.data.data.goods_info.merchid,
              comment_info: res.data.data.comment,
              commentNum: res.data.data.comment_num,
            });
            haveLimit = res.data.data.goods_info.userbuy;
            allLimit = res.data.data.goods_info.usermaxbuy;
            if (res.data.data.goods_info.price_section != undefined) {
              currType = 1;
              that.setData({
                currType: currType,
                goods_info_price: "",
              });
            }

            that.share_data();
          }
        },
      });
    },

    /*领取优惠券*/
    receiveCoupon: function(e) {
      var uid = app.globalData.uid;
      var that = this;
      var couponId = e.currentTarget.dataset.id;
      /**从页面获取 */

      uni.request({
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
            uni.showToast({
              title: "领取成功",
              icon: "success",
              duration: 1500,
              success: function() {
                // setTimeout(function () {
                //   uni.switchTab({
                //     url: '/pages/user/coupon/get_coupon/get_coupon'
                //   })
                // }, 1000);
              },
            });
          } else if (code == 2) {
            //未登录，转到登录页面
            uni.showToast({
              title: "已领取",
              icon: "success",
              duration: 1500,
            });
          }
        },
      });
    },
    //优惠券部分
    hide_couponlist: function(e) {
      this.setData({
        coupon_show: "false",
      });
    },
    // 关注店铺****************************
    attention: function(e) {
      console.log("e", e);
      var that = this;
      var uid = app.globalData.uid;
      if (uid == "") {
        uni.showToast({
          title: "请授权后关注",
          icon: "success",
          duration: 1500,
        });
        return;
      }

      var merchid = e.currentTarget.dataset.merchid;
      if (e.currentTarget.dataset.type == "add") {
        uni.request({
          url: app.globalData.domain,
          data: {
            a: "follow",
            do: "add",
            uid: uid,
            merchid: merchid,
            key: app.globalData.key,
          },
          header: {
            "Content-Type": "application/json",
          },
          success: function(res) {
            that.setData({
              add: "display:none",
              cancel: "display:block",
            });
            uni.showToast({
              title: "关注成功",
              icon: "success",
              duration: 1500,
            });
          },
        });
      } else {
        uni.request({
          url: app.globalData.domain,
          data: {
            a: "follow",
            do: "cancel",
            uid: uid,
            merchid: merchid,
            key: app.globalData.key,
          },
          header: {
            "Content-Type": "application/json",
          },
          success: function(res) {
            that.setData({
              add: "display:block",
              cancel: "display:none",
            });
            uni.showToast({
              title: "取消关注成功",
              icon: "success",
              duration: 1500,
            });
          },
        });
      }
    },
    get_couponlist: function(e) {
      this.setData({
        coupon_show: "true",
      });
    },
    info_box: function(e) {
      this.setData({
        pro_typebox: e.currentTarget.dataset.type,
      });
    },
    // 分享——保存图片到本地*********************
    share_data: function() {
      /**
       * openid不能为空
       */
      var that = this;
      var uid = app.globalData.uid;
      var goodsId = that.goods_info_id;
      uni.request({
        url: app.globalData.domain,
        data: {
          a: "img",
          do: "get_image",
          key: app.globalData.key,
          gid: goodsId,
          uid: uid,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.setData({
              shareImg: res.data.data,
            });
          }
        },
      });
    },
    //保存图片
    save_pucture: function(e) {
      var that = this;
      var IMG_URL = e.currentTarget.dataset.img;
      uni.downloadFile({
        url: IMG_URL,
        success: function(res) {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function(res) {
              uni.showToast({
                title: "图片已保存",
                duration: 2000,
              });
            },
            fail: function(res) {},
          });
        },
        fail: function() {},
      });
    },
    share_skip: function() {
      var that = this;

      if (this.falseView == "false") {
        that.setData({
          falseView: "true",
        });
      } else {
        that.setData({
          falseView: "false",
        });
      }
    },
    share_shut: function() {
      var that = this;
      that.setData({
        falseView: "false",
      });
    },
    //联系商家
    phone_call: function(e) {
      var that = this;
      var phone_value = e.currentTarget.dataset.phone;
      uni.makePhoneCall({
        phoneNumber: phone_value,
      });
    },
    //进入店铺
    enter_shop: function(e) {
      console.log("e", e);
      var that = this;
      var shop_id = e.currentTarget.dataset.id;
      uni.navigateTo({
        url: "/pages/shop/shop_detail/shop_detail?id=" + shop_id,
      });
    },
    //进入洗衣篮
    enter_cart: function(e) {
      var that = this;
      uni.switchTab({
        url: "/pages/cart/cart",
      });
    },
    //查看全部评价跳转
    evaluat_skip: function(e) {
      var that = this;
      var goods_id = e.currentTarget.dataset.id;
      uni.navigateTo({
        url: "/pages/evaluate_list/evaluate_list?goods_id=" + goods_id,
      });
    },
    //优惠券高度
    coupon_height: function() {
      var that = this;
      var query = uni.createSelectorQuery();
      query.select(".coupon_height").boundingClientRect();
      // query.exec(res => {
      //   var listHeight = res[0].height; // 获取list高度
      // });
    },
  },
};
</script>
<style scoped>
@import "./goods.css";
element.style /deep/ uni-toast {
  z-index: 999999 !important;
}
</style>
