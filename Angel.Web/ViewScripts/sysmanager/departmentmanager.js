
var $table = $('#table');
var url = '/api/departmentapi/get';



//显示树结构数据
var showtree = function () {

    var t = $("#tree");
    /**
     * zTree 初始化方法：$.fn.zTree.init(t, setting, zNodes)
     * t:用于展现 zTree 的 DOM 容器
     * setting:zTree 的配置数据
     * zNodes:zTree 的节点数据
     * 
     */
    com.server.get("/api/DepartmentApi/GetD", '', function (data) {
        if (data != null) {
            t = $.fn.zTree.init(t, setting, data);
        }
    });
    return null;
}


var setting = {
    check: {
        enable: true,
        chkStyle: "radio",
        radioType: "all"
    },
    view: {
        dblClickExpand: false,
    },
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: ""
        }
    },
    callback: {
        onClick: onClick,
        onCheck: onCheck
    }
};


function onCheck(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("tree");
    nodes = zTree.getCheckedNodes(true)
    //var cityObj = $("#citySel");
    //cityObj.attr("value", v);
}

function onClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("tree");
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}






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
        showRefresh: false,
        showToggle: false,
        showColumns: false,
        showPaginationSwitch: false,
        paginationLoop: false,
        smartDisplay: false,
        idField: 'id',
        columns: [
            {
                field: 'ck',
                checkbox: true
            },
            {
                field: 'dname',
                title: '名称'
            },
            {
                field: 'parent_id',
                title: '父级部门ID'
            },
            {
                field: 'isenabled',
                title: '是否可用',
                align: 'center',
                formatter: function (value) {
                    if (value == 'y') { return "<span class='badge bg-red' style='padding:2px 8px;'>正常</span>"; } else { return "<span class='badge bg-green' style='padding:2px 8px;'>禁用</span>"; }
                }
            },
            {
                field: 'remark',
                title: '备注'
            },
            {
                field: 'createuser',
                title: '创建者',
                halign: 'center'
            },
            {
                field: 'createtime',
                title: '创建时间',
                halign: 'center'
            },
            {
                field: 'updateuser',
                title: '更新者',
                halign: 'center'
            }

        ],
        treeShowField: 'dname',
        parentIdField: 'parent_id',
        onLoadSuccess: function (data) {
            $table.treegrid({
                initialState: 'collapsed',//收缩
                treeColumn: 1,//指明第几列数据改为树形
                expanderExpandedClass: 'glyphicon glyphicon-triangle-bottom',
                expanderCollapsedClass: 'glyphicon glyphicon-triangle-right',
                onChange: function () {
                    $table.bootstrapTable('resetWidth');
                }
            });
        }
    });


    $table.bootstrapTable('hideColumn', 'parent_id');
    showtree();


});
 
 

    var modelname = "部门";
    var actionurl = "/api/DepartmentApi/post";
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
            var flag = false;
            for (var key in rows)
            {
                if (rows[key]._nodes && rows[key]._nodes.length > 0)
                {
                    flag = true;
                    break;
                }
            }

            if (flag) {
                alert("请先删除部门子类后再删除部门父类！");
                return false;
            }

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
                                var postlist = '{ "delete": [{ ID:' + rows[i].id + ',"dname": "' + rows[i].dname + '"}]}';
                                com.server.post(actionurl, JSON.stringify(postlist), function (data) {
                                    debugger;
                                    if (data.code.id == 1) {
                                        ids.push(rows[i].id);
                                    }
                                });
                            }
                            ReloadTable($table, url);
                            var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-部门管理","operationtype": "删除部门信息编号为:(' + ids.join("-") + ')"}]}';
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
        $("#DepartmentDialog").find('label').removeClass('active');
        $('#input1').val('');
        $('.input3').val('');
        $("input[name='isenabled']").get(0).checked = true;
    }

    // 新增+ 编辑
    function showRole(obj) {
        if ($(obj).attr('name') === "add") {
            clearFrom();
            $("#roleTitle").text("新增" + modelname);
            $("#save_role").attr("name", "add");
            //showtree();
        } else {

            var rows = $table.bootstrapTable('getSelections');
            if (rows.length == 0) {
                $.alert('请至少选择一条记录！', '提示');
                return false;


            } else if (rows.length > 1) {
                $.alert('只能选择一条记录！', '提示');
                return false;

            } else {
                // alert(rows[0].roomname);
                $("#DepartmentDialog").find('label').addClass('active');
                $('#input1').val(rows[0].dname);
                $('.input3').val(rows[0].remark);
                if (rows[0].parent_id == "0") { } else {
                    showtree();
                    var treeObj = $.fn.zTree.getZTreeObj("tree");
                    var node = treeObj.getNodeByParam("id", rows[0].parent_id);
                    treeObj.selectNode(node);
                    treeObj.checkNode(node, true, true);
                    setting.callback.onClick = onClick;
                }
                if (rows[0].isenabled == "y") {
                    $("input[name='isenabled']").get(0).checked = true;
                }
                else {
                    $("input[name='isenabled']").get(1).checked = true;
                }

            }
            $("#roleTitle").text("编辑" + modelname);
            $("#save_role").attr("name", "edit");
        }
        $("#DepartmentDialog").modal("show");
        showtree();
    }

    $('#save_role').on('click', function () {

        var input1, input2, input4, pid;
        var actionurl = '/api/DepartmentApi/Post';
        var zTree = $.fn.zTree.getZTreeObj("tree");
        var nodes = zTree.getCheckedNodes();


        input1 = $('#input1').val();
        input2 = $('.input3').val();


        if (nodes != "" && nodes != null) {
            pid = nodes[0].id;
        } else {
            pid = 0;
        }
        input4 = $('input:radio[name="isenabled"]:checked').val();

        if (input1.trim() == "") {
            alert('请输入部门名称！');
            return false;
        }
 

        var postlist;
        var ptype;
        var operationtype; 
        if ($(this).attr("name") === "add") {
            ptype = "add";
            operationtype = "新增部门名称:" + input1;
            postlist = '{ "insert": [{ "Dname": "' + input1 + '","Pid": "' + pid + '","Remark": "' + input2 + '", "IsEnabled": "' + input4 + '", "CreateUser": "admin"}]}'; 
        } else {
            var rows = $table.bootstrapTable('getSelections');
            ptype = "update";
            operationtype = "修改部门名称:" + input1 + " 处室编号:" + rows[0].id;
            postlist = '{ "update": [{ ID:' + rows[0].id + ',"Pid": "' + pid + '","Dname": "' + input1 + '",Remark:"' + input2 + '", "IsEnabled": "' + input4 + '", UpdateUser:"admin", "CreateUser": "admin"}]}';
            
            //id与父id是否相同
            if (rows[0].id == pid) {
                alert('部门父类不允许设置本身');
                return false;
            }
        }

        


        com.server.post(actionurl, JSON.stringify(postlist), function (data) {

            if (data != null) {
                $("#DepartmentDialog").modal("hide");
                alert('保存成功！');
                ReloadTable($table, url);
                var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-部门管理","operationtype": "' + operationtype + '!"}]}';
                oper_log(postlist1);
            }
        });
    }
    );

