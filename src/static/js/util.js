//util.js
function json2Form(json) {
  var str = [];

  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }

  return str.join("&");
}

function page_footer_menu(that) {
  // 点亮菜单
  switch (that.__route__) {
    case 'pages/index/index':
      return 'index';
      break;

    case 'pages/user/user':
      return 'user';
      break;

    case 'pages/shop/shop':
      return 'shop';
      break;

    case 'pages/message/message':
      return 'message';
      break;

    default:
      return false;
  }
}

module.exports = {
  json2Form: json2Form,
  page_footer_menu: page_footer_menu
};