define(["jquery", "headr"], function($, Headlebars) {
    //handlebars渲染数据的模板，参数为：传入的数据，script标签模板，渲染到的目标父元素
    function rend(obj, dpl, prevent) {
        var source = dpl.html();
        var template = Headlebars.compile(source);
        var html = template(obj);
        prevent.append(html);
    }
    return rend;
})