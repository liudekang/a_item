var topJson = require('./data/ban_list.json');
var bookDetail = require('./data/bookDetail.json');
var home = require('./data/home.json');
var searchKey = require('./data/searchKey.json');

//瀑布流
var pbl00 = require('./data/data_pb.json');

//搜索信息
var search = require('./data/search_list.json');

//模拟一页弃妃-----模糊搜索
var yiye = require('./data/yiyeqifei.json');

//模拟兵王-----详情页
var bingwang = require('./data/bingwang.json');
//模拟兵王-----目录页
var chapter = require("./data/chapter.json");
//模拟兵王-----内容----jsonp请求回来

var bingwang_page = require('./data/bingwang_txt.json');

var bingwang_page_chapter = require('./data/bingwang_page_chapter.json');

var objData = {
    '/api/list': topJson,
    '/api/bookDetail': bookDetail,
    '/api/home': home,
    '/api/searchKey': searchKey,
    '/random/pbl': pbl00,
    '/api/search_list': search,
    '67840': yiye,
    // '30047': bingwang,
    '/api/datailList': bingwang,
    '/api/bingwang_page': bingwang_page,
    '/api/bingwang_page_chapter': bingwang_page_chapter,
    "/api/chapter": chapter
}
module.exports = function(url) {
    return objData[url];
}