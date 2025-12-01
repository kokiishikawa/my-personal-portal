# 個人用ポータルサイト

## 概要
日常で使う情報をまとめる個人用ポータルサイト。  
タスク・メモ・天気・ブックマークなどを一元的に管理し、  
毎日の情報整理を効率化します。


## 技術スタック

### フロントエンド
- Next.js 15.5.4 (App Router)
- React 19.1.0
- TypeScript 5.x
- Tailwind CSS 4.x
- NextAuth 4.24.13 (Google OAuth 2.0)
- Lucide React (アイコン)

### バックエンド
- Django 5.2.7
- Django REST Framework 3.16.1
- Django SimpleJWT 5.3.1
- PostgreSQL 15
- Docker / Docker Compose

### 認証
- Google OAuth 2.0
- NextAuth (フロントエンド)
- JWT認証 (バックエンド)

### インフラ（開発環境）
- Docker（PostgreSQL, Django, Next.js）
- GitHub Actions（CI/CD）

### インフラ（本番環境・予定）
- Vercel（フロントエンドホスティング）
- AWS EC2 / RDS / Lambda / Route53


## 実装済み機能

### Phase 1（完了）
- ✅ カレンダー表示（今日の日付ハイライト・月表示・月間移動）
- ✅ タスク管理（追加・編集・削除、完了管理、楽観的更新）
- ✅ スケジュール管理（予定の作成・編集・削除、日付フィルタリング）
- ✅ ブックマーク機能（リンク集管理、カテゴリ別表示、絵文字アイコン）
- ✅ ダークモード（ライト/ダークモード切り替え、localStorage永続化）
- ✅ 認証機能（Google OAuth 2.0、NextAuth、Django JWT）
- ✅ CI/CD（GitHub Actions、pytest自動テスト）

### 今後の開発予定

#### Phase 2
- 天気情報（現在地の気象データを表示）
- クイック検索バー（複数検索エンジン対応）
- 推しブログの更新チェック（スクレイピング + 通知）
- 習慣トラッカー（連続実行日数の表示）

## 開発ルール（個人用メモ）

### コミットメッセージのルール
- docs: ドキュメントやREADMEの更新
- feat: 新機能追加
- fix: バグ修正
- chore: 環境設定・細かい作業

### ブランチ運用ルール

- mainブランチ
  - 安定版・完成済み機能のみ
  - README更新や小さな修正は直接コミット可
  - 常に本番環境に相当する状態を維持

- developブランチ
  - main にマージする前の統合ブランチ
  - 複数の feature ブランチをまとめて動作確認
  - 動作確認後に main にマージ

- 機能開発用ブランチ
  - 命名規則: feature/機能名
    - 例: feature/homepage, feature/task
  - 作業開始時に main からブランチを作成
  - 機能完成後に develop にマージ

- バグ修正用ブランチ
  - 命名規則: fix/修正内容
  - 例: fix/readme-typo
  - 小さな修正は develop または main に直接マージ可

## プロジェクトセットアップ

### 1. リポジトリのクローン
```bash
git clone https://github.com/kokiishikawa/my-personal-portal.git
cd my-personal-portal
```

### 2. 環境変数の設定
```bash
# .envファイルを作成（.env.exampleを参考に）
cp .env.example .env

# 以下の環境変数を設定
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL
# - データベース接続情報
```

### 3. Docker環境の起動
```bash
# Docker Composeでフロントエンド、バックエンド、DBを起動
docker-compose up -d

# ログを確認
docker-compose logs -f
```

### 4. データベースのマイグレーション
```bash
# Djangoコンテナに入る
docker-compose exec web bash

# マイグレーション実行
python manage.py migrate

# スーパーユーザー作成（必要に応じて）
python manage.py createsuperuser

# コンテナから抜ける
exit
```

### 5. アプリケーションへのアクセス
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8000/api
- Django管理画面: http://localhost:8000/admin

### 6. テストの実行
```bash
# バックエンドのテストを実行
docker-compose exec web pytest

# または、ローカルで実行
cd backend
pytest
```

## 更新履歴

### 2025-12-01
- README更新（実装済み機能の反映）
- 技術スタックの正確な情報に更新
- Docker環境のセットアップ手順を追加

### 2025-10-12
- README初版作成
- プロジェクト構成と開発方針を整理
- Phase 1 機能の要件定義を追加