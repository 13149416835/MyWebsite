import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomePage from "./pages/HomePage.vue";
import PricingPage from "./pages/PricingPage.vue";
import DocsPage from "./pages/DocsPage.vue";
import ContactPage from "./pages/ContactPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/pricing", component: PricingPage },
    { path: "/docs", component: DocsPage },
    { path: "/contact", component: ContactPage },
  ],
});

createApp(App).use(router).mount("#app");
