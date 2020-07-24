using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Angel.Utils;

namespace Angel.Web.Controllers
{
    public class InPutController : Controller
    {
        
        /// <summary>
        /// 数据模板下载
        /// </summary>
        /// <param name="UserName"></param>
        /// <param name="FileName"></param>
        public ActionResult DownFile(string username, string filename)
        {
            string path = HttpContext.Server.MapPath("~/UploadFiles/template/" + username + "/" + filename);
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

        /// <summary>
        /// 存档文件下载
        /// </summary>
        /// <param name="filename">原始文件名</param>
        /// <param name="sysfilename">存档文件名</param>
        public ActionResult DownBackupFile(string filename, string sysfilename, string type)
        {
            string path = "";
            path = HttpContext.Server.MapPath("~/UploadFiles/" + sysfilename);

            if (System.IO.File.Exists(path))
            {
                FileStream fs = new FileStream(@path, FileMode.Open);
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

        /// <summary>
        /// FillStatus日志文件下载
        /// </summary>
        /// <param name="batch">批次号</param>
        /// <param name="filename">原始文件名</param>
        public ActionResult DownFillStatusLog(string batch, string filename)
        {
            string userid = UtilFunction.GetCookie("uid");       // 当前登录用户ID
            string sysname = userid + "_" + batch + "_" + filename;
            string path = HttpContext.Server.MapPath("~/BackupFiles/FillStatus/" + sysname);
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
                System.IO.File.Delete(path);
                return View();
            }
            else
            {
                ContentResult cr = new ContentResult();
                cr.Content = string.Format("<script type='text/javascript'>alert('找不到文件《" + filename + "》,请联系管理员！');{0}</script>", "history.go(-1);");
                return cr;
            }
        }

        /// <summary>
        /// FillStatus日志文件下载
        /// </summary>
        /// <param name="filename">原始文件名</param>
        /// <param name="backupname">存档文件名</param>
        public ActionResult DownFillStatus(string filename, string backupname)
        {
            string path = HttpContext.Server.MapPath("~/BackupFiles/FillStatus/" + backupname);
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
    }
}
