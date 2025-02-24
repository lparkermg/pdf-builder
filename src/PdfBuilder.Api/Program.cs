using Grpc.Net.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PdfBuilder.Api.Configuration;
using PdfBuilder.Api.Models.Request;
using PdfBuilder.Common.FileSystem;
using PdfBuilder.Common.FileSystem.Configuration;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables("PDFBUILDER_API_");
builder.Services.Configure<LocalFileSystemOptions>(builder.Configuration.GetSection("Settings:Files:Local"));
builder.Services.Configure<ApiOptions>(builder.Configuration.GetSection("Settings"));

builder.Services.AddScoped<IFileSystem, LocalFileSystem>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(ops =>
{
    // TODO: Fix this to be a bit more restrictive.
    ops.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyMethod()
            .SetIsOriginAllowed((h) => h.Contains("localhost"))
            .AllowAnyHeader());
});

var app = builder.Build();

var setupChannel = (Uri uri) =>
{
    GrpcChannel channel;
    if (app.Environment.IsDevelopment())
    {
        // NOTE: This is pretty hacky, but gRPC doesn't support self-signed certificates.
        var httpClientHandler = new HttpClientHandler();
        // Return `true` to allow certificates that are untrusted/invalid
        httpClientHandler.ServerCertificateCustomValidationCallback =
            HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
        var httpClient = new HttpClient(httpClientHandler);
        channel = GrpcChannel.ForAddress(uri, new GrpcChannelOptions { HttpClient = httpClient });
    }
    else
    {
        channel = GrpcChannel.ForAddress(uri);
    }

    return channel;
};

app.UseCors("CorsPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.MapGet("/themes", (IOptions<ApiOptions> apiOps) =>
{
    var channel = setupChannel(apiOps.Value.ServiceUri);
    var client = new CV.CVClient(channel);
    return client.GetAvailableThemes(new Google.Protobuf.WellKnownTypes.Empty());
})
.WithName("AvailableThemes")
.WithOpenApi();

app.MapGet("/templates", (IOptions<ApiOptions> apiOps) =>
{
    var channel = setupChannel(apiOps.Value.ServiceUri);
    var client = new CV.CVClient(channel);
    return client.GetAvailableTemplates(new Google.Protobuf.WellKnownTypes.Empty());
})
.WithName("AvailableTemplates")
.WithOpenApi();

app.MapPost("/cv", ([FromBody] CvRequest body, IOptions<ApiOptions> apiOps) =>
{
    var channel = setupChannel(apiOps.Value.ServiceUri);
    var client = new CV.CVClient(channel);
    var request = new GenerateCVRequest
    {
        Template = body.Template,
        Theme = body.Theme,
    };

    request.Content.AddRange(body.Content);
    request.Content.AddRange(body.Sidebar);
    var data = client.GenerateCV(request);
    
    return Results.Created($"/file/{data.FileName}", $"/file/{data.FileName}");
});

app.MapGet("/file/{fileName}.pdf", (string fileName, IFileSystem fs) =>
{
    var success = fs.TryGetFile($"{fileName}.pdf", out var data);

    if (!success)
    {
        return Results.NotFound();
    }

    return Results.File(data, "application/pdf", $"{fileName}.pdf");
});

app.Run();


