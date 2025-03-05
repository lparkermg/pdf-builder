namespace PdfBuilder.Common.Models
{
    public class MetadataItem
    {
        public string Title { get; set; } = string.Empty;

        public string Id { get; set; } = string.Empty;

        public DateTime LastModifiedAt { get; set; }
    }
}
