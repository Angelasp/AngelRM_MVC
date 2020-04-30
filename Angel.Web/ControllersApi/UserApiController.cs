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
    * 文件名称 ：UserApiController.cs                          
    * 描述说明 ：用户管理API控制器
    * 创建信息 : create by QQ：815657032、709047174 Email:Angel_asp@126.com on 2018-05-09
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class UserApiController : BaseApiController
    {
        // GET api/userapi/get
        public HttpResponseMessage Get()
        {
            try
            {
                string level = UtilFunction.GetCookie("level");
                int levels = 0;
                if (Convert.ToInt32(level) == 9)
                {
                    levels = Convert.ToInt32(level) + 1;
                }
                else
                {
                    levels = Convert.ToInt32(level);
                }
                var list = Newtonsoft.Json.Linq.JObject.Parse("{level:" + levels + "}");

                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/UserApiController/Get()方法");
                return GetJSONMessage(QueryService.GetData(list, "1_2"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/UserApiController/Get()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // POST api/userapi/post
        public HttpResponseMessage Post([FromBody]string value)
        {
            string username = UtilFunction.GetCookie("uname");
            var list = Newtonsoft.Json.Linq.JObject.Parse(value.Replace("{admin}", username));
            //Newtonsoft.Json.Linq.JArray jArray = new JArray();
            Dictionary<string, JArray> dict = new Dictionary<string, JArray>();
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/UserApiController/Post([FromBody]string value)方法");
                string serverName = "";
                Newtonsoft.Json.Linq.JArray jArray = new JArray();

                if (list != null && list.Count > 0)
                {
                    foreach (var arry in list)
                    {
                        switch (arry.Key)
                        {
                            case "insert":
                                serverName = "1_1";
                                break;
                            case "update":
                                serverName = "1_4";
                                break;
                            case "updateinfo":
                                serverName = "1_4_1";
                                break;
                            case "delete":
                                serverName = "1_8";
                                break;
                            case "insertroleindicator":
                                serverName = "1_11";
                                try
                                {
                                    JObject model = JObject.FromObject(JsonConvert.DeserializeObject(arry.Value[0].ToString()));
                                    string wsql = string.Empty;
                                    int userid = Convert.ToInt32(model["userid"].ToString());
                                    string indicatorcontent = model["indicatorcontent"].ToString();
                                    wsql = GetSetStringIndicator(indicatorcontent);
                                 //   PostCreateUserTemplate(userid, wsql);
                                }
                                catch (Exception ex)
                                {
                                    FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/UserApiController/Post([FromBody]string value)方法-用户生成模板错误," + ex.ToString());

                                }
                                break;
                            case "insertroomindicator":
                                serverName = "1_1122";
                                break;
                            case "deleteroomindicator":
                                serverName = "1_1133";
                                break;
                            case "maxid":
                                serverName = "1_12";
                                break;
                            case "insertindicators":
                                serverName = "1_17";
                                break;
                            case "deleteindicators":
                                serverName = "1_18";
                                break;
                                try
                                {
                                    JObject model = JObject.FromObject(JsonConvert.DeserializeObject(arry.Value[0].ToString()));
                                    string wsql = string.Empty;
                                    int userid = Convert.ToInt32(model["userid"].ToString());
                                    string indicatorcontent = model["indicatorcontent"].ToString();
                                    wsql = GetSetStringIndicator(indicatorcontent);
                                 //   PostCreateUserTemplate(userid, wsql);
                                }
                                catch (Exception ex)
                                {
                                    FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/UserApiController/Post([FromBody]string value)方法-用户生成模板错误," + ex.ToString());

                                }
                                break;
                            case "updatepwd":
                                serverName = "1_16";
                                break;
                            default:
                                break;
                        }

                        jArray = arry.Value as JArray;
                    }
                }

                if (serverName.Equals("1_12"))
                {
                    return GetJSONMessage(QueryService.GetData(list, serverName));
                }
                else
                {
                    return GetJSONMessage(QueryService.InsertBatchCheck(jArray, serverName));
                }

            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/UserApiController/Post([FromBody]string value)方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // GET api/userapi/GetTBTreeView   配置用户指标
        /// <summary>
        /// 配置用户指标
        /// </summary>
        /// <param name="userid">用户编号</param>
        /// <returns></returns>
        public HttpResponseMessage GetTBTreeView(int userid)
        {
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/UserApiController/GetTBTreeView()方法");
                string[] IndicatoryList = { "" };
                if (userid > 0)
                {

                    string indicatorlist = IndicatorListdata(userid);
                    if (indicatorlist.Trim().Length > 2)
                    {
                        JObject model = JObject.FromObject(JsonConvert.DeserializeObject("{indicator:" + indicatorlist + "}"));
                        IndicatoryList = model["indicator"][0]["indicator_content"].ToString().ToUpper().Split(',');
                    }
                    else
                    {
                        IndicatoryList = null;
                    }

                }
                else
                {
                    IndicatoryList = null;
                }
                BaseService bs = new BaseService();
                UtilFunction uf = new UtilFunction();
                DataTable TableB = bs.GetDataTableToID("TreeViewBusiness");
                List<Tree_t> list = new List<Tree_t>();

                foreach (DataRow row in TableB.Rows)
                {
                    Tree_t treeview = new Tree_t();
                    treeview.text = (string)row["title"];
                    treeview.id = (string)row["id"];
                    treeview.pid = "0";
                    state st = new state();
                    if (IndicatoryList != null && IndicatoryList.Contains((string)row["id"]))
                    {
                        st.@checked = "true";
                    }
                    //   st.selected = "true";
                    treeview.state = st;
                    //查询业务下所有维度信息start
                    string sql = "{\"BuesinessIDGetDimension\":[{\"[@c0]\": \"" + row["id"].ToString() + "\"}]}";
                    var listsql = Newtonsoft.Json.Linq.JObject.Parse(sql);
                    Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
                    foreach (var arry in listsql)
                    {
                        jarrays.Add(arry.Key, arry.Value as JArray);
                    }
                    DataTable DimTable = bs.GetDataTableToParamID(jarrays);
                    List<Tree_t> listdim = new List<Tree_t>();
                    foreach (DataRow rowd in DimTable.Rows)
                    {
                        Tree_t treeview_d = new Tree_t();
                        treeview_d.text = (string)rowd["title"];
                        treeview_d.id = (string)rowd["id"];
                        treeview_d.pid = "1";

                        state std = new state();
                        if (IndicatoryList != null && IndicatoryList.Contains((string)rowd["id"]))
                        {
                            std.@checked = "true";
                        }
                        //   st.selected = "true";
                        treeview_d.state = std;

                        //查询维度下所有指标信息start
                        string sqli = "{\"DimIdGetIndicator\":[{\"[@c0]\": \"" + rowd["id"].ToString() + "\"}]}";
                        var listsqli = Newtonsoft.Json.Linq.JObject.Parse(sqli);
                        Dictionary<string, JArray> jarraysi = new Dictionary<string, JArray>();
                        foreach (var arryi in listsqli)
                        {
                            jarraysi.Add(arryi.Key, arryi.Value as JArray);
                        }
                        DataTable InTable = bs.GetDataTableToParamID(jarraysi);
                        List<Tree_t> listIn = new List<Tree_t>();
                        foreach (DataRow rowi in InTable.Rows)
                        {
                            Tree_t treeview_i = new Tree_t();
                            treeview_i.text = (string)rowi["title"];
                            treeview_i.id = (string)rowi["id"];
                            treeview_i.pid = "2";
                            state sti = new state();
                            if (IndicatoryList != null && IndicatoryList.Contains((string)rowi["id"]))
                            {
                                sti.@checked = "true";
                            }
                            //   st.selected = "true";
                            treeview_i.state = sti;

                            listIn.Add(treeview_i);
                        }
                        //指标end

                        treeview_d.nodes = listIn;
                        listdim.Add(treeview_d);
                    }
                    //维度end
                    treeview.nodes = listdim;
                    list.Add(treeview);
                }

                //开始解析treeview
                string myjson = uf.ToJson(list);
                return GetJSONMessage(myjson);
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/UserApiController/GetTBTreeView()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }
        // GET api/userapi/GetUserIndicatorView   查询用户指标
        /// <summary>
        /// 按照用户ID获取指标信息
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public HttpResponseMessage GetUserIndicatorView(int userid)
        {

            FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/UserApiController/GetUserIndicatorView()方法");
            try
            {
                string indicatorlist = IndicatorListdata(userid);
                StringBuilder wsql = new StringBuilder();
                if (indicatorlist.Trim().Length > 2)
                {
                    string[] IndicatoryList = { "" };
                    JObject model = JObject.FromObject(JsonConvert.DeserializeObject("{indicator:" + indicatorlist + "}"));
                    IndicatoryList = model["indicator"][0]["indicator_content"].ToString().ToUpper().Split(',');
                    //添加用户指标查询条件
                    for (int i = 0; i < IndicatoryList.Length; i++)
                    {
                        if (i == IndicatoryList.Length - 1)
                        {
                            wsql.Append("'" + IndicatoryList[i] + "'");
                        }
                        else
                        {
                            wsql.Append("'" + IndicatoryList[i] + "',");
                        }
                    }
                    string Inidjson = "{\"Indicatorids\": \"" + wsql.ToString() + "\"}";
                    var Indicatorids = Newtonsoft.Json.Linq.JObject.Parse(Inidjson);
                    return GetJSONMessage(QueryService.GetData(Indicatorids, "1_15"));

                }
                else
                {
                    return GetJSONMessage("");
                }

            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/UserApiController/GetUserIndicatorView()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }
        /// <summary>
        /// 查询用户指标
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public string IndicatorListdata(int userid)
        {
            string indicatorlist;
            try
            {
                string valuejson = "{\"userid\": \"" + userid + "\"}";
                var i_list = Newtonsoft.Json.Linq.JObject.Parse(valuejson);
                indicatorlist = QueryService.GetData(i_list, "1_14");
            }
            catch (Exception ex)
            {
                indicatorlist = "[]";

            }
            return indicatorlist;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        // POST api/userapi/postuppwd
        public HttpResponseMessage PostUpPwd([FromBody]string value)
        {
            string userid = UtilFunction.GetCookie("uid");
            string username = UtilFunction.GetCookie("uname");
            var list = Newtonsoft.Json.Linq.JObject.Parse(value.Replace("{$userid}", userid).Replace("{admin}", username));

            Dictionary<string, JArray> dict = new Dictionary<string, JArray>();
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/UserApiController/PostUpPwd([FromBody]string value)方法");
                string serverName = "";
                Newtonsoft.Json.Linq.JArray jArray = new JArray();

                if (list != null && list.Count > 0)
                {
                    foreach (var arry in list)
                    {
                        switch (arry.Key)
                        {
                            case "updatepwd":
                                serverName = "1_16";
                                break;
                            default:
                                break;
                        }

                        jArray = arry.Value as JArray;
                    }
                }

                return GetJSONMessage(QueryService.UpdatePassWord(jArray, serverName));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/UserApiController/PostUpPwd([FromBody]string value)方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        /// <summary>  
        /// 创建文件夹  
        /// </summary>  
        /// <param name="Path"></param>  
        public void FolderCreate(string Path)
        {
            // 判断目标目录是否存在如果不存在则新建 
            if (!Directory.Exists(Path))
                Directory.CreateDirectory(Path);
        }

        /// <summary>
        /// 返回sql能够执行的字符串
        /// </summary>
        /// <param name="indicatorcontent"></param>
        /// <returns></returns>
        public string GetSetStringIndicator(string indicatorcontent)
        {

            try
            {
                if (indicatorcontent.Length > 3)
                {
                    StringBuilder wsql = new StringBuilder();
                    string[] IndicatoryList = { "" };
                    IndicatoryList = indicatorcontent.ToUpper().Split(',');
                    //添加用户指标查询条件
                    for (int i = 0; i < IndicatoryList.Length; i++)
                    {
                        if (i == IndicatoryList.Length - 1)
                        {
                            wsql.Append("'" + IndicatoryList[i] + "'");
                        }
                        else
                        {
                            wsql.Append("'" + IndicatoryList[i] + "',");
                        }
                    }
                    return wsql.ToString();
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/UserApiController/GetSetStringIndicator()方法," + ex.ToString());
                return "";

            }

        }

        //// GET api/userapi
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/userapi/5
        public string Get(int id)
        {
            return "value";
        }

        //// POST api/userapi
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/userapi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/userapi/5
        public void Delete(int id)
        {
        }
    }
    /*************************************************************************
    * 文件名称 ：UserApiController.cs                          
    * 描述说明 ：用户管理API控制器
    * 创建信息 : create by QQ：815657032、709047174 Email:Angel_asp@126.com on 2018-05-09
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
}
