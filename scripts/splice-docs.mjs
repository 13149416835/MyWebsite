import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, "../src/pages/DocsPage.vue");
let s = fs.readFileSync(p, "utf8");

const markerStart = '<template v-if="siteLang === \'en\'">';
const markerEnd = "\n    <template v-else>";
const i = s.indexOf(markerStart);
const j = s.indexOf(markerEnd, i);

if (i < 0 || j < 0) {
  console.error("splice-docs: markers not found", { i, j });
  process.exit(1);
}

const replacement = `    <template v-if="siteLang === 'en'">
      <DocsEnBody />
    </template>

    <template v-else-if="siteLang === 'ja'">
      <DocsJaBody />
    </template>

    <template v-else-if="siteLang === 'ko'">
      <DocsKoBody />
    </template>

    <template v-else-if="siteLang === 'zh'">`;

s = s.slice(0, i) + replacement + s.slice(j + markerEnd.length);
fs.writeFileSync(p, s);
console.log("splice-docs: ok");
