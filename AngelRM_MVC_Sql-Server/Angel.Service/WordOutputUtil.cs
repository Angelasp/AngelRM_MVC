using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Angel.Service
{
    /*************************************************************************
     * 文件名称 ：WordOutputUtil.cs                          
     * 描述说明 ：操作Word输出类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
    class WordOutputUtil
    {
        public WordOutputUtil()
        {

        }
        public static void writeToTxt(string msg, string fileName)
        {
            StreamWriter write;
            if (File.Exists(fileName))
            {
                write = File.AppendText(fileName);
            }
            else
            {
                FileStream stream = File.Create(fileName);
                write = new StreamWriter(stream);
            }
            write.WriteLine(msg);
            write.Flush();
            write.Close();

        }

        /// <summary>
        /// 相比上季指标变化幅度
        /// </summary>
        /// <param name="sdiName"></param>
        /// <param name="score"></param>
        /// <param name="lasT_SCORE"></param>
        /// <returns></returns>
        public static string CHANGE_MARGIN(string sdiName, double score, double lasT_SCORE)
        {
            string resualt = "";
            // 比值指标
            if (sdiName.Contains("%") | sdiName.Contains("满意度") | sdiName.Contains("万用户投诉比") | sdiName.Contains("万投比"))
            {

                decimal temp = Math.Round((decimal)Math.Abs(score - lasT_SCORE), 2, MidpointRounding.AwayFromZero);
                if (sdiName.Contains("满意度") | sdiName.Contains("万用户投诉比") | sdiName.Contains("万投比"))
                {
                    resualt = temp.ToString();
                }
                else
                {
                    resualt = temp.ToString() + "pp";
                }
            }
            // 非比值指标
            else
            {
                // 如果上季指标不为0
                if (lasT_SCORE != 0)
                {

                    decimal temp = Math.Round((decimal)(Math.Abs(score / lasT_SCORE - 1) * 100), 2, MidpointRounding.AwayFromZero);
                    resualt = temp.ToString() + "%";
                }
                //如果上季指标为0
                else
                {
                    decimal temp = Math.Round((decimal)Math.Abs(score - lasT_SCORE), 2, MidpointRounding.AwayFromZero);
                    resualt = temp.ToString() + "%";
                }
            }
            return resualt;
        }

        /// <summary>
        /// 按规则对小数点进行截位，截位后若是整数，则不保留小数点
        /// 若小数点前6位全是0，则按0处理--柏杨定的
        /// <param name="origData">原始数据</param>
        /// /// </summary>
        public static string HandleDecimal(string origData)
        {
            try
            {
                Double idata = Convert.ToDouble(origData);
                bool zeroFlag = Math.Abs(idata) < 0.0000001;
                if (zeroFlag)
                    return "0";
                else
                {
                    string return_score = string.Empty;
                    Double abs_new_score = Math.Abs(idata);
                    if (abs_new_score == Convert.ToDouble(100) || abs_new_score == Convert.ToDouble(0))
                        return_score = Math.Round((decimal)idata, 0, MidpointRounding.AwayFromZero).ToString();
                    else if (abs_new_score < 0.005 || (abs_new_score > 99.995 && abs_new_score < 100))
                    {
                        return_score = Math.Round((decimal)idata, 4, MidpointRounding.AwayFromZero).ToString();
                    }
                    else
                    {
                        Double score = Convert.ToDouble(Math.Round((decimal)idata, 2, MidpointRounding.AwayFromZero).ToString());
                        if (score == Convert.ToDouble(Convert.ToInt32(score)))
                            return_score = Convert.ToInt32(score).ToString();
                        else
                            return_score = score.ToString();
                    }
                    return return_score;
                }
            }
            catch (Exception ex)
            {
                return origData;
            }

        }

        /// <summary>
        /// 按规则对小数点进行截位，截位位数是参数
        /// <param name="origData">原始数据</param>
        /// /// </summary>
        public static string HandleDecimal(string origData, int num)
        {
            try
            {
                Double idata = Convert.ToDouble(origData);
                string return_score = string.Empty;
                return_score = Math.Round((decimal)idata, num, MidpointRounding.AwayFromZero).ToString();
                return return_score;
            }
            catch (Exception ex)
            {
                return origData;
            }

        }

        /// <summary>
        /// 根据本期上期得分，取得描述
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Score_Change(double score, double lastscore)
        {
            string result = "";
            double score_change = score - lastscore;
            if (score_change == 0)
            {
                result = "持平";
            }
            else if (score_change > 0)
            {
                result = "提升" + HandleDecimal(Convert.ToString(score_change), 2);
            }
            else
            {
                result = "下降" + HandleDecimal(Convert.ToString(Math.Abs(score_change)), 2);
            }

            return result;
        }

        /// <summary>
        /// 根据轮子总分，取得得分变化描述
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Score_Change1(double score, double lastScore)
        {
            string result = "";
            double score_change = score - lastScore;
            if (score_change > 0 && score_change < 3)
            {
                result = "有小幅提升";
            }
            else if (score_change <= 8 && score_change >= 3)
            {
                result = "有一定提升";
            }
            else if (score_change > 8)
            {
                result = "有明显提升";
            }
            else if (score_change > -3 && score_change < 0)
            {
                result = "有小幅下降";
            }
            else if (score_change <= -3 && score_change >= -8)
            {
                result = "有一定下降";
            }
            else if (score_change < -8)
            {
                result = "有明显下降";
            }
            else if (score_change == 0)
            {
                result = "持平";
            }

            return result;
        }

        /// <summary>
        /// 根据本期上期得分，取得描述
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Score_Change(double score, double lastscore, string iIsPositive)
        {
            string result = "";
            double score_change = iIsPositive == "0" ? score - lastscore : lastscore - score;
            if (score_change == 0)
            {
                result = "持平";
            }
            else if (score_change > 0)
            {
                result = "提升" + WordOutputUtil.HandleDecimal(Convert.ToString(score_change), 2);
            }
            else
            {
                result = "劣化" + WordOutputUtil.HandleDecimal(Convert.ToString(Math.Abs(score_change)), 2);
            }

            return result;
        }

        /// <summary>
        /// 根据轮子排名，取得排名描述
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Rank_Change(int rank, int lastrank)
        {
            string result = "";
            int rank_change = rank - lastrank;
            if (rank_change == 0)
            {
                result = "持平";
            }
            else if (rank_change <= 0)
            {
                result = "提升" + Convert.ToString(Math.Abs(rank_change)) + "名";
            }
            else
            {
                result = "下降" + Convert.ToString(rank_change) + "名";
            }

            return result;
        }

        /// <summary>
        /// 根据轮子排名，取得排名描述
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Rank_Disc(int rank)
        {
            string resualt = "";
            if (rank >= 1 && rank <= 5)
            {
                resualt = "突出";
            }
            else if (rank >= 6 && rank <= 10)
            {
                resualt = "好";
            }
            else if (rank >= 11 && rank <= 15)
            {
                resualt = "较好";
            }
            else if (rank >= 16 && rank <= 21)
            {
                resualt = "中等";
            }
            else if (rank >= 22 && rank <= 26)
            {
                resualt = "中下";
            }
            else
            {
                resualt = "较低";
            }
            return resualt;
        }

        /// <summary>
        /// 全国册第一部分“质量综合指数变化较大的省”，指标劣化、提升的变化值，本期-上期
        /// </summary>
        /// <param name="sdiName"></param>
        /// <param name="score"></param>
        /// <param name="lasT_SCORE"></param>
        /// <returns></returns>
        public static string CHANGE_MARGIN1(string sdiName, double score, double lasT_SCORE, string unit)
        {
            string result = "";
            decimal temp = Math.Round((decimal)Math.Abs(score - lasT_SCORE), 2, MidpointRounding.AwayFromZero);
            // 比值指标
            if (sdiName.Contains("%") | sdiName.Contains("满意度") | sdiName.Contains("万用户投诉比") | sdiName.Contains("万投比"))
            {
                if (sdiName.Contains("满意度") | sdiName.Contains("万用户投诉比") | sdiName.Contains("万投比"))
                {
                    result = temp.ToString();
                }
                else
                {
                    result = temp.ToString() + "pp";
                }
            }
            // 非比值指标
            else
            {
                result = temp.ToString() + unit;
            }
            return result;
        }

        /// <summary>
        /// 相比上季指标变化描述
        /// </summary>
        /// <param name="sdiName"></param>
        /// <param name="changE_LIMIT"></param>
        /// <param name="score"></param>
        /// <param name="lasT_SCORE"></param>
        /// <param name="IISPositive"></param>
        /// <returns></returns>
        public static string CHANGE_DIS(string sdiName, string changE_LIMIT, double score, double lasT_SCORE, string IISPositive, int rankChangeFlag)
        {
            double i_LIMIT = 0;
            string resualt = "";
            string result1 = rankChangeFlag == 1 ? "劣化明显" : "劣化";
            string result2 = rankChangeFlag == 1 ? "改善明显" : "提升";
            string result3 = rankChangeFlag == 1 ? "变化不大" : "持平";
            // 比值指标
            if (sdiName.Contains("%") | sdiName.Contains("满意度") | sdiName.Contains("万用户投诉比") | sdiName.Contains("万投比"))
            {
                if (sdiName.Contains("满意度") | sdiName.Contains("万用户投诉比") | sdiName.Contains("万投比"))
                {
                    //阈值为0.01
                    if (changE_LIMIT == string.Empty)
                        i_LIMIT = 0.01;
                    else
                        i_LIMIT = Convert.ToDouble(changE_LIMIT);
                }
                else
                {
                    //阈值为0.01*100=1(默认值)
                    if (changE_LIMIT == string.Empty)
                        i_LIMIT = 1;
                    else
                        i_LIMIT = Convert.ToDouble(changE_LIMIT) * 100;
                }
                //正向指标
                if (IISPositive == "0")
                {
                    if (score - lasT_SCORE <= -i_LIMIT)
                        resualt = result1;
                    else if (score - lasT_SCORE >= i_LIMIT)
                        resualt = result2;
                    else
                        resualt = result3;

                }
                //反向指标
                else if (IISPositive == "1")
                {
                    if (score - lasT_SCORE <= -i_LIMIT)
                        resualt = result2;
                    else if (score - lasT_SCORE >= i_LIMIT)
                        resualt = result1;
                    else
                        resualt = result3;

                }
            }
            // 非比值指标，阈值为0.01(默认值)
            else
            {

                if (changE_LIMIT == string.Empty)
                    i_LIMIT = 0.01;
                else
                    i_LIMIT = Convert.ToDouble(changE_LIMIT);

                //正向指标
                if (IISPositive == "0")
                {
                    // 如果上季指标不为0
                    if (lasT_SCORE != 0)
                    {
                        if (score / lasT_SCORE - 1 <= -i_LIMIT)
                            resualt = result1;
                        else if (score / lasT_SCORE - 1 >= i_LIMIT)
                            resualt = result2;
                        else
                            resualt = result3;
                    }
                    //如果上季指标为0
                    else
                    {
                        //正向指标
                        if (score - lasT_SCORE <= -i_LIMIT)
                            resualt = result1;
                        else if (score - lasT_SCORE >= i_LIMIT)
                            resualt = result2;
                        else
                            resualt = result3;
                    }

                }
                //反向指标
                else if (IISPositive == "1")
                {
                    // 如果上季指标不为0
                    if (lasT_SCORE != 0)
                    {
                        if (score / lasT_SCORE - 1 <= -i_LIMIT)
                            resualt = result2;
                        else if (score / lasT_SCORE - 1 >= i_LIMIT)
                            resualt = result1;
                        else
                            resualt = result3;
                    }
                    //如果上季指标为0
                    else
                    {
                        //正向指标
                        if (score - lasT_SCORE <= -i_LIMIT)
                            resualt = result2;
                        else if (score - lasT_SCORE >= i_LIMIT)
                            resualt = result1;
                        else
                            resualt = result3;
                    }

                }
            }
            return resualt;
        }


        /// <summary>
        /// 根据指标省份数目及排名，取得相对排名描述
        /// </summary>
        /// <param name="pro_num"></param>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string GetUnit(string unitName, string noUnitName)
        {
            string indNameWithoutUnit = noUnitName;
            string indUnit = unitName.Replace(indNameWithoutUnit, "");
            return indUnit;
        }

        /// <summary>
        /// 根据指标省份数目及排名，取得相对排名描述
        /// </summary>
        /// <param name="pro_num"></param>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string ORDER_REL(int pro_num, int rank)
        {
            string resualt = "";
            if (pro_num >= 26)
            {
                if (rank >= 1 && rank <= 5)
                {
                    resualt = "突出";
                }
                else if (rank >= 6 && rank <= 10)
                {
                    resualt = "好";
                }
                else if (rank >= 11 && rank <= 15)
                {
                    resualt = "较好";
                }
                else if (rank >= 16 && rank <= 21)
                {
                    resualt = "中等";
                }
                else if (rank >= 22 && rank <= 25)
                {
                    resualt = "中下";
                }
                else
                {
                    resualt = "较低";
                }
            }
            else if (pro_num < 26 && pro_num >= 20)
            {
                if (rank >= 1 && rank <= 4)
                {
                    resualt = "较好";
                }
                else if (rank >= 5 && rank <= 9)
                {
                    resualt = "中上";
                }
                else if (rank >= 10 && rank <= 16)
                {
                    resualt = "中等";
                }
                else if (rank >= 17 && rank <= 21)
                {
                    resualt = "中下";
                }
                else if (rank >= 22 && rank <= 25)
                {
                    resualt = "较低";
                }
            }
            else if (pro_num < 20 && pro_num >= 14)
            {
                if (rank >= 1 && rank <= 4)
                {
                    resualt = "较好";
                }
                else if (rank >= 5 && rank <= 10)
                {
                    resualt = "中等";
                }
                else if (rank >= 11 && rank <= 15)
                {
                    resualt = "中下";
                }
                else if (rank >= 16 && rank <= 19)
                {
                    resualt = "较低";
                }
            }
            else if (pro_num < 14)
            {
                if (rank >= 1 && rank <= 4)
                {
                    resualt = "较好";
                }
                else if (rank >= 5 && rank <= 9)
                {
                    resualt = "中等";
                }
                else if (rank >= 10 && rank <= 13)
                {
                    resualt = "较低";
                }
            }
            return resualt;
        }

        /// <summary>
        /// 把字符串转换为数字
        /// <param name="origData">原始数据</param>
        /// /// </summary>
        public static string ConvertToInt(string origData)
        {
            return string.IsNullOrEmpty(origData) ? "" : Convert.ToInt32(origData).ToString();
        }

        /// <summary>
        /// 判断字符串是否是数字
        /// <param name="origData">原始数据</param>
        /// /// </summary>
        public static bool IsNumber(string origData)
        {
            try
            {
                Double idata = Convert.ToDouble(origData);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        /// <summary>
        /// 把数字转换成中文
        /// <param name="index">原始数据</param>
        /// /// </summary>
        public static string NumericToChinese(int index)
        {
            string[] num = { "零", "一", "两", "三", "四", "五", "六", "七", "八", "九", "十" };
            return num[index];
        }

        /// <summary>
        /// 把数字转换成中文
        /// <param name="index">原始数据</param>
        /// /// </summary>
        public static string NumericToChinese1(int index)
        {
            string[] num = { "", "", "两", "三", "四", "五", "六", "七", "八", "九", "十" };
            return num[index];
        }

        /// <summary>
        /// 把数字转换成中文
        /// <param name="index">原始数据</param>
        /// /// </summary>
        public static string NumericToChinese2(int index)
        {
            string[] num = { "", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二" };
            return num[index];
        }

        /// <summary>
        /// 清空某个目录下的全部文件
        /// </summary>
        public static void ClearDirectory(string path)
        {
            if (Directory.Exists(path) == false)//如果目录不存在就创建
            {
                Directory.CreateDirectory(path);
            }
            foreach (string d in Directory.GetFileSystemEntries(path))
            {
                if (File.Exists(d))
                {
                    FileInfo fi = new FileInfo(d);
                    if (fi.Attributes.ToString().IndexOf("ReadOnly") != -1)
                        fi.Attributes = FileAttributes.Normal;
                    File.Delete(d);//直接删除其中的文件  
                }
            }
        }

        /// <summary>
        /// 处理表格中获取到的字符串
        /// </summary>
        public static string transformExcelData(string excelData)
        {
            string res = "";
            if (excelData == "\\" || excelData == "-")
            {
                res = "";
            }
            else
                res = excelData;

            return res;
        }

        /// <summary>
        /// 根据轮子排名，取得排名描述
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Rank_Disc1(int rank)
        {
            string result = "";
            if (rank >= 1 && rank <= 5)
            {
                result = "突出";
            }
            else if (rank >= 6 && rank <= 10)
            {
                result = "好";
            }
            else if (rank >= 11 && rank <= 15)
            {
                result = "较好";
            }
            else if (rank >= 16 && rank <= 21)
            {
                result = "中等";
            }
            else if (rank >= 22 && rank <= 26)
            {
                result = "中下";
            }
            else
            {
                result = "较差";
            }
            return result;
        }

        /// <summary>
        /// 根据轮子排名和变化，取得排名描述备注
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Rank_Disc2(int rank, int rankChange)
        {
            string result = "";
            if (rank >= 1 && rank <= 5)
            {
                if (rankChange <= -3)
                    result = "相比上期有所进步";
                else
                    result = "保持全国领先的优势";
            }
            else if (rank >= 6 && rank <= 21)
            {
                if (rankChange <= -3)
                    result = "相比上期有所进步";
                else if (rankChange >= 3)
                    result = "相比上期有所退步";
                else
                    result = "保持平稳";
            }
            else if (rank >= 22 && rank <= 31)
            {
                if (rankChange <= -3)
                    result = "相比上期有所进步";
                else
                    result = "且未有明显改善";
            }
            return result;
        }

        /// <summary>
        /// 根据轮子总分，取得得分变化描述
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Score_Change2(double score, double lastScore)
        {
            string result = "";
            double score_change = score - lastScore;
            if (score_change > 0 && score_change < 3)
            {
                result = "有小幅提升";
            }
            else if (score_change <= 8 && score_change >= 3)
            {
                result = "有一定提升";
            }
            else if (score_change > 8)
            {
                result = "有明显提升";
            }
            else if (score_change > -3 && score_change < 0)
            {
                result = "有小幅下降";
            }
            else if (score_change <= -3 && score_change >= -8)
            {
                result = "有一定下降";
            }
            else if (score_change < -8)
            {
                result = "有明显下降";
            }
            else if (score_change == 0)
            {
                result = "和上期持平";
            }

            return result;
        }

        /// <summary>
        /// 根据本期上期排名变化，取得描述
        /// </summary>
        /// <param name="rank"></param>
        /// <returns></returns>
        public static string Rank_Change(int rank_change)
        {
            string result = "";
            if (rank_change == 0)
            {
                result = "和上期持平";
            }
            else if (rank_change > 0)
            {
                result = "较上期下降" + rank_change + "名";
            }
            else
            {
                result = "较上期提升" + Math.Abs(rank_change) + "名";
            }

            return result;
        }

        public static string Rank_Disc3(int rank)
        {
            string res = string.Empty;
            if (rank == 0)
                res = "持平";
            else if (rank < 0)
                res = "下降" + Math.Abs(rank) + "名";
            else
                res = "提升" + rank + "名";
            return res;
        }

        /// <summary>
        /// 删除字符串最后一个标点符号的方法
        /// </summary>
        public static string DeleteLastCharacter(string oriString)
        {
            return oriString.Length > 0 ? oriString.Remove(oriString.Length - 1, 1) : "";
        }
    }
    /*************************************************************************
     * 文件名称 ：WordOutputUtil.cs                          
     * 描述说明 ：操作Word输出类
     * 
     * 创建信息 : create by QQ：815657032、709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * 修订信息 : modify by (person) on (date) for (reason)
     * 
     * 版权信息 : Copyright (c) 2009 Angel工作室 www.angelasp.com
     **************************************************************************
     */
}
