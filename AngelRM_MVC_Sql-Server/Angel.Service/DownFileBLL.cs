using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Web;
using System.IO;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Angel.DataAccess;
using Microsoft.Win32;
using System.Diagnostics;


namespace Angel.Service
{
    /*************************************************************************
     * 文件名称 ：DownFileBLL.cs                          
     * 描述说明 ：操作压缩文件
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    public class DownFileBLL
    {

        /// <summary>
        /// 验证WinRar是否安装。
        /// </summary>
        /// <returns>true：已安装，false：未安装</returns>
        private static bool ExistsRar(out String winRarPath)
        {
            winRarPath = String.Empty;
            //通过Regedit（注册表）找到WinRar文件
            var registryKey = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\WinRAR.exe");
            if (registryKey == null) return false;//未安装
            //registryKey = theReg;可以直接返回Registry对象供会面操作
            winRarPath = registryKey.GetValue("").ToString();
            //这里为节约资源，直接返回路径，反正下面也没用到
            registryKey.Close();//关闭注册表
            return !String.IsNullOrEmpty(winRarPath);
        }


        /// <summary>
        /// 生成Zip
        /// </summary>
        /// <param name="path">文件夹路径</param>
        /// <param name="rarPath">生成压缩文件的路径</param>
        /// <param name="rarName">生成压缩文件的文件名</param>
        public static void CompressRar(String path, String rarPath, String rarName)
        {
            try
            {
                String winRarPath = null;
                if (!ExistsRar(out winRarPath)) return;
                //验证WinRar是否安装。
                var pathInfo = String.Format("a -afzip -m0 -ep1 \"{0}\" \"{1}\"", rarName, path);
                #region WinRar 用到的命令注释
                //[a] 添加到压缩文件
                //afzip 执行zip压缩方式，方便用户在不同环境下使用。
                //（取消该参数则执行rar压缩）
                //-m0 存储 添加到压缩文件时不压缩文件。共6个级别【0-5】，值越大效果越好，也越慢
                //ep1 依名称排除主目录（生成的压缩文件不会出现不必要的层级）
                //r 修复压缩档案
                //t 测试压缩档案内的文件
                //as 同步压缩档案内容 
                //-p 给压缩文件加密码方式为：-p123456
                #endregion
                //打包文件存放目录
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = winRarPath,//执行的文件名
                        Arguments = pathInfo,//需要执行的命令
                        UseShellExecute = false,//使用Shell执行
                        WindowStyle = ProcessWindowStyle.Hidden,//隐藏窗体
                        WorkingDirectory = rarPath,//rar 存放位置
                        CreateNoWindow = false,//不显示窗体
                    },
                };
                process.Start();//开始执行
                process.WaitForExit();//等待完成并退出
                process.Close();//关闭调用 cmd 的什么什么
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
    /*************************************************************************
     * 文件名称 ：DownFileBLL.cs                          
     * 描述说明 ：操作压缩文件
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
