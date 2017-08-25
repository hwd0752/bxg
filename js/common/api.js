/**
 * 封装ajax方法
 */
define(["jquery"], function ($) {
    // 封装1
    // return function(url,type,data,callback){
    //     $.ajax({
    //         url: "/api/"+url,
    //         type: type,
    //         data: data,
    //         success: function(res){
    //             if(res.code!=200) throw new Error(res.msg);
    //             callback&&callback(res);
    //         }
    //     })
    // }

    // 封装2
    // return {
    //     ajax: function (url, type, data, callback) {
    //         $.ajax({
    //             url: "/api/" + url,
    //             type: type,
    //             data: data,
    //             success: function (res) {
    //                 if (res.code != 200) throw new Error(res.msg);
    //                 callback && callback(res);
    //             }
    //         })
    //     },
    //     get:function(url,data,callback){
    //         this.ajax(url,"get",data,callback)
    //     },
    //     post: function(url,data,callback){
    //         this.ajax(url,"post",data,callback)
    //     }
    // }

    // 封装3
    var Obj = {
        ajax: function (url, type, data, callback) {
            $.ajax({
                url: "/api/" + url,
                type: type,
                data: data,
                success: function (res) {
                    if (res.code != 200) throw new Error(res.msg);
                    callback && callback(res);
                }
            })
        }
    }
    // var arr = ["get", "post"];
    // arr.forEach(function (e) {
    //     Obj[e] = function(url,data,callback){
    //         this.ajax(url, e, data, callback);
    //     }
    // })

    // 优化1
    // var arr ="get,post";
    // arr.split(",").forEach(function (e) {
    //     Obj[e] = function(url,data,callback){
    //         this.ajax(url, e, data, callback);
    //     }
    // });
    
    // 优化2
    "get,post".split(",").forEach(function (e) {
        Obj[e] = function(url,data,callback){
            this.ajax(url, e, data, callback);
        }
    });

    return Obj;


})