using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Markdig;
using PdfBuilder.Service.Generators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PdfBuilder.Service
{
    public class CVService : CV.CVBase
    {
        private readonly AssetLoader _assetLoader;
        private readonly PdfGenerator _pdfGenerator;

        public CVService(AssetLoader assetLoader)
        {
            _assetLoader = assetLoader;
            _pdfGenerator = new PdfGenerator();
        }

        public override Task<AvailableTemplatesResponse> GetAvailableTemplates(Empty request, ServerCallContext context)
        {
            var response = new AvailableTemplatesResponse();
            var templates = _assetLoader.GetAvailableTemplates();
            foreach(var asset in templates)
            {
                response.Templates.Add(new Template
                {
                    Id = asset.Id,
                    Name = asset.Name,
                });
            }
            return Task.FromResult(response);
        }

        public override Task<AvailableThemesResponse> GetAvailableThemes(Empty request, ServerCallContext context)
        {
            var response = new AvailableThemesResponse();
            var themes = _assetLoader.GetAvailableThemes();
            foreach (var asset in themes)
            {
                response.Themes.Add(new Theme
                {
                    Id = asset.Id,
                    Name = asset.Name,
                });
            }
            return Task.FromResult(response);
        }

        public override async Task<GenerateCVResponse> GenerateCV(GenerateCVRequest request, ServerCallContext context)
        {
            var template = _assetLoader.LoadTemplate(request.Template);
            var theme = _assetLoader.LoadTheme(request.Theme);
            var content = request.Content.Select(v => Markdown.ToHtml(v)).ToArray();
            var sidebar = request.Content.Select(v => Markdown.ToHtml(v)).ToArray();
            var data = await _pdfGenerator.Generate(new GeneralModel { Content = content, Sidebar = sidebar }, template, theme);
            var response = new GenerateCVResponse();
            response.GeneratedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");
            response.PdfData = ByteString.CopyFrom(data);
            return response;
        }

    }
}
