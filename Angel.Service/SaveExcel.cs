using System;
using System.Threading;
using System.Data;
using System.IO;
using Angel.DataAccess;
using Angel.Utils;
using Angel.ExcelHelper;
using System.Collections.Generic;

namespace Angel.Service
{
    /*************************************************************************
     * 文件名称 ：SaveExcel.cs                          
     * 描述说明 ：Excel文件导出
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    [Serializable]
    public class SaveExcel
    {
        public static int State = 0;//0-没有开始,1-正在运行,2-成功结束,3-失败结束
        public static int Percent = 0;//执行成功后影响的行数
        public static DateTime StartTime;
        public static DateTime FinishTime;
        public static DateTime ErrorTime;
        public string reportname;
        public string reportid;

        public SaveExcel()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }
        public void RunSave(object ob)
        {
            lock (this)
            {
                if (State != 1)
                {
                    State = 1;
                    StartTime = DateTime.Now;
                    System.Threading.ParameterizedThreadStart ts = new System.Threading.ParameterizedThreadStart(Export);
                    Thread thread = new Thread(ts);
                    thread.Start(ob);
                }
            }
        }
        
        /// <summary>
        /// 导出方法
        /// </summary>
        /// <param name="bo"></param>
        private void Export(object bo)
        {
            ExcelHelper.ExcelHelper ExcelExport = new ExcelHelper.ExcelHelper();
            DataSet ds = new DataSet();
            Percent = 0;
            try
            {
                SaveParameter sp = (SaveParameter)bo;
                if (sp.PARAM != null)
                {
                    BaseService bs = new BaseService();
                    DataTable dt1 = bs.GetDataTableToParamID(sp.PARAM);
                    ds.Tables.Add(dt1);
                    ExcelExport.ExprotExcel(dt1.TableName, sp.TempName, ds, sp.UserName);
                    State = 2;
                }
                // 指标甄核规则-导入模板下载
                if (sp.PARAMGP != null)
                {
                    BaseService bs_gp = new BaseService();
                    DataTable dt1 = bs_gp.GetDataTableToParamID(sp.PARAMGP);
                    ds.Tables.Add(dt1);
                    ExcelExport.ExprotExcel(dt1.TableName, sp.TempName, ds, sp.UserName);
                    State = 2;
                }
                // 导出采集报表 Author:彭皓 2017-4-14
                if (sp.Ds != null)
                {
                    foreach (string tempname in sp.TempNames)
                    {
                        ExcelExport.ExportExcel(tempname, sp.Ds, sp.dicAuditRules, sp.UserName);
                        FileLog.WriteLog("测试("+ tempname + ")");
                    }
                    State = 2;
                    FileLog.WriteLog("测试(success)：SaveExcel.State=" + State);
                }
            }
            catch (Exception e)
            {
                FileLog.WriteLog("Error：调用CMDI.Service.SaveExcel/Export()方法。" + e);
                ErrorTime = DateTime.Now;
                Percent = 0;
                State = 3;
                FileLog.WriteLog("测试(catch)：SaveExcel.State=" + State);
            }
            finally
            {
                FinishTime = DateTime.Now;
                FileLog.WriteLog("测试(finally)：SaveExcel.State=" + State);
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
        /// 按SheetNames读取Excel并转换成Set
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="sheetNames"></param>
        /// <param name="StremContent"></param>
        /// <returns></returns>
        public DataSet GetDataSetToExcelByNames(string filename, string[] sheetnames, Stream StremContent)
        {
            DataSet dataset = null;
            if (StremContent == null)
                StremContent = new FileInfo(filename).OpenRead();
            NIPOIReadExcel niponstrem = new NIPOIReadExcel(filename);
            if (filename.IndexOf(".xlsx") > 0)  //2007 Excel
            {
                dataset = niponstrem.GetExcelToSet07(StremContent, sheetnames);
            }
            return dataset;
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

        public DataTable GetDataTableToExcelByHeard(string filename, int sheetindex, int[] rowColumnNum, string headName, Stream StremContent)
        {
            DataTable tables = null;
            if (StremContent == null)
                StremContent = new FileInfo(filename).OpenRead();
            NIPOIReadExcel niponstrem = new NIPOIReadExcel(filename);
            if (filename.IndexOf(".xls") > 0)  //2003 Excel
            {
                tables = niponstrem.GetExcelToTable03(StremContent, sheetindex, rowColumnNum, headName);
            }
            return tables;
        }

        public void UpdateWriteExcelFile(string filename, string sheetname, ref List<Object[]> newData)
        {
            if (!File.Exists(filename)) return;
            FileLog.WriteLog("进入UpdateWriteExcelFile...");
            NIPOIReadExcel niponstrem = new NIPOIReadExcel(filename);
            niponstrem.UpdateWriteExcelFile(sheetname, ref newData);
        }

        public void UpdateWriteExcelFileGP(string filename, string sheetname, ref List<int[]> redError, ref List<int[]> yellowError, ref List<int[]> blueError)
        {
            if (!File.Exists(filename)) return;
            FileLog.WriteLog("进入UpdateWriteExcelFile...");
            NIPOIReadExcel niponstrem = new NIPOIReadExcel(filename);
            niponstrem.UpdateWriteExcelFileGP(sheetname, ref redError, ref yellowError, ref blueError);
        }

        public void UpdateWriteExcelFileLog(string filename, ref List<int[]> list_error)
        {
            if (!File.Exists(filename)) return;
            FileLog.WriteLog("进入UpdateWriteExcelFile...");
            NIPOIReadExcel niponstrem = new NIPOIReadExcel(filename);
            niponstrem.UpdateWriteExcelFileLog(ref list_error);
        }
    }
    /*************************************************************************
     * 文件名称 ：SaveExcel.cs                          
     * 描述说明 ：Excel文件导出
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
