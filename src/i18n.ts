import { ref } from "vue";

export type SiteLang = "en" | "zh";

const STORAGE_KEY = "xq_site_lang";

function detectInitialLang(): SiteLang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "zh") return saved;
  return "en";
}

export const siteLang = ref<SiteLang>(detectInitialLang());

export function setSiteLang(next: SiteLang) {
  siteLang.value = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, next);
  }
}
