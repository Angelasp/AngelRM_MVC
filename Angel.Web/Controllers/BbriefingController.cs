using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Angel.Web.Controllers
{

    public class BbriefingController : Controller//控制器

    {
        //
        // GET: /Bbriefing/
        public ActionResult Bbriefing(string ProName)

        {

            ViewBag.name = ProName;
            return PartialView();//只加载自己主体页面，不要任何框架



        }

    }

}