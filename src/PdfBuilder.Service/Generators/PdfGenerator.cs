using PdfBuilder.Common.FileSystem;
using PuppeteerSharp;
using RazorEngineCore;

namespace PdfBuilder.Service.Generators
{
    public class PdfGenerator:IDisposable
    {
        private readonly IFileSystem _fs;
        private readonly IBrowser _browser;

        public PdfGenerator(IFileSystem fs)
        {
            _fs = fs;
            var browserFetcher = new BrowserFetcher();
            browserFetcher.DownloadAsync(BrowserTag.Stable).Wait();

            _browser = Puppeteer.LaunchAsync(new LaunchOptions { Headless = true, Args = new[] { "--no-sandbox" } }).Result;
        }
        public void Dispose()
        {
            _browser.CloseAsync().Wait();
            _browser.Dispose();
        }

        public async Task<string> Generate(GeneralModel model, string templateData, string themeData)
        {
            var razorEngine = new RazorEngine();
            var template = await razorEngine.CompileAsync<RazorEngineTemplateBase<GeneralModel>>(templateData);
            var html = await template.RunAsync(i => i.Model = model);
            html = html.Replace("csstheme/file", themeData);
            
            // TODO: Change this up to keep the browser running, while the service is running and only handle pages in this section of the code.
            using var page = await _browser.NewPageAsync();
            await page.EmulateMediaTypeAsync(PuppeteerSharp.Media.MediaType.Screen);
            await page.SetContentAsync(html);
            await page.EvaluateExpressionHandleAsync("document.fonts.ready"); // Wait for fonts to be loaded. Omitting this might result in no text rendered in pdf.
            var filePath = $"{Guid.NewGuid()}.pdf";
            var data = await page.PdfDataAsync(new PdfOptions { PrintBackground = true });
            if(!await _fs.SaveFile(filePath, data))
            {
                return string.Empty;
            }

            await page.CloseAsync(new PageCloseOptions { RunBeforeUnload = true });
            return filePath;
        }
    }
}
