using System;
using System.Collections.Generic;
using System.Linq;
using System.Drawing;
using System.Web;
using Angel.Utils;
using Microsoft.Office.Interop.Word;
using System.Threading;

namespace Angel.Service
{
    /*************************************************************************
     * 文件名称 ：WordHelper.cs                          
     * 描述说明 ：操作Word文件
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    public class WordHelper
    {
        private String wordVersion;//区分用户机器上安装的是03或是07
        private object wordPath;
        private Object Nothing = System.Reflection.Missing.Value;
        private Microsoft.Office.Interop.Word.Application myWordApp = null;
        private object boolTrue = true;
        private object boolFalse = false;
        private Microsoft.Office.Interop.Word.Selection selection = null;
        public Document myWordDoc = null;
        public int contentNumPage;
        System.Collections.Generic.Dictionary<int, int> CombineCell = new System.Collections.Generic.Dictionary<int, int>();
        System.Collections.Generic.Dictionary<int, int> CombineCell2 = new System.Collections.Generic.Dictionary<int, int>();
        Color standardblue = Color.FromArgb(0, 112, 192);
        public WordHelper(string wordPath)
        {
            this.wordPath = wordPath;
        }
        public String buildWordFile()
        {
            try
            {
                FileLog.WriteLog("buildWordFile");
                myWordApp = new Microsoft.Office.Interop.Word.Application();
                FileLog.WriteLog("Microsoft.Office.Interop.Word.Application");
                myWordDoc = myWordApp.Documents.Add(ref Nothing, ref Nothing, ref Nothing, ref Nothing);
                //关闭word的语法错误检查
                myWordDoc.SpellingChecked = false;
                myWordDoc.ShowSpellingErrors = false;
                myWordApp.Options.CheckGrammarWithSpelling = false;
                myWordApp.Options.SuggestSpellingCorrections = false;
                myWordApp.Options.CheckSpellingAsYouType = false;
                myWordApp.Options.CheckGrammarAsYouType = false;

                this.myWordDoc.PageSetup.LeftMargin = this.myWordApp.CentimetersToPoints(float.Parse("1.8"));
                this.myWordDoc.PageSetup.RightMargin = this.myWordApp.CentimetersToPoints(float.Parse("1.8"));
                this.myWordDoc.PageSetup.TopMargin = this.myWordApp.CentimetersToPoints(float.Parse("2.5"));
                this.myWordDoc.PageSetup.BottomMargin = this.myWordApp.CentimetersToPoints(float.Parse("2.5"));
                selection = myWordApp.Selection;
            }
            catch (Exception ex)
            {
                Close();
                return "文件初始化出现异常，初始化失败";
            }

            return null;
        }

        public void InsertExcelObject(string excelPath, string filename)
        {
            string _directory = System.AppDomain.CurrentDomain.BaseDirectory;
            object excelType = @"Excel.Sheet.12";//插入的excel 格式，这里我用的是excel 2010，所以是.12
            object filepath = @excelPath;//插入的excel的位置
            object linktofile = false;//不是链接到文件，而是拷贝一份
            object title = filename;
            object iconFilename = _directory + "Images\\" + "xlicons.exe";//指定图标文件所在的位置
            this.selection.InlineShapes.AddOLEObject(ref excelType, ref filepath, ref linktofile, true, ref iconFilename, 0, ref title, ref Nothing);
        }

        public String InsertTitle(string txt, WdColor fontColor, string font, bool underline, bool delline, bool bold, bool italic, float size, int titleLevel, bool center)
        {

            try
            {
                object oStyleName = null;
                if (titleLevel == 1)
                    oStyleName = "标题 1";
                if (titleLevel == 2)
                    oStyleName = "标题 2";
                if (titleLevel == 3)
                    oStyleName = "标题 3";
                if (titleLevel == 4)
                    oStyleName = "标题 4";
                if (titleLevel == 5)
                    oStyleName = "标题 5";
                if (titleLevel == 6)
                    oStyleName = "正文";

                //selection.ClearParagraphAllFormatting();
                //selection.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;
                selection.set_Style(oStyleName);
                selection.Font.Name = font;
                selection.Font.Size = size;
                if (underline == true)
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineThick;
                }
                else
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineNone;
                }
                if (delline == true)
                {
                    selection.Font.StrikeThrough = 0;
                }
                if (bold == true)
                {
                    selection.Font.Bold = 1;
                }
                selection.Font.Color = fontColor;
                if (center)
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                }

                object wdNumberParagraph = WdNumberType.wdNumberParagraph;
                selection.Range.ListFormat.RemoveNumbers(ref wdNumberParagraph);//移除项目编号
                selection.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;
                selection.TypeText(txt);
                selection.TypeParagraph();
            }
            catch (Exception ex)
            {
                return "插入文本出现异常，插入失败";
            }
            return null;
        }
        public String ExportPic(String path, String explain, String font, float size)
        {
            try
            {
                selection.Font.Name = font;
                selection.Font.Size = size;
                selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                selection.ParagraphFormat.CharacterUnitFirstLineIndent = 0;//首行缩进两字符
                selection.InlineShapes.AddPicture(path, ref boolFalse, ref boolTrue, ref Nothing);
                selection.TypeParagraph();
                selection.TypeText(explain);
                selection.TypeParagraph();
            }
            catch (Exception ex)
            {
                return "插入图片出现异常，插入失败";
            }
            return null;
        }
        public void ParagraphFormat()
        {
            myWordApp.ActiveDocument.Select();
            selection.ParagraphFormat.SpaceBefore = float.Parse("0");//段前间距  
            selection.ParagraphFormat.SpaceBeforeAuto = 0;//  
            selection.ParagraphFormat.SpaceAfter = float.Parse("0");//段后间距  
            selection.ParagraphFormat.SpaceAfterAuto = 0;//  
            //selection.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距 
        }

        //首字符不缩进，并且后面内容不新起一段。
        public String ExportNoLine(string txt, WdColor fontColor, string font, bool underline, bool delline, bool bold, bool italic, float size, bool center)
        {
            try
            {
                //段落格式设定  
                // selection.ParagraphFormat.LeftIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//左缩进  
                // selection.ParagraphFormat.RightIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//右缩进  

                selection.ParagraphFormat.SpaceBefore = float.Parse("0");//段前间距  
                selection.ParagraphFormat.SpaceBeforeAuto = 0;//  
                selection.ParagraphFormat.SpaceAfter = float.Parse("0");//段后间距  
                selection.ParagraphFormat.SpaceAfterAuto = 0;//  
                selection.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距             
                //selection.ParagraphFormat.LineSpacing = 15;

                if (center)
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                }
                selection.Font.Name = font;
                selection.Font.Size = size;
                if (underline == true)
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineThick;
                }
                else
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineNone;
                }
                if (delline == true)
                {
                    selection.Font.StrikeThrough = 0;
                }
                if (bold == true)
                {
                    selection.Font.Bold = 1;
                }
                else
                {
                    selection.Font.Bold = 0;
                }
                selection.Font.Color = fontColor;
                selection.ParagraphFormat.CharacterUnitFirstLineIndent = 0;//首行缩进两字符
                selection.TypeText(txt);
                //               selection.TypeParagraph();

            }
            catch (Exception ex)
            {
                return "插入文本出现异常，插入失败";
            }
            return null;
        }

        public String ExportTxt(string txt, WdColor fontColor, string font, bool underline, bool delline, bool bold, bool italic, float size, bool center)
        {
            try
            {
                //段落格式设定  
                // selection.ParagraphFormat.LeftIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//左缩进  
                // selection.ParagraphFormat.RightIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//右缩进  
                selection.ParagraphFormat.SpaceBefore = float.Parse("0");//段前间距  
                selection.ParagraphFormat.SpaceBeforeAuto = 0;//  
                selection.ParagraphFormat.SpaceAfter = float.Parse("0");//段后间距  
                selection.ParagraphFormat.SpaceAfterAuto = 0;//  
                selection.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距  
                if (center)
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                else
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;

                selection.Font.Name = font;
                selection.Font.Size = size;

                if (underline == true)
                    selection.Font.Underline = WdUnderline.wdUnderlineThick;
                else
                    selection.Font.Underline = WdUnderline.wdUnderlineNone;

                if (delline == true)
                    selection.Font.StrikeThrough = 0;

                if (bold == true)
                    selection.Font.Bold = 1;
                else
                    selection.Font.Bold = 0;

                selection.Font.Color = fontColor;
                selection.ParagraphFormat.CharacterUnitFirstLineIndent = 2;//首行缩进两字符

                if (txt.Substring(0, 1) == "\n")
                    txt = txt.Remove(0, 1);

                string[] sArray = txt.Split(new char[1] { '\n' });
                foreach (string str in sArray)
                {
                    selection.TypeText(str);
                    selection.TypeParagraph();
                }
            }
            catch (Exception ex)
            {
                return "插入文本出现异常，插入失败";
            }
            return null;
        }


        public String ExportTxtOld(string txt, WdColor fontColor, string font, bool underline, bool delline, bool bold, bool italic, float size, bool center)
        {
            try
            {
                //段落格式设定  
                // selection.ParagraphFormat.LeftIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//左缩进  
                // selection.ParagraphFormat.RightIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//右缩进  
                selection.ParagraphFormat.SpaceBefore = float.Parse("0");//段前间距  
                selection.ParagraphFormat.SpaceBeforeAuto = 0;//  
                selection.ParagraphFormat.SpaceAfter = float.Parse("0");//段后间距  
                selection.ParagraphFormat.SpaceAfterAuto = 0;//  
                selection.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距  
                //selection.ParagraphFormat.LineSpacing = 15;

                if (center)
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                }
                selection.Font.Name = font;
                selection.Font.Size = size;
                if (underline == true)
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineThick;
                }
                else
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineNone;
                }
                if (delline == true)
                {
                    selection.Font.StrikeThrough = 0;
                }
                if (bold == true)
                {
                    selection.Font.Bold = 1;
                }
                selection.Font.Color = fontColor;

                selection.ParagraphFormat.CharacterUnitFirstLineIndent = 2;//首行缩进两字符

                //selection.TypeText(txt);
                //selection.TypeParagraph();
                if (txt.Substring(0, 1) == "\n")
                    txt = txt.Remove(0, 1);
                /* *****第一季度使用 ◆标题加粗
                int posInt = txt.IndexOf("◆");
                if (posInt != -1)
                {
                    string[] sArray = txt.Split(new char[1] { '\n' });
                        foreach(string str in sArray)
                        {
                            int posInt1 = str.IndexOf("◆");
                            if (posInt1 != -1)
                            {
                                selection.Font.Bold = 1;
                                selection.TypeText(str);
                                selection.TypeParagraph();
                            }
                            else
                            {
                                if (bold == false)
                                {
                                    selection.Font.Bold = 0;
                                }
                                selection.TypeText(str);
                                selection.TypeParagraph();
                            }
                            
                        }
                }
                else
                {
                    selection.TypeText(txt);
                    selection.TypeParagraph();
                }*/
                string[] strCompare = new string[5];
                strCompare[0] = "个人业务方面";
                strCompare[1] = "家庭业务方面";
                strCompare[2] = "集团业务方面";
                strCompare[3] = "基础网络方面";
                strCompare[4] = "竞对对比";

                string[] sArray = txt.Split(new char[1] { '\n' });
                foreach (string str in sArray)
                {
                    int posInt1 = str.IndexOf("，");
                    if (posInt1 != -1)
                    {
                        string strCompareTo = str.Substring(0, posInt1);
                        if (strCompareTo == strCompare[0] ||
                            strCompareTo == strCompare[1] ||
                            strCompareTo == strCompare[2] ||
                            strCompareTo == strCompare[3] ||
                            strCompareTo == strCompare[4])
                        {
                            selection.Font.Bold = 1;
                            selection.TypeText(strCompareTo);

                            if (bold == false)
                            {
                                selection.Font.Bold = 0;
                            }
                            selection.TypeText(str.Substring(posInt1, str.Length - posInt1));
                            selection.TypeParagraph();
                        }
                        else
                        {
                            if (bold == false)
                            {
                                selection.Font.Bold = 0;
                            }
                            selection.TypeText(str);
                            selection.TypeParagraph();
                        }
                    }
                    else
                    {
                        if (bold == false)
                        {
                            selection.Font.Bold = 0;
                        }
                        selection.TypeText(str);
                        selection.TypeParagraph();
                    }

                }
            }
            catch (Exception ex)
            {
                return "插入文本出现异常，插入失败";
            }
            return null;
        }

        public String ExportTxtWithoutFirstLineIndent(string txt, WdColor fontColor, string font, bool underline, bool delline, bool bold, bool italic, float size, bool center)
        {
            try
            {
                //段落格式设定  
                // selection.ParagraphFormat.LeftIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//左缩进  
                // selection.ParagraphFormat.RightIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//右缩进  
                selection.ParagraphFormat.SpaceBefore = float.Parse("0");//段前间距  
                selection.ParagraphFormat.SpaceBeforeAuto = 0;//  
                selection.ParagraphFormat.SpaceAfter = float.Parse("0");//段后间距  
                selection.ParagraphFormat.SpaceAfterAuto = 0;//  
                selection.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距  
                //selection.ParagraphFormat.LineSpacing = 15;

                if (center)
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                }
                selection.Font.Name = font;
                selection.Font.Size = size;
                if (underline == true)
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineThick;
                }
                else
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineNone;
                }
                if (delline == true)
                {
                    selection.Font.StrikeThrough = 0;
                }
                if (bold == true)
                {
                    selection.Font.Bold = 1;
                }
                selection.Font.Color = fontColor;

                selection.ParagraphFormat.CharacterUnitFirstLineIndent = 0;//首行不缩进
                selection.ParagraphFormat.FirstLineIndent = 0;
                selection.ParagraphFormat.LeftIndent = 0;

                //selection.TypeText(txt);
                //selection.TypeParagraph();
                if (txt.Substring(0, 1) == "\n")
                    txt = txt.Remove(0, 1);
                string[] strCompare = new string[5];
                strCompare[0] = "个人业务方面";
                strCompare[1] = "家庭业务方面";
                strCompare[2] = "集团业务方面";
                strCompare[3] = "基础网络方面";
                strCompare[4] = "竞对对比";

                string[] sArray = txt.Split(new char[1] { '\n' });
                foreach (string str in sArray)
                {
                    int posInt1 = str.IndexOf("，");
                    if (posInt1 != -1)
                    {
                        string strCompareTo = str.Substring(0, posInt1);
                        if (strCompareTo == strCompare[0] ||
                            strCompareTo == strCompare[1] ||
                            strCompareTo == strCompare[2] ||
                            strCompareTo == strCompare[3] ||
                            strCompareTo == strCompare[4])
                        {
                            selection.Font.Bold = 1;
                            selection.TypeText(strCompareTo);

                            if (bold == false)
                            {
                                selection.Font.Bold = 0;
                            }
                            selection.TypeText(str.Substring(posInt1, str.Length - posInt1));
                            selection.TypeParagraph();
                        }
                        else
                        {
                            if (bold == false)
                            {
                                selection.Font.Bold = 0;
                            }
                            selection.TypeText(str);
                            selection.TypeParagraph();
                        }
                    }
                    else
                    {
                        if (bold == false)
                        {
                            selection.Font.Bold = 0;
                        }
                        selection.TypeText(str);
                        selection.TypeParagraph();
                    }

                }
            }
            catch (Exception ex)
            {
                return "插入文本出现异常，插入失败";
            }
            return null;
        }


        public String SaveAndClose()
        {
            String result = null;
            if (myWordDoc != null)
            {
                try
                {
                    myWordDoc.SaveAs(ref wordPath, ref Nothing, ref Nothing,
                        ref Nothing, ref Nothing, ref Nothing, ref Nothing,
                        ref Nothing, ref Nothing, ref Nothing, ref Nothing,
                        ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing);
                    myWordDoc.Close(ref Nothing, ref Nothing, ref Nothing);
                }
                catch (Exception ex)
                {
                    result = "保存文件出现异常，文件保存失败";
                }
            }
            //关闭WordApp组件对象
            if (myWordApp != null)
            {
                try
                {
                    myWordApp.Quit(ref Nothing, ref Nothing, ref Nothing);
                }
                catch (Exception ex)
                {
                    result = "myWordApp出现异常，文件保存失败";
                }
            }
            return result;
        }

        public String SaveWithoutClose()
        {
            String result = null;
            if (myWordDoc != null)
            {
                try
                {
                    myWordDoc.SaveAs(ref wordPath, ref Nothing, ref Nothing,
                        ref Nothing, ref Nothing, ref Nothing, ref Nothing,
                        ref Nothing, ref Nothing, ref Nothing, ref Nothing,
                        ref Nothing, ref Nothing, ref Nothing, ref Nothing, ref Nothing);
                }
                catch (Exception ex)
                {
                    result = "保存文件出现异常，文件保存失败";
                }
            }
            return result;
        }

        public String CloseWithoutSave()
        {
            String result = null;
            //if (myWordDoc != null)
            //{
            //    try
            //    {
            //        myWordDoc.Close(ref Nothing, ref Nothing, ref Nothing);
            //    }
            //    catch (Exception ex)
            //    {
            //        result = "保存文件出现异常，文件保存失败";
            //    }
            //}
            //关闭WordApp组件对象
            if (myWordApp != null)
            {
                try
                {
                    object saveOption = Microsoft.Office.Interop.Word.WdSaveOptions.wdDoNotSaveChanges;
                    myWordApp.Quit(ref saveOption, ref Nothing, ref Nothing);
                }
                catch (Exception ex)
                {
                    result = "myWordApp出现异常，文件保存失败";
                }
            }
            return result;
        }
        private String Close()
        {
            if (myWordDoc != null)
            {
                try
                {
                    myWordDoc.Close(ref Nothing, ref Nothing, ref Nothing);
                }
                catch (Exception ex)
                {
                }
            }
            if (myWordApp != null)
            {
                try
                {
                    myWordApp.Quit(ref Nothing, ref Nothing, ref Nothing);
                }
                catch (Exception ex)
                {
                }
            }
            return null;
        }
        public void ExportTable(String[,] content, String font, float size)
        {
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(myWordApp.Selection.Range, 70, 4, ref Nothing, ref Nothing);
            //设置表格样式

            // newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleThickThinLargeGap;
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Columns[1].Width = 100f;
            newTable.Columns[2].Width = 190f;
            newTable.Columns[3].Width = 120f;
            newTable.Columns[4].Width = 80f;
            //selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            //myWordApp.Selection.Cells.VerticalAlignment = Microsoft.Office.Interop.Word.WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            //myWordApp.Selection.ParagraphFormat.Alignment = Microsoft.Office.Interop.Word.WdParagraphAlignment.wdAlignParagraphCenter;//水平居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            //准备表格结构
            CombineCell.Add(1, 1);
            CombineCell.Add(2, 3);
            CombineCell.Add(5, 8);
            CombineCell.Add(13, 14);
            CombineCell.Add(27, 19);
            CombineCell.Add(46, 13);
            CombineCell.Add(59, 2);
            CombineCell.Add(61, 4);
            CombineCell.Add(65, 6);
            //填充表格内容
            for (int i = 1; i <= 70; i++)
                for (int j = 1; j <= 4; j++)
                {
                    if (j == 1)
                    {
                        foreach (var tmp in this.CombineCell)
                        {
                            if (i == tmp.Key)
                                newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                            //myWordApp.Selection.Cells.VerticalAlignment = Microsoft.Office.Interop.Word.WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
                            //myWordApp.Selection.ParagraphFormat.Alignment = Microsoft.Office.Interop.Word.WdParagraphAlignment.wdAlignParagraphCenter;//水平居中
                        }
                    }
                    else
                    {
                        newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    }

                }
            newTable.AllowPageBreaks = true; //允许跨页换行

            #region 合并单元格
            foreach (var tmp in this.CombineCell)
            {

                if (tmp.Key == 1)
                    continue;
                int beginRow = tmp.Key;
                int endRow = tmp.Value + tmp.Key - 1;
                newTable.Cell(beginRow, 1).Merge(newTable.Cell(endRow, 1));
            }
            #endregion

            newTable.Cell(1, 1).Range.Shading.ForegroundPatternColor = WdColor.wdColorGray40;
            newTable.Cell(1, 2).Range.Shading.ForegroundPatternColor = WdColor.wdColorGray40;
            newTable.Cell(1, 3).Range.Shading.ForegroundPatternColor = WdColor.wdColorGray40;
            newTable.Cell(1, 4).Range.Shading.ForegroundPatternColor = WdColor.wdColorGray40;



            //}
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;//水平居中

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();


            //newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体
            //合并单元格
            //newTable.Cell(1, 2).Merge(newTable.Cell(1, 3));


        }

        /// <summary>
        /// 全国表格输出
        /// </summary>
        /// <param name="content">表格内容</param>
        /// <param name="rowNum">行数</param>
        /// <param name="colNum">列数</param>
        /// <param name="font">字体</param>
        /// <param name="size">字体大小</param>
        public void ExportTableCountry(String[,] content, int rowNum, int colNum, String font, float size)
        {
            //创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(myWordApp.Selection.Range, rowNum, colNum, ref Nothing, ref Nothing);

            // 此处未能实现列数适配，每列宽度不一样
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Columns[1].Width = 120f;
            newTable.Columns[2].Width = 70f;
            newTable.Columns[3].Width = 70f;
            newTable.Columns[4].Width = 80f;
            newTable.Columns[5].Width = 80f;
            newTable.Columns[6].Width = 100f;

            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            //填充表格内容
            for (int i = 1; i <= rowNum; i++)
                for (int j = 1; j <= colNum; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];

                }

            //允许跨页换行
            newTable.AllowPageBreaks = true;

            //设置表头颜色
            for (int j = 1; j <= colNum; j++)
            {
                newTable.Cell(1, j).Range.Shading.ForegroundPatternColor = WdColor.wdColorGray40;

            }

            //设置表格样式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;//水平居中

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 附录表输出 第一季度用
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportappendixTable(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 65f;
            newTable.Columns[2].Width = 60f;
            newTable.Columns[3].Width = 230;
            newTable.Columns[4].Width = 115f;
            newTable.Columns[5].Width = 80f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;//水平居左
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (i == 1 || i == 2)
                        newTable.Cell(i, j).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;//居中
                    if (j == 1 || j == 2)
                        newTable.Cell(i, j).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;//居中
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                }
            newTable.AllowPageBreaks = true; //允许跨页换行


            #region 合并单元格
            newTable.Cell(1, 1).Merge(newTable.Cell(1, 5));
            //第一列合并
            int rowcount = 3; // 前两行为表头
            for (int i = 3; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != "\r\a")
                {
                    if (i != 3)
                    {
                        if (i - 1 != rowcount)
                            newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                    }

                    rowcount = i;
                }
            }
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));


            //第二列合并
            int rowcount2 = 3;// 前两行为表头
            for (int i = 3; i <= rownum; i++)
            {
                if (newTable.Cell(i, 2).Range.Text != "\r\a")
                {
                    if (i != 3)
                    {
                        if (i - 1 != rowcount2)
                            newTable.Cell(rowcount2, 2).Merge(newTable.Cell(i - 1, 2));
                    }
                    rowcount2 = i;
                }
            }
            if (rowcount2 != rownum)
                newTable.Cell(rowcount2, 2).Merge(newTable.Cell(rownum, 2));
            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 1).Range.Font.Size = 14;//设置单元格中字体大小为16


            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 附录表输出 第二季度用
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportappendixTable2(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col - 1, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 40f;
            newTable.Columns[2].Width = 130f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 43f;
            newTable.Columns[5].Width = 43f;
            newTable.Columns[6].Width = 43f;
            newTable.Columns[7].Width = 43f;
            newTable.Columns[8].Width = 43f;
            newTable.Columns[9].Width = 35f;
            newTable.Columns[10].Width = 30f;
            if (col == 13)
            {
                newTable.Columns[11].Width = 30f;
                newTable.Columns[12].Width = 40f;
            }
            else
            {
                newTable.Columns[11].Width = 40f;
            }
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (j == col)
                    {
                        if (i >= 3 && content[i - 1, j - 2] != "")
                        {
                            if (content[i - 1, j - 1].ToString() != string.Empty)
                            {
                                if (Convert.ToInt32(content[i - 1, j - 1]) >= 5)
                                {
                                    newTable.Cell(i, j - 1).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray10;
                                    newTable.Cell(i, j - 1).Range.Bold = 2;
                                }
                            }
                        }
                    }
                    else
                    {
                        newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列合并
            int rowcount = 3; // 前两行为表头
            string str_value = newTable.Cell(3, 1).Range.Text;
            for (int i = 3; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != str_value)
                {

                    if (i - 1 != rowcount)
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }
            }
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));

            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(2, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(2, 3));
            newTable.Cell(1, 4).Merge(newTable.Cell(1, 9));
            if (col == 13)
                newTable.Cell(1, 5).Merge(newTable.Cell(1, 7));
            else
                newTable.Cell(1, 5).Merge(newTable.Cell(1, 6));

            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 2).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 3).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 4).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 5).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 4).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 5).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 6).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 7).Range.Bold = 2;//设置单元格中字体为粗体    
            newTable.Cell(2, 8).Range.Bold = 2;//设置单元格中字体为粗体 
            newTable.Cell(2, 9).Range.Bold = 2;//设置单元格中字体为粗体    
            newTable.Cell(2, 10).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 11).Range.Bold = 2;//设置单元格中字体为粗体
            if (col == 13)
                newTable.Cell(2, 12).Range.Bold = 2;//设置单元格中字体为粗体                


            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 双月报指标详细表输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportIndexDetailTable(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col - 1, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 40f;
            newTable.Columns[2].Width = 60f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 43f;
            newTable.Columns[5].Width = 43f;
            newTable.Columns[6].Width = 43f;
            newTable.Columns[7].Width = 43f;
            newTable.Columns[8].Width = 43f;
            newTable.Columns[9].Width = 43f;
            newTable.Columns[10].Width = 43f;
            if (col == 13)
            {
                newTable.Columns[11].Width = 43f;
                newTable.Columns[12].Width = 43f;
            }
            else
            {
                newTable.Columns[11].Width = 43f;
            }
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (j == col)
                    {
                        if (i >= 3 && content[i - 1, j - 2] != "")
                        {
                            if (content[i - 1, j - 1].ToString() != string.Empty)
                            {
                                if (Convert.ToInt32(content[i - 1, j - 1]) >= 5)
                                {
                                    newTable.Cell(i, j - 1).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray10;
                                    newTable.Cell(i, j - 1).Range.Bold = 2;
                                }
                            }
                        }
                    }
                    else
                    {
                        newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列（轮子名称）、第二列（维度名称）合并
            int rowcount1 = 3, rowcount2 = 3; // 前两行为表头
            string str_value1 = newTable.Cell(3, 1).Range.Text;
            string str_value2 = newTable.Cell(3, 2).Range.Text;
            for (int i = 3; i <= rownum; i++)
            {
                //第一列
                if (newTable.Cell(i, 1).Range.Text != str_value1)
                {

                    if (i - 1 != rowcount1)
                        newTable.Cell(rowcount1, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount1 = i;
                    str_value1 = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount1 != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }
                //第二列
                if (newTable.Cell(i, 2).Range.Text != str_value2)
                {

                    if (i - 1 != rowcount2)
                        newTable.Cell(rowcount2, 2).Merge(newTable.Cell(i - 1, 2));

                    rowcount2 = i;
                    str_value2 = newTable.Cell(i, 2).Range.Text;
                    newTable.Cell(i, 2).Range.Text = newTable.Cell(i, 2).Range.Text.Split('-')[2];//特殊处理NEI体系维度名称去掉前缀的需求

                }
                else
                {
                    if (rowcount2 != i)
                        newTable.Cell(i, 2).Range.Text = "";
                    else
                        newTable.Cell(i, 2).Range.Text = newTable.Cell(i, 2).Range.Text.Split('-')[2];//特殊处理NEI体系维度名称去掉前缀的需求
                }
            }
            //处理最后一行
            if (rowcount1 != rownum)
                newTable.Cell(rowcount1, 1).Merge(newTable.Cell(rownum, 1));
            if (rowcount2 != rownum)
                newTable.Cell(rowcount2, 2).Merge(newTable.Cell(rownum, 2));


            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(2, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(2, 3));
            newTable.Cell(1, 4).Merge(newTable.Cell(1, 9));
            if (col == 13)
                newTable.Cell(1, 5).Merge(newTable.Cell(1, 7));
            else
                newTable.Cell(1, 5).Merge(newTable.Cell(1, 6));

            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 2).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 3).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 4).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 5).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 4).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 5).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 6).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 7).Range.Bold = 2;//设置单元格中字体为粗体    
            newTable.Cell(2, 8).Range.Bold = 2;//设置单元格中字体为粗体 
            newTable.Cell(2, 9).Range.Bold = 2;//设置单元格中字体为粗体    
            newTable.Cell(2, 10).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(2, 11).Range.Bold = 2;//设置单元格中字体为粗体
            if (col == 13)
                newTable.Cell(2, 12).Range.Bold = 2;//设置单元格中字体为粗体                


            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 双月报指标详细表输出 --无上期和变化
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportIndexDetailTable1(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 60f;
            newTable.Columns[2].Width = 60f;
            newTable.Columns[3].Width = 150f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Columns[6].Width = 50f;
            newTable.Columns[7].Width = 50f;
            newTable.Columns[8].Width = 60f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i <= 2)
                    {
                        newTable.Cell(1, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(218, 238, 243));
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列（轮子名称）、第二列（维度名称）合并
            int rowcount1 = 3, rowcount2 = 3; // 前两行为表头
            string str_value1 = newTable.Cell(3, 1).Range.Text;
            string str_value2 = newTable.Cell(3, 2).Range.Text;
            for (int i = 3; i <= rownum; i++)
            {
                //第一列
                if (newTable.Cell(i, 1).Range.Text != str_value1)
                {

                    if (i - 1 != rowcount1)
                        newTable.Cell(rowcount1, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount1 = i;
                    str_value1 = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount1 != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }
                //第二列
                if (newTable.Cell(i, 2).Range.Text != str_value2)
                {

                    if (i - 1 != rowcount2)
                        newTable.Cell(rowcount2, 2).Merge(newTable.Cell(i - 1, 2));

                    rowcount2 = i;
                    str_value2 = newTable.Cell(i, 2).Range.Text;
                    newTable.Cell(i, 2).Range.Text = newTable.Cell(i, 2).Range.Text.Split('-')[2];//特殊处理NEI体系维度名称去掉前缀的需求

                }
                else
                {
                    if (rowcount2 != i)
                        newTable.Cell(i, 2).Range.Text = "";
                    else
                        newTable.Cell(i, 2).Range.Text = newTable.Cell(i, 2).Range.Text.Split('-')[2];//特殊处理NEI体系维度名称去掉前缀的需求
                }
            }
            //处理最后一行
            if (rowcount1 != rownum)
                newTable.Cell(rowcount1, 1).Merge(newTable.Cell(rownum, 1));
            if (rowcount2 != rownum)
                newTable.Cell(rowcount2, 2).Merge(newTable.Cell(rownum, 2));


            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(2, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(2, 3));
            newTable.Cell(1, 4).Merge(newTable.Cell(1, 7));
            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 3月季报指标详细表输出 --带上期和变化
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportIndexDetailTable2(String[,] content, String font, float size, int rownum, int col)
        {
            myWordDoc.SpellingChecked = false;//再次关闭拼写检查
            myWordDoc.ShowSpellingErrors = false;
            myWordApp.Options.CheckGrammarWithSpelling = false;
            myWordApp.Options.SuggestSpellingCorrections = false;
            myWordApp.Options.CheckSpellingAsYouType = false;
            myWordApp.Options.CheckGrammarAsYouType = false;

            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 40f;
            newTable.Columns[2].Width = 60f;
            newTable.Columns[3].Width = 150f;
            newTable.Columns[4].Width = 40f;
            newTable.Columns[5].Width = 40f;
            newTable.Columns[6].Width = 40f;
            newTable.Columns[7].Width = 40f;
            newTable.Columns[8].Width = 40f;
            newTable.Columns[9].Width = 40f;
            newTable.Columns[10].Width = 40f;
            newTable.Columns[11].Width = 40f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i <= 2)
                    {
                        newTable.Cell(1, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(218, 238, 243));
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列（轮子名称）、第二列（维度名称）合并
            int rowcount1 = 3, rowcount2 = 3; // 前两行为表头
            string str_value1 = newTable.Cell(3, 1).Range.Text;
            string str_value2 = newTable.Cell(3, 2).Range.Text;
            for (int i = 3; i <= rownum; i++)
            {
                //第一列
                if (newTable.Cell(i, 1).Range.Text != str_value1)
                {

                    if (i - 1 != rowcount1)
                        newTable.Cell(rowcount1, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount1 = i;
                    str_value1 = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount1 != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }
                //第二列
                if (newTable.Cell(i, 2).Range.Text != str_value2)
                {

                    if (i - 1 != rowcount2)
                        newTable.Cell(rowcount2, 2).Merge(newTable.Cell(i - 1, 2));

                    rowcount2 = i;
                    str_value2 = newTable.Cell(i, 2).Range.Text;
                    newTable.Cell(i, 2).Range.Text = newTable.Cell(i, 2).Range.Text.Split('-')[2];//特殊处理NEI体系维度名称去掉前缀的需求

                }
                else
                {
                    if (rowcount2 != i)
                        newTable.Cell(i, 2).Range.Text = "";
                    else
                        newTable.Cell(i, 2).Range.Text = newTable.Cell(i, 2).Range.Text.Split('-')[2];//特殊处理NEI体系维度名称去掉前缀的需求
                }
            }
            //处理最后一行
            if (rowcount1 != rownum)
                newTable.Cell(rowcount1, 1).Merge(newTable.Cell(rownum, 1));
            if (rowcount2 != rownum)
                newTable.Cell(rowcount2, 2).Merge(newTable.Cell(rownum, 2));


            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(2, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(2, 3));
            newTable.Cell(1, 4).Merge(newTable.Cell(1, 9));
            newTable.Cell(1, 5).Merge(newTable.Cell(1, 6));
            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }


        /// <summary>
        /// 附录表(全国)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportappendixTable3(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 40f;
            newTable.Columns[2].Width = 130f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Columns[6].Width = 50f;
            newTable.Columns[7].Width = 50f;
            newTable.Columns[8].Width = 50f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列合并
            int rowcount = 2; // 前两行为表头
            string str_value = newTable.Cell(3, 1).Range.Text;
            for (int i = 2; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != str_value)
                {
                    if (i - 1 != rowcount)
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }

            }
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));


            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 2).Range.Bold = 2;
            newTable.Cell(1, 3).Range.Bold = 2;
            newTable.Cell(1, 4).Range.Bold = 2;
            newTable.Cell(1, 5).Range.Bold = 2;
            newTable.Cell(1, 6).Range.Bold = 2;
            newTable.Cell(1, 7).Range.Bold = 2;
            newTable.Cell(1, 8).Range.Bold = 2;

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 总体评估结果表(全国第一部分)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportCountryPartOneTable1(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 100f;
            newTable.Columns[2].Width = 100f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Columns[6].Width = 50f;
            newTable.Columns[7].Width = 50f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(0, 112, 192));
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Font.Color = WdColor.wdColorWhite;
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineStyle = WdLineStyle.wdLineStyleSingle;
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineWidth = WdLineWidth.wdLineWidth150pt;
                    }
                    else
                    {
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleDashLargeGap;//wdLineStyleDashLargeGap;
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth075pt;//wdLineWidth150pt;
                    }
                    if (i > 1 && j == 5 && content[i - 1, j - 1] != "" && Convert.ToDouble(content[i - 1, j - 1]) - 90 < 0)
                    {
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                        newTable.Cell(i, j).Range.Font.Shading.BackgroundPatternColor = WdColor.wdColorYellow;
                    }
                    if (i > 1 && j > 2)
                    {
                        newTable.Cell(i, j).Range.Bold = 2;
                    }
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderLeft].LineStyle = WdLineStyle.wdLineStyleDashSmallGap;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderRight].LineStyle = WdLineStyle.wdLineStyleDashSmallGap;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderLeft].Color = GetColor(this.standardblue);
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderRight].Color = GetColor(this.standardblue);

                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            #region 合并单元格

            //第一列合并
            int rowcount = 2; // 第一行为表头
            string str_value = newTable.Cell(2, 1).Range.Text;
            for (int i = 2; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != str_value)
                {
                    if (i - 1 != rowcount)
                    {
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                        newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                        newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;

                        for (int k = 2; k <= col; k++)
                        {
                            newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                            newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                        }
                    }
                    else
                    {
                        for (int k = 1; k <= col; k++)
                        {
                            newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                            newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                        }
                    }

                    rowcount = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }
            }
            if (rowcount != rownum)
            {
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));
                newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                for (int k = 2; k <= col; k++)
                {
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                }
            }
            else
            {
                for (int k = 1; k <= col; k++)
                {
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                }
            }

            //合并最后一行
            newTable.Cell(rownum, 2).Range.Text = "";
            newTable.Cell(rownum, 1).Merge(newTable.Cell(rownum, 2));

            newTable.Cell(rownum, 1).Range.Bold = 2;
            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 全网指标变化及达标情况一览表(全国第一部分)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportCountryPartOneTable2(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，13列总570f
            newTable.Columns[1].Width = 40f;
            newTable.Columns[2].Width = 130f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 90f;
            newTable.Columns[6].Width = 50f;
            newTable.Columns[7].Width = 50f;
            newTable.Columns[8].Width = 50f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (j == 6)
                    {
                        if (i >= 3 && content[i - 1, j - 2] != "" && content[i - 1, j - 2].Contains("劣化"))
                        {
                            newTable.Cell(i, j - 1).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, j - 1).Range.Bold = 2;
                        }
                    }
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 2)
                    {
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(221, 217, 195));
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列维度合并
            int rowcount = 3; // 前两行为表头
            string str_value = newTable.Cell(3, 1).Range.Text;
            for (int i = 3; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != str_value)
                {

                    if (i - 1 != rowcount)
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }
            }
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));

            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(1, 8));
            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 各省未达到基准值指标个数情况简表(全国第一部分)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportCountryPartOneTable3(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，13列总570f
            newTable.Columns[1].Width = 220f;
            newTable.Columns[2].Width = 220f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            //newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {
                        newTable.Cell(1, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(196, 188, 150));
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 各省质量排名表(全国第一部分)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportCountryPartOneTable4(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，13列总570f
            newTable.Columns[1].Width = 120f;
            newTable.Columns[2].Width = 80f;
            newTable.Columns[3].Width = 80f;
            newTable.Columns[4].Width = 120f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            //newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {
                        newTable.Cell(1, j).Range.Bold = 2;
                        //newTable.Cell(1, j).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray20;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(196, 188, 150));
                    }
                    if (i <= 6 || (i >= rownum - 4))
                    {
                        newTable.Cell(i, 1).Range.Bold = 2;
                    }
                    if (i > 1 && j == 4 && content[i - 1, j - 1].Contains("-"))
                    {
                        newTable.Cell(i, j).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                        newTable.Cell(i, j).Range.Bold = 2;
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 质量短板表(全国第一部分)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportCountryPartOneTable5(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，13列总570f
            newTable.Columns[1].Width = 45f;
            newTable.Columns[2].Width = 40f;
            newTable.Columns[3].Width = 240f;
            newTable.Columns[4].Width = 60f;
            newTable.Columns[5].Width = 110f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1 || i == 2)
                    {
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(198, 217, 241));
                    }
                    else if (j == 3 || j == 5)
                    {
                        newTable.Cell(i, j).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;//居左
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            //第一列合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            //第一行合并
            newTable.Cell(1, 2).Merge(newTable.Cell(1, 5));

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 质量劣化表(全国第一部分)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportCountryPartOneTable6(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，13列总570f
            newTable.Columns[1].Width = 60f;
            newTable.Columns[2].Width = 130f;
            newTable.Columns[3].Width = 280f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1 || i == 2)
                    {
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(198, 217, 241));
                    }
                    else if (j == 3)
                    {
                        newTable.Cell(i, j).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;//居左
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            //第一列合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            //第一行合并
            newTable.Cell(1, 2).Merge(newTable.Cell(1, 3));

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 指标背离表(全国第一部分)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportCountryPartOneTable7(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，13列总570f
            newTable.Columns[1].Width = 60f;
            newTable.Columns[2].Width = 420f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(198, 217, 241));
                        newTable.Cell(i, j).Height = 30f;
                    }
                    if (i != 1 && j == 2)//字体水平居左
                    {
                        newTable.Cell(i, j).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;//居左
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 未达基准值表(全国人工汇总)输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportCountryPartOneTable8(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，13列总570f
            newTable.Columns[1].Width = 70f;
            newTable.Columns[2].Width = 70f;
            newTable.Columns[3].Width = 400f;

            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(198, 217, 241));
                    }
                    else if (j == 3)
                    {
                        newTable.Cell(i, j).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;//居左
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 第二季 各省维度排名表输出
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum">表格行数</param>
        /// <param name="col">表格列数</param>
        public void ExportDimisionTable(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col - 1, ref Nothing, ref Nothing);

            // 设置表格属性
            // newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 70f;
            newTable.Columns[2].Width = 110f;
            newTable.Columns[3].Width = 80f;
            if (col == 6)
            {
                newTable.Columns[4].Width = 60f;
                newTable.Columns[5].Width = 90f;
            }
            else
            {
                newTable.Columns[4].Width = 90f;
            }
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (j == col)
                    {
                        if (i >= 3 && content[i - 1, j - 2] != "")
                        {
                            if (content[i - 1, j - 1].ToString() != "")
                            {
                                if (Convert.ToInt32(content[i - 1, j - 1]) >= 5)
                                {
                                    newTable.Cell(i, j - 1).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray10;
                                    newTable.Cell(i, j - 1).Range.Bold = 2;
                                }
                            }
                        }
                    }
                    else
                    {
                        newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleDashLargeGap;
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            for (int i = 1; i <= 2; i++)
            {
                for (int j = 1; j <= col - 1; j++)
                {
                    newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(this.standardblue);
                    newTable.Cell(i, j).Range.Bold = 2;
                    newTable.Cell(i, j).Range.Font.Color = WdColor.wdColorWhite;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineWidth = WdLineWidth.wdLineWidth150pt;
                }
            }

            #region 合并单元格

            //第一列合并
            int rowcount = 3; // 前两行为表头
            string str_value = newTable.Cell(3, 1).Range.Text;
            for (int i = 3; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != str_value)
                {

                    if (i - 1 != rowcount)
                    {
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                        newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                        newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;

                        for (int k = 2; k <= col - 1; k++)
                        {
                            newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                            newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                        }
                    }
                    else
                    {
                        for (int k = 1; k <= col - 1; k++)
                        {
                            newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                            newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                        }
                    }
                    rowcount = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }
            }
            if (rowcount != rownum)
            {
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));
                newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                for (int k = 2; k <= col - 1; k++)
                {
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                }
            }
            else
            {
                for (int k = 1; k <= col - 1; k++)
                {
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                }
            }

            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(2, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(1, col - 1));

            #endregion

            // 最后一行 前两格
            newTable.Cell(rownum, 1).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(rownum, 2).Range.Bold = 2;//设置单元格中字体为粗体


            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        /// <summary>
        /// 双月报第一期 各省某业务的维度排名表输出
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum">表格行数</param>
        /// <param name="col">表格列数</param>
        public void ExportBusiDimisionTable(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col - 1, ref Nothing, ref Nothing);

            // 设置表格属性
            // newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 70f;
            newTable.Columns[2].Width = 110f;
            newTable.Columns[3].Width = 80f;
            if (col == 6)
            {
                newTable.Columns[4].Width = 60f;
                newTable.Columns[5].Width = 90f;
            }
            else
            {
                newTable.Columns[4].Width = 90f;
            }
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (j == col)
                    {
                        if (i >= 3 && content[i - 1, j - 2] != "")
                        {
                            if (content[i - 1, j - 1].ToString() != "")
                            {
                                if (Convert.ToInt32(content[i - 1, j - 1]) >= 5)
                                {
                                    newTable.Cell(i, j - 1).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray10;
                                    newTable.Cell(i, j - 1).Range.Bold = 2;
                                }
                            }
                        }
                    }
                    else
                    {
                        newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleDashLargeGap;
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            for (int i = 1; i <= 3; i++)
            {
                for (int j = 1; j <= col - 1; j++)
                {
                    if (i < 3)
                    {
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(this.standardblue);
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Font.Color = WdColor.wdColorWhite;
                    }
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineWidth = WdLineWidth.wdLineWidth150pt;
                }
            }

            #region 合并单元格
            //第一列合并
            int rowcount = 3; // 前两行为表头
            for (int k = 1; k <= col - 1; k++)
            {
                newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
            }
            newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));

            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(2, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(1, col - 1));

            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 双月报第一期 各省某业务的维度排名表输出
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum">表格行数</param>
        /// <param name="col">表格列数</param>
        /// /// <param name="isProvinceData">数据来源</param>
        /// <param name="type">相对绝对排名</param>
        public void ExportBusiDimisionTable1(String[,] content, String font, float size, int rownum, int col, bool isProvinceData, int type)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col - 1, ref Nothing, ref Nothing);

            // 设置表格属性
            // newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 70f;
            newTable.Columns[2].Width = 110f;
            newTable.Columns[3].Width = 80f;
            newTable.Columns[4].Width = 90f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            int rankCol = isProvinceData ? 4 : 3;//根据集团报， 省报+集团来源来确定哪一列有排名数值

            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (j == col)//最后一列
                    {
                        if (i >= 3 && content[i - 1, rankCol - 1] != "" && content[i - 1, rankCol - 1] != "-" && content[i - 1, j - 1].ToString() != "" && Convert.ToInt32(content[i - 1, j - 1]) >= 20)
                        {
                            newTable.Cell(i, rankCol).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, rankCol).Range.Font.Bold = 1;
                            newTable.Cell(i, rankCol).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                        }
                        //else if (type == 2 && i >= 3 && content[i - 1, rankCol - 1] != "" && content[i - 1, rankCol - 1] != "-" && Convert.ToInt32(content[i - 1, rankCol - 1]) >= 20)
                        //{
                        //    newTable.Cell(i, rankCol).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                        //    newTable.Cell(i, rankCol).Range.Font.Bold = 1;
                        //    newTable.Cell(i, rankCol).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                        //}
                    }
                    else
                    {
                        newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleDashLargeGap;
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            for (int i = 1; i <= 3; i++)
            {
                for (int j = 1; j <= col - 1; j++)
                {
                    if (i < 3)
                    {
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(this.standardblue);
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Font.Color = WdColor.wdColorWhite;
                    }
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineWidth = WdLineWidth.wdLineWidth150pt;
                }
            }

            #region 合并单元格
            //第一列合并
            int rowcount = 3; // 前两行为表头
            for (int k = 1; k <= col - 1; k++)
            {
                newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
            }
            newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));

            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(2, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(1, col - 1));

            //if(type == 2)//绝对排名
            //{
            //    //排名>=20的单元格标红标黄
            //    for (int i = rowcount; i <= rownum; i++)
            //    {
            //        string cell = newTable.Cell(i, rankCol).Range.Text.Replace("\r\a", "");
            //        if (cell != "" && cell != "-" && Convert.ToInt32(cell) >= 20)
            //        {
            //            newTable.Cell(i, rankCol).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
            //            newTable.Cell(i, rankCol).Range.Font.Bold = 1;
            //            newTable.Cell(i, rankCol).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
            //        }
            //    }
            //}
            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 3月季报，包含上期、变化列 各省某业务的维度排名表输出
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum">表格行数</param>
        /// <param name="col">表格列数</param>
        /// /// <param name="isProvinceData">数据来源</param>
        /// <param name="type">相对绝对排名</param>
        public void ExportBusiDimisionTable2(String[,] content, String font, float size, int rownum, int col, bool isProvinceData, int type)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col - 2, ref Nothing, ref Nothing);

            // 设置表格属性
            // newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 60f;
            newTable.Columns[2].Width = 80f;
            newTable.Columns[3].Width = 40f;
            newTable.Columns[4].Width = 40f;
            newTable.Columns[5].Width = 40f;
            newTable.Columns[6].Width = 40f;
            newTable.Columns[7].Width = 40f;
            newTable.Columns[8].Width = 40f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[3].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            int rankCol = isProvinceData ? 6 : 3;//根据集团报， 省报+集团来源来确定哪一列有排名数值
            int rankChangeCol = isProvinceData ? 8 : 5;//根据集团报， 省报+集团来源来确定哪一列有排名变化数值
            int dataRowBegin = 4;

            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (j == col - 1)
                    {
                        if (i >= dataRowBegin && content[i - 1, rankCol - 1] != "" && content[i - 1, rankCol - 1] != "-" && content[i - 1, j - 1].ToString() != "" && Convert.ToInt32(content[i - 1, j - 1]) >= 20)
                        {
                            newTable.Cell(i, rankCol).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, rankCol).Range.Font.Bold = 1;
                            newTable.Cell(i, rankCol).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                        }
                    }
                    else if (j == col)//最后两列存储相对需要的本期上期排名
                    {
                        if (i >= dataRowBegin && content[i - 1, rankCol] != "" && content[i - 1, rankCol] != "-" && content[i - 1, j - 1].ToString() != "" && Convert.ToInt32(content[i - 1, j - 1]) >= 20)
                        {
                            newTable.Cell(i, rankCol + 1).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, rankCol + 1).Range.Font.Bold = 1;
                            newTable.Cell(i, rankCol + 1).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                        }
                    }
                    else
                    {
                        newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleDashLargeGap;
                        if (i >= dataRowBegin && j == rankChangeCol && content[i - 1, j - 1] != "" && content[i - 1, j - 1] != "-" && Convert.ToInt32(content[i - 1, j - 1]) < -5) //维度排名劣化超过5
                        {
                            newTable.Cell(i, j).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, j).Range.Font.Bold = 1;
                            newTable.Cell(i, j).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                        }
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            for (int i = 1; i <= dataRowBegin; i++)
            {
                for (int j = 1; j <= col - 2; j++)
                {
                    if (i < dataRowBegin)
                    {
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(this.standardblue);
                        newTable.Cell(i, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Font.Color = WdColor.wdColorWhite;
                    }
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineStyle = WdLineStyle.wdLineStyleSingle;
                    newTable.Cell(i, j).Borders[WdBorderType.wdBorderTop].LineWidth = WdLineWidth.wdLineWidth150pt;
                }
            }

            #region 合并单元格
            //第一列合并
            for (int k = 1; k <= col - 2; k++)
            {
                newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineWidth = WdLineWidth.wdLineWidth150pt;
            }
            newTable.Cell(dataRowBegin, 1).Merge(newTable.Cell(rownum, 1));

            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(3, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(3, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(1, col - 2));
            newTable.Cell(2, 3).Merge(newTable.Cell(2, 5));
            newTable.Cell(2, 4).Merge(newTable.Cell(2, 6));

            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 4月月报，包含上期、变化列 各省某业务的维度排名表输出
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum">表格行数</param>
        /// <param name="col">表格列数</param>
        /// /// <param name="isProvinceData">数据来源</param>
        /// <param name="type">相对绝对排名</param>
        public void ExportBusiDimisionTable3(String[,] content, String font, float size, int rownum, int col, bool isProvinceData, int type, int shortLimt)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col - 2, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 70f;
            newTable.Columns[2].Width = 70f;
            newTable.Columns[3].Width = 70f;
            newTable.Columns[4].Width = 70f;
            newTable.Columns[5].Width = 70f;
            newTable.Columns[6].Width = 70f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[3].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            int rankCol = 5;//根据集团报， 省报+集团来源来确定哪一列有排名数值
            int scoreChangeCol = 4;//
            int dataRowBegin = 4;

            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    if (i < dataRowBegin && j <= col - 2)
                    {
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(221, 217, 195));
                    }
                    if (j == col - 1)//本期绝对排名
                    {
                        if (i >= dataRowBegin && content[i - 1, rankCol - 1] != "" && content[i - 1, rankCol - 1] != "-" && content[i - 1, j - 1].ToString() != "" && Convert.ToInt32(content[i - 1, j - 1]) > shortLimt)
                        {
                            newTable.Cell(i, rankCol).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, rankCol).Range.Bold = 2;
                            newTable.Cell(i, rankCol).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                        }
                    }
                    else if (j == col)//上期绝对排名
                    {
                        if (i >= dataRowBegin && content[i - 1, rankCol] != "" && content[i - 1, rankCol] != "-" && content[i - 1, j - 1].ToString() != "" && Convert.ToInt32(content[i - 1, j - 1]) > shortLimt)
                        {
                            newTable.Cell(i, rankCol + 1).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, rankCol + 1).Range.Bold = 2;
                            newTable.Cell(i, rankCol + 1).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                        }
                    }
                    else
                    {
                        newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];

                        if (j == scoreChangeCol && i >= dataRowBegin && content[i - 1, j - 1] != "" && content[i - 1, j - 1] != "-" && Convert.ToDouble(content[i - 1, j - 1]) < 0)
                        {
                            newTable.Cell(i, scoreChangeCol).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, scoreChangeCol).Range.Bold = 2;
                            newTable.Cell(i, scoreChangeCol).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;

                            newTable.Cell(i, scoreChangeCol - 1).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, scoreChangeCol - 1).Range.Bold = 2;
                            newTable.Cell(i, scoreChangeCol - 1).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;

                            newTable.Cell(i, scoreChangeCol - 2).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                            newTable.Cell(i, scoreChangeCol - 2).Range.Bold = 2;
                            newTable.Cell(i, scoreChangeCol - 2).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                        }
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            #region 合并单元格
            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(3, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(1, col - 2));
            newTable.Cell(2, 2).Merge(newTable.Cell(2, 4));
            newTable.Cell(2, 3).Merge(newTable.Cell(2, 4));

            //加粗
            newTable.Cell(1, 1).Range.Bold = 2;
            newTable.Cell(1, 2).Range.Bold = 2;
            newTable.Cell(2, 2).Range.Bold = 2;
            newTable.Cell(2, 3).Range.Bold = 2;
            newTable.Cell(3, 2).Range.Bold = 2;
            newTable.Cell(3, 3).Range.Bold = 2;
            newTable.Cell(3, 4).Range.Bold = 2;
            newTable.Cell(3, 5).Range.Bold = 2;
            newTable.Cell(3, 6).Range.Bold = 2;
            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }


        private void gotoAbsolutLine(int lineNum)
        {
            object dummy = System.Reflection.Missing.Value;

            object what = Microsoft.Office.Interop.Word.WdGoToItem.wdGoToLine;

            object which = Microsoft.Office.Interop.Word.WdGoToDirection.wdGoToFirst;

            object count = lineNum;

            selection.GoTo(ref what, ref which, ref count, ref dummy);

        }
        public void AddContent()
        {
            gotoAbsolutLine(1);//光标定位到第一行
            int pageNum = Int32.Parse(selection.get_Information(Microsoft.Office.Interop.Word.WdInformation.wdActiveEndAdjustedPageNumber).ToString());
            int lineNum = 1;
            while (pageNum < 2)
            {
                lineNum++;
                gotoAbsolutLine(lineNum);//光标定位到第一行
                pageNum = Int32.Parse(selection.get_Information(Microsoft.Office.Interop.Word.WdInformation.wdActiveEndAdjustedPageNumber).ToString());
            }

            this.ExportTxt("目    录", WdColor.wdColorAutomatic, "宋体", false, false, true, false, 14, true);
            Object oMissing = System.Reflection.Missing.Value;
            Object oTrue = true;
            Object oFalse = false;
            Object oUpperHeadingLevel = "1";
            Object oLowerHeadingLevel = "2";
            Object oTOCTableID = "TableOfContents";

            //myWordApp.Selection.Start = 0;
            //myWordApp.Selection.End = 0;//将光标移动到文档开始位置  
            object beginLevel = 2;//目录开始深度  
            object endLevel = 2;//目录结束深度  
            object rightAlignPageNumber = true;// 指定页码右对其  

            /* 
             * Range 
             * UserHeadingStyles 使用heading风格 
             * UpperHeadingLevel 增加heading级别 
             * LowerHeadingLevel 减小heading级别 
             * UserFields 使用fields 
             * Tableid tableid 
             * RightAlignPageNumbers 右对齐页数 
             * IncludePageNumbers 包含页数 
             * Addedstyles 添加风格 
             * UserHyperlinks 使用超链接 
             * HidePageNumbersInweb 隐藏页数 
             * UseOutLineLevels 使用提纲级别 
             * TableOfContents 内容表 
             */
            myWordApp.Application.ActiveDocument.TablesOfContents.Add(myWordApp.Selection.Range, ref oTrue, ref oUpperHeadingLevel,
                ref oLowerHeadingLevel, ref oMissing, ref oTOCTableID, ref oTrue,
                ref oTrue, ref oMissing, ref oTrue, ref oTrue, ref oTrue);//添加目录  
            this.myWordDoc.TablesOfContents.Format = WdTocFormat.wdTOCSimple;
            this.myWordDoc.TablesOfContents[1].Update();
            this.myWordDoc.TablesOfContents[1].Range.Font.Size = 14;
            this.myWordDoc.TablesOfContents[1].Range.Font.Name = "宋体"; //字体
            this.myWordDoc.TablesOfContents[1].Range.Font.Italic = 0;//非斜体
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.SpaceBefore = 0; //段前
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.SpaceAfter = 0; //段后间距
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft; //段后间距
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距 
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.LeftIndent = myWordApp.CentimetersToPoints(float.Parse("0"));//左缩进
        }
        /// <summary>
        /// 在报告第一部分后生成目录
        /// </summary>
        /// <param name="font"></param>
        public void AddAllContent(string font)
        {
            string pagenum = selection.get_Information(Microsoft.Office.Interop.Word.WdInformation.wdActiveEndAdjustedPageNumber).ToString();
            this.GoToPage(Int32.Parse(pagenum));
            //断掉页码
            this.selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            this.selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            this.selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].LinkToPrevious = false;
            this.selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].LinkToPrevious = false;
            this.selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterEvenPages].LinkToPrevious = false;
            this.selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterEvenPages].LinkToPrevious = false;
            //删除页码
            //this.myWordDoc.ActiveWindow.ActivePane.View.SeekView = WdSeekView.wdSeekPrimaryHeader;// 指向除首页页眉
            //this.myWordApp.Selection.HeaderFooter.Range.Delete(System.Reflection.Missing.Value, System.Reflection.Missing.Value);//清空之前的页眉
            //this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].Range.Text = string.Empty;
            //object center = WdPageNumberAlignment.wdAlignPageNumberCenter;//将号码设置在中间
            //object first = false;
            this.myWordApp.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].Range.Delete(System.Reflection.Missing.Value, System.Reflection.Missing.Value);
            this.myWordApp.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].Range.Delete(System.Reflection.Missing.Value, System.Reflection.Missing.Value);
            this.myWordApp.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterEvenPages].Range.Delete(System.Reflection.Missing.Value, System.Reflection.Missing.Value);
            //目录输出
            this.ExportTxt("目    录", WdColor.wdColorAutomatic, font, false, false, true, false, 12, true);
            Object oMissing = System.Reflection.Missing.Value;
            Object oTrue = true;
            Object oFalse = false;
            Object oUpperHeadingLevel = "1";
            Object oLowerHeadingLevel = "4";
            Object oTOCTableID = "TableOfContents";

            //myWordApp.Selection.Start = 0;
            //myWordApp.Selection.End = 0;//将光标移动到文档开始位置  
            object beginLevel = 2;//目录开始深度  
            object endLevel = 2;//目录结束深度  
            object rightAlignPageNumber = true;// 指定页码右对其  

            /* 
             * Range 
             * UserHeadingStyles 使用heading风格 
             * UpperHeadingLevel 增加heading级别 
             * LowerHeadingLevel 减小heading级别 
             * UserFields 使用fields 
             * Tableid tableid 
             * RightAlignPageNumbers 右对齐页数 
             * IncludePageNumbers 包含页数 
             * Addedstyles 添加风格 
             * UserHyperlinks 使用超链接 
             * HidePageNumbersInweb 隐藏页数 
             * UseOutLineLevels 使用提纲级别 
             * TableOfContents 内容表 
             */
            myWordApp.Application.ActiveDocument.TablesOfContents.Add(myWordApp.Selection.Range, ref oTrue, ref oUpperHeadingLevel,
                ref oLowerHeadingLevel, ref oMissing, ref oTOCTableID, ref oTrue,
                ref oTrue, ref oMissing, ref oTrue, ref oTrue, ref oTrue);//添加目录  
            this.myWordDoc.TablesOfContents.Format = WdTocFormat.wdTOCSimple;
            this.myWordDoc.TablesOfContents[1].Update();
            this.myWordDoc.TablesOfContents[1].Range.Font.Size = 11;
            this.myWordDoc.TablesOfContents[1].Range.Font.Name = font; //字体
            this.myWordDoc.TablesOfContents[1].Range.Font.Italic = 0;//非斜体
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.SpaceBefore = 0; //段前
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.SpaceAfter = 0; //段后间距
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft; //段后间距
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距 
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.LeftIndent = myWordApp.CentimetersToPoints(float.Parse("0"));//左缩进
        }
        public void formatContent()
        {
            //TableOfContents myContent = myWordDoc.TablesOfContents[1]; //目录
            //Paragraphs myParagraphs = myContent.Range.Paragraphs; //目录里的所有段，一行一段
            //int[] FirstParaArray = new int[4] { 1, 2, 26, 104 }; //一级标题，直接指定
            //foreach (int i in FirstParaArray)
            //{
            //    myParagraphs[i].Range.Font.Bold = 1;  //加粗
            //    myParagraphs[i].Range.Font.Name = "宋体"; //字体
            //    myParagraphs[i].Range.Font.Size = 11; //小四
            //    myParagraphs[i].Range.ParagraphFormat.SpaceBefore = 0; //段前
            //    myParagraphs[i].Range.ParagraphFormat.SpaceAfter = 0; //段后间距
            //}
            this.myWordDoc.TablesOfContents[1].Range.Font.Size = 14;
            this.myWordDoc.TablesOfContents[1].Range.Font.Name = "宋体"; //字体
            this.myWordDoc.TablesOfContents[1].Range.Font.Italic = 0;//非斜体
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.SpaceBefore = 0; //段前
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.SpaceAfter = 0; //段后间距
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft; //段后间距
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距 
            this.myWordDoc.TablesOfContents[1].Range.ParagraphFormat.LeftIndent = myWordApp.CentimetersToPoints(float.Parse("0"));//左缩进
        }
        /*暂时OK
        public String ExportHeaderFooterWithPic(String header, bool headerCenter, String footer, bool footerCenter, String picPath, float picH, float picW)
        {
            Microsoft.Office.Interop.Word.Application oWordApplic = null;// new Microsoft.Office.Interop.Word.ApplicationClass();
            oWordApplic = this.myWordApp;
            if (oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdNormalView ||
                    oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdOutlineView)
            {
                oWordApplic.ActiveWindow.ActivePane.View.Type = WdViewType.wdPrintView;
            }

            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageHeader;
            oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
            if (picPath != null && picPath != "")
            {
                object refFalse = false;
                object refTrue = true;
                oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                InlineShape shape1 = oWordApplic.Selection.InlineShapes.AddPicture(picPath, ref refFalse, ref refTrue, ref Nothing);
                float h = myWordApp.CentimetersToPoints(picH);
                float w = myWordApp.CentimetersToPoints(picW);

                shape1.Height = h;
                shape1.Width = w;
                selection.TypeParagraph();
            }

            if (header != null && header != "")
            {
                if (headerCenter)
                {
                    oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphRight;
                }

                oWordApplic.Selection.TypeText(header);//页眉内容
            }
            if (footer != null && footer != "")
            {
                oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageFooter;
                oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
                bool bHeader = true;
                object oAlignment = Microsoft.Office.Interop.Word.WdPageNumberAlignment.wdAlignPageNumberCenter;
                object oFirstPage = bHeader;

                if (footerCenter)
                {
                    oAlignment = Microsoft.Office.Interop.Word.WdPageNumberAlignment.wdAlignPageNumberCenter;
                }
                else
                {
                    oAlignment = Microsoft.Office.Interop.Word.WdPageNumberAlignment.wdAlignPageNumberRight;
                }


                Object oMissing = System.Reflection.Missing.Value;
                Range allRange = myWordDoc.Range(ref oMissing, ref oMissing);
                oWordApplic.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].PageNumbers.Add(ref   oAlignment, ref   oFirstPage);
                //  oWordApplic.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].PageNumbers.NumberStyle = WdPageNumberStyle.wdPageNumberStyleNumberInDash;
                // 
                WdStatistic stat = WdStatistic.wdStatisticPages;
                int num = myWordDoc.ComputeStatistics(stat, ref  Nothing);
                //oWordApplic.ActiveWindow.ActivePane.Selection.InsertAfter("/" + num.ToString());//插入总页数
            }

            //跳出页眉页脚设置
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekMainDocument;


            return null;
        }
        */
        public String ExportHeaderFooterWithPic(String header, bool headerCenter, String footer, bool footerCenter, String picPath, float picH, float picW)
        {
            //目录页取消链接
            this.GoToPage(2);
            this.selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            this.selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            Microsoft.Office.Interop.Word.Application oWordApplic = null;// new Microsoft.Office.Interop.Word.ApplicationClass();
            oWordApplic = this.myWordApp;
            if (oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdNormalView ||
                    oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdOutlineView)
            {
                oWordApplic.ActiveWindow.ActivePane.View.Type = WdViewType.wdPrintView;
            }

            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageHeader;
            oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
            if (picPath != null && picPath != "")
            {
                object refFalse = false;
                object refTrue = true;
                oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                InlineShape shape1 = oWordApplic.Selection.InlineShapes.AddPicture(picPath, ref refFalse, ref refTrue, ref Nothing);
                float h = myWordApp.CentimetersToPoints(picH);
                float w = myWordApp.CentimetersToPoints(picW);

                shape1.Height = h;
                shape1.Width = w;
                selection.TypeParagraph();
            }

            if (header != null && header != "")
            {
                if (headerCenter)
                {
                    oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphRight;
                }

                oWordApplic.Selection.TypeText(header);//页眉内容
            }
            //if (footer != null && footer != "")
            //{
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageFooter;
            oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
            if (footer != null && footer != "")
            {
                if (footerCenter)
                {
                    oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphRight;
                }

                oWordApplic.ActiveWindow.ActivePane.Selection.InsertAfter(footer);//页脚内容
            }

            //跳出页眉页脚设置
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekMainDocument;

            #region 页码设置并添加页码
            this.GoToPage(3);
            this.selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            this.selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            //为当前页添加页码
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.RestartNumberingAtSection = true;
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.StartingNumber = 1;
            object center = WdPageNumberAlignment.wdAlignPageNumberCenter;//将号码设置在中间
            object first = true;
            this.myWordApp.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterEvenPages].PageNumbers.Add(ref center, ref first);
            #endregion
            return null;
        }
        public void InsertPageNumber()
        {
            #region 页码设置并添加页码
            this.GoToPage(3);
            //this.selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            //this.selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            //为当前页添加页码
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.RestartNumberingAtSection = true;
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.StartingNumber = 1;
            object center = WdPageNumberAlignment.wdAlignPageNumberCenter;//将号码设置在中间
            object first = true;
            this.myWordApp.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterEvenPages].PageNumbers.Add(ref center, ref first);
            #endregion
        }
        public void InsertAllPageNumber()
        {
            #region 页码设置并添加页码
            this.GoToPage(2);
            //为当前页添加页码
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.RestartNumberingAtSection = true;
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.StartingNumber
                = 1;
            object center = WdPageNumberAlignment.wdAlignPageNumberCenter;//将号码设置在中间
            object first = true;
            this.myWordApp.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterEvenPages].PageNumbers.Add(ref center, ref first);
            this.GoToPage("Index");
            string pagenum = selection.get_Information(Microsoft.Office.Interop.Word.WdInformation.wdActiveEndAdjustedPageNumber).ToString();
            this.GoToPage(Int32.Parse(pagenum) + 1);
            //断掉页码
            this.selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            this.selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterPrimary].LinkToPrevious = false;
            //为当前页添加页码
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.RestartNumberingAtSection = true;
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.StartingNumber
                = Int32.Parse(pagenum) - 1;
            this.myWordApp.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterEvenPages].PageNumbers.Add(ref center, ref first);
            #endregion
        }
        public int GetSectionNum()
        {
            return this.myWordDoc.ComputeStatistics(WdStatistic.wdStatisticPages, ref Nothing);
        }
        public void SetPageContinue()
        {
            this.myWordApp.Selection.Sections[1].Headers[WdHeaderFooterIndex.wdHeaderFooterFirstPage].PageNumbers.RestartNumberingAtSection = false;

        }
        //RRR
        /// <summary>
        /// 具体使用该方法请进行重载。
        /// </summary>
        /// <param name="content"></param>
        /// <param name="font"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public String ExportTable1(String[,] content, String font, float size)
        {
            try
            {
                selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                selection.Font.Name = font;
                selection.Font.Size = size;
                Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, content.GetLength(0), content.GetLength(1), ref Nothing, ref Nothing);
                //newTable.Borders.OutsideLineWidth = WdLineWidth.wdLineWidth050pt;
                //newTable.Borders.InsideLineWidth = WdLineWidth.wdLineWidth050pt;
                newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
                newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
                //Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.AddOld(selection.Range, content.GetLength(0), content.GetLength(1));
                int i, j;
                for (i = 0; i < content.GetLength(0); i++)
                {
                    for (j = 0; j < content.GetLength(1); j++)
                    {
                        newTable.Cell(i + 1, j + 1).Range.Text = content[i, j];
                        if (i > 0 && j == 0)
                        {
                            //newTable.Cell(i + 1, j + 1).Range.Font.Color = (WdColor)(ColorTranslator.ToOle(Color.FromArgb(Convert.ToInt32(content[i, j]))));
                            //newTable.Cell(i + 1, j + 1).Width = 0.1;
                            newTable.Cell(i + 1, j + 1).Shading.BackgroundPatternColor = (WdColor)(Convert.ToInt32(content[i, j]));
                            newTable.Cell(i + 1, j + 1).Range.Text = "";
                        }

                    }
                }
                //for (i = 0; i < content.GetLength(0); i++)
                //{
                //selection.TypeText("a");
                object moveUnit = WdUnits.wdTable;
                //int count = content.GetLength(0);
                int count = 1;
                object moveCount = count;
                object moveExtend = WdMovementType.wdExtend;//.wdMove;
                //selection.MoveEnd(ref moveUnit, ref moveCount);
                //selection.MoveDown(ref moveUnit, ref moveCount, ref moveExtend);
                //}
                object unit = WdUnits.wdStory;
                selection.EndKey(ref unit, ref Nothing);
                selection.TypeParagraph();
            }
            catch (Exception ex)
            {
                return "插入表格出现异常，插入失败";
            }
            return null;
        }
        public String ExportTable2(String[,] content)
        {
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;

            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, content.GetLength(0), content.GetLength(1), ref Nothing, ref Nothing);
            int i, j;
            //for (i = 0; i < content.GetLength(0); i++)
            //{
            //    for (j = 0; j < content.GetLength(1); j++)
            //    {
            //        newTable.Cell(i + 1, j + 1).Range.Text = content[i, j];
            //    }
            //}
            for (i = 0; i < content.GetLength(0); i++)
            {
                selection.TypeText("a");
                object moveUnit = WdUnits.wdTable;
                //int count = content.GetLength(0);
                int count = 1;
                object moveCount = count;
                object moveExtend = WdMovementType.wdExtend;//.wdMove;
                selection.MoveEnd(ref moveUnit, ref moveCount);
                //selection.MoveDown(ref moveUnit, ref moveCount, ref moveExtend);
            }

            selection.TypeParagraph();
            return null;
        }
        public String ExportHeaderFooter(String header, bool headerCenter, String footer, bool footerCenter)
        {
            Microsoft.Office.Interop.Word.Application oWordApplic = null;// new Microsoft.Office.Interop.Word.ApplicationClass();
            oWordApplic = this.myWordApp;
            if (oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdNormalView ||
                    oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdOutlineView)
            {
                oWordApplic.ActiveWindow.ActivePane.View.Type = WdViewType.wdPrintView;
            }
            //if (header != null && header != "")
            //{
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageHeader;
            //oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
            if (header != null && header != "")
            {
                if (headerCenter)
                {
                    oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                }

                oWordApplic.Selection.HeaderFooter.Range.Text = header;//页眉内容
            }
            //if (footer != null && footer != "")
            //{
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageFooter;
            oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
            if (footer != null && footer != "")
            {
                if (footerCenter)
                {
                    oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphRight;
                }

                oWordApplic.ActiveWindow.ActivePane.Selection.InsertAfter(footer);//页脚内容
            }

            //跳出页眉页脚设置
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekMainDocument;


            return null;
        }
        public String ExportHeaderFooterWithPic1(String header, bool headerCenter, String footer, bool footerCenter, String picPath, float picH, float picW)
        {
            Microsoft.Office.Interop.Word.Application oWordApplic = null;// new Microsoft.Office.Interop.Word.ApplicationClass();
            oWordApplic = this.myWordApp;
            if (oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdNormalView ||
                    oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdOutlineView)
            {
                oWordApplic.ActiveWindow.ActivePane.View.Type = WdViewType.wdPrintView;
            }

            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageHeader;
            oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
            if (picPath != null && picPath != "")
            {
                object refFalse = false;
                object refTrue = true;
                oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                InlineShape shape1 = oWordApplic.Selection.InlineShapes.AddPicture(picPath, ref refFalse, ref refTrue, ref Nothing);
                float h = myWordApp.CentimetersToPoints(picH);
                float w = myWordApp.CentimetersToPoints(picW);

                shape1.Height = h;
                shape1.Width = w;
                selection.TypeParagraph();
            }

            if (header != null && header != "")
            {
                if (headerCenter)
                {
                    oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphRight;
                }

                oWordApplic.Selection.TypeText(header);//页眉内容
            }
            if (footer != null && footer != "")
            {
                oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageFooter;
                oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
                bool bHeader = true;
                object oAlignment = Microsoft.Office.Interop.Word.WdPageNumberAlignment.wdAlignPageNumberCenter;
                object oFirstPage = bHeader;

                if (footerCenter)
                {
                    oAlignment = Microsoft.Office.Interop.Word.WdPageNumberAlignment.wdAlignPageNumberCenter;
                }
                else
                {
                    oAlignment = Microsoft.Office.Interop.Word.WdPageNumberAlignment.wdAlignPageNumberRight;
                }


                Object oMissing = System.Reflection.Missing.Value;
                Range allRange = myWordDoc.Range(ref oMissing, ref oMissing);
                oWordApplic.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].PageNumbers.Add(ref oAlignment, ref oFirstPage);
                //  oWordApplic.Selection.Sections[1].Footers[WdHeaderFooterIndex.wdHeaderFooterPrimary].PageNumbers.NumberStyle = WdPageNumberStyle.wdPageNumberStyleNumberInDash;
                // 
                WdStatistic stat = WdStatistic.wdStatisticPages;
                int num = myWordDoc.ComputeStatistics(stat, ref Nothing);
                //oWordApplic.ActiveWindow.ActivePane.Selection.InsertAfter("/" + num.ToString());//插入总页数
            }

            //跳出页眉页脚设置
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekMainDocument;


            return null;
        }
        public String ExportHeaderFooterWithPic2(String header, bool headerCenter, String footer, bool footerCenter, String picPath, float picH, float picW)
        {
            Microsoft.Office.Interop.Word.Application oWordApplic = null;// new Microsoft.Office.Interop.Word.ApplicationClass();
            oWordApplic = this.myWordApp;
            if (oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdNormalView ||
                    oWordApplic.ActiveWindow.ActivePane.View.Type == WdViewType.wdOutlineView)
            {
                oWordApplic.ActiveWindow.ActivePane.View.Type = WdViewType.wdPrintView;
            }
            //if (header != null && header != "")
            //{
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageHeader;
            oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
            if (picPath != null && picPath != "")
            {
                object refFalse = false;
                object refTrue = true;
                oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;

                InlineShape shape1 = oWordApplic.Selection.InlineShapes.AddPicture(picPath, ref refFalse, ref refTrue, ref Nothing);
                float h = myWordApp.CentimetersToPoints(picH);
                float w = myWordApp.CentimetersToPoints(picW);
                //oWordApplic.Selection.InlineShapes.Count;
                shape1.Height = h;
                shape1.Width = w;
                //oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                //object l = (object)myWordApp.CentimetersToPoints(0);
                //object t = (object)myWordApp.CentimetersToPoints(0);
                //object h = (object)myWordApp.CentimetersToPoints(2);
                //object w = (object)myWordApp.CentimetersToPoints(6);
                //oWordApplic.Selection.HeaderFooter.Shapes.AddPicture(picPath, ref Nothing, ref Nothing, ref l, ref t, ref w, ref h, ref Nothing);
                //oWordApplic.Selection.HeaderFooter.Range.InlineShapes.AddPicture(picPath, ref Nothing, ref Nothing, ref Nothing);
                selection.TypeParagraph();
            }

            if (header != null && header != "")
            {
                if (headerCenter)
                {
                    oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    oWordApplic.Selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphRight;
                }

                oWordApplic.Selection.TypeText(header);//页眉内容
            }
            //if (footer != null && footer != "")
            //{
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekCurrentPageFooter;
            oWordApplic.Selection.HeaderFooter.LinkToPrevious = false;
            if (footer != null && footer != "")
            {
                if (footerCenter)
                {
                    oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    oWordApplic.Selection.HeaderFooter.Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphRight;
                }

                oWordApplic.ActiveWindow.ActivePane.Selection.InsertAfter(footer);//页脚内容
            }

            //跳出页眉页脚设置
            oWordApplic.ActiveWindow.View.SeekView = WdSeekView.wdSeekMainDocument;


            return null;
        }
        public String InsertTextBox(String text, float left, float top, float h, float w, bool line, String font, float fontSize, bool fontBold, bool paragraphCenter)
        {
            selection.Font.Name = font;
            selection.Font.Size = fontSize;
            if (fontBold)
            {
                selection.Font.Bold = 11;
            }
            else
            {
                selection.Font.Bold = 0;
            }
            if (paragraphCenter)
            {
                selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            }
            selection.Text = text;

            /*if (!line)
             {
                 shape.Line.Visible = Microsoft.Office.Core.MsoTriState.msoFalse;
             }
             else
             {
                 shape.Line.Visible = Microsoft.Office.Core.MsoTriState.msoTrue;
             }
              */

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            return null;
        }
        public String InsertPic(String file, float left, float top, float hei, float wid)
        {
            object l = (object)myWordApp.CentimetersToPoints(left);
            object t = (object)myWordApp.CentimetersToPoints(top);
            object h = (object)myWordApp.CentimetersToPoints(hei);
            object w = (object)myWordApp.CentimetersToPoints(wid);
            Microsoft.Office.Interop.Word.Shape shape = myWordDoc.Shapes.AddPicture(file, ref Nothing, ref Nothing, ref l, ref t, ref w, ref h, ref Nothing);
            return null;
        }
        //AAA
        public String InsertBreakNextPage()
        {
            object type = WdBreakType.wdSectionBreakNextPage;
            selection.InsertBreak(ref type);
            return null;
        }
        public String InsertBreakNextSection()
        {
            object oSectionBreak = WdBreakType.wdSectionBreakNextPage;
            myWordApp.Selection.Range.InsertBreak(ref oSectionBreak);

            return null;
        }
        public String GoToNextPage()
        {
            selection.GoToNext(WdGoToItem.wdGoToPage);
            return null;
        }
        public String GoToPreviousPage()
        {
            selection.GoToPrevious(WdGoToItem.wdGoToPage);
            return null;
        }
        public String GoToPage(int page)
        {
            object What = Microsoft.Office.Interop.Word.WdGoToItem.wdGoToPage;
            object Which = Microsoft.Office.Interop.Word.WdGoToDirection.wdGoToNext;
            object Name = page.ToString(); // 页数
            selection.GoTo(ref What, ref Which, ref Nothing, ref Name); // 第二个参数可以用Nothing
            return null;
        }

        /// <summary>
        /// 插入书签
        /// </summary>
        public void insertBookMark(string bookName)
        {

            Range r = this.selection.Range;
            myWordApp.ActiveDocument.Bookmarks.Add(bookName, r);

        }


        /// <summary>
        /// 加入对word进程文档占用的判断，占用则保存并关闭进程，然后再次打开进程
        /// </summary>
        /// <param name="xlChart"></param>
        //public WordHelper IsProcessOccupied(string wordOutFile, string bookMark)
        //{
        //    //
        //    try
        //    {
        //        if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
        //        {
        //            return this;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        SaveAndClose();
        //        //重新打开进程
        //        return new WordHelper(wordOutFile);
        //    }
        //}


        /// <summary>
        /// 插入雷达图
        /// </summary>
        /// <param name="xlChart"></param>
        public void insertXlChart(Microsoft.Office.Interop.Excel.Chart xlChart, string bookMark)
        {
            FileLog.WriteLog("insertXlChart start");
            object bkmC = bookMark;

            if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
            {
                this.myWordApp.ActiveDocument.Bookmarks.get_Item(ref bkmC).Select();
            }

            xlChart.ChartArea.Copy();
            selection.Range.Paste();
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            selection.TypeParagraph();
            FileLog.WriteLog("insertXlChart end");

        }



        public void GoToPage(string bookMark)
        {
            object bkmC = bookMark;
            if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
            {
                this.myWordApp.ActiveDocument.Bookmarks.get_Item(ref bkmC).Select();
                //selection.TypeParagraph();
            }
        }

        /// <summary>
        /// 设置行距
        /// </summary>
        /// <param name="lineSpacing">行距</param>
        public void setLineSpacing(Microsoft.Office.Interop.Word.WdLineSpacing lineSpacing)
        {
            //myWordApp.ActiveDocument.Select();
            selection.ParagraphFormat.LineSpacingRule = lineSpacing; ;
        }


        /// <summary>
        /// 插入雷达图图片 第二季度季报 未使用
        /// </summary>
        /// <param name="xlChart"></param>
        public void insertXlChartPic(string picFileName, string bookMark)
        {
            object bkmC = bookMark;
            if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
            {
                this.myWordApp.ActiveDocument.Bookmarks.get_Item(ref bkmC).Select();
            }
            //拷贝表格和图表到word中。  
            //Microsoft.Office.Interop.Word.Range wdRange = myWordApp.Selection.Range;
            //wdRange.SetRange(wdRange.End, wdRange.End + 1);
            // xlChart.ChartArea.Copy();

            //要向Word文档中插入图片的位置

            Object range = selection.Range;

            //定义该插入的图片是否为外部链接

            Object linkToFile = false; //默认

            //定义要插入的图片是否随Word文档一起保存

            Object saveWithDocument = true; //默认

            //使用InlineShapes.AddPicture方法插入图片

            this.myWordDoc.InlineShapes.AddPicture(picFileName, ref linkToFile, ref saveWithDocument, ref range);
            //this.GoToPage();
            // selection.Range.Paste();
            // selection.TypeParagraph();
            // wdRange.Paste();
        }

        /// <summary>
        /// 第二季 全国表格输出
        /// </summary>
        /// <param name="content">表格内容</param>
        /// <param name="rowNum">行数</param>
        /// <param name="colNum">列数</param>
        /// <param name="font">字体</param>
        /// <param name="size">字体大小</param>
        public void ExportTableCountry_2(String[,] content, int rowNum, int colNum, String font, float size)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            //创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rowNum, colNum, ref Nothing, ref Nothing);
            // newTable.Range.Font.Bold = 1;

            // 此处未能实现列数适配，每列宽度不一样
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Columns[1].Width = 100f;
            newTable.Columns[2].Width = 100f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Columns[6].Width = 50f;
            newTable.Columns[7].Width = 50f;

            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/




            //设置表头颜色
            for (int j = 1; j <= colNum; j++)
            {
                newTable.Cell(1, j).Range.Shading.ForegroundPatternColor = WdColor.wdColorGray40;

            }

            //设置表格样式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中    
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;//水平居中
            selection.Range.Bold = 1;

            //填充表格内容
            for (int i = 1; i <= rowNum; i++)
                for (int j = 1; j <= colNum; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (j == 1 || j == 2)
                    {
                        if (i == 1 && i == 12)
                            newTable.Cell(i, j).Range.Font.Bold = 2;
                        else
                            newTable.Cell(i, j).Range.Font.Bold = 1;
                    }
                    else
                        newTable.Cell(i, j).Range.Font.Bold = 2;
                }

            //允许跨页换行
            newTable.AllowPageBreaks = true;

            #region 合并单元格
            newTable.Cell(12, 1).Merge(newTable.Cell(12, 2));
            //第一列合并
            int rowcount = 2; // 前两行为表头
            for (int i = 2; i <= 11; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != "\r\a")
                {
                    if (i != 2)
                    {
                        if (i - 1 != rowcount)
                            newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                    }

                    rowcount = i;
                }
            }
            if (rowcount != 11)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(11, 1));
            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        public void inertTable0(String[,] content, String font, float size)
        {

            // 格式清空
            selection.ClearParagraphAllFormatting();


            // 创建表格
            int rownum = 10;
            int colnum = 7;
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, colnum, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;

            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 100f;
            newTable.Columns[2].Width = 100f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Columns[6].Width = 50f;
            newTable.Columns[7].Width = 50f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            //设置表头颜色
            for (int j = 1; j <= colnum; j++)
            {
                newTable.Cell(1, j).Range.Shading.ForegroundPatternColor = WdColor.wdColorGray30;

            }

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= colnum; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (j != 1 && j != 2)
                    {
                        newTable.Cell(i, j).Range.Bold = 2;
                    }
                    if (i == 10)
                        newTable.Cell(i, j).Range.Bold = 2;
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列合并
            newTable.Cell(10, 1).Merge(newTable.Cell(10, 2));
            int rowcount = 2; // 前两行为表头
            for (int i = 2; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != "\r\a")
                {
                    if (i != 2)
                    {
                        if (i - 1 != rowcount)
                            newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                    }

                    rowcount = i;
                }
            }
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));

            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 2).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 3).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 4).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 5).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 6).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 7).Range.Bold = 2;//设置单元格中字体为粗体


            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }


        public void inertTable1(String[,] content, string bookmark, String font, float size)
        {

            // 格式清空
            selection.ClearParagraphAllFormatting();


            // 创建表格
            int rownum = 19;
            int colnum = 7;
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, colnum, ref Nothing, ref Nothing);

            // 设置表格属性
            //newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            //newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;

            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 80f;
            newTable.Columns[2].Width = 100f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 60f;
            newTable.Columns[5].Width = 60f;
            newTable.Columns[6].Width = 60f;
            newTable.Columns[7].Width = 120f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;//水平居中
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= colnum; j++)
                {
                    if (j == 4)
                        newTable.Cell(i, j).Range.Bold = 2;
                    if (j >= 3 && j <= 6 && (i % 2 == 0))
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = WdColor.wdColorPaleBlue;
                    if (j >= 2 && j <= 6 && (i % 2 == 1))
                        newTable.Cell(i, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleDot;
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (j == 7 && i != 1)
                        newTable.Cell(i, j).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格
            //第二列合并
            int rowcount2 = 2; // 前两行为表头
            for (int j = 2; j <= rownum; j++)
            {
                if (newTable.Cell(j, 2).Range.Text != "\r\a")
                {
                    if (j != 2)
                    {
                        if (j - 1 != rowcount2)
                            newTable.Cell(rowcount2, 2).Merge(newTable.Cell(j - 1, 2));
                    }

                    rowcount2 = j;
                }
            }
            if (rowcount2 != rownum)
                newTable.Cell(rowcount2, 2).Merge(newTable.Cell(rownum, 2));

            //第一列,第七列合并
            int rowcount = 2; // 前两行为表头
            for (int i = 2; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != "\r\a")
                {
                    if (i != 2)
                    {
                        if (i - 1 != rowcount)
                        {
                            newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                            newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                            newTable.Cell(i - 2, 2).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                            for (int k = 3; k <= 7; k++)
                            {
                                newTable.Cell(i - 1, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                            }

                            newTable.Cell(rowcount, 7).Merge(newTable.Cell(i - 1, 7));
                        }
                    }

                    rowcount = i;
                }
            }
            if (rowcount != rownum)
            {
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));
                newTable.Cell(rowcount, 1).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                newTable.Cell(rownum - 1, 2).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                for (int k = 3; k <= 7; k++)
                {
                    newTable.Cell(rownum, k).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                }
                newTable.Cell(rowcount, 7).Merge(newTable.Cell(rownum, 7));
            }


            #endregion

            // 表头字体格式设置
            for (int j = 1; j <= colnum; j++)
            {
                newTable.Cell(1, j).Range.Shading.ForegroundPatternColor = WdColor.wdColorLightBlue;
                newTable.Cell(1, j).Range.Bold = 2;
                newTable.Cell(1, j).Range.Font.Name = "微软雅黑";
                newTable.Cell(1, j).Range.Font.Size = 10.5f;
                newTable.Cell(1, j).Range.Font.Color = WdColor.wdColorWhite;
                newTable.Cell(1, j).Borders[WdBorderType.wdBorderBottom].LineStyle = WdLineStyle.wdLineStyleSingle;
                newTable.Cell(1, j).Borders[WdBorderType.wdBorderTop].LineStyle = WdLineStyle.wdLineStyleSingle;
            }

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        public void inertTable2(String[,] content, string bookmark, String font, float size)
        {

            // 格式清空
            selection.ClearParagraphAllFormatting();


            // 创建表格
            int rownum = 5;
            int colnum = 5;
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, colnum, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;

            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 100f;
            newTable.Columns[2].Width = 50f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= colnum; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];

                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列合并
            int rowcount = 2; // 前两行为表头
            for (int i = 2; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != "\r\a")
                {
                    if (i != 2)
                    {
                        if (i - 1 != rowcount)
                            newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                    }

                    rowcount = i;
                }
            }
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));
            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 2).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 3).Range.Bold = 2;//设置单元格中字体为粗体


            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        public void inertTable3(String[,] content, string bookmark, String font, float size)
        {

            // 格式清空
            selection.ClearParagraphAllFormatting();

            // 创建表格
            int rownum = 7;
            int colnum = 6;
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, colnum, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;

            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 100f;
            newTable.Columns[2].Width = 50f;
            newTable.Columns[3].Width = 70f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Columns[6].Width = 50f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= colnum; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];

                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列合并
            int rowcount = 2; // 前两行为表头
            for (int i = 2; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != "\r\a")
                {
                    if (i != 2)
                    {
                        if (i - 1 != rowcount)
                            newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                    }

                    rowcount = i;
                }
            }
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));
            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 2).Range.Bold = 2;//设置单元格中字体为粗体
            newTable.Cell(1, 3).Range.Bold = 2;//设置单元格中字体为粗体


            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 第二季 附件后表输出
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum">表格行数</param>
        /// <param name="col">表格列数</param>
        public void ExportLastTable(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;

            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 70f;
            newTable.Columns[2].Width = 70f;
            newTable.Columns[3].Width = 100f;
            newTable.Columns[4].Width = 150f;
            newTable.Columns[5].Width = 60f;
            //newTable.Columns[6].Width = 60f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式

            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;//水平居中
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //设置表头颜色
            for (int j = 1; j <= col; j++)
            {
                newTable.Cell(1, j).Range.Shading.ForegroundPatternColor = WdColor.wdColorGray30;
                newTable.Cell(1, j).Range.Bold = 2;

            }

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i != 1 && i != 2 && (j == 3 || j == 4 || j == 5))
                    {
                        newTable.Cell(i, j).Range.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;//居左
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行


            #region 合并单元格

            //第一列合并
            int rowcount = 2; // 前两行为表头
            string str_value = newTable.Cell(2, 1).Range.Text;
            // 第二列合并
            int rowcount_2 = 2; // 前两行为表头
            string str_value_2 = newTable.Cell(2, 2).Range.Text;
            for (int i = 2; i <= rownum; i++)
            {

                // 第一列
                if (newTable.Cell(i, 1).Range.Text != str_value)
                {
                    if (i - 1 != rowcount)
                    {
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));
                    }
                    if (i - 1 != rowcount_2)
                    {
                        newTable.Cell(rowcount_2, 2).Merge(newTable.Cell(i - 1, 2));
                    }

                    rowcount = i;
                    rowcount_2 = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                    str_value_2 = newTable.Cell(i, 2).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                    // 第二列
                    if (newTable.Cell(i, 2).Range.Text != str_value_2)
                    {
                        if (i - 1 != rowcount_2)
                            newTable.Cell(rowcount_2, 2).Merge(newTable.Cell(i - 1, 2));

                        rowcount_2 = i;
                        str_value_2 = newTable.Cell(i, 2).Range.Text;
                    }
                    else
                    {
                        if (rowcount_2 != i)
                            newTable.Cell(i, 2).Range.Text = "";
                    }
                }

            }

            //第一列合并
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));

            //第二列合并
            if (rowcount_2 != rownum)
                newTable.Cell(rowcount_2, 2).Merge(newTable.Cell(rownum, 2));

            #endregion

            // 表头字体格式设置
            newTable.Cell(1, 1).Range.Bold = 2;//设置单元格中字体为粗体 

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }
        /// <summary>
        /// 第二季季报 插入图表 
        /// </summary>
        /// <param name="xlChart"></param>
        public void insertChart1(Microsoft.Office.Interop.Excel.Chart xlChart, string bookMark)
        {
            object bkmC = bookMark;
            if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
            {
                this.myWordApp.ActiveDocument.Bookmarks.get_Item(ref bkmC).Select();
            }

            xlChart.ChartArea.Copy();
            selection.Range.Paste();
            selection.TypeParagraph();
        }

        /// <summary>
        /// 第四季季报 在书签处插入文字
        /// </summary>
        /// <param name="xlChart"></param>
        public void insertTxt(string txt, string bookMark)
        {
            object bkmC = bookMark;
            if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
            {
                this.myWordApp.ActiveDocument.Bookmarks.get_Item(ref bkmC).Select();
                selection.TypeText(txt);
            }
        }

        /// <summary>
        /// 第二季季报 插入图表 
        /// </summary>
        /// <param name="xlChart"></param>
        public void insertChart2(Microsoft.Office.Interop.Excel.Chart xlChart1,
            Microsoft.Office.Interop.Excel.Chart xlChart2, string bookMark)
        {
            object bkmC = bookMark;
            if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
            {
                this.myWordApp.ActiveDocument.Bookmarks.get_Item(ref bkmC).Select();
            }

            xlChart2.ChartArea.Copy();
            selection.Range.Paste();
            selection.TypeParagraph();
            xlChart1.ChartArea.Copy();
            selection.Range.Paste();
            //selection.TypeParagraph();
        }

        /// <summary>
        /// 第二季季报 插入图表 
        /// </summary>
        /// <param name="xlChart"></param>
        public void insertChart3(Microsoft.Office.Interop.Excel.Chart xlChart1,
            Microsoft.Office.Interop.Excel.Chart xlChart2,
            Microsoft.Office.Interop.Excel.Chart xlChart3, string bookMark)
        {
            object bkmC = bookMark;
            if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
            {
                this.myWordApp.ActiveDocument.Bookmarks.get_Item(ref bkmC).Select();
            }

            xlChart3.ChartArea.Copy();
            selection.Range.Paste();
            selection.TypeParagraph();
            xlChart2.ChartArea.Copy();
            selection.Range.Paste();
            //selection.TypeParagraph();
            xlChart1.ChartArea.Copy();
            selection.Range.Paste();
            //selection.TypeParagraph();
        }


        /// <summary>
        /// 第二季季报 插入图表 
        /// </summary>
        /// <param name="xlChart"></param>
        public void insertChart4(Microsoft.Office.Interop.Excel.Chart xlChart1,
            Microsoft.Office.Interop.Excel.Chart xlChart2,
            Microsoft.Office.Interop.Excel.Chart xlChart3,
            Microsoft.Office.Interop.Excel.Chart xlChart4, string bookMark)
        {
            object bkmC = bookMark;
            if (this.myWordApp.ActiveDocument.Bookmarks.Exists(bookMark) == true)
            {
                this.myWordApp.ActiveDocument.Bookmarks.get_Item(ref bkmC).Select();
            }

            xlChart4.ChartArea.Copy();
            selection.Range.Paste();
            selection.TypeParagraph();
            xlChart3.ChartArea.Copy();
            selection.Range.Paste();
            //selection.TypeParagraph();
            xlChart2.ChartArea.Copy();
            selection.Range.Paste();
            //selection.TypeParagraph();
            xlChart1.ChartArea.Copy();
            selection.Range.Paste();
            //selection.TypeParagraph();
        }


        public String ExportTxtWithoutChangeline(string txt, WdColor fontColor, string font, bool underline, bool delline, bool bold, bool italic, float size, bool center)
        {
            try
            {
                //段落格式设定  
                // selection.ParagraphFormat.LeftIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//左缩进  
                // selection.ParagraphFormat.RightIndent = this.myWordApp.CentimetersToPoints(float.Parse("0"));//右缩进  
                selection.ParagraphFormat.SpaceBefore = float.Parse("0");//段前间距  
                selection.ParagraphFormat.SpaceBeforeAuto = 0;//  
                selection.ParagraphFormat.SpaceAfter = float.Parse("0");//段后间距  
                selection.ParagraphFormat.SpaceAfterAuto = 0;//  
                selection.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpace1pt5;//1.5倍行距  
                //selection.ParagraphFormat.LineSpacing = 15;

                if (center)
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
                }
                else
                {
                    selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphLeft;
                }
                selection.Font.Name = font;
                selection.Font.Size = size;
                if (underline == true)
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineThick;
                }
                else
                {
                    selection.Font.Underline = WdUnderline.wdUnderlineNone;
                }
                if (delline == true)
                {
                    selection.Font.StrikeThrough = 0;
                }
                if (bold == true)
                {
                    selection.Font.Bold = 1;
                }
                selection.Font.Color = fontColor;

                selection.ParagraphFormat.CharacterUnitFirstLineIndent = 2;//首行缩进两字符

                if (bold == false)
                {
                    selection.Font.Bold = 0;
                }
                selection.TypeText(txt);
            }
            catch (Exception ex)
            {
                return "插入文本出现异常，插入失败";
            }
            return null;
        }
        private Microsoft.Office.Interop.Word.WdColor GetColor(System.Drawing.Color c)
        {
            UInt32 R = 0x1, G = 0x100, B = 0x10000;
            return (Microsoft.Office.Interop.Word.WdColor)(R * c.R + G * c.G + B * c.B);
        }

        public void ExportCountryTable1(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 100f;
            newTable.Columns[2].Width = 100f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Columns[6].Width = 50f;
            newTable.Columns[7].Width = 50f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {
                        newTable.Cell(1, j).Range.Bold = 2;
                        newTable.Cell(1, j).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray20;
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            #region 合并单元格

            //第一列合并
            int rowcount = 2; // 第一行为表头
            string str_value = newTable.Cell(2, 1).Range.Text;
            for (int i = 2; i < rownum; i++)
            {

                if (newTable.Cell(i, 1).Range.Text != str_value)
                {
                    if (i - 1 != rowcount)
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }

            }
            for (int i = 2; i <= rownum; i++)
            {
                string cell = newTable.Cell(i, 7).Range.Text.Replace("\r\a", "");
                if (Math.Abs(Convert.ToDouble(cell)) > 5)
                {
                    for (int j = 5; j <= 7; j++)
                    {
                        newTable.Cell(i, j).Range.Font.Color = Microsoft.Office.Interop.Word.WdColor.wdColorRed;
                        newTable.Cell(i, j).Range.Font.Bold = 1;
                        newTable.Cell(i, j).Range.Shading.BackgroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorYellow;
                    }

                }
            }
            if (rowcount != rownum - 1)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum - 1, 1));
            //合并最后一行
            newTable.Cell(rownum, 2).Range.Text = "";
            newTable.Cell(rownum, 1).Merge(newTable.Cell(rownum, 2));

            newTable.Cell(rownum, 1).Range.Bold = 2;
            #endregion

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }

        public void ExportCountryTable2(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格，第三个表最后一列不用输出
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，

            newTable.Columns[1].Width = 50f;
            newTable.Columns[2].Width = 80f;
            newTable.Columns[3].Width = 40f;
            newTable.Columns[4].Width = 280f;

            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            //newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {

                        newTable.Cell(1, j).Range.Bold = 2;
                        newTable.Cell(1, j).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray20;
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行
            //第一列合并
            int rowcount = 2; // 第一行为表头
            string str_value = newTable.Cell(2, 1).Range.Text;
            for (int i = 2; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != str_value)
                {
                    if (i - 1 != rowcount)
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                    if (rownum == i)
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i, 1));
                }

            }
            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }
        public void ExportCountryTable3(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格，第三个表最后一列不用输出
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col - 1, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，

            for (int i = 1; i <= 4; i++)
                newTable.Columns[i].Width = 40f;
            newTable.Columns[5].Width = 60f;
            newTable.Columns[6].Width = 140f;
            newTable.Columns[7].Width = 200f;

            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            //newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容,最后一列不用输出
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j < col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {
                        newTable.Cell(1, j).Range.Bold = 2;
                        newTable.Cell(1, j).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray20;
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }
        public void ExportCountryTable4(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样，

            newTable.Columns[1].Width = 40f;

            newTable.Columns[2].Width = 150f;
            newTable.Columns[3].Width = 150f;
            newTable.Columns[4].Width = 150f;

            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            //newTable.Rows[2].HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容,最后一列不用输出
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i == 1)
                    {
                        newTable.Cell(1, j).Range.Bold = 2;
                        newTable.Cell(1, j).Shading.ForegroundPatternColor = Microsoft.Office.Interop.Word.WdColor.wdColorGray20;
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();
        }

        /// <summary>
        /// 简报--短板指标表输出 
        /// </summary>
        /// <param name="content">输出内容</param>
        /// <param name="font">字体格式</param>
        /// <param name="size">字体大小</param>
        /// <param name="rownum"></param>
        public void ExportSRIndTable(String[,] content, String font, float size, int rownum, int col)
        {
            // 格式清空
            selection.ClearParagraphAllFormatting();
            // 创建表格
            Microsoft.Office.Interop.Word.Table newTable = myWordDoc.Tables.Add(selection.Range, rownum, col, ref Nothing, ref Nothing);

            // 设置表格属性
            newTable.Borders.OutsideLineStyle = WdLineStyle.wdLineStyleSingle;
            newTable.Borders.InsideLineStyle = WdLineStyle.wdLineStyleSingle;
            // 未实现列数适配 ，每列宽度不一样
            newTable.Columns[1].Width = 40f;
            newTable.Columns[2].Width = 130f;
            newTable.Columns[3].Width = 50f;
            newTable.Columns[4].Width = 50f;
            newTable.Columns[5].Width = 50f;
            newTable.Columns[6].Width = 50f;
            newTable.Columns[7].Width = 50f;
            newTable.Columns[8].Width = 50f;
            newTable.Rows.First.HeadingFormat = -1;/**就是这个属性了,咋看真看不出来,原来默认是0,-1才表式标题行重复**/
            newTable.Rows[2].HeadingFormat = -1;

            // 设置表格格式
            newTable.Select();
            newTable.Range.Rows.Alignment = WdRowAlignment.wdAlignRowCenter;//表格居中
            newTable.Range.Cells.VerticalAlignment = WdCellVerticalAlignment.wdCellAlignVerticalCenter;//垂直居中
            selection.Font.Name = font;
            selection.Font.Size = size;
            selection.ParagraphFormat.Alignment = WdParagraphAlignment.wdAlignParagraphCenter;
            // 设置表格内文字行距
            newTable.Range.ParagraphFormat.LineSpacingRule = Microsoft.Office.Interop.Word.WdLineSpacing.wdLineSpaceSingle;

            //填充表格内容
            for (int i = 1; i <= rownum; i++)
                for (int j = 1; j <= col; j++)
                {
                    newTable.Cell(i, j).Range.Text = content[i - 1, j - 1];
                    if (i <= 2)
                    {
                        newTable.Cell(1, j).Range.Bold = 2;
                        newTable.Cell(i, j).Range.Shading.ForegroundPatternColor = GetColor(Color.FromArgb(218, 238, 243));
                    }
                }
            newTable.AllowPageBreaks = false; //不允许跨页换行

            #region 合并单元格

            //第一列合并
            int rowcount = 3; // 前两行为表头
            string str_value = newTable.Cell(3, 1).Range.Text;
            for (int i = 3; i <= rownum; i++)
            {
                if (newTable.Cell(i, 1).Range.Text != str_value)
                {
                    if (i - 1 != rowcount)
                        newTable.Cell(rowcount, 1).Merge(newTable.Cell(i - 1, 1));

                    rowcount = i;
                    str_value = newTable.Cell(i, 1).Range.Text;
                }
                else
                {
                    if (rowcount != i)
                        newTable.Cell(i, 1).Range.Text = "";
                }

            }
            if (rowcount != rownum)
                newTable.Cell(rowcount, 1).Merge(newTable.Cell(rownum, 1));


            #endregion

            // 表头字体格式设置
            //第一行合并
            newTable.Cell(1, 1).Merge(newTable.Cell(2, 1));
            newTable.Cell(1, 2).Merge(newTable.Cell(2, 2));
            newTable.Cell(1, 3).Merge(newTable.Cell(1, 6));
            newTable.Cell(1, 4).Merge(newTable.Cell(1, 5));

            object unit = WdUnits.wdStory;
            selection.EndKey(ref unit, ref Nothing);
            selection.TypeParagraph();

        }
    }

    /*************************************************************************
     * 文件名称 ：WordHelper.cs                          
     * 描述说明 ：操作Word文件
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
