# backend/Dockerfile.dev
FROM mcr.microsoft.com/dotnet/sdk:8.0-jammy

WORKDIR /app

RUN dotnet tool install -g dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

RUN dotnet ef database update --project ./backend.csproj

COPY ./backend/*.csproj ./
RUN dotnet restore

COPY ./backend ./

EXPOSE 5000
# 通常起動コマンド（RenderのDocker Commandで上書きされる想定）
ENTRYPOINT ["dotnet", "backend.dll"]
