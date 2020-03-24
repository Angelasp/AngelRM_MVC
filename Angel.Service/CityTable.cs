using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Threading.Tasks;

namespace Angel.Service
{

    /*************************************************************************
     * 文件名称 ：CityTable.cs                          
     * 描述说明 ：城市读取
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    public class CityTable
    {
        /// <summary>
        /// 按省份、地市、日期查询
        /// </summary>
        /// <param name="dtcityDate"></param>
        /// <param name="FileName"></param>
        /// <param name="FileNameDate"></param>
        /// <param name="FileProName"></param>
        /// <returns></returns>
        public string GetCityDateWhere(DataTable dtcityDate, string FileName, string FileNameDate, string FileProName)
        {
            StringBuilder sbsql = new StringBuilder();
            if (FileProName != "")
            {
                DataView dtv = new DataView(dtcityDate);
                DataTable dt2 = dtv.ToTable(true, "TABLENAME");
                foreach (DataRow dr in dtcityDate.Rows)
                {
                    if (sbsql.ToString() == string.Empty)
                    {
                        sbsql.Append("(" + FileProName + "='" + dr["TABLENAME"] + "' AND  " + FileNameDate + "='" + dr["CITY_DATE"] + "') ");
                    }
                    else
                    {
                        sbsql.Append(" OR (" + FileProName + "='" + dr["TABLENAME"] + "' AND  " + FileNameDate + "='" + dr["CITY_DATE"] + "') ");
                    }
                }
            }
            else
            {
                foreach (DataRow dr in dtcityDate.Rows)
                {
                    if (sbsql.ToString() == string.Empty)
                    {
                        sbsql.Append("(" + FileName + "='" + dr["CITYNAME"] + "' AND  " + FileNameDate + "='" + dr["CITY_DATE"] + "') ");
                    }
                    else
                    {
                        sbsql.Append(" OR (" + FileName + "='" + dr["CITYNAME"] + "' AND  " + FileNameDate + "='" + dr["CITY_DATE"] + "') ");
                    }
                }
            }
            return "(" + sbsql.ToString() + ")";
        }

        /// <summary>
        /// 分割字符串返回datatable
        /// </summary>
        /// <param name="selectdate"></param>
        /// <returns></returns>
        public DataTable GetCityTable(string selectdate)
        {
            DataTable dt = createTable();
            DataRow dr = dt.NewRow();
            if (selectdate != null)
            {
                string[] listcheck = selectdate.Split(',');
                for (int i = 0; i < listcheck.Length; i++)
                {
                    if (listcheck[0] != "")
                    {
                        string[] listcheck1 = listcheck[i].Split('|');
                        dr = dt.NewRow();

                        dr["CITY_DATE"] = listcheck1[0].Trim();
                        dr["TABLENAME"] = listcheck1[1].Trim();
                        dr["CITY_NO"] = listcheck1[2];
                        dr["CITYNAME"] = listcheck1[3];
                        dt.Rows.Add(dr);
                    }
                }
            }
            return dt;
        }
        /// <summary>
        /// 创建city table表格
        /// </summary>
        /// <returns></returns>
        public DataTable createTable()
        {
            DataTable dt = new DataTable("myTable");
            DataColumn columnTitle = new DataColumn();
            columnTitle.DataType = System.Type.GetType("System.String");
            columnTitle.ColumnName = "CITY_NO";
            dt.Columns.Add(columnTitle);
            DataColumn columnAlign = new DataColumn();
            columnAlign.DataType = System.Type.GetType("System.String");
            columnAlign.ColumnName = "CITY_DATE";
            dt.Columns.Add(columnAlign);
            DataColumn columnWidth = new DataColumn();
            columnWidth.DataType = System.Type.GetType("System.String");
            columnWidth.ColumnName = "TABLENAME";
            dt.Columns.Add(columnWidth);
            DataColumn columnCityName = new DataColumn();
            columnCityName.DataType = System.Type.GetType("System.String");
            columnCityName.ColumnName = "CITYNAME";
            dt.Columns.Add(columnCityName);
            return dt;
        }
    }
 /*************************************************************************
 * 文件名称 ：CityTable.cs                          
 * 描述说明 ：城市读取
 * 
 * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
 * 修订信息 : modify by (person) on (date) for (reason)
 * 
 * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
 **************************************************************************
 */
}
