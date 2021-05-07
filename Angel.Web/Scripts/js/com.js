/*
 * Created by Alcedo on 2017/3/21.
 * @module Com 
 */
var com = com || {};
com.server = com.server || {};

//ajax-get公共方法一
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
//ajax-get公共方法二
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
//ajax-post公告方法
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
//ajax-delete公告方法
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

// 通用方法封装处理
(function ($) {
    $.extend({
    
        com: {
            // 判断字符串是否为空
            isEmpty: function (value) {
                if (value == null || this.trim(value) == "") {
                    return true;
                }
                return false;
            },
            // 判断一个字符串是否为非空串
            isNotEmpty: function (value) {
                return !$.com.isEmpty(value);
            },
            // 指定随机数返回
            random: function (min, max) {
                return Math.floor((Math.random() * max) + min);
            }
        },
        angelmodal: {
            // 选卡页方式打开
            openTab: function (title, url) {
                createMenuItem(url, title);
            },
            // 打开遮罩层
            loading: function (message) {
                $.blockUI({ message: '<div class="loaderbox"><div class="loading-activity"></div> ' + message + '</div>' });
            },
            // 关闭遮罩层
            closeLoading: function () {
                setTimeout(function () {
                    $.unblockUI();
                }, 50);
            }
        }
    });
})(jQuery);

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


/** 创建选项卡 */
function createMenuItem(dataUrl, menuName) {
    var panelUrl = window.frameElement.getAttribute('data-id');
    dataIndex = $.com.random(1, 100),
        flag = true;
    if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;
    var topWindow = $(window.parent.document);
    // 选项卡菜单已存在
    $('.menuTab', topWindow).each(function () {
        if ($(this).data('id') == dataUrl) {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings('.menuTab').removeClass('active');
                $('.page-tabs-content').animate({ marginLeft: "" }, "fast");
                // 显示tab对应的内容区
                $('.mainContent .AngelRM_iframe', topWindow).each(function () {
                    if ($(this).data('id') == dataUrl) {
                        $(this).show().siblings('.AngelRM_iframe').hide();
                        return false;
                    }
                });
            }
            flag = false;
            return false;
        }
    });
    // 选项卡菜单不存在
    if (flag) {
        var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '" data-panel="' + panelUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
        $('.menuTab', topWindow).removeClass('active');

        // 添加选项卡对应的iframe
        var str1 = '<iframe class="AngelRM_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" data-panel="' + panelUrl + '" seamless></iframe>';
        $('.mainContent', topWindow).find('iframe.AngelRM_iframe').hide().parents('.mainContent').append(str1);

        window.parent.$.angelmodal.loading("数据加载中，请稍后...");
        $('.mainContent iframe:visible', topWindow).load(function () {
            window.parent.$.angelmodal.closeLoading();
        });

        // 添加选项卡
        $('.menuTabs .page-tabs-content', topWindow).append(str);
    }
    return false;
}

/** 刷新选项卡 */
var refreshItem = function () {
    var topWindow = $(window.parent.document);
    var currentId = $('.page-tabs-content', topWindow).find('.active').attr('data-id');
    var target = $('.AngelRM_iframe[data-id="' + currentId + '"]', topWindow);
    var url = target.attr('src');
    target.attr('src', url).ready();
}

/** 关闭选项卡 */
var closeItem = function (dataId) {
    var topWindow = $(window.parent.document);
    if ($.com.isNotEmpty(dataId)) {
        window.parent.$.modal.closeLoading();
        // 根据dataId关闭指定选项卡
        $('.menuTab[data-id="' + dataId + '"]', topWindow).remove();
        // 移除相应tab对应的内容区
        $('.mainContent .AngelRM_iframe[data-id="' + dataId + '"]', topWindow).remove();
        return;
    }
    var panelUrl = window.frameElement.getAttribute('data-panel');
    $('.page-tabs-content .active i', topWindow).click();
    if ($.com.isNotEmpty(panelUrl)) {
        $('.menuTab[data-id="' + panelUrl + '"]', topWindow).addClass('active').siblings('.menuTab').removeClass('active');
        $('.mainContent .AngelRM_iframe', topWindow).each(function () {
            if ($(this).data('id') == panelUrl) {
                $(this).show().siblings('.AngelRM_iframe').hide();
                return false;
            }
        });
    }
}





