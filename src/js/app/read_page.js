require(["jquery", "render", "text!read_handle_tpl", "base64", "items", "jsonp", "bscroll"], function($, render, read_handle_tpl, base64, items, jsonp, bscroll) {
    $("body").append(read_handle_tpl);
    // render({ title: "大时代" }, $("#head_tpl"), $(".detail .d_header"));
    //搜索页的内容
    //获取搜索默认的数据

    //模拟兵王-----内容----jsonp请求回来   

    // var scp = document.createElement("script");
    // scp.src = "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=49c735229db1427783a21c9b324af593&token=NuXIzAh93h2w99ricPIxah9rPmbxN4G0xUDCIqBYj6p7yMy9F6YXv5MaV6ZlBzhUw2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=uJ2gVA7tYHbkx__5SMnXXk7mG6Y";
    // document.body.appendChild(scp);
    jsonp({
        url: "http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file?nonce=49c735229db1427783a21c9b324af593&token=NuXIzAh93h2w99ricPIxah9rPmbxN4G0xUDCIqBYj6p7yMy9F6YXv5MaV6ZlBzhUw2Uj5V4Wsmb7YbuoPsmLI2IEPlR7RWQy_B6sggV5JAY&sig=uJ2gVA7tYHbkx__5SMnXXk7mG6Y",
        callback: "duokan_fiction_chapter",
        cache: true,
        success: function(data) {
            var dd = $.base64('decode', data, true)
            var bingwang_txt = JSON.parse(dd);
            console.log(bingwang_txt);
        }
    });
    //点击返回按钮，返回页面
    $("#root").on("click", ".read .tpl_lef_icon", function() {
        $("#root .read").remove();

        var len_root_div = $("#root >div").length;
        console.log(len_root_div + "个div盒子");
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });
    });
    //点击显示蒙层
    var max_heght = $(document).height();
    $(document).on("click", function(e) {
        if (e.clientY >= max_heght * .3 && e.clientY <= max_heght * .7) {
            $("#root .r_mark").toggle();
        }
    });
    //点击显示设置字体的界面
    $("#root").on("click", ".read .r_set_font", function() {
        $(this).toggleClass("font_active");
        $("#root .r_set").toggle();
        return false;
    });
    //点击切换白天黑夜
    var isDay = "1";
    $("#root").on("click", ".read .r_set_day", function() {
        $(this).toggleClass("day_active");
        if ($(this).hasClass("day_active")) {
            $(this).children("span").html("白天");
            $(".read").css({ "background": "#0f1410", "color": "#4e534f" });
            // color: #4e534f;
            // background: #0f1410;
            isDay = "0";
            items.set("isDay", isDay);
        } else {
            $(this).children("span").html("夜间");
            isDay = "1";
            items.set("isDay", isDay);

            var f_size = (items.get("fz") || 15) + "px";
            var ww = f_size + "px";
            // $("#root .read ").css("font-size", ww);
            var pp = "balck";
            var obj = JSON.parse(items.get("bg") || "{col: 'darkcyan',eq: 1}");
            console.log(f_size);
            console.log($(".read .r_background ul li"));
            var col = obj.col;
            $(".read").css({
                "background": col,
                "font-size": f_size
            });
            $(".read .r_background ul li").eq(obj.eq).addClass("active").siblings().removeClass("active");
        }
        console.log(isDay)
        return false;
    });

    //点击切换字体大小
    // console.log($(".read .read_p p"))
    // $(".read .read_p p").css("font-size", items.get("fz") || 15);
    $("#root").on("click", ".read .r_set_f_big", function() {
        var tt = items.get("fz") || $(".read").css("font-size");
        var fz = parseFloat(tt) + 3;
        if (fz >= 28) { fz = 28 }

        items.set("fz", fz);
        if ((items.get("isDay") || isDay) === "0") { return; }
        $(".read").css("font-size", fz);
    });
    $("#root").on("click", ".read .r_set_f_small", function() {
        var tt = items.get("fz") || $(".read").css("font-size");
        var fz = parseFloat(tt) - 3;
        if (fz <= 12) { fz = 12 }
        items.set("fz", fz);
        if ((items.get("isDay") || isDay) === "0") { return; }
        $(".read").css("font-size", fz);

    });
    //点击设置背景颜色
    $("#root").on("click", ".read .r_background ul li", function() {

        $(this).addClass("active").siblings().removeClass("active");
        var col = $(this).css("background");
        var eq = $(this).index();

        items.set("bg", JSON.stringify({
            col: col,
            eq: eq
        }));
        if ((items.get("isDay") || isDay) === "0") { return; }
        $(".read").css("background", col);
    });
    //点击切换上一章和下一章
    var chapter_id = items.get("chapter_id") || 1;
    var fiction_id = items.get("fiction_id") || "30047";

    $("#root").on("click", ".read .r_next_chapter", function() {
        if (chapter_id < 6) {
            chapter_id++;
        } else {
            alert("最后一章了！！");
        }
        items.set("chapter_id", chapter_id);
        $(".read .r_nums p span").eq(0).html(chapter_id);
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
                        render(bingwang_txt, $("#read_chapter_tpl"), $(".read .read_p"), true);

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
                        })
                    }
                });

            },
            error: function(err) {
                console.warn(err)
            }
        });
    });
    $("#root").on("click", ".read .r_prev_chapter", function() {
        if (chapter_id > 1) {
            chapter_id--;
        } else {
            alert("到头了！！");
        }
        items.set("chapter_id", chapter_id);
        $(".read .r_nums p span").eq(0).html(chapter_id);
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
                        render(bingwang_txt, $("#read_chapter_tpl"), $(".read .read_p"), true);

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
                        })
                    }
                });

            },
            error: function(err) {
                console.warn(err)
            }
        });
    });



    //点击跳转列表页
    $("#root").on("click", ".read .r_mulu_btn", function() {
        $("#root >div").each(function() {
            if ($(this).hasClass("page")) {
                console.log("ppppppppppppppppppppppppppppppppppp")
                $(this).remove();
                var len_root_div = $("#root >div").length;
                console.log(len_root_div + "个div盒子");
                var root_tran = (len_root_div - 1) * 100 + "%";
                $("#root").css({
                    transform: `translate(-${root_tran})`
                });
            }
        });
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
                var iscroll = new bscroll(".page_content", {
                    click: true
                });
                // iscroll.scrollTo(0, iscroll.maxScrollY);
                iscroll.scrollTo(0, 0);
                var act_index = items.get("chapter_id") || 1;
                $(".page_list li").eq(act_index - 1).css("color", "#ff6600");
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