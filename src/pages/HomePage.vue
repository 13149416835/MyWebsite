<template>
  <div class="page">
    <!-- 介绍 -->
    <section id="top" class="block hero">
      <p class="lead">
        OpenAI 兼容接口，支持 SSE 流式与跨域。按 token 计费，额度透明。
      </p>
      <div class="actions">
        <RouterLink class="btn primary" to="/docs">API 文档</RouterLink>
      </div>
      <ul class="highlights">
        <li>统一网关接入与独立客户 Key</li>
        <li>预充值额度，调用可溯源</li>
      </ul>
    </section>

    <!-- 定价 -->
    <section id="pricing" class="block">
      <h2>定价</h2>
      <p class="muted">按需充值，按 token 扣费。支持 PayPal。</p>
      <div class="plans">
        <div class="plan">
          <div class="plan-name">体验包</div>
          <div class="plan-price">$5</div>
          <div class="plan-desc">试用与轻量调用</div>
        </div>
        <div class="plan">
          <div class="plan-name">入门包</div>
          <div class="plan-price">$20</div>
          <div class="plan-desc">日常开发与测试</div>
        </div>
        <div class="plan">
          <div class="plan-name">开发包</div>
          <div class="plan-price">$50</div>
          <div class="plan-desc">正式项目 / 小规模生产</div>
        </div>
      </div>
      <div class="pay-box">
        <p><strong>PayPal</strong> 付款至：pay@xiaoqiangonline.shop（请替换为您的真实收款邮箱）</p>
        <p class="muted small">付款后请联系我们，我们将为您开通 API Key 与额度。</p>
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="block">
      <h2>联系</h2>
      <p class="muted">技术支持与商务</p>
      <div class="contact-row">
        <span class="k">Telegram</span>
        <span class="v">（请填写您的账号）</span>
      </div>
      <div class="contact-row">
        <span class="k">邮箱</span>
        <span class="v">support@xiaoqiangonline.shop</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 24px;
}

.block {
  scroll-margin-top: 24px;
}

.block h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  letter-spacing: 0.02em;
}

.hero .eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(231, 233, 238, 0.45);
  margin: 0 0 12px 0;
}

.hero h1 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 14px 0;
  max-width: 20em;
}

.lead {
  margin: 0 0 20px 0;
  max-width: 36em;
  line-height: 1.65;
  color: rgba(231, 233, 238, 0.72);
  font-size: 15px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 14px;
  text-decoration: none;
  border: 1px solid transparent;
}

.btn.primary {
  background: linear-gradient(135deg, #6d5efc, #2ec5e8);
  color: #0b1020;
  font-weight: 600;
}

.highlights {
  margin: 0;
  padding-left: 1.2em;
  color: rgba(231, 233, 238, 0.55);
  font-size: 14px;
  line-height: 1.8;
}

.muted {
  color: rgba(231, 233, 238, 0.6);
  margin: 0 0 16px 0;
  font-size: 14px;
}

.muted.small {
  font-size: 13px;
  margin-top: 8px;
  margin-bottom: 0;
}

.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.plan {
  padding: 18px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.plan-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
}

.plan-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #5ec8ff;
}

.plan-desc {
  font-size: 13px;
  color: rgba(231, 233, 238, 0.5);
  margin-top: 6px;
}

.pay-box {
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 14px;
  line-height: 1.55;
}

.pay-box p {
  margin: 0;
}

.contact-row {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 14px;
}

.contact-row:last-of-type {
  border-bottom: none;
}

.contact-row .k {
  min-width: 72px;
  font-weight: 600;
  color: rgba(231, 233, 238, 0.5);
}

.contact-row .v {
  color: rgba(231, 233, 238, 0.88);
}

@media (max-width: 720px) {
  .plans {
    grid-template-columns: 1fr;
  }
}
</style>
