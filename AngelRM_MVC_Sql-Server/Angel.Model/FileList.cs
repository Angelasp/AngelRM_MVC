using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Angel.Model
{
  [Serializable]
   public class FileList
    {
        private string _FileName; public string FileName { get { return _FileName; } set { _FileName = value; } }
        private string _FilePath; public string FilePath { get { return _FilePath; } set { _FilePath = value; } }
        private string _FileTime; public string FileTime { get { return _FileTime; } set { _FileTime = value; } }
    }
}
