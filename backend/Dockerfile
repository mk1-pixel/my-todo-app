# 開発・ビルドステージ
FROM mcr.microsoft.com/dotnet/sdk:8.0-jammy AS build

WORKDIR /app

RUN dotnet new tool-manifest \
 && dotnet tool install dotnet-ef

# 環境変数でパスを永続的に追加
ENV PATH="${PATH}:/root/.dotnet/tools"

# プロジェクトファイルを先にコピー＆復元
COPY ./backend/*.sln ./
COPY ./backend/*.csproj ./

RUN dotnet clean
RUN rm -rf bin obj

RUN dotnet restore

# dotnet ef を使えるようにツールをインストール
RUN dotnet tool install dotnet-ef

RUN dotnet ef migrations add InitialCreate --output-dir Data/Migrations || echo "Migration already exists"

# 残りのソースコードをコピー＆ビルド＆パブリッシュ
COPY . ./
RUN dotnet build -c Release --no-restore
RUN dotnet publish -c Release -o /app/out --no-restore
# ---------------------------------------

# 実行用ステージ（軽量）
FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy AS runtime

# 作業ディレクトリ
WORKDIR /app

# ビルド成果物をコピー
COPY --from=build /app/out ./

# アプリが使うポート（必要に応じて調整）
EXPOSE 5000

# 起動コマンド
ENTRYPOINT ["dotnet", "backend-app.dll"]
