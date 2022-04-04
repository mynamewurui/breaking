$(function(){
    gteUser()
})

// 调用用户信息函数
function gteUser(){
 $.ajax({
     metheod:'GET',
     url:'http://www.liulongbin.top:3007/my/userinfo',
     headers:
     {Authorization:localStorage.getItem('token')||''},
     success:function(res){
        //  console.log(res);
        changeUser(res)
     }

 })
}

// // 头像渲染函数
function changeUser(arr){
    // 渲染名称
    var name = arr.data.nickname || arr.data.username;
    $("#user-name").html(name);

    // 渲染头像
    if(arr.data.user_pic !==null){
        $(".layui-nav-img").attr('src',arr.data.user_pic).show();
        $(".user-head").hide();
    }else{
        $(".layui-nav-img").hide();
        $(".user-head").html(name[0])
    }

    


}

