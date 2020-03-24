using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Angel.BLL
{
   public interface IDatabase
    {
       string Select(string sql);
       string SelectOriginal(string sql);
       string Delete(string sql);
       string Update(string sql);
       string Edite(string[] sqls);

       string Create(string sql);
       object ExecuteScalar(string sql);
       string InsertBatch(List<string> sqlArray);
       string MulteBatch(List<string> sqlArray);
    }
}
