using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Angel.Web.Controllers
{

    /*************************************************************************
     * �ļ����� ��WelcomeController.cs                          
     * ����˵�� ����ӭҳ���������
     * 
     * ������Ϣ : create by QQ��815657032��Angel_asp@126.com on 2018-02-10
     * �޶���Ϣ : modify by (person) on (date) for (reason)
     * 
     * ��Ȩ��Ϣ : Copyright (c) 2009 Angel������ www.angelasp.com
     **************************************************************************/
    public class WelcomeController : Controller
    {
        
        // GET: /Welcome/

        public ActionResult Index()
        {
            return View("Welcome");
        }

    }
    
}