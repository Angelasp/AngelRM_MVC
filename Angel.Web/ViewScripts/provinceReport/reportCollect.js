var report = (function () {
    var _stateMap = {
        $date: null,
        $province: null,

        btype:0
    };
    
    var initProvince, collectReportData, exportToXsl, initBar, init;

    initProvince = function () {


        
                var dateHtml = "";
           
                dateHtml += "<option value='2019年1月'>2019年1月</option>";
                dateHtml += "<option value='2019年2月'>2019年3月</option>";
                dateHtml += "<option value='2019年3月'>2019年3月</option>";
                dateHtml += "<option value='2019年4月'>2019年4月</option>";
                dateHtml += "<option value='2019年5月'>2019年5月</option>";
                dateHtml += "<option value='2019年6月'>2019年6月</option>";
                dateHtml += "<option value='2019年7月'>2019年7月</option>";
                dateHtml += "<option value='2019年8月'>2019年8月</option>";

                _stateMap.$date.append(dateHtml);
        

   


        var pArr = ['安徽', '北京', '湖南', '吉林', '江苏', '江西', '辽宁', '云南', '浙江', '重庆', '宁夏', '福建', '甘肃', '广东', '广西', '贵州', '内蒙古', '青海', '山东', '山西', '陕西', '海南', '河北', '河南', '黑龙江', '湖北', '上海', '四川', '天津', '西藏', '新疆'];
        var pinyinArr = ['anhui', 'beijing', 'hunan', 'jilin', 'jiangsu', 'jiangxi', 'liaoning', 'yunnan', 'zhejiang', 'chongqing', 'ningxia', 'fujian', 'gansu', 'guangdong', 'guangxi', 'guizhou', 'neimenggu', 'qinghai', 'shandong', 'shanxi', 'shaanxi', 'hainan', 'hebei', 'henan', 'heilongjiang', 'hubei', 'shanghai', 'sichuan', 'tianjin', 'xizang', 'xinjiang'];
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
            _stateMap.btype = 1;
            var pIndex = pinyinArr.indexOf(username);
            if (pIndex >= 0) {
                pArr = [pArr[pIndex]];
            }
        }

        _stateMap.$province.empty();
        var pHtml = "";
        for (var p in pArr) {
            pHtml += "<option>" + pArr[p] + "</option>";
        }
        _stateMap.$province.append(pHtml);
    }

    collectReportData = function (cont1, cont2) {
    }

    exportToXsl = function () {

    }

    init = function ($date, $province) {
        _stateMap.$date = $date;
        _stateMap.$province = $province;

        initProvince();

        //实例化编辑器
        var um1 = UM.getEditor('myEditor1');
        //um1.addListener('focus', function () {
        //    $('#myEditor1').html('')
        //});
        var um2 = UM.getEditor('myEditor2');
        //um2.addListener('focus', function () {
        //    $('#myEditor2').html('')
        //});


        $("#save-btn").click(function () {
            var cont1 = um1.getContent();
            var cont2 = um2.getContent();
            collectReportData(cont1, cont2);
        })
    };

    return { init: init };
}());