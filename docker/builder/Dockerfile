FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS dependencies

ENV PROTOBUF_PROTOC=/usr/bin/protoc
ENV gRPC_PluginFullPath=/usr/bin/grpc_csharp_plugin
RUN apk add protobuf protobuf-dev grpc grpc-plugins

WORKDIR /build

COPY ./src/PdfBuilder.Service/PdfBuilder.Service.csproj ./PdfBuilder.Service/PdfBuilder.Service.csproj

RUN dotnet restore ./PdfBuilder.Service/PdfBuilder.Service.csproj

FROM dependencies AS build
COPY ./src/ .
RUN dotnet publish ./PdfBuilder.Service/PdfBuilder.Service.csproj -c Release -o /build/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final

RUN apk update
RUN apk add icu-libs
RUN apk add libgdiplus

RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY --from=build /build/out .

ENTRYPOINT ["dotnet", "PdfBuilder.Service.dll"]