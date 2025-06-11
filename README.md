# My Todo App

### アプリ概要

<aside>
<img src="https://www.notion.so/icons/info-alternate_gray.svg" alt="https://www.notion.so/icons/info-alternate_gray.svg" width="40px" /> ポートフォリオのため簡単なTODOアプリを作成します。フロント側はReact、バックエンドはC#で実装予定。DBはPostgreSQLを使用。

</aside>

### 経過概要
- 5月半ばから1週間：Reactの学習期間、UdemyやYouTube、公式チュートリアルなどを実施しました。始めはよくわかりませんでしたが学習を続ける事で概要はつかめたと思います。
- 5月後半から1週間：実際にフロントエンドからアプリ作成を開始しました。まずReactだけで動くものを作り、その後.netでApiを作成してフロント側と繋げました。DB利用でデータの永続化して、形になった所でDocker環境に移行しています。
- 6月から1週間：Renderにデプロイ後、詳細ページを作成中。
- 今後：今後はログインやページ処理、詳細ページなどの機能追加を行う予定です。
- 

### 機能一覧

- タスク一覧表示
- タスクの追加
- タスクの編集
- タスクの削除
- タスクの完了／未完了の変更

### ワイヤーフレーム

[https://www.figma.com/design/zRkEX2gLczejwM6HuGLeCC/TODO%E3%82%A2%E3%83%97%E3%83%AA?node-id=0-1&t=sZFi5v20zDKiCCaI-1](https://www.figma.com/design/zRkEX2gLczejwM6HuGLeCC/TODO%E3%82%A2%E3%83%97%E3%83%AA?node-id=0-1&t=sZFi5v20zDKiCCaI-1)


### 要求事項

- タスクの追加
- タスクの編集・削除
- タスク一覧の完了／未完了の表示
- レスポンシブ対応

### 要件

| 項目 | 内容 |
| --- | --- |
| フロントエンド | React 18（TypeScript） + Tailwind CSS |
| バックエンド | ASP.NET Core Web API（C#） |
| データベース | PostgreSQL |
| ホスティング | Renderを想定 |
| バージョン管理 | Git + GitHub（リポジトリ連携） |
| CI/CD | GitHub Actionsを用いて自動テスト・ビルド・デプロイを行う |
| コンテナ管理 | Dockerを使用してフロントエンド・バックエンド・DBをコンテナ化する |
| Docker構成 | docker-composeによりローカル環境で一括起動可能とする |
| テスト実行 | PR作成時にCIで自動テストを実行するワークフローを組む |
| 本番デプロイ | GitHub Actions経由で本番環境に自動デプロイ（RenderやAzure） |