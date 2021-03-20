using PdfCvBuilder.Entities;
using RazorEngineCore;
using SelectPdf;
using System;
using System.IO;
using System.Text.RegularExpressions;

namespace PdfCvBuilder
{
    internal sealed class CvGeneratorService
    {
        private const RegexOptions RegexpOptions = RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.Multiline;
        private readonly CvConfiguration _configuration;
        private readonly string _templateBasePath;

        public CvGeneratorService(CvConfiguration config, string templateBasePath)
        {
            _configuration = config;
            _templateBasePath = templateBasePath;
        }
        public void Build<T>(GeneralModel model)
        {
            var templateText = File.ReadAllText(Path.Combine(_templateBasePath, $"{_configuration.Template}Template.cshtml"));
            // TODO: Build the CV based on Theme and Template.
            var razorEngine = new RazorEngine();
            var template = razorEngine.Compile<RazorEngineTemplateBase<GeneralModel>>(templateText);
            var processedHtml = template.Run(i => i.Model = model);
            processedHtml = processedHtml.Replace("csstheme/file", File.ReadAllText(model.ThemePath));

            var converter = new HtmlToPdf();
            converter.Options.MarginTop = 10;
            converter.Options.MarginBottom = 5;
            converter.Options.MarginLeft = 5;
            converter.Options.MarginRight = 5;

            var doc = converter.ConvertHtmlString(processedHtml);
            doc.Save(Path.Combine("output", $"{DateTime.Now.ToString("ddMMyyyy")}-{_configuration.Template}.pdf"));
            doc.Close();
        }
    }
}
