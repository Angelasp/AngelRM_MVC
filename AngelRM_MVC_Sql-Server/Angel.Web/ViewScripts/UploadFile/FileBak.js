var FileBak = (function () {
    var _stateMap = {
        $table: null,  // bootstrap-table
        $search: null, // 查询按钮
        $remove: null,
        type: null
    };
    var _configMap = {
    };
    var _initTable, _queryParams, _formatterDate, getIdSelections,
        _responseHandler, _remove, init;

    _formatterDate = function (value, row, index) {
        if (value) {
            return value.replace(/T/, " ");
        } else {
            return value;
        }
    };

    // 请求服务数据时所传参数
    _queryParams = function (params) {
        var values = {
            role: 0,
            type: _stateMap.type,
            rows: params.limit,       // 每页多少条数据
            offset: params.offset  // 请求第几页
        };
        var field = $("#select_field").val();
        var search = $(".btnSearch").val();
        if (field && search) {
            values[field] = search;
        }
        return values;
    };

    // 获取bootstarp-table选中的行
    _getIdSelections = function () {
        return $.map(_stateMap.$table.bootstrapTable('getSelections'), function (row) {
            return row;
        });
    };

    _responseHandler = function (res) {
        $.each(res, function (i, row) {
            row.state = $.inArray(row.id, _configMap.selections) !== -1;
        });
        return res;
    };

    _remove = function (values) {
        var msg = "确认删除此" + (values.length) + "个备份文件?";

        bootbox.confirm({
            size: 'small',
            message: msg,
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-sm btn-success'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-sm btn-danger'
                }
            },
            callback: function (result) {
                if (!result) return;
                $.ajax({
                    url: '/api/UploadFile/removeFileBak',
                    type: 'post',
                    //async: false,
                    dataType: 'text',
                    data: JSON.stringify(values),
                    contentType: 'application/json',
                    error: function () {
                        bootbox.alert({
                            message: "删除失败!",
                            size: 'small'
                        });
                    },
                    success: function (data) {
                        var json = JSON.parse(data);
                        if (json && json.count > 0) {
                            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
                            _stateMap.$remove.prop('disabled', true);
                        } else {
                            bootbox.alert({
                                message: "删除失败",
                                size: 'small'
                            });
                        }
                    }
                });
            }
        });
    };

    _initTable = function () {
        _stateMap.$table.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/UploadFile/postfilebak',
            classes: 'table table-hover table-no-bordered table-striped',
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: _queryParams,          //传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                      //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: false,               //是否启用点击选中行
            //height: 300,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            selectItemName: 'id',
            responseHandler: _responseHandler,
            columns: [{
                field: 'state',
                title: '选择',
                checkbox: true,
                align: 'center'
            }, {
                field: 'filename',
                title: '文件名'
            }, {
                field: 'createusername',
                title: '上传用户'
            }, {
                field: 'createdate',
                title: '上传时间',
                formatter: _formatterDate
            }, {
                field: 'id',
                title: '操作',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return [
                        '<a class="remove" href="javascript:void(0)" title="删除">',
                        '<i class="glyphicon glyphicon-trash red"></i></a>',
                        '&nbsp;&nbsp;<a class="downloadA" href="javascript:void(0)" title="下载">',
                        '<i class="glyphicon glyphicon-download"></i></a>'
                    ].join('');
                }
            }]
        });
    };

    init = function ($t, $bs, $br, type) {
        _stateMap.$table = $t;
        _stateMap.$search = $bs;
        _stateMap.$remove = $br;
        _stateMap.type = type;

        window.operateEvents = {
            'click .remove': function (e, value, row, index) {
                _remove([row]);
            },
            'click .downloadA': function (e, value, row, index) {
                // 存档文件下载
                window.location.href = "/api/UploadFile/GetDownFile?filename=" + row.filename + "&sysfilename=" + row.sysname + "&type=3";
            }
        };

        _initTable();

        // 查询按钮
        _stateMap.$search.click(function () {
            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
        });
        // 删除按钮
        _stateMap.$remove.click(function () {
            var values = _getIdSelections();
            _remove(values);
        });

        _stateMap.$table.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
                var disabled = !_stateMap.$table.bootstrapTable('getSelections').length;
                _stateMap.$remove.prop('disabled', disabled);
                _configMap.selections = _getIdSelections();
            });

    };
    return {
        init: init
    };
}());