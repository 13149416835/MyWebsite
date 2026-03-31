import { watch } from "vue";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomePage from "./pages/HomePage.vue";
import DocsPage from "./pages/DocsPage.vue";
import { siteLang, type SiteLang } from "./i18n";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomePage },
    { path: "/docs", component: DocsPage },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

const HTML_LANG: Record<SiteLang, string> = {
  en: "en",
  zh: "zh-CN",
  ja: "ja",
  ko: "ko",
};

watch(
  siteLang,
  (l) => {
    document.documentElement.lang = HTML_LANG[l];
  },
  { immediate: true },
);

createApp(App).use(router).mount("#app");
