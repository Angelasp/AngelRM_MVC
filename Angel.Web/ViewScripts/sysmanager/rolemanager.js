
var $table = $('#table');
var url = '/api/roleapi/get';

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
    // bootstrap table初始化
    // 
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
            { field: 'id', title: '编号', sortable: true, halign: 'center' },
            { field: 'rolename', title: '角色名称', sortable: true, halign: 'center' },
            { field: 'level', title: '角色级别', sortable: true, halign: 'center' },
            { field: 'remark', title: '角色备注', sortable: true, halign: 'center' },
            { field: 'isenabled', title: '是否可用', sortable: true, align: 'center', formatter: function (value) { if (value == 'y') { return "<span class='badge bg-red' style='padding:2px 8px;'>正常</span>"; } else { return "<span class='badge bg-green' style='padding:2px 8px;'>禁用</span>"; } } },
            { field: 'createuser', title: '创建者', sortable: true, halign: 'center' },
            { field: 'createtime', title: '创建时间', sortable: true, halign: 'center' },
            { field: 'updateuser', title: '更新者', sortable: true, halign: 'center' }//,
           // { field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });


});



function getMenuData(rid) {

    var url = '/api/menuapi/get';
    var urlr = '/api/menuapi/getroleid';
    if (rid > 0) {
        $.ajax({
            type: "GET",
            url: urlr,
            data: { roleid: rid },
            dataType: "json",
            success: function (datar) {
                com.server.get(url, function (data) {
                    if (data != null) {
                        var treeObj = { id: "", text: "", pid: "", state: { checked: null, selected: null }, nodes: [] };
                        var menuData = getNewTreeDataIstrue(data, datar, treeObj, 0).nodes;
                        $('#treeDemo').treeview({
                            data: menuData,
                            showCheckbox: true,
                            onNodeChecked: nodeChecked,
                            onNodeUnchecked: nodeUnchecked
                        });
                        $('#treeDemo').treeview('collapseAll');
                        //  $('#treeDemo').treeview('checkAll');

                    }
                });

            }
        });



    }
    else {

        com.server.get(url, function (data) {
            if (data != null) {
                var treeObj = { id: "", text: "", pid: "", state: { checked: null, selected: null }, nodes: [] };
                var menuData = getNewTreeDataIstrue(data, null, treeObj, 0).nodes;
                $('#treeDemo').treeview({
                    data: menuData,
                    showCheckbox: true,
                    onNodeChecked: nodeChecked,
                    onNodeUnchecked: nodeUnchecked
                });
                $('#treeDemo').treeview('collapseAll');
                //$('#treeDemo').treeview('checkAll');

            }
        });
    }
}


function getNewTreeDataIstrue(data, data1, treeObj, pid) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentid === pid) {
            var childObj = new Object();
            childObj.text = data[i].menuname;
            childObj.id = data[i].id;
            childObj.pid = data[i].parentid;
            if (data1 != null) {
                for (var h = 0; h < data1.length; h++) {
                    if (data1[h].id == data[i].id) {
                        childObj.state = { checked: true, selected: null };
                    }
                }
            }
            if (!treeObj.nodes)
                treeObj.nodes = [];
            treeObj.nodes.push(childObj);

            getNewTreeDataIstrue(data, data1, childObj, data[i].id);
        }
    }
    return treeObj;
}







var modelname = "角色";
var actionurl = "/api/roleapi/post";

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
                            var postlist = '{ "delete": [{ ID:' + rows[i].id + ',"rolename": "' + rows[i].rolename + '"}]}';
                            com.server.post(actionurl, JSON.stringify(postlist), function (data) {
                                if (data.code.id == 1) {
                                    postlist = '{ "deleterole": [{ "roleid": "' + rows[i].id + '"}]}';
                                    com.server.post(actionurl, JSON.stringify(postlist), function (data) { });
                                    ids.push(rows[i].id);

                                }
                            });
                        }
                        ReloadTable($table, url);
                        var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-角色管理","operationtype": "删除角色信息编号为:(' + ids.join("-") + ')"}]}';
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

//清空表单
function clearFrom() {
    $("#roleDialog").find('label').removeClass('active');
    $('#input1').attr("value", "");
    $('#input2').attr("value", "");
    $('#input3>input').attr("value", "");
    $('#input2').val('');
  //  $('#input3>input').val('');
    $('#input4>input').val('');
    $("input[name='isvisible']:eq(0)").attr("checked", 'checked');
}

function showMenuTree() {
    $("#menuTree").modal('show');
}

function showRole(obj) {
    if ($(obj).attr('name') === "add") {
        clearFrom();
        getMenuData(0);
        $("#roleTitle").text("新增角色");
        //$('#input2').attr("value", 0);
        $("#save_role").attr("name", "add");
    } else {
        var rows = $table.bootstrapTable('getSelections');
        if (rows.length == 0) {
            $.alert('请至少选择一条记录！', '提示');
            return false;
        } else {

            // alert(rows[0].rolename);
            getMenuData(rows[0].id);
            $("#roleDialog").find('label').addClass('active');
            $('#input1').attr("value", rows[0].rolename);
            $('#input2').attr("value", rows[0].remark);
            $('#input2').val(rows[0].remark);
            $('#input4>input').attr("value", rows[0].level);
            $('#input4>input').val(rows[0].level);

            if (rows[0].isenabled == "y") {
                $("input[name='isenabled']:eq(0)").attr("checked", 'checked');
            }
            else {
                $("input[name='isenabled']:eq(1)").attr("checked", 'checked');
            }
        }
        $("#roleTitle").text("编辑角色");
        $("#save_role").attr("name", "edit");
    }
    $("#roleDialog").modal("show");
}

$('#save_role').on('click', function () {
    var input1, input2, input3, input4;
    var results;
    var actionurl = '/api/roleapi/Post';

    input1 = $('#input1').val();
    input2 = $('#input2').val();;
    results = $('#treeDemo').treeview('getChecked');
    input4 = $('#input4>input').val();
    input5 = $('input:radio[name="isenabled"]:checked').val();

    if (input1.trim() == "") {
        alert('请输入角色名称！');
        return false;
    }
    if (results.length < 1) {
        alert('请选择管理菜单！');
        return false;
    }
    if (input4.length < 1) {
        alert('请输入角色级别！');
        return false;
    }

    var postlist;
    var ptype;
    var operationtype;
    if ($(this).attr("name") === "add") {
        ptype = "add";
        operationtype = "新增角色名称:" + input1;
        postlist = '{ "insert": [{ "RoleName": "' + input1 + '", level:"' + input4 + '", "Remark": "' + input2 + '", "IsEnabled": "' + input5 + '", "CreateUser": "admin"}]}';
    } else {
        var rows = $table.bootstrapTable('getSelections');
        ptype = "update";
        operationtype = "修改角色名称:" + input1 + " 角色编号:" + rows[0].id;
        postlist = '{ "update": [{ ID:' + rows[0].id + ',"RoleName": "' + input1 + '", level:"' + input4 + '" ,Remark:"' + input2 + '", "IsEnabled": "' + input5 + '", UpdateUser:"admin", "CreateUser": "admin"}]}';
    }
    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
        if (data != null) {
            var roleMenusql = "";
            var roleid;
            if (ptype == "add") {
                roleid = Number(data);
            }
            else {
                roleid = rows[0].id;
                postlist = '{ "deleterole": [{ "roleid": "' + roleid + '"}]}';
                com.server.post(actionurl, JSON.stringify(postlist), function (data) { });
            }
            
            $.each(results, function (index, result) {
                roleMenusql += "(" + roleid + "," + result.id + ",0),";
            });
            roleMenusql = roleMenusql.substring(0, roleMenusql.length - 1);


            postlist = '{ "insertRoleMenu": [{ "roleMenusql": "' + roleMenusql + '"}]}';
            com.server.post(actionurl, JSON.stringify(postlist), function (data) {

                $("#roleDialog").modal("hide");
                alert('保存成功！');
                ReloadTable($table, url);
                var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-角色管理","operationtype": "' + operationtype + '!"}]}';
                oper_log(postlist1);



            });

        }
    });
}
);

$('#save_tree').on('click', function () {
    var results = $('#treeDemo').treeview('getChecked');
    var ids = [];
    $.each(results, function (index, result) {
        ids.push(result.id);
    });
    $("#menuTree").modal('hide');
    $("#roleDialog").find("label[name='input3']").addClass('active');
    $("#input3>input").val(ids);
});



var nodeCheckedSilent = false;
function nodeChecked(event, node) {
    if (nodeCheckedSilent) {
        return;
    }
    nodeCheckedSilent = true;
    checkAllParent(node);
    checkAllSon(node);
    nodeCheckedSilent = false;
}

var nodeUncheckedSilent = false;
function nodeUnchecked(event, node) {
    if (nodeUncheckedSilent)
        return;
    nodeUncheckedSilent = true;
    uncheckAllParent(node);
    uncheckAllSon(node);
    nodeUncheckedSilent = false;
}

//选中全部父节点
function checkAllParent(node) {
    $('#treeDemo').treeview('checkNode', node.nodeId, { silent: true });
    var parentNode = $('#treeDemo').treeview('getParent', node.nodeId);
    if (!("id" in parentNode)) {
        return;
    } else {
        checkAllParent(parentNode);
    }
}
//取消全部父节点
function uncheckAllParent(node) {
    $('#treeDemo').treeview('uncheckNode', node.nodeId, { silent: true });
    var siblings = $('#treeDemo').treeview('getSiblings', node.nodeId);
    var parentNode = $('#treeDemo').treeview('getParent', node.nodeId);
    if (!("id" in parentNode)) {
        return;
    }
    var isAllUnchecked = true;  //是否全部没选中
    for (var i in siblings) {
        if (siblings[i].state.checked) {
            isAllUnchecked = false;
            break;
        }
    }
    if (isAllUnchecked) {
        uncheckAllParent(parentNode);
    }
}

//级联选中所有子节点
function checkAllSon(node) {
    $('#treeDemo').treeview('checkNode', node.nodeId, { silent: true });
    if (node.nodes != null && node.nodes.length > 0) {
        for (var i in node.nodes) {
            checkAllSon(node.nodes[i]);
        }
    }
}
//级联取消所有子节点
function uncheckAllSon(node) {
    $('#treeDemo').treeview('uncheckNode', node.nodeId, { silent: true });
    if (node.nodes != null && node.nodes.length > 0) {
        for (var i in node.nodes) {
            uncheckAllSon(node.nodes[i]);
        }
    }
}