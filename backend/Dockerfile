# backend/Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
# SDK（開発用）をベースにする
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ./backend/*.sln ./
COPY ./backend/*.csproj ./
RUN dotnet restore ./backend.sln
COPY . .
# dotnet ef を使えるようにツールをインストール
RUN dotnet tool install --global dotnet-ef

# パスを通す（重要）
ENV PATH="$PATH:/root/.dotnet/tools"
WORKDIR /src/backend
RUN dotnet ef migrations add InitialCreate --output-dir Data/Migrations || echo "Migration already exists"

RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "backend.dll"]
