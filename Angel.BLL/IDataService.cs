using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;

namespace Angel.BLL
{
    /// <summary>
    /// 获取数据服务接口
    /// </summary>
   public interface IDataService
    {
       
       //获取数据
       string GetData(JObject param,string serverName);
       string GetDataOriginal(JObject param, string serverName);
       //插入数据
       string InsertData(JObject param, string serverName);
       //更新数据
       string UpdateData(JObject param, string serverName);
       //删除数据
       string DeleteData(JObject param, string serverName);
       //编辑数据，多表在同一事物中处理
       string EditData(JObject param, string severName);
       string GetDataBefor(JObject param, string serverName);
       string InsertBatch(JArray param, string serverName);
       string InsertBatchCheck(JArray param, string serverName);
       //用户修改密码
       string UpdatePassWord(JArray param, string serverName);
       string MulteBatch(List<string> sqlArray);
       string MulteBatch(Dictionary<string, Newtonsoft.Json.Linq.JArray> param);
       //返回插入对象
       string ExecuteScalar(Dictionary<string, Newtonsoft.Json.Linq.JArray> param);
    }
}
