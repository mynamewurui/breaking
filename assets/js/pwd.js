$(function(){
    var form = layui.form;
    // 表单验证
    form.verify({
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        newpwd:function(value){
            if(value == $("[name=pwd]").val()){
                return '新旧密码必须不一致'
            }
        },
        repwd:function(value){
            if(value !==$("[name=newpwd]").val()){
                return '两次输入密码不一致'
            }
        }
      });     
      
    //   点击重置
    $(".reset").on('click',function(e){
        e.preventDefault();
        $(".layui-form")[0].reset()
    })

    // 点击修改密码
    $(".layui-form").on('submit',function(e){  
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/updatepwd',
            headers:
     {Authorization:localStorage.getItem('token')||''},
     data:{
         oldPwd: $(".layui-form [name=pwd]").val(),
         newPwd:$(".layui-form [name=newpwd]").val()
     },
     success:function(res){
         console.log(res);
         if (res.status!==0){
             return layui.layer.msg(res.message);
         }
         layui.layer.msg(res.message);
         $(".layui-form")[0].reset()

     }
        })
        
    })

})