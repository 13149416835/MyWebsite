<template>
  <section class="docs">
    <h1>API 文档</h1>

    <h2>网关地址</h2>
    <p><code>https://api.yourservice.com/v1/chat/completions</code></p>

    <h2>认证</h2>
    <p>请求头携带：<code>Authorization: Bearer &lt;您的客户 API Key&gt;</code></p>

    <h2>支持的模型</h2>
    <ul>
      <li><code>deepseek-chat</code> — DeepSeek</li>
      <li><code>zhipu-glm</code> — 智谱 GLM</li>
      <li><code>minimax-abab</code> — MiniMax</li>
    </ul>

    <h2>示例：curl</h2>
    <pre><code>curl -X POST https://api.yourservice.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'</code></pre>

    <h2>示例：Python</h2>
    <pre><code>import requests

r = requests.post(
  "https://api.yourservice.com/v1/chat/completions",
  headers={"Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json"},
  json={"model": "deepseek-chat", "messages": [{"role": "user", "content": "Hello"}]}
)
print(r.json())</code></pre>

    <h2>示例：JavaScript</h2>
    <pre><code>const res = await fetch("https://api.yourservice.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "deepseek-chat",
    messages: [{ role: "user", content: "Hello" }]
  })
});
const data = await res.json();</code></pre>

    <h2>常见错误码</h2>
    <ul>
      <li><code>401</code> — API Key 无效或未提供</li>
      <li><code>402</code> — 余额不足</li>
      <li><code>400</code> — 请求参数错误（如 model 不支持）</li>
    </ul>
  </section>
</template>

<style scoped>
.docs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
h1 { font-size: 32px; margin: 0; }
h2 { font-size: 18px; margin: 14px 0 6px 0; }
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
