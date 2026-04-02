# 4thave Vibe - Astro Blog Project

Sashishi（サシシ）による、個人の「バイブス」を綴るパーソナル・ブログプロジェクトです。
もともとはHugoで構築されていましたが、現在は **Astro** へ移行し、モダンな開発環境へと進化しています。

## 🚀 テクノロジースタック

- **Framework**: [Astro 6+](https://astro.build/)
- **Styling**: [Tailwind CSS 4+](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Logic**: [React 19+](https://react.dev/)
- **Content**: Markdown / MDX (Content Collections)

## 🛠 よく使うコマンド

ブログの開発や執筆時に使用する主要なコマンド一覧です。

```bash
# ローカル開発サーバーの起動 (localhost:4321)
npm run dev

# 本番用ビルドの実行
npm run build

# ビルド結果のプレビュー
npm run preview

# Astro CLI コマンドの実行
npx astro [command]
```

## 📂 ディレクトリ構造

主要なディレクトリの役割は以下の通りです。

- `src/content/`: 記事データ（ブログ、メモなど）を格納する場所。
- `src/pages/`: 実際のルート（URL）に対応するコンポーネント。
- `src/components/`: 再利用可能なUIパーツ。
- `.agent/`: AIアシスタント（GEMINI）用のライティングルールやスキルセット。
- `.workspace/`: 執筆中の下書き（draft）やタスク管理用。

## ✍️ ライティングルール（重要）

記事の執筆にあたっては、以下のルールに従います。
詳細は `.agent/4thaveVibe-rules.md` に記載されています。

- **Persona**: Sashishi（サシシ）としての独自の視点、感情、バイアスを優先。
- **Readability**: スマホでの読みやすさを重視（1段落2〜3文、リズムを意識）。
- **Bold**: 本番環境の記事では `**太字**` ではなく `<strong>強調</strong>` タグを使用。

## 📷 メディア・画像について

本プロジェクト（4thave Vibe / ポートフォリオサイト）では、記事ごとの個別アイキャッチ画像（サムネイル）は作成・使用しません。
サイト全体のクリーンかつミニマルなデザインを維持するため、カテゴリごとのデフォルトプレースホルダーや背景グラデーションを優先します。

---

© 2026 sasisi344（さしし） / 4thave Vibe
