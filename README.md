# ELETOY 站点（Astro + GitHub Pages + Pages CMS）

一套现成的静态站点骨架：你在 **Pages CMS**（浏览器里）发新闻/产品，自动生成
Markdown → Astro 把它渲染成网页 → GitHub Actions 自动部署到 GitHub Pages。
以后你只在 `app.pagescms.org` 里点点发布，不用碰 HTML。

## 目录结构

```
content/news/         # 新闻 md（Pages CMS 写这里）
content/products/     # 产品 md
public/images/        # 图片（Pages CMS 上传到这里）
public/favicon.svg
src/                  # Astro 模板（列表页/详情页/首页/样式）
.pages.yml            # Pages CMS 配置（字段已和站点对齐）
.github/workflows/deploy.yml   # 自动部署
astro.config.mjs
package.json
```

## 一次性设置（大约 10 分钟）

### 1. 放进仓库
把这些文件全部放进你那个已经有 `content/news/...` 的 GitHub 仓库根目录
（`index.html` 那个随便放的可以删掉），commit 并 push 到 `main` 分支。
仓库要 **public**（免费版 GitHub Pages 的要求）。

### 2. 开启 GitHub Pages
仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。
之后每次 push，`.github/workflows/deploy.yml` 会自动构建并发布。
第一次部署完成后，站点地址是 `https://<用户名>.github.io/<仓库名>/`。

> 如果先用这个 `github.io/<仓库名>/` 地址测试（还没绑域名），
> 打开 `astro.config.mjs`，把 `site` 改成 `https://<用户名>.github.io`，
> 并加一行 `base: '/<仓库名>/'`。绑了自定义域名根目录后再改回来。

### 3. 绑定域名 eletoy.cc（可选）
**Settings → Pages → Custom domain** 填你的域名，然后在你现有 DNS 商加记录：
- 子域名 `www.eletoy.cc`：一条 CNAME `www` → `<用户名>.github.io`
- 根域 `eletoy.cc`：四条 A 记录（`@`）指向
  `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153`

DNS 生效后回 Settings 勾 **Enforce HTTPS**。

### 4. 接 Pages CMS
打开 `app.pagescms.org`，用 GitHub 登录并授权，选中这个仓库。
它会自动读到根目录的 `.pages.yml`，出现「新闻」「产品」两个板块。
点 Add Entry 填表单 → Save，它就把一篇 md 提交到仓库，触发上面的
Actions 自动重新部署。图片在编辑器里直接拖拽上传（会存到 `public/images`）。

## 字段说明

新闻/产品共用：`title`（标题）、`date`（日期）、`cover`（封面/图片）、
`summary`（摘要，显示在卡片上）、正文（`body`，写进 md 正文，支持 Markdown/图片）。
产品另有：`model`（型号）、`link`（购买/详情链接）。
所有字段都可留空，不会导致构建失败。

## 本地预览（可选，不是必须）
装了 Node.js 后：`npm install` 然后 `npm run dev`，浏览器开 `http://localhost:4321`。
日常发内容用 Pages CMS 就够了，本地这步可以完全跳过。

## 改样式
配色和字体都在 `src/styles/global.css` 顶部的变量里（`--accent` 是品牌橙、
`--data` 是链接色等），改这几个值就能换风格。
