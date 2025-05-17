namespace PdfBuilder.Common.FileSystem
{
    public interface IFileSystem
    {
        bool TryGetFile(string fileName, out byte[] fileData);

        Task<bool> SaveFile(string fileName, byte[] data, bool updatingFile = false);
    }
}
