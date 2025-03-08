FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS dependencies

ENV PROTOBUF_PROTOC=/usr/bin/protoc
ENV gRPC_PluginFullPath=/usr/bin/grpc_csharp_plugin
RUN apk add protobuf protobuf-dev grpc grpc-plugins

WORKDIR /build

COPY ./src/PdfBuilder.SaveService/PdfBuilder.SaveService.csproj ./PdfBuilder.SaveService/PdfBuilder.SaveService.csproj
COPY ./src/PdfBuilder.Common.FileSystem/PdfBuilder.Common.FileSystem.csproj ./PdfBuilder.Common.FileSystem/PdfBuilder.Common.FileSystem.csproj
COPY ./src/PdfBuilder.Common.Models/PdfBuilder.Common.Models.csproj ./PdfBuilder.Common.Models/PdfBuilder.Common.Models.csproj

RUN dotnet restore ./PdfBuilder.SaveService/PdfBuilder.SaveService.csproj

FROM dependencies AS build
COPY ./src/ .
RUN dotnet publish ./PdfBuilder.SaveService/PdfBuilder.SaveService.csproj -c Release -o /build/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final

RUN apk update
RUN apk add icu-libs
RUN apk add libgdiplus

COPY --from=build /build/out .

ENTRYPOINT ["dotnet", "PdfBuilder.SaveService.dll"]