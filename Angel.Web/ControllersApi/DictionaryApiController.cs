using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Angel.DBHelper;
using Angel.BLL;
using Angel.Utils;
using Angel.Service;
using Angel.DataAccess;
using Angel.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Text;
using System.IO;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;

namespace Angel.Web.ControllersApi
{
    /*************************************************************************
    * 文件名称 ：DictionaryApiController.cs                          
    * 描述说明 ：字典管理API控制器
    * 创建信息 : create by QQ：815657032、709047174 Email:Angel_asp@126.com on 2021-03-09
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class DictionaryApiController : BaseApiController
    {

        /// <summary>
        /// 字典列表查询
        /// </summary>
        /// <param name="dinfo"></param>
        /// <returns></returns>
        public HttpResponseMessage postDictionaryList([FromBody]dictionaryInfo dinfo)
        {

            UtilFunction uf = new UtilFunction();
            string where = " where 1=1 ";
            if (!string.IsNullOrEmpty(dinfo.dictName))
            {
                where += " AND dictname LIKE '%" + dinfo.dictName.Trim() + "%'";
            }
            if (!string.IsNullOrEmpty(dinfo.createUserName))
            {
                where += " AND createuser='" + dinfo.createUserName.Trim() + "'";
            }
            int pagenumber = dinfo.offset;//第几页
            int pSize = dinfo.rows;//一页多少行

            //按条件查询总行
            DataTable tabletotal = QueryService.GetWhereDataTable("query_dicttypetotal", where);
            where += " ORDER BY id desc limit " + pagenumber + "," + pSize;
            // 结果集
            DataTable tablelist = QueryService.GetWhereDataTable("query_dicttypelist", where);
            // 返回查询结果
            Dictionary<string, object> map = new Dictionary<string, object>();
            if (tabletotal == null)
            {
                map.Add("total", 0);
            }
            else
            {
                map.Add("total", tabletotal.Rows[0][0]);
            }
            map.Add("rows", tablelist);
            string myjson = uf.ToJson(map);
            return GetJSONMessage(myjson);
        }


        

        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        ///  POST api/DictionaryApi/post
        public HttpResponseMessage Post([FromBody]string value)
        {
            string username = UtilFunction.GetCookie("uname");
            var list = Newtonsoft.Json.Linq.JObject.Parse(value.Replace("}]}", ",\"createuser\":\""+username+"\"}]}"));
  
            //Newtonsoft.Json.Linq.JArray jArray = new JArray();
            Dictionary<string, JArray> dict = new Dictionary<string, JArray>();
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/DictionaryApiController/Post([FromBody]string value)方法");
                string serverName = "";
                Newtonsoft.Json.Linq.JArray jArray = new JArray();

                if (list != null && list.Count > 0)
                {
                    foreach (var arry in list)
                    {
                        switch (arry.Key)
                        {
                            case "insert":
                                serverName = "insert_dictionary_type";
                                break;
                            case "update":
                                serverName = "update_dictionary_type";
                                break;
                            case "delete":
                                serverName = "dele_dicttype";
                                break;
                            default:
                                break;
                        }

                        jArray = arry.Value as JArray;
                    }

                }

               return GetJSONMessage(QueryService.InsertBatch(jArray, serverName));


            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/DictionaryApiController/Post([FromBody]string value)方法," + er.ToString());
                return GetJSONMessage("");
            }
        }
        // GET api/dictionary/5
        public string Get(int id)
        {
            return "value";
        }
        // PUT api/dictionary/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/dictionary/5
        public void Delete(int id)
        {
        }
    }



    public class dictionaryInfo
    {
        public int id { get; set; }
        public string dictName { get; set; }
        public string dictType { get; set; }
        public string isvisible { get; set; }
        public string createUserName { get; set; }
        public string modifyUserName { get; set; }
        // 每页多少条数据
        public int rows { get; set; }
        // 请求第几页
        public int offset { get; set; }
    }
    /*************************************************************************
    * 文件名称 ：DictionaryApiController.cs                          
    * 描述说明 ：字典管理API控制器
    * 创建信息 : create by QQ：815657032、709047174 Email:Angel_asp@126.com on 2021-03-09
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
}
