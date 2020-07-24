using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Angel.Core.Config
{
   public class BaseConfig
    {
       [XmlAttribute("ID")]
       public string ID { get; set; }
        [XmlAttribute("Description")]
       public string Description { get; set; }
    }

}
