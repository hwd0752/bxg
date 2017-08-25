/**
 * 添加讲师
 */

define(["jquery", "text!tpls/teacherAdd.html", "dateTime", "dateTimeLang"], function ($, teacherAddTpl) {

    return function () {
        // alert(11);
        $("#modalTeacherAdd").remove();

        var $teacherAddTpl = $(teacherAddTpl).on("submit", "form", function () {
            var formData = $(this).serialize();
            // console.log(formData);
            $.ajax({
                url: "/api/teacher/add",
                type: "post",
                data: formData,
                success: function (res) {
                    // console.log(res);
                    if (res.code != 200) return console.log(res.msg);
                    // 隐藏模态框并删除日期控件
                    $("#modalTeacherAdd").modal("hide");
                    $teacherAddTpl.find(".date-join").datetimepicker("remove");
                    // 刷新页面
                    $(".left .list-group .teacher-manager").trigger("click");
                }
            })
            return false;
        }).appendTo("body").modal();
        // 添加日期控件
        $teacherAddTpl.find(".date-join").datetimepicker({
            format: 'yyyy-mm-dd',
            language: "zh-CN",
            weekStart: "1", //从周几开始
            autoclose: true,
            todayBtn: true,
            minView: "month",
            todayHighlight: true

        })

    }


})