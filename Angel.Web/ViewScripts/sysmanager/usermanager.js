var modelname = "用户";
var actionurl = "/api/userapi/post";
var url = '/api/userapi/get';
var $table = $('#table');
var $utable = $('#user_indicatorlist');

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



    // 用户指标列表检索刷新
    $("#searchT").click(function () {
        var keyvalue = $("#nav-search-input").val();
        $utable.bootstrapTable("loadAddSearch", keyvalue);
    });


    //省份显示 +处室显示
    $("input:radio[name='form-field-radio']").change(function () {
        var isabout = $('input:radio[name="form-field-radio"]:checked').val();
        if (isabout == "1") {
            $("#roomname").show();
            $("#cityname").hide();
        }
        else if (isabout == "3") {
            $("#cityname").hide();
            $("#roomname").hide();
        }
    });
    //查询所省份城市列表
    com.server.get('/api/dataapi/get/1', function (data) {
        if (data != null) {
            var dhtml = '';
            $.each(data, function (i) {
                dhtml += '<option value="' + data[i].proname + '">' + data[i].proname + '</option>';
            });
            $('#citylist').html(dhtml);
        }
        $('#citylist').selectpicker({});
    });


    //查询所处室列表
    com.server.get('/api/dataapi/get/4', function (data) {
        if (data != null) {
            var dhtml = '';
            $.each(data, function (i) {
                dhtml += '<option value="' + data[i].id + '">' + data[i].roomname + '</option>';
            });
            $('#roomlist').html(dhtml);
        }
        $('#roomlist').selectpicker({});
    });

    //查询所有角色列表
    com.server.get('/api/roleapi/get', function (data) {
        if (data != null) {
            var dhtml = '';
            $.each(data, function (i) {
                dhtml += '<option value="' + data[i].id + '">' + data[i].rolename + '</option>';
            });
            $('#rolelist').html(dhtml);
        }
        $('#rolelist').selectpicker({});

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
            { field: 'username', title: '用户名', sortable: true, halign: 'center' },
            { field: 'isenabled', title: '是否禁用', sortable: true, halign: 'center', formatter: function (value) { if (value == 'y') { return "<span class='badge bg-red' style='padding:2px 8px;'>正常</span>"; } else { return "<span class='badge bg-green' style='padding:2px 8px;'>禁用</span>"; } } },
            { field: 'logincount', title: '登录次数', sortable: true, halign: 'center' },
            { field: 'lastlogintime', title: '登录时间', sortable: true, halign: 'center' },
            { field: 'createuser', title: '创建者', sortable: true, halign: 'center' },
          //{ field: 'createtime', title: '创建时间', sortable: true, halign: 'center' },
            { field: 'roleid', title: '角色ID', hideColumn: true, sortable: true, halign: 'center' },
            { field: 'rolename', title: '角色', hideColumn: true, sortable: true, halign: 'center' },
            { field: 'roomid', title: '部门ID', hideColumn: true, sortable: true, halign: 'center' },
            { field: 'roomname', title: '部门名称', hideColumn: true, sortable: true, halign: 'center' },
          //  { field: 'updateuser', title: '更新者', sortable: true, halign: 'center' }
             { field: 'action', title: '操作', halign: 'center', align: 'center', events: 'operateEvents', formatter: actionFormatters, clickToSelect: true }
            //,
            //{ field: 'action', title: '操作', halign: 'center', align: 'center', formatter: actionFormatters, events: 'actionEvents', clickToSelect: false }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });


    window.changeState = {
        'click .changeState': function (e, value, row, index) {
            var str = value == "y" ? "确定停用此用户？" : "确定启用此用户？";
            var state = value == "y" ? "N" : "Y";
            var userid = row.id;
            if (confirm(str)) {
                $.post("/api/userapi/PostChangeState", { "userid": userid, "isenabled": state }, function (res) {
                    $table.bootstrapTable("refresh")
                    alert(res.message);
                });
            }
        }
    }
    window.operateEvents = {
        'click .edit': function (e, value, row, index) {
            rows = [row];
            if (rows.length < 1 || rows.length > 1) {
                $.alert('修改错误,请选择一行数据进行修改?', '提示');
                return false;
            } else {

                $("#password1").html("新密码");
                $("#password2").html("重复密码");
                $("#userDialog").find('label').addClass('active');
                $('#input1').val(rows[0].username);
                $('#input1').attr("disabled", true);
                $('#input2').attr("value", "");
                $('#input3 >input').attr("value", "");
                $('#input2').val('');
                $('#input3 >input').val('');
                $("#userid").val('');
                $("#userid").val(rows[0].id);
                $('#rolelist').selectpicker('val', rows[0].roleid);//默认选中
                $('#rolelist').selectpicker('refresh');
                $('#roomlist').selectpicker('val', rows[0].roomid);//默认选中
                $('#roomlist').selectpicker('refresh');


                if (rows[0].isenabled == "y") {
                    $("input[name='isenabled']").get(0).checked = true;
                }
                else {
                    $("input[name='isenabled']").get(1).checked = true;
                }


                if (rows[0].roomname != '' && rows[0].roomname != null) {
                    $("input[name='form-field-radio']").get(0).checked = true;
                    $("#roomname").show();
                    $("#cityname").hide();
                    $('#roomlist').selectpicker('val', rows[0].roomid);//默认选中
                    $('#roomlist').selectpicker('refresh');
                }
                else {
                    $("input[name='form-field-radio']").get(1).checked = true;
                    $("#cityname").hide();
                    $("#roomname").hide();
                    $('#citylist').selectpicker('refresh');
                    $('#citylist').selectpicker('refresh');
                }

            }
            $("#userTitle").text("编辑用户");
            $("#save_user").attr("name", "edit");
            $("#userDialog").modal("show");
        },
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
                                var postlist = '{ "delete": [{ ID:' + rows[i].id + ',"UserName": "' + rows[i].username + '"}]}';
                                com.server.post(actionurl, JSON.stringify(postlist), function (data) { });

                                ids.push(rows[i].id);
                            }
                            ReloadTable($table, url);
                            var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-用户管理","operationtype": "删除用户信息编号为:(' + ids.join("-") + ')"}]}';
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


    $table.bootstrapTable('hideColumn', 'roleid');
    $table.bootstrapTable('hideColumn', 'roomid');
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
                            var postlist = '{ "delete": [{ ID:' + rows[i].id + ',"UserName": "' + rows[i].username + '"}]}';
                            com.server.post(actionurl, JSON.stringify(postlist), function (data) { });

                            //追加处室中间表
                            var postlist1 = '{ "deleteroomindicator": [{ "userid": "' + rows[i].id + '", }]}';
                            com.server.post(actionurl, JSON.stringify(postlist1), function (data) {

                                //alert(11);
                            });

                            ids.push(rows[i].id);
                        }
                        ReloadTable($table, url);
                        var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-用户管理","operationtype": "删除用户信息编号为:(' + ids.join("-") + ')"}]}';
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
function showUser(obj) {
    if ($(obj).attr('name') == "add") {
        clearFrom();
        $("#password1").html("账号密码");
        $("#password2").html("重复密码");
        $("#userTitle").text("新增用户");
        $("#save_user").attr("name", "add");
        $('#rolelist').selectpicker('refresh');
        $('#citylist').selectpicker('val', "北京");//默认选中
        $('#citylist').selectpicker('refresh');

        $('#roomlist').selectpicker('val', "研发部门");//默认选中
        $('#roomlist').selectpicker('refresh');
        $("input[name='form-field-radio']").get(0).checked = true;
        $("#roomname").show();
        $("#cityname").hide();

    } else {
        var rows = $table.bootstrapTable('getSelections');
        if (rows.length < 1 || rows.length > 1) {
            $.alert('修改错误,请选择一行数据进行修改?', '提示');
            return false;
        } else {

            $("#password1").html("新密码");
            $("#password2").html("重复密码");
            $("#userDialog").find('label').addClass('active');
            $('#input1').val(rows[0].username);
            $('#input1').attr("disabled", true);
            $('#input2').attr("value", "");
            $('#input3 >input').attr("value", "");
            $('#input2').val('');
            $('#input3 >input').val('');
            $("#userid").val(rows[0].id);

            $('#rolelist').selectpicker('val', rows[0].roleid);//默认选中
            $('#rolelist').selectpicker('refresh');

            $('#roomlist').selectpicker('val', rows[0].roomid);//默认选中
            $('#roomlist').selectpicker('refresh');


            if (rows[0].isenabled == "y") {
                $("input[name='isenabled']").get(0).checked = true;
            }
            else {
                $("input[name='isenabled']").get(1).checked = true;
            }


            if (rows[0].roomname != '' && rows[0].roomname != null) {
                $("input[name='form-field-radio']").get(0).checked = true;
                $("#roomname").show();
                $("#cityname").hide();
                $('#roomlist').selectpicker('val', rows[0].roomid);//默认选中
                $('#roomlist').selectpicker('refresh');
            }
            else {
                $("input[name='form-field-radio']").get(1).checked = true;
                $("#cityname").hide();
                $("#roomname").hide();
                $('#citylist').selectpicker('refresh');
                $('#citylist').selectpicker('refresh');
            }
        }
        $("#userTitle").text("编辑用户");
        $("#save_user").attr("name", "edit");

    }

    $("#userDialog").modal("show");
}




$('#save_user').on('click', function () {
    var input1, input2, input3, input4, roleid, isabout, cityid, cityname;

    input1 = $('#input1').val();
    input2 = $('#input2').val();;
    input3 = $('#input3>input').val();
    input4 = $('input:radio[name="isenabled"]:checked').val();
    roleid = $('#rolelist').val();
    isabout = $('input:radio[name="form-field-radio"]:checked').val();
    cityid = $('#citylist').val();

    roomid = $('#roomlist').val();


    var results = $('#itree').treeview('getChecked');
    var ids = [];
    $.each(results, function (index, result) {
        ids.push(result.id);
    });


    if ($(this).attr("name") === "add") {
        //新增的时候
        if (input1.trim() == "") {
            alert('请输入' + modelname + '名称！');
            return false;
        }
        if (input2.trim() == "") {
            alert('请输入密码！');
            return false;
        }

        if (input2.trim().length < 6) {
            alert('请输入大于六位的密码！');
            return false;
        }

        if (input3.trim() == "") {
            alert('请输入重复密码！');
            return false;
        }
        if (input2.trim() != input3.trim()) {
            alert('两次密码不一致？');
            return false;
        }

    }
    else {

        //修改的时候
        if (input2.trim() != "" && input3.trim() == "") {
            alert('请输入重复密码！');
            return false;
        }

        if (input2.trim() == "" && input3.trim() != "") {
            alert('请输入账号密码！');
            return false;
        }

        if (input2.trim() != "" && input3.trim() != "") {

            if (input2.trim().length < 6) {
                alert('请输入大于六位的密码！');
                return false;
            }
            if (input2.trim() != input3.trim()) {
                alert('两次密码不一致？');
                return false;
            }
        }

    }


        cityname = '';
    


    var postlist;
    var postlist1;
    var ptype;
    var operationtype;
    if ($(this).attr("name") === "add") {
        //新增
        ptype = "add";
        postlist = '{ "insert": [{ "UserName": "' + input1 + '", "Password": "' + input2 + '", "IsEnabled": "' + input4 + '", "LoginCount": 1, "CreateUser": "{admin}","cityid":"' + cityname + '"}]}';
        operationtype = input1 + " 用户 编号为:";

    } else {
        var rows = $table.bootstrapTable('getSelections');
        //修改
        ptype = "update";
        var userid = $("#userid").val();
        if (input2 == "" && input3 == "") {
            postlist = '{ "updateinfo": [{ ID:' + userid + ',"UserName": "' + input1 + '", "IsEnabled": "' + input4 + '", "LoginCount": 1,UpdateUser:"{admin}","CreateUser": "admin","cityid":"' + cityname + '"}]}';
        } else {
            postlist = '{ "update": [{ ID:' + userid + ',"UserName": "' + input1 + '",oldpwd:"' + input2 + '","Password": "' + input3 + '", "IsEnabled": "' + input4 + '", "LoginCount": 1,UpdateUser:"{admin}","CreateUser": "admin","cityid":"' + cityname + '"}]}';
        }
        operationtype = input1 + " 用户 编号为:" + userid;
    }

    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
        if (data != null) {
            if (ptype == "add") {
                if (data.code.id == "1") {
                    $("#userDialog").modal("hide");
                    postlist = '{ "maxid": [{"userid": "userid"}]}';
                    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
                        //debugger;
                        postlist = '{ "insertroleindicator": [{ "userid": "' + data[0].userid + '", "roleid": "' + roleid + '",indicatorcontent:"' + ids + '"}]}';
                        com.server.post(actionurl, JSON.stringify(postlist), function (data) { });

                        //追加处室中间表
                        if ($('input:radio[name="form-field-radio"]:checked').val() == "1") {
                            postlist1 = '{ "insertroomindicator": [{ "userid": "' + data[0].userid + '", "roomid": "' + roomid + '"}]}';
                            com.server.post(actionurl, JSON.stringify(postlist1), function (data) {
                            });
                        }

                        var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-用户管理","operationtype": "新增：' + operationtype + data[0].userid + '!"}]}';
                        oper_log(postlist1);

                    });
                    $.alert('添加成功！', '提示');
                    ReloadTable($table, url);

                }
                else if (data.code.id == "2") {
                    $.alert('该' + modelname + '已存在！', '信息');
                }
                else {
                    $.alert(data.code.msg);
                }

            }
            else {

                if (data.code.id == "1") {
                    $("#userDialog").modal("hide");

                    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
                        //postlist = '{ "insertroleindicator": [{ "userid": "' + rows[0].id + '", "roleid": "' + roleid + '",indicatorcontent:"' + ids + '"}]}';
                        //com.server.post(actionurl, JSON.stringify(postlist), function (data) { });

                        //追加处室中间表
                        if ($('input:radio[name="form-field-radio"]:checked').val() == "1") {
                            postlist1 = '{ "insertroomindicator": [{ "userid": "' + $("#userid").val() + '", "roomid": "' + roomid + '"}]}';
                            com.server.post(actionurl, JSON.stringify(postlist1), function (data) {
                            });
                        }
                        //删除处室
                        if ($('input:radio[name="form-field-radio"]:checked').val() == "3" || $('input:radio[name="form-field-radio"]:checked').val() == "2") {
                            postlist1 = '{ "deleteroomindicator": [{ "userid": "' + $("#userid").val() + '"}]}';
                            com.server.post(actionurl, JSON.stringify(postlist1), function (data) { });
                        }

                    });
                    $.alert('更新' + modelname + '成功！', '提示');
                    ReloadTable($table, url);
                    var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-用户管理","operationtype": "修改：' + operationtype + '!"}]}';
                    oper_log(postlist1);
                }
                else if (data.code.id == "2") {
                    parent.$.alert('密码和旧密码一致未修改密码！', '信息');
                }
                else {
                    $.alert(data.code.msg);
                }
            }
        }
    });
});

$('#saveinticatoruser').on('click', function () {
    var postlist;
    var rows = $table.bootstrapTable('getSelections');
    var results = $('#itreelist').treeview('getChecked');
    var ids = [];
    $.each(results, function (index, result) {
        ids.push(result.id);
    });
    for (var i = 0; i < rows.length; i++) {
        postlist = '{ "insertindicators": [{ "userid": "' + rows[i].id + '",indicatorcontent:"' + ids + '"}]}';
        com.server.post(actionurl, JSON.stringify(postlist), function (data) {
        });
    }
    $.alert('批量分配用户指标模板成功！', '提示');
    $("#userAllIndicatorDialog").modal("hide");

});


//清空表单
function clearFrom() {
    $("#userDialog").find('label').removeClass('active');
    $('#input1').attr("disabled", false);
    $('#input1').val("");
    $('#input2').val("");
    $('#input3>input').val("");
    $("input[name='isenabled']:eq(0)").attr("checked", 'checked');
}

//弹出选择框
function showIndicatorTree(uid) {
    getIndicatorData(uid);
    //  $("#indicatorTree").modal('show');
}
//加载treeview树形菜单
function getIndicatorData(uid) {
    var url = '/api/userapi/GetTBTreeView';
    $.ajax({
        type: "GET",
        url: url,
        data: { userid: uid },
        dataType: "json",
        success: function (data) {

            if (data != null) {
                $('#itree').treeview({
                    data: data,
                    showCheckbox: true,
                    onNodeChecked: function (event, node) { //选中节点 
                        var selectNodes = getChildNodeIdArr(node); //获取所有子节点      
                        if (selectNodes) { //子节点不为空，则选中所有子节点       
                            $('#itree').treeview('checkNode', [selectNodes, { silent: true }]);
                        }
                        var parentNode = $("#itree").treeview("getNode", node.parentId);
                        setParentNodeCheck(node);
                    },
                    onNodeUnchecked: function (event, node) { //取消选中节点  
                        // 取消父节点 子节点取消
                        var selectNodes = setChildNodeUncheck(node); //获取未被选中的子节点 
                        var childNodes = getChildNodeIdArr(node);    //获取所有子节点 
                        if (selectNodes && selectNodes.length == 0) { //有子节点且未被选中的子节点数目为0，则取消选中所有子节点   
                            console.log("反选");
                            $('#itree').treeview('uncheckNode', [childNodes, { silent: true }]);
                        }
                        // 取消节点 父节点取消
                        var parentNode = $("#itree").treeview("getNode", node.parentId);  //获取父节点
                        var selectNodes = getChildNodeIdArr(node);
                        setParentNodeCheck(node);
                    }
                });
                $('#treeloading').hide();
                $('#itree').treeview('collapseAll');


            }
        },
        beforeSend: function () {
            $('#treeloading').show();
        }
    });

}
//批量修改用户指标模板
function getIndicatorDatas(uid) {
    var url = '/api/userapi/GetTBTreeView';
    $.ajax({
        type: "GET",
        url: url,
        data: { userid: uid },
        dataType: "json",
        success: function (data) {

            if (data != null) {
                $('#itreelist').treeview({
                    data: data,
                    showCheckbox: true,
                    onNodeChecked: nodeCheckeds,
                    onNodeUnchecked: nodeUncheckeds
                });
                $('#treeloadings').hide();
                $('#itreelist').treeview('collapseAll');
                $('#itreelist').treeview('checkAll');

            }
        },
        beforeSend: function () {
            $('#treeloadings').show();
        }
    });

}

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


var nodeCheckedSilents = false;
function nodeCheckeds(event, node) {
    if (nodeCheckedSilents) {
        return;
    }
    nodeCheckedSilents = true;
    checkAllParents(node);
    checkAllSons(node);
    nodeCheckedSilents = false;
}

var nodeUncheckedSilents = false;
function nodeUncheckeds(event, node) {
    if (nodeUncheckedSilents)
        return;
    nodeUncheckedSilents = true;
    uncheckAllParents(node);
    uncheckAllSons(node);
    nodeUncheckedSilents = false;
}


//选中全部父节点
function checkAllParent(node) {
    $('#itree').treeview('checkNode', node.nodeId, { silent: true });




    var parentNode = $('#itree').treeview('getParent', node.nodeId);
    if (!("id" in parentNode)) {
        return;
    } else {
        checkAllParent(parentNode);
    }

}
//取消全部父节点
function uncheckAllParent(node) {
    $('#itree').treeview('uncheckNode', node.nodeId, { silent: true, backColor: 'green' });
    var siblings = $('#itree').treeview('getSiblings', node.nodeId);
    var parentNode = $('#itree').treeview('getParent', node.nodeId);
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
    $('#itree').treeview('checkNode', node.nodeId, { silent: true });
    if (node.nodes != null && node.nodes.length > 0) {
        for (var i in node.nodes) {
            checkAllSon(node.nodes[i]);
        }
    }
}
//级联取消所有子节点
function uncheckAllSon(node) {
    $('#itree').treeview('uncheckNode', node.nodeId, { silent: true });
    if (node.nodes != null && node.nodes.length > 0) {
        for (var i in node.nodes) {
            uncheckAllSon(node.nodes[i]);
        }
    }
}



//选中全部父节点
function checkAllParents(node) {
    $('#itreelist').treeview('checkNode', node.nodeId, { silent: true });
    var parentNode = $('#itreelist').treeview('getParent', node.nodeId);
    if (!("id" in parentNode)) {
        return;
    } else {
        checkAllParents(parentNode);
    }
}
//取消全部父节点
function uncheckAllParents(node) {
    $('#itreelist').treeview('uncheckNode', node.nodeId, { silent: true });
    var siblings = $('#itreelist').treeview('getSiblings', node.nodeId);
    var parentNode = $('#itreelist').treeview('getParent', node.nodeId);
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
        uncheckAllParents(parentNode);
    }
}

//级联选中所有子节点
function checkAllSons(node) {
    $('#itreelist').treeview('checkNode', node.nodeId, { silent: true });
    if (node.nodes != null && node.nodes.length > 0) {
        for (var i in node.nodes) {
            checkAllSons(node.nodes[i]);
        }
    }
}
//级联取消所有子节点
function uncheckAllSons(node) {
    $('#itreelist').treeview('uncheckNode', node.nodeId, { silent: true });
    if (node.nodes != null && node.nodes.length > 0) {
        for (var i in node.nodes) {
            uncheckAllSons(node.nodes[i]);
        }
    }
}

// 选中父节点时，选中所有子节点
function getChildNodeIdArr(node) {
    var ts = [];
    if (node.nodes) {
        for (x in node.nodes) {
            ts.push(node.nodes[x].nodeId);
            if (node.nodes[x].nodes) {
                var getNodeDieDai = getChildNodeIdArr(node.nodes[x]);
                for (j in getNodeDieDai) {
                    ts.push(getNodeDieDai[j]);
                }
            }
        }
    } else {
        ts.push(node.nodeId);
    }
    return ts;
}


// 选中所有子节点时，选中父节点 取消子节点时取消父节点
function setParentNodeCheck(node) {
    var parentNode = $("#itree").treeview("getNode", node.parentId);
    if (parentNode.nodes) {
        var checkedCount = 0;
        for (x in parentNode.nodes) {
            if (parentNode.nodes[x].state.checked) {
                checkedCount++;
            } else {
                break;
            }
        }
        if (checkedCount == parentNode.nodes.length) {  //如果子节点全部被选 父全选
            $("#itree").treeview("checkNode", parentNode.nodeId);
            setParentNodeCheck(parentNode);
        } else {   //如果子节点未全部被选 父未全选
            $('#itree').treeview('uncheckNode', parentNode.nodeId, { color: 'red' });
            setParentNodeCheck(parentNode);
        }
    }
}



// 取消父节点时 取消所有子节点
function setChildNodeUncheck(node) {
    if (node.nodes) {
        var ts = [];    //当前节点子集中未被选中的集合 
        for (x in node.nodes) {
            if (!node.nodes[x].state.checked) {
                ts.push(node.nodes[x].nodeId);
            }
            if (node.nodes[x].nodes) {
                var getNodeDieDai = node.nodes[x];
                console.log(getNodeDieDai);
                for (j in getNodeDieDai) {
                    if (!getNodeDieDai.nodes[x].state.checked) {
                        ts.push(getNodeDieDai[j]);
                    }
                }
            }
        }
    }
    return ts;
}



