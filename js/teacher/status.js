define(["jquery"],function($){

    return function(id,status,$status){
        // alert("11");
        $.ajax({
            url: "/api/teacher/handle",
            type: "post",
            data: {
                tc_id:id,
                tc_status:status
            },
            success: function(res){
                // console.log(res);
                if(res.code!=200) throw new Error(res.msg);
                $status.text(res.result.tc_status == 0?"禁用":"启用");
                $status.parent().attr("tc_status",res.result.tc_status);
                $status.parent().siblings(".data-status").text(res.result.tc_status == 0?"启用":"禁用");

            }

        })


    }


})