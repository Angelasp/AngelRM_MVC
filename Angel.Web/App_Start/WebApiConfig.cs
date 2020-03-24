using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Angel.Core.ParamTransfer;

namespace Angel.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Web api 路由设置
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional },
                constraints: new { action = new StartWithConstranint() }
            );
        }
    }
}