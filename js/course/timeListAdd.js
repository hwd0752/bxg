/**
 * 添加课时
 */
define(["jquery","text!tpls/courseTimeListAdd.html","common/api"],function($,courseTimeListAddTpl,api){

    return function(id,callback){

        // 渲染到页面
        $("#modalAddCourseTimeList").remove();
        var $courseTimeListAdd = $(courseTimeListAddTpl).on("submit","form",function(e){
            // 阻止表单的默认提交同步跳转
            e.preventDefault();
            var formData = $(this).serialize();
            // 添加所属课程的ct_cs_id
            formData +="&ct_cs_id="+id;
            // alert(formData);
            // 提交数据
            api.post("course/chapter/add",formData,function(res){
                console.log(res);
                $courseTimeListAdd.modal("hide");
                // 刷新课时管理页面
                callback();
            })

        }).appendTo("body").modal();

    }

})