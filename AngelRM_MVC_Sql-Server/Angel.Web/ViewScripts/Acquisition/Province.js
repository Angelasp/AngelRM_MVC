var unReportIndecators = new Array(11);
//获取Cook
function readCookie(name) {

    var searchName = name + '=';
    var cityid = unescape(document.cookie.split(searchName)[1].split(";")[0]);
    while (cityid.charAt(0) == ' ')
        cityid = cityid.substring(1, cityid.length);
    return decodeURIComponent(cityid);
}
//点击省份呈现
$("#tab_province").click(function () {
    FirstshowProvince();
    chart1_tab4_load_province("chart1_tab4_gn");
})

//省份选择点击查询
$("#sel_province").change(function () {
    FirstshowProvince();
});
//省份初次加载
function FirstshowProvince() {
    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();
    var cityval = "";
    if (readCookie("rolename") == "省公司") {
        cityval = readCookie("cityid");
    } else {
        cityval = $("#sel_province").val();
    }

    //省份部分
    //var alltargets = 0; //应上报的指标
    //var alltargets_sum = 0; //省份所有用户的应上报数据总量（个）  就是省份所有用户的指标*（地市数+1）
    //var reportTargets = 0;//已上报指标个数(个)
    //var reportTargets_sum = 0;//省份选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重
    //var report_rate = 0;//指标个数上报完成率
    //var report_sum_rate = 0;//指标总数上报完成率

    //var table1Data = [{  
    //    alltargets: 0, reportTargets: 0, report_rate: 0,
    //    alltargets_sum: 0, reportTargets_sum: 0, report_sum_rate: 0
    //}];

    //应上报的指标数
    //var listget6 = { id: 6, DATETIME: datetime, city: cityval, rows: datetime1 };
    //com.server.get("/api/AcquisitionApi/get", listget6, function (data) {
    //    if (data != null) {
    //        table1Data[0].alltargets = data;
    //    }
    //});

    var table1Data = [];
    //第一个表格数据
    com.server.get("/api/AcquisitionApi/getProvinceAllData", 
        {datetime1:datetime, datetime2:datetime1,cityname:cityval},
        function (data) {
            if (data) {
                table1Data.push(JSON.parse(data));


                localStorage.clear();  // 清空当前域下的所有localStorage

                // 存储数据
                console.log(data);

                localStorage.setItem('alltargets', table1Data[0].alltargets);
                localStorage.setItem('alltargets_sum', table1Data[0].alltargets_sum);
                localStorage.setItem('reportTargets', table1Data[0].reportTargets);
                localStorage.setItem('reportTargets_sum', table1Data[0].reportTargets_sum);
                localStorage.setItem('report_rate', table1Data[0].report_rate);
                localStorage.setItem('report_sum_rate', table1Data[0].report_sum_rate);

                //console.log(table1Data);
            }
            
    });

    //省份的地市数
    var cityCount = 0;
    var listget12 = { id: 12, DATETIME: datetime, city: cityval, rows: '' };
    com.server.get("/api/AcquisitionApi/get", listget12, function (data) {
        if (data) {
            cityCount = data[0].count;
            //应上报的数据总量
            //table1Data[0].alltargets_sum = table1Data[0].alltargets * (cityCount + 1);
        }
    });

    //已上报的指标数
    //var listget7 = { id: 22, DATETIME: datetime, city: cityval, rows: datetime1 };
    //com.server.get("/api/AcquisitionApi/get", listget7, function (data) {
    //    if (data) {
    //        table1Data[0].reportTargets = data[0].number;
    //    }
    //});

    //已上报的数据总数
    //var listget8 = { id: 23, DATETIME: datetime, city: cityval, rows: datetime1 };
    //com.server.get("/api/AcquisitionApi/get", listget8, function (data) {
    //    if (data != null) {
    //        table1Data[0].reportTargets_sum = (data[0].number === null ? "0" : data[0].number);
    //        if (table1Data[0].alltargets != 0 && table1Data[0].alltargets_sum != 0) {
    //            table1Data[0].report_rate = fomatFloat(table1Data[0].reportTargets / table1Data[0].alltargets * 100, 2);
    //            table1Data[0].report_sum_rate = fomatFloat(table1Data[0].reportTargets_sum / table1Data[0].alltargets_sum * 100, 2);
    //        }
    //    }
    //});
    
    var targets_11 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//11维度分类指标总数
    var reportTargets_11 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//分类已上报指标数

    var targets_sum_11 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//11维度分类指标数据总量
    var reportTargets_sum_11 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//11维度分类已上报指标总量

    var table2Data = [{
        data0: "", data1: "0/0|0/0", data2: "0/0|0/0", data3: "0/0|0/0", data4: "0/0|0/0", data5: "0/0|0/0", data6: "0/0|0/0",
        data7: "0/0|0/0", data8: "0/0|0/0", data9: "0/0|0/0", data10: "0/0|0/0", data11: "0/0|0/0"
    }]
    
   


    var dimArr = ['B01D01', 'B01D02', 'B01D03', 'B01D04', 'B01D05', 'B01D06', 'B01D07', 'B01D08', 'B01D09', 'B01D10', 'B01D11'];
    //应上报的11维度的各个指标总数
    var listget18 = { id: 18,DATETIME:"", city: cityval,rows:"" }; 
    com.server.get("/api/AcquisitionApi/get", listget18, function (data) {
        if (data != null) {
            for (var i in data) {
                var dIndex = dimArr.indexOf(data[i].dimID);
                targets_11[dIndex] = data[i].number;
                //应上报的指标总量
                targets_sum_11[dIndex] = data[i].number * (cityCount + 1);
                //table2Data[0]["data" + dIndex] = data[i].number + "|aa"; 
            }
        }
    });
    
    //已上报的11维度的各个指标总数
    var listget19 = { id: 19, DATETIME: datetime, city: cityval, rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget19, function (data) {
        if (data != null) {
            for (var i in data) {
                var dIndex = dimArr.indexOf(data[i].dimID);
                reportTargets_11[dIndex] = data[i].number;
                //table2Data[0]["data" + dIndex] = data[i].number + "|aa";
            }
        }
    });

    
    //已上报的11维度的各个数据总量
    var listget24 = { id: 24, DATETIME: datetime, city: cityval, rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget24, function (data) {
        if (data != null) {
            for (var i in data) {
                var dIndex = dimArr.indexOf(data[i].dimID);
                reportTargets_sum_11[dIndex] = data[i].totalall;
            }
        }
    });
    
    table2Data = [{
        data0: "",
        data1: (targets_11[0] - reportTargets_11[0]) + "/" + targets_11[0] + "|" + (targets_sum_11[0] - reportTargets_sum_11[0]) + "/" + targets_sum_11[0],
        data2: (targets_11[1] - reportTargets_11[1]) + "/" + targets_11[1] + "|" + (targets_sum_11[1] - reportTargets_sum_11[1]) + "/" + targets_sum_11[1],
        data3: (targets_11[2] - reportTargets_11[2]) + "/" + targets_11[2] + "|" + (targets_sum_11[2] - reportTargets_sum_11[2]) + "/" + targets_sum_11[2],
        data4: (targets_11[3] - reportTargets_11[3]) + "/" + targets_11[3] + "|" + (targets_sum_11[3] - reportTargets_sum_11[3]) + "/" + targets_sum_11[3],
        data5: (targets_11[4] - reportTargets_11[4]) + "/" + targets_11[4] + "|" + (targets_sum_11[4] - reportTargets_sum_11[4]) + "/" + targets_sum_11[4],
        data6: (targets_11[5] - reportTargets_11[5]) + "/" + targets_11[5] + "|" + (targets_sum_11[5] - reportTargets_sum_11[5]) + "/" + targets_sum_11[5],
        data7: (targets_11[6] - reportTargets_11[6]) + "/" + targets_11[6] + "|" + (targets_sum_11[6] - reportTargets_sum_11[6]) + "/" + targets_sum_11[6],
        data8: (targets_11[7] - reportTargets_11[7]) + "/" + targets_11[7] + "|" + (targets_sum_11[7] - reportTargets_sum_11[7]) + "/" + targets_sum_11[7],
        data9: (targets_11[8] - reportTargets_11[8]) + "/" + targets_11[8] + "|" + (targets_sum_11[8] - reportTargets_sum_11[8]) + "/" + targets_sum_11[8],
        data10: (targets_11[9] - reportTargets_11[9]) + "/" + targets_11[9] + "|" + (targets_sum_11[9] - reportTargets_sum_11[9]) + "/" + targets_sum_11[9],
        data11: (targets_11[10] - reportTargets_11[10]) + "/" + targets_11[10] + "|" + (targets_sum_11[10] - reportTargets_sum_11[10]) + "/" + targets_sum_11[10]
    }]

     //console.log(table2Data);


    //11维度
     localStorage.setItem('data1', table2Data[0].data1);
     localStorage.setItem('data2', table2Data[0].data2);
     localStorage.setItem('data3', table2Data[0].data3);
     localStorage.setItem('data4', table2Data[0].data4);
     localStorage.setItem('data5', table2Data[0].data5);
     localStorage.setItem('data6', table2Data[0].data6);
     localStorage.setItem('data7', table2Data[0].data7);
     localStorage.setItem('data8', table2Data[0].data8);
     localStorage.setItem('data9', table2Data[0].data9);
     localStorage.setItem('data10',table2Data[0].data10);
     localStorage.setItem('data11',table2Data[0].data11);
    
   

    //com.server.get("/api/AcquisitionApi/getProvince11Data", 
    //    {datetime1:datetime, datetime2:datetime1,cityname:cityval},
    //    function (data) {
    //        if (data) {
    //            console.log(data);
    //        }
    //});

    //11维度未上报的指标集合
    var listget11 = { id: 25, DATETIME: datetime, city: cityval, rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget11, function (data) {
        if (data != null) {
            var newObj = _.groupBy(data, 'dimID');
            _.forEach(newObj, function (itemArr) {
                var dIndex = dimArr.indexOf(itemArr[0].dimID);
                var dArr = [];
                for (var i = 0; i < itemArr.length; i++) {
                    dArr.push(itemArr[i].indicatorname);
                }
                unReportIndecators[dIndex] = dArr;
            });
        }
    });


    if (readCookie("rolename") == "省公司") {
        showProvinceTable(table1Data, table2Data, $("#Group_tableuser"), $("#Group_tableuser1"));
    } else {
        showProvinceTable(table1Data, table2Data, $("#Province_table"), $("#Province_table1"));
    }
    
    
}

//省份表格
function showProvinceTable(table1data, table2Data,$table1,$table2,$cellclick) {
    $table1.bootstrapTable('destroy');
    $table1.bootstrapTable({
        //url: url,
        striped: true,
        search: false,
        searchOnEnterKey: true,
        showRefresh: false,
        showToggle: false,
        showColumns: false,
        minimumCountColumns: 2,
        showPaginationSwitch: false,
        clickToSelect: true,
        detailView: false,
        detailFormatter: 'detailFormatter',
        pagination: false,
        paginationLoop: false,
        classes: 'table table-hover table-no-bordered table-striped',
        //sidePagination: 'server',
        //silentSort: false,
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        //pageNumber: 1,
        //pageSize: 5,
        searchOnEnterKey: true,
        idField: 'systemId',
        maintainSelected: true,
        //toolbar: '#toolbar',
        data:table1data,
        columns: [
            {
                field: 'alltargets', title: '应上报指标个数(个)', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value;
                }
            },
            {
                field: 'reportTargets', title: '已上报指标个数(个)', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value;
                }
            },
            {
                field: 'report_rate', title: '指标上报完成率（%）', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value + "%";
                }
            },
            {
                field: 'alltargets_sum', title: '应上报数据总量(个)', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value;
                }
            },
            {
                field: 'reportTargets_sum', title: '已上报数据总量(个)', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value;
                }
            },
            {
                field: 'report_sum_rate', title: '数据上报完成率(%)', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value + "%";
                }
            }]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });
    
    $table2.bootstrapTable('destroy');
    $table2.bootstrapTable({
        //url: url,
        striped: true,
        search: false,
        searchOnEnterKey: true,
        showRefresh: false,
        showToggle: false,
        showColumns: false,
        minimumCountColumns: 2,
        showPaginationSwitch: false,
        clickToSelect: true,
        detailView: false,
        detailFormatter: 'detailFormatter',
        pagination: false,
        paginationLoop: false,
        classes: 'table table-hover table-no-bordered table-striped',
        //sidePagination: 'server',
        //silentSort: false,
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        //pageNumber: 1,
        //pageSize: 5,
        searchOnEnterKey: true,
        idField: 'systemId',
        maintainSelected: true,
        data:table2Data,
        //toolbar: '#toolbar',
        columns: [
            {
                field: 'data0', title: '维度', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return "未完成指标" + "</br>" + "未完成数据";
                }
            },
            {
                field: 'data1', title: '客户反映', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|',"</br>");

                }
            },
            {
                field: 'data2', title: '无线网络覆盖', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data3', title: '无线语音端到端', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data4', title: '无线数据端到端', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data5', title: '无线网络结构', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data6', title: '家客数据端到端', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data7', title: '传输网络', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data8', title: '内容网络', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data9', title: '国际业务', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data10', title: '集团客户', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                }
            },
            {
                field: 'data11', title: '新业务', sortable: true, halign: 'left',
                formatter: function (value, row, index) {
                    return value.replace('|', "</br>");
                    //return "-/-" + "</br> </br>" + "-/-";
                }
            }
        ],
        onClickRow: function (row, $element, field) {
            var fIndex = parseInt(field.substring(4,field.length));
            if (fIndex != 0) {
                
                $("#roleTitle").text("未上报指标详情");
                
                var undata = unReportIndecators[fIndex - 1];
               
                var dialogCont = "<ul class='dialogcont'>";
                for (var o in undata) {
                    dialogCont += "<li>" + undata[o] + "</li>"
                }
                dialogCont += "</ul>"


                $("#roleDialog").find('label').addClass('active');
                $("#giveBaddata").empty();
                $("#giveBaddata").append(dialogCont);

                $("#roleTitle").text("未上报指标详情");
                $("#save_role").attr("name", "edit");

                $("#roleDialog").modal("show");
            }
            
        }
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });
}

//省份柱状图
function chart1_tab4_load_province(chartId) {
    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();
    var cityval = "";
    if (readCookie("rolename") == "省公司") {
        cityval = readCookie("cityid");
    } else {
        cityval = $("#sel_province").val();
    }
    //分母  各省份的数据
    var provinces = ["江苏", "北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "浙江", "安徽", "福建", "江西",
        "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆"];
    
    var fm = new Array(31);
    var listget20 = { id: 20, DATETIME: datetime, city: cityval, rows: datetime1 };
    
    com.server.get("/api/AcquisitionApi/get", listget20, function (data) {
        if (data) {
            for (var i in data) {
                var indicount = 0;
                if (data[i].indicatorlist.length > 6) {
                    if (data[i].indicatorlist.indexOf(',') != -1) {
                        var indiArr = data[i].indicatorlist.split(',');
                        for (var j in indiArr) {
                            if (indiArr[j].length > 6) { indicount++; }
                        }
                    }
                }

                var name = data[i].province;
                console.log()

                fm[provinces.indexOf(name)] = data[i].provincecount * indicount;
            }
        }
       
    });
    //分子  各省份的数据
    var idata = new Array(31);
    var fz = new Array(31);
    var listget21 = { id: 21, DATETIME: datetime, city: cityval, rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget21, function (data) {
        if (data) {
            for (var i in data) {
                var name = data[i].province;
                fz[provinces.indexOf(name)] = data[i].tnumber;
            }

            for (var k in fm) {
                if (fm[k] && fm[k] != 0 && fz[k]) {
                    idata[k] = Math.round(fz[k] / fm[k] * 10000) / 100;
                  
                } else {
                    idata[k] = 0;
                }
            }

           
            console.log(idata);
            
            console.log(selectSort(idata, provinces));
            showBar(chartId, idata,provinces);
        } else {
            showBar(chartId, [], provinces);
        }
    });
    
    
}

function showBar(chartId, idata, provinces) {

    var myChart = echarts.init(document.getElementById(chartId));
    var option = {
        title: {
            x: 'center',
            text: '',
            subtext: '',
            link: ''
        },
        color: ['#47a7dd'],
        tooltip: {
            trigger: 'item'
        },

        toolbox: {
            show: false,
            feature: {
                dataView: { show: false, readOnly: false },
                restore: { show: false },
                saveAsImage: { show: true }
            }
        },
        calculable: false,
        grid: {
            borderWidth: 0,
            x: 40,
            x2: 20,
            y: 30,
            y2: 30
        },
        xAxis: [
            {
                show: true,
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#959595',
                        width: 1
                    }
                },
                axisLabel: {
                    show: true,
                    rotate: -50,
                    interval: 0,
                    textStyle: {
                        fontFamily: '微软雅黑'
                    }
                },
                splitLine: {
                    show: false
                },
                data: provinces
            }
        ],
        yAxis: [
        {
            type: 'value',
            name: '',
            min: 0,
            max: 100
        }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2',
                                '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2',
                                '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2',
                                '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2',
                                '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2',
                                '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#0994e2',
                                '#0994e2', '#0994e2', '#0994e2', '#0994e2', '#ec6941',
                                '#ec6941', '#ec6941', '#ec6941', '#ec6941', '#ec6941', '#ec6941'
                            ];


                            return colorList[params.dataIndex]
                        },
                        opacity: 0.8,
                        barBorderRadius: [6, 6, 0, 0],
                        label: {
                            show: false,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: idata
            }
        ]
    };

    myChart.setOption(option);
    $("#chart1_loading").hide();
}


$('#closeDivProvince').on('click', function () {
    $("#GroupclickProvince").css('display', 'none');

})

//表格排序方法
function compare(prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
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
//倒序排名
function compare2(prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
}
//冒泡排序
function bubbleSort(array) {
    /*给每个未确定的位置做循环*/
    //alert(array.length);
    for (var unfix = array.length - 1; unfix > 0; unfix--) {
        /*给进度做个记录，比到未确定位置*/
        for (var i = 0; i < unfix; i++) {
            if (array[i] < array[i + 1]) {
                var temp = array[i];
                array.splice(i, 1, array[i + 1]);
                array.splice(i + 1, 1, temp);
            }
        }
    }
}

//选择排序 将当前未确定块的min或者max取出来插到最前面或者后面
function selectSort(array, provinces) {
    /*给每个插入后的未确定的范围循环，初始是从0开始*/
    for (var unfixed = 0; unfixed < array.length; unfixed++) {
        /*设置当前范围的最小值和其索引*/
        var min = array[unfixed];
        var minIndex = unfixed;

        var minprovinces = provinces[unfixed];
        var minIndexprovinces = unfixed;
        /*在该范围内选出最小值*/
        for (var j = unfixed + 1; j < array.length; j++) {
            if (min < array[j]) {//<是降序 ， >是降序
                min = array[j];
                minIndex = j;

                minprovinces = provinces[j];
                minIndexprovinces = j;

            }
        }
        /*将最小值插入到unfixed，并且把它所在的原有项替换成*/
        array.splice(unfixed, 0, min);
        array.splice(minIndex + 1, 1);

        provinces.splice(unfixed, 0, minprovinces);
        provinces.splice(minIndexprovinces + 1, 1);


    }
}

// 导出报表
$('#export_Province').on('click', function (rid) {
    var Datatime = $('#sel_gather_time').val();
    var Dataday = $('#sel_gather_time1').val();
    var DataRoom = $('#sel_province').find("option:checked").html();

    //var DataRoom1 =  $('#sel_locate').find("option:checked").html();
    ////var ChangeData = DataRoom1.slice(30, 80);

    ////$("select option:checked").attr("id")

    //console.log(DataRoom1);

  

    var Excel1 = localStorage.getItem('alltargets');
    var Excel2 = localStorage.getItem('alltargets_sum');
    var Excel3 = localStorage.getItem('reportTargets');
    var Excel4 = localStorage.getItem('reportTargets');
    var Excel5 = localStorage.getItem('report_rate');
    var Excel6 = localStorage.getItem('report_sum_rate');


    var data1 = localStorage.getItem('data1');
    var data2 = localStorage.getItem('data2');
    var data3 = localStorage.getItem('data3');
    var data4 = localStorage.getItem('data4');
    var data5 = localStorage.getItem('data5');
    var data6 = localStorage.getItem('data6');
    var data7 = localStorage.getItem('data7');
    var data8 = localStorage.getItem('data8');
    var data9 = localStorage.getItem('data9');
    var data10 = localStorage.getItem('data10');
    var data11 = localStorage.getItem('data11');

    //11维度
    var B01D01show = data1.split("|");

    for (var i = 0; i < B01D01show.length; i++) {
        console.log(B01D01show[i]);
    }
    var B01D01 = B01D01show[0];
    var B01D01R = B01D01show[1];
    console.log(B01D01, B01D01R);


    var B01D02show = data2.split("|");
    var B01D02 = B01D02show[0];
    var B01D02R = B01D02show[1];


    var B01D02show = data2.split("|");
    var B01D02 = B01D02show[0];
    var B01D02R = B01D02show[1];


    var B01D03show = data3.split("|");
    var B01D03 = B01D03show[0];
    var B01D03R = B01D03show[1];


    var B01D04show = data4.split("|");
    var B01D04 = B01D04show[0];
    var B01D04R = B01D04show[1];

    var B01D05show = data5.split("|");
    var B01D05 = B01D05show[0];
    var B01D05R = B01D05show[1];

    var B01D06show = data6.split("|");
    var B01D06 = B01D06show[0];
    var B01D06R = B01D06show[1];

    var B01D07show = data7.split("|");
    var B01D07 = B01D07show[0];
    var B01D07R = B01D07show[1];

    var B01D08show = data8.split("|");
    var B01D08 = B01D08show[0];
    var B01D08R = B01D08show[1];

    var B01D09show = data9.split("|");
    var B01D09 = B01D09show[0];
    var B01D09R = B01D09show[1];

    var B01D10show = data10.split("|");
    var B01D10 = B01D10show[0];
    var B01D10R = B01D10show[1];

    var B01D11show = data11.split("|");
    var B01D11 = B01D11show[0];
    var B01D11R = B01D11show[1];

    var Num;
    var postlist = '{ "insert1": [{ "Datatime": "' + Datatime + '", "Dataday":" ' + Dataday + '", "DataRoom": "' + DataRoom + '", "Excel1": "' + Excel1 + '", "Excel2": "' + Excel2 + '", "Excel3": "' + Excel3 + '", "Excel4": "' + Excel4 + '", "Excel5":" ' + Excel5 + '" ,"Excel6":" ' + Excel6 + '"}],"insert2": [{ "Datatime": "' + Datatime + '", "Dataday":" ' + Dataday + '", "DataRoom": "' + DataRoom + '","B01D01": "' + B01D01 + '", "B01D01R":" ' + B01D01R + '", "B01D02": "' + B01D02 + '", "B01D02R":" ' + B01D02R + '","B01D03": "' + B01D03 + '", "B01D03R":" ' + B01D03R + '","B01D04": "' + B01D04 + '", "B01D04R":" ' + B01D04R + '","B01D05": "' + B01D05 + '", "B01D05R":" ' + B01D05R + '","B01D06": "' + B01D06 + '", "B01D06R":" ' + B01D06R + '","B01D07": "' + B01D07 + '", "B01D07R":" ' + B01D07R + '","B01D08": "' + B01D08 + '", "B01D08R":" ' + B01D08R + '","B01D09": "' + B01D09 + '", "B01D09R":" ' + B01D09R + '","B01D10": "' + B01D10 + '", "B01D10R":" ' + B01D10R + '","B01D11": "' + B01D11 + '", "B01D11R":" ' + B01D11R + '",}]}';

    var downloadhref;
    downloadhref = "/Down/Index?filename=";
    var dialog = bootbox.dialog({
        size: 'small',
        closeButton: true,
        title: '采集查询进度数据导出',
        message: '<p><i class="fa fa-spin fa-spinner"></i> 正在导出...</p>'
    });
    $.ajax({
        url: '/api/AcquisitionApi/Post',
        type: 'post',
        dataType: 'text',
        async: true,
        data: JSON.stringify(postlist),
        contentType: 'application/json',
        ajaxError: function (rid) {
            dialog.find('.bootbox-body').html('导出失败!');
        },
        success: function (data) {
            var json = eval('(' + data + ')');
            if (json.code == 1) {
                //往下载列表插入数据
                var postlist = '{ "insert": [{ "userid":{1},"username": "{admin}","filename":"' + json.data.filename + '","createuser": "{admin}","createtime":"' + json.data.createtime + '","downloadhref":"' + downloadhref + json.data.filename + '"}]}';
                insertDownloadList(postlist);
                RefreshDownFile();
                var postlist1 = '{ "insert_log": [{ "logposition":"采集进度-数据详情","operationtype": "导出报表"}]}';
                oper_log(postlist1);
                if (json.success) {
                    dialog.find('.bootbox-body').html(json.success);
                }
                RefreshDownFile();
            }
            else if (json.code == 0)
                dialog.find('.bootbox-body').html(json.error);
        }
    });

});
