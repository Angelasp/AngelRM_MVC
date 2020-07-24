var FillStatus = (function () {
    var _stateMap = {
        $remove: null,          // 删除按钮
        $search: null,          // 查询按钮
        $modal: null,           // bootstarp模态窗口
        $tabletemplate: null,   // 上传模板列表
        $filetemplate: null,     // 文件上传组件
        $txt_timedate: null
    };
    var _configMap = {
        selections: [],
        batch: null,
        type: null,
        timedate: null
    };
    var _initTableTemplate, _initFileTemplae, _initDatetimepicker,
        _queryParams, _getIdSelections, _responseHandler, _remove,
        _formatterDate, _getSearchName, _getBatch, init;

    function getHeight() {
        return $(window).height() - $('h1').outerHeight(true);
    }

    _getBatch = function () {
        var num = "";
        for (var i = 0; i < 13; i++) {
            num += Math.floor(Math.random() * 10);
        }
        return num;
    };

    // bootstarp-table-columns日期格式化
    _formatterDate = function (value, row, index){
        if (value) {
            return value.replace(/T/, " ");
        } else {
            return value;
        }
    };

    _responseHandler = function (res) {
        $.each(res, function (i, row) {
            row.state = $.inArray(row.id, _configMap.selections) !== -1;
        });
        return res;
    };

    // 请求服务数据时所传参数
    _queryParams = function (params) {
        var name = $("#search-input").val();
        return {
            fileName: name,      // 检索输入框的值(按文件名查询)
            type: 1,               // 数据备份文件
            rows: params.limit,    // 每页多少条数据
            offset: params.offset  // 请求第几页
        };
    };

    // 获取bootstarp-table选中的行
    _getIdSelections = function () {
        return $.map(_stateMap.$tabletemplate.bootstrapTable('getSelections'), function (row) {
            return row;
        });
    };

    // 初始化日期控件(年-月-日)
    _initDatetimepicker = function () {
        _stateMap.$txt_timedate.datetimepicker({
            todayHighlight: 1,
            startView: 3, //这里就设置了默认视图为年视图
            minView: 3, //设置最小视图为年视图
            forceParse: 0,
            format: "yyyy年mm月", //选择日期后，文本框显示的日期格式 
            language: 'zh-CN', //汉化 
            autoclose: true //选择日期后自动关闭 
        });
    };

    // 删除数据模板
    _remove = function (values) {
        bootbox.confirm({
            message: "确定删除此" + (values.length) + "项数据模板?",
            size: 'small',
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
                var dialog = bootbox.dialog({ onEscape: false, closeButton: false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
                $.ajax({
                    url: '/api/fillstatusapi/remove',
                    type: 'post',
                    //async: false,
                    //dataType: 'text',
                    data: JSON.stringify(values),
                    contentType: 'application/json',
                    error: function (data) {
                        dialog.find('.bootbox-body').html('操作失败!');
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 5000);
                    },
                    success: function (data) {
                        dialog.modal('hide');
                        if (data && data.count > 0) {
                            var ids = [];
                            for (var i in values) {
                                ids.push(values[i].id);
                            }
                            _stateMap.$tabletemplate.bootstrapTable('remove', {
                                field: 'id',
                                values: ids
                            });
                            _stateMap.$remove.prop('disabled', true);
                        }
                    }
                });
            }
        });
    };

     /**
     * 初始化数据模板列表
     */
    _initTableTemplate = function () {
        _stateMap.$tabletemplate.bootstrapTable({
            //height: getHeight(),
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/fillstatusapi/post',
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
            clickToSelect: false,               //是否启用点击选中行
            //height: 300,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            maintainSelected: true,             // 设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项
            selectItemName: 'id',
            responseHandler: _responseHandler,
            columns: [{
                field: 'state',
                title: '选择',
                checkbox: true,
                align: 'center'
            }, {
                field: 'filename',
                title: '文件名',
                align: 'center'
            }, {
                field: 'source_type',
                align: 'center',
                title: '上报来源',
                formatter: function (value, row, index) {
                    if (value === "0") return "集团上报";
                    if (value === "1") return "省公司上报";
                }
            }, {
                field: 'timedate',
                align: 'center',
                title: '日期'
            }, {
                field: 'createusername',
                align: 'center',
                title: '上传用户'
            }, {
                field: 'createdate',
                align: 'center',
                title: '修改时间',
                formatter: _formatterDate
            },  {
                field: 'id',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return [
                        '<a class="remove" href="javascript:void(0)" title="删除">',
                        '<i class="glyphicon glyphicon-trash red"></i></a>&nbsp;&nbsp;',
                        '<a class="download" href="javascript:void(0)" title="下载">',
                        '<i class="glyphicon glyphicon-download"></i></a>'
                    ].join('');
                }
            }]
        });
    };

    /**
     * 初始化文件上传组件
     */
    _initFileTemplae = function () {
        _stateMap.$filetemplate.fileinput({
            language: 'zh', //设置语言
            theme: "explorer",
            uploadUrl: "/api/fillstatusapi/upload",
            uploadAsync: true,
            allowedFileExtensions: ['xlsx'],//接收的文件后缀
            uploadClass: "btn btn-sm btn-success",
            removeClass: "btn btn-sm btn-danger",
            cancelClass: "btn btn-sm btn-default",
            browseClass: "btn btn-sm btn-primary", //按钮样式  
            enctype: 'multipart/form-data',
            minFileCount: 1,
            maxFileCount: 1,
            overwriteInitial: false,
            previewFileIcon: '<i class="fa fa-file"></i>',
            preferIconicPreview: true,
            uploadExtraData: function (previewId, index) {
                return { batch: _configMap.batch, type: _configMap.type, timedate: _configMap.timedate };
            },
            previewFileIconSettings: { 
                'xls': '<i class="fa fa-file-excel-o text-success"></i>',
                'xlsx': '<i class="fa fa-file-excel-o text-success"></i>'
            },
            previewFileExtSettings: {
                'xls': function (ext) {
                    return ext.match(/(xls|xlsx)$/i);
                }
            }
        }).on('fileloaded', function (event, file, previewId, index, reader) {

            _configMap.type = $("#sel_source_type").val();
            _configMap.timedate = $("#txt_timedate").val();

            if (!_configMap.type || !_configMap.timedate)
            {
                bootbox.alert({
                    message: "参数填写不完整!",
                    size: 'small',
                    onEscape: false,
                    closeButton: false,
                    callback: function (result) {
                        _stateMap.$filetemplate.fileinput('clear');
                    }
                });
            }

            // 获取批次号
            if (_configMap.batch) return;
            if (!previewId) {
                _configMap.batch = _getBatch();
            }
            else {
                _configMap.batch = previewId.match(/-(\S*)-/)[1];
            }
        }).on('fileuploaded', function (event, data, previewId, index) {
            var name = $("#search-input").val();
            _stateMap.$tabletemplate.bootstrapTable('refresh', { pageNumber: 1 });
            }).on('fileuploaderror', function (event, data, msg) {
            bootbox.alert({
                message: msg,
                size: 'small',
                onEscape: false,
                closeButton: false,
                callback: function (result) {
                    if (msg.indexOf("请先删除") == -1) {
                        // 日志文件下载
                        location.href = "/InPut/DownFillStatusLog?batch=" + _configMap.batch + "&filename=" + data.filenames[data.index];
                    }
                }
            });
        });
    };

    init = function ($t, $f, $m, $br, $bs, $tm) {
        _stateMap.$modal = $m;
        _stateMap.$remove = $br;
        _stateMap.$search = $bs;
        _stateMap.$tabletemplate = $t;
        _stateMap.$filetemplate = $f;
        _stateMap.$txt_timedate = $tm;

        window.operateEvents = {
            'click .remove': function (e, value, row, index) {
                _remove([row]);
            },
            'click .download': function (e, value, row, index) {
                // 数据模板文件下载
                location.href = "/InPut/DownFillStatus?filename=" + row.filename + "&backupname=" + row.backupname;
            }
        };

        _initDatetimepicker();
        _initTableTemplate();
        _initFileTemplae();

        // 点击上传按钮，打开模态窗口时，清空fileinput控件
        _stateMap.$modal.on('show.bs.modal', function () {
            _stateMap.$filetemplate.fileinput('clear');
        });
        // 关闭模态窗口时，刷新数据模板列表(bootstart-table)
        //_stateMap.$modal.on('hide.bs.modal', function () {
        //});
        // 查询按钮
        _stateMap.$search.click(function () {
            _stateMap.$tabletemplate.bootstrapTable('refresh', { pageNumber: 1 });
        });
        // 删除按钮
        _stateMap.$remove.click(function () {
            var rows = _getIdSelections();
            _remove(rows);
        });    
        _stateMap.$tabletemplate.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
                _stateMap.$remove.prop('disabled', !_stateMap.$tabletemplate.bootstrapTable('getSelections').length);
                _configMap.selections = _getIdSelections();
            });
        $("#btnTemplate").click(function () {
            var msg = null;
            bootbox.prompt({
                size: "small",
                title: "请选择上报来源!",
                value: _configMap.type,  // 默认0-集团上报
                buttons: {
                    confirm: {
                        label: '确定',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn-danger'
                    }
                },
                inputType: 'select',
                inputOptions: [{
                    text: '集团上报',
                    value: '0',
                }, {
                    text: '省公司上报',
                    value: '1',
                }],
                callback: function (result) {
                    if (result === null) return;
                    $.ajax({
                        url: '/api/exporttemplategpapi/downloadtotal',
                        type: 'post',
                        //async: false,
                        dataType: 'text',
                        data: JSON.stringify({ sourcetype: result }),
                        contentType: 'application/json',
                        success: function (data) {
                            var json = eval('(' + data + ')');
                            if (json.success)
                                alert(json.success);
                            else if (json.error)
                                alert(json.error);
                        }
                    });
                }
            });
        });
        /*$(window).resize(function () {
            _stateMap.$tabletemplate.bootstrapTable('resetView', {
                height: getHeight()
            });
        });*/
    };

    return {
        init: init
    };
}());