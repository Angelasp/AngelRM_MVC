using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Angel.Core.Config
{

   public class WebServiceCollection:BaseConfig
    {
       public WebServiceCollection() 
       {
           WebSerice = new List<WebService>();
       } 
       [XmlElement("WebService")]
       public List<WebService> WebSerice { get; set; }
    }
   public class WebService 
   {
       [XmlAttribute("ServiceID")]
       public string ServiceID { get; set; }
       [XmlAttribute("ServiceUrl")]
       public string ServiceUrl { get; set; }
   }
}
