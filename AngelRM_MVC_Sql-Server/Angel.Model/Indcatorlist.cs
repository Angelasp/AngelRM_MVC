using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
namespace Angel.Model
{
    /// <summary>
    /// 参数接收实体
    /// </summary>
    public class Indcatorlist
    {

        public string dimid { get; set; }
        public string dim_name { get; set; }
        public int dimcount { get; set;}
        public DataTable list { get; set; }

    }

    
}
