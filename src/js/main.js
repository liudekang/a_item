require.config({
    baseUrl: "/js/",
    paths: {
        //配置公共代码
        "jquery": "lib/jquery01",
        "headr": "lib/handlebars-v4.0.11",
        "text": "lib/text",
        "jsonp": "lib/jquery.jsonp",
        "swiper": "lib/swiper", //引入
        "iscroll": "lib/iscroll-probe", //引入
        "bscroll": "lib/bscroll", //引入
        "base64": "lib/jquery.base64", //引入

        //自己封装的公用代码段
        "render": "common/render",
        "items": "common/items",
        "GetSlideDirection": "common/GetSlideDirection",

        //对应相应页面的js文件
        "index": "app/index",
        "sear_page": "app/sear_page",
        "detail_page": "app/detail_page",
        "read_page": "app/read_page",
        "directory_page": "app/directory_page",
        "login_page": "app/login_page",

        //模板
        "handle_tpl": "../page_tpl/index_handle_tpl.html",
        "head_tpl": "../page_tpl/head_handle_tpl.html",
        "ser_tpl": "../page_tpl/sear_handle_tpl.html",
        "detail_list_tpl": "../page_tpl/detail_list_tpl.html",
        "directory_page_tpl": "../page_tpl/directory_page_tpl.html",
        "read_handle_tpl": "../page_tpl/read_handle_tpl.html",
        "login_handle_tpl": "../page_tpl/login_handle_tpl.html",
    },
    shim: {
        "base64": {
            deps: ["jquery"] // deps 为数组,表示其依赖的库, exports 表示输出的对象名
        }
    }
    //     　cate:"/js/product/Category" 该文件是非AMD规范的JS,在使用的过程中遵循如下几个步骤:

    // 　　(1) paths 中配置文件加载的路径, JSON中的 Key值可以随意,尽量有意义，JSON中的Value是文件的加载路径,这个不必多说

    // 　　(2) shim 中定义一个JSON对象, Key 值(cate) 与paths中定义的名字一样

    // 　　(3) shim中的JSON对象有两个属性: deps,exports ;  deps 为数组,表示其依赖的库, exports 表示输出的对象名
});