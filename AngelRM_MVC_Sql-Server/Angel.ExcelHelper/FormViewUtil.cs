using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Angel.ExcelHelper
{
   public static class FormViewUtil
    {
       


       /// <summary>
       /// 字符串显示：空值时显示""
       /// </summary>
       /// <param name="str"></param>
       /// <returns></returns>
       public static string SafeStringView(this string str)
       {
           if (string.IsNullOrEmpty(str))
           {
               return "";
           }
           else
           {
               return str;
           }
       }

       /// <summary>
       ///  int显示：空值时显示""
       /// </summary>
       /// <param name="i"></param>
       /// <returns></returns>
       public static string SafeStringView(this int? i)
       {
           if (i.HasValue)
           {
               return i.ToString();
           }
           else
           {
               return "";
           }
       }

       /// <summary>
       /// double显示：空值时显示""
       /// </summary>
       /// <param name="d"></param>
       /// <returns></returns>
       public static string SafeStringView(this double? d)
       {
           if (d.HasValue)
           {
               return d.ToString();
           }
           else
           {
               return "";
           }
       }

       /// <summary>
       /// 字符串显示：空值时显示nullStr
       /// </summary>
       /// <param name="str"></param>
       /// <param name="nullStr">无</param>
       /// <returns></returns>
       public static string SafeStringView(this string str, string nullStr)
       {
           if (string.IsNullOrEmpty(str))
           {
               return nullStr;
           }
           else
           {
               return str;
           }
       }


    



       /// <summary>
       /// 时间显示：yyyy-mm-dd格式
       /// </summary>
       /// <param name="date"></param>
       /// <returns></returns>
       public static string SafeDateView(this DateTime? date)
       {
           if (date.HasValue)
           {
           return ((DateTime)date).ToString("yyyy-MM-dd",System.Globalization.DateTimeFormatInfo.InvariantInfo);
           }
           else
           {
               return "";
           }
       }
    }
}
