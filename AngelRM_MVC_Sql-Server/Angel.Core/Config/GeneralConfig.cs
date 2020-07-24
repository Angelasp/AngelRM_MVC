using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Angel.Core.Config
{
    public class GeneralConfig : BaseConfig
    {
        [XmlElement("AutoLock")]
        public AutoLock AutoLock { get; set; }

        [XmlElement("Culture")]
        public Culture Culture { get; set; }

        [XmlElement("VersionID")]
        public string VersionID { get; set; }
        
    }
    public class AutoLock
    {
        [XmlAttribute("IsAutoLock")]
        public bool IsAutoLock { get; set; }

        [XmlAttribute("AutoLockTime")]
        public int AutoLockTime { get; set; }


    }
    public class Culture
    {
        [XmlAttribute("Language")]
        public string Language { get; set; }
    }
}
