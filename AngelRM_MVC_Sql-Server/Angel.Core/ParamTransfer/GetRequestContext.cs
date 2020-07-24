using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Angel.Core.ParamTransfer
{
    /// <summary>
    /// 获取传统的context。不使用api的传递参数转换方式
    /// </summary>
   public class GetRequestContext
    {
       public static HttpRequestBase GetRequet(HttpRequestMessage request) 
       {
         HttpContextBase basecontext =  (HttpContextBase)request.Properties["MS_HttpContext"];
         HttpRequestBase requestBase = basecontext.Request;
         return requestBase; 
       }
    }
}
