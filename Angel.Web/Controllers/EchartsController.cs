using System;
using System.Web;
using System.Web.Mvc;
using Angel.Service;

namespace Angel.Web.Controllers
{
    public class EchartsController : Controller
    {
        // Echarts报表呈现
        // GET: /Echarts/Index
        public ActionResult Index()
        {
            ViewBag.Title = "统计报表";
            return View();
        }
    }
}
