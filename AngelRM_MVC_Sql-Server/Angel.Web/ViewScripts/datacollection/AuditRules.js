var AuditRules = (function () {
    var _stateMap = {
        $table: null,  // bootstrap-table
        $search: null, // 查询按钮
        $download: null, // 导入模板下载按钮
        $upload: null,   // Excel导入按钮
        $modal: null,           // bootstarp模态窗口
        $file: null     // 文件上传组件
    };
    var _configMap = {
    };
    var _initTableAuditRules, _initFile, _queryParams, _formatterDate, _download, _upload, init;

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
            rows: params.limit,       // 每页多少条数据
            offset: params.offset  // 请求第几页
        };
        var search = $(".btnSearch").val();
        values.search = search || '';
        return values;
    };

    // 导入模板下载
    _download = function () {
        var dialog = bootbox.dialog({
            size: 'small',
            closeButton: true,
            title: '甄核规则管理',
            message: '<p><i class="fa fa-spin fa-spinner"></i> 正在导出...</p>'
        });
        $.ajax({
            url: '/api/datacollectionapi/downloadauditrules',
            type: 'post',
            dataType: 'text',
            async: true,
            data: null,
            contentType: 'application/json',
            ajaxError: function () {
                dialog.find('.bootbox-body').html('导出失败!');
            },
            success: function (data) {
                RefreshDownFile();
                var json = eval('(' + data + ')');
                if (json.success) {
                    dialog.find('.bootbox-body').html(json.success);
                }
            }
        });
    };

    /**
     * 初始化文件上传组件
     */
    _initFile = function () {
        _stateMap.$file.fileinput({
            language: 'zh', //设置语言
            theme: "explorer",
            uploadUrl: "/api/datacollectionapi/uploadauditrules",
            uploadAsync: true,
            allowedFileExtensions: ['xlsx','xls'],//接收的文件后缀
            uploadClass: "btn btn-sm btn-success",
            removeClass: "btn btn-sm btn-danger",
            cancelClass: "btn btn-sm btn-default",
            browseClass: "btn btn-sm btn-primary", //按钮样式  
            enctype: 'multipart/form-data',
            minFileCount: 1,
            maxFileCount: 1,
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
            var name = $("#search-input").val();
            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
        }).on('fileuploaderror', function (event, data, msg) {
            //console.log('fileuploaderror', msg);
        });
    };

    /**
     * 初始化重复数据审核列表
     */
    _initTableAuditRules = function () {
        var curRow = {};
        _stateMap.$table.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/datacollectionapi/postauditrules',
            classes: 'table table-hover table-no-bordered table-striped',
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            queryParams: _queryParams,          //传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                      //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100, '全部'],        //可供选择的每页的行数（*）
            clickToSelect: true,                  //是否启用点击选中行
            //height: 300,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                field: 'indicatorname',
                title: '指标',
                width: 300
            }, {
                field: 'red_start',
                title: '红色边界1',
                align: 'right',
                editable: {
                    type: 'text',
                    title: '红色边界1',
                    emptytext: '空',
                    validate: function (v) {
                        if (isNaN(v)) return '必须是数字';
                        //var age = parseInt(v);
                        //if (age <= 0) return '年龄必须是正整数';
                    }
                }
            }, {
                field: 'red_end',
                title: '红色边界2',
                align: 'right',
                editable: {
                    type: 'text',
                    title: "红色边界2",
                    emptytext: '空',
                    validate: function (v) {
                        if (isNaN(v)) return '必须是数字';
                    }
                }
            }, {
                field: 'yellow_start',
                title: '黄色边界1',
                align: 'right',
                editable: {
                    type: 'text',
                    title: "黄色边界1",
                    emptytext: '空',
                    validate: function (v) {
                        if (isNaN(v)) return '必须是数字';
                    }
                }
            }, {
                field: 'yellow_end',
                title: '黄色边界2',
                align: 'right',
                editable: {
                    type: 'text',
                    title: "黄色边界2",
                    //mode: "inline",
                    emptytext: '空',
                    validate: function (v) {
                        if (isNaN(v)) return '必须是数字';
                    }
                }
            }, {
                    field: "unit",
                    title: "单位",
                    align: 'center',
                    editable: {
                        type: "select",              //编辑框的类型。支持text|textarea|select|date|checklist等
                        source: [{ value: '', text: "无" }, { value: '%', text: "%" }],
                        title: "单位",
                        emptytext: '无'
                    }
            }, {
                field: 'createDate',
                title: '创建时间',
                align: 'center',
                formatter: _formatterDate
            }, {
                field: 'createUserName',
                align: 'center',
                title: '创建人'
            }, {
                field: 'modifyDate',
                align: 'center',
                title: '修改时间',
                formatter: _formatterDate
            }, {
                field: 'modifyUserName',
                align: 'center',
                title: '修改人'
            }],
            onEditableSave: function (field, row, oldValue, $el) {
                if (row.red_start === "") row.red_start = "NULL";
                if (row.red_end === "") row.red_end = "NULL";
                if (row.yellow_start === "") row.yellow_start = "NULL";
                if (row.yellow_end === "") row.yellow_end = "NULL";
                $.ajax({
                    type: "post",
                    url: "/api/datacollectionapi/updateauditrules",
                    data: row,
                    dataType: 'JSON',
                    success: function (data, status) {
                        if (status == "success") {
                            /*bootbox.alert({
                                size: 'small',
                                message: '规则修改成功'
                            });*/
                            _stateMap.$table.bootstrapTable('refresh');
                            var postlist1 = '{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-甄核规则管理","operationtype": "修改指标[' + row.indicatorid + '-' + row.indicatorname+']的甄核规则成功!"}]}';
                            oper_log(postlist1);
                        }
                    },
                    error: function () {
                        bootbox.alert({
                            size: 'small',
                            message: '规则修改失败'
                        });
                        var postlist1 = '{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-甄核规则管理","operationtype": "修改指标[' + row.indicatorid + '-' + row.indicatorname + ']的甄核规则失败!"}]}';
                        oper_log(postlist1);
                    },
                    complete: function () {

                    }
                });
            }
        });
    };

    init = function ($t, $bs, $bd, $bu, $f, $m) {
        _stateMap.$table = $t;
        _stateMap.$search = $bs;
        _stateMap.$download = $bd;
        _stateMap.$upload = $bu;
        _stateMap.$modal = $m;
        _stateMap.$file = $f;

        _initTableAuditRules();
        _initFile();

        // 点击上传按钮，打开模态窗口时，清空fileinput控件
        _stateMap.$modal.on('show.bs.modal', function () {
            _stateMap.$file.fileinput('clear');
        });

        // 查询按钮
        _stateMap.$search.click(function () {
            _stateMap.$table.bootstrapTable('refresh', { pageNumber: 1 });
        });

        _stateMap.$download.click(function () {
            _download();
        });

    };
    return {
        init: init
    };
}());