using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Angel.BLL;
using Angel.DBHelper;
using Newtonsoft.Json.Converters;

namespace Angel.Service
{
    public class MysqlService : IDatabase
    {

        public string Select(string sql)
        {
            string a = ";lt";
            string b = ";gt";
            sql = sql.Replace(a, "<").Replace(b, ">");
            DataTable dt = MySqlHelpers.ExecuteDataTable(MySqlHelpers.connectionString, CommandType.Text, sql);
            IsoDateTimeConverter timeFormat = new IsoDateTimeConverter();
            timeFormat.DateTimeFormat = "yyyy-MM-dd HH:mm:ss";
            return JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.None,timeFormat).ToLower();
        }

        public string SelectOriginal(string sql)
        {
            string a = ";lt";
            string b = ";gt";
            sql = sql.Replace(a, "<").Replace(b, ">");
            DataTable dt = MySqlHelpers.ExecuteDataTable(MySqlHelpers.connectionString, CommandType.Text, sql);
           //名称和日期都进行格式
            Newtonsoft.Json.JsonSerializerSettings setting = new Newtonsoft.Json.JsonSerializerSettings{ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()};
            JsonConvert.DefaultSettings = new Func<JsonSerializerSettings>(() =>
            {
                //日期类型默认格式化处理
                setting.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.MicrosoftDateFormat;
                setting.DateFormatString = "yyyy-MM-dd HH:mm:ss";
                //空值处理
                setting.NullValueHandling = NullValueHandling.Ignore;
                return setting;
            });

            return JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.None, setting);


        }

        public string Delete(string sql)
        {
            int result = MySqlHelpers.ExecuteNonQuery(sql);
            return "{\"del\":" + result + "}";
        }

        public string Update(string sql)
        {
            int result = MySqlHelpers.ExecuteNonQuery(sql);
             return "{\"upd\":" + result + "}";
        }

        public string Edite(string[] sqls)
        {
            throw new NotImplementedException();
        }

        public string Create(string sql)
        {
            int result = MySqlHelpers.ExecuteNonQuery(sql);
            return "{\"ins\":" + result + "}";
        }

        public object ExecuteScalar(string sql)
        {
            return MySqlHelpers.ExecuteScalar(sql);
        }

        public string InsertBatch(List<string> sqlArray)
        {
            int result = MySqlHelpers.ExecuteNonQuery(sqlArray);
            return "\"ins\":" + result + "";
        }


        public string MulteBatch(List<string> sqlArray)
        {
            int result = MySqlHelpers.ExecuteNonQuery(sqlArray);
            return "\"ins\":" + result + "";
        }
    }
}
