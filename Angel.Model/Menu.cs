using System;
using System.Text;


namespace Angel.Model
{
   [Serializable]
    public class Menu
    {
       //菜单按钮实体
        private string _id; public string id { get { return _id; } set { _id = value; } }
        private string _menuname; public string menuname { get { return _menuname; } set { _menuname = value; } }
        private string _parentid; public string parentid { get { return _parentid; } set { _parentid = value; } }
        private string _orderid; public string orderid { get { return _orderid; } set { _orderid = value; } }
        private string _menutype; public string menutype { get { return _menutype; } set { _menutype = value; } }
        private string _menuo; public string menuo { get { return _menuo; } set { _menuo = value; } }
    }
}