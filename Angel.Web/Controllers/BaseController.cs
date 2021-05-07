using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ninject;
using Angel.BLL;
using System.Collections.Specialized;

namespace Angel.Web.Controllers
{
    /*************************************************************************
     * 文件名称 ：BaseController.cs                          
     * 描述说明 ：权限控制器类
     * 
     * 创建信息 : create by QQ：815657032、Angel_asp@126.com on 2018-02-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************/
    public class BaseController : Controller
    {
        /// <summary>
        /// 执行控制器前执行该方法，判断cookie是否为空
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            try
            {
                string userid = filterContext.HttpContext.Request.Cookies["uid"].Value;
                string username = filterContext.HttpContext.Request.Cookies["uname"].Value;
                //   string roleid = filterContext.HttpContext.Request.Cookies["rid"].Value;
                if (userid == "null" || username == "null")
                {
                    #region##删除cookies
                    foreach (string cookiename in Request.Cookies.AllKeys)
                    {
                        HttpCookie cookies = Request.Cookies[cookiename];
                        if (cookies != null)
                        {
                            cookies.Expires = DateTime.Today.AddDays(-1);
                            Response.Cookies.Add(cookies);
                            Request.Cookies.Remove(cookiename);
                        }
                    }
                    #endregion
                    filterContext.HttpContext.Response.Write("<script>parent.window.location='/';</script>");
                    filterContext.HttpContext.Response.End();
                }

            }
            catch (Exception e)
            {
                filterContext.HttpContext.Response.Write("<script>parent.window.location='/';</script>");
                filterContext.HttpContext.Response.End();
            }
        }

    }
}
