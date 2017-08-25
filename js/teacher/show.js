define(["jquery", "text!tpls/teacherShow.html","template"], function ($, teacherShowTpl,template) {

    return function (id) {
        // alert(1);
        $.ajax({
            url: "/api/teacher/view",
            type: "get",
            data: {
                tc_id: id
            },
            success: function (res) {
                // console.log(res);
                if(res.code != 200){
                    console.log(res.msg);
                    return;
                }
                // 获取到数据渲染到模板引擎中
                var teacherShow = template.render(teacherShowTpl,res.result);

                // 将模板渲染出来
                $("#modalTeacherShow").remove();
                $(teacherShow).appendTo("body").modal();
                // $("body").append(teacherShowTpl);
                // $("#myModal").modal();
            }
        })


    }


})