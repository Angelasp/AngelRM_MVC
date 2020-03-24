var ef = (function () {
    var _stateMap = { 
        $sel1:null, 
        $sel2:null, 
        $sel3:null, 
        $sel4:null, 
        $sel5:null, 
        $sel6:null, 
        $sel7:null, 
        $sel8: null,
        $sel9: null,
        $sel10: null,
        $sel11: null,
        $sel12: null,
        $sel13: null,
        $sel14: null,

        $sel15: null,
        $sel16: null,
        $btnDown:null  //下载按钮
    };
    var _configMap = {
        foldername: ""
    };

    var existFilesInfo,init;

    existFilesInfo = function () {
        var provinces = [];
        com.server.get("/api/SpecialDataApi/getExistFiles", {},
            function (data) {
                if (data) {
                    var folders = ["base", "month", "events", "newbusiness", "complain", "dou", "view", "feedback"];
                    for (var i = 0; i < folders.length;i++) {
                        if (data[i].length > 0) {
                            var oneSel = "$sel" + ((i + 1) * 2 - 1);
                            var twoSel = "$sel" + (i + 1) * 2;

                            _stateMap[oneSel].empty();
                            _stateMap[twoSel].empty();
                            var dateArr = [];
                            _stateMap[oneSel].append("<option selected>全部省份</option>");
                            for (var j in data[i]) {
                                _stateMap[twoSel].append("<option>" + data[i][j] + "</option>");
                            }
                        }
                    }

                    $('.chosen-select').chosen({ allow_single_deselect: true });
                }

                
            }
        )
    }

    init = function ($sel1, $sel2, $sel3, $sel4, $sel5, $sel6, $sel7, $sel8, $sel9, $sel10, $sel11, $sel12, $sel13, $sel14, $sel15, $sel16, $btnDown) {
        _stateMap.$sel1 = $sel1;
        _stateMap.$sel2 = $sel2;
        _stateMap.$sel3 = $sel3;
        _stateMap.$sel4 = $sel4;
        _stateMap.$sel5 = $sel5;
        _stateMap.$sel6 = $sel6;
        _stateMap.$sel7 = $sel7;
        _stateMap.$sel8 = $sel8;
        _stateMap.$sel9 = $sel9;
        _stateMap.$sel10 = $sel10;
        _stateMap.$sel11 = $sel11;
        _stateMap.$sel12 = $sel12;
        _stateMap.$sel13 = $sel13;
        _stateMap.$sel14 = $sel14;

        _stateMap.$sel15 = $sel15;
        _stateMap.$sel16 = $sel16;

        _stateMap.$btnDown = $btnDown;

        existFilesInfo();

        $("#btn-base-download").click(function () {
            var baseDate = _stateMap.$sel2.find('option:selected').text();
            var allProvince = _stateMap.$sel1.find('option:selected').text();
            if (allProvince && baseDate)
                window.location.href = "/DownSpecial/index?flag=base&idate=" + baseDate;
        })
        $("#btn-month-download").click(function () {
            var monthDate = _stateMap.$sel4.find('option:selected').text();
            var monthProvince = _stateMap.$sel3.find('option:selected').text();
            if (monthProvince && monthDate)
                window.location.href = "/DownSpecial/index?flag=month&idate=" + monthDate;
        })
        $("#btn-events-download").click(function () {
            var eventDate = _stateMap.$sel6.find('option:selected').text();
            var eventProvince = _stateMap.$sel5.find('option:selected').text();
            if (eventDate && eventProvince)
                window.location.href = "/DownSpecial/index?flag=events&idate=" + eventDate;
        })
        $("#btn-contacts-download").click(function () {
            var contactsDate = _stateMap.$sel8.find('option:selected').text();
            var contactsProvince = _stateMap.$sel7.find('option:selected').text();
            if (contactsDate && contactsProvince)
                window.location.href = "/DownSpecial/index?flag=newbusiness&idate=" + contactsDate;
        })
        $("#btn-complain-download").click(function () {
            var contactsDate = _stateMap.$sel10.find('option:selected').text();
            var contactsProvince = _stateMap.$sel9.find('option:selected').text();
            if (contactsDate && contactsProvince)
                window.location.href = "/DownSpecial/index?flag=complain&idate=" + contactsDate;
        })

        $("#btn-dou-download").click(function () {
            var contactsDate = _stateMap.$sel12.find('option:selected').text();
            var contactsProvince = _stateMap.$sel11.find('option:selected').text();
            if (contactsDate && contactsProvince)
                window.location.href = "/DownSpecial/index?flag=dou&idate=" + contactsDate;
        })

        $("#btn-view-download").click(function () {
            var contactsDate = _stateMap.$sel14.find('option:selected').text();
            var contactsProvince = _stateMap.$sel13.find('option:selected').text();
            if (contactsDate && contactsProvince)
                window.location.href = "/DownSpecial/index?flag=view&idate=" + contactsDate;
        })

        $("#btn-feedback-download").click(function () {
            var contactsDate = _stateMap.$sel16.find('option:selected').text();
            var contactsProvince = _stateMap.$sel15.find('option:selected').text();
            if (contactsDate && contactsProvince)
                window.location.href = "/DownSpecial/index?flag=feedback&idate=" + contactsDate;
        })

    };


    return {init: init};
}());