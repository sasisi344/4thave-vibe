# 4thave Vibe: Post Workflow (清書・公開手順)

## 0. ソースの選択

- `_draft/` フォルダにあるMarkdownファイル（メモ）を任意に1つ選択する。

## 1. 記事の清書（Refine）

- **文字数**: 300〜600文字程度の「気づき」に要約・リライトする。
- **トーン**: `.cursor/rules/editorial-guide.md` に従い、個人の主観（Sashishi persona）を全面に出す。
- **フォーマット**:
  - `**強調**` を `<strong>強調</strong>` に置換する。
  - 適度に `>`（引用）や `-`（箇条書き）を使い、空行によるリズムを作る。

### 作成する記事の命名規則（FileName）
- **基本**: `YYYY-MM-DD.mdx`（1日1投稿の場合）
- **複数・特定トピック**: `[english-slug]-[YYYY-MM-DD].mdx`（英文スラッグを **Prefix** にする）
- **ディレクトリ階層**: `src/content/notes/YYYY/MM/W[WeekNumber]/` 配下に配置する。

## 2. フロントマターとタグの設定

以下のシンプルな形式を使用する。※サムネイル画像（cover）は作成しない。

```yaml
---
title: "フックのあるタイトル"
publishDate: YYYY-MM-DD
category: "Jurnal"
tags: ["メインKW", "サブKW1", "サブKW2"] # 合計最大3つまで
description: "この記事の短い要約"
---
```

### tagsのルール

tagsはウェブサイト上で「ハッシュタグ」として機能するため、類似ワードの乱立を防ぐ。
- **構成**: MainKWを1つ、SubKWを最大2つまで適用する。
- **管理**: 使用したタグは `08_blog-master\05-4thave\.workspace_data-set\tags.csv` に記録し、既存のタグを優先的に再利用する。表記ゆれを厳禁とする。

## 3. 本番配置（Finalize）

- **保存先**: `src/content/notes/YYYY/MM/W[WeekNumber]/` に年月日を用いたスラッグで保存。
  - 例: `src/content/notes/2026/03/W14/topic-2026-03-26.mdx`
- **完了後**: 元のドラフトファイルを削除し、タスクを[x]済みにする。
