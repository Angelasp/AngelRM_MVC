var special = (function () {
    var _stateMap = { 
        $fileinput1: null,   // 文件上传组件
        $fileinput2: null,
        $fileinput3: null,
        $fileinput4: null,
        $fileinput5: null,
        $fileinput6: null,
        $fileinput7: null,
        $fileinput8: null,
        
        $btnUpload: null,     // 上传按钮
        $btnDown:null        //下载按钮
    };
    var _configMap = {
        foldername: ""
    };

    var _initFileinput,_getLastMonth, init;


    /**
     * 初始化文件上传组件
     */
    _initFileinput = function (module,filetype,flag) {
        var msg = "";

        var hz = [['xls', 'xlsx'], ['doc', 'docx'], ['csv', 'xls', 'xlsx'], ['csv', 'xls', 'xlsx','zip']];

        var wordIcon = {
            'doc': '<i class="fa fa-file-word-o text-success"></i>',
            'docx': '<i class="fa fa-file-word-o text-success"></i>'
        }
        var excelIcon = {
            'csv': '<i class="fa fa-file-excel-o text-success"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'xlsx': '<i class="fa fa-file-excel-o text-success"></i>'
        }

        module.fileinput({
            language: 'zh', //设置语言
            //theme: "explorer",
            uploadUrl: "/api/SpecialDataApi/upload",
            allowedFileExtensions: hz[filetype],//接收的文件后缀
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
            previewFileIconSettings: ((filetype == 0 || filetype ==2 || filetype==3) ? excelIcon : wordIcon),
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

    //获取上个月
    _getLastMonth = function () {
        var lastMonth,lastYear;
        var curYear = new Date().getFullYear();
        var curMonth = new Date().getMonth() + 1;
        if (curMonth == 1) {
            lastMonth = 12;
            lastYear = curYear - 1;
        } else {
            lastMonth = curMonth - 1;
            lastYear = curYear;
        }
        
        lastMonth = (lastMonth < 10 ? "0" + lastMonth : lastMonth);

        return lastYear + "年" + lastMonth + "月";
    }

    init = function ($f1, $f2, $f3, $f4, $f5, $f6, $f7, $f8, $btnUpload, $btnDown) {
        _stateMap.$fileinput1 = $f1;
        _stateMap.$fileinput2 = $f2;
        _stateMap.$fileinput3 = $f3;
        _stateMap.$fileinput4 = $f4;
        _stateMap.$fileinput5 = $f5;
        _stateMap.$fileinput6 = $f6;
        _stateMap.$fileinput7 = $f7;
        _stateMap.$fileinput8 = $f8;
        _stateMap.$btnDown = $btnDown;
        _stateMap.$btnUpload = $btnUpload;

        //初始化文件选择框 0代表excel, 1代表word, 2代表excle和csv,  3代表excel、csv、zip
        _initFileinput($f1,0,1);  
        _initFileinput($f2, 1,2); //['doc','docx']
        _initFileinput($f3, 0,3); 
        _initFileinput($f4, 2,4); 
        _initFileinput($f5, 2, 5);
        _initFileinput($f6, 2, 6);
        _initFileinput($f7, 2, 7);

        _initFileinput($f8, 2, 8);
        /*
        *上传按钮点击时间
        */
        _stateMap.$btnUpload.click(function () {
            //上个月日期
            var lastMonth = _getLastMonth();

            if (_stateMap.$fileinput1.fileinput('getFilesCount') > 0) {
                var fnames = _stateMap.$fileinput1.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (fnames[i].indexOf(lastMonth) < 0) {
                        alert("本月基础数据只能上报" + lastMonth + "的数据");
                        return;
                    }
                    if (!/^基础数据_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0])) {
                        alert("基础数据文件名不规范");
                        return;
                    }
                }
                
                _stateMap.$fileinput1.fileinput('upload');
            }
            if (_stateMap.$fileinput2.fileinput('getFilesCount') > 0) {
                var fnames = _stateMap.$fileinput2.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (fnames[i].indexOf(lastMonth) < 0) {
                        alert("本月省公司网络质量分析月报只能上报" + lastMonth + "的数据");
                        return;
                    }
                    if (!/^省公司网络质量分析月报_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0])) {
                        alert("省公司网络质量分析月报文件名不规范");
                        return;
                    }
                }
                _stateMap.$fileinput2.fileinput('upload');
            }
            if (_stateMap.$fileinput3.fileinput('getFilesCount') > 0) {
                
                var fnames = _stateMap.$fileinput3.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (fnames[i].indexOf(lastMonth) < 0) {
                        alert("本月省公司重大管控事项上报表只能上报" + lastMonth + "的数据");
                        return;
                    }
                    var flag = /^省公司重大管控事项上报表_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0]);
                    if (!flag) {
                        alert("省公司重大管控事项上报表文件名不规范");
                        return;
                    }
                }
                _stateMap.$fileinput3.fileinput('upload');
            }
            if (_stateMap.$fileinput4.fileinput('getFilesCount') > 0) {
                
                var fnames = _stateMap.$fileinput4.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (fnames[i].indexOf(lastMonth) < 0) {
                        alert("本月省公司新业务指标只能上报" + lastMonth + "的数据");
                        return;
                    }
                    var flag = /^省公司新业务指标_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0]);
                    if (!flag) {
                        alert("省公司新业务指标文件名不规范");
                        return;
                    }
                }

                _stateMap.$fileinput4.fileinput('upload');
            }

            if (_stateMap.$fileinput5.fileinput('getFilesCount') > 0) {

                var fnames = _stateMap.$fileinput5.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (fnames[i].indexOf(lastMonth) < 0) {
                        alert("本月广义投诉原始数据只能上报" + lastMonth + "的数据");
                        return;
                    }
                    var flag = /^广义投诉原始数据_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0]);
                    if (!flag) {
                        alert("广义投诉原始数据文件名不规范");
                        return;
                    }
                }

                _stateMap.$fileinput5.fileinput('upload');
            }
            
            if (_stateMap.$fileinput6.fileinput('getFilesCount') > 0) {

                var fnames = _stateMap.$fileinput6.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (fnames[i].indexOf(lastMonth) < 0) {
                        alert("本月网络负荷与用户DOU分析数据只能上报" + lastMonth + "的数据");
                        return;
                    }
                    var flag = /^网络负荷与用户DOU分析数据_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0]);
                    if (!flag) {
                        alert("网络负荷与用户DOU分析数据文件名不规范");
                        return;
                    }
                }

                _stateMap.$fileinput6.fileinput('upload');
            }

            if (_stateMap.$fileinput7.fileinput('getFilesCount') > 0) {

                var fnames = _stateMap.$fileinput7.fileinput('_getFileNames');
                for (var i in fnames) {
                    if (fnames[i].indexOf(lastMonth) < 0) {
                        alert("本月风景区质量指标填报数据只能上报" + lastMonth + "的数据");
                        return;
                    }
                    var flag = /^风景区质量指标填报_[\u4e00-\u9fa5]{2,4}_[0-9]{4}年[0-9]{2}月$/.test(fnames[i].split('.')[0]);
                    if (!flag) {
                        alert("风景区质量指标填报文件名不规范");
                        return;
                    }
                }

                _stateMap.$fileinput7.fileinput('upload');
            }

            if (_stateMap.$fileinput8.fileinput('getFilesCount') > 0) {
                //第一期-北京
                debugger;
                var fnames = _stateMap.$fileinput8.fileinput('_getFileNames');
                for (var i in fnames) {
                    var flag = /^第[\u4e00-\u9fa5]{1}期-[\u4e00-\u9fa5]{2,4}$/.test(fnames[i].split('.')[0]);
                    if (!flag) {
                        alert("省公司月报反馈文件名不规范");
                        return;
                    }
                }

                _stateMap.$fileinput8.fileinput('upload');
            }
        });

        _stateMap.$btnDown.click(function () {
            window.location.href = "/DownSpecial/index?filename=test";
        })

    };


    return {init: init};
}());