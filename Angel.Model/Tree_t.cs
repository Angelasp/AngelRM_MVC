using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Angel.Model
{
    /// <summary>
    ///Tree_t 的摘要说明
    /// </summary>
    public class Tree_t
    {
       
        public string text { get; set; }
        public string id { get; set; }
        public string pid { get; set; }
        public List<Tree_t> nodes { get; set; }
        public state state { get; set; }
    }


    public class state
    {

        public string @checked { get; set; }
        public string selected { get; set; }
    }


}