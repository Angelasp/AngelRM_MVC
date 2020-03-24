using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Angel.Utils;

namespace Angel.Core.Config
{
    /// <summary>
    /// 处理Global配置文件信息
    /// </summary>
   public class GlobalConfigManager
    {
        public delegate void ConfigLoadedHandler(GlobalConfig data);
        /// <summary>
        /// 配置加载完成事件
        /// </summary>
        public event ConfigLoadedHandler ConfigLoaded;

        private static WebClient _webClient;
        private static string _globalFileName = @"Config/GlobalConfig.xml";

        private static GlobalConfig _config;
        /// <summary>
        /// 配置数据
        /// </summary>
        public GlobalConfig Config
        {
            get { return _config; }
            //set { _config = value; }
        }

        private static GlobalConfigManager _instance;
        /// <summary>
        /// 配置管理对象,初次调用时执行LoadConfig方法
        /// </summary>
        public static GlobalConfigManager Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new GlobalConfigManager();

                }
                return _instance;
            }
        }

        public GlobalConfigManager()
        {

        }

        public void LoadConfig()
        {
            _webClient = new WebClient();
            _webClient.DownloadStringCompleted += new DownloadStringCompletedEventHandler(DownloadConfigXMLCompleted);
            
           // string configUrl = "http://localhost:14517/Config/GlobalConfig.xml";
            _webClient.DownloadStringAsync(new Uri(_globalFileName, UriKind.RelativeOrAbsolute));
        }
        private void DownloadConfigXMLCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            string xmlConfig = e.Result;
            _config = XmlConvertUtil.FromXml<GlobalConfig>(xmlConfig) as GlobalConfig;
            if (ConfigLoaded != null)
                ConfigLoaded(_config);
        }

        /// <summary>
        /// 通过ID获取Section对应的配置对象
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BaseConfig GetConfigByID(string id)
        {
            foreach (BaseConfig item in _config.Section)
            {
                if (item.ID.ToLower() == id.ToLower())
                {
                    return item;
                }
            }
            return null;
        }
    }
}
