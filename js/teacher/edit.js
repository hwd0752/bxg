/**
 * 编辑讲师信息
 * 
 */
define(["jquery", "text!/tpls/teacherEdit.html", "template"], function ($, teacherEditTpl, template) {

    return function (id,fn) {
        // alert("编辑讲师")
        // 编辑讲师
        $.ajax({
            url: "/api/teacher/edit",
            type: "get",
            data: {
                tc_id: id
            },
            success: function (res) {
                // console.log(res);
                if (res.code != 200) throw new Error(res.msg);
                var teacherEdit = template.render(teacherEditTpl, res.result);

                $("#modalTeacherEdit").remove();
                // 加载模态框.同时绑定提交表单事件
                $(teacherEdit).on("submit", "form", function () {

                    $.ajax({
                        url: "/api/teacher/update",
                        type: "post",
                        data: $(this).serialize(),
                        success: function (res) {
                            // console.log(res);
                            if (res.code != 200) throw new Error(res.msg);
                            // 隐藏模态框
                            $("#modalTeacherEdit").modal("hide");
                            // 刷新页面数据
                            // $(".left .list-group .teacher-manager").trigger("click");
                            fn();
                        }
                    })


                    return false;
                }).appendTo("body").modal();
            }


        })



    }
})