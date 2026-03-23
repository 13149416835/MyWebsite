<template>
  <section class="pricing">
    <h1>定价</h1>
    <p class="intro">按需充值，按 token 扣费。支持 PayPal 付款。</p>

    <div class="plans">
      <div class="plan">
        <div class="name">体验包</div>
        <div class="price">$5</div>
        <div class="desc">适合试用与轻量调用</div>
      </div>
      <div class="plan">
        <div class="name">入门包</div>
        <div class="price">$20</div>
        <div class="desc">适合日常开发与测试</div>
      </div>
      <div class="plan">
        <div class="name">开发包</div>
        <div class="price">$50</div>
        <div class="desc">适合正式项目与小规模生产</div>
      </div>
    </div>

    <div class="pay">
      <h2>付款方式</h2>
      <p>通过 PayPal 付款至：<strong>pay@xiaoqiangonline.shop</strong>（请替换为您的真实 PayPal 邮箱）</p>
      <p class="note">付款后请通过联系页告知，我们将为您创建 API Key 并设置对应额度。</p>
    </div>
  </section>
</template>

<style scoped>
.pricing {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
h1 {
  font-size: 32px;
  margin: 0;
}
.intro {
  color: rgba(231, 233, 238, 0.75);
  margin: 0;
}
.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.plan {
  border-radius: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.plan .name {
  font-weight: 700;
  margin-bottom: 8px;
}
.plan .price {
  font-size: 28px;
  color: #00d4ff;
}
.plan .desc {
  color: rgba(231, 233, 238, 0.7);
  font-size: 14px;
  margin-top: 6px;
}
.pay {
  margin-top: 10px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
}
.pay h2 {
  font-size: 18px;
  margin: 0 0 10px 0;
}
.pay p {
  margin: 6px 0;
  color: rgba(231, 233, 238, 0.85);
}
.note {
  color: rgba(231, 233, 238, 0.6);
  font-size: 14px;
}
@media (max-width: 700px) {
  .plans {
    grid-template-columns: 1fr;
  }
}
</style>
