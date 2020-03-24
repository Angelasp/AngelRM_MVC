using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;
using Angel.DataAccess;
using Angel.Utils;
using System.Collections;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Angel.Web.ControllersApi
{
    /*************************************************************************
    * 文件名称 ：DataApiController.cs                          
    * 描述说明 ：数据请求API控制器
    * 创建信息 : create by QQ：815657032、709047174  E-mail: Angel_asp@126.com on 2018-02-10
    * 修订信息 : modify by (person) on (date) for (reason)
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************/
    public class DataApiController : BaseApiController
    {

        //获取语句返回json数据
        // GET /api/dataapi/get
        public HttpResponseMessage Get()
        {

            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            DataCache.SetCache("ssssss", "ttttttttttttt");
            //  DataTable tablelist = bs.GetDataTableToID("CityData");
            string value = "{ \"CityData1\": [{\"[@c0]\": \"PRONAME\", \"[@c1]\": \"CITYNAME\", \"[@c2]\": \"CITY_NO\",\"[@c3]\": \"where 1=1\" }]}";
            var list = Newtonsoft.Json.Linq.JObject.Parse(value);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();

            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }

            DataTable tablelist = bs.GetDataTableToParamID(jarrays);

            //DataTable tablelists=bs.
            string myjson = uf.ToJson(tablelist);
            return GetJSONMessage(myjson);
        }




        // GET /api/dataapi/get/1
        public HttpResponseMessage Get(int id)
        {

            string myjson = string.Empty;


            switch (id)
            {
                case 1:
                    myjson = QueryService.GetData(null, "1_13");
                    break;
                case 2:
                    myjson = "{name:'2号'}";
                    break;
                case 3:
                    myjson = "{name:'3号'}";
                    break;
                case 4:
                    myjson = QueryService.GetData(null, "1_1331");
                    break;
                default:
                    myjson = "{name:'0号'}";
                    break;
            }
            return GetJSONMessage(myjson);
        }

        // POST api/dataapi
        public HttpResponseMessage Post([FromBody]string value)
        {
            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            var list = Newtonsoft.Json.Linq.JObject.Parse(value);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }

            DataTable tablelist = bs.GetDataTableToParamID(jarrays);

            //DataTable tablelists=bs.
            string myjson = uf.ToJson(tablelist);
            return GetJSONMessage(myjson);

        }

        //// PUT api/dataapi/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/dataapi/5
        public void Delete(int id)
        {
        }
    }
}
