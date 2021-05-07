var modelname = "字典类型";
var actionurl = "/api/dictionaryapi/post";
var url = '/api/dictionaryapi/postdictionarylist';
var $table = $('#table');

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
        var keyvalue = $("#search-input").val();
        $table.bootstrapTable("loadAddSearch", keyvalue);
    });


    // 请求服务数据时所传参数
    _queryParams = function (params) {
        var values = {
            rows: params.limit,       // 每页多少条数据
            offset: params.offset  // 请求第几页
        };
        var field = $("#select_field").val();
        var search = $("#search-input").val();
        if (field && search) {
            values[field] = search;
        }
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
        idField: 'id',
        maintainSelected: true,
        // toolbar: '#toolbar',
        columns: [
            { field: 'state', checkbox: true },
            { field: 'id', title: '编号', halign: 'center', align: 'center' },
            { field: 'dictname', title: '名称', halign: 'center', align: 'center' },
            { field: 'dicttype', title: '类型', halign: 'center', align: 'center' },
            { field: 'isvisible', title: '是否可用', halign: 'center', align: 'center' },
            { field: 'createuser', title: '创建账户', halign: 'center', align: 'center' },
            { field: 'createtime', title: '创建时间', halign: 'center', align: 'center' },
            { field: 'action', title: '操作', halign: 'center', align: 'center', events: 'operateEvents', formatter: actionFormatters, clickToSelect: true }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();

    });

    window.operateEvents = {
        //编辑
        'click .edit': function (e, value, row, index) {
            rows = [row];
            if (rows.length < 1 || rows.length > 1) {
                $.alert('修改错误,请选择一行数据进行修改?', '提示');
                return false;
            } else {
                $("#myDialog").find('label').addClass('active');
                $('#dictname').val(rows[0].dictname);
                $('#dicttype').val(rows[0].dicttype);
                $('#remark').val(rows[0].remark);
                if (rows[0].isvisible == "y") {
                    $("input[name='isvisible']").get(0).checked = true;
                }
                else {
                    $("input[name='isvisible']").get(1).checked = true;
                }
                $("#dataTitle").text("编辑字典");
                $("#save").attr("name", "edit");
                $("#myDialog").modal("show");

            }

        },
        //字典详细列表
        'click .dictionarylist': function (e, value, row, index) {
            rows = [row];
           // alert(row.id);
            if (rows.length < 1 || rows.length > 1) {
                $.alert('查看字典详细,请选择一行数据进行修改?', '提示');
                return false;
            } else {
                dicdetail(row.id);
            }

        },
        //删除
        'click .delete': function (e, value, row, index) {
            var rows = [row]

                $.confirm({
                    type: 'red',
                    animationSpeed: 300,
                    title: false,
                    content: '确认删除该' + modelname + '吗？',
                    buttons: {
                        confirm: {
                            text: '确认',
                            btnClass: 'waves-effect waves-button',
                            action: function () {
                                var ids = new Array();
                                for (var i in rows) {
                                    var postlist = '{ "delete": [{ ID:' + rows[i].id + ',"dictname": "' + rows[i].dictname + '"}]}';
                                    com.server.post(actionurl, JSON.stringify(postlist), function (data) { });
                                    ids.push(rows[i].id);
                                }
                                ReloadTable($table, url);
                                var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-' + modelname + '管理","operationtype": "删除' + modelname + '信息编号为:(' + ids.join("-") + ')"}]}';
                                oper_log(postlist1);
                            }
                        },
                        cancel: {
                            text: '取消',
                            btnClass: 'waves-effect waves-button'
                        }
                    }
                });     

        }
    };


    /*字典列表-详细*/
    function dicdetail(dictId) {
        var url = "/sysmanager/dictionarydatamanager/" + dictId;
        $.angelmodal.openTab("字典数据", url);   
    }

});




// 删除
function deleteAction() {
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
            content: '确认删除该' + modelname + '吗？',
            buttons: {
                confirm: {
                    text: '确认',
                    btnClass: 'waves-effect waves-button',
                    action: function () {
                        var ids = new Array();
                        for (var i in rows) {
                            var postlist = '{ "delete": [{ ID:' + rows[i].id + ',"dictname": "' + rows[i].dictname + '"}]}';
                            com.server.post(actionurl, JSON.stringify(postlist), function (data) { });
                            ids.push(rows[i].id);
                        }
                        ReloadTable($table, url);
                        var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-' + modelname + '管理","operationtype": "删除' + modelname + '信息编号为:(' + ids.join("-") + ')"}]}';
                        oper_log(postlist1);
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

//新增/修改
function modifyInfo(obj) {

    if ($(obj).attr('name') == "add") {
        clearFrom();
    } else {
        var rows = $table.bootstrapTable('getSelections');
        if (rows.length < 1 || rows.length > 1) {
            $.alert('修改错误,请选择一行数据进行修改?', '提示');
            return false;
        } else {

            $("#myDialog").find('label').addClass('active');
            $('#dictname').val(rows[0].dictname);
            $('#dicttype').val(rows[0].dicttype);
            $('#remark').val(rows[0].remark);
            if (rows[0].isvisible == "y") {
                $("input[name='isvisible']").get(0).checked = true;
            }
            else {
                $("input[name='isvisible']").get(1).checked = true;
            }

        }
        $("#dataTitle").text("编辑字典");
        $("#save").attr("name", "edit");
    }
    $("#myDialog").modal("show");
}




$('#save').on('click', function () {

    var dictname, dicttype, isvisible, remark;

    dictname = $('#dictname').val();
    dicttype = $('#dicttype').val();;
    isvisible = $('input:radio[name="isvisible"]:checked').val();
    remark = $('#remark').val();


    if (dictname.trim() == "") {
            alert('请输入' + modelname + '名称！');
            return false;
        }
    if (dicttype.trim() == "") {
            alert('请输入字典类型！');
            return false;
        }

    if (isvisible.trim() == "") {
            alert('请选择是否可用！');
            return false;
        }


    var ptype = $(this).attr("name");
    var opstring = "添加";

    var postlist;
    var operationtype;

    if (ptype === "add") {
        //新增
        postlist = '{ "insert": [{ "dictname": "' + dictname + '", "dicttype": "' + dicttype + '", "isvisible": "' + isvisible + '", "remark":"' + remark + '"}]}';
        operationtype = dictname + " 信息";

    } else {
        var rows = $table.bootstrapTable('getSelections');
        //修改
         opstring = "修改";
         postlist = '{ "update": [{ ID:' + rows[0].id + ',"dictname": "' + dictname + '", "dicttype": "' + dicttype + '", "isvisible": "' + isvisible + '", "remark":"' + remark + '"}]}';
         operationtype = rows[0].dictname + " 信息 编号为:" + rows[0].id;
    }

    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
        if (data != null) {

            if (data.code.id == "1") {
                $("#myDialog").modal("hide");
                $.alert('' + opstring + '成功！', '提示');
                ReloadTable($table, url);
                var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-字典管理","operationtype": "' + opstring + '：' + operationtype + '!"}]}';
                oper_log(postlist1);
            }
            else {
                $.alert(data.code.msg);
            }
        }
    });
});

//清空表单
function clearFrom() {
    $("#myDialog").find('label').removeClass('active');
    $('#dictname').val("");
    $('#dicttype').val("");
    $("input[name='isvisible']").get(0).checked = true;
    $('#remark').val("");
}


