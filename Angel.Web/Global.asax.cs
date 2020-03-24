using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.SessionState;
using Ninject;

namespace Angel.Web
{
    // 注意: 有关启用 IIS6 或 IIS7 经典模式的说明，
    // 请访问 http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterAuth();

            //注入
            var kernel = new StandardKernel();
            kernel.Bind<Angel.BLL.IDataService>().To<Angel.Service.BLLService>();
            kernel.Bind<Angel.BLL.IMysqlService>().To<Angel.Service.MysqlDataService>();
            kernel.Bind<Angel.BLL.IDatabase>().To<Angel.Service.MysqlService>();
            GlobalConfiguration.Configuration.DependencyResolver = new Angel.Core.IOC.NinjectResolver(kernel);

            //缓存
            HttpContext.Current.Application["key"] = Angel.Utils.XmlHelper.GetXmlCaches();
        }


        /// <summary>
        /// MVC为了获取session参数
        /// </summary>
        public override void Init()
        {
            PostAuthenticateRequest += (s, e) => HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
            base.Init();
        }

        void MvcApplication_PostAuthenticateRequest(object sender, EventArgs e)
        {
            HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }




    }
}