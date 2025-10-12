# 個人用ポータルサイト

## 概要
日常で使う情報をまとめる個人用ポータルサイト。  
タスク・メモ・天気・ブックマークなどを一元的に管理し、  
毎日の情報整理を効率化します。


## 技術スタック

### フロントエンド
- Next.js 14 (App Router)
- React 18+
- TypeScript
- Tailwind CSS

### バックエンド（今後実装予定）
- Django 5.x / Django REST Framework
- PostgreSQL
- Celery + Redis（定期実行）
- BeautifulSoup4（スクレイピング）

### インフラ（予定）
- Vercel（フロントエンドホスティング）
- AWS EC2 / RDS / Lambda / Route53


## 開発予定
### Phase 1
- カレンダー表示（今日の日付ハイライト・月表示）
- タスク管理（追加・編集・削除、完了管理）
- メモ機能（作成・更新・削除）
- 天気情報（現在地の気象データを表示）

### Phase 2
- 推しブログの更新チェック（スクレイピング + 通知）
- 習慣トラッカー（連続実行日数の表示）
- ダークモード（時間帯による自動切り替え）

## 開発ルール（個人用メモ）

### コミットメッセージのルール
- docs: ドキュメントやREADMEの更新
- feat: 新機能追加
- fix: バグ修正
- chore: 環境設定・細かい作業

## プロジェクトセットアップ

### 1. リポジトリのクローン
```bash
git clone https://github.com/kokiishikawa/my-personal-portal.git
cd my-personal-portal
```
### 2. REQUIREMENTS.mdをGitにコミット
+ プロジェクトの要件定義や開発方針を整理するために `REQUIREMENTS.md` を作成します。
```bash
# REQUIREMENTS.mdの作成(要件定義書)
toch REQUIREMENTS.md

# VS Codeで開いて作成
code REQUIREMENTS.md

# ファイル追加
git add .

# コミット
git commit -m "docs: プロジェクト要件を追加"

# Github(mainブランチ)にプッシュ
git push origin main
```

### 3. Next.js プロジェクト作成
```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint

✔ Would you like your code inside a src/ directory? … Yes
✔ Would you like to use Turbopack? (recommended) … Yes
✔ Would you like to customize the import alias (@/* by default)? … No

git add .

git commit -m "feat: Next.jsプロジェクト初期セットアップ"

git push origin main
```

## 更新履歴

### 2025-10-12
- README初版作成
- プロジェクト構成と開発方針を整理
- Phase 1 機能の要件定義を追加