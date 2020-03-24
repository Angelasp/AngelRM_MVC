/*!
*Debug Of JS*
*Create:2017-03-21*/
var fieldsInfoes =
[
    {id:'table1',orderid:'getData',desc:'测试表',fields:[
        {id:'1',name:'id',caption:'ID',unit:'',format:'',isvisible:true},
        {id:'1',name:'cod1',caption:'字段1',unit:'',format:'',isvisible:true},
        {id:'1',name:'code2',caption:'字段2',unit:'',format:'',isvisible:true},
        {id:'1',name:'codd3',caption:'字段3',unit:'',format:'',isvisible:true,drill:[
            {id:'table2',controlid:'',condition:'All',conditionqueryname:[],conditioncolumnname:[]}
        ],color:[
            {minvalue:2,maxvalue:4,color:'#45B6AF'},
            {minvalue:4,maxvalue:6,color:'#DFBA49'}
        ]}
    ]}
];var fieldsInfoes = fieldsInfoes || [];
(function () {
    var fieldsLocation = [
        {
            id: 'table1', orderid: 'getLocationHZGHData', desc: '宏站规划', fields: [
            {id: '1', name: 'gridId', caption: '网格', unit: '', format: '', isvisible: true},
            {id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'LAC', caption: 'LAC', unit: '', format: '', isvisible: true},
            {id: '1', name: 'CID', caption: 'CID', unit: '', format: '', isvisible: true},
            {id: '1', name: 'netWorkType', caption: '网络(2G/3G)', unit: '', format: '', isvisible: true},
            {id: '1', name: 'indoorType', caption: '宏站或室分', unit: '', format: '', isvisible: true},
            {id: '1', name: '3GNum', caption: '3G基站数', unit: '', format: '', isvisible: true},
            {id: '1', name: '4GNum', caption: '4G基站数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'durationScale', caption: '时长倒流占比', unit: '', format: '', isvisible: true},
            {id: '1', name: '4gusernum', caption: '栅格4G用户数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'issetsite', caption: '是否建站', unit: '', format: '', isvisible: true},
            {id: '1', name: 'longicenter', caption: '经度', unit: '', format: '', isvisible: true},
            {
                id: '1', name: 'laticenter', caption: '纬度', unit: '', format: '', isvisible: true, drill: [
                {id: 'table2', controlid: '', condition: 'All', conditionqueryname: [], conditioncolumnname: []}
            ], color: [
                {minvalue: 2, maxvalue: 4, color: '#45B6AF'},
                {minvalue: 4, maxvalue: 6, color: '#DFBA49'}
            ]
            }
        ]
        },
        {
            id: 'tb0', orderid: '', desc: '', fields: [
            {id: '1', unit: '', format: '', isvisible: true, name: 'data1', caption: '地市'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data2', caption: '采集区域'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data3', caption: '采集接口'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data4', caption: '采集时段'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data5', caption: '采集网元'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data6', caption: 'S1-U'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data7', caption: ' S1-MME'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data8', caption: 'Gn'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data9', caption: 'Mr'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data10', caption: '用户数'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data11', caption: '用户总数据流量'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data12', caption: '关联数据记录数'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data13', caption: '关联用户数'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'data14', caption: '采集业务数量'}
        ]


        },
        {
            id: 'gntb1', orderid: '', desc: 'KPI汇总', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data1",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data2",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data3",
                "caption": "设备厂商"
            },
            {
                "id": 4,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data4",
                "caption": "视频业务下载速率"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data5",
                "caption": "浏览业务下载速率"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data6",
                "caption": "即时通信业务响应成功率"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data7",
                "caption": "游戏业务响应成功率"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data8",
                "caption": "LTE网络下行速率(文件大小>500KB)"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data9",
                "caption": "LTE手机用户下行速率(文件大小>500KB)"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data10",
                "caption": "LTE上网卡下行速率(文件大小>500KB)"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data11",
                "caption": "LTE MIFI下行速率(文件大小>500KB)"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data12",
                "caption": "LTE 平板电脑下行速率(文件大小>500KB)"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data13",
                "caption": "LTE网络上行速率(文件大小>200KB)"
            },
            {
                "id": 14,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data14",
                "caption": "LTE手机用户上行速率(文件大小>200KB)"
            },
            {
                "id": 15,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data15",
                "caption": "LTE上网卡上行速率(文件大小>200KB)"
            },
            {
                "id": 16,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data16",
                "caption": "LTE MIFI上行速率(文件大小>200KB)"
            },
            {
                "id": 17,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data17",
                "caption": "LTE 平板电脑上行速率(文件大小>200KB)"
            },
            {
                "id": 18,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data18",
                "caption": "LTE网络上行速率(文件大小>500KB)"
            },
            {
                "id": 19,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data19",
                "caption": "LTE手机用户上行速率(文件大小>500KB)"
            },
            {
                "id": 20,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data20",
                "caption": "LTE上网卡上行速率(文件大小>500KB)"
            },
            {
                "id": 21,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data21",
                "caption": "LTE MIFI上行速率(文件大小>500KB)"
            },
            {
                "id": 22,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data22",
                "caption": "LTE 平板电脑上行速率(文件大小>500KB)"
            },
            {
                "id": 23,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data23",
                "caption": "LTE网络下行速率(文件大小>500KB)"
            },
            {
                "id": 24,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data24",
                "caption": "LTE手机用户下行速率(文件大小>500KB)"
            },
            {
                "id": 25,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data25",
                "caption": "LTE上网卡下行速率(文件大小>500KB)"
            },
            {
                "id": 26,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data26",
                "caption": "LTE MIFI下行速率(文件大小>500KB)"
            },
            {
                "id": 27,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data27",
                "caption": "LTE 平板电脑下行速率(文件大小>500KB)"
            },
            {
                "id": 28,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data28",
                "caption": "LTE网络上行速率(文件大小>200KB)"
            },
            {
                "id": 29,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data29",
                "caption": "LTE手机用户上行速率(文件大小>200KB)"
            },
            {
                "id": 30,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data30",
                "caption": "LTE上网卡上行速率(文件大小>200KB)"
            },
            {
                "id": 31,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data31",
                "caption": "LTE MIFI上行速率(文件大小>200KB)"
            },
            {
                "id": 32,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data32",
                "caption": "LTE 平板电脑上行速率(文件大小>200KB)"
            },
            {
                "id": 33,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data33",
                "caption": "LTE网络上行速率(文件大小>500KB)"
            },
            {
                "id": 34,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data34",
                "caption": "LTE手机用户上行速率(文件大小>500KB)"
            },
            {
                "id": 35,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data35",
                "caption": "LTE上网卡上行速率(文件大小>500KB)"
            },
            {
                "id": 36,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data36",
                "caption": "LTE MIFI上行速率(文件大小>500KB)"
            },
            {
                "id": 37,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data37",
                "caption": "LTE 平板电脑上行速率(文件大小>500KB)"
            },
            {
                "id": 38,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data38",
                "caption": "LTE网络下行速率1Mbps以上时长占比(文件大小>500KB)"
            },
            {
                "id": 39,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data39",
                "caption": "LTE手机用户下行速率1Mbps以上时长占比(文件大小>500KB)"
            },
            {
                "id": 40,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data40",
                "caption": "LTE网络下行速率4Mbps以上时长占比(文件大小>500KB)"
            },
            {
                "id": 41,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data41",
                "caption": "LTE手机用户下行速率4Mbps以上时长占比(文件大小>500KB)"
            },
            {
                "id": 42,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data42",
                "caption": "LTE网络下行速率10Mbps以上时长占比(文件大小>500KB)"
            },
            {
                "id": 43,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data43",
                "caption": "LTE手机用户下行速率10Mbps以上时长占比(文件大小>500KB)"
            },
            {
                "id": 44,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data44",
                "caption": "LTE网络上行速率100Kbps以上时长占比(文件大小>200KB)"
            },
            {
                "id": 45,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data45",
                "caption": "LTE手机用户上行速率100Kbps以上时长占比(文件大小>200KB)"
            },
            {
                "id": 46,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data46",
                "caption": "LTE网络上行速率200Kbps以上时长占比(文件大小>200KB)"
            },
            {
                "id": 47,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data47",
                "caption": "LTE手机用户上行速率200Kbps以上时长占比(文件大小>200KB)"
            },
            {
                "id": 48,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data48",
                "caption": "LTE网络上行速率500Kbps以上时长占比(文件大小>200KB)"
            },
            {
                "id": 49,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data49",
                "caption": "LTE手机用户上行速率500Kbps以上时长占比(文件大小>200KB)"
            },
            {
                "id": 50,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data50",
                "caption": "LTE网络下行速率1Mbps以上次数占比(文件大小>500KB)"
            },
            {
                "id": 51,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data51",
                "caption": "LTE手机用户下行速率1Mbps以上次数占比(文件大小>500KB)"
            },
            {
                "id": 52,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data52",
                "caption": "LTE网络下行速率4Mbps以上次数占比(文件大小>500KB)"
            },
            {
                "id": 53,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data53",
                "caption": "LTE手机用户下行速率4Mbps以上次数占比(文件大小>500KB)"
            },
            {
                "id": 54,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data54",
                "caption": "LTE网络下行速率10Mbps以上次数占比(文件大小>500KB)"
            },
            {
                "id": 55,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data55",
                "caption": "LTE手机用户下行速率10Mbps以上次数占比(文件大小>500KB)"
            },
            {
                "id": 56,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data56",
                "caption": "LTE网络上行速率100Kbps以上次数占比(文件大小>200KB)"
            },
            {
                "id": 57,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data57",
                "caption": "LTE手机用户上行速率100Kbps以上次数占比(文件大小>200KB)"
            },
            {
                "id": 58,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data58",
                "caption": "LTE网络上行速率200Kbps以上次数占比(文件大小>200KB)"
            },
            {
                "id": 59,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data59",
                "caption": "LTE手机用户上行速率200Kbps以上次数占比(文件大小>200KB)"
            },
            {
                "id": 60,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data60",
                "caption": "LTE网络上行速率500Kbps以上次数占比(文件大小>200KB)"
            },
            {
                "id": 61,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data61",
                "caption": "LTE手机用户上行速率500Kbps以上次数占比(文件大小>200KB)"
            }
        ]
        },
        {
            id: 'gntb2', orderid: '', desc: '综合业务统计-下行', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data1",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data2",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data3",
                "caption": "设备厂商"
            },
            {
                "id": 4,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data4",
                "caption": "终端类型"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data5",
                "caption": "网络类型"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data6",
                "caption": "文件大小限定条件"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data7",
                "caption": "大类业务"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data8",
                "caption": "小类业务"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data9",
                "caption": "客户感知速率"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data10",
                "caption": "网络性能速率"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data11",
                "caption": "用户满意度"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data12",
                "caption": "总下载次数"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data13",
                "caption": "总成功次数"
            },
            {
                "id": 14,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data14",
                "caption": "高于基准速率的成功会话"
            },
            {
                "id": 15,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data15",
                "caption": "响应成功率"
            },
            {
                "id": 16,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data16",
                "caption": "高于基准速率的会话占比"
            },
            {
                "id": 17,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data17",
                "caption": "总下行流量(MB)"
            },
            {
                "id": 18,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data18",
                "caption": "总下载时长（客户感知速率）(S)"
            },
            {
                "id": 19,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data19",
                "caption": "总下载时长（网络性能速率）(S)"
            },
            {
                "id": 20,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data20",
                "caption": "下载次数分布(%)"
            },
            {
                "id": 21,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data21",
                "caption": "下载流量分布(%)"
            },
            {
                "id": 22,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data22",
                "caption": "下载时长（客户感知速率）分布(%)"
            },
            {
                "id": 23,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data23",
                "caption": "下载时长（网络性能速率）分布(%)"
            }
        ]
        },
        {
            id: 'gntb3', orderid: '', desc: '综合业务统计-上行', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data1",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data2",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data3",
                "caption": "设备厂商"
            },
            {
                "id": 4,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data4",
                "caption": "终端类型"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data5",
                "caption": "网络类型"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data6",
                "caption": "文件大小限定条件"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data7",
                "caption": "大类业务"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data8",
                "caption": "小类业务"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data9",
                "caption": "客户感知速率"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data10",
                "caption": "网络性能速率"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data11",
                "caption": "总上行流量(MB)"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data12",
                "caption": "总下载时长（客户感知速率）(S)"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data13",
                "caption": "总下载时长（网络性能速率）(S)"
            }
        ]
        },
        {
            id: 'gntb4', orderid: '', desc: 'HTTP大类业务统计-下行', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data1",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data2",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data3",
                "caption": "设备厂商"
            },
            {
                "id": 4,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data4",
                "caption": "终端类型"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data5",
                "caption": "网络类型"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data6",
                "caption": "文件大小限定条件"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data7",
                "caption": "大类业务"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data8",
                "caption": "小类业务"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data9",
                "caption": "客户感知速率"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data10",
                "caption": "网络性能速率"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data11",
                "caption": "用户满意度"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data12",
                "caption": "总下载次数"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data13",
                "caption": "总成功次数"
            },
            {
                "id": 14,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data14",
                "caption": "高于基准速率的成功会话"
            },
            {
                "id": 15,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data15",
                "caption": "响应成功率"
            },
            {
                "id": 16,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data16",
                "caption": "高于基准速率的会话占比"
            },
            {
                "id": 17,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data17",
                "caption": "总下行流量(MB)"
            },
            {
                "id": 18,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data18",
                "caption": "总下载时长（客户感知速率）(S)"
            },
            {
                "id": 19,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data19",
                "caption": "总下载时长（网络性能速率）(S)"
            },
            {
                "id": 20,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data20",
                "caption": "下载次数分布(%)"
            },
            {
                "id": 21,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data21",
                "caption": "下载流量分布(%)"
            },
            {
                "id": 22,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data22",
                "caption": "下载时长（客户感知速率）分布(%)"
            },
            {
                "id": 23,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data23",
                "caption": "下载时长（网络性能速率）分布(%)"
            }
        ]
        },
        {
            id: 'gntb5', orderid: '', desc: 'HTTP大类业务统计-上行', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data1",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data2",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data3",
                "caption": "设备厂商"
            },
            {
                "id": 4,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data4",
                "caption": "终端类型"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data5",
                "caption": "网络类型"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data6",
                "caption": "文件大小限定条件"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data7",
                "caption": "大类业务"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data8",
                "caption": "小类业务"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data9",
                "caption": "客户感知速率"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data10",
                "caption": "网络性能速率"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data11",
                "caption": "总上行流量(MB)"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data12",
                "caption": "总下载时长（客户感知速率）(S)"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data13",
                "caption": "总下载时长（网络性能速率）(S)"
            }
        ]
        },
        {
            id: 'gntb6', orderid: '', desc: '占比分析-下行', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "PRONAME",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "CITYNAME",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "EQUIPMENT",
                "caption": "设备厂商"
            },
            {
                "id": 4,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "TERMINAL",
                "caption": "终端类型"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "FILETYPE",
                "caption": "文件大小限定条件"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "CATEGORY",
                "caption": "大类业务"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "BUSINESS",
                "caption": "小类业务"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNSPEED",
                "caption": "下载速率(客户感知速率)(kbps)"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY",
                "caption": "总下载时长(S)"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY1",
                "caption": "其中：下载速率在0<=X<100kbps的下载总时长(S)"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY2",
                "caption": "其中：下载速率在100<=X<200kbps的下载总时长(S)"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY3",
                "caption": "其中：下载速率在200<=X<300kbps的下载总时长(S)"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY4",
                "caption": "其中：下载速率在300<=X<400kbps的下载总时长(S)"
            },
            {
                "id": 14,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY5",
                "caption": "其中：下载速率在400<=X<500kbps的下载总时长(S)"
            },
            {
                "id": 15,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY6",
                "caption": "其中：下载速率在500<=X<600kbps的下载总时长(S)"
            },
            {
                "id": 16,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY7",
                "caption": "其中：下载速率在600<=X<700kbps的下载总时长(S)"
            },
            {
                "id": 17,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY8",
                "caption": "其中：下载速率在700<=X<800kbps的下载总时长(S)"
            },
            {
                "id": 18,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY9",
                "caption": "其中：下载速率在800<=X<900kbps的下载总时长(S)"
            },
            {
                "id": 19,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY10",
                "caption": "其中：下载速率在900<=X<1024kbps的下载总时长(S)"
            },
            {
                "id": 20,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY11",
                "caption": "其中：下载速率在1mbps<=X<1.5mbps的下载总时长(S)"
            },
            {
                "id": 21,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY12",
                "caption": "其中：下载速率在1.5mbps<=X<2mbps的下载总时长(S)"
            },
            {
                "id": 22,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY13",
                "caption": "其中：下载速率在2mbps<=X<2.5mbps的下载总时长(S)"
            },
            {
                "id": 23,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY14",
                "caption": "其中：下载速率在2.5mbps<=X<3mbps的下载总时长(S)"
            },
            {
                "id": 24,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY15",
                "caption": "其中：下载速率在3mbps<=X<3.5mbps的下载总时长(S)"
            },
            {
                "id": 25,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY16",
                "caption": "其中：下载速率在3.5mbps<=X<4mbps的下载总时长(S)"
            },
            {
                "id": 27,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY17",
                "caption": "其中：下载速率在4mbps<=X<4.5mbps的下载总时长(S)"
            },
            {
                "id": 28,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY18",
                "caption": "其中：下载速率在4.5mbps<=X<5mbps的下载总时长(S)"
            },
            {
                "id": 29,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY29",
                "caption": "其中：下载速率在5mbps<=X<5.5mbps的下载总时长(S)"
            },
            {
                "id": 29,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY20",
                "caption": "其中：下载速率在5.5mbps<=X<6mbps的下载总时长(S)"
            },
            {
                "id": 30,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY21",
                "caption": "其中：下载速率在6mbps<=X<6.5mbps的下载总时长(S)"
            },
            {
                "id": 31,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY22",
                "caption": "其中：下载速率在6.5mbps<=X<7mbps的下载总时长(S)"
            },
            {
                "id": 32,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY23",
                "caption": "其中：下载速率在7mbps<=X<7.5mbps的下载总时长(S)"
            },
            {
                "id": 33,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY24",
                "caption": "其中：下载速率在7.5mbps<=X<8mbps的下载总时长(S)"
            },
            {
                "id": 34,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY25",
                "caption": "其中：下载速率在8mbps<=X<8.5mbps的下载总时长(S)"
            },
            {
                "id": 35,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY26",
                "caption": "其中：下载速率在8.5mbps<=X<9mbps的下载总时长(S)"
            },
            {
                "id": 36,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY27",
                "caption": "其中：下载速率在9mbps<=X<9.5mbps的下载总时长(S)"
            },
            {
                "id": 37,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY28",
                "caption": "其中：下载速率在9.5mbps<=X<10mbps的下载总时长(S)"
            },
            {
                "id": 38,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY29",
                "caption": "其中：下载速率在10mbps以上的下载总时长(S)"
            },
            {
                "id": 39,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER1",
                "caption": "其中：下载速率在0<=X<100kbps的下载时长占比"
            },
            {
                "id": 40,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER2",
                "caption": "其中：下载速率在100<=X<200kbps的下载时长占比"
            },
            {
                "id": 41,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER3",
                "caption": "其中：下载速率在200<=X<300kbps的下载时长占比"
            },
            {
                "id": 42,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER4",
                "caption": "其中：下载速率在300<=X<400kbps的下载时长占比"
            },
            {
                "id": 43,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER5",
                "caption": "其中：下载速率在400<=X<500kbps的下载时长占比"
            },
            {
                "id": 44,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER6",
                "caption": "其中：下载速率在500<=X<600kbps的下载时长占比"
            },
            {
                "id": 45,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER7",
                "caption": "其中：下载速率在600<=X<700kbps的下载时长占比"
            },
            {
                "id": 46,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER8",
                "caption": "其中：下载速率在700<=X<800kbps的下载时长占比"
            },
            {
                "id": 47,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER9",
                "caption": "其中：下载速率在800<=X<900kbps的下载时长占比"
            },
            {
                "id": 48,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER10",
                "caption": "其中：下载速率在900<=X<1024kbps的下载时长占比"
            },
            {
                "id": 49,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER11",
                "caption": "其中：下载速率在1mbps<=X<1.5mbps的下载时长占比"
            },
            {
                "id": 50,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER12",
                "caption": "其中：下载速率在1.5mbps<=X<2mbps的下载时长占比"
            },
            {
                "id": 51,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER13",
                "caption": "其中：下载速率在2mbps<=X<2.5mbps的下载时长占比"
            },
            {
                "id": 52,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER14",
                "caption": "其中：下载速率在2.5mbps<=X<3mbps的下载时长占比"
            },
            {
                "id": 53,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER15",
                "caption": "其中：下载速率在3mbps<=X<3.5mbps的下载时长占比"
            },
            {
                "id": 54,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER16",
                "caption": "其中：下载速率在3.5mbps<=X<4mbps的下载时长占比"
            },
            {
                "id": 55,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER17",
                "caption": "其中：下载速率在4mbps<=X<4.5mbps的下载时长占比"
            },
            {
                "id": 56,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER18",
                "caption": "其中：下载速率在4.5mbps<=X<5mbps的下载时长占比"
            },
            {
                "id": 57,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER19",
                "caption": "其中：下载速率在5mbps<=X<5.5mbps的下载时长占比"
            },
            {
                "id": 58,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER20",
                "caption": "其中：下载速率在5.5mbps<=X<6mbps的下载时长占比"
            },
            {
                "id": 59,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER21",
                "caption": "其中：下载速率在6mbps<=X<6.5mbps的下载时长占比"
            },
            {
                "id": 60,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER22",
                "caption": "其中：下载速率在6.5mbps<=X<7mbps的下载时长占比"
            },
            {
                "id": 61,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER23",
                "caption": "其中：下载速率在7mbps<=X<7.5mbps的下载时长占比"
            },
            {
                "id": 62,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER24",
                "caption": "其中：下载速率在7.5mbps<=X<8mbps的下载时长占比"
            },
            {
                "id": 63,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER25",
                "caption": "其中：下载速率在8mbps<=X<8.5mbps的下载时长占比"
            },
            {
                "id": 64,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER26",
                "caption": "其中：下载速率在8.5mbps<=X<9mbps的下载时长占比"
            },
            {
                "id": 65,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER27",
                "caption": "其中：下载速率在9mbps<=X<9.5mbps的下载时长占比"
            },
            {
                "id": 66,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER28",
                "caption": "其中：下载速率在9.5mbps<=X<10mbps的下载时长占比"
            },
            {
                "id": 67,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER29",
                "caption": "其中：下载速率在10mbps以上的下载时长占比"
            },
            {
                "id": 68,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST",
                "caption": "总下载次数"
            },
            {
                "id": 69,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST1",
                "caption": "其中：下载速率在0<=X<100kbps的下载次数"
            },
            {
                "id": 70,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST2",
                "caption": "其中：下载速率在100<=X<200kbps的下载次数"
            },
            {
                "id": 71,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST3",
                "caption": "其中：下载速率在200<=X<300kbps的下载次数"
            },
            {
                "id": 72,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST4",
                "caption": "其中：下载速率在300<=X<400kbps的下载次数"
            },
            {
                "id": 73,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST5",
                "caption": "其中：下载速率在400<=X<500kbps的下载次数"
            },
            {
                "id": 74,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST6",
                "caption": "其中：下载速率在500<=X<600kbps的下载次数"
            },
            {
                "id": 75,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST7",
                "caption": "其中：下载速率在600<=X<700kbps的下载次数"
            },
            {
                "id": 76,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST8",
                "caption": "其中：下载速率在700<=X<800kbps的下载次数"
            },
            {
                "id": 77,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST9",
                "caption": "其中：下载速率在800<=X<900kbps的下载次数"
            },
            {
                "id": 78,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST10",
                "caption": "其中：下载速率在900<=X<1024kbps的下载次数"
            },
            {
                "id": 79,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST11",
                "caption": "其中：下载速率在1mbps<=X<1.5mbps的下载次数"
            },
            {
                "id": 80,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST12",
                "caption": "其中：下载速率在1.5mbps<=X<2mbps的下载次数"
            },
            {
                "id": 81,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST13",
                "caption": "其中：下载速率在2mbps<=X<2.5mbps的下载次数"
            },
            {
                "id": 82,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST14",
                "caption": "其中：下载速率在2.5mbps<=X<3mbps的下载次数"
            },
            {
                "id": 83,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST15",
                "caption": "其中：下载速率在3mbps<=X<3.5mbps的下载次数"
            },
            {
                "id": 84,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST16",
                "caption": "其中：下载速率在3.5mbps<=X<4mbps的下载次数"
            },
            {
                "id": 85,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST17",
                "caption": "其中：下载速率在4mbps<=X<4.5mbps的下载次数"
            },
            {
                "id": 86,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST18",
                "caption": "其中：下载速率在4.5mbps<=X<5mbps的下载次数"
            },
            {
                "id": 87,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST19",
                "caption": "其中：下载速率在5mbps<=X<5.5mbps的下载次数"
            },
            {
                "id": 88,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST20",
                "caption": "其中：下载速率在5.5mbps<=X<6mbps的下载次数"
            },
            {
                "id": 89,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST21",
                "caption": "其中：下载速率在6mbps<=X<6.5mbps的下载次数"
            },
            {
                "id": 90,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST22",
                "caption": "其中：下载速率在6.5mbps<=X<7mbps的下载次数"
            },
            {
                "id": 91,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST23",
                "caption": "其中：下载速率在7mbps<=X<7.5mbps的下载次数"
            },
            {
                "id": 32,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST24",
                "caption": "其中：下载速率在7.5mbps<=X<8mbps的下载次数"
            },
            {
                "id": 93,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST25",
                "caption": "其中：下载速率在8mbps<=X<8.5mbps的下载次数"
            },
            {
                "id": 94,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST26",
                "caption": "其中：下载速率在8.5mbps<=X<9mbps的下载次数"
            },
            {
                "id": 95,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST27",
                "caption": "其中：下载速率在9mbps<=X<9.5mbps的下载次数"
            },
            {
                "id": 96,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST28",
                "caption": "其中：下载速率在9.5mbps<=X<10mbps的下载次数"
            },
            {
                "id": 97,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST29",
                "caption": "其中：下载速率在10mbps以上的下载次数"
            },
            {
                "id": 98,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER1",
                "caption": "其中：下载速率在0<=X<100kbps的下载次数占比"
            },
            {
                "id": 99,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER2",
                "caption": "其中：下载速率在100<=X<200kbps的下载次数占比"
            },
            {
                "id": 100,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER3",
                "caption": "其中：下载速率在200<=X<300kbps的下载次数占比"
            },
            {
                "id": 101,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER4",
                "caption": "其中：下载速率在300<=X<400kbps的下载次数占比"
            },
            {
                "id": 102,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER5",
                "caption": "其中：下载速率在400<=X<500kbps的下载次数占比"
            },
            {
                "id": 103,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER6",
                "caption": "其中：下载速率在500<=X<600kbps的下载次数占比"
            },
            {
                "id": 104,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER7",
                "caption": "其中：下载速率在600<=X<700kbps的下载次数占比"
            },
            {
                "id": 105,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER8",
                "caption": "其中：下载速率在700<=X<800kbps的下载次数占比"
            },
            {
                "id": 106,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER9",
                "caption": "其中：下载速率在800<=X<900kbps的下载次数占比"
            },
            {
                "id": 107,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER10",
                "caption": "其中：下载速率在900<=X<1024kbps的下载次数占比"
            },
            {
                "id": 108,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER11",
                "caption": "其中：下载速率在1mbps<=X<1.5mbps的下载次数占比"
            },
            {
                "id": 109,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER12",
                "caption": "其中：下载速率在1.5mbps<=X<2mbps的下载次数占比"
            },
            {
                "id": 110,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER13",
                "caption": "其中：下载速率在2mbps<=X<2.5mbps的下载次数占比"
            },
            {
                "id": 111,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER14",
                "caption": "其中：下载速率在2.5mbps<=X<3mbps的下载次数占比"
            },
            {
                "id": 112,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER15",
                "caption": "其中：下载速率在3mbps<=X<3.5mbps的下载次数占比"
            },
            {
                "id": 113,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER16",
                "caption": "其中：下载速率在3.5mbps<=X<4mbps的下载次数占比"
            },
            {
                "id": 114,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER17",
                "caption": "其中：下载速率在4mbps<=X<4.5mbps的下载次数占比"
            },
            {
                "id": 115,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER18",
                "caption": "其中：下载速率在4.5mbps<=X<5mbps的下载次数占比"
            },
            {
                "id": 116,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER19",
                "caption": "其中：下载速率在5mbps<=X<5.5mbps的下载次数占比"
            },
            {
                "id": 117,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER20",
                "caption": "其中：下载速率在5.5mbps<=X<6mbps的下载次数占比"
            },
            {
                "id": 118,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER21",
                "caption": "其中：下载速率在6mbps<=X<6.5mbps的下载次数占比"
            },
            {
                "id": 119,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER22",
                "caption": "其中：下载速率在6.5mbps<=X<7mbps的下载次数占比"
            },
            {
                "id": 120,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER23",
                "caption": "其中：下载速率在7mbps<=X<7.5mbps的下载次数占比"
            },
            {
                "id": 121,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER24",
                "caption": "其中：下载速率在7.5mbps<=X<8mbps的下载次数占比"
            },
            {
                "id": 122,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER25",
                "caption": "其中：下载速率在8mbps<=X<8.5mbps的下载次数占比"
            },
            {
                "id": 123,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER26",
                "caption": "其中：下载速率在8.5mbps<=X<9mbps的下载次数占比"
            },
            {
                "id": 124,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER27",
                "caption": "其中：下载速率在9mbps<=X<9.5mbps的下载次数占比"
            },
            {
                "id": 125,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER28",
                "caption": "其中：下载速率在9.5mbps<=X<10mbps的下载次数占比"
            },
            {
                "id": 126,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER29",
                "caption": "其中：下载速率在10mbps以上的下载次数占比"
            },
            {
                "id": 127,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC",
                "caption": "总下载流量(MB)"
            },
            {
                "id": 128,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC1",
                "caption": "其中：下载速率在0<=X<100kbps的下载流量"
            },
            {
                "id": 129,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC2",
                "caption": "其中：下载速率在100<=X<200kbps的下载流量"
            },
            {
                "id": 130,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC3",
                "caption": "其中：下载速率在200<=X<300kbps的下载流量"
            },
            {
                "id": 131,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC4",
                "caption": "其中：下载速率在300<=X<400kbps的下载流量"
            },
            {
                "id": 132,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC5",
                "caption": "其中：下载速率在400<=X<500kbps的下载流量"
            },
            {
                "id": 133,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC6",
                "caption": "其中：下载速率在500<=X<600kbps的下载流量"
            },
            {
                "id": 134,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC7",
                "caption": "其中：下载速率在600<=X<700kbps的下载流量"
            },
            {
                "id": 135,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC8",
                "caption": "其中：下载速率在700<=X<800kbps的下载流量"
            },
            {
                "id": 136,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC9",
                "caption": "其中：下载速率在800<=X<900kbps的下载流量"
            },
            {
                "id": 137,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC10",
                "caption": "其中：下载速率在900<=X<1024kbps的下载流量"
            },
            {
                "id": 138,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC11",
                "caption": "其中：下载速率在1mbps<=X<1.5mbps的下载流量"
            },
            {
                "id": 139,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC12",
                "caption": "其中：下载速率在1.5mbps<=X<2mbps的下载流量"
            },
            {
                "id": 140,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC13",
                "caption": "其中：下载速率在2mbps<=X<2.5mbps的下载流量"
            },
            {
                "id": 141,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC14",
                "caption": "其中：下载速率在2.5mbps<=X<3mbps的下载流量"
            },
            {
                "id": 142,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC15",
                "caption": "其中：下载速率在3mbps<=X<3.5mbps的下载流量"
            },
            {
                "id": 143,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC16",
                "caption": "其中：下载速率在3.5mbps<=X<4mbps的下载流量"
            },
            {
                "id": 144,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC17",
                "caption": "其中：下载速率在4mbps<=X<4.5mbps的下载流量"
            },
            {
                "id": 145,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC18",
                "caption": "其中：下载速率在4.5mbps<=X<5mbps的下载流量"
            },
            {
                "id": 146,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC19",
                "caption": "其中：下载速率在5mbps<=X<5.5mbps的下载流量"
            },
            {
                "id": 147,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC20",
                "caption": "其中：下载速率在5.5mbps<=X<6mbps的下载流量"
            },
            {
                "id": 148,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC21",
                "caption": "其中：下载速率在6mbps<=X<6.5mbps的下载流量"
            },
            {
                "id": 149,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC22",
                "caption": "其中：下载速率在6.5mbps<=X<7mbps的下载流量"
            },
            {
                "id": 150,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC23",
                "caption": "其中：下载速率在7mbps<=X<7.5mbps的下载流量"
            },
            {
                "id": 151,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC24",
                "caption": "其中：下载速率在7.5mbps<=X<8mbps的下载流量"
            },
            {
                "id": 152,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC25",
                "caption": "其中：下载速率在8mbps<=X<8.5mbps的下载流量"
            },
            {
                "id": 153,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC26",
                "caption": "其中：下载速率在8.5mbps<=X<9mbps的下载流量"
            },
            {
                "id": 154,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC27",
                "caption": "其中：下载速率在9mbps<=X<9.5mbps的下载流量"
            },
            {
                "id": 155,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC28",
                "caption": "其中：下载速率在9.5mbps<=X<10mbps的下载流量"
            },
            {
                "id": 156,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC29",
                "caption": "其中：下载速率在10mbps以上的下载流量"
            },
            {
                "id": 157,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER1",
                "caption": "其中：下载速率在0<=X<100kbps的下载流量占比"
            },
            {
                "id": 158,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER2",
                "caption": "其中：下载速率在100<=X<200kbps的下载流量占比"
            },
            {
                "id": 159,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER3",
                "caption": "其中：下载速率在200<=X<300kbps的下载流量占比"
            },
            {
                "id": 160,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER4",
                "caption": "其中：下载速率在300<=X<400kbps的下载流量占比"
            },
            {
                "id": 161,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER5",
                "caption": "其中：下载速率在400<=X<500kbps的下载流量占比"
            },
            {
                "id": 162,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER6",
                "caption": "其中：下载速率在500<=X<600kbps的下载流量占比"
            },
            {
                "id": 163,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER7",
                "caption": "其中：下载速率在600<=X<700kbps的下载流量占比"
            },
            {
                "id": 164,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER8",
                "caption": "其中：下载速率在700<=X<800kbps的下载流量占比"
            },
            {
                "id": 165,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER9",
                "caption": "其中：下载速率在800<=X<900kbps的下载流量占比"
            },
            {
                "id": 166,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER10",
                "caption": "其中：下载速率在900<=X<1024kbps的下载流量占比"
            },
            {
                "id": 167,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER11",
                "caption": "其中：下载速率在1mbps<=X<1.5mbps的下载流量占比"
            },
            {
                "id": 168,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER12",
                "caption": "其中：下载速率在1.5mbps<=X<2mbps的下载流量占比"
            },
            {
                "id": 169,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER13",
                "caption": "其中：下载速率在2mbps<=X<2.5mbps的下载流量占比"
            },
            {
                "id": 170,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER14",
                "caption": "其中：下载速率在2.5mbps<=X<3mbps的下载流量占比"
            },
            {
                "id": 171,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER15",
                "caption": "其中：下载速率在3mbps<=X<3.5mbps的下载流量占比"
            },
            {
                "id": 172,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER16",
                "caption": "其中：下载速率在3.5mbps<=X<4mbps的下载流量占比"
            },
            {
                "id": 173,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER17",
                "caption": "其中：下载速率在4mbps<=X<4.5mbps的下载流量占比"
            },
            {
                "id": 174,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER18",
                "caption": "其中：下载速率在4.5mbps<=X<5mbps的下载流量占比"
            },
            {
                "id": 175,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER19",
                "caption": "其中：下载速率在5mbps<=X<5.5mbps的下载流量占比"
            },
            {
                "id": 176,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER20",
                "caption": "其中：下载速率在5.5mbps<=X<6mbps的下载流量占比"
            },
            {
                "id": 177,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER21",
                "caption": "其中：下载速率在6mbps<=X<6.5mbps的下载流量占比"
            },
            {
                "id": 178,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER22",
                "caption": "其中：下载速率在6.5mbps<=X<7mbps的下载流量占比"
            },
            {
                "id": 179,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER23",
                "caption": "其中：下载速率在7mbps<=X<7.5mbps的下载流量占比"
            },
            {
                "id": 180,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER24",
                "caption": "其中：下载速率在7.5mbps<=X<8mbps的下载流量占比"
            },
            {
                "id": 181,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER25",
                "caption": "其中：下载速率在8mbps<=X<8.5mbps的下载流量占比"
            },
            {
                "id": 182,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER26",
                "caption": "其中：下载速率在8.5mbps<=X<9mbps的下载流量占比"
            },
            {
                "id": 183,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER27",
                "caption": "其中：下载速率在9mbps<=X<9.5mbps的下载流量占比"
            },
            {
                "id": 184,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER28",
                "caption": "其中：下载速率在9.5mbps<=X<10mbps的下载流量占比"
            },
            {
                "id": 185,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER29",
                "caption": "其中：下载速率在10mbps以上的下载流量占比"
            }
        ]
        },
        {
            id: 'gntb7', orderid: '', desc: '占比分析-上行', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "PRONAME",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "CITYNAME",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "EQUIPMENT",
                "caption": "设备厂商"
            },
            {
                "id": 4,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "TERMINAL",
                "caption": "终端类型"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "FILETYPE",
                "caption": "文件大小限定条件"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "CATEGORY",
                "caption": "大类业务"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "BUSINESS",
                "caption": "小类业务"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNSPEED",
                "caption": "上行速率(客户感知速率)(kbps)"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY",
                "caption": "总上行时长(S)"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY1",
                "caption": "其中：上传速率在0<=X<50kbps的下载总时长(S)"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY2",
                "caption": "其中：上传速率在50<=X<100kbps的下载总时长(S)"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY3",
                "caption": "其中：上传速率在100<=X<150kbps的下载总时长(S)"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY4",
                "caption": "其中：上传速率在150<=X<200kbps的下载总时长(S)"
            },
            {
                "id": 14,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY5",
                "caption": "其中：上传速率在200<=X<250kbps的下载总时长(S)"
            },
            {
                "id": 15,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY6",
                "caption": "其中：上传速率在250<=X<300kbps的下载总时长(S)"
            },
            {
                "id": 16,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY7",
                "caption": "其中：上传速率在300<=X<400kbps的下载总时长(S)"
            },
            {
                "id": 17,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY8",
                "caption": "其中：上传速率在400<=X<500kbps的下载总时长(S)"
            },
            {
                "id": 18,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAY9",
                "caption": "其中：上传速率在500Kbps以上的下载总时长(S)"
            },

            {
                "id": 19,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER1",
                "caption": "其中：上行速率在0<=X<50Kbps的上行时长占比"
            },
            {
                "id": 20,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER2",
                "caption": "其中：上行速率在50<=X<100Kbps的上行时长占比"
            },
            {
                "id": 21,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER3",
                "caption": "其中：上行速率在100<=X<150Kbps的上行时长占比"
            },
            {
                "id": 22,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER4",
                "caption": "其中：上行速率在150<=X<200Kbps的上行时长占比"
            },
            {
                "id": 23,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER5",
                "caption": "其中：上行速率在200<=X<250Kbps的上行时长占比"
            },
            {
                "id": 24,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER6",
                "caption": "其中：上行速率在250<=X<300Kbps的上行时长占比"
            },
            {
                "id": 25,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER7",
                "caption": "其中：上行速率在300<=X<400Kbps的上行时长占比"
            },
            {
                "id": 26,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER8",
                "caption": "其中：上行速率在400<=X<500Kbps的上行时长占比"
            },
            {
                "id": 27,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNDELAYPER9",
                "caption": "其中：上行速率在500Kbps以上的上行时长占比"
            },
            {
                "id": 28,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST",
                "caption": "总上行次数"
            },
            {
                "id": 29,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST1",
                "caption": "其中：上传速率在0<=X<50kbps的访问次数"
            },
            {
                "id": 30,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST2",
                "caption": "其中：上传速率在50<=X<100kbps的访问次数"
            },
            {
                "id": 31,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST3",
                "caption": "其中：上传速率在100<=X<150kbps的访问次数"
            },
            {
                "id": 32,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST4",
                "caption": "其中：上传速率在150<=X<200kbps的访问次数"
            },
            {
                "id": 33,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST5",
                "caption": "其中：上传速率在200<=X<250kbps的访问次数"
            },
            {
                "id": 34,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST6",
                "caption": "其中：上传速率在250<=X<300kbps的访问次数"
            },
            {
                "id": 35,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST7",
                "caption": "其中：上传速率在300<=X<400kbps的访问次数"
            },
            {
                "id": 36,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST8",
                "caption": "其中：上传速率在400<=X<500kbps的访问次数"
            },
            {
                "id": 37,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUEST9",
                "caption": "其中：上传速率在500Kbps以上的访问次数"
            },

            {
                "id": 38,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER1",
                "caption": "其中：上行速率在0<=X<50Kbps的上行次数占比"
            },
            {
                "id": 39,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER2",
                "caption": "其中：上行速率在50<=X<100Kbps的上行次数占比"
            },
            {
                "id": 40,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER3",
                "caption": "其中：上行速率在100<=X<150Kbps的上行次数占比"
            },
            {
                "id": 41,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER4",
                "caption": "其中：上行速率在150<=X<200Kbps的上行次数占比"
            },
            {
                "id": 42,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER5",
                "caption": "其中：上行速率在200<=X<250Kbps的上行次数占比"
            },
            {
                "id": 43,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER6",
                "caption": "其中：上行速率在250<=X<300Kbps的上行次数占比"
            },
            {
                "id": 44,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER7",
                "caption": "其中：上行速率在300<=X<400Kbps的上行次数占比"
            },
            {
                "id": 45,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER8",
                "caption": "其中：上行速率在400<=X<500Kbps的上行次数占比"
            },
            {
                "id": 46,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNREQUESTPER9",
                "caption": "其中：上行速率在500Kbps以上的上行次数占比"
            },

            {
                "id": 47,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC",
                "caption": "总上行流量(MB)"
            },
            {
                "id": 48,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC1",
                "caption": "其中：上传速率在0<=X<50kbps的上传流量"
            },
            {
                "id": 49,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC2",
                "caption": "其中：上传速率在50<=X<100kbps的上传流量"
            },
            {
                "id": 50,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC3",
                "caption": "其中：上传速率在100<=X<150kbps的上传流量"
            },
            {
                "id": 51,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC4",
                "caption": "其中：上传速率在150<=X<200kbps的上传流量"
            },
            {
                "id": 52,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC5",
                "caption": "其中：上传速率在200<=X<250kbps的上传流量"
            },
            {
                "id": 53,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC6",
                "caption": "其中：上传速率在250<=X<300kbps的上传流量"
            },
            {
                "id": 54,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC7",
                "caption": "其中：上传速率在300<=X<400kbps的上传流量"
            },
            {
                "id": 55,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC8",
                "caption": "其中：上传速率在400<=X<500kbps的上传流量"
            },
            {
                "id": 56,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFIC9",
                "caption": "其中：上传速率在500Kbps以上的上传流量"
            },
            {
                "id": 57,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER1",
                "caption": "其中：上行速率在0<=X<50Kbps的上行流量占比"
            },
            {
                "id": 58,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER2",
                "caption": "其中：上行速率在50<=X<100Kbps的上行流量占比"
            },
            {
                "id": 59,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER3",
                "caption": "其中：上行速率在100<=X<150Kbps的上行流量占比"
            },
            {
                "id": 60,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER4",
                "caption": "其中：上行速率在150<=X<200Kbps的上行流量占比"
            },
            {
                "id": 61,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER5",
                "caption": "其中：上行速率在200<=X<250Kbps的上行流量占比"
            },
            {
                "id": 62,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER6",
                "caption": "其中：上行速率在250<=X<300Kbps的上行流量占比"
            },
            {
                "id": 63,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER7",
                "caption": "其中：上行速率在300<=X<400Kbps的上行流量占比"
            },
            {
                "id": 64,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER8",
                "caption": "其中：上行速率在400<=X<500Kbps的上行流量占比"
            },
            {
                "id": 65,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "DOWNTRAFFICPER9",
                "caption": "其中：上行速率在500Kbps以上的上行流量占比"
            }
        ]
        },

        {
            id: 'gnAngel_kpi', orderid: 'id', desc: 'KPI汇总', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "proname",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "cityname",
                "caption": "城市"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "imper",
                "caption": "即时通信业务响应成功率"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "cupretranrate",
                "caption": "即时通信业务TCP上行重传率"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "cdownretranrate",
                "caption": "即时通信业务TCP下行重传率"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "c_responsedelay",
                "caption": "即时通信业务首包时延"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "gameper",
                "caption": "游戏业务响应成功率"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "gupretranrate",
                "caption": "游戏业务TCP上行重传率"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "gdownretranrate",
                "caption": "游戏业务TCP下行重传率"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "g_responsedelay",
                "caption": "游戏业务首包时延"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "SCANPER",
                "caption": "浏览业务响应成功率"
            },
            {
                "id": 14,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "supretranrate",
                "caption": "浏览业务TCP上行重传率"
            },
            {
                "id": 15,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "sdownretranrate",
                "caption": "浏览业务TCP下行重传率"
        },
            {
                "id": 16,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "s_responsedelay",
                "caption": "浏览业务首包时延"
            },
            {
                "id": 17,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "videoper",
                "caption": "视频业务响应成功率"
            },
            {
                "id": 18,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "vupretranrate",
                "caption": "视频业务TCP上行重传率"
            },
            {
                "id": 19,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "vdownretranrate",
                "caption": "视频业务TCP下行重传率"
            },
            {
                "id": 20,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "v_responsedelay",
                "caption": "视频业务首包时延"
            },
            {
                "id": 21,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "storper",
                "caption": "应用商店业务响应成功率"
            },
            {
                "id": 22,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "stupretranrate",
                "caption": "应用商店业务TCP上行重传率"
            },
            {
                "id": 23,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "stdownretranrate",
                "caption": "应用商店业务TCP下行重传率"
            },
            {
                "id": 24,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "st_responsedelay",
                "caption": "应用商店业务首包时延"
            },
            {
                "id": 25,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "musicper",
                "caption": "音乐业务响应成功率"
            },
            {
                "id": 26,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "mupretranrate",
                "caption": "音乐业务TCP上行重传率"
            },
            {
                "id": 27,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "mdownretranrate",
                "caption": "音乐业务TCP下行重传率"
            },
            {
                "id": 28,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "m_responsedelay",
                "caption": "音乐业务首包时延"
            },
            {
                "id": 29,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "scansessionpor",
                "caption": "浏览小于500kbps会话占比（>500KB）"
            },
            {
                "id": 30,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "videosessionpor",
                "caption": "视频小于500kbps会话占比（>500KB）"
            },
            {
                "id": 31,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "STORSESSIONPOR",
                "caption": "应用商店小于500kbps会话占比（>500KB）"
            },
            {
                "id": 32,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "musicsessionpor",
                "caption": "音乐小于500kbps会话占比（>500KB）"
            }
        ]
        },
        {
            id: 'gnAngel_sumdown', orderid: '', desc: '综合业务统计-下行', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "proname",
                "caption": "省份"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "cityname",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "equipment",
                "caption": "设备厂商"
            },
            {
                "id": 4,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "terminal",
                "caption": "终端类型"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "nettype",
                "caption": "网络类型"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype",
                "caption": "文件大小限定条件"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "category",
                "caption": "大类业务"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "bussnies",
                "caption": "小类业务"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "userspeed",
                "caption": "客户感知速率"
            },
            {
                "id": 10,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "espeed",
                "caption": "网络性能速率"
            },
            {
                "id": 11,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "useracceptper",
                "caption": "用户满意度"
            },
            {
                "id": 12,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "downrequest",
                "caption": "总下载次数"
            },
            {
                "id": 13,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "downsuccess",
                "caption": "总成功次数"
            },
            {
                "id": 14,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "useraccept",
                "caption": "高于基准速率的成功会话"
            },
            {
                "id": 15,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "downsuccessper",
                "caption": "响应成功率"
            },
            {
                "id": 16,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "downusersuccessper",
                "caption": "高于基准速率的会话占比"
            },
            {
                "id": 17,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "downtraffic",
                "caption": "总下行流量(MB)"
            },
            {
                "id": 18,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "dldelay",
                "caption": "总下载时长（客户感知速率）(S)"
            },
            {
                "id": 19,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "emptydelay",
                "caption": "总下载时长（网络性能速率）(S)"
            },
            {
                "id": 20,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "downreqestper",
                "caption": "下载次数分布(%)"
            },
            {
                "id": 21,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "downdltrafficper",
                "caption": "下载流量分布(%)"
            },
            {
                "id": 22,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "dldelayper",
                "caption": "下载时长（客户感知速率）分布(%)"
            },
            {
                "id": 23,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "emptydelayper",
                "caption": "下载时长（网络性能速率）分布(%)"
            },
            {
                "id": 24,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "downretranrate",
                "caption": "TCP下行重传率"
            },
            {
                "id": 25,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "responsedelay",
                "caption": "首包时延"
            },
            {
                "id": 26,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "sessionaccont",
                "caption": "500Kbps以下会话占比（大于500KB）"
            },
            {
                "id": 27,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype1",
                "caption": "0-5KB"
            },
            {
                "id": 28,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype2",
                "caption": "5-50KB"
            },
            {
                "id": 29,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype3",
                "caption": "50-100KB"
            },
            {
                "id": 30,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype4",
                "caption": "100-200KB"
            },
            {
                "id": 31,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype5",
                "caption": "200-500KB"
            },
            {
                "id": 32,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype6",
                "caption": "500KB-1M"
            },
            {
                "id": 33,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype7",
                "caption": "1-5MB"
            },
            {
                "id": 34,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype8",
                "caption": "5-20MB"
            },
            {
                "id": 35,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "filetype9",
                "caption": ">20M"
            }
        ]
        },

        {
            id: 'totalquality', orderid: '', desc: '', fields: [
            //{id: '0', unit: '', format: '', visible: false, name: 'num', caption: 'sort1'},
            {id: '0', unit: '', format: '', visible: true, name: 'province_cn', caption: '中文名'},
            {id: '1', unit: '', format: '', visible: true, name: 'province', caption: '项目名称'}
        ]
        },
        {
            id: 'totaltable', orderid: '', desc: '', fields: [
            {id: '0', unit: '', format: '', isvisible: true, name: 'orderby', caption: 'sort'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'dimension', caption: '维度'},

            {id: '5', unit: '', format: '', isvisible: true, name: 'qualityxdrcnt', caption: '质差XDR数量'},
            {id: '6', unit: '', format: '', isvisible: true, name: 'qualityxdrrate', caption: '质差XDR数量<br/>占比(%)'}
        ]
        },
        {
            id: 'totaltable_tac', orderid: '', desc: '', fields: [
            // {id: '0', unit: '', format: '', isvisible: false,name: 'orderby', caption: 'sort'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'factory', caption: '终端品牌'},
            {id: '5', unit: '', format: '', isvisible: true, name: 'cnt', caption: '质差XDR数量'},
            {id: '6', unit: '', format: '', isvisible: true, name: 'rate', caption: '质差XDR数量占比(%)'}
        ]
        },
        {
            id: 'sptd', orderid: '', desc: '', fields: [
            {id: '1', unit: '', format: '', isvisible: true, name: 'destinationip', caption: 'SPIP'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'categoryname', caption: '业务大类'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'app_type', caption: '业务小类'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'poorqualitytype', caption: '质差类型'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'responddelay', caption: '平均响应时延(ms)'},
            {id: '5', unit: '', format: '', isvisible: true, name: 'dlrate', caption: '平均下载速率(kbps)'},
            {id: '6', unit: '', format: '', isvisible: true, name: 'requsetsuccessrate', caption: '访问成功率(%)'},
            {id: '7', unit: '', format: '', isvisible: true, name: 'usernumber', caption: ' 访问次数'},
            {id: '8', unit: '', format: '', isvisible: true, name: 'totalflow', caption: '总流量(KB)'},
            {id: '9', unit: '', format: '', isvisible: true, name: 'dlrate_500k', caption: '大于500K下载速率(kbps)'},
            {id: '7', unit: '', format: '', isvisible: true, name: 'requestcount_500k', caption: '大于500K访问次数'},
            {id: '8', unit: '', format: '', isvisible: true, name: 'flow_500k', caption: '大于500K流量(KB)'},
            {id: '9', unit: '', format: '', isvisible: true, name: 'flowrate_500', caption: '大于500K流量占比(%)'}
        ]
        },
        {
            id: 'sptddetails_1', orderid: '', desc: '', fields: [
            {id: '2', unit: '', format: '', isvisible: true, name: 'categoryname', caption: '业务大类'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'spcount', caption: 'SP总数'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'poorcount', caption: '质差SP数'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'poorsprate', caption: '质差SP占比(%)'}
        ]
        },
        {
            id: 'sptddetails_2', orderid: '', desc: '', fields: [
            {id: '2', unit: '', format: '', isvisible: true, name: 'poorqualitytype', caption: '质差类型'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'poorcount', caption: '质差SP数'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'poorrate', caption: '质差SP占比(%)'}
        ]
        },

        {
            id: 'sgwtd', orderid: '', desc: '', fields: [
            {id: '1', unit: '', format: '', isvisible: true, name: 'sgw_ip_add', caption: 'SGW_IP_Add'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'categoryname', caption: '业务大类'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'app_type', caption: '业务小类'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'poorqualitytype', caption: '质差类型'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'responddelay', caption: '平均响应时延(ms)'},
            {id: '5', unit: '', format: '', isvisible: true, name: 'dlrate', caption: '平均下载速率(kbps)'},
            {id: '6', unit: '', format: '', isvisible: true, name: 'requsetsuccessrate', caption: '访问成功率(%)'},
            {id: '7', unit: '', format: '', isvisible: true, name: 'usernumber', caption: ' 访问次数'},
            {id: '8', unit: '', format: '', isvisible: true, name: 'totalflow', caption: '总流量(KB)'},
            {id: '9', unit: '', format: '', isvisible: true, name: 'dlrate_500k', caption: '大于500K下载速率(kbps)'},
            {id: '7', unit: '', format: '', isvisible: true, name: 'requestcount_500k', caption: '大于500K访问次数'},
            {id: '8', unit: '', format: '', isvisible: true, name: 'flow_500k', caption: '大于500K流量(KB)'},
            {id: '9', unit: '', format: '', isvisible: true, name: 'flowrate_500', caption: '大于500K流量占比(%)'}
        ]


        },
        {
            id: 'sgwtd_right', orderid: '', desc: '', fields: [
            {id: '1', unit: '', format: '', isvisible: true, name: 'sgw_ip_add', caption: 'SGW_IP_Add'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'poorqualitytype', caption: '质差类型'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'usernumber', caption: '用户数量'}
        ]


        },
        {
            id: 'tactd', orderid: '', desc: '', fields: [
            {id: '1', unit: '', format: '', isvisible: true, name: 'factory', caption: '品牌'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'mobiletype', caption: '型号'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'mobilecategory', caption: '类型'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'taccount', caption: '终端数量'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'totaldata', caption: '总流量(KB)'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'sessionrequest', caption: '访问次数'},
            {id: '5', unit: '', format: '', isvisible: true, name: 'allscore', caption: '得分'},
            {id: '6', unit: '', format: '', isvisible: true, name: 'attachsusscesrate', caption: '附着成功率(%)'},
            {id: '7', unit: '', format: '', isvisible: true, name: 'attachscore', caption: ' 附着成功率得分'},
            {id: '8', unit: '', format: '', isvisible: true, name: 'httprequestrate', caption: '访问成功率(%)'},
            {id: '9', unit: '', format: '', isvisible: true, name: 'httpscore', caption: ' 访问成功率得分'},
            {id: '10', unit: '', format: '', isvisible: true, name: 'ruofugairate', caption: '弱覆盖比例(%)'},
            {id: '11', unit: '', format: '', isvisible: true, name: 'ruofugaiscore', caption: '弱覆盖比例得分'},
            //{id: '12', unit: '', format: '', isvisible: true, name: 'useroptr', caption: '每用户LTE网间互操作次数'},
            //{id: '13', unit: '', format: '', isvisible: true, name: 'useroptscore', caption: '每用户LTE网间互操作次数得分'},
            {id: '14', unit: '', format: '', isvisible: true, name: 'downdelayrate', caption: '下行平均速率(kbps)'},
            {id: '15', unit: '', format: '', isvisible: true, name: 'downdelaycore', caption: '下行平均速率得分'},
            {id: '16', unit: '', format: '', isvisible: true, name: 'delay23g', caption: '2/3G时长占比(%)'},
            {id: '17', unit: '', format: '', isvisible: true, name: 'delay23gcore', caption: ' 2/3G时长占比得分'},

        ]


        },
        {
            id: 'tactddetails_2', orderid: '', desc: '', fields: [
            {id: '1', unit: '', format: '', isvisible: true, name: 'factory', caption: '品牌'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'taccount', caption: '终端数量'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'tacrate', caption: '终端占比(%)'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'flow', caption: '总流量(kb)'},
            {id: '5', unit: '', format: '', isvisible: true, name: 'flowrate', caption: '流量占比'}
        ]
        },
        {
            id: 'tactddetails_subapp', orderid: '', desc: '', fields: [
            {id: '1', unit: '', format: '', isvisible: true, name: 'factory', caption: '品牌'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'mobiletype', caption: '型号'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'taccount', caption: '终端数量'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'tacrate', caption: '终端占比(%)'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'flow', caption: '总流量(kb)'},
            {id: '5', unit: '', format: '', isvisible: true, name: 'flowrate', caption: '流量占比'}
        ]
        },
        {
            id: 'tactdright', orderid: '', desc: '', fields: [
            {id: '1', unit: '', format: '', isvisible: true, name: 'factory', caption: '名称'},
            {id: '1', unit: '', format: '', isvisible: true, name: 'allscore', caption: '得分'},
            {id: '2', unit: '', format: '', isvisible: true, name: 'attachscore', caption: '附着成功率得分'},
            {id: '3', unit: '', format: '', isvisible: true, name: 'httpscore', caption: '访问成功率得分'},
            {id: '4', unit: '', format: '', isvisible: true, name: 'ruofugaiscore', caption: '弱覆盖比例得分'},
            {id: '5', unit: '', format: '', isvisible: true, name: 'downdelaycore', caption: '下行平均速率得分'},
            {id: '5', unit: '', format: '', isvisible: true, name: 'delay23gcore', caption: '2/3G时长占比得分'}
        ]
        },
        {
            id: 'tb1', orderid: '', desc: '', fields: [
            {
                "id": 1,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data1",
                "caption": "城市"
            },
            {
                "id": 3,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data3",
                "caption": "场景类型"
            },
            {
                "id": 2,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data2",
                "caption": "用户数"
            },
            {
                "id": 5,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data5",
                "caption": "时长(分钟)"
            },
            {
                "id": 6,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data6",
                "caption": "下行流量(MB)"
            },
            {
                "id": 7,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data7",
                "caption": "上行流量(MB)"
            },
            {
                "id": 9,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data9",
                "caption": "TCP无线时延(ms)"
            },
            {
                "id": 8,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data8",
                "caption": "TCP核心网时延(ms)"
            },
            {
                "id": 65,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data65",
                "caption": "下行TCP重传包数"
            },
            {
                "id": 66,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data66",
                "caption": "下行TCP总包数"
            },
            {
                "id": 67,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data67",
                "caption": "下行TCP重传率(%)"
            },
            {
                "id": 68,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data68",
                "caption": "上行TCP重传包数"
            },
            {
                "id": 69,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data69",
                "caption": "上行TCP总包数"
            },
            {
                "id": 70,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data70",
                "caption": "上行TCP重传率(%)"
            },
            {
                "id": 14,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data14",
                "caption": "Attach时延(ms)"
            },
            {
                "id": 15,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data15",
                "caption": "Attach请求成功次数"
            },
            {
                "id": 16,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data16",
                "caption": "Attach请求总次数"
            },
            {
                "id": 17,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data17",
                "caption": "Attach请求成功率(%)"
            },
            {
                "id": 18,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data18",
                "caption": "EPS缺省承载建立时延(ms)"
            },
            {
                "id": 19,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data19",
                "caption": "流程总次数"
            },
            {
                "id": 20,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data20",
                "caption": "EPS成功总次数"
            },
            {
                "id": 21,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data21",
                "caption": "EPS缺省承载建立成功率(%)"
            },
            {
                "id": 22,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data22",
                "caption": "下行流量(MB)"
            },
            {
                "id": 23,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data23",
                "caption": "时长(分钟)"
            },
            {
                "id": 24,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data24",
                "caption": "下载速率(Kbps)"
            },
            {
                "id": 25,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data25",
                "caption": "首包响应时长(ms)"
            },
            {
                "id": 26,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data26",
                "caption": "会话总次数"
            },
            {
                "id": 27,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data27",
                "caption": "会话成功次数"
            },
            {
                "id": 28,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data28",
                "caption": "会话成功率(%)"
            },
            {
                "id": 29,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data29",
                "caption": "会话成功次数"
            },
            {
                "id": 30,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data30",
                "caption": "高于满意速率的会话次数"
            },
            {
                "id": 31,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data31",
                "caption": "高于满意速率的会话占比(%)"
            },
            {
                "id": 32,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data32",
                "caption": "会话总次数"
            },
            {
                "id": 33,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data33",
                "caption": "会话成功次数"
            },
            {
                "id": 34,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data34",
                "caption": "会话成功率(%）"
            },
            {
                "id": 35,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data35",
                "caption": "用户满意度(%)"
            },
            {
                "id": 36,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data36",
                "caption": "时长-1(分钟)"
            },
            {
                "id": 37,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data37",
                "caption": "流量(MB)"
            },
            {
                "id": 38,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data38",
                "caption": "下载速率(kbps)"
            },
            {
                "id": 39,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data39",
                "caption": "时长-1(>500K)(分钟)"
            },
            {
                "id": 40,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data40",
                "caption": "流量（>500K)(MB)"
            },
            {
                "id": 41,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data41",
                "caption": "下载速率（>500K)(kbps)"
            },
            {
                "id": 71,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data71",
                "caption": "http下载总次数(500K以上文件大小)"
            },
            {
                "id": 72,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data72",
                "caption": "下载速率在：0<=X<200kbps的下载次数(500K以上文件大小)"
            },
            {
                "id": 73,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data73",
                "caption": "下载速率在：200<=X<300kbps的下载次数(500K以上文件大小)"
            },
            {
                "id": 74,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data74",
                "caption": "下载速率在：300<=X<500kbps的下载次数(500K以上文件大小)"
            },
            {
                "id": 75,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data75",
                "caption": "下载速率在：500kbps<=X下载次数(500K以上文件大小)"
            },
            {
                "id": 76,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data76",
                "caption": "下载速率在：0<=X<200kbps的下载次数占比(500K以上文件大小)(%)"
            },
            {
                "id": 77,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data77",
                "caption": "下载速率在：200<=X<300kbps的下载次数占比(500K以上文件大小)(%)"
            },
            {
                "id": 78,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data78",
                "caption": "下载速率在：300<=X<500kbps的下载次数占比(500K以上文件大小)(%)"
            },
            {
                "id": 79,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data79",
                "caption": "下载速率在：500kbps<=X下载次数占比(500K以上文件大小)(%)"
            },
            {
                "id": 42,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data42",
                "caption": "时长(分钟)"
            },
            {
                "id": 43,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data43",
                "caption": "流量(MB)"
            },
            {
                "id": 44,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data44",
                "caption": "上传速率(kbps)"
            },
            {
                "id": 45,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data45",
                "caption": "时长-1(>200K)(分钟)"
            },
            {
                "id": 46,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data46",
                "caption": "流量（>200K)(MB)"
            },
            {
                "id": 47,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data47",
                "caption": "上传速率（>200K)(kbps)"
            },
            {
                "id": 48,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data48",
                "caption": "时长-1(>500K)(分钟)"
            },
            {
                "id": 49,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data49",
                "caption": "流量（>500K)(MB)"
            },
            {
                "id": 50,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data50",
                "caption": "上传速率（>500K)(kbps)"
            },
            {
                "id": 54,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data54",
                "caption": "室内外小区切换总次数(次)"
            },
            {
                "id": 55,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data55",
                "caption": "每用户室内外小区切换次数(次)"
            },
            {
                "id": 56,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data56",
                "caption": "每分钟室内外小区切换次数(次)"
            },
            {
                "id": 57,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data57",
                "caption": "小区切换总次数(次)"
            },
            {
                "id": 58,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data58",
                "caption": "每用户4G网内小区切换次数(次)"
            },
            {
                "id": 59,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data59",
                "caption": "每分钟4G网内小区切换次数(次)"
            },
            {
                "id": 60,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data60",
                "caption": "掉线用户数"
            },
            {
                "id": 61,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data61",
                "caption": "掉线率(%)"
            },
            {
                "id": 62,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data62",
                "caption": "释放总次数"
            },
            {
                "id": 63,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data63",
                "caption": "掉线次数"
            },
            {
                "id": 64,
                "unit": "",
                "format": "",
                "isvisible": true,
                "name": "data64",
                "caption": "掉线率(%)"
            }
        ]

        },
        {
            id: 'tb2', orderid: '', desc: '', fields: [
                {
                    "id": 1,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data1",
                    "caption": "城市"
                },
                {
                    "id": 2,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data2",
                    "caption": "场景类型"
                },
                {
                    "id": 3,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data3",
                    "caption": "大类业务类型"
                },
                {
                    "id": 4,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data4",
                    "caption": "小类业务类型"
                },
                {
                    "id": 5,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data5",
                    "caption": "TCP无线时延(ms)"
                },
                {
                    "id": 7,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data7",
                    "caption": "TCP核心网时延(ms)"
                }, {
                    "id": 59,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data59",
                    "caption": "下行TCP重传包数"
                },
                {
                    "id": 60,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data60",
                    "caption": "下行TCP总包数"
                }, {
                    "id": 61,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data61",
                    "caption": "下行TCP重传率(%)"
                },
                {
                    "id": 62,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data62",
                    "caption": "上行TCP重传包数"
                }, {
                    "id": 63,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data63",
                    "caption": "上行TCP总包数"
                },
                {
                    "id": 64,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data64",
                    "caption": "上行TCP重传率(%)"
                },
                {
                    "id": 21,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data21",
                    "caption": "下行流量(MB)"
                },
                {
                    "id": 22,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data22",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 23,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data23",
                    "caption": "下载速率(kbps)"
                },
                {
                    "id": 25,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data25",
                    "caption": "首包响应时长(ms)"
                },
                {
                    "id": 27,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data27",
                    "caption": "会话总次数(次)"
                },
                {
                    "id": 28,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data28",
                    "caption": "会话成功次数(次)"
                },
                {
                    "id": 29,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data29",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 31,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data31",
                    "caption": "会话成功次数(次)"
                },
                {
                    "id": 32,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data32",
                    "caption": "高于满意速率且成功的会话次数(次)"
                },
                {
                    "id": 33,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data33",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 34,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data34",
                    "caption": "会话总次数(次)"
                },
                {
                    "id": 35,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data35",
                    "caption": "会话成功次数(次)"
                },
                {
                    "id": 36,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data36",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 37,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data37",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 39,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data39",
                    "caption": "时长-1(分钟)"
                },
                {
                    "id": 40,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data40",
                    "caption": "流量(MB)"
                },
                {
                    "id": 41,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data41",
                    "caption": "下载速率(kbps)"
                },
                {
                    "id": 43,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data43",
                    "caption": "时长-1（>500K)(分钟)"
                },
                {
                    "id": 44,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data44",
                    "caption": "流量（>500K)(MB)"
                },
                {
                    "id": 45,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data45",
                    "caption": "下载速率（>500K)(kbps)"
                },
                {
                    "id": 65,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data65",
                    "caption": "http下载总次数(500K以上文件大小)"
                },
                {
                    "id": 66,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data66",
                    "caption": "下载速率在：0<=X<200kbps的下载次数(500K以上文件大小)"
                },
                {
                    "id": 67,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data67",
                    "caption": "下载速率在：200<=X<300kbps的下载次数(500K以上文件大小)"
                },
                {
                    "id": 68,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data68",
                    "caption": "下载速率在：300<=X<500kbps的下载次数(500K以上文件大小)"
                },
                {
                    "id": 69,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data69",
                    "caption": "下载速率在：500kbps<=X下载次数(500K以上文件大小)"
                },
                {
                    "id": 70,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data70",
                    "caption": "下载速率在：0<=X<200kbps的下载次数占比(500K以上文件大小)(%)"
                },
                {
                    "id": 71,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data71",
                    "caption": "下载速率在：200<=X<300kbps的下载次数占比(500K以上文件大小)(%)"
                },
                {
                    "id": 72,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data72",
                    "caption": "下载速率在：300<=X<500kbps的下载次数占比(500K以上文件大小)(%)"
                },
                {
                    "id": 73,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data73",
                    "caption": "下载速率在：500kbps<=X下载次数占比(500K以上文件大小)(%)"
                },
                {
                    "id": 47,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data47",
                    "caption": "时长-1(分钟)"
                },
                {
                    "id": 48,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data48",
                    "caption": "流量(MB)"
                },
                {
                    "id": 49,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data49",
                    "caption": "上传速率(kbps)"
                },
                {
                    "id": 51,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data51",
                    "caption": "时长-1（>200K)(分钟)"
                },
                {
                    "id": 52,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data52",
                    "caption": "流量（>200K)(MB)"
                },
                {
                    "id": 53,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data53",
                    "caption": "上传速率（>200K)(kbps)"
                },
                {
                    "id": 55,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data55",
                    "caption": "时长-1（>500K)(分钟)"
                },
                {
                    "id": 56,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data56",
                    "caption": "流量（>500K)(MB)"
                },
                {
                    "id": 57,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data57",
                    "caption": "上传速率（>500K)(kbps)"
                }
            ]
        },
        {
            id: 'tb3', orderid: '', desc: '', fields: [
                {
                    "id": 1,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data1",
                    "caption": "大类业务类型"
                },
                {
                    "id": 2,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data2",
                    "caption": "小类业务类型"
                },
                {
                    "id": 3,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data3",
                    "caption": "流量(MB)"
                },
                {
                    "id": 4,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data4",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 5,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data5",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 6,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data6",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 7,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data7",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 8,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data8",
                    "caption": "时长占比(%)"
                }

                ,
                {
                    "id": 11,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data11",
                    "caption": "流量(MB)"
                },
                {
                    "id": 12,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data12",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 13,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data13",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 14,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data14",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 15,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data15",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 16,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data16",
                    "caption": "时长占比(%)"
                },

                {
                    "id": 19,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data19",
                    "caption": "流量(MB)"
                },
                {
                    "id": 20,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data20",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 21,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data21",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 22,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data22",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 23,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data23",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 24,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data24",
                    "caption": "时长占比(%)"
                },

                {
                    "id": 27,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data27",
                    "caption": "流量(MB)"
                },
                {
                    "id": 28,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data28",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 29,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data29",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 30,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data30",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 31,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data31",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 32,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data32",
                    "caption": "时长占比(%)"
                },


                {
                    "id": 35,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data35",
                    "caption": "流量(MB)"
                },
                {
                    "id": 36,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data36",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 37,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data37",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 38,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data38",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 39,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data39",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 40,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data40",
                    "caption": "时长占比(%)"
                },

                {
                    "id": 43,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data43",
                    "caption": "流量(MB)"
                },
                {
                    "id": 44,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data44",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 45,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data45",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 46,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data46",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 47,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data47",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 48,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data48",
                    "caption": "时长占比(%)"
                },

                {
                    "id": 51,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data51",
                    "caption": "流量(MB)"
                },
                {
                    "id": 52,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data52",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 53,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data53",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 54,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data54",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 55,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data55",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 56,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data56",
                    "caption": "时长占比(%)"
                },

                {
                    "id": 59,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data59",
                    "caption": "流量(分钟)"
                },
                {
                    "id": 60,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data60",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 61,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data61",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 62,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data62",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 63,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data63",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 64,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data64",
                    "caption": "时长占比(%)"
                },


                {
                    "id": 67,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data67",
                    "caption": "流量(MB)"
                },
                {
                    "id": 68,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data68",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 69,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data69",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 70,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data70",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 71,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data71",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 72,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data72",
                    "caption": "时长占比(%)"
                },


                {
                    "id": 75,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data75",
                    "caption": "流量(MB)"
                },
                {
                    "id": 76,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data76",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 77,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data77",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 78,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data78",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 79,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data79",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 80,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data80",
                    "caption": "时长占比(%)"
                },

                {
                    "id": 83,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data83",
                    "caption": "流量(MB)"
                },
                {
                    "id": 84,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data84",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 85,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data85",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 86,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data86",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 87,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data87",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 88,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data88",
                    "caption": "时长占比(%)"
                }


                , {
                    "id": 89,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data89",
                    "caption": "流量(MB)"
                },
                {
                    "id": 90,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data90",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 91,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data91",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 92,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data92",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 93,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data93",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 94,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data94",
                    "caption": "时长占比(%)"
                }
                , {
                    "id": 95,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data95",
                    "caption": "流量(MB)"
                },
                {
                    "id": 96,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data96",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 97,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data97",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 98,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data98",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 99,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data99",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 100,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data100",
                    "caption": "时长占比(%)"
                }

                , {
                    "id": 101,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data101",
                    "caption": "流量(MB)"
                },
                {
                    "id": 102,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data102",
                    "caption": "流量占比(%)"
                },
                {
                    "id": 103,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data103",
                    "caption": "会话次数(次)"
                },
                {
                    "id": 104,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data104",
                    "caption": "会话次数占比(%)"
                },
                {
                    "id": 105,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data105",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 106,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data106",
                    "caption": "时长占比(%)"
                }
            ]
        },
        {
            id: 'tb4', orderid: '', desc: '', fields: [
                {
                    "id": 1,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data1",
                    "caption": "城市"
                },
                {
                    "id": 2,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data2",
                    "caption": "场景类型"
                },
                {
                    "id": 3,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data3",
                    "caption": "4G（全网）"
                },
                {
                    "id": 4,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data4",
                    "caption": "4G占比(%)"
                }, {
                    "id": 5,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data5",
                    "caption": "2/3G（全网）"
                },
                {
                    "id": 6,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data6",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 7,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data7",
                    "caption": "4G(全网)"
                },
                {
                    "id": 8,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data8",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 9,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data9",
                    "caption": "2/3G"
                },
                {
                    "id": 10,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data10",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 11,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data11",
                    "caption": "4G(全网)(分钟)"
                },
                {
                    "id": 12,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data12",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 13,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data13",
                    "caption": "2/3G(分钟)"
                },
                {
                    "id": 14,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data14",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 15,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data15",
                    "caption": "4G（全网）(MB)"
                },
                {
                    "id": 16,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data16",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 17,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data17",
                    "caption": "2/3G(MB)"
                },
                {
                    "id": 18,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data18",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 84,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data84",
                    "caption": "4G(全网)下载速率(kbps)"
                }, {
                    "id": 85,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data85",
                    "caption": "2/3G下载速率(kbps)"
                },
                {
                    "id": 19,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data19",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 20,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data20",
                    "caption": "流量(MB)"
                },
                {
                    "id": 21,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data21",
                    "caption": "速率(kbps)"
                },
                {
                    "id": 22,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data22",
                    "caption": "会话总次数"
                },
                {
                    "id": 23,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data23",
                    "caption": "会话成功次数"
                },
                {
                    "id": 24,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data24",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 25,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data25",
                    "caption": "会话成功次数"
                },
                {
                    "id": 26,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data26",
                    "caption": "高于满意速率且成功的会话次数"
                },
                {
                    "id": 27,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data27",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 28,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data28",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 32,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data32",
                    "caption": "会话总次数"
                },
                {
                    "id": 33,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data33",
                    "caption": "会话成功次数"
                },
                {
                    "id": 34,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data34",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 35,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data35",
                    "caption": "会话成功次数"
                },
                {
                    "id": 36,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data36",
                    "caption": "高于满意速率且成功的会话次数"
                },
                {
                    "id": 37,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data37",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 38,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data38",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 42,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data42",
                    "caption": "会话总次数"
                },
                {
                    "id": 43,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data43",
                    "caption": "会话成功次数"
                },
                {
                    "id": 44,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data44",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 45,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data45",
                    "caption": "会话成功次数"
                },
                {
                    "id": 46,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data46",
                    "caption": "高于满意速率且成功的会话次数"
                },
                {
                    "id": 47,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data47",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 48,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data48",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 49,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data49",
                    "caption": "4G（共有）"
                },
                {
                    "id": 50,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data50",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 51,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data51",
                    "caption": "2/3G"
                },
                {
                    "id": 52,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data52",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 86,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data86",
                    "caption": "4G（共有）"
                },
                {
                    "id": 87,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data87",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 88,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data88",
                    "caption": "2/3G"
                },
                {
                    "id": 89,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data89",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 53,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data53",
                    "caption": "4G（共有）(分钟)"
                },
                {
                    "id": 54,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data54",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 55,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data55",
                    "caption": "2/3G(分钟)"
                },
                {
                    "id": 56,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data56",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 57,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data57",
                    "caption": "4G（共有）(MB)"
                },
                {
                    "id": 58,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data58",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 59,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data59",
                    "caption": "2/3G(MB)"
                },
                {
                    "id": 60,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data60",
                    "caption": "2/3G占比(%)"
                },

                {
                    "id": 90,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data90",
                    "caption": "4G(共有)下载速率(kbps)"
                },
                {
                    "id": 91,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data91",
                    "caption": "2/3G下载速率(kbps)"
                },
                {
                    "id": 61,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data61",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 62,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data62",
                    "caption": "流量(MB)"
                },
                {
                    "id": 63,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data63",
                    "caption": "速率(kbps)"
                },
                {
                    "id": 64,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data64",
                    "caption": "会话总次数"
                },
                {
                    "id": 65,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data65",
                    "caption": "会话成功次数"
                },
                {
                    "id": 66,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data66",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 67,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data67",
                    "caption": "会话总次数"
                },
                {
                    "id": 68,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data68",
                    "caption": "高于满意速率且成功的会话次数(%)"
                },
                {
                    "id": 69,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data69",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 70,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data70",
                    "caption": "用户满意度"
                },
                {
                    "id": 92,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data92",
                    "caption": "会话总次数"
                },
                {
                    "id": 93,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data93",
                    "caption": "会话成功次数"
                },
                {
                    "id": 94,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data94",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 95,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data95",
                    "caption": "会话成功次数"
                },
                {
                    "id": 96,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data96",
                    "caption": "高于满意速率且成功的会话次数(次)"
                },
                {
                    "id": 97,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data97",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 98,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data98",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 77,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data77",
                    "caption": "会话总次数"
                },
                {
                    "id": 78,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data78",
                    "caption": "会话成功次数"
                },
                {
                    "id": 79,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data79",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 80,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data80",
                    "caption": "会话成功次数"
                },
                {
                    "id": 81,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data81",
                    "caption": "高于满意速率且成功的会话次数(次)"
                },
                {
                    "id": 82,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data82",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 83,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data83",
                    "caption": "用户满意度(%)"
                }
            ]
        },
        {
            id: 'tb5', orderid: '', desc: '', fields: [
                {
                    "id": 1,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data1",
                    "caption": "城市"
                },
                {
                    "id": 2,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data2",
                    "caption": "场景类型"
                },
                {
                    "id": 3,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data3",
                    "caption": "4G（全网）"
                },
                {
                    "id": 4,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data4",
                    "caption": "4G占比(%)"
                }, {
                    "id": 5,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data5",
                    "caption": "2/3G（全网）"
                },
                {
                    "id": 6,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data6",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 7,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data7",
                    "caption": "4G(全网)"
                },
                {
                    "id": 8,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data8",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 9,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data9",
                    "caption": "2/3G"
                },
                {
                    "id": 10,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data10",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 11,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data11",
                    "caption": "4G(全网)(分钟)"
                },
                {
                    "id": 12,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data12",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 13,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data13",
                    "caption": "2/3G(分钟)"
                },
                {
                    "id": 14,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data14",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 15,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data15",
                    "caption": "4G（全网）(MB)"
                },
                {
                    "id": 16,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data16",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 17,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data17",
                    "caption": "2/3G(MB)"
                },
                {
                    "id": 18,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data18",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 84,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data84",
                    "caption": "4G(全网)下载速率(kbps)"
                }, {
                    "id": 85,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data85",
                    "caption": "2/3G下载速率(kbps)"
                },
                {
                    "id": 19,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data19",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 20,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data20",
                    "caption": "流量(MB)"
                },
                {
                    "id": 21,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data21",
                    "caption": "速率(kbps)"
                },
                {
                    "id": 22,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data22",
                    "caption": "会话总次数"
                },
                {
                    "id": 23,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data23",
                    "caption": "会话成功次数"
                },
                {
                    "id": 24,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data24",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 25,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data25",
                    "caption": "会话成功次数"
                },
                {
                    "id": 26,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data26",
                    "caption": "高于满意速率且成功的会话次数"
                },
                {
                    "id": 27,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data27",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 28,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data28",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 32,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data32",
                    "caption": "会话总次数"
                },
                {
                    "id": 33,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data33",
                    "caption": "会话成功次数"
                },
                {
                    "id": 34,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data34",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 35,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data35",
                    "caption": "会话成功次数"
                },
                {
                    "id": 36,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data36",
                    "caption": "高于满意速率且成功的会话次数"
                },
                {
                    "id": 37,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data37",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 38,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data38",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 42,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data42",
                    "caption": "会话总次数"
                },
                {
                    "id": 43,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data43",
                    "caption": "会话成功次数"
                },
                {
                    "id": 44,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data44",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 45,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data45",
                    "caption": "会话成功次数"
                },
                {
                    "id": 46,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data46",
                    "caption": "高于满意速率且成功的会话次数"
                },
                {
                    "id": 47,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data47",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 48,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data48",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 49,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data49",
                    "caption": "4G（共有）"
                },
                {
                    "id": 50,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data50",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 51,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data51",
                    "caption": "2/3G"
                },
                {
                    "id": 52,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data52",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 86,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data86",
                    "caption": "4G（共有）"
                },
                {
                    "id": 87,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data87",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 88,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data88",
                    "caption": "2/3G"
                },
                {
                    "id": 89,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data89",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 53,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data53",
                    "caption": "4G（共有）(分钟)"
                },
                {
                    "id": 54,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data54",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 55,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data55",
                    "caption": "2/3G(分钟)"
                },
                {
                    "id": 56,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data56",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 57,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data57",
                    "caption": "4G（共有）(MB)"
                },
                {
                    "id": 58,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data58",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 59,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data59",
                    "caption": "2/3G(MB)"
                },
                {
                    "id": 60,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data60",
                    "caption": "2/3G占比(%)"
                },

                {
                    "id": 90,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data90",
                    "caption": "4G(共有)下载速率(kbps)"
                },
                {
                    "id": 91,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data91",
                    "caption": "2/3G下载速率(kbps)"
                },
                {
                    "id": 61,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data61",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 62,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data62",
                    "caption": "流量(MB)"
                },
                {
                    "id": 63,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data63",
                    "caption": "速率(kbps)"
                },
                {
                    "id": 64,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data64",
                    "caption": "会话总次数"
                },
                {
                    "id": 65,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data65",
                    "caption": "会话成功次数"
                },
                {
                    "id": 66,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data66",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 67,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data67",
                    "caption": "会话总次数"
                },
                {
                    "id": 68,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data68",
                    "caption": "高于满意速率且成功的会话次数(%)"
                },
                {
                    "id": 69,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data69",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 70,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data70",
                    "caption": "用户满意度"
                },
                {
                    "id": 92,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data92",
                    "caption": "会话总次数"
                },
                {
                    "id": 93,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data93",
                    "caption": "会话成功次数"
                },
                {
                    "id": 94,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data94",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 95,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data95",
                    "caption": "会话成功次数"
                },
                {
                    "id": 96,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data96",
                    "caption": "高于满意速率且成功的会话次数(次)"
                },
                {
                    "id": 97,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data97",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 98,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data98",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 77,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data77",
                    "caption": "会话总次数"
                },
                {
                    "id": 78,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data78",
                    "caption": "会话成功次数"
                },
                {
                    "id": 79,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data79",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 80,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data80",
                    "caption": "会话成功次数"
                },
                {
                    "id": 81,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data81",
                    "caption": "高于满意速率且成功的会话次数(次)"
                },
                {
                    "id": 82,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data82",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 83,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data83",
                    "caption": "用户满意度(%)"
                }
            ]
        },
        {
            id: 'tb6', orderid: '', desc: '', fields: [
                {
                    "id": 1,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data1",
                    "caption": "场景类型"
                },
                {
                    "id": 2,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data2",
                    "caption": "大类业务类型"
                },
                {
                    "id": 3,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data3",
                    "caption": "4G（全网）(分钟)"
                },
                {
                    "id": 4,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data4",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 5,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data5",
                    "caption": "2/3G(全网)(分钟)"
                },
                {
                    "id": 6,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data6",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 7,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data7",
                    "caption": "4G（全网）(MB)"
                },
                {
                    "id": 8,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data8",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 9,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data9",
                    "caption": "2/3G(全网)(MB)"
                },
                {
                    "id": 10,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data10",
                    "caption": "2/3G占比(%)"
                },
                {
                    "id": 63,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data73",
                    "caption": "4G速率(kbps)"
                }, {
                    "id": 64,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data74",
                    "caption": "2/3G速率(kbps)"
                }, {
                    "id": 65,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data75",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 66,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data76",
                    "caption": "流量(MB)"
                },
                {
                    "id": 67,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data77",
                    "caption": "速率(kbps)"
                },
                {
                    "id": 50,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data50",
                    "caption": "4G（共有）(分钟)"
                },
                {
                    "id": 51,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data51",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 52,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data52",
                    "caption": "2/3G（共有）(分钟)"
                },
                {
                    "id": 53,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data53",
                    "caption": "2/3G占比(%)"
                }, {
                    "id": 54,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data54",
                    "caption": "4G（共有）(MB)"
                },
                {
                    "id": 55,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data55",
                    "caption": "4G占比(%)"
                },
                {
                    "id": 56,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data56",
                    "caption": "2/3G（共有）(MB)"
                },
                {
                    "id": 57,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data57",
                    "caption": "2/3G占比(%)"
                }, {
                    "id": 58,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data58",
                    "caption": "4G速率(kbps)"
                }, {
                    "id": 59,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data59",
                    "caption": "2/3G速率(kbps)"
                }, {
                    "id": 60,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data60",
                    "caption": "时长(分钟)"
                },
                {
                    "id": 61,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data61",
                    "caption": "流量(MB)"
                },
                {
                    "id": 62,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data62",
                    "caption": "速率(kbps)"
                },
                {
                    "id": 11,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data11",
                    "caption": "时长（>500K)(分钟)"
                },
                {
                    "id": 12,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data12",
                    "caption": "流量（>500K)(MB)"
                },
                {
                    "id": 13,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data13",
                    "caption": "速率（>500K)(kbps)"
                },
                {
                    "id": 14,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data14",
                    "caption": "会话总次数"
                },
                {
                    "id": 15,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data15",
                    "caption": "会话成功次数(次)"
                },
                {
                    "id": 16,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data16",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 17,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data17",
                    "caption": "会话成功次数"
                },
                {
                    "id": 18,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data18",
                    "caption": "高于满意速率且成功的会话次数(次)"
                },
                {
                    "id": 19,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data19",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 20,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data20",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 63,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data63",
                    "caption": "时长（>500K)(分钟)"
                },
                {
                    "id": 64,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data64",
                    "caption": "流量（>500K)(MB)"
                },
                {
                    "id": 65,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data65",
                    "caption": "速率（>500K)(kbps)"
                }, {
                    "id": 66,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data66",
                    "caption": "会话总次数(次)"
                },
                {
                    "id": 67,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data67",
                    "caption": "会话成功次数(次)"
                },
                {
                    "id": 68,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data68",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 69,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data69",
                    "caption": "会话成功次数"
                },
                {
                    "id": 70,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data70",
                    "caption": "高于满意速率且成功的会话次数(次)"
                },
                {
                    "id": 71,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data71",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 72,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data72",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 21,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data21",
                    "caption": "时长（>500K)(分钟)"
                },
                {
                    "id": 22,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data22",
                    "caption": "流量（>500K)(MB)"
                },
                {
                    "id": 23,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data23",
                    "caption": "速率（>500K)(kbps)"
                },
                {
                    "id": 24,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data24",
                    "caption": "会话总次数"
                },
                {
                    "id": 25,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data25",
                    "caption": "会话成功次数"
                },
                {
                    "id": 26,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data26",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 27,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data27",
                    "caption": "会话成功次数"
                },
                {
                    "id": 28,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data28",
                    "caption": "高于满意速率且成功的会话次数"
                },
                {
                    "id": 29,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data29",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 30,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data30",
                    "caption": "用户满意度(%)"
                },
                {
                    "id": 31,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data31",
                    "caption": "时长（>500K)(分钟)"
                },
                {
                    "id": 32,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data32",
                    "caption": "流量（>500K)(MB)"
                },
                {
                    "id": 33,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data33",
                    "caption": "速率（>500K)(kbps)"
                },
                {
                    "id": 34,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data34",
                    "caption": "会话总次数"
                },
                {
                    "id": 35,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data35",
                    "caption": "会话成功次数"
                },
                {
                    "id": 36,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data36",
                    "caption": "会话成功率(%）"
                },
                {
                    "id": 37,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data37",
                    "caption": "会话成功次数"
                },
                {
                    "id": 38,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data38",
                    "caption": "高于满意速率且成功的会话次数(次)"
                },
                {
                    "id": 39,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data39",
                    "caption": "高于满意速率且成功的会话占比(%)"
                },
                {
                    "id": 40,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data40",
                    "caption": "用户满意度(%)"
                }
            ]
        },
        {
            id: 'tb7', orderid: '', desc: '', fields: [
                {
                    "id": 1,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data1",
                    "caption": "城市"
                },
                {
                    "id": 2,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data2",
                    "caption": "场景"
                },
                {
                    "id": 3,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data3",
                    "caption": "用户数"
                },
                {
                    "id": 4,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data4",
                    "caption": "涉及互操作用户"
                },
                {
                    "id": 5,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data5",
                    "caption": "涉及互操作用户数占比(%)"
                },
                {
                    "id": 6,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data6",
                    "caption": "23G/4G频繁互操作次数"
                },
                {
                    "id": 7,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data7",
                    "caption": "每用户23G/4G频繁互操作次数"
                },
                {
                    "id": 8,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data8",
                    "caption": "用户数量"
                },
                {
                    "id": 9,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data9",
                    "caption": "用户占比(%)"
                },
                {
                    "id": 10,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data10",
                    "caption": "用户数量"
                },
                {
                    "id": 11,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data11",
                    "caption": "用户占比(%)"
                },
                {
                    "id": 12,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data12",
                    "caption": "用户数"
                },
                {
                    "id": 13,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data13",
                    "caption": "涉及互操作用户"
                },
                {
                    "id": 14,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data14",
                    "caption": "占比(%)"
                },
                {
                    "id": 15,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data15",
                    "caption": "23G/4G频繁互操作次数"
                },
                {
                    "id": 16,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data16",
                    "caption": "每用户23G/4G频繁互操作次数"
                },
                {
                    "id": 17,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data17",
                    "caption": "LTE和GN共有用户数"
                },
                {
                    "id": 18,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data18",
                    "caption": " 长时间在23G的用户"
                },
                {
                    "id": 19,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data19",
                    "caption": "用户占比(%)"
                },
                {
                    "id": 20,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data20",
                    "caption": " LTE用户数"
                },
                {
                    "id": 21,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data21",
                    "caption": "wifi用户数"
                },
                {
                    "id": 22,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data22",
                    "caption": "用户占比(%)"
                }
            ]
        },
        {
            id: 'tb8', orderid: '', desc: '', fields: [
                {
                    "id": 1,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data1",
                    "caption": "城市"
                },
                {
                    "id": 2,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data2",
                    "caption": "场景类型"
                },
                {
                    "id": 3,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data3",
                    "caption": "电平区间（排除采样点低于50后）"
                },
                {
                    "id": 4,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data4",
                    "caption": "平均接入电平（dBm）"
                },
                {
                    "id": 5,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data5",
                    "caption": "电平区间（排除采样点低于5000后）"
                },
                {
                    "id": 6,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data6",
                    "caption": "采样点数量"
                },
                {
                    "id": 7,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data7",
                    "caption": "电平值(众数)(dBm)"
                },
                {
                    "id": 8,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data8",
                    "caption": "该电平值记录条数"
                },
                {
                    "id": 9,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data9",
                    "caption": "MR采样点数"
                }, {
                    "id": 25,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data25",
                    "caption": "RSRP采样点数"
                },
                {
                    "id": 10,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data10",
                    "caption": "MR.RSRP<-110dbm采样点数"
                },
                {
                    "id": 11,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data11",
                    "caption": "MR.RSRP<-100dbm采样点数"
                },
                {
                    "id": 12,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data12",
                    "caption": "MR.RSRP<-110dbm采样点数占比(%)"
                },
                {
                    "id": 13,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data13",
                    "caption": "MR.RSRP<-100dbm采样点数占比(%)"
                }, {
                    "id": 27,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data27",
                    "caption": "上行MR Sinr 总采样点数"
                },
                {
                    "id": 14,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data14",
                    "caption": "上行R Sinr 小于0db的采样点数"
                },
                {
                    "id": 15,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data15",
                    "caption": "上行MR Sinr 小于0db的采样点数占比(%)"
                }, {
                    "id": 26,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data26",
                    "caption": "下行MR Sinr 总采样点数"
                },
                {
                    "id": 18,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data18",
                    "caption": " 下行R Sinr 小于-3db的采样点数"
                },
                {
                    "id": 19,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data19",
                    "caption": "下行MR Sinr 小于-3db的采样点数占比(%)"
                }, {
                    "id": 28,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data28",
                    "caption": "MR.RSRP 和 下行SINR 总采样点数"
                },
                {
                    "id": 20,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data20",
                    "caption": "MR.RSRP<-110dbm且下行SINR<-3的采样点数"
                },
                {
                    "id": 21,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data21",
                    "caption": "MR.RSRP<-110dbm且下行SINR<-3的采样点数占比(%)"
                },
                {
                    "id": 22,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data22",
                    "caption": "MR.RSRP>=-110dbm且下行SINR>=3的采样点数"
                },
                {
                    "id": 23,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data23",
                    "caption": "MR.RSRP>=-110dbm且下行SINR>=-3的采样点数占比(%)"
                },
                {
                    "id": 24,
                    "unit": "",
                    "format": "",
                    "isvisible": true,
                    "name": "data24",
                    "caption": "平均SINR值(下行)"
                }
            ]
        },
        {
            id: 'userlist', orderid: '', desc: '', fields: [
                {id: '1', unit: '', format: '', isvisible: true, name: 'data1', caption: '用户名称'},
                {id: '1', unit: '', format: '', isvisible: true, name: 'data2', caption: '是否启用'},
                {id: '1', unit: '', format: '', isvisible: true, name: 'data3', caption: '登录次数'},
                {id: '1', unit: '', format: '', isvisible: true, name: 'data4', caption: '创建时间'},
                {id: '1', unit: '', format: '', isvisible: true, name: 'data5', caption: '最后登录时间'},
                {id: '1', unit: '', format: '', isvisible: true, name: 'data6', caption: '操作'}
            ]
        },
        {
            id: 'loginlog', orderid: '', desc: '', fields: [
                {id: '1', unit: '', format: '', isvisible: true, name: 'id', caption: '序号'},
                {id: '2', unit: '', format: '', isvisible: true, name: 'userid', caption: '人员编码'},
                {id: '3', unit: '', format: '', isvisible: true, name: 'username', caption: '人员名称'},
                {id: '4', unit: '', format: '', isvisible: true, name: 'roleid', caption: '角色编码'},
                {id: '5', unit: '', format: '', isvisible: true, name: 'rolename', caption: '角色名称'},
                {id: '6', unit: '', format: '', isvisible: true, name: 'logintime', caption: '登录时间'}
            ]
        },
        {
            id: 'Operationlog', orderid: '', desc: '', fields: [
                {id: '1', unit: '', format: '', isvisible: true, name: 'id', caption: '序号'},
                {id: '2', unit: '', format: '', isvisible: true, name: 'userid', caption: '人员编码'},
                {id: '3', unit: '', format: '', isvisible: true, name: 'username', caption: '人员名称'},
                {id: '4', unit: '', format: '', isvisible: true, name: 'roleid', caption: '角色编码'},
                {id: '5', unit: '', format: '', isvisible: true, name: 'rolename', caption: '角色名称'},
                {id: '6', unit: '', format: '', isvisible: true, name: 'logposition', caption: '操作位置'},
                {id: '7', unit: '', format: '', isvisible: true, name: 'operationtype', caption: '操作类型'},
                {id: '8', unit: '', format: '', isvisible: true, name: 'operationparam', caption: '操作数据'},
                {id: '9', unit: '', format: '', isvisible: true, name: 'createdate', caption: '操作时间'}
            ]
        }, {
            id: 'rolelist', orderid: '', desc: '', fields: [
                {id: '1', unit: '', format: '', isvisible: true, name: 'data1', caption: '角色名称'},
                {id: '1', unit: '', format: '', isvisible: true, name: 'data2', caption: '描述'},
                {id: '1', unit: '', format: '', isvisible: true, name: 'data3', caption: '是否启用'},
                {id: '1', unit: '', format: '', isvisible: true, name: 'data4', caption: '操作'}
            ]
        },
        {
            id: 'table_project_list', orderid: '项目列表', desc: '', fields: [
            {id: '0', name: 'p_en', caption: '选择', unit: '', format: '', isvisible: true, width: '29px'},
            {id: '1', name: 'p_chn', caption: '项目名称', unit: '', format: '', isvisible: true, width: '57px'},
            {id: '2', name: 'p_province', caption: '省份', unit: '', format: '', isvisible: true, width: '100px'},
            {id: '3', name: 'p_city', caption: '地市', unit: '', format: '', isvisible: true, width: '100px'},
            {id: '4', name: 'p_desc', caption: '项目描述', unit: '', format: '', isvisible: true, width: '57px'},
            {id: '5', name: 'p_type', caption: '数据类型', unit: '', format: '', isvisible: true, width: '77px'},
            {id: '5', name: 'p_state', caption: '状&nbsp;态', unit: '', format: '', isvisible: true, width: '65px'},
            {id: '6', name: 'p_isenabled', caption: '是否可用', unit: '', format: '', isvisible: true, width: '60px'},
            {id: '7', name: 'p_createtime', caption: '创建时间', unit: '', format: '', isvisible: true, width: '120px'},
            {id: '8', name: 'p_createuser', caption: '创建人', unit: '', format: '', isvisible: true, width: '57px'},
            {id: '5', name: 'p_type', caption: '操&nbsp;作', unit: '', format: '', isvisible: true, width: '45px'}
        ]
        },
        {
            id: 'table_weakcoverage_list', orderid: '弱覆盖', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'overallcount', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: true},
            {id: '5', name: 'overcount', caption: '弱覆盖小区数(个)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'overround', caption: '弱覆盖小区比例(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_weakcoveragexx_list', orderid: '弱覆盖详细', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '弱覆盖采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '弱覆盖采样点占比(%)', unit: '', format: '', isvisible: true},//,
            {id: '9', name: 'overallcount', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: false},
            {id: '10', name: 'overcount', caption: '弱覆盖小区数(个)', unit: '', format: '', isvisible: false},
            {id: '11', name: 'overround', caption: '弱覆盖小区比例(%)', unit: '', format: '', isvisible: false}
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_weakcoveragegridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '弱覆盖采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '弱覆盖采样点占比(%)', unit: '', format: '', isvisible: true}//,
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_upprbgridcell_list', orderid: '上行PRB根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '上行PRB采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '上行PRB采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        }, {
            id: 'table_downprbgridcell_list', orderid: '下行PRB根据栅格查询小区详细', desc: '', fields: [
                {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
                {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
                {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
                {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
                {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
                {id: '7', name: 'count1', caption: '下行PRB采样点数(条)', unit: '', format: '', isvisible: true},
                {id: '8', name: 'round', caption: '下行PRB采样点占比(%)', unit: '', format: '', isvisible: true}
            ]
        },
        {
            id: 'table_downsinrgridcell_list', orderid: '下行低SINR根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '下行低SINR采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '下行低SINR采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_rsrqgridcell_list', orderid: 'RSRQ根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '质差采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '质差采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_upsinrgridcell_list', orderid: '上行低SINR根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '上行低SINR采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '上行低SINR采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_comcvercell_list', orderid: '根据栅格查询综合弱覆盖小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '综合弱覆盖采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '综合弱覆盖采样点占比(%)', unit: '', format: '', isvisible: true}//,
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_overcoverage_list', orderid: '过覆盖', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'alleci', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: true},
            {id: '5', name: 'rowcount', caption: '过覆盖小区数(个)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'overrate', caption: '过覆盖小区比例(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_overcoveragexx_list', orderid: '过覆盖详细', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allneibor', caption: '总邻区数(个)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '过覆盖邻区数(个)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'neiborrate', caption: '过覆盖邻区占比(%)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_overcoveragegridcell_list', orderid: '根据主小区查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '过覆盖采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '过覆盖采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_overlapcoverage_list', orderid: '重叠覆盖', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'allcity', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: true},
            {id: '5', name: 'rowcount', caption: '重叠覆盖小区数(个)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'overlapround', caption: '重叠覆盖小区比例(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'sysManagerUser_list', orderid: 'u_createtime', desc: '', fields: [
            {id: '0', name: 'u_id', caption: '选择', unit: '', format: '', isvisible: true},
            {id: '1', name: 'u_name', caption: '用户名', unit: '', format: '', isvisible: true},
            {id: '4', name: 'u_isenabled', caption: '是否可用', unit: '', format: '', isvisible: true},
            {id: '5', name: 'u_createtime', caption: '创建时间', unit: '', format: '', isvisible: true},
            {id: '6', name: 'u_createuser', caption: '创建人', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_overlapcoveragexx_list', orderid: '重叠覆盖详细', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '重叠覆盖采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '重叠覆盖采样点占比(%)', unit: '', format: '', isvisible: true}//,
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_overlapcoveragegridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '重叠覆盖采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '重叠覆盖采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downsnr_list', orderid: '下行SNR', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'overallcount', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: true},
            {id: '5', name: 'overcount', caption: '下行信噪比差小区数(个)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'overround', caption: '下行信噪比差小区比例(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downsnrxx_list', orderid: '下行SNR详细', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '下行信噪比差采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '下行信噪比差采样点占比(%)', unit: '', format: '', isvisible: true}//,
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downsnrgridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '下行信噪比差采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '下行信噪比差采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_upsnr_list', orderid: '上行SNR', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'overallcount', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: true},
            {id: '5', name: 'overcount', caption: '上行信噪比差小区数(个)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'overround', caption: '上行信噪比差小区比例(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_upsnrxx_list', orderid: '上行SNR详细', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '上行信噪比差采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '上行信噪比差采样点占比(%)', unit: '', format: '', isvisible: true}//,
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_upsnrgridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '上行信噪比差采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '上行信噪比差采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downrsrq_list', orderid: '下行RSRQ', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'overallcount', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: true},
            {id: '5', name: 'overcount', caption: '下行RSRQ小区数(个)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'overround', caption: '下行RSRQ小区比例(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downrsrqxx_list', orderid: '下行RSRQ详细', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '下行RSRQ采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '下行RSRQ采样点占比(%)', unit: '', format: '', isvisible: true}//,
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downrsrqgridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '下行RSRQ采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '下行RSRQ采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downprb_list', orderid: '下行PRB拥塞', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'overallcount', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: true},
            {id: '5', name: 'overcount', caption: '下行PRB利用率高小区数(个)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'overround', caption: '下行PRB利用率高小区比例(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downprbxx_list', orderid: '下行PRB拥塞详细', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '下行PRB利用率高采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '下行PRB利用率高采样点占比(%)', unit: '', format: '', isvisible: true}//,
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_downprbgridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '下行PRB利用率高采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '下行PRB利用率高采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_upprb_list', orderid: '上行PRB拥塞', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'overallcount', caption: 'MR上报室外小区总数(个)', unit: '', format: '', isvisible: true},
            {id: '5', name: 'overcount', caption: '上行PRB利用率高小区数(个)', unit: '', format: '', isvisible: true},
            {id: '6', name: 'overround', caption: '上行PRB利用率高小区比例(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_upprbxx_list', orderid: '上行PRB拥塞详细', desc: '', fields: [
            //{id: '1', name: 'starttime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'pro', caption: '省', unit: '', format: '', isvisible: true},
            {id: '3', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '上行PRB利用率高采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '上行PRB利用率高采样点占比(%)', unit: '', format: '', isvisible: true}//,
            //{id: '8', name: 'eci', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_upprbgridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '上行PRB利用率高采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'round', caption: '上行PRB利用率高采样点占比(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_overallflow_list', orderid: 'p_createtime', desc: '总体流量分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            //{id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldatalte', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldatalte', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldatalte', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata23', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata23', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata23', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata4', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata4', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata4', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'allpackets', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packetslte', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packetlte', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packetlte', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packets23', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet23', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet23', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'totle_ippackets4', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'ulippackets4', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dlippackets4', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_terminalflow_list', orderid: 'p_createtime', desc: '终端流量分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'nettype', caption: '终端类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'factory', caption: '终端品牌', unit: '', format: '', isvisible: true},
            {id: '1', name: 'mobiletype', caption: '终端型号', unit: '', format: '', isvisible: true},
            {id: '1', name: 'rat', caption: '网络类型', unit: '', format: '', isvisible: true},
            //{id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldatalte', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldatalte', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldatalte', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata23', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata23', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata23', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata4', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata4', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata4', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'allpackets', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packetslte', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packetlte', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packetlte', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packets23', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet23', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet23', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'totle_ippackets4', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'ulippackets4', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dlippackets4', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_terminalflow4g_list', orderid: 'p_createtime', desc: '终端流量分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'nettype', caption: '终端类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'factory', caption: '终端品牌', unit: '', format: '', isvisible: true},
            {id: '1', name: 'mobiletype', caption: '终端型号', unit: '', format: '', isvisible: true},
            {id: '1', name: 'rat', caption: '网络类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldatalte', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldatalte', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldatalte', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packetslte', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packetlte', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packetlte', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_terminalflow23g_list', orderid: 'p_createtime', desc: '终端流量分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'nettype', caption: '终端类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'factory', caption: '终端品牌', unit: '', format: '', isvisible: true},
            {id: '1', name: 'mobiletype', caption: '终端型号', unit: '', format: '', isvisible: true},
            {id: '1', name: 'rat', caption: '网络类型', unit: '', format: '', isvisible: true},
            //{id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata4', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata4', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata4', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'allpackets', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'totle_ippackets4', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'ulippackets4', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dlippackets4', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_businessanalysis_list', orderid: 'p_createtime', desc: '业务分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'rat', caption: '网络类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'categoryname', caption: '业务大类', unit: '', format: '', isvisible: true},
            {id: '1', name: 'bussinessname', caption: '业务小类', unit: '', format: '', isvisible: true},
            //{id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldatalte', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldatalte', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldatalte', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata23', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata23', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata23', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata4', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata4', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata4', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'allpackets', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packetslte', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packetlte', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packetlte', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packets23', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet23', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet23', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'totle_ippackets4', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'ulippackets4', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dlippackets4', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_businessanalysis4g_list', orderid: 'p_createtime', desc: '业务分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'rat', caption: '网络类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'categoryname', caption: '业务大类', unit: '', format: '', isvisible: true},
            {id: '1', name: 'bussinessname', caption: '业务小类', unit: '', format: '', isvisible: true},
            //{id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldatalte', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldatalte', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldatalte', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packetslte', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packetlte', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packetlte', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_businessanalysis23g_list', orderid: 'p_createtime', desc: '业务分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'rat', caption: '网络类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'categoryname', caption: '业务大类', unit: '', format: '', isvisible: true},
            {id: '1', name: 'bussinessname', caption: '业务小类', unit: '', format: '', isvisible: true},
            //{id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata23', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata23', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata23', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata4', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata4', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata4', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packets23', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet23', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet23', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'totle_ippackets4', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'ulippackets4', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dlippackets4', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_cellalysis4g_list', orderid: 'p_createtime', desc: '小区分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            /*{id: '1', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},*/
            {id: '1', name: 'rat', caption: '网络类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            /*{id: '1', name: 'area', caption: '区域', unit: '', format: '', isvisible: true},*/
            //{id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldatalte', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldatalte', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldatalte', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packetslte', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packetlte', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packetlte', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_cellalysis23g_list', orderid: 'p_createtime', desc: '小区分析', fields: [
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            /*{id: '1', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},*/
            {id: '1', name: 'rat', caption: '网络类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            /*{id: '1', name: 'area', caption: '区域', unit: '', format: '', isvisible: true},*/
            //{id: '1', name: 'time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata23', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata23', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata23', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'alldata4', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'uldata4', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dldata4', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '1', name: 'packets23', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'up_packet23', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'down_packet23', caption: '下行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'totle_ippackets4', caption: '总包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'ulippackets4', caption: '上行包数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'dlippackets4', caption: '下行包数', unit: '', format: '', isvisible: true}
        ]
        }, {
            id: 'home_table_grid_info', orderid: 'home_info', desc: '删格小区信息', fields: [
                {id: '1', name: 'gridid', caption: 'gridid', unit: '', format: '', isvisible: true},
                {id: '1', name: 'eci', caption: 'CI', unit: '', format: '', isvisible: true},
                {id: '1', name: 'cellname', caption: '小区信息', unit: '', format: '', isvisible: true},
                {id: '1', name: 'TotalDLThroughput', caption: '下行流量(kb)', unit: '', format: '', isvisible: true},
                {id: '1', name: 'dlputrate', caption: '下行流量占比(%)', unit: '', format: '', isvisible: true},
                {id: '1', name: 'rsrpmr', caption: '下行RSRP', unit: '', format: '', isvisible: true},
                {id: '1', name: 'rsrpmrrate', caption: '下行RSRP占比(%)', unit: '', format: '', isvisible: true},
                {id: '1', name: 'dlsinrmr', caption: '下行SINR', unit: '', format: '', isvisible: true},
                {id: '1', name: 'dlsinrmrrate', caption: '下行SINR占比(%)', unit: '', format: '', isvisible: true},
                {id: '1', name: 'dlprbmr', caption: '下行PRB', unit: '', format: '', isvisible: true},
                {id: '1', name: 'dlprbmrrate', caption: '下行PRB占比(%)', unit: '', format: '', isvisible: true}

            ]
        },
        {
            id: 'sysManagerRole_list', orderid: 'createtime', desc: '', fields: [
            {id: '0', name: 'id', caption: '选择', unit: '', format: '', isvisible: true},
            {id: '2', name: 'rolename', caption: '角色户名', unit: '', format: '', isvisible: true},
            {id: '3', name: 'remark', caption: '角色备注', unit: '', format: '', isvisible: true},
            {id: '4', name: 'isenabled', caption: '是否可用', unit: '', format: '', isvisible: true},
            {id: '5', name: 'createtime', caption: '创建时间', unit: '', format: '', isvisible: true},
            {id: '6', name: 'createuser', caption: '创建人', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'sysManagerMenu_list', orderid: 'createtime', desc: '', fields: [
            {id: '0', name: 'id', caption: '选择', unit: '', format: '', isvisible: true},
            {id: '2', name: 'menuname', caption: '菜单户名', unit: '', format: '', isvisible: true},
            {id: '3', name: 'parentid', caption: '菜单父类', unit: '', format: '', isvisible: true},
            {id: '4', name: 'remark', caption: '菜单备注', unit: '', format: '', isvisible: true},
            {id: '5', name: 'menuurl', caption: '菜单路径', unit: '', format: '', isvisible: true},
            {id: '6', name: 'orderid', caption: '排序', unit: '', format: '', isvisible: true},
            {id: '7', name: 'isenabled', caption: '是否可用', unit: '', format: '', isvisible: true},
            {id: '8', name: 'createtime', caption: '创建时间', unit: '', format: '', isvisible: true},
            {id: '9', name: 'createuser', caption: '创建人', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'gridBlank.SpeedList', orderid: 'createtime', desc: '', fields: [
            {id: '0', name: 'pro', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'id', caption: '栅格编号', unit: '', format: '', isvisible: true},
            {id: '4', name: 'lngavg', caption: '栅格中心经度', unit: '', format: '', isvisible: true},
            {id: '5', name: 'latavg', caption: '栅格中心纬度', unit: '', format: '', isvisible: true},
            {id: '6', name: 'dlgrid', caption: '栅格总流量', unit: '', format: '', isvisible: true},
            {id: '7', name: 'businesshours', caption: '栅格业务总时长(s)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'avgrate', caption: '栅格平均速率(kb/s)', unit: '', format: '', isvisible: true},
            {id: '9', name: 'ismr', caption: '是否质差栅格', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'gridBlank.SpeedList.CellList', orderid: 'createtime', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'dlgrid', caption: '流量', unit: '', format: '', isvisible: true},
            {id: '7', name: 'businesshours', caption: '业务时长', unit: '', format: '', isvisible: true},
            {id: '8', name: 'avgrate', caption: '平均速率', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'gridBlank.WCList', orderid: 'createtime', desc: '', fields: [
            {id: '0', name: 'pro', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'id', caption: '栅格编号', unit: '', format: '', isvisible: true},
            {id: '4', name: 'lngavg', caption: '栅格中心经度', unit: '', format: '', isvisible: true},
            {id: '5', name: 'latavg', caption: '栅格中心纬度', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '栅格总采样点', unit: '', format: '', isvisible: true},
            {
                id: '7',
                name: 'pointQualitative_difference_sampling_point',
                caption: '质差采样点',
                unit: '',
                format: '',
                isvisible: true
            },
            {id: '8', name: 'avgrate', caption: '质差比例', unit: '', format: '', isvisible: true},
            {id: '9', name: 'ismr', caption: '是否质差栅格', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'gridBlank.FrequencyList', orderid: 'createtime', desc: '', fields: [
            {id: '0', name: 'pro', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'id', caption: '栅格编号', unit: '', format: '', isvisible: true},
            {id: '4', name: 'lng', caption: '栅格中心经度', unit: '', format: '', isvisible: true},
            {id: '5', name: 'lat', caption: '栅格中心纬度', unit: '', format: '', isvisible: true},
            //      {id: '6', name: 'allcount', caption: '栅格总采样点', unit: '', format: '', isvisible: true},
            //       {id: '7', name: 'pointQualitative_difference_sampling_point', caption: '质差采样点', unit: '', format: '', isvisible: true},
            {id: '6', name: 'businessnumber', caption: '互操作次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'ismr', caption: '是否质差栅格', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'gridBlank.SignalingList', orderid: 'createtime', desc: '', fields: [
            {id: '0', name: 'pro', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'id', caption: '栅格编号', unit: '', format: '', isvisible: true},
            {id: '4', name: 'lng', caption: '栅格中心经度', unit: '', format: '', isvisible: true},
            {id: '5', name: 'lat', caption: '栅格中心纬度', unit: '', format: '', isvisible: true},
            //     {id: '6', name: 'allcount', caption: '栅格总采样点', unit: '', format: '', isvisible: true},
            //       {id: '7', name: 'pointQualitative_difference_sampling_point', caption: '质差采样点', unit: '', format: '', isvisible: true},
            {id: '6', name: 'businessnumber', caption: '互操作次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'ismr', caption: '是否质差栅格', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_signalinggridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '互操作次数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_frequencygridcell_list', orderid: '根据栅格查询小区详细', desc: '', fields: [
            {id: '1', name: 'row_id', caption: '序号', unit: '', format: '', isvisible: true},
            {id: '3', name: 'gridid', caption: '栅格ID', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cellname', caption: '小区名', unit: '', format: '', isvisible: true},
            {id: '5', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '6', name: 'allcount', caption: '小区总采样点数(条)', unit: '', format: '', isvisible: true},
            {id: '7', name: 'count1', caption: '互操作次数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'gridquality.PostionTacUserinfo', orderid: 'ratchangecount', desc: '', fields: [
            {id: '0', name: 'imsi', caption: 'IMSI', unit: '', format: '', isvisible: true},
            {id: '1', name: 'factory', caption: '品牌', unit: '', format: '', isvisible: true},
            {id: '2', name: 'mobiletype', caption: '类型', unit: '', format: '', isvisible: true},
            {id: '3', name: 'ultotle', caption: '总流量', unit: '', format: '', isvisible: true},
            {id: '4', name: 'sessionrequest', caption: '访问次数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'avgsuccess', caption: '附着成功率', unit: '', format: '', isvisible: true},
            {id: '6', name: 'httprequestsuccess', caption: 'HTTP访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '7', name: 'weakmavg', caption: '弱覆盖比例', unit: '', format: '', isvisible: true},
            {id: '8', name: 'ratchangecount', caption: 'LTE网间互操作次数', unit: '', format: '', isvisible: true},
            {id: '9', name: 'dlavg', caption: '平均下行速率', unit: '', format: '', isvisible: true},
            {id: '10', name: 'avghours', caption: '2/3G业务时长占比', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'scanpageAnalysis_targetList', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'cityname', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'nettype', caption: '网络类型', unit: '', format: '', isvisible: true},
            {id: '3', name: 'category', caption: '大类业务', unit: '', format: '', isvisible: true},
            {id: '4', name: 'bussnies', caption: '小类业务', unit: '', format: '', isvisible: true},
            {id: '5', name: 'pageallcount', caption: '页面合成总次数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'pagescount', caption: '页面合成成功次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'sucratio', caption: '页面显示成功率(%)', unit: '', format: '', isvisible: true},
            {id: '8', name: 'avgduration', caption: '页面显示平均时长(s)', unit: '', format: '', isvisible: true},
            {id: '9', name: 'downdspeed', caption: '页面下载平均速率(kbps)', unit: '', format: '', isvisible: true},
            {id: '10', name: 'timedifpra', caption: '时延质差占比(%)', unit: '', format: '', isvisible: true},
            {id: '11', name: 'ratedifpra1', caption: '速率质差占比（<100kbps）(%)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_registerTarget_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'reg_req_init', caption: '初始注册请求次数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'reg_suc_init', caption: '初始注册成功次数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'reg_suc_rate_init', caption: '初始注册成功率', unit: '', format: '', isvisible: true},
            {id: '5', name: 'reg_delay_init', caption: '初始注册响应时延', unit: '', format: '', isvisible: true},
            {id: '6', name: 'reg_req_third', caption: '第三方注册请求次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'reg_suc_third', caption: '第三方注册成功次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'reg_suc_rate_third', caption: '第三方注册成功率', unit: '', format: '', isvisible: true},
            {id: '9', name: 'reg_delay_third', caption: '第三方注册响应时延', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_netTarget_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'service_type', caption: '语音/视频', unit: '', format: '', isvisible: true},
            {id: '4', name: 'dimension', caption: '维度', unit: '', format: '', isvisible: true},
            {id: '5', name: 'users_cnt', caption: '用户数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'call_suc_rate', caption: '全网接通率', unit: '', format: '', isvisible: true},
            {id: '4', name: 'MO_CALL_SUC_RATE', caption: '主叫接通率', unit: '', format: '', isvisible: true},
            {id: '8', name: 'MT_CALL_SUC_RATE', caption: '被叫接通率', unit: '', format: '', isvisible: true},
           {id: '8', name: 'CALL_ANS_RATE', caption: '全网应答率', unit: '', format: '', isvisible: true},
            {id: '3', name: 'MO_CALL_ANS_RATE', caption: '主叫应答率', unit: '', format: '', isvisible: true},
           {id: '0', name: 'MT_CALL_ANS_RATE', caption: '被叫应答率', unit: '', format: '', isvisible: true},
           // {id: '0', name: 'CALL_DELAY', caption: '全网接入时延', unit: '', format: '', isvisible: true},
            {id: '5', name: 'MO_CALL_DELAY', caption: '主叫接入时延', unit: '', format: '', isvisible: true},
            {id: '1', name: 'MT_CALL_DELAY', caption: '被叫接入时延', unit: '', format: '', isvisible: true},
            {id: '6', name: 'drop_rate_new', caption: '掉话率新', unit: '', format: '', isvisible: true},
            {id: '6', name: 'drop_rate_old', caption: '掉话率旧', unit: '', format: '', isvisible: true},
            {id: '7', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换成功率', unit: '', format: '', isvisible: true},
            {id: '8', name: 'esrvcc_ho_delay', caption: 'eSRVCC切换时延', unit: '', format: '', isvisible: true},
            {id: '0', name: 'Esrvcc_HO_RATE', caption: 'eSRVCC切换占比', unit: '', format: '', isvisible: true},
            {id: '0', name: 'call_req_all', caption: '全网请求次数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'call_suc_all', caption: '全网接通次数', unit: '', format: '', isvisible: true},
            {id: '1', name: 'call_ans_all', caption: '全网应答次数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'MO_REQ_NUM', caption: '主叫请求次数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'MO_SUC_NUM', caption: '主叫接通次数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'MO_ANS_NUM', caption: '主叫应答次数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'MT_REQ_NUM', caption: '被叫请求次数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'MT_SUC_NUM', caption: '被叫接通次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'MT_ANS_NUM', caption: '被叫应答次数', unit: '', format: '', isvisible: true},
            {id: '2', name: 'CALLINGREQ486487', caption: '主叫呼叫请求_486_487', unit: '', format: '', isvisible: true},
            {id: '3', name: 'CALLEDREQ486487', caption: '被叫呼叫请求_486_487', unit: '', format: '', isvisible: true},
            {id: '4', name: 'DROP_NUM_NEW', caption: '掉话次新', unit: '', format: '', isvisible: true},
            {id: '6', name: 'DROP_NUM_OLD', caption: '掉话次旧', unit: '', format: '', isvisible: true},
            {id: '1', name: 'ESRVCC_HO_REQ', caption: 'eSRVCC切换总次数', unit: '', format: '', isvisible: true},
            {id: '2', name: 'esrvcc_ho_suc', caption: 'eSRVCC切换成功次数', unit: '', format: '', isvisible: true},
        ]
        },
        {
            id: 'maptable_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'cityname', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'date_time', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '3', name: 'Legitimacy_score', caption: '合法性', unit: '', format: '', isvisible: true},
            {id: '4', name: 'Integrity_score', caption: '完整性', unit: '', format: '', isvisible: true},
            {id: '5', name: 'Accuracy_score', caption: '准确性', unit: '', format: '', isvisible: true},
            {id: '6', name: 'Total_score', caption: '总分', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'bottomtable_list', orderid: 'start_time', desc: '', fields: [
            {id: '0', name: 'start_time', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'cityname', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'Interface', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '3', name: 'data_orno', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '4', name: 'data_type', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '5', name: 'error_cause', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '6', name: 'error_date_num', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'mapcitytablelist', orderid: 'start_time', desc: '', fields: [
            {id: '0', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'cityname', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'Total_score', caption: '总分', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'searchtable_list', orderid: 'start_time', desc: '', fields: [
            {id: '0', name: 'start_time', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'proname', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'Interface', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '3', name: 'data_orno', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '4', name: 'data_type', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '5', name: 'error_cause', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '6', name: 'error_date_num', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'SIPtable_list3', orderid: 'start_time', desc: '', fields: [
            {id: '0', name: 'start_time', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city_id', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'interface', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '3', name: 'rec_count', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '4', name: 'red_rec_count', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '5', name: 'inv_rec_count', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '6', name: 'start_time_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'end_time_null_rate', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '8', name: 'delay_null_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '9', name: 'msisdn_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '10', name: 'msisdn_anomaly_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '11', name: 'imsi_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '12', name: 'imsi_anomaly_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '13', name: 'imei_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '14', name: 'imei_anomaly_null_rate', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '15', name: 'calling_number_null_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '16', name: 'called_number_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '17', name: 'source_imsi_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '18', name: 'source_imei_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '19', name: 'source_eci_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {
                id: '20',
                name: 'source_access_type_null_rate',
                caption: '存在错误XDR个数',
                unit: '',
                format: '',
                isvisible: true
            },
            {id: '21', name: 'dest_access_type_null_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '22', name: 'dest_imsi_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '23', name: 'dest_imei_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '24', name: 'dest_eci_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '25', name: 'city_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '26', name: 'call_side_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '27', name: 'procedure_type_null_rate', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '28', name: 'service_type_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '29', name: 'procedure_status_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '30', name: 'response_code_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '31', name: 'finish_reason_cause_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '32', name: 'first_fall_ne_ip_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '33', name: 'alerting_time_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '34', name: 'answer_time_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '35', name: 'call_duration_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '36', name: 'status_response_deff_rate', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '37', name: 'anstime_delay_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '38', name: 'altering_time6_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '39', name: 'anstime_talktime_same_rate', caption: '是否有数据', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'SVtable_list4', orderid: 'start_time', desc: '', fields: [
            {id: '0', name: 'start_time', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city_id', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'interface', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '3', name: 'rec_count', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '4', name: 'delay_null_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '5', name: 'msisdn_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '6', name: 'msisdn_anomaly_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '7', name: 'imsi_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '8', name: 'imsi_anomaly_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '9', name: 'imei_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '10', name: 'imei_anomaly_null_rate', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '11', name: 'roam_direction_null_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '12', name: 'target_lac_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '13', name: 'source_eci_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '14', name: 'stn_sr_type_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '15', name: 'target_cell_id_null_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '16', name: 'request_result_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '17', name: 'result_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '18', name: 'sv_cause_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '19', name: 'resp_delay_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '20', name: 'sv_delay_null_rate', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '21', name: 'result_deff_cause_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '22', name: 'deff_delay_rate', caption: '接口', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'Abnormaltable_list5', orderid: 'date_time', desc: '', fields: [
            {id: '0', name: 'date_time', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city_id', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'index_name', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '3', name: 'index_score', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '4', name: 'Accuracy_score', caption: '字段', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'DATAContinuitytable_list6', orderid: 'date_time', desc: '', fields: [
            {id: '0', name: 'date_time', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city_id', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'Interface', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '3', name: 'discrete_time', caption: '是否有数据', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'CxDxShDhZhtable_list7', orderid: 'start_time', desc: '', fields: [
            {id: '0', name: 'start_time', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city_id', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'interface', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '3', name: 'rec_count', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '4', name: 'delay_null_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '5', name: 'msisdn_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '6', name: 'msisdn_anomaly_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '7', name: 'imsi_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '8', name: 'imsi_anomaly_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '9', name: 'imei_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '10', name: 'imei_anomaly_null_rate', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '11', name: 'transaction_type_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '12', name: 'transaction_status_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '13', name: 'result_code_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '14', name: 'status_response_deff_rate', caption: '日期', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'GxRxtable_list8', orderid: 'start_time', desc: '', fields: [
            {id: '0', name: 'start_time', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city_id', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'interface', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '3', name: 'rec_count', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '4', name: 'delay_null_rate', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '5', name: 'msisdn_null_rate', caption: '接口', unit: '', format: '', isvisible: true},
            {id: '6', name: 'msisdn_anomaly_null_rate', caption: '是否有数据', unit: '', format: '', isvisible: true},
            {id: '7', name: 'imsi_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {id: '8', name: 'imsi_anomaly_null_rate', caption: '错误原因值', unit: '', format: '', isvisible: true},
            {id: '9', name: 'imei_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '10', name: 'imei_anomaly_null_rate', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '11', name: 'abort_cause_null_rate', caption: '字段', unit: '', format: '', isvisible: true},
            {
                id: '12',
                name: 'session_release_cause_null_rate',
                caption: '错误原因值',
                unit: '',
                format: '',
                isvisible: true
            },
            {id: '13', name: 'procedure_type_null_rate', caption: '存在错误XDR个数', unit: '', format: '', isvisible: true},
            {id: '14', name: 'status_response_deff_rate', caption: '日期', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_registerTarget_list1', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'call_suc_rate', caption: '网络接通率%', unit: '', format: '', isvisible: true},
            {id: '4', name: 'drop_rate_old', caption: '掉话率%', unit: '', format: '', isvisible: true},
            {id: '5', name: 'reg_suc_rate_init', caption: 'IMS注册成功率%', unit: '', format: '', isvisible: true},
            {id: '6', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换成功率%', unit: '', format: '', isvisible: true},
            {id: '7', name: 'mo_call_delay_vo_vo', caption: 'v-v主叫接通时延', unit: '', format: '', isvisible: true},
            {id: '8', name: 'mo_call_delay_vo_all', caption: ' 主叫接通时延', unit: '', format: '', isvisible: true},
            {id: '9', name: 'esrvcc_ho_rate', caption: 'eSRVCC切换占比', unit: '', format: '', isvisible: true},
            {id: '10', name: 'call_rate_vo_vo', caption: 'V<->V呼叫占比(VO-VO)', unit: '', format: '', isvisible: true},
            {
                id: '11',
                name: 'call_rate_vo_23g',
                caption: 'V<->移动23G呼叫占比(VO-23G和23G-VO)',
                unit: '',
                format: '',
                isvisible: true
            },
            {id: '12', name: 'call_rate_vo_other', caption: 'V<->其他呼叫占比', unit: '', format: '', isvisible: true},
            {id: '13', name: 'call_rate_other_other', caption: '其他_其他互打呼叫占比', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_registerTarget_list2', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'call_suc_rate', caption: '网络接通率%', unit: '', format: '', isvisible: true},
            {id: '4', name: 'drop_rate_old', caption: '掉话率%', unit: '', format: '', isvisible: true},
            {id: '5', name: 'reg_suc_rate_init', caption: 'IMS注册成功率%', unit: '', format: '', isvisible: true},
            {id: '6', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换成功率%', unit: '', format: '', isvisible: true},
            {id: '7', name: 'mo_call_delay_vo_vo', caption: 'v-v主叫接通时延', unit: '', format: '', isvisible: true},
            {id: '8', name: 'mo_call_delay_vo_all', caption: ' 主叫接通时延', unit: '', format: '', isvisible: true},
            {id: '9', name: 'esrvcc_ho_rate', caption: 'eSRVCC切换占比', unit: '', format: '', isvisible: true},
            {id: '10', name: 'call_rate_vo_vo', caption: 'V<->V呼叫占比(VO-VO)', unit: '', format: '', isvisible: true},
            {id: '11', name: 'call_rate_vo_23g', caption: 'V<->移动23G呼叫占比(VO-23G和23G-VO)', unit: '', format: '', isvisible: true},
            {id: '12', name: 'call_rate_vo_other', caption: 'V<->其他呼叫占比', unit: '', format: '', isvisible: true},
            {id: '13', name: 'call_rate_other_other', caption: '其他_其他互打呼叫占比', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_kaohedatetime_list1', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '3', name: 'call_suc_rate', caption: '网络接通率%', unit: '', format: '', isvisible: true},
            {id: '4', name: 'drop_rate_old', caption: '掉话率%', unit: '', format: '', isvisible: true},
            {id: '5', name: 'reg_suc_rate_init', caption: 'IMS注册成功率%', unit: '', format: '', isvisible: true},
            {id: '6', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换成功率%', unit: '', format: '', isvisible: true},
            {id: '7', name: 'mo_call_delay_vo_vo', caption: 'v-v主叫接通时延', unit: '', format: '', isvisible: true},
            {id: '8', name: 'mo_call_delay_vo_all', caption: ' 主叫接通时延', unit: '', format: '', isvisible: true},
            {id: '9', name: 'esrvcc_ho_rate', caption: 'eSRVCC切换占比', unit: '', format: '', isvisible: true},
            {id: '10', name: 'call_rate_vo_vo', caption: 'V<->V呼叫占比(VO-VO)', unit: '', format: '', isvisible: true},
            {
                id: '11',
                name: 'call_rate_vo_23g',
                caption: 'V<->移动23G呼叫占比(VO-23G和23G-VO)',
                unit: '',
                format: '',
                isvisible: true
            },
            {id: '12', name: 'call_rate_vo_other', caption: 'V<->其他呼叫占比', unit: '', format: '', isvisible: true},
            {id: '13', name: 'call_rate_other_other', caption: '其他_其他互打呼叫占比', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_KaoheLine_list1', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'call_suc_rate', caption: '网络接通率%', unit: '', format: '', isvisible: true},
            {id: '4', name: 'drop_rate_old', caption: '掉话率%', unit: '', format: '', isvisible: true},
            {id: '5', name: 'reg_suc_rate_init', caption: 'IMS注册成功率%', unit: '', format: '', isvisible: true},
            {id: '6', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换成功率%', unit: '', format: '', isvisible: true},
            {id: '7', name: 'mo_call_delay_vo_vo', caption: 'v-v主叫接通时延', unit: '', format: '', isvisible: true},
            {id: '8', name: 'mo_call_delay_vo_all', caption: ' 主叫接通时延', unit: '', format: '', isvisible: true},
            {id: '9', name: 'esrvcc_ho_rate', caption: 'eSRVCC切换占比', unit: '', format: '', isvisible: true},
            {id: '10', name: 'call_rate_vo_vo', caption: 'V<->V呼叫占比(VO-VO)', unit: '', format: '', isvisible: true},
            {
                id: '11',
                name: 'call_rate_vo_23g',
                caption: 'V<->移动23G呼叫占比(VO-23G和23G-VO)',
                unit: '',
                format: '',
                isvisible: true
            },
            {id: '12', name: 'call_rate_vo_other', caption: 'V<->其他呼叫占比', unit: '', format: '', isvisible: true},
            {id: '13', name: 'call_rate_other_other', caption: '其他_其他互打呼叫占比', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_xiaoquTarget_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'call_suc_rate', caption: '接通率质差小区个数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'esrvcc_ho_call_rate', caption: 'Esrvcc切换占比质差小区个数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'esrvcc_ho_suc_rate', caption: 'Esrvcc切换成功率质差小区个数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'reg_suc_rate_init', caption: '初始注册成功率质差小区个数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'mult_low_qos_cell_cnt', caption: '多重质差小区个数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_xiaoquTarget_list2', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'call_suc_rate', caption: '接通率质差小区个数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'esrvcc_ho_call_rate', caption: 'Esrvcc切换占比质差小区个数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'esrvcc_ho_suc_rate', caption: 'Esrvcc切换成功率质差小区个数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'reg_suc_rate_init', caption: '初始注册成功率质差小区个数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'mult_low_qos_cell_cnt', caption: '多重质差小区个数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_Houses_bootomData1_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'dimension', caption: '维度', unit: '', format: '', isvisible: true},
            {id: '4', name: 'eci', caption: '小区标识', unit: '', format: '', isvisible: true},
            {id: '5', name: 'cell_name', caption: '小区名称', unit: '', format: '', isvisible: true},
            {id: '6', name: 'scene', caption: '场景名称', unit: '', format: '', isvisible: true},
            {id: '7', name: 'call_req_all', caption: '全网请求次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'call_suc_all', caption: '全网接通次数', unit: '', format: '', isvisible: true},
            {id: '10', name: 'call_suc_rate', caption: '全网接通率', unit: '', format: '', isvisible: true},
            {id: '10', name: 'callingreq486487', caption: '主叫呼叫请求_486_487', unit: '', format: '', isvisible: true},
            {id: '11', name: 'calledreq486487', caption: '被叫呼叫请求_486_487', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_Houses_bootomData2_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'dimension', caption: '维度', unit: '', format: '', isvisible: true},
            {id: '4', name: 'eci', caption: '小区标识', unit: '', format: '', isvisible: true},
            {id: '5', name: 'cell_name', caption: '小区名称', unit: '', format: '', isvisible: true},
            {id: '6', name: 'scene', caption: '场景名称', unit: '', format: '', isvisible: true},
            {id: '7', name: 'call_suc_all', caption: '全网接通次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'esrvcc_ho_req', caption: 'eSRVCC切换总次数', unit: '', format: '', isvisible: true},
            {id: '9', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换占比', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_Houses_bootomData3_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'eci', caption: '小区标识', unit: '', format: '', isvisible: true},
            {id: '4', name: 'cell_name', caption: '小区名称', unit: '', format: '', isvisible: true},
            {id: '5', name: 'scene', caption: '场景名称', unit: '', format: '', isvisible: true},
            {id: '6', name: 'reg_req_init', caption: '注册请求次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'reg_suc_init', caption: '注册成功次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'reg_suc_rate_init', caption: '注册成功率', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_Houses_bootomData4_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'dimension', caption: '维度', unit: '', format: '', isvisible: true},
            {id: '4', name: 'eci', caption: '小区标识', unit: '', format: '', isvisible: true},
            {id: '5', name: 'cell_name', caption: '小区名称', unit: '', format: '', isvisible: true},
            {id: '6', name: 'scene', caption: '场景名称', unit: '', format: '', isvisible: true},
            {id: '7', name: 'esrvcc_ho_req', caption: 'eSRVCC切换总次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'esrvcc_ho_suc', caption: 'eSRVCC切换成功次数', unit: '', format: '', isvisible: true},
            {id: '9', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换成功率', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_Houses_bootomData5_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'province', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '2', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '3', name: 'dimension', caption: '维度', unit: '', format: '', isvisible: true},
            {id: '4', name: 'eci', caption: '小区标识', unit: '', format: '', isvisible: true},
            {id: '5', name: 'cell_name', caption: '小区名称', unit: '', format: '', isvisible: true},
            {id: '6', name: 'scene', caption: '场景名称', unit: '', format: '', isvisible: true},
            {id: '7', name: 'call_req_all', caption: '全网请求次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'call_suc_all', caption: '全网接通次数', unit: '', format: '', isvisible: true},
            {id: '9', name: 'call_suc_rate', caption: '全网接通率', unit: '', format: '', isvisible: true},
            {id: '10', name: 'callingreq486487', caption: '主叫呼叫请求_486_487', unit: '', format: '', isvisible: true},
            {id: '11', name: 'calledreq486487', caption: '被叫呼叫请求_486_487', unit: '', format: '', isvisible: true},
            {id: '12', name: 'esrvcc_ho_req', caption: 'eSRVCC切换总次数', unit: '', format: '', isvisible: true},
            {id: '13', name: 'esrvcc_ho_call_rate', caption: 'eSRVCC切换占比', unit: '', format: '', isvisible: true},
            {id: '14', name: 'esrvcc_ho_suc', caption: 'eSRVCC切换成功次数', unit: '', format: '', isvisible: true},
            {id: '15', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换成功率', unit: '', format: '', isvisible: true},
            {id: '16', name: 'reg_req_init', caption: '注册请求次数', unit: '', format: '', isvisible: true},
            {id: '17', name: 'reg_suc_init', caption: '注册接通次数', unit: '', format: '', isvisible: true},
            {id: '18', name: 'reg_suc_rate_init', caption: '注册成功率', unit: '', format: '', isvisible: true},
            {id: '19', name: 'low_qos_kpi_cnt', caption: '质差指标数量', unit: '', format: '', isvisible: true}
        ]
        },

        {
            id: 'table_businessModel_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'lte_user_cnt', caption: 'LTE用户数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'volte_user_cnt', caption: 'VOLTE注册用户数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'volte_user_rate', caption: 'VOLTE用户占比', unit: '', format: '', isvisible: true},
            {id: '5', name: 'volte_call_cnt', caption: 'VOLTE试呼次数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'volte_voice_cnt', caption: 'VOLTE语音试呼次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'volte_video_cnt', caption: 'VOLTE视频试呼次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'volte_voice_rate', caption: 'VOLTE语音占比', unit: '', format: '', isvisible: true},
            {id: '9', name: 'volte_video_rate', caption: 'VOLTE视频占比', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_customecxceldata_list1', orderid: 'short_host', desc: '', fields: [
            {id: '0', name: 'short_host', caption: '频道', unit: '', format: '', isvisible: true},
            {id: '1', name: 'imsi_count', caption: '用户数量', unit: '', format: '', isvisible: true},
            {id: '2', name: 'total_count', caption: '总数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'downstream_traffic', caption: '下载流量', unit: '', format: '', isvisible: true},
            {id: '4', name: 'number_users', caption: '用户占比', unit: '', format: '', isvisible: true},
            {id: '5', name: 'traffic_accounted_for', caption: '流量占比', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_customecxceldata_list2', orderid: 'cityname', desc: '', fields: [
            {id: '0', name: 'cityname', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'businessname', caption: '业务类', unit: '', format: '', isvisible: true},
            {id: '2', name: 'successcount', caption: '成功次数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'xdr_count', caption: 'xdr总数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'successrat', caption: '成功率', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_customecxceldata_list3', orderid: 'cityname', desc: '', fields: [
            {id: '0', name: 'cityname', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'data1', caption: 'YY直播', unit: '', format: '', isvisible: true},
            {id: '2', name: 'data2', caption: '斗鱼直播', unit: '', format: '', isvisible: true},
            {id: '3', name: 'data3', caption: '虎牙直播', unit: '', format: '', isvisible: true},
            {id: '4', name: 'data4', caption: '花椒直播', unit: '', format: '', isvisible: true},
            {id: '5', name: 'data5', caption: '来疯直播', unit: '', format: '', isvisible: true},
            {id: '6', name: 'data6', caption: '龙珠直播', unit: '', format: '', isvisible: true},
            {id: '7', name: 'data7', caption: '咪咕直播', unit: '', format: '', isvisible: true},
            {id: '8', name: 'data8', caption: '熊猫TV', unit: '', format: '', isvisible: true},
            {id: '9', name: 'data9', caption: '映客直播', unit: '', format: '', isvisible: true},
            {id: '10', name: 'data10', caption: '战旗直播', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_customecxceldata_list4', orderid: 'cityname', desc: '', fields: [
            {id: '0', name: 'cityname', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'businessname', caption: '业务名称', unit: '', format: '', isvisible: true},
            {id: '2', name: 'successrat', caption: '成功率', unit: '', format: '', isvisible: true},
            {id: '3', name: 'firstpacketdelay', caption: '首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '4', name: 'tcpkey_delay', caption: 'TCP键连时延（ms）', unit: '', format: '', isvisible: true},
            {id: '5', name: 'downlink_retransmission_rate', caption: '下行重传率', unit: '', format: '', isvisible: true},
            {id: '6', name: 'download_flow', caption: '下载流量', unit: '', format: '', isvisible: true},
            {id: '7', name: 'download_speed_rate', caption: '下载速率(Mbps)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_customecxceldata_list5', orderid: 'cityname', desc: '', fields: [
            {id: '0', name: 'cityname', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'businessname', caption: '业务名称', unit: '', format: '', isvisible: true},
            {id: '2', name: 'downstream_traffic', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '3', name: 'upstream_traffic', caption: '上行流量', unit: '', format: '', isvisible: true},
            {id: '4', name: 'user_count', caption: '用户数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_customecxceldata_list6', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'downstream_traffic', caption: '下行流量', unit: '', format: '', isvisible: true},
            {id: '2', name: 'user_count', caption: '用户数', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'BusinessqualityTableshow', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'data22', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'data23', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'name', caption: '场景', unit: '', format: '', isvisible: true},
            {id: '3', name: 'data24', caption: 'attach请求次数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'data25', caption: 'attach成功次数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'data26', caption: 'attach成功率（%）', unit: '', format: '', isvisible: true},
            {id: '6', name: 'data27', caption: 'eps建立请求次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'data208', caption: 'eps建立成功次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'data29', caption: 'eps建立成功率（%）', unit: '', format: '', isvisible: true},
            {id: '9', name: 'data30', caption: '下行总包数', unit: '', format: '', isvisible: true},
            {id: '10', name: 'data31', caption: '下行重传包数', unit: '', format: '', isvisible: true},
            {id: '11', name: 'data32', caption: '下行重传率（%）', unit: '', format: '', isvisible: true},
            {id: '12', name: 'data', caption: '浏览访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '13', name: 'data1', caption: '浏览首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '14', name: 'data2', caption: '浏览高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '15', name: 'data3', caption: '视频访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '16', name: 'data4', caption: '视频首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '17', name: 'data5', caption: '视频高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '18', name: 'data6', caption: '音乐访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '19', name: 'data7', caption: '音乐首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '20', name: 'data08', caption: '音乐高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '21', name: 'data9', caption: '应用商店访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '22', name: 'data10', caption: '应用商店首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '23', name: 'data11', caption: '应用商店高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '24', name: 'data12', caption: '微博访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '25', name: 'data13', caption: '微博首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '26', name: 'data14', caption: '微博高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '27', name: 'data15', caption: '游戏访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '28', name: 'data16', caption: '游戏首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '29', name: 'data17', caption: '即时通信访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '30', name: 'data108', caption: '即时通信首包时延（ms）', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'BusinessqualityTableshowcome1', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'data22', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'data23', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'name', caption: '场景', unit: '', format: '', isvisible: true},
            {id: '3', name: 'data24', caption: 'attach请求次数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'data25', caption: 'attach成功次数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'data26', caption: 'attach成功率（%）', unit: '', format: '', isvisible: true},
            {id: '6', name: 'data27', caption: 'eps建立请求次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'data208', caption: 'eps建立成功次数', unit: '', format: '', isvisible: true},
            {id: '8', name: 'data29', caption: 'eps建立成功率（%）', unit: '', format: '', isvisible: true},
            {id: '9', name: 'data30', caption: '下行总包数', unit: '', format: '', isvisible: true},
            {id: '10', name: 'data31', caption: '下行重传包数', unit: '', format: '', isvisible: true},
            {id: '11', name: 'data32', caption: '下行重传率（%）', unit: '', format: '', isvisible: true},
            {id: '12', name: 'data', caption: '浏览访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '13', name: 'data1', caption: '浏览首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '14', name: 'data2', caption: '浏览高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '15', name: 'data3', caption: '视频访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '16', name: 'data4', caption: '视频首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '17', name: 'data5', caption: '视频高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '18', name: 'data6', caption: '音乐访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '19', name: 'data7', caption: '音乐首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '20', name: 'data08', caption: '音乐高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '21', name: 'data9', caption: '应用商店访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '22', name: 'data10', caption: '应用商店首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '23', name: 'data11', caption: '应用商店高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '24', name: 'data12', caption: '微博访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '25', name: 'data13', caption: '微博首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '26', name: 'data14', caption: '微博高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '27', name: 'data15', caption: '游戏访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '28', name: 'data16', caption: '游戏首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '29', name: 'data17', caption: '即时通信访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '30', name: 'data108', caption: '即时通信首包时延（ms）', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'BusinessqualityTableshowcome2', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'data22', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'data23', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'name', caption: '线路', unit: '', format: '', isvisible: true},
            {id: '3', name: 'name1', caption: '站点', unit: '', format: '', isvisible: true},
            {id: '4', name: 'data24', caption: 'attach尝试次数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'data25', caption: 'attach成功次数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'data26', caption: 'attach成功率（%）', unit: '', format: '', isvisible: true},
            {id: '9', name: 'data30', caption: '下行总包数', unit: '', format: '', isvisible: true},
            {id: '10', name: 'data31', caption: '下行重传包数', unit: '', format: '', isvisible: true},
            {id: '11', name: 'data32', caption: '下行重传率（%）', unit: '', format: '', isvisible: true},
            {id: '12', name: 'data', caption: '浏览访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '13', name: 'data1', caption: '浏览首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '14', name: 'data2', caption: '浏览高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '15', name: 'data3', caption: '视频访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '16', name: 'data4', caption: '视频首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '17', name: 'data5', caption: '视频高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '18', name: 'data6', caption: '音乐访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '19', name: 'data7', caption: '音乐首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '20', name: 'data08', caption: '音乐高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '21', name: 'data9', caption: '应用商店访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '22', name: 'data10', caption: '应用商店首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '23', name: 'data11', caption: '应用商店高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '24', name: 'data12', caption: '微博访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '25', name: 'data13', caption: '微博首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '26', name: 'data14', caption: '微博高于500Kbps会话占比（%）', unit: '', format: '', isvisible: true},
            {id: '27', name: 'data15', caption: '游戏访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '28', name: 'data16', caption: '游戏首包时延（ms）', unit: '', format: '', isvisible: true},
            {id: '29', name: 'data17', caption: '即时通信访问成功率（%）', unit: '', format: '', isvisible: true},
            {id: '30', name: 'data108', caption: '即时通信首包时延（ms）', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_registerList_multiQuality_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'scene', caption: '场景类型', unit: '', format: '', isvisible: true},
            {id: '2', name: 'reg_req_init', caption: '注册请求次数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'reg_suc_init', caption: '注册成功次数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'reg_suc_rate_init', caption: '注册成功率', unit: '', format: '', isvisible: true},
            {id: '5', name: 'reg_delay_init', caption: '注册响应时延', unit: '', format: '', isvisible: true},
            {id: '6', name: 'all_voice_cnt', caption: '全网试呼数（语音）', unit: '', format: '', isvisible: true},
            {id: '7', name: 'volte_voice_cnt', caption: 'VOLTE-VOLTE试呼数（语音）', unit: '', format: '', isvisible: true},
            {id: '8', name: 'volte_voice_rate', caption: 'VOLTE-VOLTE占比（语音）', unit: '', format: '', isvisible: true},
            {id: '9', name: 'all_voice_calling_cnt', caption: '全网主叫试呼数（语音）', unit: '', format: '', isvisible: true},
            {id: '10', name: 'volte_voice_calling_cnt', caption: 'VOLTE-VOLTE主叫试呼数（语音）', unit: '', format: '', isvisible: true},
            {id: '11', name: 'all_voice_called_cnt', caption: '全网被叫试呼数（语音）', unit: '', format: '', isvisible: true},
            {id: '12', name: 'volte_voice_called_cnt', caption: 'VOLTE-VOLTE被叫试呼数（语音）', unit: '', format: '', isvisible: true},
            {id: '13', name: 'all_voice_call_suc_rate', caption: '全网网络接通率（语音）', unit: '', format: '', isvisible: true},
            {id: '14', name: 'volte_voice_call_suc_rate', caption: 'VOLTE-VOLTE网络接通率（语音）', unit: '', format: '', isvisible: true},
            {id: '15', name: 'all_mo_voice_call_delay', caption: '全网主叫接通时延（语音）', unit: '', format: '', isvisible: true},
            {id: '16', name: 'volte_mo_voice_call_delay', caption: 'VOLTE-VOLTE主叫接通时延（语音）', unit: '', format: '', isvisible: true},
            {id: '17', name: 'all_video_cnt', caption: '全网试呼数（视频）', unit: '', format: '', isvisible: true},
            {id: '18', name: 'volte_video_cnt', caption: 'VOLTE-VOLTE试呼数（视频）', unit: '', format: '', isvisible: true},
            {id: '19', name: 'volte_video_rate', caption: 'VOLTE-VOLTE占比（视频）', unit: '', format: '', isvisible: true},
            {id: '20', name: 'all_video_calling_cnt', caption: '全网主叫试呼数（视频）', unit: '', format: '', isvisible: true},
            {id: '21', name: 'volte_video_calling_cnt', caption: 'VOLTE-VOLTE主叫试呼数（视频）', unit: '', format: '', isvisible: true},
            {id: '22', name: 'all_video_called_cnt', caption: '全网被叫试呼数（视频）', unit: '', format: '', isvisible: true},
            {id: '23', name: 'volte_video_called_cnt', caption: 'VOLTE-VOLTE被叫试呼数（视频）', unit: '', format: '', isvisible: true},
            {id: '24', name: 'all_video_call_suc_rate', caption: '全网网络接通率（视频）', unit: '', format: '', isvisible: true},
            {id: '25', name: 'volte_video_call_suc_rate', caption: 'VOLTE-VOLTE网络接通率（视频）', unit: '', format: '', isvisible: true},
            {id: '26', name: 'all_mo_video_call_delay', caption: '全网主叫接通时延（视频）', unit: '', format: '', isvisible: true},
            {id: '27', name: 'volte_mo_video_call_delay', caption: 'VOLTE-VOLTE主叫接通时延（视频）', unit: '', format: '', isvisible: true},
            {id: '28', name: 'all_voice_drop_num', caption: '全网掉话数（语音）', unit: '', format: '', isvisible: true},
            {id: '29', name: 'volte_voice_drop_num', caption: 'VOLTE-VOLTE掉话数（语音）', unit: '', format: '', isvisible: true},
            {id: '30', name: 'all_voice_drop_rate_old', caption: '全网掉话率（语音）', unit: '', format: '', isvisible: true},
            {id: '31', name: 'volte_voice_drop_rate_old', caption: 'VOLTE-VOLTE掉话率（语音）', unit: '', format: '', isvisible: true},
            {id: '32', name: 'esrvcc_ho_voice_cnt', caption: 'eSRVCC切换数（语音）', unit: '', format: '', isvisible: true},
            {id: '33', name: 'esrvcc_ho_voice_suc_rate', caption: 'eSRVCC切换成功率（语音）', unit: '', format: '', isvisible: true},
            {id: '34', name: 'esrvcc_voice_rate', caption: 'eSRVCC切换占比（语音）', unit: '', format: '', isvisible: true},
            {id: '35', name: 'all_video_drop_num', caption: '全网掉话数（视频）', unit: '', format: '', isvisible: true},
            {id: '36', name: 'volte_video_drop_num', caption: 'VOLTE-VOLTE掉话数（视频）', unit: '', format: '', isvisible: true},
            {id: '37', name: 'all_video_drop_rate_old', caption: '全网掉话率（视频）', unit: '', format: '', isvisible: true},
            {id: '38', name: 'volte_video_drop_rate_old', caption: 'VOLTE-VOLTE掉话率（视频）', unit: '', format: '', isvisible: true},
            {id: '39', name: 'esrvcc_ho_video_cnt', caption: 'eSRVCC切换数（视频）', unit: '', format: '', isvisible: true},
            {id: '40', name: 'esrvcc_ho_video_suc_rate', caption: 'eSRVCC切换成功率（视频）', unit: '', format: '', isvisible: true},
            {id: '41', name: 'esrvcc_video_rate', caption: 'eSRVCC切换占比（视频）', unit: '', format: '', isvisible: true},
            {id: '42', name: 'mr_cover_rate', caption: '全网MR覆盖率', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_register_lowquality_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci', caption: '质差小区号', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_name', caption: '质差小区名称', unit: '', format: '', isvisible: true},
            {id: '1', name: 'reg_suc_rate', caption: '注册成功率', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_lon', caption: '质差小区经度', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_lat', caption: '质差小区纬度', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci_cover_type', caption: '小区覆盖类型', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_scene_type', caption: '小区场景类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_mr', caption: '小区无线覆盖率', unit: '', format: '', isvisible: true},
            {id: '1', name: 'id', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_callsuc_lowquality_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci', caption: '质差小区号', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_name', caption: '质差小区名称', unit: '', format: '', isvisible: true},
            {id: '1', name: 'call_suc_rate', caption: '网络接通率', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_lon', caption: '质差小区经度', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_lat', caption: '质差小区纬度', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci_cover_type', caption: '小区覆盖类型', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_scene_type', caption: '小区场景类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_mr', caption: '小区无线覆盖率', unit: '', format: '', isvisible: true},
            {id: '1', name: 'id', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_dropcall_lowquality_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci', caption: '质差小区号', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_name', caption: '质差小区名称', unit: '', format: '', isvisible: true},
            {id: '1', name: 'call_drop_rate', caption: '掉话率', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_lon', caption: '质差小区经度', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_lat', caption: '质差小区纬度', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci_cover_type', caption: '小区覆盖类型', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_scene_type', caption: '小区场景类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_mr', caption: '小区无线覆盖率', unit: '', format: '', isvisible: true},
            {id: '1', name: 'id', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_esrvccSuc_lowquality_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci', caption: '质差小区号', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_name', caption: '质差小区名称', unit: '', format: '', isvisible: true},
            {id: '1', name: 'esrvcc_ho_suc_rate', caption: 'eSRVCC切换成功率', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_lon', caption: '质差小区经度', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_lat', caption: '质差小区纬度', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci_cover_type', caption: '小区覆盖类型', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_scene_type', caption: '小区场景类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_mr', caption: '小区无线覆盖率', unit: '', format: '', isvisible: true},
            {id: '1', name: 'id', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'table_esrvccCnt_lowquality_list', orderid: 'datetime', desc: '', fields: [
            {id: '0', name: 'datetime', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '1', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci', caption: '质差小区号', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_name', caption: '质差小区名称', unit: '', format: '', isvisible: true},
            {id: '1', name: 'esrvcc_cnt_rate', caption: 'eSRVCC切换占比', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_lon', caption: '质差小区经度', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_lat', caption: '质差小区纬度', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci_cover_type', caption: '小区覆盖类型', unit: '', format: '', isvisible: true},
            {id: '0', name: 'eci_scene_type', caption: '小区场景类型', unit: '', format: '', isvisible: true},
            {id: '1', name: 'eci_mr', caption: '小区无线覆盖率', unit: '', format: '', isvisible: true},
            {id: '1', name: 'id', caption: '操作', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'netmodeltable_list', orderid: 'proname', desc: '', fields: [
                {id: '0', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
                {id: '1', name: 'MONTH', caption: '日期', unit: '', format: '', isvisible: true},
                {id: '2', name: 'HOUR', caption: '时间', unit: '', format: '', isvisible: true},
                {id: '3', name: 'user_4G_num', caption: '4G用户数(个)', unit: '', format: '', isvisible: true},
                {id: '4', name: 'traffic_4G', caption: '4G流量（GB）', unit: '', format: '', isvisible: true}
            ]
        },
        {
            id: 'netmodelgeneraltable_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'MONTH', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'SCENE', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '3', name: 'user_4G_num', caption: '4G用户数(个)', unit: '', format: '', isvisible: true},
            {id: '4', name: 'traffic_4G', caption: '4G流量（GB', unit: '', format: '', isvisible: true},
            {id: '3', name: 'traffic_23G', caption: '4G用户数(个)', unit: '', format: '', isvisible: true},
            {id: '4', name: 'traffic_4G_proportion', caption: '4G流量（GB）', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'netmodelbusinesstable_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'MONTH', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'Business', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '3', name: 'delay_4G_all', caption: '4G用户数(个)', unit: '', format: '', isvisible: true},
            {id: '4', name: 'delay_4G_proportion_all', caption: '4G流量（GB）', unit: '', format: '', isvisible: true},
            {id: '3', name: 'delay_4G_DT', caption: '4G用户数(个)', unit: '', format: '', isvisible: true},
            {id: '4', name: 'delay_4G_proportion_DT', caption: '4G流量（GB）', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'netmodelservicetable_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'MONTH', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'service', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '3', name: 'delay_4G_DT', caption: '4G用户数(个)', unit: '', format: '', isvisible: true},
            {id: '4', name: 'delay_4G_proportion_DT', caption: '4G流量(GB)', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'coverquatable_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'city', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '1', name: 'MONTH', caption: '日期', unit: '', format: '', isvisible: true},
            {id: '2', name: 'SCENE', caption: '场景', unit: '', format: '', isvisible: true},
            {id: '3', name: 'delay_4G', caption: '4G业务时长（分钟）', unit: '', format: '', isvisible: true},
            {id: '4', name: 'delay_23G', caption: '23G业务时长（分钟）', unit: '', format: '', isvisible: true},
            {id: '0', name: 'delay_4G_proportion', caption: '4G业务时长占比（%）', unit: '', format: '', isvisible: true},
            {id: '1', name: 'RSRP_NONULL_num', caption: 'RSRP非空采样点数', unit: '', format: '', isvisible: true},
            {id: '2', name: 'RSRP_110_num', caption: 'RSRP>=-110dBm的采样点数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'RSRP_110_proportion', caption: '覆盖率（%）', unit: '', format: '', isvisible: true},
            {id: '3', name: 'num_4G', caption: 'LTE用户数', unit: '', format: '', isvisible: true},
            {id: '4', name: 'inter_num', caption: '互操作用户数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'inter_num_proportion', caption: '互操作用户占比（%）', unit: '', format: '', isvisible: true},
            {id: '4', name: 'everyuser_inter_num', caption: '每用户23G/4G频繁互操作次数', unit: '', format: '', isvisible: true}
        ]
        },


        {
            id: 'PangegntbTable_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'cityname', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'nettype', caption: '网络类型', unit: '', format: '', isvisible: true},
            {id: '3', name: 'category', caption: '大类业务', unit: '', format: '', isvisible: true},
            {id: '4', name: 'bussnies', caption: '小类业务', unit: '', format: '', isvisible: true},
            {id: '5', name: 'pageallcount', caption: '页面合成总次数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'pagescount', caption: '页面合成成功次数', unit: '', format: '', isvisible: true},
            {id: '7', name: 'timedelay', caption: '页面合成时延', unit: '', format: '', isvisible: true},
            {id: '8', name: 'flow5', caption: '页面合成流量_MB(文件大小大于500kb)', unit: '', format: '', isvisible: true},
            {id: '9', name: 'timedelay5', caption: '页面合成时延(文件大小大于500kb)', unit: '', format: '', isvisible: true},
            {id: '10', name: 'timescount', caption: '页面时延质差次数', unit: '', format: '', isvisible: true},
            {id: '11', name: 'flowcount1', caption: '页面速率质差次数(<100kbps)', unit: '', format: '', isvisible: true},
            {id: '12', name: 'flowcoun5', caption: '页面速率质差次数(<500kbps)', unit: '', format: '', isvisible: true},
            {id: '13', name: 'sucratio', caption: '页面显示成功率', unit: '', format: '', isvisible: true},
            {id: '14', name: 'avgduration', caption: '页面显示平均时长', unit: '', format: '', isvisible: true},
            {id: '15', name: 'downdspeed', caption: '页面下载平均速率', unit: '', format: '', isvisible: true},
            {id: '16', name: 'timedifpra', caption: '时延质差占比', unit: '', format: '', isvisible: true},
            {id: '17', name: 'ratedifpra1', caption: '速率质差占比(<100kbps)', unit: '', format: '', isvisible: true},
            {id: '18', name: 'ratedifpra', caption: '速率质差占比(<500kbps)', unit: '', format: '', isvisible: true}

        ]
        },

        {
            id: 'ThreepageFiveTable', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'cityname', caption: '城市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'eci', caption: 'ECI', unit: '', format: '', isvisible: true},
            {id: '3', name: 'dltraffic', caption: '下行流量MB', unit: '', format: '', isvisible: true},
            {id: '4', name: 'filetype1', caption: '0-5KB', unit: '', format: '', isvisible: true},
            {id: '5', name: 'filetype2', caption: '5-50KB', unit: '', format: '', isvisible: true},
            {id: '6', name: 'filetype3', caption: '50-100KB', unit: '', format: '', isvisible: true},
            {id: '7', name: 'filetype4', caption: '100-200KB', unit: '', format: '', isvisible: true},
            {id: '8', name: 'filetype5', caption: '200-500KB', unit: '', format: '', isvisible: true},
            {id: '9', name: 'filetype6', caption: '500KB-1M', unit: '', format: '', isvisible: true},
            {id: '10', name: 'filetype7', caption: '1-5MB', unit: '', format: '', isvisible: true},
            {id: '11', name: 'filetype8', caption: '5-20MB', unit: '', format: '', isvisible: true},
            {id: '12', name: 'filetype9', caption: '>20M', unit: '', format: '', isvisible: true},
            {id: '13', name: 'dqualitycont', caption: '质差区间个数', unit: '', format: '', isvisible: true}

        ]
        },
        {
            id: 'gntb7table_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'PRONAME', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'CITYNAME', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'SPADDR', caption: '业务名称', unit: '', format: '', isvisible: true},
            {id: '2', name: 'BUSSNIES', caption: 'SP_IP', unit: '', format: '', isvisible: true},
            {id: '2', name: 'DSPEED', caption: '综合下行速率（大于500KB）Mbps', unit: '', format: '', isvisible: true},
            {id: '1', name: 'DOWNREQUEST', caption: '访问次数', unit: '', format: '', isvisible: true},
            {id: '2', name: 'DOWNSUCCESS', caption: '访问成功次数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'DOWNSUCCESSPER', caption: '访问成功率', unit: '', format: '', isvisible: true},
            {id: '1', name: 'RESPONSEDELAY', caption: '首包时延 ', unit: '', format: '', isvisible: true},
            {id: '2', name: 'SUCCESS5', caption: '成功次数(大于500k)', unit: '', format: '', isvisible: true},
            {id: '3', name: 'SESSIONACCONT', caption: '500Kbps以下会话占比(大于500KB)', unit: '', format: '', isvisible: true},
            {id: '2', name: 'DOWNFLOWS', caption: '下行总流量(MB)', unit: '', format: '', isvisible: true},
            {id: '3', name: 'DOWNTIMES', caption: '下行总时长(S)', unit: '', format: '', isvisible: true}

        ]
        },
        {
            id: 'gntb8table_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'PRONAME', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'CITYNAME', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'CATEGORY', caption: '大类业务', unit: '', format: '', isvisible: true},
            {id: '2', name: 'BUSSNIES', caption: '小类业务', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT1', caption: '200', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT2', caption: '201', unit: '', format: '', isvisible: true},
            {id: '3', name: 'HTTPCONT3', caption: '202', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT4', caption: '203', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT5', caption: '204', unit: '', format: '', isvisible: true},
            {id: '3', name: 'HTTPCONT6', caption: '205', unit: '', format: '', isvisible: true},
            {id: '0', name: 'HTTPCONT7', caption: '206', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT8', caption: '302', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT9', caption: '304', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT10', caption: '306', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT11', caption: '400', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT12', caption: '401', unit: '', format: '', isvisible: true},
            {id: '3', name: 'HTTPCONT13', caption: '403', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT14', caption: '404', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT15', caption: '405', unit: '', format: '', isvisible: true},
            {id: '3', name: 'HTTPCONT16', caption: '406', unit: '', format: '', isvisible: true},
            {id: '0', name: 'HTTPCONT17', caption: '407', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT18', caption: '408', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT19', caption: '412', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT20', caption: '413', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT21', caption: '414', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT22', caption: '415', unit: '', format: '', isvisible: true},
            {id: '3', name: 'HTTPCONT23', caption: '416', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT24', caption: '417', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT25', caption: '423', unit: '', format: '', isvisible: true},
            {id: '3', name: 'HTTPCONT26', caption: '500', unit: '', format: '', isvisible: true},
            {id: '0', name: 'HTTPCONT27', caption: '501', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT28', caption: '502', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT29', caption: '503', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT30', caption: '504', unit: '', format: '', isvisible: true},
            {id: '1', name: 'HTTPCONT31', caption: '506', unit: '', format: '', isvisible: true},
            {id: '2', name: 'HTTPCONT32', caption: '-2', unit: '', format: '', isvisible: true},
            {id: '3', name: 'HTTPCONT33', caption: '-1', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'Gntab6_TableList', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'proname', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'cityname', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'bussscene', caption: '场景', unit: '', format: '', isvisible: true},
            {id: '3', name: 'dspeed', caption: '综合下行速率（大于500KB）Mbps', unit: '', format: '', isvisible: true},
            {id: '4', name: 'downrequest', caption: '访问次数', unit: '', format: '', isvisible: true},
            {id: '5', name: 'downsuccess', caption: '访问成功次数', unit: '', format: '', isvisible: true},
            {id: '6', name: 'downsuccessper', caption: '访问成功率', unit: '', format: '', isvisible: true},
            {id: '7', name: 'responsedelay', caption: '首包时延', unit: '', format: '', isvisible: true},
            {id: '8', name: 'success5', caption: '成功次数(大于500k)', unit: '', format: '', isvisible: true},
            {id: '9', name: 'sessionaccont', caption: '500Kbps以下会话占比（大于500KB）', unit: '', format: '', isvisible: true},
            {id: '10', name: 'downflows', caption: '下行总流量(M)', unit: '', format: '', isvisible: true},
            {id: '11', name: 'downtimes', caption: '下行总时长(S)', unit: '', format: '', isvisible: true},
            {id: '12', name: 'imper', caption: '即时通信', unit: '', format: '', isvisible: true},
            {id: '13', name: 'cupretranrate', caption: '游戏', unit: '', format: '', isvisible: true},
            {id: '14', name: 'cdownretranrate', caption: '浏览', unit: '', format: '', isvisible: true},
            {id: '15', name: 'c_responsedelay', caption: '视频', unit: '', format: '', isvisible: true},
            {id: '16', name: 'gameper', caption: '应用商店', unit: '', format: '', isvisible: true},
            {id: '17', name: 'gupretranrate', caption: '音乐', unit: '', format: '', isvisible: true},
            {id: '18', name: 'gdownretranrate', caption: '速率质差占比  即时通信业务响应成功率', unit: '', format: '', isvisible: true},
            {id: '19', name: 'g_responsedelay', caption: '即时通信业务TCP上行重传率', unit: '', format: '', isvisible: true},
            {id: '20', name: 'scanper', caption: '即时通信业务TCP下行重传率', unit: '', format: '', isvisible: true},
            {id: '21', name: 'supretranrate', caption: '即时通信业务首包时延', unit: '', format: '', isvisible: true},
            {id: '22', name: 'sdownretranrate', caption: '游戏业务响应成功率', unit: '', format: '', isvisible: true},
            {id: '23', name: 's_responsedelay', caption: '游戏业务TCP上行重传率', unit: '', format: '', isvisible: true},
            {id: '24', name: 'videoper', caption: '游戏业务TCP下行重传率', unit: '', format: '', isvisible: true},
            {id: '25', name: 'vupretranrate', caption: '游戏业务首包时延', unit: '', format: '', isvisible: true},
            {id: '26', name: 'vdownretranrate', caption: '浏览业务响应成功率', unit: '', format: '', isvisible: true},
            {id: '27', name: 'v_responsedelay', caption: '浏览业务TCP上行重传率', unit: '', format: '', isvisible: true},
            {id: '28', name: 'storper', caption: '浏览业务TCP下行重传率', unit: '', format: '', isvisible: true},
            {id: '29', name: 'sutupretranrate', caption: '浏览业务首包时延', unit: '', format: '', isvisible: true},
            {id: '30', name: 'stdownretranrate', caption: '视频业务响应成功率', unit: '', format: '', isvisible: true},
            {id: '31', name: 'st_responsedelay', caption: '视频业务TCP上行重传率', unit: '', format: '', isvisible: true},
            {id: '32', name: 'musicper', caption: '视频业务TCP下行重传率', unit: '', format: '', isvisible: true},
            {id: '33', name: 'mupretranrate', caption: '视频业务首包时延', unit: '', format: '', isvisible: true},
            {id: '34', name: 'm_responsedelay', caption: '应用商店业务TCP上行重传率', unit: '', format: '', isvisible: true},
            {id: '35', name: 'scansessionpor', caption: '应用商店业务TCP下行重传率', unit: '', format: '', isvisible: true},
            {id: '36', name: 'videosessionpor', caption: '应用商店业务首包时延', unit: '', format: '', isvisible: true},
            {id: '37', name: 'storsessionpor', caption: '音乐业务响应成功率', unit: '', format: '', isvisible: true},
            {id: '38', name: 'musicsessionpo', caption: '音乐业务TCP上行重传率', unit: '', format: '', isvisible: true}
        ]
        },
        {
            id: 'gntb9table_list', orderid: 'proname', desc: '', fields: [
            {id: '0', name: 'PRONAME', caption: '省份', unit: '', format: '', isvisible: true},
            {id: '1', name: 'CITYNAME', caption: '地市', unit: '', format: '', isvisible: true},
            {id: '2', name: 'TIME', caption: '时间', unit: '', format: '', isvisible: true},
            {id: '2', name: 'ACNTLENTH_4G', caption: '4G占网时长占比(%)', unit: '', format: '', isvisible: true},
            {id: '1', name: 'ACNTLENTH_23G', caption: '23G占网时长占比(%)', unit: '', format: '', isvisible: true},
            {id: '2', name: 'DELEY_4G', caption: '4G占网时长(小时)', unit: '', format: '', isvisible: true},
            {id: '3', name: 'DELEY_23G', caption: '23G占网时长(小时)', unit: '', format: '', isvisible: true},
            {id: '1', name: 'DELEYALL', caption: '总时长(小时)', unit: '', format: '', isvisible: true},
            {id: '2', name: 'USERCOUNT_4G', caption: '4G用户数', unit: '', format: '', isvisible: true},
            {id: '3', name: 'AVGNETLENTH', caption: '平均占网时长(小时)', unit: '', format: '', isvisible: true}

        ]
        }


    ]
    var length = fieldsLocation.length;
    for (var i = 0; i < length; i++) {
        fieldsInfoes.push(fieldsLocation[i]);
    }
})()
var exports = exports || undefined;
if (exports) {
    exports = module.exports = fieldsInfoes;
}

;var gisInfo = [{
    moduleId:'home',tableId:'h_1',fields:[{
        name:'TotalDL',caption:'下行流量(KB)',range:[
            {max:'100',min:'',color:'#d71345',text:''},
            {max:'200',min:'100',color:'#FF00FF',text:''},{max:'500',min:'200',color:'#ffe600',text:''},{max:'700',min:'500',color:'#228fbd',text:''},{max:'',min:'700',color:'#28FF28',text:''}]
    },{
        name:'dlspeedall',caption:'下行速率(kbps)',range:[
            {max:'100',min:'',color:'#d71345',text:''},
            {max:'200',min:'100',color:'#FF00FF',text:''},{max:'500',min:'200',color:'#ffe600',text:''},{max:'700',min:'500',color:'#228fbd',text:''},{max:'',min:'700',color:'#28FF28',text:''}]
    },{
        name:'dlrsrprate',caption:'下行RSRP占比(>-110)(%)',range:[
            {max:'70',min:'',color:'#d71345',text:''},
            {max:'80',min:'70',color:'#ffe600',text:''},{max:'80',min:'90',color:'#228fbd',text:''},{max:'100',min:'90',color:'#28FF28',text:''}]
    },{
        name:'dlsinrrate',caption:'下行SINR占比(>-3)(%)',range:[
            {max:'60',min:'',color:'#d71345',text:''},
            {max:'70',min:'60',color:'#ffe600',text:''},{max:'70',min:'80',color:'#228fbd',text:''},{max:'100',min:'80',color:'#28FF28',text:''}]
    },{
        name:'dlprb',caption:'下行PRB占比(>75)(%)',range:[
            {max:'20',min:'',color:'#28FF28',text:''},
            {max:'50',min:'20',color:'#ffe600',text:''},{max:'70',min:'50',color:'#FF00FF',text:''},{max:'100',min:'70',color:'#d71345',text:''}]
    },{
        name:'TotalDLThroughput',caption:'文件大于500KB的下行流量(KB)',range:[
            {max:'1024',min:'500',color:'#d71345',text:''},
            {max:'2048',min:'1024',color:'#FF00FF',text:''},{max:'3072',min:'2048',color:'#ffe600',text:''},{max:'',min:'3072',color:'#228fbd',text:''}]
    },{
        name:'dlspeed',caption:'文件大于500KB的下行速率(kbps)',range:[
            {max:'100',min:'',color:'#d71345',text:''},
            {max:'200',min:'100',color:'#FF00FF',text:''},{max:'500',min:'200',color:'#ffe600',text:''},{max:'700',min:'500',color:'#228fbd',text:''},{max:'',min:'700',color:'#28FF28',text:''}]
    }
    ]

},{
    moduleId:'m_1',tableId:'1_1',fields:[{
        name:'target1',caption:'渲染指标1',selected:true,range:[
            {max:'40',min:'20',color:'#ccc',text:''},{max:'60',min:'40',color:'red',text:''}]
    },{
        name:'target2',caption:'渲染指标2',range:[
            {max:'40',min:'20',color:'#ccc',text:''},{max:'60',min:'40',color:'red',text:''}]
    }]

},{
    moduleId:'m_1',tableId:'1_2',fields:[{
        name:'target1',caption:'渲染指标1',range:[{max:'40.2',min:'20',color:'#ccc',text:'固定值'}]
    }]
},{
    moduleId:'mid_1',tableId:'r_1',fields:[{
        name:'round',caption:'弱覆盖',selected:true,range:[
            {max:'20',min:'0',color:'#0080ff',text:''},
            {max:'50',min:'20',color:'#ffff80',text:''},{max:'70',min:'50',color:'#ff00ff',text:''},{max:'100',min:'70',color:'#ff0000',text:''}
        ]
    }]
},{
    moduleId:'mid_2',tableId:'r_2',fields:[{
        name:'round',caption:'过覆盖',selected:true,range:[
            {max:'20',min:'0',color:'#0080ff',text:''},
            {max:'50',min:'20',color:'#ffff80',text:''},{max:'70',min:'50',color:'#ff00ff',text:''},{max:'100',min:'70',color:'#ff0000',text:''}
        ]
    }]
},{
    moduleId:'mid_3',tableId:'r_3',fields:[{
        name:'round',caption:'重叠覆盖',selected:true,range:[
            {max:'20',min:'0',color:'#0080ff',text:''},
            {max:'50',min:'20',color:'#ffff80',text:''},{max:'70',min:'50',color:'#ff00ff',text:''},{max:'100',min:'70',color:'#ff0000',text:''}
        ]
    }]
},{
    moduleId:'mid_4',tableId:'r_4',fields:[{
        name:'round',caption:'下行信噪比',selected:true,range:[
            {max:'20',min:'0',color:'#0080ff',text:''},
            {max:'50',min:'20',color:'#ffff80',text:''},{max:'70',min:'50',color:'#ff00ff',text:''},{max:'100',min:'70',color:'#ff0000',text:''}
        ]
    }]
},{
    moduleId:'mid_5',tableId:'r_5',fields:[{
        name:'round',caption:'上行信噪比',selected:true,range:[
            {max:'20',min:'0',color:'#0080ff',text:''},
            {max:'50',min:'20',color:'#ffff80',text:''},{max:'70',min:'50',color:'#ff00ff',text:''},{max:'100',min:'70',color:'#ff0000',text:''}
        ]
    }]
},{
    moduleId:'mid_6',tableId:'r_6',fields:[{
        name:'round',caption:'下行PRB利用率',selected:true,range:[
            {max:'20',min:'0',color:'#0080ff',text:''},
            {max:'50',min:'20',color:'#ffff80',text:''},{max:'70',min:'50',color:'#ff00ff',text:''},{max:'100',min:'70',color:'#ff0000',text:''}
        ]
    }]
},{
    moduleId:'mid_7',tableId:'r_7',fields:[{
        name:'round',caption:'上行PRB利用率',selected:true,range:[
            {max:'20',min:'0',color:'#0080ff',text:''},
            {max:'50',min:'20',color:'#ffff80',text:''},{max:'70',min:'50',color:'#ff00ff',text:''},{max:'100',min:'70',color:'#ff0000',text:''}
        ]
    }]
},{
    moduleId:'mid_8',tableId:'r_8',fields:[{
        name:'round',caption:'下行RSRQ',selected:true,range:[
            {max:'20',min:'0',color:'#0080ff',text:''},
            {max:'50',min:'20',color:'#ffff80',text:''},{max:'70',min:'50',color:'#ff00ff',text:''},{max:'100',min:'70',color:'#ff0000',text:''}
        ]
    }]
},{
    moduleId:'gisreports',tableId:'gis_reports_1',fields:[{
        name:'target1',caption:'下行流量(kb)',range:[
            {max:'100',min:'',color:'#d71345',text:''},
            {max:'200',min:'100',color:'#FF00FF',text:''},{max:'500',min:'200',color:'#ffe600',text:''},{max:'700',min:'500',color:'#228fbd',text:''},{max:'',min:'700',color:'#28FF28',text:''}]
    },{
        name:'target2',caption:'下行速率(kbps)',range:[
            {max:'100',min:'',color:'#d71345',text:''},
            {max:'200',min:'100',color:'#FF00FF',text:''},{max:'500',min:'200',color:'#ffe600',text:''},{max:'700',min:'500',color:'#228fbd',text:''},{max:'',min:'700',color:'#28FF28',text:''}]
    },{
        name:'target3',caption:'下行RSRP比(%)',range:[
            {max:'70',min:'',color:'#d71345',text:''},
            {max:'80',min:'70',color:'#ffe600',text:''},{max:'80',min:'90',color:'#228fbd',text:''},{max:'100',min:'90',color:'#28FF28',text:''}]
    },{
        name:'target4',caption:'下行SINR比(%)',range:[
            {max:'60',min:'',color:'#d71345',text:''},
            {max:'70',min:'60',color:'#ffe600',text:''},{max:'70',min:'80',color:'#228fbd',text:''},{max:'100',min:'80',color:'#28FF28',text:''}]
    },{
        name:'target5',caption:'下行PRB比(%)',range:[
            {max:'20',min:'',color:'#28FF28',text:''},
            {max:'50',min:'20',color:'#ffe600',text:''},{max:'70',min:'50',color:'#FF00FF',text:''},{max:'100',min:'70',color:'#d71345',text:''}]
    },{
        name:'target6',caption:'下行PRB比(%)',range:[
            {max:'20',min:'',color:'#28FF28',text:''},
            {max:'50',min:'20',color:'#ffe600',text:''},{max:'70',min:'50',color:'#FF00FF',text:''},{max:'100',min:'70',color:'#d71345',text:''}]
    },{
        name:'target7',caption:'下行PRB比(%)',range:[
            {max:'20',min:'',color:'#28FF28',text:''},
            {max:'50',min:'20',color:'#ffe600',text:''},{max:'70',min:'50',color:'#FF00FF',text:''},{max:'100',min:'70',color:'#d71345',text:''}]
    },{
        name:'target8',caption:'下行PRB比(%)',range:[
            {max:'20',min:'',color:'#28FF28',text:''},
            {max:'50',min:'20',color:'#ffe600',text:''},{max:'70',min:'50',color:'#FF00FF',text:''},{max:'100',min:'70',color:'#d71345',text:''}]
    }]

},{
    moduleId:'gridBlank',tableId:'blank_speed',fields:[{
        name:'avgrateall',caption:'下行速率(kbps)',selected:true,range:[
            {max:'',min:'2048',color:'#ff0000',text:''},
            {max:'2018',min:'1024',color:'#ffff00',text:''},{max:'1024',min:'512',color:'#0000ff',text:''},{max:'512',min:'',color:'#00ff00',text:''}
        ]
    },{
        name:'avgrate',caption:'平均速率>500',selected:false,range:[
            {max:'',min:'2048',color:'#ff0000',text:''},
            {max:'2018',min:'1024',color:'#ffff00',text:''},{max:'1024',min:'512',color:'#0000ff',text:''},{max:'512',min:'',color:'#00ff00',text:''}
        ]
    }]
},{
    moduleId:'gridBlank',tableId:'blank_wc',fields:[{
        name:'avgrate',caption:'质差比例',selected:true,range:[
            {max:'',min:'0.4',color:'#ff0000',text:''},
            {max:'0.4',min:'0.2',color:'#ffff00',text:''},{max:'0.2',min:'0.1',color:'#0000ff',text:''},{max:'0.1',min:'',color:'#00ff00',text:''}
        ]
    }]
},{
    moduleId:'gridBlank',tableId:'blank_overlap',fields:[{
        name:'avgrate',caption:'质差比例',selected:true,range:[
            {max:'',min:'0.3',color:'#ff0000',text:''},
            {max:'0.3',min:'0.15',color:'#ffff00',text:''},{max:'0.15',min:'0.1',color:'#0000ff',text:''},{max:'0.1',min:'',color:'#00ff00',text:''}
        ]
    }]
},{
    moduleId:'gridBlank',tableId:'blank_comoverage',fields:[{
        name:'avgrate',caption:'质差比例',selected:true,range:[
            {max:'',min:'0.4',color:'#ff0000',text:''},
            {max:'0.4',min:'0.2',color:'#ffff00',text:''},{max:'0.2',min:'0.1',color:'#0000ff',text:''},{max:'0.1',min:'',color:'#00ff00',text:''}
        ]
    }]
},{
    moduleId:'gridBlank',tableId:'blank_upsinr',fields:[{
        name:'avgrateall',caption:'质差比例',selected:true,range:[
            {max:'',min:'0.1',color:'#ff0000',text:''},
            {max:'0.1',min:'0.05',color:'#ffff00',text:''},{max:'0.05',min:'',color:'#0000ff',text:''}
        ]
    }]
},{
    moduleId:'gridBlank',tableId:'blank_frequency',fields:[{
        name:'businessnumber',caption:'操作次数',selected:true,range:[
            {max:'',min:'2048',color:'#ff0000',text:''},
            {max:'2018',min:'1024',color:'#ffff00',text:''},{max:'1024',min:'512',color:'#0000ff',text:''},{max:'512',min:'',color:'#00ff00',text:''}
        ]
    }]
},{
    moduleId:'gridBlank',tableId:'blank_signaling',fields:[{
        name:'businessnumber',caption:'操作次数',selected:true,range:[
            {max:'',min:'2048',color:'#ff0000',text:''},
            {max:'2018',min:'1024',color:'#ffff00',text:''},{max:'1024',min:'512',color:'#0000ff',text:''},{max:'512',min:'',color:'#00ff00',text:''}
        ]
    }]
},{
    moduleId:'cityGis',tableId:'blank_mycity',fields:[{
        name:'businessnumber',caption:'区间值',selected:true,range:[{max:'',min:'120',color:'#ff0000',text:''},{max:'120',min:'99',color:'#ffff00',text:''},{max:'99',min:'50',color:'#0000ff',text:''},{max:'50',min:'',color:'#00ff00',text:''}
        ]
    }]
}
];
var cityLatLng = [{
    city:'北京',
    LatLng:[39.90071, 116.39212999999995]
},{
    city:'上海',
    LatLng:[31.18331495056, 121.43657326690004]
},{
    city:'天津',
    LatLng:[39.06316536339376, 117.27201461791992]
},{
    city:'重庆',
    LatLng:[29.53104755177, 106.5208625793]
},{
    city:'福州',
    LatLng:[26.08333,119.30000]
},{
    city:'郑州',
    LatLng:[34.7568711, 113.663221]
},{
    city:'广州',
    LatLng:[23.117055306224895, 113.2759952545166]
},{
    city:'呼和浩特',
    LatLng:[40.807605271244064,111.66218519210815]
},{
    city:'太原',
    LatLng:[37.86084459137123,112.56717324256897]
},{
    city:'石家庄',
    LatLng:[38.01841254927259,114.53253507614136]
},{
    city:'沈阳',
    LatLng:[41.80164683359035,123.42783451080322]
},{
    city:'长春',
    LatLng:[43.861909422588404,125.30240893363952]
},{
    city:'哈尔滨',
    LatLng:[45.7412250216648,126.64915680885315]
},{
    city:'南京',
    LatLng:[32.01037766557736,118.72018218040466]
},{
    city:'合肥',
    LatLng:[31.86585876438445,117.29809641838074]
},{
    city:'济南',
    LatLng:[36.60302262778985,116.9980537891388]
},{
    city:'杭州',
    LatLng:[30.257825404758204,120.15560388565063]
},{
    city:'南昌',
    LatLng:[28.67962256188519,115.90429186820984]
},{
    city:'长沙',
    LatLng:[28.198966661973895,112.96353936195373]
},{
    city:'武汉',
    LatLng:[30.565355750190623,114.26120281219482]
},{
    city:'南宁',
    LatLng:[22.82884,108.32566999999994]
},{
    city:'海口',
    LatLng:[20.037285448794982,110.33865451812744]
},{
    city:'贵阳',
    LatLng:[26.630714641692627,106.7607593536377]
},{
    city:'昆明',
    LatLng:[24.998378637512616,102.74214506149292]
},{
    city:'成都',
    LatLng:[30.665629182040032,104.06497836112976]
},{
    city:'西安',
    LatLng:[34.25715437017392,108.9797830581665]
},{
    city:'兰州',
    LatLng:[36.07692152623716,103.70977878570556]
},{
    city:'银川',
    LatLng:[38.477647685,106.2307548522]
},{
    city:'西宁',
    LatLng:[36.63096661803316,101.75256013870239]
},{
    city:'乌鲁木齐',
    LatLng:[43.761858212806686,87.61827349662781]
},{
    city:'拉萨',
    LatLng:[29.642912694443914,91.12223625183105]
},{
    city:'广东',
    LatLng:[23.117055306224895, 113.2759952545166]
},{
    city:'福建',
    LatLng:[26.08333,119.30000]
},{
    city:'河南',
    LatLng:[26.08333,119.30000]
},{
        city:'内蒙古',
        LatLng:[40.807605271244064,111.66218519210815]
    },{
        city:'山西',
        LatLng:[37.86084459137123,112.56717324256897]
    },{
        city:'河北',
        LatLng:[38.01841254927259,114.53253507614136]
    },{
        city:'辽宁',
        LatLng:[41.80164683359035,123.42783451080322]
    },{
        city:'吉林',
        LatLng:[43.861909422588404,125.30240893363952]
    },{
        city:'黑龙江',
        LatLng:[45.7412250216648,126.64915680885315]
    },{
        city:'江苏',
        LatLng:[32.01037766557736,118.72018218040466]
    },{
        city:'安徽',
        LatLng:[31.86585876438445,117.29809641838074]
    },{
        city:'山东',
        LatLng:[36.60302262778985,116.9980537891388]
    },{
        city:'浙江',
        LatLng:[30.257825404758204,120.15560388565063]
    },{
        city:'江西',
        LatLng:[28.67962256188519,115.90429186820984]
    },{
        city:'湖南',
        LatLng:[28.198966661973895,112.96353936195373]
    },{
        city:'湖北',
        LatLng:[30.565355750190623,114.26120281219482]
    },{
        city:'广西',
        LatLng:[22.82884,108.32566999999994]
    },{
        city:'海南',
        LatLng:[20.037285448794982,110.33865451812744]
    },{
        city:'贵州',
        LatLng:[26.630714641692627,106.7607593536377]
    },{
        city:'云南',
        LatLng:[24.998378637512616,102.74214506149292]
    },{
        city:'四川',
        LatLng:[30.665629182040032,104.06497836112976]
    },{
        city:'陕西',
        LatLng:[34.25715437017392,108.9797830581665]
    },{
        city:'甘肃',
        LatLng:[36.07692152623716,103.70977878570556]
    },{
        city:'宁夏',
        LatLng:[38.477647685,106.2307548522]
    },{
        city:'青海',
        LatLng:[36.63096661803316,101.75256013870239]
    },{
        city:'新疆',
        LatLng:[43.761858212806686,87.61827349662781]
    },{
        city:'西藏',
        LatLng:[29.642912694443914,91.12223625183105]
    }]


























