namespace PdfBuilder.Api.Models.Request
{
    public class NewMetadataRequest
    {
        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;
    }
}
