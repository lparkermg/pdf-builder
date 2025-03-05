using Grpc.Core;
using PdfBuilder.Common.FileSystem;
using PdfBuilder.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace PdfBuilder.SaveService
{
    public class SaveService(IFileSystem fs) : Save.SaveBase
    {
        private readonly IFileSystem _fs = fs;
        public override async Task<SaveResponse> Save(SaveRequest request, ServerCallContext context)
        {
            var response = new SaveResponse();
            var id = Guid.NewGuid();
            if(!string.IsNullOrWhiteSpace(request.Id))
            {
                id = Guid.Parse(request.Id);
            }

            var fileName = $"{id}.dat";
            var fileData = Encoding.UTF8.GetBytes(request.Content);
            if (!await _fs.SaveFile(fileName, fileData))
            {
                response.Id = Guid.Empty.ToString();
                return response;
            }

            if (_fs.TryGetFile("metadata.meta", out var metaData))
            {
                var data = JsonSerializer.Deserialize<IList<MetadataItem>>(Encoding.UTF8.GetString(metaData));

                if (data != null && data.Any(d => d.Id.Equals(id.ToString(), StringComparison.CurrentCultureIgnoreCase)))
                {
                    var dataItem = data.Single(d => d.Id.Equals(id.ToString(), StringComparison.CurrentCultureIgnoreCase));
                    dataItem.LastModifiedAt = DateTime.UtcNow;
                }
                else
                {
                    data.Add(new MetadataItem
                    {
                        Id = id.ToString(),
                        Title = request.Title,
                        LastModifiedAt = DateTime.UtcNow,
                    });
                }

                await _fs.SaveFile("metadata.meta", Encoding.UTF8.GetBytes(JsonSerializer.Serialize(data)));
            }

            response.Id = id.ToString();
            return response;
        }
    }
}
