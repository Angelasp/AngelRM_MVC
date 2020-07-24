var modelname = "用户";
var actionurl = "api/loginapi/postLogin";

//提交
function submit() {

    var name = $.trim($("#userName").val());
    var pwd = $.trim($("#password").val());
    var ckcode = $.trim($("#Verification").val());
    // 验证用户名和密码
    if (name == "") {
        $.alert('请输入用户名！', '提示');
        return;
    }
    if (name.length < 2) {
        $.alert('用户名最小长度为2个字符！', '提示');
        return;
    }
    if (name.length > 30) {
        $.alert('用户名最大长度为30个字符！', '提示');
        return;
    }
    if (pwd == "") {
        $.alert('请输入密码！', '提示');
        return;
    }
    if (pwd.length < 6) {
        $.alert('密码长度为6个字符以上', '提示');
        return;
    }
    if (ckcode == "") {
        $.alert('请输入验证码！', '提示');
        return;
    }


    var param = { username: name, password: pwd, mycode: ckcode, url: '' };
    $.post(actionurl, param, function (data) {
        if (data.code.id == 1) {
            window.location.href = "Main/Index";
        }
        else {
            $.alert(data.code.msg);
        }
    }, "json");
}


//触发回车键
this.enterpress = function (data, event) {
    if (event.keyCode === 13) {
        submit();
    }
    return true;
}



function reloadImage(url) {
    document.getElementById("img1").src = url + '?abc=' + Math.random();
}

///判断验证码
$("#Verification").keyup(function () {

    var code = $(this).val();
    if (code.length == 5) {
        $.get("api/loginapi/getlogincode", function (res) {
            console.log(res);
            if (code.toUpperCase() == res.toUpperCase()) {
                $("#codeIcon").removeClass().addClass("ace-icon fa fa-check-circle blueCode")
            } else {
                $("#codeIcon").removeClass().addClass("ace-icon fa fa-times-circle redCode")
            }
        })
    } else if (code.length > 5) {
        $("#codeIcon").removeClass().addClass("ace-icon fa fa-times-circle redCode")
    } else {
        $("#codeIcon").removeClass().addClass("ace-icon fa fa-lock")
    }
});


$(function () {

    $("body").bind('keyup',function(event) { 
        if (event.keyCode == 13) {
            submit();
        }   
    });

    $('#btn-login').on('click', function (e) {
        submit();
    });


    $('#btn-login-dark').on('click', function (e) {
        $('body').attr('class', 'login-layout');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'blue');
        e.preventDefault();
    });
    $('#btn-login-light').on('click', function (e) {
        $('body').attr('class', 'login-layout light-login');
        $('#id-text2').attr('class', 'grey');
        $('#id-company-text').attr('class', 'blue');
        e.preventDefault();
    });
    $('#btn-login-blur').on('click', function (e) {
        $('body').attr('class', 'login-layout blur-login');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'light-blue');
        e.preventDefault();
    });



});
