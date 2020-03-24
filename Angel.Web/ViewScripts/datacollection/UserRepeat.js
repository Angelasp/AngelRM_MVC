var UserRepeat = (function () {
    var _stateMap = {
        $table: null,  // bootstrap-table
        $search: null // 查询按钮
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
            role: 1, // 普通用户
            rows: params.limit,       // 每页多少条数据
            offset: params.offset  // 请求第几页
        };
        var field = $("#select_field").val();
        var label = $('#select_field :selected').parent().attr('label');
        if (label) { // 根据审核状态查询
            values.field = "AStatus";
            values.search = field;
            return values;
        } else {
            var search = $(".btnSearch").val();
            debugger
            //alert(search);
            if (field && search) {
                values.field = field;
                values.search = search;
            }
            return values;
        }
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
                field: 'uFileName',
                title: '上传文件',
                align: 'left',
                formatter: function (value, row, index) {
                    return '《' + value + '》';
                }
            }, {
                field: 'indicatorname',
                align: 'center',
                title: '指标'
            }, {
                field: 'noP_NUMBER',
                align: 'center',
                title: '期数'
            }, {
                field: 'citY_NO',
                align: 'center',
                title: '省份'
            }, {
                field: 'sourcename',
                align: 'center',
                title: '数据来源'
            }, {
                field: 'oldValue',
                title: '原始值',
                align: 'right',
                formatter: function (value, row, index) {
                    return '<span class="blue"><b>' + value + '</b></span>';
                }
            }, {
                field: 'newValue',
                title: '更新值',
                align: 'right',
                formatter: function (value, row, index) {
                    return '<span class="orange"><b>' + value + '</b></span>';
                }
            }, {
                field: 'createDate',
                align: 'center',
                title: '申请时间',
                formatter: _formatterDate
            }, {
                field: 'reviewUserName',
                align: 'center',
                title: '审核人'
            }, {
                field: 'reviewDate',
                align: 'center',
                title: '审核时间',
                formatter: _formatterDate
            }, {
                field: 'aStatus',
                align: 'center',
                title: '状态',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return '<span>审核中</span>';
                    } else if (value == 1) {
                        return '<span class="green">已通过</span>';
                    } else if (value == 2) {
                        return '<span class="red">未通过</span>';
                    }
                }
            }]
        });
    };

    init = function ($t, $bs) {
        _stateMap.$table = $t;
        _stateMap.$search = $bs;

        _initTableReview();

        // 查询按钮
        _stateMap.$search.click(function () {
            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
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