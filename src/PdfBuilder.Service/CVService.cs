using Grpc.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PdfBuilder.Service
{
    public class CVService : CV.CVBase
    {
        public override Task<GenerateCVResponse> GenerateCV(GenerateCVRequest request, ServerCallContext context)
        {
            var response = new GenerateCVResponse();
            response.GeneratedAt = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");

            return Task.FromResult(response);
        }

    }
}
