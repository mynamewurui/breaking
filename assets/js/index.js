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
        if (res.status!==0){
            return
        }
        changeUser(res.data)
     },
     complete:function(res){
         if(res.responseJSON.status !==0){
             localStorage.removeItem('token')
             location.href = '/login.html'
         }


     }
 })
}

// 退出登录
var layer = layui.layer;
$(".uesrout").on('click',function(){
    layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
      });
    
})

// // 头像渲染函数
function changeUser(arr){
    // 渲染名称
    var name = arr.nickname || arr.username;
    $("#user-name").html(name);

    // 渲染头像
    if(arr.user_pic !==null){
        $(".layui-nav-img").attr('src',arr.user_pic).show();
        $(".user-head").hide();
    }else{
        $(".layui-nav-img").hide();
        $(".user-head").html(name[0])
    }
}

