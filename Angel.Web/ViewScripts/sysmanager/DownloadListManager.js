var modelname = "用户";
var actionurl = "/api/downloadlistmanagerapi/post";
var url = '/api/downloadlistmanagerapi/get';
var url_sub = '/api/downloadlistmanagerapi/GetOneUserDownloadList';
var $table = $('#table');
var $utable = $('#user_downloadlist');
var userid = $("#userid").val();

$(function () {

    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });

    //查询搜索
    $('#btnSearch').on('click', function () {
        var keyvalue = $(".btnSearch").val();
        $table.bootstrapTable("loadAddSearch", keyvalue);
    });



    // 用户指标列表检索刷新
    $("#searchT").click(function () {
        var keyvalue = $("#nav-search-input").val();
        debugger;
        $utable.bootstrapTable("loadAddSearch", keyvalue);
    });

    // bootstrap table初始化
    // 
    $table.bootstrapTable({
        url: url + "?userid=" + userid,
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
        // detailFormatter: 'detailFormatter',
        pagination: true,
        paginationLoop: false,
        classes: 'table table-hover table-no-bordered table-striped',
        //sidePagination: 'server',
        //silentSort: false,
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        //pageNumber: 1,
        //pageSize: 5,
        idField: 'systemId',
        maintainSelected: false,
        columns: [
            { field: 'state', checkbox: true },            
            { field: 'userid', title: '编号', sortable: true, halign: 'center' },
            { field: 'username', title: '用户名', sortable: true, halign: 'center' },
            { field: 'action', title: '操作', halign: 'center', align: 'center', formatter: actionFormatters, events: 'actionEvents', clickToSelect: false }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });


    function actionFormatters(value, row, index) {
        //if (row.userid == 1) {
        //} else {
        return '<a class="detail" href="javascript:void(0)" data-toggle="tooltip" title="下载列表查看"><i class="glyphicon glyphicon-zoom-in"></i></a>';
        //}
    }

    window.actionEvents = {
        'click .detail': function (e, value, row, index) {
            UserDownloadList(row.userid);
            $("#username").html(row.username);
            $("#userDownloadDialog").modal("show");

        }
    };
});


function UserDownloadList(uid) {
    $utable.bootstrapTable('destroy');
    $utable.bootstrapTable({
        url: url_sub,
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
        queryParams: { userid: uid }, //参数 
        idField: 'systemId',
        maintainSelected: false,
        columns: [
            { field: 'userid', title: '编号', sortable: true, halign: 'center' },
            { field: 'username', title: '用户名', sortable: true, halign: 'center' },
            { field: 'filename', title: '文件名', sortable: true, halign: 'center' },
            { field: 'createuser', title: '创建者', sortable: true, halign: 'center' },
            { field: 'createtime', title: '创建时间', sortable: true, halign: 'center' },
            { field: 'action', title: '操作', halign: 'center', align: 'center', formatter: actionFormatters_sub, events: 'actionEvents_sub', clickToSelect: false }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });

}

function actionFormatters_sub(value, row, index) {
    //if (row.userid == 1) {
    //} else {
    return '<a class="download" href="javascript:void(0)" title="下载文件"><i class="glyphicon glyphicon-download-alt"></i></a>';
    //}
}

window.actionEvents_sub = {
    'click .download': function (e, value, row, index) {
        window.location.href = row.downloadhref;
    }
};

// 删除
function deleteAction() {
    debugger;
    var datadiff = 7;
    var curdate = new Date().Format('yyyy-MM-dd');
    var username = $("#username").text();

    $.confirm({
        type: 'red',
        animationSpeed: 300,
        title: false,
        content: '确认删除七天前的文件吗，删除后不可恢复！',
        buttons: {
            confirm: {
                text: '确认',
                btnClass: 'waves-effect waves-button',
                action: function () {
                    //删除数据库上的文件
                    debugger;
                    var postlist = '{ "delete7daysBefore": [{ "datediff":' + datadiff + ',"curdate": "' + curdate + '","username":"' + username + '"}]}';
                    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
                        debugger;
                        if (data != null && data.code.id == 1) {
                            //删除磁盘上的文件
                            alert("删除成功！");
                            RefreshDownFile();
                            $utable.bootstrapTable('refresh', { pageNumber: 1 });
                        } else if(data !=null && data.code.id == -1) {
                            alert(data.code.msg);
                        }
                        else
                            alert("删除失败！");
                    }); 
                }
            },
            cancel: {
                text: '取消',
                btnClass: 'waves-effect waves-button'
            }
        }
    });
}




//清空表单
function clearFrom() {
    $("#userDialog").find('label').removeClass('active');
    $('#input1').attr("disabled", false);
    $('#input1').val("");
    $('#input2').val("");
    $('#input3').val("");
    $("input[name='isenabled']:eq(0)").attr("checked", 'checked');
}

//弹出选择框
function showIndicatorTree(uid) {
    getIndicatorData(uid);
    //  $("#indicatorTree").modal('show');
}

