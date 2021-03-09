using System;
using System.IO;
using System.Linq;

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
    }
}
