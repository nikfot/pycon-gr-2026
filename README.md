# Sophia Means Wisdom — PyCon Greece 2026

Slides for **Sophia Means Wisdom: A Multi-Tenant AI Engineering Assistant Using
Elasticsearch as RAG**, by Nikos Fotiou.

Live deck: https://nikfot.github.io/pycon-gr-2026/

Built with [Slidev](https://sli.dev/). Speaker notes are not part of this
repository.

## Run locally

Requires Node.js 22.18 or newer.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build                          # dist/
BASE=/pycon-gr-2026/ npm run build:public   # dist-public/, as GitHub Pages serves it
```

Pushing to `main` deploys the site with the workflow in
`.github/workflows/pages.yml`.
