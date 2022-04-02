$(function () {
    // 注册登录点击切换事件
    // 点击登录页面
    $("#regbox-btn").on("click", function () {
        $(".regbox-page").hide();
        $(".login-page").show();
    })
    // 点击注册页面
    $("#login-btn").on("click", function () {
        $(".regbox-page").show();
        $(".login-page").hide();
    })

    // 表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            var pwd = $(".regbox-page    [name=mypassword]").val()
            if (pwd !== value) {
                return '两次密码输入必须一致';
            }
        }
    })

    // 登录提交
    $("#login-pagesub").on("submit", function (e) {
        e.preventDefault();
        $.post('http://www.liulongbin.top:3007/api/login', {username: $(".login-page [name=myname]").val(), password: $(".login-page [name=mypassword]").val()}, function (res) {
            if(res.status !== 0){ return layer.msg(res.message);}
            layer.msg(res.message);
            localStorage.setItem('token',res.token)
        })
    })
    // 注册提交
    $("#regbox-pagesub").on("submit", function (e) {
        e.preventDefault();
        $.post('http://www.liulongbin.top:3007/api/reguser', { username: $(".regbox-page  [name=myname]").val(), password: $(".regbox-page [name=mypassword]").val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $("#regbox-btn").click();

        })
    })



})
