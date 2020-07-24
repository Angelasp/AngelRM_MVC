using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Angel.Utils;
using System.IO;

namespace Angel.Web.Controllers
{
    /*************************************************************************
     * 文件名称 ：SysManagerController.cs                          
     * 描述说明 ：用户权限控制器类
     * 
     * 创建信息 : create by QQ：815657032、Angel_asp@126.com on 2018-02-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************/
    public class SysManagerController :BaseController
    {

        /// <summary>
        /// 其他数据下载
        /// </summary>
        /// <param name="FileName"></param>
        public ActionResult DownFile(string filename)
        {

            string path = HttpContext.Server.MapPath("~/OtherData/" + filename);
            if (System.IO.File.Exists(path))
            {
                System.IO.FileStream fs = new System.IO.FileStream(@path, FileMode.Open);
                byte[] bytes = new byte[(int)fs.Length];
                fs.Read(bytes, 0, bytes.Length);
                fs.Close();
                Response.ContentType = "application/octet-stream";
                //通知浏览器下载文件而不是打开
                Response.AddHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(filename, System.Text.Encoding.UTF8));
                Response.BinaryWrite(bytes);
                Response.Flush();
                Response.End();
                return View();
            }
            else
            {
                ContentResult cr = new ContentResult();
                cr.Content = string.Format("<script type='text/javascript'>alert('找不到文件《" + filename + "》,请联系管理员！');{0}</script>", "history.go(-1);");
                return cr;
            }
        }
        //数据下载
        //get: /sysmanager/downloaddatamanager
        public ActionResult downloaddatamanager() {

            return View();
        }
        
        //
        // GET: /SysManager/MenuManager

        public ActionResult MenuManager()
        {
            return View();
        }

        // 用户管理
        // GET: /SysManager/UserManager
        public ActionResult UserManager()
        {
            return View();
        }


        // 角色管理
        // GET: /SysManager/RoleManager
        public ActionResult RoleManager()
        {
            return View();
        }

        // 处室管理
        // GET: /SysManager/RoomManager
        public ActionResult RoomManager()
        {
            return View();
        }




        // 部门管理
        // GET: /SysManager/DepartmentManager
        public ActionResult DepartmentManager()
        {
            return View();
        }

        // 登录日志管理
        // GET: /SysManager/LoginLogManager
        public ActionResult LoginLogManager()
        {
            return View();
        }

        //下载列表管理
        //GET:/SysManager/DownloadListManager
        public ActionResult DownloadListManager()
        {
            ViewBag.userid = UtilFunction.GetCookie("uid");

            return View();
        }

        // 操作日志管理
        // GET: /SysManager/OperLogManager
        public ActionResult OperLogManager()
        {
            return View();
        }


        // 版本管理
        // GET: /SysManager/VersionManager
        public ActionResult VersionManager()
        {
            return View();
        }


    }
}
