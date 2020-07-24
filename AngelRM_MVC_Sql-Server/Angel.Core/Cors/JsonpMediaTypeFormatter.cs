using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

using Newtonsoft.Json;
using System.Runtime.InteropServices;

namespace Angel.Core.Cors
{
    public class JsonpMediaTypeFormatter : JsonMediaTypeFormatter
    {
        public string CallBack { get; private set; }
        public JsonpMediaTypeFormatter(string callback = null) 
        {
            this.CallBack = callback;
        }
        public override MediaTypeFormatter GetPerRequestFormatterInstance(Type type, System.Net.Http.HttpRequestMessage request, System.Net.Http.Headers.MediaTypeHeaderValue mediaType)
        {
            string callback;
            if (request.GetQueryNameValuePairs().ToDictionary(pari => pari.Key, pari => pari.Value).TryGetValue("callback", out callback)) 
            {
                return new JsonpMediaTypeFormatter(callback);
            }
            return this;
        }

        public override Task WriteToStreamAsync(Type type, object value, System.IO.Stream writeStream, HttpContent content, System.Net.TransportContext transportContext)
        {
            if(string.IsNullOrEmpty(CallBack))
                return base.WriteToStreamAsync(type, value, writeStream, content, transportContext);
            try
            {
                this.WriteToStream(type, value, writeStream, content);
                return Task.FromResult<AsynVoid>(new AsynVoid());
            }
            catch (Exception er) 
            {
                TaskCompletionSource<AsynVoid> source = new TaskCompletionSource<AsynVoid>();
                source.SetException(er);
                return source.Task;
            }

        }
        private void WriteToStream(Type type, object value, System.IO.Stream writeStream, HttpContent content) 
        {
            JsonSerializer serializer = JsonSerializer.Create(this.SerializerSettings);
            using(System.IO.StreamWriter write = new System.IO.StreamWriter(writeStream,this.SupportedEncodings.First()))
            using (JsonTextWriter jsonWriter = new JsonTextWriter(write) { CloseOutput = false }) 
            {
                jsonWriter.WriteRaw(this.CallBack + "(");
                if (value.GetType() == typeof(string))
                    jsonWriter.WriteRawValue(value.ToString());
                else
                    serializer.Serialize(jsonWriter, value);
                jsonWriter.WriteRaw(")");
            }
        }
        [StructLayout( LayoutKind.Sequential,Size=1)]
        private struct AsynVoid { }
    }

}
