<template>
  <section class="docs">
    <h1>API 文档</h1>

    <h2>网关地址</h2>
    <p><code>https://api.xiaoqiangonline.shop/v1/chat/completions</code></p>
    <p>
      当前网关<strong>仅提供文本对话</strong>（OpenAI 风格的 Chat Completions），不含视觉/语音/图像等能力。
      具体能力与版本以您开通时约定为准。
    </p>

    <h2>认证</h2>
    <p>请求头携带：<code>Authorization: Bearer &lt;您的客户 API Key&gt;</code></p>

    <h2>模型参数（无需传 model）</h2>
    <p>
      您的 API Key 在开通时已绑定服务线路与模型，请求体<strong>不必</strong>包含 <code>model</code>；若传入也会被网关忽略。
      如需调整线路或能力，请联系商务/支持，由我方在后台为您变更，文档中不单独列出模型名称。
    </p>
    <p>
      扣费按响应中的 <code>usage</code> 统计（如 <code>total_tokens</code>、<code>prompt_tokens</code>、
      <code>completion_tokens</code> 等，以实际返回为准）折算；流式（SSE）场景下用量可能在末包给出。
    </p>

    <h2>对话消息（messages）</h2>
    <p>
      <code>messages</code> 为数组，每条需包含 <code>role</code> 与 <code>content</code>（字符串）。支持常见角色：
    </p>
    <ul>
      <li><code>system</code> — 系统/人设提示，用于设定助手行为、风格或知识边界；建议放在数组前部。</li>
      <li><code>user</code> — 用户输入。</li>
      <li><code>assistant</code> — 模型历史回复；多轮对话时把上一轮助手内容一并传入，便于连续上下文。</li>
    </ul>
    <p>至少包含一条 <code>user</code>（或与 <code>system</code> 组合使用）；单轮场景常见写法为 <code>system</code> + <code>user</code>。</p>

    <h2>示例：curl</h2>
    <pre><code>curl -X POST https://api.xiaoqiangonline.shop/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"system","content":"你是一个简洁、专业的助手。"},{"role":"user","content":"Hello"}]}'</code></pre>

    <h2>示例：Python</h2>
    <pre><code>import requests

r = requests.post(
  "https://api.xiaoqiangonline.shop/v1/chat/completions",
  headers={"Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json"},
  json={
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
    messages: [
      { role: "system", content: "你是一个简洁、专业的助手。" },
      { role: "user", content: "Hello" },
    ],
  }),
});
const data = await res.json();</code></pre>

    <h2>常见错误码</h2>
    <ul>
      <li><code>401</code> — API Key 无效或未提供</li>
      <li><code>402</code> — 余额不足</li>
      <li><code>400</code> — 请求参数错误（如缺少 <code>messages</code>）</li>
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
