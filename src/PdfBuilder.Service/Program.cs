// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PdfBuilder.Service;

var builder = WebApplication.CreateBuilder();
builder.Configuration.AddEnvironmentVariables("PDFBUILDER_SERVICE_");
builder.Services.Configure<AssetOptions>(builder.Configuration.GetSection("Assets"));

builder.Services.AddScoped<AssetLoader>();
builder.Services.AddGrpc();

var app = builder.Build();

app.MapGrpcService<CVService>();

app.Run();
