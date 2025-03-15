namespace PdfBuilder.Api.Configuration
{
    public class ApiOptions
    {
        public required Uri ServiceUri { get; set; }

        public required Uri SaveServiceUri { get; set; }
    }
}
