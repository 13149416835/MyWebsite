<template>
  <section class="docs">
    <template v-if="siteLang === 'en'">
      <h1>API Docs</h1>

      <h2>Gateway Endpoint</h2>
      <p>Chat: <code>https://api.xiaoqiangonline.shop/v1/chat/completions</code></p>
      <p>This gateway currently provides <strong>text chat only</strong> (OpenAI-style Chat Completions).</p>

      <h2>Authentication</h2>
      <p>Header: <code>Authorization: Bearer &lt;your customer API key&gt;</code></p>

      <h2>Model Parameter (<code>model</code>, required)</h2>
      <p>
        Request body must include <code>model</code> as a string. Your API key is bound to one route, and only models on that route are allowed.
        Mismatched models return <code>400</code>.
      </p>
      <div class="model-table-wrap">
        <table class="model-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Model Name (exact string)</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>DeepSeek</strong></td><td><code>deepseek-chat</code></td><td>General chat, cost-effective</td></tr>
            <tr><td></td><td><code>deepseek-reasoner</code></td><td>Better for complex reasoning</td></tr>
            <tr><td><strong>Zhipu</strong></td><td><code>glm-5</code></td><td>Flagship capability</td></tr>
            <tr><td></td><td><code>glm-5-turbo</code></td><td>Faster with lower cost</td></tr>
            <tr><td></td><td><code>glm-4.7</code></td><td>Coding-focused optimization</td></tr>
            <tr><td></td><td><code>glm-4.7-flash</code></td><td>Lightweight and fast</td></tr>
            <tr><td></td><td><code>glm-4-long</code></td><td>Long context support</td></tr>
            <tr><td><strong>MiniMax</strong></td><td><code>MiniMax-M2.7</code></td><td>Latest high-performance version</td></tr>
            <tr><td></td><td><code>MiniMax-M2.7-highspeed</code></td><td>Lower latency variant</td></tr>
            <tr><td></td><td><code>MiniMax-M2.5</code></td><td>Stable and cost-effective</td></tr>
            <tr><td></td><td><code>M2-her</code></td><td>Special variant (if available)</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Streaming (<code>stream</code>)</h2>
      <p>Set <code>stream: true</code> to enable SSE stream. Default is non-streaming.</p>

      <h2>Check Remaining Quota</h2>
      <p>Use <strong>GET</strong> below with the same API key. It is read-only and does not consume quota.</p>
      <p><code>GET https://api.xiaoqiangonline.shop/v1/account/balance</code></p>
      <p>Header: <code>Authorization: Bearer &lt;your customer API key&gt;</code></p>
      <pre><code>{
  "object": "balance",
  "balance": 1234567,
  "platform": "deepseek"
}</code></pre>

      <h2>Billing</h2>
      <p>Quota is deducted by upstream <code>usage.total_tokens</code>. Insufficient quota returns <code>402</code>.</p>
      <ul>
        <li>Self-check: use <code>GET /v1/account/balance</code>.</li>
        <li>Contact support: via Telegram or email.</li>
      </ul>

      <h2>Messages</h2>
      <p><code>messages</code> must be an array with <code>role</code> and <code>content</code> strings.</p>
      <ul>
        <li><code>system</code> - system instructions</li>
        <li><code>user</code> - user input</li>
        <li><code>assistant</code> - assistant history</li>
      </ul>

      <h2>Example: curl</h2>
      <pre><code>curl -X POST https://api.xiaoqiangonline.shop/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","messages":[{"role":"system","content":"You are a concise assistant."},{"role":"user","content":"Hello"}]}'</code></pre>

      <h2>Error Codes</h2>
      <ul>
        <li><code>401</code> - missing/invalid API key</li>
        <li><code>402</code> - insufficient token quota</li>
        <li><code>400</code> - invalid parameters or model not allowed on your route</li>
      </ul>
    </template>

    <template v-else>
      <h1>API 文档</h1>

      <h2>网关地址</h2>
      <p>对话：<code>https://api.xiaoqiangonline.shop/v1/chat/completions</code></p>
      <p>当前网关<strong>仅提供文本对话</strong>（OpenAI 风格的 Chat Completions），不含视觉/语音/图像等能力。</p>

      <h2>认证</h2>
      <p>请求头携带：<code>Authorization: Bearer &lt;您的客户 API Key&gt;</code></p>

      <h2>模型参数 model（必填）</h2>
      <p>请求体须包含字符串 <code>model</code>。您的 API Key 已绑定服务线路，只能选择该线路下模型；选错返回 <code>400</code>。</p>
      <div class="model-table-wrap">
        <table class="model-table">
          <thead>
            <tr>
              <th>线路</th>
              <th>模型名称（填写时用这个字符串）</th>
              <th>特点</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>DeepSeek</strong></td><td><code>deepseek-chat</code></td><td>通用对话，性价比高</td></tr>
            <tr><td></td><td><code>deepseek-reasoner</code></td><td>深度推理，适合复杂逻辑</td></tr>
            <tr><td><strong>智谱</strong></td><td><code>glm-5</code></td><td>旗舰模型，能力强</td></tr>
            <tr><td></td><td><code>glm-5-turbo</code></td><td>速度更快，成本稍低</td></tr>
            <tr><td></td><td><code>glm-4.7</code></td><td>编程优化</td></tr>
            <tr><td></td><td><code>glm-4.7-flash</code></td><td>轻量版，极速响应</td></tr>
            <tr><td></td><td><code>glm-4-long</code></td><td>超长上下文</td></tr>
            <tr><td><strong>MiniMax</strong></td><td><code>MiniMax-M2.7</code></td><td>最新版，性能最优</td></tr>
            <tr><td></td><td><code>MiniMax-M2.7-highspeed</code></td><td>高速版，延迟更低</td></tr>
            <tr><td></td><td><code>MiniMax-M2.5</code></td><td>稳定版，性价比高</td></tr>
            <tr><td></td><td><code>M2-her</code></td><td>特殊版本（如有说明可补充）</td></tr>
          </tbody>
        </table>
      </div>

      <h2>流式输出 stream</h2>
      <p>请求体带 <code>stream: true</code> 即开启 SSE；默认关闭。</p>

      <h2>查询剩余额度</h2>
      <p>使用与对话接口相同认证方式，发起 <strong>GET</strong> 请求即可查询当前 Key 的剩余 Token 额度（不扣费）。</p>
      <p><code>GET https://api.xiaoqiangonline.shop/v1/account/balance</code></p>
      <p>请求头：<code>Authorization: Bearer &lt;您的客户 API Key&gt;</code></p>
      <pre><code>{
  "object": "balance",
  "balance": 1234567,
  "platform": "deepseek"
}</code></pre>

      <h2>额度与计费</h2>
      <p>按上游返回 <code>usage.total_tokens</code> 扣减额度；不足返回 <code>402</code>。</p>
      <ul>
        <li>自助查询：使用 <code>GET /v1/account/balance</code>。</li>
        <li>联系客服：通过 Telegram 或邮件联系我们。</li>
      </ul>

      <h2>示例：curl</h2>
      <pre><code>curl -X POST https://api.xiaoqiangonline.shop/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","messages":[{"role":"system","content":"你是一个简洁、专业的助手。"},{"role":"user","content":"Hello"}]}'</code></pre>

      <h2>常见错误码</h2>
      <ul>
        <li><code>401</code> — API Key 无效或未提供</li>
        <li><code>402</code> — Token 额度不足</li>
        <li><code>400</code> — 参数错误（如缺少 <code>messages</code> / <code>model</code>，或 <code>model</code> 不在您线路白名单内）</li>
      </ul>
    </template>
  </section>
</template>

<script setup lang="ts">
import { siteLang } from "../i18n";
</script>

<style scoped>
.docs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
h1 { font-size: 32px; margin: 0; }
h2 { font-size: 18px; margin: 14px 0 6px 0; }
h3 { font-size: 15px; margin: 12px 0 6px 0; color: rgba(231,233,238,0.85); }
.model-table-wrap {
  overflow-x: auto;
}
.model-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}
.model-table th,
.model-table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  vertical-align: middle;
}
.model-table th {
  color: rgba(231,233,238,0.9);
  font-weight: 700;
}
.model-table td {
  color: rgba(231,233,238,0.86);
}
code {
  background: rgba(255,255,255,0.08);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 14px;
}
pre {
  background: rgba(0,0,0,0.3);
  padding: 14px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 0;
}
pre code {
  padding: 0;
  background: none;
}
ul {
  margin: 0;
  padding-left: 20px;
}
</style>
