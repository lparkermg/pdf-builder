namespace PdfBuilder.Api.Models.Request
{
    public class CvRequest
    {
        public int Template { get; set; }

        public int Theme { get; set; }

        public string[] Content { get; set; } = [];

        public string[] Sidebar { get; set; } = [];
    }
}
