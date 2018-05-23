var topJson = require('./data/ban_list.json');
var bookDetail = require('./data/bookDetail.json');
var home = require('./data/home.json');
var searchKey = require('./data/searchKey.json');

//瀑布流
var pbl00 = require('./data/data_pb.json');

//搜索信息
var search = require('./data/search_list.json');

//模拟一页弃妃
var yiye = require('./data/yiyeqifei.json');

var objData = {
    '/api/list': topJson,
    '/api/bookDetail': bookDetail,
    '/api/home': home,
    '/api/searchKey': searchKey,
    '/random/pbl': pbl00,
    '/api/search_list': search,
    '67840': yiye,
}
module.exports = function(url) {
    return objData[url];
}