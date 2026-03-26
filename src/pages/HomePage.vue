<template>
  <div class="page">
    <!-- 介绍 -->
    <section id="top" class="block hero">
      <p class="lead">
        OpenAI 兼容 Chat Completions，支持 SSE 流式与跨域。按 Token 计量额度，用量透明。
      </p>
      <div class="actions">
        <RouterLink class="btn primary" to="/docs">API 文档</RouterLink>
      </div>
      <ul class="highlights">
        <li>统一网关接入与独立客户 Key</li>
        <li>自选模型（线路内白名单），预充 Token 额度</li>
      </ul>
    </section>

    <!-- 定价 -->
    <section id="pricing" class="block">
      <h2>定价</h2>
      <p class="muted">套餐为 Token 额度参考；付款后按套餐为您开通对应额度。支持 PayPal。</p>

      <div class="pricing-table-wrap">
        <table class="pricing-table">
          <thead>
            <tr>
              <th>套餐</th>
              <th>价格</th>
              <th>额度</th>
              <th>适合人群</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>体验包</td>
              <td>$5</td>
              <td>50 万 Token</td>
              <td>试用、学生</td>
            </tr>
            <tr>
              <td>入门包</td>
              <td>$20</td>
              <td>250 万 Token</td>
              <td>日常开发</td>
            </tr>
            <tr>
              <td>开发包</td>
              <td>$50</td>
              <td>700 万 Token</td>
              <td>正式项目</td>
            </tr>
            <tr>
              <td>自定义</td>
              <td>$10 起</td>
              <td>按 $10 / 百万 Token 比例</td>
              <td>灵活需求</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="note">
        <strong>备注：</strong>50 万 Token 约相当于 <strong>500～1000 次</strong>对话（按每次对话平均消耗
        <strong>500～1000 Token</strong>估算，含输入与输出）。实际用量因模型与使用方式而异。
      </p>

      <h3 class="subh">付款方式</h3>
      <ol class="pay-steps">
        <li>登录 PayPal，转账至：<strong>pay@xiaoqiangonline.shop</strong></li>
        <li>
          转账时<strong>备注</strong>：您的邮箱 + Telegram 用户名（例如：<code>user@example.com @yourname</code>）
        </li>
        <li>转账成功后，通过 Telegram 联系 <strong>@yourtelegram</strong>，发送转账截图</li>
        <li>工作日 <strong>2 小时内</strong>，将为您开通 API Key，并通过邮件 / Telegram 通知</li>
      </ol>
    </section>

    <!-- FAQ -->
    <section id="faq" class="block">
      <h2>常见问题</h2>
      <dl class="faq">
        <dt>额度用完了怎么办？</dt>
        <dd>我们会通过邮件 / Telegram 提前通知。续费后额度自动增加，API Key 不变。</dd>
        <dt>支持流式输出吗？</dt>
        <dd>支持。与官方 OpenAI 接口一样，请求体设置 <code>stream: true</code> 即可。</dd>
        <dt>怎么查看剩余额度？</dt>
        <dd>登录您的 API Key 管理后台（稍后提供），或直接联系我们查询。</dd>
        <dt>网关稳定吗？</dt>
        <dd>基于 Cloudflare 全球网络搭建，过去 3 个月可用性 99.9% 以上。</dd>
      </dl>
    </section>

    <!-- 联系 -->
    <section id="contact" class="block">
      <h2>联系</h2>
      <p class="muted">技术支持与商务</p>
      <div class="contact-row">
        <span class="k">Telegram</span>
        <span class="v">@yourtelegram</span>
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

.subh {
  font-size: 1rem;
  font-weight: 600;
  margin: 24px 0 10px 0;
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

.pricing-table-wrap {
  overflow-x: auto;
  margin-bottom: 16px;
}

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.pricing-table th,
.pricing-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.pricing-table th {
  color: rgba(231, 233, 238, 0.55);
  font-weight: 600;
  font-size: 13px;
}

.pricing-table td:nth-child(2) {
  color: #5ec8ff;
  font-weight: 600;
}

.note {
  font-size: 13px;
  line-height: 1.65;
  color: rgba(231, 233, 238, 0.65);
  margin: 0 0 8px 0;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.pay-steps {
  margin: 0;
  padding-left: 1.25em;
  font-size: 14px;
  line-height: 1.85;
  color: rgba(231, 233, 238, 0.82);
}

.pay-steps li {
  margin-bottom: 6px;
}

.pay-steps code {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
}

.faq {
  margin: 0;
  max-width: 40em;
}

.faq dt {
  font-weight: 600;
  font-size: 14px;
  margin: 16px 0 6px 0;
  color: rgba(231, 233, 238, 0.92);
}

.faq dt:first-child {
  margin-top: 0;
}

.faq dd {
  margin: 0 0 0 0;
  font-size: 14px;
  line-height: 1.65;
  color: rgba(231, 233, 238, 0.62);
}

.faq code {
  font-size: 13px;
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
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
</style>
