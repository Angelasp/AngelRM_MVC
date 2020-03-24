var ExportComplaint = (function () {
    var _stateMap = {
        $selTable: null,      // 要导出的报表
        $selType: null,
        $selProvince: null,  // 省
        $selDate: null       // 月份
    };
    var _configMap = {
        batch: null,         // 批次号(一次数据上报，不管上传多少个文件，均属同一批次,根据此批次号获取重复数据、红色问题数据、黄色问题数据)
        files_error: {},     // 上传成功的文件 
        files_success: []    // 上传失败的文件
    };
    var _initT, _initDatetimepicker, _download, init;

    _initTouch = function () {
        // 初始化chosen多选框
        if (!ace.vars['touch']) {
            // 填充省份下拉框
            var selCity = _stateMap.$selProvince;
            selCity.append('<option value="">全部省份</option>');
            selCity.append('<option value="安徽">安徽</option>');
            selCity.append('<option value= "北京" > 北京</option >');
            selCity.append('<option value="福建">福建</option>');
            selCity.append('<option value="甘肃">甘肃</option>');
            selCity.append('<option value="广东">广东</option>');
            selCity.append('<option value="广西">广西</option>');
            selCity.append('<option value="贵州">贵州</option>');
            selCity.append('<option value="海南">海南</option>');
            selCity.append('<option value="河北">河北</option>');
            selCity.append('<option value="河南">河南</option>');
            selCity.append('<option value="黑龙江">黑龙江</option>');
            selCity.append('<option value="湖北">湖北</option>');
            selCity.append('<option value="湖南">湖南</option>');
            selCity.append('<option value="吉林">吉林</option>');
            selCity.append('<option value="江苏">江苏</option>');
            selCity.append('<option value="江西">江西</option>');
            selCity.append('<option value="辽宁">辽宁</option>');
            selCity.append('<option value="内蒙古">内蒙古</option>');
            selCity.append('<option value="宁夏">宁夏</option>');
            selCity.append('<option value="青海">青海</option>');
            selCity.append('<option value="山东">山东</option>');
            selCity.append('<option value="山西">山西</option>');
            selCity.append('<option value="陕西">陕西</option>');
            selCity.append('<option value="上海">上海</option>');
            selCity.append('<option value="四川">四川</option>');
            selCity.append('<option value="天津">天津</option>');
            selCity.append('<option value="西藏">西藏</option>');
            selCity.append('<option value="新疆">新疆</option>');
            selCity.append('<option value="云南">云南</option>');
            selCity.append('<option value="浙江">浙江</option>');
            selCity.append('<option value="重庆">重庆</option>');
            selCity.append('<option value="全网">全网</option>');


          selNumber.append("<option value='一月'>一月</option>");
          selNumber.append("<option value='二月'>二月</option>");

            $('.chosen-select').chosen({ allow_single_deselect: true });
            //resize the chosen on window resize

            $(window)
                .off('resize.chosen')
                .on('resize.chosen', function () {
                    $('.chosen-select').each(function () {
                        var $this = $(this);
                        $this.next().css({ 'width': $this.parent().width() });
                    })
                }).trigger('resize.chosen');
            //resize chosen on sidebar collapse/expand
            $(document).on('settings.ace.chosen', function (e, event_name, event_val) {
                if (event_name != 'sidebar_collapsed') return;
                $('.chosen-select').each(function () {
                    var $this = $(this);
                    $this.next().css({ 'width': $this.parent().width() });
                })
            });
        }
    };

    _initDatetimepicker = function () {
        _stateMap.$selDate.datetimepicker({
            todayHighlight: 1,
            startView: 3, //这里就设置了默认视图为年视图
            minView: 3, //设置最小视图为年视图
            forceParse: 0,
            format: "yyyy年mm月", //选择日期后，文本框显示的日期格式 
            language: 'zh-CN', //汉化 
            autoclose: true //选择日期后自动关闭 
        });
    };

    _download = function () {
        var table = _stateMap.$selTable.val();
        if (!table) {
            bootbox.alert({
                size: 'small',
                closeButton: true,
                title: '警告',
                message: '请选择报表！'
            });
            return;
        }
        var type = _stateMap.$selType.val();

        var Province = _stateMap.$selProvince.val();
        if (!Province) {
            bootbox.alert({
                size: 'small',
                closeButton: true,
                title: '警告',
                message: '请选择省份！'
            });
            return;
        }
        var date = _stateMap.$selDate.val();
        if (!date) {
            bootbox.alert({
                size: 'small',
                closeButton: true,
                title: '警告',
                message: '请选择年月！'
            });
            return;
        }
        
        var Provinces = [];
        for (var i in Province) {
            if (!Province[i]) continue;
            Provinces.push('\'' + Province[i] + '\'');
        }
        var dialog = bootbox.dialog({
            size: 'small',
            closeButton: true,
            title: '提示',
            message: '<p><i class="fa fa-spin fa-spinner"></i> 正在导出...</p>'
        });
        $.ajax({
            url: '/api/complaintsapi/download',
            type: 'post',
            async: true,
            dataType: 'text',
            data: JSON.stringify({ table: table, type: type, province: Provinces.join(","), date: date }),
            contentType: 'application/json',
            error: function () {
                dialog.find('.bootbox-body').html('导出失败!');
            },
            success: function (data) {
                RefreshDownFile();
                var json = eval('(' + data + ')');
                if (json.error) {
                    dialog.find('.bootbox-body').html(json.error);
                } else if (json.success) {
                    dialog.find('.bootbox-body').html(json.success);
                }
            }
        });
    }
    
    init = function ($table, $type, $city, $date) {
        _stateMap.$selTable = $table;
        _stateMap.$selType = $type;
        _stateMap.$selProvince = $city;
        _stateMap.$selDate = $date;
        _initTouch();
        _initDatetimepicker();

        $("#btn_export").click(function () {
            _download()
        });
        
    };
    return {
        init: init
    };
}());