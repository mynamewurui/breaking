$(function(){
var layer=layui.layer;
var form = layui.form;
getclass();
initEditor();
// 1. 初始化图片裁剪器
var $image = $('#image')
// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}
// 3. 初始化裁剪区域
$image.cropper(options)

// 上传图片
$("#imge").on('click',function(){
    $("#imgs").click();
})
$("#imgs").on('change',function(e){
    var file = e.target.files[0]
    if(file.length ==0){
        return
    }
    var newImgURL = URL.createObjectURL(file);
    $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域
})

var index = '已发布';
// 点击发布
$("btn1").on('click',function(e){
    e.preventDefault();
    index = '已发布'
})
// 点击草稿
$("btn2").on('click',function(e){
    e.preventDefault();
    index = '草稿'
})
// 提交表单
$("#tit").on('submit',function(e){
    e.preventDefault();
    var fd = new FormData($(this)[0]);
    fd.append('state',index);
    //导出图片
    $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img',blob);
  })

  getpush(fd)

})

//提交请求
function getpush(fd){
    $.ajax({
        method:'POST',
        url:'http://www.liulongbin.top:3007/my/article/add',
        headers:
        { Authorization: localStorage.getItem('token') || '' },
        data:fd,
        contentType:false,
        processData:false,
        success:function(res){
            console.log(res);
            
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg(res.message);
            location.href = '/article-title.html';
        }

    })

}

// 渲染文章分类
    function getclass(){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3007/my/article/cates',
            headers:
            { Authorization: localStorage.getItem('token') || '' },
            success:function(res){
                if(res.status !==0){
                    return layer.msg(res.message)
                }
                // console.log(res);
                
                var temp = template('temp1',res);
                $("#cate_id").html(temp);
                form.render();
            }
        })
    }
})