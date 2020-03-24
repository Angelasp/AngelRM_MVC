var DataReview = (function () {
    var _stateMap = {
        $table: null,  // bootstrap-table
        $search: null, // 查询按钮
        $ok: null,     // 通过按钮
        $no: null      // 不通过按钮
    };
    var _configMap = {
    };
    var _initTableReview, _queryParams, _formatterDate, getIdSelections,
        _responseHandler, _review, init;

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
            rows: params.limit,       // 每页多少条数据
            offset: params.offset  // 请求第几页
        };

        var field = $("#select_field").val();
        var label = $('#select_field :selected').parent().attr('label');
        if (label) { // 根据审核状态查询
            values.field = "Source";
            values.search = field;
            return values;
        } else {
            var search = $(".btnSearch").val();      
            if (field && search) {
                values.field = field;
                values.search = search;
            }
            return values;
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

    _review = function (values, status) {
        var msg = "";
        var msg2 = "";
        if (status == 1) {
            msg = "确认更新此" + (values.length) + "项指标的值?";
            msg2 = "更新" + values.length + "项指标值。";
        } else if (status == 2) {
            msg = "确认放弃此" + (values.length) + "项指标值的更新?";
            msg2 = "放弃" + values.length + "项指标值更新。"
        }
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
                for (var i in values) {
                    values[i].status = status;
                }
                $.ajax({
                    url: '/api/datareportapi/updateReviewRepeat',
                    type: 'post',
                    //async: false,
                    dataType: 'text',
                    data: JSON.stringify(values),
                    contentType: 'application/json',
                    success: function (data) {
                        var json = JSON.parse(data);
                        if (json && json.count > 0) {
                            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
                            _stateMap.$ok.prop('disabled', true);
                            _stateMap.$no.prop('disabled', true);
                            var postlist1 = '{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据更新审核","operationtype": "' + msg2 +'"}]}';
                            oper_log(postlist1);
                        } else {
                            bootbox.alert({
                                message: "操作失败",
                                size: 'small'
                            });
                            var postlist1 = '{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据更新审核","operationtype": "指标值更新失败!"}]}';
                            oper_log(postlist1);
                        }
                    }
                });
            }
        });
    };

    /**
     * 初始化重复数据审核列表
     */
    _initTableReview = function () {
        _stateMap.$table.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/datareportapi/postreviewrepeat',
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
            pageList: [10, 25, 50, 100, '全部'],        //可供选择的每页的行数（*）
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
                title: '指标'
            }, {
                field: 'noP_NUMBER',
                title: '期数'
            }, {
                field: 'citY_NO',
                title: '省份'
            }, {
                field: 'sourcename',
                title: '数据来源'
            }, {
                field: 'oldValue',
                title: '原始值',
                align: 'center',
                formatter: function (value, row, index) {
                    return '<span class="blue"><b>' + value + '</b></span>';
                }
            }, {
                field: 'newValue',
                title: '更新值',
                align: 'center',
                formatter: function (value, row, index) {
                    return '<span class="orange"><b>' + value + '</b></span>';
                }
            }, {
                field: 'source',
                title: '上报来源',
                align: 'center',
                formatter: function (value, row, index) {
                    if (value === 0) return '集团上报';
                    if (value === 1) return '省公司上报';
                    if (value === 2) return '省公司上报';
                    if (value === 3) return '集团上报';
                }
            }, {
                field: 'createUserName',
                title: '申请人'
            }, {
                field: 'createDate',
                title: '申请时间',
                formatter: _formatterDate
            }, {
                field: 'id',
                title: '操作',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return [
                        '<a class="ok" href="javascript:void(0)" title="通过">',
                        '<i class="glyphicon glyphicon-ok"></i></a>',
                        '&nbsp;&nbsp;<a class="no" href="javascript:void(0)" title="不通过">',
                        '<i class="glyphicon glyphicon-remove red"></i></a>'
                    ].join('');
                }
            }]
        });
    };

    init = function ($t, $bs, $bok, $bno) {
        _stateMap.$table = $t;
        _stateMap.$search = $bs;
        _stateMap.$ok = $bok;
        _stateMap.$no = $bno;

        window.operateEvents = {
            'click .ok': function (e, value, row, index) {
                _review([row], 1);
            },
            'click .no': function (e, value, row, index) {
                _review([row], 2);
            }
        };

        _initTableReview();

        // 查询按钮
        _stateMap.$search.click(function () {
            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
        });
        // 通过按钮
        _stateMap.$ok.click(function () {
            var values = _getIdSelections();
            _review(values, 1);
        });
        // 不通过按钮
        _stateMap.$no.click(function () {
            var values = _getIdSelections();
            _review(values, 2);
        });

        _stateMap.$table.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
                var disabled = !_stateMap.$table.bootstrapTable('getSelections').length;
                _stateMap.$ok.prop('disabled', disabled);
                _stateMap.$no.prop('disabled', disabled);
                _configMap.selections = _getIdSelections();
        });

    };
    return {
        init: init
    };
}());