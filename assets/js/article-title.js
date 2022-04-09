$(function () {
    var form = layui.form;
    var layer = layui.layer;
    var laypage = layui.laypage;
    var q = {
        pagenum: 1,// 页码值
        pagesize: 2,// 每页显示多少条数据
        cate_id: '',// 文章分类的 Id
        state: '',// 文章的状态，可选值有：已发布、草稿
    }
    getelemt();
    getclass();

    // 点击筛选事件
    $("#selects").on('submit',function(e){
        e.preventDefault();
        var cate_id = $("[name=city2]").val();
        var state = $("[name=city1]").val();
        q.cate_id = cate_id;
        q.state = state;
        getelemt();
    })

    // 点击删除
    $("body").on('click','.del',function(){
        var leng = $(".del").length;
        var id = $(this).attr('ids');
        layer.confirm('确认删除?', function(index){
            $.ajax({
                method:'GET',
                url:'http://www.liulongbin.top:3007/my/article/delete/'+id,
                headers:
                { Authorization: localStorage.getItem('token') || '' },
        
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message);
                    if(leng ==1){
                        q.pagenum = q.pagenum==1?1: q.pagenum-1;
                    }
                    getelemt();
                }
            })
            
            layer.close(index);
          })     
    })


    // 获取页面元素方法
    function getelemt() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/list',
            headers:
            { Authorization: localStorage.getItem('token') || '' },
            data: {
                pagenum: 1,// 页码值
                pagesize: 2,// 每页显示多少条数据
                cate_id: '',// 文章分类的 Id
                state: '',// 文章的状态，可选值有：已发布、草稿
            },
            success: function (res) {
                // console.log(res);
                var temp = template('temp1', res);
                $(".artc-bd").html(temp);
                getpage(res.total);
            }
        })
    }

    // 渲染分页
    function getpage(total){
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
            count: total ,//数据总数，从服务端得到
            limit:q.pagesize,//每页显示的条数
            curr:q.pagenum,//默认选择页数
            limits:[2,3,4,5] ,//每页条数的选择项
            layout:['count','prev', 'page', 'next','skip'],//分页功能添加
            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                
                //首次不执行
                if(!first){
                    getelemt();
                }
              }
          });
    }

    // 获得分类元素
    function getclass(){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3007/my/article/cates',
            headers:
            { Authorization: localStorage.getItem('token') || '' },
            success:function(res){
                var temp = template('temp2',res);
                $(".temp2").html(temp);
                form.render();
            }

        })
    }

})