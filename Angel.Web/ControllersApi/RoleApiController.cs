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
using Angel.Model;
using Angel.DataAccess;
using Newtonsoft.Json.Linq;
using System.Data;

namespace Angel.Web.ControllersApi
{
    /*************************************************************************
    * 文件名称 ：RoleApiController.cs                          
    * 描述说明 ：用户角色API控制器
    * 创建信息 : create by QQ：815657032、Angel_asp@126.com on 2018-05-09
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class RoleApiController : BaseApiController
    {

        // GET api/roleapi/get
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
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/RoleApiController/Get()方法");
                return GetJSONMessage(QueryService.GetData(list, "2_2"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/RoleApiController/Get()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }


        // Get api/roleapi/GetRolemeul
        public HttpResponseMessage GetRolemeul()
        {
            try
            {
                string roleid = UtilFunction.GetCookie("roleid");
                string value = "{ \"RoleID\": " + roleid + "}";
                var list = Newtonsoft.Json.Linq.JObject.Parse(value);
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/RoleApiController/GetRolemeul()方法");
                //缓存当前角色按钮权限
                DataTable btdt = QueryService.GetWhereDataTable("query_rolebtnlist", roleid);
                List<Menu> menulist = new List<Menu>();
                foreach(DataRow row in btdt.Rows){
                    Menu menu = new Menu();
                    menu.id = row["id"].ToString();
                    menu.menuname = row["menuname"].ToString();
                    menu.parentid = row["parentid"].ToString();
                    menu.orderid = row["orderid"].ToString();
                    menu.menutype = row["menutype"].ToString();
                    menu.menuo = row["menuo"].ToString();
                    menulist.Add(menu);
                }
                DataCache.SetCache("roledatabtn",menulist);
                //结束按钮权限操作
                return GetJSONMessage(QueryService.GetData(list, "2_5"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/RoleApiController/GetRolemeul()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // POST api/roleapi/post
        public HttpResponseMessage Post([FromBody]string value)
        {
            string username = UtilFunction.GetCookie("uname");
            var list = Newtonsoft.Json.Linq.JObject.Parse(value.Replace("admin", username));
            //Newtonsoft.Json.Linq.JArray jArray = new JArray();
            Dictionary<string, JArray> dict = new Dictionary<string, JArray>();
            string serverName = "";
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/RoleApiController/Post([FromBody]string value)方法");
                if (list != null && list.Count > 0)
                {

                    foreach (var arry in list)
                    {
                        switch (arry.Key)
                        {
                            case "insert":
                                serverName = "2_1";
                                break;
                            case "update":
                                serverName = "2_3";
                                break;
                            case "delete":
                                serverName = "2_4";
                                break;
                            case "insertRoleMenu":
                                serverName = "2_11";
                                break;
                            case "deleterole":
                                serverName = "2_12";
                                break;
                            case "rolemenulist":
                                serverName = "2_5";
                                break;
                            default:
                                break;
                        }

                        if (serverName.Equals("") == false)
                        {
                            dict.Add(serverName, arry.Value as JArray);
                        }
                    }

                }
                if (serverName.Equals("2_1"))
                {
                    return GetJSONMessage(QueryService.ExecuteScalar(dict));
                }
                else
                {
                    return GetJSONMessage(QueryService.MulteBatch(dict));
                }

            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/RoleApiController/Post([FromBody]string value)方法," + er.ToString());
                return GetJSONMessage("");
            }
        }


        // GET api/roleapi/5
        public string Get(int id)
        {
            return "value";
        }


        // PUT api/roleapi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/roleapi/5
        public void Delete(int id)
        {
        }
    }
}

/*************************************************************************
* 文件名称 ：RoleApiController.cs                          
* 描述说明 ：系统导航菜单API控制器
* 创建信息 : create by QQ：815657032、709047174 Email:Angel_asp@126.com on 2018-05-09
* 修订信息 : modify by (person) on (date) for (reason)
* 
* 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
**************************************************************************/