using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using Angel.Service;
using Angel.Utils;


namespace Angel.Web.Controllers
{
    /*************************************************************************
     * 文件名称 ：DownController.cs                          
     * 描述说明 ：下载控制器类
     * 
     * 创建信息 : create by QQ：815657032、Angel_asp@126.com on 2018-02-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************/
    public class DownController : Controller
    {
        //下载文件
        // GET: /Down/Index

        public ActionResult Index(string filename)
        {
            //string UserName = "admin";
            string UserName = UtilFunction.GetCookie("uname");
            string FileName = filename;
            DownFile(UserName, FileName);
            return View();
        }

        /// <summary>
        /// 下载数据流
        /// </summary>
        /// <param name="UserName"></param>
        /// <param name="FileName"></param>
        public void DownFile(string UserName,string FileName) 
        {
            string path = HttpContext.Server.MapPath("~/DownFile/import/" + UserName + "/");
            System.IO.FileStream fs = new System.IO.FileStream(path + FileName, FileMode.Open);
            byte[] bytes = new byte[(int)fs.Length];
            fs.Read(bytes, 0, bytes.Length);
            fs.Close();
            Response.ContentType = "application/octet-stream";
            //通知浏览器下载文件而不是打开
            Response.AddHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(FileName, System.Text.Encoding.UTF8));
            Response.BinaryWrite(bytes);
            Response.Flush();
            Response.End();

            //Response.ContentType = "application/ms-excel";
            //Response.AppendHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(FileName, System.Text.Encoding.UTF8));
            //Response.TransmitFile(path + FileName);
            //Response.End();

        }


        /// <summary>
        /// 下载高铁历史文件流
        /// </summary>
        /// <param name="UserName"></param>
        /// <param name="FileName"></param>
        public Boolean DownHighWayHistoryFile(string FileName)
        {
            bool flag = false;

            string path = HttpContext.Server.MapPath("~/DownFile/import/HighWayErrorData/");
            try
            {
                System.IO.FileStream fs = new System.IO.FileStream(path + FileName, FileMode.Open);
                byte[] bytes = new byte[(int)fs.Length];
                fs.Read(bytes, 0, bytes.Length);
                fs.Close();
                Response.ContentType = "application/octet-stream";
                String[] fm = FileName.Split('/');
                //通知浏览器下载文件而不是打开
                Response.AddHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(fm[1], System.Text.Encoding.UTF8));
                Response.BinaryWrite(bytes);
                Response.Flush();
                Response.End();

                flag = true;
            }
            catch (Exception e)
            {
                FileLog.WriteLog("InfoApiTime：" + DateTime.Now.ToString() + ",调用：QcSystem.ControllersApi/DownController/DownHighWayHistoryFile()方法" + e.ToString());
            }
            
            return flag;
        }

    }
}
