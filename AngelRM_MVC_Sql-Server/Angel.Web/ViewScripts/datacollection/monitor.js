var monitor = (function () {
    var _stateMap = {
        $city: null,
        $select: null,
        $datetime: null,
        $table: null
    };
    var _configMap = {
        isCity: true,
        province: null, // 省
        city: null, // 市
        month: null, // 月份
        inter: null // 数据接口
    };
    var _initDatetimepicker, _initJqGrid, _getParams, _setTotalDataSize, init;

    /**
	 * 初始化日期控件
	 */
    _initDatetimepicker = function () {
        _stateMap.$datetime.datetimepicker({
            startView: "year",
            minView: "year", //选择日期后，不会再跳转去选择时分秒 
            format: "yyyy-mm", //选择日期后，文本框显示的日期格式 
            language: 'zh-CN', //汉化 
            autoclose: true //选择日期后自动关闭 
        }).on('changeDate', function (ev) {
            // 保存日期
            _configMap.month = _stateMap.$datetime.val();
        }); 
    };

    /**
	 * 初始化jqGrid
	 */
    _initJqGrid = function () {
        var params, colNames, colModel, grouping;
        if (_configMap.isCity) {
            params = _getParams("MonitorByCity2");
            colNames = ['省', '市', '话单', '上传路径', '数据类型', '开始时间', '结束时间', '总计用时(小时)', '文件大小(GB)'];
            colModel = [
                { name: 'province', index: 'province', align: 'center', width: 'auto' },
                { name: 'city', index: 'city', align: 'center', width: 'auto' },
                { name: 'data_type', index: 'data_type', align: 'center', width: 40 },
                { name: 'upload_path', index: 'upload_path', resizable: true},
                { name: 'data_inter', index: 'data_inter', align: 'center', width: 50, align: 'center' },
                { name: 'begin_time', index: 'begin_time', formatter: 'date', formatoptions: {newformat: 'Y-m-d h:m'}, width: 60, align: 'center' },
                { name: 'end_time', index: 'end_time', formatter: 'date', formatoptions: {newformat: 'Y-m-d h:m'}, width: 60, align: 'center' },
                { name: 'total_time', index: 'total_time', formatter: 'number', formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, defaulValue: 0 },summaryType: 'sum', summaryTpl: '上传总计用时: {0}小时', width: 60, align: 'right' }, //
                { name: 'data_size', index: 'data_size', formatter: 'number', formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, defaulValue: 0 }, summaryType: 'sum', summaryTpl: '总文件大小: {0}GB', width: 60, align: 'right' } // formatoptions: { thousandsSeparator: ",", defaulValue: "", decimalPlaces: 2 },
            ];
            grouping = true;
        } else {
            params = _getParams("MonitorByInfo");
            colNames = ['城市', '话单', '上传路径', '文件个数', '数据类型', '总计用时(小时)', '文件大小(GB)'];
            colModel = [
                { name: 'city', index: 'city', align: 'center', width: 40 },
                { name: 'data_type', index: 'data_type', align: 'center', width: 40 },
                { name: 'upload_path', index: 'upload_path', resizable: true },
                { name: 'file_count', index: 'file_count', width: 50, align: 'center'},
                { name: 'data_inter', index: 'data_inter', align: 'center', width: 50, align: 'center' },
                { name: 'total_time', index: 'total_time', formatter: 'number', width: 60, align: 'right' }, //
                { name: 'data_size', index: 'data_size', formatter: 'number', formatoptions: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, defaulValue: 0 }, width: 60, align: 'right' } // formatoptions: { thousandsSeparator: ",", defaulValue: "", decimalPlaces: 2 },
            ];
            grouping = false;
        }
        $("#table_monitor").jqGrid({
            url: '/api/datacollectionapi/post',
            datatype: 'json',
            mtype: 'POST',
            postData: params,
            loadonce: true,
            ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
            colNames: colNames,
            colModel: colModel,
            autowidth: false,
            height: 'auto',
            rowNum: 20,
            rowList: [10, 20, 30, 40, 50, 100],
            pager: '#grid-pager',
            //sortname: 'end_time',
            //sortorder: "asc",
			altRows: true,
            viewrecords: true,
            //rownumbers: true, 
            grouping: grouping,
            groupingView: {
                groupField: ['province', 'city', 'data_type'],
                groupSummary: [false, false, true],
                groupColumnShow: [false, false, true],
                groupText: ['<b>{0} <span style="float:right;color:#333">{1}条记录</b></span>', '<span><b>{0}</b></span><span style="float:right"><b>总文件大小:{data_size}GB</b></span>', '<b>{0}</b>'],
                groupCollapse: false
            }
            /*groupingView: {
                groupField: ['province', 'city', 'data_type'],
                groupColumnShow: [false, false, true],
                groupCollapse: false,
                groupText: ['<b>{0} <span style="float:right">{1}条记录</b></span>', '<b>{0} <span style="float:right">总数据量:{data_size}(GB)</b></span>', '<b>{0} <span style="float:right">总数据量:{data_size}(GB)</b></span>']
            }*/
        });
        $("#table_monitor").jqGrid('navGrid', '#grid-pager', { add: false, edit: false, del: false });
    };

    /**
	 * 设置省/市名称
	 */
    _getParams = function (type) {
        var where = 'where 1=1';
        if (_configMap.isCity) {
            var str = _stateMap.$city.val();
            if (!str) {
                _configMap.province = '';
                _configMap.city = '';
            } else {
                var array = str.split("/");
                _configMap.province = array[0].replace(/省/, '');
                _configMap.province = _configMap.province.replace(/市/, '');
                _configMap.city = array[1] ? array[1].replace(/市/, '') : '';
                where += ' and c.province=\'' + _configMap.province + '\'';
            }
            if (_configMap.city) {
                where += ' and c.city=\'' + _configMap.city + '\'';
            }
        } else {
            _configMap.inter = _stateMap.$select.selectpicker('val');
            if (_configMap.inter) {
                where += ' and l.data_inter=\'' + _configMap.inter + '\'';
            }
        }
        if (_configMap.month) {
            where += ' and l.month=\'' + _configMap.month + '\'';
        }
        return JSON.stringify('{ "' + type + '": [{"[@c0]": "' + where + '" }]}');
    };



    /**
	 * 设置全国总数据量
	 */
    _setTotalDataSize = function () {
        com.server.post('/api/datacollectionapi/post', _getParams("totalDataSize"), function (data) {
            if (data) {
                $("#span_total").text(data[0].total);
            } else {
                $("#span_total").text("0");
            }
        });
    };

    init = function ($city, $select, $datetime, $btnReset, $btnSearch, $btnExport) {
        _stateMap.$city = $city;
        _stateMap.$select = $select;
        _stateMap.$datetime = $datetime;

        // 初始化分组下拉框
        _stateMap.$select.selectpicker({}); 
        // 初始化日期控件
        _initDatetimepicker();
        // 设置全国总数据量
        _setTotalDataSize();
        // 初始化jqGrid
        _initJqGrid();

        // 监听"重置"按钮click事件
        $btnReset.click(function () {
            _stateMap.$city.citypicker('reset');
            _stateMap.$datetime.val("");
            _stateMap.$datetime.datetimepicker('update');
            _stateMap.$select.selectpicker('val', '');
        });

        // 监听“查询”按钮的click事件
        $btnSearch.click(function () {
            $.jgrid.gridUnload("#table_monitor");
            _initJqGrid();
            $(window).triggerHandler('resize.jqGrid');
            if (_configMap.isCity) {
                _setTotalDataSize();
            } else {
                $("#span_total").text("0");
            }
        });
        // 监听“导出”按钮的click事件
        $btnExport.click(function () {
            var json = {};
            if (_configMap.isCity) {
                json.tempname = '传输监控-城市维度模板.xls';
                json.value = JSON.parse(_getParams("MonitorByCity2"));
            } else {
                json.tempname = '传输监控-信息维度模板.xls';
                json.value = JSON.parse(_getParams("MonitorByInfo"));
            }

            /*com.server.post('/api/datacollectionapi/download', JSON.stringify(json), function (data) {
                
            });*/
            $.ajax({
                url: '/api/datacollectionapi/download',
                type: 'post',
                async: false,
                dataType: 'text',
                data: JSON.stringify(json),
                contentType: 'application/json',
                success: function (data) {
                    RefreshDownFile();
                    var json = eval('(' + data + ')');
                    alert(json.success);
                }
            });
        });

        $(":radio[name='rdo_type']").change(function () {
            var type = $(this).val();
            if (type === '1') { // 城市维度
                _configMap.isCity = true;
                $("#div_city").show();
                $("#div_totalSize").show();
                $("#div_data_type_inter").hide();
            } else if (type === '2') { // 信息维度
                _configMap.isCity = false;
                $("#div_city").hide();
                $("#div_totalSize").hide();
                $("#div_data_type_inter").show();

            }
            $btnSearch.triggerHandler('click');
        });

        // 触发窗口调整大小事件以使jqGrid获取正确的w/h
        $(window).triggerHandler('resize.jqGrid');
    };
    return {
        init: init
    };
}());