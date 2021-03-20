using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PdfCvBuilder.Entities
{
    internal struct CvConfiguration
    {
        public TemplateType Template { get; init; }

        public ThemeType Theme { get; init; }

        public string DataFilePath { get; init; }
    }
}
