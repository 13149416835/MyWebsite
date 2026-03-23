/**
 * GitHub Pages：刷新子路由时返回 404，需用与 index 相同的 SPA 入口。
 * 将 index.html 复制为 404.html，GitHub Pages 会用它处理 404。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "..", "dist");
const indexHtml = path.join(dist, "index.html");
const notFoundHtml = path.join(dist, "404.html");

if (!fs.existsSync(indexHtml)) {
  console.error("gh-pages-postbuild: dist/index.html 不存在，请先 vite build");
  process.exit(1);
}
fs.copyFileSync(indexHtml, notFoundHtml);
console.log("gh-pages-postbuild: 已生成 dist/404.html（与 index.html 相同）");
