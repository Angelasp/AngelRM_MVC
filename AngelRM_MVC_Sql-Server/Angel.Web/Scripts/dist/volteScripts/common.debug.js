/*!
*Debug Of JS*
*Create:2017-03-21*/
var com = com || {};
(function(){
    'use strict';

        com.EventManager = {
            _obj:{},
            getEvent: function (key) {
                this._obj[key] = this._obj[key] || {};var self = this;
                return{
                    _eventObj:$(self._obj[key]),
                    subscribe: function () {
                        this._eventObj.on.apply(this._eventObj,arguments);
                    },
                    unsubscribe: function () {
                        this._eventObj.off.apply(this._eventObj,arguments);
                    },
                    publish: function () {
                        this._eventObj.trigger.apply(this._eventObj,arguments);
                    },
                }
            },
            deleteEvent: function (key) {
                if(this._obj[key]){
                    delete  this._obj[key];
                }

            }
        };
        com.Server = function (serverid) {

            this._url = '/getserver';


        this._serverid = serverid;
    };
    com.Server.prototype ={
        get: function (params,callback,errcallback) {
            console.log(params);
            if(typeof params === 'function'){
                errcallback = callback;
                callback = params;
                params = undefined;
            }
            if(!errcallback){
                errcallback = function (e) {
                    console.error('从服务端获取数据报错，错误是:\n'+ e.statusText);
                }
            }

            if(!params) params ='';
            params = this._parseParam(params);
            $.ajax({url:this._url,data:params,type:'GET',async:false,timeout:300000}).done(callback).fail(errcallback);
        },
        get1: function (params,callback,errcallback) {

            if(typeof params === 'function'){
                errcallback = callback;
                callback = params;
                params = undefined;
            }
            if(!errcallback){
                errcallback = function (e) {
                    console.error('从服务端获取数据报错，错误是:\n'+ e.statusText);
                }
            }
            if(!params) params ='';
            params = this._parseParam(params);
            $.ajax({url:this._url,data:params,type:'GET',async:true,timeout:900000}).done(callback).fail(errcallback);
        },

        post: function (params,callback,errcallback) {
            if(typeof params === 'function'){
                errcallback = callback;
                callback = params;
                params = undefined;
            }
            if(!errcallback){
                errcallback = function (e) {
                    console.error('从服务端获取数据报错，错误是:\n'+ e.statusText);
                }
            }
            if(!params) params ='';
            params = this._parseParam(params);
            $.ajax({url:this._url,data:params,type:'POST',timeout:180000}).done(callback).fail(errcallback);
        },
        delete:function(params,callback,errcallback){
            if(typeof params === 'function'){
                errcallback = callback;
                callback = params;
                params = undefined;
            }
            if(!errcallback){
                errcallback = function (e) {
                    console.error('从服务端获取数据报错，错误是:\n'+ e.statusText);
                }
            }
            if(!params) params ='';
            params = this._parseParam(params);
            $.ajax({url:this._url+'/del',data:params,type:'DELETE',timeout:180000}).done(callback).fail(errcallback);
        },

        _parseParam: function (params) {
            var selfp = params;
                try {

                if (!params || params === '') {
                    params = {};
                    params.serverid = this._serverid;
                } else if (typeof params === 'string') {
                    params = JSON.parse(params);
                    params.serverid = this._serverid;
//                    params = JSON.stringify(params);
                } else {
                    params.serverid = this._serverid;
//                    params = JSON.stringify(params);
                }
                return params;
            }catch(e){
                console.error('转换往后台传递参数时报错，信息是:\n'+e);
                selfp.url = this._url;
                return selfp;
            }
        }
    };

    com.Util = {
        //格式化时间，
        Format : function(data,fmt){
            return data.Format(fmt);
        },

        ToInt: function (value) {
            try
            {
                if (value == undefined || value == '')
                    return value;
                return parseInt(value);
            }
            catch(e){
                return value;
            }

        },
        ToDouble: function (value, prec) {
            try{
                if (value == undefined || value == '')
                    return value;
                var fixnum = parseFloat(value).toFixed(prec);
                return fixnum;
            }
            catch (e) {
                return value;
            }
        },
        ToPercent: function (value, perc) {
            try{
                if (value == undefined || value == '')
                    return value;
                var fixnum = (parseFloat(value) * 100).toFixed(perc);
                return fixnum;
            }
            catch (e) {
                return value;
            }
        },

        getViewPort:function(){
            var e = window,a = 'inner';
            if(!('innerWidth' in window)){
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width:e[a+'Width'],
                height:e[a+'Height']
            };
        },
        hextorgb:function(hex,al){
            var hexColor = /^#/.test(hex)?hex.slice(1):hex,
                alp = hex === 'transparent' ? 0 :Math.ceil(al), r, g,b;
            if(al>100) al = 100;
            //判断正常的hex
            hexColor = /^[0-9a-f]{3}|[0-9a-f]{6}/i.test(hexColor)?hexColor:'ffffff';
            //将3位的hex转换为6位
            if(hexColor.length === 3){
                hexColor = hexColor.replace(/(\w)(\w)(\w)/gi,'$1$1$2$2$3$3');
            }
            r = hexColor.slice(0,2);
            g = hexColor.slice(2,4);
            b = hexColor.slice(4);
            r = parseInt(r,16);
            g = parseInt(g,16);
            b = parseInt(b,16);
            alp = (alp/100).toFixed(2);
            return {
                hex:'#'+hexColor,
                alpha:alp,
                rgba:'rgba('+r+','+g+','+b+','+alp+')'
            }
        }
    };
    com.globle={
        pen:'',
        penName:'',
        province:'',
        city:'',
        startDate:'',
        endDate:''
    };




    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,//月份
            "d+": this.getDate(),//天
            "h+": this.getHours(),//小时
            "m+": this.getMinutes(),//分钟
            "s+": this.getSeconds(),//秒
            "S": this.getMilliseconds()//毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;

    };


})();






;var com = com || {};
com.controls = com.controls || {};
//根据数据进行绑定表格
com.controls.table = function (data, fields, tableid, width, height, sort) {
    var columns = [], $table = $('#' + tableid), fnTable, columnDef = [];
    //_(fields).forEach(function (n,idx) {
    //    if(data && data.data && data.data.length>0){
    //        if(data.data[0][n.name.toLowerCase()]==undefined || n.isvisible===false){
    //            columnDef.push({"targets":[idx],"visible":false});
    //        }
    //    }
    //    columns.push({"data": n.name.toLowerCase(), "title": !!n.caption === true ? n.caption : n.name, defaultContent: '',width: n.width});
    //}).value();
    $.each(fields, function () {
        var n = this, isvisible = true;
        if (data != null) {
            if (data.length > 0) {
                if (data[0][n.name.toLowerCase()] === undefined || n.isvisible === false) {
                    isvisible = false;
                }

            }
        }
        columns.push({
            "data": n.name.toLowerCase(),
            "title": !!n.caption === true ? n.caption : n.name,
            defaultContent: '',
            width: n.width,
            visible: isvisible
        });
    });
    var tableCon = $table.dataTable({
        language: {
            //"sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            //"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            //"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sProcessing": "<img src='../dist/lib/images/loading-spinner-grey.gif'/>数据加载中……"
            //"oPaginate": {
            //    "sFirst": "首页",
            //    "sPrevious": "前一页",
            //    "sNext": "后一页",
            //    "sLast": "尾页"
            //}
        },
        "bLengthChange": false, //是否允许自定义每页显示条数.
        searching: false,//过滤功能
        "bAutoWidth": false,//自动宽度
        destroy: true,
        "bSort": sort,
        "sScrollY": height == '' || height == undefined ? 'auto' : height,
        "sScrollX": width == '' || width == undefined ? '' : width,
        "data": data,
        "paging": false,
        "info": false,
        "columns": columns//,
        //"columnDefs":(columnDef.length>0?columnDef:null)
    });

    $table.removeClass('display').addClass('table table-striped table-bordered');
    return tableCon;

};
/*
 add this plug in
 // you can call the below function to reload the table with current state
 Datatables刷新方法
 oTable.fnReloadAjax(oTable.fnSettings());
 */
$.fn.dataTableExt.oApi.fnReloadAjax = function (oSettings) {
    this.fnClearTable(this);
    this.oApi._fnProcessingDisplay(oSettings, true);
    var that = this;
    for (var i = 0; i < dataSelect.data.length; i++) {
        that.oApi._fnAddData(oSettings, dataSelect.data[i]);
    }
    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
    that.fnDraw(that);
    that.oApi._fnProcessingDisplay(oSettings, false);
}
/**
 * dataTable数据渲染
 * @param {object} data 表格数据
 * @param {int} fields 表头配置数据
 * @param {string} tableid 表格ID
 * @param {int} width 表格宽度，为空时则100%宽度
 * @param {object} params 查询参数
 * @param {string} dataKey 查询服务的key
 * */
com.controls.dataTable = function (data, fields, tableid, width, params, dataKey, callback, height) {
    var columns = [], $table = $('#' + tableid), fnTable;
    $.each(fields, function () {
        var n = this, isvisible = true;
        if (data.data != null) {
            if (data.data.length > 0) {
                if (data.data[0][n.name.toLowerCase()] === undefined || n.isvisible === false) {
                    isvisible = false;
                }
            }
        }
        columns.push({
            "data": n.name.toLowerCase(),
            "title": !!n.caption === true ? n.caption : n.name,
            defaultContent: '',
            width: n.width,
            visible: isvisible
        });
    });
    var oTable = $table.dataTable({
        "oLanguage": {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sProcessing": "<img src='../dist/lib/images/loading-spinner-grey.gif'/>数据加载中……",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            }
        },
        destroy: true,
        "sZeroRecords": "没有检索到数据",
        'bLengthChange': false, //是否允许自定义每页显示条数.
        searching: false,//过滤功能
        "bInfo": false,//页脚信息
        "bAutoWidth": false,//自动宽度
        "processing": true,//等待
        "sScrollY": height == '' || height == undefined ? '380px' : height,
        "stateSave": true,//表格状态
        "paging": false,//分页
        //"ordering":false,
        "sScrollX": width,
        "data": data.data,
        "columns": columns

    });
    $("#" + tableid).parent(".dataTables_scrollBody").after("<div class='row'><div class='col-sm-4'><span class='" + tableid + "_span'>" + str_page(data.rows, params.page, params.rowSize) + "</span></div> <div class='col-sm-8' style='float:right;' id='" + tableid + "_jPaginace'></div></div>");
    $("#" + tableid + "_jPaginace").paginate({
        count: parseInt(data.rows / params.rowSize) != NaN ? parseInt(data.rows / params.rowSize) + 1 : 0,
        // count:100,
        start: 1,
        display: 10,
        border: false,
        text_color: '#888',
        background_color: 'EEE',
        text_hover_color: 'black',
        background_hover_color: '#CFCFCF',
        images: false,
        mouse: 'press',
        onChange: function (page) {
            $('#' + tableid).block({message: '数据加载中……'});
            var cm = new com.Server(dataKey);
            params.page = page;
            cm.get(params, function (data) {
                if (data.response.data != null) {
                    dataSelect = data.response.data[0];
                    $('.' + tableid + '_span').html(str_page(data.response.data[0].rows, page, params.rowSize));
                    oTable.fnReloadAjax(oTable.fnSettings());
                    $('#' + tableid).unblock();
                    if (callback != null && callback != "") {
                        callback(dataSelect);
                    }
                }
            });
        }
    });
    return oTable;
};
/**
 * 页脚信息生成
 * @param {int} total 总的数据条数
 * @param {int} page 页数
 * @param {int} pagesize 每页显示条数
 * */
function str_page(total, page, pagesize) {
    var str = '';
    if (total < page * pagesize) {
        if (page == 1) {
            str = "从 1 到 " + total + " 共 " + total + " 条数据";
        }
        else {
            str = "从 " + ((page - 1) * pagesize + 1) + " 到 " + total + " 共 " + total + " 条数据";
        }
    }
    else {
        if (page == 1) {
            str = "从 1 到 " + page * pagesize + " 共 " + total + " 条数据";
        }
        else {
            str = "从 " + ((page - 1) * pagesize + 1) + " 到 " + page * pagesize + " 共 " + total + " 条数据";
        }
    }
    return str;
}
//此数据暂时只支持包含id和parentid的json格式的数据。
//ischecked为true包含勾选框
/**
 * 此数据暂时只支持包含id和parentid的json格式的数据。
 * @param {object} data json格式的数据
 * @param {bool} ischecked 是否包含勾选框
 * @param {string} treeselected tree控件标示，可以是id，class
 * @param [{Array}] icons 节点图标，包含'/'为图片，否则为class类,按照节点等级配置节点图标，可以为空
 * @param [{Object}] callback 注册的事件回调函数，事件key为
 * */
com.controls.jstree = function (data, ischecked, treeselected, icons, callbacks) {
    var $tree = $(treeselected), plugins = (ischecked ? ["types", "checkbox"] : ["types"]), types = {};
    if (icons) {
        if (!Array.isArray(icons)) {
            icons = [icons];
        }
        icons.forEach(function (item) {
            for (var key in item) {
                types[key] = {"icon": item[key]};
            }
        });
    }
    var $jstree = $tree.jstree({
        "core": {"data": data},
        "plugins": plugins,
        "types": types,
        "lang": {
            loading: "目录加载中……"  //在用户等待数据渲染的时候给出的提示内容，默认为loading
        }
    });
    if (!icons) {
        // $jstree.hide_icons();
    }
    if (callbacks) {
        callbacks.forEach(function (item) {
            for (var k in item) {
                $jstree.on(k, item[k]);
            }
        })
    }
};
/**
 *
 * */
com.controls.asyncTree = function (url, ischecked, treeselected, icons, callbacks) {
    var $tree = $(treeselected), plugins = (ischecked ? ["types", "checkbox", "json_data"] : ["types", "json_data"]), types = {};
    if (icons) {
        if (!Array.isArray(icons)) {
            icons = [icons];
        }
        icons.forEach(function (item) {
            for (var key in item) {
                types[key] = {"icon": item[key]};
            }
        });
    }
    $.ajaxSetup({cache: false});
    var $jstree = $tree.jstree({
        "core": {
            "data": {
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                url: url,
                async: true,
                dataFilter: function (data) {
                    var jsonData = JSON.parse(data);
                    return JSON.stringify(jsonData.response.data[0].data);
                },//sucess方法无效
                data: function (node) {
                    return {"id": node.id};
                }
            }
        },
        "plugins": plugins,
        "types": types

    });
    if (callbacks) {
        callbacks.forEach(function (item) {
            for (var k in item) {
                $jstree.on(k, item[k]);
            }
        })
    }
};

com.controls.tabs = function (parent, options) {
    //在parent中添加tab

}

com.controls.blockui = {
    /**
     * 自定义的进度遮挡层，依赖与blockui
     * @param {string} selector css类型的选择器
     * @param {string} clsid 进度框中的进度样式
     * @param {int} processvalue 进度条中进度值
     * */
    show: function (selector, clsid, processValue) {
        var $p = $(selector);
        $.blockUI.defaults.css = {backgroundColor: 'none', border: 'none'};
        $p.block({
            message: '<div class="uiloader  ' + clsid + '"><a href="javascript:;">' + processValue + '</a></div>'
        });
        return $p;
    },
    changeValue: function (selector, value) {
        var $p = $(selector), avalue = $p.find('.uiloader>a');
        if (avalue && avalue.length > 0) {
            avalue.text(value);
        }
    },
    unblock: function (selector) {
        var $p = $(selector);
        if ($p && $p.length > 0) {
            $p.unblock();
        }
    }

};

com.controls.addCookieValue = function (name, value, days, path) {
    /**添加设置cookie**/
    var str = name + "=" + escape(value);
    if (days != "") {
        var date = new Date();
        //date.setTime(date.getTime()+days*24*3600*1000);//expires单位为天
        //date.setTime(date.getTime()+days*1000);//expires单位为秒
        date.setTime(date.getTime() + days * 24 * 3600 * 1000);//expires单位为天
        str += ";expires=" + date.toGMTString();
    }
    if (path != "") {
        str += ";path=" + path;//指定可访问cookie的目录
    }
    /*if(domain!="")
     {
     str+=";domain="+domain;//指定可访问cookie的域
     }*/
    document.cookie = str;
};

com.controls.getCookieValue = function (name) {
    /**获取cookie的值，根据cookie的键获取值**/
    //var name='userid';var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
//用处理字符串的方式查找到key对应value
    var name = escape(name);
    //读cookie属性，这将返回文档的所有cookie
    var allcookies = document.cookie;
    //查找名为name的cookie的开始位置
    name += "=";
    var pos = allcookies.indexOf(name);
    //如果找到了具有该名字的cookie，那么提取并使用它的值
    if (pos != -1) {                                             //如果pos值为-1则说明搜索"version="失败
        var start = pos + name.length;                  //cookie值开始的位置
        var end = allcookies.indexOf(";", start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie
        var value = allcookies.substring(start, end); //提取cookie的值
        //addCookie("id", value, 1, "/");
        return (value);                           //对它解码
    } else {	//搜索失败，返回空字符串
        return "";
    }
};

com.controls.deleteCookie = function (name, path) {
    /**根据cookie的键，删除cookie，其实就是设置其失效**/
    var name = escape(name);
    var expires = new Date(0);
    path = path == "" ? "" : ";path=" + path;
    document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
};

/**
 * @param title   弹框消息的标题
 * @param text    弹框消息的内容
 * @param type     弹框消息的类型 success,info,warning,error
 * @param positionClass 进度条是否显示
 *///弹出窗的位置 toast-top-right,toast-botton-right,toash-bottom-left,toast-top-left,toast-top-full-width,
    // toast-bottom-full-width,toast-top-center,toast-bottom-center
com.controls.showBox = function (title, text, type, positionClass, position) {
    toastr.clear();
    //参数设置，若用默认值可以省略以下面代
    toastr.options = {
        "closeButton": true, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "progressBar": positionClass,//是否显示进度条
        "positionClass": position ? position : "toast-bottom-right",//弹出窗的位置 toast-top-right,toast-botton-right,toash-bottom-left,
        "showDuration": "300",//显示动作（从无到有这个动作）持续的时间
        "hideDuration": "1000",//消失的动画时间
        "timeOut": "5000", //展现时间
        "extendedTimeOut": "1000",//加长展示时间
        "showEasing": "swing",//显示时的动画缓冲方式
        "hideEasing": "linear",//消失时的动画缓冲方式
        "showMethod": "show",//显示时的动画方式  fadeIn+jQuery的展示效果
        "hideMethod": "hide" //消失时的动画方式fadeout+jQuery的消失效果
    };
    toastr[type ? type : 'error'](text, title);
}

/**
 * @param id 传过表格id进行判断 如果是隐藏的 就要设置下他的宽度 为100%
 * 解决隐藏标签后生成的表格样式不对
 */
com.controls.checkHidden = function (id) {
    if ($(id).is(":hidden")) {
        $(id + "_wrapper .dataTables_scrollHeadInner").css('width', '100%');
    }
}
/**
 * 检测传过来的id是否有内容没有则根据这个id进行判断查询
 * @param id 传过来的标签
 * @param context 存储位置的记录标签
 */
com.controls.checkDatePro = function (id, context, serverId, callback) {
    var proDate = $(id).data(context);
    if (proDate != null) {
        return proDate;
    }
    return com.Server(serverId).get({p_type: "2"}, function (data) {
        $(id).data(context, data[0]);
        callback;
    });
}

