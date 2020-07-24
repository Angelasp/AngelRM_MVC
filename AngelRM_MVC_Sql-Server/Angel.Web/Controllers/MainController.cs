using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Angel.Web.Controllers
{

    /*************************************************************************
     * 文件名称 ：MainController.cs                          
     * 描述说明 ：系统主页控制器类
     * 
     * 创建信息 : create by QQ：815657032、Angel_asp@126.com on 2018-02-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************/
    public class MainController :BaseController
    {
        //
        // GET: /Main/

        public ActionResult Index()
        {
            return PartialView();
        }

        //
        // GET: /Main/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Main/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Main/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Main/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Main/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Main/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Main/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
