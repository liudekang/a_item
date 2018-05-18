// require(["jquery", "headr", "bscroll", "render", "swiper"], function($, Headlebars, bscroll, render, swiper) {
require(["jquery", "swiper", "bscroll"], function($, swiper, bscroll) {
    var pagenum = 0;
    //首页的大轮播结构
    var mySwiper = new swiper('.index_scroll', {
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
    $(".head_inner span").on("click", function() {
        mySwiper.slideTo($(this).index(), 1000, true);
        //切换到指定slide，速度为1秒
    });
    //首页书城，书架的bscroll
    var bscl = new bscroll(".shu_c", {
        probeType: 2,
        click: true
    });
    var bscl = new bscroll(".shu_j", {
        probeType: 2,
        click: true
    });


    function req_data() {
        $.ajax({
            url: "/api/list",
            dataType: "json",
            success: function(data) {
                console.log(data);
                // loadscroll(data);
            }
        });
    }
    req_data();

    // $.ajax({
    //     url: "/api/swiper",
    //     dataType: "json",
    //     success: function(data) {
    //         // console.log(data);
    //         render(data, $("#swp"), $(".ban"));
    //         var mySwiper = new swiper('.parent', {
    //             // direction: 'vertical',
    //             loop: true,
    //             autoplay: true,
    //             // 如果需要分页器
    //             pagination: {
    //                 el: '.page',
    //             },
    //             // 如果需要滚动条
    //             scrollbar: {
    //                 el: '.bar',
    //             },
    //         })
    //     }
    // });

    // function req_data() {
    //     $.ajax({
    //         url: "/api/list",
    //         dataType: "json",
    //         success: function(data) {
    //             // console.log(data);
    //             loadscroll(data);
    //         }
    //     });
    // }
    // req_data();

    // function loadscroll(data) {
    //     render(data, $("#list"), $(".in"));
    //     bscl.refresh();

    //     bscl.on("scroll", function() {
    //         // console.log(this.y, this.maxScrollY)
    //         if (this.y < this.maxScrollY - 80) {
    //             $(".sect").attr("data-aft", "松开!!");
    //         } else if (this.y < this.maxScrollY - 20) {
    //             $(".sect").attr("data-aft", "上拉加载更多...");
    //         }

    //         if (this.y > 80) {
    //             $(".sect").attr("data-bef", "松开刷新..");
    //         } else if (this.y > 40) {
    //             $(".sect").attr("data-bef", "下拉刷新...");
    //         }
    //     });
    //     bscl.on("scrollEnd", function() {
    //         $(".sect").attr("data-bef", "下拉刷新...");
    //         $(".sect").attr("data-aft", "上拉加载更多...");
    //     });
    //     bscl.on("touchEnd", function() {

    //         if (bscl.y <= bscl.maxScrollY) {
    //             // console.log(888);
    //             if ($(".sect").attr("data-aft") === "松开!!") {
    //                 pagenum++;
    //                 console.log(pagenum)
    //                 req_data(pagenum)
    //             }
    //             // bscl.refresh();
    //             // window.localStorage.getItem
    //         }
    //     });
    // }

    /////
    // iscroll.on("srcoll", function() {
    //     console.log(12)
    //     if (this.y < this.maxscrollY - 80) {
    //         $(".sect").attr("data", "松开加载更多...");
    //     } else if (this.y < this.maxscrollY - 40) {
    //         $(".sect").attr("data", "上拉加载更多...");
    //     }
    //     if (this.y > 80) {
    //         $(".sect").attr("list", "松开刷新...");
    //     } else if (this.y > 40) {
    //         $(".sect").attr("list", "下拉刷新...");
    //     }
    // });
    // iscroll.on("scrollEnd", function() {
    //     $(".sect").attr("list", "下拉刷新...");
    //     $(".sect").attr("data", "上拉加载更多...");
    // });
    // $(".sect").on("tocuchend", function() {
    //     if (iscroll.y <= iscroll.maxscrollY) {
    //         if ($(".sect").attr("data") === "松开加载更多...") {
    //             pagenum++;
    //             loadData(pagenum)
    //         }
    //         iscroll.refresh();
    //         // window.localStorage.getItem
    //     }
    // });

    //////
})