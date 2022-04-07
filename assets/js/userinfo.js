$(function(){
    var layer = layui.layer;
        var form = layui.form;
    // 渲染基本资料
    getuserinfo();

    // 点击重置按钮
    $(".reset").on('click',function(e){
        e.preventDefault;
        getuserinfo()
    })

    // 表单验证
    form.verify({
        nickname: function (value) {
            if (value.length < 3) {
                return '用户名称必须大于等于3';
            }
        }
    })

    // 点击提交按钮
    $(".layui-form").on('submit',function(e){
        e.preventDefault();
        subuserinfo();
        window.parent.gteUser();
    })


// 渲染基本资料函数
    function getuserinfo(){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3007/my/userinfo',
            headers:
     {Authorization:localStorage.getItem('token')||''},
            success:function(res){
                if(res.status !==0){
                    return layer.msg('获取用户信息失败')
                }
                form.val('formTest', res.data);
                // console.log(res);
                
            }
        })
    }

    // 提交函数
    function subuserinfo(){
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/userinfo',
            headers:
     {Authorization:localStorage.getItem('token')||''},
         data:$(".layui-form").serialize(),
         success:function(res){
             if(res.status !==0){
                 return layer.msg(res.message)
             }
             layer.msg(res.message)
            //  console.log(this);
             

        
         }
        })
    }
   
  
})