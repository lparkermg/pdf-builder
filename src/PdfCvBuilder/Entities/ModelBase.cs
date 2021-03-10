using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PdfCvBuilder.Entities
{
    public class ModelBase
    {
        public ModelBase(DateTime now)
        {
            GeneratedOn = now;
        }

        public DateTime GeneratedOn { get; init; }
    }
}
