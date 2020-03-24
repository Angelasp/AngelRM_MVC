using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Angel.Utils;
using System.IO;
using System.Threading.Tasks;

namespace Angel.DBHelper
{
    /*************************************************************************
     * 文件名称 ：MySqlHelpers.cs                          
     * 描述说明 ：Mysql操作类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    /// 名称：MySql数据库访问对象库
    /// 校对：Alcedo  2017年8月16日
    /// 功能：实现MySql增删改查、以及执行存储过程  
    /// 编译： 重新编译本库，需要引用 MySql库
    /// <summary>
    /// MySql数据库访问操作类
    /// </summary>
    /// <remarks>
    /// 作者：Alcedo 
    /// 时间：2018年8月16日
    /// </remarks>
    public abstract class MySqlHelpers
    {
        public static readonly string connectionString = ConfigurationManager.ConnectionStrings["MySqlconn"].ConnectionString;//应用程序配置文件中的数据库链接字符串 
        private static Hashtable parmCache = Hashtable.Synchronized(new Hashtable());//存储缓存参数的Hashtable


        // <summary>
        /// 多个DataTable批量加入MYSQL数据库，事务处理
        /// </summary>
        /// <param name="dataTable"></param>
        /// <returns></returns>
        public static string InsertByDataTables(List<DataTable> dataTables)
        {
            string result = string.Empty;
            List<Task> lstTaskBD = new List<Task>();
            foreach (DataTable dt in dataTables)
            {
                DataTable bdTmp = dt;//这里必须要用一个临时变量
                if (null == dt || dt.Rows.Count <= 0)
                {
                    continue;
                    //return "添加失败！DataTable暂无数据！";
                }

                var oTask = Task.Factory.StartNew(() =>
                {
                    BulkInsert(bdTmp);
                });
                lstTaskBD.Add(oTask);
            }

            Task.WaitAll(lstTaskBD.ToArray());//等待所有线程只都行完毕
            return result;

        }
        // <summary>
        /// 多个DataTable批量加入MYSQL数据库，事务处理
        /// </summary>
        /// <param name="dataTable"></param>
        /// <returns></returns>
        public static string InsertByDataTables_1(List<DataTable> dataTables)
        {
            int res = -1;
            string result = string.Empty;
            using (MySqlConnection con = new MySqlConnection(connectionString))
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                MySqlTransaction myTra = con.BeginTransaction();
                cmd.Transaction = myTra;
                //sql拼接
                List<Task> lstTaskBD = new List<Task>();
                foreach (DataTable dt in dataTables)
                {

                    if (null == dt || dt.Rows.Count <= 0)
                    {
                        continue;
                        //return "添加失败！DataTable暂无数据！";
                    }


                    BulkInsert(dt);



                    //  StringBuilder sb = new StringBuilder();
                    //  sb.Append("INSERT INTO " + dt.TableName + "(");
                    //  for (int j = 0; j < dt.Columns.Count; j++)
                    //  {
                    //      sb.Append(dt.Columns[j].ColumnName + ",");
                    //  }
                    //  sb.Remove(sb.ToString().LastIndexOf(','), 1);
                    //  sb.Append(") VALUES ");
                    //  string prefix = sb.ToString();
                    //  sb.Clear();
                    //  #region 拼串
                    //  for (int i = 0; i < dt.Rows.Count; i++)
                    //  {
                    //      // 构建INSERT语句
                    //      //sb.Clear();
                    //      sb.Append("(");
                    //      for (int j = 0; j < dt.Columns.Count; j++)
                    //      {
                    //          if (dt.Rows[i][j].ToString().Contains("-1")|| dt.Rows[i][j].ToString().Length == 0)
                    //              sb.Append("null,");
                    //          else
                    //              sb.Append("'" + dt.Rows[i][j] + "',");
                    //      }
                    //      sb.Remove(sb.ToString().LastIndexOf(','), 1);
                    //      sb.Append("),");
                    //  #endregion
                    //}
                    //  sb.Remove(sb.ToString().LastIndexOf(','), 1);
                    //  sb.Append(";");

                    //  #region 入库
                    //  try
                    //  {
                    //      cmd.CommandText = prefix+ sb.ToString();
                    //      res = cmd.ExecuteNonQuery();
                    //      myTra.Commit();
                    //      myTra = con.BeginTransaction();
                    //      //if (i > 0 && (i % 500 == 0 || i == dt.Rows.Count - 1))
                    //      //{
                    //      //    myTra.Commit();
                    //      //    myTra = con.BeginTransaction();
                    //      //}
                    //      //if (dt.Rows.Count == 1)
                    //      //{
                    //      //    myTra.Commit();
                    //      //    myTra = con.BeginTransaction();
                    //      //}
                    //  }
                    //  catch (Exception ex)
                    //  {
                    //      res = -1;
                    //      myTra.Rollback();
                    //      // Unknown column 'names' in 'field list' 
                    //      result = "操作失败！" + ex.Message.Replace("Unknown column", "未知列").Replace("in 'field list'", "存在字段集合中！");
                    //      break;
                    //  }
                    //  #endregion
                }
                //if (res > 0)
                //{
                //    result = "恭喜添加成功!";
                //    //提交事务
                //    myTra.Commit();
                //}

                con.Close();
                con.Dispose();
                return result;
            }
        }


        ///大批量数据插入,返回成功插入行数  
        /// </summary>  
        /// <param name="connectionString">数据库连接字符串</param>  
        /// <param name="table">数据表</param>  
        /// <returns>返回成功插入行数</returns>  
        public static int BulkInsert(DataTable table)
        {
            if (string.IsNullOrEmpty(table.TableName)) throw new Exception("请给DataTable的TableName属性附上表名称");
            if (table.Rows.Count == 0) return 0;
            int insertCount = 0;
            string tmpPath = Path.GetTempFileName();
            string csv = DataTableToCsv(table);
            File.WriteAllText(tmpPath, csv);
            // MySqlTransaction tran = null;  

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                try
                {
                    conn.Open();
                    //tran = conn.BeginTransaction();  
                    MySqlBulkLoader bulk = new MySqlBulkLoader(conn)
                    {
                        FieldTerminator = ",",
                        FieldQuotationCharacter = '"',
                        EscapeCharacter = '"',
                        LineTerminator = "\r\n",
                        FileName = tmpPath,
                        NumberOfLinesToSkip = 0,
                        TableName = table.TableName,
                    };
                    //bulk.Columns.AddRange(table.Columns.Cast<DataColumn>().Select(colum => colum.ColumnName).ToArray());  
                    insertCount = bulk.Load();
                    // tran.Commit();  
                }
                catch (MySqlException ex)
                {
                    // if (tran != null) tran.Rollback();  
                    throw ex;
                }
            }
            File.Delete(tmpPath);
            return insertCount;
        }

        ///将DataTable转换为标准的CSV  
        /// </summary>  
        /// <param name="table">数据表</param>  
        /// <returns>返回标准的CSV</returns>  
        private static string DataTableToCsv(DataTable table)
        {
            //以半角逗号（即,）作分隔符，列为空也要表达其存在。  
            //列内容如存在半角逗号（即,）则用半角引号（即""）将该字段值包含起来。  
            //列内容如存在半角引号（即"）则应替换成半角双引号（""）转义，并用半角引号（即""）将该字段值包含起来。  
            StringBuilder sb = new StringBuilder();
            DataColumn colum;
            foreach (DataRow row in table.Rows)
            {
                for (int i = 0; i < table.Columns.Count; i++)
                {
                    colum = table.Columns[i];
                    if (i != 0) sb.Append(",");
                    if (colum.DataType == typeof(string) && row[colum].ToString().Contains(","))
                    {
                        sb.Append("\"" + row[colum].ToString().Replace("\"", "\"\"") + "\"");
                    }
                    else
                    {
                        if (row[colum].ToString().Contains("-1") || row[colum].ToString().Length == 0)
                            sb.Append("NULL");
                        else
                            sb.Append(row[colum].ToString());
                    }
                }
                sb.AppendLine();
            }

            return sb.ToString();
        }

        /// <summary>
        /// 向缓存中添加参数数组
        /// </summary>
        public static void CacheParameters(string cacheKey, params MySqlParameter[] commandParameters)
        {
            parmCache[cacheKey] = commandParameters;
        }

        /// <summary>
        /// 取缓存的参数
        /// </summary>
        public static MySqlParameter[] GetCachedParameters(string cacheKey)
        {
            MySqlParameter[] cachedParms = (MySqlParameter[])parmCache[cacheKey];

            if (cachedParms == null)
                return null;

            MySqlParameter[] clonedParms = new MySqlParameter[cachedParms.Length];

            for (int i = 0, j = cachedParms.Length; i < j; i++)
                clonedParms[i] = (MySqlParameter)((ICloneable)cachedParms[i]).Clone();

            return clonedParms;
        }
        /// <summary>
        /// 执行数据库读取操作
        /// </summary>
        /// <param name="connectionString">数据库连接字符串</param>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="commandParameters"></param>
        /// <returns></returns>
        public static DataTable ExecuteDataTable(string connectionString, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlDataAdapter da = new MySqlDataAdapter();
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);

            try
            {
                PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                da.SelectCommand = cmd;
                DataTable table = new DataTable();
                da.Fill(table);
                cmd.Parameters.Clear();
                conn.Close();
                conn.Dispose();
                return table;
            }
            catch (Exception e)
            {
                conn.Close();
                conn.Dispose();
                FileLog.WriteLog(e.ToString());
                throw;
            }
        }
        public static DataSet ExecuteDataSet(string connectionString, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlDataAdapter da = new MySqlDataAdapter();
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);

            try
            {
                PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                da.SelectCommand = cmd;
                DataSet table = new DataSet();
                da.Fill(table);
                cmd.Parameters.Clear();
                conn.Close();
                conn.Dispose();
                return table;
            }
            catch (Exception e)
            {
                conn.Close();
                conn.Dispose();
                FileLog.WriteLog(e.ToString());
                throw;
            }
        }
        public static MySqlDataReader ExecuteReader(string connectionString, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);

            try
            {
                PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                MySqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                cmd.Parameters.Clear();
                conn.Close();
                conn.Dispose();
                return rdr;
            }
            catch (Exception e)
            {
                conn.Close();
                conn.Dispose();
                FileLog.WriteLog(e.ToString());
                throw;
            }
        }
        #region 执行不带参数sql语句,返回结果集首行首列的值object
        /// <summary>
        /// 执行不带参数sql语句,返回结果集首行首列的值object
        /// </summary>
        /// <param name="cmdstr">相应的sql语句</param>
        /// <returns>返回结果集首行首列的值object</returns>
        public static object ExecuteScalar(string cmdText)
        {
            string a = ";lt";
            string b = ";gt";
            cmdText = cmdText.Replace(a, "<").Replace(b, ">");
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);
            try
            {
                PrepareCommand(cmd, conn, null, CommandType.Text, cmdText, null);
                object result = cmd.ExecuteScalar();
                cmd.Parameters.Clear();
                // conn.Close();
                // LIYAO 追加
                conn.Close();
                conn.Dispose();
                return result;
            }
            catch (Exception e)
            {
                conn.Close();
                conn.Dispose();
                FileLog.WriteLog(e.ToString());
                throw;
            }
        }
        #endregion

        #region 执行带参数sql语句,返回结果集首行首列的值object
        /// <summary>
        /// 执行带参数sql语句,返回结果集首行首列的值object
        /// </summary>
        /// <param name="cmdstr">相应的sql语句</param>
        /// <returns>返回结果集首行首列的值object</returns>
        public static object ExecuteScalar(string cmdText, MySqlParameter[] param)
        {
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);
            try
            {
                PrepareCommand(cmd, conn, null, CommandType.Text, cmdText, param);
                object result = cmd.ExecuteScalar();
                cmd.Parameters.Clear();
                conn.Close();
                conn.Dispose();
                return result;
            }
            catch (Exception e)
            {
                conn.Close();
                conn.Dispose();
                FileLog.WriteLog(e.ToString());
                throw;
            }
        }
        #endregion

        public static object ExecuteScalar(string connectionString, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);

            try
            {
                PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                object result = cmd.ExecuteScalar();
                cmd.Parameters.Clear();
                conn.Close();
                conn.Dispose();
                return result;
            }
            catch (Exception e)
            {
                conn.Close();
                conn.Dispose();
                FileLog.WriteLog(e.ToString());
                throw;
            }
        }

        /// <summary>
        /// 执行一个返回结果集的数据库操作
        /// </summary>
        /// <param name="connectionString">连接字符串</param>
        /// <param name="sql">查询字符串</param>
        /// <returns>数据结果集</returns>
        public static MySqlDataReader ExecuteReader(string connectionString, string sql)
        {
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);

            try
            {
                PrepareCommand(cmd, conn, null, CommandType.Text, sql, null);
                MySqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                cmd.Parameters.Clear();
                conn.Close();
                conn.Dispose();
                return rdr;
            }
            catch (Exception e)
            {
                conn.Close();
                conn.Dispose();
                FileLog.WriteLog(e.ToString());
                throw;
            }
        }
        /// <summary>
        ///  执行多条SQL语句，实现数据库事务。
        /// </summary>
        /// <param name="SQLStringList">SQL语句的数据字典（key为sql语句，value是该语句的MySqlParameter[]）</param>
        /// <returns></returns>
        public static int ExecuteSqlTran(Dictionary<string, Array> SQLStringList)
        {
            int rvalue = 0;
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                //using (MySqlTransaction trans = conn.BeginTransaction())
                // {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.Text;
                // cmd.Transaction = trans;
                string ssss = "";
                int index = 0;
                try
                {
                    //循环
                    foreach (var myDE in SQLStringList)
                    {
                        string cmdText = myDE.Key.ToString();
                        cmd.CommandText = cmdText;
                        ssss = cmdText;
                        index++;
                        Array cmdParms = (Array)myDE.Value;
                        if (cmdParms != null)
                        {
                            cmd.Parameters.AddRange(cmdParms);
                        }
                        rvalue += cmd.ExecuteNonQuery();
                        cmd.Parameters.Clear();
                    }

                    //trans.Commit();
                }
                catch (Exception e)
                {
                    //trans.Rollback();
                    FileLog.WriteLog(index + "\r\n" + ssss + "\r\n" + e.ToString());
                    rvalue = 0;
                    throw;
                }
                // }
                conn.Close();
            }
            return rvalue;
        }
        public static int ExecuteSqlTran2(ArrayList SQLStringList)
        {
            int rvalue = 0;
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = conn;
                MySqlTransaction tx = conn.BeginTransaction();
                cmd.Transaction = tx;
                string sqlerror = "";
                try
                {
                    for (int n = 0; n < SQLStringList.Count; n++)
                    {
                        string strsql = SQLStringList[n].ToString();
                        if (strsql.Trim().Length > 1)
                        {
                            sqlerror = "第" + (n + 1) + "条" + strsql;
                            cmd.CommandText = strsql;
                            rvalue += cmd.ExecuteNonQuery();
                        }
                    }
                    tx.Commit();
                }
                catch (Exception E)
                {
                    tx.Rollback();
                    FileLog.WriteLog(sqlerror + "\r\n" + E.ToString());
                    throw new Exception((sqlerror.Length > 100 ? (sqlerror.Substring(0, 100) + "...") : sqlerror) + E.Message);
                }
                finally
                {
                    conn.Close();
                    conn.Dispose();
                }
            }
            return rvalue;
        }
        public static DataSet Query(ArrayList al)
        {
            MySqlDataAdapter da = new MySqlDataAdapter();
            MySqlCommand cmd = new MySqlCommand();
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                DataSet ds = new DataSet();
                int index = 0;
                string sql = "";
                try
                {
                    connection.Open();
                    for (int i = 0; i < al.Count; i++)
                    {
                        //MySqlDataAdapter command = new MySqlDataAdapter(al[i].ToString(), connection);
                        //command.Fill(ds, "ds" + i);
                        index = i + 1;
                        sql = al[i].ToString();
                        PrepareCommand(cmd, connection, null, CommandType.Text, al[i].ToString(), null);
                        da.SelectCommand = cmd;
                        da.Fill(ds, "ds" + i);
                    }
                }
                catch (Exception e)
                {
                    FileLog.WriteLog(index + "\r\n" + sql + "\r\n" + e.ToString());
                    throw;
                }
                finally
                {
                    connection.Close();
                    connection.Dispose();
                }
                return ds;
            }
        }
        public static int ExecuteSqlTran1(Dictionary<string, MySqlParameter[]> SQLStringList)
        {
            int rvalue = 0;
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                using (MySqlTransaction trans = conn.BeginTransaction())
                {
                    MySqlCommand cmd = new MySqlCommand();
                    try
                    {
                        //循环
                        foreach (KeyValuePair<string, MySqlParameter[]> myDE in SQLStringList)
                        {
                            string cmdText = myDE.Key.ToString();
                            MySqlParameter[] cmdParms = (MySqlParameter[])myDE.Value;
                            PrepareCommand(cmd, conn, trans, CommandType.Text, cmdText, cmdParms);
                            //PrepareCommand(cmd, conn, trans, cmdText, cmdParms);
                            rvalue += cmd.ExecuteNonQuery();
                            cmd.Parameters.Clear();
                        }
                        trans.Commit();
                    }
                    catch (Exception e)
                    {
                        trans.Rollback();
                        FileLog.WriteLog(e.ToString());
                        throw;
                    }
                }
                conn.Close();
                conn.Dispose();
            }
            return rvalue;
        }
        /// <summary>
        /// 执行无返回记录的数据库操作
        /// </summary>
        /// <param name="connectionString
        /// "></param>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="commandParameters"></param>
        /// <returns></returns>
        public static int ExecuteNonQuery(string connectionString, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                PrepareCommand(cmd, connection, null, cmdType, cmdText, commandParameters);
                int num = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
                connection.Close();
                connection.Dispose();
                return num;
            }
        }

        public static int ExecuteNonQuery(MySqlConnection connection, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();

            PrepareCommand(cmd, connection, null, cmdType, cmdText, commandParameters);
            int val = cmd.ExecuteNonQuery();
            cmd.Parameters.Clear();
            connection.Close();
            connection.Dispose();
            return val;
        }

        public static int ExecuteNonQuery(MySqlTransaction trans, CommandType cmdType, string cmdText, params MySqlParameter[] commandParameters)
        {
            MySqlCommand cmd = new MySqlCommand();
            PrepareCommand(cmd, trans.Connection, trans, cmdType, cmdText, commandParameters);
            int val = cmd.ExecuteNonQuery();
            cmd.Parameters.Clear();
            trans.Connection.Close();
            trans.Connection.Dispose();
            return val;
        }

        #region 执行不带参数sql语句，返回所影响的行数
        /// <summary>
        /// 执行不带参数sql语句，返回所影响的行数
        /// </summary>
        /// <param name="cmdstr">增，删，改sql语句</param>
        /// <returns>返回所影响的行数</returns>
        public static int ExecuteNonQuery(string cmdText)
        {
            int count;
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);
            try
            {
                PrepareCommand(cmd, conn, null, CommandType.Text, cmdText, null);
                count = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
            }
            catch (Exception e)
            {
                FileLog.WriteLog(e.ToString());
                throw;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
            return count;
        }










        #endregion

        #region 执行带参数sql语句，返回所影响的行数
        /// <summary>
        /// 执行带参数sql语句，返回所影响的行数
        /// </summary>
        /// <param name="cmdstr">增，删，改sql语句</param>
        /// <returns>返回所影响的行数</returns>
        public static int ExecuteNonQuery(string cmdText, MySqlParameter[] param)
        {
            int count;
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);
            try
            {
                PrepareCommand(cmd, conn, null, CommandType.Text, cmdText, param);
                count = cmd.ExecuteNonQuery();
                cmd.Parameters.Clear();
            }
            catch (Exception e)
            {
                FileLog.WriteLog(e.ToString());
                throw;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
            return count;
        }
        #endregion

        public static int ExecuteNonQuery(System.Collections.Generic.List<string> sqlArray)
        {
            MySqlCommand cmd;
            int result = 0;
            using (cmd = new MySqlCommand())
            {
                using (MySqlConnection conn = new MySqlConnection(connectionString))
                {
                    conn.Open();
                    var tran = conn.BeginTransaction();
                    string sql2 = "";
                    try
                    {
                        cmd.Connection = conn;
                        cmd.Transaction = tran;
                        foreach (var sql in sqlArray)
                        {
                            sql2 = sql;
                            cmd.CommandText = sql;
                            result += cmd.ExecuteNonQuery();
                        }
                        tran.Commit();

                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        //conn.Close();
                        FileLog.WriteLog(ex.ToString());
                        FileLog.WriteLog("错误SQL:" + sql2);
                        throw new Exception(ex.Message.ToString());
                    }
                    finally
                    {
                        conn.Close();
                        conn.Dispose();
                    }
                }
            }

            return result;
        }

        private static void PrepareCommand(MySqlCommand cmd, MySqlConnection conn, MySqlTransaction trans, CommandType cmdType, string cmdText, MySqlParameter[] cmdParms)
        {
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }
            cmd.Connection = conn;
            cmd.CommandText = cmdText;
            if (trans != null)
            {
                cmd.Transaction = trans;
            }
            cmd.CommandType = cmdType;
            cmd.CommandTimeout = 600;
            if (cmdParms != null)
            {
                foreach (MySqlParameter parameter in cmdParms)
                {
                    cmd.Parameters.Add(parameter);
                }
            }
        }
        #region 执行不带参数sql语句，返回一个从数据源读取数据的MySqlDataReader对象
        /// <summary>
        /// 执行不带参数sql语句，返回一个从数据源读取数据的MySqlDataReader对象
        /// </summary>
        /// <param name="cmdstr">相应的sql语句</param>
        /// <returns>返回一个从数据源读取数据的MySqlDataReader对象</returns>
        public static MySqlDataReader ExecuteReader(string cmdText)
        {
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);
            MySqlDataReader reader;
            try
            {
                conn.Open();
                PrepareCommand(cmd, conn, null, CommandType.Text, cmdText, null);
                reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
                cmd.Parameters.Clear();
                return reader;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
                throw new Exception(ex.Message.ToString());
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }
        #endregion

        #region 执行相应的sql语句，返回相应的DataSet对象
        /// <summary>
        /// 执行相应的sql语句，返回相应的DataSet对象
        /// </summary>
        /// <param name="sqlstr">sql语句</param>
        /// <returns>返回相应的DataSet对象</returns>
        public static DataSet GetDataSet(string cmdText)
        {
            MySqlDataAdapter da = new MySqlDataAdapter();
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);

            try
            {
                PrepareCommand(cmd, conn, null, CommandType.Text, cmdText, null);
                da.SelectCommand = cmd;
                DataSet table = new DataSet();
                da.Fill(table);
                cmd.Parameters.Clear();
                return table;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
                throw new Exception(ex.Message.ToString());
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }


        public static string[] GetDataSetTB(string cmdText)
        {
            MySqlDataAdapter da = new MySqlDataAdapter();
            MySqlCommand cmd = new MySqlCommand();
            MySqlConnection conn = new MySqlConnection(connectionString);

            try
            {
                PrepareCommand(cmd, conn, null, CommandType.Text, cmdText, null);
                da.SelectCommand = cmd;
                DataSet table = new DataSet();
                da.Fill(table);
                cmd.Parameters.Clear();
                string[] strArr = new string[table.Tables[0].Rows.Count];
                for (int i = 0; i < table.Tables[0].Rows.Count; i++)
                {
                    strArr[i] = table.Tables[0].Rows[i][0].ToString();
                }
                return strArr;
            }
            catch (Exception ex)
            {
                FileLog.WriteLog(ex.ToString());
                throw new Exception(ex.Message.ToString());
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        /// <summary>
        /// 执行数据库读取操作
        /// </summary>
        /// <param name="connectionString">数据库连接字符串</param>
        /// <param name="cmdType"></param>
        /// <param name="cmdText"></param>
        /// <param name="commandParameters"></param>
        /// <returns></returns>
        public static DataTable GetDataTable(string cmdText)
        {
            MySqlDataAdapter da = new MySqlDataAdapter();
            MySqlCommand cmd = new MySqlCommand();
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                try
                {
                    string a = ";lt";
                    string b = ";gt";
                    cmdText = cmdText.Replace(a, "<").Replace(b, ">");
                    conn.Open();
                    PrepareCommand(cmd, conn, null, CommandType.Text, cmdText, null);
                    da.SelectCommand = cmd;
                    DataTable table = new DataTable();
                    da.Fill(table);
                    cmd.Parameters.Clear();
                    return table;
                }
                catch (Exception e)
                {
                    //conn.Close();
                    FileLog.WriteLog(e.ToString());
                    throw;
                }
                finally
                {
                    conn.Close();
                    conn.Dispose();
                }
            }

        }
        #endregion

        #region 存储过程操作

        /// <summary>
        /// 执行存储过程
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns>SqlDataReader</returns>
        public static MySqlDataReader RunProcedure(string storedProcName, IDataParameter[] parameters)
        {
            MySqlConnection connection = new MySqlConnection(connectionString);
            MySqlDataReader returnReader;
            connection.Open();
            MySqlCommand command = BuildQueryCommand(connection, storedProcName, parameters);
            command.CommandType = CommandType.StoredProcedure;
            returnReader = command.ExecuteReader();
            connection.Open();
            return returnReader;
        }


        /// <summary>
        /// 执行存储过程
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <param name="tableName">DataSet结果中的表名</param>
        /// <returns>DataSet</returns>
        public static DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                DataSet dataSet = new DataSet();
                connection.Open();
                MySqlDataAdapter sqlDA = new MySqlDataAdapter();
                sqlDA.SelectCommand = BuildQueryCommand(connection, storedProcName, parameters);
                sqlDA.Fill(dataSet, tableName);
                connection.Close();
                return dataSet;
            }
        }


        /// <summary>
        /// 构建 SqlCommand 对象(用来返回一个结果集，而不是一个整数值)
        /// 
        /// 
        /// </summary>
        /// <param name="connection">数据库连接</param>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns>SqlCommand</returns>
        ///  author:Alcedo
        private static MySqlCommand BuildQueryCommand(MySqlConnection connection, string storedProcName, IDataParameter[] parameters)
        {
            MySqlCommand command = new MySqlCommand(storedProcName, connection);
            command.CommandType = CommandType.StoredProcedure;
            // 设置在终止执行命令的尝试并生成错误之前的等待时间。
            command.CommandTimeout = 180; // 3分钟
            foreach (MySqlParameter parameter in parameters)
            {
                command.Parameters.Add(parameter);
            }
            return command;
        }

        /// <summary>
        /// 执行存储过程，返回影响的行数		
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <param name="rowsAffected">影响的行数</param>
        ///  author:Alcedo
        public static int RunProcedure(string storedProcName, IDataParameter[] parameters, out int rowsAffected)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                int result;
                connection.Open();
                MySqlCommand command = BuildIntCommand(connection, storedProcName, parameters);
                rowsAffected = command.ExecuteNonQuery();
                result = (int)command.Parameters["ReturnValue"].Value;
                //Connection.Close();
                connection.Close();
                connection.Dispose();
                return result;
            }
        }

        /// <summary>
        /// 创建 SqlCommand 对象实例(用来返回一个整数值)	
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns>SqlCommand 对象实例</returns>
        private static MySqlCommand BuildIntCommand(MySqlConnection connection, string storedProcName, IDataParameter[] parameters)
        {
            MySqlCommand command = BuildQueryCommand(connection, storedProcName, parameters);
            command.Parameters.Add(new MySqlParameter("ReturnValue",
                MySqlDbType.Int32, 4, ParameterDirection.ReturnValue,
                false, 0, 0, string.Empty, DataRowVersion.Default, null));

            return command;
        }


        /// <summary>
        /// 执行存储过程 返回out 参数
        /// </summary>
        /// <param name="storedProcName">存储过程名</param>
        /// <param name="parameters">存储过程参数</param>
        /// <returns>DataSet</returns>
        public static IDataParameter[] RunProcedureInOut(string storedProcName, IDataParameter[] parameters)
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                MySqlCommand command = BuildQueryCommand(connection, storedProcName, parameters);
                command.CommandType = CommandType.StoredProcedure;
                command.ExecuteReader();
                connection.Close();
                connection.Dispose();
                return parameters;
            }
        }
        #endregion

    }
    /*************************************************************************
     * 文件名称 ：MySqlHelpers.cs                          
     * 描述说明 ：Mysql操作类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
