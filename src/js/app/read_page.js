require(["jquery", "render", "text!head_tpl"], function($, render, head_tpl) {
    // $("body").append(head_tpl);
    // render({ title: "大时代" }, $("#head_tpl"), $(".detail .d_header"));
    //搜索页的内容
    //获取搜索默认的数据
    $.ajax({
        url: "/api/bingwang_txt",
        dataType: "json",
        success: function(data) {
            console.log(data);
            //获取书架——列表数据
            // render(data, $("#read_tpl"), $(".d_cont .read"));
        },
        error: function(err) {
            console.warn(err)
        }
    });

})