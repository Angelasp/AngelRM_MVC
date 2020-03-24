using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using NPOI.SS.UserModel;
using System.IO;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.HPSF;
using System.Data;
using NPOI.SS.Util;
using Angel.Utils;
using NPOI.HSSF.Util;
using System.Text.RegularExpressions;

namespace Angel.ExcelHelper
{
    public class ExcelHelper
    {
        private IWorkbook hssfworkbook;
        private List<ExcelModel> list;
        private int cellCount = 0;
        /// <summary>
        /// 初始化参数
        /// </summary>
        public ExcelHelper()
        {
            list = new List<ExcelModel>();
            hssfworkbook = new XSSFWorkbook();
        }
        /// <summary>
        /// 导出方法
        /// </summary>
        /// <param name="sheetName">客户端保存的导出文件名</param>
        /// <param name="Mbmc">模板名称</param>
        /// <param name="dt">数据源</param>
        /// <param name="hs">需要特殊正理的数据列放在Hashtable</param>
        /// <param name="headerIndex">导出设备工作表名称</param>
        public bool ExprotExcel(string sheetName, string Mbmc, DataTable dt, Hashtable hs, string sheetname, string username)
        {
            int sheetIndex = 0;
            bool isexists_sheet = false;//是否存在sheet
            InitializeWorkbook(Mbmc);//预置模板
            for (int index = 0; index < hssfworkbook.NumberOfSheets; index++)
            {
                HSSFSheet curr_sheet = (HSSFSheet)hssfworkbook.GetSheetAt(index);
                if (curr_sheet.SheetName.IndexOf(sheetname) > 0 || curr_sheet.SheetName.Contains(sheetname))
                {
                    sheetIndex = index;
                    //sheetname = curr_sheet.SheetName;
                    isexists_sheet = true;
                    //break;
                }
                else
                {
                    hssfworkbook.SetSheetHidden(index, 1);
                }
            }
            if (isexists_sheet)
            {
                RenderDataTableFromExcel(sheetIndex, "");// 读取模板内容
                SetCellValue(dt, sheetIndex);//填充单元格数据
                SetCellValue1(hs, sheetIndex);
                ISheet sheet = hssfworkbook.GetSheetAt(sheetIndex);
                sheet.SetActive(true);
                WriteToFile(sheetName, username);//生成文件(下载文件)
            }
            return isexists_sheet;
        }
        /// <summary>
        /// 预置模板
        /// </summary>
        /// <param name="DocumentName"></param>
        private void InitializeWorkbook(string DocumentName)
        {
            //读取模板通过编辑，这是建议使用fileaccess读防止文件锁定
            FileStream file = new FileStream(AppDomain.CurrentDomain.BaseDirectory + "template\\" + DocumentName, FileMode.Open, FileAccess.Read);

            //   hssfworkbook = new HSSFWorkbook(file);

            if (DocumentName.IndexOf(".xlsx") > 0)
            {
                // 2007版本
                hssfworkbook = new XSSFWorkbook(file);
            }
            else // 2003版本
            {
                hssfworkbook = new HSSFWorkbook(file);
            }
            //创建一个条目的文档概要信息
            DocumentSummaryInformation dsi = PropertySetFactory.CreateDocumentSummaryInformation();
            dsi.Company = "TES";
            //hssfworkbook.DocumentSummaryInformation = dsi;

            //创建一个条目的概要信息
            SummaryInformation si = PropertySetFactory.CreateSummaryInformation();
            si.Subject = "TES NPOI Example";
            // hssfworkbook.SummaryInformation = si;

        }

        public void ExprotExcel(string sheetname, string mbmc, DataSet ds, string username)
        {
            InitializeWorkbook(mbmc);//预置模板
            bool isexists_sheet = false;// 
            int mycount = ds.Tables[0].Rows.Count;
            foreach (DataTable dt in ds.Tables)
            {
                for (int index = 0; index < hssfworkbook.NumberOfSheets; index++)
                {


                    if (mbmc.IndexOf(".xlsx") > 0)
                    {
                        // 2007版本
                        XSSFSheet curr_sheet = (XSSFSheet)hssfworkbook.GetSheetAt(index);
                        if (curr_sheet.SheetName.IndexOf(dt.TableName) > 0 || curr_sheet.SheetName.Contains(dt.TableName))
                        {
                            isexists_sheet = true;
                            list = new List<ExcelModel>();
                            RenderDataTableFromExcel(index, "");// 读取模板内容
                            SetCellValue(dt, index);//填充单元格数据
                            break;
                        }
                    }
                    else // 2003版本
                    {
                        HSSFSheet curr_sheet = (HSSFSheet)hssfworkbook.GetSheetAt(index);
                        if (curr_sheet.SheetName.IndexOf(dt.TableName) > 0 || curr_sheet.SheetName.Contains(dt.TableName))
                        {
                            isexists_sheet = true;
                            list = new List<ExcelModel>();
                            RenderDataTableFromExcel(index, "");// 读取模板内容
                            SetCellValue(dt, index);//填充单元格数据
                            break;
                        }
                    }

                }
            }
            if (isexists_sheet)
            {
                ISheet sheet = hssfworkbook.GetSheetAt(0);
                sheet.SetActive(true);
                //生成文件(下载文件)
                if (mbmc.IndexOf(".xlsx") > 0)
                {
                    WriteToFile07(mbmc, username);
                }
                else
                {
                    WriteToFile(mbmc, username);
                }
            }
        }

        /// <summary>
        /// 导出采集报表到Excel Author:彭皓 2017-4-14
        /// </summary>
        /// <param name="tempname">模板名称</param>
        /// <param name="ds">数据集合</param>
        /// <param name="dicAuditRules">指标甄核规则</param>
        /// <retu
        public void ExportExcel(string tempname, DataSet ds, Dictionary<string, DataRow> dicAuditRules, string username)
        {
            InitializeWorkbook(tempname);
            int mycount = ds.Tables["CollectReports"].Rows.Count;
            Dictionary<int, List<ExcelModel>> map = RenderDataTableFromExcel2(2);
            SetCellValue(ds.Tables["CollectReports"], map, dicAuditRules);
            ISheet sheet = hssfworkbook.GetSheetAt(0);
            sheet.SetActive(true);
            WriteToFile(tempname, username);//生成文件(下载文件)
        }

        /// <summary>
        /// 读取excel模板，初始化excel数据
        /// </summary>
        /// <param name="HeaderRowIndex"></param>
        /// <returns></returns>
        private List<ExcelModel> RenderDataTableFromExcel(int HeaderRowIndex)
        {
            ISheet sheet = hssfworkbook.GetSheetAt(0);
            IRow headerRow = sheet.GetRow(HeaderRowIndex);
            cellCount = headerRow.LastCellNum;
            //这种取法暂时有问题，未做调整，实际应该取的是包含列最多的行
            int rowCount = sheet.LastRowNum;
            for (int i = sheet.FirstRowNum; i <= sheet.LastRowNum; i++)
            {
                if (i == HeaderRowIndex)
                {
                    continue;
                }
                IRow row = sheet.GetRow(i);
                if (row == null)
                {
                    continue;
                }
                for (int j = row.FirstCellNum; j < cellCount; j++)
                {
                    ExcelModel model = new ExcelModel();
                    if (row.GetCell(j) != null)
                    {
                        string value = row.GetCell(j).StringCellValue.Trim();
                        if (string.IsNullOrEmpty(value)) continue;
                        if (value.StartsWith("#"))
                        {
                            model.ColumnName = value.Substring(value.IndexOf('#') + 1, value.Length - 2);
                            model.ColumnType = row.GetCell(j).CellType;
                            model.ColumnIndex = row.GetCell(j).ColumnIndex;
                            model.ColumnStyle = row.GetCell(j).CellStyle;
                            model.RowIndex = row.RowNum;
                            if (value.EndsWith("$"))//行循环
                            {
                                model.SetValueType = 1;
                            }
                            else if (value.EndsWith("~"))//列循环
                            {
                                model.SetValueType = 2;
                            }
                            else if (value.EndsWith("#"))
                            {
                                model.SetValueType = 0;
                            }
                            list.Add(model);
                        }
                    }

                }
            }
            return list;
        }
        private List<ExcelModel> RenderDataTableFromExcel(int sheetIndex, string a)
        {
            ISheet sheet = hssfworkbook.GetSheetAt(sheetIndex);
            hssfworkbook.SetActiveSheet(sheetIndex);
            sheet.IsSelected = true;

            IRow headerRow = null;

            // modify by luqy
            if (sheetIndex == 7 || sheetIndex == 8)
            {
                headerRow = sheet.GetRow(1);
            }
            else
            {
                headerRow = sheet.GetRow(2);
            }

            cellCount = headerRow.LastCellNum;
            //这种取法暂时有问题，未做调整，实际应该取的是包含列最多的行
            for (int n = 0; n < sheet.LastRowNum; n++)
            {
                headerRow = sheet.GetRow(n);
                if (headerRow != null)
                {
                    if (headerRow.LastCellNum > cellCount)
                    {
                        cellCount = headerRow.LastCellNum;
                    }
                }
            }


            int rowCount = sheet.LastRowNum;
            for (int i = sheet.FirstRowNum; i <= sheet.LastRowNum; i++)
            {
                IRow row = sheet.GetRow(i);
                if (row == null)
                {
                    continue;
                }
                for (int j = row.FirstCellNum; j < cellCount; j++)
                {
                    ExcelModel model = new ExcelModel();
                    if (row.GetCell(j) != null)
                    {
                        string value = "";
                        if (row.GetCell(j).CellType == CellType.Numeric)
                        {
                            value = row.GetCell(j).NumericCellValue.ToString().Trim();
                        }
                        else
                        {
                            value = row.GetCell(j).StringCellValue.Trim();
                        }
                        if (string.IsNullOrEmpty(value)) continue;
                        if (value.StartsWith("#"))
                        {
                            model.ColumnName = value.Substring(value.IndexOf('#') + 1, value.Length - 2);
                            model.ColumnType = row.GetCell(j).CellType;
                            model.ColumnIndex = row.GetCell(j).ColumnIndex;
                            model.ColumnStyle = row.GetCell(j).CellStyle;
                            model.RowIndex = row.RowNum;
                            if (value.EndsWith("$"))//行循环
                            {
                                model.SetValueType = 1;
                            }
                            else if (value.EndsWith("~"))//列循环
                            {
                                model.SetValueType = 2;
                            }
                            else if (value.EndsWith("#"))
                            {
                                model.SetValueType = 0;
                            }
                            list.Add(model);
                        }
                    }

                }
            }
            return list;
        }

        /// <summary>
        /// 解析采集报表模板 Author:彭皓 2017-04-14
        /// </summary>
        /// <param name="indexRow">开始行</param>
        public Dictionary<int, List<ExcelModel>> RenderDataTableFromExcel2(int indexRow)
        {
            Dictionary<int, List<ExcelModel>> map = new Dictionary<int, List<ExcelModel>>();
            ISheet sheet = hssfworkbook.GetSheetAt(0);
            hssfworkbook.SetActiveSheet(0);
            sheet.IsSelected = true;

            IRow headerRow = sheet.GetRow(indexRow);
            cellCount = headerRow.LastCellNum;

            int rowCount = sheet.LastRowNum;
            //XSSFFormulaEvaluator eval = new XSSFFormulaEvaluator((XSSFWorkbook) hssfworkbook);
            for (int i = sheet.FirstRowNum; i <= sheet.LastRowNum; i++)
            {
                IRow row = sheet.GetRow(i);
                if (row == null) continue;
                for (int j = row.FirstCellNum; j < cellCount; j++)
                {
                    ExcelModel model = new ExcelModel();
                    if (row.GetCell(j) != null)
                    {
                        string value = "";
                        if (row.GetCell(j).CellType == CellType.Numeric)
                        {
                            value = row.GetCell(j).NumericCellValue.ToString().Trim();
                        }
                        /*else if (row.GetCell(j).CellType == CellType.Formula)
                        {
                            value = row.GetCell(j).CellFormula;
                            value =  eval.EvaluateFormulaCell(row.GetCell(j)).ToString();
                        }*/
                        else
                        {
                            value = row.GetCell(j).StringCellValue.Trim();
                        }
                        if (string.IsNullOrEmpty(value)) continue;
                        if (value.StartsWith("#"))
                        {
                            model.ColumnName = value.Substring(value.IndexOf('#') + 1, value.IndexOf('}') - 3);
                            string index = value.Substring(value.IndexOf('{') + 1, 1);
                            model.DataIndex = int.Parse(index);
                            model.ColumnType = row.GetCell(j).CellType;
                            model.ColumnIndex = row.GetCell(j).ColumnIndex;
                            model.ColumnStyle = row.GetCell(j).CellStyle;
                            model.RowIndex = row.RowNum;
                            //FileLog.WriteLog(model.ColumnName + ":第" + model.DataIndex+"行数据,Row="+ model.RowIndex + ",Column" + model.ColumnIndex);
                            if (value.EndsWith("$"))//行循环
                            {
                                model.SetValueType = 1;
                            }
                            else if (value.EndsWith("~"))//列循环
                            {
                                model.SetValueType = 2;
                            }
                            else if (value.EndsWith("#"))
                            {
                                model.SetValueType = 0;
                            }
                            if (!map.ContainsKey(model.DataIndex))
                            {
                                map.Add(model.DataIndex, new List<ExcelModel>());
                            }
                            map[model.DataIndex].Add(model);
                        }
                    }
                }
            }

            return map;
        }

        /// <summary>
        /// 导出采集报表 Author:杨波 2017-4-14
        /// </summary>
        /// <param name="dt">DataTable</param>
        /// <param name="map">Dictionary<int, List<ExcelModel>></param>
        private void SetCellValue(DataTable dt, Dictionary<int, List<ExcelModel>> map, Dictionary<string, DataRow> dicAuditRules)
        {
            int totalcount = dt.Rows.Count;
            ISheet sheet1 = hssfworkbook.GetSheetAt(0);
            int a = 0;
            int LastRowNum = sheet1.LastRowNum;
            int rowNum = 0;
            int i;
            int count = dt.Rows.Count;
            string value = "";
            decimal? yellowS, yellowE, idata; // 指标甄核规则红色边界
            string unit; // 指标甄核规则单位
            DataRow ad; // 指标甄核规则

            /*ICellStyle redStyle = hssfworkbook.CreateCellStyle();
            redStyle.FillPattern = FillPattern.SolidForeground;
            redStyle.FillForegroundColor = HSSFColor.Coral.Index;*/

            ICellStyle yellowStyle = hssfworkbook.CreateCellStyle();
            // 边框
            yellowStyle.BorderBottom = BorderStyle.Thin;
            yellowStyle.BorderLeft = BorderStyle.Thin;
            yellowStyle.BorderRight = BorderStyle.Thin;
            yellowStyle.BorderTop = BorderStyle.Thin;
            // 背景色
            yellowStyle.FillPattern = FillPattern.SolidForeground;
            yellowStyle.FillForegroundColor = HSSFColor.LightYellow.Index;
            try
            {
                foreach (var obj in map)
                {
                    if (obj.Key <= 1)
                    {
                        foreach (ExcelModel m in obj.Value)
                        {
                            if (m.SetValueType == 0)
                            {
                                if (dt.Columns.Contains(m.ColumnName))
                                {
                                    sheet1.GetRow(m.RowIndex).GetCell(m.ColumnIndex).SetCellValue(dt.Rows[obj.Key][m.ColumnName].ToString());
                                    //设定单元格的格式 日期，货币
                                }
                                else
                                {
                                    sheet1.GetRow(m.RowIndex).GetCell(m.ColumnIndex).SetCellValue("");
                                }
                                sheet1.GetRow(m.RowIndex).GetCell(m.ColumnIndex).CellStyle = m.ColumnStyle;
                                sheet1.GetRow(m.RowIndex).GetCell(m.ColumnIndex).SetCellType(m.ColumnType);
                            }
                        }
                    }
                    else
                    {
                        rowNum = obj.Value.Max(d => d.RowIndex);
                        i = obj.Value.Where(d => d.SetValueType == 1).FirstOrDefault().RowIndex + 1;
                        //sheet1.ShiftRows(i, LastRowNum + 1, count - 1);
                        for (int k = obj.Key; k < totalcount; k++)
                        {
                            if (rowNum != rowNum + a)
                            {
                                sheet1.CreateRow(rowNum + a);
                                for (int j = 0; j <= cellCount; j++)
                                {
                                    sheet1.GetRow(rowNum + a).CreateCell(j);
                                }
                            }
                            foreach (ExcelModel m in obj.Value)
                            {
                                // 如果不是城市和指标值的填充
                                if (m.SetValueType != 1) continue;
                                // 预设单元格样式和类型
                                sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).CellStyle = m.ColumnStyle;
                                sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellType(m.ColumnType);

                                if (!dt.Columns.Contains(m.ColumnName))
                                {
                                    sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellValue("");
                                    continue;
                                }
                                // 获取单元格需填充的内容(城市名或者指标值)
                                value = dt.Rows[k][m.ColumnName].ToString();
                                sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellValue(value);
                                // 如果填充的是城市名，则不进行以下面得判断
                                if (m.ColumnName == "CITY_NO") continue;
                                
                                // 指标值为空，或者指标值为中文时，标红
                                if (string.IsNullOrEmpty(value) || IsHasCHZN(value))//
                                {
                                    sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).CellStyle = yellowStyle;
                                    continue;
                                }
                                // 如果当前指标没有对应的甄核规则，则不进行下面的判断
                                if (!dicAuditRules.ContainsKey(m.ColumnName)) continue;
                                ad = dicAuditRules[m.ColumnName];
                                idata = Convert.ToDecimal(value);
                                unit = ad["Unit"].ToString();
                                // 指标带%，且指标值小于1的，标红
                                if (!string.IsNullOrEmpty(unit) && unit.Contains("%") && idata < 1)
                                {
                                    sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).CellStyle = yellowStyle;
                                    continue;
                                }
                                /*yellowS = Convert.ToDecimal(ad["Yellow_start"].ToString());
                                yellowE = Convert.ToDecimal(ad["Yellow_end"].ToString());
                                if (yellowE == 0 && yellowS == 0) continue;

                                // 指标值超出黄色边界，标黄
                                if (idata < yellowS || idata > yellowE)
                                {
                                    sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).CellStyle = yellowStyle;
                                    continue;
                                }*/
                            }
                            a++;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                FileLog.WriteLog(e.ToString());
            }
        }

        /// <summary>
        ///  填充单元格数据
        /// </summary>
        /// <param name="dt"></param>
        private void SetCellValue(DataTable dt)
        {
            if (dt.Rows.Count == 0)
            {
                return;
            }
            ISheet sheet1 = hssfworkbook.GetSheetAt(0);
            int a = 0;
            int rowNum = list.Max(d => d.RowIndex);
            int count = dt.Rows.Count;
            int LastRowNum = sheet1.LastRowNum;
            //需要把循环以下的行向下移动dt.Rows.Count;
            int i = list.Where(d => d.SetValueType == 1).FirstOrDefault().RowIndex + 1;
            sheet1.ShiftRows(i, LastRowNum + 1, count - 1, true, true);
            foreach (DataRow dr in dt.Rows)
            {
                if (rowNum != rowNum + a)
                {
                    sheet1.CreateRow(rowNum + a);
                    for (int j = 0; j < cellCount; j++)//创建单元格
                    {
                        sheet1.GetRow(rowNum + a).CreateCell(j);

                    }
                }
                foreach (ExcelModel m in list)
                {
                    if (m.SetValueType == 1)
                    {

                        if (dt.Columns.Contains(m.ColumnName))
                        {
                            sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellValue(dr[m.ColumnName].ToString());
                        }
                        else
                        {
                            sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellValue("");
                        }
                        sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).CellStyle = m.ColumnStyle;
                        sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellType(m.ColumnType);
                    }
                }
                a++;
            }

        }
        /// <summary>
        /// 导出遍历每一行 Modify:杨波 2016-03-26
        /// </summary>
        /// <param name="dt">table</param>
        /// <param name="sheetIndex">模板文件编号</param>
        private void SetCellValue(DataTable dt, int sheetIndex)
        {
            int totlecount = dt.Rows.Count;//获得table总行
            int pagecount = 0;
            int pagesize = 64000; //分页数大小 在2003中最多支持行数65500
            ISheet sheet1 = null;

            //获取页面数
            if (totlecount == 0)
            {
                return;
            }
            if (totlecount % pagesize > 0)
            {
                pagecount = (totlecount / pagesize) + 1;
            }
            else
            {
                pagecount = totlecount / pagesize;
            }

            //获取第一个sheet
            sheet1 = hssfworkbook.GetSheetAt(sheetIndex);
            //按照页数复制sheet
            for (int s = 1; s < pagecount; s++)
            {
                sheet1.CopySheet(hssfworkbook.GetSheetName(sheetIndex) + "_" + s);
            }


            //设置变量
            int sheetCount = 0;
            int a = 0;
            int LastRowNum = 0;
            int rowNum = 0;
            int i;
            int count = 0;


            //默认第一次执行

            rowNum = list.Max(d => d.RowIndex);
            // cellCount = list.Max(d => d.ColumnIndex);//-2014 01 10-
            //需要把循环以下的行向下移动dt.Rows.Count;
            i = list.Where(d => d.SetValueType == 1).FirstOrDefault().RowIndex + 1;

            if (pagecount > 1)
            {
                count = pagesize;   //按页面大小来
            }
            else
            {
                count = dt.Rows.Count;
            }
            LastRowNum = sheet1.LastRowNum;
            sheet1.ShiftRows(i, LastRowNum + 1, count - 1, true, true);


            //循环DataTable
            foreach (DataRow dr in dt.Rows)
            {

                //如果页面超出设定大小 我们就查找下一个sheet 在循环添加
                if (a == pagesize)
                {

                    sheetCount++;//循环行数计数器
                    a = 0;

                    if (sheetCount == (pagecount - 1))
                    {
                        count = totlecount % pagesize;
                    }
                    else
                    {
                        count = pagesize;
                    }
                    rowNum = list.Max(d => d.RowIndex);
                    i = list.Where(d => d.SetValueType == 1).FirstOrDefault().RowIndex + 1;
                    string names = hssfworkbook.GetSheetName(sheetIndex) + "_" + sheetCount;
                    sheet1 = hssfworkbook.GetSheet(hssfworkbook.GetSheetName(sheetIndex) + "_" + sheetCount);
                    LastRowNum = sheet1.LastRowNum;
                    sheet1.ShiftRows(i, LastRowNum + 1, count - 1, true, true);
                }

                if (rowNum != rowNum + a)
                {
                    sheet1.CreateRow(rowNum + a);
                    for (int j = 0; j <= cellCount; j++)//创建单元格 //-2014 01 10 j < cellCount;
                    {
                        sheet1.GetRow(rowNum + a).CreateCell(j);

                    }
                }
                foreach (ExcelModel m in list)
                {
                    if (m.SetValueType == 1)
                    {

                        if (dt.Columns.Contains(m.ColumnName))
                        {
                            sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellValue(dr[m.ColumnName].ToString());
                        }
                        else
                        {
                            sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellValue("");
                        }
                        sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).CellStyle = m.ColumnStyle;
                        sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellType(m.ColumnType);
                    }
                }
                a++;
            }

        }
        private void SetCellValue(DataRow[] dr1, int sheetIndex, DataTable dt)
        {
            if (dr1.Length == 0)
            {
                return;
            }
            ISheet sheet1 = hssfworkbook.GetSheetAt(sheetIndex);
            int a = 0;
            int rowNum = list.Max(d => d.RowIndex);

            int count = dr1.Length;
            int LastRowNum = sheet1.LastRowNum;
            //需要把循环以下的行向下移动dt.Rows.Count;
            int i = list.Where(d => d.SetValueType == 1).FirstOrDefault().RowIndex + 1;
            sheet1.ShiftRows(i, LastRowNum + 1, count - 1, true, true);
            foreach (DataRow dr in dr1)
            {
                if (rowNum != rowNum + a)
                {
                    sheet1.CreateRow(rowNum + a);
                    for (int j = 0; j < cellCount; j++)//创建单元格
                    {
                        sheet1.GetRow(rowNum + a).CreateCell(j);

                    }
                }
                foreach (ExcelModel m in list)
                {
                    if (m.SetValueType == 1)
                    {

                        if (dt.Columns.Contains(m.ColumnName))
                        {
                            sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellValue(dr[m.ColumnName].ToString());
                        }
                        else
                        {
                            sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellValue("");
                        }
                        sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).CellStyle = m.ColumnStyle;
                        sheet1.GetRow(m.RowIndex + a).GetCell(m.ColumnIndex).SetCellType(m.ColumnType);
                    }
                }
                a++;
            }

        }
        /// <summary>
        /// 直接替换赋值
        /// </summary>
        /// <param name="hs"></param>
        private void SetCellValue1(Hashtable hs)
        {
            if (hs.Count == 0)
            {
                return;
            }
            ISheet sheet1 = hssfworkbook.GetSheetAt(0);
            foreach (ExcelModel m in list)
            {
                if (m.SetValueType == 0)
                {
                    if (hs.ContainsKey(m.ColumnName))
                    {
                        sheet1.GetRow(m.RowIndex).GetCell(m.ColumnIndex).SetCellValue(hs[m.ColumnName].ToString());
                        //设定单元格的格式 日期，货币
                    }
                    else
                    {
                        sheet1.GetRow(m.RowIndex).GetCell(m.ColumnIndex).SetCellValue("");
                    }
                }
            }
        }
        private void SetCellValue1(Hashtable hs, int sheetIndex)
        {
            if (hs == null)
            {
                return;
            }
            ISheet sheet1 = hssfworkbook.GetSheetAt(sheetIndex);
            foreach (ExcelModel m in list)
            {
                if (m.SetValueType == 0)
                {
                    if (hs.ContainsKey(m.ColumnName))
                    {
                        sheet1.GetRow(m.RowIndex).GetCell(m.ColumnIndex).SetCellValue(hs[m.ColumnName].ToString());
                        //设定单元格的格式 日期，货币
                    }
                    else
                    {
                        sheet1.GetRow(m.RowIndex).GetCell(m.ColumnIndex).SetCellValue("");
                    }
                }
            }
        }
        /// <summary>
        /// 判断指定的单元格是否是合并单元格  
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="row"></param>
        /// <param name="column"></param>
        /// <returns></returns>
        private bool MergedRegionNum(ISheet sheet, int rownum)
        {
            HSSFRow row = (HSSFRow)sheet.GetRow(rownum);
            if (row == null)
            {
                return false;
            }
            foreach (ICell c in row)
            {
                if (c.IsMergedCell)
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// 输出excel文件
        /// </summary>
        /// <param name="createFileName"></param>
        private void WriteToFile(string createFileName, string UserName)
        {
            string[] sArray = createFileName.Split('.');
            string date = DateTime.Now.ToString("yyyyMMddhhmmss");
            //写数据流的工作簿的根目录
            var path = AppDomain.CurrentDomain.BaseDirectory + "DownFile\\import\\" + UserName + "\\";
            FileStream file = new FileStream(path + sArray[0] + date + "." + sArray[1], FileMode.Create);
            hssfworkbook.Write(file);
            file.Close();
        }
        /// <summary>
        /// URL字符解码
        /// </summary>
        public static string UrlDecode(string str)
        {
            if (string.IsNullOrEmpty(str))
            {
                return "";
            }
            return HttpContext.Current.Server.UrlDecode(str);
        }
        /// <summary>
        ///  文件流写入文件
        ///  author:Alcedo
        ///  文件针对03以上版本
        /// </summary>
        /// <param name="createFileName"></param>
        private void WriteToFile07(string createFileName, string UserName)
        {
            string[] sArray = createFileName.Split('.');
            string date = DateTime.Now.ToString("yyyyMMddhhmmss");
            //写数据流的工作簿的根目录
            var path = AppDomain.CurrentDomain.BaseDirectory + "DownFile\\import\\" + UserName + "\\";
            FileStream file = new FileStream(path + sArray[0] + date + "." + sArray[1], FileMode.Create);
            hssfworkbook.Write(file);
            file.Close();
        }


        /// <summary>
        /// 在指定目录下递归查找子文件夹
        /// </summary>
        /// <param name="bootPath">根文件夹路径</param>
        /// <param name="directoryName">要查找的文件夹名</param>
        private void FindDirectory(string bootPath, string directoryName, out string filePath)
        {
            //在指定目录下递归查找子文件夹
            DirectoryInfo dir = new DirectoryInfo(bootPath);
            filePath = "";
            try
            {
                foreach (DirectoryInfo d in dir.GetDirectories()) //查找子文件夹
                {
                    if (d.Name == directoryName) //找到,返回文件夹路径
                    {
                        filePath = d.FullName;
                        break;
                    }
                    FindDirectory(bootPath + d.Name + "\\", directoryName, out filePath); //否则继续查找
                }
            }
            catch (Exception e)
            {
                HttpContext.Current.Response.Write(e.Message);
            }
        }
        /// <summary>
        /// 将物理路径转为虚拟路径
        /// </summary>
        /// <param name="physicsPath">物理路径</param>
        /// <param name="virtualRootPath">虚拟根路径</param>
        /// <returns></returns>
        private string GetVirtualPath(string physicsPath, string virtualRootPath)
        {
            int index = physicsPath.IndexOf(virtualRootPath.Substring(1));
            return "/" + physicsPath.Substring(index).Replace("\\", "/");
        }

        /// <summary>
        /// 判断指定的单元格是否是合并单元格  
        /// </summary>
        /// <param name="sheet"></param>
        /// <param name="row"></param>
        /// <param name="column"></param>
        /// <returns></returns>
        private List<int> MergedRegionNum(ISheet sheet, int row, int column, out bool isflag)
        {
            List<int> MergedRegionNum = new List<int>();
            int sheetMergeCount = sheet.NumMergedRegions;
            for (int i = 0; i < sheetMergeCount; i++)
            {
                CellRangeAddress ca = sheet.GetMergedRegion(i);
                int firstColumn = ca.FirstColumn;
                int lastColumn = ca.LastColumn;
                int firstRow = ca.FirstRow;
                int lastRow = ca.LastRow;
                if (row >= firstRow && row <= lastRow)
                {
                    if (column >= firstColumn && column <= lastColumn)
                    {
                        isflag = true;
                        MergedRegionNum.Add(firstRow);
                        MergedRegionNum.Add(firstColumn);
                        MergedRegionNum.Add(lastRow);
                        MergedRegionNum.Add(lastColumn);
                        return MergedRegionNum;
                    }
                }
            }
            isflag = false;
            return null;
        }
        public static bool IsHasCHZN(string inputData)
        {
            Regex RegCHZN = new Regex("[\u4e00-\u9fa5]");
            Match m = RegCHZN.Match(inputData);
            return m.Success;
        }
    }
}
