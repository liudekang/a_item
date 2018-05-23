require.config({
    baseUrl: "/js/",
    paths: {
        "jquery": "libs/jquery01",
        "headr": "libs/handlebars-v4.0.11",
        "text": "lib/text",
        "swiper": "libs/swiper-4.1.6/js/swiper", //引入
        "iscroll": "libs/iscroll各个版本/iscroll-probe", //引入
        "bscroll": "libs/bscroll", //引入
        // "swp": "swp", //定义swiper
        // "reload": "reload",
        "render": "common/render",
        "GetSlideDirection": "common/GetSlideDirection",

        "items": "common/items",

        //对应相应的页面
        "index": "app/index",
        "sear_page": "app/sear_page",
        "detail_page": "app/detail_page",
        "read_page": "app/read_page",

        //模板
        "handle_tpl": "../page_tpl/index_handle_tpl.html",
        "head_tpl": "../page_tpl/head_handle_tpl.html",
        "ser_tpl": "../page_tpl/sear_handle_tpl.html"
    }
});
// require(["index"]);
// require(["sear_page"]);