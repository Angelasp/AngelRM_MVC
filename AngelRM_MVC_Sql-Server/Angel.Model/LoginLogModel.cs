using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Angel.Model
{
    /// <summary>
    /// 登录日志实体
    /// </summary>
    public class LoginLogModel
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int RoleID { get; set; }
        public string  RoleName { get; set; }
        public string ClientMachine { get; set; }
        public string ClientIP { get; set; }
        public DateTime LoginTime { get; set; }
        public string CreateUser { get; set; }
        public DateTime CreateTime { get; set; }
        public string UpdateUser { get; set; }
        public DateTime UpdateTime { get; set; }
    }
    
}
