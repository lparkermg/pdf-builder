using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace PdfBuilder.Service
{
    public class AssetLoader
    {
        private readonly ILogger<AssetLoader> _logger;
        private readonly JsonSerializerOptions _serializerOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        };

        public IList<AssetManifest> ThemeManifests { get; set; } = new List<AssetManifest>();

        public IList<AssetManifest> TemplateManifests { get; set; } = new List<AssetManifest>();

        public AssetLoader(IOptions<AssetOptions> options, ILogger<AssetLoader> logger)
        {
            _logger = logger;
            LoadManifests(options.Value);
        }

        private void LoadManifests(AssetOptions options)
        {
            var themesManifest = File.ReadAllText(options.ThemesManifest);

            ThemeManifests = JsonSerializer.Deserialize<List<AssetManifest>>(themesManifest, _serializerOptions) ?? [];

            var templatesManifest = File.ReadAllText(options.TemplatesManifest);

            TemplateManifests = JsonSerializer.Deserialize<List<AssetManifest>>(templatesManifest, _serializerOptions) ?? [];

        }

        public IList<AssetManifest> GetAvailableThemes()
        {
            return ThemeManifests;
        }

        public IList<AssetManifest> GetAvailableTemplates()
        {
            return TemplateManifests;
        }

        public string LoadTheme(int id)
        {
            var theme = ThemeManifests.SingleOrDefault(x => x.Id == id);
            if (theme == null)
            {
                _logger.LogError($"Theme with id {id} not found");
                return string.Empty;
            }

            if (!File.Exists(theme.Path))
            {
                _logger.LogError($"Theme {id} file {theme.Path} not found");
                return string.Empty;
            }

            var themeData = File.ReadAllText(theme.Path);
            return themeData;
        }

        public string LoadTemplate(int id)
        {
            var template = TemplateManifests.SingleOrDefault(x => x.Id == id);
            if (template == null)
            {
                _logger.LogError($"Template with id {id} not found");
                return string.Empty;
            }

            if (!File.Exists(template.Path))
            {
                _logger.LogError($"Template {id} file {template.Path} not found");
                return string.Empty;
            }

            var templateData = File.ReadAllText(template.Path);
            return templateData;
        }
    }
}
