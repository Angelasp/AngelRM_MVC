using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using Angel.Utils;
using System.Linq;
using Angel.DataAccess;
using Angel.Service;

namespace Angel.Web.ControllersApi
{
    // 数据上报
    public class DataReportApiController : BaseApiController
    {
        public class MyException : ApplicationException
        {
            //public MyException(){}  
            public MyException(string message) : base(message) { }

            public override string Message
            {
                get
                {
                    return base.Message;
                }
            }
        }

        string _directory = System.AppDomain.CurrentDomain.BaseDirectory;
        string error_msg = "";
        public class Parameter
        {
            public string tablename { get; set; }
            public int id { get; set; }
            public string ids { get; set; }
            public string uFileName { get; set; }
            public string batch { get; set; } // 批次号
            public string indicatorid { get; set; }
            public string noP_NUMBER { get; set; }
            public string last_NOP_NUMBER { get; set; }
            public string citY_NO { get; set; }
            public string sourcename { get; set; }
            public string newValue { get; set; }
            public string iData { get; set; }
            public string source { get; set; }
            public string red_start { get; set; }
            public string red_end { get; set; }
            public int createUserId { get; set; }
            public string createUserName { get; set; }
            public int status { get; set; } // -1=未提交、0=提交审核、1=审核通过、2=审核不通过
            public int offset { get; set; }
            public int rows { get; set; }
            public int role { get; set; } // 0-审核人员、1=普通用户
            public string field { get; set; }  // 检索字段名
            public string search { get; set; } // 检索值
            public string isMust { get; set; }
            public string type { get; set; }
        }

        /// <summary>
        /// 数据上报  api/datareportapi/upload
        /// </summary>
        public Object Upload()
        {
            BaseService bs = new BaseService();
            NameValueCollection nvc = System.Web.HttpContext.Current.Request.Form;
            HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            string batch ="angelasp";                            // 用户标识
            DateTime date = DateTime.Now;                        // 当前时间毫秒数Millisecond
            string userid = UtilFunction.GetCookie("uid");       // 当前登录用户ID
            string username = UtilFunction.GetCookie("uname");   // 当前登录用户Name
            string city = HttpUtility.UrlDecode(UtilFunction.GetCookie("cityid"));     
            string filename = null;                              // 文件名
            string sysFileName = userid + "_" + batch + "_" + date.Millisecond + "_";  // 备份文件名
            string path = _directory + "UploadFiles/";           // 文件备份路径
            int count = 0;
            if (hfc.Count > 0)
            {
                filename = hfc[0].FileName;
                sysFileName += filename;
                path += sysFileName;
               /// DataTable dt = bs.GetDataTableToID("getSysRoomName");
                //List<string> zychs = new List<string>();
                //foreach (DataRow row in dt.Rows)
                //{
                //    zychs.Add(row["roomname"].ToString());
                //}

                //if (!(filename.EndsWith(".xls") || filename.EndsWith(".xlsx"))) // 验证文件名后缀
                //{
                //    count = -2;
                //}
                ////else if (!IsFileName(filename, zychs)) // 验证文件名命名规范
                ////{
                ////    count = -4;
                ////}
                ////else if (!string.IsNullOrEmpty(city) && !filename.Contains(city))
                ////{
                ////    count = -5;
                ////}
                //else
                //{
                    hfc[0].SaveAs(path);   // 将文件备份到指定目录
                    count = 1;
                   // count = InportExcelToDB(bs, filename, batch, "填写模板", hfc[0].InputStream, date.ToString("yyyy年MM月"), city, type);
                //}
            }
            //注意要写好后面的第二第三个参数
            string strmsg = null, strerr = null;
            if (count == -1)
            {
                // 如果文件中的数据已存在，则删除备份文件
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                strmsg = "";
                strerr = "读取《" + filename + "》文件异常！(不包含\"填写模板\"sheet)"; // 指标编号重复
            }
            else if(count == 0)
            {

                strmsg = "";
                strerr = "《" + filename + "》文件中的数据已存在，请勿重复上传文件！";
            }
            else if (count > 0)
            {
                // 如果文件中的数据有入库操作，则将该文件的备份信息入库
                List<Object> param = new List<Object>();
                Dictionary<string, List<Object>> map = new Dictionary<string, List<Object>>();
                param.Add(filename);
                param.Add(sysFileName);
                param.Add(date);
                param.Add(userid);
                param.Add(username);
                param.Add("1"); // 1-数据
                map.Add("insertFileBak", param);

                count += bs.InsUpdDelDataTableToParam(map);

                strmsg = "共导入" + count + "条记录！";
                strerr = "";
            }
            return new { msg = strmsg, error = strerr };
        }

        /// <summary>获取重复数据(数据上报时)</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // POST api/datareportapi/postdatarepeat
        public HttpResponseMessage postDataRepeat([FromBody]Parameter param)
        {
            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            string userid = UtilFunction.GetCookie("uid");
            string where = " AND AStatus=-1 AND CreateUserId=" + userid;
            // 获取检索输入框的值(文件名)
            string batch = "";
            string search = "";
            if (!string.IsNullOrEmpty(param.type))
            {
                where += " AND Type='" + param.type + "'";
            }
            if (param.batch != null && param.batch.Trim().Length > 0)
            {
                batch = param.batch.Trim();
                // 按批次号查询
                where += " AND Batch='" + batch + "'";
            }
            if (param.field != null && param.field.Trim().Length > 0 && param.search != null && param.search.Trim().Length > 0)
            {
                search = param.search.Trim();
                search = search.Replace("%", "\\\\%");
                where += " AND " + param.field + " LIKE '%%" + search + "%%'";
            }
            // 组合分页SQL
            string limit = " LIMIT " + param.offset + "," + param.rows;
            // 总记录数
            string c0 = "{\"getDataRepeatTotal\":[{\"[@c0]\":\"" + where + "\"}]}";
            var list = Newtonsoft.Json.Linq.JObject.Parse(c0);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tabletotal = bs.GetDataTableToParamID(jarrays);

            // 当前页显示的信息集合
            c0 = "{\"selectDataRepeat\":[{\"[@c0]\":\"" + where + "\",\"[@c1]\":\"" + limit + "\"}]}";
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
            decimal rows = 0;
            DataTable dtTotal = bs.GetResult(bs.getSQL("getDataRepeatTotal2", batch, param.type));
            if (dtTotal != null)
            {
                rows = Convert.ToDecimal(dtTotal.Rows[0]["total"]);
            }
            map.Add("count", rows);
            map.Add("type", param.type);
            string myjson = uf.ToJson(map);
            return GetJSONMessage(myjson);
        }

        /// <summary>重复数据审核</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // POST api/datareportapi/postreviewrepeat
        public HttpResponseMessage postReviewRepeat([FromBody]Parameter param)
        {
            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            // 组合WHERE
            string where = " AND Type='IData'"; // 查询已提交审核的重复数据
            string search = "";
            if (param.role > 0) // 普通人员
            {
                string userid = UtilFunction.GetCookie("uid");
                where += " AND AStatus IN(0,1,2) AND CreateUserId=" + userid;
            }
            else
            {
                where += " AND AStatus=0";
            }
            if (param.field != null && param.field.Trim().Length > 0 && param.search != null && param.search.Trim().Length > 0)
            {
                search = param.search.Trim();
                search = search.Replace("%", "\\\\%");
                where += " AND " + param.field.Trim() + " LIKE '%%" + search + "%%'";
            }
            // 组合分页SQL
            string limit = " LIMIT " + param.offset + "," + param.rows;
            // 总记录数
            string c0 = "{\"getDataRepeatTotal\":[{\"[@c0]\":\"" + where + "\"}]}";
            var list = Newtonsoft.Json.Linq.JObject.Parse(c0);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tabletotal = bs.GetDataTableToParamID(jarrays);

            // 当前页显示的信息集合
            c0 = "{\"selectDataRepeat\":[{\"[@c0]\":\"" + where + "\",\"[@c1]\":\"" + limit + "\"}]}";
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

        /// <summary>放弃重复数据更新</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // REMOVE api/datareportapi/removedatarepeat
        public Object removeDataRepeat([FromBody]Parameter param)
        {
            // 删除数据库记录
            BaseService bs = new BaseService();
            List<Object> parames = new List<Object>();
            Dictionary<string, List<Object>> map = new Dictionary<string, List<Object>>();
            parames.Add(param.ids);
            map.Add("deleteDataRepeat", parames);
            int count = bs.InsUpdDelDataTableToParam(map);
            
            //return GetJSONMessage("{count:" + count + "}");
            return new { count = count };
        }

        /// <summary>重复数据提交审核</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // UPDATE api/datareportapi/updatedatarepeat
        public Object updateDataRepeat([FromBody]Parameter param)
        {
            BaseService bs = new BaseService();
            List<Object> parames = new List<Object>();
            Dictionary<string, List<Object>> map = new Dictionary<string, List<Object>>();
            string tabId = "";
            parames.Add(param.status);
            if (param.status > 0)
            {
                tabId = "updateDataRepeatReview";
                string userid = UtilFunction.GetCookie("uid");
                string username = UtilFunction.GetCookie("uname");
                DateTime date = DateTime.Now;
                parames.Add(userid);
                parames.Add(username);
                parames.Add(date);
            }
            else if (param.status == 0)
            {
                tabId = "updateDataRepeat";
            }
            parames.Add(param.ids);
            map.Add(tabId, parames);
            int count = bs.InsUpdDelDataTableToParam(map);
            //return GetJSONMessage("{count:" + count + ", rows:" + rows + "}");
            return new { count = count };
        }


        /// <summary>放弃数据来源更新</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // REMOVE api/datareportapi/removedatarepeat2
        public Object removeDataRepeat2([FromBody]List<Parameter> objs)
        {
            BaseService bs = new BaseService();
            DateTime datenow = DateTime.Now;

            List<string> list = new List<string>();
            List<int> ids = new List<int>(); // 放弃更新的id's

            int count = 0, cur = 0;
            string userid = UtilFunction.GetCookie("uid");
            string username = UtilFunction.GetCookie("uname");

            string inputSelect = "Input_Select";
            string insertDataRepeat = "insertDataRepeat";
            string deleteDataRepeat = "deleteDataRepeat";

            string tablename = "", sql = "", type = "";
            foreach (Parameter obj in objs)
            {
                ids.Add(obj.id);
                obj.indicatorid = obj.indicatorid.ToUpper();
                if (Convert.ToDecimal(obj.source) > 1)
                {
                    tablename = "TBDI_C_" + obj.indicatorid.Substring(0, 6);
                    type = obj.source == "2" ? "1" : "0";
                }
                else
                {
                    tablename = "TBDI_" + obj.indicatorid.Substring(0, 6);
                    type = obj.source;
                }
                sql = bs.getSQL(inputSelect, obj.indicatorid, obj.citY_NO, tablename, obj.indicatorid, obj.citY_NO, obj.noP_NUMBER, type);
                
                // 1.验证指标值是否重复
                DataTable dt = bs.GetResult(sql);
                if (!Convert.IsDBNull(dt.Rows[0]["Indicatorid"]) && obj.iData != dt.Rows[0]["IData"].ToString())
                {
                    list.Add(bs.getSQL(insertDataRepeat, obj.uFileName, obj.indicatorid, dt.Rows[0]["SOURCENAME"].ToString(), obj.citY_NO, obj.noP_NUMBER, obj.iData, dt.Rows[0]["IData"].ToString(), datenow, obj.createUserId, obj.createUserName, obj.batch, obj.source, obj.iData, "IData"));
                }
                if (++cur % 1000 != 0) continue;
                if (list.Count > 0)
                {
                    count += bs.RunSQL(list);
                    list.Clear();
                }
            }
            objs.Clear();
            // 2.删除T_DataRepeat
            list.Add(bs.getSQL(deleteDataRepeat, string.Join(",", ids)));
            ids.Clear();
            if (list.Count > 0)
            {
                count += bs.RunSQL(list);
                list.Clear();
            }
            return new { count = count };
        }

        /// <summary>更新替换数据来源</summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        // POST api/datareportapi/updateDataRepeat2
        public Object updateDataRepeat2([FromBody]List<Parameter> objs)
        {
            BaseService bs = new BaseService();
            DateTime datenow = DateTime.Now;

            List<string> list = new List<string>();
            List<int> ids = new List<int>(); // 更新替换的id's
            List<Object[]> newData = new List<object[]>();

            int count = 0, cur = 0;
            string userid = UtilFunction.GetCookie("uid");
            string username = UtilFunction.GetCookie("uname");

            string inputSelect = "Input_Select";
            string inputUpdate = "Input_Update";
            string insertDataRepeat = "insertDataRepeat";
            string deleteDataRepeat = "deleteDataRepeat";

            string tablename = "", sql = "", sqlUpd = "", type = "";

            foreach (Parameter obj in objs)
            {
                ids.Add(obj.id);
                obj.indicatorid = obj.indicatorid.ToUpper();
                if (Convert.ToDecimal(obj.source) > 1)
                {
                    tablename = "TBDI_C_" + obj.indicatorid.Substring(0, 6);
                    type = obj.source == "2" ? "1" : "0";
                }
                else
                {
                    tablename = "TBDI_" + obj.indicatorid.Substring(0, 6);
                    type = obj.source;
                }
                sqlUpd = bs.getSQL(inputUpdate, tablename, obj.type, obj.newValue, datenow, userid, obj.indicatorid, obj.citY_NO, obj.noP_NUMBER, type);
                sql = bs.getSQL(inputSelect, obj.indicatorid, obj.citY_NO, tablename, obj.indicatorid, obj.citY_NO, obj.noP_NUMBER, type);

                // 1.更新数据来源
                list.Add(sqlUpd);
                //list.Add(bs.getSQL(deleteDataRepeat, obj.id));
                //newData.Add(new Object[] { obj.indicatorid, obj.citY_NO, obj.newValue, obj.noP_NUMBER, obj.iData});

                // 2.验证指标值是否重复
                DataTable dt = bs.GetResult(sql);
                if (!Convert.IsDBNull(dt.Rows[0]["Indicatorid"]))
                {
                    if (obj.iData != dt.Rows[0]["IData"].ToString())
                    {
                        list.Add(bs.getSQL(insertDataRepeat, obj.uFileName, obj.indicatorid, obj.newValue, obj.citY_NO, obj.noP_NUMBER, obj.iData, dt.Rows[0]["IData"].ToString(), datenow, obj.createUserId, obj.createUserName, obj.batch, obj.source, obj.iData, "IData"));
                        //return new { success = "是重复数据!" };
                    }
                }
                if (++cur % 1000 != 0) continue;
                if (list.Count > 0)
                {
                    count += bs.RunSQL(list);
                    list.Clear();
                }
            }
            // 2.删除T_DataRepeat
            list.Add(bs.getSQL(deleteDataRepeat, string.Join(",", ids)));
            ids.Clear();
            if (list.Count > 0)
            {
                count += bs.RunSQL(list);
                list.Clear();
            }
            /*try
            {
                updateExcel(objs[0].uFileName, objs[0].batch, ref newData, ref bs);
            } catch (Exception e)
            {
                FileLog.WriteLog("回写Excel文件异常:" + e);
            }*/
            objs.Clear();
            return new { count = count };
        }

        /// <summary>指标更新审核</summary>
        /// <param name="list">需要审核的重复数据object</param>
        /// <returns></returns>
        // UPDATE api/datareportapi/updatereviewrepeat
        public Object updateReviewRepeat([FromBody]List<Parameter> list)
        {
            BaseService bs = new BaseService();
            string userid = UtilFunction.GetCookie("uid");
            string username = UtilFunction.GetCookie("uname");
            int status = list[0].status;      // 当前审核的状态
            List<int> ids = new List<int>();  // 当前审核的记录ids
            List<string> indicatorids = new List<string>();  // 当前审核的记录ids
            List<string> sqlList = new List<string>();  // 汇总审核操作SQL
            foreach (Parameter param in list)
            {
                ids.Add(param.id);
                indicatorids.Add(param.indicatorid);
            }
            // 获取修改重复数据审核状态的SQL
            sqlList.Add(bs.getSQL("updateDataRepeatReview", status, userid, username, DateTime.Now, string.Join(",", ids)));
            // 如果审核通过，则更新数据
            if (status == 1)
            {
                // 根据指标编号查询表名
                string c0 = "{\"getTableNameByIndicatorid\":[{\"[@c0]\":\"'" + string.Join("','", indicatorids) + "'\"}]}";
                var values = Newtonsoft.Json.Linq.JObject.Parse(c0);
                Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
                foreach (var arry in values)
                {
                    jarrays.Add(arry.Key, arry.Value as JArray);
                }
                DataTable dt = bs.GetDataTableToParamID(jarrays);
                //key:指标编号    value:表名
                Dictionary<string, string> dicKey = new Dictionary<string, string>();
                foreach (DataRow row in dt.Rows)
                {
                    dicKey.Add(row[0].ToString(), row[1].ToString());
                }
                string tablename = "", type = "", inputUpdate = "Input_Update";
                foreach (Parameter param in list)
                {
                    if (!dicKey.ContainsKey(param.indicatorid)) continue;
                    if (Convert.ToDecimal(param.source) > 1)
                    {
                        tablename = string.Join("_C_", dicKey[param.indicatorid].Split('_'));
                        type = param.source == "2" ? "1" : "0";
                    }
                    else
                    {
                        tablename = dicKey[param.indicatorid];
                        type = param.source;
                    }
                    sqlList.Add(bs.getSQL(inputUpdate, tablename, param.type, param.newValue, DateTime.Now, param.createUserId, param.indicatorid, param.citY_NO, param.noP_NUMBER, type));
                }
                dicKey.Clear();
                jarrays.Clear();
            }
            int totnum = 0;
            if (sqlList.Count > 0)
                totnum += bs.RunSQL(sqlList);//执行数据操作
            sqlList.Clear();
            ids.Clear();
            indicatorids.Clear();

            return new { count = totnum };
        }

        /// <summary>再次上传问题数据(数据上报时)</summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        // POST api/datareportapi/updatedataquestion
        public Object updateDataQuestion([FromBody]List<Parameter> objs)
        {
            BaseService bs = new BaseService();

            /*DataTable dt = bs.GetResult(bs.getSQL("getDataQuestion", objs.ids));
            if (dt == null || dt.Rows.Count == 0)
                return new { error = "查询无结果" };*/

            DateTime datenow = DateTime.Now;
            string userid = UtilFunction.GetCookie("uid");       // 当前登录用户ID
            string username = UtilFunction.GetCookie("uname");   // 当前登录用户Name
            List<string> error = new List<string>();
            List<string> list = new List<string>();
            List<string> sqlList = new List<string>();
            Dictionary<string, List<Object[]>> dicNewExlData = new Dictionary<string, List<object[]>>();
            Dictionary<string, Parameter> dicNewIData = new Dictionary<string, Parameter>(); // 当前导入文件指标+城市对应值
            string error1 = "数据来源不能为空!";
            string error2 = "当期时间格式不正确!";
            string error3 = "上报时间不能晚于当前系统时间!";
            string error4 = "当期时间与上期时间格式不相同!上次上报的时间为【";
            string error5 = "当期时间不能早于上次上报时间!上次上报时间为【";
            string error6 = "指标值有非法字符!";
            string error7 = "指标值越界!正确取值范围";
            string error8 = "】。";

            string inputSelect = "Input_Select";
            string inputInsert = "Input_Insert";
            string insertDataRepeat = "insertDataRepeat";
            string updateDataQuestion = "updateDataQuestion";
            int aStatus = 1; // -1:未解决,0:已舍弃,1:已解决
            string tablename = "", sql = "", type = "", strkey = "", exlkey = "";

            //string filename = dt.Rows[0]["UFileName"].ToString(), batch = dt.Rows[0]["Batch"].ToString();
            string filename = objs[0].uFileName, batch = objs[0].batch;

            //foreach (DataRow row in dt.Rows)
            foreach (Parameter obj in objs)
            {

                /*Parameter obj = new Parameter();
                obj.id = Convert.ToInt32(row["id"].ToString());
                obj.batch = row["Batch"].ToString();
                obj.uFileName = row["UFileName"].ToString();
                obj.indicatorid = row["Indicatorid"].ToString();
                obj.sourcename = row["SOURCENAME"].ToString();
                obj.noP_NUMBER = row["NOP_NUMBER"].ToString();
                obj.citY_NO = row["CITY_NO"].ToString();
                obj.iData = row["IData"].ToString();
                obj.last_NOP_NUMBER = row["Last_NOP_NUMBER"].ToString();
                obj.type = row["Type"].ToString();
                obj.red_start = row["Red_start"].ToString();
                obj.red_end = row["Red_end"].ToString();
                obj.source = row["Source"].ToString();
                obj.status = Convert.ToInt32(row["AStatus"].ToString());*/
                // 验证数据正确性
                if (string.IsNullOrEmpty(obj.sourcename))
                {
                    //return new { error = "数据来源不能为空!" };
                    error.Add(error1);
                    continue;
                }
                if (!IsNopNumber(obj.noP_NUMBER))
                {
                    //return new { error = "当期时间格式不正确!" };
                    error.Add(error2);
                    continue;
                }
                if (obj.noP_NUMBER.EndsWith("月") && string.CompareOrdinal(obj.noP_NUMBER, datenow.ToString("yyyy年MM月")) > 0)
                {
                    //return new { error = "上报时间不能晚于当前系统时间" };
                    error.Add(error3);
                    continue;
                }
                if (!string.IsNullOrEmpty(obj.last_NOP_NUMBER))
                {
                    if (obj.noP_NUMBER.Substring(obj.noP_NUMBER.Length - 1, 1) != obj.last_NOP_NUMBER.Substring(obj.last_NOP_NUMBER.Length - 1, 1))
                    {
                        //return new { error = "当期时间与上期时间格式不相同，上次上报的日期格式为【" + obj.last_NOP_NUMBER + "】" };
                        error.Add(error4 + ChangeZHfoNum(obj.last_NOP_NUMBER) + error8);
                        continue;
                    }
                    /*if (string.CompareOrdinal(ChangeNopNumber(obj.noP_NUMBER), obj.last_NOP_NUMBER) < 0)
                    {
                        //return new { error = "当期时间不能早于上次上报时间" };
                        error.Add(error5 + ChangeZHfoNum(obj.last_NOP_NUMBER) + error8);
                        continue;
                    }*/
                }
                if (!string.IsNullOrEmpty(obj.iData) && !IsHasCHZN(obj.iData) && !IsFloat(obj.iData))
                {
                    //return new { error = "指标值有非法字符!" };
                    error.Add(error6);
                    continue;
                }
                if (!string.IsNullOrEmpty(obj.iData) && !IsHasCHZN(obj.iData)
                        && !string.IsNullOrEmpty(obj.red_start) && !string.IsNullOrEmpty(obj.red_end)
                        && !(Convert.ToDecimal(obj.red_start) == 0 && Convert.ToDecimal(obj.red_end) == 0)
                        && (Convert.ToDecimal(obj.iData) < Convert.ToDecimal(obj.red_start) || Convert.ToDecimal(obj.iData) > Convert.ToDecimal(obj.red_end)))
                {
                    //return new { error = "指标值越界!" };
                    error.Add(error7 + obj.red_start + "-" + obj.red_end + "!");
                    continue;
                }
                // 验证是否为重复数据
                obj.indicatorid = obj.indicatorid.ToUpper();
                if (Convert.ToDecimal(obj.source) > 1)
                {
                    tablename = "TBDI_C_" + obj.indicatorid.Substring(0, 6);
                    type = obj.source == "2" ? "1" : "0";
                }
                else
                {
                    tablename = "TBDI_" + obj.indicatorid.Substring(0, 6);
                    type = obj.source;
                }
                sql = bs.getSQL(inputSelect, obj.indicatorid, obj.citY_NO, tablename, obj.indicatorid, obj.citY_NO, obj.noP_NUMBER, type);
                sqlList.Add(sql);

                strkey = obj.indicatorid + obj.citY_NO;
                obj.type = type;
                obj.tablename = tablename;
                // IData值
                if (dicNewIData.ContainsKey(strkey))
                {
                    dicNewIData[strkey] = obj;
                }
                else
                {
                    dicNewIData.Add(strkey, obj);
                }
                exlkey = obj.uFileName + "@" + obj.batch;
                if (!dicNewExlData.ContainsKey(exlkey))
                {
                    // 需要回写到原excel中的内容
                    dicNewExlData.Add(exlkey, new List<object[]>());
                }
            }
            //dt.Clear();
            objs.Clear();

            // 获取所有省份
            List<string> listBaseCity = BaseService.getBaseCity();
            //拼接查询语句
            StringBuilder build = new StringBuilder();
            int size = sqlList.Count, cur = 0, totnum = 0;
            DataTable result;
            string newValueD, newValueS;
            Parameter obj2;
            List<object[]> newData;
            if (size > 0)
            {
                foreach (string str in sqlList)
                {
                    build.Append(str);
                    if (++cur % 1000 == 0)
                    {
                        result = bs.GetResult(build.ToString());//执行查询操作，查询结果为：ID+CITY，ROWCOUNT（按ID、CITY、DATE三个字段匹配上的记录数）
                        build.Clear();

                        //存在记录，则更新
                        if (result.Rows.Count > 0)
                        {
                            string strid;
                            //int key;
                            foreach (DataRow row in result.Rows)
                            {
                                strid = row[0].ToString();
                                obj2 = dicNewIData[strid];
                                exlkey = obj2.uFileName + "@" + obj2.batch;
                                newData = dicNewExlData[exlkey];
                                if (!Convert.IsDBNull(row[2]))//存在记录
                                {
                                    // 判断新导入的值是否与数据库中的值相同
                                    newValueD = obj2.iData;
                                    newValueS = obj2.sourcename;

                                    if (newValueS != row[5].ToString()) // 数据来源不一样
                                    {
                                        list.Add(bs.getSQL(insertDataRepeat, obj2.uFileName, obj2.indicatorid, obj2.sourcename, obj2.citY_NO, obj2.noP_NUMBER, obj2.sourcename, row["SOURCENAME"].ToString(), datenow, userid, username, obj2.batch, obj2.source, obj2.iData, "SOURCENAME"));
                                        list.Add(bs.getSQL(updateDataQuestion, obj2.id, aStatus, obj2.sourcename, obj2.noP_NUMBER, obj2.iData, datenow));
                                    }
                                    else if (newValueD != row[1].ToString())  // 指标值不一样
                                    {
                                        list.Add(bs.getSQL(insertDataRepeat, obj2.uFileName, obj2.indicatorid, obj2.sourcename, obj2.citY_NO, obj2.noP_NUMBER, obj2.iData, row["IData"].ToString(), datenow, userid, username, obj2.batch, obj2.source, obj2.iData, "IData"));
                                        list.Add(bs.getSQL(updateDataQuestion, obj2.id, aStatus, obj2.sourcename, obj2.noP_NUMBER, obj2.iData, datenow));
                                        //return new { success = "是重复数据!" };
                                    }
                                    else
                                    {
                                        list.Add(bs.getSQL(updateDataQuestion, obj2.id, aStatus, obj2.sourcename, obj2.noP_NUMBER, obj2.iData, datenow));
                                        newData.Add(new Object[] { obj2.indicatorid, obj2.citY_NO, obj2.sourcename, obj2.noP_NUMBER, obj2.iData });
                                        //return new { success = "数据已存在，本条记录自动舍弃!" };
                                    }
                                }
                                else
                                {
                                    // 入库
                                    list.Add(bs.getSQL(inputInsert, obj2.tablename, obj2.indicatorid, obj2.iData, obj2.sourcename, obj2.citY_NO, obj2.noP_NUMBER, datenow, userid, ChangeNopNumber(obj2.noP_NUMBER), obj2.type));
                                    list.Add(bs.getSQL(updateDataQuestion, obj2.id, aStatus, obj2.sourcename, obj2.noP_NUMBER, obj2.iData, datenow));
                                    newData.Add(new Object[] { obj2.indicatorid, obj2.citY_NO, obj2.sourcename, obj2.noP_NUMBER, obj2.iData });
                                }
                            }
                        }

                        if (list.Count > 0)
                            totnum += bs.RunSQL(list);//执行数据操作
                        list.Clear();
                        continue;
                    }
                    if (cur < size)
                        build.Append(" UNION ALL ");
                }
            }
            sqlList.Clear();
            if (build.Length > 0)
            {
                result = bs.GetResult(build.ToString());//执行查询操作，查询结果为：ID+CITY，ROWCOUNT（按ID、CITY、DATE三个字段匹配上的记录数）
                build.Clear();

                if (result.Rows.Count > 0)
                {
                    string strid;
                    //int key;
                    foreach (DataRow row in result.Rows)
                    {
                        strid = row[0].ToString();
                        obj2 = dicNewIData[strid];
                        exlkey = obj2.uFileName + "@" + obj2.batch;
                        newData = dicNewExlData[exlkey];
                        if (!Convert.IsDBNull(row[2]))//存在记录
                        {
                            // 判断新导入的值是否与数据库中的值相同
                            newValueD = obj2.iData;
                            newValueS = obj2.sourcename;

                            if (newValueS != row[5].ToString()) // 数据来源不一样
                            {
                                list.Add(bs.getSQL(insertDataRepeat, obj2.uFileName, obj2.indicatorid, obj2.sourcename, obj2.citY_NO, obj2.noP_NUMBER, obj2.sourcename, row["SOURCENAME"].ToString(), datenow, userid, username, obj2.batch, obj2.source, obj2.iData, "SOURCENAME"));
                                list.Add(bs.getSQL(updateDataQuestion, obj2.id, aStatus, obj2.sourcename, obj2.noP_NUMBER, obj2.iData, datenow));
                            }
                            else if (newValueD != row[1].ToString())  // 指标值不一样
                            {
                                list.Add(bs.getSQL(insertDataRepeat, obj2.uFileName, obj2.indicatorid, obj2.sourcename, obj2.citY_NO, obj2.noP_NUMBER, obj2.iData, row["IData"].ToString(), datenow, userid, username, obj2.batch, obj2.source, obj2.iData, "IData"));
                                list.Add(bs.getSQL(updateDataQuestion, obj2.id, aStatus, obj2.sourcename, obj2.noP_NUMBER, obj2.iData, datenow));
                                //return new { success = "是重复数据!" };
                            }
                            else
                            {
                                list.Add(bs.getSQL(updateDataQuestion, obj2.id, aStatus, obj2.sourcename, obj2.noP_NUMBER, obj2.iData, datenow));
                                newData.Add(new Object[] { obj2.indicatorid, obj2.citY_NO, obj2.sourcename, obj2.noP_NUMBER, obj2.iData });
                                //return new { success = "数据已存在，本条记录自动舍弃!" };
                            }
                        }
                        else
                        {
                            // 入库
                            list.Add(bs.getSQL(inputInsert, obj2.tablename, obj2.indicatorid, obj2.iData, obj2.sourcename, obj2.citY_NO, obj2.noP_NUMBER, datenow, userid, ChangeNopNumber(obj2.noP_NUMBER), obj2.type));
                            list.Add(bs.getSQL(updateDataQuestion, obj2.id, aStatus, obj2.sourcename, obj2.noP_NUMBER, obj2.iData, datenow));
                            newData.Add(new Object[] { obj2.indicatorid, obj2.citY_NO, obj2.sourcename, obj2.noP_NUMBER, obj2.iData });
                        }
                    }
                }
            }
            dicNewIData.Clear();

            if (list.Count > 0)
                totnum += bs.RunSQL(list);//执行数据操作
            list.Clear();

            try
            {
                // 回写源文件

                foreach (KeyValuePair<string, List<object[]>> kv in dicNewExlData)
                {
                    filename = kv.Key.Split('@')[0];
                    batch = kv.Key.Split('@')[1];
                    List<object[]> value = kv.Value;
                    updateExcel(filename, batch, ref value, ref bs);
                }
            }
            catch (Exception e)
            {
                FileLog.WriteLog("回写Excel文件异常:" + e);
            }
            finally
            {
                dicNewExlData.Clear();
            }
            return new { error = string.Join("<br>", error.Distinct().ToList())};
        }

        /// <summary>舍弃问题数据</summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        // POST api/datareportapi/removedataquestion
        public Object removeDataQuestion([FromBody]Parameter param)
        {
            BaseService bs = new BaseService();
            List<Object> parames = new List<Object>();
            Dictionary<string, List<Object>> map = new Dictionary<string, List<Object>>();
            parames.Add(param.ids);
            parames.Add(DateTime.Now);
            map.Add("deleteDataQuestion", parames);
            int count = bs.InsUpdDelDataTableToParam(map);
            return new { count = count };
        }

        /// <summary>获取问题数据(数据上报时)</summary>
        /// <param name="param"></param>
        /// <returns></returns>
        // POST api/datareportapi/postdataquestion
        public HttpResponseMessage postDataQuestion([FromBody]Parameter param)
        {
            BaseService bs = new BaseService();
            UtilFunction uf = new UtilFunction();
            string userid = UtilFunction.GetCookie("uid");
            string where = " AND q.AStatus=-1 AND q.CreateUserId=" + userid;
            // 获取检索输入框的值(文件名)
            string batch = "";
            string search = "";
            if (param.batch != null && param.batch.Trim().Length > 0)
            {
                batch = param.batch.Trim();
                // 按批次号查询
                where += " AND q.Batch='" + batch + "'";
            }
            if (param.isMust != null && param.isMust.Trim().Length > 0)
            {
                where += " AND q.IsMust=" + param.isMust.Trim();
            }
            if (param.type != null && param.type.Trim().Length > 0)
            {
                where += " AND q.Type=" + param.type.Trim();
            }
            if (param.field != null && param.field.Trim().Length > 0 && param.search != null && param.search.Trim().Length > 0)
            {
                search = param.search.Trim();
                search = search.Replace("%", "\\\\%");
                where += " AND " + param.field + " LIKE '%%" + search + "%%'";
            }
            // 组合分页SQL
            string limit = " LIMIT " + param.offset + "," + param.rows;
            // 总记录数
            string c0 = "{\"getDataQuestionTotal\":[{\"[@c0]\":\"" + where + "\"}]}";
            var list = Newtonsoft.Json.Linq.JObject.Parse(c0);
            Dictionary<string, JArray> jarrays = new Dictionary<string, JArray>();
            foreach (var arry in list)
            {
                jarrays.Add(arry.Key, arry.Value as JArray);
            }
            DataTable tabletotal = bs.GetDataTableToParamID(jarrays);

            // 当前页显示的信息集合
            c0 = "{\"selectDataQuestion\":[{\"[@c0]\":\"" + where + "\",\"[@c1]\":\"" + limit + "\"}]}";
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
            decimal count = 0;
            DataTable dtTotal = bs.GetResult(bs.getSQL("getDataQuestionTotal2", batch));
            if (dtTotal != null)
            {
                count = Convert.ToDecimal(dtTotal.Rows[0]["total"]);
            }
            map.Add("count", count);
            string myjson = uf.ToJson(map);
            return GetJSONMessage(myjson);
        }

        /// <summary>
        /// Excel入库
        /// </summary>
        /// <param name="filename">文件名</param>
        /// <param name="batch">批次号</param>
        /// <param name="sheetName">sheet名称</param>
        /// <param name="Strem">文件流</param>
        private int InportExcelToDB(BaseService bs, string filename, string batch, string sheetName, Stream StremContent, string datenow, string city, string type2)
        {
            error_msg = "";
            SaveExcel SaveExcel = new SaveExcel();
            //DataTable table = SaveExcel.GetDataTableToExcelByName(@"E:\YDSJY\文件资料\网络监控处负责指标-输入样例.xlsx", "填写模板");
            DataTable table = null;
            try
            {
                table = SaveExcel.GetDataTableToExcelByName(filename, sheetName, StremContent);
            }
            catch (Exception e)
            {
                error_msg = "【读取Excel文件异常】：" + e.Message;
                FileLog.WriteLog(error_msg + e);
                return -7;
            }
            if (table == null) return -1;
            
            //读取ID与表名对应关系基础表
            DataTable tableDic = bs.GetDataTableToID("InPut_Dictionary");
            if (tableDic == null || tableDic.Rows.Count == 0) return -3;
            
            //key:ID    value:TableName
            Dictionary<string, string> dicKey = new Dictionary<string, string>();
            foreach (DataRow row in tableDic.Rows)
            {
                dicKey.Add(row[0].ToString().ToUpper(), row[1].ToString());
            }

            // 获取所有省份
            List<string> listBaseCity = BaseService.getBaseCity();
            tableDic.Clear();
            // 获取所有地市
            /*tableDic = bs.GetDataTableToID("getCity2");
            foreach (DataRow row in tableDic.Rows)
            {
                listBaseCity.Add(row["name"].ToString());
            }*/

            int datasource_index = -1, curdate_index = -1, index = -1;//Indicatorid_index = 0, 
            bool isfirstColumn = true;
            Dictionary<string, int> citylist = new Dictionary<string, int>();//存储当前上传的省份、城市名称
            List<string> citylistByP = new List<string>();//存储当前上传的省份、城市名称
            string datasource = null, curdate = null, Indicatorid = null, strval, tableName, stridata;
            DateTime date = new DateTime(1900, 1, 1);//读取Excel时间单元格时，会转换为1900年1月1日后的天数
            decimal idata = 0;
            List<string> sqllist = new List<string>(); 
            List<string> sqllistUI = new List<string>();

            //key:ID+CITY   value:SQL[INSERT/UPDATE]
            Dictionary<string, string> dicInsert = new Dictionary<string, string>();//, dicUpdate = new Dictionary<string, string>();
            Dictionary<string, List<Object>> dicNewIData = new Dictionary<string, List<Object>>(); // 当前导入文件指标+城市对应值
            Dictionary<string, DataRow> dicAuditRules = new Dictionary<string, DataRow>(); // 指标甄核规则
            Dictionary<string, string> dicMaxNopNumber = new Dictionary<string, string>(); // 指标上次上报时间(集团、省报)

            DataTable tablelist = bs.GetDataTableToID("findAuditRules");
            foreach (DataRow row in tablelist.Rows)
            {
                dicAuditRules.Add(row["Indicatorid"].ToString().ToUpper(), row);
            }

            // 执行SQL，获取指标最新上报的时间期数
            DataTable dtTabNames = bs.GetDataTableToID("getTableNames");
            string s0 = "SELECT Indicatorid,CITY_NO,MAX(IFNULL(C_NOP_NUMBER,NOP_NUMBER)) AS NOP_NUMBER FROM ";
            string sw = " WHERE Type=" + type2;
            string s1 = " GROUP BY Indicatorid,CITY_NO";
            List<string> s2 = new List<string>();
            // 集团+省报 上次上报时间
            foreach (DataRow row in dtTabNames.Rows)
            {
                s2.Add(s0 + row["DimTableName"].ToString() + sw + s1);
            }
            DataTable tablelist2 = bs.GetResult(string.Join(" UNION ALL ", s2));
            /*foreach (DataRow row in tablelist2.Rows)
            {
                FileLog.WriteLog(row["Indicatorid"].ToString().ToUpper() + "-" + row["CITY_NO"].ToString() + "-" + row["NOP_NUMBER"].ToString());
            }*/
            foreach (DataRow row in tablelist2.Rows)
            {
                //FileLog.WriteLog(row["Indicatorid"].ToString().ToUpper() + row["CITY_NO"].ToString()+ row["NOP_NUMBER"].ToString());
                dicMaxNopNumber.Add(row["Indicatorid"].ToString().ToUpper()+ row["CITY_NO"].ToString(), row["NOP_NUMBER"].ToString());
            }
            s2.Clear();
            tablelist2.Clear();

            // 省报地市 上次上报时间
            /*foreach (DataRow row in dtTabNames.Rows)
            {
                s2.Add(s0 + string.Join("_C_", row["DimTableName"].ToString().Split('_')) + s1);
            }
            tablelist2 = bs.GetResult(string.Join(" UNION ALL ", s2));
            */
            s0 = "SELECT pc1.name CITY_NO, c.Indicatorid, MAX(IFNULL(c.C_NOP_NUMBER,c.NOP_NUMBER)) AS NOP_NUMBER FROM TB_Province_City pc1" +
                " INNER JOIN ( SELECT * FROM TB_Province_City WHERE parentid=0 ) pc2 ON pc1.parentid=pc2.id" +
                " INNER JOIN (";
            foreach (DataRow row in dtTabNames.Rows)
            {
                s2.Add("SELECT * FROM " + row["DimTableName"].ToString() + sw);
            }

            tablelist2 = bs.GetResult(s0 + string.Join(" UNION ALL ", s2) + ") c ON pc2.name = c.CITY_NO GROUP BY c.Indicatorid,pc1.name");
            string kNumber = "";
            foreach (DataRow row in tablelist2.Rows)
            {
                kNumber = row["Indicatorid"].ToString().ToUpper() + row["CITY_NO"].ToString();
                if (!dicMaxNopNumber.ContainsKey(kNumber))
                {
                    dicMaxNopNumber.Add(kNumber, row["NOP_NUMBER"].ToString());
                }
            }
            s2.Clear();
            tablelist2.Clear();

            string inputSelect = "Input_Select";
            string inputInsert = "Input_Insert";
            string repeatTabId = "insertDataRepeat";
            string questionTabId = "insertDataQuestion";
            string getCityByProvince = "getCityByProvince";
            string userid = UtilFunction.GetCookie("uid");
            string username = UtilFunction.GetCookie("uname");
            string rolename = HttpUtility.UrlDecode(UtilFunction.GetCookie("rolename"));

            int isMust = 0, type = -1, status = -1;
            bool isQuestion = false; // 是否是问题数据
            decimal? redS, redE; // 指标甄核规则红色边界
            string unit,key, lastNopNumber; // 指标甄核规则单位
            DataRow ad; // 指标甄核规则

            // 集团、省报、地市类型判断
            DataTable dt = new DataTable();
            string type3 = "", thisCity = "", lsName ="";
            try
            {
                foreach (DataColumn column in table.Columns)
                {
                    index++;
                    //读取首列
                    if (isfirstColumn)
                    {
                        isfirstColumn = !isfirstColumn;
                        int i = 0;
                        foreach (DataRow row in table.Rows)
                        {
                            strval = row[column].ToString().Trim();
                            if (string.IsNullOrEmpty(strval))
                                throw new MyException("A" + (i+2) + "是空值！");
                            strval = strval.Replace("省", "");
                            lsName = strval;
                            if (strval != "吉林")
                            {
                                getCity(ref strval, ref citylistByP); // 转换地市名
                            }
                            if (strval == "数据来源")
                                datasource_index = i;
                            else if (strval == "当期时间")
                                curdate_index = i;
                            //else if (strval == "指标编码")
                            //Indicatorid_index = i;
                            else if (listBaseCity.Contains(strval) || citylistByP.Contains(strval))
                            {
                                citylist.Add(strval, i);
                                //FileLog.WriteLog("匹配成功：" + lsName + "：" + strval);
                                // 查询省份所属地市名
                                dt = bs.GetResult(bs.getSQL(getCityByProvince, strval));
                                if (dt != null)
                                {
                                    foreach (DataRow r in dt.Rows)
                                    {
                                        citylistByP.Add(r["name"].ToString());
                                    }
                                    dt.Clear();
                                }
                            }
                            else
                            {
                                strval = strval.Replace("市", "");
                                //strval = strval.Replace("州", "");
                                if (strval != "吉林")
                                {
                                    getCity(ref strval, ref citylistByP); // 转换地市名
                                }
                                if (listBaseCity.Contains(strval) || citylistByP.Contains(strval))
                                {
                                    citylist.Add(strval, i);
                                    //FileLog.WriteLog("匹配成功：" + lsName + "：" + strval);
                                    // 查询省份所属地市名
                                    dt = bs.GetResult(bs.getSQL(getCityByProvince, strval));
                                    if (dt != null)
                                    {
                                        foreach (DataRow r in dt.Rows)
                                        {
                                            citylistByP.Add(r["name"].ToString());
                                        }
                                        dt.Clear();
                                    }
                                }
                                else
                                {
                                    FileLog.WriteLog("未匹配上的省市名：" + strval);
                                }
                            }
                            i++;
                        }
                        continue;
                    }
                    if (datasource_index == -1)
                        throw new MyException("没有【数据来源】!");
                    if (curdate_index == -1)
                        throw new MyException("没有【当期时间】!");
                                        
                    // 导入省份权限控制(省公司只能导入自己省的，集团用户能导入所有)
                    if (!string.IsNullOrEmpty(city) && !citylist.ContainsKey(city))
                        return -5;

                    string sql = null;
                    //if (table.Rows[Indicatorid_index][index] == null || string.IsNullOrEmpty(table.Rows[Indicatorid_index][index].ToString())
                    //    || table.Rows[curdate_index][index] == null || string.IsNullOrEmpty(table.Rows[curdate_index][index].ToString()))
                    //    continue;
                    //Indicatorid = table.Rows[Indicatorid_index][index].ToString();

                    //if (table.Rows[curdate_index][index] == null || string.IsNullOrEmpty(table.Rows[curdate_index][index].ToString()))
                    //    continue;
                    Indicatorid = table.Columns[index].Caption.ToString().ToUpper().Trim();        // 指标编号
                    datasource = table.Rows[datasource_index][index].ToString().Trim();  // 数据来源
                    datasource = datasource.Replace("'", "''");
                    curdate = table.Rows[curdate_index][index].ToString().Trim();        // 当期时间

                    if (!string.IsNullOrEmpty(curdate) && !(curdate.EndsWith("期") || curdate.EndsWith("月")) && IsFloat(curdate))
                        curdate = date.AddDays(Convert.ToInt32(curdate)).ToString("yyyy年MM月");

                    if (!dicKey.ContainsKey(Indicatorid))
                        continue;
                    if (dicAuditRules.ContainsKey(Indicatorid))
                    {
                        ad = dicAuditRules[Indicatorid];
                        if (string.IsNullOrEmpty(ad["Red_start"].ToString()))
                        {
                            redS = 0;
                        }
                        else
                        {
                            redS = Convert.ToDecimal(ad["Red_start"].ToString());
                        }
                        if (string.IsNullOrEmpty(ad["Red_end"].ToString()))
                        {
                            redE = 0;
                        }
                        else
                        {
                            redE = Convert.ToDecimal(ad["Red_end"].ToString());
                        }
                        unit = ad["Unit"].ToString();
                    }
                    else
                    {
                        ad = null;
                        redS = null;
                        redE = null;
                        unit = null;
                    }
                    
                    foreach (var vv in citylist)
                    {
                        int i = vv.Value;
                        thisCity = vv.Key;
                        tableName = dicKey[Indicatorid];
                        stridata = table.Rows[i][index].ToString().Trim().Replace("\\", "\\\\");
                        isQuestion = false;
                        key = Indicatorid + thisCity;
                        lastNopNumber = dicMaxNopNumber.ContainsKey(key) ? dicMaxNopNumber[key] : "";
                        if (!string.IsNullOrEmpty(curdate) && !IsNopNumber(curdate)) // 当期时间格式非法
                        {
                            type = 3;   // 3-非法字符
                            isMust = 1; // 1-必须修改   
                            isQuestion = true;
                        }
                        else if (!string.IsNullOrEmpty(curdate) && curdate.EndsWith("月") && string.CompareOrdinal(curdate, datenow) > 0) // yyyy年MM月格式的晚于当前时间
                        {
                            type = 4;   // 4-数据有效性
                            isMust = 1; // 1-必须修改
                            isQuestion = true;
                        }
                        /*else if (!string.IsNullOrEmpty(lastNopNumber) && (
                                curdate.Substring(curdate.Length - 1, 1) != lastNopNumber.Substring(lastNopNumber.Length - 1, 1) // 当期时间与上期时间格式不相同
                                || string.CompareOrdinal(ChangeNopNumber(curdate), lastNopNumber) < 0))    // 当期时间早于上期时间*/
                        else if (!string.IsNullOrEmpty(lastNopNumber) && !string.IsNullOrEmpty(curdate) &&
                            curdate.Substring(curdate.Length - 1, 1) != lastNopNumber.Substring(lastNopNumber.Length - 1, 1)) // 当期时间与上期时间格式不相同
                        {
                            // 指标当期时间不能早于上次上报时间，不能晚于当前时间(yyyy年MM月格式的比较)
                            type = 4;   // 4-数据有效性
                            isMust = 1; // 1-必须修改
                            isQuestion = true;
                        }
                        else if (string.IsNullOrEmpty(stridata)) // 指标值为空
                        {
                            if ((string.IsNullOrEmpty(curdate) && string.IsNullOrEmpty(datasource)) || citylistByP.Contains(thisCity)) continue;
                            // 数据来源+当期时间不为空，指标值为空, 且不是地市
                            type = 2;   // 2-空白数据
                            isMust = 0; // 0-可不修改   
                            isQuestion = true;
                        }
                        //else if (Regex.IsMatch(stridata, @"[\u4e00-\u9fa5]")) // 指标值包含中文
                        else if (IsHasCHZN(stridata)) // 指标值包含中文
                        {
                            type = 3;   // 3-非法字符
                            isMust = 0; // 0-可不修改
                            isQuestion = true;
                        }
                        else if (!IsFloat(stridata)) // 指标值不是浮点数
                        {
                            type = 3;   // 3-非法字符
                            isMust = 1; // 1-必须修改
                            isQuestion = true;
                        }
                        else
                        {
                            // 指标值不为空且格式正确,期数或数据来源为空
                            if (string.IsNullOrEmpty(curdate) || string.IsNullOrEmpty(datasource))
                            {
                                type = 2;   // 2-空白数据
                                isMust = 1; // 1-必须修改
                                isQuestion = true;
                            }
                            else
                            {
                                // 通过红色问题数据效验
                                isQuestion = false;
                                //idata = Math.Round(Convert.ToDecimal(stridata), 2, MidpointRounding.AwayFromZero);
                                idata = Convert.ToDecimal(stridata);
                                // 指标值超出红色边界
                                if (ad != null && !(redS == 0 && redE == 0) && (idata < redS || idata > redE))
                                {
                                    type = 1;   // 1-指标值越界
                                    isMust = 1; // 1-必须修改
                                    isQuestion = true;
                                }
                                else if (!string.IsNullOrEmpty(unit) && unit.Contains("%") && Convert.ToDecimal(stridata) < 1)
                                {
                                    // 包含“%”的指标小于1
                                    type = 4;   // 4-数据有效性
                                    isMust = 0; // 0-可不修改
                                    isQuestion = true;
                                }
                            }
                        }
                        //if (idata == 0) continue;
                        //sql = bs.GetTableSQLByParams("Input_Select", "Input_Insert", "Input_Update", tableName, Indicatorid, citylist[i], curdate, idata, datasource, dicInsert, dicUpdate);

                        if (isQuestion)
                        {
                            ///type3 = citylistByP.Contains(citylist[i]) ? "2" : type2;
                            type3 = !citylistByP.Contains(thisCity) ? type2 : (type2 == "0" ? "3" : "2");
                            // 记录红色问题数据
                            sql = bs.getSQL(questionTabId, filename, batch, Indicatorid, datasource, thisCity, curdate, stridata, type, isMust, status, userid, username, DateTime.Now, lastNopNumber, type3);
                            if (!string.IsNullOrEmpty(sql))
                            {
                                sqllistUI.Add(sql);
                            }
                        }
                        else
                        {
                            if (citylistByP.Contains(thisCity))
                            {
                                tableName = string.Join("_C_", tableName.Split('_'));
                            }
                            sql = bs.GetTableSQLByParams(inputSelect, inputInsert, tableName, Indicatorid, thisCity, curdate, ChangeNopNumber(curdate), idata, datasource, dicInsert, dicNewIData, userid, type2);
                            if (!string.IsNullOrEmpty(sql))
                            {
                                sqllist.Add(sql);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                error_msg = "【导入Excel异常】：(" + Indicatorid + "," + datasource + "," + curdate + ","+ thisCity + ")：" + ex.Message;
                FileLog.WriteLog(error_msg + ex);
                return -6;
            }
            citylist.Clear();
            tableDic.Clear();

            ////拼接查询语句
            //StringBuilder build = new StringBuilder();
            //int size = sqllist.Count, cur = 0;
            //if (size > 0)
            //{
            //    foreach (string str in sqllist)
            //    {
            //        build.Append(str);
            //        if (++cur < size)
            //            build.Append(" UNION ALL ");
            //    }
            //}
            //sqllist.Clear();
            //if (build.Length == 0) return -2;

            //DataTable result = bs.GetResult(build.ToString());//执行查询操作，查询结果为：ID+CITY，ROWCOUNT（按ID、CITY、DATE三个字段匹配上的记录数）
            //build.Clear();

            //if (result.Rows.Count > 0)
            //{
            //    string strid;
            //    int key;
            //    foreach (DataRow row in result.Rows)
            //    {
            //        strid = row[0].ToString();
            //        key = Convert.ToInt32(row[1]);
            //        if (key == 0)//不存在记录，则插入
            //        {
            //            if (dicInsert.ContainsKey(strid))
            //                sqllist.Add(dicInsert[strid]);
            //        }
            //        else//存在记录，则更新
            //        {
            //            if (dicUpdate.ContainsKey(strid))
            //                sqllist.Add(dicUpdate[strid]);
            //        }
            //    }
            //}

            //int totnum = 0;
            //if (sqllist.Count > 0)
            //    totnum = bs.RunSQL(sqllist);//执行数据操作
            //sqllist.Clear();
            //return totnum;


            //拼接查询语句
            StringBuilder build = new StringBuilder();
            int size = sqllist.Count, cur = 0, totnum = 0;
            DataTable result;
            string newValueD, newValueS;
            if (size > 0)
            {
                foreach (string str in sqllist)
                {
                    build.Append(str);
                    if (++cur % 1000 == 0)
                    {
                        result = bs.GetResult(build.ToString());//执行查询操作，查询结果为：ID+CITY，ROWCOUNT（按ID、CITY、DATE三个字段匹配上的记录数）
                        build.Clear();

                        //存在记录，则更新
                        if (result.Rows.Count > 0)
                        {
                            string strid;
                            //int key;
                            foreach (DataRow row in result.Rows)
                            {
                                strid = row[0].ToString();
                                // key = Convert.ToInt32(row[1]);
                                if (Convert.IsDBNull(row[2]))//不存在记录，则插入
                                {
                                    if (dicInsert.ContainsKey(strid))
                                        sqllistUI.Add(dicInsert[strid]);
                                }
                                else//存在记录
                                {
                                    // 判断新导入的值是否与数据库中的值相同
                                    newValueD = dicNewIData[strid][0].ToString();
                                    newValueS = dicNewIData[strid][1].ToString();
                                    //if (string.IsNullOrEmpty(row[1].ToString()) || IsHasCHZN(row[1].ToString()) || newValue != Convert.ToDecimal(row[1]))
                                    if (newValueS != row[5].ToString()) // 数据来源不一样
                                    {
                                        //type3 = citylistByP.Contains(row[3].ToString()) ? "2" : type2;
                                        type3 = !citylistByP.Contains(row[3].ToString()) ? type2 : (type2 == "0" ? "3" : "2");
                                        //type3 = !IsCity(row[3].ToString(), citylistByP) ? type2 : (type2 == "0" ? "3" : "2");
                                        sqllistUI.Add(bs.getSQL(repeatTabId, filename, row[2].ToString().ToUpper(), row[5].ToString(), row[3].ToString(), row[4].ToString(), newValueS, row[5].ToString(), DateTime.Now, userid, username, batch, type3, newValueD, "SOURCENAME"));
                                    }
                                    else if (newValueD != row[1].ToString())  // 指标值不一样
                                    {
                                        //type3 = citylistByP.Contains(row[3].ToString()) ? "2" : type2;
                                        type3 = !citylistByP.Contains(row[3].ToString()) ? type2 : (type2 == "0" ? "3" : "2");
                                        //type3 = !IsCity(row[3].ToString(), citylistByP) ? type2 : (type2 == "0" ? "3" : "2");
                                        sqllistUI.Add(bs.getSQL(repeatTabId, filename, row[2].ToString().ToUpper(), row[5].ToString(), row[3].ToString(), row[4].ToString(), newValueD, row[1].ToString(), DateTime.Now, userid, username, batch, type3, newValueD, "IData"));
                                    }
                                }
                            }
                        }

                        if (sqllistUI.Count > 0)
                            totnum += bs.RunSQL(sqllistUI);//执行数据操作
                        sqllistUI.Clear();

                        continue;
                    }
                    if (cur < size)
                        build.Append(" UNION ALL ");
                }
            }
            sqllist.Clear();
            if (build.Length > 0)
            {
                result = bs.GetResult(build.ToString());//执行查询操作，查询结果为：ID+CITY，ROWCOUNT（按ID、CITY、DATE三个字段匹配上的记录数）
                build.Clear();

                if (result.Rows.Count > 0)
                {

                    string strid;
                    //int key;
                    foreach (DataRow row in result.Rows)
                    {
                        strid = row[0].ToString();
                        // key = Convert.ToInt32(row[1]);
                        if (Convert.IsDBNull(row[2]))//不存在记录，则插入
                        {
                            if (dicInsert.ContainsKey(strid))
                                sqllistUI.Add(dicInsert[strid]);
                        }
                        else//存在记记录
                        {
                            // 判断新导入的值是否与数据库中的值相同
                            newValueD = dicNewIData[strid][0].ToString();
                            newValueS = dicNewIData[strid][1].ToString();
                            //if (string.IsNullOrEmpty(row[1].ToString()) || IsHasCHZN(row[1].ToString()) || newValue != Convert.ToDecimal(row[1]))
                            if (newValueS != row[5].ToString()) // 数据来源不一样
                            {
                                //type3 = citylistByP.Contains(row[3].ToString()) ? "2" : type2;
                                type3 = !citylistByP.Contains(row[3].ToString()) ? type2 : (type2 == "0" ? "3" : "2");
                                sqllistUI.Add(bs.getSQL(repeatTabId, filename, row[2].ToString().ToUpper(), row[5].ToString(), row[3].ToString(), row[4].ToString(), newValueS, row[5].ToString(), DateTime.Now, userid, username, batch, type3, newValueD, "SOURCENAME"));
                            }
                            else if (newValueD != row[1].ToString())  // 指标值不一样
                            {
                                //type3 = citylistByP.Contains(row[3].ToString()) ? "2" : type2;
                                type3 = !citylistByP.Contains(row[3].ToString()) ? type2 : (type2 == "0" ? "3" : "2");
                                sqllistUI.Add(bs.getSQL(repeatTabId, filename, row[2].ToString().ToUpper(), row[5].ToString(), row[3].ToString(), row[4].ToString(), newValueD, row[1].ToString(), DateTime.Now, userid, username, batch, type3, newValueD, "IData"));
                            }
                        }
                    }
                }
            }

            if (sqllistUI.Count > 0)
                totnum += bs.RunSQL(sqllistUI);//执行数据操作
            sqllistUI.Clear();
            return totnum;
            
        }

        // 回写原始Excel文件
        private void updateExcel(string filename, string batch, ref List<Object[]> newData, ref BaseService bs)
        {
            FileLog.WriteLog("进入updateExcel...");
            // 没有要回写的内容
            if (newData == null || newData.Count == 0) return;
            string userid = UtilFunction.GetCookie("uid");
            DataTable dt = bs.GetResult(bs.getSQL("findSysName", 1, userid, batch, filename));
            // 数据库中没有备份记录
            if (dt == null || dt.Rows.Count == 0) return;
            FileLog.WriteLog("查到备份记录" + dt.Rows.Count);
            string path = _directory + "BackupFiles/Upd/";
            // 判断目标目录是否存在如果不存在则新建 
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            string sysname = dt.Rows[0]["SysName"].ToString();
            string pathOld = _directory + "BackupFiles/" + sysname;
            // 如果找不到备份文件
            if (!File.Exists(pathOld)) return;
            FileLog.WriteLog("查到备份文件");
            path += sysname;
            // 复制源文件
            if (!File.Exists(path))
            {
                System.IO.File.Copy(pathOld, path);
                FileLog.WriteLog("复制源文件");
            }
            // 回写
            SaveExcel SaveExcel = new SaveExcel();
            FileLog.WriteLog("开始回写...");
            SaveExcel.UpdateWriteExcelFile(path, "填写模板",ref newData);
        }

        /// <summary>
        /// 检测是否有中文字符
        /// </summary>
        /// <param name="inputData"></param>
        /// <returns></returns>
        public static bool IsHasCHZN(string inputData)
        {
            Regex RegCHZN = new Regex("[\u4e00-\u9fa5]");
            Match m = RegCHZN.Match(inputData);
            return m.Success;
        }
        
        /// <summary>
        /// 判断字符串是否为浮点数
        /// </summary>
        /// <param name="inputData"></param>
        /// <returns></returns>
        public static bool IsFloat(string inputData)
        {
            string regextext = @"^(-?\d+)(\.\d+)?$";
            Regex regex = new Regex(regextext, RegexOptions.None);
            return regex.IsMatch(inputData.Trim());
        }

        /// <summary>
        /// 判断当前期数是否符合规范
        /// </summary>
        /// <param name="inputData"></param>
        /// <returns></returns>
        public static bool IsNopNumber(string inputData)
        {
            string regextext1 = @"^((1[6-9]|[2-9]\d)\d{2})年(0[1-9]|1[012])月$";
            //string regestext2 = @"^((1[6-9]|[2-9]\d)\d{2})年第[一-九]期$";
            string regestext2 = @"^((1[6-9]|[2-9]\d)\d{2})年第[一二三四五六七八九十]期$";
            Regex regex1 = new Regex(regextext1, RegexOptions.None);
            Regex regex2 = new Regex(regestext2, RegexOptions.None);
            return (regex1.IsMatch(inputData.Trim()) || regex2.IsMatch(inputData.Trim()));
        }
        
        /// <summary>
        /// 将"YYYY年第一期"转变为"YYYY年第1期"
        /// </summary>
        /// <param name="nopnumber">当期时间(YYYY年第一期)</param>
        /// <returns></returns>
        public static string ChangeNopNumber(string nopnumber)
        {
            if (!nopnumber.EndsWith("期")) return nopnumber;
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("零", "0");
            dic.Add("一", "1");
            dic.Add("二", "2");
            dic.Add("三", "3");
            dic.Add("四", "4");
            dic.Add("五", "5");
            dic.Add("六", "6");
            dic.Add("七", "7");
            dic.Add("八", "8");
            dic.Add("九", "9");
            dic.Add("十", "10");
            string key = nopnumber.Substring(nopnumber.IndexOf('第') + 1, 1);
            string val = dic[key];
            return nopnumber.Replace(key, val);
        }

        public static string ChangeZHfoNum(string nopnumber)
        {
            if (!nopnumber.EndsWith("期")) return nopnumber;
            Regex r = new Regex("(?<=第).*?(?=期)", RegexOptions.IgnoreCase);
            Dictionary<string, string> dic = new Dictionary<string, string>();
            dic.Add("0", "零");
            dic.Add("1", "一");
            dic.Add("2", "二");
            dic.Add("3", "三");
            dic.Add("4", "四");
            dic.Add("5", "五");
            dic.Add("6", "六");
            dic.Add("7", "七");
            dic.Add("8", "八");
            dic.Add("9", "九");
            dic.Add("10", "十");
            string key = nopnumber.Substring(nopnumber.IndexOf('第') + 1, 1);
            string val = dic[key];
            string value = r.Replace(nopnumber, val);
            return value;
        }

        public static void getCity(ref string city, ref List<string> list)
        {
            // 先全量对比
            /*foreach (string str in list)
            {
                if (city == str)
                {
                    return;
                }
            }*/
            if (list.Contains(city)) return;

            // 然后模糊对比
            foreach (string str in list)
            {
                if (str.Contains(city) || city.Contains(str))
                {
                    city = str;
                    break;
                }
            }
        }

        /// <summary>
        /// 验证文件名
        /// </summary>
        /// <param name="filename">文件名</param>
        /// <returns></returns>
        private bool IsFileName(string filename, List<string> zychs)
        {
            bool isOk = true;
            filename = filename.Replace(".xlsx", ""); // 去掉后缀名
            
            /*List<string> zychs = new List<string>();
            zychs.Add("质量管理处");
            zychs.Add("无线优化处");
            zychs.Add("集团客户业务支撑处");
            zychs.Add("网管中心网络监控处");
            zychs.Add("网管中心互联网资源管理处");*/

            List<string> sgs = BaseService.getBaseCity();
            sgs.Add("全国");

            string[] sArray = filename.Split('_');
            string regextext1 = @"^((1[6-9]|[2-9]\d)\d{2})(0[1-9]|1[012])$"; //YYYYMM
            string regextext2 = @"^((1[6-9]|[2-9]\d)\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])(0[0-9]|[1]\d|2[0-3])(0[0-9]|[1-5]\d)$"; // YYYYMMDDHHMM
            string regextext3 = @"^1[3578]\d{9}$"; // 手机号
            Regex regex1 = new Regex(regextext1, RegexOptions.None);
            Regex regex2 = new Regex(regextext2, RegexOptions.None);
            Regex regex3 = new Regex(regextext3, RegexOptions.None);
            if (sArray.Length < 7)
            {
                isOk = false;
                error_msg = "文件名不符合规范：请参照《<上报单位属性>_<上报单位名称>_<指标有效时间>_<指标上报时间>_<指标负责人>_<业务>_<联系电话>.xlsx》";
            }
            else if (!(sArray[0] == "专业处室" || sArray[0] == "省公司" || sArray[0] == "其他来源"))
            {
                isOk = false;
                error_msg = "文件名不符合规范：上报单位属性只能是“专业处室”、“省公司”、“其他来源”。请参照《专业处室/省公司/其他来源_<上报单位名称>_<指标有效时间>_<指标上报时间>_<指标负责人>_<业务>_<联系电话>.xlsx》";
            }
            else if (sArray[0] == "省公司" && !sgs.Contains(sArray[1]))
            {
                isOk = false;
                error_msg = "文件名不符合规范：没有省份名称或省份名不正确。请参照《省公司_北京_<指标有效时间>_<指标上报时间>_<指标负责人>_<业务>_<联系电话>.xlsx》";
            }
            else if (sArray[0] == "专业处室" && !zychs.Contains(sArray[1]))
            {
                isOk = false;
                error_msg = "文件名不符合规范：没有专业处室名或处室名称不正确。请参照《专业处室_质量管理处_<指标有效时间>_<指标上报时间>_<指标负责人>_<业务>_<联系电话>.xlsx》";
            }
            else if (!regex1.IsMatch(sArray[2]))
            {
                isOk = false;
                error_msg = "文件名不符合规范：指标有效时间格式不正确。请参照《"+ sArray[0] + "_"+ sArray[1] + "_<指标有效时间YYYYMM>_<指标上报时间YYYYMMDDHHMM>_<指标负责人>_<业务>_<联系电话>.xlsx》";
            }
            else if (!regex2.IsMatch(sArray[3]))
            {
                isOk = false;
                error_msg = "文件名不符合规范：指标上报时间格式不正确。请参照《" + sArray[0] + "_" + sArray[1] + "_<指标有效时间YYYYMM>_<指标上报时间YYYYMMDDHHMM>_<指标负责人>_<业务>_<联系电话>.xlsx》";
            }
            else if (!regex3.IsMatch(sArray[6]))
            {
                isOk = false;
                error_msg = "文件名不符合规范：请输入正确的手机号。";
            }
            return isOk;
        }
    }
}
