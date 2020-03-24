using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QcSystem.Controllers
{
    /*************************************************************************
     * 文件名称 ：UploadFileController.cs                          
     * 描述说明 ：文件上传控制器类
     * 
     * 创建信息 : create by QQ：815657032、Angel_asp@126.com on 2018-02-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************/
    /// <summary>
    /// 文件上传
    /// </summary>
    public class UploadFileController : Controller
    {
        //
        // GET: /UploadFile/Templete

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult Templete()
        {
            return View();
        }


        /// <summary>
        /// </summary>
        ////UploadFile/DataImport
        /// <returns></returns>
        public ActionResult DataImport()
        {
            return View();
        }

        /// <summary>
        /// </summary>
        /// /UploadFile/BackUpFile
        /// <returns></returns>
        public ActionResult BackUpFile()
        {
            return View();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult DataExport()
        {
            return View();
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult CollectRate()
        {
            return View();
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult AuditRules()
        {
            return View();
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult DataReview()
        {
            return View();
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public ActionResult UserRepeat()
        {
            return View();
        }



    }
}
