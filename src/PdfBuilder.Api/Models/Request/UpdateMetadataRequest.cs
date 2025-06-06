using System.Text.Json.Nodes;

namespace PdfBuilder.Api.Models.Request

{
    public class UpdateMetadataRequest
    {
        public string Id { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public JsonObject Content { get; set; }
    }
}
