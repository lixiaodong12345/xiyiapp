<template>
<view>
<view v-if="code_index == '1'" :style="'height:' + eveheight + 'px'" class="box">
  <!--轮播图-->
  <view :style="'top:' + bannerheight + 'px;position:absolute;display:' + banner" data-name="bannerheight" class="header_img">
    <swiper :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration" style="height:185px;">
      <block v-for="(item, index) in adv_list" :key="index">
        <swiper-item v-if="item.switch_tap == 1">
          <image :src="item.imgurl" :data-link_wxapp="item.linkurl" @tap="search_hyperlink" class="slide-image" style="height:185px;"></image>
        </swiper-item>
        <swiper-item v-else>
          <image :src="item.imgurl" :data-link_wxapp="item.linkurl" @tap="search_hyperlinkb" class="slide-image" style="height:185px;"></image>
        </swiper-item>
      </block>
    </swiper>
  </view>

  <!--搜索框-->
  <view :style="'top:' + searchheight + 'px;position:absolute;display:' + search" data-name="searchheight" class="header">
    <view class="nav">
      <form @submit="search_seek">
        <view class="locate_wrap" @tap="city_switch" :data-current="openCityName">
         <text class="locate_name">{{openCityName}}</text>
         <image src="http://wximage.shedongyun.com/sdo2o/search_downs.png" class="search_downs"></image>
        </view>
        <view class="section">
          <input @focus="goSearch" :placeholder="searchplaceholder" type="search" class="input_text" placeholder-class="plholder"></input>
          <image src="http://wximage.shedongyun.com/sdo2o/green_icon.png" class="green_icon"></image>
        </view>
      </form>
    </view>
  </view>

  <!--快捷菜单  -->
  <view :style="'top:' + menuheight + 'px;position:absolute;display:' + menu" data-name="menuheight" class="FrameK">
    <view class="mBottom">
      <block v-for="(item, index) in menu_list" :key="index">
        <view v-if="item.switch_tap == 1" :data-cid="item.cid" :data-link_wxapp="item.linkurl" @tap="search_hyperlink">
          <view class="menu_2">
            <view class="mTu">
              <image :src="item.imgurl"></image>
            </view>
            <text class="mBiaoTi">{{item.text}}</text>
          </view>
        </view>
        <view v-else :data-cid="item.cid" :data-link_wxapp="item.linkurl" @tap="search_hyperlinkb">
          <view class="menu_2">
            <view class="mTu">
              <image :src="item.imgurl"></image>
            </view>
            <text class="mBiaoTi">{{item.text}}</text>
          </view>
        </view>
      </block>
    </view>
    <view class="back_line"></view>
  </view>

  <!--新闻动态部分  -->
  <view :style="'top:' + noticeheight + 'px;position:absolute;display:' + notice" data-name="noticeheight" class="linear">
    <image :src="notice_img"></image>
    <view class="gonggao-left">
      <swiper class="swiper_container" vertical="true" autoplay="true" :circular="circular" interval="3000">
        <block v-for="(item, index) in notice_list" :key="index">
            <swiper-item>
              <!-- <text :style="'color:' + color_notice" class="swiper_item">{{item.title}}</text> -->
			  <text class="swiper_item">{{item.title}}</text>
            </swiper-item>
        </block>
      </swiper>
    </view>
  </view>

  <!--优选商家-->
  <view :style="'top:' + merchantheight + 'px;position:absolute;display:' + merchant" data-name="merchantheight" class="brand_content">
   <!--标题-->
   <view class="main-product-wrap">
    <view class="main-product-title">
      <text class="main-text">优选商家</text>
    </view>
   </view>
   <!--品牌-->
   <view class="brand_main">
     <!--一块-->
     <block v-for="(item, index) in merchant_list" :key="index" v-if="index<8">
      <view v-if="index%4==0" style="border-left:1rpx solid #f0f0f0;" :class="'brand_block ' + (index == 0?'border_top':'')">
        <view @tap="prefer_skip" :data-link="item.linkurl" hover-class="none">
          <image :src="item.imgurl" class="brand_logo"></image>
          <text class="brand_title">{{item.text}}</text>
        </view>
      </view>
      <view v-else :class="'brand_block ' + (index == 1?'border_top':'') + ' ' + (index == 2?'border_top':'') + ' ' + (index == 3?'border_top':'')">
        <view @tap="prefer_skip" :data-link="item.linkurl" hover-class="none">
          <image :src="item.imgurl" class="brand_logo"></image>
          <text class="brand_title">{{item.text}}</text>
        </view>
      </view>
     </block>
   </view>
  </view>

  <!--四张图片部分-->
  <view :style="'top:' + picturewheight + 'px;width:100%;position:absolute;display:' + picturew" data-name="picturewheight">
    <view class="shangpinwrap">
      <view class="product_main">
        <view v-if="cubes_count == 1" class="one_hot_goods">
          <view v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="cubes_list[0].linkurl" @tap="search_hyperlink">
            <image :src="cubes_list[0].imgurl"></image>
          </view>
          <view v-else :data-link_wxapp="cubes_list[0].linkurl" @tap="search_hyperlinkb">
            <image :src="cubes_list[0].imgurl"></image>
          </view>
        </view>
        <view v-else-if="cubes_count == 2" class="tow_hot_goods">
          <view class="tow_hot_left" v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="cubes_list[0].linkurl" @tap="search_hyperlink">
            <image :src="cubes_list[0].imgurl"></image>
          </view>
          <view class="tow_hot_left" v-else :data-link_wxapp="cubes_list[0].linkurl" @tap="search_hyperlinkb">
            <image :src="cubes_list[0].imgurl"></image>
          </view>
          <view class="tow_hot_right" v-if="cubes_list[1].switch_tap == 1" :data-link_wxapp="cubes_list[1].linkurl" @tap="search_hyperlink">
              <image :src="cubes_list[1].imgurl"></image>
          </view>
          <view class="tow_hot_right" v-else :data-link_wxapp="cubes_list[1].linkurl" @tap="search_hyperlinkb">
              <image :src="cubes_list[1].imgurl"></image>
          </view>
        </view>
        <view v-else-if="cubes_count == 3" class="three_hot_good">
          <view class="three_hot_good_left" v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="cubes_list[0].linkurl" @tap="search_hyperlink">
            <image :src="cubes_list[0].imgurl"></image>
          </view>
          <view class="three_hot_good_left" v-else :data-link_wxapp="cubes_list[0].linkurl" @tap="search_hyperlinkb">
            <image :src="cubes_list[0].imgurl"></image>
          </view>
          <view class="three_hot_right">
            <view class="three_hot_up" v-if="cubes_list[1].switch_tap == 1" :data-link_wxapp="cubes_list[1].linkurl" @tap="search_hyperlink">
              <image :src="cubes_list[1].imgurl"></image>
            </view>
            <view class="three_hot_up" v-else :data-link_wxapp="cubes_list[1].linkurl" @tap="search_hyperlinkb">
              <image :src="cubes_list[1].imgurl"></image>
            </view>
            <view class="three_upper" v-if="cubes_list[2].switch_tap == 1" :data-link_wxapp="cubes_list[2].linkurl" @tap="search_hyperlink">
              <image :src="cubes_list[2].imgurl"></image>
            </view>
            <view class="three_upper" v-else :data-link_wxapp="cubes_list[2].linkurl" @tap="search_hyperlinkb">
              <image :src="cubes_list[2].imgurl"></image>
            </view>
          </view>
        </view>
        <view v-else-if="cubes_count == 4" class="hot_goods">
          <view class="hot_goods_right">
            <view class="hot_goods_upper" v-if="cubes_list[1].switch_tap == 1" :data-link_wxapp="cubes_list[1].linkurl" @tap="search_hyperlink">
                <image :src="cubes_list[1].imgurl"></image>
            </view>
              <view class="hot_goods_upper" v-else :data-link_wxapp="cubes_list[1].linkurl" @tap="search_hyperlinkb">
                <image :src="cubes_list[1].imgurl"></image>
            </view>
            <view class="hot_goods_lower_left" v-if="cubes_list[2].switch_tap == 1" :data-link_wxapp="cubes_list[2].linkurl" @tap="search_hyperlink">
                <image :src="cubes_list[2].imgurl"></image>
            </view>
            <view class="hot_goods_lower_left" v-else :data-link_wxapp="cubes_list[2].linkurl" @tap="search_hyperlinkb">
                <image :src="cubes_list[2].imgurl"></image>
            </view>
            <view class="hot_goods_lower_right" v-if="cubes_list[3].switch_tap == 1" :data-link_wxapp="cubes_list[3].linkurl" @tap="search_hyperlink">
                <image :src="cubes_list[3].imgurl"></image>
            </view>
            <view class="hot_goods_lower_right" v-else :data-link_wxapp="cubes_list[3].linkurl" @tap="search_hyperlinkb">
                <image :src="cubes_list[3].imgurl"></image>
            </view>
          </view>
          <view class="hot_goods_left" v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="cubes_list[0].linkurl" @tap="search_hyperlink">
            <image :src="cubes_list[0].imgurl"></image>
          </view>
          <view class="hot_goods_left" v-else :data-link_wxapp="cubes_list[0].linkurl" @tap="search_hyperlinkb">
            <image :src="cubes_list[0].imgurl"></image>
          </view>
        </view>
        <view v-else>
        </view>
      </view>
    </view>
  </view>
  <block v-for="(item, index) in picture_images" :key="index">
    <view :style="'top:' + item.height + 'px;position:absolute;display:' + picture" data-name="pictureheight" class="Ad_pictures">
      <view class="btn">
        <block v-for="(item, index2) in item.list" :key="index2">
          <view v-if="item.switch_tap == 1" :data-link_wxapp="item.linkurl" @tap="search_hyperlink" class="image_cont">
            <image :src="item.imgurl" style="width:100%;height:170px;"></image>
          </view>
          <view v-else :data-link_wxapp="item.linkurl" @tap="search_hyperlinkb" class="image_cont">
            <image :src="item.imgurl" style="width:100%;height:170px;"></image>
          </view>
        </block>
      </view>
    </view>
  </block>

  <!--为您推荐部分  --> 
  <view :style="'top:' + goodsheight + 'px;width:100%;position:absolute;display:' + goods" data-name="goodsheight" class="produnt_show">
    <view class="category_title">
      <text class="title_name color_name">为您推荐</text>
      <view class="title_right recom_right" @tap="merchant_skip">
        <text class="right_more">更多</text>
        <image src="http://wximage.shedongyun.com/sdo2o/cate_right.png" class="cate_right"></image>
      </view>
    </view>
    <view class="recom_wrap recom_main">
      <!--一条-->
      <block v-for="(item, index) in recommands_list" :key="index">
        <view class="module_second" :data-id="item.gid" @tap="prod_detail">
          <view class="module_width">
            <image :src="item.thumb" class="prod_image"></image>
            <view class="merchant_main">
              <view class="merchant_title">{{item.title}}</view>
              <view class="laundy_cond laundy_second">
                <text class="comp_first">已售{{item.sale_num}}</text>
                <text class="comp_firm" v-if="item.merch_type!=''">{{item.merch_type}}</text>
              </view>
              <view class="module_price">￥{{item.price}}</view>
              <view class="comp_wrap" v-if="item.merch_name!=''">
                <image src="http://wximage.shedongyun.com/sdo2o/merchant_logo.png" class="comp_logo"></image>
                <text class="comp_name">{{item.merch_name}}</text>
              </view>
            </view>
          </view>
        </view><!--module_second-->
      </block>
    </view> 
  </view>

  <!--推荐商家-->
  <view class="prefer_merchant" :style="'top:' + shopheight + 'px;width:100%;position:absolute;display:' + shop" data-name="shopheight">
    <!--标题-->
    <view class="main-product-wrap">
      <view class="main-product-title">
        <text class="main-text">推荐商家</text>
      </view>
    </view>
    <view class="prefer_cont">
      <!--一个-->
      <block v-for="(item, index) in shop_list" :key="index">
        <view class="module_line">
          <image :src="item.thumb" class="prod_logo" @tap="shop_detail" :data-shopid="item.merchid"></image>
          <view class="module_main">
            <view class="shop_title" @tap="shop_detail" :data-shopid="item.merchid">{{item.name}}</view>
            <view class="module_clock" v-if="item.operation_times!=''" @tap="shop_detail" :data-shopid="item.merchid">
              <image src="http://wximage.shedongyun.com/sdo2o/clock_logo.png" class="clock_logo"></image>
              <text class="clock_name">{{item.operation_times}}</text>
            </view>
            <view class="module_clock module_posit" v-if="item.address!=''">
              <image src="http://wximage.shedongyun.com/sdo2o/addre_logo.png" class="clock_logo"></image>
              <text class="clock_addre">{{item.address}}</text>
              <text class="dist_addre" v-if="item.distance!=0">{{item.distance}}</text>
              <image src="http://wximage.shedongyun.com/sdo2o/right_logo.png" class="right_logo"></image>
            </view>
            <!--电话-->
            <image src="http://wximage.shedongyun.com/sdo2o/phone_logo.png" class="phone_logo" :data-phone="item.mobile" @tap="call_phone"></image>
          </view>
        </view>
      </block>
    </view>
    <view class="back_line"></view>
  </view>

  <!--类别模块-->
  <view class="category_wrap" :style="'top:' + categoryheight + 'px;width:100%;position:absolute;display:' + category" data-name="categoryheights">
    <block v-for="(item, index) in category_list" :key="index">
      <view class="one_category">
        <view class="category_title category_height">
          <text class="title_name" :data-cid="item.cid" @tap="cate_skip">{{item.text}}</text>
          <view class="title_right" :data-cid="item.cid" @tap="cate_skip">
            <text class="right_more">更多</text>
            <image src="http://wximage.shedongyun.com/sdo2o/cate_right.png" class="cate_right"></image>
          </view>
        </view>
        <view class="category_cont">
          <block v-for="(item, index2) in item.sub_classification" :key="index2">
            <text class="one_cont" :data-sid="item.id" @tap="service_skip">{{item.name}}</text>
          </block>
        </view>
      </view>
    </block>
  </view> 

  <!-- <view v-if="copyright_show=='1'" :style="'top:' + botheight + 'rpx;position:absolute;'" class="Technical_support"> -->
  <view v-if="copyright_show=='1'" class="Technical_support">
    <text class="Technical_support_text">{{ copyright}}</text>
  </view>
</view>


<!--非拖拽-->
<view v-if="code_index == '0'" style="background:#f5f5f5">
  <!--轮播图  -->
  <view style="margin-top:50px" class="header_img">
    <swiper :indicator-dots="indicatorDots" :circular="circular" :autoplay="autoplay" :interval="interval" :duration="duration" style="height:220px;">
      <block v-for="(item, index) in adv_list" :key="index">
        <swiper-item>
          <image :src="item.thumb" :data-link_wxapp="item.link_wxapp" @tap="search_hyperlink" class="slide-image" style="height:220px; width:750rpx;"></image>
        </swiper-item>
      </block>
    </swiper>
  </view>
  <!--搜索框  -->
  <view class="header" :style="headerstyle + ';position:fixed;'">
    <view class="nav">
      <form @submit="search">
        <view class="locate_wrap">
         <text class="locate_name">{{openCityName}}</text>
         <image src="http://wximage.shedongyun.com/sdo2o/search_downs.png" class="search_downs"></image>
        </view>
        <view class="section">
          <input @focus="goSearch" :placeholder="searchplaceholder" type="search" class="input_text" placeholder-class="plholder"></input>
          <image src="http://wximage.shedongyun.com/sdo2o/green_icon.png" class="green_icon"></image>
        </view>      
      </form>
    </view>
  </view>

  <!--快捷菜单  -->
  <view style="height:auto;" class="FrameK">
    <view class="mBottom">
      <block v-for="(item, index) in nav_list" :key="index">
        <view v-if="item.switch_tap == 1" :data-link_wxapp="item.link_wxapp" @tap="search_hyperlink">
          <view class="menu_2">
            <view class="mTu">
              <image :src="item.icon"></image>
            </view>
            <text class="mBiaoTi">{{item.navname}}</text>
          </view>
        </view>
        <view v-else :data-link_wxapp="item.link_wxapp" @tap="search_hyperlinkb">
          <view class="menu_2">
            <view class="mTu">
              <image :src="item.icon"></image>
            </view>
            <text class="mBiaoTi">{{item.navname}}</text>
          </view>
        </view>
      </block>
    </view>
  </view>

  <!--新闻动态部分  -->
  <view class="linear">
    <image src="http://wximage.shedongyun.com/sdfxmall/1.0.0/icon/rrfx_notice.png"></image>
    <view class="gonggao-left">
      <swiper class="swiper_container" vertical="true" autoplay="true" :circular="circular" interval="3000">
        <block v-for="(item, index) in notice_list" :key="index">
            <swiper-item>
              <!-- <text :style="'color:' + color_notice" class="swiper_item">{{item.title}}</text> -->
              <text class="swiper_item">{{item.title}}</text>
            </swiper-item>
        </block>
      </swiper>
    </view>
  </view>

  <!--优选商家-->
  <view class="brand_content">
   <!--标题-->
   <view class="main-product-wrap">
    <view class="main-product-title">
      <text class="main-text">优选商家</text>
    </view>
   </view>
   <!--品牌-->
   <view class="brand_main">
     <!--一块-->
     <block v-for="(item, index) in brands" :key="index">
      <view class="brand_block">
        <image :src="item.images" class="brand_logo"></image>
        <text class="brand_title">{{item.fonts}}</text>
      </view>
     </block>
   </view>
  </view>
  <!--四张图片部分-->
  <view class="shangpinwrap">
    <view class="product_main">
      <view v-if="cubes_count == 1" class="one_hot_goods">
         <view v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="cubes_list[0].link_wxapp" @tap="search_hyperlink">
          <image :src="cubes_list[0].img"></image>
         </view>
         <view v-else :data-link_wxapp="cubes_list[0].link_wxapp" @tap="search_hyperlinkb">
          <image :src="cubes_list[0].img"></image>
         </view>
      </view>
      <view v-else-if="cubes_count == 2" class="tow_hot_goods">
        <view class="tow_hot_left" v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="cubes_list[0].link_wxapp" @tap="search_hyperlink">
           <image :src="cubes_list[0].img"></image>
        </view>
        <view class="tow_hot_left" v-else :data-link_wxapp="cubes_list[0].link_wxapp" @tap="search_hyperlinkb">
           <image :src="cubes_list[0].img"></image>
        </view>

        <view class="tow_hot_right" v-if="cubes_list[1].switch_tap == 1" :data-link_wxapp="cubes_list[1].link_wxapp" @tap="search_hyperlink">
             <image :src="cubes_list[1].img"></image>
        </view>
        <view class="tow_hot_right" v-else :data-link_wxapp="cubes_list[1].link_wxapp" @tap="search_hyperlinkb">
             <image :src="cubes_list[1].img"></image>
        </view>
      </view>
      <view v-else-if="cubes_count == 3" class="three_hot_good">
        <view class="three_hot_good_left" v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="cubes_list[0].link_wxapp" @tap="search_hyperlink">
          <image :src="cubes_list[0].img"></image>
        </view>
        <view class="three_hot_good_left" v-else :data-link_wxapp="cubes_list[0].link_wxapp" @tap="search_hyperlinkb">
          <image :src="cubes_list[0].img"></image>
        </view>

        <view class="three_hot_right">
          <view class="three_hot_up" v-if="cubes_list[1].switch_tap == 1" :data-link_wxapp="cubes_list[1].link_wxapp" @tap="search_hyperlink">
            <image :src="cubes_list[1].img"></image>
          </view>
          <view class="three_hot_up" v-else :data-link_wxapp="cubes_list[1].link_wxapp" @tap="search_hyperlinkb">
            <image :src="cubes_list[1].img"></image>
          </view>
          <view class="three_upper" v-if="cubes_list[2].switch_tap == 1" :data-link_wxapp="cubes_list[2].link_wxapp" @tap="search_hyperlink">
            <image :src="cubes_list[2].img"></image>
          </view>
          <view class="three_upper" v-else :data-link_wxapp="cubes_list[2].link_wxapp" @tap="search_hyperlinkb">
            <image :src="cubes_list[2].img"></image>
          </view>
        </view>
      </view>
      <view v-else-if="cubes_count == 4" class="hot_goods">
        <view class="hot_goods_right">
           <view class="hot_goods_upper" v-if="cubes_list[1].switch_tap == 1" :data-link_wxapp="cubes_list[1].link_wxapp" @tap="search_hyperlink">
              <image :src="cubes_list[1].img"></image>
           </view>
            <view class="hot_goods_upper" v-else :data-link_wxapp="cubes_list[1].link_wxapp" @tap="search_hyperlinkb">
              <image :src="cubes_list[1].img"></image>
           </view>
           <view class="hot_goods_lower_left" v-if="cubes_list[2].switch_tap == 1" :data-link_wxapp="cubes_list[2].link_wxapp" @tap="search_hyperlink">
              <image :src="cubes_list[2].img"></image>
           </view>
           <view class="hot_goods_lower_left" v-else :data-link_wxapp="cubes_list[2].link_wxapp" @tap="search_hyperlinkb">
              <image :src="cubes_list[2].img"></image>
           </view>
           <view class="hot_goods_lower_right" v-if="cubes_list[3].switch_tap == 1" :data-link_wxapp="cubes_list[3].link_wxapp" @tap="search_hyperlink">
              <image :src="cubes_list[3].img"></image>
           </view>
           <view class="hot_goods_lower_right" v-else :data-link_wxapp="cubes_list[3].link_wxapp" @tap="search_hyperlinkb">
              <image :src="cubes_list[3].img"></image>
           </view>
        </view>
        <view class="hot_goods_left" v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="cubes_list[0].link_wxapp" @tap="search_hyperlink">
          <image :src="cubes_list[0].img"></image>
        </view>
        <view class="hot_goods_left" v-else :data-link_wxapp="cubes_list[0].link_wxapp" @tap="search_hyperlinkb">
          <image :src="cubes_list[0].img"></image>
        </view>
      </view>
      <view v-else>
      </view>
    </view>
    <view class="Ad_pictures">
      <view class="btn" v-if="cubes_list[0].switch_tap == 1" :data-link_wxapp="adv_images_link" @tap="search_hyperlink">
        <image :src="adv_images" style="width:100%;height:400rpx;"></image>
      </view>
      <view class="btn" v-else :data-link_wxapp="adv_images_link" @tap="search_hyperlinkb">
        <image :src="adv_images" style="width:100%;height:400rpx;"></image>
      </view>
    </view>
  </view>

  <!--为您推荐部分  -->
  <view class="category_title">
    <text class="title_name color_name">为您推荐</text>
    <view class="title_right">
      <text class="right_more">更多</text>
      <image src="http://wximage.shedongyun.com/sdo2o/cate_right.png" class="cate_right"></image>
    </view>
  </view>
  <view class="recom_wrap">
    <block v-for="(item, index) in recommands_list" :key="index" class="foor_title_img">
      <navigator :url="'/pages/goods/goods?goods_id=' + item.id">
        <view class="goods_list" @tap="go_shop_list">
          <image :src="item.thumb"></image>
          <text class="goods_title">{{item.title}}</text>
          <text class="goods_pic">￥{{item.marketprice}}</text>
        </view>
      </navigator>
    </block>
  </view>
  <view class="borderh6"></view>
  <view class="blockh1"></view>

  <block v-for="(item, index) in best_list" :key="index">
    <navigator :url="'/pages/goods/goods?goods_id=' + item.goods_id">
      <view class="goods_list goods_box" @tap="go_shop_list">
        <image :src="item.goods_thumb"></image>
        <text class="goods_title_01">{{item.goods_name}}</text>
        <text class="goods_pic">￥{{item.shop_price}}</text>
      </view>
    </navigator>
  </block>

  <view v-if="copyright_show=='1'" :style="'top:' + botheight + 'rpx;position:absolute;'" class="Technical_support">
    <text class="Technical_support_text">{{ copyright}}</text>
  </view>
</view>
<view class="back_back"></view>

<!--授权弹框-->
<!-- <view class="auth_mask" style='{{login_state}}'>
  <view class="accredit">
    <view class="prompt_title">提示</view>
    <view class="prompt_main">
      <image src='{{wechat_xcx_logo}}' class="she_logo"></image>
      <text class="prompt_cont">{{wechat_xcx_prompt}}</text>
    </view>
    <view class="prompt_wrap" bindtap="close_skip">
    <button open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo" class="user_info" >确定进入该小程序</button>
    </view>
  </view>
</view>  -->
</view>
</template>

<script>
var startY;
var endY;
var Y_number = 0;
var app = getApp();
var page = 1;
var load_more = 0;
var bannerurl;
var bannerurl_list;
var select = "pro";
var picture = new Array();

export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      circular: true,
      interval: 5000,
      duration: 1000,
      indicatorColor: '#fff',
      indicatorActiveColor: '#fe4644',
      giantView: "false",
      page_data: 'shop',
      searchplaceholder: '请输入关键字',
      headerstyle: '',
      promoter_list: '',
      hot_list: '',
      best_list: '',
      load_footer: '正在加载',
      cart_number: 0,
      user_notice: '',
      navigationBarTitleText: '',
      copyright: app.globalData.copyright,
      hide: "hide",
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
      sexth: "",
      seventh: "",
      banner: "none",
      search: "none",
      menu: "none",
      notice: "none",
      picturew: "none",
      picture: "none",
      goods: "none",
      storelist: "none",
      typelist: "none",
      remmendlist: "none",
      msgList: [],
      tabSelectname: "宝贝",
      shop: 'none',
      openCityName: "",
      copyright_show: "",
      code_index: "",
      recommands_list: "",
      cubes_list: "",
      cubes_count: "",
      notice_list: "",
      adv_list: "",
      nav_list: "",
      searchheights: "",
      menuheights: "",
      menu_list: "",
      goodsheights: "",
      noticeheights: "",
      notice_img: "",
      picture_images: "",
      bannerheights: "",
      picturewheights: "",
      shopheights: "",
      shop_list: "",
      merchantheights: "",
      merchant: "",
      merchant_list: "",
      categoryheights: "",
      category: "",
      category_list: "",
      searchheight: "",
      menuheight: "",
      goodsheight: "",
      noticeheight: "",
      pictureheight: "",
      bannerheight: "",
      picturewheight: "",
      shopheight: "",
      eveheight: "",
      merchantheight: "",
      categoryheight: "",
      adv_images: "",
      adv_images_link: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    //城市是否开通服务接口
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.setStorageSync('theLatitude', res.latitude);
        wx.setStorageSync('theLongitude', res.longitude);
        app.globalData.getLocate();
        wx.request({
          method: 'get',
          url: app.globalData.domain,
          data: {
            a: "login",
            do: "wxloaction",
            lng: longitude,
            lat: latitude,
            key: app.globalData.key
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            // console.log('城市', res);

            if (res.data.code == 1) {
              that.setData({
                openCityName: res.data.data
              });
            } else {
              wx.showToast({
                title: '城市未开通服务',
                icon: 'success',
                duration: 2000
              });
            }
          },
          fail: function () {}
        });
      }
    }); //顶部标题

    var bar_title = '';
    wx.request({
      method: 'GET',
      url: app.globalData.domain,
      data: {
        a: "login",
        do: "shop_info",
        key: app.globalData.key
      },
      success: function (res) {
        bar_title = res.data.data.name;
        wx.setNavigationBarTitle({
          title: bar_title
        });
        that.setData({
          copyright_show: res.data.data.copyrights
        });
        app.globalData.bar_title = bar_title;
      }
    }); //拖拽

    that.drag_drop(); //登录字段获取
    // that.field_obtain();
    //查看是否授权
    // if (wx.getStorageSync('userInfo')) {
    //   app.openid = wx.getStorageSync('userInfo').openid;
    //   app.userInfo = wx.getStorageSync('userInfo');
    //   that.setData({
    //     login_state: 'display:none'
    //   })
    // } else {
    //   that.setData({
    //     login_state: 'display:block'
    //   })
    // }
  },
  // 获取当前登录微信用户信息
  // bindGetUserInfo: function (from_share_uid = 0) {
  //   var that = this;
  //   try {
  //     var userInfo = wx.getStorageSync('userInfo');
  //   } catch (e) {
  //     var userInfo = false;
  //   }
  //   if (!userInfo || from_share_uid) {
  //     wx.login({
  //       success: function (res) {
  //         console.log('login+++++',res);
  //         if (res.code) {
  //           console.log('9999999+++++');
  //           wx.getUserInfo({
  //             success: function (res2) {
  //               console.log('res2信息++',res2);
  //               console.log('app.from_share_uid', app.from_share_uid);
  //               var userInfo = res2.userInfo
  //               var nickName = userInfo.nickName
  //               var avatarUrl = userInfo.avatarUrl
  //               var gender = userInfo.gender
  //               wx.request({
  //                 url: app.domain,
  //                 header: {
  //                   'Content-Type': 'application/json'
  //                 },
  //                 data: {
  //                   a: 'login',
  //                   do: 'Wx_login',
  //                   js_code: res.code,
  //                   nickName: nickName,
  //                   avatarUrl: avatarUrl,
  //                   gender: gender,
  //                   from_share_uid: app.from_share_uid,
  //                   key: app.key
  //                 },
  //                 success: function (res) {
  //                   console.log('用户信息',res)
  //                   if (res.data.code == 1) {
  //                     app.openid = res.data.data.openid;
  //                     app.userInfo = res.data.data;
  //                     console.log('第一次授权openid', app.openid);
  //                     console.log('第一次授权userInfo', app.userInfo);
  //                     try {
  //                       wx.setStorageSync('userInfo', res.data.data);
  //                     } catch (e) {
  //                       console.log('保存用户信息到缓存出错！');
  //                     }
  //                   }
  //                 }
  //               })
  //             }
  //           })
  //         }
  //       }
  //     });
  //   }else{
  //     return userInfo; 
  //   }
  // },
  // close_skip:function(){
  //   var that=this;
  //   that.setData({
  //    login_state: 'display:none'
  //   })
  // },
  onShow: function () {
    var that = this;
    var judge_city = app.globalData.switch_type;

    if (judge_city == 1) {
      that.setData({
        openCityName: app.globalData.currLocate
      });
    } else {}
  },
  //转发分享按钮
  onShareAppMessage: function () {
    return app.globalData.goShareApp('/pages/index');
  },
  methods: {
    bodytouchmove: function (m) {
      var touch = m.touches[0]; // startX = touch.clientX;

      startY = touch.clientY;
    },
    bodytouchend: function (m) {
      var touch = m.touches[0];
      endY = touch.clientY - startY;

      if (endY < 0) {
        Y_number = Y_number + endY;
      } else {
        // 向上在滑
        Y_number = 0;
      }

      if (Y_number < '-300') {
        this.setData({
          headerstyle: 'background: #dbd9cd;'
        });
      } else {
        this.setData({
          headerstyle: ''
        });
      }
    },
    //拖拽
    drag_drop: function () {
      var that = this;
      var lng = app.globalData.currLongitude;
      var lat = app.globalData.currLatitude;
      wx.request({
        method: "get",
        url: app.globalData.domain,
        data: {
          a: "diy",
          do: "display",
          key: app.globalData.key,
          lng: lng,
          lat: lat
        },
        success: function (res) {
          var s = 0;
          that.setData({
            code_index: res.data.code
          });

          if (res.data.code == "0") {
            // console.log('非拖拽+++'); //商品展示

            wx.request({
              method: 'GET',
              url: app.globalData.domain,
              data: {
                a: 'recommands',
                do: 'display',
                key: app.globalData.key
              },
              success: function (res) {
                if (res.data.code == 1) {
                  that.setData({
                    recommands_list: res.data.data
                  });
                }
              }
            }); //热卖

            wx.request({
              method: 'GET',
              url: app.globalData.domain,
              data: {
                a: 'cubes',
                do: 'display',
                key: app.globalData.key
              },
              success: function (res) {
                // console.log(res.data.data.cubes);

                if (res.data.code == 1) {
                  that.setData({
                    cubes_list: res.data.data.cubes,
                    cubes_count: res.data.data.cubes_count
                  });
                }
              }
            }); //公告

            wx.request({
              method: 'GET',
              url: app.globalData.domain,
              data: {
                a: 'notice',
                do: 'display',
                key: app.globalData.key
              },
              success: function (res) {
                // console.log(res.data.data);

                if (res.data.code == 1) {
                  that.setData({
                    notice_list: res.data.data
                  });
                }
              }
            }); //查询轮播图

            wx.request({
              method: 'GET',
              url: app.globalData.domain,
              data: {
                a: 'adv',
                do: 'display',
                key: app.globalData.key
              },
              success: function (res) {
                // console.log('轮播图',res)
                if (res.data.code == 1) {
                  that.setData({
                    adv_list: res.data.data
                  });
                }
              }
            });
            wx.request({
              method: 'GET',
              url: app.globalData.domain,
              data: {
                a: 'nav',
                do: 'display',
                key: app.globalData.key
              },
              success: function (res) {
                if (res.data.code == 1) {
                  that.setData({
                    nav_list: res.data.data
                  });
                }
              }
            });
            that.load_goods_list();
            that.load_adv_list();
          }

          if (res.data.code == "1") {
            // console.log('拖拽+++');
            var length = res.data.data.data.items.length;
            var searchheight = 0;
            var bannerheight = 0;
            var menuheight = 0;
            var noticeheight = 0;
            var shopheight = 0;
            var picturewheight = 0;
            var pictureheight = 0;
            var goodsheight = 0;
            var storelist = 0;
            var typelist = 0;
            var remmendlist = 0;
            var merchantheight = 0;
            var categoryheight = 0;
            var aalheight = [];
            var i = "";

            for (i = 0; i < length; i++) {
              var first = res.data.data.data.items[i];
              var firstid = res.data.data.data.items[i].id;
              var height = 0;

              if (firstid == "search") {
                //搜素
                aalheight[i] = 55;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                searchheight = height;
                that.setData({
                  search: "block",
                  searchheights: aalheight[i]
                });
              }

              if (firstid == "menu") {
                //快捷菜单
                var cd = res.data.data.data.items[i].data.length;
                var m = Math.ceil(cd / 4);
                aalheight[i] = 96 * m + 25;
                var height = 0;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                menuheight = height;
                that.setData({
                  menuheights: aalheight[i],
                  menu: "block",
                  menu_list: res.data.data.data.items[i].data
                });
              }

              if (firstid == "goods") {
                //为您推荐
                var n = res.data.data.data.items[i].data.length;
                aalheight[i] = 40 + 131 * n;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                goodsheight = height;
                that.setData({
                  goodsheights: aalheight[i],
                  goods: "block",
                  recommands_list: res.data.data.data.items[i].data
                });
              }

              if (firstid == "group") {
                aalheight[i] = 0;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }
              }

              if (firstid == "notice") {
                //公告栏
                var n = res.data.data.data.items[i].data.length;
                aalheight[i] = 51;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                noticeheight = height;
                that.setData({
                  noticeheights: aalheight[i],
                  notice: "block",
                  notice_list: res.data.data.data.items[i].data,
                  notice_img: res.data.data.data.items[i].params.iconurl
                });
              }

              if (firstid == "picture") {
                var n = res.data.data.data.items[i].data.length;
                aalheight[i] = 170;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                pictureheight = height;
                var picturelist = new Array();
                var picturelist = {
                  height: pictureheight,
                  list: res.data.data.data.items[i].data
                };
                picture.push(picturelist);
                // console.log("广告", picture);
                that.setData({
                  picture: "block",
                  picture_images: picture
                });
              }

              if (firstid == "banner") {
                //轮播图
                aalheight[i] = 185;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                bannerheight = height;
                that.setData({
                  bannerheights: aalheight[i],
                  banner: "block",
                  adv_list: res.data.data.data.items[i].data
                });
                // console.log('that.adv_list',that.adv_list)
              }

              if (firstid == "picturew") {
                //四张图片
                aalheight[i] = 200;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                picturewheight = height;
                that.setData({
                  picturewheights: aalheight[i],
                  picturew: "block",
                  cubes_list: res.data.data.data.items[i].data,
                  cubes_count: res.data.data.data.items[i].data.length
                });
              }

              if (firstid == "shop_list") {
                //推荐商家
                var n = res.data.data.data.items[i].data.length;
                aalheight[i] = 51 + 130 * n;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                if (app.globalData.changestore == 0) {
                  wx.setNavigationBarTitle({
                    title: res.data.data.data.items[i].data.store_info_name
                  });
                }

                shopheight = height;
                that.setData({
                  shopheights: aalheight[i],
                  shop: "block",
                  shop_list: res.data.data.data.items[i].data
                });
              }

              if (firstid == "preferred_business") {
                //优选商家
                var n = res.data.data.data.items[i].data.length;

                if (n > 8) {
                  n = 8;
                }

                var m = Math.ceil(n / 4);
                aalheight[i] = 81 + 115 * m;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                merchantheight = height;
                that.setData({
                  merchantheights: aalheight[i],
                  merchant: "block",
                  merchant_list: res.data.data.data.items[i].data
                });
              }

              if (firstid == "recommended_classification") {
                //类别
                var n = res.data.data.data.items[i].data.length;
                aalheight[i] = 90 * n;

                for (var m = 0; m < i; m++) {
                  height += aalheight[m];
                }

                categoryheight = height;
                that.setData({
                  categoryheights: aalheight[i],
                  category: "block",
                  category_list: res.data.data.data.items[i].data
                });
              }
            }

            var eveheight = 0;
            var i = res.data.data.data.items.length;
            // console.log('i值', i);

            for (var m = 0; m < i; m++) {
              // console.log('111', aalheight[m]);
              eveheight += aalheight[m];
            }

            eveheight = eveheight;
            // console.log('eveheight', eveheight);
            that.setData({
              searchheight: searchheight,
              menuheight: menuheight,
              goodsheight: goodsheight,
              noticeheight: noticeheight,
              pictureheight: pictureheight,
              bannerheight: bannerheight,
              picturewheight: picturewheight,
              shopheight: shopheight,
              eveheight: eveheight,
              merchantheight: merchantheight,
              categoryheight: categoryheight
            });
          }
        }
      }); //三个无关

      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'notice',
          do: 'display',
          key: app.globalData.key
        },
        success: function (res) {
          // console.log(res.data.data);

          if (res.data.code == 1) {
            that.setData({});
          }
        }
      });
      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'recommands',
          do: 'display',
          key: app.globalData.key
        },
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({});
          }
        }
      });
      wx.request({
        method: 'GET',
        url: app.globalData.domain,
        data: {
          a: 'cubes',
          do: 'display',
          key: app.globalData.key
        },
        success: function (res) {
          // console.log(res.data.data.cubes);

          if (res.data.code == 1) {
            that.setData({});
          }
        }
      });
    },
    //商品推荐——未拖拽
    load_goods_list: function () {
      if (load_more == 0) {
        page++;
        var that = this;
        wx.request({
          method: 'GET',
          url: app.globalData.domain,
          data: {
            act: 'ajax_goods_list',
            page: page,
            is_best: 1
          },
          success: function (res) {
            if (res.data.err == 0) {
              that.setData({
                best_list: that.best_list.concat(res.data.best_list)
              });

              if (res.data.list_count == 0) {
                that.setData({
                  load_footer: '没有更多推荐商品了...'
                });
                load_more = 1;
              }
            }
          }
        });
      }
    },
    //搜索跳转
    goSearch: function () {
      var that = this;
      wx.navigateTo({
        url: '/pages/search/search'
      });
    },
    //一张广告图片——未拖拽
    load_adv_list: function () {
      var that = this;
      wx.request({
        url: app.globalData.domain,
        data: {
          c: 'ewei_shopv2',
          a: 'banner',
          do: 'display',
          key: app.globalData.key
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // console.log("、测试广告", res.data.data);
          that.setData({
            adv_images: res.data.data.thumb,
            adv_images_link: res.data.data.link_wxapp
          });
        }
      });
    },
    // 图片超链接事件
    search_hyperlink: function (e) {
      var con = e.currentTarget.dataset.cid;
      app.globalData.menucid = con;
      // console.log('点击了轮播图',e);
      var link_wxapp = e.currentTarget.dataset.link_wxapp;
      uni.switchTab({
        url: link_wxapp
      });
    },
    search_hyperlinkb: function (e) {
      console.log('点击了',e)
      var link_wxapp = e.currentTarget.dataset.link_wxapp;
      uni.navigateTo({
        url: link_wxapp
      });
    },
    // 登录字段获取
    // field_obtain:function(){
    //   var that=this;
    //   wx.request({
    //     url: app.domain,
    //     data: {
    //       a: 'login',
    //       do: 'wx_prompt',
    //       key: app.key,
    //     },
    //     header: {
    //       'Content-Type': 'application/json'
    //     },
    //     success: function (res) {
    //       if(res.data.code==1){
    //         that.setData({
    //           wechat_xcx_prompt: res.data.data.wechat_xcx_prompt,
    //           wechat_xcx_logo: res.data.data.wechat_xcx_logo
    //         })
    //       }
    //     }
    //   })
    // },
    // 推荐商家跳转
    shop_detail: function (e) {
      // console.log('商家爱跳转',e)
      var that = this;
      var shop_id = e.currentTarget.dataset.shopid;
      uni.navigateTo({
        url: '/pages/shop/shop_detail/shop_detail?id=' + shop_id
      });
    },
    // 为您推荐跳转
    prod_detail: function (e) {
      var that = this;
      var good_id = e.currentTarget.dataset.id;
      uni.navigateTo({
        url: '/pages/goods/goods?goods_id=' + good_id
      });
    },
    //为您推荐更多跳转
    merchant_skip: function () {
      var that = -this;
      uni.navigateTo({
        url: '/pages/category/category'
      });
    },
    //类别跳转
    //1、主分类和更多跳转到分类
    cate_skip: function (e) {
      var that = this;
      uni.navigateTo({
        url: '/pages/gcates/gcates'
      });
    },
    //2、二级分类的服务列表跳转
    service_skip: function (e) {
      var that = this;
      var cate_id = e.currentTarget.dataset.sid;
      uni.navigateTo({
        url: '/pages/category/category?cat_id=' + cate_id
      });
    },
    // 推荐商家拨打电话
    call_phone: function (e) {
      var that = this;
      var phone_value = e.currentTarget.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone_value
      });
    },
    //城市切换跳转
    city_switch: function (e) {
      var that = this;
      var current_city = e.currentTarget.dataset.current;
      uni.navigateTo({
        url: '/pages/service_city/service_city?current_city=' + current_city
      });
    },
    //优选商家跳转
    prefer_skip: function (e) {
      var that = this;
      var link_value = e.currentTarget.dataset.link;

      if (link_value == '/pages/index') {
        uni.switchTab({
          url: link_value
        });
      } else if (link_value == '/pages/gcates/gcates') {
        uni.navigateTo({
          url: link_value
        });
      } else if (link_value == '/pages/user/distribution_center/distribution_center') {
        uni.switchTab({
          url: link_value
        });
      } else if (link_value == '/pages/user/index') {
        uni.switchTab({
          url: link_value
        });
      } else {
        uni.navigateTo({
          url: link_value
        });
      }
    },
    //查询轮播图
    searchSliders: function () {
      var that = this; //接口请求新闻列表数据
    }
  }
};
</script>
<style>
@import "./index.css";
</style>