/**
 * 编辑课时
 */
define(["jquery","text!tpls/courseTimeList.html","common/api","template","course/timeListEdit","course/timeListAdd"],
function($,courseTimeListTpl,api,template,courseTimeListEdit,courseTimeListAdd){

    return function fn(id){
        // alert(id);
        api.get("course/lesson",{cs_id:id},function(res){
            // console.log(res);
            // 用模板渲染数据
            var courseTimeList = template.render(courseTimeListTpl,res.result);
            // 把模板转换为jquery对象绑定事件
            $courseTimeList = $(courseTimeList).on("click",".btn-editCourseTime",function(){
                // 编辑课时事件绑定
                // alert(1);
                // 获取ct_id
                var ct_id = $(this).attr("ct_id");
                courseTimeListEdit(ct_id,function(){
                    // 递归调刷新当前页面数据
                    fn(id);
                });
            }).on("click",".btn-addCourseTime",function(){
                // alert(1);
                var cs_id = $(this).attr("cs_id");
                courseTimeListAdd(cs_id,function(){
                    // 刷新课时管理页面
                    fn(id);
                });
            })
            // 渲染数据到页面
            $(".right .panel-content .panel-body").html($courseTimeList);
        })

        
    }

})  