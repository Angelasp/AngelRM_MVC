using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace Angel.ExcelHelper
{
    public class XmlHelper
    {
        /// <summary>
        /// xml路径返回序列化列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="path"></param>
        /// <returns></returns>
        public static IList<T> DeserializeToListByPath<T>(string path)
        {
            using (FileStream fs=new FileStream(path,FileMode.Open))
            {
                using (StreamReader sr=new StreamReader(fs))
                {
                    return DeserializeToList<T>(sr.ReadToEnd());
                }
            }
        }



        #region  
        #region XML→T
        public static T Deserialize<T>(string xml)
        {
            if (typeof(T).IsGenericType)
            {
                return DeserializeToEntityList<T>(xml);
            }
            else
            {
                return DeserializeToEntity<T>(xml);
            }
        }
        #endregion

        #region XML→T(单例)
        private static T DeserializeToEntity<T>(string xml)
        {
            using (StringReader reader = new StringReader(xml))
            {
                XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(typeof(T));
                T obj = (T)xs.Deserialize(reader);
                return obj;
            }
        }
        #endregion

        #region XML→T(列表)
        public static IList<T> DeserializeToList<T>(string xml)
        {
            XmlDocument document = new XmlDocument();
            document.LoadXml(xml);
            string nodeName = typeof(T).Name.ToLower();
            IList<T> list = new List<T>();
            foreach (XmlNode node in document.GetElementsByTagName(nodeName))
            {
                list.Add(Deserialize<T>(node.OuterXml));
            }
            return list;
        }

        private static T DeserializeToEntityList<T>(string xml)
        {
            var method = typeof(XmlHelper).GetMethod("DeserializeToList", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static).MakeGenericMethod(typeof(T).GetGenericArguments()[0]);
            return (T)method.Invoke(null, new object[] { xml });
        }
        #endregion

        #region T→XML
        public static string Serialize<T>(T obj)
        {
            string xmlString = string.Empty;
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));
            using (MemoryStream ms = new MemoryStream())
            {
                xmlSerializer.Serialize(ms, obj);
                xmlString = Encoding.UTF8.GetString(ms.ToArray());
            }
            return xmlString;
        }
        #endregion

        /// <summary>
        /// Serializes the data in the object to the designated file path
        /// </summary>
        /// <typeparam name="T">Type of Object to serialize</typeparam>
        /// <param name="dataToSerialize">Object to serialize</param>
        /// <param name="filePath">FilePath for the XML file</param>
        public static void Serialize<T>(T dataToSerialize, string filePath)
        {
            try
            {
                using (Stream stream = File.Open(filePath, FileMode.Create, FileAccess.ReadWrite))
                {
                    XmlSerializer serializer = new XmlSerializer(typeof(T));
                    XmlTextWriter writer = new XmlTextWriter(stream, Encoding.Default);
                    writer.Formatting = Formatting.Indented;
                    serializer.Serialize(writer, dataToSerialize);
                    writer.Close();
                }
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// Deserializes the data in the XML file into an object
        /// </summary>
        /// <typeparam name="T">Type of object to deserialize</typeparam>
        /// <param name="filePath">FilePath to XML file</param>
        /// <returns>Object containing deserialized data</returns>
        public static T Deserializes<T>(string filePath)
        {
            try
            {
                XmlSerializer serializer = new XmlSerializer(typeof(T));
                T serializedData;

                using (Stream stream = File.Open(filePath, FileMode.Open, FileAccess.Read))
                {
                    serializedData = (T)serializer.Deserialize(stream);
                }

                return serializedData;
            }
            catch
            {
                throw;
            }
        }

        #endregion
    }
}
