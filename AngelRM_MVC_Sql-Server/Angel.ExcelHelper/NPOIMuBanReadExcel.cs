using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
using System.IO;
using System.Data;
using Angel.Utils;


namespace Angel.ExcelHelper
{
   public  class NPOIMuBanReadExcel : IDisposable
    {
       private static object privateObjectLock = new object();
       private static string path = AppDomain.CurrentDomain.BaseDirectory + "ExcelDoload";
       private bool disposed;
       private FileStream file = null;
       private string TempletFileName =null;
       private string ReportFileName = null;
       private XSSFWorkbook hssfworkbook = null;
        public NPOIMuBanReadExcel()
       {
           disposed = false;
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    if (file != null)
                        file.Close();
                }

                file = null;
                disposed = true;
            }
        }
       public void FindFile(string dir,string filename)   //参数为指定的目录  
       {       //C#读取文件夹在指定目录及子目录下查找文件,在listBox1中列出子目录及文件  
           DirectoryInfo Dir=new DirectoryInfo(dir);  
           try {        
               string nowdatetime=DateTime.Now.Date.ToString("yyyy_MM_dd");
               foreach(FileInfo f in Dir.GetFiles("*.xlsx")) //查找文件  
               {
                   if (nowdatetime != f.LastWriteTime.ToString("yyyy_MM_dd"))
                   {
                       f.Delete();
                   }else if(filename==f.Name.ToString())
                   {
                       f.Delete();
                   }
               }  
           } catch(Exception   ex)  
           {
               FileLog.WriteLog("Angel.ExcelHelper.FindFile" + ex.ToString());

           }   
       } 
        public void ExcelImportInit(string uid, string GetNetworkAdpaterID)
        {
            FindFile(path + "\\excelimport", uid + "_" + GetNetworkAdpaterID + "_out.xlsx");
            TempletFileName = path + "\\template.xlsx";
            ReportFileName = path + "\\excelimport\\" + uid + "_" + GetNetworkAdpaterID + "_out.xlsx";
            file = new FileStream(TempletFileName, FileMode.Open, FileAccess.Read);
            hssfworkbook = new XSSFWorkbook(file);
        }
        public void ExcelImportEnd()
        {
            using (FileStream filess = File.OpenWrite(ReportFileName))
            {
                hssfworkbook.Write(filess);
            }
            //filess.Close();
            System.IO.FileInfo filet = new System.IO.FileInfo(ReportFileName);
            System.Web.HttpContext.Current.Response.Clear();
            System.Web.HttpContext.Current.Response.Charset = "GB2312";
            System.Web.HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
            // 添加头信息，为"文件下载/另存为"对话框指定默认文件名 
            System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=" + System.Web.HttpContext.Current.Server.UrlEncode("55.xls"));
            // 添加头信息，指定文件大小，让浏览器能够显示下载进度 
            System.Web.HttpContext.Current.Response.AddHeader("Content-Length", filet.Length.ToString());

            // 指定返回的是一个不能被客户端读取的流，必须被下载 
            System.Web.HttpContext.Current.Response.ContentType = "application/ms-excel";

            // 把文件流发送到客户端 
            System.Web.HttpContext.Current.Response.WriteFile(filet.FullName);
            // 停止页面的执行 

            System.Web.HttpContext.Current.Response.End();
        }
        public void ExcelImportStart(DataTable datable,string sheetname, int rowint)
        {
           XSSFSheet ws=(XSSFSheet)hssfworkbook.GetSheet(sheetname);
            //添加或修改WorkSheet里的数据
            System.Data.DataTable dt = datable;
            #region
            if (dt.Rows.Count > 0)
            {
                var rowIndex = rowint;
                foreach (DataRow row in dt.Rows)
                {

                    XSSFRow dataRow = ws.CreateRow(rowIndex) as XSSFRow;
                    foreach (DataColumn column in dt.Columns)
                    {
                        XSSFCell newCell = dataRow.CreateCell(column.Ordinal) as XSSFCell;
                        string drValue = row[column].ToString();
                        newCell.SetCellValue(drValue);
                    }
                    rowIndex++;
                }
            }
            #endregion
            ws.ForceFormulaRecalculation = true;
        }
    }
}
