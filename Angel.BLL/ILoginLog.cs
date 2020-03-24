using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Angel.Model;

namespace Angel.BLL
{
    public interface ILoginLog
    {
        /// <summary>
        /// 登录日志列表
        /// </summary>
        /// <returns></returns>
        List<LoginLogModel> SelectLoginLOG(string time, int PageSize, int PageIndex);
        /// <summary>
        /// 保存日志的方法
        /// </summary>
        /// <param name="userid">用户ID</param>
        /// <param name="username">用户名称</param>
        /// <param name="roleid">权限ID</param>
        /// <param name="rolename">权限名称</param>
        /// <param name="logintdate">登录时间</param>
        void SaveLog(int userid, string username, int roleid, string rolename, string clientip, string createuser);
    }
}
