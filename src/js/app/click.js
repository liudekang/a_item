define(["jquery"], function($) {
    return $("#btn").toggle(function() {
        $("body").css({
            transition: "2s",
            background: "pink"
        });
    }, function() {
        $("body").css({
            transition: "4s",
            background: "yellow"
        });
    });


})