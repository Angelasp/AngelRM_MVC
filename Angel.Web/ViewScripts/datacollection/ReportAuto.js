var ReportAuto = (function () {
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
            status: -1,
            rows: params.limit,       // 每页多少条数据
            offset: params.offset  // 请求第几页
        };
        var field = $("#select_field").val();
        var label = $('#select_field :selected').parent().attr('label');
        if (label) { // 根据审核状态查询
            values.status = field;
        } else {
            var search = $(".btnSearch").val();
            if (field && search) {
                values.field = field;
                values.search = search;
            }
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
    /**
     * 初始化重复数据审核列表
     */
    _initTableReview = function () {
        _stateMap.$table.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/datareportgpapi/postreportauto',
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
            uniqueId: "rid",                     //每一行的唯一标识，一般为主键列
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            selectItemName: 'rid',
            responseHandler: _responseHandler,
            columns: [{
                field: 'rid',
                title: '报表ID',
                align: 'left'
            }, {
                field: 'rname',
                align: 'center',
                title: '报表名称'
            }, {
                field: 'rcreateusername',
                align: 'center',
                title: '创建人'
            }, {
                field: 'rcreatedate',
                align: 'center',
                title: '创建时间',
                formatter: _formatterDate
            }, {
                field: 'rremak',
                align: 'center',
                title: '备注'
            }, {
                field: 'sid',
                align: 'center',
                title: '体系ID'
            }, {
                field: 'rstatus',
                title: '状态',
                align: 'right',
                formatter: function (value, row, index) {
                    if (value === 0) return '为完成';
                    if (value === 1) return '已完成';
                }
            }, {
                field: 'state',
                align: 'center',
                title: '操作',
                events: operateEvents,
                formatter: function (value, row, index) {
                    if (row.rstatus) {
                        return '<a class="downloadA" href="javascript:void(0)" title="下载"><i class="glyphicon glyphicon-download"></i></a>'
                    }
                }
            }]
        });
    };

    init = function ($t, $bs) {
        _stateMap.$table = $t;
        _stateMap.$search = $bs;

        window.operateEvents = {
            'click .downloadA': function (e, value, row, index) {
                // 存档文件下载
                //window.location.href = "/InPut/DownBackupFile?filename=" + row.fileName + "&sysfilename=" + row.sysName + "&type=1";
            }
        };

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