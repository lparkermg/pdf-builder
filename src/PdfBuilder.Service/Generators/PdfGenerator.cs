using PdfBuilder.Common.FileSystem;
using PuppeteerSharp;
using RazorEngineCore;

namespace PdfBuilder.Service.Generators
{
    public class PdfGenerator(IFileSystem fs)
    {
        private readonly IFileSystem _fs = fs;

        public async Task<string> Generate(GeneralModel model, string templateData, string themeData)
        {
            var razorEngine = new RazorEngine();
            var template = await razorEngine.CompileAsync<RazorEngineTemplateBase<GeneralModel>>(templateData);
            var html = await template.RunAsync(i => i.Model = model);
            html = html.Replace("csstheme/file", themeData);
            var browserFetcher = new BrowserFetcher();
            await browserFetcher.DownloadAsync();
            // TODO: Change this up to keep the browser running, while the service is running and only handle pages in this section of the code.
            await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true, Args = new[] { "--no-sandbox" } });
            await using var page = await browser.NewPageAsync();
            await page.EmulateMediaTypeAsync(PuppeteerSharp.Media.MediaType.Screen);
            await page.SetContentAsync(html);
            await page.EvaluateExpressionHandleAsync("document.fonts.ready"); // Wait for fonts to be loaded. Omitting this might result in no text rendered in pdf.
            var filePath = $"{Guid.NewGuid()}.pdf";
            var data = await page.PdfDataAsync(new PdfOptions { PrintBackground = true });
            if(!await _fs.SaveFile(filePath, data))
            {
                await browser.CloseAsync();
                return string.Empty;
            }

            await browser.CloseAsync();
            return filePath;
        }
    }
}
