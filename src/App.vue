<template>
  <div class="layout">
    <header class="header">
      <RouterLink to="/" class="brand">
        <span class="logo">XQ</span>
        <span class="site">xiaoqiangonline.shop</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/">{{ nav.home }}</RouterLink>
        <RouterLink to="/docs">{{ nav.docs }}</RouterLink>
        <label class="lang-select-wrap">
          <span class="visually-hidden">Language</span>
          <select
            class="lang-select"
            :value="siteLang"
            aria-label="Language"
            @change="onLangChange"
          >
            <option v-for="opt in LANG_SELECT_OPTIONS" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </label>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <span>© {{ new Date().getFullYear() }} xiaoqiangonline.shop</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { isSiteLang, setSiteLang, siteLang } from "./i18n";
import { LANG_SELECT_OPTIONS, navUi } from "./siteUi";

const nav = computed(() => navUi[siteLang.value]);

function onLangChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value;
  if (isSiteLang(v)) setSiteLang(v);
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0e18;
  color: #e7e9ee;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}
.logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(145deg, #5b4fd4, #2eb8e0);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 13px;
  color: #fff;
}
.site {
  font-weight: 500;
  font-size: 14px;
  color: rgba(231, 233, 238, 0.88);
  letter-spacing: 0.02em;
}
.nav {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav a {
  color: rgba(231, 233, 238, 0.78);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
}
.nav a.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}
.lang-select-wrap {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.lang-select {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.25);
  color: rgba(231, 233, 238, 0.92);
  border-radius: 8px;
  padding: 8px 28px 8px 10px;
  font-size: 13px;
  cursor: pointer;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, rgba(231, 233, 238, 0.6) 50%),
    linear-gradient(135deg, rgba(231, 233, 238, 0.6) 50%, transparent 50%);
  background-position: calc(100% - 14px) calc(50% + 2px), calc(100% - 9px) calc(50% + 2px);
  background-size: 5px 5px;
  background-repeat: no-repeat;
  max-width: 140px;
}
.lang-select:focus {
  outline: 2px solid rgba(94, 200, 255, 0.45);
  outline-offset: 2px;
}
.main {
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 32px 22px 48px;
  flex: 1;
}
.footer {
  padding: 16px 22px;
  color: rgba(231, 233, 238, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
  font-size: 13px;
}
</style>
