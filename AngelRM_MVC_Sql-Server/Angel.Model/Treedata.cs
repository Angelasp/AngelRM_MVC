using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Angel.Model
{
    /// <summary>
    ///jsondata 的摘要说明
    /// </summary>
    public class Treedata
    {
        public Treedata()
        {
            //TODO: 在此处添加构造函数逻辑
        }
        //定义Treedata类，存放节点数据
        public string id = "";
        public string pId = "";
        public string name = "";
        public string depth = "";
        public string path = "";
        public string affiliationid = "";
        public string file = "";
        public bool click = true;
        public bool open = false;//是否展开
        public bool isParent = true;//是否树叶
        public bool CHECKED = false;
        public List<Treedata> children = new List<Treedata>();//存放子节点
        public string ext1 = "";
        public string ext2 = "";
        public string ext3 = "";
        public string ext4 = "";
    }
}