define(["jquery", "headr"], function($, Headlebars) {
    //handlebars渲染数据的模板，参数为：传入的数据，script标签模板，渲染到的目标父元素
    //限制5条数
    Headlebars.registerHelper("limit", function(index) {
        if (index < 5) {
            return true;
        } else {
            return false
        }
    });
    //重磅推荐的第一个
    Headlebars.registerHelper("first_list", function(index) {
        if (index == 0) {
            return true;
        } else {
            return false
        }
    });
    //下标加一
    Headlebars.registerHelper("addIndex", function(index) {
        return index + 1;
    });
    //限制3条数
    Headlebars.registerHelper("limit_little", function(index) {
        if (index < 3) {
            return true;
        } else {
            return false
        }
    });
    //取数组第二项
    Headlebars.registerHelper("get_two", function(index) {
        console.log(index)
        if (index > 0) {
            return true;
        }
        // if (arr[0] == "作者") {
        //     return arr[1];
        // }
    });
    //万除以1000处理
    Headlebars.registerHelper("changge_wan", function(num) {
        return Math.round(num / 1000);
    });
    //获取数组第一个
    Headlebars.registerHelper("get_list_first", function(arrs) {
        return arrs[0]
    });




    function rend(obj, dpl, prevent) {
        var source = dpl.html();
        var template = Headlebars.compile(source);
        var html = template(obj);
        prevent.append(html);
    }
    return rend;
})