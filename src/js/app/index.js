require(["jquery", "swiper", "bscroll", "render", "GetSlideDirection", "text!handle_tpl", "text!head_tpl"], function($, swiper, bscroll, render, GetSlideDirection, handle_tpl, head_tpl) {
    $("body").append(handle_tpl);
    $("body").append(head_tpl);
    var pagenum = 0;
    //渲染首页结构
    render({}, $("#index_html"), $(".wrap"));
    //首页的大轮播结构
    var mySwiper = new swiper('.index_scroll', {
        speed: 300,
        on: {
            slideChangeTransitionStart: function() {
                $(".head_inner span").eq(this.activeIndex).addClass("active").siblings().removeClass("active");
                if (this.activeIndex == 1) {
                    $("b.line").addClass("move");
                } else {
                    $("b.line").removeClass("move");
                }
            },
        },
    });
    //点击切换首页的书城和书架
    $(".head_inner span").on("click", function() {
        //切换到指定slide，速度为300毫秒
        mySwiper.slideTo($(this).index(), 300, true);
    });
    //首页书城，书架的bscroll
    var bcroll_shuc = new bscroll(".shu_c", {
        probeType: 2,
        click: true,
        scrollbar: true
    });

    //获取瀑布流的数据
    var start = pagenum * 10;
    $.ajax({
        url: "/random/pbl?start=" + start + "&count=10",
        dataType: "json",
        success: function(data) {
            //获取瀑布流列表——列表数据
            render(data, $("#falls_data_list"), $(".falls_list .falls_list_inner"));
            //获取书架——列表数据
            render(data, $("#sj_data"), $(".sj_list .sj_list_inner"));
        }
    });
    //只写了 下拉刷新模块
    var drog_down = "下拉可刷新";
    var drog_up = "松开以刷新";
    var drog_height = $(".drag_down").height();
    bcroll_shuc.on("scroll", function() {
        if (this.y > drog_height * 1.2) {
            $(".drag_down").addClass("up").children("p").html(drog_up);
        } else if (this.y > drog_height * 0.6) {
            $(".drag_down").removeClass("up").children("p").html(drog_down);
        }
    });
    bcroll_shuc.on("scrollEnd", function() {
        $(".drag_down").removeClass("up").children("p").html(drog_down);
    });
    bcroll_shuc.on("touchEnd", function() {
        if (bcroll_shuc.y >= 0) {
            if ($(".drag_down").children("p").html() === drog_up) {
                pagenum++;
                $(".wrap").html();
                window.location.reload();
            }
        }
    });

    //获取首页数据
    $.ajax({
        url: "/api/home",
        dataType: "json",
        success: function(data) {
            //获取首页轮播数据
            render(data.items[0].data, $("#index_swp"), $(".index_banner .index_banner_wrap"));
            var mySwiper = new swiper('.index_banner_inner', {
                loop: true,
                autoplay: true
            });
            //获取本周最火章节——列表数据
            render(data.items[1].data, $("#day_hot_list"), $(".day_hot .day_hot_list"));
            //获取重磅推荐列表——列表数据
            render(data.items[2].data, $("#heavy_list_list"), $(".heavy_list .heavy_list_inner"));
            //获取女生最爱列表——列表数据
            render(data.items[3].data, $("#girl_data_list"), $(".girl_list .girl_list_inner"));
            //获取男生最爱列表——列表数据
            render(data.items[4].data, $("#boy_data_list"), $(".boy_list .boy_list_inner"));
            //获取限时免费章节——列表数据
            render(data.items[5].data, $("#tody_free_list"), $(".tody_free .tody_free_list"));
            //获取精选专题章节——列表数据
            render(data.items[6].data, $("#best_data_list"), $(".best_list .best_list_inner"));
        }
    });
    //书架模块——点击切换类型——列表排列或者简易排列
    $(".shu_j_btn").on("click", function() {
        $(this).toggleClass("active");
        $(".sj_list_inner").toggleClass("sj_easy_list");
    });

    //书城搜索——点击切换--切换到搜索页
    $(".btn_search").on("click", function() {
        var search_html = `<div class="search"></div>`;
        $("#root").append(search_html);
        render({}, $("#s_html"), $(".search"));
        //获取搜索默认的数据
        $.ajax({
            url: "/api/search_list",
            dataType: "json",
            success: function(data) {
                //获取书架——列表数据
                $(".s_get").html("");
                $(".s_default").show().siblings().hide();

                render(data.ads, $("#search_list"), $(".s_content .s_default"));
            },
            error: function(err) {
                console.warn(err)
            }
        });

        $(".s_get").html("");
        $(".s_default").show().siblings().hide();
        //位移root大盒子——根据盒子数量
        var len_root_div = $("#root >div").length;
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });
    });

    //点击兵王，跳转兵王的详情页
    $(".bingwang").on("click", function() {
        //兵王的详情页——初始化渲染
        var detail_html = `<div class="detail"><div class="d_header"></div><div class="d_cont"></div></div>`;
        $("#root").append(detail_html);

        render({ title: "大时代" }, $("#head_tpl"), $(".detail .d_header"));
        render({ title: "目录" }, $("#head_tpl"), $(".page_header"));
        $.ajax({
            url: "/api/datailList",
            dataType: "json",
            success: function(data) {
                //获取书架——列表数据
                render(data, $("#detail_list"), $(".d_cont"));
            },
            error: function(err) {
                console.warn(err)
            }
        });
        //位移root大盒子——根据盒子数量
        var len_root_div = $("#root >div").length;
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });
    });
    //点击登录页面跳转
    $(".wrap .head_icon").on("click", function() {
        //登录页——初始化渲染
        var login_html = `<div class="login"> </div>`;
        $("#root").append(login_html);

        render({}, $("#login_html"), $("#root .login"));


        //位移root大盒子——根据盒子数量
        var len_root_div = $("#root >div").length;
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });
    })
});