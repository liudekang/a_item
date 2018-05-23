define(["jquery", "headr"], function($, Headlebars) {
    //本地存储数据
    var local = window.localStorage;
    var obj = {
        get: function(key) {
            return local.getItem(key);
        },
        set: function(key, val) {
            if (!val) {
                this.remove(key);
            } else {
                local.getItem(key, val);
            }
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