using System;
using System.Web;
using System.Web.Mvc;
using Angel.Utils;
using Angel.Service;

namespace Angel.Web.Controllers
{
    public class DataCollectionController : Controller
    {
        // 多维数据报表
        // GET: /DataCollection/CollectReports
        public ActionResult CollectReports()
        {
            return View();
        }

        // GET: /DataCollection/CollecttotalReports
        public ActionResult CollectTotalReports()
        {
            String rolename = HttpUtility.UrlDecode(UtilFunction.GetCookie("rolename"));
            ViewData["rolename"] = rolename;
            return View();
        }

        // 多维数据上报
        // GET: /DataCollection/DataImport
        public ActionResult DataImport()
        {
            return View();
        }

        // 多维数据上报
        // GET: /DataCollection/DataImportNew
        public ActionResult DataImportGP()
        {
            return View();
        }

        // 模板管理
        // GET: /DataCollection/DataTemplate
        public ActionResult DataTemplate()
        {
            return View();
        }

        // 指标更新审核（审核员）
        // GET: /DataCollection/DataReview
        public ActionResult DataReview()
        {
            return View();
        }

        // 指标更新审核GP（审核员）
        // GET: /DataCollection/DataReviewGP
        public ActionResult DataReviewGP()
        {
            return View();
        }

        // 指标更新审核（普通用户）
        // GET: /DataCollection/UserRepeat
        public ActionResult UserRepeat()
        {
            return View();
        }

        // 指标更新审核GP（普通用户）
        // GET: /DataCollection/UserRepeatGP
        public ActionResult UserRepeatGP()
        {
            return View();
        }

        // 甄核规则
        // GET: /DataCollection/AuditRules
        public ActionResult AuditRules()
        {
            return View();
        }

        // 上传文件存档管理(多维数据old)
        // GET: /DataCollection/FileBak
        public ActionResult FileBak()
        {
            return View();
        }


        // 上传文件存档管理(多维数据采集NEW)
        // GET: /DataCollection/FileBak3
        public ActionResult FileBak3()
        {
            return View();
        }

        // 投诉数据采集
        // GET: /DataCollection/ReportComplaint
        public ActionResult ReportComplaint()
        {
            return View();
        }

        // 投诉数据导出
        // GET: /DataCollection/ExportComplaint
        public ActionResult ExportComplaint()
        {
            return View();
        }

        // 投诉数据导出
        // GET: /DataCollection/ComplaintAnalysis
        public ActionResult ComplaintAnalysis()
        {
            return View();
        }

        // 专题数据采集
        // GET: /DataCollection/SpecialDataCollect
        public ActionResult SpecialDataCollect()
        {
            return View();
        }

        // 专题数据导出
        // GET: /DataCollection/SpecialDataExport
        public ActionResult SpecialDataExport()
        {
            return View();
        }



    }
}
