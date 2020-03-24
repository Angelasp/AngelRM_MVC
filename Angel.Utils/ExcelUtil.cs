using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.XPath;

namespace Angel.Utils
{
    public class ExcelUtil
    {
        public static string getExcelColumnLabel(int num)
        {
            string temp = "";
            double i = Math.Floor(Math.Log(25.0 * (num) / 26.0 + 1) / Math.Log(26)) + 1;
            if (i > 1)
            {
                double sub = num - 26 * (Math.Pow(26, i - 1) - 1) / 25;
                for (double j = i; j > 0; j--)
                {
                    temp = temp + (char)(sub / Math.Pow(26, j - 1) + 65);
                    sub = sub % Math.Pow(26, j - 1);
                }
            }
            else
            {
                temp = temp + (char)(num + 65);
            }
            return temp;
        }        
    }
}
