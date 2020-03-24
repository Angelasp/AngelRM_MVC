using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Angel.Utils
{
    /*************************************************************************
     * 文件名称 ：FileLog.cs                          
     * 描述说明 ：系统日志输出类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    /// <summary>
    /// 简单的书写文件日志
    /// </summary>
    public static class FileLog
    {
        public static string path = AppDomain.CurrentDomain.BaseDirectory + "Log";
        private static string IsLog = System.Configuration.ConfigurationManager.AppSettings["LogMonitor"];
        private readonly static object lockObj = new object();
        static FileLog()
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }
        public static void WriteLog(string msg)
        {
            string fileName = path + "\\log" + DateTime.Now.ToString("yyyyMMdd") + ".txt";
            lock (lockObj)
            {
                if (bool.Parse(IsLog))
                {
                    StreamWriter write;
                    if (File.Exists(fileName))
                    {
                        write = File.AppendText(fileName);
                    }
                    else
                    {
                        FileStream stream = File.Create(fileName);
                        write = new StreamWriter(stream);

                    }
                    write.WriteLine(msg);
                    write.Flush();
                    write.Close();
                }
            }
        }

        public static void WriteLogNotLine(string msg)
        {
            string fileName = path + "\\log" + DateTime.Now.ToString("yyyyMMdd") + ".txt";
            lock (lockObj)
            {
                if (bool.Parse(IsLog))
                {
                    StreamWriter write;
                    if (File.Exists(fileName))
                    {
                        write = File.AppendText(fileName);
                    }
                    else
                    {
                        FileStream stream = File.Create(fileName);
                        write = new StreamWriter(stream);

                    }
                    write.Write(msg);
                    write.Flush();
                    write.Close();
                }
            }
        }

        //E:\\Angel.Web\\Log\\log20150123.txt
        public static void WriteLog(string msg, string filePath)
        {
            string fileName = filePath;
            lock (lockObj)
            {
                if (bool.Parse(IsLog))
                {
                    StreamWriter write;
                    if (File.Exists(fileName))
                    {
                        write = File.AppendText(fileName);
                    }
                    else
                    {
                        FileStream stream = File.Create(fileName);
                        write = new StreamWriter(stream);

                    }
                    write.WriteLine(msg);
                    write.Flush();
                    write.Close();
                }
            }
        }
    }
    /*************************************************************************
     * 文件名称 ：FileLog.cs                          
     * 描述说明 ：系统日志输出类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
