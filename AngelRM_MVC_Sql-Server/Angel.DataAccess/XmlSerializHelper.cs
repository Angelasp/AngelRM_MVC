using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Angel.DataAccess
{
    public class XmlSerializHelper
    {
        /// <summary>
        ///  文件变对象
        /// </summary> 
        public static T Deserialize<T>(string filePath)
        {
            T retValue = default(T);

            if (File.Exists(filePath))
            {
                System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(typeof(T));

                using (Stream stream = File.OpenRead(filePath))
                {
                    retValue = (T)xs.Deserialize(stream);
                }
            }

            return retValue;
        }

        /// <summary>
        ///  文件变对象
        /// </summary> 
        public static void Serialize<T>(string filePath, T instance)
        {
            if (instance != null)
            {
                System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(typeof(T));

                using (StreamWriter sw = File.CreateText(filePath))
                {
                    xs.Serialize(sw, instance);
                }
            }
        }
    }
}
