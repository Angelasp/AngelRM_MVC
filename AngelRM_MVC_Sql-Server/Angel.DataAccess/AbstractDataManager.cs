using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Angel.Model;
using System.IO;
using System.Data;

namespace Angel.DataAccess
{
    /*************************************************************************
     * 文件名称 ：AbstractDataManager.cs                          
     * 描述说明 ：sql语句缓存操作类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    public abstract class AbstractDataManager
    {
        public static Dictionary<string, Dimention> GetReport()
        {

            string CacheKey = "report";
            Dictionary<string, Dimention> TABList = new Dictionary<string, Dimention>();
            object objModel = DataCache.GetCache(CacheKey);
            if (objModel == null || ((Dictionary<string, Dimention>)objModel).Count == 0)
            {
                DataCache.SetCache(CacheKey, TABList, DateTime.Now.AddMinutes(180), TimeSpan.Zero);
                string filepath = AppDomain.CurrentDomain.BaseDirectory + "xmldb\\";//获取基目录
                DirectoryInfo di = new DirectoryInfo(filepath);
                FileInfo[] files = di.GetFiles();
                foreach (FileInfo file in files)
                {
                    Report tempreport = (Report)XmlSerializHelper.Deserialize<Report>(file.FullName);
                    foreach (Dimention dimention in tempreport.TABList)
                    {
                        Dimention tempdimention = dimention;
                        TABList.Add(tempdimention.TabId, tempdimention);
                    }
                }
                DataCache.SetCache(CacheKey, TABList, DateTime.Now.AddMinutes(180), TimeSpan.Zero);
            }
            else
            {
                TABList = (Dictionary<string, Dimention>)DataCache.GetCache(CacheKey);

            }
            return TABList;
        }
        /// <summary>
        /// 配置文件名称返回tabid
        /// </summary>
        /// <returns></returns>
        public Dictionary<string, Dimention> GetBigTableId(string filename)
        {
            string CacheKey = filename;
            Dictionary<string, Dimention> TABList = new Dictionary<string, Dimention>();
            object objModel = DataCache.GetCache(CacheKey);
            if (objModel == null)
            {
                DataCache.SetCache(CacheKey, TABList, DateTime.Now.AddMinutes(180), TimeSpan.Zero);
                string filepath = AppDomain.CurrentDomain.BaseDirectory + "xmldb\\";//获取基目录
                FileInfo file = new FileInfo(filepath + filename + ".config");

                Report tempreport = (Report)XmlSerializHelper.Deserialize<Report>(file.FullName);
                foreach (Dimention dimention in tempreport.TABList)
                {
                    Dimention tempdimention = dimention;
                    TABList.Add(tempdimention.TabId, tempdimention);
                }

                DataCache.SetCache(CacheKey, TABList, DateTime.Now.AddMinutes(180), TimeSpan.Zero);
            }
            else
            {
                TABList = (Dictionary<string, Dimention>)DataCache.GetCache(CacheKey);

            }
            return TABList;
        }
    }
    /*************************************************************************
     * 文件名称 ：AbstractDataManager.cs                          
     * 描述说明 ：sql语句缓存操作类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
