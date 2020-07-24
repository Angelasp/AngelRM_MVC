using System;
using System.Web;
using System.Web.Mvc;
using Angel.Service;

namespace Angel.Web.Controllers
{
    public class ProvinceReportController : Controller
    {
        // xx采集
        // GET: /ProvinceReport/reportCollect
        public ActionResult reportCollect()
        {
            return View();
        }

        // xx采集
        // GET: /ProvinceReport/jdCollect
        public ActionResult jdCollect()
        {
            return View();
        }

        // 组织结构
        // GET: /ProvinceReport/organization
        public ActionResult organization()
        {
            return View();
        }
    }
}
