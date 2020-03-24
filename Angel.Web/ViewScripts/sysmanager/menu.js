var menuData = null;
var url = '/api/menuapi/get';
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
    queryParams = function (params) {
        var keyvalue = $("#search-input").val();
        var values = {
            //每页多少条数据
            pageSize: params.limit,
            //请求第几页
            offset: params.offset, // 请求第几页
            text: keyvalue
        };
        return values;
    };

    //查询搜索

    $('#btnSearch').on('click', function () {
        var keyvalue = $("#search-input").val();
        $table.bootstrapTable("loadAddSearch", keyvalue);
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
        // toolbar: '#toolbar',
        columns: [
            { field: 'state', checkbox: true },
            { field: 'id', title: '编号', sortable: true, halign: 'center'},
            { field: 'menuname', title: '菜单名称', sortable: true, halign: 'center' },
            { field: 'parentid', title: '父类ID', sortable: true, halign: 'center' },
            { field: 'orderid', title: '排序号', sortable: true, halign: 'center' },
            { field: 'menuicon', title: '图标', sortable: true, halign: 'center' },
            { field: 'menuurl', title: '菜单路径', sortable: true, halign: 'center' },
            { field: 'isvisible', title: '是否显示', sortable: true, halign: 'center', formatter: function (value) { if (value == 'y') { return "<span class='badge bg-red' style='padding:2px 8px;'>显示</span>"; } else { return "<span class='badge bg-green' style='padding:2px 8px;'>隐藏</span>"; } } },
       //     { field: 'isenabled', title: '是否可用', sortable: true, halign: 'center', formatter: function (value) { if (value == 'y') { return "<span class='badge bg-red' style='padding:2px 8px;'>可用</span>"; } else { return "<span class='badge bg-green' style='padding:2px 8px;'>禁用</span>"; } } },
            { field: 'createuser', title: '创建者', sortable: true, halign: 'center' },
            { field: 'remark', title: '菜单备注', sortable: true, halign: 'center' }
            //,
            //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        //$('[data-toggle="popover"]').popover(); 
        if (args[0] != undefined) {
            var treeObj = { id: "", text: "", pid: "", nodes: [] };
            if (menuData == null)
                menuData = getNewTreeData(args[0], treeObj, 0).nodes;
            //  console.log("menuData:" + menuData);
            // console.log(JSON.stringify(menuData));
        }

    });

});
function showIcon() {
    $('#iconselect').modal();
};
//获取class元素
function js_method(obj) {
    var text = $(obj).find("i").attr("class");
    $("#input4").val(text);
    $("#iconselect").modal('hide');
}

function getNewTreeData(data, treeObj, pid) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentid === pid) {
            var childObj = new Object();
            childObj.text = data[i].menuname;
            childObj.id = data[i].id;
            childObj.pid = data[i].parentid;
            if (!treeObj.nodes)
                treeObj.nodes = [];
            treeObj.nodes.push(childObj);

            getNewTreeData(data, childObj, data[i].id);
        }
    }
    return treeObj;
}


// 新增
function createAction() {
    clearFrom();
    $.confirm({
        type: 'dark',
        draggable: true,
        animationSpeed: 300,
        title: '新增' + modelname,
        content: $('#createDialog').html(),
        buttons: {
            confirm: {
                text: '确认',
                btnClass: 'waves-effect waves-button',
                action: function () {
                    var input1 = this.$content.find('#input1').val();
                    var input2 = this.$content.find('#input2').val();
                    var input3 = this.$content.find('#input3').val();
                    var input4 = this.$content.find('#input4').val();
                    var input5 = this.$content.find('#input5').val();
                    var nopic = "defultico";
                    var input6 = "";
                    input6 = this.$content.find('input:radio[name="isvisible"]:checked').val();
                    var input7 = "";
                    input7 = this.$content.find('input:radio[name="isenabled"]:checked').val();
                    var input8 = this.$content.find('#input8>input').val();

                    if (input1.trim() == "") {
                        $.alert('请输入菜单名称！');
                        return false;
                    }
                    if (input2.trim() == "") {
                        $.alert('请输入父类id！');
                        return false;
                    }
                    if (input3.trim() == "") {
                        $.alert('请输入排序号！');
                        return false;
                    }
                    if (input4.trim() == "") {
                        $.alert('请输入菜单图标！');
                        return false;
                    }
                    if (input5.trim() == "") {
                        $.alert('请输入菜单路径！');
                        return false;
                    }
                    if (input6.trim() == "") {
                        $.alert('请选择是否显示！');
                        return false;
                    }
                    if (input7.trim() == "") {
                        $.alert('请选择是否禁用！');
                        return false;
                    }
                    if (input6 != "Y") {
                        input6 = "N";
                    }
                    if (input7 != "Y") {
                        input6 = "N";
                    }
                    var postlist = '{ "insert": [{ "menuname": "' + input1 + '", "parentid": ' + input2 + ', "remark": "' + input8 + '", "menuicon": "' + nopic + '", "menuurl": "' + input5 + '", "orderid": "' + input3 + '", "isvisible": "' + input6 + '", "isenabled":" ' + input7 + '", "createuser": "admin" }]}';
                    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
                        if (data != null) {
                            if (data.code.id == "1") {
                                $.alert('保存成功！', '提示');
                                ReloadTable($table, url);
                            }
                            else {
                                $.alert(data.code.msg);
                            }
                        }
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
// 编辑
function updateAction() {
    var rows = $table.bootstrapTable('getSelections');
    if (rows.length < 1 || rows.length > 1) {
        $.confirm({
            title: false,
            draggable: true,
            content: '请选择一条记录！',
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
        $("#createDialog").find('label').addClass('active');
        $('#input1').attr("value", rows[0].menuname);

        alert(rows[0].parentid);


        $('#input2').attr("value", rows[0].parentid);
        $('#input3').attr("value", rows[0].orderid);
        $('#input4').attr("value", rows[0].menuicon);
        $('#input5').attr("value", rows[0].menuurl);
        $('#input8>input').attr("value", rows[0].remark);
        if (rows[0].isvisible == "y") {
            $("input[name='isvisible']:eq(0)").attr("checked", 'checked');
        }
        else {
            $("input[name='isvisible']:eq(1)").attr("checked", 'checked');
        }

        if (rows[0].isenabled == "y") {
            $("input[name='isenabled']:eq(0)").attr("checked", 'checked');
        }
        else {
            $("input[name='isenabled']:eq(1)").attr("checked", 'checked');
        }
        $.confirm({
            type: 'blue',
            animationSpeed: 300,
            title: '编辑' + modelname,
            content: $('#createDialog').html(),
            buttons: {
                confirm: {
                    text: '确认',
                    btnClass: 'waves-effect waves-button',
                    action: function () {

                        var input1 = this.$content.find('#input1').val();
                        var input2 = this.$content.find('#input2').val();
                        var input3 = this.$content.find('#input3').val();
                        var input4 = this.$content.find('#input4').val();
                        var input5 = this.$content.find('#input5').val();
                        var nopic = "defultico";
                        var input6 = "";
                        input6 = this.$content.find('input:radio[name="isvisible"]:checked').val();
                        var input7 = "";
                        input7 = this.$content.find('input:radio[name="isenabled"]:checked').val();
                        var input8 = this.$content.find('#input8>input').val();

                        if (input1.trim() == "") {
                            $.alert('请输入菜单名称！');
                            return false;
                        }
                        if (input2.trim() == "") {
                            $.alert('请输入父类id！');
                            return false;
                        }
                        if (input3.trim() == "") {
                            $.alert('请输入排序号！');
                            return false;
                        }
                        if (input4.trim() == "") {
                            $.alert('请输入菜单图标！');
                            return false;
                        }
                        if (input5.trim() == "") {
                            $.alert('请输入菜单路径！');
                            return false;
                        }
                        if (input6.trim() == "") {
                            $.alert('请选择是否显示！');
                            return false;
                        }
                        if (input7.trim() == "") {
                            $.alert('请选择是否禁用！');
                            return false;
                        }

                        if (input6 != "Y") {
                            input6 = "N";
                        }
                        if (input7 != "Y") {
                            input7 = "N";
                        }

                        var postlist = '{ "update": [{ id:' + rows[0].id + ',"menuname": "' + input1 + '", "parentid": ' + input2 + ', "remark": "' + input8 + '", "menuicon": "' + nopic + '", "menuurl": "' + input5 + '", "orderid": "' + input3 + '", "isvisible": "' + input6 + '", "isenabled":" ' + input7 + '", "createuser": "admin","updateuser": "admin" }]}';
                        com.server.post(actionurl, JSON.stringify(postlist), function (data) {
                            if (data != null) {
                                if (data.code.id == "1") {
                                    $.alert('更新成功！', '提示');
                                    ReloadTable($table, url);
                                }
                                else {
                                    $.alert(data.code.msg);
                                }
                            }
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
}
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
                        var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "删除菜单信息编号为:(' + ids.join("-") + ')"}]}';
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
    //$("#createDialog").find('label').removeClass('active');
    $('#input1').attr("value", "");
    $('#input2').attr("value", "");
    $('#input3').attr("value", "");
    $('#input4').attr("value", "");
    $('#input5').attr("value", "");
    $ ('#input8>input').val("");
    $("input[name='isvisible']:eq(0)").attr("checked", 'checked');
    $("input[name='isenabled']:eq(0)").attr("checked", 'checked');
}

function showMenuTree() {
    $("#menuTree").modal('show');
    if (menuData[0].text == "一级父类") {
        menuData.shift();
    }
    menuData.unshift({ id: "0", text: "一级父类", pid: "0" });
    $('#treeDemo').treeview({
        data: menuData,
        onNodeSelected: function (event, node) {
            $('#input2').val(node.id);
            $("#menuTree").modal('hide');
            $("#menuDialog").find("label[name='input2']").addClass('active');
        }
    });
}

function showMenu(obj) {
    var actionurl = '/api/MenuApi/Post';
    if ($(obj).attr('name') === "add") {
        clearFrom();
        $("#menuTitle").text("新增菜单");
        //$('#input2').attr("value", 0);
        $("#save_menu").attr("name", "add");
    } else {
        var rows = $table.bootstrapTable('getSelections');
        if (rows.length < 1 || rows.length > 1) {
            $.alert('请至少一条记录！', '提示');
            return false;
        } else {
            $("#menuDialog").find('label').addClass('active');
            $('#input1').attr("value", rows[0].menuname);
            $('#input2').attr("value", rows[0].parentid);
            $('#input3').attr("value", rows[0].orderid);
            $('#input4').attr("value", rows[0].menuicon);
            $('#input5').attr("value", rows[0].menuurl);
            $('#input8>input').val(rows[0].remark);
            if (rows[0].isvisible == "y") {
                $("input[name='isvisible']:eq(0)").attr("checked", 'checked');
            }
            else {
                $("input[name='isvisible']:eq(1)").attr("checked", 'checked');
            }

            if (rows[0].isenabled == "y") {
                $("input[name='isenabled']:eq(0)").attr("checked", 'checked');
            }
            else {
                $("input[name='isenabled']:eq(1)").attr("checked", 'checked');
            }
        }
        $("#menuTitle").text("编辑菜单");
        $("#save_menu").attr("name", "edit");
    }
    $("#menuDialog").modal("show");
}

$('#save_menu').on('click', function () {
    var input1, input2, input3, input4, input5, input6, input7, input8, nopic;
    var actionurl = '/api/MenuApi/Post';

    input1 = $('#input1').val();
    input2 = $('#input2').val();;
    input3 = $('#input3').val();
    input4 = $('#input4').val();
    input5 = $('#input5').val();
    if (input4 != "") {
        nopic = input4;
    } else {
        nopic = "defultico";

    }
    input6 = $('input:radio[name="isvisible"]:checked').val();
    input7 = $('input:radio[name="isenabled"]:checked').val();
    input8 = $('#input8>input').val();
    if (input1.trim() == "") {
        alert('请输入菜单名称！');
        return false;
    }
    if (input2.trim() == "") {
        alert('请选择父类菜单！');
        return false;
    }
    if (input3.trim() == "") {
        alert('请输入排序号！');
        return false;
    }
    if (input4.trim() == "") {
        alert('请输入菜单图标！');
        return false;
    }
    if (input5.trim() == "") {
        alert('请输入菜单路径！');
        return false;
    }
    if (input6.trim() == "") {
        alert('请选择是否显示！');
        return false;
    }
    if (input7.trim() == "") {
        alert('请选择是否禁用！');
        return false;
    }
    if (input6 != "Y") {
        input6 = "N";
    }
    if (input7 != "Y") {
        input7 = "N";
    }
   // alert(nopic);
    var postlist;
    var operationtype;
    if ($(this).attr("name") === "add") {
        operationtype = "新增菜单名称:" + input1;
        postlist = '{ "insert": [{ "menuname": "' + input1 + '", "parentid": ' + input2 + ', "remark": "' + input8 + '", "menuicon": "' + nopic + '", "menuurl": "' + input5 + '", "orderid": "' + input3 + '", "isvisible": "' + input6 + '", "isenabled":" ' + input7 + '", "createuser": "admin" }]}';
    } else {
        var rows = $table.bootstrapTable('getSelections');
        operationtype = "修改菜单名称:" + input1+" 菜单编号:"+rows[0].id;
        postlist = '{ "update": [{ id:' + rows[0].id + ',"menuname": "' + input1 + '", "parentid": ' + input2 + ', "remark": "' + input8 + '", "menuicon": "' + nopic + '", "menuurl": "' + input5 + '", "orderid": "' + input3 + '", "isvisible": "' + input6 + '", "isenabled":" ' + input7 + '", "createuser": "admin","updateuser": "admin" }]}';
    }
    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
        if (data != null) {
            if (data.code.id == "1") {
                $("#menuDialog").modal("hide");
                alert('保存成功！');
                ReloadTable($table, url);
                var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-菜单管理","operationtype": "' + operationtype + '!"}]}';
                oper_log(postlist1);
            }
            else {
                alert(data.code.msg);
            }
        }
    });
}
);






