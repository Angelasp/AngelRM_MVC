using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace Angel.Utils
{
   public class XmlConvertUtil
    {

        /*************************************************************************
         * 文件名称 ：XmlConvertUtil.cs                          
         * 描述说明 ：Xml文件读取转换类
         * 
         * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
         * 修订信息 : modify by (person) on (date) for (reason)
         * 
         * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
         **************************************************************************
         */
        /// <summary>
        /// Deserialize
        /// </summary>
        /// <typeparam name="T">Type</typeparam>
        /// <param name="filePath">file path</param>
        /// <returns>Type entity</returns>
        public static T Deserialize<T>(string filePath)
        {
            if (!string.IsNullOrEmpty(filePath))
            {
                FileInfo fileInfo = new FileInfo(filePath);

                if (!fileInfo.Exists)
                {
                    return default(T);
                }
            }
            else
            {
                return default(T);
            }
            string xml = string.Empty;

            using (StreamReader reader = new StreamReader(filePath))
            {
                xml = reader.ReadToEnd();
                reader.Close();
            }

            return DeserializeString<T>(xml);
        }

        public static T DeserializeString<T>(string xmlData)
        {
            System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(typeof(T));

            return (T)(xs.Deserialize(new StringReader(xmlData)));
        }

        public static T LoadModelFromStream<T>(Stream stream) where T : class
        {
            StreamReader sr = new StreamReader(stream);
            string info = sr.ReadToEnd();
            T targetClass = FromXml<T>(info);
            return targetClass;
        }

        public static T GetModel<T>(Stream stream) where T : class
        {
            StreamReader sr = new StreamReader(stream);
            string info = sr.ReadToEnd();
            T targetClass = FromXml<T>(info);
            return targetClass;
        }

        public static T FromXml<T>(string XMLString) where T : class
        {
            try
            {
                MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(XMLString));
                XmlSerializer xml = new XmlSerializer(typeof(T));
                T c = xml.Deserialize(ms) as T;
                return c;
            }
            catch (Exception)
            {
                return null;
            }

        }
        /// <summary>
        /// Serializer object to xml
        /// </summary>
        /// <param name="obj">the object entity</param>
        /// <returns>return a xml string</returns>
        public static string SerializerToStream(object obj)
        {
            System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(obj.GetType());
            System.Xml.Serialization.XmlSerializerNamespaces ns = new System.Xml.Serialization.XmlSerializerNamespaces();
            // Add two namespaces with prefixes.
            ns.Add(string.Empty, string.Empty);
            MemoryStream stream = new MemoryStream();
            XmlWriterSettings setting = new XmlWriterSettings();
            setting.Encoding = new UTF8Encoding(false);
            setting.Indent = true;
            using (XmlWriter writer = XmlWriter.Create(stream, setting))
            {
                xs.Serialize(writer, obj, ns);
            }

            return Encoding.UTF8.GetString(stream.ToArray());
        }

        /// <summary>
        /// Serializer T to xml
        /// </summary>
        /// <typeparam name="T">the type</typeparam>
        /// <param name="t">the T entity</param>
        /// <returns>return a xml string</returns>
        public static string SerializerToStream<T>(T t)
        {
            System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(t.GetType());
            System.Xml.Serialization.XmlSerializerNamespaces ns = new System.Xml.Serialization.XmlSerializerNamespaces();
            // Add two namespaces with prefixes.
            ns.Add(string.Empty, string.Empty);
            MemoryStream stream = new MemoryStream();
            XmlWriterSettings setting = new XmlWriterSettings();
            setting.Encoding = new UTF8Encoding(false);
            setting.Indent = true;
            using (XmlWriter writer = XmlWriter.Create(stream, setting))
            {
                xs.Serialize(writer, t, ns);
            }

            return Encoding.UTF8.GetString(stream.ToArray());
        }

        /// <summary>
        /// Serializer Xml To File
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <param name="fileFullPath"></param>
        public static void SerializerXmlToFile<T>(T t, string fileFullPath)
        {
            System.Xml.Serialization.XmlSerializer serializer
                        = new System.Xml.Serialization.XmlSerializer(t.GetType());

            System.Xml.Serialization.XmlSerializerNamespaces ns = new System.Xml.Serialization.XmlSerializerNamespaces();
            // Add two namespaces with prefixes.
            ns.Add(string.Empty, string.Empty);
            //ns.Add("ExportDate", DateTime.Now.ToString() );

            Stream fs = new FileStream(fileFullPath, FileMode.OpenOrCreate);
            XmlTextWriter writer = new XmlTextWriter(fs, Encoding.GetEncoding("utf-8"));

            writer.Formatting = Formatting.Indented;
            writer.Indentation = 4;

            // Serialize using the XmlTextWriter.
            serializer.Serialize(writer, t, ns);
            writer.Close();
        }

        bool IsFileInUse(string fileName)
        {
            bool inUse = true;
            if (File.Exists(fileName))
            {
                FileStream fs = null;
                try
                {
                    fs = new FileStream(fileName, FileMode.Open, FileAccess.Read, FileShare.None);
                    if (fs.CanWrite)
                        inUse = false;
                    else
                        inUse = true;


                    inUse = false;

                }
                catch
                {
                    // exception....
                }
                finally
                {
                    if (fs != null)
                        fs.Close();

                }
                return inUse;// true表示正在使用,false没有使用
            }
            else
            {
                return false;//文件不存在,肯定没有被使用
            }
        }
    }
   /*************************************************************************
* 文件名称 ：XmlConvertUtil.cs                          
* 描述说明 ：Xml文件读取转换类
* 
* 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
* 修订信息 : modify by (person) on (date) for (reason)
* 
* 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
**************************************************************************
*/
}
