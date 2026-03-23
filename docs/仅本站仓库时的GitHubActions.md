# 仓库根目录 = 本站项目时怎么用 GitHub Pages

你的情况：**GitHub 仓库根目录**就是网站工程（内容与本目录 `deliverable-1-site` 一致），**没有**外层的 `deliverable-1-site` 文件夹。

## 已内置工作流

本目录下已有：

**`.github/workflows/deploy-pages.yml`**

推送到 **`main`** 或 **`master`** 分支时会自动：

1. `npm ci` → `npm run build`
2. 把 **`dist/`**（打包后的 `index.html` + `./assets/*.js`，**不会**再请求 `/src/main.ts`）部署到 GitHub Pages。

## 你需要做的

1. 把整个 **`deliverable-1-site` 里的内容**（含 `.github`、`package.json`、`src`、`public` 等）作为你 GitHub 仓库的**根目录**提交并推送。  
   - 确保仓库根目录有 **`package-lock.json`**（没有则在本地执行一次 `npm install` 再提交）。

2. 打开 GitHub 仓库：**Settings → Pages**  
   - **Build and deployment → Source** 选 **GitHub Actions**（不要选「Deploy from a branch」却指向带 `/src/main.ts` 的源码根目录）。

3. 推送后打开 **Actions** 标签，确认 **Deploy to GitHub Pages** 运行成功。

4. 自定义域名仍在 **Settings → Pages** 里配置 **Custom domain**（如 `xiaoqiangonline.shop`），与之前一致。

## 与「整仓 monorepo」的区别

若你实际是把整个 `d:\3000` 推到一个仓库，网站在子目录 `deliverable-1-site/`，应使用仓库根目录的 **`.github/workflows/deploy-deliverable-1-site.yml`**（在父级 monorepo 里），而不是本文件所在的工作流。
