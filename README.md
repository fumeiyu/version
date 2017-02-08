项目必备，Newtonsoft.Json.DLL 移植到其他项目，移植Common.Version.DLL, versionAppSetting.json 以及TestVersions下面的_version 目录
配置扫描文件扩展名 versionAppSetting.json 【不需要添加.符号】 
生成文件的目录为LogFiles\Version newVersionFile.TXT 最后更新的文件json列表

webconfig  配置  system.webServer 节点下
 <handlers>
      <add path="_version/*.ashx" name="ashx" verb="*" type="Common.Version.VersionHandler,Common.Version" ></add>
    </handlers>
