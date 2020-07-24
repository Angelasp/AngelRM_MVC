var menuData = null;
var url = '/api/loginlogapi/GetOperLog';
var $table = $('#table');
$(function () {
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });

    // bootstrap table初始化
    $table.bootstrapTable({
        url: url,
        striped: true,
        search: false,
        searchOnEnterKey: false,
        showRefresh: false,
        showToggle: false,
        showColumns: false,
        minimumCountColumns: 2,
        showPaginationSwitch: false,
        clickToSelect: false,
        detailView: false,
        pagination: true,
        paginationLoop: false,
        classes: 'table table-hover table-no-bordered table-striped',
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        idField: 'id',
        maintainSelected: false,
        columns: [
            { field: 'id', title: '编号', halign: 'center',align:'center' },
            { field: 'username', title: '账户名称', halign: 'center', align: 'center' },
            { field: 'rolename', title: '角色名称', halign: 'center', align: 'center' },
            { field: 'logposition', title: '功能名称', halign: 'center', align: 'center' },
            { field: 'operationtype', title: '操作类型', halign: 'center', align: 'center' },
            { field: 'operationparam', title: '操作参数', halign: 'center', align: 'center' },
            { field: 'createdate', title: '创建时间', halign: 'center', align: 'center' }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();

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







