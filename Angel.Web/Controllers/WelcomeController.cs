using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Angel.Web.Controllers
{

    /*************************************************************************
     * 文件名称 ：WelcomeController.cs                          
     * 描述说明 ：欢迎页面控制器类
     * 
     * 创建信息 : create by QQ：815657032、Angel_asp@126.com on 2018-02-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************/
    public class WelcomeController : Controller
    {
        
        // GET: /Welcome/

        public ActionResult Index()
        {
            ViewBag.Title = "系统欢迎";
            return View("Welcome");
        }

    }
    
}