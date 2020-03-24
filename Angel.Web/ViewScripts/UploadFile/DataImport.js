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

var DataImportNew = (function () {
    var _stateMap = {
        $btnSearch: $("#btnSearch"),
        $btnOk: $("#btnOk"),
        $btnNo: $("#btnNo"),
        $wizard: null,       // 向导控件
        $tbl_template: null, // 数据模板下载列表
        $tbl_archive: null,  // 上传文件存档列表
        $tbl_repeat: null,   // 指标值重复列表
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
        uploadType:null,
        rolename: null, // 角色名
        datenow: new Date().Format("yyyy年MM月"),
        rows: 0,
        offset: 0
    };
    var _initWizard, _initTableByTemplate, _initTableByArchive, _initTableByRepeat, _initFileinput,_initUploadType,
        _queryParams, _queryParams2, _queryParamsByRepeat, _validation, _refreashByStep,
        _getIdSelections, _responseHandler, _removeRepeat, _updateRepeat,
        _readCookie, _refreshTable, _uploadYellow, _getBatch, init;

    _getBatch = function () {
        var num = "";
        for (var i = 0; i < 13; i++) {
            num += Math.floor(Math.random() * 10);
        }
        return num;
    };

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
            type: 3,
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
            batch: _configMap.batch
        };
        var field = $("#select_field").val();
        var search = $("#input_search").val();
        if (field && search) {
            values.field = field;
            values.search = search;
        }
        return values;
    };

    _refreashByStep = function (step) {
        _configMap.selections.length = 0;
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
        } else if (step == 2 && (_stateMap.$tbl_repeat.bootstrapTable('getData').length || _configMap.repeat_count)) {
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
                var dialog = bootbox.dialog({ onEscape: false, closeButton: false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
                $.ajax({
                    url: '/api/inputapi/removedatarepeat',
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
                var dialog = bootbox.dialog({ onEscape: false, closeButton: false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
                $.ajax({
                    url: '/api/inputapi/updateDataRepeat',
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
                            var postlist1 = '{ "insert_log": [{ "logposition":"专业公司数据采集-专业公司指标采集-数据填报","operationtype": "指标值重复数据提交审核。(共' + values.length + '项)"}]}';
                            oper_log(postlist1);
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
                if (info.step == 2 && !_configMap.msg) {
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
            uploadUrl: "/api/inputapi/upload",
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
            if (!previewId) {
                _configMap.batch = _getBatch();
            }
            else {
                _configMap.batch = previewId.match(/-(\S*)-/)[1];
            }
            
        }).on('filepreupload', function (event, data, previewId, index) {
            // 上传前清空错误的文件列表
            _configMap.files_error.length = 0;
        }).on('filepreremove', function (event, id, index) {
            // 点击删除按钮时，如果是错误文件，就从json列表中删除
            delete _configMap.files_error[id];
        }).on('fileclear', function (event) {
            _configMap.files_error = {};
        }).on('fileuploaded', function (event, data, previewId, index) {
            _configMap.this_filename = data.files[index].name;

            if (data.response.msg) {

                bootbox.alert({
                    message: data.response.msg,
                    callback: function () {
                        $(".wizard-actions").find(".btn-next").trigger('click');
                    }
                });

                //var dialog = bootbox.dialog({
                //    title: '数据重复提示',
                //    message: "<p>" + data.response.msg + "</p>",
                //    buttons: {
                //        cancel: {
                //            label: "否",
                //            className: 'btn-danger',
                //            callback: function () {
                //                //_stateMap.$fileinput.fileinput('clear');
                //            }
                //        },
                //        //noclose: {
                //        //    label: "舍弃",
                //        //    className: 'btn-warning',
                //        //    callback: function () {
                //        //        _uploadYellow(0);
                //        //        // 保存上传成功的文件名
                //        //        _configMap.files_success.push(data.files[index].name);
                //        //        var postlist1 = '{ "insert_log": [{ "logposition":"专业公司数据采集-专业公司指标采集-数据填报","operationtype": "导入《' + data.files[index].name + '》数据文件成功。"}]}';
                //        //        oper_log(postlist1);
                //        //    }
                //        //},
                //        ok: {
                //            label: "是",
                //            className: 'btn-info',
                //            callback: function () {
                //                debugger;
                //                console.log(_configMap.batch);
                //                $(".wizard-actions").find(".btn-next").trigger('click');

                //            }
                //        }
                //    }
                //});
            }
            else {
                bootbox.alert({
                    message: "数据采集成功"
                    //callback: function () {
                        //_stateMap.$fileinput.fileinput('clear');
                    //}
                });
            }

            //else {

            //    // 保存上传成功的文件名
            //    _configMap.files_success.push(data.files[index].name);
            //    var postlist1 = '{ "insert_log": [{ "logposition":"专业公司数据采集-专业公司指标采集-数据填报","operationtype": "导入《' + data.files[index].name + '》数据文件成功。"}]}';
            //    oper_log(postlist1);
            //}

            // 保存上传成功的文件名
            _configMap.files_success.push(data.files[index].name);
            var postlist1 = '{ "insert_log": [{ "logposition":"专业公司数据采集-专业公司指标采集-数据填报","operationtype": "导入《' + data.files[index].name + '》数据文件成功。"}]}';
            oper_log(postlist1);

        }).on('fileuploaderror', function (event, data, msg) {
            // 保存上传失败的文件名
            _configMap.files_error[data.id] = data.filenames[data.index];

            /*bootbox.alert({
                message: "清空文件",
                callback: function () {
                    _stateMap.$fileinput.fileinput('clear');
                }
            });*/

            //var postlist1 = '{ "insert_log": [{ "logposition":"采集甄核-多维数据采集-数据填报","operationtype": "导入《' + data.files[index].name + '》数据文件失败!"}]}';
            //oper_log(postlist1);
        });
    };

    /**
     * 初始化数据模板下载列表
     */
    _initTableByTemplate = function () {
        _stateMap.$tbl_template.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/inputapi/PostTemplates',
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
            height: 300,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                field: 'fileName',
                title: '模板名'
            }, {
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
                field: 'filename',
                title: '文件名',
                align: 'left',
            }, {
                field: 'createdate',
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
                        '<a class="downloadA" href="javascript:void(0)" title="下载原始文件(含问题日志)"><i class="glyphicon glyphicon-download"></i></a>'
                    ].join('');
                }
            }]
        });
    };

    _initTableByRepeat = function () {
        _stateMap.$tbl_repeat.bootstrapTable({
            classes: 'table table-no-bordered table-striped table-hover table-condensed',
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: '/api/inputapi/postdatarepeat',
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: _queryParamsByRepeat,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                      //初始化加载第一页，默认第一页
            pageSize: 100,                       //每页的记录行数（*）
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
                field: 'filename',
                align: 'center',
                title: '文件名'
            }, {
                field: 'indicatorid',
                align: 'center',
                title: '指标编码'
            }, {
                field: 'indicatorname',
                align: 'center',
                title: '指标名称'
            }, {
                field: 'timedate',
                align: 'center',
                title: '期数'
            }, {
                field: 'province',
                align: 'center',
                title: '公司名'
            },
            //{
            //    field: 'city',
            //    align: 'center',
            //    title: '地市'
            //}, {
            //    field: 'sourcename',
            //    align: 'center',
            //    title: '数据来源'
            //},
            {
                field: 'idata_old',
                title: '数据库中值',
                align: 'right',
                cellStyle: function (value, row, index, field) {
                    return { classes: "warning" };
                },
                formatter: function (value, row, index) {
                    return '<span class="blue"><b>' + value + '</b></span>';
                }
            }, {
                field: 'idata_new',
                title: '上传值',
                align: 'right',
                cellStyle: function (value, row, index, field) {
                    return { classes: "warning" };
                },
                formatter: function (value, row, index) {
                    return '<span class="orange"><b>' + value + '</b></span>';
                }
            }, {
                field: 'id',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return [
                        '<a class="no" href="javascript:void(0)" title="放弃更新">',
                        '<i class="glyphicon glyphicon-trash red"></i></a>',
                        '&nbsp;&nbsp;<a class="ok" href="javascript:void(0)" title="提交审核">',
                        '<i class="glyphicon glyphicon-ok"></i></a>'
                    ].join('');
                }
            }],
            onLoadSuccess: function (result) {
                _configMap.repeat_count = result.count;
                $("#btnShowAllRepeat").text("显示剩余（共" + _configMap.repeat_count + "）项");
            }
        });
    };

    _initUploadType = function () {
        $.ajax({
            url: '/api/inputapi/PostUploadType',
            type: 'post',
            async: false,
            //dataType: 'text',
            //data: JSON.stringify({ batch: _configMap.batch, filename: _configMap.this_filename, sourcetype: _configMap.type, type: type }),
            contentType: 'application/json',
            error: function () {
                
            },
            success: function (data) {
                if (data) {
                    if (data.length > 0)
                    {
                        _configMap.type = data[0].value;
                        $("#btnType").html(data[0].text);
                    }
                }
                else {
                    data = [];
                }

                _configMap.uploadType = data;
            }
        });
    }

    _uploadYellow = function (type) {
        var dialog = bootbox.dialog({ onEscape: false, closeButton: false, message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> 正在执行...</div>' });
        $.ajax({
            url: '/api/inputapi/uploadYellow',
            type: 'post',
            //async: false,
            //dataType: 'text',
            data: JSON.stringify({ batch: _configMap.batch, filename: _configMap.this_filename, sourcetype: _configMap.type, type: type }),
            contentType: 'application/json',
            error: function () {
                dialog.find('.bootbox-body').html('入库失败!');
                setTimeout(function () {
                    dialog.modal('hide');
                }, 5000);
            },
            success: function (data) {
                if (data.error) {
                    dialog.find('.bootbox-body').html(data.error);
                    setTimeout(function () {
                        dialog.modal('hide');
                    }, 5000);
                    //bootbox.alert({ message: data.error, size: 'small' });
                }
                else {
                    dialog.modal('hide');
                }
            }
        });
    };

    init = function ($wizard, $fileinput, $tbltemplate, $tblrepeat, $tblarchive) {
        _stateMap.$wizard = $wizard;
        _stateMap.$fileinput = $fileinput;
        _stateMap.$tbl_template = $tbltemplate;
        _stateMap.$tbl_archive = $tblarchive;
        _stateMap.$tbl_repeat = $tblrepeat;
        //_configMap.rolename = _readCookie("rolename");
        _configMap.rolename = _readCookie("cityid");
        //if (_configMap.rolename === '省公司') {
        //if (_configMap.rolename) {
        //    _configMap.type = 1;
        //} else {
        //    _configMap.type = 0;
        //}

        //_configMap.type = 3; //3 专业公司
        //$("#btnType").html(_configMap.type == 1 ? '省公司上报' : (_configMap.type == 0 ? '集团上报' : '请选择上报来源'));
        _initUploadType();

        window.operateEvents = { 
            'click .download': function (e, value, row, index) {
                // 数据模板文件下载 
                location.href = "/api/inputapi/GetDownFile?filename=" + row.fileName + "&sysfilename=" + row.fileName + "&dirname=template&type=3";
            },
            'click .downloadA': function (e, value, row, index) {
                // 存档文件下载
                window.location.href = "/api/inputapi/GetDownFile?filename=" + row.filename + "&sysfilename=" + row.sysname + "&type=3";
            },
            'click .ok': function (e, value, row, index) {
                // 重复数据提交审核
                _updateRepeat([row.id]);
            },
            'click .no': function (e, value, row, index) {
                // 放弃更新重复数据
                _removeRepeat([row.id]);
            }
        };

        _initWizard();
        _initFileinput();
        _initTableByTemplate();
        _initTableByArchive();
        _initTableByRepeat();

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
        }); $("#searchA").click(function () {
            _stateMap.$tbl_archive.bootstrapTable('refresh', { pageNumber: 1 });
        });


        // 数据模板列表检索刷新
        $("#searchT").click(function () {
            _stateMap.$tbl_template.bootstrapTable('refresh', { pageNumber: 1 });
        });

        //上报来源选择
        $("#btnType").click(function () {
            
            //if (_configMap.rolename) return;
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
                inputOptions: _configMap.uploadType,
                callback: function (result) {
                    if (result === null) return;
                    _configMap.type = result;
                    //$("#btnType").html(_configMap.type == 3 ? '专业公司上报' : (_configMap.type == 4 ? '省公司上报' : '请选择上报来源'));
                    var txt;
                    for (var i = 0; i < _configMap.uploadType.length;i++)
                    {
                        if(result==_configMap.uploadType[i].value)
                        {
                            txt=_configMap.uploadType[i].text;
                        }
                    }

                    if(!txt)
                    {
                        txt='请选择上报来源'
                    }

                    $("#btnType").html(txt);
                }
            });
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