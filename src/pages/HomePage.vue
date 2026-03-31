<template>
  <div class="page">
    <section id="top" class="block hero">
      <p class="lead">{{ ui.lead }}</p>
      <div class="actions">
        <RouterLink class="btn primary" to="/docs">{{ ui.apiDocs }}</RouterLink>
      </div>
      <ul class="highlights">
        <li>{{ ui.h1 }}</li>
        <li>{{ ui.h2 }}</li>
      </ul>
    </section>

    <section id="pricing" class="block">
      <h2>{{ ui.pricingTitle }}</h2>
      <p class="muted">{{ ui.pricingMuted }}</p>

      <div class="pricing-table-wrap">
        <table class="pricing-table">
          <thead>
            <tr>
              <th>{{ ui.thPlan }}</th>
              <th>{{ ui.thPrice }}</th>
              <th>{{ ui.thQuota }}</th>
              <th>{{ ui.thFor }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>{{ ui.trial }}</strong></td>
              <td>$5</td>
              <td>{{ ui.trialQuota }}</td>
              <td>
                <a class="buy-btn" href="https://www.paypal.com/ncp/payment/WXDRFFS6V838U" target="_blank" rel="noopener noreferrer">
                  {{ ui.trialBuy }}
                </a>
              </td>
            </tr>
            <tr>
              <td><strong>{{ ui.starter }}</strong></td>
              <td>$20</td>
              <td>{{ ui.starterQuota }}</td>
              <td>
                <a class="buy-btn" href="https://www.paypal.com/ncp/payment/ML8C4TJZCLE4L" target="_blank" rel="noopener noreferrer">
                  {{ ui.starterBuy }}
                </a>
              </td>
            </tr>
            <tr>
              <td><strong>{{ ui.developer }}</strong></td>
              <td>$50</td>
              <td>{{ ui.devQuota }}</td>
              <td>
                <a class="buy-btn" href="https://www.paypal.com/ncp/payment/39VZD2F6LZH6A" target="_blank" rel="noopener noreferrer">
                  {{ ui.devBuy }}
                </a>
              </td>
            </tr>
            <tr>
              <td><strong>{{ ui.custom }}</strong></td>
              <td>{{ ui.customPrice }}</td>
              <td>{{ ui.customQuota }}</td>
              <td>
                <a class="buy-btn buy-btn--outline" href="https://www.paypal.com/ncp/payment/EAY957Q3BK5WN" target="_blank" rel="noopener noreferrer">
                  {{ ui.customBuy }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="note">
        <strong>{{ ui.noteStrong }}</strong>
        {{ ui.noteText }}
      </p>

      <h3 class="subh">{{ ui.payment }}</h3>
      <ol class="pay-steps">
        <li>{{ ui.pay1 }}</li>
        <li>
          {{ ui.pay2Before }}<strong>{{ ui.pay2Strong }}</strong>{{ ui.pay2After }}
        </li>
        <li>
          {{ ui.pay3Before }}<strong>{{ ui.pay3After }}</strong>
        </li>
        <li>{{ ui.pay4 }}</li>
      </ol>
    </section>

    <section id="faq" class="block">
      <h2>{{ ui.faq }}</h2>
      <dl class="faq">
        <dt>{{ ui.faq1q }}</dt>
        <dd>{{ ui.faq1a }}</dd>
        <dt>{{ ui.faq2q }}</dt>
        <dd>{{ ui.faq2a }}</dd>
        <dt>{{ ui.faq3q }}</dt>
        <dd>{{ ui.faq3a }}</dd>
        <dt>{{ ui.faq4q }}</dt>
        <dd>{{ ui.faq4a }}</dd>
      </dl>
    </section>

    <section id="contact" class="block">
      <h2>{{ ui.contact }}</h2>
      <p class="muted">{{ ui.contactMuted }}</p>
      <div class="contact-row">
        <span class="k">Telegram</span>
        <span class="v">@xiaoqiangapi</span>
      </div>
      <div class="contact-row">
        <span class="k">{{ ui.email }}</span>
        <span class="v">zhangyongshe123@outlook.com</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { siteLang } from "../i18n";
import { homeUi } from "../siteUi";

const ui = computed(() => homeUi[siteLang.value]);
</script>

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
