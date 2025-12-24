# Issues TODO

## URL

- サイト：https://issues-todo.negisosu.com/

## 概要

Githubが提供しているAPIに興味を持ったので、触るための口実に作成した。

通常のTODOアプリケーションのDB部分を意外と使わない（かもしれない）Issuesで代用して実装した。

マークダウンのチェックリスト表記をIssuesから読み込み、フロントの変更をGithubのAPIでIssuesに書き込む形で成立。ただし、Githubの通常のページに変更が加わると機能しづらかったり多少の欠陥があることも事実。

## おもな機能

### タスクの追加

タスクの追加ができる。滑らかな並べ替えやグループ化も可能。

新しくグループを作成する際はリロードがかかるが、基本的なタスクを追加する際は画面遷移なくストレスなくタスクを追加することができる。

<img width="1218" height="863" alt="image" src="https://github.com/user-attachments/assets/c211309b-b111-4ee6-abe2-3aee8f77a320" />

## 使用技術

**Cursorによる要約**

### フレームワーク・コアライブラリ
- Next.js 15.3.4
- React 19.0.0
- React DOM 19.0.0
- TypeScript 5
### 認証
- NextAuth.js 5.0.0-beta.29
- @auth/core 0.40.0
- GitHub OAuth認証
### データベース
- Prisma 6.11.0
- PostgreSQL
### UIライブラリ・スタイリング
- Tailwind CSS 4
- @tailwindcss/postcss 4
- Radix UI
- @radix-ui/react-checkbox 1.3.2
- @radix-ui/react-dialog 1.1.14
- @radix-ui/react-dropdown-menu 2.1.15
- @radix-ui/react-label 2.1.7
- @radix-ui/react-popover 1.1.14
- @radix-ui/react-slot 1.2.3
- Framer Motion 12.23.0
- Lucide React 0.525.0
- tw-animate-css 1.3.5
### ユーティリティライブラリ
- Zod 3.25.72（バリデーション）
- clsx 2.1.1
- tailwind-merge 3.3.1
- class-variance-authority 0.7.1
- use-debounce 10.0.5
- cmdk 1.1.1
- GitHub API
- @octokit/types 14.1.0
### 開発ツール
- ESLint 9
- eslint-config-next 15.3.4
- @eslint/eslintrc 3
- @types/node 20
- @types/react 19
- @types/react-dom 19
- PostCSS
- track-cli 4.0.3
### その他
- Node.js（package.jsonのpostinstallスクリプトでPrisma generateを実行）
