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

namespace Angel.Web.ControllersApi
{
    /*************************************************************************
    * 文件名称 ：MenuApiController.cs                          
    * 描述说明 ：系统导航菜单API控制器
    * 创建信息 : create by QQ：815657032、709047174 Email:Angel_asp@126.com on 2018-05-09
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class MenuApiController :BaseApiController
    {

        // GET api/menuapi
        public HttpResponseMessage Get()
        {
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/MenuApiController/Get()方法");
                return GetJSONMessage(QueryService.GetData(null, "0_1"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/MenuApiController/Get()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // GET api/menuapi/Getroleid
        public HttpResponseMessage Getroleid(int roleid)
        {
            try
            {
                var list = Newtonsoft.Json.Linq.JObject.Parse("{roleid:"+roleid+"}");
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/MenuApiController/Getroleid()方法");
                return GetJSONMessage(QueryService.GetData(list, "0_8"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/MenuApiController/Getroleid()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // POST api/menuapi/post
        public HttpResponseMessage Post([FromBody]string value)
        {
            string username = UtilFunction.GetCookie("uname");
            var list = Newtonsoft.Json.Linq.JObject.Parse(value.Replace("admin", username));
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



        //// GET api/menuapi
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

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

    }
}
/*************************************************************************
* 文件名称 ：MenuApiController.cs                          
* 描述说明 ：系统导航菜单API控制器
* 创建信息 : create by QQ：815657032、709047174 Email:Angel_asp@126.com on 2018-05-09
* 修订信息 : modify by (person) on (date) for (reason)
* 
* 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
**************************************************************************/
