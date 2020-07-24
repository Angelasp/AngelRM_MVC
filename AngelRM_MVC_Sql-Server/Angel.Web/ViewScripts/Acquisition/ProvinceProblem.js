var ProvinceProblem = (function () {
    var _stateMap = {
        $table: null,
        $search: null,
        $remove: null
    };
    var _configMap = {
        selections: []
    };
    var _initTable, _queryParams, _getIdSelections, _responseHandler, _remove, init;

    // 请求服务数据时所传参数
    _queryParams = function (params) {
        var values = {
            offset: params.offset,
            rows: params.limit
        };
        var field = $("#select_field").val();
        var label = $('#select_field :selected').parent().attr('label');
        if (label) { // 根据审核状态查询
            values.field = "p.inform_province";
            values.search = field;
        } else {
            var search = $("#input_search").val();
            if (field) {
                values.field = field;
                values.search = search;
            }
        }
        return values;
    };

    // 获取bootstarp-table选中的行
    _getIdSelections = function () {
        return $.map(_stateMap.$table.bootstrapTable('getSelections'), function (row) {
            return row.id;
        });
    };

    _responseHandler = function (res) {
        $.each(res, function (i, row) {
            row.state = $.inArray(row.id, _configMap.selections) !== -1;
        });
        return res;
    };

    _initTable = function () {
        _stateMap.$table.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/networkqualityapi/postprovinceproblem',
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
                field: 'indicatorname',
                title: '指标',
                align: 'center'
            }, {
                field: 'noP_NUMBER',
                title: '期数',
                align: 'center'
            }, {
                field: 'citY_NO',
                title: '省份',
                align: 'center'
            }, {
                field: 'idata',
                title: '值',
                align: 'right'
            }, {
                field: 'inform_province',
                title: '是否已告知省公司',
                formatter: function (value, row, index) {
                    if (value) return '已通知';
                    return '未通知';
                },
                align: 'center'
            }, {
                field: 'explanation',
                title: '省公司解释',
                align: 'center'
            }, {
                field: 'id',
                title: '操作',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return '<a class="remove" href="javascript:void(0)" title="删除"><i class="glyphicon glyphicon-trash red"></i></a>';
                },
                align: 'center'
            }]
        });
    };

    _remove = function (values) {
        bootbox.confirm({
            size: 'small',
            message: '确定删除此' + values.length + '项数据?',
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
                    url: '/api/networkqualityapi/removeprovinceproblem',
                    type: 'post',
                    dataType: 'text',
                    data: JSON.stringify({ id: values.join(",") }),
                    contentType: 'application/json',
                    success: function (data) {
                        var json = JSON.parse(data);
                        if (json && json.count > 0) {
                            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
                            _stateMap.$remove.prop('disabled', true);
                        } else {
                            bootbox.alert({
                                message: '删除失败',
                                size: 'small'
                            });
                        }
                    }
                });
            }
        });
    };

    init = function ($tbl, $btnS, $btnR) {
        _stateMap.$table = $tbl;
        _stateMap.$search = $btnS;
        _stateMap.$remove = $btnR;

        window.operateEvents = {
            'click .remove': function (e, value, row, index) {
                _remove([row.id]);
            }
        };

        _initTable();
        
        _stateMap.$search.click(function () {
            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
        });
        _stateMap.$remove.click(function () {
            var ids = _getIdSelections();
            _remove(ids);
        });
        _stateMap.$table.on('check.bs.table uncheck.bs.table' +
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