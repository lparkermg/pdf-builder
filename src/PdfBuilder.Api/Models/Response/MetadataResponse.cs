namespace PdfBuilder.Api.Models.Response
{
    public class MetadataResponse
    {
        public IList<MetadataItemResponse> Metadata { get; set; } = [];
    }

    public class MetadataItemResponse
    {
        public string Title { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
        public DateTime LastModifiedAt { get; set; }
    }
}
