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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web;

namespace Angel.Web.ControllersApi
{
    /*************************************************************************
    * 文件名称 ：LoginApiController.cs                          
    * 描述说明 ：用户登录API控制器
    * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2018-02-10
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class LoginApiController : BaseApiController
    {

        // post api/loginapi/postLogin
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="value">实体信息</param>
        /// <returns></returns>
        public HttpResponseMessage postLogin([FromBody]UserInfos value)
        {
            IEnumerable<KeyValuePair<string, string>> list = ControllerContext.Request.GetQueryNameValuePairs();
            JObject obj = new JObject();
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerAPI/LoginApiController/Get()方法");
                string mycode = value.mycode;
                string username = value.username;
                obj.Add("username", value.username);
                obj.Add("password", value.password);
                obj.Add("mycode", value.mycode);
                obj.Add("url", value.url);

                // 1. 验证码检查
                string a = HttpContext.Current.Session["checkcode"].ToString();
                if (HttpContext.Current.Session["checkcode"] == null)
                {
                    return GetJSONMessage("{\"code\":{\"id\":2,\"msg\":\"验证码错误\"}}");
                }

                if (mycode == "" || mycode == null)
                {
                    return GetJSONMessage("{\"code\":{\"id\":2,\"msg\":\"输入验证码错误\"}}");
                }
                string b = mycode.ToUpper();
                if (String.Compare(a, b, true) != 0) { return GetJSONMessage("{\"code\":{\"id\":2,\"msg\":\"验证码错误\"}}"); }

                string msg = QueryService.GetDataBefor(obj, "1_6");
                if (msg.IndexOf("成功") != -1)
                {
                    JObject model = JObject.FromObject(JsonConvert.DeserializeObject(msg));
                    JToken UserId = model["user"][0]["id"];
                    JToken UserName = model["user"][0]["username"];
                    JToken CityId = model["user"][0]["cityid"];
                    JToken RoleId = model["role"][0]["roleid"];
                    JToken RoleName = model["role"][0]["rolename"];
                    JToken Level = model["role"][0]["level"];
                    int Rid = Convert.ToInt32(RoleId.ToString());
                    int Uid = int.Parse(UserId.ToString());
                    string UName = UserName.ToString();
                    UtilFunction.WriteCookie("uid", Uid.ToString(), 14400); // 用户ID
                    UtilFunction.WriteCookie("roleid", Rid.ToString(), 14400);  //角色ID
                    UtilFunction.WriteCookie("rolename", HttpUtility.UrlEncode(RoleName.ToString()), 14400);    //角色名字
                    UtilFunction.WriteCookie("uname", UName, 14400);    //用户名字
                    UtilFunction.WriteCookie("cityid", HttpUtility.UrlEncode(CityId.ToString()), 14400);    //城市id
                    UtilFunction.WriteCookie("level", Level.ToString(), 14400);  //级别ID
                    LoginLogService loginbll = new LoginLogService();
                    string clientip = UtilFunction.GetIPAddress();
                    loginbll.SaveLog(Uid, UName, Rid, RoleName.ToString(), clientip, UName);
                }

                return GetJSONMessage(msg);
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerAPI/LoginApiController/Get()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // POST api/userapi/post
        public HttpResponseMessage Post([FromBody]string value)
        {
            var list = Newtonsoft.Json.Linq.JObject.Parse(value);
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
                            case "delete":
                                serverName = "1_8";
                                break;
                            default:
                                break;
                        }

                        jArray = arry.Value as JArray;
                    }
                }
                return GetJSONMessage(QueryService.InsertBatchCheck(jArray, serverName));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/UserApiController/Post([FromBody]string value)方法," + er.ToString());
                return GetJSONMessage("");
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

        // GET api/loginapi/getlogincode
        /// <summary>
        /// 获取登录验证码
        /// </summary>
        /// <param name="granularity"></param>
        /// <returns></returns>
        public string getLoginCode()
        {
            // 3. 验证码检查
            string a = HttpContext.Current.Session["checkcode"].ToString();
            return (a == null || a == "") ? "" : a;
        }


    }
}
