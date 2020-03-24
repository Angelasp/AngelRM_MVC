using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Angel.Core.Config
{
    [XmlRoot("Root")]
    [XmlInclude(typeof(WebServiceCollection))]
    [XmlInclude(typeof(GeneralConfig))]
   public class GlobalConfig :BaseConfig
    {
        [XmlElement("Section")]
        public List<BaseConfig> Section { get; set; }
    }
}
