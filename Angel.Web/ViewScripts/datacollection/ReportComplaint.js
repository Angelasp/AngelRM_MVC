var ReportComplaint = (function () {
    var _stateMap = {
        $fileinput: null   // 文件上传组件
    };
    var _configMap = {
        batch: null,         // 批次号(一次数据上报，不管上传多少个文件，均属同一批次,根据此批次号获取重复数据、红色问题数据、黄色问题数据)
        files_error: {},     // 上传成功的文件 
        files_success: []    // 上传失败的文件
    };
    var _initFileinput, init;

    /**
     * 初始化文件上传组件
     */
    _initFileinput = function () {
        _stateMap.$fileinput.fileinput({
            language: 'zh', //设置语言
            uploadAsync: false,                             //采用同步上传
            //theme: "explorer",
            uploadUrl: "/api/complaintsapi/upload",
            allowedFileExtensions: ['xls','xlsx'],//接收的文件后缀
            uploadClass: "btn btn-sm btn-success",
            removeClass: "btn btn-sm btn-danger",
            cancelClass: "btn btn-sm btn-default",
            browseClass: "btn btn-sm btn-primary", //按钮样式  
            enctype: 'multipart/form-data',
            minFileCount: 1,
            maxFileCount: 20,
            //maxFileSize: 0,                          //单位为kb，如果为0表示不限制文件大小
            overwriteInitial: false,
            validateInitialCount: true,
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
            previewFileIcon: '<i class="fa fa-file"></i>',
            uploadExtraData: function (previewId, index) {
                return { batch: _configMap.batch };
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
            if (!_configMap.batch) {
                _configMap.batch = previewId.match(/-(\S*)-/)[1];
            }
            console.log(file);
        }).on('filepreupload', function (event, data, previewId, index) {
            // 上传前清空错误的文件列表
            _configMap.files_error.length = 0;
        }).on('filepreremove', function (event, id, index) {
            // 点击删除按钮时，如果是错误文件，就从json列表中删除
            delete _configMap.files_error[id];
        }).on('fileclear', function (event) {
            _configMap.files_error = {};
        }).on('fileuploaded', function (event, data, previewId, index) {
            console.log(data);
            // 保存上传成功的文件名
            _configMap.files_success.push(data.files[index].name);
            var postlist1 = '{ "insert_log": [{ "logposition":"采集甄核-业务投诉数据采集","operationtype": "导入《' + data.files[index].name + '》数据文件成功。"}]}';
            oper_log(postlist1);
        }).on('fileuploaderror', function (event, data, msg) {
            // 保存上传失败的文件名
            _configMap.files_error[data.id] = data.filenames[data.index];
            var postlist1 = '{ "insert_log": [{ "logposition":"采集甄核-业务投诉数据采集","operationtype": "导入《' + data.files[index].name + '》数据文件失败!"}]}';
            oper_log(postlist1);
        });
    };

    init = function ($fileinput) {
        _stateMap.$fileinput = $fileinput;
        _initFileinput();
    };
    return {
        init: init
    };
}());