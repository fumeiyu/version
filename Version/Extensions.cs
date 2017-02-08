using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Version
{
    public static class Extensions
    {
        public static string ToFileHash(this FileInfo file)
        {
            var hash = System.Security.Cryptography.HashAlgorithm.Create();
            var stream_1 = new System.IO.FileStream(file.FullName, System.IO.FileMode.Open,FileAccess.Read,  FileShare.Read);
            using (stream_1) {
                try {
                    return BitConverter.ToString(hash.ComputeHash(stream_1));
                }
                catch(Exception ex) {
                    stream_1.Close();
                    throw ex;
                }
            }

        }
    }
}
