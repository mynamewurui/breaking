$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var indexpage1;
    var indexpage2;
    var indexpage3;
    // 调用文章信息函数
    getarticle();

    // 点击添加类别按钮
    $(".add").on('click',function(){
        indexpage1 = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章类别',
            content: $("#page1").html()
          });  
    })

    // 点击确认添加
    $("body").on('submit','#form1',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/article/addcates',
            headers:
            { Authorization: localStorage.getItem('token') || '' },
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                getarticle();
                layer.close(indexpage1);
            }
        })
    })

    // 点击操作
    $(".layui-card-body").on('click','.change',function(e){
        e.preventDefault();
        indexpage2 = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章类别',
            content: $("#page2").html()
          });  
        //   获取id
        var id = $(this).attr('indexs');
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3007/my/article/cates/'+id,
            headers:
            { Authorization: localStorage.getItem('token') || '' },
            success:function(res){
                form.val('form2',res.data)
            }
        })
    })

    // 点击操作确认修改
    $("body").on('submit','#form2',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/article/updatecate',
            headers:
            { Authorization: localStorage.getItem('token') || '' },
            data:$("#form2").serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                getarticle();
                layer.close(indexpage2);
            }
        })
    })

    // 点击删除按钮
    $(".layui-card-body").on('click','.del',function(e){
        var id = $(this).attr('indexs')
        layer.confirm('确认删除?', function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'http://www.liulongbin.top:3007/my/article/deletecate/'+id,
                headers:
            { Authorization: localStorage.getItem('token') || '' },
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                getarticle()
            }
            })       
            layer.close(index);
          });  
    })





// 表单验证
form.verify({
    pass: [
        /^[\S]{3,12}$/
        ,'必须3到12位，且不能出现空格'
      ] 
});  


    // 获取文章信息函数
    function getarticle() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/cates',
            headers:
            { Authorization: localStorage.getItem('token') || '' },
            success: function (res) {
                var temp = template('temp1', res);
                $(".layui-table tbody").html(temp)
            }
        })
    }

})