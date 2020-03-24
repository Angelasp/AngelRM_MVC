using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Angel.DataAccess;
using System.Data;
using System.Collections;
using Angel.DBHelper;
using MySql.Data.MySqlClient;
using Angel.Model;
using Angel.Utils;

namespace Angel.DataAccess
{
    /*************************************************************************
     * 文件名称 ：BaseService.cs                          
     * 描述说明 ：sql语句操作类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    public class BaseService : AbstractDataManager
    {
        public Angel.Model.GridBinding GetGridBinding(string reportname)
        {
            Dictionary<string, Dimention> report = GetReport();
            Dimention dimention = report[reportname];
            return dimention.GridBinding;
        }

        /// <summary>
        /// 安装ID编号查找
        /// </summary>
        /// <param name="tabID"></param>
        /// <returns></returns>
        public DataTable GetGridDataSource(string tabID)
        {
            Dictionary<string, Dimention> report = GetReport();
            Dimention dimention = report[tabID];
            ArrayList al = new ArrayList();
            string sql = "";
            DataTable dt = null;

            sql = dimention.SqlAll.Replace("%Where%", " ");
            al.Add(sql);
            DataSet ds = new DataSet();

            ds = MySqlHelpers.Query(al);
            for (int i = 0; i < ds.Tables.Count; i++)
            {
                if (dt != null)
                {
                    if (ds.Tables[i].Rows.Count > 0)
                    {
                        dt.Merge(ds.Tables[i]);
                    }
                }
                else
                {
                    if (ds.Tables[i].Rows.Count > 0)
                    {
                        dt = ds.Tables[i].Copy();
                    }
                }
            }
            if (dt != null)
            {
                DataView dv = dt.DefaultView;
                //  dv.Sort = "CITYNAME";
                dt = dv.ToTable();
            }
            return dt;
        }

        static List<string> listBaseCity = null;

        public static List<string> getBaseCity()
        {
            if (listBaseCity != null && listBaseCity.Count > 0)
                return listBaseCity;
            listBaseCity = new List<string>();
            listBaseCity.Add("安徽");
            listBaseCity.Add("北京");
            listBaseCity.Add("福建");
            listBaseCity.Add("甘肃");
            listBaseCity.Add("广东");
            listBaseCity.Add("广西");
            listBaseCity.Add("贵州");
            listBaseCity.Add("海南");
            listBaseCity.Add("河北");
            listBaseCity.Add("河南");
            listBaseCity.Add("黑龙江");
            listBaseCity.Add("湖北");
            listBaseCity.Add("湖南");
            listBaseCity.Add("吉林");
            listBaseCity.Add("江苏");
            listBaseCity.Add("江西");
            listBaseCity.Add("辽宁");
            listBaseCity.Add("内蒙古");
            listBaseCity.Add("宁夏");
            listBaseCity.Add("青海");
            listBaseCity.Add("山东");
            listBaseCity.Add("山西");
            listBaseCity.Add("陕西");
            listBaseCity.Add("上海");
            listBaseCity.Add("四川");
            listBaseCity.Add("天津");
            listBaseCity.Add("西藏");
            listBaseCity.Add("新疆");
            listBaseCity.Add("云南");
            listBaseCity.Add("浙江");
            listBaseCity.Add("重庆");
            listBaseCity.Add("全网");

            return listBaseCity;
        }
        /// <summary>
        /// 直接返回datatable 此情况在执行单个语句
        /// </summary>
        /// <param name="TabId"></param>
        /// <returns></returns>
        public DataTable GetDataTableToID(string TabId)
        {
            Dictionary<string, Dimention> report = GetReport();
            Dimention dimention = report[TabId];
            string sql = "";
            DataTable dt = null;
            sql = dimention.SqlAll.Replace("%Where%", "");
            dt = MySqlHelpers.GetDataTable(sql.Trim());
            if (dt != null)
            {
                return dt;
            }
            else
            {
                return null;
            }
        }

        public DataTable GetDataTableToIDWhere(string TabId, string where)
        {
            Dictionary<string, Dimention> report = GetReport();
            Dimention dimention = report[TabId];
            string sql = "";
            DataTable dt = null;
            sql = dimention.SqlAll.Replace("%Where%", where).Trim();
            dt = MySqlHelpers.GetDataTable(sql);
            if (dt != null)
            {
                return dt;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        ///   直接返回datatable 此情况在执行单个语句，替换多个条件
        /// </summary>
        /// <param name="TabId"></param>
        /// <param name="where1"></param>
        /// <param name="where2"></param>
        /// <returns></returns>
        public DataTable GetDataTableToIDWhere(string TabId, string where1, string where2)
        {
            Dictionary<string, Dimention> report = GetReport();
            Dimention dimention = report[TabId];
            string sql = "";
            DataTable dt = null;
            sql = dimention.SqlAll.Replace("%Where1%", where1).Replace("%Where2%", where2).Trim();
            dt = MySqlHelpers.GetDataTable(sql);
            if (dt != null)
            {
                return dt;
            }
            else
            {
                return null;
            }
        }


        public void LoadReport()
        {
            GetReport();
        }


        public string GetTableSQLByParams(string TabId_Sel, string TabId_Ins, string tabName, string Indicatorid, string city, string date, string cdate, decimal IData, string sourceName, Dictionary<string, string> dicInsert, Dictionary<string, List<Object>> dicNewIData, string userid, string type)
        {
            //select语句
            Dictionary<string, Dimention> report = GetReport();
            Dimention dimention = report[TabId_Sel];
            string sql = "", sql_insert, strkey;
            if (string.IsNullOrEmpty(type))
            {
                sql = String.Format(dimention.SqlAll, Indicatorid, city, tabName, Indicatorid, city, date);
            }
            else
            {
                sql = String.Format(dimention.SqlAll, Indicatorid, city, tabName, Indicatorid, city, date, type);
            }

            //key值
            strkey = Indicatorid + city;

            //insert语句
            dimention = report[TabId_Ins];
            if (string.IsNullOrEmpty(type))
            {
                sql_insert = String.Format(dimention.SqlAll, tabName, Indicatorid, IData, sourceName, city, date, DateTime.Now, userid, cdate);
            }
            else
            {
                sql_insert = String.Format(dimention.SqlAll, tabName, Indicatorid, IData, sourceName, city, date, DateTime.Now, userid, cdate, type);
            }
            if (dicInsert.ContainsKey(strkey))
            {
                dicInsert[strkey] = sql_insert;
            }
            else
            {
                dicInsert.Add(strkey, sql_insert);
            }

            // IData值
            if (dicNewIData.ContainsKey(strkey))
            {
                dicNewIData[strkey][0] = IData;
                dicNewIData[strkey][1] = sourceName;
            }
            else
            {
                List<Object> v = new List<object>();
                v.Add(IData);
                v.Add(sourceName);
                dicNewIData.Add(strkey, v);
            }
            return sql;
        }

        /// <summary>
        /// 生成SQL语句
        /// </summary>
        /// <param name="tabId">config文件中TAB Id值</param>
        /// <param name="values">传递的参数</param>
        /// <returns></returns>
        public string getSQL(string tabId, params object[] values)
        {
            Dictionary<string, Dimention> report = GetReport();
            Dimention dimention = report[tabId];
            string sql = String.Format(dimention.SqlAll, values);
            return sql;
        }

        public DataTable GetResult(string sql)
        {
            return MySqlHelpers.GetDataTable(sql);
        }

        public int RunSQL(List<string> list)
        {
            return MySqlHelpers.ExecuteNonQuery(list);
        }

        public int RunSQL(string list)
        {
            return MySqlHelpers.ExecuteNonQuery(list);
        }


        public List<ArrayList> GetOutTableId(string filename)
        {
            List<ArrayList> lists = new List<ArrayList>();

            try
            {
                Dictionary<string, Dimention> report = GetBigTableId(filename);
                ArrayList list1 = new ArrayList();
                ArrayList list2 = new ArrayList();
                foreach (var dimention in report)
                {
                    list1.Add(dimention.Key.Trim());
                    list2.Add(dimention.Value.TabName);
                }
                lists.Add(list1);
                lists.Add(list2);
                return lists;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
                return null;
            }
        }

        /// <summary>
        /// 查询固定数据语句
        /// </summary>
        /// <param name="tabID">tableid</param>
        /// <returns></returns>
        public DataTable GetDataSourceSqlId(string tabID, string where)
        {
            try
            {
                Dictionary<string, Dimention> report = GetReport();
                Dimention dimention = report[tabID];
                ArrayList al = new ArrayList();
                string sql = "";
                string citydatawherecondition = string.Empty;
                DataTable dt = new DataTable();

                sql = dimention.SqlAll.Replace("%Where%", where);

                if (tabID.Equals(""))
                {
                    dt = null;
                }
                else
                {

                    al.Add(sql);
                    dt = MySqlHelpers.Query(al).Tables[0];
                }
                return dt;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
                return null;
            }
        }


        /// <summary>
        /// 新增方法传入json方式
        /// </summary>
        /// <param name="param"></param>
        /// <returns>DataTable</returns>
        public DataTable GetDataTableToParamID(Dictionary<string, Newtonsoft.Json.Linq.JArray> param)
        {
            Dictionary<string, Dimention> report = GetReport();
            string sql = string.Empty;
            DataTable dt = null;
            List<string> repSql = new List<string>();
            string tableName = string.Empty;
            try
            {

                if (param != null)
                {
                    foreach (var d in param)
                    {
                        Dimention dimention = report[d.Key];

                        tableName = dimention.TabName;
                        sql = dimention.SqlAll;
                        foreach (var arry in d.Value)
                        {
                            int i = 0;
                            ////替换后的sql语句
                            foreach (var o in Newtonsoft.Json.Linq.JObject.FromObject(arry))
                            {
                                sql = sql.Replace("[@c" + i + "]", o.Value.ToString());
                                i = i + 1;
                            }

                        }
                    }
                }
                // if()
                dt = MySqlHelpers.GetDataTable(sql);
                dt.TableName = tableName;

            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
            }

            if (dt != null)
            {
                return dt;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 返回DataSet
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public DataSet GetDataSetToParamID(Dictionary<string, Newtonsoft.Json.Linq.JArray> param)
        {
            Dictionary<string, Dimention> report = GetReport();
            string sql = string.Empty;
            DataSet ds = null;
            List<string> repSql = new List<string>();
            ArrayList al = new ArrayList();
            try
            {

                if (param != null)
                {
                    foreach (var d in param)
                    {
                        Dimention dimention = report[d.Key];
                        sql = dimention.SqlAll;
                        foreach (var arry in d.Value)
                        {
                            int i = 0;
                            ////替换后的sql语句
                            foreach (var o in Newtonsoft.Json.Linq.JObject.FromObject(arry))
                            {
                                sql = sql.Replace("[@c" + i + "]", o.Value.ToString());
                                i = i + 1;
                            }

                        }
                    }
                }
                al.Add(sql);
                ds = MySqlHelpers.Query(al);
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
            }

            if (ds != null)
            {
                return ds;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// INSERT/UPDATE/DELETE公共方法
        /// </summary>
        /// <param name="param">参数</param>
        /// <returns>影响记录数</returns>
        public int InsUpdDelDataTableToParam(Dictionary<string, List<Object>> param)
        {
            Dictionary<string, Dimention> report = GetReport();
            string sql = string.Empty;
            int count = 0;
            List<string> repSql = new List<string>();
            try
            {
                if (param != null)
                {
                    foreach (var d in param)
                    {
                        Dimention dimention = report[d.Key];

                        sql = dimention.SqlAll;
                        int i = 0;
                        foreach (Object value in d.Value)
                        {
                            ////替换后的sql语句

                            sql = sql.Replace("{" + i + "}", value.ToString());
                            i = i + 1;
                        }
                    }
                }
                count = MySqlHelpers.ExecuteNonQuery(sql);

            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
            }
            return count;
        }

        /// <summary>
        /// 执行存储过程方法
        /// </summary>
        /// <param name="storedProcName"></param>
        /// <param name="lists"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public DataSet GetDataSetRunProcedure(string storedProcName, List<string> lists, string tableName)
        {
            DataSet ds = new DataSet();
            try
            {
                IDataParameter[] iData = new MySqlParameter[lists.Count];
                for (int i = 0; i < lists.Count; i++)
                {
                    iData[i] = new MySqlParameter("@number" + (i + 1), lists[i]);
                }
                ds = MySqlHelpers.RunProcedure(storedProcName, iData, tableName);
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
            }
            return ds;
        }

        /// <summary>
        /// 执行存储过程方法(采集进度部分)
        /// </summary>
        /// <param name="storedProcName"></param>
        /// <param name="lists"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public DataSet GetDataSetRunAcquisitionApi(string storedProcName, List<string> lists, string tableName)
        {
            DataSet ds = new DataSet();
            try
            {
                IDataParameter[] iData = new MySqlParameter[lists.Count];
                for (int i = 0; i < lists.Count; i++)
                {
                    if (i == 0)
                    {
                        iData[i] = new MySqlParameter("@datatm", lists[i]);
                    }
                    else if (i == 1)
                    {
                        iData[i] = new MySqlParameter("@number3", lists[i]);
                    }

                }
                ds = MySqlHelpers.RunProcedure(storedProcName, iData, tableName);
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
            }
            return ds;
        }

        /// <summary>
        /// 执行存储过程方法
        /// </summary>
        /// <param name="storedProcName"></param>
        /// <param name="lists"></param>
        /// <returns></returns>
        public string[] GetOutRunProcedure(string storedProcName, string rid, string SDIId, string limit)
        {
            DataSet ds = new DataSet();
            IDataParameter[] iData = null;
            string[] nums = new string[3];
            try
            {
                iData = new MySqlParameter[6];
                iData[0] = new MySqlParameter("p_rid", rid);
                iData[1] = new MySqlParameter("p_SDIId", SDIId);
                iData[2] = new MySqlParameter("p_limit", limit);
                iData[3] = new MySqlParameter("p_better",
                MySqlDbType.Int32, 4, ParameterDirection.Output,
                false, 0, 0, string.Empty, DataRowVersion.Default, null);
                iData[4] = new MySqlParameter("p_Worse",
                MySqlDbType.Int32, 4, ParameterDirection.Output,
                false, 0, 0, string.Empty, DataRowVersion.Default, null);
                iData[5] = new MySqlParameter("p_equal",
                MySqlDbType.Int32, 4, ParameterDirection.Output,
                false, 0, 0, string.Empty, DataRowVersion.Default, null);

                iData = MySqlHelpers.RunProcedureInOut(storedProcName, iData);
                nums[0] = iData[3].Value.ToString();
                nums[1] = iData[4].Value.ToString();
                nums[2] = iData[5].Value.ToString();
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
            }
            return nums;
        }
    }
    /*************************************************************************
     * 文件名称 ：BaseService.cs                          
     * 描述说明 ：sql语句操作类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
