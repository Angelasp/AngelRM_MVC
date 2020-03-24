//处室初次加载
function FirstshowRoom(url, queryParams, column) {
    var AcquisitionDataAllNum; //处室选中用户的指标
    var AcquisitionDataAllNumreport; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum;//已上报指标个数(个)
    var AcquisitionDataShowNumreport;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate;
    var ShowNumreportsuccess_rate;

    var AcquisitionDataAllNum2; //处室选中用户的指标
    var AcquisitionDataAllNumreport2; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum2;//已上报指标个数(个)
    var AcquisitionDataShowNumreport2;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate2;
    var ShowNumreportsuccess_rate2;

    var AcquisitionDataAllNum3; //处室选中用户的指标
    var AcquisitionDataAllNumreport3; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum3;//已上报指标个数(个)
    var AcquisitionDataShowNumreport3;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate3;
    var ShowNumreportsuccess_rate3;

    var AcquisitionDataAllNum4; //处室选中用户的指标
    var AcquisitionDataAllNumreport4; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum4;//已上报指标个数(个)
    var AcquisitionDataShowNumreport4;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate4;
    var ShowNumreportsuccess_rate4;

    var AcquisitionDataAllNum5; //处室选中用户的指标
    var AcquisitionDataAllNumreport5; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum5;//已上报指标个数(个)
    var AcquisitionDataShowNumreport5;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate5;
    var ShowNumreportsuccess_rate5;


    var tmpallInd = new Array();//已上报所有指标总数
    var tmpInd = new Array();//11维度指标分类总数


    var Provincesuccess_rate;
    var Provincereportsuccess_rate;

    var tmpProvince = new Array();
    var tmpProvinceshow = new Array();

    var tmpProvince2 = new Array();
    var tmpProvinceshow2 = new Array();

    var tmpProvince3 = new Array();
    var tmpProvinceshow3 = new Array();

    var tmpProvince4 = new Array();
    var tmpProvinceshow4 = new Array();

    var tmpProvince5 = new Array();
    var tmpProvinceshow5 = new Array();

    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();
    var webNum = $("#sel_locate").val();
    var cityval = $("#sel_province").val();
    //管理员用户部分
    //集团页面所有处室数据库读取


    var Idget = new Array();
    var listget211 = { id: 211, DATETIME: '', city: '', rows: '' };
    com.server.get("/api/AcquisitionApi/get", listget211, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                roomNum++;
                Idget.push(data[i].id);
            }


        }
    });

    var listget4 = { id: 4, DATETIME: datetime, city: datetime1, rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget4, function (data) {
        if (data != null) {

            console.log(data[0]["count"]);


            if (AcquisitionDataAllNum == "-") {
                AcquisitionDataShowNum = "-";
            }
            else if (AcquisitionDataAllNum == 0) {
                AcquisitionDataShowNum = "-";
            }
            else {
                AcquisitionDataShowNum = data[0]["count"]

            }


            if (AcquisitionDataAllNum2 == "-") {
                AcquisitionDataShowNum2 = "-";
            }
            else if (AcquisitionDataAllNum2 == 0) {
                AcquisitionDataShowNum2 = "-";
            }
            else {
                AcquisitionDataShowNum2 = data;
            }

            if (AcquisitionDataAllNum3 == "-") {
                AcquisitionDataShowNum3 = "-";
            }
            else if (AcquisitionDataAllNum3 == 0) {
                AcquisitionDataShowNum3 = "-";
            }
            else {
                AcquisitionDataShowNum3 = data;
            }

            if (AcquisitionDataAllNum4 == "-") {
                AcquisitionDataShowNum4 = "-";
            }
            else if (AcquisitionDataAllNum4 == 0) {
                AcquisitionDataShowNum4 = "-";
            }
            else {
                AcquisitionDataShowNum4 = data;
            }

            if (AcquisitionDataAllNum5 == "-") {
                AcquisitionDataShowNum5 = "-";
            }
            else if (AcquisitionDataAllNum5 == 0) {
                AcquisitionDataShowNum5 = "-";
            }
            else {
                AcquisitionDataShowNum5 = data;
            }

        }
        else {
            AcquisitionDataAllNum = "-";
            AcquisitionDataAllNumreport = "-";

            AcquisitionDataAllNum2 = "-";
            AcquisitionDataAllNumreport2 = "-";

            AcquisitionDataAllNum3 = "-";
            AcquisitionDataAllNumreport3 = "-";

            AcquisitionDataAllNum4 = "-";
            AcquisitionDataAllNumreport4 = "-";

            AcquisitionDataAllNum5 = "-";
            AcquisitionDataAllNumreport5 = "-";

        }



    });

    for (var j = 0; j < roomNum; j++) {
        //  debugger;

        if (j == 0) {

            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {
                    AcquisitionDataAllNum = data;
                    AcquisitionDataAllNumreport = AcquisitionDataAllNum * 32;
                }
                else {
                    AcquisitionDataAllNum = "-";
                    AcquisitionDataAllNumreport = "-";
                }
            });
            var listget4 = { id: 4, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget4, function (data) {
                if (data != null) {

                    console.log(data[0]["count"]);


                    if (AcquisitionDataAllNum == "-") {
                        AcquisitionDataShowNum = "-";
                    }
                    else if (AcquisitionDataAllNum == 0) {
                        AcquisitionDataShowNum = "-";
                    }
                    else {
                        AcquisitionDataShowNum = data[0]["count"]

                    }


                }
                else {
                    AcquisitionDataAllNum = "-";
                    AcquisitionDataAllNumreport = "-";


                }



            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum == "-") {
                        AcquisitionDataShowNumreport = "-"
                        ShowNumsuccess_rate = "-";
                        ShowNumreportsuccess_rate = "-";
                        $("#succeed1").html("-");
                    }
                    else if (AcquisitionDataAllNum == 0) {
                        AcquisitionDataShowNumreport = "-"
                        ShowNumsuccess_rate = "-";
                        ShowNumreportsuccess_rate = "-";
                        $("#succeed1").html("-");
                    }
                    else {

                        AcquisitionDataShowNumreport = data[0]["count"]
                        ShowNumsuccess_rate = fomatFloat(AcquisitionDataShowNum / AcquisitionDataAllNum * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate = fomatFloat(AcquisitionDataShowNumreport / AcquisitionDataAllNumreport * 100, 2);
                        if (ShowNumreportsuccess_rate > 100) {
                            $("#succeed1").html("-");
                        }
                        else {

                            $("#succeed1").html(fomatFloat(ShowNumreportsuccess_rate, 0));
                        }
                    }
                }
            });


            var allNumGet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var allNumGetID = ["B01D01", "B01D02", "B01D03", "B01D04", "B01D05", "B01D06", "B01D07", "B01D08", "B01D09", " B01D010", "B01D011"];

            var listget511 = { id: 511, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            //分处室已上报指标数
            com.server.get("/api/AcquisitionApi/get", listget511, function (data) {
                if (data != null) {
                    for (var j = 0; j < data.length; j++) {
                        for (i = 0; i < allNumGetID.length; i++) {

                            if (data[j].name == allNumGetID[i]) {
                                allNumGet[i] = data[j].number;
                            }

                        }
                    }

                    console.log(allNumGet);

                }

            });

            var listget512 = { id: 512, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget512, function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        tmpProvinceshow.push(data[i].alldata);
                    }
                }
            });


            var allNumsuc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var allNumsucID = ["B01D01", "B01D02", "B01D03", "B01D04", "B01D05", "B01D06", "B01D07", "B01D08", "B01D09", " B01D010", "B01D011"];



            //拿取11维度已上报指标数据
            var listget10 = { id: 10, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget10, function (data) {
                if (data != null) {
                    for (var j = 0; j < data.length; j++) {
                        for (i = 0; i < allNumsucID.length; i++) {

                            if (data[j].idname == allNumsucID[i]) {
                                allNumsuc[i] = data[j].number;

                            }


                        }


                    }



                }

            });

            var tmpProvinceNum = 11 - tmpProvince.length;
            var tmpProvinceshowNum = 11 - tmpProvinceshow.length;
            var tmpProvincenoNum;

            for (var i = 0; i < tmpProvinceNum; i++) {
                tmpProvince.push(0);
            }
            for (var i = 0; i < tmpProvinceshowNum; i++) {
                tmpProvinceshow.push(0);
            }
            for (var i = 0; i < 12; i++) {
                if (allNumGet[i] - tmpProvinceshow[i] <= 0) {
                    tmpIndnumbad.push(0);
                }
                else {
                    tmpIndnumbad.push(allNumGet[i] - tmpProvinceshow[i]);
                }
            }

            var tmpnoIndNum = 11 - tmpInd.length;
            var tmpIndnumNum = 11 - tmpIndnum.length;
            for (var i = 0; i < tmpnoIndNum; i++) {
                tmpInd.push(0);
            }
            for (var i = 0; i < tmpIndnumNum; i++) {
                tmpIndnum.push(0);
            }
            for (var i = 0; i < 12; i++) {
                if (tmpInd[i] == 0) {
                    tmpIndnum[i] == 0;
                }
                if (tmpInd[i] - tmpIndnum[i] <= 0) {
                    tmpIndnumbad2.push(0);
                }
                else {
                    tmpIndnumbad2.push(tmpInd[i] - tmpIndnum[i]);
                }


            }
        }
        else if (j == 1) {


            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {
                    AcquisitionDataAllNum2 = data;


                    AcquisitionDataAllNumreport2 = AcquisitionDataAllNum2 * 32;
                }
                else {
                    AcquisitionDataAllNum2 = "-";
                    AcquisitionDataAllNumreport2 = "-";
                }
            });

            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };

            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum2 == "-") {
                        AcquisitionDataShowNumreport2 = "-"
                        ShowNumsuccess_rate2 = "-";
                        ShowNumreportsuccess_rate2 = "-";
                        $("#succeed2").html("-");
                    }
                    else if (AcquisitionDataAllNum2 == 0) {
                        AcquisitionDataShowNumreport2 = "-"
                        ShowNumsuccess_rate2 = "-";
                        ShowNumreportsuccess_rate2 = "-";
                        $("#succeed2").html("-");

                    }

                    else {
                        AcquisitionDataShowNumreport2 = data[0]["count"]

                        ShowNumsuccess_rate2 = fomatFloat(AcquisitionDataShowNum2 / AcquisitionDataAllNum2 * 100, 2);

                        ShowNumreportsuccess_rate2 = fomatFloat(AcquisitionDataShowNumreport2 / AcquisitionDataAllNumreport2 * 100, 2);


                        if (ShowNumreportsuccess_rate2 > 100) {
                            $("#succeed2").html("-");
                        }
                        else {

                            $("#succeed2").html(fomatFloat(ShowNumreportsuccess_rate2, 0));
                        }

                    }
                }
            });

        }
        else if (j == 2) {


            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[2] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {

                    AcquisitionDataAllNum3 = data;
                    AcquisitionDataAllNumreport3 = AcquisitionDataAllNum3 * 32;

                }
                else {
                    AcquisitionDataAllNum3 = "-";
                    AcquisitionDataAllNumreport3 = "-";
                }
            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum3 == "-", AcquisitionDataAllNum3 == 0) {
                        AcquisitionDataShowNumreport3 = "-"
                        ShowNumsuccess_rate3 = "-";
                        ShowNumreportsuccess_rate3 = "-";
                        $("#succeed3").html("-");

                    }
                    else {
                        AcquisitionDataShowNumreport3 = data[0]["count"];

                        ShowNumsuccess_rate3 = fomatFloat(AcquisitionDataShowNum3 / AcquisitionDataAllNum3 * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate3 = fomatFloat(AcquisitionDataShowNumreport3 / AcquisitionDataAllNumreport3 * 100, 2);

                        if (ShowNumreportsuccess_rate3 > 100) {
                            $("#succeed3").html("-");
                        }
                        else {

                            $("#succeed3").html(fomatFloat(ShowNumreportsuccess_rate3, 0));
                        }
                    }


                }
            });

        }
        else if (j == 3) {

            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {
                    AcquisitionDataAllNum4 = data;
                    AcquisitionDataAllNumreport4 = AcquisitionDataAllNum4 * 32;
                }
                else {
                    AcquisitionDataAllNum4 = "-";
                    AcquisitionDataAllNumreport4 = "-";
                }
            });

            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum4 == "-") {
                        AcquisitionDataShowNumreport4 = "-"
                        ShowNumsuccess_rate4 = "-";
                        ShowNumreportsuccess_rate4 = "-";
                        $("#succeed4").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport4 = data[0]["count"];
                        ShowNumsuccess_rate4 = fomatFloat(AcquisitionDataShowNum4 / AcquisitionDataAllNum4 * 100, 2);
                        ShowNumreportsuccess_rate4 = fomatFloat(AcquisitionDataShowNumreport4 / AcquisitionDataAllNumreport4 * 100, 2);



                        if (ShowNumreportsuccess_rate4 > 100) {
                            $("#succeed4").html("-");
                        }
                        else {

                            $("#succeed4").html(fomatFloat(ShowNumreportsuccess_rate4, 0));
                        }
                    }
                }
            });

        }
        else if (j == 4) {
            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {
                    AcquisitionDataAllNum5 = data;
                    AcquisitionDataAllNumreport5 = AcquisitionDataAllNum5 * 32;
                }
                else {
                    AcquisitionDataAllNum5 = "-";
                    AcquisitionDataAllNumreport5 = "-";
                }
            });

            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum5 == "-") {
                        AcquisitionDataShowNumreport5 = "-"
                        ShowNumsuccess_rate5 = "-";
                        ShowNumreportsuccess_rate5 = "-";
                        $("#succeed5").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport5 = data[0]["count"];
                        ShowNumsuccess_rate5 = fomatFloat(AcquisitionDataShowNum5 / AcquisitionDataAllNum5 * 100, 2);
                        ShowNumreportsuccess_rate5 = fomatFloat(AcquisitionDataShowNumreport5 / AcquisitionDataAllNumreport5 * 100, 2);

                        if (ShowNumreportsuccess_rate5 > 100) {
                            $("#succeed5").html("-");
                        }
                        else {

                            $("#succeed5").html(fomatFloat(ShowNumreportsuccess_rate5, 0));
                        }
                    }
                }
            });

        }

    }


    var $table = $('#Group_table');

    var url = '/api/AcquisitionApi/get';
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });

    if (AcquisitionDataAllNum == "-") {

        $table.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }

                },
                {
                    field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'date_time', title: '指标上报完成率（%）', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-%";
                    }
                },
                {
                    field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '数据上报完成率（%）', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-%";
                    }
                }

            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });


        var $table2 = $('#Group_table1');
        var url = '/api/AcquisitionApi/get';
        $(document).on('focus', 'input[type="text"]', function () {
            $(this).parent().find('label').addClass('active');
        }).on('blur', 'input[type="text"]', function () {
            if ($(this).val() == '') {
                $(this).parent().find('label').removeClass('active');
            }
        });

        function queryParams2(params) {  //配置参数

            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                id: 15,
                DATETIME: "2017-01",
                city: "",
                rows: "",


            };
            return temp;
        }


        $table2.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "未完成指标" + "</br> </br>" + "未完成数据";
                    }
                },
                {
                    field: '0', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";

                    }
                },
                {
                    field: '1', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '2', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '3', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '4', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '5', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '6', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '7', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '8', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '9', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: '10', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        //return allNumGet[10]-tmpProvinceshow[10] + "/" + allNumGet[10];
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                }

            ],
            onClickRow: function (row, $element, field) {

                $(this).css("cursor", "pointer");
                $("#giveBaddata").empty();
                var data = showNOdata[field];
                var dialogCont = "<ul class='dialogcont'>";
                for (var o in data) {
                    dialogCont += "<li>" + data[o] + "</li>"
                }
                dialogCont += "</ul>"


                $("#roleDialog").find('label').addClass('active');

                $("#giveBaddata").append(dialogCont);

                $("#roleTitle").text("未上报指标详情");
                $("#save_role").attr("name", "edit");

                $("#roleDialog").modal("show");




            }
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();


        });


    }
    else {

        $table.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataAllNum;
                    }

                },
                {
                    field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataShowNum;
                    }
                },
                {
                    field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ShowNumsuccess_rate + "%";
                    }
                },
                {
                    field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataAllNumreport;
                    }
                },
                {
                    field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataShowNumreport;
                    }
                },
                {
                    field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ShowNumreportsuccess_rate + "%";
                    }
                }

                //,
                //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });

        var $table2 = $('#Group_table1');
        var url = '/api/AcquisitionApi/get';
        $(document).on('focus', 'input[type="text"]', function () {
            $(this).parent().find('label').addClass('active');
        }).on('blur', 'input[type="text"]', function () {
            if ($(this).val() == '') {
                $(this).parent().find('label').removeClass('active');
            }
        });

        function queryParams2(params) {  //配置参数

            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                id: 15,
                DATETIME: "2017-01",
                city: "",
                rows: "",


            };
            return temp;
        }


        $table2.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [

                {
                    field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "未完成指标" + "</br> </br>" + "未完成数据";
                    }
                },
                {
                    field: '0', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[0] - allNumsuc[0]) + "/" + tmpProvinceshow[0]) + "</br> </br>" + ((tmpProvinceshow[0] * 32 - allNumGet[0]) + "/" + tmpProvinceshow[0] * 32);

                    }
                },
                {
                    field: '1', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[1] - allNumsuc[1]) + "/" + tmpProvinceshow[1]) + "</br> </br>" + ((tmpProvinceshow[1] * 32 - allNumGet[1]) + "/" + tmpProvinceshow[1] * 32);
                    }
                },
                {
                    field: '2', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[2] - allNumsuc[2]) + "/" + tmpProvinceshow[2]) + "</br> </br>" + ((tmpProvinceshow[2] * 32 - allNumGet[2]) + "/" + tmpProvinceshow[2] * 32);
                    }
                },
                {
                    field: '3', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[3] - allNumsuc[3]) + "/" + tmpProvinceshow[3]) + "</br> </br>" + ((tmpProvinceshow[3] * 32 - allNumGet[3]) + "/" + tmpProvinceshow[3] * 32);
                    }
                },
                {
                    field: '4', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[4] - allNumsuc[4]) + "/" + tmpProvinceshow[4]) + "</br> </br>" + ((tmpProvinceshow[4] * 32 - allNumGet[4]) + "/" + tmpProvinceshow[4] * 32);
                    }
                },
                {
                    field: '5', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[5] - allNumsuc[5]) + "/" + tmpProvinceshow[5]) + "</br> </br>" + ((tmpProvinceshow[5] * 32 - allNumGet[5]) + "/" + tmpProvinceshow[5] * 32);
                    }
                },
                {
                    field: '6', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[6] - allNumsuc[6]) + "/" + tmpProvinceshow[6]) + "</br> </br>" + ((tmpProvinceshow[6] * 32 - allNumGet[6]) + "/" + tmpProvinceshow[6] * 32);
                    }
                },
                {
                    field: '7', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[7] - allNumsuc[7]) + "/" + tmpProvinceshow[7]) + "</br> </br>" + ((tmpProvinceshow[7] * 32 - allNumGet[7]) + "/" + tmpProvinceshow[7] * 32);
                    }
                },
                {
                    field: '8', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[8] - allNumsuc[8]) + "/" + tmpProvinceshow[8]) + "</br> </br>" + ((tmpProvinceshow[8] * 32 - allNumGet[8]) + "/" + tmpProvinceshow[8] * 32);
                    }
                },
                {
                    field: '9', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[9] - allNumsuc[9]) + "/" + tmpProvinceshow[9]) + "</br> </br>" + ((tmpProvinceshow[9] * 32 - allNumGet[9]) + "/" + tmpProvinceshow[9] * 32);
                    }
                },
                {
                    field: '10', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((tmpProvinceshow[10] - allNumsuc[10]) + "/" + tmpProvinceshow[10]) + "</br> </br>" + ((tmpProvinceshow[10] * 32 - allNumGet[10]) + "/" + tmpProvinceshow[10] * 32);
                        //return "-/-" + "</br> </br>" + "-/-";
                    }
                }

            ],
            onClickRow: function (row, $element, field) {
                if (field == "proname") { return; }
                $(this).css("cursor", "pointer");
                $("#giveBaddata").empty();
                var data = showNOdata[field];
                var dialogCont = "<ul class='dialogcont'>";
                for (var o in data) {
                    dialogCont += "<li>" + data[o] + "</li>"
                }
                dialogCont += "</ul>"


                $("#roleDialog").find('label').addClass('active');

                $("#giveBaddata").append(dialogCont);

                $("#roleTitle").text("未上报指标详情");
                $("#save_role").attr("name", "edit");

                $("#roleDialog").modal("show");




            }
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();

        });
    }


}

//用户——省公司用户数据加载
function FirstProUser() {
    var $tableUser = $("#Group_tableuser");
    var $tableUser2 = $('#Group_tableuser1');
    var curDate = $("#sel_gather_time").val();
    var curDate1 = $("#sel_gather_time1").val();
    var url1 = "/api/AcquisitionApi/getProvinceDate";
    var param1 = { uid: readCookie("uid"), datetime: curDate, period: curDate1 };
}

//用户初次加载省公司数据
function FirstProUser1(url, queryParams, column) {
    var AcquisitionDataAllNum; //处室选中用户的指标
    var AcquisitionDataAllNumreport; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum;//已上报指标个数(个)
    var AcquisitionDataShowNumreport;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate;
    var ShowNumreportsuccess_rate;

    var AcquisitionDataAllNum2; //处室选中用户的指标
    var AcquisitionDataAllNumreport2; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum2;//已上报指标个数(个)
    var AcquisitionDataShowNumreport2;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate2;
    var ShowNumreportsuccess_rate2;

    var AcquisitionDataAllNum3; //处室选中用户的指标
    var AcquisitionDataAllNumreport3; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum3;//已上报指标个数(个)
    var AcquisitionDataShowNumreport3;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate3;
    var ShowNumreportsuccess_rate3;

    var AcquisitionDataAllNum4; //处室选中用户的指标
    var AcquisitionDataAllNumreport4; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum4;//已上报指标个数(个)
    var AcquisitionDataShowNumreport4;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate4;
    var ShowNumreportsuccess_rate4;

    var AcquisitionDataAllNum5; //处室选中用户的指标
    var AcquisitionDataAllNumreport5; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum5;//已上报指标个数(个)
    var AcquisitionDataShowNumreport5;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate5;
    var ShowNumreportsuccess_rate5;

    var ProvinceDataAllNum; //省份选中用户的指标
    var ProvinceDataAllNumreport; //省份所有用户的应上报数据总量（个）  就是省份所有用户的指标*32

    var ProvinceDataShowNum;//已上报指标个数(个)
    var ProvinceDataShowNumreport;//省份选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var tmpallInd = new Array();//已上报所有指标总数
    var tmpInd = new Array();//11维度指标分类总数


    var Provincesuccess_rate;
    var Provincereportsuccess_rate;

    var tmpProvince = new Array();
    var tmpProvinceshow = new Array();

    var tmpProvince2 = new Array();
    var tmpProvinceshow2 = new Array();

    var tmpProvince3 = new Array();
    var tmpProvinceshow3 = new Array();

    var tmpProvince4 = new Array();
    var tmpProvinceshow4 = new Array();

    var tmpProvince5 = new Array();
    var tmpProvinceshow5 = new Array();

    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();
    var webNum = $("#sel_locate").val();
    var cityval = $("#sel_province").val();

    //省份部分
    var ProvinceDataAllNum; //省份选中用户的指标
    var ProvinceDataAllNumreport; //省份所有用户的应上报数据总量（个）  就是省份所有用户的指标*32

    var ProvinceDataShowNum;//已上报指标个数(个)
    var ProvinceDataShowNumreport;//省份选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var Provincesuccess_rate;//指标个数上报完成率
    var Provincereportsuccess_rate;//指标总数上报完成率

    var alltmpProvince = new Array();//分类指标总数
    var alltmpProvinceshow = new Array();//分类已上报指标总数

    var tmpallIndProvince = new Array();//已上报所有指标总数
    var tmpIndProvince = new Array();
    var tmpIndProvince = new Array();//11维度指标分类总数

    chart1_tab4_load_province("chart1_tab4_gn", "2017");

    function queryParams2(params) {  //配置参数

        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            id: 15,
            DATETIME: "2017-01",
            city: "",
            rows: "",


        };
        return temp;
    }

    var listget6 = { id: 6, DATETIME: datetime, city: "江苏", rows: "" };
    com.server.get("/api/AcquisitionApi/get", listget6, function (data) {
        if (data != null) {
            ProvinceDataAllNum = data;

            ProvinceDataAllNumreport = ProvinceDataAllNum * 32;


        }
        else if (ProvinceDataAllNum == 0) {
            ProvinceDataAllNum == "-";
            ProvinceDataAllNumreport = "-";
        }
        else {
            ProvinceDataAllNum = "-";
            ProvinceDataAllNumreport = "-";

        }
    });
    if (ProvinceDataAllNum == 0) {

        ProvinceDataAllNum = "-";
    }
    var listget7 = { id: 7, DATETIME: datetime, city: "江苏", rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget7, function (data) {
        if (data != null) {
            if (ProvinceDataAllNum == "-") {
                ProvinceDataShowNum = "-";
            }
            else if (ProvinceDataAllNum == 0) {
                ProvinceDataAllNum == "-";
                ProvinceDataAllNumreport = "-";
                ProvinceDataShowNum = "-";
            }

            else {
                ProvinceDataShowNum = data;
            }
        }
        else {
            ProvinceDataShowNumt = "-";
            ProvinceDataShowNumreport = "-";
        }
    });

    if (ProvinceDataAllNumreport == 0) {

        ProvinceDataAllNumreport = "-";
    }

    var listget8 = { id: 8, DATETIME: datetime, city: "江苏", rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget8, function (data) {
        if (data != null) {
            if (ProvinceDataAllNum == "-") {
                ProvinceDataShowNumreport = "-"
                Provincesuccess_rate = "-";
                Provincereportsuccess_rate = "-";
                //$("#succeed5").html("-");


            }
            else if (ProvinceDataAllNum == 0) {
                ProvinceDataAllNum == "-";
                ProvinceDataShowNumreport = "-"
                Provincesuccess_rate = "-";
                Provincereportsuccess_rate = "-";
                ProvinceDataShowNum = "-";


            }

            else {
                ProvinceDataShowNumreport = data[0]["count"];

                Provincesuccess_rate = fomatFloat(ProvinceDataShowNum / ProvinceDataAllNum * 100, 2);
                Provincereportsuccess_rate = fomatFloat(ProvinceDataShowNumreport / ProvinceDataAllNumreport * 100, 2);
                //$("#Prosucceed").html(fomatFloat(Provincereportsuccess_rate, 0));
            }
        }
    });



    var listget611 = { id: 611, DATETIME: datetime, city: "江苏", rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget611, function (data) {
        if (data != null) {

            for (var i = 0; i < data.length; i++) {

                alltmpProvince.push(data[i].indicatorid1);

            }

        }
    });

    var listget612 = { id: 612, DATETIME: datetime, city: "江苏", rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget612, function (data) {
        if (data != null) {

            for (var i = 0; i < data.length; i++) {

                alltmpProvinceshow.push(data[i].reportcnt);

            }

        }
    });

    var cityCount;
    var listget12 = { id: 12, DATETIME: datetime, city: '江苏', rows: '' };
    com.server.get("/api/AcquisitionApi/get", listget12, function (data) {
        if (data != null) {

            cityCount = data[0].count
        }
    });

    var listget11 = { id: 11, DATETIME: datetime, city: '江苏', rows: datetime1 };
    com.server.get("/api/AcquisitionApi/get", listget11, function (data) {
        if (data != null) {

            tmpallIndProvince.push(data.length);

            var newObj = _.groupBy(data, 'indicatorTableName');

            _.forEach(newObj, function (itemArr) {
                var tmpnoInd = new Array();
                tmpIndProvince.push(itemArr.length);
                var sum = 0;
                for (var i = 0; i < itemArr.length; i++) {
                    if (itemArr[i].reportcnt != cityCount) {

                        tmpnoInd.push(itemArr[i].indicatorname);
                        sum++;
                    }



                }
                tmpIndnumProvince.push(sum);
                tmpnoIndNextProvince.push(tmpnoInd);

            });


            console.log(tmpIndnumProvince);
            console.log(tmpnoIndNextProvince);
        }
    });


    var tmpIndnumbadProvince = new Array();

    var tmpnoIndNum22 = 11 - alltmpProvince.length;

    var tmpIndnumNum22 = 11 - alltmpProvinceshow.length;

    for (var i = 0; i < tmpnoIndNum22; i++) {

        alltmpProvince.push(0);
    }

    for (var i = 0; i < tmpIndnumNum22; i++) {
        alltmpProvinceshow.push(0);

    }
    for (var i = 0; i < 12; i++) {
        if (allallNumGet[i] == 0) {

            alltmpProvinceshow[i] == 0;
        }
        else if (alltmpProvinceshow[i] < allallNumGet[i]) {
            alltmpProvinceshow[i] = allallNumGet[i];

        }

        if (allallNumGet[i] - alltmpProvinceshow[i] <= 0) {

            tmpIndnumbadProvince.push(0);
        } else {

            tmpIndnumbadProvince.push(allallNumGet[i] - alltmpProvinceshow[i]);
        }


    }

    var tmpProvinceNum33 = 11 - tmpIndProvince.length;

    var tmpProvinceshowNum33 = 11 - tmpIndnumProvince.length;

    var tmpProvincenoNum33 = new Array();


    for (var i = 0; i < tmpProvinceNum33; i++) {

        tmpIndProvince.push(0);
    }

    for (var i = 0; i < tmpProvinceshowNum33; i++) {
        tmpIndnumProvince.push(0);

    }

    for (var i = 0; i < 12; i++) {


        if (tmpIndProvince[i] - tmpIndnumProvince[i] <= 0) {

            tmpProvincenoNum33.push(0);
        }
        else {

            tmpProvincenoNum33.push(tmpIndProvince[i] - tmpIndnumProvince[i]);
        }


    }

    //省公司界面部分


    function queryParams_pro2(params) {  //配置参数

        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            id: 15,
            DATETIME: "2017-01",
            city: "",
            rows: "",


        };
        return temp;
    }



    $("#userName").html("用户属性：" + Rolename + "&nbsp&nbsp&nbsp 归属处室/省份：" + Uname);


    $('#showGroupuser').remove();
    $("#Groupuser").append(" <div id=\"showGroupuser\"><table id=\"Group_tableuser\"></table></div>");
    var $table = $('#Group_table');

    $('#showGroupuser1').remove();
    $("#Groupuser1").append(" <div id=\"showGroupuser1\"><table id=\"Group_tableuser1\"></table></div>");
    //如果是省公司用户，则用户界面调用省公司界面数据
    var $tableUser = $('#Group_tableuser');
    var url = '/api/AcquisitionApi/get';
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });

    var $tableUser2 = $('#Group_tableuser1');
    var url = '/api/AcquisitionApi/get';
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });
    function queryParams_pro2(params) {  //配置参数

        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            id: 15,
            DATETIME: "2017-01",
            city: "",
            rows: "",


        };
        return temp;
    }

    function queryParams_pro1(params) {  //配置参数

        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            id: 15,
            DATETIME: "2017-01",
            city: "",
            rows: "",


        };
        return temp;
    }

    if (ProvinceDataAllNum == "-") {
        $tableUser.bootstrapTable({
            url: url,
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
            queryParams: queryParams_pro1, //参数  
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
            columns: [
                {
                    field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left',
                    formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-%";
                    }
                },
                {
                    field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-%";
                    }
                }

            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });

        $table2.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "未完成指标" + "</br> </br>" + "未完成数据";
                    }
                },
                {
                    field: 'cityname', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";

                    }
                },
                {
                    field: 'date_time', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'legitimacy_score', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'total_score', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'date_time', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'legitimacy_score', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'total_score', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        //return allNumGet[10]-tmpProvinceshow[10] + "/" + allNumGet[10];
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                }
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });

    }
    else {

        $tableUser.bootstrapTable({
            url: url,
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
            queryParams: queryParams_pro1, //参数  
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
            columns: [
                {
                    field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left',
                    formatter: function (value, row, index) {
                        return ProvinceDataAllNum;
                    }
                },
                {
                    field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ProvinceDataShowNum;
                    }
                },
                {
                    field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return Provincesuccess_rate + "%";
                    }
                },
                {
                    field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ProvinceDataAllNumreport;
                    }
                },
                {
                    field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ProvinceDataShowNumreport;
                    }
                },
                {
                    field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return Provincereportsuccess_rate + "%";
                    }
                }

                //,
                //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });

        $tableUser2.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "未完成指标" + "</br> </br>" + "未完成数据";
                    }
                },
                {
                    field: '0', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[0] - tmpIndnumProvince[0]) + "/" + alltmpProvinceshow[0]) + "</br> </br>" + ((alltmpProvinceshow[0] * 32 - allallNumGet[0]) + "/" + alltmpProvinceshow[0] * 32);

                    }
                },
                {
                    field: '1', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[1] - tmpIndnumProvince[1]) + "/" + alltmpProvinceshow[1]) + "</br> </br>" + ((alltmpProvinceshow[1] * 32 - allallNumGet[1]) + "/" + alltmpProvinceshow[1] * 32);
                    }
                },
                {
                    field: '2', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[2] - tmpIndnumProvince[2]) + "/" + alltmpProvinceshow[2]) + "</br> </br>" + ((alltmpProvinceshow[2] * 32 - allallNumGet[2]) + "/" + alltmpProvinceshow[2] * 32);
                    }
                },
                {
                    field: '3', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[3] - tmpIndnumProvince[3]) + "/" + alltmpProvinceshow[3]) + "</br> </br>" + ((alltmpProvinceshow[3] * 32 - allallNumGet[3]) + "/" + alltmpProvinceshow[3] * 32);
                    }
                },
                {
                    field: '4', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[4] - tmpIndnumProvince[4]) + "/" + alltmpProvinceshow[4]) + "</br> </br>" + ((alltmpProvinceshow[4] * 32 - allallNumGet[4]) + "/" + alltmpProvinceshow[4] * 32);
                    }
                },
                {
                    field: '5', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[5] - tmpIndnumProvince[5]) + "/" + alltmpProvinceshow[5]) + "</br> </br>" + ((alltmpProvinceshow[5] * 32 - allallNumGet[5]) + "/" + alltmpProvinceshow[5] * 32);
                    }
                },
                {
                    field: '6', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[6] - tmpIndnumProvince[6]) + "/" + alltmpProvinceshow[6]) + "</br> </br>" + ((alltmpProvinceshow[6] * 32 - allallNumGet[6]) + "/" + alltmpProvinceshow[6] * 32);
                    }
                },
                {
                    field: '7', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[7] - tmpIndnumProvince[7]) + "/" + alltmpProvinceshow[7]) + "</br> </br>" + ((alltmpProvinceshow[7] * 32 - allallNumGet[7]) + "/" + alltmpProvinceshow[7] * 32);
                    }
                },
                {
                    field: '8', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[8] - tmpIndnumProvince[8]) + "/" + alltmpProvinceshow[8]) + "</br> </br>" + ((alltmpProvinceshow[8] * 32 - allallNumGet[8]) + "/" + alltmpProvinceshow[8] * 32);
                    }
                },
                {
                    field: '9', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[9] - tmpIndnumProvince[9]) + "/" + alltmpProvinceshow[9]) + "</br> </br>" + ((alltmpProvinceshow[9] * 32 - allallNumGet[9]) + "/" + alltmpProvinceshow[9] * 32);
                    }
                },
                {
                    field: '10', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ((alltmpProvinceshow[10] - tmpIndnumProvince[10]) + "/" + alltmpProvinceshow[10]) + "</br> </br>" + ((alltmpProvinceshow[10] * 32 - allallNumGet[10]) + "/" + alltmpProvinceshow[10] * 32);
                        //return "-/-" + "</br> </br>" + "-/-";
                    }
                }


            ],
            onClickRow: function (row, $element, field) {

                $(this).css("cursor", "pointer");
                $("#giveBaddata").empty();
                var data = showNOdata[field];
                var dialogCont = "<ul class='dialogcont'>";
                for (var o in data) {
                    dialogCont += "<li>" + data[o] + "</li>"
                }
                dialogCont += "</ul>"


                $("#roleDialog").find('label').addClass('active');

                $("#giveBaddata").append(dialogCont);

                $("#roleTitle").text("未上报指标详情");
                $("#save_role").attr("name", "edit");

                $("#roleDialog").modal("show");




            }
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });
    }


}

//处室选择时间加载
function ClickshowRoom(url, queryParams, column) {
    var AcquisitionDataAllNum; //处室选中用户的指标
    var AcquisitionDataAllNumreport; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum;//已上报指标个数(个)
    var AcquisitionDataShowNumreport;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate;
    var ShowNumreportsuccess_rate;

    var AcquisitionDataAllNum2; //处室选中用户的指标
    var AcquisitionDataAllNumreport2; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum2;//已上报指标个数(个)
    var AcquisitionDataShowNumreport2;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate2;
    var ShowNumreportsuccess_rate2;

    var AcquisitionDataAllNum3; //处室选中用户的指标
    var AcquisitionDataAllNumreport3; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum3;//已上报指标个数(个)
    var AcquisitionDataShowNumreport3;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate3;
    var ShowNumreportsuccess_rate3;

    var AcquisitionDataAllNum4; //处室选中用户的指标
    var AcquisitionDataAllNumreport4; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum4;//已上报指标个数(个)
    var AcquisitionDataShowNumreport4;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate4;
    var ShowNumreportsuccess_rate4;

    var AcquisitionDataAllNum5; //处室选中用户的指标
    var AcquisitionDataAllNumreport5; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum5;//已上报指标个数(个)
    var AcquisitionDataShowNumreport5;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate5;
    var ShowNumreportsuccess_rate5;

    var AcquisitionDataAllNum6; //处室选中用户的指标
    var AcquisitionDataAllNumreport6; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum6;//已上报指标个数(个)
    var AcquisitionDataShowNumreport6;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate6;
    var ShowNumreportsuccess_rate6;




    var Provincesuccess_rate;
    var Provincereportsuccess_rate;

    var tmpProvince = new Array();
    var tmpProvinceshow = new Array();

    var tmpProvince2 = new Array();
    var tmpProvinceshow2 = new Array();

    var tmpProvince3 = new Array();
    var tmpProvinceshow3 = new Array();

    var tmpProvince4 = new Array();
    var tmpProvinceshow4 = new Array();

    var tmpProvince5 = new Array();
    var tmpProvinceshow5 = new Array();

    var tmpIndnumonclick = new Array();

    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();
    var webNum = $("#sel_locate").val();

    //管理员用户部分
    //集团页面所有处室数据库读取
    var Idget = new Array();
    var listget211 = { id: 211, DATETIME: '', city: '', rows: '' };
    com.server.get("/api/AcquisitionApi/get", listget211, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                roomNum++;
                Idget.push(data[i].id);
            }


        }
    });


    var listget3 = { id: 3, DATETIME: datetime, city: "", rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
        if (data != null) {

            AcquisitionDataAllNum6 = data;
            AcquisitionDataAllNumreport6 = AcquisitionDataAllNum6 * 32;

        }
        else {
            AcquisitionDataAllNum6 = "-";
            AcquisitionDataAllNumreport6 = "-";
        }
    });

    var listget4 = { id: 4, DATETIME: datetime, city: datetime1, rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget4, function (data) {
        if (data != null) {
            if (AcquisitionDataAllNum == "-") {
                AcquisitionDataShowNum = "-";
            }
            else if (AcquisitionDataAllNum == 0) {
                AcquisitionDataShowNum = "-";
            }
            else {
                AcquisitionDataShowNum = data[0]["count"];
            }


            if (AcquisitionDataAllNum2 == "-") {
                AcquisitionDataShowNum2 = "-";
            }
            else if (AcquisitionDataAllNum2 == 0) {
                AcquisitionDataShowNum2 = "-";
            }
            else {
                AcquisitionDataShowNum2 = data[0]["count"];;
            }

            if (AcquisitionDataAllNum3 == "-") {
                AcquisitionDataShowNum3 = "-";
            }
            else if (AcquisitionDataAllNum3 == 0) {
                AcquisitionDataShowNum3 = "-";
            }
            else {
                AcquisitionDataShowNum3 = data[0]["count"];;
            }

            if (AcquisitionDataAllNum4 == "-") {
                AcquisitionDataShowNum4 = "-";
            }
            else if (AcquisitionDataAllNum4 == 0) {
                AcquisitionDataShowNum4 = "-";
            }
            else {
                AcquisitionDataShowNum4 = data[0]["count"];;
            }

            if (AcquisitionDataAllNum5 == "-") {
                AcquisitionDataShowNum5 = "-";
            }
            else if (AcquisitionDataAllNum5 == 0) {
                AcquisitionDataShowNum5 = "-";
            }
            else {
                AcquisitionDataShowNum5 = data[0]["count"];;
            }

            if (AcquisitionDataAllNum6 == "-") {
                AcquisitionDataShowNum6 = "-";
            }
            else if (AcquisitionDataAllNum6 == 0) {
                AcquisitionDataShowNum6 = "-";
            }
            else {
                AcquisitionDataShowNum6 = data[0]["count"];;

            }
        }
        else {
            AcquisitionDataAllNum = "-";
            AcquisitionDataAllNumreport = "-";

            AcquisitionDataAllNum2 = "-";
            AcquisitionDataAllNumreport2 = "-";

            AcquisitionDataAllNum3 = "-";
            AcquisitionDataAllNumreport3 = "-";

            AcquisitionDataAllNum4 = "-";
            AcquisitionDataAllNumreport4 = "-";

            AcquisitionDataAllNum5 = "-";
            AcquisitionDataAllNumreport5 = "-";

            AcquisitionDataAllNum6 = "-";
            AcquisitionDataAllNumreport6 = "-";

        }



    });

    var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
        if (data != null) {
            if (AcquisitionDataAllNum6 == "-") {
                AcquisitionDataShowNumreport6 = "-"
                ShowNumsuccess_rate6 = "-";
                ShowNumreportsuccess_rate6 = "-";
            }
            else if (AcquisitionDataAllNum6 == 0) {
                AcquisitionDataShowNumreport6 = "-"
                ShowNumsuccess_rate6 = "-";
                ShowNumreportsuccess_rate6 = "-";

            }
            else {
                AcquisitionDataShowNumreport6 = data[0]["count"];

                ShowNumsuccess_rate6 = fomatFloat(AcquisitionDataShowNum6 / AcquisitionDataAllNum6 * 100, 2);

                ShowNumreportsuccess_rate6 = fomatFloat(AcquisitionDataShowNumreport6 / AcquisitionDataAllNumreport6 * 100, 2);

            }


        }
    });


    var allNumGet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var allNumGetID = ["B01D01", "B01D02", "B01D03", "B01D04", "B01D05", "B01D06", "B01D07", "B01D08", "B01D09", " B01D010", "B01D011"];

    var listget511 = { id: 511, DATETIME: datetime, city: datetime1, rows: webNum };
    //分处室已上报指标数
    com.server.get("/api/AcquisitionApi/get", listget511, function (data) {
        if (data != null) {
            for (var j = 0; j < data.length; j++) {
                for (i = 0; i < allNumGetID.length; i++) {

                    if (data[j].name == allNumGetID[i]) {
                        allNumGet[i] = data[j].number;
                    }

                }
            }

            console.log(allNumGet);

        }

    });


    var listget512 = { id: 512, DATETIME: datetime, city: "", rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget512, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {

                tmpProvinceshow.push(data[i].alldata);

            }
        }
    });

    //拿取指标数据
    var allNumsuc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var allNumsucID = ["B01D01", "B01D02", "B01D03", "B01D04", "B01D05", "B01D06", "B01D07", "B01D08", "B01D09", " B01D010", "B01D011"];

    //拿取11维度已上报指标数据
    var listget10 = { id: 10, DATETIME: datetime, city: datetime1, rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget10, function (data) {
        if (data != null) {
            for (var j = 0; j < data.length; j++) {
                for (i = 0; i < allNumsucID.length; i++) {

                    if (data[j].idname == allNumsucID[i]) {
                        allNumsuc[i] = data[j].number;

                    }


                }


            }

            console.log(allNumsuc);

        }

    });

    var tmpProvinceNum = 11 - tmpProvince.length;

    var tmpProvinceshowNum = 11 - tmpProvinceshow.length;

    var tmpProvincenoNum;


    for (var i = 0; i < tmpProvinceNum; i++) {

        tmpProvince.push(0);
    }

    for (var i = 0; i < tmpProvinceshowNum; i++) {
        tmpProvinceshow.push(0);

    }


    for (var i = 0; i < 12; i++) {


        if (allNumGet[i] - tmpProvinceshow[i] <= 0) {

            tmpIndnumbad.push(0);
        }
        else {

            tmpIndnumbad.push(allNumGet[i] - tmpProvinceshow[i]);
        }


    }




    var tmpnoIndNum = 11 - tmpInd.length;

    var tmpIndnumNum = 11 - tmpIndnumonclick.length;

    for (var i = 0; i < tmpnoIndNum; i++) {

        tmpInd.push(0);
    }

    for (var i = 0; i < tmpIndnumNum; i++) {
        tmpIndnumonclick.push(0);

    }
    for (var i = 0; i < 12; i++) {
        if (tmpInd[i] == 0) {

            tmpIndnumonclick[i] == 0;
        }

        if (tmpInd[i] - tmpIndnumonclick[i] <= 0) {

            tmpIndnumbad2.push(0);
        } else {

            tmpIndnumbad2.push(tmpInd[i] - tmpIndnumonclick[i]);
        }


    }

    for (var j = 0; j < roomNum; j++) {

        if (j == 0) {
            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {

                    AcquisitionDataAllNum = data;
                    AcquisitionDataAllNumreport = AcquisitionDataAllNum * 32;

                }
                else {
                    AcquisitionDataAllNum = "-";
                    AcquisitionDataAllNumreport = "-";
                }
            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum == "-", AcquisitionDataAllNum == 0) {
                        AcquisitionDataShowNumreport = "-"
                        ShowNumsuccess_rate = "-";
                        ShowNumreportsuccess_rate = "-";
                        $("#succeed1").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport = data[0]["count"];

                        ShowNumsuccess_rate = fomatFloat(AcquisitionDataShowNum / AcquisitionDataAllNum * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate = fomatFloat(AcquisitionDataShowNumreport / AcquisitionDataAllNumreport * 100, 2);

                        if (ShowNumreportsuccess_rate > 100) {
                            $("#succeed1").html("-");
                        }
                        else {

                            $("#succeed1").html(fomatFloat(ShowNumreportsuccess_rate, 0));
                        }



                    }


                }
            });

        }


        else if (j == 1) {

            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {
                    AcquisitionDataAllNum2 = data;


                    AcquisitionDataAllNumreport2 = AcquisitionDataAllNum2 * 32;
                }
                else {
                    AcquisitionDataAllNum2 = "-";
                    AcquisitionDataAllNumreport2 = "-";
                }
            });

            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum2 == "-") {
                        AcquisitionDataShowNumreport2 = "-"
                        ShowNumsuccess_rate2 = "-";
                        ShowNumreportsuccess_rate2 = "-";
                        $("#succeed2").html("-");
                    }
                    else if (AcquisitionDataAllNum2 == 0) {
                        AcquisitionDataShowNumreport2 = "-"
                        ShowNumsuccess_rate2 = "-";
                        ShowNumreportsuccess_rate2 = "-";
                        $("#succeed2").html("-");

                    }

                    else {
                        AcquisitionDataShowNumreport2 = data[0]["count"];

                        ShowNumsuccess_rate2 = fomatFloat(AcquisitionDataShowNum2 / AcquisitionDataAllNum2 * 100, 2);

                        ShowNumreportsuccess_rate2 = fomatFloat(AcquisitionDataShowNumreport2 / AcquisitionDataAllNumreport2 * 100, 2);


                        if (ShowNumreportsuccess_rate2 > 100) {
                            $("#succeed2").html("-");
                        }
                        else {

                            $("#succeed2").html(fomatFloat(ShowNumreportsuccess_rate2, 0));
                        }

                    }
                }
            });



        }
        else if (j == 2) {

            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[2] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {

                    AcquisitionDataAllNum3 = data;
                    AcquisitionDataAllNumreport3 = AcquisitionDataAllNum3 * 32;

                }
                else {
                    AcquisitionDataAllNum3 = "-";
                    AcquisitionDataAllNumreport3 = "-";
                }
            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum3 == "-", AcquisitionDataAllNum3 == 0) {
                        AcquisitionDataShowNumreport3 = "-"
                        ShowNumsuccess_rate3 = "-";
                        ShowNumreportsuccess_rate3 = "-";
                        $("#succeed3").html("-");

                    }
                    else {
                        AcquisitionDataShowNumreport3 = data[0]["count"];

                        ShowNumsuccess_rate3 = fomatFloat(AcquisitionDataShowNum3 / AcquisitionDataAllNum3 * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate3 = fomatFloat(AcquisitionDataShowNumreport3 / AcquisitionDataAllNumreport3 * 100, 2);

                        if (ShowNumreportsuccess_rate3 > 100) {
                            $("#succeed3").html("-");
                        }
                        else {

                            $("#succeed3").html(fomatFloat(ShowNumreportsuccess_rate3, 0));
                        }
                    }


                }
            });

        }
        else if (j == 3) {
            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {
                    AcquisitionDataAllNum4 = data;
                    AcquisitionDataAllNumreport4 = AcquisitionDataAllNum4 * 32;
                }
                else {
                    AcquisitionDataAllNum4 = "-";
                    AcquisitionDataAllNumreport4 = "-";
                }
            });

            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum4 == "-") {
                        AcquisitionDataShowNumreport4 = "-"
                        ShowNumsuccess_rate4 = "-";
                        ShowNumreportsuccess_rate4 = "-";
                        $("#succeed4").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport4 = data[0]["count"];
                        ShowNumsuccess_rate4 = fomatFloat(AcquisitionDataShowNum4 / AcquisitionDataAllNum4 * 100, 2);
                        ShowNumreportsuccess_rate4 = fomatFloat(AcquisitionDataShowNumreport4 / AcquisitionDataAllNumreport4 * 100, 2);



                        if (ShowNumreportsuccess_rate4 > 100) {
                            $("#succeed4").html("-");
                        }
                        else {

                            $("#succeed4").html(fomatFloat(ShowNumreportsuccess_rate4, 0));
                        }
                    }
                }
            });

        }
        else if (j == 4) {
            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {
                    AcquisitionDataAllNum5 = data;
                    AcquisitionDataAllNumreport5 = AcquisitionDataAllNum5 * 32;
                }
                else {
                    AcquisitionDataAllNum5 = "-";
                    AcquisitionDataAllNumreport5 = "-";
                }
            });

            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum5 == "-") {
                        AcquisitionDataShowNumreport5 = "-"
                        ShowNumsuccess_rate5 = "-";
                        ShowNumreportsuccess_rate5 = "-";
                        $("#succeed5").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport5 = data[0]["count"];
                        ShowNumsuccess_rate5 = fomatFloat(AcquisitionDataShowNum5 / AcquisitionDataAllNum5 * 100, 2);
                        ShowNumreportsuccess_rate5 = fomatFloat(AcquisitionDataShowNumreport5 / AcquisitionDataAllNumreport5 * 100, 2);

                        if (ShowNumreportsuccess_rate5 > 100) {
                            $("#succeed5").html("-");
                        }
                        else {

                            $("#succeed5").html(fomatFloat(ShowNumreportsuccess_rate5, 0));
                        }
                    }
                }
            });
        }

    }

    //集团数据读取

    $('#showGroup').remove();
    $("#Group").append(" <div id=\"showGroup\"><table id=\"Group_table\"></table></div>");
    var $table = $('#Group_table');

    $('#showGroup1').remove();
    $("#Group1").append(" <div id=\"showGroup1\"><table id=\"Group_table1\"></table></div>");

    var url = '/api/AcquisitionApi/get';
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });


    var $table2 = $('#Group_table1');
    var url = '/api/AcquisitionApi/get';
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });


    function queryParams2(params) {  //配置参数

        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            id: 15,
            DATETIME: "2017-01",
            city: "",
            rows: "",


        };
        return temp;
    }

    if (AcquisitionDataAllNum == "-") {

        $table.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataAllNum6;
                    }

                },
                {
                    field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataShowNum6;
                    }
                },
                {
                    field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ShowNumsuccess_rate6 + "%";
                    }
                },
                {
                    field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataAllNumreport6;
                    }
                },
                {
                    field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataShowNumreport6;
                    }
                },
                {
                    field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ShowNumreportsuccess_rate6
                            + "%";
                    }
                }

                //,
                //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });
        $table2.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "未完成指标" + "</br> </br>" + "未完成数据";
                    }
                },
                {
                    field: 'cityname', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";

                    }
                },
                {
                    field: 'date_time', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'legitimacy_score', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'total_score', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'date_time', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'legitimacy_score', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'total_score', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        //return allNumGet[10]-tmpProvinceshow[10] + "/" + allNumGet[10];
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                }

            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();

        });

    }
    else {
        $table.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataAllNum6;
                    }

                },
                {
                    field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataShowNum6;
                    }
                },
                {
                    field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ShowNumsuccess_rate6 + "%";
                    }
                },
                {
                    field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataAllNumreport6;
                    }
                },
                {
                    field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataShowNumreport6;
                    }
                },
                {
                    field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ShowNumreportsuccess_rate6 + "%";
                    }
                }

                //,
                //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });

        $table2.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [

     {
         field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return "未完成指标" + "</br> </br>" + "未完成数据";
         }
     },
     {
         field: '0', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[0] - allNumsuc[0]) + "/" + tmpProvinceshow[0]) + "</br> </br>" + ((tmpProvinceshow[0] * 32 - allNumGet[0]) + "/" + tmpProvinceshow[0] * 32);

         }
     },
     {
         field: '1', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[1] - allNumsuc[1]) + "/" + tmpProvinceshow[1]) + "</br> </br>" + ((tmpProvinceshow[1] * 32 - allNumGet[1]) + "/" + tmpProvinceshow[1] * 32);
         }
     },
     {
         field: '2', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[2] - allNumsuc[2]) + "/" + tmpProvinceshow[2]) + "</br> </br>" + ((tmpProvinceshow[2] * 32 - allNumGet[2]) + "/" + tmpProvinceshow[2] * 32);
         }
     },
     {
         field: '3', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[3] - allNumsuc[3]) + "/" + tmpProvinceshow[3]) + "</br> </br>" + ((tmpProvinceshow[3] * 32 - allNumGet[3]) + "/" + tmpProvinceshow[3] * 32);
         }
     },
     {
         field: '4', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[4] - allNumsuc[4]) + "/" + tmpProvinceshow[4]) + "</br> </br>" + ((tmpProvinceshow[4] * 32 - allNumGet[4]) + "/" + tmpProvinceshow[4] * 32);
         }
     },
     {
         field: '5', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[5] - allNumsuc[5]) + "/" + tmpProvinceshow[5]) + "</br> </br>" + ((tmpProvinceshow[5] * 32 - allNumGet[5]) + "/" + tmpProvinceshow[5] * 32);
         }
     },
     {
         field: '6', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[6] - allNumsuc[6]) + "/" + tmpProvinceshow[6]) + "</br> </br>" + ((tmpProvinceshow[6] * 32 - allNumGet[6]) + "/" + tmpProvinceshow[6] * 32);
         }
     },
     {
         field: '7', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[7] - allNumsuc[7]) + "/" + tmpProvinceshow[7]) + "</br> </br>" + ((tmpProvinceshow[7] * 32 - allNumGet[7]) + "/" + tmpProvinceshow[7] * 32);
         }
     },
     {
         field: '8', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[8] - allNumsuc[8]) + "/" + tmpProvinceshow[8]) + "</br> </br>" + ((tmpProvinceshow[8] * 32 - allNumGet[8]) + "/" + tmpProvinceshow[8] * 32);
         }
     },
     {
         field: '9', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[9] - allNumsuc[9]) + "/" + tmpProvinceshow[9]) + "</br> </br>" + ((tmpProvinceshow[9] * 32 - allNumGet[9]) + "/" + tmpProvinceshow[9] * 32);
         }
     },
     {
         field: '10', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[10] - allNumsuc[10]) + "/" + tmpProvinceshow[10]) + "</br> </br>" + ((tmpProvinceshow[10] * 32 - allNumGet[10]) + "/" + tmpProvinceshow[10] * 32);
             //return "-/-" + "</br> </br>" + "-/-";
         }
     }

            ],
            onClickRow: function (row, $element, field) {

                $(this).css("cursor", "pointer");
                $("#giveBaddata").empty();
                var data = showNOdata[field];
                var dialogCont = "<ul class='dialogcont'>";
                for (var o in data) {
                    dialogCont += "<li>" + data[o] + "</li>"
                }
                dialogCont += "</ul>"


                $("#roleDialog").find('label').addClass('active');

                $("#giveBaddata").append(dialogCont);

                $("#roleTitle").text("未上报指标详情");
                $("#save_role").attr("name", "edit");

                $("#roleDialog").modal("show");




            }
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();

        });
    }


}

//集团处室用户处室选择时间加载
function ClickRoomUser(url, queryParams, column) {
    var AcquisitionDataAllNum; //处室选中用户的指标
    var AcquisitionDataAllNumreport; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum;//已上报指标个数(个)
    var AcquisitionDataShowNumreport;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate;
    var ShowNumreportsuccess_rate;

    var AcquisitionDataAllNum2; //处室选中用户的指标
    var AcquisitionDataAllNumreport2; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum2;//已上报指标个数(个)
    var AcquisitionDataShowNumreport2;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate2;
    var ShowNumreportsuccess_rate2;

    var AcquisitionDataAllNum3; //处室选中用户的指标
    var AcquisitionDataAllNumreport3; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum3;//已上报指标个数(个)
    var AcquisitionDataShowNumreport3;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate3;
    var ShowNumreportsuccess_rate3;

    var AcquisitionDataAllNum4; //处室选中用户的指标
    var AcquisitionDataAllNumreport4; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum4;//已上报指标个数(个)
    var AcquisitionDataShowNumreport4;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate4;
    var ShowNumreportsuccess_rate4;

    var AcquisitionDataAllNum5; //处室选中用户的指标
    var AcquisitionDataAllNumreport5; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum5;//已上报指标个数(个)
    var AcquisitionDataShowNumreport5;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate5;
    var ShowNumreportsuccess_rate5;

    var ProvinceDataAllNum; //省份选中用户的指标
    var ProvinceDataAllNumreport; //省份所有用户的应上报数据总量（个）  就是省份所有用户的指标*32

    var ProvinceDataShowNum;//已上报指标个数(个)
    var ProvinceDataShowNumreport;//省份选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var tmpallInd = new Array();//已上报所有指标总数
    var tmpInd = new Array();//11维度指标分类总数


    var Provincesuccess_rate;
    var Provincereportsuccess_rate;

    var tmpProvince = new Array();
    var tmpProvinceshow = new Array();

    var tmpProvince2 = new Array();
    var tmpProvinceshow2 = new Array();

    var tmpProvince3 = new Array();
    var tmpProvinceshow3 = new Array();

    var tmpProvince4 = new Array();
    var tmpProvinceshow4 = new Array();

    var tmpProvince5 = new Array();
    var tmpProvinceshow5 = new Array();

    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();
    var webNum = $("#sel_locate").val();
    var cityval = $("#sel_province").val();
    $("#userName").html("用户属性：" + Rolename + "&nbsp&nbsp&nbsp 归属处室/省份：" + Uname);

    //集团页面所有处室数据库读取
    var Idget = new Array();
    var listget211 = { id: 211, DATETIME: '', city: '', rows: '' };
    com.server.get("/api/AcquisitionApi/get", listget211, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                roomNum++;
                Idget.push(data[i].id);
            }


        }
    });


    var listget4 = { id: 4, DATETIME: datetime, city: datetime1, rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget4, function (data) {
        if (data != null) {
            if (AcquisitionDataAllNum == "-") {
                AcquisitionDataShowNum = "-";
            }
            else if (AcquisitionDataAllNum == 0) {
                AcquisitionDataShowNum = "-";
            }
            else {
                AcquisitionDataShowNum = data[0]["count"];
            }


            if (AcquisitionDataAllNum2 == "-") {
                AcquisitionDataShowNum2 = "-";
            }
            else if (AcquisitionDataAllNum2 == 0) {
                AcquisitionDataShowNum2 = "-";
            }
            else {
                AcquisitionDataShowNum2 = data;
            }

            if (AcquisitionDataAllNum3 == "-") {
                AcquisitionDataShowNum3 = "-";
            }
            else if (AcquisitionDataAllNum3 == 0) {
                AcquisitionDataShowNum3 = "-";
            }
            else {
                AcquisitionDataShowNum3 = data;
            }

            if (AcquisitionDataAllNum4 == "-") {
                AcquisitionDataShowNum4 = "-";
            }
            else if (AcquisitionDataAllNum4 == 0) {
                AcquisitionDataShowNum4 = "-";
            }
            else {
                AcquisitionDataShowNum4 = data;
            }

            if (AcquisitionDataAllNum5 == "-") {
                AcquisitionDataShowNum5 = "-";
            }
            else if (AcquisitionDataAllNum5 == 0) {
                AcquisitionDataShowNum5 = "-";
            }
            else {
                AcquisitionDataShowNum5 = data;
            }

        }
        else {
            AcquisitionDataAllNum = "-";
            AcquisitionDataAllNumreport = "-";

            AcquisitionDataAllNum2 = "-";
            AcquisitionDataAllNumreport2 = "-";

            AcquisitionDataAllNum3 = "-";
            AcquisitionDataAllNumreport3 = "-";

            AcquisitionDataAllNum4 = "-";
            AcquisitionDataAllNumreport4 = "-";

            AcquisitionDataAllNum5 = "-";
            AcquisitionDataAllNumreport5 = "-";

        }



    });

    for (var j = 0; j < roomNum; j++) {

        if (j == 0) {
            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {

                    AcquisitionDataAllNum = data;
                    AcquisitionDataAllNumreport = AcquisitionDataAllNum * 32;

                }
                else {
                    AcquisitionDataAllNum = "-";
                    AcquisitionDataAllNumreport = "-";
                }
            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: webNum };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum == "-", AcquisitionDataAllNum == 0) {
                        AcquisitionDataShowNumreport = "-"
                        ShowNumsuccess_rate = "-";
                        ShowNumreportsuccess_rate = "-";
                        $("#succeed1").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport = data[0]["count"];

                        ShowNumsuccess_rate = fomatFloat(AcquisitionDataShowNum / AcquisitionDataAllNum * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate = fomatFloat(AcquisitionDataShowNumreport / AcquisitionDataAllNumreport * 100, 2);

                        if (ShowNumreportsuccess_rate > 100) {
                            $("#succeed1").html("-");
                        }
                        else {

                            $("#succeed1").html(fomatFloat(ShowNumreportsuccess_rate, 0));
                        }



                    }


                }
            });
            //$("#sel_gather_time").append("<option value='" + data[i].rid + "' >" + data[i].rname + "</option>");


            var allNumGet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var allNumGetID = ["B01D01", "B01D02", "B01D03", "B01D04", "B01D05", "B01D06", "B01D07", "B01D08", "B01D09", " B01D010", "B01D011"];

            var listget511 = { id: 511, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            //分处室已上报指标数
            com.server.get("/api/AcquisitionApi/get", listget511, function (data) {
                if (data != null) {
                    for (var j = 0; j < data.length; j++) {
                        for (i = 0; i < allNumGetID.length; i++) {

                            if (data[j].name == allNumGetID[i]) {
                                allNumGet[i] = data[j].number;
                            }

                        }
                    }

                    console.log(allNumGet);

                }

            });

            var listget512 = { id: 512, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget512, function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {

                        tmpProvinceshow.push(data[i].alldata);

                    }
                }
            });

            //拿取指标数据
            var allNumsuc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var allNumsucID = ["B01D01", "B01D02", "B01D03", "B01D04", "B01D05", "B01D06", "B01D07", "B01D08", "B01D09", " B01D010", "B01D011"];

            //拿取11维度已上报指标数据
            var listget10 = { id: 10, DATETIME: datetime, city: datetime1, rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget10, function (data) {
                if (data != null) {
                    for (var j = 0; j < data.length; j++) {
                        for (i = 0; i < allNumsucID.length; i++) {

                            if (data[j].idname == allNumsucID[i]) {
                                allNumsuc[i] = data[j].number;

                            }


                        }


                    }

                    console.log(allNumsuc);

                }

            });

            var tmpProvinceNum = 11 - tmpProvince.length;

            var tmpProvinceshowNum = 11 - tmpProvinceshow.length;

            var tmpProvincenoNum;


            for (var i = 0; i < tmpProvinceNum; i++) {

                tmpProvince.push(0);
            }

            for (var i = 0; i < tmpProvinceshowNum; i++) {
                tmpProvinceshow.push(0);

            }


            for (var i = 0; i < 12; i++) {


                if (allNumGet[i] - tmpProvinceshow[i] <= 0) {

                    tmpIndnumbad.push(0);
                }
                else {

                    tmpIndnumbad.push(allNumGet[i] - tmpProvinceshow[i]);
                }


            }




            var tmpnoIndNum = 11 - tmpInd.length;

            var tmpIndnumNum = 11 - tmpIndnumonclick.length;

            for (var i = 0; i < tmpnoIndNum; i++) {

                tmpInd.push(0);
            }

            for (var i = 0; i < tmpIndnumNum; i++) {
                tmpIndnumonclick.push(0);

            }
            for (var i = 0; i < 12; i++) {
                if (tmpInd[i] == 0) {

                    tmpIndnumonclick[i] == 0;
                }

                if (tmpInd[i] - tmpIndnumonclick[i] <= 0) {

                    tmpIndnumbad2.push(0);
                } else {

                    tmpIndnumbad2.push(tmpInd[i] - tmpIndnumonclick[i]);
                }


            }



        }


        else if (j == 1) {

            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {

                    AcquisitionDataAllNum2 = data;
                    AcquisitionDataAllNumreport2 = AcquisitionDataAllNum2 * 32;

                }
                else {
                    AcquisitionDataAllNum2 = "-";
                    AcquisitionDataAllNumreport2 = "-";
                }
            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: webNum };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum2 == "-") {
                        AcquisitionDataShowNumreport2 = "-"
                        ShowNumsuccess_rate2 = "-";
                        ShowNumreportsuccess_rate2 = "-";
                        $("#succeed12").html("-");
                    }
                    else if (AcquisitionDataAllNum2 == 0) {
                        AcquisitionDataShowNumreport2 = "-"
                        ShowNumsuccess_rate2 = "-";
                        ShowNumreportsuccess_rate2 = "-";
                        $("#succeed12").html("-");

                    }
                    else {
                        AcquisitionDataShowNumreport2 = data[0]["count"];

                        ShowNumsuccess_rate2 = fomatFloat(AcquisitionDataShowNum2 / AcquisitionDataAllNum2 * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate2 = fomatFloat(AcquisitionDataShowNumreport2 / AcquisitionDataAllNumreport2 * 100, 2);

                        if (ShowNumreportsuccess_rate2 > 100) {
                            $("#succeed2").html("-");
                        }
                        else {

                            $("#succeed2").html(fomatFloat(ShowNumreportsuccess_rate2, 0));
                        }



                    }


                }
            });



        }
        else if (j == 2) {

            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {

                    AcquisitionDataAllNum3 = data;
                    AcquisitionDataAllNumreport3 = AcquisitionDataAllNum3 * 32;

                }
                else {
                    AcquisitionDataAllNum3 = "-";
                    AcquisitionDataAllNumreport3 = "-";
                }
            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: webNum };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum3 == "-", AcquisitionDataAllNum3 == 0) {
                        AcquisitionDataShowNumreport3 = "-"
                        ShowNumsuccess_rate3 = "-";
                        ShowNumreportsuccess_rate3 = "-";
                        $("#succeed3").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport3 = data.length

                        ShowNumsuccess_rate3 = fomatFloat(AcquisitionDataShowNum3 / AcquisitionDataAllNum3 * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate3 = fomatFloat(AcquisitionDataShowNumreport3 / AcquisitionDataAllNumreport3 * 100, 2);

                        if (ShowNumreportsuccess_rate3 > 100) {
                            $("#succeed3").html("-");
                        }
                        else {

                            $("#succeed3").html(fomatFloat(ShowNumreportsuccess_rate3, 0));
                        }



                    }


                }
            });



        }
        else if (j == 3) {
            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {

                    AcquisitionDataAllNum4 = data;
                    AcquisitionDataAllNumreport4 = AcquisitionDataAllNum4 * 32;

                }
                else {
                    AcquisitionDataAllNum4 = "-";
                    AcquisitionDataAllNumreport4 = "-";
                }
            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: webNum };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum4 == "-", AcquisitionDataAllNum4 == 0) {
                        AcquisitionDataShowNumreport4 = "-"
                        ShowNumsuccess_rate4 = "-";
                        ShowNumreportsuccess_rate4 = "-";
                        $("#succeed4").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport4 = data.length

                        ShowNumsuccess_rate4 = fomatFloat(AcquisitionDataShowNum4 / AcquisitionDataAllNum4 * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate4 = fomatFloat(AcquisitionDataShowNumreport4 / AcquisitionDataAllNumreport4 * 100, 2);

                        if (ShowNumreportsuccess_rate4 > 100) {
                            $("#succeed4").html("-");
                        }
                        else {

                            $("#succeed4").html(fomatFloat(ShowNumreportsuccess_rate4, 0));
                        }



                    }


                }
            });


        }
        else if (j == 4) {
            var listget3 = { id: 3, DATETIME: datetime, city: "", rows: Idget[j] };
            com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
                if (data != null) {

                    AcquisitionDataAllNum5 = data;
                    AcquisitionDataAllNumreport5 = AcquisitionDataAllNum5 * 32;

                }
                else {
                    AcquisitionDataAllNum5 = "-";
                    AcquisitionDataAllNumreport5 = "-";
                }
            });
            var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: webNum };
            com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
                if (data != null) {
                    if (AcquisitionDataAllNum5 == "-", AcquisitionDataAllNum5 == 0) {
                        AcquisitionDataShowNumreport5 = "-"
                        ShowNumsuccess_rate5 = "-";
                        ShowNumreportsuccess_rate5 = "-";
                        $("#succeed5").html("-");
                    }
                    else {
                        AcquisitionDataShowNumreport5 = data.length

                        ShowNumsuccess_rate5 = fomatFloat(AcquisitionDataShowNum5 / AcquisitionDataAllNum5 * 100, 2);
                        //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                        ShowNumreportsuccess_rate5 = fomatFloat(AcquisitionDataShowNumreport5 / AcquisitionDataAllNumreport5 * 100, 2);

                        if (ShowNumreportsuccess_rate5 > 100) {
                            $("#succeed5").html("-");
                        }
                        else {

                            $("#succeed5").html(fomatFloat(ShowNumreportsuccess_rate5, 0));
                        }



                    }


                }
            });


        }

    }

    //集团数据读取

    $('#showGroupuser').remove();
    $("#Groupuser").append(" <div id=\"showGroupuser\"><table id=\"Group_tableuser\"></table></div>");
    var $table = $('#Group_table');

    $('#showGroupuser1').remove();
    $("#Groupuser1").append(" <div id=\"showGroupuser1\"><table id=\"Group_tableuser1\"></table></div>");

    //如果是集团用户加载表格


    var $tableUser = $('#Group_tableuser');
    var url = '/api/AcquisitionApi/get';
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });

    var $tableUser2 = $('#Group_tableuser1');
    var url = '/api/AcquisitionApi/get';
    $(document).on('focus', 'input[type="text"]', function () {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function () {
        if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('active');
        }
    });

    function queryParams2(params) {  //配置参数

        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            id: 15,
            DATETIME: "2017-01",
            city: "",
            rows: "",


        };
        return temp;
    }
    if (AcquisitionDataAllNum == "-") {

        $tableUser.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }

                },
                {
                    field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-%";
                    }
                },
                {
                    field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-%";
                    }
                }
                //,
                //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });


        $tableUser2.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "未完成指标" + "</br> </br>" + "未完成数据";
                    }
                },
                {
                    field: 'cityname', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";

                    }
                },
                {
                    field: 'date_time', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'legitimacy_score', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'total_score', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'date_time', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'legitimacy_score', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'integrity_score', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'accuracy_score', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                },
                {
                    field: 'total_score', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        //return allNumGet[10]-tmpProvinceshow[10] + "/" + allNumGet[10];
                        return "-/-" + "</br> </br>" + "-/-";
                    }
                }

            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });



    }
    else {

        $tableUser.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [
                {
                    field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataAllNum;
                    }

                },
                {
                    field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataShowNum;
                    }
                },
                {
                    field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ShowNumsuccess_rate + "%";
                    }
                },
                {
                    field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataAllNumreport;
                    }
                },
                {
                    field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return AcquisitionDataShowNumreport;
                    }
                },
                {
                    field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                        return ShowNumreportsuccess_rate + "%";
                    }
                }

                //,
                //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
            ]
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });

        $tableUser2.bootstrapTable({
            url: url,
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
            queryParams: queryParams2, //参数  
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
            columns: [

     {
         field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return "未完成指标" + "</br> </br>" + "未完成数据";
         }
     },
     {
         field: '0', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[0] - allNumsuc[0]) + "/" + tmpProvinceshow[0]) + "</br> </br>" + ((tmpProvinceshow[0] * 32 - allNumGet[0]) + "/" + tmpProvinceshow[0] * 32);

         }
     },
     {
         field: '1', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[1] - allNumsuc[1]) + "/" + tmpProvinceshow[1]) + "</br> </br>" + ((tmpProvinceshow[1] * 32 - allNumGet[1]) + "/" + tmpProvinceshow[1] * 32);
         }
     },
     {
         field: '2', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[2] - allNumsuc[2]) + "/" + tmpProvinceshow[2]) + "</br> </br>" + ((tmpProvinceshow[2] * 32 - allNumGet[2]) + "/" + tmpProvinceshow[2] * 32);
         }
     },
     {
         field: '3', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[3] - allNumsuc[3]) + "/" + tmpProvinceshow[3]) + "</br> </br>" + ((tmpProvinceshow[3] * 32 - allNumGet[3]) + "/" + tmpProvinceshow[3] * 32);
         }
     },
     {
         field: '4', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[4] - allNumsuc[4]) + "/" + tmpProvinceshow[4]) + "</br> </br>" + ((tmpProvinceshow[4] * 32 - allNumGet[4]) + "/" + tmpProvinceshow[4] * 32);
         }
     },
     {
         field: '5', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[5] - allNumsuc[5]) + "/" + tmpProvinceshow[5]) + "</br> </br>" + ((tmpProvinceshow[5] * 32 - allNumGet[5]) + "/" + tmpProvinceshow[5] * 32);
         }
     },
     {
         field: '6', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[6] - allNumsuc[6]) + "/" + tmpProvinceshow[6]) + "</br> </br>" + ((tmpProvinceshow[6] * 32 - allNumGet[6]) + "/" + tmpProvinceshow[6] * 32);
         }
     },
     {
         field: '7', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[7] - allNumsuc[7]) + "/" + tmpProvinceshow[7]) + "</br> </br>" + ((tmpProvinceshow[7] * 32 - allNumGet[7]) + "/" + tmpProvinceshow[7] * 32);
         }
     },
     {
         field: '8', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[8] - allNumsuc[8]) + "/" + tmpProvinceshow[8]) + "</br> </br>" + ((tmpProvinceshow[8] * 32 - allNumGet[8]) + "/" + tmpProvinceshow[8] * 32);
         }
     },
     {
         field: '9', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[9] - allNumsuc[9]) + "/" + tmpProvinceshow[9]) + "</br> </br>" + ((tmpProvinceshow[9] * 32 - allNumGet[9]) + "/" + tmpProvinceshow[9] * 32);
         }
     },
     {
         field: '10', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[10] - allNumsuc[10]) + "/" + tmpProvinceshow[10]) + "</br> </br>" + ((tmpProvinceshow[10] * 32 - allNumGet[10]) + "/" + tmpProvinceshow[10] * 32);
             //return "-/-" + "</br> </br>" + "-/-";
         }
     }

            ],
            onClickRow: function (row, $element, field) {

                $(this).css("cursor", "pointer");
                $("#giveBaddata").empty();
                var data = showNOdata[field];
                var dialogCont = "<ul class='dialogcont'>";
                for (var o in data) {
                    dialogCont += "<li>" + data[o] + "</li>"
                }
                dialogCont += "</ul>"


                $("#roleDialog").find('label').addClass('active');

                $("#giveBaddata").append(dialogCont);

                $("#roleTitle").text("未上报指标详情");
                $("#save_role").attr("name", "edit");

                $("#roleDialog").modal("show");




            }
        }).on('all.bs.table', function (e, name, args) {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();
        });

    }

}

//处室点击选择方法
function ClickchangeRoom(url, queryParams, column) {

    var AcquisitionDataAllNum; //处室选中用户的指标
    var AcquisitionDataAllNumreport; //处室所有用户的应上报数据总量（个）  就是处室所有用户的指标*32

    var AcquisitionDataShowNum;//已上报指标个数(个)
    var AcquisitionDataShowNumreport;//处室选中用户的指标的已上报数据总量（个） 就是已上报指标个数(个)不去重

    var ShowNumsuccess_rate;
    var ShowNumreportsuccess_rate;



    var Provincesuccess_rate;
    var Provincereportsuccess_rate;

    var tmpProvince = new Array();
    var tmpProvinceshow = new Array();

    var tmpProvince2 = new Array();
    var tmpProvinceshow2 = new Array();

    var tmpProvince3 = new Array();
    var tmpProvinceshow3 = new Array();

    var tmpProvince4 = new Array();
    var tmpProvinceshow4 = new Array();

    var tmpProvince5 = new Array();
    var tmpProvinceshow5 = new Array();
    var datetime = $("#sel_gather_time").val();
    var webNum = $("#sel_locate").val();




    var tmpallInd = new Array();//已上报所有指标总数
    var tmpInd = new Array();//11维度指标分类总数


    var Provincesuccess_rate;
    var Provincereportsuccess_rate;

    var tmpProvince = new Array();
    var tmpProvinceshowclick = new Array();

    var tmpProvince2 = new Array();
    var tmpProvinceshow2 = new Array();

    var tmpProvince3 = new Array();
    var tmpProvinceshow3 = new Array();

    var tmpProvince4 = new Array();
    var tmpProvinceshow4 = new Array();

    var tmpProvince5 = new Array();
    var tmpProvinceshow5 = new Array();

    var datetime = $("#sel_gather_time").val();
    var webNum = $("#sel_locate").val();
    var cityval = $("#sel_province").val();

    var tmpIndnumroom = new Array();
    //管理员用户部分
    //集团页面所有处室数据库读取

    var datetime = $("#sel_gather_time").val();
    var datetime1 = $("#sel_gather_time1").val();
    var webNum = $("#sel_locate").val();
    var cityval = $("#sel_province").val();
    var Idget = new Array();

    var listget211 = { id: 211, DATETIME: '', city: '', rows: '' };
    com.server.get("/api/AcquisitionApi/get", listget211, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {
                roomNum++;
                Idget.push(data[i].id);
            }


        }
    });

    var listget3 = { id: 3, DATETIME: datetime, city: "", rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget3, function (data) {
        if (data != null) {

            AcquisitionDataAllNum = data;
            AcquisitionDataAllNumreport = AcquisitionDataAllNum * 32;

        }
        else {
            AcquisitionDataAllNum = "-";
            AcquisitionDataAllNumreport = "-";
        }
    });
    var listget4 = { id: 4, DATETIME: datetime, city: datetime1, rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget4, function (data) {
        if (data != null) {
            if (AcquisitionDataAllNum == "-") {
                AcquisitionDataShowNum = "-";
            }
            else if (AcquisitionDataAllNum == 0) {
                AcquisitionDataShowNum = "-";
            }
            else {
                AcquisitionDataShowNum = data[0]["count"];
            }
        }
        else {
            AcquisitionDataAllNum = "-";
            AcquisitionDataAllNumreport = "-";

            AcquisitionDataAllNum2 = "-";
            AcquisitionDataAllNumreport2 = "-";

            AcquisitionDataAllNum3 = "-";
            AcquisitionDataAllNumreport3 = "-";

            AcquisitionDataAllNum4 = "-";
            AcquisitionDataAllNumreport4 = "-";

            AcquisitionDataAllNum5 = "-";
            AcquisitionDataAllNumreport5 = "-";

        }



    });

    var listget5 = { id: 5, DATETIME: datetime, city: datetime1, rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget5, function (data) {
        if (data != null) {
            if (AcquisitionDataAllNum == "-", AcquisitionDataAllNum == 0) {
                AcquisitionDataShowNumreport = "-"
                ShowNumsuccess_rate = "-";
                ShowNumreportsuccess_rate = "-";

            }
            else {
                AcquisitionDataShowNumreport = data[0]["count"];

                ShowNumsuccess_rate = fomatFloat(AcquisitionDataShowNum / AcquisitionDataAllNum * 100, 2);
                //ShowNumsuccess_rate = (AcquisitionDataShowNum/AcquisitionDataAllNum)*100%
                ShowNumreportsuccess_rate = fomatFloat(AcquisitionDataShowNumreport / AcquisitionDataAllNumreport * 100, 2);

            }


        }
    });

    var allNumGet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var allNumGetID = ["B01D01", "B01D02", "B01D03", "B01D04", "B01D05", "B01D06", "B01D07", "B01D08", "B01D09", " B01D010", "B01D011"];

    var listget511 = { id: 511, DATETIME: datetime, city: datetime1, rows: webNum };
    //分处室已上报指标数
    com.server.get("/api/AcquisitionApi/get", listget511, function (data) {
        if (data != null) {
            for (var j = 0; j < data.length; j++) {
                for (i = 0; i < allNumGetID.length; i++) {

                    if (data[j].name == allNumGetID[i]) {
                        allNumGet[i] = data[j].number;
                    }

                }
            }

            console.log(allNumGet);

        }

    });

    var listget512 = { id: 512, DATETIME: datetime, city: "", rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget512, function (data) {
        if (data != null) {
            for (var i = 0; i < data.length; i++) {

                tmpProvinceshowclick.push(data[i].alldata);

            }
        }
    });

    //拿取指标数据
    var allNumsuc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var allNumsucID = ["B01D01", "B01D02", "B01D03", "B01D04", "B01D05", "B01D06", "B01D07", "B01D08", "B01D09", " B01D010", "B01D011"];

    //拿取11维度已上报指标数据
    var listget10 = { id: 10, DATETIME: datetime, city: datetime1, rows: webNum };
    com.server.get("/api/AcquisitionApi/get", listget10, function (data) {
        if (data != null) {
            for (var j = 0; j < data.length; j++) {
                for (i = 0; i < allNumsucID.length; i++) {

                    if (data[j].idname == allNumsucID[i]) {
                        allNumsuc[i] = data[j].number;

                    }


                }


            }

            console.log(allNumsuc);

        }

    });

    var tmpProvinceNum = 11 - tmpProvince.length;

    var tmpProvinceshowclickNum = 11 - tmpProvinceshowclick.length;

    var tmpProvincenoNum;


    for (var i = 0; i < tmpProvinceNum; i++) {

        tmpProvince.push(0);
    }

    for (var i = 0; i < tmpProvinceshowclickNum; i++) {
        tmpProvinceshowclick.push(0);

    }


    for (var i = 0; i < 12; i++) {


        if (allNumGet[i] - tmpProvinceshowclick[i] <= 0) {

            tmpIndnumbad.push(0);
        }
        else {

            tmpIndnumbad.push(allNumGet[i] - tmpProvinceshowclick[i]);
        }


    }

    var tmpnoIndNum = 11 - tmpInd.length;

    var tmpIndnumNum = 11 - tmpIndnumroom.length;

    for (var i = 0; i < tmpnoIndNum; i++) {

        tmpInd.push(0);
    }

    for (var i = 0; i < tmpIndnumNum; i++) {
        tmpIndnumroom.push(0);

    }
    for (var i = 0; i < 12; i++) {
        if (tmpInd[i] == 0) {

            tmpIndnumroom[i] == 0;
        }

        if (tmpInd[i] - tmpIndnumroom[i] <= 0) {

            tmpIndnumbad2.push(0);
        } else {

            tmpIndnumbad2.push(tmpInd[i] - tmpIndnumroom[i]);
        }


    }



    if (Rolename == "集团用户") {

        $('#showGroupuser').remove();
        $("#Groupuser").append(" <div id=\"showGroupuser\"><table id=\"Group_tableuser\"></table></div>");
        var $table = $('#Group_table');

        $('#showGroupuser1').remove();
        $("#Groupuser1").append(" <div id=\"showGroupuser1\"><table id=\"Group_tableuser1\"></table></div>");

        //如果是集团用户加载表格


        var $tableUser = $('#Group_tableuser');
        var url = '/api/AcquisitionApi/get';
        $(document).on('focus', 'input[type="text"]', function () {
            $(this).parent().find('label').addClass('active');
        }).on('blur', 'input[type="text"]', function () {
            if ($(this).val() == '') {
                $(this).parent().find('label').removeClass('active');
            }
        });

        var $tableUser2 = $('#Group_tableuser1');
        var url = '/api/AcquisitionApi/get';
        $(document).on('focus', 'input[type="text"]', function () {
            $(this).parent().find('label').addClass('active');
        }).on('blur', 'input[type="text"]', function () {
            if ($(this).val() == '') {
                $(this).parent().find('label').removeClass('active');
            }
        });

        function queryParams2(params) {  //配置参数

            var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                id: 15,
                DATETIME: "2017-01",
                city: "",
                rows: "",


            };
            return temp;
        }
        if (AcquisitionDataAllNum == "-") {

            $tableUser.bootstrapTable({
                url: url,
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
                queryParams: queryParams2, //参数  
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
                columns: [
                    {
                        field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-";
                        }

                    },
                    {
                        field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-";
                        }
                    },
                    {
                        field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-%";
                        }
                    },
                    {
                        field: 'legitimacy_score', title: '应上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-";
                        }
                    },
                    {
                        field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-";
                        }
                    },
                    {
                        field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-%";
                        }
                    }
                    //,
                    //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
                ]
            }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            });


            $tableUser2.bootstrapTable({
                url: url,
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
                queryParams: queryParams2, //参数  
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
                columns: [
                    {
                        field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "未完成指标" + "</br> </br>" + "未完成数据";
                        }
                    },
                    {
                        field: 'cityname', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";

                        }
                    },
                    {
                        field: 'date_time', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'legitimacy_score', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'integrity_score', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'accuracy_score', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'total_score', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'date_time', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'legitimacy_score', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'integrity_score', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'accuracy_score', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'total_score', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            //return allNumGet[10]-tmpProvinceshow[10] + "/" + allNumGet[10];
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    }

                ]
            }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            });



        }
        else {

            $tableUser.bootstrapTable({
                url: url,
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
                queryParams: queryParams2, //参数  
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
                columns: [
                    {
                        field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return AcquisitionDataAllNum;
                        }

                    },
                    {
                        field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return AcquisitionDataShowNum;
                        }
                    },
                    {
                        field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ShowNumsuccess_rate + "%";
                        }
                    },
                    {
                        field: 'legitimacy_score', title: '应上报数据总量(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return AcquisitionDataAllNumreport;
                        }
                    },
                    {
                        field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return AcquisitionDataShowNumreport;
                        }
                    },
                    {
                        field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ShowNumreportsuccess_rate + "%";
                        }
                    }

                    //,
                    //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
                ]
            }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            });

            $tableUser2.bootstrapTable({
                url: url,
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
                queryParams: queryParams2, //参数  
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
                columns: [

     {
         field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return "未完成指标" + "</br> </br>" + "未完成数据";
         }
     },
     {
         field: '0', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[0] - allNumsuc[0]) + "/" + tmpProvinceshow[0]) + "</br> </br>" + ((tmpProvinceshow[0] * 32 - allNumGet[0]) + "/" + tmpProvinceshow[0] * 32);

         }
     },
     {
         field: '1', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[1] - allNumsuc[1]) + "/" + tmpProvinceshow[1]) + "</br> </br>" + ((tmpProvinceshow[1] * 32 - allNumGet[1]) + "/" + tmpProvinceshow[1] * 32);
         }
     },
     {
         field: '2', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[2] - allNumsuc[2]) + "/" + tmpProvinceshow[2]) + "</br> </br>" + ((tmpProvinceshow[2] * 32 - allNumGet[2]) + "/" + tmpProvinceshow[2] * 32);
         }
     },
     {
         field: '3', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[3] - allNumsuc[3]) + "/" + tmpProvinceshow[3]) + "</br> </br>" + ((tmpProvinceshow[3] * 32 - allNumGet[3]) + "/" + tmpProvinceshow[3] * 32);
         }
     },
     {
         field: '4', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[4] - allNumsuc[4]) + "/" + tmpProvinceshow[4]) + "</br> </br>" + ((tmpProvinceshow[4] * 32 - allNumGet[4]) + "/" + tmpProvinceshow[4] * 32);
         }
     },
     {
         field: '5', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[5] - allNumsuc[5]) + "/" + tmpProvinceshow[5]) + "</br> </br>" + ((tmpProvinceshow[5] * 32 - allNumGet[5]) + "/" + tmpProvinceshow[5] * 32);
         }
     },
     {
         field: '6', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[6] - allNumsuc[6]) + "/" + tmpProvinceshow[6]) + "</br> </br>" + ((tmpProvinceshow[6] * 32 - allNumGet[6]) + "/" + tmpProvinceshow[6] * 32);
         }
     },
     {
         field: '7', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[7] - allNumsuc[7]) + "/" + tmpProvinceshow[7]) + "</br> </br>" + ((tmpProvinceshow[7] * 32 - allNumGet[7]) + "/" + tmpProvinceshow[7] * 32);
         }
     },
     {
         field: '8', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[8] - allNumsuc[8]) + "/" + tmpProvinceshow[8]) + "</br> </br>" + ((tmpProvinceshow[8] * 32 - allNumGet[8]) + "/" + tmpProvinceshow[8] * 32);
         }
     },
     {
         field: '9', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[9] - allNumsuc[9]) + "/" + tmpProvinceshow[9]) + "</br> </br>" + ((tmpProvinceshow[9] * 32 - allNumGet[9]) + "/" + tmpProvinceshow[9] * 32);
         }
     },
     {
         field: '10', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
             return ((tmpProvinceshow[10] - allNumsuc[10]) + "/" + tmpProvinceshow[10]) + "</br> </br>" + ((tmpProvinceshow[10] * 32 - allNumGet[10]) + "/" + tmpProvinceshow[10] * 32);
             //return "-/-" + "</br> </br>" + "-/-";
         }
     }

                ],
                onClickRow: function (row, $element, field) {

                    $(this).css("cursor", "pointer");
                    $("#giveBaddata").empty();
                    var data = showNOdata[field];
                    var dialogCont = "<ul class='dialogcont'>";
                    for (var o in data) {
                        dialogCont += "<li>" + data[o] + "</li>"
                    }
                    dialogCont += "</ul>"


                    $("#roleDialog").find('label').addClass('active');

                    $("#giveBaddata").append(dialogCont);

                    $("#roleTitle").text("未上报指标详情");
                    $("#save_role").attr("name", "edit");

                    $("#roleDialog").modal("show");




                }
            }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();

            });
        }


    }

    else {

        $('#showGroup').remove();
        $("#Group").append(" <div id=\"showGroup\"><table id=\"Group_table\"></table></div>");

        $('#showGroup1').remove();
        $("#Group1").append(" <div id=\"showGroup1\"><table id=\"Group_table1\"></table></div>");
        //集团数据读取
        var $table = $('#Group_table');

        var url = '/api/AcquisitionApi/get';
        $(document).on('focus', 'input[type="text"]', function () {
            $(this).parent().find('label').addClass('active');
        }).on('blur', 'input[type="text"]', function () {
            if ($(this).val() == '') {
                $(this).parent().find('label').removeClass('active');
            }
        });


        if (AcquisitionDataAllNum == "-") {

            $table.bootstrapTable({
                url: url,
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
                queryParams: queryParams2, //参数  
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
                columns: [
                    {
                        field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-";
                        }

                    },
                    {
                        field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-";
                        }
                    },
                    {
                        field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-%";
                        }
                    },
                    {
                        field: 'legitimacy_score', title: '应上报数据总量(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-";
                        }
                    },
                    {
                        field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-";
                        }
                    },
                    {
                        field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-%";
                        }
                    }

                ]
            }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            });


            var $table2 = $('#Group_table1');
            var url = '/api/AcquisitionApi/get';
            $(document).on('focus', 'input[type="text"]', function () {
                $(this).parent().find('label').addClass('active');
            }).on('blur', 'input[type="text"]', function () {
                if ($(this).val() == '') {
                    $(this).parent().find('label').removeClass('active');
                }
            });

            function queryParams2(params) {  //配置参数

                var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                    id: 15,
                    DATETIME: "2017-01",
                    city: "",
                    rows: "",


                };
                return temp;
            }


            $table2.bootstrapTable({
                url: url,
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
                queryParams: queryParams2, //参数  
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
                columns: [
                    {
                        field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "未完成指标" + "</br> </br>" + "未完成数据";
                        }
                    },
                    {
                        field: 'cityname', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";

                        }
                    },
                    {
                        field: 'date_time', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'legitimacy_score', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'integrity_score', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'accuracy_score', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'total_score', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'date_time', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'legitimacy_score', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'integrity_score', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'accuracy_score', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    },
                    {
                        field: 'total_score', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            //return allNumGet[10]-tmpProvinceshowclick[10] + "/" + allNumGet[10];
                            return "-/-" + "</br> </br>" + "-/-";
                        }
                    }

                ]
            }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();


            });


            //自动触发点击事件
            $tableUser2.on('load-success.bs.table', function (data) {
                $("#Group_table1 tbody").find("tr").each(function () {
                    var TR = this;
                    $(TR).attr("id", "UseTr");
                    for (var i = 0; i < 12; i++) {

                        $(TR).find("td").eq(i).each(function () {

                            if (i == 0) {
                                var TD = this;
                            }
                            else {
                                var TD = this;
                                $(TR).find("td").eq(i).css("cursor", "pointer");




                            }


                        })
                    }
                });


            });


        }
        else {
            $table.bootstrapTable({
                url: url,
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
                queryParams: queryParams2, //参数  
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
                columns: [
                    {
                        field: 'proname', title: '应上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return AcquisitionDataAllNum;
                        }

                    },
                    {
                        field: 'cityname', title: '已上报指标个数(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return AcquisitionDataShowNum;
                        }
                    },
                    {
                        field: 'date_time', title: '指标上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ShowNumsuccess_rate + "%";
                        }
                    },
                    {
                        field: 'legitimacy_score', title: '应上报数据总量(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return AcquisitionDataAllNumreport;
                        }
                    },
                    {
                        field: 'integrity_score', title: '已上报数据总量(个)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return AcquisitionDataShowNumreport;
                        }
                    },
                    {
                        field: 'accuracy_score', title: '数据上报完成率(%)', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ShowNumreportsuccess_rate + "%";
                        }
                    }

                    //,
                    //{field: 'action', title: '操作', halign: 'center', align: 'center', formatter: 'actionFormatter', events: 'actionEvents', clickToSelect: false}
                ]
            }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            });

            var $table2 = $('#Group_table1');
            var url = '/api/AcquisitionApi/get';
            $(document).on('focus', 'input[type="text"]', function () {
                $(this).parent().find('label').addClass('active');
            }).on('blur', 'input[type="text"]', function () {
                if ($(this).val() == '') {
                    $(this).parent().find('label').removeClass('active');
                }
            });

            function queryParams2(params) {  //配置参数

                var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                    id: 15,
                    DATETIME: "2017-01",
                    city: "",
                    rows: "",


                };
                return temp;
            }

            $table2.bootstrapTable({
                url: url,
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
                queryParams: queryParams2, //参数  
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
                columns: [

                    {
                        field: 'proname', title: '维度', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return "未完成指标" + "</br> </br>" + "未完成数据";
                        }
                    },
                    {
                        field: '0', title: '客户反映', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[0] - allNumsuc[0]) + "/" + tmpProvinceshowclick[0]) + "</br> </br>" + ((tmpProvinceshowclick[0] * 32 - allNumGet[0]) + "/" + tmpProvinceshowclick[0] * 32);

                        }
                    },
                    {
                        field: '1', title: '无线网络覆盖', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[1] - allNumsuc[1]) + "/" + tmpProvinceshowclick[1]) + "</br> </br>" + ((tmpProvinceshowclick[1] * 32 - allNumGet[1]) + "/" + tmpProvinceshowclick[1] * 32);
                        }
                    },
                    {
                        field: '2', title: '无线语音端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[2] - allNumsuc[2]) + "/" + tmpProvinceshowclick[2]) + "</br> </br>" + ((tmpProvinceshowclick[2] * 32 - allNumGet[2]) + "/" + tmpProvinceshowclick[2] * 32);
                        }
                    },
                    {
                        field: '3', title: '无线数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[3] - allNumsuc[3]) + "/" + tmpProvinceshowclick[3]) + "</br> </br>" + ((tmpProvinceshowclick[3] * 32 - allNumGet[3]) + "/" + tmpProvinceshowclick[3] * 32);
                        }
                    },
                    {
                        field: '4', title: '无线网络结构', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[4] - allNumsuc[4]) + "/" + tmpProvinceshowclick[4]) + "</br> </br>" + ((tmpProvinceshowclick[4] * 32 - allNumGet[4]) + "/" + tmpProvinceshowclick[4] * 32);
                        }
                    },
                    {
                        field: '5', title: '家客数据端到端', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[5] - allNumsuc[5]) + "/" + tmpProvinceshowclick[5]) + "</br> </br>" + ((tmpProvinceshowclick[5] * 32 - allNumGet[5]) + "/" + tmpProvinceshowclick[5] * 32);
                        }
                    },
                    {
                        field: '6', title: '传输网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[6] - allNumsuc[6]) + "/" + tmpProvinceshowclick[6]) + "</br> </br>" + ((tmpProvinceshowclick[6] * 32 - allNumGet[6]) + "/" + tmpProvinceshowclick[6] * 32);
                        }
                    },
                    {
                        field: '7', title: '内容网络', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[7] - allNumsuc[7]) + "/" + tmpProvinceshowclick[7]) + "</br> </br>" + ((tmpProvinceshowclick[7] * 32 - allNumGet[7]) + "/" + tmpProvinceshowclick[7] * 32);
                        }
                    },
                    {
                        field: '8', title: '国际业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[8] - allNumsuc[8]) + "/" + tmpProvinceshowclick[8]) + "</br> </br>" + ((tmpProvinceshowclick[8] * 32 - allNumGet[8]) + "/" + tmpProvinceshowclick[8] * 32);
                        }
                    },
                    {
                        field: '9', title: '集团客户', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[9] - allNumsuc[9]) + "/" + tmpProvinceshowclick[9]) + "</br> </br>" + ((tmpProvinceshowclick[9] * 32 - allNumGet[9]) + "/" + tmpProvinceshowclick[9] * 32);
                        }
                    },
                    {
                        field: '10', title: '新业务', sortable: true, halign: 'left', formatter: function (value, row, index) {
                            return ((tmpProvinceshowclick[10] - allNumsuc[10]) + "/" + tmpProvinceshowclick[10]) + "</br> </br>" + ((tmpProvinceshowclick[10] * 32 - allNumGet[10]) + "/" + tmpProvinceshowclick[10] * 32);
                            //return "-/-" + "</br> </br>" + "-/-";
                        }
                    }


                ],
                onClickRow: function (row, $element, field) {

                    $(this).css("cursor", "pointer");
                    $("#giveBaddata").empty();
                    var data = showNOdata[field];
                    var dialogCont = "<ul class='dialogcont'>";
                    for (var o in data) {
                        dialogCont += "<li>" + data[o] + "</li>"
                    }
                    dialogCont += "</ul>"


                    $("#roleDialog").find('label').addClass('active');

                    $("#giveBaddata").append(dialogCont);

                    $("#roleTitle").text("未上报指标详情");
                    $("#save_role").attr("name", "edit");

                    $("#roleDialog").modal("show");




                }
            }).on('all.bs.table', function (e, name, args) {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            });
        }



    }


}

//处室表格
function showMapright(url, queryParams, column) {
    $('#showGroup').remove();
    $("#Group").append(" <div id=\"showGroup\"><table id=\"Group_table\"></table></div>");
    $('#Group_table').bootstrapTable({
        url: url,
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
        queryParams: queryParams, //参数  
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        //pageNumber: 1,
        pageSize: 50,
        searchOnEnterKey: true,
        idField: 'systemId',
        maintainSelected: true,
        //toolbar: '#toolbar',
        columns: column
    });


}
function showMapright1(url, queryParams, column) {
    $('#showGroup1').remove();
    $("#Group1").append(" <div id=\"showGroup1\"><table id=\"Group_table1\"></table></div>");
    $('#Group_table1').bootstrapTable({
        url: url,
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
        queryParams: queryParams, //参数  
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        //pageNumber: 1,
        pageSize: 50,
        searchOnEnterKey: true,
        idField: 'systemId',
        maintainSelected: true,
        //toolbar: '#toolbar',
        columns: column
    });


}

//用户表格
function showUser(url, queryParams, column) {
    $('#showGroupuser').remove();
    $("#Groupuser").append(" <div id=\"showGroupuser\"><table id=\"Group_tableuser\"></table></div>");
    $('#Group_tableuser').bootstrapTable({
        url: url,
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
        queryParams: queryParams, //参数  
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        //pageNumber: 1,
        pageSize: 50,
        searchOnEnterKey: true,
        idField: 'systemId',
        maintainSelected: true,
        //toolbar: '#toolbar',
        columns: column
    });


}
function showUser1(url, queryParams, column) {
    $('#showGroupuser1').remove();
    $("#Groupuser1").append(" <div id=\"showGroupuser1\"><table id=\"Group_tableuser1\"></table></div>");
    $('#Group_tableuser1').bootstrapTable({
        url: url,
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
        queryParams: queryParams, //参数  
        queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        //pageNumber: 1,
        pageSize: 50,
        searchOnEnterKey: true,
        idField: 'systemId',
        maintainSelected: true,
        //toolbar: '#toolbar',
        columns: column
    });


}

//指标模态窗口 处室
function TdEdit(TD, i) {
    $("#giveBaddata").empty();
    var data = showNOdata[i];
    var dialogCont = "<ul class='dialogcont'>";
    for (var o in data) {
        dialogCont += "<li>" + data[o] + "</li>"
    }
    dialogCont += "</ul>"
    if ($(TD).attr('name') === "add") {
        clearFrom();
        $("#roleTitle").text("新增处室");
        //$('#input2').attr("value", 0);
        $("#save_role").attr("name", "add");
    } else {

        $("#roleDialog").find('label').addClass('active');

        $("#giveBaddata").append(dialogCont);

        $("#roleTitle").text("未上报指标详情");
        $("#save_role").attr("name", "edit");
    }
    $("#roleDialog").modal("show");

}

//点击弹出框消失
$('#closeDiv').on('click', function () {

    $("#Groupclick").css('display', 'none');

})

//清空表单
function clearFrom() {
    $("#roleDialog").find('label').removeClass('active');
    $('#input1').attr("value", "");
    $('#input2').attr("value", "");
    $('#input1').val('');
    $('#input2').val('');
    $("input[name='isenabled']").get(0).checked = true;
}

