var we = (function () {
    var _stateMap = { 
        $sel1:null, 
        $sel2:null, 
        $sel3:null, 
        $sel4:null, 
        $sel5:null, 
        $sel6:null
        
    };
    var _configMap = {
        foldername: ""
    };

    var existFilesInfo,init;

    existFilesInfo = function () {
        var provinces = [];
        com.server.get("/api/WayDataApi/getExistFiles", {},
            function (data) {
                
                if (data && data.length>0) {
                    if (data[0].length > 0) {
                        _stateMap.$sel1.empty();
                        _stateMap.$sel2.empty();
                        var dateArr = [];
                        _stateMap.$sel1.append("<option>全部省份</option>");
                        for (var i in data[0]) {
                            //var nameArr = data[0][i].split('_');
                            //_stateMap.$sel1.append("<option>" + nameArr[1] + "</option>");
                            dateArr.push(data[0][i]);
                        }
                        var newDates = _.uniq(dateArr);
                        for (var j in newDates) {
                            _stateMap.$sel2.append("<option>" + newDates[j] + "</option>");
                        }
                        
                    }

                    if (data[1].length > 0) {
                        _stateMap.$sel3.empty();
                        _stateMap.$sel4.empty();
                        var dateArr = [];
                        _stateMap.$sel3.append("<option>全部省份</option>");
                        for (var i in data[1]) {
                            //var nameArr = data[1][i].split('_');
                            //_stateMap.$sel3.append("<option>" + nameArr[1] + "</option>");
                            dateArr.push(data[1][i]);
                        }
                        var newDates = _.uniq(dateArr);
                        for (var j in newDates) {
                            _stateMap.$sel4.append("<option>" + newDates[j] + "</option>");
                        }

                    }

                    if (data[2].length > 0) {
                        _stateMap.$sel5.empty();
                        _stateMap.$sel6.empty();
                        var dateArr = [];
                        _stateMap.$sel5.append("<option>全部省份</option>");
                        for (var i in data[2]) {
                            //var nameArr = data[2][i].split('_');
                            //_stateMap.$sel5.append("<option>" + nameArr[1] + "</option>");
                            dateArr.push(data[2][i]);
                        }
                        var newDates = _.uniq(dateArr);
                        for (var j in newDates) {
                            _stateMap.$sel6.append("<option>" + newDates[j] + "</option>");
                        }

                    }
                    
                }

                $('.chosen-select').chosen({ allow_single_deselect: true });
            }
        )
    }

    init = function ($sel1, $sel2, $sel3, $sel4, $sel5, $sel6) {
        _stateMap.$sel1 = $sel1;
        _stateMap.$sel2 = $sel2;
        _stateMap.$sel3 = $sel3;
        _stateMap.$sel4 = $sel4;
        _stateMap.$sel5 = $sel5;
        _stateMap.$sel6 = $sel6;

        existFilesInfo();

        $("#btn-highway-download").click(function () {
            var baseDate = _stateMap.$sel2.find('option:selected').text();
            var allProvince = _stateMap.$sel1.find('option:selected').text();
            if (allProvince && baseDate)
                window.location.href = "/DownWay/index?flag=highway&idate=" + baseDate;
        })
        $("#btn-highspeed-download").click(function () {
            var monthDate = _stateMap.$sel4.find('option:selected').text();
            var monthProvince = _stateMap.$sel3.find('option:selected').text();
            if (monthProvince && monthDate)
                window.location.href = "/DownWay/index?flag=highspeed&idate=" + monthDate;
        })
        $("#btn-subway-download").click(function () {
            var eventDate = _stateMap.$sel6.find('option:selected').text();
            var eventProvince = _stateMap.$sel5.find('option:selected').text();
            if (eventDate && eventProvince)
                window.location.href = "/DownWay/index?flag=subway&idate=" + eventDate;
        })
        
    };


    return {init: init};
}());