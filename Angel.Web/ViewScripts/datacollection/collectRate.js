var rate = (function () {
    var _stateMap = {
        $sel1: null,
        $sel2: null,
        $sel3: null,
        $sel4: null,

        $btnSearch: null,
        $btnDown: null  //下载按钮
    };

    var initProvince, collectRateData, exportToXsl, initBar,compare, init;

    initProvince = function () {
        var pArr = ["全国","重庆", "浙江", "云南", "新疆", "西藏", "天津", "四川", "上海", "陕西", "山西", "山东", "青海", "宁夏", "内蒙古", "辽宁", "江西", "江苏", "吉林", "湖南", "湖北", "黑龙江", "河南", "河北", "海南", "贵州", "广西", "广东", "甘肃", "福建", "北京", "安徽"];
        var pinyinArr = ['quanguo', 'anhui', 'beijing', 'hunan', 'jilin', 'jiangsu', 'jiangxi', 'liaoning', 'yunnan', 'zhejiang', 'chongqing', 'ningxia', 'fujian', 'gansu', 'guangdong', 'guangxi', 'guizhou', 'neimenggu', 'qinghai', 'shandong', 'shanxi', 'shaanxi', 'hainan', 'hebei', 'henan', 'heilongjiang', 'hubei', 'shanghai', 'sichuan', 'tianjin', 'xizang', 'xinjiang'];
        var username = "", roleid = "";
        if (document.cookie.indexOf('uname') >= 0) {
            var cookieArr = document.cookie.split(';');
            for (var c in cookieArr) {
                if (cookieArr[c].indexOf("uname") >= 0) {
                    username = cookieArr[c].split('=')[1];
                }
                if (cookieArr[c].indexOf("roleid") >= 0) {
                    roleid = cookieArr[c].split('=')[1];
                }
            }
        }
        if (roleid == 49) { //省公司
            //$("#myTab li").first().hide();

            var pIndex = pinyinArr.indexOf(username);
            if (pIndex >= 0) {
                pArr = [pArr[pIndex]];
            }
        }
        _stateMap.$sel2.empty();
        var pHtml = "";
        for (var p in pArr) {
            pHtml += "<option>" + pArr[p] + "</option>";
        }
        _stateMap.$sel2.append(pHtml);
    }

    collectRateData = function () {

        $.ajax({
            type: "get",
            data: { idate: $sel1.val(), iprovince: $sel2.val(), dateLimit: $sel3.val(), cityLimit: $sel4.val() },
            contentType: "application/json",
            url: "/api/CollectRateApi/getCollectRateData",
            beforeSend: function () {
                $("#tableCont").empty();
                $("#tableCont").append("<tr><td colspan='23'>数据正在加载中，请耐心等待</td></tr>");
                _stateMap.$sel1.attr({ disabled: "disabled" });
                _stateMap.$sel2.attr({ disabled: "disabled" });
                _stateMap.$sel3.attr({ disabled: "disabled" });
                _stateMap.$sel4.attr({ disabled: "disabled" });
                _stateMap.$btnSearch.attr({ disabled: "disabled" });
                _stateMap.$btnDown.attr({ disabled: "disabled" });

                $("#barDiv").css('display','none');
            },
            success: function (data) {
                if (data) {
                    var titleArr = [
                        "slsw", "zdsjgk_mustReport", "zdsjgk_complteRatio", "khfy_mustReport", "khfy_complteRatio",
                        "ywgz_mustReport", "ywgz_complteRatio", "fwgz_mustReport", "fwgz_complteRatio",
                        "jdgz_mustReport", "jdgz_complteRatio", "cjgz_mustReport", "cjgz_complteRatio", "zcgz_mustReport",
                        "zcgz_complteRatio", "fggz_mustReport", "fggz_complteRatio", "rlgz_mustReport", "rlgz_complteRatio",
                        "jggz_mustReport", "jggz_complteRatio", "hj_mustReport", "hj_complteRatio"
                    ];
                    if (window.localStorage) {
                        var storage = window.localStorage;
                        storage["collectRate"] = JSON.stringify(data);
                    }
                    //console.log(data);
                    $("#tableCont").empty();
                    var tableHmtl = "";
                    var tabledata = data[$sel2.val()];
                    for (var d in tabledata) {
                        tableHmtl += "<tr>";
                        for (var t in titleArr) {
                            tableHmtl += "<td>" + tabledata[d][titleArr[t]] + "</td>";
                        }
                        tableHmtl += "</tr>";
                    }

                    $("#tableCont").append(tableHmtl);
                    

                    //柱状图
                    if (data.param && data.param.length > 0) {
                        if (_stateMap.$sel2.find('option:selected').text() == "全国") {
                            $("#barDiv").css('display', 'block');
                        }

                        var pArr = [], complateRatioArr = [];
                        var barData = data.param;
                        barData = barData.sort(compare('completeRatio'));

                        console.log(barData);
                        for (var p in barData) {
                            if (barData[p].provinceName != "全国") {
                                pArr.push(barData[p].provinceName);
                                if (barData[p].completeRatio && barData[p].completeRatio.indexOf('%') > 0)
                                    complateRatioArr.push(barData[p].completeRatio.substring(0, barData[p].completeRatio.length - 1));
                                else
                                    complateRatioArr.push(null);
                            }
                        }

                        initBar(pArr, complateRatioArr);
                    }

                }
            },
            complete: function () {//完成响应
                _stateMap.$sel1.removeAttr("disabled");
                _stateMap.$sel2.removeAttr("disabled");
                _stateMap.$sel3.removeAttr("disabled");
                _stateMap.$sel4.removeAttr("disabled");
                _stateMap.$btnSearch.removeAttr("disabled");
                _stateMap.$btnDown.removeAttr("disabled");

                
            },
            error: function (data) {
                console.info("error: " + data);
            }
        });
    }

    exportToXsl = function () {
        $.ajax({
            url: '/api/CollectRateApi/download',
            type: 'post',
            async: true,
            dataType: 'text',
            data: JSON.stringify({ pname: $sel2.val(), tabledata: window.localStorage.getItem("collectRate") }),
            contentType: 'application/json',
            error: function () {
                alert('导出失败');
            },
            success: function (data) {
                RefreshDownFile();
                alert("导出成功，请到左上角下载中心下载");
            }
        });
    }

    initBar = function (pArr, complateRatioArr) {
        echarts.dispose(document.getElementById('collectBar'));
        var chart = echarts.init(document.getElementById("collectBar"));

        var option = {
            color: ['#428BCA'],
            barWidth: 15,
            barBorderRadius: 30,
            tooltip: {

                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                show: false,
                data: ['无线数据']
            },
            grid: {
                left: '4%',
                right:'4%'
            },
            toolbox: {
                show: false,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                axisTick: { show: true },
                data: pArr,
                axisLine: {
                    show: true
                },
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    inside: false,
                    rotate: 60,
                    fontSize: 12
                }
            }],
            yAxis: [{
                name: '完成率%',
                type: 'value',
                //splitNumber: 2,
                axisLine: {
                    show: true
                },
                max: 100,
                splitLine: {
                    show: true
                }
            }],
            series: [{
                name: '',
                type: 'bar',
                barGap: 0,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: complateRatioArr,
                itemStyle: {
                    normal: {
                        barBorderRadius: 7
                    }
                }
            }]
        }

        chart.setOption(option);

        setTimeout(function () {
            window.onresize = function () {
                chart.resize();
            }
        }, 200)
    }

    
    compare = function(prop) {
        return function (obj1, obj2) {
            var val1 = obj1[prop].substring(0, obj1[prop].length-1);
            var val2 = obj2[prop].substring(0, obj2[prop].length - 1);
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return 1;
            } else if (val1 > val2) {
                return -1;
            } else {
                return 0;
            }
        }
    }

    init = function ($sel1, $sel2, $sel3, $sel4, $btnSearch, $btnDown) {
        _stateMap.$sel1 = $sel1;
        _stateMap.$sel2 = $sel2;
        _stateMap.$sel3 = $sel3;
        _stateMap.$sel4 = $sel4;

        _stateMap.$btnSearch = $btnSearch;
        _stateMap.$btnDown = $btnDown;

        initProvince();

        $('#myTab a').click(function (e) {
            var iName = $(e.target).attr('name');
            e.preventDefault();
            $(this).tab('show');
        });

        _stateMap.$sel1.datetimepicker({
            todayHighlight: 1,
            startView: 3, //这里就设置了默认视图为年视图
            minView: 3, //设置最小视图为年视图
            forceParse: 0,
            format: "yyyy年mm月", //选择日期后，文本框显示的日期格式 
            language: 'zh-CN', //汉化 
            startDate: '2018/01',
            autoclose: true //选择日期后自动关闭 
        });
        _stateMap.$sel1.val(new Date().Format('yyyy年MM月'));


        collectRateData();
        _stateMap.$btnSearch.click(function () {
            collectRateData();
        })

        _stateMap.$btnDown.click(function () {
            exportToXsl();
            //window.location.href = "/DownSpecial/index?filename=test";
        })


        //_stateMap.$sel2.change(function () {
        //    if ($(this).find('option:selected').text() == "全国") {
        //        $("#barDiv").show();
        //    } else {
        //        $("#barDiv").hide();
        //    }
        //})
    };

    return { init: init };
}());