var topJson = require("./data/ban_list.json");
var bookDetail = require("./data/bookDetail.json");
var home = require("./data/home.json");
var searchKey = require("./data/searchKey.json");

var objData = {
    "/api/list": topJson,
    "/api/bookDetail": bookDetail,
    "/api/home": home,
    "/api/searchKey": searchKey,
}
module.exports = function(url) {
    return objData[url];
}