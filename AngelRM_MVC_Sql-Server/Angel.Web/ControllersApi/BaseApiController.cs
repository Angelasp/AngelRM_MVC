using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using Ninject;
using Angel.BLL;
using System.Collections.Specialized;

namespace Angel.Web.ControllersApi
{

    /*************************************************************************
     * 文件名称 ：BaseApiController.cs                          
     * 描述说明 ：API控制器类基类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2018-02-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************/
    public class BaseApiController : ApiController
    {
        [Inject]
        public ISqlService MysqlService { get; set; }

        [Inject]
        public IDataService QueryService { get; set; }


        //public IDataService QueryService = new BLL.BLLService();

        public HttpResponseMessage GetJSONMessage(string msg) 
        {
            return new HttpResponseMessage() { Content = new StringContent(msg, Encoding.UTF8, "application/json") };
        }


        /// <summary>
        /// 遍历Url中的参数列表
        /// </summary>
        /// <returns>如:(?id=getkeyname&cityname=北京)</returns>
        public Dictionary<string, object> GetUrlParam()
        {
            string urlParam = "";
            Dictionary<string, object> list = new Dictionary<string, object>();
            NameValueCollection keyVals = HttpContext.Current.Request.QueryString;
            int i = 1;
            if (keyVals.Count > 0)
            {
                foreach (string key in keyVals.Keys)
                {
                    if (i == 1)
                    {
                        list.Add(key, keyVals[key]);
                    }
                    else
                    {
                        urlParam += key + "='" + keyVals[key] + "' and ";
                    }
                    i++;
                }
                urlParam = urlParam.Substring(0, urlParam.LastIndexOf("and"));
                list.Add("paramname", urlParam);
            }
            return list;
        }

        /// <summary>
        /// 遍历Url中的参数列表
        /// </summary>
        /// <returns>如:(?id=getkeyname&cityname=北京)</returns>
        public Dictionary<string, object> GetUrlParams()
        {
            string urlParam = "";
            Dictionary<string, object> list = new Dictionary<string, object>();
            NameValueCollection keyVals = HttpContext.Current.Request.QueryString;
            int i = 1;
            if (keyVals.Count > 0)
            {
                foreach (string key in keyVals.Keys)
                {
                    list.Add(key, keyVals[key]);
                }
            }
            return list;
        }
    }
}