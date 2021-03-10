using PdfCvBuilder.Entities;
using RazorEngineCore;
using SelectPdf;
using System;
using System.IO;

namespace PdfCvBuilder
{
    internal sealed class CvGeneratorService
    {
        private readonly CvConfiguration _configuration;
        private readonly string _templateBasePath;

        public CvGeneratorService(CvConfiguration config, string templateBasePath)
        {
            _configuration = config;
            _templateBasePath = templateBasePath;
        }
        public void Build<T>(T model)
        {
            var templateText = File.ReadAllText(Path.Combine(_templateBasePath, $"{_configuration.Template}Template.cshtml"));
            // TODO: Build the CV based on Theme and Template.
            var razorEngine = new RazorEngine();
            var template = razorEngine.Compile<RazorEngineTemplateBase<T>>(templateText);
            var processedHtml = template.Run(i => i.Model = model);

            var converter = new HtmlToPdf();
            var doc = converter.ConvertHtmlString(processedHtml);
            doc.Save(Path.Combine("output", $"{DateTime.Now.ToString("ddMMyyyy")}-{_configuration.Template}.pdf"));
            doc.Close();
        }
    }
}
