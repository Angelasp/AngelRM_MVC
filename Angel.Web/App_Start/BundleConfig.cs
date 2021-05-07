using System.Web;
using System.Web.Optimization;

namespace Angel.Web
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {


            //压缩合并jquery插件
            var bundlejs = new ScriptBundle("~/bundles/jquerytool");
            bundlejs.Include(
                  "~/Content/themes/js/jquery-ui.custom*",
                  "~/Content/themes/js/jquery.ui.touch-punch*",
                  "~/Content/themes/js/jquery.easypiechart*",
                  "~/Content/themes/js/jquery.sparkline.index*",
                  "~/Scripts/dist/waves/waves-0.7.5/waves.s.js",
                  "~/Scripts/js/com.js",
                  "~/Scripts/js/index.js");

            var bundlecss = new StyleBundle("~/Content/stylecss");
            bundlecss.Include("~/Content/themes/css/ace.style.css", "~/Content/themes/css/ace-skins*", "~/Content/themes/css/ace-rtl.min.css");
            bundles.Add(bundlejs);
            bundles.Add(bundlecss);
            //指定优化压缩
            BundleTable.EnableOptimizations = true ;




        }
    }
}