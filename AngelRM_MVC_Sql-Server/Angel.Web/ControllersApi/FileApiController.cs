using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Angel.DataAccess;
using Angel.Utils;
using Angel.Service;
using Angel.Model;
using Newtonsoft.Json.Linq;


namespace Angel.Web.ControllersApi
{
    /*************************************************************************
    * 文件名称 ：FileApiController.cs                          
    * 描述说明 ：文件模板下载API控制器
    * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2018-02-10
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class FileApiController : BaseApiController
    {


        public SaveExcel SaveExcel;
        //获取语句返回json数据
        // GET /api/fileapi/get
        public HttpResponseMessage Get()
        {
            string username1 = UtilFunction.GetCookie("cityid");
            //string username = "admin";
            string username = UtilFunction.GetCookie("uname");
            string FilePath =System.Web.HttpContext.Current.Server.MapPath("~/DownFile/import/");
            UtilFunction uf = new UtilFunction();
            List<FileList> tablelist = uf.DataFileName(username, FilePath);
            string myjson = uf.ToJson(tablelist);
            return GetJSONMessage(myjson);
        }

        // GET /api/fileapi/get/1
        public HttpResponseMessage Get(int id)
        {

            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            string myjson = string.Empty;   //返回值
            string TempName = string.Empty ; //模板名称
            string  value=string.Empty;  //查询条件
           
            switch (id)
            {
                case 1:
                    TempName = "指标模板V5.xlsx";
                   value = "{ \"CityData1\": [{\"[@c0]\": \"PRONAME\", \"[@c1]\": \"CITYNAME\", \"[@c2]\": \"CITY_NO\",\"[@c3]\": \"where 1=1\" }]}";
                   ExportExcel(TempName, value);
                   myjson="{success:'导出成功,请到下载中心进行下载'}";
                    break;
                case 2:
                    myjson = "{name:'2号'}";
                    break;
                case 3:
                    myjson = "{name:'3号'}";
                    break;
                default:
                    myjson = "{name:'0号'}";
                    break;
            }
            return GetJSONMessage(myjson);
        }

        // POST api/fileapi/post
        public HttpResponseMessage Post([FromBody]string value,string tempname)
        {

            string myjson = string.Empty;
            //需要传入json串和模板名称
            ExportExcel(tempname, value);
            myjson = "{success:'导出成功,请到下载中心进行下载'}";

            return GetJSONMessage(myjson);

        }

        /// <summary>
        /// 按模板方式导出无返回值
        /// </summary>
        /// <param name="TempName"></param>
        /// <param name="Value"></param>
        /// <param name="sp"></param>
        public void ExportExcel(string TempName,string Value) 
        {

            var list = Newtonsoft.Json.Linq.JObject.Parse(Value);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            string username = UtilFunction.GetCookie("uname");
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            SaveParameter sp = new SaveParameter(jarrays, TempName, username);
            SaveExcel SaveExcel = new SaveExcel();
            SaveExcel.RunSave(sp);   
        }

    }
}
