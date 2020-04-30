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
using Newtonsoft.Json.Linq;
using System.Text;

namespace Angel.Web.ControllersApi
{
    /*************************************************************************
    * 文件名称 ：LoginlogApiController.cs                          
    * 描述说明 ：用户登录日志API控制器
    * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2018-02-10
    * 修订信息 : modify by (person) on (date) for (rheason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class LoginlogApiController : BaseApiController
    {

        public class Page
        {
            // 每页多少条数据
            public int pageSize { get; set; }
            // 从多少行开始
            public int offset { get; set; }
        }


        // post api/loginlogapi/postlist
        public HttpResponseMessage PostList([FromBody]Page page)
        {
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/LoginlogApiController/PostList()方法");
                int pagenumber = page.offset;//从多少行开始查询
                int pSize = page.pageSize;
                UtilFunction utf1 = new UtilFunction();
                LoginLogService loginbll = new LoginLogService();
                string total = loginbll.counttotal().ToString();
                // 返回查询结果
                List<Model.LoginLogModel> listmodel = loginbll.SelectLoginLOG(null, pagenumber, pSize);
                Dictionary<string, object> objectlist = new Dictionary<string, object>();
                if (total == null)
                {
                    objectlist.Add("total", 0);
                }
                else
                {
                    objectlist.Add("total", total);
                }
                objectlist.Add("rows", listmodel);
                string listmsg = utf1.ToJson(objectlist);
                return GetJSONMessage(listmsg);
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/LoginlogApiController/PostList()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }


        // POST api/loginlogapi/post
        public HttpResponseMessage Post([FromBody]string value)
        {
            var list = Newtonsoft.Json.Linq.JObject.Parse(value);
            //Newtonsoft.Json.Linq.JArray jArray = new JArray();
            Dictionary<string, JArray> dict = new Dictionary<string, JArray>();
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/MenuApiController/Post([FromBody]string value)方法");
                if (list != null && list.Count > 0)
                {
                    string serverName = "";
                    foreach (var arry in list)
                    {
                        switch (arry.Key)
                        {
                            case "insert":
                                serverName = "0_5";
                                break;
                            case "update":
                                serverName = "0_4";
                                break;
                            case "delete":
                                serverName = "0_6";
                                break;
                            default:
                                break;
                        }

                        //jArray.Add( arry.Value as JArray);
                        if (serverName.Equals("") == false)
                        {
                            dict.Add(serverName, arry.Value as JArray);
                        }
                    }
                }
                return GetJSONMessage(QueryService.MulteBatch(dict));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/MenuApiController/Post([FromBody]string value)方法," + er.ToString());
                return GetJSONMessage("");
            }
        }


        // GET /api/loginlogapi/GetExcel
        public HttpResponseMessage GetExcel()
        {

            string TempName = "用户登录日志表.xls";
            string value = "{ \"logloginexcel\": [{\"[@c0]\": \"\"}]}";
            ExportExcel(TempName, value);
            string myjson = "{\"success\":\"导出成功,请到下载中心进行下载\"}";
            return GetJSONMessage(myjson);
        }


        // GET api/menuapi/5
        public string Get(int id)
        {
            return "value";
        }

        //// POST api/menuapi
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/menuapi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/menuapi/5
        public void Delete(int id)
        {
        }


        //增加操作日志
        public HttpResponseMessage Post_Log([FromBody]string value)
        {
            string userid = UtilFunction.GetCookie("uid");
            string username = UtilFunction.GetCookie("uname");
            string roleid = UtilFunction.GetCookie("roleid");
            string rolename = Convert.ToString(MySqlHelpers.ExecuteScalar("select rolename from angel_sys_role where id = '" + roleid + "'"));
            string logposition = value.Split('"')[5];
            string operationtype = value.Split('"')[9];
            try
            {
                int count = Convert.ToInt32(MySqlHelpers.ExecuteScalar("SELECT COUNT(*) FROM angel_sys_operationlog"));
                int ID = 0;
                if (count == 0)
                {
                    ID = 1;
                }
                else
                {
                    ID = Convert.ToInt32(MySqlHelpers.ExecuteScalar("SELECT MAX(ID) FROM angel_sys_operationlog")) + 1;
                }
                string sql = "INSERT INTO angel_sys_operationlog VALUES (" + ID + ", '" + userid + "', '" + username + "', '" + roleid + "','" + rolename + "','" + logposition + "','" + operationtype + "','" + value.ToString() + "','" + username + "','" + System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "')";
                MySqlHelpers.ExecuteNonQuery(sql);
                StringBuilder result = new StringBuilder();
                result.Append("{");
                string code = "\"code\":{{\"id\":{0},\"msg\":\"{1}\"}}";
                code = string.Format(code, 1, "成功");
                result.Append(code);
                result.Append("}");
                return GetJSONMessage(result.ToString());
            }
            catch (Exception er)
            {
                return GetJSONMessage("");
            }
        }

        public HttpResponseMessage GetOperLog()
        {
            try
            {
                string uname = UtilFunction.GetCookie("uname");
                if (uname != "admin")
                {
                    string value = "{\"uname\": \"'" + uname + "'\"}";
                    var list = Newtonsoft.Json.Linq.JObject.Parse(value);
                    return GetJSONMessage(QueryService.GetData(list, "selectoperationloglist"));
                }
                else
                {
                    return GetJSONMessage(QueryService.GetData(null, "selectoperationloglist_admin"));
                }
            }
            catch (Exception er)
            {
                return GetJSONMessage("");
            }
        }


        /// <summary>
        /// 按模板方式导出无返回值
        /// </summary>
        /// <param name="TempName"></param>
        /// <param name="Value"></param>
        /// <param name="sp"></param>
        public void ExportExcel(string TempName, string Value)
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

            while (true)
            {
                if (SaveExcel.State > 1) return;
            }
        }



    }
}
