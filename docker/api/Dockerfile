FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS dependencies

ENV PROTOBUF_PROTOC=/usr/bin/protoc
ENV gRPC_PluginFullPath=/usr/bin/grpc_csharp_plugin
RUN apk add protobuf protobuf-dev grpc grpc-plugins

WORKDIR /build

COPY ./src/PdfBuilder.Api/PdfBuilder.Api.csproj ./PdfBuilder.Api/PdfBuilder.Api.csproj

RUN dotnet restore ./PdfBuilder.Api/PdfBuilder.Api.csproj

FROM dependencies AS build
COPY ./src/ .
RUN dotnet publish ./PdfBuilder.Api/PdfBuilder.Api.csproj -c Release -o /build/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final

RUN apk update
RUN apk add icu-libs

COPY --from=build /build/out .

ENTRYPOINT ["dotnet", "PdfBuilder.Api.dll"]
