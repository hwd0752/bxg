/**
 * 添加分类
 */
define(["jquery", "text!tpls/categoryAdd.html", "template"], function ($, categoryAddTpl, template) {

    return function (fn) {
        // alert(1);
        $.ajax({
            url: "/api/category/top",
            type: "get",
            success: function (res) {
                // console.log(res);
                if(res.code!=200) throw new Error(res.msg);
                // 添加顶级分类
                res.result.unshift({
                    cg_id:0,
                    cg_name:"顶级分类"
                })
                // 用模板引擎渲染数据
                var categoryAdd = template.render(categoryAddTpl, res);

                // 将模态框添加到页面中，先移除模态框
                $("#modalcgAdd").remove();
                $(categoryAdd).on("submit","form",function(){
                    // 或提交表单的数据
                    var data = $(this).serialize();
                    // console.log(data);
                    $.ajax({
                        url: "/api/category/add",
                        type: "post",
                        data: data,
                        success: function (res){
                            // console.log(res);
                            if(res.code!=200) throw new Error(res.msg);
                            // 关闭模态框
                               $("#modalcgAdd").modal("hide");
                            // 刷新页面数据
                            fn();
                        }
                    })

                    return false;
                }).appendTo("body").modal();
            }


        })


    }
})