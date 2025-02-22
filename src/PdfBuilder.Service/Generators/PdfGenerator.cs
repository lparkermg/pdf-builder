using iText.Html2pdf;
using iText.Kernel.Pdf;
using RazorEngineCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PdfBuilder.Service.Generators
{
    public class PdfGenerator
    {
        public async Task<byte[]> Generate(GeneralModel model, string templateData, string themeData)
        {
            var razorEngine = new RazorEngine();
            var template = await razorEngine.CompileAsync<RazorEngineTemplateBase<GeneralModel>>(templateData);
            var html = await template.RunAsync(i => i.Model = model);
            html = html.Replace("csstheme/file", themeData);
            File.WriteAllText("./temp.html", html);

            HtmlConverter.ConvertToPdf(new FileInfo("./temp.html"), new FileInfo("./temp.pdf"));

            var data = await File.ReadAllBytesAsync("./temp.pdf");

            File.Delete("./temp.html");
            File.Delete("./temp.pdf");
            return data;
        }
    }
}
