using Grpc.Core;
using Grpc.Core.Logging;
using Microsoft.Extensions.Logging;
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
    public class DeleteService(IFileSystem fs, ILogger<DeleteService> logger): Delete.DeleteBase
    {
        private readonly IFileSystem _fs = fs;
        public override async Task<DeleteResponse> Delete(DeleteRequest request, ServerCallContext context)
        {
            var response = new DeleteResponse();

            if(string.IsNullOrWhiteSpace(request.Id)){
                response.Success = false;
                return response;
            }
            var id = request.Id;
            var fileName = $"{id}.dat";

            var success = _fs.DeleteFile(fileName);

            if (success)
            {
                if (_fs.TryGetFile("metadata.meta", out var metaData))
                {
                    var data = JsonSerializer.Deserialize<List<MetadataItem>>(Encoding.UTF8.GetString(metaData)) ?? [];

                    var index = data.FindIndex(d => d.Id == id);

                    data.RemoveAt(index);
                    await _fs.SaveFile("metadata.meta", Encoding.UTF8.GetBytes(JsonSerializer.Serialize(data)), true);
                }
            }

            response.Success = success;

            return response;
        }
    }
}