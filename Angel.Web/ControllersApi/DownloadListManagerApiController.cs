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
* 文件名称 ：DataApiController.cs                          
* 描述说明 ：用户下载API控制器
* 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2018-02-10
* 修订信息 : modify by (person) on (date) for (reason)
* 
* 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
**************************************************************************/
    public class DownloadListManagerApiController : BaseApiController
    {

        // GET api/DownloadListManagerApi/get
        public HttpResponseMessage Get(string userid)
        {
            try
            {
                string value = "{\"userid\": \"'" + userid + " '\"}";
                var list = Newtonsoft.Json.Linq.JObject.Parse(value);

                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/DownloadListManagerApiController/Get()方法");
                if (userid == "1")
                    return GetJSONMessage(QueryService.GetData(null, "alluserdownload"));
                else
                    return GetJSONMessage(QueryService.GetData(list, "oneuserdownload"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/DownloadListManagerApiController/Get()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // GET api/DownloadListManagerApi/get
        public HttpResponseMessage GetOneUserDownloadList(string userid)
        {
            try
            {
                string value = "{\"userid\": \"'" + userid + " '\"}";
                var list = Newtonsoft.Json.Linq.JObject.Parse(value);

                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/DownloadListManagerApiController/Get()方法");
                return GetJSONMessage(QueryService.GetData(list, "downloadList"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/DownloadListManagerApiController/Get()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // POST api/userapi/post
        public HttpResponseMessage Post([FromBody]string value)
        {
            string username = UtilFunction.GetCookie("uname");
            string userid = UtilFunction.GetCookie("uid");
            var list = Newtonsoft.Json.Linq.JObject.Parse(value.Replace("{admin}", username).Replace("{1}", userid));
            Dictionary<string, JArray> dict = new Dictionary<string, JArray>();
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/DownloadListManagerApiController/Post([FromBody]string value)方法");
                string serverName = "";
                Newtonsoft.Json.Linq.JArray jArray = new JArray();

                if (list != null && list.Count > 0)
                {
                    foreach (var arry in list)
                    {
                        switch (arry.Key)
                        {
                            case "insert":
                                serverName = "insertDownloadList";
                                break;
                            case "delete7daysBefore":
                                serverName = "delete7daysBefore";
                                break;
                            default:
                                break;
                        }

                        jArray = arry.Value as JArray;
                    }
                }
                if (serverName == "delete7daysBefore")
                {
                    string selectSql = "SELECT username, filename FROM angel_downloadlist where datediff('" + value.Split('"')[7] + "', createtime)>=" + value.Split('"')[4].Split(':')[1].Split(',')[0] + " and username = '" + value.Split('"')[11] + "';";
                    DataTable dt = MySqlHelpers.GetDataTable(selectSql);
                    string uname = string.Empty, filename = string.Empty, filepath = string.Empty;
                    if(dt != null && dt.Rows.Count !=0)
                    {
                        foreach(DataRow row in dt.Rows)
                        {
                            uname = row["username"].ToString();
                            filename = row["filename"].ToString();
                            //从磁盘上删除文件
                            filepath = AppDomain.CurrentDomain.BaseDirectory + "DownFile\\import\\" + uname + "\\"+ filename;
                            File.Delete(filepath);
                        }
                    }
                    else
                        return GetJSONMessage("{\"code\": {\"id\":-1,\"msg\":\"数据库不存在要删除的数据！\"}}");
                }
                return GetJSONMessage(QueryService.InsertBatchCheck(jArray, serverName));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/DownloadListManagerApiController/Post([FromBody]string value)方法," + er.ToString());
                return GetJSONMessage("");
            }
        }
    }
}
