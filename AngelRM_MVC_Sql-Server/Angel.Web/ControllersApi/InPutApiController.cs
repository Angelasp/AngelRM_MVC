using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Angel.ExcelHelper;
using Angel.DataAccess;
using Angel.Service;
using Angel.Utils;
using Newtonsoft.Json.Linq;
using NPOI.HSSF.UserModel;
//li start
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

//using NPOI.OpenXmlFormats.Spreadsheet;
//li end

namespace Angel.Web.ControllersApi
{
    public class InPutApiController : BaseApiController
    {

        string _directory = System.AppDomain.CurrentDomain.BaseDirectory;

        /// <summary>获取数据模板管理列表</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // GET api/inputapi/post
        public HttpResponseMessage Post([FromBody]FileInfo param)
        {
            UtilFunction uf = new UtilFunction();
            /*BaseService bs = new BaseService();
            // 获取检索输入框的值(文件名)
            string filename = "";
            if (param.fileName != null && param.fileName.Trim().Length > 0)
            {
                filename = param.fileName.Trim();
            }
            // 组合分页SQL
            string limit = " LIMIT " + param.offset + "," + param.rows;
            // 总记录数
            string c0 = "{\"getFilesTotal\":[{\"[@c0]\":\"" + filename + "\"}]}";
            var list = Newtonsoft.Json.Linq.JObject.Parse(c0);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tabletotal = bs.GetDataTableToParamID(jarrays);

            // 当前页显示的信息集合
            c0 = "{\"getFiles\":[{\"[@c0]\":\"" + (limit) + "\",\"[@c1]\":\"" + filename + "\"}]}";
            list = Newtonsoft.Json.Linq.JObject.Parse(c0);
            jarrays.Clear();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tablelist = bs.GetDataTableToParamID(jarrays);

            // 返回查询结果
            Dictionary<string, object> map = new Dictionary<string, object>();
            if (tabletotal == null)
            {
                map.Add("total", 0);
            }
            else
            {
                map.Add("total", tabletotal.Rows[0]["total"]);
            }
            map.Add("rows", tablelist);*/

            string userid = string.IsNullOrEmpty(param.createUserName) ? UtilFunction.GetCookie("uid") : param.createUserName;
            string path = _directory + "UploadFiles/template/" + userid;
            int total = 0;
            DirectoryInfo folder = new DirectoryInfo(path);
            List<FileInfo> list = new List<FileInfo>();
            //string[] files = Directory.GetFiles(path);
            if (Directory.Exists(path))
            {
                System.IO.FileInfo[] files = folder.GetFiles("*.xlsx");
                foreach (System.IO.FileInfo file in files)
                {
                    total++;
                    FileInfo obj = new FileInfo();
                    obj.id = total;
                    obj.fileName = file.Name;
                    obj.createUserName = userid;
                    list.Add(obj);
                }
            }
            Dictionary<string, object> map = new Dictionary<string, object>();
            map.Add("total", total);
            map.Add("rows", list);
            string myjson = uf.ToJson(map);
            return GetJSONMessage(myjson);
        }
        
        // 上传数据模板
        // POST api/inputapi/upload
        public Object upload()
        {
            System.Web.HttpFileCollection _file = System.Web.HttpContext.Current.Request.Files;
            int count = 0;
            if (_file.Count > 0)
            {
                for (int i = 0; i < _file.Count; i++)
                {
                    //文件大小  
                    //long size = _file[i].ContentLength;
                    //文件类型  
                    //string type = _file[i].ContentType;
                    //文件名  
                    string _filename = _file[i].FileName;
                    //文件格式  
                    string _tp = System.IO.Path.GetExtension(_filename);

                    if (_tp.ToLower() == ".xlsx")
                    {
                        BaseService bs = new BaseService();
                        string userid = UtilFunction.GetCookie("uid");
                        string username = UtilFunction.GetCookie("uname");
                        string _directory2 = "UploadFiles/" + username;
                        string path = _directory + _directory2;
                        string key = null;
                        List<Object> parames = new List<Object>();
                        Dictionary<string, List<Object>> map = new Dictionary<string, List<Object>>();
                        //获取文件流  
                        //System.IO.Stream stream = _file[i].InputStream;
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }
                        path += "/" + _filename;
                        if (File.Exists(path))    // 如果当前用户下已有同名文件，则执行update操作
                        {
                            key = "updateFileInfo";
                            parames.Add(DateTime.Now);
                            parames.Add(userid);
                            parames.Add(username);
                            parames.Add(_filename);
                            parames.Add(userid);
                        }
                        else  // insert
                        {
                            key = "insertFileInfo";
                            parames.Add(_filename);
                            parames.Add(_directory2);
                            parames.Add(DateTime.Now);
                            parames.Add(userid);
                            parames.Add(username);
                        }
                        map.Add(key, parames);
                        // 上传文件
                        _file[i].SaveAs(path);
                        XSSFWorkbook workbook = new XSSFWorkbook(_file[i].InputStream);
                        int index = workbook.GetSheetIndex("填写模板");
                        if (index > -1)
                        {
                            // 上传记录入库
                            count = bs.InsUpdDelDataTableToParam(map);
                        }
                        else
                        {
                            File.Delete(path);
                            return new { error = "《" + _filename + "》文件中必须有一个sheet名叫“填写模板”!" };
                        }
                    }
                    else
                    {
                        return new { error = "《" + _filename + "》只允许上传后缀为.xlsx的文件!" };
                    }
                }

            }
            if (count > 0)
            {
                return new { msg = "数据模板上传成功!" };
            }
            else
            {
                return new { error = "数据模板上传失败!" };
            }

        }

        /// <summary>删除数据模板</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // REMOVE api/inputapi/remove
        public HttpResponseMessage remove([FromBody]List<FileInfo> list)
        {
            List<int> ids = new List<int>();
            // 删除文件
            foreach (FileInfo obj in list)
            {
                string filepath = _directory + obj.downLoadLink + "/" + obj.fileName;
                if (File.Exists(filepath))
                {
                    File.Delete(filepath);
                }
                ids.Add(obj.id);
            }
            // 删除数据库记录
            BaseService bs = new BaseService();
            List<Object> parames = new List<Object>();
            Dictionary<string, List<Object>> map = new Dictionary<string, List<Object>>();
            parames.Add(string.Join(",", ids));
            map.Add("deleteFileInfo", parames);
            int count = bs.InsUpdDelDataTableToParam(map);
            return GetJSONMessage("{count:" + count + "}");
        }

      



        /// <summary>获取当前用户存档管理列表</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // GET api/inputapi/postarchive
        public HttpResponseMessage PostArchive([FromBody]FileInfo param)
        {
            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            string userid = UtilFunction.GetCookie("uid");
            // 获取检索输入框的值(文件名)
            string filename = "";
            if (param.fileName != null && param.fileName.Trim().Length > 0)
            {
                filename = param.fileName.Trim();
            }
            // 总记录数
            string sql = "{\"getFileBakTotal\":[{\"[@c0]\":" + userid + ",\"[@c1]\":\"" + filename + "\",\"[@c2]\":\"" + param.type + "\"}]}";
            var list = Newtonsoft.Json.Linq.JObject.Parse(sql);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tabletotal = bs.GetDataTableToParamID(jarrays);

            // 当前页显示的信息集合
            sql = "{\"selectFileBak\":[{\"[@c0]\":" + userid + ",\"[@c1]\":\"" + filename + "\",\"[@c2]\":"+param.offset+",\"[@c3]\":" + param.rows + ",\"[@c4]\":\""+param.type+"\"}]}";
            list = Newtonsoft.Json.Linq.JObject.Parse(sql);
            jarrays.Clear();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tablelist = bs.GetDataTableToParamID(jarrays);

            // 返回查询结果
            Dictionary<string, object> map = new Dictionary<string, object>();
            if (tabletotal == null)
            {
                map.Add("total", 0);
            }
            else
            {
                map.Add("total", tabletotal.Rows[0]["total"]);
            }
            map.Add("rows", tablelist);
            string myjson = uf.ToJson(map);
            return GetJSONMessage(myjson);
        }

        /// <summary>上传文件存档管理列表</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // GET api/inputapi/postfilebak
        public HttpResponseMessage postFileBak([FromBody]FileInfo filebak)
        {
            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            string where = "";
            if (!string.IsNullOrEmpty(filebak.fileName))
            {
                where += " AND FileName LIKE '%" + filebak.fileName.Trim() + "%'";
            }
            if (!string.IsNullOrEmpty(filebak.createUserName))
            {
                where += " AND CreateUserName='" + filebak.createUserName.Trim() + "'";
            }
            if (!string.IsNullOrEmpty(filebak.type))
            {
                where += " AND Type=" + filebak.type;
            }
            // 总记录数
            string sql = "{\"getAllFileBakTotal\":[{\"[@c0]\":\"" + where + "\"}]}";
            var list = Newtonsoft.Json.Linq.JObject.Parse(sql);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tabletotal = bs.GetDataTableToParamID(jarrays);
            // 结果集
            sql = "{\"selectAllFileBak\":[{\"[@c0]\":\"" + where + "\",\"[@c1]\":" + filebak.offset / filebak.rows + ",\"[@c2]\":" + filebak.rows + "}]}";
            list = Newtonsoft.Json.Linq.JObject.Parse(sql);
            jarrays.Clear();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tablelist = bs.GetDataTableToParamID(jarrays);

            // 返回查询结果
            Dictionary<string, object> map = new Dictionary<string, object>();
            if (tabletotal == null)
            {
                map.Add("total", 0);
            }
            else
            {
                map.Add("total", tabletotal.Rows[0]["total"]);
            }
            map.Add("rows", tablelist);
            string myjson = uf.ToJson(map);
            return GetJSONMessage(myjson);
        }

        public Object removeFileBak([FromBody]List<FileInfo> data)
        {
            BaseService bs = new BaseService();
            List<int> ids = new List<int>();
            string path = System.AppDomain.CurrentDomain.BaseDirectory + "UploadFiles/";
            foreach (FileInfo fileinfo in data)
            {
                ids.Add(fileinfo.id);
                // 删除原始文件
                if (File.Exists(path + fileinfo.sysName))
                {
                    File.Delete(path + fileinfo.sysName);
                }
            }
            List<Object> parames = new List<Object>();
            Dictionary<string, List<Object>> map = new Dictionary<string, List<Object>>();
            parames.Add(string.Join(",", ids));
            map.Add("deleteFileBak", parames);
            int count = bs.InsUpdDelDataTableToParam(map);
            return new { count = count };
        }

        //<summary>
        //获取时间
        //</summary>
        // GET api/inputapi/getnopnumber
        public HttpResponseMessage GetNopNumber()
        {
            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            /*DataTable tablelist = bs.GetDataTableToID("getNopNumber");
            string myjson = uf.ToJson(tablelist);*/
            
            List<string> list = new List<string>();
            string sql = "SELECT _tmp.nop_number,MAX(_tmp.date) date FROM(";
            string s1 = "SELECT nop_number,MAX(ifnull(IndicatorModifyDate,IndicatorCreateDate)) AS date FROM ";
            string s2 = " GROUP BY nop_number";
            DataTable dtTableNames = bs.GetDataTableToID("getTableNames");
            foreach (DataRow row in dtTableNames.Rows)
            {
                list.Add(s1 + row["DimTableName"].ToString() + s2);
            }
            sql += string.Join(" UNION ALL ", list);
            sql += ") _tmp GROUP BY _tmp.nop_number ORDER BY date DESC";
            DataTable result = bs.GetResult(sql);
            list.Clear();
            string myjson = uf.ToJson(result);
            return GetJSONMessage(myjson);
        }

        // DOWNLOAD api/inputapi/download
        public HttpResponseMessage Download([FromBody]Params param)
        {

            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            if (param.number1 == null || param.number1.Trim().Length == 0)
            {                
                return GetJSONMessage("{success:'导出失败,请先选择期数!'}");
            }
            // 调用存储过程(集团+省)
            List<string> list = new List<string>();
            list.Add(param.number1);
            list.Add(param.number2);
            DataSet result = bs.GetDataSetRunProcedure("SP_CollectReportsData2", list, "CollectReports");
            result.Tables["CollectReports"].PrimaryKey = new DataColumn[] { result.Tables["CollectReports"].Columns["CITY_NO"] };

            // 拆解查询结果
            // 保存数据来源、月份
            DataSet dsHead = new DataSet();
            DataTable tableHead = result.Tables["CollectReports"].Clone();
            tableHead.ImportRow(result.Tables["CollectReports"].Rows[0]);
            tableHead.ImportRow(result.Tables["CollectReports"].Rows[1]);
            dsHead.Tables.Add(tableHead);

            // 保存数据主体部分(各城市对应的值)：根据城市名排序，并且将"全网"放到最后
            DataSet dsMain = new DataSet();
            DataTable tableMain = result.Tables["CollectReports"].Clone();
            int length = result.Tables["CollectReports"].Rows.Count;
            List<string> city = new List<string>();
            bool flag = true;
            if (string.IsNullOrEmpty(param.number2)) // 导出所有省
            {
                city.Add("安徽"); city.Add("北京");  city.Add("福建"); city.Add("甘肃");
                city.Add("广东"); city.Add("广西"); city.Add("贵州");  city.Add("海南");
                city.Add("河北");  city.Add("河南"); city.Add("黑龙江"); city.Add("湖北");
                city.Add("湖南"); city.Add("吉林"); city.Add("江苏"); city.Add("江西");
                city.Add("辽宁"); city.Add("内蒙古"); city.Add("宁夏"); city.Add("青海");
                city.Add("山东"); city.Add("山西"); city.Add("陕西"); city.Add("上海");
                city.Add("四川"); city.Add("天津"); city.Add("西藏"); city.Add("新疆");
                city.Add("云南"); city.Add("浙江"); city.Add("重庆"); city.Add("全网");
            }
            else // 按所选省份导出
            {
                param.number2 = param.number2.Replace("'", "");
                string[] array = param.number2.Split(',');
                flag = false;
                foreach (string s in array)
                {
                    if (s == "全网")
                    {
                        flag = true;
                        continue;
                    }
                    city.Add(s);
                }
                city.Sort();
                if (flag) city.Add("全网");
            }
            
            foreach (string c in city)
            {
                flag = true;
                for (int i = 2; i < length; i++)
                {
                    DataRow row = result.Tables["CollectReports"].Rows[i];
                    if (c == row["CITY_NO"].ToString())
                    {
                        flag = false;
                        tableMain.ImportRow(row);
                        break;
                    }
                }
                if (flag)
                {
                    DataRow row = tableMain.NewRow();
                    row["CITY_NO"] = c;
                    tableMain.Rows.Add(row);
                }
            }
            dsMain.Tables.Add(tableMain);

            // 合并数据来源、月份、主体
            dsHead.Merge(dsMain);
            // 导出Excel
            List<string> tempnames = new List<string>();
            //tempnames.Add("(国际)对标指标情况.xlsx");
            tempnames.Add("(国内)对标指标情况.xlsx");
            tempnames.Add("(业界)对标指标情况.xlsx");
            //tempnames.Add("11维度指标梳理情况.xlsx");
            tempnames.Add("11维度指标梳理情况v17-6-.xlsx");

            // 指标甄核规则
            Dictionary<string, DataRow> dicAuditRules = new Dictionary<string, DataRow>();
            DataTable tablelist = bs.GetDataTableToID("findAuditRules");
            foreach (DataRow row in tablelist.Rows)
            {
                dicAuditRules.Add(row["Indicatorid"].ToString(), row);
            }
            // 导出Excel
            ExportExcel(tempnames, dsHead, dicAuditRules);

            dsHead.Dispose();
            tableHead.Dispose();
            dsMain.Dispose();
            tableMain.Dispose();
            
            list.Clear();
            tempnames.Clear();
            // 调用存储过程(地市)
            list.Add(param.number1);
            list.Add("'" + string.Join("','", city) + "'");
            DataSet result2 = bs.GetDataSetRunProcedure("SP_CollectReportsData3", list, "CollectReports");
            result2.Tables["CollectReports"].PrimaryKey = new DataColumn[] { result2.Tables["CollectReports"].Columns["CITY_NO"] };

            // 拆解查询结果
            // 保存数据来源、月份
            DataSet dsHead2 = new DataSet();
            DataTable tableHead2 = result2.Tables["CollectReports"].Clone();
            tableHead2.ImportRow(result.Tables["CollectReports"].Rows[0]);
            tableHead2.ImportRow(result.Tables["CollectReports"].Rows[1]);
            dsHead2.Tables.Add(tableHead2);

            // 保存数据主体部分(各城市对应的值)：根据城市名排序，并且将"全网"放到最后
            DataSet dsMain2 = new DataSet();
            DataTable tableMain2 = result2.Tables["CollectReports"].Clone();
            length = result2.Tables["CollectReports"].Rows.Count;

            DataTable dtCity = null;
            string getCityByProvince = "getCityByProvince";
            foreach (string c in city)
            {
                dtCity = bs.GetResult(bs.getSQL(getCityByProvince, c));
                dtCity.PrimaryKey = new DataColumn[] { dtCity.Columns["name"] };
                tableMain2.ImportRow(result.Tables["CollectReports"].Rows.Find(c));
                for (int i = 0; i < length; i++)
                {
                    DataRow row = result2.Tables["CollectReports"].Rows[i];
                    if (dtCity.Rows.Contains(row["CITY_NO"].ToString()))
                    {
                        tableMain2.ImportRow(row);
                    }
                }
            }
            dsMain2.Tables.Add(tableMain2);

            // 合并数据来源、月份、主体
            dsHead2.Merge(dsMain2);


            tempnames.Add("省报地市指标情况.xlsx");
            // 导出Excel
            ExportExcel(tempnames, dsHead2, dicAuditRules);

            string message = "{success:'导出成功,请到右上角下载中心下载'}";
            return GetJSONMessage(message);
        }


        //<summary>
        //按模板方式导出无返回值
        //</summary>
        //<param name="TempNames">模板名称(N个模板)</param>
        //<param name="ds">DataSet</param>
        public void ExportExcel(List<string> TempNames, DataSet ds, Dictionary<string, DataRow> dicAuditRules)
        {
            SaveParameter sp = new SaveParameter(TempNames, ds, dicAuditRules);
            SaveExcel SaveExcel = new SaveExcel();
            SaveExcel.RunSave(sp);
            FileLog.WriteLog("测试(start)：SaveExcel.State=" + SaveExcel.State);
            while (true)
            {
                FileLog.WriteLogNotLine(".");
                if (SaveExcel.State > 1) return;
            }
        }

        /// <summary>获取季报管理列表</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // GET api/inputapi/Quarter
        public HttpResponseMessage postQuarter([FromBody]FileInfo param)
        {
            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            // 获取检索输入框的值(文件名)
            string filename = "";
            if (param.fileName != null && param.fileName.Trim().Length > 0)
            {
                filename = param.fileName.Trim();
            }
            // 组合分页SQL
            string limit = " LIMIT " + param.offset + "," + param.rows;
            // 总记录数
            string c0 = "{\"getQuarterFilesTotal\":[{\"[@c0]\":\"" + filename + "\"}]}";
            var list = Newtonsoft.Json.Linq.JObject.Parse(c0);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tabletotal = bs.GetDataTableToParamID(jarrays);

            // 当前页显示的信息集合
            c0 = "{\"getQuarterFiles\":[{\"[@c0]\":\"" + (limit) + "\",\"[@c1]\":\"" + filename + "\"}]}";
            list = Newtonsoft.Json.Linq.JObject.Parse(c0);
            jarrays.Clear();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tablelist = bs.GetDataTableToParamID(jarrays);

            // 返回查询结果
            Dictionary<string, object> map = new Dictionary<string, object>();
            if (tabletotal == null)
            {
                map.Add("total", 0);
            }
            else
            {
                map.Add("total", tabletotal.Rows[0]["total"]);
            }
            map.Add("rows", tablelist);
            string myjson = uf.ToJson(map);
            return GetJSONMessage(myjson);
        }
        public void FolderCreate(string Path)
        {
            // 判断目标目录是否存在如果不存在则新建 
            if (!Directory.Exists(Path))
                Directory.CreateDirectory(Path);
        }
    }
    public class FileInfo
    {
        public int id { get; set; }
        public string fileName { get; set; }
        public string sysName { get; set; }
        public string downLoadLink { get; set; }
        public string createUserName { get; set; }
        public string modifyUserName { get; set; }
        public string type { get; set; }
        // 每页多少条数据
        public int rows { get; set; }
        // 请求第几页
        public int offset { get; set; }
    }

}