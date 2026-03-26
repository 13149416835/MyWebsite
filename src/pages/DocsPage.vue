<template>
  <section class="docs">
    <h1>API 文档</h1>

    <h2>网关地址</h2>
    <p><code>https://api.xiaoqiangonline.shop/v1/chat/completions</code></p>
    <p>
      当前网关<strong>仅提供文本对话</strong>（OpenAI 风格的 Chat Completions），不含视觉/语音/图像等能力。
    </p>

    <h2>认证</h2>
    <p>请求头携带：<code>Authorization: Bearer &lt;您的客户 API Key&gt;</code></p>

    <h2>模型参数 model（必填）</h2>
    <p>
      请求体须包含字符串 <code>model</code>。您的 API Key 已绑定<strong>服务线路</strong>，只能选择<strong>该线路下</strong>下列模型之一；选错线路的模型将返回
      <code>400</code>。
    </p>

    <h3>DeepSeek 线路</h3>
    <ul>
      <li><code>deepseek-chat</code></li>
      <li><code>deepseek-reasoner</code></li>
    </ul>

    <h3>智谱线路</h3>
    <ul>
      <li><code>glm-5</code>、<code>glm-5-turbo</code></li>
      <li><code>glm-4.7</code>、<code>glm-4.7-flash</code></li>
      <li><code>glm-4.6</code></li>
      <li><code>glm-4.5-air</code>、<code>glm-4.5-airx</code>、<code>glm-4.5-flash</code></li>
      <li><code>glm-4-long</code>、<code>glm-4-flash-250414</code></li>
    </ul>

    <h3>MiniMax 线路</h3>
    <ul>
      <li><code>M2-her</code></li>
      <li><code>MiniMax-M2.7</code>、<code>MiniMax-M2.7-highspeed</code></li>
      <li><code>MiniMax-M2.5</code>、<code>MiniMax-M2.5-highspeed</code></li>
    </ul>

    <h2>流式输出 stream</h2>
    <p>
      请求体可带布尔字段 <code>stream</code>：<strong>仅当 <code>stream: true</code> 时</strong>开启流式（SSE，与 OpenAI 一致）；<strong>默认关闭</strong>（不传、或
      <code>false</code>、或其它值均按非流式返回整段 JSON）。
    </p>

    <h2>额度与计费</h2>
    <p>
      按上游返回的 <code>usage</code> 中的 Token 用量扣减您的剩余额度（通常为 <code>total_tokens</code>）。额度不足时返回
      <code>402</code>（<code>Insufficient token quota</code>）。流式时用量可能在最后一个 SSE 数据包中给出。
    </p>

    <h2>对话消息（messages）</h2>
    <p>
      <code>messages</code> 为数组，每条需包含 <code>role</code> 与 <code>content</code>（字符串）。支持常见角色：
    </p>
    <ul>
      <li><code>system</code> — 系统/人设提示，建议放在数组前部。</li>
      <li><code>user</code> — 用户输入。</li>
      <li><code>assistant</code> — 模型历史回复；多轮对话时一并传入。</li>
    </ul>

    <h2>示例：curl</h2>
    <pre><code>curl -X POST https://api.xiaoqiangonline.shop/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","messages":[{"role":"system","content":"你是一个简洁、专业的助手。"},{"role":"user","content":"Hello"}]}'</code></pre>

    <h2>示例：Python</h2>
    <pre><code>import requests

r = requests.post(
  "https://api.xiaoqiangonline.shop/v1/chat/completions",
  headers={"Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json"},
  json={
    "model": "deepseek-chat",
    "messages": [
      {"role": "system", "content": "你是一个简洁、专业的助手。"},
      {"role": "user", "content": "Hello"},
    ],
  },
)
print(r.json())</code></pre>

    <h2>示例：JavaScript</h2>
    <pre><code>const res = await fetch("https://api.xiaoqiangonline.shop/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "你是一个简洁、专业的助手。" },
      { role: "user", content: "Hello" },
    ],
  }),
});
const data = await res.json();</code></pre>

    <h2>示例：流式（stream: true）</h2>
    <p>需在请求体中加入 <code>"stream": true</code>，响应为 <code>text/event-stream</code>，按行解析 <code>data:</code> JSON 片段（末包可能含 <code>usage</code>）。</p>
    <pre><code>curl -N -X POST https://api.xiaoqiangonline.shop/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-chat","stream":true,"messages":[{"role":"user","content":"Hi"}]}'</code></pre>

    <h2>常见错误码</h2>
    <ul>
      <li><code>401</code> — API Key 无效或未提供</li>
      <li><code>402</code> — Token 额度不足</li>
      <li><code>400</code> — 参数错误（如缺少 <code>messages</code> / <code>model</code>，或 <code>model</code> 不在您线路白名单内）</li>
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
h3 { font-size: 15px; margin: 12px 0 6px 0; color: rgba(231,233,238,0.85); }
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
