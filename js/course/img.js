/**
 * 上传图片
 */
define(["jquery", "text!tpls/courseImg.html", "template", "common/api", "uploadify"], function ($, courseImgTpl, template, api) {

    return function (id) {
        // 获取图片信息
        api.get("course/picture", {cs_id: id}, function (res) {
            // console.log(res);
            var $courseImgTpl = template.render(courseImgTpl, res.result);
            // 页面渲染数据
            $(".panel-content .panel-body").html($courseImgTpl);

            // 上传图片
            $("#fileImage").uploadify({
                auto: true,
                fileObjName: "cs_cover_original", //等同于上传file的name值
                formData: {
                    cs_id: id
                },
                buttonText:"选择图片",
                fileTypeDesc: 'Image Files', //上传文件只限于图片
                fileTypeExts: '*.gif; *.jpg; *.png', //图片的格式
                itemTemplate: "<span></span>", //上传的模板
                swf: '/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/cover',
                width: 80,
                onUploadSuccess: function(file, data, response) {
                    // console.log(file),
                    // console.log(data),
                    console.log(response);
                    // 上传成功刷新课程页面
                    if(response){
                        // alert(1);
                    $(".left .list-group .course-manager").trigger("click");
                    }

                }

            });

        });

    }

})