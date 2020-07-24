function AllUpdateUser(obj) {
    $("#userAllIndicatorDialog").modal("show");
}

function getIndicatorDatas(uid) {
    var url = '/api/usertempapi/GetTreeViewByTemplate';
    $.ajax({
        type: "GET",
        url: url,
        data: { userid: uid },
        dataType: "json",
        success: function (data) {

            if (data != null) {
                $('#itreelist').treeview({
                    data: data,
                    showCheckbox: true,
                    onNodeChecked: nodeCheckeds,
                    onNodeUnchecked: nodeUncheckeds
                });
                $('#treeloadings').hide();
                $('#itreelist').treeview('collapseAll');
                $('#itreelist').treeview('checkAll');

            }
        },
        beforeSend: function () {
            $('#treeloadings').show();
        }
    });

}

function nodeCheckeds(event, node) {
    var selectNodes = getChildNodeIdArr(node); //获取所有子节点      
    if (selectNodes) { //子节点不为空，则选中所有子节点       
        $('#itreelist').treeview('checkNode', [selectNodes, { silent: true }]);
    }
    var parentNode = $("#itreelist").treeview("getNode", node.parentId);
    setParentNodeCheck1(node);
}

var nodeUncheckedSilents = false;
function nodeUncheckeds(event, node) {
    var selectNodes = setChildNodeUncheck(node); //获取未被选中的子节点 
    var childNodes = getChildNodeIdArr(node);    //获取所有子节点 
    if (selectNodes && selectNodes.length == 0) { //有子节点且未被选中的子节点数目为0，则取消选中所有子节点   
        $('#itreelist').treeview('uncheckNode', [childNodes, { silent: true }]);
    }
    // 取消节点 父节点取消
    var parentNode = $("#itreelist").treeview("getNode", node.parentId);  //获取父节点
    var selectNodes = getChildNodeIdArr(node);
    setParentNodeCheck1(node);
}

// 取消父节点时 取消所有子节点
function setChildNodeUncheck(node) {
    if (node.nodes) {
        var ts = [];    //当前节点子集中未被选中的集合 
        for (x in node.nodes) {
            if (!node.nodes[x].state.checked) {
                ts.push(node.nodes[x].nodeId);
            }
            if (node.nodes[x].nodes) {
                var getNodeDieDai = node.nodes[x];
                for (j in getNodeDieDai.nodes) {
                    if (!getNodeDieDai.nodes[j].state.checked) {
                        ts.push(getNodeDieDai[j]);
                    }
                }
            }
        }
    }
    return ts;
}

// 选中父节点时，选中所有子节点
function getChildNodeIdArr(node) {
    var ts = [];
    if (node.nodes) {
        for (x in node.nodes) {
            ts.push(node.nodes[x].nodeId);
            if (node.nodes[x].nodes) {
                var getNodeDieDai = getChildNodeIdArr(node.nodes[x]);
                for (j in getNodeDieDai) {
                    ts.push(getNodeDieDai[j]);
                }
            }
        }
    } else {
        ts.push(node.nodeId);
    }
    return ts;
}

function setParentNodeCheck1(node) {
    var parentNode = $("#itreelist").treeview("getNode", node.parentId);
    if (parentNode.nodes) {
        var checkedCount = 0;
        for (x in parentNode.nodes) {
            if (parentNode.nodes[x].state.checked) {
                checkedCount++;
            } else {
                break;
            }
        }
        if (checkedCount == parentNode.nodes.length) {  //如果子节点全部被选 父全选
            $("#itreelist").treeview("checkNode", parentNode.nodeId);
            setParentNodeCheck1(parentNode);
        } else {   //如果子节点未全部被选 父未全选
            $('#itreelist').treeview('uncheckNode', parentNode.nodeId, { color: 'red' });
            setParentNodeCheck1(parentNode);
        }
    }
};

$('#saveinticatoruser').on('click', function () {
    var results = $('#itreelist').treeview('getChecked');
    var ids = [];
    $.each(results, function (index, result) {
        if (result.id.length > 6) { ids.push(result.id); }
    });
    //$("#ipt_target").val(ids.join(","))
    $("#userAllIndicatorDialog").modal("hide");

});

function gettargetId() {
    var results = $('#itreelist').treeview('getChecked');
    var ids = [];
    $.each(results, function (index, result) {
        ids.push(result.id);
    });
    return ids.join(",");
}