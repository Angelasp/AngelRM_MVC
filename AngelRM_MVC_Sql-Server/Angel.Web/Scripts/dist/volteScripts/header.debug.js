/*!
*Debug Of JS*
*Create:2017-03-21*/
function menuFixed(id) {
    var obj = document.getElementsByClassName(id);
    var _getHeight = obj[0].offsetTop;
    $(window).scroll(function () {
        changePos(id, _getHeight);
    });
}

function changePos(id, height) {
    var obj = document.getElementsByClassName(id);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < height) {
        obj[0].style.position = 'relative';
    } else {
        obj[0].style.position = 'fixed';
    }
    obj[0].style.width = "100%";
}
function RefreshDownFile(filenames) {
    $.get('/getSession').done(function (data, textStatus) {
        $.get('/scanFolder', {filepath: './app/Files/import/' + data.userinfo.name})
            .done(function (data, textStatus) {
                $('#header_task_bar>ul>li', parent.document).eq(1).find('ul').html('');
                $('#header_task_bar', parent.document).find('span').eq(0).html(data.length);
                $('#header_task_bar>ul>li', parent.document).eq(0).find('strong').html(data.length);
                for (i = 0; i < data.length; i++) {
                    var filename = data[i].name;
                    var filepath = data[i].path;
                    //为新导出的文件添加‘NEW’
                    if (filenames != '' && filenames != undefined) {
                        $('#header_task_bar', parent.document).find('i').eq(0).css('color', '#2EC7C9').addClass('faa-ring animated').mouseover(function () {
                            $('#header_task_bar', parent.document).find('i').eq(0).css('color', '').removeClass('faa-ring animated')
                        });
                        if (filenames.indexOf(filename.replace('.rar', '').replace('.csv', '').replace('.zip', '')) >= 0) {
                            $('<li><a href="/downfile?filepath=' + filepath + '"><span class="desc">' + filename.substr(0, 18) + '</span><img src="../../images/header/new01.gif" border="0" style="padding-left: 10px;"></a></li>').appendTo($('#header_task_bar>ul>li', parent.document).eq(1).find('ul'));
                        } else {
                            $('<li><a href="/downfile?filepath=' + filepath + '"><span class="desc">' + filename.substr(0, 18) + '</span></a></li>').appendTo($('#header_task_bar>ul>li', parent.document).eq(1).find('ul'));
                        }
                    } else {
                        $('<li><a href="/downfile?filepath=' + filepath + '"><span class="desc">' + filename.substr(0, 18) + '</span></a></li>').appendTo($('#header_task_bar>ul>li', parent.document).eq(1).find('ul'));
                    }
                }
            });
    });
}





function clickMenu(obj) {
    var menuhref = $(obj).attr('name');
    $("#rightCont").attr('src', menuhref);

}
//查询用户菜单
function showUserMenuNavlist() {
    $.get('/getSession').done(function (data, textStatus) {
        var usermenucom = new com.Server("SysUserGetMenuList");
        usermenucom.get({username: data.userinfo.role}, function (data) {
            if (data.response.data != null && data.response.data[0].data.length != 0) {
                toTreeDataOrder(data.response.data, 'id', 'parentid', 'children');
            }
        });
    });
}

//支持3级菜单的生成数据
function toTreeDataOrder(data, id, parentid, children) {
    var mnum = $('<ul id="demo-list"></ul>');
    var groupValues = _.groupBy(_.sortBy(data[0].data, 'orderid'), parentid);//object
    var mycount = 0;
    var myclass = "";
    _.forEach(groupValues[0], function (obj) {
//            if (mycount == 0) {
//                myclass = "class=\"active\"";
//            }
//            else {
//                myclass = "";
//            }
        //添加第一级菜单
        //判断是否有二级菜单,如果有则添加,如果没有直接编写
        if (_.has(groupValues, obj[id])) {
            var mnum1 = $('<li ' + myclass + '><a href="#"><i class="fa fa-check"></i>' + obj.menuname + ' </a> <ul class="submenu"> </ul></li>');
            _.forEach(groupValues[obj[id]], function (menu2) {
                //三级菜单,判断groupvalue中的key是否在menus2中
                if (_.has(groupValues, menu2[id])) {
                    //添加二级菜单
                    //获取三级菜单对象
                    var mnum_2 = $('  <li><a href="#"><i class="fa fa-check"></i>' + menu2.menuname + ' </a> <ul class="submenu"> </ul></li>');
                    _.forEach(groupValues[menu2[id]], function (menu3) {
                        $('<li><a href="#" name="' + menu3.menuurl + '" onclick="clickMenu(this)">' + menu3.menuname + ' </a></li>').appendTo($(mnum_2).find('ul.submenu'));
                    })
                    mnum_2.appendTo(mnum1.find('ul').first());
                } else {
                    $('<li><a href="#" name="' + menu2.menuurl + '" onclick="clickMenu(this)">' + menu2.menuname + ' </a></li>').appendTo(mnum1.find('ul').first());
                }
                mnum1.appendTo(mnum);
            });
        } else {
            $('<li ' + myclass + '><a href="#" name="' + obj.menuurl + '" onclick="clickMenu(this)">' + obj.menuname + '</a></li>').appendTo(mnum);

        }
        mycount = mycount + 1;
    });
    //var reg = new RegExp("/", "g");
    //var is_index = _.where(data[0].data, {isindex: 1});
    //if (is_index.length > 0) {
    //    $('<li class="active"><a href="#" name="' + is_index[0].menuurl + '">' + is_index[0].menuname + '</a></li>').appendTo($('#demo-list').find('ul'));
    //} else {
    //    $('<li class="active"><a href="#"><span></span></a></li>').appendTo($('#jquery-accordion-menu').find('ul'));
    //   // $('<div class="note note-danger note-bordered" style="margin: 100px"><h4 class="block">友情提示：</h4><p>此用户未设置默认首页，请联系管理员。</p></div>').appendTo($('#con_').find('.contents'));
    //}
    mnumtop.appendTo($('.top_menu_list'));
    mnum.appendTo($('.jquery-accordion-menu'));
    //console.log($('.jquery-accordion-menu').html());

    $("#jquery-accordion-menu").jqueryAccordionMenu();
};

/*
 *
 * 添加操作日志方法
 * @param {string} tlogposition 操作位置本类直接写功能类
 * @param {string} toperationtype /操作类型参数可以写 新增、修改、删除、查询
 * @param {string} toperationparam 操作参数{test1:'1111',test2:'weeeeee'}
 *
 * */

function AddOperationLog(tlogposition, toperationtype, toperationparam) {
$.get('/getSession').done(function (data, textStatus) {
    var myDate = new Date();
    var Add_conn = new com.Server('AddOperationlog');
    Add_conn.get({
        userid: data.userinfo.id,
        username: data.userinfo.name,
        roleid: data.userinfo.role,
        rolename: data.userinfo.rolename,
        logposition: tlogposition,
        operationtype: toperationtype,
        operationparam: JSON.stringify(toperationparam),
        createuser: data.userinfo.name,
        createdate: myDate.Format('yyyy-MM-dd hh:mm:ss')
    }, function (datao) {
    });
});
}
var tab0_our;




$(function () {
    //var winWidth = $(window).width();
    //$('#indexLayer2').css({left:(winWidth-250)/2+'px'});
    //$(window).resize(function(){
    //    var winWidth = $(window).width();
    //    $('#indexLayer2').css({left:(winWidth-250)/2+'px'});
    //});
    //$('#indexLayer1').fadeIn();
    //$('#indexLayer2').fadeIn();
    //$.get('/getSession').done(function(data,textStatus){
    //    var pro = new com.Server("GetRoleProjects");
    //    pro.get({page: 1, rowSize: 300,p_type:"2",roleid: data.userinfo.role}, function (data) {
    //        if (typeof(data.response.data[0].data[0])=="object") {
    //            for (var i = 0; i < data.response.data[0].data.length; i++) {
    //                $("#indexSelect").append("<option value='" + data.response.data[0].data[i].p_en + "' province='"+data.response.data[0].data[i].province+"' city='"+data.response.data[0].data[i].p_city+"' startdate='"+data.response.data[0].data[i].pstarttime+"' enddate='"+data.response.data[0].data[i].pendtime+"'>" + data.response.data[0].data[i].p_chn + "</option>");
    //            }
    //            $("#indexSelect option:eq(1)").attr("selected","selected");
    //        }else
    //        {
    //            $("#altinfo").text("项目异常！");
    //            $('#myAlert').css("top", 200).modal('show');
    //            return false;
    //        }
    //    });
    //});
    //$('#indexSure').click(function(){
    //    if($('#indexSelect').val() == '0'){
    //        $("#altinfo").text("请选择项目！");
    //        $('#myAlert').css("top", 200).modal('show');
    //        return false;
    //    }
    //    com.globle.pen = $('#indexSelect').val();
    //    com.globle.penName = $('#indexSelect').find('option:selected').html();
    //    com.globle.province = $('#indexSelect').find('option:selected').attr('province');
    //    com.globle.city = $('#indexSelect').find('option:selected').attr('city');
    //    com.globle.startDate = $('#indexSelect').find('option:selected').attr('startdate');
    //    com.globle.endDate = $('#indexSelect').find('option:selected').attr('enddate');
    //
    // com.globle.pen ="P2";
    // com.globle.penName = "广州数据";
    // com.globle.province ="广东";
    // com.globle.city = "广州";
    // com.globle.startDate = "2015-06-03 00";
    // com.globle.endDate = "2015-06-05 00";

    com.globle.pen = "P18";
    com.globle.penName = "北京数据";
    com.globle.province = "北京";
    com.globle.city = "北京";
    com.globle.startDate = "2015-05-03 10";
    com.globle.endDate = "2015-05-03 11";


    //
    //$('#indexLayer1').fadeOut();
    //$('#indexLayer2').fadeOut();
   // menuFixed('rightCont');
    //Metronic.init(); // init metronic core componets
    Layout.init(); // init layout

});


