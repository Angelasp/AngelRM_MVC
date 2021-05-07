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





namespace Angel.Web.ControllersApi
{
    public class InPutApiController : BaseApiController
    {

        string _directory = System.AppDomain.CurrentDomain.BaseDirectory;


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
            sql = "{\"selectAllFileBak\":[{\"[@c0]\":\"" + where + "\",\"[@c1]\":" + filebak.offset + ",\"[@c2]\":" + filebak.rows + "}]}";
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