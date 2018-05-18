define(["jquery", "swiper"], function($, swiper) {
    var a = function() {
        var mySwiper = new swiper('.parent', {
            // direction: 'vertical',
            loop: true,
            autoplay: true,
            // 如果需要分页器
            pagination: {
                el: '.page',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
            },

            // 如果需要滚动条
            scrollbar: {
                el: '.bar',
            },
        })
    }
    return a;
});