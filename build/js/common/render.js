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
    //万除以1000处理
    Headlebars.registerHelper("changge_wan", function(num) {
        return Math.round(num / 1000);
    });
    //获取数组第一个
    Headlebars.registerHelper("get_list_first", function(arrs) {
        return arrs[0]
    });
    //时间戳
    Headlebars.registerHelper("data_time", function(num) {
        var date = new Date(num * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-',
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
            D = date.getDate() + ' ',
            h = date.getHours() + ':',
            m = date.getMinutes() + ':',
            s = date.getSeconds();
        return Y + M + D + h + m + s;
    });
    //标签只出来三个
    Headlebars.registerHelper("d_label", function(num) {
        if (num < 3) {
            return true;
        } else {
            return false;
        }
    });
    //目录只让出来300章
    Headlebars.registerHelper("page", function(num) {
        if (num < 300) {
            return true;
        } else {
            return false;
        }
    });
    //渲染handlebars  模板的页面——参数：（数据，script模板，目标路径，是否是覆盖添加--默然追加）
    function rend(obj, dpl, prevent, isTrues) {
        var source = dpl.html();
        var template = Headlebars.compile(source);
        var html = template(obj);
        var isTrue = isTrues || false;
        if (isTrue) {
            prevent.html(html);
        } else {
            prevent.append(html);
        }
    }
    return rend;
})