using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading;
using System.Data;
using System.IO;
using System.Configuration;
using Angel.DataAccess;
using Angel.Utils;
using Angel.ExcelHelper;


namespace Angel.Service
{
    /*************************************************************************
     * 文件名称 ：SaveMoreExcel.cs                          
     * 描述说明 ：Excel文件导出
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    [Serializable]
    public class SaveMoreExcel
    {
        public static int State = 0;//0-没有开始,1-正在运行,2-成功结束,3-失败结束
        public static int Percent = 0;//执行成功后影响的行数
        public static DateTime StartTime;
        public static DateTime FinishTime;
        public static DateTime ErrorTime;
        public string reportname;
        public string reportid;

        public SaveMoreExcel()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }
        public void RunMoreSave(object ob)
        {
            lock (this)
            {
                if (State != 1)
                {
                    State = 1;
                    StartTime = DateTime.Now;
                    System.Threading.ParameterizedThreadStart ts = new System.Threading.ParameterizedThreadStart(MoreExport);
                    Thread thread = new Thread(ts);
                    thread.Start(ob);
                }
            }
        }
        
        /// <summary>
        /// 导出方法
        /// </summary>
        /// <param name="bo"></param>
        private void MoreExport(object bo)
        {
            ExcelHelper.ExcelHelper ExcelExport = new ExcelHelper.ExcelHelper();
            DataSet ds = new DataSet();

            Percent = 0;
            try
            {
                SaveParameter1 sp = (SaveParameter1)bo;
                if (sp.PARAM != null)
                {  
                    
                    BaseService bs = new BaseService();

                    foreach(Dictionary<string, Newtonsoft.Json.Linq.JArray> a in sp.PARAM) 
                    {
                        DataTable dt1 = bs.GetDataTableToParamID(a);
                        ds.Tables.Add(dt1);
                    }
                    ExcelExport.ExprotExcel("", sp.TempName, ds, sp.UserName);
                    State = 2;
                }
            }
            catch (Exception e)
            {
                FileLog.WriteLog("Error：调用CMDI.Service.SaveExcel/Export()方法。" + e.Message);
                ErrorTime = DateTime.Now;
                Percent = 0;
            }
            finally
            {
                FinishTime = DateTime.Now;
            }
        }
        
     



        /// <summary>
        /// 默认读取Excel首个sheet并转换成Table
        /// </summary>
        /// <param name="FielName"></param>
        /// <returns></returns>
        public DataTable GetDataTableToExcelByDefault(string fileName)
        {
            return GetDataTableToExcel(fileName, null, 0, null);
        }

        /// <summary>
        /// 按SheetIndex读取Excel并转换成Table
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="sheetIndex"></param>
        /// <returns></returns>
        public DataTable GetDataTableToExcelByIndex(string fileName, int sheetIndex)
        {
            return GetDataTableToExcel(fileName, null, sheetIndex, null);
        }

        /// <summary>
        /// 按SheetName读取Excel并转换成Table
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="sheetName"></param>
        /// <returns></returns>
        public DataTable GetDataTableToExcelByName(string fileName, string sheetName, Stream StremContent)
        {
            return GetDataTableToExcel(fileName, sheetName, 0, StremContent);
        }

        private DataTable GetDataTableToExcel(string fileName, string sheetName, int sheetIndex, Stream StremContent)
        {
            DataTable tables = null;
            if(StremContent == null)
                StremContent = new FileInfo(fileName).OpenRead();
            //Stream StremContent = new FileInfo(fileName).OpenRead();
            NIPOIReadExcel niponstrem = new NIPOIReadExcel(fileName);
            if (fileName.IndexOf(".xlsx") > 0)  //2007 Excel
            {
                tables = niponstrem.GetExcelToTable07(StremContent, sheetName, sheetIndex);
            }
            else if (fileName.IndexOf(".xls") > 0)  //2003 Excel
            {
                tables = niponstrem.GetExcelToTable03(StremContent, sheetName, sheetIndex);
            }
            return tables;
        }
    }
    /*************************************************************************
     * 文件名称 ：SaveMoreExcel.cs                          
     * 描述说明 ：Excel文件导出
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
