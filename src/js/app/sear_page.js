require(["jquery", "render", "text!ser_tpl"], function($, render, ser_tpl) {
    $("body").append(ser_tpl);
    //搜索页的内容
    //获取搜索默认的数据
    $.ajax({
        url: "/api/search_list",
        dataType: "json",
        success: function(data) {
            console.log(data);
            //获取书架——列表数据
            $(".s_get").html("");
            $(".s_default").show().siblings().hide();

            render(data.ads, $("#search_list"), $(".s_content .s_default"));
        },
        error: function(err) {
            console.warn(err)
        }
    });
    //点击默认列表的子项进行跳转
    $(".s_default").on("click", "span", function() {
        var val = $(this).html();
        var s_id = $(this).data("id");
        console.log(s_id, val)
        $.ajax({
            url: "/search",
            dataType: "json",
            data: {
                id: s_id
            },
            success: function(data) {
                console.log(data);
                $(".s_get").html("");
                //获取书架——列表数据
                render(data.items, $("#s_get"), $(".s_content .s_get"));
                $(".s_get").show().siblings().hide();
            },
            error: function(err) {
                console.warn(err)
            }
        });
    });
    //点击搜索进行跳转
    $(".s_btn").on("click", function() {
        var val = $(".s_txt").val();
        if (val.indexOf("妃") !== -1) {
            $.ajax({
                url: "/search",
                dataType: "json",
                data: {
                    id: "67840"
                },
                success: function(data) {
                    console.log(data);
                    $(".s_get").html("");
                    //获取书架——列表数据
                    render(data.items, $("#s_get"), $(".s_content .s_get"));
                    $(".s_get").show().siblings().hide();
                    // $(".s_default").hide();
                },
                error: function(err) {
                    console.warn(err)
                }
            });
        } else {
            $(".s_err").show().siblings().hide();
        }
    });
    //////

    //搜索页面——点击返回
    $(".s_back_icon").on("click", function() {
        $("#root").css({
            transform: "translate(0 )"
        });

    });
})