using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPOI.SS.UserModel;

namespace Angel.ExcelHelper
{
    public class ExcelModel
    {
        /// <summary>
        /// 行索引
        /// </summary>
        public int RowIndex { get; set; }
        /// <summary>
        /// 对应数据源的列名
        /// </summary>
        public string ColumnName { get; set; }
        /// <summary>
        /// 对应excel中的列索引
        /// </summary>
        public int ColumnIndex { get; set; }
        /// <summary>
        /// 对应excel中的列类型
        /// </summary>
        public CellType ColumnType { get; set; }
        /// <summary>
        /// 对应excel中的列样式
        /// </summary>
        public ICellStyle ColumnStyle { get; set; }
        /// <summary>
        /// 对应excel中的列的背景色
        /// </summary>
        public string BgColor { get; set; }
        /// <summary>
        /// 对应excel中的列的字体样式
        /// </summary>
        public string FontSize { get; set; }
        /// <summary>
        /// 设置列值的类型，0：直接替换，1：行循环替换，2：列循环
        /// </summary>
        public int SetValueType { get; set; }
        /// <summary>
        /// excel模板中原有的值
        /// </summary>
        public string OldValue { get; set; }
        /// <summary>
        /// 对应数据集合第几行数据
        /// </summary>
        public int DataIndex { get; set; }
    }
}