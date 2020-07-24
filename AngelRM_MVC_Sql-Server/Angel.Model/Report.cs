using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using System.Runtime.Serialization;

namespace Angel.Model
{
    [DataContract]
    [XmlRoot("Report")]
    public class Report
    {
        [DataMember]
        [XmlElement("TAB")]
        public List<Dimention> TABList { get; set; }
    }
    public class Dimention
    {
        [DataMember]
        [XmlAttribute("Id")]
        public string TabId
        {
            get;
            set;
        }

        [DataMember]
        [XmlAttribute("Name")]
        public string TabName
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("GridBinding")]
        public GridBinding GridBinding { get; set; }

        [DataMember]
        [XmlElement("SqlCityAll")]
        public string SqlCityAll
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("SqlAll")]
        public string SqlAll
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("SqlCityCATEGORY")]
        public string SqlCityCATEGORY
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("SqlCityBUSSNIES")]
        public string SqlCityBUSSNIES
        {
            get;
            set;
        }

       



        [DataMember]
        [XmlElement("SqlProAll")]
        public string SqlProAll
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("SqlProCATEGORY")]
        public string SqlProCATEGORY
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("SqlProBUSSNIES")]
        public string SqlProBUSSNIES
        {
            get;
            set;
        }
        [DataMember]
        [XmlElement("SqlCountryAll")]
        public string SqlCountryAll
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("SqlCountryCATEGORY")]
        public string SqlCountryCATEGORY
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("SqlCountryBUSSNIES")]
        public string SqlCountryBUSSNIES
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("InsertSql")]
        public string InsertSql
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("SqlFromExist")]
        public string SqlFromExist
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("Sql")]   // modify by luqy
        public string Sql
        {
            get;
            set;
        }

        [DataMember]
        [XmlElement("sqldifcity")]   // modify by luqy
        public string sqldifcity
        {
            get;
            set;
        }
    }
    [DataContract]
    public class GridBinding
    {
        [XmlElement("Column")]
        [DataMember]
        public List<ColumnInfo> Columns;
        [XmlAttribute("Name")]
        [DataMember]
        public string Name { set; get; }
    }
    [DataContract]
    public class ColumnInfo
    {
        public ColumnInfo()
        {
            hidden = false;
        }

        private string _fieldName;

        [XmlAttribute("title")]
        [DataMember]
        public string title { get; set; }

        [XmlAttribute("field")]
        [DataMember]
        public string field
        {
            get
            {
                return this._fieldName.ToUpper();
            }
            set
            {
                this._fieldName = value;
            }
        }

        [XmlAttribute("width")]
        [DataMember]
        public int width { set; get; }

        [XmlAttribute("align")]
        [DataMember]
        public string align { get; set; }

        [XmlAttribute("yAxis")]
        [DataMember]
        public bool yAxis { get; set; }

        [XmlAttribute("hidden")]
        [DataMember]
        public bool hidden { get; set; }

        [XmlAttribute("sortable")]
        [DataMember]
        public bool sortable { get; set; }

        

        /// <summary>
        ///     列是否显示的条件
        /// </summary>
        [XmlAttribute("visiblecondition")]
        [DataMember]
        public string VisibleCondition { get; set; }
    }
}
