using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Angel.Utils;
using Angel.Model;


namespace Angel.Web.ControllersApi
{
    /*************************************************************************
    * 文件名称 ：SysManagerApiController.cs                          
    * 描述说明 ：系统文件管理API控制器
    * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2018-02-10
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class SysManagerApiController : BaseApiController
    {

        public FileInfos[] getFileList([FromBody]Params param)
        {
            UtilFunction uf = new UtilFunction();
            string path = AppDomain.CurrentDomain.BaseDirectory + "OtherData";
            string[] filenames = Directory.GetFiles(path);
            List<FileInfos> list = new List<FileInfos>();
            int total = 0;
            foreach (String fn in filenames)
            {
                total++;
                FileInfos obj = new FileInfos();
                obj.id = total;
                obj.fileName = Path.GetFileName(fn);
                list.Add(obj);
            }
            //Dictionary<string, object> map = new Dictionary<string, object>();
            //map.Add("rows", list);
            //string myjson = uf.ToJson(map);
            return list.ToArray();
        }
    }


    public class Params
    {
        public string tempname { get; set; }
        public string value { get; set; }
        public string number1 { get; set; }
        public string number2 { get; set; }
        public string number3 { get; set; }
        public string number4 { get; set; }
        public string filename { get; set; }
    }


}
