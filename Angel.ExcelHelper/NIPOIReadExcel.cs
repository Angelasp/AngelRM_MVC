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
using NPOI.XWPF.UserModel;
using NPOI.SS.Util;
using System.Diagnostics;
using NPOI.HSSF.Util;

namespace Angel.ExcelHelper
{
    public class NIPOIReadExcel : IDisposable
    {
        private string fileName = null; //文件名
        private IWorkbook workbook = null;
        private FileStream fs = null;
        private bool disposed;

        public NIPOIReadExcel(string fileName)
        {
            this.fileName = fileName;
            disposed = false;
        }

        /// <summary>
        /// 读取excel2007
        /// 当string.IsNullOrEmpty(sheetName)为TRUE时，则按sheetIndex读取
        /// 否则，按sheetName读取
        /// </summary>
        /// <param name="Content"></param>
        /// <returns></returns>
        public DataTable GetExcelToTable07(Stream Content, string sheetName, int sheetIndex = 0)  //2007 Excel
        {

            XSSFWorkbook workbook = new XSSFWorkbook(Content);
            //获取excel的第一个sheet
            XSSFSheet sheet;
            if (string.IsNullOrEmpty(sheetName))
            {
                sheet = (XSSFSheet)workbook.GetSheetAt(sheetIndex);
            }
            else
            {
                int index = workbook.GetSheetIndex(sheetName);
                if (index == -1)
                {
                    return null;
                }
                sheet = (XSSFSheet)workbook.GetSheet(sheetName);
            }
            sheet.ForceFormulaRecalculation = true;
            DataTable table = new DataTable();
            /*try
            {*/
            //获取sheet的首行                
            XSSFRow headerRow = (XSSFRow)sheet.GetRow(0);

            //一行最后一个方格的编号 即总的列数
            int cellCount = headerRow.LastCellNum;
            ICell cell = null;
            for (int i = headerRow.FirstCellNum; i < cellCount; i++)
            {
                cell = headerRow.GetCell(i);
                DataColumn column;
                if (headerRow.GetCell(i).CellType == CellType.Numeric)
                {
                    //NPOI中数字和日期都是NUMERIC类型的，这里对其进行判断是否是日期类型
                    if (HSSFDateUtil.IsCellDateFormatted(cell))//日期类型
                    {
                        column = new DataColumn(cell.DateCellValue.ToString("yyyy年MM月"));
                    }
                    else//其他数字类型
                    {
                        column = new DataColumn(cell.NumericCellValue.ToString());
                    }
                }
                else if (cell.CellType == CellType.Blank)//空数据类型
                {
                    column = new DataColumn("");
                }
                else //其他类型都按字符串类型来处理
                {
                    column = new DataColumn(cell.StringCellValue);
                }
                cell = null;
                table.Columns.Add(column);
            }
            //最后一列的标号  即总的行数
            int rowCount = sheet.LastRowNum + 1;
            for (int i = (sheet.FirstRowNum + 1); i < rowCount; i++)
            {
                XSSFRow row = (XSSFRow)sheet.GetRow(i);
                if (row == null || row.Cells.Count == 0) continue;
                DataRow dataRow = table.NewRow();

                for (int j = row.FirstCellNum; j < cellCount; j++)
                {
                    if (row.GetCell(j) != null)
                    {
                        cell = row.GetCell(j);
                        if (cell.CellType == CellType.Numeric)
                        {
                            //NPOI中数字和日期都是NUMERIC类型的，这里对其进行判断是否是日期类型
                            if (HSSFDateUtil.IsCellDateFormatted(cell))//日期类型
                            {
                                if (cell.CellStyle.GetDataFormatString().Contains("日") || cell.CellStyle.GetDataFormatString().Contains("d"))
                                {
                                    dataRow[j] = cell.DateCellValue.ToString("yyyy年MM月dd日");
                                }
                                else
                                {
                                    dataRow[j] = cell.DateCellValue.ToString("yyyy年MM月");
                                }
                            }
                            else//其他数字类型
                            {
                                if (!string.IsNullOrEmpty(cell.CellStyle.GetDataFormatString()) && cell.CellStyle.GetDataFormatString().Contains("%"))
                                {
                                    dataRow[j] = cell.NumericCellValue * 100;
                                }
                                else if (cell.CellStyle.DataFormat.GetHashCode() == 3735609)
                                {
                                    dataRow[j] = cell.DateCellValue.ToString("yyyy年MM月");
                                }
                                else if (cell.CellStyle.DataFormat.GetHashCode() == 2031647)
                                {
                                    dataRow[j] = cell.DateCellValue.ToString("yyyy年MM月dd日");
                                }
                                else
                                {
                                    dataRow[j] = cell.NumericCellValue;
                                }
                                // 处理科学计数
                                if (dataRow[j].ToString().Contains("E"))
                                {
                                    Decimal dData = 0.0M;
                                    dData = Convert.ToDecimal(Decimal.Parse(dataRow[j].ToString(), System.Globalization.NumberStyles.Float));
                                    dataRow[j] = dData;
                                    //FileLog.WriteLog("科学计数：" + dataRow[j].ToString());
                                }
                            }
                        }
                        else if (cell.CellType == CellType.Blank)//空数据类型
                        {
                            dataRow[j] = "";
                        }
                        else if (cell.CellType == CellType.Formula)//公式类型
                        {
                            XSSFFormulaEvaluator eva = new XSSFFormulaEvaluator(workbook);
                            CellValue cv = eva.Evaluate(cell);
                            switch (cv.CellType)
                            {
                                case CellType.Numeric:
                                    dataRow[j] = cv.NumberValue;
                                    break;
                                case CellType.String:
                                    dataRow[j] = cv.StringValue;
                                    break;
                                case CellType.Error:
                                    dataRow[j] = cv.ErrorValue;
                                    break;
                            }
                            //FileLog.WriteLog("公式:" + dataRow[j]);
                            
                        }
                        else //其他类型都按字符串类型来处理
                        {
                            cell.SetCellType(CellType.String);
                            dataRow[j] = cell.StringCellValue;
                        }
                    }
                    cell = null;
                }
                table.Rows.Add(dataRow);
            }

            workbook = null;
            sheet = null;
            /*}
            catch (Exception ex)
            {
                FileLog.WriteLog("Exception: " + ex);
                table = null;
            }*/

            return table;

        }


        /// <summary>
        /// 读取excel2003
        /// 当string.IsNullOrEmpty(sheetName)为TRUE时，则按sheetIndex读取
        /// 否则，按sheetName读取
        /// </summary>
        /// <param name="Content"></param>
        /// <returns></returns>
        public DataTable GetExcelToTable03(Stream Content, string sheetName, int sheetIndex = 0)  //2003 Excel
        {

            HSSFWorkbook workbook = new HSSFWorkbook(Content);

            //获取excel的第一个sheet
            HSSFSheet sheet;
            if (string.IsNullOrEmpty(sheetName))
            {
                sheet = (HSSFSheet)workbook.GetSheetAt(sheetIndex);
            }
            else
            {
                int index = workbook.GetSheetIndex(sheetName);
                if (index == -1)
                {
                    return null;
                }
                sheet = (HSSFSheet)workbook.GetSheet(sheetName);
            }

            DataTable table = new DataTable();
            try
            {
                //获取sheet的首行
                HSSFRow headerRow = (HSSFRow)sheet.GetRow(0);

                //一行最后一个方格的编号 即总的列数
                int cellCount = headerRow.LastCellNum;

                for (int i = headerRow.FirstCellNum; i < cellCount; i++)
                {
                    DataColumn column = new DataColumn(headerRow.GetCell(i).StringCellValue);
                    table.Columns.Add(column);
                }
                //最后一列的标号  即总的行数
                int rowCount = sheet.LastRowNum + 1;
                for (int i = (sheet.FirstRowNum + 1); i < rowCount; i++)
                {
                    HSSFRow row = (HSSFRow)sheet.GetRow(i);
                    if (row == null || row.Cells.Count == 0) continue;
                    DataRow dataRow = table.NewRow();

                    for (int j = row.FirstCellNum; j < cellCount; j++)
                    {
                        if (row.GetCell(j) != null)
                        {
                            dataRow[j] = row.GetCell(j).ToString();
                        }
                    }

                    table.Rows.Add(dataRow);
                }
                workbook = null;
                sheet = null;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog("Exception: " + ex);
                table = null;
            }

            return table;

        }

        /// <summary>
        /// 读取excel2003（处理合并单元格）
        /// 否则，按sheetName读取
        /// </summary>
        /// <param name="Content"></param>
        /// <returns></returns>
        public DataTable GetExcelToTable03(Stream Content, int sheetIndex, int[] rowColumnNum, string headName)
        {

            if (sheetIndex < 0) return null;
            HSSFWorkbook workbook = new HSSFWorkbook(Content);
            HSSFSheet sheet = (HSSFSheet)workbook.GetSheetAt(sheetIndex);
            DataTable table = new DataTable();
            try
            {
                int headRowNum = rowColumnNum[0], firstColumnNum = rowColumnNum[1];

                ICell cell = sheet.GetRow(headRowNum).GetCell(firstColumnNum);
                if (cell == null || !headName.Equals(cell.StringCellValue))
                {
                    headRowNum = rowColumnNum[2];
                    firstColumnNum = rowColumnNum[3];
                }

                //获取sheet的首行
                HSSFRow headerRow = (HSSFRow)sheet.GetRow(headRowNum);

                //一行最后一个方格的编号 即总的列数
                int cellCount = headerRow.LastCellNum;
                for (int i = headerRow.FirstCellNum; i < cellCount; i++)
                {
                    DataColumn column = new DataColumn(headerRow.GetCell(i).StringCellValue);
                    table.Columns.Add(column);
                }
                //最后一列的标号  即总的行数
                int rowCount = sheet.LastRowNum + 1;
                CellRangeAddress cra = null;
                for (int i = (headRowNum + 1); i < rowCount; i++)
                {
                    HSSFRow row = (HSSFRow)sheet.GetRow(i);
                    if (row == null || row.Cells.Count == 0) continue;
                    DataRow dataRow = table.NewRow();

                    for (int j = row.FirstCellNum; j < row.LastCellNum; j++)
                    {
                        if (row.GetCell(j) != null)
                        {
                            // 如果是合并单元格
                            if (IsMergedRegionCell(j, i, sheet, ref cra) && j == cra.FirstColumn)
                            {
                                dataRow[j - firstColumnNum] = sheet.GetRow(cra.FirstRow).GetCell(cra.FirstColumn).ToString();
                            }
                            else
                            {
                                dataRow[j - firstColumnNum] = row.GetCell(j).ToString();
                            }
                        }
                        cra = null;
                    }

                    table.Rows.Add(dataRow);
                }
                workbook = null;
                sheet = null;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog("Exception: " + ex);
                table = null;
            }

            return table;

        }

        /// <summary>
        /// 将DataTable数据导入到excel中
        /// </summary>
        /// <param name="data">要导入的数据</param>
        /// <param name="isColumnWritten">DataTable的列名是否要导入</param>
        /// <param name="sheetName">要导入的excel的sheet的名称</param>
        /// <returns>导入数据行数(包含列名那一行)</returns>
        public int DataTableToExcel(DataTable data, string sheetName, bool isColumnWritten)
        {
            int i = 0;
            int j = 0;
            int count = 0;
            ISheet sheet = null;

            fs = new FileStream(fileName, FileMode.OpenOrCreate, FileAccess.ReadWrite);
            if (fileName.IndexOf(".xlsx") > 0) // 2007版本
                workbook = new XSSFWorkbook();
            else if (fileName.IndexOf(".xls") > 0) // 2003版本
                workbook = new HSSFWorkbook();

            try
            {
                if (workbook != null)
                {
                    sheet = workbook.CreateSheet(sheetName);
                }
                else
                {
                    return -1;
                }

                if (isColumnWritten == true) //写入DataTable的列名
                {
                    IRow row = sheet.CreateRow(0);
                    for (j = 0; j < data.Columns.Count; ++j)
                    {
                        row.CreateCell(j).SetCellValue(data.Columns[j].ColumnName);
                    }
                    count = 1;
                }
                else
                {
                    count = 0;
                }

                for (i = 0; i < data.Rows.Count; ++i)
                {
                    IRow row = sheet.CreateRow(count);
                    for (j = 0; j < data.Columns.Count; ++j)
                    {
                        row.CreateCell(j).SetCellValue(data.Rows[i][j].ToString());
                    }
                    ++count;
                }
                workbook.Write(fs); //写入到excel
                return count;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog("Exception: " + ex);
                return -1;
            }
        }

        /// <summary>
        /// 将excel中的数据导入到DataTable中
        /// </summary>
        /// <param name="sheetName">excel工作薄sheet的名称</param>
        /// <param name="isFirstRowColumn">第一行是否是DataTable的列名</param>
        /// <returns>返回的DataTable</returns>
        public DataTable ExcelToDataTable(string sheetName, bool isFirstRowColumn)
        {
            ISheet sheet = null;
            DataTable data = new DataTable();
            int startRow = 0;
            try
            {
                fs = new FileStream(fileName, FileMode.Open, FileAccess.Read);
                if (fileName.IndexOf(".xlsx") > 0) // 2007版本
                    workbook = new XSSFWorkbook(fs);
                else if (fileName.IndexOf(".xls") > 0) // 2003版本
                    workbook = new HSSFWorkbook(fs);

                if (sheetName != null)
                {
                    sheet = workbook.GetSheet(sheetName);
                }
                else
                {
                    sheet = workbook.GetSheetAt(0);
                }
                if (sheet != null)
                {
                    IRow firstRow = sheet.GetRow(0);
                    int cellCount = firstRow.LastCellNum; //一行最后一个cell的编号 即总的列数

                    if (isFirstRowColumn)
                    {
                        for (int i = firstRow.FirstCellNum; i < cellCount; ++i)
                        {
                            DataColumn column = new DataColumn(firstRow.GetCell(i).StringCellValue);
                            data.Columns.Add(column);
                        }
                        startRow = sheet.FirstRowNum + 1;
                    }
                    else
                    {
                        startRow = sheet.FirstRowNum;
                    }

                    //最后一列的标号
                    int rowCount = sheet.LastRowNum;
                    for (int i = startRow; i <= rowCount; ++i)
                    {
                        IRow row = sheet.GetRow(i);
                        if (row == null) continue; //没有数据的行默认是null　　　　　　　

                        DataRow dataRow = data.NewRow();
                        for (int j = row.FirstCellNum; j < cellCount; ++j)
                        {
                            if (row.GetCell(j) != null) //同理，没有数据的单元格都默认是null
                                dataRow[j] = row.GetCell(j).ToString();
                        }
                        data.Rows.Add(dataRow);
                    }
                }

                return data;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog("Exception: " + ex);
                return null;
            }
        }

        /// <summary>
        /// 将excel中的多个SHEET的数据导入到DataSet中
        /// </summary>
        /// <param name="Content">Stream</param>
        /// <param name="sheetNames">多个sheet名称</param>
        /// <returns>返回的DataSet</returns>
        public DataSet GetExcelToSet07(Stream Content, string[] sheetNames)  //2007 Excel
        {

            XSSFWorkbook workbook = new XSSFWorkbook(Content);
            DataSet dataset = new DataSet();
            foreach (string sheetname in sheetNames)
            {
                int index = workbook.GetSheetIndex(sheetname);
                if (index == -1) return null;
                XSSFSheet sheet = (XSSFSheet) workbook.GetSheet(sheetname);
                DataTable table = new DataTable(sheetname);
                //获取sheet的首行                
                XSSFRow headerRow = (XSSFRow)sheet.GetRow(0);

                //一行最后一个方格的编号 即总的列数
                int cellCount = headerRow.LastCellNum;

                for (int i = headerRow.FirstCellNum; i < cellCount; i++)
                {
                    DataColumn column = new DataColumn(headerRow.GetCell(i).StringCellValue);
                    table.Columns.Add(column);
                }
                //最后一列的标号  即总的行数
                int rowCount = sheet.LastRowNum + 1;
                for (int i = (sheet.FirstRowNum + 1); i < rowCount; i++)
                {
                    XSSFRow row = (XSSFRow)sheet.GetRow(i);
                    if (row == null || row.Cells.Count == 0) continue;
                    DataRow dataRow = table.NewRow();

                    for (int j = row.FirstCellNum; j < cellCount; j++)
                    {
                        if (row.GetCell(j) != null)
                        {
                            //dataRow[j] = row.GetCell(j).ToString();
                            if (row.GetCell(j).CellType == CellType.Numeric)
                            {
                                //NPOI中数字和日期都是NUMERIC类型的，这里对其进行判断是否是日期类型
                                if (HSSFDateUtil.IsCellDateFormatted(row.GetCell(j)))//日期类型
                                {
                                    dataRow[j] = row.GetCell(j).DateCellValue.ToString("yyyy年MM月");
                                }
                                else//其他数字类型
                                {
                                    if (!string.IsNullOrEmpty(row.GetCell(j).CellStyle.GetDataFormatString()) && row.GetCell(j).CellStyle.GetDataFormatString().Contains("%"))
                                    {
                                        dataRow[j] = row.GetCell(j).NumericCellValue * 100;
                                    }
                                    else
                                    {
                                        dataRow[j] = row.GetCell(j).NumericCellValue;
                                    }
                                }
                            }
                            else if (row.GetCell(j).CellType == CellType.Blank)//空数据类型
                            {
                                dataRow[j] = "";
                            }
                            else if (row.GetCell(j).CellType == CellType.Formula)//公式类型
                            {
                                XSSFFormulaEvaluator eva = new XSSFFormulaEvaluator(workbook);
                                dataRow[j] = eva.Evaluate(row.GetCell(j)).StringValue;
                            }
                            else //其他类型都按字符串类型来处理
                            {
                                dataRow[j] = row.GetCell(j).StringCellValue;
                            }
                        }
                    }
                    table.Rows.Add(dataRow);
                }
                dataset.Tables.Add(table);
            }
            return dataset;
        }

        
        public void UpdateWriteExcelFile(string sheetname, ref List<Object[]> newData)
        {
            FileLog.WriteLog("应回写的记录" + newData.Count + "条");
            using (FileStream fs = File.Open(fileName, FileMode.Open, FileAccess.Read))
            {

                try
                {
                    var ext = Path.GetExtension(fileName).ToLower();
                    IWorkbook wk;
                    if (ext.Contains(".xlsx"))
                        wk = new XSSFWorkbook(fs);
                    else
                        wk = new HSSFWorkbook(fs);
                    fs.Close();
                    ISheet sheet = wk.GetSheet(sheetname);
                    // 指标编码所在列id
                    Dictionary<string, int> columnMap = new Dictionary<string, int>();
                    IRow headRow = sheet.GetRow(0);
                    for (int i = headRow.FirstCellNum, l = headRow.LastCellNum; i < l; i++)
                    {
                        if (!columnMap.ContainsKey(headRow.GetCell(i).StringCellValue))
                        {
                            columnMap.Add(headRow.GetCell(i).StringCellValue, i);
                        }
                    }
                    // 省/地市所在行id
                    Dictionary<string, int> rowMap = new Dictionary<string, int>();
                    string cityExl = "", cityDB = "";
                    for (int i = 8, rowN = sheet.LastRowNum; i <= rowN; i++)
                    {
                        IRow row = sheet.GetRow(i);
                        if (row == null) continue;
                        //rowMap.Add(row.GetCell(row.FirstCellNum).StringCellValue, i);
                        cityExl = row.GetCell(row.FirstCellNum).StringCellValue.Trim().Replace("省", "");
                        foreach (Object[] objs in newData)
                        {
                            cityDB = objs[1].ToString();
                            //  省/市名匹配
                            if (cityExl == cityDB ||cityExl.Contains(cityDB) || cityDB.Contains(cityExl))
                            {
                                if (!rowMap.ContainsKey(cityDB))
                                {
                                    rowMap.Add(cityDB, i);
                                }
                                break;
                            }
                            else
                            {
                                cityExl = cityExl.Replace("市", "");
                                //cityExl = cityExl.Replace("州", "");
                                if (cityExl == cityDB || cityExl.Contains(cityDB) || cityDB.Contains(cityExl))
                                {
                                    if (!rowMap.ContainsKey(cityDB))
                                    {
                                        rowMap.Add(cityDB, i);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    // 给单元格重新赋值
                    int cid = -1, rid = -1;
                    foreach (Object[] objs in newData)
                    {
                        if (!columnMap.ContainsKey(objs[0].ToString()))
                        {
                            FileLog.WriteLog(objs[0].ToString() + "找不到对应的列!");
                            continue;
                        }
                        if (!rowMap.ContainsKey(objs[1].ToString()))
                        {
                            FileLog.WriteLog(objs[1].ToString() + "找不到对应的行!");
                            continue;
                        }
                        cid = columnMap[objs[0].ToString()];
                        rid = rowMap[objs[1].ToString()];
                        // 修改数据来源
                        IRow rowS = sheet.GetRow(5);
                        rowS.GetCell(cid).SetCellValue(objs[2].ToString());
                        //FileLog.WriteLog("修改"+ objs[0].ToString() + "-" + objs[1].ToString() + "数据来源:" + rid + "-" + cid + ":" + objs[2].ToString());
                        // 修改当期时间
                        IRow rowD = sheet.GetRow(6);
                        rowD.GetCell(cid).SetCellValue(objs[3].ToString());
                        //FileLog.WriteLog("修改" + objs[0].ToString() + "-" + objs[1].ToString() + "当期时间:" + rid + "-" + cid + ":" + objs[3].ToString());
                        // 修改指标值
                        IRow row = sheet.GetRow(rid);
                        row.GetCell(cid).SetCellValue(objs[4].ToString());
                        //FileLog.WriteLog("修改" + objs[0].ToString() + "-" + objs[1].ToString() + "指标值:" + rid + "-" + cid + ":" + objs[4].ToString());
                    }
                    //FileStream fileStream = File.OpenWrite(fileName);
                    FileStream fileStream = new FileStream(fileName, FileMode.Create, FileAccess.Write);
                    //FileStream fileStream = new FileStream(@"D:\\新建文件夹\\test.xlsx",FileMode.Create, FileAccess.Write);
                    wk.Write(fileStream);
                    fileStream.Close();

                }
                catch (Exception e)
                {
                    FileLog.WriteLog("" + e);
                }
            }
        }

        public void UpdateWriteExcelFileGP(string sheetname, ref List<int[]> redError, ref List<int[]> yellowError, ref List<int[]> blueError)
        {
            int red_total = redError.Count;
            int yellow_total = yellowError.Count;
            using (FileStream fs = File.Open(fileName, FileMode.Open, FileAccess.Read))
            {
                try
                {
                    var ext = Path.GetExtension(fileName).ToLower();
                    IWorkbook wk;
                    if (ext.Contains(".xlsx"))
                        wk = new XSSFWorkbook(fs);
                    else
                        wk = new HSSFWorkbook(fs);
                    fs.Close();
                    ISheet sheet = wk.GetSheet(sheetname);
                    IDrawing patr = sheet.CreateDrawingPatriarch();
                    NPOI.SS.UserModel.ICreationHelper facktory = wk.GetCreationHelper();                  

                    // 错误类型-批注
                    Dictionary<int, string> Dic_Comment = new Dictionary<int, string>();
                    Dic_Comment.Add(1, "未匹配上的省市名");
                    Dic_Comment.Add(2, "不支持的日期格式");
                    Dic_Comment.Add(3, "上报时间不能晚于当前时间");
                    Dic_Comment.Add(4, "当期时间与上次上报的时间格式不相同");
                    Dic_Comment.Add(5, "指标值包含中文");
                    Dic_Comment.Add(6, "指标值不是数值");
                    Dic_Comment.Add(7, "指标值越界");
                    Dic_Comment.Add(8, "带%的指标小于1");
                    Dic_Comment.Add(9, "分子÷分母不等于指标值");
                    Dic_Comment.Add(10, "无法填报");

                    Dictionary<int, int[]> Dic_Count = new Dictionary<int, int[]>();
                    Dic_Count.Add(1, new int[2] { 0, 1 });
                    Dic_Count.Add(2, new int[2] { 0, 1 });
                    Dic_Count.Add(3, new int[2] { 0, 1 });
                    Dic_Count.Add(4, new int[2] { 0, 1 });
                    Dic_Count.Add(5, new int[2] { 0, 0 });
                    Dic_Count.Add(6, new int[2] { 0, 1 });
                    Dic_Count.Add(7, new int[2] { 0, 1 });
                    Dic_Count.Add(8, new int[2] { 0, 0 });
                    Dic_Count.Add(9, new int[2] { 0, 0 });
                    Dic_Count.Add(10, new int[2] { 0, 2 });

                    // 背景色
                    ICellStyle yellowStyle = wk.CreateCellStyle();
                    yellowStyle.FillForegroundColor = HSSFColor.LightYellow.Index;
                    yellowStyle.FillPattern = FillPattern.SolidForeground;

                    ICellStyle redStyle = wk.CreateCellStyle();
                    redStyle.FillForegroundColor = HSSFColor.Red.Index;
                    redStyle.FillPattern = FillPattern.SolidForeground;

                    ICellStyle blueStyle = wk.CreateCellStyle();
                    blueStyle.FillForegroundColor = HSSFColor.SkyBlue.Index;
                    blueStyle.FillPattern = FillPattern.SolidForeground;

                    ICellStyle yellowErrorStyle = null, redErrorStyle = null, blueErrorStyle = null;
                    
                    /**************************填写模板中设置背景色****************************/
                    foreach (int[] yellow in yellowError)
                    {
                        if (sheet.GetRow(yellow[0]).GetCell(yellow[1]).CellStyle.GetDataFormatString().Contains("%"))
                        {
                            if (yellowErrorStyle == null)
                            {
                                yellowErrorStyle = wk.CreateCellStyle();
                                copyCellStyle(sheet.GetRow(yellow[0]).GetCell(yellow[1]).CellStyle, ref yellowErrorStyle);
                                yellowErrorStyle.FillPattern = FillPattern.SolidForeground;
                                yellowErrorStyle.FillForegroundColor = HSSFColor.LightYellow.Index;
                            }
                            sheet.GetRow(yellow[0]).GetCell(yellow[1]).CellStyle = yellowErrorStyle;
                        }
                        else
                        {
                            sheet.GetRow(yellow[0]).GetCell(yellow[1]).CellStyle = yellowStyle;
                        }
                        Dic_Count[yellow[2]][0]++;
                    }
                    foreach (int[] red in redError)
                    {
                        if (sheet.GetRow(red[0]).GetCell(red[1]).CellStyle.GetDataFormatString().Contains("%"))
                        {
                            if (redErrorStyle == null)
                            {
                                redErrorStyle = wk.CreateCellStyle();
                                copyCellStyle(sheet.GetRow(red[0]).GetCell(red[1]).CellStyle, ref redErrorStyle);
                                redErrorStyle.FillPattern = FillPattern.SolidForeground;
                                redErrorStyle.FillForegroundColor = HSSFColor.Red.Index;
                            }
                            sheet.GetRow(red[0]).GetCell(red[1]).CellStyle = redErrorStyle;
                        }
                        else
                        {
                            sheet.GetRow(red[0]).GetCell(red[1]).CellStyle = redStyle;
                        }
                        Dic_Count[red[2]][0]++;
                    }
                    foreach (int[] blue in blueError)
                    {
                        if (sheet.GetRow(blue[0]).GetCell(blue[1]).CellStyle.GetDataFormatString().Contains("%"))
                        {
                            if (blueErrorStyle == null)
                            {
                                blueErrorStyle = wk.CreateCellStyle();
                                copyCellStyle(sheet.GetRow(blue[0]).GetCell(blue[1]).CellStyle, ref blueErrorStyle);
                                blueErrorStyle.FillPattern = FillPattern.SolidForeground;
                                blueErrorStyle.FillForegroundColor = HSSFColor.SkyBlue.Index;
                            }
                            sheet.GetRow(blue[0]).GetCell(blue[1]).CellStyle = blueErrorStyle;
                        }
                        else
                        {
                            sheet.GetRow(blue[0]).GetCell(blue[1]).CellStyle = blueStyle;
                        }
                        Dic_Count[blue[2]][0]++;
                    }

                    /**************************问题数据明细****************************/
                    ISheet sheetLogInfo = null;
                    int index = wk.GetSheetIndex("问题数据明细");
                    if (index > -1)
                    {
                        wk.RemoveSheetAt(index);
                    }
                    sheetLogInfo = wk.CreateSheet("问题数据明细");
                    IRow headerRow = sheetLogInfo.CreateRow(0);
                    headerRow.CreateCell(0).SetCellValue("位置");
                    headerRow.CreateCell(1).SetCellValue("描述");
                    headerRow.CreateCell(2).SetCellValue("备注");
                    int rowIndex = 1;
                    
                    string address = null, value1 = "必改", value2 = "自查", value3= "无法填报", sheetname2= "#填写模板!";
                    foreach (int[] red in redError)
                    {
                        IRow dataRow = sheetLogInfo.CreateRow(rowIndex);
                        address = ExcelUtil.getExcelColumnLabel(red[1]) + "" + (red[0] + 1);
                        dataRow.CreateCell(0).SetCellValue(address);
                        dataRow.CreateCell(1).SetCellValue(Dic_Comment[red[2]]);
                        dataRow.CreateCell(2).SetCellValue(value1);
                        sheetLogInfo.GetRow(rowIndex).GetCell(2).CellStyle = redStyle;

                        IHyperlink link = new XSSFHyperlink(HyperlinkType.Document);                        
                        link.Address = sheetname2 + address;
                        sheetLogInfo.GetRow(rowIndex).GetCell(0).Hyperlink = link;

                        rowIndex++;
                    }

                    foreach (int[] yellow in yellowError)
                    {
                        IRow dataRow = sheetLogInfo.CreateRow(rowIndex);
                        address = ExcelUtil.getExcelColumnLabel(yellow[1]) + "" + (yellow[0] + 1);
                        dataRow.CreateCell(0).SetCellValue(address);
                        dataRow.CreateCell(1).SetCellValue(Dic_Comment[yellow[2]]);
                        dataRow.CreateCell(2).SetCellValue(value2);
                        sheetLogInfo.GetRow(rowIndex).GetCell(2).CellStyle = yellowStyle;
                        
                        IHyperlink link = new XSSFHyperlink(HyperlinkType.Document);
                        link.Address = sheetname2 + address;
                        sheetLogInfo.GetRow(rowIndex).GetCell(0).Hyperlink = link;
                        
                        rowIndex++;
                    }

                    foreach (int[] blue in blueError)
                    {
                        IRow dataRow = sheetLogInfo.CreateRow(rowIndex);
                        address = ExcelUtil.getExcelColumnLabel(blue[1]) + "" + (blue[0] + 1);
                        dataRow.CreateCell(0).SetCellValue(address);
                        dataRow.CreateCell(1).SetCellValue(Dic_Comment[blue[2]]);
                        dataRow.CreateCell(2).SetCellValue(value3);
                        sheetLogInfo.GetRow(rowIndex).GetCell(2).CellStyle = blueStyle;

                        IHyperlink link = new XSSFHyperlink(HyperlinkType.Document);
                        link.Address = sheetname2 + address;
                        sheetLogInfo.GetRow(rowIndex).GetCell(0).Hyperlink = link;

                        rowIndex++;
                    }

                    /**************************问题数据统计****************************/
                    ISheet sheetLog = null;
                    index = wk.GetSheetIndex("问题数据统计");
                    if (index > -1)
                    {
                        wk.RemoveSheetAt(index);
                    }
                    sheetLog = wk.CreateSheet("问题数据统计");
                    headerRow = sheetLog.CreateRow(0);
                    headerRow.CreateCell(0).SetCellValue("描述");
                    headerRow.CreateCell(1).SetCellValue("次数");
                    headerRow.CreateCell(2).SetCellValue("备注");

                    // handling value.
                    rowIndex = 1;
                    foreach (KeyValuePair<int, int[]> kv in Dic_Count)
                    {
                        IRow dataRow = sheetLog.CreateRow(rowIndex);
                        dataRow.CreateCell(0).SetCellValue(Dic_Comment[kv.Key]);
                        dataRow.CreateCell(1).SetCellValue(kv.Value[0]);
                        dataRow.CreateCell(2).SetCellValue(kv.Value[1] == 1 ? value1 : (kv.Value[1] == 0 ? value2 : value3));
                        sheetLog.GetRow(rowIndex).GetCell(2).CellStyle = kv.Value[1] == 1 ? redStyle : (kv.Value[1] == 0 ? yellowStyle : blueStyle);
                        rowIndex++;
                    }
                    IRow totalRow = sheetLog.CreateRow(rowIndex);
                    totalRow.CreateCell(0).SetCellValue("必改问题合计：" + red_total);
                    totalRow.CreateCell(1).SetCellValue("自查问题合计：" + yellow_total);
                    totalRow.CreateCell(2).SetCellValue("无法填报合计：" + blueError.Count);
                    sheetLog.GetRow(rowIndex).GetCell(0).CellStyle = redStyle;
                    sheetLog.GetRow(rowIndex).GetCell(1).CellStyle = yellowStyle;
                    sheetLog.GetRow(rowIndex).GetCell(2).CellStyle = blueStyle;
                    IRow remarkRow1 = sheetLog.CreateRow(++rowIndex);
                    IRow remarkRow2 = sheetLog.CreateRow(++rowIndex);
                    IRow remarkRow3 = sheetLog.CreateRow(++rowIndex);
                    IRow remarkRow4 = sheetLog.CreateRow(++rowIndex);
                    remarkRow1.CreateCell(0).SetCellValue("注：");
                    remarkRow2.CreateCell(0).SetCellValue("【必改】问题数据必须修改后才能入库");
                    remarkRow3.CreateCell(0).SetCellValue("【自查】问题数据请自行核查数据，填报人员对数据准确性负责");
                    remarkRow4.CreateCell(0).SetCellValue("【无法填报】表示根据数据填报核减模版，该单元格指标为无法填报，该指标数据不入库");
                    
                    //FileStream fileStream = File.OpenWrite(fileName);
                    FileStream fileStream = new FileStream(fileName, FileMode.Create, FileAccess.Write);
                    //FileStream fileStream = new FileStream(@"D:\\新建文件夹\\test.xlsx",FileMode.Create, FileAccess.Write);
                    wk.Write(fileStream);
                    fileStream.Close();

                }
                catch (Exception e)
                {
                    FileLog.WriteLog("" + e);
                }
            }
        }

        public void UpdateWriteExcelFileLog(ref List<int[]> yellowError)
        {
            int yellow_total = yellowError.Count;
            using (FileStream fs = File.Open(fileName, FileMode.Open, FileAccess.Read))
            {
                try
                {
                    var ext = Path.GetExtension(fileName).ToLower();
                    IWorkbook wk;
                    if (ext.Contains(".xlsx"))
                        wk = new XSSFWorkbook(fs);
                    else
                        wk = new HSSFWorkbook(fs);
                    fs.Close();
                    ISheet sheet = wk.GetSheetAt(0);
                    IDrawing patr = sheet.CreateDrawingPatriarch();
                    NPOI.SS.UserModel.ICreationHelper facktory = wk.GetCreationHelper();
                    
                    /**************************填写模板中设置背景色****************************/                    
                    
                    foreach (int[] yellow in yellowError)
                    {
                        ICellStyle yellowStyle = wk.CreateCellStyle();
                        copyCellStyle(sheet.GetRow(yellow[0]).GetCell(yellow[1]).CellStyle, ref yellowStyle);
                        // 背景色
                        yellowStyle.FillPattern = FillPattern.SolidForeground;
                        yellowStyle.FillForegroundColor = HSSFColor.LightYellow.Index;
                        sheet.GetRow(yellow[0]).GetCell(yellow[1]).CellStyle = yellowStyle;
                    }
                    
                    FileStream fileStream = new FileStream(fileName, FileMode.Create, FileAccess.Write);
                    wk.Write(fileStream);
                    fileStream.Close();

                }
                catch (Exception e)
                {
                    FileLog.WriteLog("" + e);
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /**
         * 复制一个单元格样式到目的单元格样式
         * @param fromStyle
         * @param toStyle
         */
        private void copyCellStyle(ICellStyle fromStyle, ref ICellStyle toStyle)
        {
            toStyle.Alignment = fromStyle.Alignment;
            // 边框和边框颜色
            toStyle.BorderBottom = fromStyle.BorderBottom;
            toStyle.BorderLeft = fromStyle.BorderLeft;
            toStyle.BorderRight = fromStyle.BorderRight;
            toStyle.BorderTop = fromStyle.BorderTop;
            toStyle.TopBorderColor = fromStyle.TopBorderColor;
            toStyle.BottomBorderColor = fromStyle.BottomBorderColor;
            toStyle.RightBorderColor = fromStyle.RightBorderColor;
            toStyle.LeftBorderColor = fromStyle.LeftBorderColor;

            //背景和前景
            toStyle.FillBackgroundColor = fromStyle.FillBackgroundColor;
            toStyle.FillForegroundColor = fromStyle.FillForegroundColor;

            toStyle.DataFormat = fromStyle.DataFormat;
            toStyle.FillPattern = fromStyle.FillPattern;
            toStyle.IsHidden = fromStyle.IsHidden;
            toStyle.Indention = fromStyle.Indention;
            toStyle.IsLocked = fromStyle.IsLocked;
            toStyle.Rotation = fromStyle.Rotation;
            toStyle.VerticalAlignment = fromStyle.VerticalAlignment;
            toStyle.WrapText = fromStyle.WrapText;
            
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    if (fs != null)
                        fs.Close();
                }

                fs = null;
                disposed = true;
            }
        }

        // 判断单元格是否被合并
        private bool IsMergedRegionCell(int cellIndex, int rowIndex, ISheet sheet, ref CellRangeAddress thisCellRange)
        {
            bool isMerged = false;
            var regionLists = GetMergedCellRegion(sheet);

            foreach (var cellRangeAddress in regionLists)
            {
                for (int i = cellRangeAddress.FirstRow; i <= cellRangeAddress.LastRow; i++)
                {
                    if (rowIndex == i)
                    {
                        for (int j = cellRangeAddress.FirstColumn; j <= cellRangeAddress.LastColumn; j++)
                        {
                            if (cellIndex == j)
                            {
                                isMerged = true;
                                thisCellRange = cellRangeAddress;
                                break;
                            }
                            else
                            {
                                continue;
                            }
                        }
                    }
                    else
                    {
                        continue;
                    }
                }
            }
            return isMerged;
        }

        // 获取合并区域信息
        private List<CellRangeAddress> GetMergedCellRegion(ISheet sheet)
        {
            int mergedRegionCellCount = sheet.NumMergedRegions;
            var returnList = new List<CellRangeAddress>();

            for (int i = 0; i < mergedRegionCellCount; i++)
            {
                returnList.Add(sheet.GetMergedRegion(i));
            }

            return returnList;
        }

    }
}