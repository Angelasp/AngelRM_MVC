using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Office.Interop.Word;

namespace Angel.Service
{
    public class fontStyle
    {
        private string font="宋体";        
        private float fontSize;
        private bool underline = false;
        private bool delline = false;
        private bool font_bold = false;       
        private bool font_italic = false;
        private WdColor color = WdColor.wdColorAutomatic;
        private bool center = false;

        public bool Center
        {
            get { return center; }
            set { center = value; }
        }

        public bool Font_Bold
        {
            get { return font_bold; }
            set { font_bold = value; }
        }
        public bool Font_italic
        {
            get { return font_italic; }
            set { font_italic = value; }
        }
        public string Font
        {
            get { return font; }
            set { font = value; }
        }



        public float FontSize
        {
            get { return fontSize; }
            set { fontSize = value; }
        }

        public bool Underline
        {
            get { return underline; }
            set { underline = value; }
        }

        public bool Delline
        {
            get { return delline; }
            set { delline = value; }
        }


        public WdColor  Color
        {
            get { return color; }
            set { color = value; }
        }
    }
}
