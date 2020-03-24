var way = (function () {
    var _stateMap = { 
        $fileinput1: null,   // 文件上传组件
        $fileinput2: null,
        $fileinput3: null,
        
        $btnUpload: null,     // 上传按钮
    };

    var _initFileinput, init;


    /**
     * 初始化文件上传组件
     */
    _initFileinput = function (module,filetype,flag) {
        var msg = "";

        var hz = [['xls', 'xlsx'], ['doc', 'docx']];

        var wordIcon = {
            'doc': '<i class="fa fa-file-word-o text-success"></i>',
            'docx': '<i class="fa fa-file-word-o text-success"></i>'
        }
        var excelIcon = {
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'xlsx': '<i class="fa fa-file-excel-o text-success"></i>'
        }

        module.fileinput({
            language: 'zh', //设置语言
            //theme: "explorer",
            uploadUrl: "/api/WayDataApi/upload",
            allowedFileExtensions: (filetype=='excel'?hz[0]:hz[1]),//接收的文件后缀
            showPreview: true,
            showUpload: false,
            layoutTemplates: {
                actionUpload: ''
            },
            dropZoneEnabled: true,
            uploadAsync:true,
            uploadClass: "btn btn-sm btn-success",
            removeClass: "btn btn-sm btn-danger",
            cancelClass: "btn btn-sm btn-default",
            browseClass: "btn btn-sm btn-primary", //按钮样式  
            enctype: 'multipart/form-data',
            uploadExtraData: function (previewId, index) {
                return {typeFlag:flag};
            },
            minFileCount: 0,
            maxFileCount: 31,
            overwriteInitial: false,
            previewFileIcon: '<i class="fa fa-file"></i>',
            preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
            previewFileIconSettings: (filetype == 'excel' ? excelIcon : wordIcon),
            //previewFileExtSettings: { // configure the logic for determining icon file extensions
            //    'xls': function (ext) {
            //        return ext.match(/(xls|xlsx)$/i);
            //    }
            //},
            msgUploadEnd:msg,
            dropZoneTitle: "拖拽文件到这里 &hellip;<br>支持多文件上传"
        }).on("fileuploaded", function (event, data, previewId, index) {
            RefreshDownFile();
            document.getElementsByClassName("kv-upload-progress")[0].classList.add("hide");
            document.getElementsByClassName("kv-upload-progress")[1].classList.add("hide");
            //_stateMap.$fileinput.fileinput('clear');

            if (data.response["msg"] == "success") {
                //alert("上传成功");
            }
        }).on('fileerror', function (event, data, msg) {
        }).on('filebatchuploaderror', function (event, data, msg) {
        }).on('filepreupload', function (event, data, previewId, index) {
        }).on("filebatchuploadsuccess", function (event, data, previewId, index) {  
        });
    };


    init = function ($f1, $f2, $f3, $btnUpload) {
        _stateMap.$fileinput1 = $f1;
        _stateMap.$fileinput2 = $f2;
        _stateMap.$fileinput3 = $f3;
        _stateMap.$btnUpload = $btnUpload;

        //初始化文件选择框
        _initFileinput($f1,'excel',1);  //['xls','xlsx']
        _initFileinput($f2, 'excel', 2); //['doc','docx']
        _initFileinput($f3, 'excel',3);  //['xls','xlsx']
        
        /*
        *上传按钮点击时间
        */
        _stateMap.$btnUpload.click(function () {
            //console.log(_stateMap.$fileinput1.fileinput('getFilesCount'));
            if (_stateMap.$fileinput1.fileinput('getFilesCount') > 0) {
                var fnames = _stateMap.$fileinput1.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (!/^高铁线路站台填报表_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0])) {
                        alert("高铁线路站台填报表文件名不规范");
                        return;
                    }
                }
                
                _stateMap.$fileinput1.fileinput('upload');
            }
            if (_stateMap.$fileinput2.fileinput('getFilesCount') > 0) {
                var fnames = _stateMap.$fileinput2.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (!/^高速线路指标填报表_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0])) {
                        alert("高速线路指标填报表文件名不规范");
                        return;
                    }
                }
                _stateMap.$fileinput2.fileinput('upload');
            }
            if (_stateMap.$fileinput3.fileinput('getFilesCount') > 0) {
                
                var fnames = _stateMap.$fileinput3.fileinput('_getFileNames');
                for (var i in fnames) {
                    var flag = /^地铁线路站台指标填报表_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0]);
                    if (!flag) {
                        alert("地铁线路站台指标填报表文件名不规范");
                        return;
                    }
                }
                _stateMap.$fileinput3.fileinput('upload');
            }
           
            
        });

    };


    return {init: init};
}());