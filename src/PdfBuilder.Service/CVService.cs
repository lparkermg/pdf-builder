using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Markdig;
using PdfBuilder.Common.FileSystem;
using PdfBuilder.Service.Generators;

namespace PdfBuilder.Service
{
    public class CVService : CV.CVBase
    {
        private readonly AssetLoader _assetLoader;
        private readonly PdfGenerator _pdfGenerator;

        public CVService(AssetLoader assetLoader, PdfGenerator generator)
        {
            _assetLoader = assetLoader;
            _pdfGenerator = generator;
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
            var pipelineBuilder = new MarkdownPipelineBuilder();
            pipelineBuilder.UseGridTables();
            pipelineBuilder.UseAutoLinks();
            var template = _assetLoader.LoadTemplate(request.Template);
            var theme = _assetLoader.LoadTheme(request.Theme);
            var content = request.Content.Select(v => $"<article>{Markdown.ToHtml(v, pipelineBuilder.Build())}</article>").ToArray();
            var sidebar = request.Sidebar.Select(v => $"<article>{Markdown.ToHtml(v, pipelineBuilder.Build())}</article>").ToArray();
            var data = await _pdfGenerator.Generate(new GeneralModel { Content = content, Sidebar = sidebar }, template, theme);
            var response = new GenerateCVResponse();
            response.GeneratedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");
            response.FileName = data;
            return response;
        }

    }
}
