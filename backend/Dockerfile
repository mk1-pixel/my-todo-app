# ====== ビルドステージ ======
FROM mcr.microsoft.com/dotnet/sdk:8.0-jammy AS build

WORKDIR /app

# プロジェクトファイルを先にコピー＆復元
COPY ./backend/*.sln ./
COPY ./backend/*.csproj ./

RUN dotnet clean && rm -rf bin obj
RUN dotnet restore
COPY ./backend ./backend

# アプリケーションをビルド＆パブリッシュ
RUN dotnet publish ./backend -c Release -o /app/out --no-restore

# ====== 実行ステージ ======
FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy AS runtime

WORKDIR /app

# dotnet ef を実行できるようにツールを追加
RUN dotnet new tool-manifest \
 && dotnet tool install dotnet-ef

ENV PATH="${PATH}:/root/.dotnet/tools"

# ビルド成果物をコピー
COPY --from=build /app/out ./

EXPOSE 5000

# 通常起動コマンド（RenderのDocker Commandで上書きされる想定）
ENTRYPOINT ["dotnet", "backend.dll"]
