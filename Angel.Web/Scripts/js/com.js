/*
 * Created by Alcedo on 2017/3/21.
 * @module Com 
 */
var com = com || {};
com.server = com.server || {};

com.server.get = function (url, params, callback, errcallback) {
    //console.log(params);
    if (typeof params === 'function') {
        errcallback = callback;
        callback = params;
        params = undefined;
    }
    if (!errcallback) {
        errcallback = function (e) {
            console.error('从服务端获取数据报错，错误是:\n' + e.statusText);
        }
    }
    if (!params) params = '';
    params = _parseParam(url, params);
    $.ajax({ url: url, data: params, type: 'GET', async: false, timeout: 300000 }).done(callback).fail(errcallback);
};
com.server.get1 = function (url, params, callback, errcallback) {

    if (typeof params === 'function') {
        errcallback = callback;
        callback = params;
        params = undefined;
    }
    if (!errcallback) {
        errcallback = function (e) {
            console.error('从服务端获取数据报错，错误是:\n' + e.statusText);
        }
    }
    if (!params) params = '';
    params = _parseParam(url, params);
    $.ajax({ url: url, data: params, type: 'GET', async: true, timeout: 900000 }).done(callback).fail(errcallback);
};
com.server.post = function (url, params, callback, errcallback) {
    if (typeof params === 'function') {
        errcallback = callback;
        callback = params;
        params = undefined;
    }
    if (!errcallback) {
        errcallback = function (e) {
            console.error('从服务端获取数据报错，错误是:\n' + e.statusText);
        }
    }
    if (!params) params = '';
    //params = _parseParam(url, params);
    $.ajax({ url: url, type: 'POST', async: false, dataType: 'json', contentType: 'application/json;charset=utf-8', data: params, timeout: 180000 }).done(callback).fail(errcallback);
};

com.server.delete = function (url, params, callback, errcallback) {
    if (typeof params === 'function') {
        errcallback = callback;
        callback = params;
        params = undefined;
    }
    if (!errcallback) {
        errcallback = function (e) {
            console.error('从服务端获取数据报错，错误是:\n' + e.statusText);
        }
    }
    if (!params) params = '';
    params = _parseParam(params);
    $.ajax({ url: this._url + '/del', data: params, type: 'DELETE', timeout: 180000 }).done(callback).fail(errcallback);
};

/**
 * @param title   弹框消息的标题
 * @param text    弹框消息的内容
 * @param type     弹框消息的类型 success,info,warning,error
 * @param positionClass 进度条是否显示
 *///弹出窗的位置 toast-top-right,toast-botton-right,toash-bottom-left,toast-top-left,toast-top-full-width,
com.showBox = function (title, text, type, positionClass, position) {
    toastr.clear();
    //参数设置，若用默认值可以省略以下面代
    toastr.options = {
        "closeButton": true, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "progressBar": positionClass,//是否显示进度条
        "positionClass": position ? position : "toast-bottom-right",//弹出窗的位置 toast-top-right,toast-botton-right,toash-bottom-left,
        "showDuration": "600",//显示动作（从无到有这个动作）持续的时间
        "hideDuration": "2000",//消失的动画时间
        "timeOut": "10000", //展现时间
        "extendedTimeOut": "2000",//加长展示时间
        "showEasing": "swing",//显示时的动画缓冲方式
        "hideEasing": "linear",//消失时的动画缓冲方式
        "showMethod": "show",//显示时的动画方式  fadeIn+jQuery的展示效果
        "hideMethod": "hide" //消失时的动画方式fadeout+jQuery的消失效果
    };
    toastr[type ? type : 'error'](text, title);
}

function _parseParam(url, params) {
    var selfp = params;
    try {

        if (!params || params === '') {
            params = {};
        } else if (typeof params === 'string') {
            params = JSON.parse(params);
        } else {
        }
        return params;
    } catch (e) {
        console.error('转换往后台传递参数时报错，信息是:\n' + e);
        selfp.url = url;
        return selfp;
    }
}


function toTreeDataOrder(data, id, parentid) {
    var mnum = $('<ul class=\"nav nav-list\"></ul>');
    var groupValues = _.groupBy(_.sortBy(data, 'orderid'), parentid);//object
    var defaultIcon = "fa fa-list-alt";
    _.forEach(groupValues[0], function (obj) {
        var menuicon_1 = obj.menuicon.indexOf("fa-") < 0 ? defaultIcon : obj.menuicon;
        //判断是否有二级菜单,如果有则添加,如果没有直接编写
        if (_.has(groupValues, obj[id])) {
            var mnum1 = $("<li><a href=\"#\" class=\"dropdown-toggle\"> <i class=\"menu-icon " + menuicon_1 + "\"></i><span class=\"menu-text\">" + obj.menuname.toUpperCase() + "</span><b class=\"arrow fa fa-angle-right\"></b></a><b class=\"arrow\"></b><ul class=\"submenu\"></ul></li>");
            _.forEach(groupValues[obj[id]], function (menu2) {
                //三级菜单,判断groupvalue中的key是否在menus2中
                if (_.has(groupValues, menu2[id])) {
                    //添加二级菜单
                    var mnum_2 = $("<li><a href=\"#\" class=\"dropdown-toggle\"> <i class=\"menu-icon fa fa-list-alt\"></i><span class=\"menu-text\">" + menu2.menuname.toUpperCase() + "</span><b class=\"arrow fa fa-angle-right\"></b></a><b class=\"arrow\"></b><ul class=\"submenu\"></ul></li>");
                    //获取三级菜单对象
                    _.forEach(groupValues[menu2[id]], function (menu3) {
                        if (_.has(groupValues, menu3[id])) {
                            var mnum_3 = $("<li><a href=\"#\" class=\"dropdown-toggle\"> <i class=\"menu-icon fa fa-list-alt\"></i><span class=\"menu-text\">" + menu3.menuname.toUpperCase() + "</span><b class=\"arrow fa fa-angle-right\"></b></a><b class=\"arrow\"></b><ul class=\"submenu\"></ul></li>");
                            //获取四级菜单对象
                            _.forEach(groupValues[menu3[id]], function (menu4) {
                                $('<li><a href=\"' + menu4.menuurl + '\"><i class=\"icon-double-angle-right\"></i>' + menu4.menuname.toUpperCase() + '</a></li>').appendTo(mnum_3.find('ul.submenu'));
                            })
                            mnum_3.appendTo(mnum_2.find('ul.submenu').first());
                        }
                        else {
                            $('<li><a href=\"' + menu3.menuurl + '\"><i class=\"icon-double-angle-right\"></i>' + menu3.menuname.toUpperCase() + '</a></li>').appendTo(mnum_2.find('ul.submenu'));
                        }
                        mnum_2.appendTo(mnum1.find('ul.submenu').first());
                    })
                }
                else {
                    $('<li><a href=\"' + menu2.menuurl + '\"><i class=\"icon-double-angle-right\"></i>' + menu2.menuname.toUpperCase() + '</a></li>').appendTo(mnum1.find('ul').first());
                }
                mnum1.appendTo(mnum);
            });
        } else {
            $("<li><a href=\"" + obj.menuurl + "\" class=\"dropdown-toggle\"> <i class=\"menu-icon fa fa-list-alt\"></i><span class=\"menu-text\">" + obj.menuname.toUpperCase() + "</span><b class=\"arrow fa fa-angle-right\"></b></a><b class=\"arrow\"></b></li>").appendTo(mnum);
        }
    });
    mnum.appendTo($("#sidebar"));
    $('<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse"><i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i></div>').appendTo($("#sidebar"));
}


function RefreshDownFile(filenames) {
    $.get('/api/fileapi/get', {}).done(function (data, textStatus) {
        $('#downfilelist').html('');
        $('.dropdown-modal .dropdown-toggle .badge-grey').html(data.length);
        for (i = 0; i < data.length; i++) {
            if (i >= 4) break;
            var filename = data[i].fileName;
            var filepath = data[i].filePath;
            //为新导出的文件添加‘NEW’
            if (filenames != '' && filenames != undefined) {
                //$('#header_task_bar').find('i').eq(0).css('color', '#2EC7C9').addClass('faa-ring animated').mouseover(function () {
                //    $('#header_task_bar').find('i').eq(0).css('color', '').removeClass('faa-ring animated')
                //});
                if (filenames.indexOf(filename.replace('.rar', '').replace('.csv', '').replace('.zip', '')) >= 0) {
                    $('<li><a href="/Down/Index?filename=' + filename + '"><span class="desc">' + filename + '</span><img src="../../images/header/new01.gif" border="0" style="padding-left: 10px;"></a></li>').appendTo($('#downfilelist'));
                } else {
                    $('<li><a href="/Down/Index?filename=' + filename + '"><span class="desc">' + filename + '</span></a></li>').appendTo($('#downfilelist'));
                }
            } else {
                $('<li><a href="/Down/Index?filename=' + filename + '"><span class="desc">' + filename + '</span></a></li>').appendTo($('#downfilelist'));
            }
        }
    });
}


Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,//月份
        "d+": this.getDate(),//天
        "h+": this.getHours(),//小时
        "m+": this.getMinutes(),//分钟
        "s+": this.getSeconds(),//秒
        "S": this.getMilliseconds()//毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
};

$(function () {




    var contest = $(".page-content");
    //系统菜单绑定
    com.server.get("/api/roleapi/GetRolemeul", '', function (data) {
        if (data != null) {
            toTreeDataOrder(data, 'id', 'parentid');
        }
    });

    $(".nav-list a").each(function (da, element) {
        var target = $(this).attr("href");

        if (target == '#' || target == '') {
            contest.html('<div style=\"padding-top:50%;padding-left:50%\">页面正在加载中请稍等......</div>');
        } else {
            $(this).bind("click", function (e) {
                e.preventDefault();
                //定位选中菜单功能的样式
                //    $(".nav-show").hide();
                $(".active").removeClass("active");
                //  $(".open").removeClass("active");
                // $(".nav-list").find("li").removeClass("open");
                // $(this).parents("li").addClass("open");
                $(this).parents("li").siblings().removeClass("open");


                $(this).parentsUntil("li>.open").addClass("active");
                $(this).parent("li").addClass("active");
                //      $(this).parents(".nav-show").show();
                //contest.html('<div class=\"loading\">页面正在加载中请稍等......</div>');
                contest.html('<div id=\"loading\"><div class=\"loading-shade\"></div><div class=\"loading-content\" onclick=\"$.loading(false)\">数据加载中，请稍后…</div> </div>');
                var $loadingpage = top.$("#loading");
                var $loadingtext = $loadingpage.find('.loading-content');
                $loadingtext.css("left", (top.$('body').width() - $loadingtext.width()) / 2 - 50);
                $loadingtext.css("top", (top.$('body').height() - $loadingtext.height()) / 2);
                $.get(target).done(function (data, textStatus) {
                    contest.html(data);
                }
                    ).fail(function (jqxhr, settings, exception) {
                        contest.html(jqxhr.status + '<br />' + jqxhr.statusText + '<br />' + jqxhr.responseText);
                    });
            });
        }
    });

    //点击更多文件列表
    $('#moreList').bind('click', function (e) {
        e.preventDefault();
        var target = "/sysmanager/downloadlistmanager";
        contest.html('<div class=\"loading\">页面正在加载中请稍等......</div>');
        $.get(target).done(function (data, textStatus) {
            contest.html(data);
        }
            ).fail(function (jqxhr, settings, exception) {
                contest.html(jqxhr.status + '<br />' + jqxhr.statusText + '<br />' + jqxhr.responseText);
            });
    })


    //弹出层绑定鼠标拖动
    $(document).on("show.bs.modal", ".modal", function () {
        $(this).draggable({
            //  handle: ".modal-header"   // 只能点击头部拖动
        });
        $(this).css("overflow", "hidden"); // 防止出现滚动条，出现的话，你会把滚动条一起拖着走的
    });

    $.get("/Welcome").done(function (data, textStatus) {
        contest.html(data);
    }
                    ).fail(function (jqxhr, settings, exception) {
                        contest.html(jqxhr.status + '<br />' + jqxhr.statusText + '<br />' + jqxhr.responseText);
                    });

    RefreshDownFile();

    $('#index_uppassword').on('click', function () {
        $("#UppwdDialog").modal("show");
    });

    $('#save_userpwd').on('click', function () {
        var input1, input2, input3
        var actionurl = '/api/userapi/postuppwd';

        input1 = $('#input1').val();
        input2 = $('#input2').val();;
        input3 = $('#input3').val();

        if (input1.trim() == "") {
            alert('请输入旧密码！');
            return false;
        }
        if (input2.trim() == "") {
            alert('请输入新密码！');
            return false;
        }

        if (input2.length < 6) {
            alert('请输入大于六位的密码！');
            return false;
        }

        if (input3.trim() != input2.trim()) {
            alert('再次输入密码和新密码不相等！');
            return false;
        }
        var postlist;
        postlist = '{ "updatepwd": [{"userid":{$userid},"oldPwd":"' + input1 + '","newPwd": "' + input2 + '",UpdateUser:"{admin}"}]}';
        com.server.post(actionurl, JSON.stringify(postlist), function (data) {
            if (data != null) {
                if (data.code.id == "1") {
                    $("#UppwdDialog").modal("hide");
                    alert('修改密码成功！');
                }
                else if (data.code.id == "2") {
                    alert('旧密码输入错误');
                }
                else {
                    alert(data.code.msg);
                }
            }
        });
    });
});
