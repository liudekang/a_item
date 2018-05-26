require(["jquery", "render", "text!ser_tpl"], function($, render, ser_tpl) {
    $("body").append(ser_tpl);
    //搜索页的内容
    //点击默认列表的子项进行跳转
    $("#root").on("click", ".search .s_default span", function() {
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
    $("#root").on("click", ".search .s_btn", function() {
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
    $("#root").on("click", ".search .s_back_icon", function() {
        $("#root .search").remove();

        var len_root_div = $("#root >div").length;
        console.log(len_root_div + "个div盒子");
        var root_tran = (len_root_div - 1) * 100 + "%";
        $("#root").css({
            transform: `translate(-${root_tran})`
        });

        // $("#root").css({
        //     transform: "translate(0 )"
        // });

    });
    // $("#root").on("click", ".search", function() {
    //     console.log(11)

    // });
})