$(function () {
	// Waves初始化
	Waves.displayEffect();
	// 数据表格动态高度
	$(window).resize(function () {
		$('#table').bootstrapTable('resetView', {
			height: getHeight()
		});
	});
    
});

// 动态高度
function getHeight() {
	return $(window).height() - 20;
}
// 数据表格展开内容
function detailFormatter(index, row) {
	var html = [];
	$.each(row, function (key, value) {
		html.push('<p><b>' + key + ':</b> ' + value + '</p>');
	});
	return html.join('');
}

//刷新功能
function ReloadTable(tbid, url) {
    tbid.bootstrapTable({ url: url });
    tbid.bootstrapTable('refresh');
}

//下载完成后，将下载文件插入到表里
function insertDownloadList(postlist) {
    //往下载列表插入数据
    var actionurl = "/api/downloadlistmanagerapi/post";
    com.server.post(actionurl, JSON.stringify(postlist), function (data) {
        if (data != null && data.code.id == 1) {
            //alert("插入下载列表成功！");
        }
        else
        {
            //alert("插入下载列表失败！");
        }          
    });
}


//增加操作日志记录
function oper_log(postlist) {
    var actionurl = "/api/LoginlogApi/Post_Log";
    com.server.post(actionurl, JSON.stringify(postlist), function (data) {});
}

function actionFormatter(value, row, index) {
    return [
        '<a class="like" href="javascript:void(0)" data-toggle="tooltip" title="Like"><i class="glyphicon glyphicon-heart"></i></a>　',
        '<a class="edit ml10" href="javascript:void(0)" data-toggle="tooltip" title="Edit"><i class="glyphicon glyphicon-edit"></i></a>　',
        '<a class="remove ml10" href="javascript:void(0)" data-toggle="tooltip" title="Remove"><i class="glyphicon glyphicon-remove"></i></a>'
    ].join('');
}

window.actionEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .edit': function (e, value, row, index) {
        alert('You click edit icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    },
    'click .remove': function (e, value, row, index) {
        alert('You click remove icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    }
};

function detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
    });
    return html.join('');
}