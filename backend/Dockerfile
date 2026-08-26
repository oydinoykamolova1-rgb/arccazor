# Archazor Resort Backend — Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8443

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["ResortBackend.csproj", "."]
RUN dotnet restore "./ResortBackend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "ResortBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ResortBackend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ResortBackend.dll"]
