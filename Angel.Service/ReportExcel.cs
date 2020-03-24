using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.IO;
using System.Web;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HPSF;
using NPOI.HSSF.Util;
using NPOI.SS.Util;
using System.Xml;
using Angel.DBHelper;
using System.Text.RegularExpressions;
using Angel.ExcelHelper;

namespace Angel.Service
{
    /*************************************************************************
     * 文件名称 ：ExcelRender.cs                          
     * 描述说明 ：NPOI操作实现类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    /// <summary>
    /// 使用NPOI操作Excel，无需Office COM组件
    /// </summary>
    public class ReportExcel
    {
        string date = DateTime.Now.ToString("yyyyMMddhhmmss");
        //private string fileName = "全覆盖10维度评估体系.xlsx"; //文件名
        private HSSFWorkbook workbook = null;
        private FileStream fs = null;

        /// <summary>
        /// 根据Excel列类型获取列的值
        /// </summary>
        /// <param name="cell">Excel列</param>
        /// <returns></returns>
        private static string GetCellValue(ICell cell)
        {
            if (cell == null)
                return string.Empty;
            switch (cell.CellType)
            {
                case CellType.Blank:
                    return string.Empty;
                case CellType.Boolean:
                    return cell.BooleanCellValue.ToString();
                case CellType.Error:
                    return cell.ErrorCellValue.ToString();
                case CellType.Numeric:
                case CellType.Unknown:
                default:
                    return cell.ToString();//This is a trick to get the correct value of the cell. NumericCellValue will return a numeric value no matter the cell value is a date or a number
                case CellType.String:
                    return cell.StringCellValue;
                case CellType.Formula:
                    try
                    {
                        HSSFFormulaEvaluator e = new HSSFFormulaEvaluator(cell.Sheet.Workbook);
                        e.EvaluateInCell(cell);
                        return cell.ToString();
                    }
                    catch
                    {
                        return cell.NumericCellValue.ToString();
                    }
            }
        }

        /// <summary>
        /// 自动设置Excel列宽
        /// </summary>
        /// <param name="sheet">Excel表</param>
        private static void AutoSizeColumns(ISheet sheet)
        {
            if (sheet.PhysicalNumberOfRows > 0)
            {
                IRow headerRow = sheet.GetRow(0);

                for (int i = 0, l = headerRow.LastCellNum; i < l; i++)
                {
                    sheet.AutoSizeColumn(i);
                }
            }
        }

        /// <summary>
        /// 自动设置中文的Excel列宽
        /// </summary>
        /// <param name="sheet">Excel表</param>
        /// <param name="startRowNum">需要计算每行每列中文Cell宽度的起始行数</param>
        /// <param name="endRowNum">需要计算每行每列中文Cell宽度的结束行数</param>
        private static void AutoSizeChineseCols(ISheet sheet, int startRowNum, int endRowNum, int shift)
        {
            if (sheet.PhysicalNumberOfRows > 0)
            {
                int maxColumn = sheet.GetRow(0).LastCellNum;
                //获取当前列的宽度，然后对比本列的长度，取最大值  
                for (int columnNum = 0; columnNum <= maxColumn; columnNum++)
                {
                    int columnWidth = sheet.GetColumnWidth(columnNum) / 256 + shift;
                    for (int rowNum = startRowNum; rowNum <= endRowNum; rowNum++)
                    {
                        IRow currentRow;
                        //当前行未被使用过  
                        if (sheet.GetRow(rowNum) == null)
                        {
                            currentRow = sheet.CreateRow(rowNum);
                        }
                        else
                        {
                            currentRow = sheet.GetRow(rowNum);
                        }

                        if (currentRow.GetCell(columnNum) != null)
                        {
                            ICell currentCell = currentRow.GetCell(columnNum);
                            string curcell = currentCell.ToString();
                            int length = Encoding.Default.GetBytes(curcell).Length;
                            if (columnWidth < length)
                            {
                                columnWidth = length + shift;
                                if (columnWidth > 255)
                                    columnWidth = 255;
                            }
                        }
                    }
                    sheet.SetColumnWidth(columnNum, columnWidth * 256);
                }
            }
        }


        /// <summary>
        /// 保存Excel文档流到文件
        /// </summary>
        /// <param name="ms">Excel文档流</param>
        /// <param name="fileName">文件名</param>
        private static void SaveToFile(MemoryStream ms, string fileName)
        {
            using (FileStream fs = new FileStream(fileName, FileMode.Create, FileAccess.Write))
            {
                byte[] data = ms.ToArray();

                fs.Write(data, 0, data.Length);
                fs.Flush();

                data = null;
            }
        }

        /// <summary>
        /// 输出文件到浏览器
        /// </summary>
        /// <param name="ms">Excel文档流</param>
        /// <param name="context">HTTP上下文</param>
        /// <param name="fileName">文件名</param>
        private static void RenderToBrowser(MemoryStream ms, HttpContext context, string fileName)
        {
            if (context.Request.Browser.Browser == "IE")
                fileName = HttpUtility.UrlEncode(fileName);
            context.Response.AddHeader("Content-Disposition", "attachment;fileName=" + fileName);
            context.Response.BinaryWrite(ms.ToArray());
        }

        /// <summary>
        /// DataReader转换成Excel文档流
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        public static MemoryStream RenderToExcel(IDataReader reader)
        {
            MemoryStream ms = new MemoryStream();

            using (reader)
            {
                IWorkbook workbook = new HSSFWorkbook();
                ISheet sheet = workbook.CreateSheet();

                IRow headerRow = sheet.CreateRow(0);
                int cellCount = reader.FieldCount;

                // handling header.
                for (int i = 0; i < cellCount; i++)
                {
                    headerRow.CreateCell(i).SetCellValue(reader.GetName(i));
                }

                // handling value.
                int rowIndex = 1;
                while (reader.Read())
                {
                    IRow dataRow = sheet.CreateRow(rowIndex);

                    for (int i = 0; i < cellCount; i++)
                    {
                        dataRow.CreateCell(i).SetCellValue(reader[i].ToString());
                    }

                    rowIndex++;
                }

                AutoSizeColumns(sheet);

                workbook.Write(ms);
                ms.Flush();
                ms.Position = 0;
            }
            return ms;
        }

        /// <summary>
        /// DataReader转换成Excel文档流，并保存到文件
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="fileName">保存的路径</param>
        public static void RenderToExcel(IDataReader reader, string fileName)
        {
            using (MemoryStream ms = RenderToExcel(reader))
            {
                SaveToFile(ms, fileName);
            }
        }

        /// <summary>
        /// DataReader转换成Excel文档流，并输出到客户端
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="context">HTTP上下文</param>
        /// <param name="fileName">输出的文件名</param>
        public static void RenderToExcel(IDataReader reader, HttpContext context, string fileName)
        {
            using (MemoryStream ms = RenderToExcel(reader))
            {
                RenderToBrowser(ms, context, fileName);
            }
        }


        /// <summary>
        /// 向指标结果表添加数据，并设置样式
        /// </summary>
        /// <param name="dimSheets"></param>
        /// <param name="dimIdToName"></param>
        private static void setStyleOfDimSheets(List<ISheet> dimSheets, IWorkbook workbook, ICellStyle baseStyle)
        {
            ICellStyle style1 = workbook.CreateCellStyle();
            style1.CloneStyleFrom(baseStyle);
            IFont font1 = workbook.CreateFont();
            font1.Boldweight = (short)FontBoldWeight.Bold;
            font1.FontHeightInPoints = 10;
            font1.FontName = "微软雅黑";
            style1.SetFont(font1);

            ICellStyle colorStyle1 = workbook.CreateCellStyle();
            colorStyle1.CloneStyleFrom(style1);
            colorStyle1.FillForegroundColor = HSSFColor.Aqua.Index;
            colorStyle1.FillPattern = FillPattern.SolidForeground;
            colorStyle1.FillBackgroundColor = HSSFColor.Turquoise.Index;

            ICellStyle colorStyle2 = workbook.CreateCellStyle();
            colorStyle2.CloneStyleFrom(baseStyle);
            colorStyle2.FillForegroundColor = HSSFColor.Grey25Percent.Index;
            colorStyle2.FillPattern = FillPattern.SolidForeground;
            colorStyle2.FillBackgroundColor = HSSFColor.Grey25Percent.Index;

            ICellStyle colorStyle3 = workbook.CreateCellStyle();
            colorStyle3.CloneStyleFrom(baseStyle);
            colorStyle3.FillForegroundColor = HSSFColor.Pink.Index;
            colorStyle3.FillPattern = FillPattern.SolidForeground;
            colorStyle3.FillBackgroundColor = HSSFColor.Pink.Index;

            foreach (ISheet sheet in dimSheets)
            {
                //设置所有Cell的样式为水平、垂直居中
                int count = 0;
                foreach (IRow row in sheet)
                {
                    int cellCount = 0;
                    foreach (ICell cell in row)
                    {
                        if (count == 0)
                        {
                            if (cellCount == 0)
                                cell.CellStyle = style1;
                            else if (cellCount == row.LastCellNum - 1 || cellCount == row.LastCellNum - 2)
                                cell.CellStyle = colorStyle2;
                            else cell.CellStyle = colorStyle1;
                        }
                        else if (count < 3)
                            cell.CellStyle = style1;
                        else if (count == 3 || count == 4)
                        {
                            if (cellCount == 0)
                                cell.CellStyle = style1;
                            else if ((cellCount % 6 == 2 || cellCount % 6 == 3 || cellCount % 6 == 4) && cellCount != 0)
                                cell.CellStyle = colorStyle2;
                            else if ((cellCount % 6 == 5 || cellCount % 6 == 0) && cellCount != 0)
                                cell.CellStyle = colorStyle3;
                            else cell.CellStyle = baseStyle;
                        }
                        else
                            cell.CellStyle = baseStyle;
                        cellCount++;
                    }
                    count++;
                }
                sheet.CreateFreezePane(0, 8, 0, 9);
                AutoSizeChineseCols(sheet, 3, 4, 2);
            }
        }


        /// <summary>
        /// 初始化指标结果表，并设置样式
        /// </summary>
        /// <param name="table"></param>
        private static void InitialIndexResultTable(HSSFWorkbook workbook, string sheetname)
        {
            ISheet sheet = workbook.CreateSheet(sheetname);
            ICellStyle style = workbook.CreateCellStyle();
            IFont font = workbook.CreateFont();
            font.FontHeightInPoints = 10;
            font.FontName = "微软雅黑";
            font.Boldweight = (short)FontBoldWeight.Bold;
            style.SetFont(font);
            style.VerticalAlignment = VerticalAlignment.Center;
            style.Alignment = HorizontalAlignment.Center;

            string[] cvalue = { "", "分值", "省份" };
            for (int i = 0; i < 3; i++)
            {
                IRow row = sheet.CreateRow(i);
                row.CreateCell(0).SetCellValue(cvalue[i]);
                row.GetCell(0).CellStyle = style;
            }

            //省份列
            string[] pro = { "安徽", "北京", "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆" };
            List<string> provinces = new List<string>();
            provinces.AddRange(pro);
            int pCount = 3;
            foreach (string province in provinces)
            {
                IRow row = sheet.CreateRow(pCount);
                row.CreateCell(0).SetCellValue(province);
                pCount++;
            }
        }

        /// <summary>
        /// 从tablein中取出不同维度不同指标的数据，分别存储起来,并按照城市ID来排序
        /// </summary>
        /// <param name="table"></param>
        private static Dictionary<string, DataTable> GetSortedDataTable(DataTable table, string filterName)
        {
            Dictionary<string, DataTable> indexDataTable = new Dictionary<string, DataTable>();//key是指标ID

            List<DataRow> tempData = new List<DataRow>();
            DataTable tempTable = new DataTable();
            int start = 0, end = 0, rCount = 0;
            string temp = "";//记录上一行的指标ID
            foreach (DataRow dr in table.Rows)//对dimDatable表进行存储
            {
                string dimId = dr[filterName].ToString();
                if (dimId == temp || table.Rows.Count == 1)//上下行相等，记录要存取的最后一行
                {
                    end = rCount;
                    tempData.Add(dr);
                    if (rCount == table.Rows.Count - 1)//最后一行，直接存取
                    {
                        tempTable = ListToDataTable(table, tempData);
                        indexDataTable.Add(temp, tempTable);
                        tempData.Clear();
                    }
                }
                else//上下行不等
                {
                    if (start != end)
                    {
                        tempTable = ListToDataTable(table, tempData);
                        indexDataTable.Add(temp, tempTable);
                        tempData.Clear();
                    }
                    start = rCount;
                    end = rCount;
                    temp = dimId;
                    tempData.Add(dr);
                }
                rCount++;
            }

            //按照城市ID来对indexDataTable表进行排序
            for (int len = 0; len < indexDataTable.Count; len++)
            {
                DataTable dt = indexDataTable.ElementAt(len).Value.Clone();
                dt.Columns["ID"].DataType = typeof(int);
                foreach (DataRow row in indexDataTable.ElementAt(len).Value.Rows)
                {
                    dt.ImportRow(row);
                }
                dt.DefaultView.Sort = "ID ASC";
                dt = dt.DefaultView.ToTable();
                indexDataTable[indexDataTable.ElementAt(len).Key] = dt;
            }

            return indexDataTable;
        }

        /// <summary>
        /// 初始化指标ID--指标名称的映射表
        /// </summary>
        /// <param name="table"></param>
        private static Dictionary<string, string> IndexIdToName()
        {
            Dictionary<string, string> indexIdToName = new Dictionary<string, string>();
            string in_sql = "select Indicatorid,Indicatorname from Angel_Indicator";
            DataTable ind = MySqlHelpers.GetDataTable(in_sql);
            for (int i = 0; i < ind.Rows.Count; i++)
            {
                indexIdToName.Add(ind.Rows[i][0].ToString(), ind.Rows[i][1].ToString());
            }

            //string fileName = "IndexIdToName.xml";
            //string filePath = AppDomain.CurrentDomain.BaseDirectory + "Config\\";//获取基目录
            //string file = filePath + fileName;
            //XmlDocument document = new XmlDocument();
            //document.Load(file);
            //XmlNode root = document.SelectSingleNode("/config");

            //if (root != null)
            //{
            //    XmlNodeList itemList = root.SelectNodes("item");
            //    string id = "", name = "";
            //    foreach (XmlNode item in itemList)
            //    {
            //        id = item.Attributes["id"].Value;
            //        name = item.Attributes["name"].Value;
            //        indexIdToName.Add(id, name);
            //    }

            //}
            return indexIdToName;
        }

        /// <summary>
        /// List<DataRow>转换成DataTable
        /// </summary>
        /// <param name="table"></param>
        private static DataTable ListToDataTable(DataTable oriDataTable, List<DataRow> tempData)
        {
            DataTable dt = new DataTable();

            foreach (DataColumn col in oriDataTable.Columns)
            {
                dt.Columns.Add(col.ColumnName);
            }

            foreach (var row in tempData)
            {
                dt.ImportRow(row);
            }
            return dt;
        }

        /// <summary>
        /// DataSet转换成Excel文档流
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public static MemoryStream RenderToExcel(DataSet ds)
        {
            MemoryStream ms = new MemoryStream();
            IWorkbook workbook = new HSSFWorkbook();
            for (int i = 0; i < ds.Tables.Count; i++)
            {
                DataTable table = ds.Tables[i];
                ISheet sheet = workbook.CreateSheet(table.TableName);

                IRow headerRow = sheet.CreateRow(0);

                // handling header.
                foreach (DataColumn column in table.Columns)
                    headerRow.CreateCell(column.Ordinal).SetCellValue(column.Caption);//If Caption not set, returns the ColumnName value

                // handling value.
                int rowIndex = 1;

                foreach (DataRow row in table.Rows)
                {
                    IRow dataRow = sheet.CreateRow(rowIndex);

                    foreach (DataColumn column in table.Columns)
                    {
                        dataRow.CreateCell(column.Ordinal).SetCellValue(row[column].ToString());
                    }

                    rowIndex++;
                }
                AutoSizeColumns(sheet);

                workbook.Write(ms);
                ms.Flush();
                ms.Position = 0;


            }
            return ms;
        }

        public static void DataSetToExcel(DataSet dataset, string filename, string sheetnames)
        {
            NPOIHelper.ExportDataSetToExcel(dataset, filename, sheetnames);
        }

        private static bool IsNumberic(string oText)
        {
            try
            {
                double var1 = Convert.ToDouble(oText);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
    /*************************************************************************
     * 文件名称 ：ExcelRender.cs                          
     * 描述说明 ：NPOI操作实现类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
