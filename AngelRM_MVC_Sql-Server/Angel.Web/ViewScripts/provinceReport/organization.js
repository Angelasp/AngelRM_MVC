var organization = (function () {
    var _stateMap = {
        $province: null,

        btype: 0,

        boxFlag: 1
    };

    var initProvince, collectReportData, plusBox, init;

    initProvince = function () {
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

    collectData = function (params) {
        console.log(JSON.stringify({ departs: params }));
        com.server.post("/api/AppH5Api/postCollectOrganizationData", JSON.stringify({ departs: params }),
            function (data) {
                if (data && data["code"] == "1") {
                    alert("入库成功");
                }
            }
        )
    }

    plusBox = function () {
        var boxHtml = "<div id='box" + _stateMap.boxFlag + "' class='whiteBox'><div style='padding: 10px;'> ";
        boxHtml += "<label style='width: 100px;font-weight:bold;'>部门" + _stateMap.boxFlag + "</label>";
        boxHtml += "<label>名称：</label> <input type='text' name='name' value='' placeholder='部门名称' /> ";
        boxHtml += "<label style='margin-left: 20px;'>总数：</label> <input type='number'  style='width:90px;' name='allnum' value='' placeholder='部门总数' /> ";
        boxHtml += "<label style='margin-left: 20px;'>排序号：<span name='sortnum'>" + _stateMap.boxFlag + "</span></label> </div>";
        boxHtml += "<div style='margin-left: 104px; padding: 10px;'> <textarea rows='3' cols='100' name='departments' value='' placeholder='详细子部门信息，不同部门之间用逗号间隔'></textarea> </div> </div>";

        return boxHtml;
    }

    init = function ($date, $province) {
        _stateMap.$date = $date;
        _stateMap.$province = $province;

        initProvince();

        $("#save-btn").click(function () {
            var parArr = [];
            var provinceName = _stateMap.$province.find('option:selected').val();
            var dnames = [], dnums = [], snums = [], dtexts = [];
            $("input[name=name]").each(function (index, ele) {
                if ($(ele).val() == "") {
                    alert("请输入部门名称");
                    return;
                }

                dnames.push($(ele).val());
            })
            $("input[name=allnum]").each(function (index, ele) {
                dnums.push($(ele).val());
            })
            $("span[name=sortnum]").each(function (index, ele) {
                snums.push($(ele).text());
            })
            $("textarea[name=departments]").each(function (index, ele) {
                dtexts.push($(ele).val());
            })

            var len = $("input[name=name]").length;
            for (var i = 0; i < len; i++) {
                var paramObj = {};
                paramObj.pname = provinceName;
                paramObj.cname = dnames[i];
                paramObj.allnum = dnums[i];
                paramObj.sortnum = snums[i];
                paramObj.departments = dtexts[i];

                parArr.push(paramObj);
            }
            
            //console.log(parArr);
            collectData(parArr);

        })

        $("#plusBtn").click(function () {
            _stateMap.boxFlag++;

            $("#boxList").append(plusBox());
        })

        $("#minusBtn").click(function () {
            if (_stateMap.boxFlag <= 1) {
                alert("至少有一个部门");
                return;
            }

            $("#box" + _stateMap.boxFlag).remove();

            _stateMap.boxFlag--;
        })
    };

    return { init: init };
}());