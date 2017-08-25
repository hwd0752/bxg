/**
 * 
 */
define(["jquery", "text!tpls/teacherList.html", "template","teacher/show","teacher/add","teacher/edit","teacher/status"],
        function ($, teacherListTpls, template,teacherShow,teacherAdd,teacherEdit,teacherStatus) {


    return function fn() {
        // var fn = arguments.callee;
        $.ajax({
            url: "/api/teacher",
            type: "get",
            success: function (res) {
                // console.log(res);
                // 将数据渲染到模板中
                var teacherListhtml = template.render(teacherListTpls, res)

                //事件委托绑定查看讲师事件
                var $teacherListhtml = $(teacherListhtml).on("click", ".btn-show", function () {
                    // alert(1);
                   var id = $(this).parent().attr("data-id");
                //    console.log(id);
                    teacherShow(id);
                    // 链式编程，添加讲师
                }).on("click",".btn-addTeacher",function(){
                    teacherAdd();

                }).on("click",".btn-edit",function(){
                    // alert(1);
                    // 获取tc_id
                    var tc_id = $(this).parent().attr("data-id");
                    // alert(tc_id);
                    // 编辑讲师调用
                    teacherEdit(tc_id,function(){
                        fn();
                    });

                }).on("click",".btn-status",function(){
                    // 启用或注销讲师
                    // alert(1);
                    var tc_id = $(this).parent().attr("data-id");
                    var tc_status = $(this).parent().attr("tc_status");
                    var $status = $(this);
                    teacherStatus(tc_id,tc_status,$status);
                })
                // 渲染右边讲师的数据
                $(".right .panel-content .panel-body").html($teacherListhtml);
            }
        })
    }

})