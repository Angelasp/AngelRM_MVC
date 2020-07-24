// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var DataImport = (function () {
    var _stateMap = {
        $btnSearch: $("#btnSearch"),
        $btnOk: $("#btnOk"),
        $btnNo: $("#btnNo"),
        $btnSearch2: $("#btnSearch2"),
        $btnOk2: $("#btnOk2"),
        $btnNo2: $("#btnNo2"),
        $wizard: null,       // 向导控件
        $tbl_template: null, // 数据模板下载列表
        $tbl_archive: null,  // 上传文件存档列表
        $tbl_repeat: null,   // 指标值重复列表
        $tbl_repeat2: null,  // 来源重复列表
        $tbl_error: null,    // 错误数据列表
        $fileinput: null   // 文件上传组件
    };
    var _configMap = {
        msg: '',             // 消息提示
        validation: false,   // 验证(是否可以点击下一步)
        batch: null,         // 批次号(一次数据上报，不管上传多少个文件，均属同一批次,根据此批次号获取重复数据、红色问题数据、黄色问题数据)
        files_error: {},     // 上传失败的文件 
        files_success: [],    // 上传成功的文件
        this_filename: null,  // 当前上传成功的文件
        selections: [],
        type: null, // 0-集团上报，1-省公司上报
        rolename: null, // 角色名
        datenow: new Date().Format("yyyy年MM月"),
        rows: 0,
        offset: 0,
        N: { "零": 0, "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10 },
        M: { 0: '零', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' }
    };
    var _initWizard, _initTableByTemplate, _initTableByArchive, _initTableByRepeat, _initTableByRepeat2, _initTableByError, _initFileinput,
        _queryParams, _queryParams2, _queryParamsByRepeat, _queryParamsByRepeat2, _queryParamsByQuestion, _validation, _refreashByStep,
        _getIdSelections, _responseHandler, _removeRepeat, _removeRepeat2, _updateRepeat, _updateRepeat2, _RegNopNumber, _RegNopNumberMsg, _RegIData, _validateIData,
        _RegZHfoNumber, _sumbitQuestionData, _abortQuestionData, _readCookie, _refreshTable, init;

    _readCookie = function (name) {
        var searchName = name + '=';
        var cityid = unescape(document.cookie.split(searchName)[1].split(";")[0]);
        while (cityid.charAt(0) == ' ')
            cityid = cityid.substring(1, cityid.length);
        return decodeURIComponent(cityid);
    };

    _refreshTable = function (obj) {
        var param = { pageNumber: 1 };
        if (!obj.bootstrapTable('getData').length)
            param.pageSize = 100;
        obj.bootstrapTable('refresh', param);
    }; 

    // 请求服务数据时所传参数(数据模板)
    _queryParams = function (params) {
        //var name = $("#nav-search-input").val();
        return {
            //fileName: name,        // 检索输入框的值(按文件名查询)
            createUserName: 52,
            rows: params.limit,    // 每页多少条数据
            offset: params.offset  // 请求第几页
        };
    };

    _queryParams2 = function (params) {
        var name = $("#archive_search-input").val();
        return {
            type: 1,
            fileName: name,        // 检索输入框的值(按文件名查询)
            rows: params.limit,    // 每页多少条数据
            offset: params.offset  // 请求第几页
        };
    };

    // 请求服务数据时所传参数(重复数据)
    _queryParamsByRepeat = function (params) {
        //var files = _stateMap.$fileinput.fileinput('getFileStack');
        var length = _stateMap.$tbl_repeat.bootstrapTable('getData').length;
        var values = {
            rows: length ? params.limit : 100,
            offset: length ? params.offset : 0,
            batch: _configMap.batch,
            type: 'IData'
        };
        var field = $("#select_field").val();
        var search = $("#input_search").val();
        if (field && search) {
            values.field = field;
            values.search = search;
        }
        return values;
    };

    _queryParamsByRepeat2 = function (params) {
        //var files = _stateMap.$fileinput.fileinput('getFileStack');
        var length = _stateMap.$tbl_repeat2.bootstrapTable('getData').length;
        var values = {
            rows: length ? params.limit : 100,
            offset: length ? params.offset : 0,
            batch: _configMap.batch,
            type: 'SOURCENAME'
        };
        var field = $("#select_field2").val();
        var search = $("#input_search2").val();
        if (field && search) {
            values.field = field;
            values.search = search;
        }
        return values;
    };

    // 请求服务端数据时所传参数(问题数据)
    _queryParamsByQuestion = function (params) {
        var isMust = $("#select_isMust").val();
        var type = $("#select_type").val();
        var length = _stateMap.$tbl_error.bootstrapTable('getData').length;
        var values = {
            rows: length ? params.limit : 100,
            offset: length ? params.offset : 0,
            batch: _configMap.batch,
            isMust: isMust,
            type: type
        };

        var field = $("#select_field3").val();
        var search = $("#input_search3").val();
        if (field && search) {
            values.field = field;
            values.search = search;
        }
        return values;
    };

    _refreashByStep = function (step) {
        _configMap.selections.length = 0;
        _refreshTable(_stateMap.$tbl_error);
        _refreshTable(_stateMap.$tbl_repeat2);
        _refreshTable(_stateMap.$tbl_repeat);
    };

    // 点击下一步时验证
    _validation = function (direction, step) {
        if (direction === 'previous') return true;
        var length = 0;
        for (var i in _configMap.files_error) {
            if (i === 'length') continue;
            length++;
        }
        if (step == 1 && length > 0) {
            _configMap.validation = false;
            _configMap.msg = "上传的文件有误！";
        } else if (step == 1 && _configMap.files_success.length == 0) {
            _configMap.validation = false;
            _configMap.msg = "请先上传文件！";
        } else if (step == 2 && (_stateMap.$tbl_error.bootstrapTable('getData').length || _configMap.error_total)) {
            _configMap.validation = false;
            _configMap.msg = "尚有问题数据未处理，无法进入下一步，请清空查询条件，再次查询并处理问题！";
        } else if (step == 3 && (_stateMap.$tbl_repeat2.bootstrapTable('getData').length || _configMap.repeat_count2)) {
            _configMap.validation = false;
            _configMap.msg = "尚有数据来源未更新，无法进入下一步，请清空查询条件，再次查询并处理数据！";
        } else if (step == 4 && (_stateMap.$tbl_repeat.bootstrapTable('getData').length || _configMap.repeat_count)) {
            _configMap.validation = false;
            _configMap.msg = "尚有重复数据未处理，无法进入下一步，请清空查询条件，再次查询并处理重复数据！";
        } else {
            _configMap.validation = true;
            _configMap.msg = "";
        }
        return _configMap.validation;
    };

    // 获取bootstarp-table选中的行
    _getIdSelections = function ($table) {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id;
        });
    };

    _responseHandler = function (res) {
        $.each(res, function (i, row) {
            row.state = $.inArray(row.id, _configMap.selections) !== -1;
        });
        return res;
    };

    // 放弃更新重复数据
    _removeRepeat = function (values) {
        bootbox.confirm({
            size: 'small',
            message: "确定放弃此" + (values.length) + "项重复数据的更新?",
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
                var dialog = bootbox.dialog({ onEscape: false,closeButton: false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
                $.ajax({
                    url: '/api/datareportapi/removedatarepeat',
                    type: 'post',
                    //async: false,
                    //dataType: 'text',
                    data: JSON.stringify({ ids: values.join(","), batch: _configMap.batch }),
                    contentType: 'application/json',
                    error: function () {
                        dialog.find('.bootbox-body').html('操作失败!');
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 5000);
                    },
                    success: function (data) {
                        dialog.modal('hide');
                        if (data && data.count > 0) {
                            _refreshTable(_stateMap.$tbl_repeat);
                            _stateMap.$btnOk.prop('disabled', true);
                            _stateMap.$btnNo.prop('disabled', true);
                        }
                    }
                });
            }
        });
    };

    // 放弃更新数据来源
    _removeRepeat2 = function (values) {
        bootbox.confirm({
            size: 'small',
            message: "确定放弃更新此" + (values.length) + "项数据来源?",
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
                var dialog = bootbox.dialog({ onEscape: false,closeButton:false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
                $.ajax({
                    url: '/api/datareportapi/removedatarepeat2',
                    type: 'post',
                    //async: false,
                    //dataType: 'text',
                    data: JSON.stringify(values),
                    contentType: 'application/json',
                    error: function () {
                        dialog.find('.bootbox-body').html('操作失败!');
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 5000);
                    },
                    success: function (data) {
                        dialog.modal('hide');
                        if (data && data.count > 0) {
                            _refreshTable(_stateMap.$tbl_repeat2);
                            _stateMap.$btnOk2.prop('disabled', true);
                            _stateMap.$btnNo2.prop('disabled', true);
                        }
                    }
                });
            }
        });
    };

    // 重复数据提交审核
    _updateRepeat = function (values) {
        bootbox.confirm({
            size: 'small',
            message: "确定将此" + (values.length) + "项重复数据提交审核?",
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
                var dialog = bootbox.dialog({ onEscape: false,closeButton: false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
                $.ajax({
                    url: '/api/datareportapi/updateDataRepeat',
                    type: 'post',
                    //async: false,
                    //dataType: 'text',
                    data: JSON.stringify({ ids: values.join(","), status: 0, batch: _configMap.batch }),
                    contentType: 'application/json',
                    error: function () {
                        dialog.find('.bootbox-body').html('操作失败!');
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 5000);
                    },
                    success: function (data) {
                        dialog.modal('hide');
                        if (data && data.count > 0) {
                            _refreshTable(_stateMap.$tbl_repeat);
                            _stateMap.$btnOk.prop('disabled', true);
                            _stateMap.$btnNo.prop('disabled', true);
                            var postlist1 = '{ "insert_log": [{ "logposition":"数据填报","operationtype": "指标值重复数据提交审核。(共' + values.length + '项)"}]}';
                            oper_log(postlist1);
                        }
                    }
                });
            }
        });
    };

    // 重复数据提交审核
    _updateRepeat2 = function (rows) {
        bootbox.confirm({
            size: 'small',
            message: "确定更新此" + (rows.length) + "项数据来源?",
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
                    url: '/api/datareportapi/updateDataRepeat2',
                    type: 'post',
                    //async: false,
                    //dataType: 'text',
                    data: JSON.stringify(rows),
                    contentType: 'application/json',
                    error: function () {
                        dialog.find('.bootbox-body').html('操作失败!');
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 5000);
                    },
                    success: function (data) {
                        dialog.modal('hide');
                        if (data && data.count > 0) {
                            _refreshTable(_stateMap.$tbl_repeat2);
                            _stateMap.$btnOk2.prop('disabled', true);
                            _stateMap.$btnNo2.prop('disabled', true);
                            var postlist1 = '{ "insert_log": [{ "logposition":"数据填报","operationtype": "更新数据来源。(共' + rows.length + '项)"}]}';
                            oper_log(postlist1);
                        }
                    }
                });
            }
        });
    };
    
    // 再次提交问题数据
    _sumbitQuestionData = function (rows) {
        bootbox.confirm({
            size: 'small',
            message: "确定修改此" + (rows.length) + "项数据?",
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
                // 利用setTimeout解决样式问题(confirm的DOM还没完全empty，alert的DOM就显示了，影响整体布局)
                setTimeout(function () {
                    var dialog = bootbox.dialog({ onEscape: false,closeButton: false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
                    $.ajax({
                        url: '/api/datareportapi/updatedataquestion',
                        type: 'post',
                        //async: false,
                        //data: rows,
                        //dataType: 'JSON',
                        //data: JSON.stringify({ ids: rows.join(",") }),
                        data: JSON.stringify(rows),
                        contentType: 'application/json',
                        error: function () {
                            dialog.find('.bootbox-body').html('操作失败!');
                            setTimeout(function () {
                                dialog.modal('hide');
                            }, 5000);
                        },
                        success: function (data) {
                            dialog.modal('hide');
                            if (data && data.error) {
                                bootbox.alert({
                                    message: data.error,
                                    size: 'small'
                                });
                                _stateMap.$tbl_error.bootstrapTable('refresh');
                            } else {
                                _refreshTable(_stateMap.$tbl_error);
                            }
                            $("#btnAbort").prop('disabled', true);
                            $("#btnSubmit").prop('disabled', true);
                        }
                    });
                }, 500);
            }
        });
    };

    // 舍弃问题数据
    _abortQuestionData = function (values) {
        bootbox.confirm({
            size: 'small',
            message: "确定放弃此" + (values.length) + "项数据的上报?", 
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
                var dialog = bootbox.dialog({ onEscape: false,closeButton: false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
                $.ajax({
                    url: '/api/datareportapi/removedataquestion',
                    type: 'post',
                    //async: false,
                    dataType: 'JSON',
                    data: { ids: values.join(","), batch: _configMap.batch },
                    error: function () {
                        dialog.find('.bootbox-body').html('操作失败!');
                        setTimeout(function () {
                            dialog.modal('hide');
                        }, 5000);
                    },
                    success: function (data) {
                        dialog.modal('hide');
                        if (data && data.count > 0) {
                            _refreshTable(_stateMap.$tbl_error);
                            $("#btnAbort").prop('disabled', true);
                            $("#btnSubmit").prop('disabled', true);
                        }
                    }
                });
            }
        });
    };

    /**
     * 初始化向导控件
     */
    _initWizard = function () {
        _stateMap.$wizard.ace_wizard({

        }).on('actionclicked.fu.wizard', function (e, info) {
            if (!_validation(info.direction, info.step)) {
                e.preventDefault();//阻止点击并选择步骤
                bootbox.alert({
                    message: _configMap.msg,
                    size: 'small'
                });
            } else {
                if (info.step == 4 && !_configMap.msg) {
                    bootbox.alert({
                        message: "本次数据填报已完成！",
                        size: 'small'
                    });
                } else {
                    _refreashByStep(info.step);
                }
            }
            //_refreashByStep(info.step);
        }).on('finished.fu.wizard', function (e) {
            /*bootbox.dialog({
                size: 'small',
                message: "您的数据已成功上传!",
                buttons: {
                    "success": {
                        "label": "OK",
                        "className": "btn-sm btn-primary"
                    }
                }
            });*/
        }).on('stepclick.fu.wizard', function (e, info) {
        }).on('changed.fu.wizard', function () {
        });
        $('#sample-form').show();
    };

    /**
     * 初始化文件上传组件
     */
    _initFileinput = function () {
        _stateMap.$fileinput.fileinput({
            language: 'zh', //设置语言
            //theme: "explorer",
            uploadUrl: "/api/datareportapi/upload",
            allowedFileExtensions: ['xlsx','txt','zip','rar'],//接收的文件后缀
            uploadClass: "btn btn-sm btn-success",
            removeClass: "btn btn-sm btn-danger",
            cancelClass: "btn btn-sm btn-default",
            browseClass: "btn btn-sm btn-primary", //按钮样式  
            enctype: 'multipart/form-data',
            minFileCount: 1,
            //maxFileCount: 5,
            overwriteInitial: false,
            previewFileIcon: '<i class="fa fa-file"></i>',
            uploadExtraData: function (previewId, index) {
                return { batch: _configMap.batch, type: _configMap.type };
            },
            preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
            previewFileIconSettings: { // configure your icon file extensions
                'xls': '<i class="fa fa-file-excel-o text-success"></i>',
                'xlsx': '<i class="fa fa-file-excel-o text-success"></i>'
            },
            previewFileExtSettings: { // configure the logic for determining icon file extensions
                'xls': function (ext) {
                    return ext.match(/(xls|xlsx)$/i);
                }
            }
        }).on('fileloaded', function (event, file, previewId, index, reader) {
            // 获取批次号
            if (_configMap.batch) return;
        }).on('filepreupload', function (event, data, previewId, index) {
            // 上传前清空错误的文件列表
            _configMap.files_error.length = 0;
        }).on('filepreremove', function (event, id, index) {
            // 点击删除按钮时，如果是错误文件，就从json列表中删除
            delete _configMap.files_error[id];
        }).on('fileclear', function (event) {
            _configMap.files_error = {};
        }).on('fileuploaded', function (event, data, previewId, index) {
            // 保存上传成功的文件名
            _configMap.files_success.push(data.files[index].name);
            _configMap.this_filename = data.files[index].name;
            var postlist1 = '{ "insert_log": [{ "logposition":"数据填报","operationtype": "导入《' + data.files[index].name + '》数据文件成功。"}]}';
            oper_log(postlist1);
        }).on('fileuploaderror', function (event, data, msg) {
            // 保存上传失败的文件名
            _configMap.files_error[data.id] = data.filenames[data.index];
            var postlist1 = '{ "insert_log": [{ "logposition":"数据填报","operationtype": "导入《' + data.files[index].name + '》数据文件失败!"}]}';
            oper_log(postlist1);
        });
    };

    /**
     * 初始化数据模板下载列表
     */
    _initTableByTemplate = function () {
        _stateMap.$tbl_template.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/inputapi/post',
            classes: 'table table-hover table-no-bordered table-striped',
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            //queryParams: _queryParams,          //传递参数（*）
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
            columns: [{
                field: 'fileName',
                title: '模板名'
            }/*, {
                field: 'createDate',
                title: '上传时间',
                align: 'center',
                formatter: function (value, row, index) {
                    return value.replace(/T/, " ");
                }
            }, {
                field: 'createUserName',
                align: 'center',
                title: '上传用户'
            }*/, {
                field: 'id',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return [
                        '<a class="download" href="javascript:void(0)" title="下载">',
                        '<i class="glyphicon glyphicon-download"></i>',
                        '</a>'
                    ].join('');
                }
            }]
        });
    };

    _initTableByArchive = function () {
        _stateMap.$tbl_archive.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/inputapi/postarchive',
            classes: 'table table-hover table-no-bordered table-striped',
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: _queryParams2,          //传递参数（*）
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
            columns: [{
                field: 'fileName',
                title: '文件名',
                align: 'left',
            }, {
                field: 'createDate',
                title: '上传时间',
                align: 'center',
                formatter: function (value, row, index) {
                    return value.replace(/T/, " ");
                }
            }, {
                field: 'id',
                title: '操作',
                align: 'right',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return [
                        '<a class="downloadA" href="javascript:void(0)" title="下载原始文件"><i class="glyphicon glyphicon-download"></i></a>',
                        '<a class="downloadB" href="javascript:void(0)" title="下载回写文件"><i class="glyphicon glyphicon-download"></i></a>'
                    ].join('');
                }
            }]
        });
    };

    // 验证当期时间格式是否正确
    _RegNopNumber = function (value, last) {
        var reg1 = /^((1[6-9]|[2-9]\d)\d{2})年(0[1-9]|1[012])月$/;  
        var reg2 = /^((1[6-9]|[2-9]\d)\d{2})年第[一二三四五六七八九十]期$/;
        if (!value.match(reg1) && !value.match(reg2))
            return false;
        if (value.indexOf("月") >= 0 && value.localeCompare(_configMap.datenow) > 0)
            return false;
        if (!last)
            return true;
        if (value.substr(value.length - 1, 1) !== last.substr(last.length - 1, 1))
            return false;
        if (value.indexOf("期") >= 0) {
            var sK = value.substr(value.indexOf("第") + 1, 1);
            var sV = _configMap.N[sK];
            value = value.replace(new RegExp(sK, 'g'), sV);
        }
        //if (value.localeCompare(last) < 0)
        //    return false;
        return true;
     };

    _RegNopNumberMsg = function (value, last) {
        var reg1 = /^((1[6-9]|[2-9]\d)\d{2})年(0[1-9]|1[012])月$/;
        var reg2 = /^((1[6-9]|[2-9]\d)\d{2})年第[一二三四五六七八九十]期$/;
        if (!value.match(reg1) && !value.match(reg2))
            return "当期时间格式不正确！";
        if (value.indexOf("月") >= 0 && value.localeCompare(_configMap.datenow) > 0)
            return "上报时间不能晚于当前系统时间!";
        if (!last)
            return "";  // 上期时间为空，返回成功
        if (value.substr(value.length - 1, 1) !== last.substr(last.length - 1, 1))
            return "当期时间与上期时间格式不相同!上次上报的时间为【" + _RegZHfoNumber(last) + "】。";
        if (value.indexOf("期") >= 0) {
            var sK = value.substr(value.indexOf("第") + 1, 1);
            var sV = _configMap.N[sK];
            value = value.replace(new RegExp(sK, 'g'), sV);
        }
        //if (value.localeCompare(last) < 0)
        //    return "当期时间不能早于上次上报时间!上次上报时间为【" + _RegZHfoNumber(last) + "】。";
        return "";
    };
    
    // 将“YYYY年第几期”中的阿拉伯数字转为中文
    _RegZHfoNumber = function (value) {
        if (value.indexOf("期") < 0) return value;
        var reg = /第(\S*)(?=期)/;
        value = value.replace(reg, function (i) {
            var zh = i.substr(1, 1);
            var num = _configMap.M[zh];
            var str = i;
            if (num)
                str = '第' + num;
            return str;
        });
        return value;
    }

    // 验证指标值是否正确
    _RegIData = function (value, start, end, unit) {
        if (!value) return false ;
        var reg1 = /[\u4e00-\u9fa5]/;   // 中文
        if (value.match(reg1)) return false;
        var reg2 = /^(-?\d+)(\.\d+)?$/; // 浮点数
        if (!value.match(reg2)) return false;
        value = Number(value);
        if (unit && unit.indexOf("%") > -1 && value < 1) // 带%的指标值小于1
            return false;
        if (typeof start === 'number' && typeof end === 'number' && !(start==0 && end==0) && (value < start || value > end))  // 指标值越界
            return false;
        return true; 
    };

    // 指标值输入验证
    _validateIData = function (value, start, end) {
        var reg = /^(-?\d+)(\.\d+)?$/; // 浮点数
        var reg1 = /[\u4e00-\u9fa5]/;  // 中文
        if (!value) return true;  // 允许为空
        if (value.match(reg1)) return true;  // 允许中文
        return value.match(reg) && !(typeof start === 'number' && typeof end === 'number' && !(start == 0 && end == 0) && (value < start || value > end));
    };

    // 数据问题列表

    init = function ($wizard, $fileinput, $tbltemplate, $tblerror, $tblrepeat, $tblrepeat2, $tblarchive) {
        _stateMap.$wizard = $wizard;
        _stateMap.$fileinput = $fileinput;
        _stateMap.$tbl_template = $tbltemplate;
        _stateMap.$tbl_archive = $tblarchive;
        _stateMap.$tbl_error = $tblerror;
        _stateMap.$tbl_repeat = $tblrepeat;
        _stateMap.$tbl_repeat2 = $tblrepeat2;
        _configMap.rolename = _readCookie("rolename");
        if (_configMap.rolename === '省公司') {
            _configMap.type = 1;
        } else {
            _configMap.type = 0;
        }
      //  $("#btnType").html(_configMap.type == 1 ? '省公司上报' : (_configMap.type == 0 ? '集团上报': '请选择上报来源'));
        
        window.operateEvents = {
            'click .download': function (e, value, row, index) {
                // 数据模板文件下载
                location.href = "/InPut/DownFile?username=" + row.createUserName + "&fileName=" + row.fileName;
                /*$.ajax({
                    type: "POST",
                    url: "/InPut/DownFile",
                    data: "username=" + row.createUserName + "&fileName=" + row.fileName,
                    success: function (sesponseTest) {
                    }
                });*/
            },
            'click .downloadA': function (e, value, row, index) {
                // 存档文件下载
                window.location.href = "/InPut/DownBackupFile?filename=" + row.fileName + "&sysfilename=" + row.sysName + "&type=1";
            },
            'click .downloadB': function (e, value, row, index) {
                // 存档文件下载
                window.location.href = "/InPut/DownBackupFile?filename=" + row.fileName + "&sysfilename=" + row.sysName + "&type=2";
            },
            'click .ok': function (e, value, row, index) {
                // 重复数据提交审核
                _updateRepeat([row.id]);
            },
            'click .no': function (e, value, row, index) {
                // 放弃更新重复数据
                _removeRepeat([row.id]);
            },
            'click .ok2': function (e, value, row, index) {
                row.batch = _configMap.batch;
                row.uFileName = _configMap.this_filename;
                // 更新替换数据来源
                _updateRepeat2([row]);
            },
            'click .no2': function (e, value, row, index) {
                // 放弃更新数据来源
                _removeRepeat2([row]);
            },
            'click .submit': function (e, value, row, index) {
                // 问题数据再次提交
                //row.batch = _configMap.batch;
                //row.uFileName = _configMap.this_filename;
                //_sumbitQuestionData([row.id]);
                _sumbitQuestionData([row]);
            },
            'click .abort': function (e, value, row, index) {
                _abortQuestionData([row.id]);
            }
        };

        _initWizard();
        _initFileinput();
        _initTableByTemplate();
        _initTableByArchive();
       // _initTableByRepeat();
       // _initTableByRepeat2();
       // _initTableByError();

        // 查询按钮
        _stateMap.$btnSearch.click(function () {
            _refreshTable(_stateMap.$tbl_repeat);
        });
        // 放弃更新重复数据
        _stateMap.$btnNo.click(function () {
            var ids = _getIdSelections(_stateMap.$tbl_repeat);
            _removeRepeat(ids);
        });
        // 重复数据提交审核
        _stateMap.$btnOk.click(function () {
            var ids = _getIdSelections(_stateMap.$tbl_repeat);
            _updateRepeat(ids);
        });

        _stateMap.$btnSearch2.click(function () {
            _refreshTable(_stateMap.$tbl_repeat2);
        });
        // 放弃更新数据来源
        _stateMap.$btnNo2.click(function () {
            var rows = $.map(_stateMap.$tbl_repeat2.bootstrapTable('getSelections'), function (row) {
                return row;
            });
            _removeRepeat2(rows);
        });
        // 更新替换数据来源
        _stateMap.$btnOk2.click(function () {
            var rows = $.map(_stateMap.$tbl_repeat2.bootstrapTable('getSelections'), function (row) {
                row.batch = _configMap.batch;
                row.uFileName = _configMap.this_filename;
                return row;
            });
            _updateRepeat2(rows);
        });

        // 数据模板列表检索刷新
        $("#searchT").click(function () {
            _stateMap.$tbl_template.bootstrapTable('refresh', { pageNumber: 1 });
        });
        // 存档列表检索刷新
        $("#searchA").click(function () {
            _stateMap.$tbl_archive.bootstrapTable('refresh', { pageNumber: 1 });
        });
        // 数据问题列表检索刷新
        $("#btnSearchE").click(function () {
            _refreshTable(_stateMap.$tbl_error);
        });
        // 舍弃问题数据
        $("#btnAbort").click(function () {
            var ids = _getIdSelections(_stateMap.$tbl_error);
            _abortQuestionData(ids);
        });
        // 批量上报问题数据
        $("#btnSubmit").click(function () {
            var rows = $.map(_stateMap.$tbl_error.bootstrapTable('getSelections'), function (row) {
                //row.batch = _configMap.batch;
                //row.uFileName = _configMap.this_filename;
                return row;
                //return row.id;
            });
            _sumbitQuestionData(rows);
        });



        // 显示所有剩余(问题数据)
        $("#btnShowAllErr").click(function () {
            $("#select_isMust").val("");
            $("#select_type").val("");
            $("#input_search3").val("");
            _stateMap.$tbl_error.bootstrapTable('refresh', { pageNumber: 1, pageSize: _configMap.error_total});
        });

        // 显示所有剩余(数据来源更新)
        $("#btnShowAllRepeat2").click(function () {
            $("#input_search2").val("");
            _stateMap.$tbl_repeat2.bootstrapTable('refresh', { pageNumber: 1, pageSize: _configMap.repeat_count2 });
        });

        // 显示所有剩余(重复数据)
        $("#btnShowAllRepeat").click(function () {
            $("#input_search").val("");
            _stateMap.$tbl_repeat.bootstrapTable('refresh', { pageNumber: 1, pageSize: _configMap.repeat_count });
        });

        _stateMap.$tbl_repeat.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
                var disabled = !_stateMap.$tbl_repeat.bootstrapTable('getSelections').length;
                _stateMap.$btnOk.prop('disabled', disabled);
                _stateMap.$btnNo.prop('disabled', disabled);
                _configMap.selections = _getIdSelections(_stateMap.$tbl_repeat);
            });

        _stateMap.$tbl_repeat2.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
                var disabled = !_stateMap.$tbl_repeat2.bootstrapTable('getSelections').length;
                _stateMap.$btnOk2.prop('disabled', disabled);
                _stateMap.$btnNo2.prop('disabled', disabled);
                _configMap.selections = _getIdSelections(_stateMap.$tbl_repeat2);
            });

        _stateMap.$tbl_error.on('check.bs.table uncheck.bs.table ' +
            'check-all.bs.table uncheck-all.bs.table', function () {
                var disabled = !_stateMap.$tbl_error.bootstrapTable('getSelections').length;
                $("#btnAbort").prop('disabled', disabled);
                $("#btnSubmit").prop('disabled', disabled);
                _configMap.selections = _getIdSelections(_stateMap.$tbl_error);
            });

        $("#myArchiveModal").on('show.bs.modal', function () {
            _stateMap.$tbl_archive.bootstrapTable('refresh', { pageNumber: 1 });
        });
        $("#myModal").on('show.bs.modal', function () {
            _stateMap.$tbl_template.bootstrapTable('refresh', { pageNumber: 1 });
        });
    };
    return {
        init: init
    };
}());