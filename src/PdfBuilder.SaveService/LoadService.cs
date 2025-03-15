using Google.Protobuf.WellKnownTypes;
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
    public class LoadService(IFileSystem fs) : Load.LoadBase
    { 
        private readonly IFileSystem _fs = fs;

        public override Task<LoadResponse> Load(LoadRequest request, ServerCallContext context)
        {
            var response = new LoadResponse();
            if (!_fs.TryGetFile($"{request.Id}.dat", out var fileData))
            {
                response.Id = request.Id;
                response.Content = string.Empty;
                return Task.FromResult(response);
            }
            response.Id = request.Id;
            response.Content = Encoding.UTF8.GetString(fileData);
            return Task.FromResult(response);
        }

        public override Task<LoadMetadataResponse> LoadMetadata(Empty request, ServerCallContext context)
        {
            var response = new LoadMetadataResponse();
            if (!_fs.TryGetFile("metadata.meta", out var fileData))
            {
                response.Metadata = JsonSerializer.Serialize<IList<MetadataItem>>([]);
                return Task.FromResult(response);
            }

            response.Metadata = Encoding.UTF8.GetString(fileData);
            return Task.FromResult(response);
        }
    }
}
