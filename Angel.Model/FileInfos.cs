using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Angel.Model
{
    public class FileInfos
    {
        public int id { get; set; }
        public string fileName { get; set; }
        public string sysName { get; set; }
        public string downLoadLink { get; set; }
        public string createUserName { get; set; }
        public string modifyUserName { get; set; }
        // 1-多维数据,2-投诉数据,3-多维数据(GP)
        public string type { get; set; }
        // 每页多少条数据
        public int rows { get; set; }
        // 请求第几页
        public int offset { get; set; }
    }
}
