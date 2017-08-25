/**
 * 课程列表
 */
define(["jquery","text!tpls/courseLIst.html","common/api","template","course/timeList","course/editBaseInfo","course/img"],
function($,courseListTpl,api,template,courseTimeList,courseEditBaseInfo,courserImg){

    return function(){

        api.get("course","",function(res){
            // console.log(res);
            // 渲染数据到模板中
            var courseList = template.render(courseListTpl,res);
            // 渲染页面前事件委托绑定事件
            var $courseList = $(courseList).on("click",".btn-editCourse",function(){
                // 获取课程的id
                var cs_id = $(this).parent().attr("cs_id");
                // 编辑课时事件
                courseTimeList(cs_id);
            }).on("click",".btn-editCourseBaseInfo",function(){
                // 编辑基本信息
                // alert(1);
                var cs_id = $(this).parent().attr("cs_id");
                courseEditBaseInfo(cs_id);
            }).on("click","img",function(){
                // 点击图片进入上传图片页
                // alert(1);
                var id = $(this).parent().attr("data-id");
                courserImg(id);
            })

            // 将课程列表添加到页面中渲染
            $(".panel-content .panel-body").html($courseList);
    
        });
    };    

})