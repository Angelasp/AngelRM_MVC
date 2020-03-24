var menuData = null;
var url = '/api/loginlogapi/PostList';
var $table = $('#table');
$(function () {
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });


    // 请求服务数据时所传参数
    _queryParams = function (params) {
        var values = {
            //每页多少条数据
            pageSize: params.limit,
            //请求第几页
            offset: params.offset  // 请求第几页
        };
        return values;
    };


    // bootstrap table初始化
    $table.bootstrapTable({
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        url: url,
        striped: false,
        search: false,
        searchOnEnterKey: false,
        showRefresh: false,
        showToggle: false,
        showColumns: false,
        minimumCountColumns: 2,
        showPaginationSwitch: false,
        clickToSelect: false,
        detailView: false,
        detailFormatter: 'detailFormatter',
        pagination: true,
        paginationLoop: true,
        classes: 'table table-hover table-no-bordered table-striped',
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        smartDisplay: false,
        escape: true,
        queryParams: _queryParams,          //传递参数（*）
        //pageNumber: 1,
        //pageSize: 5,
        searchOnEnterKey: true,
        idField: 'systemId',
        maintainSelected: true,
       // toolbar: '#toolbar',
        columns: [

            { field: 'id', title: '编号', halign: 'center',align:'center' },
            { field: 'userName', title: '账户名称', halign: 'center', align: 'center' },
            { field: 'roleName', title: '角色名称', halign: 'center', align: 'center' },
            { field: 'clientIP', title: '登录IP', halign: 'center', align: 'center' },
            { field: 'loginTime', title: '登录时间',halign: 'center', align: 'center' },
            { field: 'createUser', title: '创建账户', halign: 'center', align: 'center' },
            { field: 'createTime', title: '创建时间', halign: 'center', align: 'center' }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();

    });



    //日志导出
    $('#btnExceportlog').on('click', function () {

        //alert('1111');
        var listdata = { name:'导出登录日志'};
        $.ajax({
            url: "/api/loginlogapi/GetExcel",
            type: 'get',
            async: true,
            data: listdata,
            dataType: 'text',
            ajaxError: function () {
                dialog.find('.bootbox-body').html('导出失败!');
            },
            success: function (data) {
                var json = eval('(' + data + ')');
                var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-日志管理-登录日志","operationtype": "导出报表"}]}';
                oper_log(postlist1);
                RefreshDownFile();
                alert('导出成功，请在下载中心进行下载。');
            },
            error: function (data) {
                alert('导出错误');

            }
        });
    });






});

// 删除
function deleteAction() {
    var actionurl = '/api/MenuApi/Post';
    var rows = $table.bootstrapTable('getSelections');
    if (rows.length == 0) {
        $.confirm({
            title: false,
            content: '请至少选择一条记录！',
            autoClose: 'cancel|3000',
            backgroundDismiss: true,
            buttons: {
                cancel: {
                    text: '取消',
                    btnClass: 'waves-effect waves-button'
                }
            }
        });
    } else {
        $.confirm({
            type: 'red',
            animationSpeed: 300,
            title: false,
            content: '确认删除该数据吗？',
            buttons: {
                confirm: {
                    text: '确认',
                    btnClass: 'waves-effect waves-button',
                    action: function () {
                        var ids = new Array();
                        for (var i in rows) {
                            var postlist = '{ "delete": [{ ID:' + rows[i].id + ',"UserName": "' + rows[i].menuname + '"}]}';
                            com.server.post(actionurl, JSON.stringify(postlist), function (data) { });
                            ids.push(rows[i].id);
                        }
                        ReloadTable($table, url);
                        $.alert('删除信息：id=' + ids.join("-"));

                    }
                },
                cancel: {
                    text: '取消',
                    btnClass: 'waves-effect waves-button'
                }
            }
        });
    }
}







