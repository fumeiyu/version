using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Common.Version
{
    public class VersionHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string op = context.Request.QueryString["_op"];
            var w = context.Response;
            var r = context.Request;
            if (op == "Scan")
            {

                string lastread = VersionFileHelper.Read("newVersionFile.txt");
                List<FileVersion> lastfilelist;
                if (lastread == "")
                {
                    lastfilelist = new List<FileVersion>();
                }
                else
                {
                    lastfilelist = Newtonsoft.Json.JsonConvert.DeserializeObject<List<FileVersion>>(lastread);
                }
                //获取配置文件
                Common.Version.VersionCheck v = new VersionCheck(context.Server.MapPath("~/"), null, VersionSetting.Instance().incudeFileExtension, lastfilelist);
                List<FileVersion> all;
                var news = v.getAllFileList(out all);
                var result = new
                {
                    AllFile = all,
                    NewFile = news,
                    length = context.Server.MapPath("~/").Length
                };
                w.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result));
                //w.Write()
            }
            if (op == "Save")
            {
                byte[] b = new byte[r.InputStream.Length];

                r.InputStream.Read(b, 0, b.Length);
                string x = System.Text.Encoding.UTF8.GetString(b);

                var json = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(x);


                //定义2个变量
                String versionFile = "VersionList.txt";
                string lastFile = "newVersionFile.txt";
                String newName = DateTime.Now.ToString("yyyy-MM-ddHHmmss") + ".txt";

                //先保存所有以及更新目录

                //先更新本次文件内容
                String lastdate = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                foreach (var t in json.AllFile)
                {
                    if (t.LastVersion == null || t.LastVersion == "")
                    {
                        t.LastUpdateDate = lastdate;
                        t.LastVersion = json.version;
                    }
                }
                foreach (var t in json.NewFile)
                {
                    t.LastUpdateDate = lastdate;
                    t.LastVersion = json.version;
                }
                VersionFileHelper.Write(lastFile, Newtonsoft.Json.JsonConvert.SerializeObject(json.AllFile), false);

                VersionFileHelper.Write(newName, Newtonsoft.Json.JsonConvert.SerializeObject(json), false);

                var version = new
                {
                    version = json.version,
                    remark = json.remark,
                    date = lastdate,
                    length = json.NewFile.Count,
                    file = newName
                };
                VersionFileHelper.Write(versionFile, Newtonsoft.Json.JsonConvert.SerializeObject(version) + ",", true);
                w.Write("操作成功");

                //  w.Write(json.version);
                // w.Write(json.remark);
                //  w.Write(json.AllFile.Count);

                //保存文件


                //



                //string version = r["version"];
                //string remark = r["remark"];
                //string json = r["json"];

            }
            if (op == "GetList")
            {
                string lastread = VersionFileHelper.Read("VersionList.txt");

                w.Write("[" + lastread.TrimEnd(',') + "]");

            }
            if (op == "Get")
            {
                string file = r.QueryString["file"];
                string lastread = VersionFileHelper.Read(file);
                var x = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(lastread);
                x.length = context.Server.MapPath("~/").Length;
                w.Write(Newtonsoft.Json.JsonConvert.SerializeObject(x));
            }
            context.Response.End();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }

}