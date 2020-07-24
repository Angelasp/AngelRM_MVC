using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Text;

namespace Angel.Core.ParamTransfer
{
    /// <summary>
    /// API返回Json格式数据时，使用的序列化类
    /// </summary>
    public class JsonParamSerialization : MediaTypeFormatter
    {
        public override bool CanReadType(Type type)
        {
            throw new NotImplementedException();
        }
        public override bool CanWriteType(Type type)
        {
            throw new NotImplementedException();
        }
        public override System.Threading.Tasks.Task<object> ReadFromStreamAsync(Type type, System.IO.Stream readStream, System.Net.Http.HttpContent content, IFormatterLogger formatterLogger)
        {
            return base.ReadFromStreamAsync(type, readStream, content, formatterLogger);
        }
        public override System.Threading.Tasks.Task WriteToStreamAsync(Type type, object value, System.IO.Stream writeStream, System.Net.Http.HttpContent content, System.Net.TransportContext transportContext)
        {
            return base.WriteToStreamAsync(type, value, writeStream, content, transportContext);
        }
    }
}
