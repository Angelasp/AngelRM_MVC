var modelname = "用户";
var actionurl = "/api/usertempapi/post";
var url = '/api/usertempapi/get';
var $table = $('#table');
var $utable = $('#user_indicatorlist');
//var $ttable = $('user_templatelist');

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
        $utable.bootstrapTable("loadAddSearch", keyvalue);
    });



    //省份显示
    $("input:radio[name='form-field-radio']").change(function () {
        var isabout = $('input:radio[name="form-field-radio"]:checked').val();
        if (isabout == "2") {
            $("#cityname").show();
        } else {
            $("#cityname").hide();
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
            { field: 'createtime', title: '创建时间', sortable: true, halign: 'center' },
         //   { field: 'roleid', title: '排序号', hideColumn: true, sortable: true, halign: 'center' },
            { field: 'rolename', title: '角色', hideColumn: true, sortable: true, halign: 'center' },
            { field: 'updateuser', title: '更新者', sortable: true, halign: 'center' },
            { field: 'action', title: '操作', halign: 'center', align: 'center', formatter: actionFormatters, events: 'actionEvents', clickToSelect: false }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });


    function actionFormatters(value, row, index) {
        if (row.id == 1) {
        } else {
            return '<a class="like" href="javascript:void(0)" data-toggle="tooltip" title="所属模板列表">指标查看</a>&nbsp;&nbsp;' + '<a class="like_temp" href="javascript:void(0)" data-toggle="tooltip" title="模板列表">模版下载</a>';
        }
    }

    window.actionEvents = {
        'click .download': function (e, value, row, index) {
            // 数据模板文件下载
            location.href = "/InPut/DownFile?username=" + row.createUserName + "&fileName=" + row.fileName;
            /*$.ajax({
                type: "POST",
                url: "/InPut/DownFile",
                data: "username=" + row.createUserName + "&fileName=" + row.fileName,
                success: function (sesponseTest) {
                }
            });*/
        },
        'click .like': function (e, value, row, index) {
            UserIndicatorList(row.id);
            $("#userModalLabel").text("账号：" + row.username + " 的用户指标");
            $("#userIndicatorDialog").modal("show");

        },
        'click .like_temp': function (e, value, row, index) {
            UserTemplateList(row.id);
            $("#userModalLabel").text("账号：" + row.username + " 的用户模板");
            $("#userIndicatorDialog").modal("show");
        }
    };
});

function UserTemplateList(uid) {
    $utable.bootstrapTable('destroy');
    $utable.bootstrapTable({
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        url: '/api/inputapi/post',
        classes: 'table table-hover table-no-bordered table-striped',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                    //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams: { createUserName: uid },          //传递参数（*）
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100, '全部'],        //可供选择的每页的行数（*）
        strictSearch: true,
        clickToSelect: false,               //是否启用点击选中行
        //height: 300,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        columns: [{
            field: 'fileName',
            title: '模板名'
        }/*, {
                field: 'createDate',
                title: '上传时间',
                align: 'center',
                formatter: function (value, row, index) {
                    return value.replace(/T/, " ");
                }
            }, {
                field: 'createUserName',
                align: 'center',
                title: '上传用户'
            }*/, {
                field: 'id',
                title: '操作',
                align: 'center',
                events: actionEvents,
                formatter: function (value, row, index) {
                    return [
                        '<a class="download" href="javascript:void(0)" title="下载">',
                        '<i class="glyphicon glyphicon-download"></i>',
                        '</a>'
                    ].join('');
                }
            }]
    });
}

function UserIndicatorList(uid) {
    var urli = '/api/usertempapi/GetUserIndicatorView';
    $utable.bootstrapTable('destroy');
    $utable.bootstrapTable({
        url: urli,
        height:434,
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
        paginationVAlign: 'bottom',
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
        queryParams: { userid: uid }, //参数 
        idField: 'systemId',
        maintainSelected: false,
        columns: [
         //   { field: 'state', checkbox: true },
            { field: 'indicatorid', title: '指标编号', sortable: true, halign: 'center' },
            { field: 'indicatorname', title: '指标名称', sortable: true, halign: 'center' },
           // { field: 'isenabled', title: '是否禁用', sortable: true, halign: 'center', formatter: function (value) { if (value == 'y') { return "<span class='badge bg-red' style='padding:2px 8px;'>正常</span>"; } else { return "<span class='badge bg-green' style='padding:2px 8px;'>禁用</span>"; } } },
           // { field: 'logincount', title: '登录次数', sortable: true, halign: 'center' },
            { field: 'icreatedate', title: '创建时间', sortable: true, halign: 'center' },
            { field: 'icreateusername', title: '创建者', sortable: true, halign: 'center' }//,
          //  { field: 'createtime', title: '创建时间', sortable: true, halign: 'center' },
         //   { field: 'roleid', title: '排序号', hideColumn: true, sortable: true, halign: 'center' },
        //    { field: 'rolename', title: '角色', hideColumn: true, sortable: true, halign: 'center' },
         //   { field: 'updateuser', title: '更新者', sortable: true, halign: 'center' },
         //   { field: 'action', title: '操作', halign: 'center', align: 'center', formatter: actionFormatters, events: 'actionEvents', clickToSelect: false }
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });

}



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
                            ids.push(rows[i].id);
                        }

                        ReloadTable($table, url);
                        // $.alert('删除信息：id=' + ids.join("-"));
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
        getIndicatorData(0);
    } else {
        var rows = $table.bootstrapTable('getSelections');
        if (rows.length < 1 || rows.length > 1) {
            $.alert('修改错误,请选择一行数据进行修改?', '提示');
            return false;
        } else {
            getIndicatorData(rows[0].id);
        }
        $("#userTitle").text("编辑用户指标");
        $("#save_user").attr("name", "edit");

    }
    $("#userDialog").modal("show");
}



function AllUpdateUser(obj) {
    var rows = $table.bootstrapTable('getSelections');
    if (rows.length < 1) {
        $.alert('批量修改指标模板错误,请选择用户后进行修改?', '提示');
        return false;
    } else {
        getIndicatorDatas(0);
        $("#userAllIndicatorDialog").modal("show");
    }
}



$('#save_user').on('click', function () {
    var rows = $table.bootstrapTable('getSelections');
    if (rows.length < 1) {
        $.alert('修改指标模板错误,请选择用户后进行修改?', '提示');
        return false;
    } else {

        var results = $('#itree').treeview('getChecked');
        var ids = [];
        $.each(results, function (index, result) {
            ids.push(result.id);
        });
        var postlist;
        postlist = '{ "insertindicators": [{ "userid": "' + rows[0].id + '",indicatorcontent:"' + ids + '"}]}';
        com.server.post(actionurl, JSON.stringify(postlist), function (data) { });
        $.alert('用户指标信息更新成功！', '提示');
        $("#userDialog").modal("hide");
    }
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
        debugger;
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
    $('#input3').val("");
    $("input[name='isenabled']:eq(0)").attr("checked", 'checked');
}

//加载treeview树形菜单
function getIndicatorData(uid) {
    var url = '/api/usertempapi/GetTBTreeView';
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
                //    alert(node.parentId);
                    setParentNodeCheck(node);   
                    },    
                    onNodeUnchecked: function (event, node) { //取消选中节点  
                        // 取消父节点 子节点取消
                        var selectNodes = setChildNodeUncheck(node); //获取未被选中的子节点 
                        var childNodes = getChildNodeIdArr(node);    //获取所有子节点 
                        if (selectNodes && selectNodes.length==0) { //有子节点且未被选中的子节点数目为0，则取消选中所有子节点   
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
    var url = '/api/usertempapi/GetTBTreeView';
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
    //if (nodeCheckedSilents) {
    //    return;
    //}
    //nodeCheckedSilents = true;
    //checkAllParents(node);
    //checkAllSons(node);
    //nodeCheckedSilents = false;
    var selectNodes = getChildNodeIdArr(node); //获取所有子节点      
    if (selectNodes) { //子节点不为空，则选中所有子节点       
        $('#itreelist').treeview('checkNode', [selectNodes, { silent: true }]);
    }
    var parentNode = $("#itreelist").treeview("getNode", node.parentId);
    setParentNodeCheck1(node);
}

var nodeUncheckedSilents = false;
function nodeUncheckeds(event, node) {
    //if (nodeUncheckedSilents)
    //    return;
    //nodeUncheckedSilents = true;
    //uncheckAllParents(node);
    //uncheckAllSons(node);
    //nodeUncheckedSilents = false;
    var selectNodes = setChildNodeUncheck(node); //获取未被选中的子节点 
    var childNodes = getChildNodeIdArr(node);    //获取所有子节点 
    if (selectNodes && selectNodes.length == 0) { //有子节点且未被选中的子节点数目为0，则取消选中所有子节点   
        console.log("反选");
        $('#itreelist').treeview('uncheckNode', [childNodes, { silent: true }]);
    }
    // 取消节点 父节点取消
    var parentNode = $("#itreelist").treeview("getNode", node.parentId);  //获取父节点
    var selectNodes = getChildNodeIdArr(node);
    setParentNodeCheck1(node);
}


//$('#save_tree').on('click', function () {
//    var results = $('#itree').treeview('getChecked');
//    var ids = [];
//    $.each(results, function (index, result) {
//        ids.push(result.id);
//    });
//    $("#indicatorTree").modal('hide');
//    $("#userDialog").find("label[name='input6']").addClass('active');
//    $("#input6").val(ids);
//});

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
    debugger;
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
            $('#itree').treeview('uncheckNode', parentNode.nodeId, {color:'red'});
            setParentNodeCheck(parentNode);
        }
    }
}
function setParentNodeCheck1(node) {
    var parentNode = $("#itreelist").treeview("getNode", node.parentId);
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
            $("#itreelist").treeview("checkNode", parentNode.nodeId);
            setParentNodeCheck1(parentNode);
        } else {   //如果子节点未全部被选 父未全选
            $('#itreelist').treeview('uncheckNode', parentNode.nodeId, { color: 'red' });
            setParentNodeCheck1(parentNode);
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
                for (j in getNodeDieDai.nodes) {
                    if (!getNodeDieDai.nodes[j].state.checked) {
                        ts.push(getNodeDieDai[j]);
                    }
                }
            }
        }
    }
    return ts;
}


 
