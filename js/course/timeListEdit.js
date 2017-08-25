/**
 * 编辑课时
 */
define(["jquery","text!tpls/courseTimeListEdit.html","common/api","template"],function($,courseTimeListEditTpl,api,template){

    return function(id,fn){
        // alert(2);
        $("#modalEditCourseTimeList").remove();
        api.get("course/chapter/edit",{ct_id:id},function(res){
            // console.log(res);
            // 用模板引擎渲染数据
            var courseTimeListEdit = template.render(courseTimeListEditTpl,res.result);

              // 渲染页面数据
            
            var $courseTimeListEdit =  $(courseTimeListEdit).on("submit","form",function(e){
                // 阻止表单中提交按钮默认的同步跳转事件
                e.preventDefault();
                // 获取表单数据
                var formData = $(this).serialize();
                // 向服务器提交数据
                api.post("course/chapter/modify",formData,function(res){
                    // console.log(res);
                    // 隐藏模态框
                    $courseTimeListEdit.modal("hide");
                    // 刷新当前页面的数据
                    fn();
                });
                // 在页面弹出模态框
            }).appendTo("body").modal();
        });      
    };
})