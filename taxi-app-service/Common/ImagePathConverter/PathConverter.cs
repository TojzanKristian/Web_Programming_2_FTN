using System.IO;

namespace Common.ImagePathConverter
{
    public class PathConverter
    {
        public string ReplacePath(string path)
        {
            string fileName = Path.GetFileName(path);
            string newFormat = $"ProfileImages/{fileName}";
            return newFormat;
        }
    }
}