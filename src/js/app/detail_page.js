require(["jquery", "render", "text!head_tpl"], function($, render, head_tpl) {
    $("body").append(head_tpl);
    render({ title: "大时代" }, $("#head_tpl"), $(".detail .d_header"));
    //搜索页的内容
    //获取搜索默认的数据
    $.ajax({
        url: "/search/d_detail_list",
        dataType: "json",
        data: {
            id: "30047"
        },
        success: function(data) {
            console.log(data);
            //获取书架——列表数据
            render(data.item, $("#d_detail_list"), $(".d_cont .d_cont_summary .d_cont_summary_dl"));
        },
        error: function(err) {
            console.warn(err)
        }
    });

})