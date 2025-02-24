// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PdfBuilder.Common.FileSystem;
using PdfBuilder.Common.FileSystem.Configuration;
using PdfBuilder.Service;
using PdfBuilder.Service.Generators;

var builder = WebApplication.CreateBuilder();
builder.Configuration.AddEnvironmentVariables("PDFBUILDER_SERVICE_");
builder.Services.Configure<AssetOptions>(builder.Configuration.GetSection("Assets"));
builder.Services.Configure<LocalFileSystemOptions>(builder.Configuration.GetSection("Settings:Files:Local"));

builder.Services.AddScoped<AssetLoader>();
builder.Services.AddScoped<IFileSystem, LocalFileSystem>();
builder.Services.AddScoped<PdfGenerator>();
builder.Services.AddGrpc();

var app = builder.Build();

app.MapGrpcService<CVService>();

app.Run();
