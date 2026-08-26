# Multi-stage Dockerfile for ASP.NET Core 10 Web API
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["ResortBackend.csproj", "./"]
RUN dotnet restore "ResortBackend.csproj"

COPY . .
RUN dotnet build "ResortBackend.csproj" -c Release -o /app/build
RUN dotnet publish "ResortBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "ResortBackend.dll"]
