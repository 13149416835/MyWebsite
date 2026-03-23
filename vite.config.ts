import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  /** GitHub Pages / 自定义域名根路径：用相对路径加载 JS/CSS，避免子目录部署或根路径不一致导致白屏 */
  base: "./",
});
