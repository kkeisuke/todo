# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev        # 開発サーバー起動 (port 3000)
npm run build      # プロダクションビルド
npm run preview    # ビルド後のプレビュー
npm run lint       # ESLint + auto-fix (Vue, JS, TS)
```

テストフレームワークは未導入。

## Tech Stack

- **Nuxt 3** (v3.8.2) + **Vue 3** + **TypeScript**
- **Supabase** (PostgreSQL) — DB・認証 (`@nuxtjs/supabase`)
- Node.js 24.15.0

## Architecture

### レイヤー構成: Repository → Store → Component

```
composables/
  repositories/   Supabase クエリ層（DB操作のみ）
    UseTodoRepository.ts            ベースクライアント (client.from('todos'))
    UseTodoCollectionRepository.ts  一覧取得・追加
    UseTodoSingleRepository.ts      単体CRUD・完了・削除
  store/           状態管理層（provide/inject パターン、Pinia不使用）
    UseTodoCollection.ts            一覧状態 + 完了フィルタ
    UseTodoSingle.ts                単体状態 + 更新操作
    UseTodoAdd.ts                   追加フォーム状態
  usecase/         ビジネスロジック層
    UseAuth.ts                      認証（メールOTP）
    UseAddTodo.ts                   Todo追加ロジック
```

Store層は Vue 3 の `provide/inject` でコンポーネントツリーに状態を共有する。

### ルーティング（ファイルベース）

- `/` — Todo一覧（要認証）
- `/login` — ログイン
- `/confirm` — メール認証待ち
- `/[id]` — Todo詳細

### DB スキーマ (todos テーブル)

`id`, `title`, `memo`, `deadline`, `completed_at`, `created_at`, `updated_at`, `user_id`

型定義: `types/schema.d.ts` — `Todo`, `TodoAdd`, `TodoUpdate` を export。

## Code Style

- **Prettier**: シングルクォート、セミコロンなし、printWidth 200、trailingComma なし
- **ESLint**: `eqeqeq`, `camelCase` 必須、`no-console` / `no-debugger` はエラー
- Vue テンプレートでは **kebab-case** コンポーネント名
- `<script setup>` + Composition API
- 日付処理は JST (+9) オフセットを明示的に扱う (`utils/functions/index.ts`)
