using System;
using System.Web;
using System.Collections;
namespace Angel.DataAccess
{
    /*************************************************************************
     * �ļ����� ��DataCache.cs                          
     * ����˵�� ��������صĲ�����
     * 
     * ������Ϣ : create by QQ��815657032��709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * �޶���Ϣ : modify by (person) on (date) for (reason)
     * 
     * ��Ȩ��Ϣ : Copyright (c) 2009 Angel������ www.angelasp.com
     **************************************************************************
     */
    public class DataCache
	{
		/// <summary>
		/// ��ȡ��ǰӦ�ó���ָ��CacheKey��Cacheֵ
		/// </summary>
		/// <param name="CacheKey"></param>
		/// <returns></returns>
		public static object GetCache(string CacheKey)
		{
			System.Web.Caching.Cache objCache = HttpRuntime.Cache;
			return objCache[CacheKey];
		}

		/// <summary>
		/// ���õ�ǰӦ�ó���ָ��CacheKey��Cacheֵ
		/// </summary>
		/// <param name="CacheKey"></param>
		/// <param name="objObject"></param>
		public static void SetCache(string CacheKey, object objObject)
		{
			System.Web.Caching.Cache objCache = HttpRuntime.Cache;
			objCache.Insert(CacheKey, objObject);
		}

		/// <summary>
		/// ���õ�ǰӦ�ó���ָ��CacheKey��Cacheֵ
		/// </summary>
		/// <param name="CacheKey"></param>
		/// <param name="objObject"></param>
		public static void SetCache(string CacheKey, object objObject, DateTime absoluteExpiration,TimeSpan slidingExpiration )
		{
			System.Web.Caching.Cache objCache = HttpRuntime.Cache;
			objCache.Insert(CacheKey, objObject,null,absoluteExpiration,slidingExpiration);
    
		}
        /// <summary>
        /// �Ƴ�ָ��CacheKey
        /// </summary>
        public static void Remove(string CacheKey)
        {
            System.Web.Caching.Cache objCache = HttpRuntime.Cache;
            objCache.Remove(CacheKey);
        }
        /// <summary>
        /// �Ƴ�CacheKey
        /// </summary>
        public static void RemoveAll()
        {
            System.Web.Caching.Cache _cache = HttpRuntime.Cache;
            IDictionaryEnumerator CacheEnum = _cache.GetEnumerator();
            ArrayList al = new ArrayList();
            while (CacheEnum.MoveNext())
            {
                al.Add(CacheEnum.Key);
            }
            foreach (string key in al)
            {
                _cache.Remove(key);
            }
        }
	}
    /*************************************************************************
     * �ļ����� ��DataCache.cs                          
     * ����˵�� ��������صĲ�����
     * 
     * ������Ϣ : create by QQ��815657032��709047174  E-mail:Angel_asp@126.com on 2016-06-10
     * �޶���Ϣ : modify by (person) on (date) for (reason)
     * 
     * ��Ȩ��Ϣ : Copyright (c) 2009 Angel������ www.angelasp.com
     **************************************************************************
     */
}
