# GitHub Pages 部署说明（避免白屏）

## 白屏常见原因

1. **上传了源码，没有上传 `dist` 构建结果**  
   必须上传 **`npm run build` 之后 `dist` 目录里的全部内容**（含 `index.html`、`404.html`、`assets` 文件夹、`.nojekyll`、`CNAME`），而不是上传整个 Vue 源码仓库根目录。

2. **资源路径错误**  
   本项目已设置 `base: './'`，构建出的 JS/CSS 为**相对路径**，在自定义域名根路径或子路径下都能加载。

3. **直接刷新 `/docs` 等子路由 404**  
   构建脚本会生成 **`404.html`**（与 `index.html` 相同），GitHub Pages 会用其承接 404，Vue Router 才能正常工作。

## 推荐步骤

1. 本地执行：
   ```powershell
   cd deliverable-1-site
   npm install
   npm run build
   ```
2. 将 **`dist` 目录内所有文件** 部署到 GitHub Pages 来源（例如 `gh-pages` 分支根目录，或 `main` 分支的 `/docs` 目录，与你在仓库 Settings → Pages 里选的一致）。
3. 仓库 **Settings → Pages → Custom domain** 填写：`xiaoqiangonline.shop`，并勾选 **Enforce HTTPS**（生效可能需数分钟～数小时）。
4. 域名 DNS：按 GitHub 提示配置 **A 记录** 或 **CNAME** 指向 GitHub Pages。

## 自检

浏览器打开 `https://xiaoqiangonline.shop/`，按 **F12 → Network**，确认：

- `index-*.js`、`index-*.css` 状态为 **200**（不是 404）。
- 若有 404，说明 **静态文件未部署在正确路径** 或 **漏传了 `assets` 文件夹**。
