using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Routing;

namespace Angel.Core.ParamTransfer
{

    /*************************************************************************
     * 文件名称 ：StartWithConstranint.cs                          
     * 描述说明 ：设置APIrout列表中的限制序列，action名称必须为Get、Post、Delete、Put开头的才能找到
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    /// <summary>
    ///设置APIrout列表中的限制序列，action名称必须为Get、Post、Delete、Put开头的才能找到
    /// route格式为api/controller/GetXXX或api/controller
    /// </summary>
    public class StartWithConstranint : IHttpRouteConstraint
    {
        public string[] methods { get; set; }
        public bool match { get; set; }
        public string _id = "id";
        public StartWithConstranint(string[] methodsarray = null) 
        {
            if (methodsarray == null)
                methodsarray = new string[] { "GET", "PUT", "DELETE", "REMOVE", "POST", "EDIT", "UPDATE", "AUDIT", "DOWNLOAD", "UPLOAD" };
            this.methods = methodsarray;
        }
        public bool Match(HttpRequestMessage request, IHttpRoute route, string parameterName,IDictionary<string,object> values,HttpRouteDirection routeDirection) 
        {
            if (values == null)
                return true;
            if (!values.ContainsKey(parameterName) || !values.ContainsKey(_id))
                return true;
            var action = values[parameterName].ToString().ToLower();
            if(string.IsNullOrEmpty(action))
            {
                values[parameterName] = request.Method.ToString();
            }
            else if(string.IsNullOrEmpty(values[_id].ToString()))
            {
                var isidstr = true;
                methods.ToList().ForEach(item =>
                {
                    if (action.StartsWith(item.ToLower()))
                        isidstr = false;
                });
                if (isidstr) 
                {
                    values[_id] = values[parameterName];
                    values[parameterName] = request.Method.ToString();
                }
            }
            return true;

        }
    }
    /*************************************************************************
     * 文件名称 ：StartWithConstranint.cs                          
     * 描述说明 ：设置APIrout列表中的限制序列，action名称必须为Get、Post、Delete、Put开头的才能找到
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
