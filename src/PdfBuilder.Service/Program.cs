// See https://aka.ms/new-console-template for more information
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PdfBuilder.Service;

var builder = WebApplication.CreateBuilder();

builder.Services.AddGrpc();

var app = builder.Build();

app.MapGrpcService<CVService>();

app.Run();
