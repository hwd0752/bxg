/**
 * 
 */
require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery-2.1.4",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        text: "lib/text",
        tpls: "../tpls",
        template: "lib/template-web",
        cookie: "lib/jquery.cookie",
        dateTime: "../assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker",
        dateTimeLang: "../assets/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN",
        uploadify: "../assets/uploadify/jquery.uploadify"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        dateTimeLang: {
            deps: ["dateTime"]
        },
        uploadify: {
            deps: ["jquery"]
        }
    }
})

require(["jquery", "teacher/list", "category/list", "course/list", "course/add", "bootstrap", "cookie", "uploadify"],
    function ($, teacherList, categoryList, courseList, courseAdd) {

        // 判断是否有登录
        // var userInfoStr = sessionStorage.getItem("userInfo");
        var userInfoStr = $.cookie("userInfo");
        // alert(userInfoStr);
        if (!userInfoStr) {
            location.href = "login.html";
            return;
        }
        // 登录成功设置头像和名称
        var userInfo = JSON.parse(userInfoStr);
        // console.log(userInfo);
        var tc_name = userInfo.tc_name;
        var tc_avatar = userInfo.tc_avatar;
        $(".left .profile img").attr("src", tc_avatar);
        $(".left .profile h4").text(tc_name);


        $(".left .list-group").on("click", "a", function () {
            // alert($(this).html());
            $(this).addClass("active").siblings().removeClass("active");
            // alert($(this).index());
            // 
            if ($(this).hasClass("teacher-manager")) {
                // 加载讲师列表
                // $(".panel-content .panel-body").html($(this).html());
                teacherList();


            } else if ($(this).hasClass("course-manager")) {
                // 加载课程管理
                courseList();
                // $(".panel-content .panel-body").html($(this).html());

            } else if ($(this).hasClass("course-category")) {
                // 加载课程分类
                // $(".panel-content .panel-body").html($(this).html());
                categoryList();
            } else if ($(this).hasClass("chart")) {
                $(".panel-content .panel-body").html($(this).html());

            } else if ($(this).hasClass("add-course")) {
                // 添加课程
                courseAdd();
            }



        });
        // 刷新页面，自动点击加载数据
        $(".left .list-group .teacher-manager").trigger("click");
        // 点击退出
        $("#back-login").on("click", "a", function () {
            $.ajax({
                url: "api/logout",
                type: "post",
                success: function (data) {
                    console.log(data);
                    if (data.code == "200") {
                        location.href = "./login.html";
                    }
                }
            })
        });
        // 点击上传头像
        $(".left .profile img").on("click", function () {    
            // alert(1);
            $("#uploadpic").uploadify({
                auto: true,
                fileObjName: "tc_avatar", //等同于上传file的name值
                // formData: {
                //     cs_id: id
                // },
                buttonText: "上传头像",
                // fileTypeDesc: 'Image Files', //上传文件只限于图片
                fileTypeExts: '*.gif; *.jpg; *.png', //图片的格式
                itemTemplate: "<span></span>", //上传的模板
                swf: '/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/avatar',
                // width: 40,
                onUploadSuccess: function (file, data, response) {
                    // console.log(file),
                    // console.log(data),
                    console.log(response);
                    // 上传成功刷新课程页面
                    if (response) {
                      location.reload();
                    }

                }

            });

          })


    })