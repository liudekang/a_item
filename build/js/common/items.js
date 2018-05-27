define(["jquery", "headr"], function($, Headlebars) {
    //本地存储数据处理——获取，添加，删除，清空
    var local = window.localStorage;
    var obj = {
        get: function(key) {
            return local.getItem(key);
        },
        set: function(key, val) {
            local.setItem(key, val);
        },
        remove: function(key) {
            local.removeItem(key);
        },
        clear: function() {
            local.clear();
        }
    }
    return obj;
})