var Rolename = readCookie("rolename");
var Uname = readCookie("uname");
//初始化处室总个数
var roomNum = 0;
/* 集团 START */
var datetime = $("#sel_gather_time").val();
var datetime1 = $("#sel_gather_time1").val();
var webNum = $("#sel_locate").val();
var cityval = $("#sel_province").val();

var tmpInd = new Array();
var tmpnoIndNext = new Array();
var tmpIndnum = new Array();
var tmpIndnumbad = new Array();
var tmpIndnumbad2 = new Array();

var showNOdata = new Array();
//页面初次加载
$(function () {
   
    FirstshowdataTime();

    //用户部分
    if (Rolename == "集团用户") {
        $.get("/api/AcquisitionApi/getRoomName", { uid: readCookie("uid") }, function (data) {
            var info = "用户属性：" + readCookie("rolename") + " &nbsp&nbsp&nbsp 归属处室/省份：" + data;
            document.getElementById("userName").innerHTML = info;
        });
        FirstRoomUser($("#Group_tableuser"), $("#Group_tableuser1"));
    }
    else if (Rolename == "省公司") {
        var info = "用户属性：" + readCookie("rolename") + " &nbsp&nbsp&nbsp 归属处室/省份：" + readCookie("cityid");
        document.getElementById("userName").innerHTML = info;
        //FirstProUser();
        FirstshowProvince();
    }
    else {
       
        roomTotalyulan()
       
        FirstRoomUser($("#Group_table"), $('#Group_table1'));

    }


    FirstshowdataNO();

})

//时间选择查询
$("#sel_gather_time").change(function () {
 
    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();

    if (datetime == "1840年06月" && datetime1 == "1840年第六期") {

        alert("请至少选择一个有效条件");
        return;

    }
  
    //用户部分
    if (Rolename == "集团用户") {
        FirstRoomUser($("#Group_tableuser"), $("#Group_tableuser1"));
    }
    else if (Rolename == "省公司") {
        //ClickProUser();
        FirstshowProvince();
    }
    else {
        if ($("#tab2").hasClass("active")) {
            FirstshowProvince();
        } else {
            roomTotalyulan();
            FirstRoomUser($("#Group_table"), $('#Group_table1'));
            
        }
    }
   
    var tname = $("#myTab li.active").find('a').text();
    if (tname === "省份") {
        FirstshowProvince();
        chart1_tab4_load_province("chart1_tab4_gn");
    }
})
        
$("#sel_gather_time1").change(function () {

    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();

    if (datetime == "1840年06月" && datetime1 == "1840年第六期") {

        alert("请至少选择一个有效条件");
        return;
    }
    
    //用户部分
    if (Rolename == "集团用户") {
        FirstRoomUser($("#Group_tableuser"), $("#Group_tableuser1"));
    }
    else if (Rolename == "省公司") {
        //ClickProUser();
        FirstshowProvince();
    }
    else {
        if ($("#tab2").hasClass("active")) {
            FirstshowProvince();
        } else {
            roomTotalyulan();
            FirstRoomUser($("#Group_table"), $('#Group_table1'));
           
        }

    }
    FirstshowdataNO();

    

    var tname = $("#myTab li.active").find('a').text();
    if (tname === "省份") {
        FirstshowProvince();
        chart1_tab4_load_province("chart1_tab4_gn");
    }
});

  //处室点击查询
 $("#sel_locate").change(function () {
            FirstRoomUser($("#Group_table"), $('#Group_table1'));
            
        });


//加载五个初始采集完成率
 function roomTotalyulan() {
     $.get("/api/AcquisitionApi/getRoomRate", { datetime: $("#sel_gather_time").val(), period: $("#sel_gather_time1").val() }, function (data) {


         $("#succeed1").html(data[0] + "%");
         $("#succeed2").html(data[1] + "%");
         $("#succeed3").html(data[2] + "%");
         $("#succeed4").html(data[3] + "%");
         $("#succeed5").html(data[4] + "%");
     });
 }

// 初始化时间和处室
 function FirstshowdataTime() {

            var showTime = new Array();
            var showdatenumber = new Array();

            var listget1 = { id: 1, DATETIME: '1', city: '4G', rows: '家宽' };
            com.server.get("/api/AcquisitionApi/get", listget1, function (data) {
       
                if (data != null) {

                    for (var i = 0; i < data.length; i++) {

                        if (i == 0) {
                            var near = data[i].noP_NUMBER.substr(0, data[i].noP_NUMBER.indexOf('年'));
                            $("#sel_gather_time").append("<option value='" + data[i].noP_NUMBER + "'selectd >" + data[i].noP_NUMBER + "</option>");
                            showTime.push(data[i].noP_NUMBER);
                        }
                        else {
                            var near = data[i].noP_NUMBER.substr(0, data[i].noP_NUMBER.indexOf('年'));
                            $("#sel_gather_time").append("<option value='" + data[i].noP_NUMBER + "' >" + data[i].noP_NUMBER + "</option>");
                            showTime.push(data[i].noP_NUMBER);
                        }
                    }
                    $("#sel_gather_time").append("<option value='1840年06月' > 可选择为空 </option>");

                }


    
            });


            var listget2 = { id: 2, DATETIME: '1', city: '4G', rows: '家宽' };
            com.server.get("/api/AcquisitionApi/get", listget2, function (data) {
                if (data != null) {

                    //datalist11.data.sort(compare2('call_suc_rate'));

                    for (var i = 0; i < data.length; i++) {
                        var near = data[i].noP_NUMBER.substr(0, data[i].noP_NUMBER.indexOf('年'));                  

                        $("#sel_gather_time1").append("<option value='" + data[i].noP_NUMBER + "' >" + data[i].noP_NUMBER + "</option>");
                        showdatenumber.push(data[i].noP_NUMBER);
                   
                    }
                    $("#sel_gather_time1").append("<option value='1840年第六期' > 可选择为空 </option>");

                }

            });
   

            //集团页面所有处室数据库读取
            var listget3 = { id: 211, DATETIME: '', city: '', rows: '' };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        //var near = data[i].noP_NUMBER.substr(0, data[i].noP_NUMBER.indexOf('年'));
                        //if (near >= "2017") {

                        $("#sel_locate").append("<option value='" + data[i].id + "' >" + data[i].roomname + "</option>");

                    }
                }   

            });

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

        }

 // show未完成指标名
function FirstshowdataNO() {
            var datetime = $("#sel_gather_time").val();
            var datetime1 = $("#sel_gather_time1").val();
            var webNum = $("#sel_locate").val();

            var listget13 = { id: 13, DATETIME: datetime, city: datetime1, rows: webNum };
            com.server.get("/api/AcquisitionApi/get", listget13, function (data) {
                showNOdata.length = 0;
                if (data != null) {


                    var newObj = _.groupBy(data, 'dimID');
                    _.forEach(newObj, function (itemArr) {
                        var dimArr = [];
                        for (var o in itemArr) {
                            dimArr.push(itemArr[o].indicatorname);
                        }
            
                        showNOdata.push(dimArr);
                    });

                    console.log(showNOdata);
                }
            });



        }

//用户——集团用户数据加载 (表格加载方法)
function FirstRoomUser($tableUser, $tableUser2) {
            // var $tableUser = $("#Group_tableuser");  Group_table
            //var $tableUser2 = $('#Group_tableuser1'); Group_table1
            //var $tableUser = $("#Group_table");
            //var $tableUser2 = $('#Group_table1');
            var curDate = $("#sel_gather_time").val();
            var curDate1 = $("#sel_gather_time1").val();
            var url1 = null;
            var param1 = null;
            if (readCookie("rolename") == "集团用户") {
                url1 = "/api/AcquisitionApi/getRoomDate";
                param1 = { uid: readCookie("uid"), datetime: curDate, period: curDate1 };
            } else {
                url1 = "/api/AcquisitionApi/getRoomDateAdmin";
                param1 = { roomId: $("#sel_locate").val(), datetime: curDate, period: curDate1 };
            }
   
            $.get(url1, param1, function (data) {
                var data1 = eval('(' + data[0] + ')');
                var data2 = eval('(' + data[1] + ')');
                $tableUser.bootstrapTable('destroy');

                localStorage.clear();  // 清空当前域下的所有localStorage

                // 存储数据
                localStorage.setItem('shouldreport', data1.shouldreport);        
                localStorage.setItem('hasreport', data1.hasreport);
                localStorage.setItem('indicationreportrate', data1.indicationreportrate);
                localStorage.setItem('shoulddata', data1.shoulddata);
                localStorage.setItem('hasdata', data1.hasdata);
                localStorage.setItem('datareportrate', data1.datareportrate);
                //11维度
                localStorage.setItem('B01D01', data2.B01D01);
                localStorage.setItem('B01D01R', data2.B01D01R);
                localStorage.setItem('B01D02', data2.B01D02);
                localStorage.setItem('B01D02R', data2.B01D02R);
                localStorage.setItem('B01D03', data2.B01D03);
                localStorage.setItem('B01D03R', data2.B01D03R);
                localStorage.setItem('B01D04', data2.B01D04);
                localStorage.setItem('B01D04R', data2.B01D04R);
                localStorage.setItem('B01D05', data2.B01D05);
                localStorage.setItem('B01D05R', data2.B01D05R);
                localStorage.setItem('B01D06', data2.B01D06);
                localStorage.setItem('B01D06R', data2.B01D06R);
                localStorage.setItem('B01D07', data2.B01D07);
                localStorage.setItem('B01D07R', data2.B01D07R);
                localStorage.setItem('B01D08', data2.B01D08);
                localStorage.setItem('B01D08R', data2.B01D08R);
                localStorage.setItem('B01D09', data2.B01D09);
                localStorage.setItem('B01D09R', data2.B01D09R);
                localStorage.setItem('B01D10', data2.B01D10);
                localStorage.setItem('B01D10R', data2.B01D10R);
                localStorage.setItem('B01D11', data2.B01D11);
                localStorage.setItem('B01D11R', data2.B01D11R);

          
          
             

                //localStorage.getItem('name');  // 读取数据，返回Shane
           

                $tableUser.bootstrapTable({
                    data: [data1],
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
                    // queryParams: queryParams2, //参数  
                    // queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
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
                    columns: [
                        {field: 'shouldreport', title: '应上报指标个数(个)', sortable: true, halign: 'left'},
                        { field: 'hasreport', title: '已上报指标个数(个)', sortable: true, halign: 'left'},
                        {field: 'indicationreportrate', title: '指标上报完成率(%)', sortable: true, halign: 'left'},
                        {field: 'shoulddata', title: '应上报数据总量(个)', sortable: true, halign: 'left'},
                        {field: 'hasdata', title: '已上报数据总量(个)', sortable: true, halign: 'left'},
                        { field: 'datareportrate', title: '数据上报完成率(%)', sortable: true, halign: 'left' }
                    ]
                }).on('all.bs.table', function (e, name, args) {
                    $('[data-toggle="tooltip"]').tooltip();
                    $('[data-toggle="popover"]').popover();
                });
              
                $tableUser2.bootstrapTable('destroy');
                $tableUser2.bootstrapTable({
                    //url: url,
                    data:[data2],
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
                    // queryParams: queryParams2, //参数  
                    // queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
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
                    columns: [

                        {
                            field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return "未完成指标" + "</br> </br>" + "未完成数据";
                            }
                        },
                        {
                            field: 'B01D01Names', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D01 + "</br> </br>" + row.B01D01R;

                            }
                        },
                        {
                            field: 'B01D02Names', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D02 + "</br> </br>" + row.B01D02R;
                            }
                        },
                        {
                            field: 'B01D03Names', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D03 + "</br> </br>" + row.B01D03R;
                            }
                        },
                        {
                            field: 'B01D04Names', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D04 + "</br> </br>" + row.B01D04R;
                            }
                        },
                        {
                            field: 'B01D05Names', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D05 + "</br> </br>" + row.B01D05R;
                            }
                        },
                        {
                            field: 'B01D06Names', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D06 + "</br> </br>" + row.B01D06R;
                            }
                        },
                        {
                            field: 'B01D07Names', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D07 + "</br> </br>" + row.B01D07R;
                            }
                        },
                        {
                            field: 'B01D08Names', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D08 + "</br> </br>" + row.B01D08R;
                            }
                        },
                        {
                            field: 'B01D09Names', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D09 + "</br> </br>" + row.B01D09R;
                            }
                        },
                        {
                            field: 'B01D10Names', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D10 + "</br> </br>" + row.B01D10R;
                            }
                        },
                        {
                            field: 'B01D11Names', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                                return row.B01D11 + "</br> </br>" + row.B01D11R;
                                //return "-/-" + "</br> </br>" + "-/-";
                            }
                        }

                    ],
                    onClickRow: function (row, $element, field) {
                        if (field == "proname") { return;}
                        $(this).css("cursor", "pointer");
                
                        $("#giveBaddata").empty();
                        var dialogCont = "<ul class='dialogcont'>";
                        var datac = row[field].split(",");
                        for (var o in datac) {
                            dialogCont += "<li>" + datac[o] + "</li>"
                        }
                        dialogCont += "</ul>";
                        $("#giveBaddata").append(dialogCont);

                        $("#roleTitle").text("未上报指标详情");
                        $("#roleDialog").modal("show");
                    }
                }).on('all.bs.table', function (e, name, args) {
                    $('[data-toggle="tooltip"]').tooltip();
                    $('[data-toggle="popover"]').popover();
                });

            });
        }

 //保留2位小数
 function fomatFloat(data, pos) {
            return Math.round(data * Math.pow(10, pos)) / Math.pow(10, pos);
        }
  //获取Cook
 function readCookie(name) {

            var searchName = name + '=';
            var cityid = unescape(document.cookie.split(searchName)[1].split(";")[0]);
            while (cityid.charAt(0) == ' ')
                cityid = cityid.substring(1, cityid.length);
            return decodeURIComponent(cityid);
 }


 // 导出报表
 $('#export_Room').on('click', function (rid) {

     var Datatime = $('#sel_gather_time').val();
     var Dataday = $('#sel_gather_time1').val();
     var DataRoom = $('#sel_locate').find("option:checked").html();

     //var DataRoom1 =  $('#sel_locate').find("option:checked").html();
     ////var ChangeData = DataRoom1.slice(30, 80);

     ////$("select option:checked").attr("id")
   
     //console.log(DataRoom1);
    
     var Excel1 =  localStorage.getItem('shouldreport');
     var Excel2 = localStorage.getItem('hasreport');
     var Excel3 = localStorage.getItem('indicationreportrate');
     var Excel4 = localStorage.getItem('shoulddata');
     var Excel5 = localStorage.getItem('hasdata');
     var Excel6 = localStorage.getItem('datareportrate');

     //11维度
     var B01D01 = localStorage.getItem('B01D01');
     var B01D01R = localStorage.getItem('B01D01R');

     var B01D02 = localStorage.getItem('B01D02');
     var B01D02R = localStorage.getItem('B01D02R');
     var B01D03 = localStorage.getItem('B01D03');
     var B01D03R = localStorage.getItem('B01D03R');
     var B01D04 = localStorage.getItem('B01D04');
     var B01D04R = localStorage.getItem('B01D04R');
     var B01D05 = localStorage.getItem('B01D05');
     var B01D05R = localStorage.getItem('B01D05R');
     var B01D06 = localStorage.getItem('B01D06');
     var B01D06R = localStorage.getItem('B01D06R');
     var B01D07 = localStorage.getItem('B01D07');
     var B01D07R = localStorage.getItem('B01D07R');
     var B01D08 = localStorage.getItem('B01D08');
     var B01D08R = localStorage.getItem('B01D08R');
     var B01D09 = localStorage.getItem('B01D09');
     var B01D09R = localStorage.getItem('B01D09R');
     var B01D10 = localStorage.getItem('B01D10');
     var B01D10R = localStorage.getItem('B01D10R');
     var B01D11 = localStorage.getItem('B01D11');
     var B01D11R = localStorage.getItem('B01D11R');

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



     //com.server.post("/api/AcquisitionApi/Post", JSON.stringify(postlist), function (data) {

     //    if (data != null) {



     //   }


     //});
 });
    
    


      



