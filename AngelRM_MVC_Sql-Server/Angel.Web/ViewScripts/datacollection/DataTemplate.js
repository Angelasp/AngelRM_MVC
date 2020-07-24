var DataTemplate = (function () {
    var _stateMap = {
        $remove: null,          // 删除按钮
        $search: null,          // 查询按钮
        $modal: null,           // bootstarp模态窗口
        $tabletemplate: null,   // 上传模板列表
        $filetemplate: null     // 文件上传组件
    };
    var _configMap = {
        selections: [],
    };
    var _initTableTemplate, _initFileTemplae, _queryParams,
        _getIdSelections, _responseHandler, _remove,
        _formatterDate, _getSearchName, init;

    function getHeight() {
        return $(window).height() - $('h1').outerHeight(true);
    }

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
            fileName: name,        // 检索输入框的值(按文件名查询)
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
                $.ajax({
                    url: '/api/inputapi/remove',
                    type: 'post',
                    //async: false,
                    dataType: 'text',
                    data: JSON.stringify(values),
                    contentType: 'application/json',
                    success: function (data) {
                        //if (data && data.count > 0) {
                        //}
                        bootbox.alert({
                            message: "删除成功!",
                            size: 'small',
                            callback: function (result) {
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
                        })
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
            url: '/api/inputapi/post',
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
                field: 'fileName',
                title: '模板名'
            }, {
                field: 'downLoadLink',
                align: 'center',
                title: '存储路径'
            }, {
                field: 'createDate',
                align: 'center',
                title: '上传时间',
                formatter: _formatterDate
            }, {
                field: 'createUserName',
                align: 'center',
                title: '上传用户'
            }, {
                field: 'modifyDate',
                align: 'center',
                title: '修改时间',
                formatter: _formatterDate
            }, {
                field: 'modifyUserName',
                align: 'center',
                title: '修改用户'
            },  {
                field: 'id',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return [
                        '<a class="remove" href="javascript:void(0)" title="删除">',
                        '<i class="glyphicon glyphicon-trash red"></i>',
                        '</a>'
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
            uploadUrl: "/api/inputapi/upload",
            uploadAsync: true,
            allowedFileExtensions: ['xlsx'],//接收的文件后缀
            uploadClass: "btn btn-sm btn-success",
            removeClass: "btn btn-sm btn-danger",
            cancelClass: "btn btn-sm btn-default",
            browseClass: "btn btn-sm btn-primary", //按钮样式  
            enctype: 'multipart/form-data',
            minFileCount: 1,
            maxFileCount: 10,
            overwriteInitial: false,
            previewFileIcon: '<i class="fa fa-file"></i>',
            /*uploadExtraData: { ///额外参数的关键点
                img_key: "1000",
                img_keywords: "happy, nature",
            },*/
            preferIconicPreview: true,
            previewFileIconSettings: { 
                'xls': '<i class="fa fa-file-excel-o text-success"></i>',
                'xlsx': '<i class="fa fa-file-excel-o text-success"></i>'
            },
            previewFileExtSettings: {
                'xls': function (ext) {
                    return ext.match(/(xls|xlsx)$/i);
                }
            }
        }).on('fileuploaded', function (event, data, previewId, index) {
            /*if (index === (data.filescount - 1)) {
                alert(data.response.msg);
            }*/
            //console.log('fileuploaded', data);
            var name = $("#search-input").val();
            _stateMap.$tabletemplate.bootstrapTable('refresh', { pageNumber: 1 });
        }).on('fileuploaderror', function (event, data, msg) {
            //console.log('fileuploaderror', msg);
        });
    };

    init = function ($t, $f, $m, $br, $bs) {
        _stateMap.$modal = $m;
        _stateMap.$remove = $br;
        _stateMap.$search = $bs;
        _stateMap.$tabletemplate = $t;
        _stateMap.$filetemplate = $f;

        window.operateEvents = {
            'click .remove': function (e, value, row, index) {
                _remove([row]);
            }
        };

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