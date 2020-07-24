
var $table = $('#table');
var url = '/api/versionapi/get';
var currentVersionNo = 0;
var opt;
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

     opt = {
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
            //{ field: 'state', checkbox: true },
            { field: 'v_name', title: 'APP名称', sortable: true, halign: 'center'},
            { field: 'v_version', title: 'APP版本信息', sortable: true, halign: 'center' },
            { field: 'v_path', title: 'APP服务器存放路径', sortable: true, halign: 'center' },
            { field: 'v_addtime', title: '新增时间', sortable: true, halign: 'center' },
            { field: 'v_ismodify', title: '是否强制更新', sortable: true, halign: 'center' }
           // { field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false }
        ]
    };

    // bootstrap table初始化
    $table.bootstrapTable(opt).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });

});

_fileUpLoadInit = function () {
    $("#input-ke-import").fileinput({
        language: 'zh', //设置语言
        uploadUrl: "/api/versionapi/upload",
        uploadAsync: false, //默认异步上传
        allowedFileExtensions: ['apk'],//接收的文件后缀
        uploadClass: "btn btn-sm btn-success",
        removeClass: "btn btn-sm btn-danger",
        cancelClass: "btn btn-sm btn-default",
        browseClass: "btn btn-sm btn-primary", //按钮样式  
        //enctype: 'multipart/form-data',
        showPreview:false,
       // showUpload:false,
        minFileCount: 1,
        maxFileCount: 1,
        overwriteInitial: true,
        notallowedFilenameExtensions: ['#', '%', '￥', '@'],//文件名中不允许出现的字符 
        uploadExtraData: function () {
            return { v_name: $("#app_name").val(), v_version: $("#version_no").val(),v_ismodify: $('input:radio[name="isenabled"]:checked').val(), c_no: currentVersionNo }
        },
        previewFileIcon: '<i class="fa fa-file"></i>'
    }).on("filebatchuploaderror", function (event, data, previewId, index) {
    }).on("filebatchuploadsuccess", function (event, data, previewId, index) {
        if (data.response['msg'] == "上传成功") {
            alert("恭喜您，已上传成功！");
            $table.bootstrapTable('refresh', opt);
        } else {
            alert(data.response['msg']);
            document.getElementsByClassName("kv-upload-progress")[0].classList.add("hide");
        }
        //$("#input-ke-import").fileinput('clear');
    });
}


var modelname = "APP版本";
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

function showDialog()
{
    _appSelect();
    _updateVersionContent();
    $("#dialog").modal("show");
    _fileUpLoadInit();

    $("#btnUpload").click(function () {
        window.location.href = "/down/DownReportModeFile";
    })
}

//设置APP名称下拉框选项
_appSelect = function () {
    console.log("执行——_appSelect()方法！！！");
    $("#app_name").empty();
    $.ajax({
        type: 'get',
        url: "/api/versionapi/getApps",
        async: false,
        dataType: "json",
        success: function (res) {
            var html = "";
            for (var i in res) {
                html = html + '<option value="' + res[i].v_name + '">' + res[i].v_name + '</option>';
            }
            $("#app_name").append(html);
        }
    });

}
//设置APP版本提示信息，版本号更新
_updateVersionContent = function ()
{
    var appName = $("#app_name").val();
    console.log("执行——_updateVersionContent()方法！！！");
    $.ajax({
        type: 'get',
        url: "/api/versionapi/getAppVersion",
        async: false,
        dataType: "json",
        data: {  
            name: appName
        },
        success: function (res) {
            currentVersionNo = res[0].v_version;
            $("#version_no").attr('placeholder', "填写版本需高于当前版本号 ："+res[0].v_version);
        }
    });
   
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

$('#btnUpdate').on('click', function () {
    $("#roleDialog").show();
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

//function Add()
//{
//    clearFrom();
//    $("#userTitle").text("更新版本");
//    $("#save").attr("name", "add");
//    var contest = $(".page-content");
//    var url = "/SysManager/VersionUpdate";
//    $.get(url).done(function (data, textStatus) {
//        contest.html(data);
//    }).fail(function (jqxhr, settings, exception) {
//        contest.html(jqxhr.status + '<br />' + jqxhr.statusText + '<br />' + jqxhr.responseText);
//    })

//   // window.location.href = "Views/SysManager/VersionUpdate.cshtml";
//}