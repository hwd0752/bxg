/**
 * 分类编辑
 */
define(["jquery", "text!tpls/categoryEdit.html", "common/api", "template"], function ($, categoryEditTpl, api, template) {

    return function (id,fn) {
        // 单元测试id
        // alert(id);
        // 利用自己封装的方法进行编辑分类ajax请求
        api.get("category/edit", {
            cg_id: id
        }, function (res) {
            // console.log(res);
            // 添加顶级分类
            res.result.top.unshift({
                cg_id: 0,
                cg_name: "顶级分类"
            });
            // 获取到数据利用模板引擎渲染数据到模板中
            var categoryEdit = template.render(categoryEditTpl, res.result);

            // 渲染模态框
            $("#modalcgEdit").remove();
            var $categoryEdit = $(categoryEdit).on("submit", "form", function () {
                // 提交 编辑修改的表单数据
                var formData = $(this).serialize();
                // console.log(formData);
                // 进行ajax请求提交修改的数据
                api.post("category/modify", formData, function (res) {
                    // console.log(res);
                    // 关闭模态框
                    $categoryEdit.modal("hide");
                    // 刷新页面数据
                    fn();
                });
                // 阻止submit同步跳转
                return false;
            }).appendTo("body").modal();
        })

    }


})