using Microsoft.Extensions.Options;
using PdfBuilder.Common.FileSystem.Configuration;

namespace PdfBuilder.Common.FileSystem
{
    public class LocalFileSystem(IOptions<LocalFileSystemOptions> options) : IFileSystem
    {
        private readonly LocalFileSystemOptions _options = options.Value;

        public bool TryGetFile(string fileName, out byte[] fileData)
        {
            fileData = [];
            var file = $"{_options.BasePath}/{fileName}";
            if (string.IsNullOrWhiteSpace(fileName))
            {
                return false;
            }

            if (!File.Exists(file))
            {
                return false;
            }

            fileData = File.ReadAllBytes(file);
            return true;
            
        }

        public async Task<bool> SaveFile(string fileName, byte[] data, bool updatingFile = false)
        {
            var file = $"{_options.BasePath}/{fileName}";
            if (string.IsNullOrWhiteSpace(fileName))
            {
                return false;
            }

            if (!updatingFile && File.Exists(file))
            {
                return false;
            }

            await File.WriteAllBytesAsync(file, data);

            return true;
        }
    }
}
