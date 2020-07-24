var AreaAndTrend = (function () {

    var _stateMap = {
        chartMapDom: null,        // 全国地图DIV DOM
        chartRadarDom: null,      // 雷达图DIV DOM
        chartLine1Dom: null,      // 维度指标折线图DIV DOM
        chartLine2Dom: null,      // 关联指标折线图DIV DOM
        $tableRank: null,         // 全国排名Table
        $tableIndicator: null,    // 维度指标Table
        $tableIndicator2: null,   // 关联指标Table
    };

    var _configMap = {
        chartMap: null,
        dimNameToId: {}, // 维度名与维度ID对应关系
        dimIdToName: {}, // 维度ID与维度名对应关系
        sid: null,       // 体系ID
        field: null,     // 维度ID
        weidu: null,     // 维度名
        date1: null,     // 时间1
        date2: null,     // 时间2
        city: null,       // 所选城市
        indicatorid: null, // 指标编号
        indicatorid2: null  
    };

    var _initSelectDate, _initChartMap, _initTableRank, _initChartRadar, _initTableIndicator,
        _initChartLine, _initTableIndicator2, _initChartLine2, _putProvinceProblem,
        _setHeight, _search, _getQualityByCity, _refreshChartRadar, _getMapData,
        _getIndicatorTrends,init;

    // 设置各图表、table的height
    _setHeight = function () {
        height = Math.ceil(document.body.clientHeight - $("#navbar").height() - 90);
        $(_stateMap.chartMapDom).height(height);
        $(_stateMap.chartRadarDom).height(height);
        $(_stateMap.chartLine1Dom).height(height * .5);
        $(_stateMap.chartLine2Dom).height(height * .5);
        _stateMap.$tableRank.height(height);
        _stateMap.$tableIndicator.height(height);
        _stateMap.$tableIndicator2.height(height);
        if (_configMap.tableRank) {
            _stateMap.$tableRank.bootstrapTable('resetView', { height: height });
        }
        if (_configMap.tableIndicator) {
            _stateMap.$tableIndicator.bootstrapTable('resetView', { height: height });
        }
        if (_configMap.tableIndicator2) {
            _stateMap.$tableIndicator2.bootstrapTable('resetView', { height: height });
        }
    };

    // 获取地图Chart的series的data
    _getMapData = function (data) {
        var result = [];
        var length = data.length;
        for (var i = 0; i < length; i++) {
            result.push({ name: data[i]["citY_NO"], value: data[i]["score"], selected: false });
        }
        return result;
    };

    // 查询操作
    _search = function () {
        var param = {
            sid: _configMap.sid,
            field: _configMap.field,
            date1: _configMap.date1,
            date2: _configMap.date2
        };
        var dialog = bootbox.dialog({
            size: 'small',
            closeButton: true,
            title: '提示',
            message: '<p><i class="fa fa-spin fa-spinner"></i> 正在查询...</p>'
        });
        $.ajax({
            url: '/api/networkqualityapi/postrank',
            type: 'post',
            dataType: 'text',
            async: true,
            data: JSON.stringify(param),
            contentType: 'application/json',
            error: function () {
                dialog.find('.bootbox-body').html('检索失败!');
            },
            success: function (data) {
                var json = JSON.parse(data);
                if (json.error) {
                    dialog.find('.bootbox-body').html(json.error);
                }
                if (json.data) {
                    dialog.modal('hide');
                    var array = JSON.parse(json.data);
                    _stateMap.$tableRank.bootstrapTable('load', array);
                    var option = _configMap.chartMap.getOption();
                    option.title.subtext = _configMap.weidu;
                    option.series[0].data = _getMapData(array);
                    _configMap.chartMap.setOption(option,true);
                    $(".pages li").eq(0).click(); // 滑动到第一页
                }
            }
        });
    };

    // 初始化查询条件下拉框的值(维度、时间)
    _initSelectDate = function () {
        $.ajax({
            url: '/api/inputapi/getnopnumber',
            type: 'get',
            contentType: 'application/json',
            async: false,
            success: function (data) {
                var select_date1 = $("#select_date1");
                var select_date2 = $("#select_date2");
                for (var i in data) {
                    if (data[i].nop_number.match(/(?=期)/)) {
                        select_date1.append("<option value='" + data[i].nop_number + "'>" + data[i].nop_number + "</option>");
                    } else {
                        select_date2.append("<option value='" + data[i].nop_number + "'>" + data[i].nop_number + "</option>");
                    }
                }
                _configMap.date1 = select_date1.val();
                _configMap.date2 = select_date2.val();
            }
        });

        $.ajax({
            url: '/api/networkqualityapi/getdimsys',
            type: 'get',
            contentType: 'application/json',
            async: false,
            success: function (result) {
                // 体系
                var sys = result.sys;
                var selSystem = $("#select_system");
                for (var i in sys) {
                    selSystem.append("<option value='" + sys[i].sid + "'>" + sys[i].sName + "</option>");
                }
                _configMap.sid = selSystem.val();
                // 维度
                var data = result.dim;
                var selField = $("#select_field");
                for (var i in data) {
                    selField.append("<option value='" + data[i].dimID + "'>" + data[i].dimName + "</option>");
                    _configMap.dimNameToId[data[i].dimName] = data[i].dimID;
                    _configMap.dimIdToName[data[i].dimID] = data[i].dimName;
                }
                _configMap.field = selField.val();
                _configMap.weidu = selField.find("option:selected").text();
            }
        });
    };

    // 初始化ECharts Map
    _initChartMap = function () {
        var mapchart = echarts.init(_stateMap.chartMapDom);
        var option = {
            title: {
                text: '网络综合质量分析',
                subtext: _configMap.weidu,
                x: 'center'
            },
            tooltip: {
                //trigger: 'item',
                show: true,
                textStyle: { color: '#ffffff', itemGap: 40, padding: 320, fontSize: 20, fontFamily: '黑体' }
            },
            dataRange: {
                show: true,
                min: 60,
                max: 100,
                precision: 2,  // 小数点位数
                x: 'left',
                y: 'bottom',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true
            },
            series: [{
                name: '中国',
                type: 'map',
                map: 'china',
                roam: false,
                selectedMode: 'single',
                itemStyle: {
                    normal: { label: { show: true } },
                    emphasis: { label: { show: true } }
                },
                data: []
            }]
        };
        mapchart.setOption(option);
        _configMap.chartMap = mapchart;
        mapchart.on('mapSelected', function (param) {
            /*$(".widget-main").show();
            document.body.scrollTop = document.body.scrollHeight;*/
            //$(".pages li").eq(1).addClass("active").siblings('li').removeClass("active");
            //$("#section1").show(); $("#section2").show(); $("#section3").show();
            _configMap.city = param.target;
            var data = _getQualityByCity();
            if (_configMap.chartRadar) {
                _refreshChartRadar(data);
            } else {
                _initChartRadar(data);
                _initTableIndicator(_configMap.field);
            }
            $(".pages li").eq(1).click(); // 滑动到第二页
        });
    };

    // 初始化排名Table
    _initTableRank = function () {
        _stateMap.$tableRank.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            classes: 'table table-no-bordered table-striped table-hover table-condensed',
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: false,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            strictSearch: true,
            clickToSelect: false,               //是否启用点击选中行
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            height: height,
            columns: [{
                field: 'citY_NO',
                title: '省份',
                align: 'center'
            }, {
                field: 'score',
                title: '总分',
                align: 'center'
            }, {
                field: 'rank',
                title: '排名',
                align: 'center'
            }],
            onClickRow: function (row, $element) {
                _configMap.city = row.citY_NO;
                var option = _configMap.chartMap.getOption();
                var data = option.series[0].data;
                for (var i in data) {
                    //if (data[i].name === row.citY_NO) {
                    //    option.series[0].data[i].selected = true;
                    //} else {
                    option.series[0].data[i].selected = false;
                    //}
                }
                _configMap.chartMap.setOption(option, true);
                $element.addClass("warning").siblings('tr').removeClass("warning");
                var data = _getQualityByCity();
                if (_configMap.chartRadar) {
                    _refreshChartRadar(data);
                } else {
                    _initChartRadar(data);
                    _initTableIndicator(_configMap.field);
                }
                $(".pages li").eq(1).click(); // 滑动到第二页
            },
        });
        _configMap.tableRank = 1;
    };

    // 初始化雷达图
    _initChartRadar = function (json) {
        var chart = echarts.init(_stateMap.chartRadarDom);
        var option = {
            title: {
                x: 'center',
                text: _configMap.city + '-多维度网络质量评分'
            },
            tooltip: {
                trigger: 'axis',
                textStyle: { color: '#ffffff', itemGap: 40, padding: 320, fontSize: 20, fontFamily: '黑体' }
            },
            calculable: true,
            polar: [
                {
                    indicator: json.indicator
                }
            ],
            series: [
                {
                    name: _configMap.city,
                    type: 'radar',
                    symbolSize: 3,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    },
                    data: [
                        {
                            value: json.series,
                            name: _configMap.city
                        }
                    ]
                }
            ]
        };
        chart.setOption(option);
        //chart.setTheme('infographic');
        chart.hideLoading();
        _configMap.chartRadar = chart;
        chart.on('click', function (param) {
            var dimid = _configMap.dimNameToId[param.name];
            //_stateMap.$tableIndicator.find('tbody').eq(0).css("height", height + "px");
            /*_stateMap.$tableIndicator.find('tbody').eq(0).find('tr').each(function (index, element) {
                console.log(index);
                $(this).css("height", "30px");
            });*/
            _stateMap.$tableIndicator.bootstrapTable('refresh', {
                query: { field: dimid }
            });
        });
    };

    // 初始化
    _initTableIndicator = function (dimid) {
        _stateMap.$tableIndicator.bootstrapTable({
            method: 'post',
            url: '/api/networkqualityapi/postindicatorbydim',
            contentType: "application/x-www-form-urlencoded",
            classes: 'table table-no-bordered table-striped table-hover table-condensed',
            queryParams: function (params) {
                return {
                    field: dimid
                };
            },
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: false,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            strictSearch: true,
            clickToSelect: false,               //是否启用点击选中行
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            height: height,
            columns: [{ 
                title: '序号',
                align: 'center',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },{
                field: 'dimName',
                title: '维度',
                align: 'center'
            }, {
                field: 'indicatorname',
                title: '指标名',
                align: 'center'
            }, {
                field: 'indicatorid',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return '<a class="view" href="javascript:void(0)" title="查看趋势"><i class="glyphicon glyphicon-search"></i></a>';
                }
            }],
            onClickRow: function (row, $element) {
                $element.addClass("warning").siblings('tr').removeClass("warning");
            }
        });
        _configMap.tableIndicator = 1;
    };

    // 初始化关联指标列表
    _initTableIndicator2 = function (data) {
        var height = Math.ceil(document.body.clientHeight - $("#navbar").height() - 90);
        _stateMap.$tableIndicator2.bootstrapTable({
            classes: 'table table-no-bordered table-striped table-hover table-condensed',
            data: data,
            striped: true,
            cache: false,
            pagination: false,
            sortable: false,
            strictSearch: true,
            clickToSelect: false,
            detailView: false,
            height: height,
            columns: [{
                title: '序号',
                align: 'center',
                //valign: "middle",//垂直
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'dimName',
                title: '维度',
                align: 'left'
            }, {
                field: 'indicatorname',
                title: '指标名',
                align: 'center'
            }, {
                field: 'correlation',
                title: '关联度',
                align: 'center',
                formatter: function (value, row, index) {
                    if (!value) return;
                    if (value === 1) return '高';
                    if (value === 2) return '中';
                    if (value === 3) return '低';
                    if (value === 4) return '无关联';
                }
            }, {
                field: 'indicatorid',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: function (value, row, index) {
                    return '<a class="view2" href="javascript:void(0)" title="查看趋势"><i class="glyphicon glyphicon-search"></i></a>';
                }
            }],
            onClickRow: function (row, $element) {
                $element.addClass("warning").siblings('tr').removeClass("warning");
            }
        });
        _configMap.tableIndicator2 = 1;
    };

    // 获取城市多维度网络质量评分DATA
    _getQualityByCity = function () {
        var param = {
            city: _configMap.city,
            date1: _configMap.date1,
            date2: _configMap.date2,
            sid: _configMap.sid
        }
        var json = {
            indicator: [],
            series: []
        }
        $.ajax({
            type: 'post',
            dataType: 'text',
            async: false,
            data: JSON.stringify(param),
            contentType: 'application/json',
            url: '/api/networkqualityapi/postradar',
            error: function () {
            },
            success: function (data) {
                if (!data) return;
                var result = JSON.parse(data);
                for (var i in result[0]) {
                    json.indicator.push({ text: _configMap.dimIdToName[i.toUpperCase()], max: 100 });
                    json.series.push(result[0][i]);
                }
            }
        });
        return json;
    };

    // 刷新雷达图
    _refreshChartRadar = function (json) {
        var option = _configMap.chartRadar.getOption();
        option.title.text = _configMap.city + "-多维度网络质量评分";
        option.polar[0].indicator = json.indicator;
        option.series[0].name = _configMap.city;
        option.series[0].data[0].value = json.series;
        option.series[0].data[0].name = _configMap.city;
        _configMap.chartRadar.setOption(option, true);
    };

    // 获取
    _getIndicatorTrends = function (indicatorid, tname) {
        var result = null;
        var param = {
            id: indicatorid,
            city: _configMap.city,
            tname: tname
        };
        $.ajax({
            type: 'post',
            dataType: 'text',
            async: false,
            data: JSON.stringify(param),
            contentType: 'application/json',
            url: '/api/networkqualityapi/posttrends',
            error: function () {
            },
            success: function (data) {
                if (!data) return;
                result = JSON.parse(data);
            }
        });
        return result;
    };

    // 初始化维度指标趋势
    _initChartLine = function (text, xAxis, data, dimName) {
        var chart = echarts.init(_stateMap.chartLine1Dom);
        var option = {
            title: {
                x: 'center',
                text: _configMap.city + "-" + text,
                subtext: '维度：' + dimName
            },
            tooltip: {
                trigger: 'axis',
                textStyle: { color: '#ffffff', itemGap: 40, padding: 320, fontSize: 20, fontFamily: '黑体' }
            },
            calculable: true,
            grid: {
                x: 30,
                x2: 20
                //,y2: 70
            },
            //dataZoom: { show: true, start: 0 },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: xAxis,
                axisLabel: {
                    clickable: false,
                    formatter: function (value) {
                        return value.replace(/年/, "年\n");
                    }
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '指标趋势',
                type: 'line',
                smooth: true,
                symbolSize: 5,
                itemStyle: { normal: { label: { show: true }, areaStyle: { type: 'default' } } },
                data: data
            }]
        };
        chart.setOption(option);
        //chart.setTheme('infographic');
        _configMap.chartLine1 = chart;
        chart.on('click', function (param) {
            //var nop_number = param.name.replace(/\n/, '');
            var idata = param.data;
            var nop_number = param.name;
            var id = _configMap.indicatorid;
            _putProvinceProblem(nop_number, idata, id);
        }); 
    };

    _initChartLine2 = function (text, xAxis, correlation, data, dimName) {
        var chart = echarts.init(_stateMap.chartLine2Dom);
        var option = {
            title: {
                x: 'center',
                text: _configMap.city + "-" + text,
                subtext: '维度：' + dimName + "\n关联度：" + correlation
            },
            tooltip: {
                trigger: 'axis',
                textStyle: { color: '#ffffff', itemGap: 40, padding: 320, fontSize: 20, fontFamily: '黑体' }
            },
            calculable: true,
            grid: {
                x: 30,
                x2: 20
                //,y2: 70
            },
            //dataZoom: { show: true, start: 0 },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: xAxis,
                axisLabel: {
                    clickable: false,
                    formatter: function (value) {
                        return value.replace(/年/, '年\n');
                    }
                }
            }],
            yAxis: [{ type: 'value' }],
            series: [{
                name: '关联指标趋势',
                type: 'line',
                smooth: true,
                symbolSize: 5,
                itemStyle: { normal: { label: { show: true }, areaStyle: { type: 'default' } } },
                data: data
            }]
        };
        chart.setOption(option);
        //chart.setTheme('infographic');
        _configMap.chartLine2 = chart;
        chart.on('click', function (param) {
            //var nop_number = param.name.replace(/\n/, '');
            var idata = param.data;
            var nop_number = param.name;
            var id = _configMap.indicatorid2;
            _putProvinceProblem(nop_number, idata, id);
        });
    };

    _putProvinceProblem = function (nop_number, idata, id) {
        bootbox.confirm({
            size: 'small',
            message: '确定将此信息标记督导?',
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
                    url: '/api/networkqualityapi/postaddprovinceproblem',
                    type: 'post',
                    dataType: 'text',
                    data: JSON.stringify({
                        id: id,
                        date1: nop_number,
                        date2: idata,
                        city: _configMap.city
                    }),
                    contentType: 'application/json',
                    success: function (data) {
                        var json = JSON.parse(data);
                        if (json && json.error) {
                            bootbox.alert({ message: json.error, size: 'small' });
                        } else if (json && json.count > 0) {
                            bootbox.alert({ message: '标记督导成功，请前往"省公司问题督导"中查询。', size: 'small' });
                        } else {
                            bootbox.alert({ message: '标记督导失败!', size: 'small' });
                        }
                    }
                });
            }
        });
    };

    init = function (map, rank, radar, indicator, line1, indicator2, line2) {
        _stateMap.chartMapDom = map;
        _stateMap.chartRadarDom = radar;
        _stateMap.chartLine1Dom = line1;
        _stateMap.chartLine2Dom = line2;
        _stateMap.$tableRank = rank;
        _stateMap.$tableIndicator = indicator;
        _stateMap.$tableIndicator2 = indicator2;

        window.operateEvents = {
            'click .view': function (e, value, row, index) {
                var result = _getIndicatorTrends(row.indicatorid, row.tableName);
                if (_configMap.chartLine1) {
                    var option = _configMap.chartLine1.getOption();
                    if (option.title) {
                        option.title.text = _configMap.city + "-" + row.indicatorname;
                        option.title.subtext = "维度：" + row.dimName;
                        option.xAxis[0].data = result.xAxis;
                        option.series[0].data = result.data;
                        _configMap.chartLine1.setOption(option, true);
                    } else {
                        _initChartLine(row.indicatorname, result.xAxis, result.data, row.dimName);
                    }
                    _stateMap.$tableIndicator2.bootstrapTable("load", result.list);
                } else {
                    _initChartLine(row.indicatorname, result.xAxis, result.data, row.dimName);
                    _initTableIndicator2(result.list);
                }
                _configMap.indicatorid = row.indicatorid;
                $(".pages li").eq(2).click(); // 滑动到第三页
            },
            'click .view2': function (e, value, row, index) {                
                var correlation = "";
                if (row.correlation === 1) correlation = '高';
                if (row.correlation === 2) correlation =  '中';
                if (row.correlation === 3) correlation =  '低';
                if (row.correlation === 4) correlation =  '无关联';
                var result = _getIndicatorTrends(row.indicatorid, row.tableName);
                if (_configMap.chartLine2) {
                    var option = _configMap.chartLine2.getOption();
                    if (option.title) {
                        option.title.text = _configMap.city + "-" + row.indicatorname;
                        option.title.subtext = "维度：" + row.dimName + "\n关联度：" + correlation;
                        option.xAxis[0].data = result.xAxis;
                        option.series[0].data = result.data;
                        _configMap.chartLine2.setOption(option, true);
                    } else {
                        _initChartLine2(row.indicatorname, result.xAxis, correlation, result.data, row.dimName);
                    }
                } else {
                    _initChartLine2(row.indicatorname, result.xAxis, correlation, result.data, row.dimName);
                }
                _configMap.indicatorid2 = row.indicatorid;
            }
        };

        _initSelectDate(); // 填充日期下拉框的值
        _initChartMap();   // 初始化ECharts Map
        _initTableRank();  // 初始化排名Table
        _search();         // 执行查询操作

        $("#select_system").change(function () {
            _configMap.sid = $(this).val();
        });
        $("#select_field").change(function () {
            _configMap.field = $(this).val();
            _configMap.weidu = $(this).find("option:selected").text();
        });
        $("#select_date1").change(function () {
            _configMap.date1 = $(this).val();
        });
        $("#select_date2").change(function () {
            _configMap.date2 = $(this).val();
        });
        // 查询按钮
        $("#btnSearch").click(function () {
            _search();
        });
        // 当调整浏览器窗口的大小时，重新设置height
        //$(window).resize(function () {
        //});
        window.onresize = function () {
            _setHeight();
            if (_configMap.chartMap) {
                _configMap.chartMap.resize();
            }
            if (_configMap.chartRadar) {
                _configMap.chartRadar.resize();
            }
            if (_configMap.chartLine1) {
                _configMap.chartLine1.resize();
            }
            if (_configMap.chartLine2) {
                _configMap.chartLine2.resize();
            }
        };
        $(window).resize();        
    }

    return {
        init: init
    };
}());