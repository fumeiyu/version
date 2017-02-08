using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Version
{
    public class VersionSetting
    {
        static VersionSetting version;
        //  public string[] ingoreFileExtension;
        public string[] incudeFileExtension;
        public static VersionSetting Instance() {
            if (version == null) {
                 version= Newtonsoft.Json.JsonConvert.DeserializeObject<VersionSetting>( VersionFileHelper.Read(   System.AppDomain.CurrentDomain.BaseDirectory + "/bin/versionAppSetting.json"));
            }
            return version;
        }
    }
}
