require(["jquery", "render", "text!login_handle_tpl", "items", "jsonp", "base64"], function($, render, login_handle_tpl, items, jsonp, base64) {
    $("body").append(login_handle_tpl);
    //点击显示隐藏密码
    var pwd_flag = true;

    $("#root").on("click", ".login .l_pwd", function() {
        _l_pwd_txt = $(".login .l_pwd_txt");
        _l_show = $(".login .l_show");
        $(this).toggleClass("pwd_show");
        // console.log(pwd_flag);
        if (pwd_flag) {
            _l_pwd_txt.hide();
            _l_show.val(_l_pwd_txt.val());
            _l_show.show();

            pwd_flag = false;
        } else {
            _l_pwd_txt.show();
            _l_pwd_txt.val(_l_show.val());
            _l_show.hide();
            pwd_flag = true;
        }

    })

    //点击登录按钮进行登录
    $("#root").on("click", ".login .l_login_btn", function() {
        var user = $(".l_user").val();
        var pwd = $(".l_pwd_wrap").children("input").val();
        if (!user) {
            $(".l_msg").show().html("请输入账户名！");
        } else if (!pwd) {
            $(".l_msg").show().html("请输入密码！");
        } else {
            $.ajax({
                url: "/login/user",
                dataType: "json",
                type: "post",
                data: {
                    user: user,
                    pwd: pwd
                },
                success: function(data) {
                    if (data.code === 0) {
                        alert("成功登录，即将返回");
                        window.sessionStorage.setItem("login_user", JSON.stringify({
                            "name": user,
                            "pwd": pwd
                        }));
                        //判断上一个是不是首页
                        var isIndex = $("#root .login").prev().hasClass("wrap");
                        $("#root .login").remove();
                        if (!isIndex) {
                            // 上一个页面不是首页，则直接进入阅读页
                            var read_page_html = `<div class="read"></div>`;
                            $("#root").append(read_page_html);
                            $("#root >.read").hide();
                            render({ title: "目录" }, $("#head_tpl"), $(".page_header"));
                            var chapter_id = items.get("chapter_id") || 1;
                            var fiction_id = items.get("fiction_id") || "30047";
                            $.ajax({
                                //跳转到指定书，指定章
                                url: "/api/bingwang_page_chapter",
                                dataType: "json",
                                data: {
                                    fiction_id: fiction_id,
                                    chapter_id: chapter_id,
                                    format: "jsonp"
                                },

                                success: function(data) {
                                    //获取书架——列表数据
                                    jsonp({
                                        url: data.url,
                                        callback: "duokan_fiction_chapter",
                                        cache: true,
                                        success: function(data) {
                                            var dd = $.base64('decode', data, true)
                                            var bingwang_txt = JSON.parse(dd);
                                            render(bingwang_txt, $("#read_tpl"), $(".read"));

                                            // 初始化页面的字体和背景
                                            $("#root .read").ready(function() {
                                                var f_size = (items.get("fz") || 15) + "px";
                                                var obj = items.get("bg") || '{"col": "darkcyan","eq": 1}';
                                                obj = JSON.parse(obj);
                                                var col = obj.col;
                                                $(".read").css({
                                                    "background": col,
                                                    "font-size": f_size
                                                });
                                                $(".read .r_background ul li").eq(obj.eq).addClass("active").siblings().removeClass("active");
                                                $(".read .r_nums p span").eq(0).html(chapter_id);

                                                $("#root >.read").show();
                                            })
                                        }
                                    });
                                },
                                error: function(err) {
                                    console.warn(err)
                                }
                            });
                        }

                        //位移root大盒子——根据盒子数量
                        var len_root_div = $("#root >div").length;
                        var root_tran = (len_root_div - 1) * 100 + "%";
                        $("#root").css({
                            transform: `translate(-${root_tran})`
                        });

                    } else {
                        $(".l_msg").show().html("密码或账户输入错误，请重新输入！！");
                    }
                },
                error: function(err) {
                    console.warn(err)
                }
            });
        }

    });
})