using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading;
using System.Data;
using System.Collections;

namespace Angel.Service
{
    /// <summary>
    ///SaveReprot 的摘要说明
    /// </summary>
    [Serializable]
    public class SaveReprot
    {
        public static int State = 0;//0-没有开始,1-正在运行,2-成功结束,3-失败结束
        public static int Percent = 0;//执行成功后影响的行数
        public static DateTime StartTime;
        public static DateTime FinishTime;
        public static DateTime ErrorTime;
        public string reportname;

        public SaveReprot()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }
        public void RunSave(object ob)
        {
            lock (this)
            {
                if (State != 1)
                {
                    //State = 1;
                    //StartTime = DateTime.Now;
                    //System.Threading.ParameterizedThreadStart ts = new System.Threading.ParameterizedThreadStart(DoSaveReport);
                    //Thread thread = new Thread(ts);
                    //thread.Start(ob);
                }
            }
        }
    }

    [Serializable]
    public class SaveParameter
    {

        private Dictionary<string, Newtonsoft.Json.Linq.JArray> param;
        public Dictionary<string, Newtonsoft.Json.Linq.JArray> PARAM
        {
            get { return param; }
            set { param = value; }
        }

        private Dictionary<string, Newtonsoft.Json.Linq.JArray> paramGP;
        public Dictionary<string, Newtonsoft.Json.Linq.JArray> PARAMGP
        {
            get { return paramGP; }
            set { paramGP = value; }
        }

        private string tempname;
        public string TempName
        {
            get { return tempname; }
            set { tempname = value; }
        }

        private List<string> tempnames;
        public List<string> TempNames
        {
            get { return tempnames; }
            set { tempnames = value; }
        }
        private string username;
        public string UserName
        {
            get { return username; }
            set { username = value; }
        }
        private DataSet ds;
        public DataSet Ds
        {
            get { return ds; }
            set { ds = value; }
        }

        public Dictionary<string, DataRow> dicAuditRules;
        public Dictionary<string, DataRow> DicAuditRules
        {
            get { return dicAuditRules; }
            set { dicAuditRules = value; }
        }

        public SaveParameter(Dictionary<string, Newtonsoft.Json.Linq.JArray> param, string tempname, string username)
        {
            //TODO: 在此处添加构造函数逻辑
            //
            this.PARAM = param;
            this.TempName = tempname;
            this.UserName = username;
        }

        public SaveParameter(Dictionary<string, Newtonsoft.Json.Linq.JArray> param, string tempname, string username, bool isGP)
        {
            //TODO: 在此处添加构造函数逻辑
            //
            this.PARAMGP = param;
            this.TempName = tempname;
            this.UserName = username;
        }

        // 导出采集报表 Author:彭皓
        public SaveParameter(List<string> tempnames, DataSet ds, Dictionary<string, DataRow> dicAuditRules)
        {
            //TODO: 在此处添加构造函数逻辑
            //
            this.ds = ds;
            this.TempNames = tempnames;
            this.dicAuditRules = dicAuditRules;
        }

    }

    [Serializable]
    public class SaveParameter1
    {

        private List<Dictionary<string, Newtonsoft.Json.Linq.JArray>> param;
        public List<Dictionary<string, Newtonsoft.Json.Linq.JArray>> PARAM
        {
            get { return param; }
            set { param = value; }
        }


        private string tempname;
        public string TempName
        {
            get { return tempname; }
            set { tempname = value; }
        }

        private List<string> tempnames;
        public List<string> TempNames
        {
            get { return tempnames; }
            set { tempnames = value; }
        }

        private string username;
        public string UserName
        {
            get { return username; }
            set { username = value; }
        }

        private DataSet ds;
        public DataSet Ds
        {
            get { return ds; }
            set { ds = value; }
        }

        public SaveParameter1(List<Dictionary<string, Newtonsoft.Json.Linq.JArray>> param, string tempname, string username)
        {
            //TODO: 在此处添加构造函数逻辑
            //
            this.PARAM = param;
            this.TempName = tempname;
            this.UserName = username;
        }

        // 导出采集报表 Author:Alcedo
        public SaveParameter1(List<string> tempnames, DataSet ds)
        {
            //TODO: 在此处添加构造函数逻辑
            //
            this.ds = ds;
            this.TempNames = tempnames;
        }

    }


}