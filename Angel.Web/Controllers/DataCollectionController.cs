using System;
using System.Web;
using System.Web.Mvc;
using Angel.Utils;
using Angel.Service;

namespace Angel.Web.Controllers
{
    public class DataCollectionController : Controller
    {
        // 文件上传管理
        // GET: /DataCollection/DataImport
        public ActionResult DataImport()
        {
            ViewBag.Title = "文件上传管理";
            return View();
        }


        // 文件列表管理
        // GET: /DataCollection/FileBak
        public ActionResult FileBak()
        {
            ViewBag.Title = "文件列表管理";
            return View();
        }
        // 分析管理
        // GET: /DataCollection/ComplaintAnalysis
        public ActionResult ComplaintAnalysis()
        {
            ViewBag.Title = "分析管理";
            return View();
        }



    }
}
