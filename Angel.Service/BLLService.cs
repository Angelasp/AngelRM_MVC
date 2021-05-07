using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Ninject;
using Angel.DBHelper;
using Angel.BLL;
using Angel.Utils;
using System.Data;

namespace Angel.Service
{
    /*************************************************************************
     * 文件名称 ：BLLService.cs                          
     * 描述说明 ：执行语句操作
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    public class BLLService : IDataService
    {
        [Inject]
        public IDatabase Database { get; set; }

        /// <summary>
        /// xml 缓存
        /// </summary>
        Dictionary<string, Dictionary<Dictionary<string, string>, Dictionary<string, string>>> collection = null;

        public BLLService()
        {
            if (collection == null)
            {
                collection = System.Web.HttpContext.Current.Application["key"] as Dictionary<string, Dictionary<Dictionary<string, string>, Dictionary<string, string>>>;// CMDI.Utils.XmlHelper.GetXmlCache();
            }
        }
        public string GetData(Newtonsoft.Json.Linq.JObject param, string serverName)
        {
            string result = "";
            try
            {
                if (collection != null)
                {
                    var val = collection[serverName];
                    if (val.Count > 0)
                    {
                        Dictionary<string, string> list = new Dictionary<string, string>();
                        foreach (Dictionary<string, string> k in val.Keys)
                        {
                            foreach (var i in k)
                            {
                                foreach (var p in param)
                                {
                                    if (i.Key.Trim().ToLower() == p.Key.Trim().ToLower())
                                    {
                                        list.Add(i.Value.Trim(), p.Value.ToString().Trim());
                                    }
                                }
                            }

                        }

                        //替换后的sql语句
                        Dictionary<string, string> repSql = new Dictionary<string, string>();
                        foreach (var item in val)
                        {
                            foreach (var s in item.Value)
                            {
                                string sql = s.Value;
                                foreach (var o in list)
                                {
                                    if (s.Value.Contains(o.Key))
                                    {
                                        sql = sql.Replace(o.Key, o.Value);
                                    }
                                }
                                repSql.Add(s.Key, sql);
                            }

                            if (repSql != null && repSql.Count > 0)
                            {
                                foreach (var sql in repSql)
                                {
                                    result = Database.Select(sql.Value);
                                }
                            }

                        }
                    }

                }
            }
            catch (Exception er)
            {
                FileLog.WriteLog(er.ToString());
            }
            return result;//.ToString();
        }

        //管理模块用
        public string GetDataOriginal(Newtonsoft.Json.Linq.JObject param, string serverName)
        {
            string result = "";
            try
            {
                if (collection != null)
                {
                    var val = collection[serverName];
                    if (val.Count > 0)
                    {
                        Dictionary<string, string> list = new Dictionary<string, string>();
                        foreach (Dictionary<string, string> k in val.Keys)
                        {
                            foreach (var i in k)
                            {
                                foreach (var p in param)
                                {
                                    if (i.Key.Trim().ToLower() == p.Key.Trim().ToLower())
                                    {
                                        list.Add(i.Value.Trim(), p.Value.ToString().Trim());
                                    }
                                }
                            }

                        }

                        //替换后的sql语句
                        Dictionary<string, string> repSql = new Dictionary<string, string>();
                        foreach (var item in val)
                        {
                            foreach (var s in item.Value)
                            {
                                string sql = s.Value;
                                foreach (var o in list)
                                {
                                    if (s.Value.Contains(o.Key))
                                    {
                                        sql = sql.Replace(o.Key, o.Value);
                                    }
                                }
                                repSql.Add(s.Key, sql);
                            }

                            if (repSql != null && repSql.Count > 0)
                            {
                                foreach (var sql in repSql)
                                {
                                    result = Database.SelectOriginal(sql.Value);
                                }
                            }

                        }
                    }

                }
            }
            catch (Exception er)
            {
                FileLog.WriteLog(er.ToString());
            }
            return result;//.ToString();
        }

        public string InsertData(Newtonsoft.Json.Linq.JObject param, string serverName)
        {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            string code = "\"code\":{{\"id\":{0},\"msg\":\"{1}\"}}";

            try
            {
                if (collection != null)
                {
                    var val = collection[serverName];
                    if (val.Count > 0)
                    {
                        Dictionary<string, string> list = new Dictionary<string, string>();
                        foreach (Dictionary<string, string> k in val.Keys)
                        {
                            foreach (var i in k)
                            {
                                foreach (var p in param)
                                {
                                    if (i.Key.Trim().ToLower() == p.Key.Trim().ToLower())
                                    {
                                        list.Add(i.Value.Trim(), p.Value.ToString().Trim());
                                    }
                                }
                            }

                        }

                        //替换后的sql语句
                        Dictionary<string, string> repSql = new Dictionary<string, string>();

                        foreach (var item in val)
                        {
                            foreach (var s in item.Value)
                            {
                                string sql = s.Value;
                                foreach (var o in list)
                                {
                                    if (s.Value.Contains(o.Key))
                                    {
                                        sql = sql.Replace(o.Key, o.Value);
                                    }
                                }
                                repSql.Add(s.Key, sql);
                            }

                            string newSql = repSql.First().Value;
                            if (newSql.Equals("") == false)
                            {
                                object obj = Database.ExecuteScalar(newSql);

                                if (Convert.ToInt32(obj) > 0)
                                {
                                    foreach (var sql in repSql)
                                    {
                                        if (sql.Value.Equals(repSql.First().Value) == false)
                                        {
                                            result.Append("\"" + sql.Key + "\":");
                                            if (sql.Value.Contains("SELECT"))
                                            {
                                                result.Append(Database.Select(sql.Value));
                                            }
                                            else if (sql.Value.Contains("INSERT"))
                                            {
                                                result.Append(Database.Create(sql.Value));
                                            }
                                            result.Append(",");
                                        }
                                    }
                                    code = string.Format(code, 1, "成功");
                                    //code = "\"code\":[{\"id\":1,\"msg\":\"成功\"}]";
                                }
                                else
                                {
                                    //jsons.Remove("code");
                                    code = string.Format(code, 4, "名称不可重复");
                                    //code = "\"code\":[{\"id\":4,\"msg\":\"名称不可重复\"}]";
                                    //jsons.Add("msg", "用户名或密码错误");
                                    break;
                                }

                            }

                        }
                    }
                }
            }
            catch (Exception er)
            {
                code = string.Format(code, 3, "数据库错误");
                //code = "\"code\":[{\"id\":3,\"msg\":\"数据库错误\"}]";
                FileLog.WriteLog(er.ToString());
            }
            result.Append(code);
            result.Append("}");
            return result.ToString();
        }

        public string UpdateData(Newtonsoft.Json.Linq.JObject param, string serverName)
        {
            string result = "";
            if (collection != null)
            {
                var val = collection[serverName];
                if (val.Count > 0)
                {
                    Dictionary<string, string> list = new Dictionary<string, string>();
                    foreach (Dictionary<string, string> k in val.Keys)
                    {
                        foreach (var i in k)
                        {
                            foreach (var p in param)
                            {
                                if (i.Key.Trim().ToLower() == p.Key.Trim().ToLower())
                                {
                                    list.Add(i.Value.Trim(), p.Value.ToString().Trim());
                                }
                            }
                        }

                    }


                    foreach (var item in val)
                    {
                        var sql = item.Value;
                        foreach (var s in sql)
                        {
                            string newSql = s.Value;
                            foreach (var o in list)
                            {
                                if (s.Value.Contains(o.Key))
                                {
                                    newSql = newSql.Replace(o.Key, o.Value);
                                }
                            }


                            if (newSql.Equals("") == false)
                            {
                                result = Database.Update(newSql);
                            }

                        }
                    }
                }

            }

            return result;
        }

        public string DeleteData(Newtonsoft.Json.Linq.JObject param, string serverName)
        {
            string result = "";
            if (collection != null)
            {
                var val = collection[serverName];
                if (val.Count > 0)
                {
                    Dictionary<string, string> list = new Dictionary<string, string>();
                    foreach (Dictionary<string, string> k in val.Keys)
                    {
                        foreach (var i in k)
                        {
                            foreach (var p in param)
                            {
                                if (i.Key.Trim().ToLower() == p.Key.Trim().ToLower())
                                {
                                    list.Add(i.Value.Trim(), p.Value.ToString().Trim());
                                }
                            }
                        }

                    }


                    foreach (var item in val)
                    {
                        var sql = item.Value;
                        foreach (var s in sql)
                        {
                            string newSql = s.Value;
                            foreach (var o in list)
                            {
                                if (s.Value.Contains(o.Key))
                                {
                                    newSql = newSql.Replace(o.Key, o.Value);
                                }
                            }


                            if (newSql.Equals("") == false)
                            {
                                result = Database.Delete(newSql);
                            }

                        }
                    }
                }

            }

            return result;
        }

        public string EditData(Newtonsoft.Json.Linq.JObject param, string severName)
        {
            return "";
        }

        public string GetDataBefor(Newtonsoft.Json.Linq.JObject param, string serverName)
        {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            string code = "\"code\":{{\"id\":{0},\"msg\":\"{1}\"}}";
            try
            {
                if (collection != null)
                {
                    var val = collection[serverName];
                    if (val.Count > 0)
                    {
                        Dictionary<string, string> list = new Dictionary<string, string>();
                        foreach (Dictionary<string, string> k in val.Keys)
                        {
                            foreach (var i in k)
                            {
                                foreach (var p in param)
                                {
                                    if (i.Key.Trim().ToLower() == p.Key.Trim().ToLower())
                                    {
                                        list.Add(i.Value.Trim(), p.Value.ToString().Trim());
                                    }
                                }
                            }

                        }

                        //替换后的sql语句
                        Dictionary<string, string> repSql = new Dictionary<string, string>();

                        foreach (var item in val)
                        {
                            foreach (var s in item.Value)
                            {
                                string sql = s.Value;
                                foreach (var o in list)
                                {
                                    if (s.Value.Contains(o.Key))
                                    {
                                        sql = sql.Replace(o.Key, o.Value);
                                    }
                                }
                                repSql.Add(s.Key, sql);
                            }

                            string newSql = repSql.First().Value;
                            if (newSql.Equals("") == false)
                            {
                                object obj = Database.ExecuteScalar(newSql);

                                if (Convert.ToInt32(obj) > 0)
                                {
                                    foreach (var sql in repSql)
                                    {
                                        if (sql.Value.Equals(repSql.First().Value) == false)
                                        {
                                            result.Append("\"" + sql.Key + "\":");
                                            if (sql.Value.Contains("SELECT"))
                                            {
                                                result.Append(Database.Select(sql.Value));
                                            }
                                            else if (sql.Value.Contains("INSERT"))
                                            {
                                                result.Append(Database.Create(sql.Value));
                                            }
                                            else if (sql.Value.Contains("UPDATE"))
                                            {
                                                result.Append(Database.Update(sql.Value));
                                            }
                                            else if (sql.Value.Contains("DELETE"))
                                            {
                                                result.Append(Database.Delete(sql.Value));
                                            }
                                            result.Append(",");
                                        }
                                    }
                                    code = string.Format(code, 1, "成功");
                                }
                                else
                                {
                                    code = string.Format(code, 2, "用户名或密码错误");
                                    break;
                                }

                            }

                        }

                    }

                }
            }
            catch (Exception er)
            {
                code = string.Format(code, 3, "数据库错误");
                FileLog.WriteLog(er.ToString());


            }

            result.Append(code);
            result.Append("}");
            return result.ToString();
        }

        public string InsertBatch(Newtonsoft.Json.Linq.JArray param, string serverName)
        {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            string code = "\"code\":{{\"id\":{0},\"msg\":\"{1}\"}}";
            try
            {
                if (collection != null)
                {
                    var val = collection[serverName];
                    if (val.Count > 0)
                    {


                        //"{xx:xx},{xx:xx}"
                        //Dictionary<string, string> list = new Dictionary<string, string>();
                        List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
                        Dictionary<string, string> kvPair = null;


                        foreach (var arry in param)
                        {
                            kvPair = new Dictionary<string, string>();
                            foreach (var o in Newtonsoft.Json.Linq.JObject.FromObject(arry))
                            {
                                foreach (Dictionary<string, string> k in val.Keys)
                                {
                                    foreach (var i in k)
                                    {
                                        if (i.Key.Trim().ToLower() == o.Key.Trim().ToLower())
                                        {
                                            kvPair.Add(i.Value.Trim(), o.Value.ToString().Trim());
                                            break;
                                        }

                                    }

                                }

                            }

                            if (kvPair.Count > 0)
                            {
                                list.Add(kvPair);
                            }

                        }

                        //替换后的sql语句
                        List<string> repSql = new List<string>();
                        foreach (var item in val)
                        {
                            foreach (var s in item.Value)
                            {
                                foreach (var i in list)
                                {
                                    string sql = s.Value;
                                    foreach (var o in i)
                                    {
                                        if (s.Value.Contains(o.Key))
                                        {
                                            sql = sql.Replace(o.Key, o.Value);
                                        }
                                    }
                                    repSql.Add(sql);
                                }

                            }
                        }

                        if (repSql.Count > 0)
                        {
                            result.Append(Database.InsertBatch(repSql));
                            result.Append(",");
                            code = string.Format(code, 1, "成功");
                        }


                    }

                }
            }
            catch (Exception er)
            {
                code = string.Format(code, 3, "数据库错误");
                //code = "\"code\":[{\"id\":3,\"msg\":\"数据库错误\"}]";
                FileLog.WriteLog(er.ToString());
            }

            result.Append(code);
            result.Append("}");
            return result.ToString();
        }

        public string InsertBatchCheck(Newtonsoft.Json.Linq.JArray param, string serverName)
        {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            string code = "\"code\":{{\"id\":{0},\"msg\":\"{1}\"}}";
            try
            {
                if (collection != null)
                {
                    var val = collection[serverName];
                    if (val.Count > 0)
                    {
                        List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
                        Dictionary<string, string> kvPair = null;

                        foreach (var arry in param)
                        {
                            kvPair = new Dictionary<string, string>();
                            foreach (var o in Newtonsoft.Json.Linq.JObject.FromObject(arry))
                            {
                                foreach (Dictionary<string, string> k in val.Keys)
                                {
                                    foreach (var i in k)
                                    {
                                        if (i.Key.Trim().ToLower() == o.Key.Trim().ToLower())
                                        {
                                            kvPair.Add(i.Value.Trim(), o.Value.ToString().Trim());
                                            break;
                                        }
                                    }
                                }
                            }
                            if (kvPair.Count > 0)
                            {
                                list.Add(kvPair);
                            }
                        }

                        //替换后的sql语句
                        List<string> repSql = new List<string>();
                        foreach (var item in val)
                        {
                            foreach (var s in item.Value)
                            {
                                foreach (var i in list)
                                {
                                    string sql = s.Value;
                                    foreach (var o in i)
                                    {
                                        if (s.Value.Contains(o.Key))
                                        {
                                            sql = sql.Replace(o.Key, o.Value);
                                        }
                                    }
                                    repSql.Add(sql);
                                }
                            }
                        }

                        List<string> sqlArray = new List<string>();
                        if (repSql.Count > 0)
                        {
                            object obj = Database.ExecuteScalar(repSql.First());
                            if (Convert.ToInt32(obj) > 0)
                            {
                                code = string.Format(code, 2, "有重复");
                            }
                            else
                            {
                                foreach (var sql in repSql)
                                {
                                    if (sql.Equals(repSql.First()) == false)
                                    {
                                        sqlArray.Add(sql);
                                    }
                                }
                                Database.InsertBatch(sqlArray);
                                code = string.Format(code, 1, "成功");
                            }
                        }
                    }
                }
            }
            catch (Exception er)
            {
                code = string.Format(code, 3, "数据库错误");
                //code = "\"code\":[{\"id\":3,\"msg\":\"数据库错误\"}]";
                FileLog.WriteLog(er.ToString());
            }

            result.Append(code);
            result.Append("}");
            return result.ToString();
        }

        public string MulteBatch(List<string> sqlArray)
        {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            string code = "\"code\":{{\"id\":{0},\"msg\":\"{1}\"}}";
            try
            {
                result.Append(Database.MulteBatch(sqlArray));
                result.Append(",");
                code = string.Format(code, 1, "成功");
            }
            catch (Exception er)
            {
                code = string.Format(code, 3, "数据库错误");
                //code = "\"code\":[{\"id\":3,\"msg\":\"数据库错误\"}]";
                FileLog.WriteLog(er.ToString());
            }

            result.Append(code);
            result.Append("}");
            return result.ToString();
        }

        public string MulteBatch(Dictionary<string, Newtonsoft.Json.Linq.JArray> param)
        {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            string code = "\"code\":{{\"id\":{0},\"msg\":\"{1}\"}}";
            try
            {
                if (collection != null)
                {
                    if (param != null)
                    {
                        List<string> repSql = new List<string>();
                        foreach (var d in param)
                        {
                            var val = collection[d.Key];
                            if (val.Count > 0)
                            {

                                //"{xx:xx},{xx:xx}"
                                //Dictionary<string, string> list = new Dictionary<string, string>();
                                List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
                                Dictionary<string, string> kvPair = null;


                                foreach (var arry in d.Value)
                                {
                                    kvPair = new Dictionary<string, string>();
                                    foreach (var o in Newtonsoft.Json.Linq.JObject.FromObject(arry))
                                    {
                                        foreach (Dictionary<string, string> k in val.Keys)
                                        {
                                            foreach (var i in k)
                                            {
                                                if (i.Key.Trim().ToLower() == o.Key.Trim().ToLower())
                                                {
                                                    kvPair.Add(i.Value.Trim(), o.Value.ToString().Trim());
                                                    break;
                                                }

                                            }

                                        }

                                    }

                                    if (kvPair.Count > 0)
                                    {
                                        list.Add(kvPair);
                                    }

                                }

                                //替换后的sql语句

                                foreach (var item in val)
                                {
                                    foreach (var s in item.Value)
                                    {
                                        foreach (var i in list)
                                        {
                                            string sql = s.Value;
                                            foreach (var o in i)
                                            {
                                                if (s.Value.Contains(o.Key))
                                                {
                                                    sql = sql.Replace(o.Key, o.Value);
                                                }
                                            }
                                            repSql.Add(sql);
                                        }

                                    }
                                }







                            }
                        }


                        if (repSql.Count > 0)
                        {
                            result.Append(Database.MulteBatch(repSql));
                            result.Append(",");
                            code = string.Format(code, 1, "成功");
                        }

                    }

                }
            }
            catch (Exception er)
            {
                code = string.Format(code, 3, "数据库错误");
                //code = "\"code\":[{\"id\":3,\"msg\":\"数据库错误\"}]";
                FileLog.WriteLog(er.ToString());
            }

            result.Append(code);
            result.Append("}");
            return result.ToString();
        }

        public string ExecuteScalar(Dictionary<string, Newtonsoft.Json.Linq.JArray> param)
        {
            Object obj = new Object();

            try
            {
                if (collection != null)
                {
                    if (param != null)
                    {
                        List<string> repSql = new List<string>();
                        foreach (var d in param)
                        {
                            var val = collection[d.Key];
                            if (val.Count > 0)
                            {

                                //"{xx:xx},{xx:xx}"
                                //Dictionary<string, string> list = new Dictionary<string, string>();
                                List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
                                Dictionary<string, string> kvPair = null;


                                foreach (var arry in d.Value)
                                {
                                    kvPair = new Dictionary<string, string>();
                                    foreach (var o in Newtonsoft.Json.Linq.JObject.FromObject(arry))
                                    {
                                        foreach (Dictionary<string, string> k in val.Keys)
                                        {
                                            foreach (var i in k)
                                            {
                                                if (i.Key.Trim().ToLower() == o.Key.Trim().ToLower())
                                                {
                                                    kvPair.Add(i.Value.Trim(), o.Value.ToString().Trim());
                                                    break;
                                                }

                                            }

                                        }

                                    }

                                    if (kvPair.Count > 0)
                                    {
                                        list.Add(kvPair);
                                    }

                                }

                                //替换后的sql语句

                                foreach (var item in val)
                                {
                                    foreach (var s in item.Value)
                                    {
                                        foreach (var i in list)
                                        {
                                            string sql = s.Value;
                                            foreach (var o in i)
                                            {
                                                if (s.Value.Contains(o.Key))
                                                {
                                                    sql = sql.Replace(o.Key, o.Value);
                                                }
                                            }
                                            repSql.Add(sql + ";Select @@Identity");
                                        }

                                    }
                                }

                            }
                        }


                        if (repSql.Count > 0)
                        {
                            obj = Database.ExecuteScalar(repSql[0]);
                        }

                    }

                }
            }
            catch (Exception er)
            {
                //code = "\"code\":[{\"id\":3,\"msg\":\"数据库错误\"}]";
                FileLog.WriteLog(er.ToString());
            }

            return obj.ToString();
        }
        /// <summary>
        /// author:Alcedo
        /// </summary>
        /// <param name="param"></param>
        /// <param name="serverName"></param>
        /// <returns></returns>
        public string UpdatePassWord(Newtonsoft.Json.Linq.JArray param, string serverName)
        {
            StringBuilder result = new StringBuilder();
            result.Append("{");
            string code = "\"code\":{{\"id\":{0},\"msg\":\"{1}\"}}";
            try
            {
                if (collection != null)
                {
                    var val = collection[serverName];
                    if (val.Count > 0)
                    {
                        List<Dictionary<string, string>> list = new List<Dictionary<string, string>>();
                        Dictionary<string, string> kvPair = null;

                        foreach (var arry in param)
                        {
                            kvPair = new Dictionary<string, string>();
                            foreach (var o in Newtonsoft.Json.Linq.JObject.FromObject(arry))
                            {
                                foreach (Dictionary<string, string> k in val.Keys)
                                {
                                    foreach (var i in k)
                                    {
                                        if (i.Key.Trim().ToLower() == o.Key.Trim().ToLower())
                                        {
                                            kvPair.Add(i.Value.Trim(), o.Value.ToString().Trim());
                                            break;
                                        }
                                    }
                                }
                            }
                            if (kvPair.Count > 0)
                            {
                                list.Add(kvPair);
                            }
                        }

                        //替换后的sql语句
                        List<string> repSql = new List<string>();
                        foreach (var item in val)
                        {
                            foreach (var s in item.Value)
                            {
                                foreach (var i in list)
                                {
                                    string sql = s.Value;
                                    foreach (var o in i)
                                    {
                                        if (s.Value.Contains(o.Key))
                                        {
                                            sql = sql.Replace(o.Key, o.Value);
                                        }
                                    }
                                    repSql.Add(sql);
                                }
                            }
                        }
                        List<string> sqlArray = new List<string>();
                        if (repSql.Count > 0)
                        {
                            object obj = Database.ExecuteScalar(repSql.First());
                            if (Convert.ToInt32(obj) == 0)
                            {
                                code = string.Format(code, 2, "原密码错误");
                            }
                            else
                            {
                                foreach (var sql in repSql)
                                {
                                    if (sql.Equals(repSql.First()) == false)
                                    {
                                        sqlArray.Add(sql);
                                    }
                                }
                                Database.InsertBatch(sqlArray);
                                code = string.Format(code, 1, "成功");
                            }
                        }
                    }
                }
            }
            catch (Exception er)
            {
                code = string.Format(code, 3, "数据库错误");
                FileLog.WriteLog(er.ToString());
            }
            result.Append(code);
            result.Append("}");
            return result.ToString();
        }

        /// <summary>
        /// 直接获取key添加查询条件
        /// </summary>
        /// <param name="key"></param>
        /// <param name="wheresql"></param>
        /// <returns></returns>
        public DataTable GetWhereDataTable(string key, string wheresql)
        {
            try
            {
                Dictionary<string, string> values = new Dictionary<string, string>();
                string sql = "";

                if (wheresql != null)
                {
                    values = XmlHelper.ReadXml("SqlQuery", key);
                    sql = string.Format(values.First().Value, wheresql);
                }
                DataTable dt = MySqlHelpers.GetDataTable(sql);
                return dt;

            }
            catch (Exception er)
            {
                FileLog.WriteLog("异常捕捉：Angel.Service.BLLService" + er.ToString());
                return null;
            }
        }

    }
    /*************************************************************************
    * 文件名称 ：BLLService.cs                          
    * 描述说明 ：执行语句操作
    * 
    * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
    * 修订信息 : modify by (person) on (date) for (reason)
    * 
    * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
    **************************************************************************
    */
}
