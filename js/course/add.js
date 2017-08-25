/**
 * 添加课程
 */
define(["jquery", "text!tpls/courseAdd.html", "common/api"], function ($, courseAddTpl, api) {

    return function () {
        // alert(1);
        // 加载模态框
        $("#modalAddCourse").remove();
        $(courseAddTpl).on("submit", "form", function (e) {
            // 阻止form表单submit事件默认的同步跳转事件
            e.preventDefault();
            var formData = $(this).serialize();
            // 提交表单
            api.post("course/create", formData, function (res) {
                // console.log(res);
                // 关闭模态框
                $("#modalAddCourse").modal("hide");
                $(".left .list-group .course-manager").trigger("click");
            });
        }).appendTo("body").modal();
    };
})