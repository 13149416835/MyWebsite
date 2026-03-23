# 交付物 1：官网静态站（GitHub Pages）

文档页中的网关地址：**`https://api.xiaoqiangonline.shop`**（与 Cloudflare Worker 一致）。

## GitHub Pages（仓库根就是本站时）

- 使用 **`.github/workflows/deploy-pages.yml`**，Pages 的 Source 选 **GitHub Actions**。  
- 详见 **`docs/仅本站仓库时的GitHubActions.md`**、**`docs/GITHUB_PAGES部署说明.md`**。

## 环境

- **Node.js 20.19+**（与根目录说明一致）

## 本地开发

```powershell
cd D:\3000\deliverable-1-site
npm install
npm run dev
```

## 构建

```powershell
npm run build
```
