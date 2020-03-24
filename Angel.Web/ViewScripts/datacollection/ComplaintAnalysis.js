var ComplaintAnalysis = (function () {
    var _stateMap = {
        $startDate: null,
        $endDate: null
    };
    var _configMap = {
    };
    var _initDatetimepicker, _download, init;
    
    _initDatetimepicker = function () {
        _stateMap.$startDate.datetimepicker({
            todayHighlight: 1,
            startView: 3, //这里就设置了默认视图为年视图
            minView: 3, //设置最小视图为年视图
            forceParse: 0,
            format: "yyyy年mm月", //选择日期后，文本框显示的日期格式 
            language: 'zh-CN', //汉化 
            autoclose: true //选择日期后自动关闭 
        });
        _stateMap.$endDate.datetimepicker({
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
        var sd = _stateMap.$startDate.val();
        var ed = _stateMap.$endDate.val();
        if (!sd || !ed) {
            bootbox.alert({
                size: 'small',
                closeButton: true,
                title: '警告',
                message: '时间范围不完整！'
            });
            return;
        }
        
        var dialog = bootbox.dialog({
            size: 'small',
            closeButton: true,
            title: '提示',
            message: '<p><i class="fa fa-spin fa-spinner"></i> 计算中...</p>'
        });
        $.ajax({
            url: '/api/complaintsanalysisapi/download',
            type: 'post',
            async: true,
            dataType: 'text',
            data: JSON.stringify({ startdate: sd, enddate: ed }),
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

    init = function ($sd, $ed) {
        _stateMap.$startDate = $sd;
        _stateMap.$endDate = $ed;

        _initDatetimepicker();

        $("#btn_download").click(function () {
            _download();
        });
    };
    return {
        init: init
    };
}());