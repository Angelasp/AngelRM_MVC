using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.XPath;

namespace Angel.Utils
{
    /*************************************************************************
     * 文件名称 ：XmlHelper.cs                          
     * 描述说明 ：读取加载所有sql配置语句
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    public class XmlHelper
    {
        /// <summary>
        /// 读取配置文件
        /// </summary>
        /// <param name="xmlName"></param>
        /// <param name="sqlCode"></param>
        /// <returns></returns>
        public static Dictionary<string, string> ReadXml(string xmlName, string sqlCode)
        {
            Dictionary<string, string> list = new Dictionary<string, string>();
            string path = AppDomain.CurrentDomain.BaseDirectory + "xmlsql/" + xmlName + ".xml";


            XPathDocument doc = new XPathDocument(path);

            XPathNavigator nav = doc.CreateNavigator();
            XPathNavigator root = nav.SelectSingleNode("/config[@name=\"sys\" and @dialect=\"mysql_dialect\"]/option[@key=\"" + sqlCode + "\"]");

            //values
            XPathNodeIterator values = root.Select("values");

            while (values.MoveNext())
            {
                XPathNodeIterator vElement = values.Current.Select("value");
                while (vElement.MoveNext())
                {
                    list.Add(vElement.Current.GetAttribute("identify", ""), vElement.Current.Value.Trim());
                }

            }

            return list;


        }
        /// <summary>
        /// 读取配置文件
        /// </summary>
        /// <returns></returns>
        public static Dictionary<string, Dictionary<Dictionary<string, string>, Dictionary<string, string>>> GetXmlCache()
        {
            Dictionary<string, Dictionary<Dictionary<string, string>, Dictionary<string, string>>> collection = new Dictionary<string, Dictionary<Dictionary<string, string>, Dictionary<string, string>>>();

            string path = AppDomain.CurrentDomain.BaseDirectory + "xmlsql/SqlQuery.xml";


            XPathDocument doc = new XPathDocument(path);

            XPathNavigator nav = doc.CreateNavigator();
            XPathNodeIterator root = nav.Select("/config[@name=\"sys\" and @dialect=\"mysql_dialect\"]/option");

            while (root.MoveNext())
            {
                string key = root.Current.GetAttribute("key", "");

                Dictionary<Dictionary<string, string>, Dictionary<string, string>> optionList = new Dictionary<Dictionary<string, string>, Dictionary<string, string>>();

                //parameters
                XPathNodeIterator parms = root.Current.Select("parameters");
                Dictionary<string, string> parmList = new Dictionary<string, string>();
                while (parms.MoveNext())
                {
                    XPathNodeIterator pElement = parms.Current.Select("parameter");
                    while (pElement.MoveNext())
                    {
                        string name = pElement.Current.GetAttribute("paramename", "");
                        string cont = pElement.Current.GetAttribute("contidion", "");
                        parmList.Add(name, cont);
                    }

                }
                //values
                XPathNodeIterator values = root.Current.Select("values");

                Dictionary<string, string> valueList = new Dictionary<string, string>();
                while (values.MoveNext())
                {
                    XPathNodeIterator vElement = values.Current.Select("value");
                    while (vElement.MoveNext())
                    {
                        valueList.Add(vElement.Current.GetAttribute("identify", ""), vElement.Current.Value.Trim());
                    }

                }
                optionList.Add(parmList, valueList);
                collection.Add(key, optionList);

            }

            return collection;
        }
        /// <summary>
        /// 读取查询语句
        /// </summary>
        /// <returns></returns>
        public static Dictionary<string, Dictionary<Dictionary<string, string>, Dictionary<string, string>>> GetXmlCaches()
        {
            Dictionary<string, Dictionary<Dictionary<string, string>, Dictionary<string, string>>> collection = new Dictionary<string, Dictionary<Dictionary<string, string>, Dictionary<string, string>>>();

            string filepath = AppDomain.CurrentDomain.BaseDirectory + "xmlsql\\";//获取基目录
            DirectoryInfo di = new DirectoryInfo(filepath);
            FileInfo[] files = di.GetFiles();
            foreach (FileInfo file in files)
            {
                if (file.Name.IndexOf("SqlQuery") != -1)
                {
                    string path = file.FullName;
                    XPathDocument doc = new XPathDocument(path);

                    XPathNavigator nav = doc.CreateNavigator();
                    XPathNodeIterator root = nav.Select("/config[@name=\"sys\" and @dialect=\"mysql_dialect\"]/option");

                    while (root.MoveNext())
                    {
                        string key = root.Current.GetAttribute("key", "");

                        Dictionary<Dictionary<string, string>, Dictionary<string, string>> optionList = new Dictionary<Dictionary<string, string>, Dictionary<string, string>>();

                        //parameters
                        XPathNodeIterator parms = root.Current.Select("parameters");
                        Dictionary<string, string> parmList = new Dictionary<string, string>();
                        while (parms.MoveNext())
                        {
                            XPathNodeIterator pElement = parms.Current.Select("parameter");
                            while (pElement.MoveNext())
                            {
                                string name = pElement.Current.GetAttribute("paramename", "");
                                string cont = pElement.Current.GetAttribute("contidion", "");
                                parmList.Add(name, cont);
                            }
                        }
                        //values
                        XPathNodeIterator values = root.Current.Select("values");

                        Dictionary<string, string> valueList = new Dictionary<string, string>();
                        while (values.MoveNext())
                        {
                            XPathNodeIterator vElement = values.Current.Select("value");
                            while (vElement.MoveNext())
                            {
                                valueList.Add(vElement.Current.GetAttribute("identify", ""), vElement.Current.Value.Trim());
                            }
                        }
                        optionList.Add(parmList, valueList);
                        collection.Add(key, optionList);
                    }
                }
            }
            return collection;
        }


        public static string GetBaseConfigValue(string configKey)
        {
            string value = string.Empty;
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + "xmlsql/SqlQuery.xml";


                XPathDocument doc = new XPathDocument(path);

                XPathNavigator nav = doc.CreateNavigator();
                XPathNavigator root = nav.SelectSingleNode("/configs[@name=\"sys\" and @dialect=\"mysql_dialect\"]/config[@key=\"" + configKey + "\"]");

                //values
                value = root.GetAttribute("value", "");
            }
            catch (Exception)
            {
                throw new Exception();
            }
            return value;
        }

        public static Dictionary<string, Dictionary<string, string>> GetBaseConfigCache()
        {
            //key:xml_name value:{code,sql}
            Dictionary<string, Dictionary<string, string>> collection = new Dictionary<string, Dictionary<string, string>>();

            string path = AppDomain.CurrentDomain.BaseDirectory + "xmlsql/SqlQuery.xml";

            XPathDocument doc = new XPathDocument(path);

            XPathNavigator nav = doc.CreateNavigator();
            XPathNodeIterator root = nav.Select("/config[@name=\"sys\" and @dialect=\"mysql_dialect\"]/option");
            Dictionary<string, string> kv = null;
            while (root.MoveNext())
            {
                string key = root.Current.GetAttribute("key", "");

                string xmlName = GetBaseConfigValue(key);

                string childPath = AppDomain.CurrentDomain.BaseDirectory + xmlName + ".xml";
                XPathDocument childDoc = new XPathDocument(childPath);

                XPathNavigator childNav = childDoc.CreateNavigator();
                XPathNodeIterator childRoot = childNav.Select("/config[@name=\"sys\" and @dialect=\"mysql_dialect\"]/option");
                kv = new Dictionary<string, string>();
                while (childRoot.MoveNext())
                {

                    string childKey = childRoot.Current.GetAttribute("key", "");
                    XPathNodeIterator values = childRoot.Current.Select("values");
                    while (values.MoveNext())
                    {
                        XPathNodeIterator vElement = values.Current.Select("value");

                        kv.Add(childKey, vElement.Current.Value.Trim());

                    }
                }
                collection.Add(key, kv);
            }
            return collection;

        }
    }
    /*************************************************************************
     * 文件名称 ：XmlHelper.cs                          
     * 描述说明 ：读取加载所有sql配置语句
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
