using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Angel.Web.Controllers
{

    public class BbriefingController : Controller//������

    {
        //
        // GET: /Bbriefing/
        public ActionResult Bbriefing(string ProName)

        {

            ViewBag.name = ProName;
            return PartialView();//ֻ�����Լ�����ҳ�棬��Ҫ�κο��



        }

    }

}