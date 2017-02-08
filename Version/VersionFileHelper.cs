using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Version
{
  public  class VersionFileHelper
    {


        public  static void Write(string FileName, string Message,bool Append)
        {
            if (String.IsNullOrEmpty(FileName))
            {
                return;
            }
            FileName = getFile(FileName);
            using (FileStream fs = new FileStream(FileName, Append ? FileMode.Append : FileMode.Create, FileAccess.Write, FileShare.Write))
            {
                StreamWriter writer = new StreamWriter(fs, System.Text.Encoding.GetEncoding("UTF-8"));
                try
                {
                    writer.Write(Message);
                    writer.Flush();
                }
                catch (Exception ex)
                {
                    throw ex;

                }

                writer.Close();
            }
        }

        private static string getFile(string FileName)
        {
            string PathName = "";
            PathName = System.AppDomain.CurrentDomain.BaseDirectory + "LogFiles";
            if (!Directory.Exists(PathName))
            {
                Directory.CreateDirectory(PathName);
            }
            PathName = PathName + "/Version";
            if (!Directory.Exists(PathName))
            {
                Directory.CreateDirectory(PathName);
            }
            FileName = PathName + "/" + FileName;
            return FileName;
        }

        public static string Read(string FileName) { 
             FileName = getFile(FileName);
            if (!System.IO.File.Exists(FileName)) {
                return "";
            }
            
            using (StreamReader sr = new StreamReader(FileName))
            {
              return  sr.ReadToEnd();
            }
        }
    }
}

