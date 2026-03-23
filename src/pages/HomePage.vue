<template>
  <section class="hero">
    <div class="badge">面向日韩开发者 · 中国三大模型一站式接入</div>
    <h1>一个网关，接入 DeepSeek / 智谱 / MiniMax</h1>
    <p class="sub">
      统一 OpenAI 风格接口，支持流式输出（SSE）、跨域调用（CORS），价格透明，开箱即用。
    </p>

    <div class="cta">
      <RouterLink class="btn primary" to="/docs">查看文档</RouterLink>
      <RouterLink class="btn" to="/pricing">查看定价</RouterLink>
    </div>

    <div class="grid">
      <div class="card">
        <div class="k">多模型路由</div>
        <div class="v">model=deepseek-chat / zhipu-glm / minimax-abab 自动转发</div>
      </div>
      <div class="card">
        <div class="k">多客户计费</div>
        <div class="v">每个客户独立 API Key + 预充值额度，按 token 扣费</div>
      </div>
      <div class="card">
        <div class="k">可对账日志</div>
        <div class="v">每次调用记录时间、模型、token、成功/失败，便于排查</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.badge {
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(124, 92, 255, 0.18);
  border: 1px solid rgba(124, 92, 255, 0.35);
  color: rgba(231, 233, 238, 0.95);
  font-size: 13px;
}
h1 {
  font-size: 40px;
  line-height: 1.1;
  margin: 0;
}
.sub {
  color: rgba(231, 233, 238, 0.75);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 820px;
}
.cta {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 12px;
  text-decoration: none;
  color: rgba(231, 233, 238, 0.95);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.btn.primary {
  background: linear-gradient(135deg, #7c5cff, #00d4ff);
  border: none;
  color: #0b1020;
  font-weight: 700;
}
.grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.card {
  border-radius: 16px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.k {
  font-weight: 700;
  margin-bottom: 6px;
}
.v {
  color: rgba(231, 233, 238, 0.75);
  line-height: 1.55;
  font-size: 14px;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  h1 {
    font-size: 32px;
  }
}
</style>
