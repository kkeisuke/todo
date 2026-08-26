# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev        # 開発サーバー起動 (port 3000)
npm run build      # プロダクションビルド
npm run preview    # ビルド後のプレビュー
npm run lint       # ESLint（--fix 付きなので実行するとファイルが書き換わる）
```

テストフレームワークは未導入。

## Tech Stack

Nuxt 3 + Vue 3 + TypeScript。DB と認証は Supabase (`@nuxtjs/supabase`)。
バージョンは `package.json` と `.node-version` を参照する。

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

- `<script setup>` + Composition API で書く。
- 日付処理は JST (+9) オフセットを明示的に扱う (`utils/functions/index.ts`)。

整形と静的解析のルールは `.prettierrc.yaml` と `.eslintrc.cjs` が持つ。
