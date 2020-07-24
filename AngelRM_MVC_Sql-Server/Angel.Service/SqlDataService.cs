using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Angel.BLL;
using Angel.Utils;
using Angel.DBHelper;

namespace Angel.Service
{
    public class SqlDataService : ISqlService
    {

        public string GetData(string configKey, string sqlCode)
        {
            string result = "";
            #region old code
            string xmlName = XmlHelper.GetBaseConfigValue(configKey);
            List<string> sqlArray = new List<string>();
            if (xmlName.Equals("") == false)
            {
                var list = XmlHelper.ReadXml(xmlName, sqlCode);
                if (list != null && list.Count > 0)
                {
                    foreach (var sql in list)
                    {
                        sqlArray.Add(sql.Value);
                    }
                }

                if (sqlArray.Count > 0)
                {
                    DataTable dt = SqlHelpers.ExecuteDataTable(SqlHelpers.connectionString, CommandType.Text, sqlArray[0]);

                    result = JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.None,
                        new JsonSerializerSettings
                        {
                            ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()
                        }
                        );
                }
            }
            else
            {
                result = "error:";
            }
            #endregion

            return result;
        }

        public string GetData(string configKey, string sqlCode, string parms)
        {
            string result = "";
            #region old code
            string xmlName = XmlHelper.GetBaseConfigValue(configKey);
            List<string> sqlArray = new List<string>();
            if (xmlName.Equals("") == false)
            {
                var list = XmlHelper.ReadXml(xmlName, sqlCode);
                if (list != null && list.Count > 0)
                {
                    foreach (var sql in list)
                    {
                        sqlArray.Add(sql.Value);
                    }
                }

                if (sqlArray.Count > 0)
                {
                    DataTable dt = SqlHelpers.ExecuteDataTable(SqlHelpers.connectionString, CommandType.Text, string.Format(sqlArray[0], parms));

                    result = JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.None,
                        new JsonSerializerSettings
                        {
                            ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver()
                        }
                        );
                }
            }
            else
            {
                result = "error:";
            }
            #endregion
            return result;
        }
    }
}
