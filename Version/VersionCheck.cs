using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
namespace Common.Version
{
    public class VersionCheck
    {
        public string basePath;
        public string[] ingoreFileExtension;
        public string[] incudeFileExtension;
        public List<FileVersion> LastUploadFileListHash;
        public VersionCheck(string basePath, string[] ingoreFileExtension, string[] incudeFileExtension, List<FileVersion> lastUploadFileListHash)
        {
            this.basePath = basePath;
            this.incudeFileExtension = incudeFileExtension;
            this.ingoreFileExtension = ingoreFileExtension;
            this.LastUploadFileListHash = lastUploadFileListHash;
        }
        /// <summary>
        /// 返回更新的文件哈希
        /// </summary>
        /// <param name="allFileVersion">所有文件的哈希</param>
        /// <returns></returns>
        public List<FileVersion> getAllFileList(out List<FileVersion> allFileVersion) {
            allFileVersion = new List<FileVersion>();
            List<FileVersion> last = new List<FileVersion>();
            if (incudeFileExtension != null)
            {
                var files = getSearch();
                foreach (var v in files)
                {
                    FileInfo fs = new FileInfo(v);
           
                        string lastdate = fs.LastWriteTime.ToString("yyyy-MM-dd HH:mm");
                        FileVersion f = new FileVersion()
                        {
                            FullName = v,
                            //LastVersion=v.
                            ModifyDate = lastdate,
                            FileHash = fs.ToFileHash()
                        };
                        //查找是否存在 ,更新文件
                        var fileversion = LastUploadFileListHash.Find(a => { return a.FullName == f.FullName && a.FileHash == f.FileHash; });
                        if (fileversion == null)
                        {
                            last.Add(f); //添加本次更新文件
                            allFileVersion.Add(new FileVersion()
                            {
                                FileHash = f.FileHash,
                                FullName = f.FullName,
                                ModifyDate = f.ModifyDate
                            });

                        }
                        else
                        {
                            //添加到总的列表
                            allFileVersion.Add(fileversion);

                        }
                    }

              
            }
            else
            {
                throw new Exception("还未提供忽略扩展名方式");
            }
            return last;

        }

        private List<string> getSearch()
        {



            List<string> fileList = new List<string>();
            foreach (string i in incudeFileExtension)
            {
                string[] files = Directory.GetFiles(this.basePath, "*."+i, SearchOption.AllDirectories);
                fileList.AddRange(files);
            
            }
            return fileList;
        }
      
    }
}
