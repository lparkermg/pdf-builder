// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PdfBuilder.Common.FileSystem;
using PdfBuilder.Common.FileSystem.Configuration;
using PdfBuilder.SaveService;
var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables("PDFBUILDER_SAVESERVICE_");
builder.Services.Configure<LocalFileSystemOptions>(builder.Configuration.GetSection("Settings:Files:Local"));

builder.Services.AddScoped<IFileSystem, LocalFileSystem>();

builder.Services.AddGrpc();

var app = builder.Build();

app.MapGrpcService<SaveService>();
app.MapGrpcService<LoadService>();

app.Run();