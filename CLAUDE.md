# 4thave-vibe Claude Instructions

## 優先ルール

このプロジェクトでは、以下の順で参照すること。

1. `.cursor/rules/editorial-guide.md`（執筆ルール）
2. `.claude/post-workflow.md`（清書・公開Workflow）
3. 本ファイル `CLAUDE.md`

## プロジェクト概要

- **Type**: Astro Website
- **Framework**: Astro 6+, React 19, Tailwind CSS 4
- **Root**: `c:\Users\sasis\344dev\4thave-vibe`

## コンテンツ構造

- `src/content/blogs/`: 高品質記事（単一著者ペルソナ）
- `src/content/notes/`: 短文メモ・日次投稿
- `_draft/`: 清書前のドラフト置き場

## 画像生成ルール

- 明示指示があるまで画像生成を実行しない。
- 画像生成を行う場合は、ワークスペース共通ルールの指定スクリプトとスタイル定義に従う。

## タスク管理（GitHub Project 統合、2026-09-25〜）

ブログ横断の中期〜長期タスクは GitHub Project で一元管理: https://github.com/users/sasisi344/projects/1 （「ブログ運営タスク」）。カンバン列は `Backlog → Todo → In Progress → Done`。短期〜中期の目標タスクは Start date / End date を設定し、ロードマップビューで期間の進捗を管理する。新規タスクは `gh issue create --repo sasisi344/4thave-vibe` でIssue化 → `gh project item-add 1 --owner sasisi344 --url <issue-url>` でボードに追加。詳細は `344ob/07_workspace/.agents/blog-registry.md` 参照。日々の細かい実行タスクは `.workspace/.task/` が引き続き正本。

## 補足

- 旧 `GEMINI.md` の方針を引き継ぎ、運用ルールの実体は `.cursor/rules` と `.claude` に分離した。
