using System;
using System.Text;


namespace Angel.Model
{
   [Serializable]
    public class UserInfos
    {
        private string _username; public string username { get { return _username; } set { _username = value; } }
        private string _password; public string password { get { return _password; } set { _password = value; } }
        private string _mycode; public string mycode { get { return _mycode; } set { _mycode = value; } }
        private string _url; public string url { get { return _url; } set { _url = value; } }
    }
}