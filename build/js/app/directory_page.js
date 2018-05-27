require(["jquery", "render", "text!head_tpl", "bscroll", "text!directory_page_tpl", "items", "jsonp", "base64"], function($, render, head_tpl, bscroll, directory_page_tpl, items, jsonp, base64) {

    $("body").append(head_tpl);
    $("body").append(directory_page_tpl);

    $("#root").on("click", ".page .tpl_lef_icon", function() {
        $("#root .page").remove();

        var len_root_div = $("#root >div").length;
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });
    });

    //返回首页
    $("#root").on("click", ".page .tpl_rig_icon", function() {
        $("#root>div").not(".wrap").remove();
        $("#root").css({
            "transform": `translateX(0)`,
        });
    });

    //点击跳转到阅读页
    $("#root").on("click", ".page  .page_list li", function() {
        $("#root >div").each(function() {
            if ($(this).hasClass("read")) {
                $(this).remove();
                var len_root_div = $("#root >div").length;
                var root_tran = (len_root_div - 1) * 100 + "%";
                $("#root").css({
                    transform: `translate(-${root_tran})`
                });
            }
        });
        var read_page_html = `<div class="read"></div>`;
        $("#root").append(read_page_html);
        $("#root >.read").hide();

        render({ title: "目录" }, $("#head_tpl"), $(".page_header"));

        var chapter_id = $(this).index() + 1;
        items.set("chapter_id", chapter_id);
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
                        render(bingwang_txt, $("#read_tpl"), $(".read"));

                        // 初始化页面的字体和背景
                        $("#root .read").ready(function() {
                            var f_size = (items.get("fz") || 15) + "px";
                            var ww = f_size + "px";
                            var pp = "balck";
                            var obj = JSON.parse(items.get("bg") || "{col: 'darkcyan',eq: 1}");
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
        var len_root_div = $("#root >div").length;
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });
    });
})