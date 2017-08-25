/**
 * 课程分类内容
 */
define(["jquery", "text!tpls/category.html", "template", "common/api", "category/add","category/edit"],
 function ($, categoryTpl, template, api, categoryAdd,categoryEdit) {

    return function fn() {
        // 测试
        // alert(1);
        // 普通的一般方法
        // $.ajax({
        //     url: "/api/category",
        //     type: "get",
        //     success: function (res) {
        //         if (res.code != 200) throw new Error(res.msg);
        //         console.log(res);
        //         var categoryHtml = template.render(categoryTpl,res)
        //         $(".panel-content .panel-body").html(categoryHtml);

        //     }
        // })

        // 封装1
        // api("category","get","",function(res){
        //     // console.log(res);
        //        var categoryHtml = template.render(categoryTpl,res)
        //         $(".panel-content .panel-body").html(categoryHtml);
        // })

        // 封装2
        // api.get("category","",function(res){
        //     var categoryHtml = template.render(categoryTpl,res)
        //         $(".panel-content .panel-body").html(categoryHtml);
        // })

        // 封装aja方法
        // console.log(api);
        api.get("category", "", function (res) {
            // console.log(res);    
            // 利用模板引擎渲染模板
            var categoryHtml = template.render(categoryTpl, res);
            var $categoryHtml = $(categoryHtml).on("click", ".btn-addCategory", function () {
                //点击添加分类
                categoryAdd(function () {
                    // 递归调用刷新页面数据
                    fn();
                });       
            }).on("click", ".btn-categoryEdit", function () {
               // 点击编辑分类事件
                // 获取cg_id
                var cg_id = $(this).parent().attr("cg_id");
                categoryEdit(cg_id,function(){
                    // 递归调用刷新页面数据
                    fn();
                });

            });

            // 渲染分类列表到页面中
            $(".panel-content .panel-body").html($categoryHtml);
        })
    }

})