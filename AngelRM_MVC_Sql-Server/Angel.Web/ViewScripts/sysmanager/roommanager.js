
var $table = $('#table');
var url = '/api/roomapi/get';

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

    //查询所有角色列表
    com.server.get('/api/roomapi/get', function (data) {
        if (data != null) {
            var dhtml = '';
            $.each(data, function (i) {
                dhtml += '<option value="' + data[i].id + '">' + data[i].roomname + '</option>';
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
            { field: 'roomname', title: '处室名称', sortable: true, halign: 'center'},
            { field: 'remark', title: '处室备注', sortable: true, halign: 'center' },
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




var modelname = "处室";
var actionurl = "/api/roomapi/post";
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
                                var postlist = '{ "delete": [{ ID:' + rows[i].id + ',"roomname": "' + rows[i].roomname + '"}]}';
                                com.server.post(actionurl, JSON.stringify(postlist), function (data) {
                                    debugger;
                                      if (data.code.id == 1) {
                                          ids.push(rows[i].id);
                                      }
                            });
                            }
                        ReloadTable($table, url);
                        var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-处室管理","operationtype": "删除处室信息编号为:(' + ids.join("-") + ')"}]}';
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
    $('.input2').attr("value", "");
    $('#input1').val('');
    $('.input2').val('');
    $("input[name='isenabled']").get(0).checked = true;
}

// 新增+ 编辑
function showRole(obj) {
    if ($(obj).attr('name') === "add") {
        clearFrom();
        $("#roleTitle").text("新增" + modelname);
        //$('.input2').attr("value", 0);
        $("#save_role").attr("name", "add");
    } else {
    
        var rows = $table.bootstrapTable('getSelections');
        if (rows.length == 0) {
            $.alert('请至少选择一条记录！', '提示');
            return false;


        }  else if (rows.length > 1){
            $.alert('只能选择一条记录！', '提示');
            return false;
            
        }else  {
            // alert(rows[0].roomname);
            $("#roleDialog").find('label').addClass('active');
            $('#input1').attr("value", rows[0].roomname);
            $('.input2').attr("value", rows[0].remark);
            $('#input1').val(rows[0].roomname);
            $('.input2').val(rows[0].remark);
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
    $("#roleDialog").modal("show");
}

$('#save_role').on('click', function () {
    var input1, input2, input3, input4;
    var actionurl = '/api/roomapi/Post';
    
    input1 = $('#input1').val();
    input2 = $('.input2').val();;
    //input3 = $('#input3').val();


    roomid = $('#rolelist').val();
    input4 = $('input:radio[name="isenabled"]:checked').val();
    
    if (input1.trim() == "") {
        alert('请输入角色名称！');
        return false;
    }

    var postlist;
    var ptype;
    var operationtype;
    if ($(this).attr("name") === "add") {
        ptype = "add";
        operationtype = "新增处室名称:" + input1;
        postlist = '{ "insert": [{ "RoomName": "' + input1 + '", "Remark": "' + input2 + '", "IsEnabled": "' + input4 + '", "CreateUser": "admin"}]}';
    } else {
        var rows = $table.bootstrapTable('getSelections');
        ptype = "update";
        operationtype = "修改处室名称:" + input1 + " 处室编号:" + rows[0].id;
        postlist = '{ "update": [{ ID:' + rows[0].id + ',"RoomName": "' + input1 + '",Remark:"' + input2 + '", "IsEnabled": "' + input4 + '", UpdateUser:"admin", "CreateUser": "admin"}]}';
    }
    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
      
        if (data != null) {
                $("#roleDialog").modal("hide");
                alert('保存成功！');
                ReloadTable($table, url);
                var postlist1 = '{ "insert_log": [{ "logposition":"系统管理-处室管理","operationtype": "' + operationtype + '!"}]}';
                oper_log(postlist1);
        }
    });
}
);

