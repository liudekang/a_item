require(["jquery", "render", "text!head_tpl", "bscroll", "text!detail_list_tpl", "items", "jsonp", "base64"], function($, render, head_tpl, bscroll, detail_list_tpl, items, jsonp, base64) {
    $("body").append(head_tpl);
    $("body").append(detail_list_tpl);
    //点击返回
    $("#root").on("click", ".detail .tpl_lef_icon", function() {
        $("#root .detail").remove();

        var len_root_div = $("#root >div").length;
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });
    });

    //返回首页
    $("#root").on("click", ".detail .tpl_rig_icon", function() {
        $("#root>div").not(".wrap").remove();
        $("#root").css({
            "transform": `translateX(0)`,
        });
    });
    //点击跳转到目录页
    $("#root").on("click", ".detail .detail_end", function() {
        //目录页——初始化
        var directory_html = `<div class="page">
                            <div class="page_header"></div>
                            <div class="page_content"></div>
                        </div>`;
        $("#root").append(directory_html);

        render({ title: "目录" }, $("#head_tpl"), $(".page_header"));

        $.ajax({
            url: "/api/chapter",
            dataType: "json",
            success: function(data) {
                //获取书架——列表数据
                render(data.item, $("#p_content"), $(".page_content"));
                var iscroll = new bscroll(".page_content");
                iscroll.scrollTo(0, iscroll.maxScrollY);
                $(".page_list li:last").css("color", "#ff6600");
            },
            error: function(err) {
                console.warn(err)
            }
        });

        var len_root_div = $("#root >div").length;
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });

    });
    //点击跳转到阅读页
    $("#root").on("click", ".detail .detail_btn_read", function() {
        var login_user = window.sessionStorage.getItem("login_user");
        // if (login_user) {
        //     login_user = JSON.parse(login_user);
        // }
        if (login_user && JSON.parse(login_user).name == "ldk") { //已经登录，直接跳转阅读页
            var read_page_html = `<div class="read"></div>`;
            $("#root").append(read_page_html);
            $("#root >.read").hide();
            render({ title: "目录" }, $("#head_tpl"), $(".page_header"));
            var chapter_id = items.get("chapter_id") || 1;
            var fiction_id = items.get("fiction_id") || "30047";
            $.ajax({
                //跳转到指定书，指定章
                url: "/api/bingwang_page_chapter",
                dataType: "json",
                data: {
                    fiction_id: fiction_id,
                    chapter_id: chapter_id,
                    format: "jsonp"
                },

                success: function(data) {
                    //获取书架——列表数据
                    jsonp({
                        url: data.url,
                        callback: "duokan_fiction_chapter",
                        cache: true,
                        success: function(data) {
                            var dd = $.base64('decode', data, true)
                            var bingwang_txt = JSON.parse(dd);
                            console.log(bingwang_txt)
                            render(bingwang_txt, $("#read_tpl"), $(".read"));

                            // 初始化页面的字体和背景
                            $("#root .read").ready(function() {
                                var f_size = (items.get("fz") || 15) + "px";
                                var obj = items.get("bg") || '{"col": "darkcyan","eq": 1}';
                                obj = JSON.parse(obj);
                                var col = obj.col;
                                $(".read").css({
                                    "background": col,
                                    "font-size": f_size
                                });
                                $(".read .r_background ul li").eq(obj.eq).addClass("active").siblings().removeClass("active");
                                $(".read .r_nums p span").eq(0).html(chapter_id);

                                $("#root >.read").show();
                            })
                        }
                    });
                },
                error: function(err) {
                    console.warn(err)
                }
            });
            // var len_root_div = $("#root >div").length;
            // var root_tran = (len_root_div - 1) * 100 + "%";
            // $("#root").css({
            //     transform: `translate(-${root_tran})`
            // });
        } else { //未登录，进登录页面
            //登录页——初始化渲染
            var login_html = `<div class="login"> </div>`;
            $("#root").append(login_html);

            render({}, $("#login_html"), $("#root .login"));
        }

        //位移root大盒子——根据盒子数量
        var len_root_div = $("#root >div").length;
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });






    });


})