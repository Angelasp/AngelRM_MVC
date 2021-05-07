using System;
using System.Web;
using System.Web.Mvc;
using Angel.Service;

namespace Angel.Web.Controllers
{
    public class ProvinceReportController : Controller
    {
        // 报表采集
        // GET: /ProvinceReport/reportCollect
        public ActionResult reportCollect()
        {
            ViewBag.Title = "报表采集";
            return View();
        }

        // 编辑器测试
        // GET: /ProvinceReport/jdCollect
        public ActionResult jdCollect()
        {
            ViewBag.Title = "编辑器测试";
            return View();
        }

        // 组织结构
        // GET: /ProvinceReport/organization
        public ActionResult organization()
        {
            ViewBag.Title = "组织结构";
            return View();
        }
    }
}
