require(["jquery", "render", "text!head_tpl", "bscroll", "text!detail_list_tpl", "items", "jsonp", "base64"], function($, render, head_tpl, bscroll, detail_list_tpl, items, jsonp, base64) {
    $("body").append(head_tpl);
    $("body").append(detail_list_tpl);
    //点击返回
    $("#root").on("click", ".detail .tpl_lef_icon", function() {
        $("#root .detail").remove();

        var len_root_div = $("#root >div").length;
        console.log(len_root_div + "个div盒子");
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });
        // $("#root").css({
        //     transform: "translate(0)"
        // });

    });
    //点击跳转到目录页
    $("#root").on("click", ".detail .detail_end", function() {
        var directory_html = `<div class="page">
                            <div class="page_header"></div>
                            <div class="page_content"></div>
                        </div>`;
        $("#root").append(directory_html);

        render({ title: "目录" }, $("#head_tpl"), $(".page_header"));
        //搜索页的内容
        // 获取搜索默认的数据
        $.ajax({
            url: "/api/chapter",
            dataType: "json",
            success: function(data) {
                console.log(data.item);
                //获取书架——列表数据
                render(data.item, $("#p_content"), $(".page_content"));
                var iscroll = new bscroll(".page_content");
                iscroll.scrollTo(0, iscroll.maxScrollY);
                $(".page_list li:last").css("color", "#ff6600")
            },
            error: function(err) {
                console.warn(err)
            }
        });

        var len_root_div = $("#root >div").length;
        console.log(len_root_div + "个div盒子");
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });

    });
    //点击跳转到阅读页
    $("#root").on("click", ".detail .detail_btn_read", function() {
        var read_page_html = `<div class="read"></div>`;
        $("#root").append(read_page_html);
        // http://dushu.xiaomi.com/drm/v0/fiction/link?fiction_id=30047&chapter_id=5&format=jsonp
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
                console.log("@@@@@@@@@@@@@@@@@");
                console.log(data);
                //获取书架——列表数据
                jsonp({
                    url: data.url,
                    callback: "duokan_fiction_chapter",
                    cache: true,
                    success: function(data) {
                        var dd = $.base64('decode', data, true)
                        var bingwang_txt = JSON.parse(dd);
                        console.log(bingwang_txt);
                        render(bingwang_txt, $("#read_tpl"), $(".read"));


                        // 初始化页面的字体和背景
                        $("#root .read").ready(function() {
                            var f_size = (items.get("fz") || 15) + "px";
                            var ww = f_size + "px";
                            // $("#root .read ").css("font-size", ww);
                            var pp = "balck";
                            var obj = JSON.parse(items.get("bg") || "{col: 'darkcyan',eq: 1}");
                            console.log(obj);
                            console.log($(".read .r_background ul li"));
                            var col = obj.col;
                            $(".read").css({
                                "background": col,
                                "font-size": f_size
                            });
                            $(".read .r_background ul li").eq(obj.eq).addClass("active").siblings().removeClass("active");
                            $(".read .r_nums p span").eq(0).html(chapter_id);
                        })
                    }
                });
            },
            error: function(err) {
                console.warn(err)
            }
        });
        var len_root_div = $("#root >div").length;
        console.log(len_root_div + "个div盒子");
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });

    });


})