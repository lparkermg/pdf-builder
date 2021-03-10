using PdfCvBuilder.Entities;
using System;
using System.IO;
using System.Linq;
using System.Text;

namespace PdfCvBuilder
{
    internal sealed class Program
    {
        private static readonly string _templatePath = ".\\Assets\\Templates\\";
        private static readonly string _themePath = ".\\Assets\\Themes\\";
        static int Main(string[] args)
        {
            // Validate template and theme paths (Exist and are populated with files).
            if(!ValidatePaths(_templatePath, _themePath))
            {
                return 1;
            }

            // Validate arguments passed in a valid (Template Type, Theme Type, Data file exists)
            if (!ValidateArguments(args, out var config))
            {
                return 1;
            }

            // Populate Template and Theme services.

            // Load selected Template + Theme

            // parse markdown data file

            // Process data to template

            // Apply theme

            // Convert html to pdf and save
            return 0;
        }

        private static bool ValidatePaths(params string[] paths)
        {
            return paths.All(p => Directory.Exists(p) && Directory.EnumerateFiles(p, "*.*").Any(p => p.EndsWith(".cshtml") || p.EndsWith(".css")));
        }

        private static bool ValidateArguments(string[] arguments, out CvConfiguration config)
        {
            config = new CvConfiguration();
            if (arguments.Length != 3)
            {
                var errorMessage = new StringBuilder($"Argument mismatch: Expected 3 arguments but provided {arguments.Length}");
                errorMessage.AppendLine();
                errorMessage.AppendLine("Usage: PdfCvBuilder.exe \"TemplateType\" \"ThemeType\" \"Data File Path\"");
                Console.WriteLine(errorMessage.ToString());
                return false;
            }

            if (!Enum.TryParse<TemplateType>(arguments[0], out var template))
            {
                var errorMessage = new StringBuilder($"TemplateType parsing error: Failed to parse {arguments[0]}.");
                errorMessage.AppendLine();
                errorMessage.AppendLine($"Available Template Types: {string.Join(", ", Enum.GetValues(typeof(TemplateType)))}");
                Console.WriteLine(errorMessage.ToString());
                return false;
            }

            if (!Enum.TryParse<ThemeType>(arguments[1], out var theme))
            {
                var errorMessage = new StringBuilder($"ThemeType parsing error: Failed to parse {arguments[1]}.");
                errorMessage.AppendLine();
                errorMessage.AppendLine($"Available Theme Types: {string.Join(", ", Enum.GetValues(typeof(ThemeType)))}");
                Console.WriteLine(errorMessage.ToString());
                return false;
            }

            if (!File.Exists(arguments[2]))
            {
                Console.WriteLine("Provided data file does not exist.");
                return false;
            }

            config = new CvConfiguration
            {
                Template = template,
                Theme = theme,
                DataFilePath = arguments[2],
            };

            return true;
        }
    }
}
