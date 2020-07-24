using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Angel.BLL
{
    public interface ISqlService
    {
        string GetData(string configKey, string sql);
        string GetData(string configKey, string sql,string param);
    }
}
