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
using Angel.DataAccess;
using Angel.Model;
using System.Data;

namespace Angel.Web.ControllersApi
{


    /*************************************************************************
    * 文件名称 ：DepartmentApiController.cs                          
    * 描述说明 ：数据请求API控制器
    * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2018-02-10
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class DepartmentApiController : BaseApiController
    {

        // GET api/departmentapi/get
        public HttpResponseMessage Get()
        {
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/RoomApiController/Get()方法");
                return GetJSONMessage(QueryService.GetData(null, "7_1"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/RoomApiController/Get()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        // GET api/departmentapi/getd
        public HttpResponseMessage GetD()
        {
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/RoomApiController/GetD()方法");
                return GetJSONMessage(QueryService.GetData(null, "7_2"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/RoomApiController/GetD()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }

        /// <summary>
        /// 指标采集-数据导出-部门树
        /// </summary>
        /// <returns></returns>
        // GET /api/DepartmentApi/GetDepartment
        public HttpResponseMessage GetDepartment()
        {
            BaseService bs_gp = new BaseService();
            UtilFunction uf = new UtilFunction();
            // 部门TREE
            List<Tree_t> list = new List<Tree_t>();
            // 查询所有部门
            DataTable datatable = bs_gp.GetDataTableToID("findDepartment_To2GP");
            // 一级部门
            foreach (DataRow row1 in datatable.Select("parent_id=0"))
            {
                Tree_t tree1 = new Tree_t();
                tree1.id = row1["id"].ToString();
                tree1.text = row1["dname"].ToString();
                tree1.nodes = new List<Tree_t>();
                // 二级部门
                foreach (DataRow row2 in datatable.Select("parent_id=" + tree1.id))
                {
                    Tree_t tree2 = new Tree_t();
                    tree2.id = row2["id"].ToString();
                    tree2.text = row2["dname"].ToString();
                    tree2.nodes = new List<Tree_t>();
                    tree1.nodes.Add(tree2);
                }
                list.Add(tree1);
            }
            string myjson = uf.ToJson(list);
            return GetJSONMessage(myjson);
        }


        // Get api/departmentapi/GetRoommeul
        public HttpResponseMessage GetRoommeul()
        {
            try
            {
                string roomid = UtilFunction.GetCookie("roomid"); ;
                //string roomid = "46";
                string value = "{ \"RoomID\": " + roomid + "}";
                var list = Newtonsoft.Json.Linq.JObject.Parse(value);
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/RoomApiController/GetRoommeul()方法");
                return GetJSONMessage(QueryService.GetData(list, "33_5"));
            }
            catch (Exception er)
            {
                FileLog.WriteLog("Error：调用Angel.ControllersApi/ControllerApi/RoomApiController/GetRoommeul()方法," + er.ToString());
                return GetJSONMessage("");
            }
        }





        // POST api/DepartmentApi/post
        public HttpResponseMessage Post([FromBody]string value)
        {
            string username = UtilFunction.GetCookie("uname");
            var list = Newtonsoft.Json.Linq.JObject.Parse(value.Replace("admin", username));
            //Newtonsoft.Json.Linq.JArray jArray = new JArray();
            Dictionary<string, JArray> dict = new Dictionary<string, JArray>();
            string serverName = "";
            try
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：Angel.ControllersApi/ControllerApi/RoomApiController/Post([FromBody]string value)方法");
                if (list != null && list.Count > 0)
                {

                    foreach (var arry in list)
                    {
                        switch (arry.Key)
                        {
                            case "insert":
                                serverName = "7_3";
                                break;
                            case "update":
                                serverName = "7_4";
                                break;
                            case "delete":
                                serverName = "7_5";
                                break;
                            case "insertRoom":
                                serverName = "33_11";
                                break;
                            case "deleteroom":
                                serverName = "33_12";
                                break;
                            case "roommenulist":
                                serverName = "33_5";
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
                if (serverName.Equals("33_1"))
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
                FileLog.WriteLog("Error：调用 Angel.ControllersApi/ControllerApi/RoomApiController/Post([FromBody]string value)方法," + er.ToString());
                return GetJSONMessage("");
            }
        }



        //// GET api/roomapi
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/roomapi/5
        public string Get(int id)
        {
            return "value";
        }

        //// POST api/roomapi
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/roomapi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/roomapi/5
        public void Delete(int id)
        {
        }
    }
}
