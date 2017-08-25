/**
 * 编辑基本信息
 */
define(["jquery", "text!tpls/courseEditBaseInfo.html", "common/api", "template"], function ($, courseEditBaseInfoTpl, api, template) {

    return function (id) {
        // alert("编辑信息");
        api.get("course/basic", {cs_id: id}, function (res) {
            // console.log(res);
            // 编译模板数据
            var courseEditBaseInfo = template.render(courseEditBaseInfoTpl, res.result);
            // 绑定提交数据事件
            var $courseEditBaseInfo = $(courseEditBaseInfo).on("submit", "form", function () {
                // 获取表单的数据
                var formData = $(this).serialize();
                // alert(formData);
                // 提交数据
                api.post("course/update/basic", formData, function (res) {
                    // console.log(res);
                    // 点击课程管理刷新数据
                    $(".left .list-group .course-manager").trigger("click");
                });
                // 阻止submit默认同步跳转
                return false;
            }).on("change",".category-top",function(){
                // 绑定改变选择框的事件
                var val = $(this).val();
                // alert(val);
                api.get("category/child",{cg_id:val},function(res){
                    console.log(res);
                    // 拼接字符串将返回数据填充到子分类选择框中
                    var  str = "";
                    res.result.forEach(function(ele){
                            str += "<option value='"+ ele.cg_id +"'>"+ ele.cg_name +"</option>";
                    });
                    // 填充元素到子分类选择框中
                    $courseEditBaseInfo.find(".category-child").html(str);

                })

            })

            // 页面渲染数据
            $(".right .panel-content .panel-body").html($courseEditBaseInfo);
        });

    };

})