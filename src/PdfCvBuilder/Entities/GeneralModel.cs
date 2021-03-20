using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PdfCvBuilder.Entities
{
    public sealed class GeneralModel
    {
        public GeneralModel(DateTime now, string themePath, params string[] content)
        {
            GeneratedOn = now;
            Content = content;
            ThemePath = themePath;
        }

        public DateTime GeneratedOn { get; init; }

        public string[] Content { get; init; }

        public string ThemePath { get; init; }
    }
}
