/*
 * Created by Alcedo on 2017/3/21.
 * @module Com 
 */

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
                                $('<li><a class=\"menuItem\" href=\"' + menu4.menuurl + '\">' + menu4.menuname.toUpperCase() + '</a></li>').appendTo(mnum_3.find('ul.submenu'));
                            })
                            mnum_3.appendTo(mnum_2.find('ul.submenu').first());
                        }
                        else {
                            $('<li><a class=\"menuItem\" href=\"' + menu3.menuurl + '\">' + menu3.menuname.toUpperCase() + '</a></li>').appendTo(mnum_2.find('ul.submenu'));
                        }
                        mnum_2.appendTo(mnum1.find('ul.submenu').first());
                    })
                }
                else {
                    $('<li><a  class=\"menuItem\" href=\"' + menu2.menuurl + '\">' + menu2.menuname.toUpperCase() + '</a></li>').appendTo(mnum1.find('ul').first());
                }
                mnum1.appendTo(mnum);
            });
        } else {
            $("<li><a  class=\"menuItem\" href=\"" + obj.menuurl + "\" class=\"dropdown-toggle\">" + obj.menuname.toUpperCase() + "</a><i class=\"menu-icon fa fa-list-alt\"></i><span class=\"menu-text\"></span><b class=\"arrow fa fa-angle-right\"></b><b class=\"arrow\"></b></li>").appendTo(mnum);
        }
    });
    mnum.appendTo($("#sidebar"));
    $('<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse"><i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i></div>').appendTo($("#sidebar"));
}




$(function () {

    var contest = $(".page-content");
    //系统菜单绑定
    com.server.get("/api/roleapi/GetRolemeul", '', function (data) {
        if (data != null) {
            toTreeDataOrder(data, 'id', 'parentid');
        }
    });

    //通过遍历给菜单项加上data-index属性
    $(".menuItem").each(function (index) {
        if (!$(this).attr('data-index')) {
            $(this).attr('data-index', index);
        }
    });

    // iframe处理开始===============
    //计算元素集合的总宽度
    function calSumWidth(elements) {
        var width = 0;
        $(elements).each(function () {
            width += $(this).outerWidth(true);
        });
        return width;
    }

    //滚动到指定选项卡
    function scrollToTab(element) {
        var marginLeftVal = calSumWidth($(element).prevAll()),
        marginRightVal = calSumWidth($(element).nextAll());
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").outerWidth() < visibleWidth) {
            scrollVal = 0;
        } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
            if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                scrollVal = marginLeftVal;
                var tabElement = element;
                while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                    scrollVal -= $(tabElement).prev().outerWidth();
                    tabElement = $(tabElement).prev();
                }
            }
        } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
            scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
        }
        $('.page-tabs-content').animate({
            marginLeft: 0 - scrollVal + 'px'
        },
        "fast");
    }

    //查看左侧隐藏的选项卡
    function scrollTabLeft() {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
            return false;
        } else {
            var tabElement = $(".menuTab:first");
            var offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) { //找到离当前tab最近的元素
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            offsetVal = 0;
            if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).prev();
                }
                scrollVal = calSumWidth($(tabElement).prevAll());
            }
        }
        $('.page-tabs-content').animate({
            marginLeft: 0 - scrollVal + 'px'
        },
        "fast");
    }

    //查看右侧隐藏的选项卡
    function scrollTabRight() {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = calSumWidth($(".content-tabs").children().not(".menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
            return false;
        } else {
            var tabElement = $(".menuTab:first");
            var offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) { //找到离当前tab最近的元素
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            offsetVal = 0;
            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                offsetVal += $(tabElement).outerWidth(true);
                tabElement = $(tabElement).next();
            }
            scrollVal = calSumWidth($(tabElement).prevAll());
            if (scrollVal > 0) {
                $('.page-tabs-content').animate({
                    marginLeft: 0 - scrollVal + 'px'
                },
                "fast");
            }
        }
    }


    function menuItem(target) {
        // 获取标识数据
        var dataUrl = target.attr('href'),
        dataIndex = target.data('index'),
        menuName = $.trim(target.text()),
        flag = true;

        if (dataUrl == undefined || $.trim(dataUrl).length == 0) return false;


        /// alert(dataIndex);



        // 选项卡菜单已存在
        $('.menuTab').each(function () {
            if ($(this).data('id') == dataUrl) {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').siblings('.menuTab').removeClass('active');
                    scrollToTab(this);
                    // 显示tab对应的内容区
                    $('.mainContent .AngelRM_iframe').each(function () {
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
            var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';
            $('.menuTab').removeClass('active');

            // 添加选项卡对应的iframe
            var str1 = '<iframe class="AngelRM_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
            $('.mainContent').find('iframe.AngelRM_iframe').hide().parents('.mainContent').append(str1);


            $.blockUI({ message: '<div class="loaderbox"><div class="loading-activity"></div>数据加载中，请稍后...</div>' });

            $('.mainContent iframe:visible').load(function () {

                setTimeout(function () {
                    $.unblockUI();
                }, 50);
            });

            // 添加选项卡
            $('.menuTabs .page-tabs-content').append(str);
            scrollToTab($('.menuTab.active'));
        }
        return false;
    }



    // 关闭选项卡菜单
    function closeTab() {
        var closeTabId = $(this).parents('.menuTab').data('id');
        var currentWidth = $(this).parents('.menuTab').width();

        // 当前元素处于活动状态
        if ($(this).parents('.menuTab').hasClass('active')) {

            // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
            if ($(this).parents('.menuTab').next('.menuTab').size()) {

                var activeId = $(this).parents('.menuTab').next('.menuTab:eq(0)').data('id');
                $(this).parents('.menuTab').next('.menuTab:eq(0)').addClass('active');

                $('.mainContent .AngelRM_iframe').each(function () {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.AngelRM_iframe').hide();
                        return false;
                    }
                });

                var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                if (marginLeftVal < 0) {
                    $('.page-tabs-content').animate({
                        marginLeft: (marginLeftVal + currentWidth) + 'px'
                    },
                    "fast");
                }

                //  移除当前选项卡
                $(this).parents('.menuTab').remove();

                // 移除tab对应的内容区
                $('.mainContent .AngelRM_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }

            // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
            if ($(this).parents('.menuTab').prev('.menuTab').size()) {
                var activeId = $(this).parents('.menuTab').prev('.menuTab:last').data('id');
                $(this).parents('.menuTab').prev('.menuTab:last').addClass('active');
                $('.mainContent .AngelRM_iframe').each(function () {
                    if ($(this).data('id') == activeId) {
                        $(this).show().siblings('.AngelRM_iframe').hide();
                        return false;
                    }
                });

                //  移除当前选项卡
                $(this).parents('.menuTab').remove();

                // 移除tab对应的内容区
                $('.mainContent .AngelRM_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
            }
        }
            // 当前元素不处于活动状态
        else {
            //  移除当前选项卡
            $(this).parents('.menuTab').remove();

            // 移除相应tab对应的内容区
            $('.mainContent .AngelRM_iframe').each(function () {
                if ($(this).data('id') == closeTabId) {
                    $(this).remove();
                    return false;
                }
            });
            scrollToTab($('.menuTab.active'));
        }
        return false;
    }

    $('.menuTabs').on('click', '.menuTab i', closeTab);

    //关闭其他选项卡
    function closeOtherTabs() {
        $('.page-tabs-content').children("[data-id]").not(":first").not(".active").each(function () {
            $('.AngelRM_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').css("margin-left", "0");
    }
    $('.tabCloseOther').on('click', closeOtherTabs);

    //滚动到已激活的选项卡
    function showActiveTab() {
        scrollToTab($('.menuTab.active'));
    }
    $('.tabShowActive').on('click', showActiveTab);

    // 点击选项卡菜单
    function activeTab() {
        if (!$(this).hasClass('active')) {
            var currentId = $(this).data('id');
            // 显示tab对应的内容区
            $('.mainContent .AngelRM_iframe').each(function () {
                if ($(this).data('id') == currentId) {
                    $(this).show().siblings('.AngelRM_iframe').hide();
                    return false;
                }
            });
            $(this).addClass('active').siblings('.menuTab').removeClass('active');
            scrollToTab(this);
        }
    }

    // 点击选项卡菜单
    $('.menuTabs').on('click', '.menuTab', activeTab);

    //刷新iframe
    function refreshTab() {
        var currentId = $('.page-tabs-content').find('.active').attr('data-id');
        var target = $('.AngelRM_iframe[data-id="' + currentId + '"]');
        var url = target.attr('src');
        target.attr('src', url).ready();
    }

    //// 全屏显示
    //$('#fullScreen').on('click', function () {
    //    $('#wrapper').fullScreen();
    //});

    // 刷新按钮
    $('.tabReload').on('click', refreshTab);

    $('.menuTabs').on('dblclick', '.menuTab', refreshTab);

    // 左移按扭
    $('.tabLeft').on('click', scrollTabLeft);

    // 右移按扭
    $('.tabRight').on('click', scrollTabRight);

    // 关闭当前
    $('.tabCloseCurrent').on('click', function () {
        $('.page-tabs-content').find('.active i').trigger("click");
    });

    // 关闭全部
    $('.tabCloseAll').on('click', function () {
        $('.page-tabs-content').children("[data-id]").not(":first").each(function () {
            $('.AngelRM_iframe[data-id="' + $(this).data('id') + '"]').remove();
            $(this).remove();
        });
        $('.page-tabs-content').children("[data-id]:first").each(function () {
            $('.AngelRM_iframe[data-id="' + $(this).data('id') + '"]').show();
            $(this).addClass("active");
        });
        $('.page-tabs-content').css("margin-left", "0");
    });

    /**
     * iframe处理结束
     */

    $(".nav-list a").each(function (da, element) {
        var target = $(this);

        if (target.attr("href") == '#' || target.attr("href") == '') {
            // contest.html('<div style=\"padding-top:50%;padding-left:50%\">页面正在加载中请稍等......</div>');
        } else {
            $(this).bind("click", function (e) {
                e.preventDefault();
                //定位选中菜单功能的样式
                //    $(".nav-show").hide();
                $(".active").removeClass("active");
                $(this).parents("li").siblings().removeClass("open");
                $(this).parentsUntil("li>.open").addClass("active");
                $(this).parent("li").addClass("active");
                menuItem(target);
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

    //$.get("/Welcome").done(function (data, textStatus) {
    //    contest.html(data);
    //}
    //                ).fail(function (jqxhr, settings, exception) {
    //                    contest.html(jqxhr.status + '<br />' + jqxhr.statusText + '<br />' + jqxhr.responseText);
    //                });

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
















