using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using NPOI.HSSF.UserModel;
using System.IO;
using NPOI.SS.UserModel;
using System.Reflection;
using System.ComponentModel;
using System.Collections;
using System.Text.RegularExpressions;
using Aspose.Cells;
using Aspose.Cells.Drawing;
using System.Drawing.Imaging;
using System.Web;
using HtmlAgilityPack;
using System.Xml.Serialization;
using System.Data;
using NPOI.XSSF.UserModel;

namespace Angel.ExcelHelper
{
    public class NPOIHelper
    {
        /// <summary>
        /// 由DataSet导出Excel2003
        /// </summary>
        /// <param name="sourceTable">要导出数据的DataTable</param>
        /// <param name="sheetName">工作表名称</param>
        /// <returns>Excel工作表</returns>
        private static Stream ExportDataSetToExcel03(DataSet sourceDs, string sheetName)
        {
            HSSFWorkbook workbook = new HSSFWorkbook();
            MemoryStream ms = new MemoryStream();
            string[] sheetNames = sheetName.Split(',');
            for (int i = 0; i < sheetNames.Length; i++)
            {
                HSSFSheet sheet = (HSSFSheet)workbook.CreateSheet(sheetNames[i]);
                HSSFRow headerRow = (HSSFRow)sheet.CreateRow(0);
                // handling header.
                foreach (DataColumn column in sourceDs.Tables[i].Columns)
                    headerRow.CreateCell(column.Ordinal).SetCellValue(column.ColumnName);

                // handling value.
                int rowIndex = 1;

                foreach (DataRow row in sourceDs.Tables[i].Rows)
                {
                    HSSFRow dataRow = (HSSFRow)sheet.CreateRow(rowIndex);

                    foreach (DataColumn column in sourceDs.Tables[i].Columns)
                    {
                        dataRow.CreateCell(column.Ordinal).SetCellValue(row[column].ToString());
                    }

                    rowIndex++;
                }
            }
            workbook.Write(ms);
            ms.Flush();
            ms.Position = 0;

            workbook = null;
            return ms;
        }

        /// <summary>
        /// 由DataSet导出Excel2004
        /// </summary>
        /// <param name="sourceTable">要导出数据的DataTable</param>
        /// <param name="sheetName">工作表名称</param>
        /// <returns>Excel工作表</returns>
        private static Stream ExportDataSetToExcel07(DataSet sourceDs, string sheetName)
        {
            XSSFWorkbook workbook = new XSSFWorkbook();
            
            MemoryStream ms = new MemoryStream();
            string[] sheetNames = sheetName.Split(',');
            for (int i = 0; i < sheetNames.Length; i++)
            {
                XSSFSheet sheet = (XSSFSheet)workbook.CreateSheet(sheetNames[i]);
                XSSFRow headerRow = (XSSFRow)sheet.CreateRow(0);
                // handling header.
                foreach (DataColumn column in sourceDs.Tables[i].Columns)
                    headerRow.CreateCell(column.Ordinal).SetCellValue(column.ColumnName);

                // handling value.
                int rowIndex = 1;

                foreach (DataRow row in sourceDs.Tables[i].Rows)
                {
                    XSSFRow dataRow = (XSSFRow)sheet.CreateRow(rowIndex);

                    foreach (DataColumn column in sourceDs.Tables[i].Columns)
                    {
                        dataRow.CreateCell(column.Ordinal).SetCellValue(row[column].ToString());
                    }

                    rowIndex++;
                }
            }
            workbook.Write(ms);
            ms.Flush();
            ms.Position = 0;

            workbook = null;
            return ms;
        }

        /// <summary>
        /// 由DataSet导出Excel
        /// </summary>
        /// <param name="sourceTable">要导出数据的DataTable</param>
        /// <param name="fileName">指定Excel工作表名称</param>
        /// <returns>Excel工作表</returns>
        public static void ExportDataSetToExcel(DataSet sourceDs, string fileName, string sheetName)
        {
            MemoryStream ms = null;
            if (fileName.IndexOf(".xlsx") > 0)
            {
                ms = ExportDataSetToExcel07(sourceDs, sheetName) as MemoryStream;
            }
            else if (fileName.IndexOf(".xls") > 0)
            {
                ms = ExportDataSetToExcel03(sourceDs, sheetName) as MemoryStream;
            }
            /*HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
            HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment;filename=" + fileName);
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.BinaryWrite(ms.GetBuffer());
            HttpContext.Current.Response.End();
            ms.Close();
            ms = null;*/

            using (FileStream fs = new FileStream(fileName, FileMode.Create, FileAccess.Write))
            {
                byte[] data = ms.ToArray();

                fs.Write(data, 0, data.Length);
                fs.Flush();
                ms.Close();
                ms = null;
                data = null;
            }
        }
        /// <summary>
        ///反序列化单个实体类
        /// </summary>
        /// <typeparam name="T">实体类</typeparam>
        /// <param name="filePath">完整路径</param>
        /// <param name="sheetName">工作表明</param>
        /// <param name="list"></param>
        /// <param name="message">验证消息列表</param>
        /// <returns></returns>
        public static T DeserializeExcelToModel<T>(string filePath, string sheetName, IList<item> list, ref ArrayList message) where T : new()
        {
            StringBuilder str = new StringBuilder();
            using (FileStream fs = new FileStream(filePath, FileMode.Open))
            {
                HSSFWorkbook wb = new HSSFWorkbook(fs);
                ISheet sht = wb.GetSheet(sheetName);
                int rowIndex;
                int colIndex;
                string value;
                T model = new T();
                //得到类型
                Type type = typeof(T);
                //取得属性集合
                PropertyInfo[] pi = type.GetProperties();
                foreach (PropertyInfo i in pi)
                {

                    IList<item> tempList = list.Where(item => item.modelname == i.Name).Take(1).ToList<item>();
                    if (tempList.Count != 1)
                        continue;
                    Location.StrToRowIndexAndColIndex(tempList[0].location, out rowIndex, out colIndex);

                    Type t = Nullable.GetUnderlyingType(i.PropertyType) ?? i.PropertyType;

                    bool isValidator = true;
                    value = validatorValue(Convert.ToString(sht.GetRow(rowIndex - 1).GetCell(colIndex - 1)), tempList[0], ref message, ref isValidator);
                    try
                    {
                        if (isValidator)
                        {
                            object safeValue = (value == null) ? null : Convert.ChangeType(value, t);
                            i.SetValue(model, safeValue, null);
                        }

                    }
                    catch
                    {
                        continue;
                    }
                }
                return model;
            }

        }

        /// <summary>
        /// 反序列化为泛型集合
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="filePath"></param>
        /// <param name="startRowIndex"></param>
        /// <param name="sheetName"></param>
        /// <param name="list"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static List<T> DeserializeExcelToList<T>(string filePath, int startRowIndex, string sheetName, IList<item> list, ref ArrayList message) where T : new()
        {
            List<T> listT = new List<T>();
            try
            {
                using (FileStream fs = new FileStream(filePath, FileMode.Open))
                {
                    HSSFWorkbook wb = new HSSFWorkbook(fs);
                    ISheet sht = wb.GetSheet(sheetName);


                    int rowIndex;
                    int colIndex;
                    //取行Excel的最大行数
                    int rowsCount = sht.PhysicalNumberOfRows;
                    string value;


                    //得到类型
                    Type type = typeof(T);
                    //取得属性集合
                    PropertyInfo[] pi = type.GetProperties();

                    for (int rIndex = startRowIndex; rIndex < rowsCount; rIndex++)
                    {

                        T model = new T();
                        bool isValidatorModel = true;
                        foreach (item item in list)
                        {

                            PropertyInfo[] tempPi = pi.Where(p => p.Name == item.modelname).Take(1).ToArray<PropertyInfo>();
                            if (tempPi.Length != 1)
                                continue;
                            Location.StrToRowIndexAndColIndex(item.location + rIndex, out rowIndex, out colIndex);

                            Type t = Nullable.GetUnderlyingType(tempPi[0].PropertyType) ?? tempPi[0].PropertyType;

                            bool isValidator = true;


                            value = validatorValue(Convert.ToString(sht.GetRow(rowIndex - 1).GetCell(colIndex - 1)), item, sheetName, rIndex, ref message, ref isValidator);
                            try
                            {
                                if (isValidator)
                                {
                                    object safeValue = (value == null) ? null : Convert.ChangeType(value, t);
                                    tempPi[0].SetValue(model, safeValue, null);
                                }
                                else
                                {
                                    isValidatorModel = false;
                                    break;
                                }

                            }
                            catch
                            {
                                isValidatorModel = false;
                                continue;
                            }
                        }

                        if (isValidatorModel)
                        {
                            listT.Add(model);
                            message.Add(string.Format("{0},第{1}行,通过验证!", sheetName, rIndex));
                        }
                    }
                    return listT;


                }
            }
            catch (Exception ex)
            {

                message.Add(ex.Message);
                return listT;
            }




        }

        /// <summary>
        /// sheet内容转富文本
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="sheetNameArr"></param>
        /// <returns></returns>
        public static Hashtable ExcelSheetRichTextToFCKRickText(string filePath, string[] sheetNameArr)
        {
            byte[] byteArr;
            Workbook workbook;
            string[] docSheetNameArr;

            using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                int nBytes = (int)fs.Length;//计算流的长度
                byteArr = new byte[nBytes];//初始化用于MemoryStream的Buffer
                int nBytesRead = fs.Read(byteArr, 0, nBytes);//将File里的内容一次性的全部读到byteArray中去

            }
            using (MemoryStream ms = new MemoryStream(byteArr))
            {
                workbook = new Workbook(ms);
                string sname = "";
                for (int i = 0; i < workbook.Worksheets.Count; i++)
                    sname += workbook.Worksheets[i].Name + ",";
                docSheetNameArr = sname.Substring(0, sname.Length - 1).Split(',');

            }
            string imagesDir = Path.Combine(HttpContext.Current.Server.MapPath("Files"), "Images");

            if (!Directory.Exists(imagesDir))
            {
                Directory.CreateDirectory(imagesDir);

            }
            HtmlSaveOptions option = new HtmlSaveOptions(SaveFormat.Html);
            option.AttachedFilesUrlPrefix = "/Files/";
            option.ParseHtmlTagInCell = true;
            option.ValidateMergedAreas = true;
            option.CachedFileFolder = imagesDir;
            string htmlFileName = Guid.NewGuid().ToString();

            workbook.Save(HttpContext.Current.Server.MapPath("~/Files/" + htmlFileName + ".html"), option);
            Hashtable hs = new Hashtable();



            foreach (string sheetName in sheetNameArr)
            {
                for (int i = 0; i < docSheetNameArr.Length; i++)
                {
                    if (sheetName == docSheetNameArr[i])
                    {

                        hs.Add(sheetName, HtmlFilesParseToOneHtml(HttpContext.Current.Server.MapPath("~/Files/" + htmlFileName + "_files/sheet00" + (i + 1) + ".htm"), htmlFileName));

                    }
                }
            }



            return hs;
        }

        /// <summary>
        /// 文件转二进制流
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static byte[] FileToBytes(string filePath)
        {
            byte[] byteArr;
            using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                int nBytes = (int)fs.Length;//计算流的长度
                byteArr = new byte[nBytes];//初始化用于MemoryStream的Buffer
                int nBytesRead = fs.Read(byteArr, 0, nBytes);//将File里的内容一次性的全部读到byteArray中去

            }
            return byteArr;

        }

        /// <summary>
        /// 合并html和css文件单html文件
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="parentHtmlFileName"></param>
        /// <returns></returns>
        public static string HtmlFilesParseToOneHtml(string filePath, string parentHtmlFileName)
        {

            using (MemoryStream htmlMs = new MemoryStream(FileToBytes(filePath)))
            {
                HtmlDocument html = new HtmlDocument();
                html.Load(htmlMs);


                foreach (var script in html.DocumentNode.Descendants("script").ToArray())
                {
                    script.Remove();
                }

                foreach (var outStyle in html.DocumentNode.Descendants("link").ToArray())
                {
                    HtmlAttribute att = outStyle.Attributes["href"];
                    if (att.Value.Substring(att.Value.Length - 4, 4) == ".css")
                    {
                        StreamReader sr = new StreamReader(HttpContext.Current.Server.MapPath("~/Files/" + parentHtmlFileName + "_files/" + att.Value));
                        string cssContet = sr.ReadToEnd();
                        sr.Close();
                        sr.Dispose();


                        var outStyleElement = new HtmlNode(HtmlNodeType.Element, html, 0);
                        outStyleElement.Name = "style";
                        outStyleElement.InnerHtml = cssContet;

                        outStyle.ParentNode.ChildNodes.Add(outStyleElement);

                    }

                    outStyle.Remove();
                }
                string src;

                foreach (var img in html.DocumentNode.SelectNodes("//img[@src]"))
                {
                    src = img.Attributes["src"].Value;
                    if (!string.IsNullOrEmpty(src))
                    {

                        if (src.Substring(src.Length - 4, 4) == ".emf")
                        {
                            Bitmap bmp = new Bitmap(new Metafile(HttpContext.Current.Server.MapPath("~/Files/" + parentHtmlFileName + "_files/" + src)));

                            bmp.Save(
                                HttpContext.Current.Server.MapPath("~/Files/" + parentHtmlFileName + "_files/" + src.Substring(0, src.LastIndexOf('.')) + ".jpg"
                                )
                                    );

                            src = "/Files/" + parentHtmlFileName + "_files/" + src.Substring(0, src.LastIndexOf('.')) + ".jpg";
                        }
                        else
                        {
                            src = "/Files/" + parentHtmlFileName + "_files/" + src;
                        }


                    }
                }


                return html.DocumentNode.OuterHtml;


            }

        }

        #region  数据验证部分

        /// <summary>
        /// 数据验证类
        /// </summary>
        /// <param name="value"></param>
        /// <param name="model"></param>
        /// <param name="a"></param>
        /// <param name="isValidator"></param>
        /// <returns></returns>
        public static string validatorValue(string value, item model, ref ArrayList a, ref bool isValidator)
        {

            #region 对excel值进行转换

            if (model.texts != "" && model.values != "" && value != "")
            {
                string[] texts = model.texts.Split('~');
                string[] values = model.values.Split('~');
                int index;
                if (model.multiselect == "1")
                {
                    StringBuilder sb = new StringBuilder();
                    string[] excelValues = value.Split(',');

                    for (int i = 0; i < excelValues.Length; i++)
                    {
                        if (texts.Contains(excelValues[i]))
                        {
                            index = Array.IndexOf(texts, excelValues[i]);
                            sb.Append(values[index] + ",");

                        }
                        else
                        {
                            isValidator = false;
                            sb = null;
                            break;
                        }
                    }

                    if (sb != null)
                        value = sb.ToString().Remove(sb.ToString().Length - 1);


                }
                else if (model.multiselect == "0")
                {
                    if (texts.Contains(value))
                    {
                        index = Array.IndexOf(texts, value);
                        value = values[index];
                    }
                    else
                    {
                        isValidator = false;
                    }
                }
            }

            #endregion

            #region 对值进行验证
            if (isValidator)
            {
                validator[] v = model.validators;
                if (v != null)
                {
                    foreach (validator item in v)
                    {
                        if (!isValidator)
                        {
                            break;
                        }
                        switch (item.type)
                        {
                            case "Required":
                                isValidator = Required(value, item);
                                if (!isValidator)
                                {
                                    a.Add(item.message);
                                }
                                break;

                            case "StringLength":
                                isValidator = StringLength(value, item);
                                if (!isValidator)
                                {
                                    a.Add(item.message);
                                }
                                break;

                            case "Range":
                                isValidator = Range(value, item, model.type);
                                if (!isValidator)
                                {
                                    a.Add(item.message);
                                }
                                break;

                            case "RegularExpression":
                                isValidator = RegularExpression(value, item);
                                if (!isValidator)
                                {
                                    a.Add(item.message);
                                }
                                break;

                            default:
                                break;
                        }
                    }
                }
                else
                {
                    isValidator = DataTypeValidator(value, model.type);
                    if (!isValidator)
                        a.Add("'" + model.chinesename + "'" + "不是要求的数据类型");
                }

            }
            else
            {
                return value;
            }

            return value;



            #endregion

        }

        /// <summary>
        /// 数据验证类，适用于有多个sheet进行校验
        /// </summary>
        /// <param name="value"></param>
        /// <param name="model"></param>
        /// <param name="a"></param>
        /// <param name="isValidator"></param>
        /// <returns></returns>
        public static string validatorValue(string value, item model, string sheetName, int rowindex, ref ArrayList a, ref bool isValidator)
        {

            #region 对excel值进行转换

            if (model.texts != "" && model.values != "" && value != "")
            {
                string[] texts = model.texts.Split('~');
                string[] values = model.values.Split('~');
                int index;
                if (model.multiselect == "1")
                {
                    StringBuilder sb = new StringBuilder();
                    string[] excelValues = value.Split(',');

                    for (int i = 0; i < excelValues.Length; i++)
                    {
                        if (texts.Contains(excelValues[i].Trim()))
                        {
                            index = Array.IndexOf(texts, excelValues[i].Trim());
                            sb.Append(values[index] + ",");

                        }
                        else
                        {
                            isValidator = false;
                            sb = null;
                            break;
                        }
                    }

                    if (sb != null)
                        value = sb.ToString().Remove(sb.ToString().Length - 1);


                }
                else if (model.multiselect == "0")
                {
                    if (texts.Contains(value.Trim()))
                    {
                        index = Array.IndexOf(texts, value.Trim());
                        value = values[index];
                    }
                    else
                    {
                        isValidator = false;
                    }
                }
            }

            #endregion

            #region 对值进行验证
            if (isValidator)
            {
                validator[] v = model.validators;
                //if (v != null)
                //{
                    foreach (validator item in v)
                    {
                        if (!isValidator)
                        {
                            break;
                        }
                        switch (item.type)
                        {
                            case "Required":
                                isValidator = Required(value, item);
                                if (!isValidator)
                                {
                                    a.Add(string.Format("{0},第{1}行," + item.message, sheetName, rowindex));
                                }
                                break;

                            case "StringLength":
                                isValidator = StringLength(value, item);
                                if (!isValidator)
                                {
                                    a.Add(string.Format("{0},第{1}行," + item.message, sheetName, rowindex));
                                }
                                break;

                            case "Range":
                                isValidator = Range(value, item, model.type);
                                if (!isValidator)
                                {
                                    a.Add(string.Format("{0},第{1}行," + item.message, sheetName, rowindex));
                                }
                                break;

                            case "RegularExpression":
                                isValidator = RegularExpression(value, item);
                                if (!isValidator)
                                {
                                    a.Add(string.Format("{0},第{1}行," + item.message, sheetName, rowindex));
                                }
                                break;

                            default:
                                break;
                        }
                    }
                //}
                //else
                //{

                if (isValidator)
                {
                    isValidator = DataTypeValidator(value, model.type);
                    if (!isValidator)
                        a.Add(string.Format("{0},第{1}行,'" + model.chinesename + "'" + "不是要求的数据类型", sheetName, rowindex));
                }
                   
                //}

            }
            //else
            //{
            //    return value;
            //}

            return value;



            #endregion

        }

        #region  数据验证类型

        public static bool DataTypeValidator(string value, string strType)
        {
            if (string.IsNullOrEmpty(value)) return true;
            try
            {
                Type T = Type.GetType(strType);
                Convert.ChangeType(value, T);
                return true;
            }
            catch
            {

                return false;
            }



        }


        public static bool Required(string str, validator model)
        {
            if (string.IsNullOrEmpty(str))
            {
                return false;
            }
            else
            {
                return true;
            }

        }


        public static bool StringLength(string str, validator model)
        {
            if (string.IsNullOrEmpty(str)) return true;
            bool isAccord = true;
            if (!string.IsNullOrEmpty(model.maxlength))
            {
                if (str.Length > int.Parse(model.maxlength))
                {

                    isAccord = false;
                }
            }

            if (!string.IsNullOrEmpty(model.minlength))
            {
                if (str.Length < int.Parse(model.minlength))
                {

                    isAccord = false;
                }
            }

            return isAccord;
        }


        public static bool Range(string str, validator model, string type)
        {
            if (string.IsNullOrEmpty(str)) return true;
            bool isAccord = true;
            switch (type)
            {
                case "Double":
                    Double d;
                    isAccord = Double.TryParse(str, out d);
                    if (!isAccord)
                    {
                        break;
                    }
                    if (!string.IsNullOrEmpty(model.maxvalue))
                    {
                        isAccord = double.Parse(model.maxvalue) > d;
                        if (!isAccord)
                        {
                            break;
                        }

                    }
                    if (!string.IsNullOrEmpty(model.minvalue))
                    {


                        isAccord = double.Parse(model.minvalue) < d;

                    }
                    break;
                case "int":
                    int i;
                    isAccord = int.TryParse(str, out i);
                    if (!isAccord)
                    {
                        break;
                    }
                    if (!string.IsNullOrEmpty(model.maxvalue))
                    {
                        isAccord = int.Parse(model.maxvalue) > i;
                        if (!isAccord)
                        {
                            break;
                        }

                    }
                    if (!string.IsNullOrEmpty(model.minvalue))
                    {


                        isAccord = int.Parse(model.minvalue) < i;

                    }
                    break;
                case "DateTime":
                    DateTime dt;
                    isAccord = DateTime.TryParse(str, out dt);
                    if (!isAccord)
                    {
                        break;
                    }
                    if (!string.IsNullOrEmpty(model.maxvalue))
                    {
                        isAccord = DateTime.Parse(model.maxvalue) > dt;
                        if (!isAccord)
                        {
                            break;
                        }

                    }
                    if (!string.IsNullOrEmpty(model.minvalue))
                    {


                        isAccord = DateTime.Parse(model.minvalue) < dt;

                    }
                    break;
                default:

                    break;
            }
            return isAccord;

        }


        public static bool RegularExpression(string str, validator model)
        {
            if (string.IsNullOrEmpty(str)) return true;
            Regex regex = new Regex(model.art);
            return regex.IsMatch(str);
        }

        #endregion
        #endregion

        /// <summary>
        /// 判断有无sheet
        /// </summary>
        /// <param name="sheetName"></param>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public static bool IsHaveSheets(string sheetName, string filePath, bool isMany)
        {
            bool isHave = true;

            using (FileStream fs = new FileStream(filePath, FileMode.Open))
            {
                HSSFWorkbook wb = new HSSFWorkbook(fs);

                if (isMany)
                {
                    string[] arr_sheet = sheetName.Split('~');
                    foreach (string s in arr_sheet)
                    {
                        ISheet sht = wb.GetSheet(s);
                        if (sht == null)
                        {
                            isHave = false;
                            break;
                        }
                    }
                }
                else
                {

                    ISheet sht = wb.GetSheet(sheetName);
                    if (sht == null)
                    {
                        isHave = false;
                    }

                }

            }

            return isHave;

        }


        /// <summary>
        /// model导出为sheet
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sheetName"></param>
        /// <param name="list"></param>
        /// <param name="model"></param>
        /// <param name="hssfWorkbook"></param>
        public static void ExportByModel<T>(string sheetName, IList<item> list, T t, HSSFWorkbook hssfWorkbook)
            where T : new()
        {
            ISheet sheet1 = hssfWorkbook.GetSheet(sheetName);
            T model = new T();
            //得到类型
            Type type = typeof(T);
            //取得属性集合
            PropertyInfo[] pi = type.GetProperties();
            int rowIndex;
            int colIndex;

            foreach (PropertyInfo i in pi)
            {

                IList<item> tempList = list.Where(item => item.modelname == i.Name).Take(1).ToList<item>();
                if (tempList.Count != 1)
                    continue;
                Location.StrToRowIndexAndColIndex(tempList[0].location, out rowIndex, out colIndex);

                object value = i.GetValue(t, null);

                if (sheet1.GetRow(rowIndex - 1) == null)
                {
                    sheet1.CreateRow(rowIndex - 1)
                        .CreateCell(colIndex - 1)
                        .SetCellValue(GetDisplayValue(tempList[0], Convert.ToString(value)));
                }
                else
                {
                    if (sheet1.GetRow(rowIndex - 1).GetCell(colIndex - 1) == null)
                    {
                        sheet1.GetRow(rowIndex - 1)
                            .CreateCell(colIndex - 1)
                            .SetCellValue(GetDisplayValue(tempList[0], Convert.ToString(value)));
                    }
                    else
                    {
                        sheet1.GetRow(rowIndex - 1)
                            .GetCell(colIndex - 1)
                            .SetCellValue(GetDisplayValue(tempList[0], Convert.ToString(value)));
                    }
                }

            }



        }






        /// <summary>
        /// list导出为sheet
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sheetName"></param>
        /// <param name="list"></param>
        /// <param name="listT"></param>
        /// <param name="hssfWorkbook"></param>
        /// <returns></returns>
        public static void ExportByList<T>(string sheetName, int startIndex, IList<item> list, IList<T> listT, HSSFWorkbook hssfWorkbook) where T : new()
        {
            ISheet sheet1 = hssfWorkbook.GetSheet(sheetName);
            T model = new T();
            //得到类型
            Type type = typeof(T);
            //取得属性集合
            PropertyInfo[] pi = type.GetProperties();
            int colIndex;


            for (int i = 0; i < list.Count; i++)
            {
                item itemModel = new item();
                itemModel = list[i];
                PropertyInfo[] tempPi = pi.Where(p => p.Name == itemModel.modelname).Take(1).ToArray<PropertyInfo>();
                if (tempPi.Length != 1)
                    continue;
                colIndex = Location.WordToNumber(itemModel.location) - 1;
                for (int j = 0; j < listT.Count; j++)
                {
                    object value = tempPi[0].GetValue(listT[j], null);

                    if (sheet1.GetRow(j + startIndex) == null)
                    {
                        sheet1.CreateRow(j + startIndex).CreateCell(colIndex).SetCellValue(GetDisplayValue(list[i], Convert.ToString(value)));
                    }
                    else
                    {
                        if (sheet1.GetRow(j + startIndex).GetCell(colIndex) == null)
                        {
                            sheet1.GetRow(j + startIndex).CreateCell(colIndex).SetCellValue(GetDisplayValue(list[i], Convert.ToString(value)));
                        }
                        else
                        {
                            sheet1.GetRow(j + startIndex).GetCell(colIndex).SetCellValue(GetDisplayValue(list[i], Convert.ToString(value)));
                        }
                    }

                }
            }


        }

        public static string GetDisplayValue(item model, string value)
        {
            if (string.IsNullOrEmpty(value))
                return value;
            string displayValue = "";
            if (model.texts != "" && model.values != "")
            {
                string[] texts = model.texts.Split('~');
                string[] values = model.values.Split('~');
                int index;
                if (model.multiselect == "1")
                {
                    StringBuilder sb = new StringBuilder();
                    string[] modelValues = value.Split(',');

                    for (int i = 0; i < modelValues.Length; i++)
                    {
                        if (values.Contains(modelValues[i]))
                        {
                            index = Array.IndexOf(values, modelValues[i]);
                            sb.Append(texts[index] + ",");

                        }
                    }

                    if (!string.IsNullOrEmpty(sb.ToString()))
                        displayValue = sb.ToString().Remove(sb.ToString().Length - 1);


                }
                else if (model.multiselect == "0")
                {
                    if (values.Contains(value))
                    {
                        index = Array.IndexOf(values, value);
                        displayValue = texts[index];
                    }

                }
            }
            else
            {
                displayValue = value;
            }


            return displayValue;

        }




    }



    #region  xml模板引擎实体类
    [Serializable]
    public class item
    {
        [XmlAttribute("location")]
        public string location { get; set; }

        [XmlAttribute("chinesename")]
        public string chinesename { get; set; }

        [XmlAttribute("modelname")]
        public string modelname { get; set; }


        [XmlAttribute("type")]
        public string type { get; set; }

        [XmlAttribute("defaultValue")]
        public string defaultValue { get; set; }

        [XmlAttribute("texts")]
        public string texts { get; set; }

        [XmlAttribute("values")]
        public string values { get; set; }

        [XmlAttribute("multiselect")]
        public string multiselect { get; set; }

        [XmlElement(ElementName = "validator", IsNullable = true)]
        public validator[] validators { get; set; }

    }

    public class validator
    {
        [XmlAttribute("property")]
        public string property { get; set; }

        [XmlAttribute("type")]
        public string type { get; set; }

        [XmlAttribute("message")]
        public string message { get; set; }

        [XmlAttribute("maxlength")]
        public string maxlength { get; set; }

        [XmlAttribute("minlength")]
        public string minlength { get; set; }

        [XmlAttribute("minvalue")]
        public string minvalue { get; set; }

        [XmlAttribute("maxvalue")]
        public string maxvalue { get; set; }

        [XmlAttribute("art")]
        public string art { get; set; }


    }
    #endregion


    #region  excel英文列索引装换为数字索引
    public class Location
    {
        /// <summary>
        /// 将Excel下标转化为index
        /// </summary>
        /// <param name="str"></param>
        /// <param name="RowIndex"></param>
        /// <param name="ColIndex"></param>
        public static void StrToRowIndexAndColIndex(string str, out int RowIndex, out int ColIndex)
        {
            try
            {
                if (!string.IsNullOrEmpty(str))
                {
                    int index = 0;
                    char[] strArr = str.ToUpper().ToCharArray();
                    for (int i = 0; i < strArr.Length; i++)
                    {
                        if (strArr[i] < 65)
                        {
                            index = i;
                            break;
                        }
                    }
                    RowIndex = int.Parse(str.Substring(index, str.Length - index));
                    ColIndex = WordToNumber(str.Substring(0, index));
                }
                else
                {
                    RowIndex = -1;
                    ColIndex = -1;
                }
            }
            catch
            {

                RowIndex = -1;
                ColIndex = -1;
            }

        }


        /// <summary>
        /// excel英文列名转化为数字
        /// </summary>
        /// <param name="word"></param>
        /// <returns></returns>
        public static int WordToNumber(string word)
        {
            try
            {
                if (!string.IsNullOrEmpty(word) && word.Length < 3)
                {
                    int number = 0;
                    char[] wordArr = word.ToUpper().ToCharArray();
                    if (wordArr.Length == 1)
                    {
                        number = wordArr[wordArr.Length - 1] - 64;
                    }
                    else
                    {
                        number = number = (wordArr[0] - 64) * 26 + wordArr[wordArr.Length - 1] - 64;
                    }

                    return number;


                }
                else
                {
                    return -1;
                }
            }
            catch
            {

                return -1;
            }



        }
    }

    #endregion





}
